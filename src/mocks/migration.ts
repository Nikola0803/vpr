export const migrationHero = {
  eyebrow: 'Review Migration & Rescue',
  title: 'Rescue every review before',
  titleAccent: 'someone deletes it.',
  lead:
    'Trustpilot, Reviews.io, Google and social platforms pull reviews without warning, a policy sweep, a processor complaint, a flagged listing. Once they are gone, they are gone. We migrate your entire review history onto your own domain so it can never be taken down again.',
  primaryCta: 'Start Review Migration',
  secondaryCta: 'See Integration Methods',
};

export const migrationStats = [
  { value: '48k+', label: 'Reviews rescued from removal', icon: 'ri-archive-drawer-line', accent: 'text-teal-700' },
  { value: '72h', label: 'Average full history migration', icon: 'ri-timer-flash-line', accent: 'text-cyan-700' },
  { value: '0', label: 'Migrated reviews lost to date', icon: 'ri-shield-check-line', accent: 'text-emerald-700' },
  { value: 'Free', label: 'Technical integration support', icon: 'ri-customer-service-2-line', accent: 'text-teal-700' },
];

export interface MigrationFee {
  range: string;
  price: number;
  note: string;
  icon: string;
  min: number;
  max: number | null;
}

export const migrationFees: MigrationFee[] = [
  { range: 'Up to 50 reviews', price: 50, note: 'Small rescue, same permanent archive', icon: 'ri-seedling-line', min: 0, max: 50 },
  { range: '51 \u2013 100 reviews', price: 100, note: 'Most first-time migrations land here', icon: 'ri-stack-line', min: 51, max: 100 },
  { range: '101 \u2013 1,000 reviews', price: 200, note: 'Established stores with real history', icon: 'ri-database-2-line', min: 101, max: 1000 },
  { range: '1,000+ reviews', price: 350, note: 'Flat rate no matter how large the archive', icon: 'ri-archive-2-line', min: 1001, max: null },
];

/**
 * Maps a review count to its matching one-time migration fee tier.
 * Falls back to the largest tier for anything above the top range.
 */
export function getMigrationFee(count: number): MigrationFee {
  const safe = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  return (
    migrationFees.find((f) => safe >= f.min && (f.max === null || safe <= f.max)) ??
    migrationFees[migrationFees.length - 1]
  );
}

export const migrationPricingNotes = [
  'One-time payment \u2014 no subscription required to migrate',
  'Free technical setup and integration support included',
  'Pay only after we confirm the size of your archive',
];

export const threatPoints = [
  {
    icon: 'ri-delete-bin-6-line',
    title: 'Policy sweeps delete compliant reviews',
    desc:
      'Legacy platforms run automated sweeps that strip thousands of reviews at once. Legitimate researchers get caught in the blast and your social proof vanishes overnight.',
  },
  {
    icon: 'ri-bank-card-line',
    title: 'Processor pressure triggers takedowns',
    desc:
      'Payment processors flag language on hosted review platforms and push for removals. When the review lives on someone else\u2019s server, you have zero say in what stays.',
  },
  {
    icon: 'ri-account-pin-circle-line',
    title: 'Hosted platforms own the content',
    desc:
      'On Trustpilot and Reviews.io the review lives on their domain, under their terms. They can edit, hide, or delete it, and the SEO value leaves with it.',
  },
  {
    icon: 'ri-close-circle-line',
    title: 'No appeals, no backups',
    desc:
      'Most platforms offer no export guarantee and no restore path once a review is removed. Without a migration workflow, removal is permanent.',
  },
];

export const migrationSteps = [
  {
    n: '01',
    icon: 'ri-link-m',
    title: 'Connect the source',
    desc:
      'Point us at your Trustpilot, Reviews.io, Google, Facebook or store profile. Approve read access and we pull the full history, no manual exporting.',
    tag: '5 minutes',
  },
  {
    n: '02',
    icon: 'ri-download-cloud-2-line',
    title: 'We pull and normalize',
    desc:
      'Our migration engine extracts every review, stars, text, reviewer name, date, merchant replies and media, then normalizes it to our schema and de-duplicates duplicates.',
    tag: 'Automated',
  },
  {
    n: '03',
    icon: 'ri-fingerprint-line',
    title: 'Hash and archive',
    desc:
      'Each migrated review is cryptographically hashed and sealed with its original timestamp. The record becomes immutable proof that the review existed.',
    tag: 'Immutable',
  },
  {
    n: '04',
    icon: 'ri-window-line',
    title: 'Publish on your domain',
    desc:
      'The archive drops straight into your storefront through an integration. Reviews render on your pages with schema markup, indexed as your content, owned by you.',
    tag: 'Go live',
  },
];

