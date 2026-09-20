export const siteConfig = {
  name: "Heaven Funeral Services",
  shortName: "Heaven",
  descriptor: "Funeral Services",
  legalName: "Heaven Funeral Services",
  parentOrganization: "Woads Group",
  // Canonical origin. Keep in sync with NEXT_PUBLIC_SITE_URL in the environment.
  url: "https://www.heavenfuneralservices.com",
  email: "woads@heavenfuneralservices.com",
  phoneDisplay: "+91 95956 16843",
  phoneHref: "tel:+919595616843",
  phoneNumbers: [
    { display: "+91 95956 16843", href: "tel:+919595616843" },
    { display: "+91 80753 41710", href: "tel:+918075341710" },
    { display: "+91 99465 98362", href: "tel:+919946598362" },
  ],
  whatsappHref: "https://wa.me/919595616843",
  availability: "Available 24 hours, every day",
  serviceArea: "Payyampally & Chennalode shops · Long-distance coordination",

  social: {
    // TODO(owner): add the remaining profile URLs — every one of these is a
    // trust signal Google uses to connect the site to the business.
    facebook: "",
    // Canonical profile URL only: the `?stkn=` share token that Instagram
    // appends when you copy a link from the app is per-share and expires, and
    // a `sameAs` that redirects or 404s is worse than no `sameAs` at all.
    instagram: "https://www.instagram.com/heaven_funeral_services",
    youtube: "",
    googleMaps: "",
  },
} as const;

/**
 * The two shops. They sit in different taluks — Payyampally in Mananthavady
 * (north Wayanad) and Chennalode in Vythiri (near Kalpetta, about 22km south) —
 * which between them cover the district from both ends.
 *
 * Each one gets its own LocalBusiness entry in the structured data. NAP text
 * here must match each shop's Google Business Profile character for character;
 * inconsistent NAP data is one of the biggest local-ranking killers.
 *
 * TODO(owner): replace each `streetAddress` with the exact address printed on
 * that shop's signboard, then make the Business Profiles match.
 */
export const locations = [
  {
    id: "payyampally",
    name: "Heaven Funeral Services — Payyampally",
    label: "Payyampally shop",
    region: "North Wayanad",
    description:
      "Our Mananthavady-taluk shop, serving Mananthavady town, Panamaram, Kattikulam, Thirunelli, Vellamunda, and the northern panchayats.",
    streetAddress: "Payyampally",
    locality: "Payyampally",
    taluk: "Mananthavady",
    district: "Wayanad",
    addressRegion: "Kerala",
    postalCode: "670646",
    country: "IN",
    countryName: "India",
    geo: { latitude: 11.810803, longitude: 76.0536769 },
  },
  {
    id: "chennalode",
    name: "Heaven Funeral Services — Chennalode",
    label: "Chennalode shop",
    region: "Central & south Wayanad",
    description:
      "Our Vythiri-taluk shop just north of Kalpetta, serving Kalpetta, Vythiri, Meppadi, Muttil, and on towards Sulthan Bathery.",
    streetAddress: "Chennalode",
    locality: "Chennalode",
    taluk: "Vythiri",
    district: "Wayanad",
    addressRegion: "Kerala",
    postalCode: "673121",
    country: "IN",
    countryName: "India",
    geo: { latitude: 11.63045, longitude: 76.0867 },
  },
] as const;

/** Used wherever a single address is needed (metadata, legacy geo tags). */
export const primaryLocation = locations[0];

/**
 * Towns and villages we actually serve, grouped around the two shops. These
 * drive the Service Areas section and the `areaServed` structured data —
 * together they are how "funeral services near me" searches in Wayanad find us.
 */
