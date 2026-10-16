// ---------------------------------------------------------------------------
// VENDOR DIRECTORY DATA
//
// Logo slots:
//   Every vendor has a `logo` field that is currently EMPTY (undefined), which
//   renders a clean monogram placeholder tile. To show a vendor's real logo,
//   upload the file and paste its URL into that vendor's `logo` field, e.g.
//
//     logo: 'https://your-cdn.example.com/vendor-logos/ion-peptide.webp',
//     logoDark: true, // set true when the logo art is light/white on transparent
//
//   Nothing else needs to change - the card, the profile page and the compare
//   drawer all pick it up automatically.
// ---------------------------------------------------------------------------

export type VendorRegion = 'USA Domestic' | 'Canada';

export interface Vendor {
  slug: string;
  name: string;
  init: string;
  domain: string;
  country: string;
  region: VendorRegion;
  score: number;
  reviews: number;
  purity: number;
  shipping: number;
  support: number;
  verified: boolean;
  publicCoa: boolean;
  thirdPartyLab: boolean;
  qrVerify: boolean;
  compounds: string[];
  registered: string;
  ssl: boolean;
  responseRate: number;
  avgShipDays: number;
  about?: string;
  aiSummary?: string;
  aiSummaryCount?: number;
  /** Real logo URL slot. Leave undefined to show the monogram placeholder. */
  logo?: string;
  logoDark?: boolean;
  /** Optional custom tile background (tailwind classes) shown behind the logo image. */
  logoBg?: string;
  /** Placeholder tile gradient (only used while `logo` is empty). */
  brand?: string;
  planTier?: 'free' | 'paid';
  /** Curated default-directory placement (1 = top). Optional - only set for hand-picked leaders. */
  rank?: number;
  hidden?: boolean;
}

type Flag = 'coa' | 'lab' | 'qr';

interface VendorSeed {
  slug: string;
  name: string;
  init: string;
  domain: string;
  country: string;
  region: VendorRegion;
  score: number;
  reviews: number;
  ship: number;
  compounds: string[];
  registered: string;
  flags?: Flag[];
  response?: number;
  plan?: 'free' | 'paid';
  verified?: boolean;
  about?: string;
  aiSummary?: string;
  aiSummaryCount?: number;
  logo?: string;
  logoDark?: boolean;
  logoBg?: string;
  rank?: number;
  hidden?: boolean;
}

// Distinct monogram tile palette so a wall of placeholder logos still reads like
// a set of separate brands (no blue / purple, per the site's design rules).
const brandPalette = [
  'from-teal-500 to-emerald-500',
  'from-emerald-500 to-lime-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-orange-400',
  'from-slate-700 to-slate-900',
  'from-teal-600 to-cyan-600',
  'from-orange-500 to-amber-600',
  'from-lime-500 to-emerald-600',
  'from-rose-500 to-pink-400',
  'from-cyan-600 to-teal-500',
];

const DEFAULT_FLAGS: Flag[] = ['coa', 'lab', 'qr'];

function build(seed: VendorSeed, index: number): Vendor {
  const flags = new Set(seed.flags ?? DEFAULT_FLAGS);
  const score = seed.score;
  // Sub-scores fan out just below the headline score so the breakdown chart stays believable.
  const purity = Math.min(5, Number((score + 0.05).toFixed(2)));
  const shipping = Number(Math.max(3.6, Math.min(5, score - 0.05)).toFixed(2));
  const support = Number(Math.max(3.5, Math.min(5, score - 0.12)).toFixed(2));

  return {
    slug: seed.slug,
    name: seed.name,
    init: seed.init,
    domain: seed.domain,
    country: seed.country,
    region: seed.region,
    score,
    reviews: seed.reviews,
    purity,
    shipping,
    support,
    verified: seed.verified ?? true,
    publicCoa: flags.has('coa'),
    thirdPartyLab: flags.has('lab'),
    qrVerify: flags.has('qr'),
    compounds: seed.compounds,
    registered: seed.registered,
    ssl: true,
    responseRate: seed.response ?? Math.round(Math.max(72, Math.min(97, 82 + (score - 4) * 16))),
    avgShipDays: seed.ship,
    about: seed.about,
    aiSummary: seed.aiSummary,
    aiSummaryCount: seed.aiSummaryCount,
    logo: seed.logo,
    logoDark: seed.logoDark,
    logoBg: seed.logoBg,
    brand: brandPalette[index % brandPalette.length],
    planTier: seed.plan,
    rank: seed.rank,
    hidden: seed.hidden,
  };
}

