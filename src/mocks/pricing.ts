export interface Tier {
  id: string;
  name: string;
  popular: boolean;
  monthly: number; // per month, billed monthly
  yearly: number; // per month, billed annually
  desc: string;
  features: string[];
  cta: string;
}

export const moneyBack = '30-day money back guarantee';

export const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Basic',
    popular: false,
    monthly: 49,
    yearly: 34,
    desc: 'Get listed, build credibility, and start collecting verified reviews. One-time setup reviewed by hand.',
    features: [
      'Public vendor listing',
      'Up to 50 verified reviews',
      'Basic profile data',
      '1 certificate of analysis',
      'Directory inclusion',
      'Compliance screening',
      'Dofollow backlink from your listing',
    ],
    cta: 'Get listed',
  },
  {
    id: 'starter',
    name: 'Starter',
    popular: false,
    monthly: 99,
    yearly: 69,
    desc: 'Full review collection, storefronts, widgets, and invite automation. No contracts.',
    features: [
      '1 connected storefront',
      'Up to 2,500 review invites/mo, to your own past customers',
      'AI compliance screening',
      'Verified purchase badges',
      'Review display widgets',
      'Automated review invites + one-click opt-out',
      'Custom compliance rules',
      'White-label widget',
      'REST API access',
    ],
    cta: 'Request this plan',
  },
  {
    id: 'growth',
    name: 'Verified',
    popular: true,
    monthly: 149,
    yearly: 99,
    desc: 'Full certification, COA integration and the trust signals that convert hesitant buyers.',
    features: [
      '1 connected storefront',
      'Up to 5,000 review invites/mo, to your own past customers',
      'AI compliance screening',
      'Verified purchase badges',
      'RUO + True COA certification seal',
      'Custom compliance rules',
      'Review display widgets',
      'Automated review invites + one-click opt-out',
      'Full audit trail',
      'White-label widget',
      'REST API access',
    ],
    cta: 'Request this plan',
  },
  {
    id: 'professional',
    name: 'Professional',
    popular: false,
    monthly: 299,
    yearly: 199,
    desc: 'For serious vendors who want maximum exposure: multi-store, newsletter features, Telegram community access, and priority support.',
    features: [
      'Up to 3 connected storefronts',
      'Up to 10,000 review invites/mo, to your own past customers',
      'White-label widgets',
      'RUO + True COA certification seal',
      'Seal kit + storefront backlink',
      'REST API access',
      'AI compliance screening',
      'Custom compliance rules',
      'Priority support',
      'Onboarding call',
      'Review analytics',
      'Full audit trail',
      'Occasional newsletter features (20k+ subscribers)',
      'VPR Telegram community access',
    ],
    cta: 'Request this plan',
  },
];

export const overagePacks = [
  { name: 'Review Invite Pack', qty: '+5,000 review invites', price: '$99', note: 'One-time top-up' },
  { name: 'Extra Storefront', qty: '+1 connected store', price: '$149/mo', note: 'Add another store' },
  { name: 'Priority Support', qty: '4-hour response SLA', price: '$199/mo', note: 'Upgrade your SLA' },
  { name: 'Dedicated Email Promo', qty: 'One solo email to 20k+ subscribers', price: '$999', note: 'One-time send, with proof of delivery' },
  { name: 'News Article Placement', qty: 'Dedicated article on a VPR-network site (DA 40+)', price: '$349', note: 'Dofollow backlink, permanent placement' },
  { name: 'Guest Post Bundle', qty: '3 articles across our peptide network', price: '$899', note: 'Mix of sites, all dofollow, permanent' },
];