export const serviceAreas = [
  {
    group: "From the Payyampally shop — north Wayanad",
    description:
      "Mananthavady taluk. A hearse or freezer box can usually be at the house within the hour.",
    places: [
      "Payyampally",
      "Mananthavady",
      "Thalappuzha",
      "Korom",
      "Vellamunda",
      "Nalloornad",
      "Anjukunnu",
      "Valad",
      "Panamaram",
      "Kattikulam",
      "Thirunelli",
      "Thondernad",
      "Edavaka",
      "Tharuvana",
      "Boys Town",
      "Dwaraka",
      "Tholpetty",
    ],
  },
  {
    group: "From the Chennalode shop — central & south Wayanad",
    description:
      "Vythiri taluk, just north of Kalpetta, covering the district's southern half.",
    places: [
      "Chennalode",
      "Kalpetta",
      "Vythiri",
      "Meppadi",
      "Muttil",
      "Pozhuthana",
      "Padinjarathara",
      "Kaniyambetta",
      "Kottathara",
      "Thariyode",
      "Vengappally",
      "Lakkidi",
      "Pookode",
    ],
  },
  {
    group: "East Wayanad",
    description:
      "Sulthan Bathery taluk and the eastern panchayats, same-day or scheduled.",
    places: [
      "Sulthan Bathery",
      "Meenangadi",
      "Ambalavayal",
      "Pulpally",
      "Mullankolly",
      "Nenmeni",
      "Noolpuzha",
      "Poothadi",
      "Kidanganad",
    ],
  },
  {
    group: "Neighbouring districts & long distance",
    description:
      "Kannur and Kozhikode border routes, plus inter-state journeys arranged end to end.",
    places: [
      "Iritty",
      "Kelakam",
      "Peravoor",
      "Thalassery",
      "Kannur",
      "Kozhikode",
      "Thamarassery",
      "Coorg / Kutta (Karnataka)",
      "Gudalur (Tamil Nadu)",
      "Bengaluru & other cities",
    ],
  },
];

/**
 * Search-intent questions people in Wayanad actually type or ask. These render
 * as a visible FAQ section and as FAQPage structured data, which is the fastest
 * realistic route to a rich result for a brand-new domain.
 */
export const faqs = [
  {
    question: "Where are your shops in Wayanad?",
    answer:
      "We have two. One is at Payyampally in Mananthavady taluk, covering north Wayanad. The other is at Chennalode in Vythiri taluk, just north of Kalpetta, covering the centre and south of the district. Both keep coffins, mortuary freezer boxes, and a hearse van ready, so a call from almost anywhere in Wayanad can be answered within the hour, day or night.",
  },
  {
    question: "Do you arrange Christian funeral services?",
    answer:
      "Yes — Christian funeral arrangements are our main work. We supply coffins, processional crosses, candles, and floral arrangements, and we coordinate directly with the parish priest and the church or cemetery over timings, so the body arrives when the service is ready to begin. We work with families of every denomination, and we serve families of other faiths just as readily.",
  },
  {
    question: "Can I get a dead body freezer box in Wayanad at short notice?",
    answer:
      "We deliver mobile mortuary freezer boxes to homes, parish halls, and hospitals across Wayanad. The unit is brought in, set up, and collected afterwards by our team. Call any of our dispatch numbers and tell us the location — availability is confirmed on the phone straight away.",
  },
  {
    question: "Do you have a hearse van or ambulance for dead body transport?",
    answer:
      "Yes. We operate our own hearse vehicles with enclosed, temperature-supported cabins for respectful transport from hospital, home, or mortuary to the church, temple, or burial ground. Nothing is subcontracted — the same team that takes your call handles the journey.",
  },
  {
    question: "Which areas of Wayanad do you cover?",
    answer:
      "All three taluks. From Payyampally we cover Mananthavady, Panamaram, Kattikulam, Thirunelli, Vellamunda and the north. From Chennalode we cover Kalpetta, Vythiri, Meppadi, Muttil and the south, and on to Sulthan Bathery, Meenangadi, Ambalavayal and Pulpally in the east. We also cross regularly into the Kannur and Kozhikode border areas such as Iritty, Kelakam, Peravoor, and Thalassery.",
  },
  {
    question: "Can you arrange long-distance transport to another state?",
    answer:
      "We do. Long-distance coordination is one of our core services: Bengaluru, Coorg, Gudalur, Tamil Nadu, Karnataka and beyond. We plan the route, keep the family updated through the journey, and help with the paperwork that travel across district and state lines requires.",
  },
  {
    question: "Do you sell coffins, and can I see them before deciding?",
    answer:
      "Both shops keep a full range of coffins on display — plain handcrafted wood through to decorated finishes — along with crosses, candles, floral arrangements, and the other items a farewell needs. You are welcome to come to whichever shop is nearer, at Payyampally or Chennalode, or we can send photographs over WhatsApp if travelling is difficult.",
  },
  {
    question: "Are you available at night and on holidays?",
    answer:
      "Yes — 24 hours a day, every day of the year, including Sundays and festival days. A death does not wait for office hours, and neither do we. Someone answers the dispatch line whenever you call.",
  },
  {
    question: "How much do your funeral services cost?",
    answer:
      "Cost depends on what you need — distance travelled, how long a freezer unit is required, and which coffin you choose. We give a clear figure on the phone before anything is arranged, with no charges added afterwards. Call us and we will talk it through plainly.",
  },
];

