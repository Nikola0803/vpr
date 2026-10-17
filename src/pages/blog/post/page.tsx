import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PostCard from '@/pages/blog/components/PostCard';
import { blogPosts } from '@/mocks/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-slate-800 font-sans">
        <Navbar />
        <section className="pt-40 pb-24">
          <div className="max-w-[700px] mx-auto px-6 text-center">
            <i className="ri-article-line text-5xl text-slate-300"></i>
            <h1 className="mt-5 font-display font-extrabold text-slate-900 text-3xl tracking-tight">
              We couldn't find that guide
            </h1>
            <p className="mt-3 text-slate-600">
              The article may have been moved or renamed. Head back to the journal to browse everything we've published.
            </p>
            <Link
              to="/blog"
              className="mt-7 inline-flex whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors items-center gap-2"
            >
              <i className="ri-arrow-left-line"></i>Back to the blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const fallback = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallback;

  const metaDesc = post.metaDescription ?? post.excerpt;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Helmet>
        <title>{post.title} | Verified Peptide Reviews</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.cover} />
        <meta property="article:published_time" content={post.isoDate ?? post.date} />
        <link rel="canonical" href={`https://www.verifiedpeptidereviews.com/blog/${post.slug}`} />
      </Helmet>
      <Navbar />

      <article>
        {/* HEADER */}
        <header className="relative pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute inset-0 radial-glow"></div>
          <div className="relative max-w-[820px] mx-auto px-6">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-800">
              <i className="ri-arrow-left-line"></i>All guides
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700">
                {post.category}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">{post.readTime}</span>
            </div>
            <h1 className="mt-5 font-display font-extrabold text-slate-900 text-3xl md:text-5xl leading-[1.12] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
            <div className="mt-7 flex items-center gap-3 pt-5 border-t border-slate-200">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-sm font-bold flex items-center justify-center">
                {post.author.charAt(0)}
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">{post.author}</div>
                <div className="text-xs text-slate-500">
                  {post.authorRole} <span className="mx-1 text-slate-300">·</span> {post.date}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* COVER */}
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={post.cover}
              alt={post.title}
              title={`${post.title}: peptide review guide`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* BODY */}
        <div className="max-w-[740px] mx-auto px-6 py-14">
          <div className="space-y-9">
            {post.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display font-bold text-slate-900 text-xl md:text-2xl tracking-tight">{s.heading}</h2>
                <p className="mt-3 text-slate-700 leading-relaxed prose-links" dangerouslySetInnerHTML={{ __html: s.body }} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                #{t}
              </span>
            ))}
          </div>

          {/* INLINE CTA */}
          <div className="mt-12 rounded-2xl border border-teal-200 bg-teal-50/70 p-7 text-center">
            <h3 className="font-display font-bold text-slate-900 text-xl">Want this protection on your store?</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Move your history onto your own domain, then collect verified reviews automatically. Setup support is free.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/migration"
                className="whitespace-nowrap px-5 py-2.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
              >
                Rescue my reviews
              </Link>
              <Link
                to="/verification"
                className="whitespace-nowrap px-5 py-2.5 rounded-md text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:border-teal-400 transition-all"
              >
                How verification works
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED */}
      <section className="relative py-16 border-t border-slate-200 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-display font-extrabold text-slate-900 text-2xl md:text-3xl tracking-tight">
              Keep reading
            </h2>
            <Link to="/blog" className="text-sm font-medium text-slate-600 hover:text-teal-700 whitespace-nowrap flex items-center gap-2">
              All guides <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}