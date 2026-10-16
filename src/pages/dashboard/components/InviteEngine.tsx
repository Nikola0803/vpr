import { useState } from 'react';

const csvColumns = [
  { source: 'email', target: 'Customer Email', required: true },
  { source: 'order_id', target: 'Order ID', required: true },
  { source: 'first_name', target: 'First Name', required: false },
  { source: 'product', target: 'Product Name', required: false },
];

const integrationDefs = [
  { name: 'WooCommerce', icon: 'ri-wordpress-line', desc: 'Order hooks - auto-sync on fulfillment' },
  { name: 'WordPress Plugin', icon: 'ri-code-s-slash-line', desc: 'Shortcode widget for your storefront' },
  { name: 'Custom Checkout', icon: 'ri-webhook-line', desc: 'Signed order webhook for any platform' },
  { name: 'Third-Party Storefront', icon: 'ri-store-2-line', desc: 'Drop-in snippet for Shopify, Wix, etc.' },
];

const templateDefs = [
  { name: 'Post-Purchase (7 days)', subject: 'How was your order? Leave a quick review' },
  { name: 'Post-Purchase (14 days)', subject: 'Your research matters - share your experience' },
  { name: 'Batch Completion', subject: 'Your batch results are ready - tell us what you think' },
];

export default function InviteEngine() {
  const [tab, setTab] = useState<'csv' | 'integrations' | 'templates'>('integrations');
  const [fileSelected, setFileSelected] = useState(false);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="glass rounded-2xl p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <i className="ri-send-plane-line text-cyan-600"></i>Automated Review Invitation Engine
            </div>
            <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-100 text-slate-500">
              Connect store to track usage
            </span>
          </div>

          <div className="glass rounded-full p-1 inline-flex mb-5">
            {[
              { k: 'csv', l: 'Order Import' },
              { k: 'integrations', l: 'Store Integrations' },
              { k: 'templates', l: 'Templates' },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k as typeof tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  tab === t.k ? 'bg-cyan-500/20 text-cyan-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>

          {tab === 'csv' && (
            <div>
              <div
                onClick={() => setFileSelected(true)}
                className={`rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                  fileSelected
                    ? 'border-emerald-500/40 bg-emerald-500/[0.04]'
                    : 'border-slate-200 hover:border-cyan-500/40 bg-slate-50'
                }`}
              >
                <i className={`${fileSelected ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-upload-cloud-2-line text-cyan-600'} text-3xl`}></i>
                <div className="mt-3 text-sm font-semibold text-slate-900">
                  {fileSelected ? 'File selected - review column mapping below' : 'Import your order records (your own customers)'}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {fileSelected ? 'Map columns then send invitations' : 'Your own customers only · Email, Order ID, Name, Products · max 50MB'}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Expected Column Mapping</div>
                <div className="space-y-2">
                  {csvColumns.map((c) => (
                    <div key={c.source} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-100 border border-slate-200">
                      <i className="ri-file-excel-2-line text-teal-600"></i>
                      <span className="text-xs font-mono text-slate-700 flex-1">{c.source}</span>
                      <i className="ri-arrow-right-line text-slate-400"></i>
                      <span className="text-xs text-slate-900">{c.target}</span>
                      {c.required && <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600">REQ</span>}
                    </div>
                  ))}
                </div>
              </div>

              <button
                disabled={!fileSelected}
                className="mt-5 whitespace-nowrap px-5 py-3 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send review invites
              </button>

              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-teal-500/25 bg-teal-500/[0.06] px-3.5 py-3">
                <i className="ri-shield-check-line text-teal-700 mt-0.5"></i>
                <p className="text-[11px] text-teal-900 leading-relaxed">
                  Your customers, your list. Each address is used once to invite a review and is never bought, sold, rented or shared. Every invite carries a one-click opt-out, and we never contact anyone who did not order from you.
                </p>
              </div>
            </div>
          )}

          {tab === 'integrations' && (
            <div className="space-y-3">
              {integrationDefs.map((i) => (
                <div key={i.name} className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-100 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 text-cyan-700">
                      <i className={`${i.icon} text-lg`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{i.name}</div>
                      <div className="text-xs text-slate-500">{i.desc}</div>
                    </div>
                  </div>
                  <button className="text-[11px] font-mono px-2.5 py-1 rounded-md border whitespace-nowrap border-cyan-500/30 text-cyan-700 hover:bg-cyan-500/10 transition-all">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'templates' && (
            <div className="space-y-3">
              {templateDefs.map((t) => (
                <div key={t.name} className="px-4 py-3.5 rounded-xl bg-slate-100 border border-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <button className="text-xs text-cyan-700 hover:text-cyan-800 whitespace-nowrap">Edit</button>
                  </div>
                  <div className="mt-1 text-xs font-mono text-slate-600">{t.subject}</div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400 italic">No sends yet</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <i className="ri-history-line text-teal-600"></i>Recent Invite Activity
          </div>
          <div className="h-48 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <i className="ri-mail-send-line text-2xl text-slate-300"></i>
            <p className="mt-2 text-sm text-slate-400">No invites sent yet</p>
            <p className="mt-1 text-xs text-slate-400">Connect a store or import orders to get started</p>
          </div>
          <p className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
            <i className="ri-lock-2-line"></i>
            Addresses masked · used once · never sold or shared
          </p>
        </div>
      </div>
    </div>
  );
}