/**
 * Primary navigation.
 *
 * Hash targets are written as absolute paths (`/#services`) rather than bare
 * fragments, because these same links render on /coffin-boxes and /blogs where
 * a bare `#services` would only scroll the current page and find nothing.
 */
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Coffin Boxes", href: "/coffin-boxes" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blog", href: "/blogs" },
  { label: "About Us", href: "/#about" },
  // { label: "Service Areas", href: "/#service-areas" },
  { label: "Contact", href: "/#contact" },
];

/** The routes that are real pages rather than in-page anchors. Used for the sitemap. */
export const pageRoutes = ["/coffin-boxes", "/blogs"] as const;

/**
 * Gallery photography.
 *
 * `group` drives the filter chips in the Gallery section and nothing else — add
 * a new value here and a new chip appears, in first-seen order. Every entry is
 * a real photograph of our own shops, stock, and vehicles; `alt` text is written
 * as a sentence describing what is actually in the frame, with the place name,
 * because that is what makes these eligible for Google Images on "coffin shop
 * Wayanad" and "freezer box Wayanad" searches.
 */
export type GalleryGroup =
  | "Coffins"
  | "Freezer boxes"
  | "Hearse fleet"
  | "Our shops"
  | "At the parish";

export type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  title: string;
  group: GalleryGroup;
  /** Portrait-shot originals; the grid gives these a taller tile. */
  portrait?: boolean;
};

