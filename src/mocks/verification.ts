export const verificationHero = {
  eyebrow: 'How verification works',
  title: 'Trust that is earned,',
  titleAccent: 'never uploaded.',
  lead:
    'Every review on Verified Peptide Reviews is matched to a real purchase and screened before it ever goes live. No imports, no files, no paid testimonials, just provable buyers writing about things they actually bought.',
  primaryCta: 'Browse verified vendors',
  secondaryCta: 'Submit a review',
};

export const verificationStats = [
  { value: '48,300', label: 'verified reviews published', icon: 'ri-verified-badge-line' },
  { value: '100%', label: 'matched to a real order', icon: 'ri-shopping-bag-3-line' },
  { value: '0', label: 'file or CSV imports accepted', icon: 'ri-file-forbid-line' },
  { value: 'Sealed', label: 'every review hashed & archived', icon: 'ri-fingerprint-line' },
];

export const verificationPipeline = [
  {
    n: '01',
    icon: 'ri-shopping-bag-3-line',
    title: 'Order matched',
    desc:
      'A review can only exist after a real transaction. When an order completes on your store, we capture the order ID, buyer email and line items, through native WooCommerce hooks or a signed order webhook for custom builds.',
  },
  {
    n: '02',
    icon: 'ri-link-m',
    title: 'Signed single-use link',
    desc:
      'The buyer receives a one-time review link cryptographically tied to that specific order. It expires, cannot be forwarded, and can only be used once, so one order always equals one review.',
  },
  {
    n: '03',
    icon: 'ri-mail-check-line',
    title: 'Double opt-in email',
    desc:
      'The reviewer confirms their email with a time-limited token. No confirmed inbox plus matched order means no review, full stop. Bots and fake identities never make it past this gate.',
  },
  {
    n: '04',
    icon: 'ri-shield-star-line',
    title: 'Compliance screening',
    desc:
      'Before publishing, every review runs through AI compliance screening and your custom keyword rules. Risky or non-compliant content is held for review, never silently deleted, never quietly approved.',
  },
  {
    n: '05',
    icon: 'ri-fingerprint-line',
    title: 'Hashed & permanently sealed',
    desc:
      'Approved reviews are cryptographically hashed with their original timestamp and sealed into the immutable archive. Once it is live, nobody, not the vendor, not a platform, not us, can edit or delete it.',
  },
];

export const verificationRequired = [
  { label: 'A matched purchase order', icon: 'ri-shopping-bag-3-line' },
  { label: 'A confirmed email via double opt-in', icon: 'ri-mail-check-line' },
  { label: 'A one-time signed review link', icon: 'ri-link-m' },
  { label: 'Passing AI compliance screening', icon: 'ri-shield-star-line' },
  { label: 'A cryptographic hash + timestamp', icon: 'ri-fingerprint-line' },
  { label: 'Publication on the vendor\u2019s own domain', icon: 'ri-global-line' },
];

export const verificationRejected = [
  {
    title: 'CSV & spreadsheet imports',
    desc: 'A file of reviews cannot be verified, and uploaded review data is trivially faked. We never accept CSV or Google Sheet review imports.',
    icon: 'ri-file-forbid-line',
  },
  {
    title: 'Paid or incentivised reviews',
    desc: 'No discounts, no gifts, no cash for a rating. Incentives distort the score and we do not allow them, in any amount.',
    icon: 'ri-money-dollar-circle-line',
  },
  {
    title: 'Vendor-edited reviews',
    desc: 'Vendors can reply publicly to a review, but they can never edit, hide or delete it. Reputation cannot be curated.',
    icon: 'ri-forbid-2-line',
  },
  {
    title: 'Anonymous or unverified posters',
    desc: 'If we cannot match the reviewer to a real order, there is no path to publish. Plausible-sounding is not good enough.',
    icon: 'ri-user-forbid-line',
  },
  {
    title: 'Screenshot-only proof',
    desc: 'Exported images and social screenshots are not evidence. Reviews come only through a signed link tied to an order.',
    icon: 'ri-image-line',
  },
  {
    title: 'Cherry-picking & bulk removal',
    desc: 'Nobody gets to remove the reviews they dislike. Compliant reviews stay up forever, positive or negative.',
    icon: 'ri-delete-bin-6-line',
  },
];

export const verificationIndependence = {
  eyebrow: 'Independent by design',
  title: 'We are not owned by the businesses we review.',
  lead:
    'Verified Peptide Reviews is an independent, third-party platform. Vendors pay to collect and display reviews on their own domain, they never buy influence over what those reviews say.',
  points: [
    {
      icon: 'ri-scales-3-line',
      title: 'Vendors get zero editorial control',
      desc: 'A vendor can respond to a review in public. A vendor cannot edit it, hide it, or remove it. That separation is the entire product.',
    },
    {
      icon: 'ri-award-line',
      title: 'Verified purchase, always',
      desc: 'Every published review carries a verified purchase badge backed by the original order record, with a provenance badge when it was migrated from another platform.',
    },
    {
      icon: 'ri-lock-2-line',
      title: 'Immutable audit trail',
      desc: 'Each review keeps a permanent hash and timestamp. Even if a source platform later deletes the original, the proof of what was written survives.',
    },
  ],
};

export const verificationFaqs = [
  {
    q: 'How do you know a reviewer actually bought something?',
    a: 'Reviews can only be written through a single-use, signed link that is issued when a real order completes on the vendor\u2019s store. The link is tied to that order and that email address, so there is no way to review a product you did not buy.',
  },
  {
    q: 'Can a vendor pay to remove a bad review?',
    a: 'No. Vendors can reply publicly to any review, but they cannot edit, hide or delete one. Once a review passes compliance screening it stays live permanently, that is the point of the platform.',
  },
  {
    q: 'Why do you not accept CSV or Google Sheet imports?',
    a: 'Because uploaded review data cannot be verified and is trivial to fabricate. Accepting files would undermine every genuine review on the platform. We migrate only from real platform accounts and verified order records.',
  },
  {
    q: 'What happens to reviews migrated from Trustpilot or Reviews.io?',
    a: 'Migrated reviews keep their original content, dates and merchant replies, and are sealed with a cryptographic hash. They display a "Migrated · Original source" provenance badge so you always know where they came from and that they are now permanent.',
  },
  {
    q: 'What do I get to see as a researcher?',
    a: 'The star rating, the review count, the verified purchase badge, and a cryptographic verification hash you can inspect on any review. If a review was migrated, its original source and date are shown too. Nothing is hidden.',
  },
];