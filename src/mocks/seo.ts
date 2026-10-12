export const seoIntro = {
  eyebrow: 'SEO & Search Visibility',
  title: 'Turn reviews into organic traffic.',
  titleAccent: 'Rich snippets built in.',
  lead:
    "Other platforms host your reviews on their site, so they get the SEO benefit. With Verified Peptide Reviews, reviews live on your pages, giving Google fresh content and structured data it can show as star ratings in search results.",
};

export const seoPillars = [
  {
    icon: 'ri-star-smile-line',
    title: 'Star Ratings in Search Results',
    tag: 'Schema.org JSON-LD',
    desc:
      'Every widget outputs schema.org markup automatically. Google can show your star ratings right in search results, which boosts click-through rates by up to 35%.',
  },
  {
    icon: 'ri-home-smile-line',
    title: 'Review Content on Your Pages',
    tag: 'Self-hosted content',
    desc:
      "Verified reviews naturally include keywords like product names, shipping, and quality. Since they live on your domain (not someone else's), all that SEO value stays with you.",
  },
  {
    icon: 'ri-refresh-line',
    title: 'Keep Your Pages Fresh',
    tag: 'Continuous indexing',
    desc:
      'New reviews signal to Google that your pages are active and up to date. That improves how often Google crawls your site and helps you rank for terms your researchers actually search for.',
  },
  {
    icon: 'ri-cursor-line',
    title: 'Higher Click-Through Rates',
    tag: 'Proven CTR lift',
    desc:
      'Pages with star ratings in search results get 20 to 35% more clicks. Your rating and review count show up before anyone even visits your site.',
  },
  {
    icon: 'ri-shield-star-line',
    title: 'Google Trust Signals',
    tag: 'Google quality signals',
    desc:
      'Google rewards sites with real review content. Verified purchase reviews from actual researchers help your site score higher on Experience, Expertise, Authority, and Trust.',
  },
  {
    icon: 'ri-line-chart-line',
    title: 'SEO That Grows Over Time',
    tag: 'Evergreen growth',
    desc:
      'Every new review adds unique content to your pages. More reviews means more keywords, more traffic, and more conversions. It compounds.',
  },
];

export const hostComparison = {
  eyebrow: 'The difference is where your reviews live',
  title: 'How this compares to Reviews.io & Trustpilot',
  them: 'They host your reviews on their site. You get a widget, but Google indexes the content on their domain, not yours. The SEO benefit goes to them.',
  us: 'We put reviews directly on your pages. The text, stars, and schema markup all live on your domain. Google indexes it as your content, which helps your rankings.',
  points: [
    {
      icon: 'ri-code-box-line',
      title: 'Structured data is automatic.',
      desc: 'Every widget generates schema.org JSON-LD with your ratings, review count, and product info. No manual setup needed.',
    },
    {
      icon: 'ri-lock-2-line',
      title: 'Compliant reviews stay up forever.',
      desc: "Because reviews are screened for compliance, they don't get suddenly removed. Your search snippets stay intact.",
    },
  ],
};

export interface CompetitorRow {
  feature: string;
  us: string;
  trustpilot: string;
  reviewsio: string;
  google: string;
  facebook: string;
}