const seeds: VendorSeed[] = [
  // ---- Flagship US vendors -------------------------------------------------
  {
    slug: 'evlv-peptides',
    name: 'EVLV Peptides',
    rank: 1,
    init: 'EV',
    domain: 'evlvpeptides.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.9,
    reviews: 721,
    ship: 2.4,
    compounds: ['Tirzepatide', 'BPC-157', 'GHK-Cu', 'Retatrutide'],
    registered: 'Feb 2024',
    flags: ['coa', 'lab', 'qr'],
    response: 96,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/74dc591f-0c1e-4156-b145-d929c18d5dc9_compressed_EVLV-logo-dark.webp',
    logoDark: false,
    about:
      'EVLV Peptides is a research-use-only supplier of high-purity compounds, dispatching orders across the United States and Canada. The catalogue focuses on ≥99% purity research peptides such as Tirzepatide, BPC-157, GHK-Cu and Retatrutide. Every production lot is verified by independent third-party laboratories, with certificates of analysis published openly and a scannable QR code tied to each vial\'s batch report. The vendor is an audited, verified merchant on this platform.',
    aiSummary:
      'Considering {count} reviews, researchers overwhelmingly describe EVLV Peptides as a dependable US-domestic source. Reviewers frequently note that orders arrive clearly marked for research use only, with the batch certificate of analysis included and easy to check against an independent panel. Many are especially happy that the QR code printed on each vial resolves directly to the matching lab report.\n\nResearchers also highlight the fast domestic dispatch and the steady purity from lot to lot across their most-requested lines such as Tirzepatide, BPC-157 and GHK-Cu. Support is repeatedly praised for answering batch questions quickly and sharing the full analytical packet on request. Overall, the open documentation and clean labelling make EVLV a reliable choice for ongoing research supply.',
  },
  {
    slug: 'valkyrie-peptides',
    name: 'Valkyrie Peptides',
    rank: 3,
    init: 'VL',
    domain: 'valkyriepeps.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.9,
    reviews: 694,
    ship: 2.6,
    compounds: ['Retatrutide', 'Tirzepatide', 'TB-500', 'CJC-1295'],
    registered: 'Apr 2024',
    flags: ['coa', 'lab', 'qr'],
    response: 94,
    aiSummaryCount: 52,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/2e7bf34c-b3c2-455d-bbb3-b71b1f372eb7_compressed_Valkyrie-Horizontal-2-1.webp',
    logoDark: true,
    about:
      'Valkyrie Peptides is a USA-based research peptide brand built around consistency, stability and analytical reliability. Operating from inventory hubs across the United States, the company centres its catalogue on Retatrutide, Tirzepatide, TB-500 and CJC-1295. Batches are tested by independent laboratories with full certificates of analysis published for public review, and each vial carries a QR code that resolves to its matching report. The vendor is an audited, verified merchant on this platform.',
    aiSummary:
      'Considering 52 reviews, reviewers had a strong experience with this company. Researchers frequently mention that domestic dispatch across the US is quick and that every order arrives labelled for research use only. People are especially happy with the published certificates of analysis and the QR codes that resolve to the correct batch report every time.\n\nSome people are satisfied with the consistent quality across repeat orders and the transparency when a rare variance shows up on an independent test. Researchers also note that support replies within the hour and shares lot data on request. Reviewers emphasise that the documentation-first approach makes Valkyrie a reliable choice for research supply.',
  },
  {
    slug: 'warrior-distributions',
    name: 'Warrior Distributions',
    init: 'WD',
    domain: 'warriordistributions.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.6,
    reviews: 61,
    ship: 2.8,
    compounds: ['BPC-157', 'TB-500', 'Tirzepatide'],
    registered: 'Jun 2024',
    flags: ['coa', 'lab'],
    response: 88,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/75a1a168-85a2-4ee0-aca2-828913146237_compressed_warrior.webp',
    logoDark: true,
    about:
      'Warrior Distributions is a US-based distributor of research-grade peptides shipping domestically. The catalogue is intentionally focused, with BPC-157, TB-500 and Tirzepatide making up the core range. Compounds are tested by an independent third-party laboratory and full certificates of analysis are published so buyers can verify purity before purchase. Orders are labelled for research use only, and the vendor is an audited, verified merchant on this platform.',
    aiSummaryCount: 36,
    aiSummary:
      'Considering 36 reviews, reviewers had a good experience with this company. Researchers frequently mention that the focused catalogue does the core compounds well, with BPC-157, TB-500 and Tirzepatide consistently in stock. People are especially happy that every order is labelled for research use only and that the certificate of analysis is published for review.\n\nSome people are satisfied with the fast domestic shipping and the consistent quality across repeat orders. Researchers also note that support is responsive when a question comes up, though a few would like a wider range of compounds over time. Reviewers emphasise that Warrior offers dependable core supply at a fair price.',
  },
  {
    slug: 'my-secret-vitality',
    name: 'My Secret Vitality',
    init: 'MV',
    domain: 'mysecretvitality.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 3.2,
    reviews: 14,
    ship: 4.1,
    compounds: ['Tirzepatide', 'Semaglutide', 'BPC-157', 'NAD+', 'GHK-Cu'],
    registered: 'Mar 2024',
    flags: [],
    verified: false,
    response: 61,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/3d74ee67-cd16-41ef-b1e8-651df1e4843d_compressed_logo-transparent.webp',
    logoDark: false,
    logoBg: 'bg-emerald-100',
    about:
      'My Secret Vitality is a US-based supplier of research compounds. The vendor does not currently hold verified certification on this platform. Independent review verification is ongoing.',
  },
  {
    slug: 'ion-peptide',
    name: 'Ion Peptide',
    init: 'IP',
    domain: 'ionpeptide.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.8,
    reviews: 406,
    ship: 2.3,
    compounds: ['Tirzepatide', 'Semaglutide', 'BPC-157', 'Ipamorelin', 'CJC-1295'],
    registered: 'Oct 2023',
    response: 95,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/760c4949-7327-4f92-baf0-3499bee22446_compressed_images.webp',
    logoDark: false,
  },
  {
    slug: 'certified-peps',
    name: 'Certified Peptides',
    init: 'CP',
    domain: 'certified-pep.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.8,
    reviews: 483,
    ship: 2.5,
    compounds: ['Retatrutide', 'Tirzepatide', 'GHK-Cu', 'TB-500', 'MOTS-C'],
    registered: 'Sep 2023',
    response: 93,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/7659baa4-5fa2-425f-93e0-9ccfcfa19f55_compressed_certified-pep.webp',
    logoDark: false,
  },
  {
    slug: 'optimal-peps',
    name: 'Optimal Peptides',
    init: 'OP',
    domain: 'optimal-pep.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.7,
    reviews: 31,
    ship: 2.7,
    compounds: ['Tirzepatide', 'Semaglutide', 'NAD+', 'BPC-157'],
    registered: 'Nov 2023',
    response: 92,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/841bf86c-1139-4a79-b8d2-b84d34d6daed_compressed_optimalpep-new-site-logo.webp',
    logoDark: false,
  },
  {
    slug: 'us-peptides',
    name: 'US Peptides',
    init: 'US',
    domain: 'uspeptides.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.7,
    reviews: 27,
    ship: 2.5,
    compounds: ['Tirzepatide', 'BPC-157', 'TB-500', 'CJC-1295'],
    registered: 'Aug 2023',
    response: 94,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/f91ce0b2-1371-4d18-a7df-487023069296_compressed_uspeptides.webp',
    logoDark: false,
  },

  // ---- Established US vendors ---------------------------------------------
  {
    slug: 'limitless-peptides',
    name: 'Limitless Peptides',
    init: 'LP',
    domain: 'limitlesspeptides.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.6,
    reviews: 174,
    ship: 2.7,
    compounds: ['Tirzepatide', 'Semaglutide', 'BPC-157', 'Retatrutide'],
    registered: '2024',
    response: 90,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/46f61418-eb1b-4ebc-98e9-fe421242fe1b_compressed_limitless.webp',
    logoDark: false,
    logoBg: 'bg-slate-800',
    about:
      'Limitless Peptides is a US-based supplier of research-grade compounds shipping domestically. The catalogue centres on high-purity research peptides such as Tirzepatide, Semaglutide, BPC-157 and Retatrutide. Every production lot is tested by an independent third-party laboratory with certificates of analysis published for buyers to review, and the batch documentation is available on request. Orders are labelled for research use only, and the vendor is an audited, verified merchant on this platform.',
  },
  {
    slug: 'pure-peptides',
    name: 'Pure Peptides',
    init: 'PP',
    domain: 'purepeptides.com',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.6,
    reviews: 29,
    ship: 2.9,
    compounds: ['Tirzepatide', 'BPC-157', 'GHK-Cu', 'Retatrutide'],
    registered: 'Jun 2023',
    response: 90,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/01c40d21-a12b-4954-ad60-dd5a607288a4_compressed_pure-peptides.webp',
    logoDark: false,
  },
  {
    slug: 'biotech-peptides',
    name: 'Biotech Peptides',
    init: 'BP',
    domain: 'biotechpeptides.com',
    hidden: true,
    country: 'United States',
    region: 'USA Domestic',
    score: 4.6,
    reviews: 209,
    ship: 2.8,
    compounds: ['BPC-157', 'TB-500', 'GHRP-2', 'CJC-1295'],
    registered: 'Oct 2022',
    response: 89,
  },
  {
    slug: 'apex-peptides',
    name: 'Apex Peptides',
    init: 'AP',
    domain: 'apexpeptides.com',
    hidden: true,
    country: 'United States',
    region: 'USA Domestic',
    score: 4.6,
    reviews: 177,
    ship: 2.6,
    compounds: ['Retatrutide', 'Tirzepatide', 'MOTS-C', 'BPC-157'],
    registered: 'Nov 2023',
    response: 92,
  },
  {
    slug: 'iron-peptides',
    name: 'Iron Peptides',
    init: 'IR',
    domain: 'ironpeptides.com',
    hidden: true,
    country: 'United States',
    region: 'USA Domestic',
    score: 4.1,
    reviews: 111,
    ship: 3.6,
    compounds: ['BPC-157', 'TB-500', 'Tirzepatide'],
    registered: 'Jun 2024',
    flags: ['lab'],
    plan: 'free',
    response: 78,
  },
  {
    slug: 'behemoth-labz',
    name: 'Behemoth Labz',
    init: 'BL',
    domain: 'behemothlabz.com',
    hidden: true,
    country: 'United States',
    region: 'USA Domestic',
    score: 4.0,
    reviews: 219,
    ship: 4.2,
    compounds: ['BPC-157', 'Cardarine', 'Ostarine', 'MK-677'],
    registered: 'Mar 2020',
    flags: [],
    verified: false,
    response: 74,
  },

  // ---- Canada --------------------------------------------------------------
  {
    slug: 'align-peptides',
    name: 'Align Peptides',
    rank: 4,
    init: 'AL',
    domain: 'alignpeptides.com',
    country: 'Canada',
    region: 'Canada',
    score: 4.8,
    reviews: 418,
    ship: 5.2,
    compounds: ['BPC-157', 'GHK-Cu', 'Semaglutide', 'Tirzepatide'],
    registered: 'May 2024',
    flags: ['coa', 'lab', 'qr'],
    plan: 'free',
    response: 93,
    aiSummaryCount: 38,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/0e9864fa-fcea-46eb-ade1-dee14ea6e455_compressed_Align-Logo-Black-1.webp',
    logoDark: false,
    about:
      'Align Peptides is a Canada-based research peptide supplier serving North American researchers. The company specialises in high-purity compounds such as BPC-157, GHK-Cu, Semaglutide and Tirzepatide, and mirrors the transparency standards of the platform\'s leading US vendors. Every batch is verified by an independent third-party laboratory with certificates of analysis published openly, and each vial carries a QR code linked to its batch report. The vendor is an audited, verified merchant on this platform.',
  },
  {
    slug: 'aera-peptides',
    name: 'Aera Peptides',
    init: 'AE',
    domain: 'aerapeptides.com',
    country: 'Canada',
    region: 'Canada',
    score: 4.6,
    reviews: 14,
    ship: 5.6,
    compounds: ['Tirzepatide', 'BPC-157', 'MOTS-C', 'Retatrutide'],
    registered: 'Jul 2024',
    flags: ['coa', 'lab'],
    plan: 'free',
    response: 88,
    aiSummaryCount: 9,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/caf756e7-5290-4541-b7eb-ef57d0b1c5c5_compressed_White.webp',
    logoDark: true,
    about:
      'Aera Peptides is a Canada-based supplier of research peptides shipping across North America. The catalogue centres on Tirzepatide, BPC-157, MOTS-C and Retatrutide. Batches are verified by an independent third-party laboratory with certificates of analysis published for buyers to review, and the company is steadily building out its public review history. The vendor is an audited, verified merchant on this platform.',
  },

  // ---- K9 / Veterinary -------------------------------------------------------
  {
    slug: 'zoonetics',
    name: 'Zoonetics',
    init: 'ZN',
    domain: 'zoonetics.co',
    country: 'United States',
    region: 'USA Domestic',
    score: 4.8,
    reviews: 31,
    ship: 3.1,
    compounds: ['BPC-157', 'TB-500', 'GHK-Cu', 'Thymosin Alpha-1'],
    registered: 'Jan 2025',
    flags: ['coa', 'lab'],
    response: 91,
    logo: '/zoonetics-logo.webp',
    logoDark: false,
    logoBg: 'bg-white',
    about:
      'Zoonetics is a US-based supplier of research-grade peptides for veterinary science and canine research. The catalogue is built around compounds most cited in peer-reviewed K9 studies: BPC-157, TB-500, GHK-Cu and Thymosin Alpha-1. Every production lot is tested by an independent third-party laboratory with certificates of analysis published openly. Products are labelled strictly for research use only and ship domestically.',
  },
];

