import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { publicVendors, ratingDistribution } from '@/mocks/vendors';
import { useVendorReviews } from '@/hooks/useVendorReviews';
import { useCoaBatches, getCoaFileUrl, type CoaBatch } from '@/hooks/useCoaBatches';
import { useCertifications, formatCertDate } from '@/hooks/useCertifications';
import CertificationSeal from '@/components/feature/CertificationSeal';
import VendorLogo from '@/components/feature/VendorLogo';
import ReviewCard from '@/pages/vendor/components/ReviewCard';
import AboutCompany from '@/pages/vendor/components/AboutCompany';
import ReviewSummary from '@/pages/vendor/components/ReviewSummary';
import ReviewProvenance from '@/pages/vendor/components/ReviewProvenance';
import ReviewPagination from '@/pages/vendor/components/ReviewPagination';

const REVIEWS_PER_PAGE = 8;

const breakdown = [
  { label: 'Product Purity & Efficacy', key: 'purity' as const },
  { label: 'Shipping Speed & Packaging', key: 'shipping' as const },
  { label: 'Researcher Support', key: 'support' as const },
];

const reviewFilters = ['All Reviews', 'Verified Buyer Only', 'With HPLC Proof', '5 Star', '4 Star', 'Compound Tagged'];

export default function VendorProfile() {
  const { slug } = useParams();
  const vendor = publicVendors.find((v) => v.slug === slug) || publicVendors[0];
  const { reviews, loading: reviewsLoading, error: reviewsError, reload: reloadReviews } = useVendorReviews(vendor.slug);
  const { batches, loading: coaLoading, error: coaError, reload: reloadCoa } = useCoaBatches(vendor.slug);
  const { certifications } = useCertifications(vendor.slug);
  const cert = certifications[0];
  const [tab, setTab] = useState<'reviews' | 'coa'>('reviews');

  const handleCoaDownload = async (batch: CoaBatch) => {
    if (!batch.file_path) return;
    const url = await getCoaFileUrl(batch.file_path);
    if (url) window.open(url, '_blank', 'noopener');
  };
  const [filter, setFilter] = useState('All Reviews');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (filter === 'Verified Buyer Only' && !r.verifiedBuyer) return false;
      if (filter === 'With HPLC Proof' && !r.hasLab) return false;
      if (filter === '5 Star' && r.rating !== 5) return false;
      if (filter === '4 Star' && r.rating !== 4) return false;
      if (filter === 'Compound Tagged' && !r.compound) return false;
      return true;
    });
  }, [reviews, filter]);

  // Reset to page one whenever the active filter or vendor changes.
  useEffect(() => {
    setPage(1);
  }, [filter, vendor.slug]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / REVIEWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * REVIEWS_PER_PAGE;
  const paged = filtered.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  // Hidden or unknown vendors are not publicly viewable — send visitors back to the directory.
  if (slug && vendor.slug !== slug) {
    return <Navigate to="/vendors" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {/* BANNER */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="absolute inset-0 radial-glow"></div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-cyan-700">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/vendors" className="hover:text-cyan-700">Directory</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-slate-700">{vendor.name}</span>
          </div>

          <div className="glass rounded-2xl p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <VendorLogo
                name={vendor.name}
                init={vendor.init}
                logo={vendor.logo}
                logoDark={vendor.logoDark}
                logoBg={vendor.logoBg}
                brand={vendor.brand}
                boxClass="w-28 h-20"
                imgClass="max-h-12 max-w-[96px]"
                textClass="text-2xl"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display font-extrabold text-slate-900 text-2xl md:text-3xl tracking-tight">{vendor.name}</h1>
                  {vendor.verified && (
                    <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 flex items-center gap-1">
                      <i className="ri-shield-check-fill"></i>Verified Merchant
                    </span>
                  )}
                  {vendor.planTier === 'free' && (
                    <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                      <i className="ri-price-tag-3-line"></i>Free listing
                    </span>
                  )}
                  {cert && (
                    <CertificationSeal grade={cert.grade} status={cert.status} size="sm" certId={cert.cert_id} linked />
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href={`https://${vendor.domain}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-cyan-700 hover:text-cyan-200 font-mono flex items-center gap-1"
                  >
                    {vendor.domain} <i className="ri-external-link-line"></i>
                  </a>
                  <span className="text-slate-400">·</span>
                  {vendor.ssl && <span className="text-emerald-600 font-mono flex items-center gap-1"><i className="ri-lock-line"></i>SSL Verified</span>}
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-mono flex items-center gap-1"><i className="ri-map-pin-line"></i>{vendor.country}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-mono">Registered {vendor.registered}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-display font-extrabold text-slate-900 text-4xl">{vendor.score.toFixed(1)}</div>
                <div className="text-xs text-slate-500 font-mono">{vendor.reviews.toLocaleString()} reviews</div>
              </div>
              <a
                href={`https://${vendor.domain}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="whitespace-nowrap px-5 py-3 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 flex items-center gap-2"
              >
                Visit Store <i className="ri-arrow-right-up-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW PROVENANCE */}
      <ReviewProvenance />

      {/* ABOUT THE COMPANY */}
      <AboutCompany vendor={vendor} />

      {/* BREAKDOWN + TRUST */}
      <section className="relative pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="text-sm font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <i className="ri-bar-chart-grouped-line text-cyan-600"></i>Aggregate Score Breakdown
            </div>
            <div className="space-y-5">
              {breakdown.map((b) => {
                const val = vendor[b.key];
                return (
                  <div key={b.key}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-700">{b.label}</span>
                      <span className="font-mono text-slate-900">{val.toFixed(2)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500" style={{ width: `${(val / 5) * 100}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <i className="ri-shield-star-line text-emerald-600"></i>Trust Signals
            </div>
            {cert && (
              <div className={`mb-4 rounded-lg border px-3 py-3 ${cert.status === 'active' ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                <CertificationSeal grade={cert.grade} status={cert.status} size="sm" certId={cert.cert_id} linked />
                <div className="mt-2 text-[11px] text-slate-600 leading-relaxed flex items-start gap-1.5">
                  <i className={`mt-0.5 ${cert.status === 'active' ? 'ri-verified-badge-fill text-emerald-600' : 'ri-error-warning-fill text-amber-600'}`}></i>
                  <span>
                    {cert.status === 'active'
                      ? `Approved by our compliance desk, valid to ${formatCertDate(cert.expires_at)}.`
                      : 'This certification is not currently active.'}
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-3">
              {[
                { l: 'Public Batch COAs', on: vendor.publicCoa, i: 'ri-file-shield-2-line' },
                { l: 'Third-Party Lab Verified', on: vendor.thirdPartyLab, i: 'ri-flask-line' },
                { l: 'QR Code Verification', on: vendor.qrVerify, i: 'ri-qr-code-line' },
              ].map((s) => (
                <div key={s.l} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-100 border border-slate-200">
                  <span className="text-xs text-slate-700 flex items-center gap-2">
                    <i className={`${s.i} ${s.on ? 'text-emerald-600' : 'text-slate-400'}`}></i>{s.l}
                  </span>
                  <i className={s.on ? 'ri-check-line text-emerald-600' : 'ri-subtract-line text-slate-400'}></i>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-slate-100 border border-slate-200 px-3 py-2.5">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Avg Ship</div>
                  <div className="text-sm text-slate-900 mt-0.5">{vendor.avgShipDays}d</div>
                </div>
                <div className="rounded-lg bg-slate-100 border border-slate-200 px-3 py-2.5">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Response</div>
                  <div className="text-sm text-slate-900 mt-0.5">{vendor.responseRate}%</div>
                </div>
              </div>
              {vendor.planTier === 'free' && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-[11px] text-amber-800 leading-relaxed">
                  <i className="ri-information-line mr-1"></i>Free listing — basic profile data only.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AI REVIEW SUMMARY */}
      <ReviewSummary vendor={vendor} />

      {/* TABS */}
      <section className="relative pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="glass rounded-full p-1 inline-flex">
            <button
              onClick={() => setTab('reviews')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'reviews' ? 'bg-cyan-500/20 text-cyan-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="ri-chat-3-line mr-1.5"></i>Review Stream
            </button>
            <button
              onClick={() => setTab('coa')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === 'coa' ? 'bg-cyan-500/20 text-cyan-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="ri-flask-line mr-1.5"></i>HPLC / COA Vault
            </button>
          </div>
            <Link
              to={`/write-review?vendor=${vendor.slug}`}
              className="whitespace-nowrap px-5 py-3 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 flex items-center gap-2"
            >
              <i className="ri-quill-pen-line"></i>Write a Review
            </Link>
          </div>

          {tab === 'reviews' ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              <div className="space-y-5">
                {/* Moderation notice */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-2.5">
                  <i className="ri-time-line text-amber-600 text-base mt-0.5 shrink-0"></i>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <span className="font-semibold">Reviews are being manually approved</span> — their number can increase or decrease.
                    Final reviews and their textual content will be shown after migration and approval by the VPR team.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {reviewFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-all whitespace-nowrap ${
                        filter === f
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-cyan-500/30'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                {reviewsLoading ? (
                  <div className="space-y-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                        <div className="h-4 w-40 rounded bg-slate-200/70"></div>
                        <div className="mt-3 h-3 w-24 rounded bg-slate-200/60"></div>
                        <div className="mt-4 h-3 w-full rounded bg-slate-200/50"></div>
                        <div className="mt-2 h-3 w-3/4 rounded bg-slate-200/50"></div>
                      </div>
                    ))}
                  </div>
                ) : reviewsError ? (
                  <div className="glass rounded-2xl p-10 text-center">
                    <i className="ri-error-warning-line text-3xl text-amber-500"></i>
                    <div className="mt-3 text-sm text-slate-700">We couldn&apos;t load reviews right now.</div>
                    <div className="mt-1 text-xs text-slate-500">{reviewsError}</div>
                    <button
                      onClick={reloadReviews}
                      className="mt-4 whitespace-nowrap px-4 py-2 rounded-md text-xs font-semibold text-cyan-700 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                    >
                      <i className="ri-refresh-line mr-1"></i>Retry
                    </button>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center">
                    <i className="ri-chat-off-line text-3xl text-slate-400"></i>
                    <div className="mt-3 text-sm text-slate-600">No reviews match this filter.</div>
                  </div>
                ) : (
                  <>
                    {paged.map((r) => <ReviewCard key={r.id} review={r} />)}
                    <ReviewPagination
                      page={safePage}
                      totalPages={totalPages}
                      total={filtered.length}
                      start={startIndex + 1}
                      end={Math.min(startIndex + REVIEWS_PER_PAGE, filtered.length)}
                      onChange={setPage}
                    />
                  </>
                )}
              </div>

              <aside className="lg:sticky lg:top-24 self-start space-y-4">
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Compounds Carried</div>
                  <div className="flex flex-wrap gap-1.5">
                    {vendor.compounds.map((c) => (
                      <span key={c} className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Rating Distribution</div>
                  {ratingDistribution(vendor.score).map(({ star: s, pct }) => {
                    return (
                      <div key={s} className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono text-slate-500 w-3">{s}</span>
                        <i className="ri-star-fill text-emerald-600 text-[10px]"></i>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Vendor Response Rate</div>
                  <div className="font-display font-extrabold text-slate-900 text-3xl">{vendor.responseRate}%</div>
                  <div className="text-xs text-slate-500 mt-1">Of reviews replied to within 48h</div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-file-shield-2-line text-cyan-600"></i>Batch Certificates of Analysis
                </div>
                <Link
                  to="/coa-verifier"
                  className="whitespace-nowrap text-xs font-semibold text-cyan-700 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all px-3.5 py-2 rounded-md flex items-center gap-1.5"
                >
                  <i className="ri-fingerprint-line"></i>Verify a COA
                </Link>
              </div>
              {coaLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="rounded-xl bg-slate-50 border border-slate-200 p-5 animate-pulse">
                      <div className="h-3 w-24 rounded bg-slate-200/70"></div>
                      <div className="mt-3 h-4 w-28 rounded bg-slate-200/60"></div>
                      <div className="mt-3 h-3 w-32 rounded bg-slate-200/50"></div>
                    </div>
                  ))}
                </div>
              ) : coaError ? (
                <div className="rounded-xl bg-slate-50 border border-amber-200 p-8 text-center">
                  <i className="ri-error-warning-line text-3xl text-amber-500"></i>
                  <div className="mt-3 text-sm text-slate-700">We couldn&apos;t load the COA vault right now.</div>
                  <button
                    onClick={reloadCoa}
                    className="mt-4 whitespace-nowrap px-4 py-2 rounded-md text-xs font-semibold text-cyan-700 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                  >
                    <i className="ri-refresh-line mr-1"></i>Retry
                  </button>
                </div>
              ) : batches.length === 0 ? (
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-10 text-center">
                  <i className="ri-file-shield-2-line text-3xl text-slate-400"></i>
                  <div className="mt-3 text-sm text-slate-600">No batch certificates published for this vendor yet.</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {batches.map((x) => (
                    <div key={x.id} className="rounded-xl bg-slate-50 border border-slate-200 p-5 hover:border-cyan-500/40 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-cyan-700">{x.batch_no}</span>
                        <i className="ri-qr-code-line text-slate-500"></i>
                      </div>
                      <div className="mt-3 font-display font-bold text-slate-900">{x.compound}</div>
                      <div className="mt-1 flex items-center gap-3 text-xs">
                        {x.purity && <span className="font-mono text-emerald-600">{x.purity} purity</span>}
                        {x.lab && <span className="text-slate-500">{x.lab}</span>}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">{x.batch_date || 'Awaiting date'}</span>
                        {x.file_path ? (
                          <button
                            onClick={() => handleCoaDownload(x)}
                            className="text-xs font-semibold text-cyan-700 hover:text-cyan-200 flex items-center gap-1 whitespace-nowrap"
                          >
                            <i className="ri-download-2-line"></i>PDF
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">Verification pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}