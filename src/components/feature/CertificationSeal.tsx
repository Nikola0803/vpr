import { Link } from 'react-router-dom';
import { gradeMeta, type CertGrade, type CertStatus } from '@/mocks/certifications';

interface Props {
  grade: CertGrade;
  status?: CertStatus;
  size?: 'sm' | 'md' | 'lg';
  certId?: string;
  className?: string;
  linked?: boolean;
}

const sizeMap = {
  sm: {
    wrap: 'gap-1.5 px-2 py-1 rounded-md',
    crest: 'w-5 h-5 text-[11px]',
    label: 'text-[9px]',
    sub: 'text-[9px]',
  },
  md: {
    wrap: 'gap-2 px-2.5 py-1.5 rounded-lg',
    crest: 'w-7 h-7 text-sm',
    label: 'text-[10px]',
    sub: 'text-[10px]',
  },
  lg: {
    wrap: 'gap-3 px-4 py-3 rounded-xl',
    crest: 'w-12 h-12 text-2xl',
    label: 'text-xs',
    sub: 'text-[11px]',
  },
} as const;

export default function CertificationSeal({
  grade,
  status = 'active',
  size = 'md',
  certId,
  className = '',
  linked = false,
}: Props) {
  const meta = gradeMeta[grade];
  const s = sizeMap[size];
  const inactive = status !== 'active';
  const showSub = Boolean(certId) || size !== 'sm';

  const seal = (
    <span
      className={`inline-flex items-center min-w-0 max-w-full ${s.wrap} border ${
        inactive ? 'border-slate-200 bg-slate-50' : meta.wrapClass
      } ${className}`}
    >
      <span
        className={`shrink-0 flex items-center justify-center rounded-full ${s.crest} ${
          inactive ? 'bg-slate-200 text-slate-500' : meta.crestClass
        }`}
      >
        <i className={inactive ? 'ri-close-line' : meta.icon}></i>
      </span>
      <span className="flex flex-col leading-none text-left min-w-0">
        <span
          className={`truncate font-mono font-semibold uppercase tracking-wider ${s.label} ${
            inactive ? 'text-slate-500 line-through decoration-slate-400' : meta.textClass
          }`}
        >
          {meta.label}
          {inactive && <span className="ml-1 no-underline">{status}</span>}
        </span>
        {showSub && (
          <span className={`mt-1 truncate ${s.sub} ${inactive ? 'text-slate-400' : meta.subClass}`}>
            {certId ?? meta.short}
          </span>
        )}
      </span>
    </span>
  );

  if (linked) {
    return (
      <Link
        to="/certification"
        title="Verify this certification seal"
        className="inline-flex min-w-0 max-w-full hover:opacity-90 transition-opacity"
      >
        {seal}
      </Link>
    );
  }

  return seal;
}