export const galleryImages: GalleryImage[] = [
  // ——— Coffins ———————————————————————————————————————————————————————
  {
    src: "/images/coffins/coffinbox_heavenfuneral.jpg",
    alt: "Rows of polished wooden coffins with cross inlays inside the Heaven Funeral Services coffin shop in Wayanad",
    category: "Coffin showroom",
    title: "The full range, on the floor",
    group: "Coffins",
  },
  {
    src: "/images/coffins/coffins_heaven_funeral_services.webp",
    alt: "Rosewood coffin with an inlaid white cross and a glass viewing panel, sold at Payyampally and Chennalode in Wayanad",
    category: "Cross-panel coffin",
    title: "A face still visible",
    group: "Coffins",
    portrait: true,
  },
  {
    src: "/images/coffins/coffin_box.png",
    alt: "Open walnut casket with a tufted cream satin interior and chrome swing-bar handles, available in Wayanad",
    category: "Lined casket",
    title: "Lined and finished by hand",
    group: "Coffins",
  },
  {
    src: "/images/coffins/coffin_funeral_service.webp",
    alt: "Carved and decorated wooden coffins on display stands at a coffin shop in Wayanad, Kerala",
    category: "Carved range",
    title: "Where the workshop hours go",
    group: "Coffins",
  },
  {
    src: "/images/coffins/coffinbox_heaven.jpg",
    alt: "Plain polished hardwood coffin with a metal cross on the lid, from the Heaven Funeral Services coffin shop in Wayanad",
    category: "Plain hardwood",
    title: "Simple, and entirely enough",
    group: "Coffins",
    portrait: true,
  },
  {
    src: "/images/showroom/heaven-coffin-racks.jpg",
    alt: "Racks of handcrafted wooden and decorated coffins for sale in Wayanad",
    category: "Coffin selection",
    title: "A choice for every family",
    group: "Coffins",
  },
  {
    src: "/images/showroom/heaven-golden-cross.jpg",
    alt: "Gold processional cross and white floral arrangement kept ready at the Payyampally funeral shop in Wayanad",
    category: "Crosses & flowers",
    title: "The cross that leads the way",
    group: "Coffins",
    portrait: true,
  },
  {
    src: "/images/showroom/heaven-showroom-display.jpg",
    alt: "Coffins, mortuary freezer box, and floral arrangements at the Payyampally funeral showroom",
    category: "Showroom",
    title: "Prepared with reverence",
    group: "Coffins",
  },

  // ——— Freezer boxes —————————————————————————————————————————————————
  {
    src: "/images/freezer/heaven_freezer.jpeg",
    alt: "Steel and gold-finished mortuary freezer boxes on rent, lined up at the Heaven Funeral Services showroom in Wayanad",
    category: "Freezer box rental",
    title: "Units ready to go out",
    group: "Freezer boxes",
  },
  {
    src: "/images/freezer/freezer.jpeg",
    alt: "Mobile dead body freezer boxes with curved glass lids beside coffin racks at the Payyampally shop, Wayanad",
    category: "Cold storage",
    title: "Kept at home, not a mortuary",
    group: "Freezer boxes",
  },
  {
    src: "/images/showroom/heaven-freezer-unit.jpg",
    alt: "Gold-finished mortuary freezer box available on rent in Wayanad",
    category: "Cold storage",
    title: "Dignity, preserved",
    group: "Freezer boxes",
  },
  {
    src: "/images/showroom/heaven-storefront-freezer.jpg",
    alt: "Branded mobile dead body freezer box unit at the Payyampally showroom entrance",
    category: "Mobile units",
    title: "Care that travels home",
    group: "Freezer boxes",
    portrait: true,
  },

  // ——— Hearse fleet ——————————————————————————————————————————————————
  {
    src: "/images/gallery/web/heaven-vehicle-angle.jpg",
    alt: "Heaven Funeral Services hearse van ready for dead body transport in Payyampally, Wayanad",
    category: "Our vehicle",
    title: "Prepared with dignity",
    group: "Hearse fleet",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-front.jpg",
    alt: "Front view of the white Heaven Funeral Services hearse van serving Wayanad district",
    category: "Front view",
    title: "Ready for every call",
    group: "Hearse fleet",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-side.jpg",
    alt: "Side view of the Heaven Funeral Services hearse showing its enclosed transport cabin",
    category: "Purpose-built fleet",
    title: "Designed for respectful care",
    group: "Hearse fleet",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-ready.jpg",
    alt: "Three-quarter view of the clean white funeral transport vehicle after rainfall in Wayanad",
    category: "Service readiness",
    title: "Clean, calm, and prepared",
    group: "Hearse fleet",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-wide.jpg",
    alt: "Wide view of the Heaven Funeral Services hearse van at Payyampally, Mananthavady",
    category: "Local service",
    title: "A familiar, dependable presence",
    group: "Hearse fleet",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-rear.jpg",
    alt: "Rear and side view of the enclosed Heaven Funeral Services dead body carrier vehicle",
    category: "Secure transport",
    title: "Private by design",
    group: "Hearse fleet",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-profile.jpg",
    alt: "Full side profile of the Heaven Funeral Services hearse van used for long-distance transport",
    category: "Fleet profile",
    title: "Care across every mile",
    group: "Hearse fleet",
  },
  {
    src: "/images/showroom/heaven-hearse-front.jpg",
    alt: "Heaven Funeral Services hearse van beside the shop signboard in Payyampally, Wayanad",
    category: "Hearse fleet",
    title: "Ready at the doorstep",
    group: "Hearse fleet",
  },

  // ——— Our shops —————————————————————————————————————————————————————
  {
    src: "/images/showroom/heaven-showroom-interior.jpg",
    alt: "Interior of the Heaven Funeral Services coffin shop in Payyampally with racks and display freezers",
    category: "Showroom",
    title: "Everything under one roof",
    group: "Our shops",
  },
  {
    src: "/images/showroom/heaven-showroom-entrance.jpg",
    alt: "Entrance of the Heaven Funeral Services showroom in Payyampally near Chennalode, Wayanad",
    category: "Our showroom",
    title: "Open doors, open hearts",
    group: "Our shops",
  },
  {
    src: "/images/showroom/heaven-storefront.jpg",
    alt: "Coffins stacked on wall racks and a mortuary freezer box seen from the doorway of the Payyampally shop, Wayanad",
    category: "Storefront",
    title: "Stocked, and open at any hour",
    group: "Our shops",
    portrait: true,
  },
  {
    src: "/images/showroom/heaven-hearse-exterior.jpg",
    alt: "The Heaven Funeral Services shopfront in Wayanad with the hearse van parked outside under the signboard",
    category: "Our shop",
    title: "Where the calls are answered",
    group: "Our shops",
  },
  {
    src: "/images/blog/shop-with-van.jpeg",
    alt: "Heaven Funeral Services signboard lit at night beside the hearse van at the Chennalode shop in Wayanad",
    category: "After dark",
    title: "The lights stay on",
    group: "Our shops",
    portrait: true,
  },

  // ——— At the parish —————————————————————————————————————————————————
  {
    src: "/images/blog/funeral-ceremony.jpeg",
    alt: "Heaven Funeral Services hearse van at a parish church in Wayanad during a Christian funeral service",
    category: "Church service",
    title: "At the church door",
    group: "At the parish",
  },
  {
    src: "/images/blog/funeralservices_payyampally.jpeg",
    alt: "Heaven Funeral Services hearse van waiting outside a church at Payyampally, Mananthavady, Wayanad",
    category: "Payyampally",
    title: "Waiting on the parish clock",
    group: "At the parish",
    portrait: true,
  },
  {
    src: "/images/blog/funeralservices_ondayagady.jpeg",
    alt: "White hearse van with ceremonial umbrellas outside a hill parish church in Wayanad, Kerala",
    category: "Hill parishes",
    title: "Up every road that asks",
    group: "At the parish",
    portrait: true,
  },
];
