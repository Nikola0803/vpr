import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useCoaBatches, getCoaFileUrl, type CoaBatch } from '@/hooks/useCoaBatches';

interface Props {
  vendorSlug: string;
}

interface BatchForm {
  batchNo: string;
  compound: string;
  purity: string;
  lab: string;
  batchDate: string;
}

const emptyForm: BatchForm = { batchNo: '', compound: '', purity: '', lab: '', batchDate: '' };

function toBatchNo(fileName: string): string {
  const stem = fileName.replace(/\.[^.]+$/, '');
  return stem.toUpperCase().replace(/[^A-Z0-9._-]/g, '-').replace(/-+/g, '-').slice(0, 40) || 'UNLABELLED';
}

export default function CoaVault({ vendorSlug }: Props) {
  const { batches, loading, error, reload } = useCoaBatches(vendorSlug);
  const [modalOpen, setModalOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [form, setForm] = useState<BatchForm>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const bulkRef = useRef<HTMLInputElement>(null);

  const linkedTotal = batches.reduce((sum, b) => sum + (b.linked_reviews || 0), 0);
  const pendingTotal = batches.filter((b) => b.status !== 'Verified').length;

  const uploadFile = async (batchFile: File, meta: BatchForm): Promise<void> => {
    const presign = await supabase.functions.invoke('coa-vault', {
      body: { action: 'presign', vendorSlug, fileName: batchFile.name },
    });
    const token = presign.data?.token as string | undefined;
    const path = presign.data?.path as string | undefined;
    if (presign.error || !token || !path) {
      throw new Error(presign.error?.message || 'Could not prepare the upload.');
    }
    const upload = await supabase.storage.from('private').uploadToSignedUrl(path, token, batchFile);
    if (upload.error) throw upload.error;

    const commit = await supabase.functions.invoke('coa-vault', {
      body: {
        action: 'commit',
        vendorSlug,
        batchNo: meta.batchNo,
        compound: meta.compound,
        purity: meta.purity,
        lab: meta.lab,
        batchDate: meta.batchDate,
        filePath: path,
        fileName: batchFile.name,
      },
    });
    if (commit.error) throw commit.error;
    if (commit.data?.error) throw new Error(commit.data.error as string);
  };

  const submitNewBatch = async () => {
    if (!file || !form.batchNo.trim() || !form.compound.trim()) {
      setFeedback({ type: 'err', text: 'Batch number, compound and a certificate file are required.' });
      return;
    }
    setBusy(true);
    setFeedback(null);
    try {
      await uploadFile(file, form);
      setFeedback({ type: 'ok', text: `Batch ${form.batchNo.trim()} uploaded. Awaiting lab verification.` });
      setForm(emptyForm);
      setFile(null);
      setModalOpen(false);
      await reload();
    } catch (e) {
      setFeedback({ type: 'err', text: e instanceof Error ? e.message : 'Upload failed. Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const submitBulk = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setFeedback(null);
    const list = Array.from(files);
    let ok = 0;
    let failed = 0;
    try {
      for (const f of list) {
        try {
          await uploadFile(f, { ...emptyForm, batchNo: toBatchNo(f.name), compound: 'Unassigned' });
          ok += 1;
        } catch {
          failed += 1;
        }
      }
      setFeedback({
        type: failed === 0 ? 'ok' : 'err',
        text: `Bulk upload finished: ${ok} added${failed ? `, ${failed} failed` : ''}. Unassigned batches need compound details.`,
      });
      await reload();
    } finally {
      setBusy(false);
      if (bulkRef.current) bulkRef.current.value = '';
    }
  };

  const download = async (batch: CoaBatch) => {
    if (!batch.file_path) return;
    const url = await getCoaFileUrl(batch.file_path);
    if (url) window.open(url, '_blank', 'noopener');
  };

  const stats = [
    { l: 'Certificates in Vault', v: String(batches.length), i: 'ri-file-shield-2-line', c: 'text-cyan-600' },
    { l: 'Batches Linked to Reviews', v: String(linkedTotal), i: 'ri-links-line', c: 'text-teal-600' },
    { l: 'Pending Lab Verification', v: String(pendingTotal), i: 'ri-time-line', c: 'text-amber-600' },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.l} className="glass rounded-2xl p-5 glass-hover">
            <div className="flex items-center justify-between">
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 ${s.c}`}>
                <i className={`${s.i} text-lg`}></i>
              </span>
              <span className="font-display font-extrabold text-slate-900 text-2xl">{s.v}</span>
            </div>
            <div className="mt-3 text-xs text-slate-600">{s.l}</div>
          </div>
        ))}
      </div>

      {feedback && (
        <div
          className={`flex items-start gap-2 rounded-xl px-4 py-3 text-xs border ${
            feedback.type === 'ok'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          <i className={`${feedback.type === 'ok' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} mt-0.5`}></i>
          <span>{feedback.text}</span>
        </div>
      )}

      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <i className="ri-flask-line text-cyan-600"></i>HPLC Lab Management Vault
          </div>
          <div className="flex gap-2">
            <input
              ref={bulkRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => submitBulk(e.target.files)}
            />
            <button
              onClick={() => bulkRef.current?.click()}
              disabled={busy}
              className="whitespace-nowrap text-xs font-semibold px-3 py-2 rounded-md border border-slate-200 text-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-1.5 disabled:opacity-60"
            >
              <i className="ri-upload-2-line"></i>Bulk Upload
            </button>
            <button
              onClick={() => {
                setFeedback(null);
                setModalOpen(true);
              }}
              className="whitespace-nowrap text-xs font-semibold px-3 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 border border-cyan-400/30 flex items-center gap-1.5"
            >
              <i className="ri-add-line"></i>New Batch
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-slate-500">
            <i className="ri-loader-4-line animate-spin text-lg"></i>
            <div className="mt-2">Loading vault…</div>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <i className="ri-error-warning-line text-2xl text-amber-500"></i>
            <div className="mt-2 text-sm text-slate-700">Could not load the vault.</div>
            <div className="mt-1 text-xs text-slate-500">{error}</div>
            <button
              onClick={reload}
              className="mt-4 whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-md border border-cyan-500/30 text-cyan-700 hover:bg-cyan-500/10 transition-all"
            >
              <i className="ri-refresh-line mr-1"></i>Retry
            </button>
          </div>
        ) : batches.length === 0 ? (
          <div className="py-10 text-center">
            <i className="ri-file-shield-2-line text-3xl text-slate-400"></i>
            <div className="mt-3 text-sm text-slate-600">No certificates in the vault yet. Upload your first batch.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Batch Number', 'Compound', 'Purity', 'Lab', 'Linked Reviews', 'Date', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batches.map((b, i) => (
                  <tr key={b.id} className={`${i % 2 === 1 ? 'bg-slate-50' : ''} hover:bg-cyan-500/[0.03] transition-colors`}>
                    <td className="px-4 py-3 text-xs font-mono text-cyan-700">{b.batch_no}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">{b.compound}</td>
                    <td className="px-4 py-3 text-sm font-mono text-emerald-600">{b.purity || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{b.lab || '—'}</td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-700">{b.linked_reviews}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{b.batch_date || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-1 rounded-md border whitespace-nowrap ${
                          b.status === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25'
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/25'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {b.file_path ? (
                        <button
                          onClick={() => download(b)}
                          className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 whitespace-nowrap"
                        >
                          <i className="ri-download-2-line"></i>PDF
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">No file</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30" onClick={() => (busy ? null : setModalOpen(false))}></div>
          <div className="relative w-full max-w-lg glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display font-bold text-slate-900 text-lg">Upload batch certificate</div>
              <button
                onClick={() => (busy ? null : setModalOpen(false))}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Batch Number *</label>
                <input
                  value={form.batchNo}
                  onChange={(e) => setForm({ ...form, batchNo: e.target.value })}
                  placeholder="KP-BPC-2409"
                  className="mt-1.5 w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Compound *</label>
                <input
                  value={form.compound}
                  onChange={(e) => setForm({ ...form, compound: e.target.value })}
                  placeholder="BPC-157"
                  className="mt-1.5 w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Purity</label>
                <input
                  value={form.purity}
                  onChange={(e) => setForm({ ...form, purity: e.target.value })}
                  placeholder="99.2%"
                  className="mt-1.5 w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Lab</label>
                <input
                  value={form.lab}
                  onChange={(e) => setForm({ ...form, lab: e.target.value })}
                  placeholder="Janoshik"
                  className="mt-1.5 w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Batch Date</label>
                <input
                  value={form.batchDate}
                  onChange={(e) => setForm({ ...form, batchDate: e.target.value })}
                  placeholder="Sep 18, 2026"
                  className="mt-1.5 w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <label className="mt-4 block rounded-xl border-2 border-dashed border-slate-200 hover:border-cyan-400 bg-slate-50 p-5 text-center cursor-pointer transition-colors">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <i className="ri-upload-cloud-2-line text-2xl text-cyan-600"></i>
              <div className="mt-1.5 text-sm text-slate-700">
                {file ? file.name : 'Attach the certificate (PDF or image)'}
              </div>
              <div className="mt-1 text-xs text-slate-400">Stored securely, viewable through signed links only</div>
            </label>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => (busy ? null : setModalOpen(false))}
                className="whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-semibold text-slate-600 border border-slate-200 hover:border-cyan-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={submitNewBatch}
                disabled={busy}
                className={`whitespace-nowrap px-5 py-2.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 flex items-center gap-2 ${
                  busy ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {busy ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>Uploading…
                  </>
                ) : (
                  <>
                    <i className="ri-check-line"></i>Add to Vault
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}