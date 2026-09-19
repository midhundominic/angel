/**
 * Keyword targets for Heaven Funeral Services.
 *
 * These were chosen around how people in Wayanad actually search — in English
 * and in transliterated Malayalam — rather than around funeral-industry jargon.
 * Terms like "decedent transport" or "mortuary transport" are American trade
 * language with effectively zero search volume in Kerala; "dead body freezer
 * box", "hearse van", "coffin shop" and "ambulance for dead body" are what gets
 * typed into a phone at 2am.
 *
 * Every term listed here should also appear in visible page copy somewhere —
 * the meta keywords tag alone carries no weight with Google.
 *
 * The two commercial lines are kept distinct throughout: coffins are *sold*,
 * mortuary freezer boxes are *rented*. People search them differently ("coffin
 * price", "buy coffin" vs "freezer box rent", "freezer box on rent per day"),
 * and collapsing both into one vague "coffins and freezer boxes" phrase loses
 * the rental queries entirely.
 */

/** The handful of terms the site is built to win. Used in the homepage metadata. */
export const primaryKeywords = [
  "funeral services Wayanad",
  "Christian funeral services Wayanad",
  "funeral services Payyampally",
  "funeral services Chennalode",
  "funeral services Mananthavady",
  "funeral services Kalpetta",
  "dead body freezer box Wayanad",
  "mortuary freezer box rent Wayanad",
  "mortuary freezer box on rent Wayanad",
  "freezer box rent Wayanad",
  "hearse van Wayanad",
  "dead body transport Wayanad",
  "coffin shop Wayanad",
  "coffins for sale Wayanad",
  "buy coffin Wayanad",
  "ambulance for dead body Wayanad",
  "long distance dead body transport Kerala",
  "24 hour funeral service Wayanad",
];

/**
 * Christian funeral arrangements are the core of the business — coffins,
 * processional crosses, and coordination with the parish and cemetery. These
 * terms carry real local intent and had no coverage on the site at all.
 */
export const christianFuneralKeywords = [
  "Christian funeral service Kerala",
  "Christian funeral arrangements Wayanad",
  "Christian funeral Mananthavady",
  "Christian funeral Kalpetta",
  "Catholic funeral services Wayanad",
  "church funeral arrangements Wayanad",
  "Christian coffin shop Wayanad",
  "Christian coffins for sale Wayanad",
  "coffin for Christian funeral Kerala",
  "processional cross and coffin Wayanad",
  "parish funeral coordination Wayanad",
];

/** Broader supporting terms — these live in section copy and the FAQ. */
export const secondaryKeywords = [
  "funeral service near me Wayanad",
  "freezer box for dead body Kerala",
  "dead body carrier vehicle Kerala",
  "coffin box Mananthavady",
  "coffin price Wayanad",
  "coffin shop near me Wayanad",
  "wooden coffin for sale Kerala",
  "decorated coffin for sale Wayanad",
  "dead body freezer box rent Kerala",
  "freezer box on rent per day Wayanad",
  "freezer box rent Kalpetta",
  "freezer box rent Mananthavady",
  "funeral arrangements Wayanad",
  "burial arrangements Wayanad",
  "dead body freezer box Kalpetta",
  "dead body freezer box Sulthan Bathery",
  "funeral services Panamaram",
  "funeral services Kattikulam",
  "funeral services Thalappuzha",
  "funeral services Vellamunda",
  "funeral services Thirunelli",
  "funeral services Vythiri",
  "funeral services Meppadi",
  "funeral services Muttil",
  "funeral services Sulthan Bathery",
  "funeral services Meenangadi",
  "funeral services Ambalavayal",
  "funeral services Pulpally",
  "dead body transport Kannur",
  "dead body transport Kozhikode",
  "dead body transport Bangalore to Kerala",
  "mruthadeham vahanam Wayanad",
  "freezer box Wayanad",
  "funeral home Wayanad",
];

export const allKeywords = [
  ...primaryKeywords,
  ...christianFuneralKeywords,
  ...secondaryKeywords,
];
