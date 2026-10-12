export type CertGrade = 'ruo_verified' | 'true_coa_verified';
export type CertStatus = 'active' | 'suspended' | 'revoked';

export interface Certification {
  id: number;
  vendor_slug: string;
  vendor_name: string;
  grade: CertGrade;
  status: CertStatus;
  cert_id: string;
  coa_batch_no: string | null;
  coa_lab: string | null;
  coa_compound: string | null;
  reviewed_by: string | null;
  issued_at: string;
  last_reviewed_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  revoke_reason: string | null;
  notes: string | null;
}

export interface GradeMeta {
  key: CertGrade;
  label: string;
  short: string;
  tagline: string;
  blurb: string;
  icon: string;
  wrapClass: string;
  crestClass: string;
  textClass: string;
  subClass: string;
  criteria: string[];
  proves: string;
}

export const gradeMeta: Record<CertGrade, GradeMeta> = {
  ruo_verified: {
    key: 'ruo_verified',
    label: 'RUO Verified',
    short: 'Language + review standard met',
    tagline: 'The baseline trust mark.',
    blurb:
      'Awarded to vendors whose full review stream clears our Research Use Only language screen and whose purchase verification holds up. It proves a vendor sells and communicates strictly for research use.',
    icon: 'ri-shield-check-line',
    wrapClass: 'border-teal-200 bg-teal-50',
    crestClass: 'bg-teal-600 text-white',
    textClass: 'text-teal-700',
    subClass: 'text-teal-600/80',
    criteria: [
      'Entire review stream passes the AI RUO language screen',
      'Purchase verification resolves for the bulk of reviews',
      'No unresolved human-consumption or dosing claims',
      'Public vendor profile completed and accurate',
    ],
    proves: 'The vendor talks and sells research-only, with a clean language record.',
  },
  true_coa_verified: {
    key: 'true_coa_verified',
    label: 'True COA Verified',
    short: 'Batch certificate matched to a real lab report',
    tagline: 'The top grade. Earned, never bought.',
    blurb:
      'The highest mark we issue. Our compliance desk takes an actual batch certificate of analysis, matches it against the independent laboratory report and the vials the vendor supplied, and only then issues the seal. Anything disputed or expired is pulled.',
    icon: 'ri-verified-badge-line',
    wrapClass: 'border-emerald-200 bg-emerald-50',
    crestClass: 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white ring-2 ring-amber-300/70',
    textClass: 'text-emerald-800',
    subClass: 'text-emerald-700/80',
    criteria: [
      'Every requirement of RUO Verified, plus:',
      'A current certificate of analysis submitted per batch',
      'COA independently matched to the issuing laboratory report',
      'Batch number traced to the vials supplied to researchers',
    ],
    proves: 'A real, verifiable laboratory certificate backs the compounds being sold.',
  },
};

export const gradeOrder: CertGrade[] = ['true_coa_verified', 'ruo_verified'];

export const issuanceSteps = [
  {
    icon: 'ri-upload-2-line',
    title: 'Vendor submits the certificate',
    desc: 'A Growth or Professional vendor submits the batch certificate of analysis alongside the matching independent laboratory report.',
  },
  {
    icon: 'ri-file-search-line',
    title: 'The compliance desk validates it',
    desc: 'We cross-check the certificate against the laboratory report, the batch number and the supplied vials. Nothing is ever taken on trust.',
  },
  {
    icon: 'ri-user-follow-line',
    title: 'A human reviewer approves',
    desc: 'Only after an admin signs off is the seal issued, bound to a public certificate ID that anyone can look up for themselves.',
  },
  {
    icon: 'ri-shield-flash-line',
    title: 'Kept honest, or pulled',
    desc: 'Every seal carries a re-review date. Pass a dispute, a failed test or an expired certificate and it is suspended or revoked immediately. We would rather pull a seal than let one rot.',
  },
];

export const certFaqs = [
  {
    q: 'What do the two grades actually mean?',
    a: 'RUO Verified is the baseline: the vendor\u2019s entire review stream clears our Research Use Only language screen and purchase verification holds up. True COA Verified is the top grade: on top of everything in RUO Verified, the vendor has submitted a real batch certificate of analysis and we have matched it to the independent laboratory report and the vials on sale.',
  },
  {
    q: 'Can a vendor just buy the seal?',
    a: 'No. A Growth or Professional plan makes a vendor eligible to apply, and that is all it does. The seal itself is a manual compliance decision made on our side. If the certificate does not check out, no plan buys the mark.',
  },
  {
    q: 'What happens if a certificate expires or is disputed?',
    a: 'The seal is suspended immediately and removed from the public registry while the dispute is open. If it fails to resolve, the seal is revoked and the vendor returns to an uncertified state. A revoked seal is never quietly reinstated.',
  },
  {
    q: 'How do I confirm a seal is real?',
    a: 'Every seal carries a unique certificate ID. Enter it in the verification box on this page and the registry returns the exact vendor, grade, issuing laboratory and the date the certificate was last reviewed. A seal that does not resolve is not valid.',
  },
  {
    q: 'Does every vendor on the platform carry a seal?',
    a: 'No, and that is the point. Free and Starter listings are not eligible, and even on the eligible tiers the seal is only issued after approval. An uncertified vendor is simply uncertified, not mislabelled.',
  },
];

export const certEligibleTiers = ['Growth', 'Professional'];