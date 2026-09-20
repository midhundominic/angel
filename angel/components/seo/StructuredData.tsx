import { locations, serviceAreas, siteConfig } from "@/data/site";

const ORGANISATION_ID = `${siteConfig.url}/#organization`;
const WOADS_ID = `${siteConfig.url}/#woads`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Flat list of every place name we serve, for `areaServed`. */
const allPlaces = serviceAreas.flatMap((area) => area.places);

/**
 * GoodRelations business functions. Schema.org has no `Rental` service type, so
 * this is how an offer says "leased for a period" rather than "sold outright".
 */
const SELL = "http://purl.org/goodrelations/v1#Sell";
const LEASE_OUT = "http://purl.org/goodrelations/v1#LeaseOut";

/**
 * The services we want Google to associate with the business. Wording here is
 * deliberately plain and local — it mirrors the visible copy on the page, which
 * is what keeps the markup eligible rather than flagged as mismatched.
 */
const serviceCatalog: {
  name: string;
  description: string;
  businessFunction?: string;
}[] = [
  {
    name: "Funeral Services in Wayanad",
    description:
      "Complete funeral arrangements — coffins, processional crosses, candles, and floral arrangements, with timings coordinated directly with the parish priest, church, and cemetery.",
  },
  {
    name: "24/7 Dead Body Transport in Wayanad",
    description:
      "Round-the-clock hearse van service from our Payyampally and Chennalode shops for transport from hospital, home, or mortuary anywhere in Wayanad district.",
  },
  {
    name: "Hearse Van Service in Wayanad",
    description:
      "Company-owned enclosed hearse vans carrying the departed from hospital or home to the church, temple, or burial ground. Transport is not subcontracted.",
  },
  {
    name: "Mortuary Freezer Box on Rent",
    description:
      "Mobile dead body freezer boxes on rent — delivered, installed, and collected at homes, parish halls, and hospitals across Wayanad. Charged by the day, with no minimum hire.",
    // Rented out, not sold. GoodRelations business functions are the vocabulary
    // Google understands for that distinction; without them a freezer box and a
    // coffin look like the same kind of offer.
    businessFunction: LEASE_OUT,
  },
  {
    name: "Coffins Sale",
    description:
      "Coffins for sale at both shops — plain handcrafted wood through to decorated finishes, on display to see before deciding, with processional crosses, candles, and floral arrangements.",
    businessFunction: SELL,
  },
  {
    name: "Long Distance Dead Body Transport",
    description:
      "Inter-district and inter-state transport to Bengaluru, Karnataka, Tamil Nadu, and across Kerala, with documentation support.",
  },
  {
    name: "Hospital, Church and Mortuary Coordination",
    description:
      "Coordination with hospitals, mortuaries, parishes, churches, and burial grounds so timings and handovers stay clear for the family.",
  },
  {
    name: "Funeral Handling and Documentation",
    description:
      "Professional handling and transfer paperwork from pickup through arrival, including permits needed for long journeys.",
  },
];

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
];

const areaServed = [
  { "@type": "AdministrativeArea", name: "Wayanad district, Kerala" },
  ...allPlaces.map((place) => ({ "@type": "Place", name: place })),
];

/**
 * Each shop gets its own LocalBusiness node with its own address, coordinates,
 * and `branchOf` link. Google treats multi-location businesses as separate
 * entities per location — one merged entry would compete with itself.
 */
function branchNode(location: (typeof locations)[number]) {
  return {
    "@type": "FuneralHome",
    "@id": `${siteConfig.url}/#${location.id}`,
    name: location.name,
    branchOf: { "@id": ORGANISATION_ID },
    description: location.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpeg`,
    image: [
      `${siteConfig.url}/images/showroom/heaven-storefront.jpg`,
      `${siteConfig.url}/images/showroom/heaven-showroom-interior.jpg`,
      `${siteConfig.url}/images/gallery/web/heaven-vehicle-angle.jpg`,
    ],
    telephone: siteConfig.phoneNumbers.map((phone) => phone.display),
    email: siteConfig.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.locality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    // A radius as well as named places: covers "near me" queries from villages
    // we have not listed by name.
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: location.geo.latitude,
        longitude: location.geo.longitude,
      },
      geoRadius: "60000",
    },
    areaServed,
    openingHoursSpecification: openingHours,
    knowsLanguage: ["ml", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Funeral services, coffins and freezer box rental in Wayanad",
      itemListElement: serviceCatalog.map((service) => ({
        "@type": "Offer",
        ...(service.businessFunction
          ? { businessFunction: service.businessFunction }
          : {}),
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          serviceType: service.name,
          provider: { "@id": `${siteConfig.url}/#${location.id}` },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Wayanad district, Kerala",
          },
        },
      })),
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/**
 * The sitewide entity graph — Organization, both FuneralHome branches, and the
 * WebSite. These describe the business rather than the page, so they are correct
 * on every route and are rendered once from the root layout.
 *
 * Page-level nodes live with their pages: the homepage's WebPage node is in
 * `HomePageSchema` below, each inner page builds its own in components/seo/
 * PageSchema.tsx, and the FAQPage node is emitted by the Faq section itself so
 * the markup can only exist while the questions are actually visible.
 */
export function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": ORGANISATION_ID,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      description:
        "Heaven Funeral Services runs two shops in Wayanad district, Kerala — at Payyampally in Mananthavady taluk and at Chennalode in Vythiri taluk near Kalpetta. Both sell coffins, rent out mortuary freezer boxes, and provide Christian funeral arrangements, hearse van transport, and long-distance dead body transport, 24 hours a day.",
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.jpeg`,
      email: siteConfig.email,
      telephone: siteConfig.phoneNumbers.map((phone) => phone.display),
      areaServed,
      parentOrganization: { "@id": WOADS_ID },
      location: locations.map((location) => ({
        "@id": `${siteConfig.url}/#${location.id}`,
      })),
      sameAs: Object.values(siteConfig.social).filter(Boolean),
    },
    ...locations.map(branchNode),
    {
      "@type": "Organization",
      "@id": WOADS_ID,
      name: siteConfig.parentOrganization,
      logo: `${siteConfig.url}/venture-logo.jpg`,
      subOrganization: { "@id": ORGANISATION_ID },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANISATION_ID },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled data — no user input reaches this string.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/** The homepage's own WebPage node. Rendered from app/page.tsx, nowhere else. */
export function HomePageSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${siteConfig.url}/#webpage`,
          url: siteConfig.url,
          name: "Christian Funeral Services in Wayanad | Payyampally & Chennalode",
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": ORGANISATION_ID },
          primaryImageOfPage: `${siteConfig.url}/images/showroom/heaven-storefront.jpg`,
          inLanguage: "en-IN",
        }),
      }}
    />
  );
}
