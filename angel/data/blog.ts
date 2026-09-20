/**
 * Blog content for /blogs and /blogs/[slug].
 *
 * Two kinds of post live here, deliberately mixed: plain guides answering what
 * families actually type into a phone ("freezer box rent", "how to choose a
 * coffin", "bringing a body home from Bengaluru"), and accounts of the work
 * itself at the parishes we serve. Both carry the same keyword targets as the
 * rest of the site (see data/seo.ts) in ordinary sentences rather than stuffed
 * phrases, because that is the only form of it Google still rewards.
 *
 * Nothing here names a family or a specific funeral. The photographs are our
 * own vehicles and shops; the accounts describe how the work runs in general,
 * which is both truthful and more useful to someone reading at 2am.
 *
 * TODO(owner): `date` is the publication date shown on the card and emitted as
 * `datePublished` in the BlogPosting schema. Adjust these to the dates you
 * actually publish, and add new posts to the top of the array.
 */

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  callout?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Used in <title>. Kept under ~60 chars where possible. */
  metaTitle: string;
  /** The meta description. 140–165 characters, written to be clicked. */
  description: string;
  /** Card copy on the index. Can be longer and warmer than the meta description. */
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  /** `portrait` marks a tall original — the article masthead letterboxes those
   *  rather than slicing a thin band out of the middle. */
  cover: { src: string; alt: string; portrait?: boolean };
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "first-hour-after-a-death-at-home-wayanad",
    title: "The first hour after a death at home: what to do in Wayanad",
    metaTitle: "First Hour After a Death at Home in Wayanad",
    description:
      "A plain, practical guide to the first hour after a death at home in Wayanad — who to call, what the hospital needs, and how a freezer box and hearse van are arranged.",
    excerpt:
      "Nobody is ready for it, and almost nobody knows the order things happen in. Here is what the first hour actually looks like, and the three or four calls that matter.",
    category: "Guides",
    date: "2026-09-12",
    readingMinutes: 6,
    keywords: [
      "funeral services Wayanad",
      "dead body freezer box Wayanad",
      "24 hour funeral service Wayanad",
      "funeral services near me Wayanad",
    ],
    cover: {
      src: "/images/blog/funeral-ceremony.jpeg",
      alt: "Heaven Funeral Services hearse van parked outside a parish church in Wayanad during a funeral service",
    },
    sections: [
      {
        paragraphs: [
          "When someone dies at home, the house fills with people within twenty minutes and almost none of them, including the family, knows what has to happen first. There is no single correct order, but there is a sensible one, and knowing it takes a great deal of pressure off the two or three people who end up carrying the arrangements.",
          "This is written for Wayanad in particular — for a house in Payyampally or Vellamunda or Meppadi, where the parish is close, the hospital may not be, and the relatives who have to travel are coming from Bengaluru or the Gulf.",
        ],
      },
      {
        heading: "1. Get the death certified before anything else",
        paragraphs: [
          "If the death was expected and a doctor had been treating the person, call that doctor or the nearest hospital. A medical certification of the cause of death is what every later step depends on — the burial permission from the panchayat, the registration of the death, and any travel outside the district.",
          "If the death was sudden, unattended, or in any way unclear, the police have to be informed and the body goes for a post-mortem. Do not move the body in that situation, and do not let anyone else move it either. It is a hard thing to insist on in a full house, but it saves the family a serious problem later.",
        ],
      },
      {
        heading: "2. Call the parish",
        paragraphs: [
          "The priest sets the time of the funeral, and once that time is set, everything else is planned backwards from it. The parish office will also tell you what the cemetery needs and whether there is another service already fixed for that day.",
          "Get the time in writing on somebody's phone. Half the confusion in the days that follow comes from four relatives each remembering a slightly different hour.",
        ],
      },
      {
        heading: "3. Call us, and say three things",
        paragraphs: [
          "When you reach us, you do not need to have decided anything. Tell us the location of the house, the hour the priest has set, and roughly the height and build of the person. That is enough for us to move.",
        ],
        list: [
          "The location — a landmark and a panchayat is enough, we know the roads.",
          "The hour the priest has set, or that it is not yet fixed.",
          "Whether the body is at the house, at a hospital, or at a mortuary.",
          "Whether relatives are travelling and how long the body needs to be kept.",
        ],
      },
      {
        heading: "4. The freezer box, if people are travelling",
        paragraphs: [
          "This is the decision that most often gets made too late. If a son is flying from the Gulf or a daughter is driving from Bengaluru, the body has to be kept, and a mobile mortuary freezer box is how that is done at home rather than at a hospital mortuary.",
          "We bring the unit to the house or the parish hall, set it up, and collect it once the rites are done. It runs off an ordinary domestic connection. It is charged by the day with no minimum hire, so nobody is committed to more than the family turns out to need. Tell us on the first call that people are travelling, even if you cannot yet say when they land.",
        ],
        callout:
          "If relatives are travelling, ask for the freezer box on the first call. Adding it later is possible, but it means a second journey and an hour the family may not have.",
      },
      {
        heading: "5. Let the arrangements come to the house",
        paragraphs: [
          "The coffin, the processional cross, the candles, and the floral work all come out from the shop together. One person from the family can come to Payyampally or Chennalode to choose the coffin if they wish, and most do — but if nobody can be spared, we will send photographs of what is on the floor over WhatsApp and bring what is chosen.",
          "The hearse van then carries the coffin from the house to the church, and on to the burial ground afterwards. The same team that took your call does the journey. Nothing is passed to a contractor.",
        ],
      },
      {
        heading: "What you do not have to do in the first hour",
        paragraphs: [
          "You do not have to settle the cost, decide the coffin, or work out the paperwork for a journey out of state. Those all have time. What has to happen in the first hour is the certification, the call to the parish, and the call that starts the arrangements moving.",
          "Our lines are answered at every hour of every day, including Sundays and festival days. There is no wrong time to ring, and there is no question too small to ask.",
        ],
      },
    ],
  },
  {
    slug: "parish-funeral-support-payyampally",
    title: "Working alongside the parish: a church funeral at Payyampally",
    metaTitle: "Church Funeral Support at Payyampally, Wayanad",
    description:
      "How a Christian funeral runs at a Wayanad parish — coffin, processional cross, hearse van, and the timings we settle directly with the priest so the family does not have to.",
    excerpt:
      "The work that families notice least is the coordination with the parish. Here is what happens between the first call and the coffin reaching the church door.",
    category: "Our work",
    date: "2026-08-28",
    readingMinutes: 5,
    keywords: [
      "Christian funeral services Wayanad",
      "funeral services Payyampally",
      "parish funeral coordination Wayanad",
      "Christian coffin shop Wayanad",
    ],
    cover: {
      src: "/images/blog/funeralservices_payyampally.jpeg",
      alt: "Heaven Funeral Services hearse van waiting outside a church at Payyampally, Mananthavady, Wayanad",
      portrait: true,
    },
    sections: [
      {
        paragraphs: [
          "Christian funeral arrangements are the core of what we do, and the Payyampally shop sits close enough to the northern parishes that we are often at the church before the family has finished making calls. What follows is how one of these mornings actually runs.",
        ],
      },
      {
        heading: "The timings are settled with the priest, not guessed",
        paragraphs: [
          "Once the parish sets the hour, we speak to the parish office ourselves. That one call decides everything downstream: when the coffin has to reach the house, when the body is moved, when the hearse leaves, and how long the cortege needs on the road.",
          "It matters because a church has its own day. There may be a Mass before, a second service after, or a cemetery that has to be opened. A family trying to hold all of that together on the phone, on the worst day of their lives, is a family being failed by whoever is arranging the funeral.",
        ],
      },
      {
        heading: "What goes out from the shop",
        list: [
          "The coffin, lined and fitted, with the lid cross the family chose.",
          "The processional cross that leads the coffin into the church.",
          "Candle stands and the candles for the house and the church.",
          "Floral work for the coffin and for the vehicle.",
          "A mortuary freezer box, where the body is resting at home until the service.",
        ],
        paragraphs: [
          "All of it travels together. One vehicle, one arrival at the house, one team carrying it in — rather than four separate deliveries through a doorway that already has fifty people standing in it.",
        ],
      },
      {
        heading: "At the church",
        paragraphs: [
          "The hearse is brought to the door and positioned so the pallbearers have a clean lift and the family a clear path behind the coffin. Our men stay back once the coffin is on shoulders; that part belongs to the family and to the parish, and we are there to make it possible, not to be part of it.",
          "Afterwards the vehicle goes on to the burial ground. If the cemetery is at another parish, or the family ground is up a road that a full-sized hearse cannot take, that is worked out beforehand rather than discovered on the day.",
        ],
        callout:
          "From the Payyampally shop we reach Mananthavady, Panamaram, Thalappuzha, Vellamunda, Kattikulam, Thirunelli and the northern panchayats, usually within the hour.",
      },
      {
        heading: "Every denomination, and every faith",
        paragraphs: [
          "We work with Catholic, Orthodox, Marthoma, CSI and Pentecostal parishes across the district, and the arrangements shift with each — the cross, the vestments, the order at the graveside. We ask rather than assume.",
          "Families of other faiths call us just as often, for the hearse van, the freezer box, and the transport. The care is the same. The arrangements are whatever that family's rites require.",
        ],
      },
    ],
  },
  {
    slug: "hearse-van-service-wayanad-churches",
    title: "Hearse van service to Wayanad's hill parishes",
    metaTitle: "Hearse Van Service for Wayanad Churches",
    description:
      "Enclosed hearse vans from Payyampally and Chennalode, reaching hill parishes and narrow estate roads across Wayanad. Company-owned vehicles, nothing subcontracted.",
    excerpt:
      "A hearse that cannot get up the road is no hearse at all. On the vehicles we run, why they are the size they are, and how the route is planned before the day.",
    category: "Our work",
    date: "2026-08-14",
    readingMinutes: 5,
    keywords: [
      "hearse van Wayanad",
      "dead body transport Wayanad",
      "ambulance for dead body Wayanad",
      "dead body carrier vehicle Kerala",
    ],
    cover: {
      src: "/images/blog/funeralservices_ondayagady.jpeg",
      alt: "White Heaven Funeral Services hearse van with ceremonial umbrellas outside a hill church in Wayanad",
      portrait: true,
    },
    sections: [
      {
        paragraphs: [
          "Wayanad's parishes sit where the people sit — on ridges, at the end of estate roads, up gradients that a long wheelbase simply will not take in the monsoon. A hearse that looks impressive on a highway and cannot reach the church door is of no use to anyone.",
          "That single fact shaped the vehicles we run.",
        ],
      },
      {
        heading: "Built to reach the church, not to look good on a highway",
        paragraphs: [
          "Our hearses are compact, enclosed, and high-glazed — small enough for a hill road and a narrow parish compound, tall enough inside for the coffin to be carried level. The cabin is fully enclosed and curtained, so the body is private from the moment it is loaded until the moment it is carried out.",
          "They are our own vehicles, maintained by us and driven by our own people. Nothing is subcontracted to an outside operator. The team that answers your call is the team that arrives.",
        ],
      },
      {
        heading: "The route is worked out beforehand",
        list: [
          "Where the body is now — house, hospital, or mortuary.",
          "Where the service is, and the state of the last kilometre of road.",
          "Whether the cemetery is at the same parish or another.",
          "Where the cortege will form, and where the vehicle can turn.",
        ],
        paragraphs: [
          "Four questions, asked on the phone the day before wherever there is a day before. It is not complicated work, but skipping it is how a hearse ends up reversing three hundred metres down a wet estate road with a church full of people waiting.",
        ],
      },
      {
        heading: "Decoration, where the family wants it",
        paragraphs: [
          "The ceremonial umbrellas, the floral work along the vehicle, the cross at the front — these are arranged for the family who want them and left off for the family who do not. Neither is more correct. We ask, and we do what is asked.",
        ],
        callout:
          "Two shops, two dispatch points: Payyampally for north Wayanad, Chennalode for Kalpetta, Vythiri, Meppadi and the south. A vehicle is usually with you within the hour.",
      },
      {
        heading: "Beyond the district",
        paragraphs: [
          "The same vehicles cross regularly into the Kannur and Kozhikode border areas — Iritty, Kelakam, Peravoor, Thalassery, Thamarassery — and go on to Karnataka and Tamil Nadu when the journey calls for it. Long-distance work is planned differently, and there is a separate post on how that runs.",
        ],
      },
    ],
  },
  {
    slug: "mortuary-freezer-box-on-rent-wayanad",
    title: "Renting a mortuary freezer box in Wayanad: what to expect",
    metaTitle: "Mortuary Freezer Box on Rent in Wayanad",
    description:
      "Mobile dead body freezer boxes on rent across Wayanad — delivered, installed and collected by our team, charged by the day with no minimum hire. What to expect, step by step.",
    excerpt:
      "The question we are asked most often at two in the morning. What a freezer box is, how it is set up in an ordinary house, and what it costs to keep.",
    category: "Guides",
    date: "2026-07-30",
    readingMinutes: 6,
    keywords: [
      "mortuary freezer box rent Wayanad",
      "dead body freezer box Wayanad",
      "freezer box rent Kalpetta",
      "freezer box on rent per day Wayanad",
      "freezer box rent Mananthavady",
    ],
    cover: {
      src: "/images/freezer/heaven_freezer.jpeg",
      alt: "Steel and gold-finished mortuary freezer boxes on rent at the Heaven Funeral Services showroom in Wayanad",
    },
    sections: [
      {
        paragraphs: [
          "A mortuary freezer box lets the body rest at home, in the family's own house, until everyone who needs to be there has arrived. Before these units were commonly available in Wayanad, the alternative was a hospital mortuary — a journey, a fee, and a body kept somewhere the family could not sit with it.",
          "Almost every family we serve now takes one. Here is exactly what it involves.",
        ],
      },
      {
        heading: "What the unit is",
        paragraphs: [
          "A rectangular refrigerated casing in stainless steel, with a curved transparent lid so the face stays visible throughout. The body lies on a flat tray at normal viewing height. Mourners can stand beside it as they would beside an open coffin; nothing about the unit asks them to keep a distance.",
          "It runs on an ordinary single-phase domestic supply. No special wiring, no generator, and it draws about as much as a household refrigerator.",
        ],
      },
      {
        heading: "Getting one to the house",
        list: [
          "Call any of our dispatch numbers and give the location — a landmark and a panchayat is enough.",
          "We confirm availability on that call. Both shops hold units.",
          "The unit is delivered and carried in by our team, not left at the gate.",
          "It is levelled, connected, brought down to temperature, and checked before we leave.",
          "We collect it once the rites are done, at whatever hour that turns out to be.",
        ],
      },
      {
        heading: "Where it can be set up",
        paragraphs: [
          "Most often in the front room of the house, which is where the body would be laid in any case. We also set them up in parish halls, at hospitals, and in community halls where the family home is too small for the numbers expected.",
          "What we need is a doorway wide enough, a flat floor, and a plug point within reach. Our team will tell you on arrival if the room chosen will not work and will suggest the one that will.",
        ],
        callout:
          "Charged by the day, with no minimum hire. If relatives land a day earlier than expected, you pay for a day less. Delivery, setup and collection are part of the hire.",
      },
      {
        heading: "How long a body can be kept",
        paragraphs: [
          "Comfortably for several days, which is what the great majority of families need — long enough for a son to fly in from the Gulf, or for relatives to drive up from Bengaluru or Chennai. For anything longer, tell us on the first call and we will advise honestly about what the unit will and will not do.",
          "If the body has come from a post-mortem, say so when you call. It changes nothing about the hire, but it is worth our team knowing before they arrive.",
        ],
      },
      {
        heading: "Arranging it with everything else",
        paragraphs: [
          "The freezer box goes on the same call as the coffin and the hearse. One arrangement, one team, one figure quoted before anything moves. We would rather you made one phone call on a day like that than four.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-coffin-wayanad",
    title: "How to choose a coffin: a plain guide for families",
    metaTitle: "How to Choose a Coffin in Wayanad",
    description:
      "Wood, finish, size, viewing panel, cost — a plain guide to choosing a coffin in Wayanad, written for families making the decision in a hurry and for the first time.",
    excerpt:
      "Most people choose a coffin once in their lives, under pressure, in a room full of them. Four decisions are all it really comes down to.",
    category: "Guides",
    date: "2026-07-18",
    readingMinutes: 5,
    keywords: [
      "coffin shop Wayanad",
      "coffins for sale Wayanad",
      "buy coffin Wayanad",
      "coffin price Wayanad",
      "coffin box Mananthavady",
    ],
    cover: {
      src: "/images/coffins/coffin_box.png",
      alt: "Open walnut casket with a tufted cream satin interior and chrome swing-bar handles, sold in Wayanad",
    },
    sections: [
      {
        paragraphs: [
          "Walking into a room of coffins is a strange experience, and nobody arrives at it prepared. Families often stand there for a long time because they are afraid of choosing wrongly — as though there were a wrong choice.",
          "There is not. But there are four decisions, and taking them in order makes the whole thing far shorter and far calmer.",
        ],
      },
      {
        heading: "1. The measurement",
        paragraphs: [
          "Height and build. That is the whole of it, and it is the one thing that genuinely constrains the choice, so it comes first. Tell us on the phone and we will tell you which sizes are on the floor at Payyampally and at Chennalode before anyone travels.",
          "Compact and child sizes are held in stock. Oversize and extra-length can be made and delivered quickly — but only if we know early, so say it on the first call.",
        ],
      },
      {
        heading: "2. Open or closed",
        paragraphs: [
          "If the face is to remain visible while the body rests at the house, you want a coffin with a glass viewing panel at the head. The panel section lifts clear for the final rites.",
          "If the coffin will stay closed, that constraint disappears and the plain and carved ranges are both open to you. This decision is usually made by how the family wants the visitation to feel, and it is worth asking the eldest people in the house rather than deciding alone.",
        ],
      },
      {
        heading: "3. Wood, finish, ornament",
        list: [
          "Plain hardwood — clean lines, light polish, a cross on the lid. The most commonly chosen, and entirely appropriate for any parish funeral.",
          "Pale teak or natural finish — restrained, lighter to carry, sits well in a bright church.",
          "Deep-polished rosewood or mahogany — darker, heavier presence.",
          "Hand-carved — garland and vine work, the most workshop hours, the finest finish.",
        ],
        paragraphs: [
          "This is where cost mostly moves, and it is entirely the family's call. No range here is more respectful than another. A plain coffin carried by six people who loved the person is not a lesser funeral.",
        ],
      },
      {
        heading: "4. The fittings, which mostly come with it",
        paragraphs: [
          "The processional cross, the lining and pillow, the handles, the name plate, the candles and the floral work go out with the coffin. You are not assembling a funeral from separate parts; you are choosing a coffin and the rest follows it.",
        ],
        callout:
          "One person from the family can come and choose while everyone else stays at the house — that is what most families do. If nobody can be spared, we will send photographs of what is on the floor over WhatsApp.",
      },
      {
        heading: "On cost",
        paragraphs: [
          "We give a clear figure on the phone before anything is arranged, and nothing is added to it afterwards. No family should be working out on the day of a funeral what a bill is going to come to.",
          "If the figure for a range is more than the family can carry, say so plainly. There is always something appropriate at a different price, and being asked about it does not embarrass anyone here.",
        ],
      },
    ],
  },
  {
    slug: "long-distance-dead-body-transport-kerala",
    title: "Bringing someone home: long-distance transport to Wayanad",
    metaTitle: "Long Distance Dead Body Transport to Kerala",
    description:
      "Long-distance dead body transport from Bengaluru, Karnataka, Tamil Nadu and across Kerala to Wayanad — route, paperwork, and the family kept informed the whole way.",
    excerpt:
      "When a death happens far from home, the journey back becomes the funeral's first act. What that journey involves, and what has to be in order before it starts.",
    category: "Guides",
    date: "2026-06-26",
    readingMinutes: 6,
    keywords: [
      "long distance dead body transport Kerala",
      "dead body transport Bangalore to Kerala",
      "dead body transport Kannur",
      "dead body transport Kozhikode",
    ],
    cover: {
      src: "/images/gallery/web/heaven-vehicle-profile.jpg",
      alt: "Heaven Funeral Services hearse van in full side profile, used for long-distance dead body transport from Kerala",
    },
    sections: [
      {
        paragraphs: [
          "A great many Wayanad families have people working in Bengaluru, Mysuru, Coorg, Gudalur, Chennai and the Gulf. When a death happens there, the first thing the family wants is for the person to come home — and the distance between wanting that and arranging it is filled with paperwork nobody has seen before.",
          "We do this work regularly. This is what it involves.",
        ],
      },
      {
        heading: "What has to be in order before the vehicle moves",
        list: [
          "The medical certification of the cause of death, from the hospital or attending doctor.",
          "A no-objection or transit clearance from the local police where the death occurred, where the circumstances require it.",
          "Embalming, with its certificate, for any long journey — this is not optional and it is what makes the rest possible.",
          "Identification documents for the deceased and for the person accompanying the body.",
          "The death registration, which can often follow rather than precede the journey.",
        ],
        paragraphs: [
          "Some of this can be gathered while the vehicle is already on its way to collect. We will tell you honestly which items can wait and which genuinely cannot, so nobody spends a morning chasing a paper that was not needed yet.",
        ],
      },
      {
        heading: "The journey",
        paragraphs: [
          "Routes out of Bengaluru and Mysuru come down through Gundlupet and Muthanga, or through Kutta and Mananthavady depending on the hour and the forest gate timings — which close, and which have caught out many an unplanned journey. From Tamil Nadu we come through Gudalur. From the coast, up through Thamarassery or Kuttiady.",
          "Our own vehicle and our own driver make the journey. The body is enclosed and private throughout, and the vehicle stops only where it must.",
        ],
        callout:
          "One number to call, one person accountable for the whole journey. You will not be handed between operators at a district border.",
      },
      {
        heading: "The family is kept informed",
        paragraphs: [
          "Someone at home is always waiting, and the waiting is unbearable in silence. We give an honest estimate at the start, and we update as the journey goes — including when it slows down. A late arrival that was communicated is manageable. A late arrival that was not is cruel.",
          "Meanwhile the parish can be spoken to and the service provisionally set, so the family is not starting arrangements from zero at the moment the vehicle arrives.",
        ],
      },
      {
        heading: "At the other end",
        paragraphs: [
          "The vehicle comes to the house. A freezer box can be waiting there if the service is the following day, the coffin and the cross come out from the shop, and the funeral proceeds as it would have done had the death happened at home.",
          "That is the point of the whole exercise. Not the logistics — the fact that the person is home, and that the family gets to hold the funeral they would have held anyway.",
        ],
      },
    ],
  },
  {
    slug: "why-we-stay-open-24-hours",
    title: "Why the lights stay on: 24-hour funeral service in Wayanad",
    metaTitle: "24 Hour Funeral Service in Wayanad",
    description:
      "Both Heaven Funeral Services shops in Wayanad stay staffed 24 hours a day, every day. Why that matters at 2am, and what actually happens when you call at that hour.",
    excerpt:
      "Most deaths we are called to happen between midnight and dawn. That is not an accident of scheduling — it is simply when people die.",
    category: "Our work",
    date: "2026-06-10",
    readingMinutes: 4,
    keywords: [
      "24 hour funeral service Wayanad",
      "funeral services Chennalode",
      "funeral services Kalpetta",
      "funeral service near me Wayanad",
    ],
    cover: {
      src: "/images/blog/shop-with-van.jpeg",
      alt: "Heaven Funeral Services signboard lit at night beside the hearse van at the Chennalode shop in Wayanad",
      portrait: true,
    },
    sections: [
      {
        paragraphs: [
          "The photograph above was taken in the early hours, in the rain. The board is lit, the vehicle is loaded, and somebody is inside answering the phone. That is not staged for a website — it is simply what both shops look like at three in the morning, which is when a good deal of this work happens.",
        ],
      },
      {
        heading: "Deaths do not keep office hours",
        paragraphs: [
          "The largest share of the calls we take come between midnight and six. A long illness ends in the small hours; a hospital rings a family at four; somebody wakes at five and finds a parent gone. In every one of those cases the family's next few hours are decided by whether anybody picks up the phone.",
          "A number that rings out at 2am and is returned at 9am is not a 24-hour service. It is an answering machine with good intentions.",
        ],
      },
      {
        heading: "What happens when you call at that hour",
        list: [
          "A person answers — not a recording and not a callback request.",
          "We confirm what is available and what can move, on that call.",
          "A vehicle is dispatched from whichever shop is nearer, Payyampally or Chennalode.",
          "A freezer box is loaded at the same time, if relatives are travelling.",
          "You are given a plain figure before anything is arranged.",
        ],
      },
      {
        heading: "Two shops, so the hour is not spent on the road",
        paragraphs: [
          "One shop covering the whole of Wayanad would mean an hour's drive to the far end of the district in the middle of the night. Payyampally covers Mananthavady taluk and the north; Chennalode, just north of Kalpetta, covers Vythiri taluk, the centre and the south, and reaches on towards Sulthan Bathery.",
          "Between them, a vehicle is usually at the house within the hour from almost anywhere in the district — which is the whole reason for keeping two of everything.",
        ],
        callout:
          "Sundays, festival days, Christmas, Easter, the night of a local election — the lines are answered exactly the same way. There is no wrong hour to ring.",
      },
    ],
  },
];

export const blogCategories = ["All", "Guides", "Our work"];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Two other posts to show at the foot of an article. */
export function relatedPosts(slug: string, count = 2) {
  const current = getPost(slug);
  if (!current) return [];
  const others = blogPosts.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  return [...sameCategory, ...others.filter((post) => post.category !== current.category)]
    .slice(0, count);
}

export const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(iso: string) {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}