export const sourcePlatforms = [
  { name: 'Trustpilot', icon: 'ri-star-line', note: 'Full review history + replies' },
  { name: 'Reviews.io', icon: 'ri-star-smile-line', note: 'Reviews, media & ratings' },
  { name: 'Google Business', icon: 'ri-google-line', note: 'Local + product reviews' },
  { name: 'Facebook', icon: 'ri-facebook-circle-line', note: 'Page recommendations' },
  { name: 'Yotpo', icon: 'ri-store-2-line', note: 'Store + product reviews' },
  { name: 'Judge.me', icon: 'ri-scales-3-line', note: 'Store & product review data' },
  { name: 'Stamped.io', icon: 'ri-price-tag-3-line', note: 'Ratings & UGC' },
  { name: 'Other Platforms', icon: 'ri-plug-2-line', note: 'Any source with an API' },
];

export const whatMigrates = [
  { label: 'Star ratings', icon: 'ri-star-fill' },
  { label: 'Full review text', icon: 'ri-text' },
  { label: 'Reviewer display names', icon: 'ri-user-line' },
  { label: 'Original review dates', icon: 'ri-calendar-line' },
  { label: 'Merchant replies', icon: 'ri-reply-line' },
  { label: 'Photos & video UGC', icon: 'ri-image-line' },
  { label: 'Verified purchase badges', icon: 'ri-verified-badge-line' },
  { label: 'Product / SKU mapping', icon: 'ri-links-line' },
];

export const integrationMethods = [
  {
    icon: 'ri-wordpress-fill',
    name: 'WordPress & WooCommerce Plugin',
    tag: 'Native',
    desc:
      'One-click install for WordPress and WooCommerce. Connect your account, drop in the shortcode, and your migrated reviews render with schema markup automatically, plus order-success hooks fire your automated review emails.',
    points: ['WordPress + WooCommerce', 'Order-success email automation', 'Automatic schema.org output', 'Free setup support'],
    featured: true,
  },
  {
    icon: 'ri-code-box-line',
    name: 'Custom-Built & Headless',
    tag: 'Bespoke',
    desc:
      'Running a hand-built storefront, headless setup or bespoke checkout? We wire directly into your order pipeline, a single script tag, a signed order webhook, and your reviews render anywhere you want them.',
    points: ['Headless & custom builds', 'Order webhook onboarding', 'Server or client rendering', 'Free engineer-assisted setup'],
    featured: false,
  },
  {
    icon: 'ri-plug-2-line',
    name: 'Third-Party Platforms',
    tag: 'Any stack',
    desc:
      'Squarespace, Webflow, Wix, BigCommerce, Magento and more. Pick your platform from the list and we hand you a drop-in snippet that verifies purchases, screens for compliance and renders your rescued reviews.',
    points: ['20+ supported platforms', 'No code required', 'Responsive & themeable', 'White-label ready'],
    featured: false,
  },
  {
    icon: 'ri-server-line',
    name: 'REST API & Webhooks',
    tag: 'Developer',
    desc:
      'Full REST API with real-time webhooks for review events. Build your own display layer, sync into a CRM, or pipe reviews into your own database with complete control.',
    points: ['REST + webhook events', 'Signed payloads', 'Sandbox environment', 'Docs & Postman collection'],
    featured: false,
  },
  {
    icon: 'ri-customer-service-2-line',
    name: 'Done-For-You Migration',
    tag: 'White-glove',
    desc:
      'No time to wire it up? Our team handles the entire migration end to end, extraction, verification, integration and go-live, at no extra cost on your plan.',
    points: ['Fully managed service', 'Dedicated migration engineer', 'Zero downtime cutover', 'Included in your package'],
    featured: false,
  },
];

