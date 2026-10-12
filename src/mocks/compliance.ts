export const ruoIntro = {
  eyebrow: 'Research Use Only \u2014 enforced by AI',
  title: 'RUO is not a label here.',
  titleAccent: 'It is a rule the engine enforces.',
  lead:
    'Everything on Verified Peptide Reviews sits under a strict Research Use Only standard. Language that reads as personal, human-consumption or consumer use is never published as written. Our AI language screen removes, blurs or rewrites it before anyone sees it, protecting researchers, vendors and the platform alike.',
  short:
    'Every review is screened against a strict Research Use Only standard. Personal-use or human-consumption language is removed, blurred or rewritten by AI before it ever goes live.',
};

export const ruoActions = [
  {
    icon: 'ri-delete-bin-6-line',
    title: 'Removed',
    desc: 'Personal-use framing such as human dosing, self-experimentation or consumption guidance is stripped out entirely before publish.',
    tone: 'rose',
  },
  {
    icon: 'ri-eye-off-line',
    title: 'Blurred',
    desc: 'Ambiguous or borderline phrasing is masked on the public page so it can never be read as advice to any person.',
    tone: 'amber',
  },
  {
    icon: 'ri-magic-line',
    title: 'AI-modified',
    desc: 'Salvageable insight is rewritten into neutral, RUO-qualified language that keeps the signal and drops the risk.',
    tone: 'cyan',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Published',
    desc: 'Only content that clears the RUO screen goes live, clean, qualified and safe for a research-only audience.',
    tone: 'emerald',
  },
];

export const ruoGuarantees = [
  'No human-consumption, dosing or medical directives',
  'No consumer or personal-use claims, in any wording',
  'AI screening runs on every review before it is indexed',
  'Flagged content routes to human review, never straight through',
];

export const ruoStats = [
  { value: '100%', label: 'of reviews screened before publishing', icon: 'ri-shield-star-line' },
  { value: 'AI + human', label: 'two-stage language screening', icon: 'ri-cpu-line' },
  { value: '0', label: 'non-RUO claims left standing', icon: 'ri-forbid-2-line' },
  { value: 'Always on', label: 're-scanned on every new post', icon: 'ri-refresh-line' },
];

export const ruoChips = ['Removed', 'Blurred', 'AI-modified', 'Published'];