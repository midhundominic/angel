export const siteConfig = {
  name: "Heaven Funeral Services",
  shortName: "Heaven",
  descriptor: "Funeral Services",
  phoneDisplay: "+91 95956 16843",
  phoneHref: "tel:+919595616843",
  phoneNumbers: [
    { display: "+91 95956 16843", href: "tel:+919595616843" },
    { display: "+91 80753 41710", href: "tel:+918075341710" },
    { display: "+91 99465 98362", href: "tel:+919946598362" },
  ],
  availability: "Available 24 hours, every day",
  serviceArea: "Payyampally, Chennalode & long-distance coordination",
};


export type Location = {
  id: string;
  name: string;
  label: string;
  region: string;
  description: string;
  streetAddress: string;
  locality: string;
  taluk: string;
  district: string;
  addressRegion: string;
  postalCode: string;
  country: string;
  countryName: string;
  geo: { latitude: number; longitude: number };
  mapUrl: string;
};

/** Embeddable map of the shop's pin. No API key needed. */
export const mapEmbedUrl = (location: Location) =>
  `https://maps.google.com/maps?q=${location.geo.latitude},${location.geo.longitude}&z=16&hl=en&output=embed`;

/** Opens Google Maps with turn-by-turn directions to the shop. */
export const directionsUrl = (location: Location) =>
  location.mapUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${location.geo.latitude},${location.geo.longitude}`;

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
export const locations: Location[] = [
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
    // TODO(owner): paste this shop's Google Business Profile link (Maps → the
    // shop → Share → Copy link). Until then, directions use the coordinates.
    mapUrl: "",
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
    // TODO(owner): paste this shop's Google Business Profile link (Maps → the
    // shop → Share → Copy link). Until then, directions use the coordinates.
    mapUrl: "",
  },
];
export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const galleryImages = [
  {
    src: "/images/gallery/web/heaven-vehicle-angle.jpg",
    alt: "Heaven Funeral Services transport vehicle prepared in a landscaped courtyard",
    category: "Our vehicle",
    title: "Prepared with dignity",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-front.jpg",
    alt: "Front view of the white Heaven Funeral Services transport vehicle",
    category: "Front view",
    title: "Ready for every call",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-side.jpg",
    alt: "Side view of the Heaven Funeral Services vehicle showing its enclosed transport cabin",
    category: "Purpose-built fleet",
    title: "Designed for respectful care",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-ready.jpg",
    alt: "Three-quarter view of the clean white transport vehicle after rainfall",
    category: "Service readiness",
    title: "Clean, calm, and prepared",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-wide.jpg",
    alt: "Wide view of the Heaven Funeral Services vehicle in its service setting",
    category: "Local service",
    title: "A familiar, dependable presence",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-rear.jpg",
    alt: "Rear and side view of the enclosed Heaven Funeral Services transport vehicle",
    category: "Secure transport",
    title: "Private by design",
  },
  {
    src: "/images/gallery/web/heaven-vehicle-profile.jpg",
    alt: "Full side profile of the Heaven Funeral Services transport vehicle",
    category: "Fleet profile",
    title: "Care across every mile",
  },
  {
    src: "/images/showroom/heaven-hearse-front.jpg",
    alt: "Front view of the white Heaven Funeral Services hearse van beside the shop signboard",
    category: "Hearse fleet",
    title: "Ready at the doorstep",
  },
  {
    src: "/images/showroom/heaven-showroom-display.jpg",
    alt: "Heaven Funeral Services showroom display with coffins, a freezer unit, and floral arrangements",
    category: "Showroom",
    title: "Prepared with reverence",
  },
  {
    src: "/images/showroom/heaven-showroom-interior.jpg",
    alt: "Wide interior view of the Heaven Funeral Services showroom with coffin racks and display freezers",
    category: "Showroom",
    title: "Everything under one roof",
  },
  {
    src: "/images/showroom/heaven-coffin-racks.jpg",
    alt: "Racks of handcrafted wooden and decorated coffins inside the showroom",
    category: "Coffin selection",
    title: "A choice for every family",
  },
  {
    src: "/images/showroom/heaven-showroom-entrance.jpg",
    alt: "View from the entrance of the Heaven Funeral Services showroom in Payyampally",
    category: "Our showroom",
    title: "Open doors, open hearts",
  },
  {
    src: "/images/showroom/heaven-freezer-unit.jpg",
    alt: "Gold-finished mortuary freezer unit inside the Heaven Funeral Services showroom",
    category: "Cold storage",
    title: "Dignity, preserved",
  },
  {
    src: "/images/showroom/heaven-storefront-freezer.jpg",
    alt: "Branded Heaven Funeral Services mobile freezer unit at the showroom entrance",
    category: "Mobile units",
    title: "Care that travels home",
  },
];