export const orderAutomation = {
  eyebrow: 'Automated review emails',
  title: 'Reviews start collecting themselves the moment an order succeeds.',
  lead:
    'Our plugin installs an order-success hook into your WordPress / WooCommerce store (and a signed order webhook for custom builds). The second a payment clears and delivery is confirmed, that same customer is queued for a single verified review request, sent in your brand with a one-click opt-out, no spreadsheets, no manual exports, nothing to remember. Only people who actually ordered from you are ever contacted, and we never buy, sell or share an address.',
  steps: [
    { icon: 'ri-shopping-bag-3-line', title: 'Order succeeds', desc: 'WooCommerce fires order_completed, or your custom checkout posts a signed order webhook.' },
    { icon: 'ri-shield-user-line', title: 'Reviewer matched', desc: 'We match the order to the customer who placed it, using the order ID and line items only, so the person invited is the one who actually bought. Nobody else can review that order, and nobody beyond it is ever contacted.' },
    { icon: 'ri-time-line', title: 'You choose the delay', desc: 'The invite is scheduled for exactly how long after delivery you set, same day, 3 days, a week, whatever you decide.' },
    { icon: 'ri-git-branch-line', title: 'We route by your quality bar', desc: 'Reviews that clear your star threshold publish automatically. Anything below it goes straight to your support form.' },
  ],
  points: [
    'Native WooCommerce order hooks, install once, runs forever',
    'Signed order webhooks for custom / headless checkouts',
    'Send delay, branding and opt-out handling all configurable',
    'Your customer list stays yours, never bought, sold, rented or shared',
    'One request per order, sent in your name, with a one-click opt-out',
  ],
  delay: {
    title: 'You decide how fast the email goes out',
    desc: 'Every store ships at a different speed, so you set the timing yourself. The moment delivery is confirmed, the clock you chose starts, the review process kicks off right from that email.',
    options: ['Same day', '1 day after', '3 days after', '7 days after', 'Custom'],
    default: '3 days after',
    hint: 'Set it once inside the email template. Change it any time, no code.',
  },
  threshold: {
    title: 'You set the quality bar, we route the rest',
    desc: 'Decide the lowest star rating you are willing to publish. Reviews at or above that bar go live automatically on your platform. Anything below it is never published, it is routed straight to your website\u2019s contact or tech-support form so your team can make the researcher happy first.',
    accept: {
      title: 'At or above your bar',
      desc: 'Screened, hashed and published automatically on your review platform.',
    },
    recover: {
      title: 'Below your bar',
      desc: 'Never published. Sent to your contact / tech-support form for service recovery.',
    },
  },
};

export const supportPoints = [
  {
    icon: 'ri-thumb-up-line',
    title: 'Free integration support',
    desc: 'Every package includes hands-on technical support to get your plugin, app or API live, no upsells, no hourly billing.',
  },
  {
    icon: 'ri-user-voice-line',
    title: 'A real engineer, not a chatbot',
    desc: 'You get a named migration engineer who walks your team through setup, testing and go-live on a shared call.',
  },
  {
    icon: 'ri-shield-star-line',
    title: 'Compliance screening on import',
    desc: 'Every migrated review is screened against your custom compliance rules before it goes live, so nothing risky gets published.',
  },
  {
    icon: 'ri-refresh-line',
    title: 'Incremental re-sync',
    desc: 'Keep the source connection alive and new reviews are pulled on a schedule automatically, your archive stays current.',
  },
];

export const migrationFaqs = [
  {
    q: 'Are migrated reviews still verified if they came from another platform?',
    a: 'Yes. We carry over the original verification metadata when the source platform exposes it, and we re-match reviewers to order data from your store where available. Migrated reviews display a "Migrated · Original source" provenance badge so researchers see exactly where they came from.',
  },
  {
    q: 'Can a migrated review still be taken down?',
    a: 'No. Once a review is migrated it lives on your domain and in your immutable archive. No third party can reach in and delete it, and the cryptographic hash proves the review existed even if the original source later removes it.',
  },
  {
    q: 'How long does a full migration take?',
    a: 'Most stores are fully migrated within 72 hours. Very large histories (50,000+ reviews) are batched and typically complete within a week. You get progress updates throughout, and your live site is never interrupted.',
  },
  {
    q: 'Can I just import reviews from a CSV or Google Sheet?',
    a: 'No, and deliberately so. A file of reviews cannot be verified, and uploaded review data is trivial to fake, so CSV and Google Sheet review imports are not accepted. We migrate only from genuine platform accounts and verified order records, so every review stays provably real.',
  },
  {
    q: 'Do I need developers to integrate this?',
    a: 'No. The WordPress plugin is point-and-click, and third-party platforms use a drop-in snippet with no coding. For custom or headless builds our team wires the order webhook and widget for you free of charge as part of your package.',
  },
  {
    q: 'How much does Review Migration cost?',
    a: 'Migration is a one-time fee based on how many reviews you are rescuing: $50 up to 50 reviews, $100 for 51\u2013100, $200 for 101\u20131,000, and a flat $350 for anything above 1,000. There is no subscription required to migrate, and the order-success email automation plus free technical setup are included. If you want us to keep collecting and displaying new reviews going forward, add a monthly or yearly plan.',
  },
  {
    q: 'What happens to my reviews if I ever cancel?',
    a: 'They are yours. You can export your entire archive at any time as JSON, and any widget already embedded on your site keeps working with the data you own.',
  },
];