export const competitorMatrix: CompetitorRow[] = [
  { feature: 'Compliance screening', us: 'Yes, automatic', trustpilot: 'No', reviewsio: 'No', google: 'No', facebook: 'No' },
  { feature: 'Reviews stay on your domain', us: 'Yes, always', trustpilot: 'No', reviewsio: 'No', google: 'No', facebook: 'No' },
  { feature: 'Payment processor friendly', us: 'Yes, by design', trustpilot: 'Risk', reviewsio: 'Partial', google: 'Risk', facebook: 'Risk' },
  { feature: 'Verified purchase (WooCommerce)', us: 'Native', trustpilot: 'Manual', reviewsio: 'Yes', google: 'No', facebook: 'No' },
  { feature: 'Review removal risk', us: 'None, you own them', trustpilot: 'High', reviewsio: 'Medium', google: 'High', facebook: 'High' },
  { feature: 'Custom compliance rules', us: 'Growth plan', trustpilot: 'No', reviewsio: 'No', google: 'No', facebook: 'No' },
  { feature: 'Rich snippets / schema markup', us: 'Built-in', trustpilot: 'Partial', reviewsio: 'Yes', google: 'Native', facebook: 'No' },
  { feature: 'SEO content on your pages', us: 'Yes, self-hosted', trustpilot: 'No, hosted off-site', reviewsio: 'Partial', google: 'No', facebook: 'No' },
  { feature: 'Research vendor support', us: 'Built for it', trustpilot: 'Actively hostile', reviewsio: 'Limited', google: 'No', facebook: 'No' },
  { feature: 'WooCommerce plugin', us: 'Native plugin', trustpilot: 'Widget only', reviewsio: 'Yes', google: 'No', facebook: 'No' },
];

export const seoTestimonials = [
  {
    quote:
      "Trustpilot pulled 140 of our reviews in one sweep. Google delisted us a month later. We moved to Verified Peptide Reviews and haven't lost a single review in six months. The compliance screening catches issues before they ever go live.",
    name: 'Max',
    role: 'Support Manager, Adonis Research',
    init: 'MX',
  },
  {
    quote:
      "Our processor flagged our account because of language on Facebook and Trustpilot. Since switching over, we've had zero underwriting issues. It's been night and day.",
    name: 'Brittany',
    role: 'Director, Optima Supply',
    init: 'BR',
  },
  {
    quote:
      'We tried Reviews.io, Trustpilot, and Google. All three either removed our reviews or restricted our listing. Setup took under an hour, and we saw results within two weeks.',
    name: 'Jerome',
    role: 'Operations Manager, Hydro Research',
    init: 'JR',
  },
];

export const consumerTrust = {
  eyebrow: 'For Researchers',
  title: 'Every review here is real and verified.',
  lead:
    "Verified Peptide Reviews is an independent, third-party review platform. We're not owned or run by the businesses being reviewed. Every review you see has been matched to a real purchase. No fakes. No paid testimonials. No manipulation.",
  items: [
    {
      icon: 'ri-shopping-bag-3-line',
      title: 'Purchase-Verified Only',
      desc: 'Every reviewer is matched to a real order. Only confirmed researchers can leave a review. No exceptions.',
    },
    {
      icon: 'ri-scales-3-line',
      title: 'Independent Third-Party',
      desc: "Businesses can't edit, delete, or cherry-pick reviews. We operate independently to keep things honest.",
    },
    {
      icon: 'ri-shield-cross-line',
      title: 'No Fake Reviews. Ever.',
      desc: 'Our double verification (email + order matching) makes it impossible for fake or bot reviews to get through.',
    },
  ],
  note: 'Sourcing from a vendor that uses Verified Peptide Reviews? You can trust the reviews are genuine.',
};

export const seoFaqs = [
  {
    q: "How do I know a vendor's reviews are real?",
    a: 'Every review is matched to a real purchase order before it can be published. Reviewers verify their email and order ID, so only genuine buyers can post. You can hover any review to inspect its cryptographic verification hash and timestamp.',
  },
  {
    q: 'Can vendors delete or edit bad reviews?',
    a: 'No. Vendors can respond publicly to a review, but they can never edit, hide, or delete it. Reviews that pass compliance screening stay online permanently, that is the whole point of the platform.',
  },
  {
    q: 'How do I find a reputable vendor?',
    a: 'Use the vendor directory to compare trust scores, verified review counts, COA transparency, and shipping performance side by side. Filter for vendors with public third-party lab certificates and QR-verified batches.',
  },
  {
    q: 'How does the 30-day money back guarantee work?',
    a: 'If you are not satisfied within 30 days of your first paid month, email our team and we refund that month in full. No contracts, no cancellation fees, no questions asked.',
  },
];