import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Props {
  source?: string;
  compact?: boolean;
}

export default function NewsletterSignup({ source = 'footer', compact = false }: Props) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error' | 'dupe'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim().toLowerCase(), source });
    if (!error) {
      setState('done');
    } else if (error.code === '23505') {
      setState('dupe');
    } else {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className={`flex items-center gap-2 text-sm text-teal-700 ${compact ? '' : 'py-1'}`}>
        <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
          <i className="ri-check-line text-xs text-teal-600"></i>
        </span>
        You're in. Digest lands every Friday.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex gap-2 ${compact ? 'w-full' : ''}`}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 min-w-0 rounded-lg border px-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-teal-400/40 transition-all ${
          state === 'error' ? 'border-red-300' : 'border-teal-200 focus:border-teal-400/60'
        } ${compact ? 'py-2' : 'py-2.5'}`}
      />
      <button
        type="submit"
        disabled={state === 'loading' || !email.includes('@')}
        className={`shrink-0 whitespace-nowrap rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all disabled:opacity-50 ${compact ? 'px-3 py-2' : 'px-4 py-2.5'}`}
      >
        {state === 'loading' ? <i className="ri-loader-4-line animate-spin"></i> : 'Subscribe'}
      </button>
      {(state === 'dupe') && (
        <span className="absolute -bottom-5 left-0 text-[11px] text-slate-400">Already subscribed.</span>
      )}
    </form>
  );
}
