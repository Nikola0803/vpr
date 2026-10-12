export const guidelinesHero = {
  eyebrow: 'Review Integrity Policy',
  title: 'Anyone can post.',
  titleAccent: 'Order-backed reviews get verified.',
  lead: 'Every review is screened and moderated before it publishes. You do not need an order to have your say — but a matched, confirmed order is the only way to earn the Verified Buyer badge.',
  primaryCta: 'See how orders are verified',
  secondaryCta: 'Write a review',
};

export const guidelinesStats = [
  {
    icon: 'ri-user-line',
    value: 'Open',
    label: 'Any researcher can submit a review — no order reference required',
  },
  {
    icon: 'ri-verified-badge-line',
    value: 'Verified',
    label: 'Order-backed reviews earn the Verified Buyer badge',
  },
  {
    icon: 'ri-eye-line',
    value: '100%',
    label: 'Reviewed by a human moderator before publishing',
  },
  {
    icon: 'ri-fingerprint-line',
    value: 'Sealed',
    label: 'Every accepted review is hashed and timestamped',
  },
];

export const oneRule = {
  eyebrow: 'Two tiers of review',
  title: 'Anyone can post.',
  titleAccent: 'Order-backed reviews get verified.',
  lead: 'We host two kinds of reviews side by side. Unverified reviews are open to every researcher and clearly labeled. Verified Buyer reviews are locked to a matched, confirmed order — those are the ones you can fully trust.',
  tiers: [
    {
      id: 'unverified',
      label: 'Unverified review',
      title: 'Open to every researcher',
      icon: 'ri-user-line',
      points: [
        'No order reference required — anyone can submit',
        'Clearly labeled "Unverified" wherever it appears',
        'Still screened for Research Use Only language',
        'Still moderated by a human before it publishes',
      ],
    },
    {
      id: 'verified',
      label: 'Verified Buyer',
      title: 'Locked to a real order',
      icon: 'ri-verified-badge-fill',
      points: [
        'Must carry a real, matched order reference',
        'Order must belong to the vendor being reviewed',
        'Reviewer must be the buyer on that order',
        'Earns the Verified Buyer badge on publication',
      ],
    },
  ],
  punchLead: 'Open to all. Verified by proof.',
  punch:
    'Anyone gets a voice. But only a matched order earns the Verified Buyer badge — and the badge is what the whole directory trusts.',
};

export const verificationSteps = [
  {
    icon: 'ri-link',
    title: 'Order matched',
    desc: 'The review names a specific order reference. If the order cannot be found, there is no Verified Buyer badge.',
  },
  {
    icon: 'ri-user-follow-line',
    title: 'Buyer confirmed',
    desc: 'The submitter must be the account that placed the order — no third parties, no proxies, no hired hands.',
  },
  {
    icon: 'ri-calendar-check-line',
    title: 'Purchase window checked',
    desc: 'The order must fall inside a real vendor relationship window. The badge cannot attach to an order that never existed.',
  },
  {
    icon: 'ri-fingerprint-line',
    title: 'Badge sealed',
    desc: 'Once matched, the review is hashed, timestamped, and badged Verified Buyer. Rewriting it after the seal is impossible.',
  },
];

export const rejectionRules = [
  {
    icon: 'ri-question-line',
    title: 'Fabricated order references',
    desc: 'Claiming a matched order we cannot verify gets the badge refused.',
  },
  {
    icon: 'ri-spy-line',
    title: 'Faked verified badges',
    desc: 'Competitors and vendors cannot fake a Verified Buyer review — an unverifiable claim is rejected.',
  },
  {
    icon: 'ri-hand-coin-line',
    title: 'Purchased praise',
    desc: 'Vendors cannot buy, gift, or incentivize five-star reviews. Verified buyers only.',
  },
  {
    icon: 'ri-refresh-line',
    title: 'Review swaps',
    desc: 'Trade-for-trade schemes are rejected the moment the pattern appears.',
  },
  {
    icon: 'ri-edit-2-line',
    title: 'Post-seal edits',
    desc: 'A published review cannot be rewritten or softened after the fact.',
  },
  {
    icon: 'ri-file-copy-2-line',
    title: 'Duplicate submissions',
    desc: 'One order earns exactly one Verified Buyer review. Extras are discarded.',
  },
];

export const guidelinesFaq = [
  {
    q: 'Can a competitor post a negative review about us?',
    a: 'Anyone can submit a review, and yes, that technically includes competitors. Two things protect vendors: every submission is moderated by a human before it goes live, and only a matched, confirmed order can earn the Verified Buyer badge. A competitor can never fake that badge.',
  },
  {
    q: 'Can a vendor buy a pile of five-star reviews?',
    a: 'They can try, but they can never buy Verified Buyer ones — those are locked to real, confirmed orders. Purchased praise loses the badge and, paired with moderation, is typically rejected outright.',
  },
  {
    q: 'What if my honest review is negative?',
    a: 'Post it. You can write a review whether or not you have an order. If you do attach an order reference, it publishes with the Verified Buyer badge — good or bad, exactly the same way. Verified buyers always get their say.',
  },
  {
    q: 'Do I really need proof of purchase to leave a review?',
    a: 'No. You can post a review without an order reference — it will be clearly labeled unverified. If you do have an order, adding the reference earns the Verified Buyer badge and carries far more weight with readers.',
  },
  {
    q: 'Why two tiers at all?',
    a: 'Because an order-backed review is the most trustworthy kind there is. Anyone can weigh in, but the Verified Buyer badge is reserved for reviews we can prove — and that is what makes those numbers real.',
  },
];