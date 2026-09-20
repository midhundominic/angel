/**
 * Coffin catalogue for /coffin-boxes.
 *
 * These are ranges, not fixed SKUs. Stock at Payyampally and Chennalode turns
 * over constantly and finishes vary with what the workshop has on hand, so the
 * copy deliberately describes families of coffins rather than promising a
 * specific model on a specific day. No prices are published here either — the
 * figure depends on size, finish, and fittings, and a wrong number on a page a
 * grieving family reads at 2am is worse than no number at all. Every entry ends
 * at the same place: call, or come and see them.
 *
 * Keyword targets (see data/seo.ts): "coffin shop Wayanad", "coffin box
 * Mananthavady", "buy coffin Wayanad", "Christian coffins for sale Wayanad",
 * "wooden coffin for sale Kerala", "decorated coffin for sale Wayanad".
 */

export type CoffinRange = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
  badge?: string;
};

export const coffinRanges: CoffinRange[] = [
  {
    id: "plain-hardwood",
    name: "Plain Hardwood Coffin",
    tagline: "The simple, traditional choice",
    description:
      "A clean six-sided coffin in solid local hardwood, finished with a light polish and a cross fixed to the lid. This is the coffin most families in Wayanad choose — unfussy, dignified, and entirely appropriate for a parish funeral or a burial at the family ground.",
    features: [
      "Solid hardwood, hand-finished",
      "Metal or carved wooden cross on the lid",
      "Recessed side handles",
      "Plain cloth lining and pillow",
    ],
    image: "/images/coffins/coffinbox_heaven.jpg",
    alt: "Plain polished hardwood coffin with a metal cross on the lid, from the Heaven Funeral Services coffin shop in Wayanad",
    badge: "Most requested",
  },
  {
    id: "cross-panel-viewing",
    name: "Cross-Panel Coffin with Viewing Glass",
    tagline: "For an open farewell at the house",
    description:
      "A polished coffin with an inlaid cross running the length of the lid and a glass viewing panel at the head, so the face stays visible while the body rests at home or in the parish hall. The panel section lifts clear for the final rites.",
    features: [
      "Glass viewing panel at the head",
      "Full-length inlaid cross in contrast wood or metal",
      "Decorative beaded edging",
      "Satin lining with matching pillow",
    ],
    image: "/images/coffins/coffins_heaven_funeral_services.webp",
    alt: "Rosewood coffin with an inlaid white cross and a glass viewing panel, available at Payyampally and Chennalode in Wayanad",
  },
  {
    id: "carved-decorated",
    name: "Carved & Decorated Coffin",
    tagline: "When the family wants something finer",
    description:
      "Hand-carved mouldings, garland and vine work along the sides, and a deep mirror polish. These take the most work in the workshop and are what families choose when they want the coffin itself to carry some of the honour of the occasion.",
    features: [
      "Hand-carved garland and vine detailing",
      "Deep mirror polish in rosewood or mahogany tone",
      "Heavy cast handles",
      "Padded interior lining",
    ],
    image: "/images/coffins/coffin_funeral_service.webp",
    alt: "Carved and decorated wooden coffins on display stands at a coffin shop in Wayanad, Kerala",
  },
  {
    id: "lined-casket",
    name: "Lined Casket, Split Lid",
    tagline: "Rectangular casket with a tufted interior",
    description:
      "The rectangular casket style, with a lid split across the middle so the upper half opens on its own. The interior is fully upholstered in tufted cream satin with a raised pillow and an overlay throw. Suited to a church service where the casket stays open through the visitation.",
    features: [
      "Split lid — upper half opens independently",
      "Fully tufted satin interior with overlay",
      "Chrome swing-bar handles along both sides",
      "Walnut, mahogany, or light oak finish",
    ],
    image: "/images/coffins/coffin_box.png",
    alt: "Open walnut casket with a tufted cream satin interior and chrome swing-bar handles, sold in Wayanad",
  },
  {
    id: "light-teak",
    name: "Light Teak & Natural Finish",
    tagline: "Pale wood, minimal ornament",
    description:
      "Lighter-toned teak and natural-finish coffins for families who prefer restraint — no heavy carving, no dark polish, just the grain of the wood and a plain cross. They photograph gently and sit well in a bright church.",
    features: [
      "Pale teak or natural-seasoned finish",
      "Slim cross inlay or plain lid",
      "Lightweight — easier for six pallbearers",
      "Plain or lightly padded lining",
    ],
    image: "/images/coffins/coffinbox_heavenfuneral.jpg",
    alt: "Rows of light teak and natural-finish coffins stacked inside the Heaven Funeral Services coffin showroom in Wayanad",
  },
  {
    id: "sizes-to-order",
    name: "Child, Compact & Oversize",
    tagline: "Sizes outside the standard run",
    description:
      "Standard coffins do not fit every person. We keep compact and child sizes at both shops, and we can have an oversize or extra-length coffin made and delivered quickly when the measurement calls for it. Tell us the measurement on the phone and we will confirm what is on the floor straight away.",
    features: [
      "Child and compact sizes held in stock",
      "Oversize and extra-length made to order",
      "Measurement confirmed over the phone",
      "Same-day delivery within Wayanad wherever stock allows",
    ],
    image: "/images/showroom/heaven-coffin-racks.jpg",
    alt: "Racks of coffins in different sizes and finishes at the Heaven Funeral Services shop in Payyampally, Wayanad",
  },
];

