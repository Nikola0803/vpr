import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ModerationCard from '@/pages/admin/components/ModerationCard';
import {
  fetchQueue,
  moderateReview,
  getModKey,
  setModKey,
  clearModKey,
  type QueueReview,
} from '@/pages/admin/api';

export default function ReviewModeration() {
  const [unlocked, setUnlocked] = useState(Boolean(getModKey()));
  const [pass, setPass] = useState('');
  const [pending, setPending] = useState<QueueReview[]>([]);
  const [rejected, setRejected] = useState<QueueReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [showRejected, setShowRejected] = useState(false);

  const lock = useCallback((message = '') => {
    clearModKey();
    setUnlocked(false);
    setPending([]);
    setRejected([]);
    setError(message);
  }, []);

  const load = useCallback(async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchQueue(key);
      setPending(data.pending);
      setRejected(data.rejected);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Could not load the moderation queue.';
      if (/passphrase/i.test(message)) {
        lock('That passphrase was incorrect. Please try again.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, [lock]);

  useEffect(() => {
    if (unlocked) load(getModKey());
  }, [unlocked, load]);

  const unlock = (e: FormEvent) => {
    e.preventDefault();
    const key = pass.trim();
    if (!key) return;
    setModKey(key);
    setPass('');
    setError('');
    setUnlocked(true);
  };

  const handleDecision = async (id: number, action: 'approve' | 'reject') => {
    setBusyId(id);
    setError('');
    try {
      await moderateReview(id, action);
      setPending((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'That action could not be completed.';
      if (/passphrase/i.test(message)) {
        lock('Your session expired. Please enter the passphrase again.');
      } else {
        setError(message);
      }
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 md:px-10 pt-32 pb-24">
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-700">Internal tools</div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
              Review Moderation
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-xl">
              Approve reviews to publish them live on the vendor pages, or reject them to keep them out. Nothing here is
              visible to visitors.
            </p>
          </div>
          {unlocked && (
            <button
              type="button"
              onClick={() => lock()}
              className="whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-semibold text-slate-700 border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <i className="ri-lock-line mr-1.5"></i>Lock
            </button>
          )}
        </div>

        {!unlocked ? (
          <form onSubmit={unlock} className="mt-10 glass rounded-2xl p-6 md:p-8 max-w-md">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-teal-50 border border-teal-200 text-teal-700">
              <i className="ri-shield-keyhole-line text-xl"></i>
            </div>
            <h2 className="mt-4 font-display font-bold text-slate-900 text-lg">Enter admin passphrase</h2>
            <p className="mt-1 text-sm text-slate-500">This queue is protected. Only you should have this phrase.</p>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Passphrase"
              autoComplete="off"
              className="mt-4 w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400"
            />
            {error && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-xs text-rose-700">
                <i className="ri-error-warning-line mt-0.5"></i>
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={!pass.trim()}
              className={`mt-4 w-full whitespace-nowrap px-5 py-3 rounded-md text-sm font-semibold text-white transition-colors ${
                pass.trim() ? 'bg-teal-600 hover:bg-teal-700' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Unlock queue
            </button>
          </form>
        ) : (
          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Awaiting review</div>
                <div className="mt-1 font-display font-extrabold text-slate-900 text-3xl">{pending.length}</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Rejected</div>
                <div className="mt-1 font-display font-extrabold text-slate-900 text-3xl">{rejected.length}</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Queue status</div>
                <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <i className="ri-checkbox-circle-line"></i>Protected &amp; live
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-700">
                <i className="ri-error-warning-line mt-0.5"></i>
                <span>{error}</span>
                <button onClick={() => load(getModKey())} className="ml-auto font-semibold underline whitespace-nowrap">
                  Retry
                </button>
              </div>
            )}

            {loading ? (
              <div className="mt-6 space-y-4">
                {[0, 1].map((i) => (
                  <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                    <div className="h-4 w-40 rounded bg-slate-200/70"></div>
                    <div className="mt-3 h-3 w-24 rounded bg-slate-200/60"></div>
                    <div className="mt-4 h-3 w-full rounded bg-slate-200/50"></div>
                  </div>
                ))}
              </div>
            ) : pending.length === 0 ? (
              <div className="mt-6 glass rounded-2xl p-12 text-center">
                <i className="ri-inbox-archive-line text-3xl text-slate-400"></i>
                <div className="mt-3 text-sm text-slate-600">All caught up - nothing waiting for moderation.</div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {pending.map((r) => (
                  <ModerationCard
                    key={r.id}
                    review={r}
                    busy={busyId === r.id}
                    onApprove={(id) => handleDecision(id, 'approve')}
                    onReject={(id) => handleDecision(id, 'reject')}
                  />
                ))}
              </div>
            )}

            {rejected.length > 0 && (
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => setShowRejected((v) => !v)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  <i className={showRejected ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}></i>
                  Rejected reviews ({rejected.length})
                </button>
                {showRejected && (
                  <div className="mt-4 space-y-3">
                    {rejected.map((r) => (
                      <div key={r.id} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono text-slate-700">#{r.id}</span>
                          <span className="text-slate-500">{r.author}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            Rejected
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 line-clamp-2">{r.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}