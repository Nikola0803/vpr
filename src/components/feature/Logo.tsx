const VPR_LOGO =
  'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/0db37104-9f71-4c1f-8bfe-839afcb46169_compressed_exec-98d44e0c-a1a0-473f-822f-be22d2493962.webp';

interface LogoProps {
  /** Render a slightly shorter lockup for tight spaces (e.g. compact navbars). */
  compact?: boolean;
}

export default function Logo({ compact = false }: LogoProps) {
  return (
    <img
      src={VPR_LOGO}
      alt="Verified Peptide Reviews logo"
      title="VerifiedPeptideReviews · Real reviews. Better research."
      className={`w-auto object-contain ${compact ? 'h-11' : 'h-14'}`}
    />
  );
}