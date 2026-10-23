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
    name: 'Free',
    popular: false,
    monthly: 0,
    yearly: 0,
    desc: 'A basic, no-cost directory listing to get your research store discovered and collect your first reviews.',
    features: [
      'Public vendor listing',
      'Up to 10 verified reviews',
      'Basic profile data',
      '1 certificate of analysis',
      'Directory inclusion',
      'Compliance screening',
    ],
    cta: 'List your store',
  },
  {
    id: 'starter',
    name: 'Starter',
    popular: false,
    monthly: 49,
    yearly: 34,
    desc: 'Get listed, collect reviews, and start building trust. No contracts, no setup fee.',
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
    desc: 'For vendors running multiple stores who want white-label branding and priority support.',
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
    ],
    cta: 'Request this plan',
  },
];

export const overagePacks = [
  { name: 'Review Invite Pack', qty: '+5,000 review invites', price: '$99', note: 'One-time top-up' },
  { name: 'Extra Storefront', qty: '+1 connected store', price: '$149/mo', note: 'Add another store' },
  { name: 'Priority Support', qty: '4-hour response SLA', price: '$199/mo', note: 'Upgrade your SLA' },
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
      { feature: 'Review cap per listing', free: '10 reviews', starter: 'Unlimited', growth: 'Unlimited', professional: 'Unlimited' },
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
];

export const roiStats = [
  { value: '35%', label: 'More clicks with rich snippets', note: 'star ratings shown straight in Google results' },
  { value: '0', label: 'Compliant reviews lost to removal', note: 'every screened review stays live forever' },
  { value: '100%', label: 'SEO value stays on your domain', note: 'reviews are self-hosted, never off-site' },
];

export const pricingFaqs = [
  {
    q: 'Is there really a free plan?',
    a: 'Yes. The Free listing gives you a public, compliance-screened profile with basic company data and up to 10 verified reviews. It costs nothing and needs no card. You can upgrade to a paid tier any time to lift the 10-review cap and unlock widgets, embeds and analytics.',
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