export const comparisonGroups = [
  {
    group: 'Collection & Screening',
    rows: [
      { feature: 'Connected storefronts', free: false, starter: '1', growth: '1', professional: '3' },
      { feature: 'Monthly review invites (your own customers)', free: false, starter: '2,500', growth: '5,000', professional: '10,000' },
      { feature: 'AI compliance screening', free: true, starter: true, growth: true, professional: true },
      { feature: 'Custom compliance rules', free: false, starter: true, growth: true, professional: true },
      { feature: 'Verified purchase badges', free: true, starter: true, growth: true, professional: true },
      { feature: 'Review cap per listing', free: '50 reviews', starter: 'Unlimited', growth: 'Unlimited', professional: 'Unlimited' },
    ],
  },
  {
    group: 'Display & Branding',
    rows: [
      { feature: 'Review display widgets', free: false, starter: true, growth: true, professional: true },
      { feature: 'White-label widget', free: false, starter: true, growth: true, professional: true },
      { feature: 'Automated review invites + opt-out', free: false, starter: true, growth: true, professional: true },
      { feature: 'Review analytics', free: false, starter: false, growth: false, professional: true },
      { feature: 'Onboarding call', free: false, starter: false, growth: false, professional: true },
    ],
  },
  {
    group: 'Trust & Certification',
    rows: [
      { feature: 'RUO / True COA certification seal', free: false, starter: false, growth: true, professional: true },
      { feature: 'Dofollow backlink from listing', free: true, starter: true, growth: true, professional: true },
      { feature: 'Seal kit + storefront backlink', free: false, starter: false, growth: false, professional: true },
      { feature: 'Public certificate ID lookup', free: true, starter: true, growth: true, professional: true },
    ],
  },
  {
    group: 'Data, API & Support',
    rows: [
      { feature: 'Full audit trail', free: false, starter: false, growth: true, professional: true },
      { feature: 'REST API access', free: false, starter: true, growth: true, professional: true },
      { feature: 'Priority support', free: false, starter: false, growth: false, professional: true },
      { feature: 'Support response SLA', free: false, starter: '48h', growth: '24h', professional: '4h' },
    ],
  },
  {
    group: 'Reach & Community',
    rows: [
      { feature: 'Occasional newsletter features (20k+ subscribers)', free: false, starter: false, growth: false, professional: true },
      { feature: 'VPR Telegram community access', free: false, starter: false, growth: false, professional: true },
      { feature: 'Dedicated email promo (add-on)', free: false, starter: false, growth: false, professional: '$999 one-time' },
    ],
  },
];

export const roiStats = [
  { value: '35%', label: 'More clicks with rich snippets', note: 'star ratings shown straight in Google results' },
  { value: '0', label: 'Compliant reviews lost to removal', note: 'every screened review stays live forever' },
  { value: '100%', label: 'SEO value stays on your domain', note: 'reviews are self-hosted, never off-site' },
];

export const pricingFaqs = [
  {
    q: 'What is the Basic listing and how do I pay?',
    a: 'The Basic plan ($49/mo) gives you a public, compliance-screened profile with up to 50 verified reviews and a dofollow backlink from your listing. Payment is accepted via Venmo, Zelle, CashApp, bank transfer, or card. No auto-charge: we send a secure payment link once your listing clears review.',
  },
  {
    q: 'What happens if I exceed my monthly review-invite limit?',
    a: 'Nothing breaks. Invites simply pause until your next billing cycle, or you can grab a one-time Review Invite Pack (+5,000 invites) from your dashboard. We never silently charge you overage. Reminder: these invites only ever go to your own past customers, never to a purchased or shared list.',
  },
  {
    q: 'Do you sell or share customer email addresses?',
    a: 'No, never. We do not buy, sell, rent or trade customer data. Your customer list stays yours. An address is used only to send one review request for the order it is tied to, sent in your brand, and every invite carries a one-click opt-out. We do not contact anyone who did not order from your store, and we do not use your list for anything else.',
  },
  {
    q: 'How much do I save on the yearly plan?',
    a: 'Yearly billing saves up to 33% versus monthly, and the exact saving is shown on every plan when you flip the toggle. Billing is charged once per year as a single payment.',
  },
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. Upgrades take effect immediately and are prorated to the day. Downgrades apply at your next renewal date, so you keep every email you already paid for.',
  },
  {
    q: 'Do you support WordPress only?',
    a: 'No. WordPress and WooCommerce are native out of the box, including verified-purchase matching and order-success email automation. Custom, headless and third-party storefronts connect through our drop-in snippet, REST API and signed order webhooks.',
  },
  {
    q: 'How does the 30-day money back guarantee work?',
    a: 'If you are not satisfied within 30 days of your first paid month, email our team and we refund that period in full. No contracts, no cancellation fees.',
  },
];