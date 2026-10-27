import { Link } from 'react-router-dom';
import type { BlogPost } from '@/mocks/blog';
import SafeImage from '@/components/feature/SafeImage';

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:border-teal-300">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="w-full h-[190px] overflow-hidden bg-slate-100">
          <SafeImage
            src={post.cover}
            alt={post.title}
            title={`${post.title}: peptide review guide`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700">
            {post.category}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">{post.readTime}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="mt-3 block">
          <h3 className="font-display font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed flex-1">{post.excerpt}</p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            <span className="font-medium text-slate-700">{post.author}</span>
            <span className="mx-1.5 text-slate-300">·</span>
            {post.date}
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-teal-700 hover:text-teal-800 text-xs font-semibold flex items-center gap-1"
          >
            Read <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </article>
  );
}