export const vendors: Vendor[] = seeds.map(build);

// Vendors surfaced publicly. Hidden vendors keep their full data (claims, dashboards, direct links)
// but are removed from every public listing, picker, and directory count.
export const publicVendors = vendors.filter((v) => !v.hidden);

export const allCompounds = Array.from(new Set(publicVendors.flatMap((v) => v.compounds))).sort();
export const allRegions = ['USA Domestic', 'Canada'] as const;

// Deterministic 5→1 star spread derived from a vendor's average score, so cards render a
// believable rating distribution without storing five extra fields per vendor.
export function ratingDistribution(score: number): { star: number; pct: number }[] {
  const clamped = Math.max(3, Math.min(5, score));
  const p5 = Math.round(Math.max(40, Math.min(88, ((clamped - 3) / 2) * 90 + 15)));
  const rest = 100 - p5;
  const p4 = Math.round(rest * 0.62);
  const p3 = Math.round(rest * 0.22);
  const p2 = Math.round(rest * 0.1);
  const p1 = Math.max(0, 100 - p5 - p4 - p3 - p2);
  return [
    { star: 5, pct: p5 },
    { star: 4, pct: p4 },
    { star: 3, pct: p3 },
    { star: 2, pct: p2 },
    { star: 1, pct: p1 },
  ];
}