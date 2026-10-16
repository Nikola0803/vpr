import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { VendorReview } from '@/mocks/vendorReviews';
import { vendorReviewsBySlug as mockReviews } from '@/mocks/vendorReviews';

interface VendorReviewRow {
  id: number;
  author: string;
  order_ref: string | null;
  proof_hash: string;
  rating: number;
  compound: string | null;
  verified_buyer: boolean;
  has_lab: boolean;
  body: string;
  reply: string | null;
  reply_by: string | null;
  ruo_status: string;
  created_at: string;
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return `${w} week${w > 1 ? 's' : ''} ago`;
  }
  if (days < 365) {
    const m = Math.floor(days / 30);
    return `${m} month${m > 1 ? 's' : ''} ago`;
  }
  const y = Math.floor(days / 365);
  return `${y} year${y > 1 ? 's' : ''} ago`;
}

export function fullTimestamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`;
}

export function mapReviewRow(row: VendorReviewRow): VendorReview {
  return {
    id: String(row.id),
    author: row.author,
    order: row.order_ref || '-',
    hash: row.proof_hash,
    ts: fullTimestamp(row.created_at),
    rating: row.rating,
    compound: row.compound || 'General',
    verifiedBuyer: row.verified_buyer,
    hasLab: row.has_lab,
    body: row.body,
    date: timeAgo(row.created_at),
    reply: row.reply || '',
    replyBy: row.reply_by || '',
  };
}

export function useVendorReviews(vendorSlug: string) {
  const [reviews, setReviews] = useState<VendorReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!vendorSlug) {
      setReviews([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('vendor_reviews')
        .select('*')
        .eq('vendor_slug', vendorSlug)
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (err) throw err;
      const rows = (data as VendorReviewRow[] | null ?? []).map(mapReviewRow);
      // Fall back to seeded mock data while the live DB is being migrated.
      setReviews(rows.length > 0 ? rows : (mockReviews[vendorSlug] ?? []));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load reviews');
    } finally {
      setLoading(false);
    }
  }, [vendorSlug]);

  useEffect(() => {
    load();
  }, [load]);

  return { reviews, loading, error, reload: load };
}