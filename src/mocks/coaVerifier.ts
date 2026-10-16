export const verifierHero = {
  eyebrow: 'COA Verifier · AI document forensics',
  title: 'Prove your certificate is real.',
  titleAccent: 'Instantly.',
  lead:
    'Upload any Certificate of Analysis and our forensic AI inspects it the way a document examiner would - hunting for edited text, spliced regions, mismatched fonts and impossible timestamps. Know in seconds whether a document can be trusted.',
  primaryCta: 'Verify a document',
  secondaryCta: 'See how it works',
};

export const verifierStats = [
  { icon: 'ri-file-search-line', value: '1.2M+', label: 'COAs screened in the last 12 months' },
  { icon: 'ri-time-line', value: '< 20s', label: 'Median time to a full authenticity report' },
  { icon: 'ri-focus-3-line', value: '7', label: 'Forensic checks run on every document' },
  { icon: 'ri-shield-check-line', value: '100%', label: 'Private - your document is never published' },
];

export const detectChecks = [
  {
    icon: 'ri-layout-4-line',
    title: 'Template & structure integrity',
    desc: 'Catches layouts where fields have been pushed, stretched or pasted into a document that was never built that way.',
  },
  {
    icon: 'ri-font-size-2',
    title: 'Typography & font consistency',
    desc: 'Detects mixed fonts, weights, kerning and baselines inside a single field - the classic fingerprint of edited text.',
  },
  {
    icon: 'ri-magic-line',
    title: 'Digital editing artifacts',
    desc: 'Flags compression seams, halo edges, cloning and smudging left behind by photo-editing tools.',
  },
  {
    icon: 'ri-time-line',
    title: 'Metadata & timestamp coherence',
    desc: 'Cross-checks creation dates, producer tools, revision markers and expiry dates for impossible timelines.',
  },
  {
    icon: 'ri-building-2-line',
    title: 'Laboratory identity',
    desc: 'Reads the lab name, address, contact and accreditation references for plausibility and internal consistency.',
  },
  {
    icon: 'ri-quill-pen-line',
    title: 'Signature / stamp integrity',
    desc: 'Spots stamps and signatures that are misaligned, low-resolution, clipped or off-brand for the document.',
  },
  {
    icon: 'ri-test-tube-line',
    title: 'Data consistency',
    desc: 'Verifies that purity values, units, decimals, totals, methods and instruments agree with one another.',
  },
  {
    icon: 'ri-robot-2-line',
    title: 'Verdict & confidence',
    desc: 'Every signal is rolled into a single plain-language verdict with a calibrated confidence score.',
  },
];

export const howItWorksSteps = [
  {
    icon: 'ri-upload-cloud-2-line',
    step: '01',
    title: 'Upload the COA',
    desc: 'Drop in a PDF, JPG, PNG or WEBP up to 12MB. Nothing is published - your document stays yours.',
  },
  {
    icon: 'ri-mail-check-line',
    step: '02',
    title: 'Unlock with your email',
    desc: 'COA Verifier is free. Add your email once to run unlimited checks and stay posted on new verification tools.',
  },
  {
    icon: 'ri-file-shield-2-line',
    step: '03',
    title: 'Read the forensic report',
    desc: 'In seconds you get a verdict, a confidence score, seven forensic checks and the exact signals we spotted.',
  },
];

export const verifierFaqs = [
  {
    q: 'What exactly does COA Verifier do?',
    a: 'It runs an AI document-forensics pass on a Certificate of Analysis or HPLC report. It looks for the visual and structural fingerprints of tampering - edited text, spliced regions, mismatched fonts, compression seams and impossible timestamps - and turns everything it finds into a plain-language verdict with a confidence score.',
  },
  {
    q: 'Is it a legal guarantee that a document is authentic?',
    a: 'No. COA Verifier is a fast, assistive screening layer, not a forensic certification. It reliably flags the signals an experienced examiner would look for first, but it cannot replace a formal lab audit or a court-grade forensic report. Treat a clean result as "no red flags spotted in this pass".',
  },
  {
    q: 'Is it really free, and why do you ask for an email?',
    a: 'Yes, it is free. The email is what unlocks unlimited checks and lets us send you the occasional note about new verification tools and research-industry trust news. We never sell or rent your address, and every email has a one-click unsubscribe.',
  },
  {
    q: 'What happens to the document I upload?',
    a: 'It is analysed for authenticity and then discarded. We do not publish it, share it, or add it to any public vault. If you want a certificate to appear publicly on a vendor profile, that is a separate, deliberate step.',
  },
  {
    q: 'Which files can I analyse?',
    a: 'PDF, JPG, PNG and WEBP up to 12MB. PDF and high-resolution scans produce the most detailed report, because the model can read both the text layer and the rendered page.',
  },
  {
    q: 'Do vendors use this too?',
    a: 'Constantly. Vendors run their own lab documents through COA Verifier before publishing them, so buyers see a clean, tamper-free certificate the first time and never have to doubt it.',
  },
];

export const verifierPromises = [
  { icon: 'ri-lock-2-line', text: 'Documents are analysed then discarded - never published or shared' },
  { icon: 'ri-flashlight-line', text: 'Verdict and full forensic breakdown in under 20 seconds' },
  { icon: 'ri-mail-check-line', text: 'Free forever - one email unlocks unlimited checks' },
  { icon: 'ri-shield-star-line', text: 'Built on the same engine that screens our public COA vault' },
];

export const promoBanner = {
  eyebrow: 'New tool',
  title: 'Is that certificate real? Now you can check in seconds.',
  desc: 'COA Verifier runs an AI forensic pass on any Certificate of Analysis - catching edited text, spliced regions and impossible timestamps. Free to use.',
  cta: 'Try COA Verifier',
};