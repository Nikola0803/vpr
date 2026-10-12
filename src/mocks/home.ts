export const statStrip = [
  { label: 'Reviews rescued from legacy platforms', value: '47,500', icon: 'ri-history-line', accent: 'text-teal-600' },
  { label: 'Independent vendors audited', value: '44', icon: 'ri-store-2-line', accent: 'text-cyan-600' },
  { label: 'HPLC COA batches on file', value: '1,240', icon: 'ri-file-shield-2-line', accent: 'text-emerald-600' },
  { label: 'Avg. verified compound purity', value: '99.4%', icon: 'ri-test-tube-line', accent: 'text-emerald-600' },
];

export const featureCards = [
  {
    icon: 'ri-shield-cross-line',
    tag: 'Anti-Censor Guarantee',
    title: 'Immune to arbitrary platform bans.',
    desc: 'Your reviews are cryptographically hashed and permanently archived. Trustpilot delistings and Reviews.io purges cannot touch your reputation here.',
    stat: '0 vendor delistings since 2023',
  },
  {
    icon: 'ri-test-tube-line',
    tag: 'HPLC Lab Integration',
    title: 'Bind third-party COAs to individual reviews.',
    desc: 'Upload PDF certificates of analysis, tag batch numbers, and let researchers verify purity claims directly from any review thread.',
    stat: '1,240 batches verified',
  },
  {
    icon: 'ri-flashlight-line',
    tag: 'Conversion Embeds',
    title: 'Lightning-fast widgets that never slow checkout.',
    desc: 'Async-loaded, <14KB gzipped JS widgets for WordPress, custom builds and any platform. Zero layout shift. Zero blocking scripts.',
    stat: 'Avg. +38% checkout trust lift',
  },
];

export const featuredVendors: {
  name: string;
  slug: string;
  country: string;
  score: number;
  reviews: number;
  tags: string[];
  verified: boolean;
  coa: boolean;
  logo?: string;
  logoDark?: boolean;
  hidden?: boolean;
}[] = [
  {
    name: 'EVLV Peptides',
    slug: 'evlv-peptides',
    country: 'USA · Domestic',
    score: 4.9,
    reviews: 712,
    tags: ['Tirzepatide', 'BPC-157', 'GHK-Cu'],
    verified: true,
    coa: true,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/74dc591f-0c1e-4156-b145-d929c18d5dc9_compressed_EVLV-logo-dark.webp',
    logoDark: false,
  },
  {
    name: 'Valkyrie Peptides',
    slug: 'valkyrie-peptides',
    country: 'USA · Domestic',
    score: 4.9,
    reviews: 688,
    tags: ['Retatrutide', 'Tirzepatide', 'TB-500'],
    verified: true,
    coa: true,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/2e7bf34c-b3c2-455d-bbb3-b71b1f372eb7_compressed_Valkyrie-Horizontal-2-1.webp',
    logoDark: true,
  },
  {
    name: 'Warrior Distributions',
    slug: 'warrior-distributions',
    country: 'USA · Domestic',
    score: 4.6,
    reviews: 301,
    tags: ['BPC-157', 'TB-500', 'Tirzepatide'],
    verified: true,
    coa: true,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/75a1a168-85a2-4ee0-aca2-828913146237_compressed_warrior.webp',
    logoDark: true,
  },
  {
    name: 'Align Peptides',
    slug: 'align-peptides',
    country: 'Canada',
    score: 4.8,
    reviews: 412,
    tags: ['BPC-157', 'GHK-Cu', 'Semaglutide'],
    verified: true,
    coa: true,
    logo: 'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/0e9864fa-fcea-46eb-ade1-dee14ea6e455_compressed_Align-Logo-Black-1.webp',
    logoDark: false,
  },
];

// Public surfaces hide vendors flagged as hidden (data stays intact, one-flip toggle).
export const visibleFeaturedVendors = featuredVendors.filter((v) => !v.hidden);

export const testimonialReviews = [
  {
    author: 'M*** R.',
    order: '#8291-A44F',
    hash: '0x9c4a…e12b',
    rating: 5,
    compound: 'BPC-157 · 5mg',
    body: 'Third order in six months. HPLC came back at 99.2% and matched the linked COA exactly. Reconstitution was crystal clear, and shipping landed in 48 hours with discreet packaging.',
    date: '2 days ago',
    vendor: 'EVLV Peptides',
  },
  {
    author: 'J*** K.',
    order: '#7742-B10C',
    hash: '0x2f81…a903',
    rating: 5,
    compound: 'Tirzepatide · 10mg',
    body: 'Independent Janoshik test came back 98.7%. The vendor responded to my batch question within 4 hours with the full lab PDF. This is how research sourcing should work.',
    date: '5 days ago',
    vendor: 'Valkyrie Peptides',
  },
  {
    author: 'A*** T.',
    order: '#6108-C22E',
    hash: '0xb7d3…f480',
    rating: 4,
    compound: 'Retatrutide · 5mg',
    body: 'Product quality is excellent and purity matches the COA. Only knock is packaging, one vial arrived with minor cosmetic label smudge. Support offered a replacement immediately.',
    date: '1 week ago',
    vendor: 'Warrior Distributions',
  },
];

export const compareRows = [
  { feature: 'Monthly Review Invites', vpr: 'Unlimited (Enterprise)', pep: '2,500 hard cap', trust: 'Limited' },
  { feature: 'HPLC / COA Linking', vpr: 'Native, unlimited', pep: 'Add-on ($99/mo)', trust: 'Not supported' },
  { feature: 'Anti-Censor Guarantee', vpr: 'Yes, cryptographic', pep: 'No', trust: 'No, bans common' },
  { feature: 'WordPress + Custom Webhooks', vpr: 'Included all tiers', pep: 'Growth+ only', trust: 'Included' },
  { feature: 'Starting Price', vpr: '$99/mo', pep: '$499/mo', trust: '$299/mo' },
];

export const compounds = [
  'BPC-157', 'Tirzepatide', 'Retatrutide', 'Semaglutide', 'TB-500',
  'CJC-1295', 'GHK-Cu', 'Ipamorelin', 'MOTS-C', 'Epithalon', 'IGF-1 LR3', 'PT-141',
];