/** Fittings and extras that go out with the coffin. */
export const coffinInclusions = [
  {
    title: "Processional cross",
    description:
      "The carried cross that leads the coffin into the church, supplied with the coffin at no separate arrangement.",
  },
  {
    title: "Lining, pillow & throw",
    description:
      "Interior cloth, a raised head pillow, and an overlay throw, fitted before the coffin leaves the shop.",
  },
  {
    title: "Handles & name plate",
    description:
      "Side handles sized for six pallbearers, and a name plate engraved on request while you wait.",
  },
  {
    title: "Candles & floral work",
    description:
      "Candle stands, wreaths, and the floral arrangement for the coffin and the vehicle, arranged together.",
  },
  {
    title: "Freezer box, if needed",
    description:
      "A mortuary freezer box delivered to the same address on rent, so the body can rest at home until the service.",
  },
  {
    title: "Hearse to the church",
    description:
      "Our own enclosed hearse van carries the coffin from the house to the church and on to the burial ground.",
  },
];

/** The four things a family actually has to decide. Rendered as a numbered guide. */
export const choosingSteps = [
  {
    title: "Tell us the measurement",
    description:
      "Height and build are all we need. Call from wherever you are — we will tell you which sizes are on the floor at Payyampally and at Chennalode before you travel anywhere.",
  },
  {
    title: "Open or closed",
    description:
      "If the face is to stay visible while the body rests at home, you want a coffin with a viewing panel. If the coffin will be closed, that choice opens up the plainer and the carved ranges both.",
  },
  {
    title: "Wood, finish, and ornament",
    description:
      "Plain hardwood, pale teak, deep-polished rosewood, or carved. This is where cost mostly moves, and it is entirely the family's call — no range here is more correct than another.",
  },
  {
    title: "Say when and where",
    description:
      "Give us the house or the parish hall and the hour the priest has set. The coffin, the cross, the candles, and the vehicle are arranged around that time, not the other way round.",
  },
];

/** Coffin-specific FAQ. Mirrored as FAQPage structured data on /coffin-boxes. */
export const coffinFaqs = [
  {
    question: "Where can I buy a coffin in Wayanad?",
    answer:
      "At either of our two shops. One is at Payyampally in Mananthavady taluk, covering north Wayanad; the other is at Chennalode in Vythiri taluk, just north of Kalpetta, covering the centre and south of the district. Both keep a full range of coffins on the floor, and both are open 24 hours. If travelling is difficult, call us and we will send photographs of what is in stock over WhatsApp.",
  },
  {
    question: "How much does a coffin cost in Wayanad?",
    answer:
      "It depends on the size, the wood, the finish, and the fittings — a plain hardwood coffin and a hand-carved polished one are very different pieces of work. We give you a clear figure on the phone, before anything is arranged, and nothing is added to it afterwards. Call any of our numbers and we will talk it through plainly.",
  },
  {
    question: "Can I get a coffin delivered the same day?",
    answer:
      "Yes. Within Wayanad a coffin usually reaches the house or the parish hall within the hour, wherever the size you need is on the floor. Both shops are stocked and staffed around the clock, including Sundays and festival days, so a call at 2am is answered the same way a call at 2pm is.",
  },
  {
    question: "Do you supply coffins for Christian funerals?",
    answer:
      "Christian funeral arrangements are our main work. Our coffins come with a processional cross, and the lid cross can be a plain metal fixing, a carved wooden cross, or a full-length inlay. We coordinate directly with the parish priest over timings so the coffin arrives at the church when the service is ready to begin. We serve families of every denomination, and families of other faiths just as readily.",
  },
  {
    question: "Can I see the coffins before deciding?",
    answer:
      "Please do. Both shops keep the range on display, and you are welcome at whichever is nearer at any hour. Most families send one person to look while the rest stay at the house — that is entirely normal, and we will not hurry anyone through it.",
  },
  {
    question: "Do you keep child and oversize coffins?",
    answer:
      "Compact and child sizes are held in stock at both shops. Oversize and extra-length coffins we have made and delivered quickly — tell us the measurement on the phone and we will confirm what can be done and by when, straight away.",
  },
  {
    question: "Can I rent a freezer box along with the coffin?",
    answer:
      "Yes, and most families do. A mobile mortuary freezer box is delivered to the same address, set up by our team, and collected once the rites are done, so the body can rest at home until the service. It is charged by the day with no minimum hire, and it is arranged on the same call as the coffin.",
  },
];
