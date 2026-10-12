import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface CoaBatch {
  id: number;
  vendor_slug: string;
  batch_no: string;
  compound: string;
  purity: string | null;
  lab: string | null;
  linked_reviews: number;
  batch_date: string | null;
  status: string;
  file_path: string | null;
  file_name: string | null;
  created_at: string;
}

export function useCoaBatches(vendorSlug?: string) {
  const [batches, setBatches] = useState<CoaBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('coa_batches')
        .select('*')
        .order('created_at', { ascending: false });
      if (vendorSlug) query = query.eq('vendor_slug', vendorSlug);
      const { data, error: err } = await query;
      if (err) throw err;
      setBatches((data as CoaBatch[] | null) ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load COA vault');
    } finally {
      setLoading(false);
    }
  }, [vendorSlug]);

  useEffect(() => {
    load();
  }, [load]);

  return { batches, loading, error, reload: load };
}

// Private bucket files are only reachable through short-lived signed URLs,
// which the coa-vault function issues with privileged access.
export async function getCoaFileUrl(filePath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke('coa-vault', {
      body: { action: 'sign', filePath },
    });
    if (error) return null;
    return (data?.url as string) ?? null;
  } catch {
    return null;
  }
}