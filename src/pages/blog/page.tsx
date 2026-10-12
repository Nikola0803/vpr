import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PostCard from '@/pages/blog/components/PostCard';
import { blogPosts, blogCategories } from '@/mocks/blog';

export default function Blog() {
  const [category, setCategory] = useState('All');
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);
  const filtered =
    category === 'All'
      ? rest
      : blogPosts.filter((p) => p.category === category && p.slug !== featured.slug);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25"></div>
        <div className="absolute inset-0 radial-glow"></div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-medium mb-5">
            <i className="ri-article-line text-teal-600"></i>
            <span className="text-slate-700">The Peptide Review Journal</span>
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-[34px] md:text-5xl leading-[1.1] tracking-tight max-w-3xl">
            Guides to build un-bannable trust for your peptide store.
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Practical writing on surviving platform bans, verifying reviews, reading lab reports, winning rich results,
            and turning social proof into revenue.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {category === 'All' && (
        <section className="relative pb-12">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-slate-200 overflow-hidden bg-white">
              <Link to={`/blog/${featured.slug}`} className="block order-first lg:order-none">
                <div className="w-full h-[260px] lg:h-full min-h-[280px] overflow-hidden bg-slate-100">
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    title={`${featured.title}, peptide review guide`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </Link>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-600 text-white">
                    Featured
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700">
                    {featured.category}
                  </span>
                </div>
                <Link to={`/blog/${featured.slug}`}>
                  <h2 className="mt-5 font-display font-extrabold text-slate-900 text-2xl md:text-4xl tracking-tight leading-[1.15] hover:text-teal-700 transition-colors">
                    {featured.title}
                  </h2>
                </Link>
                <p className="mt-4 text-slate-600 leading-relaxed">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{featured.author}</span>
                  <span className="text-slate-300">·</span>
                  <span>{featured.date}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-mono">{featured.readTime}</span>
                </div>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="mt-7 whitespace-nowrap self-start px-5 py-2.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                  Read the guide <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* FILTER + GRID */}
      <section className="relative pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {blogCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  category === c
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 p-16 text-center">
              <i className="ri-article-line text-4xl text-slate-300"></i>
              <div className="mt-4 font-display font-bold text-slate-900 text-lg">No posts in this category yet</div>
              <p className="mt-2 text-sm text-slate-600">Try another topic, new guides drop every week.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 border-t border-slate-200 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
            Reading about it is step one. Protecting it is step two.
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Move your review history onto your own domain and start collecting verified reviews automatically, free
            setup included.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/migration"
              className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-archive-drawer-line"></i>Rescue my reviews
            </Link>
            <Link
              to="/rate/demo"
              className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 border border-slate-200 hover:border-teal-400 transition-all flex items-center justify-center gap-2"
            >
              <i className="ri-star-line"></i>Submit a review
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}