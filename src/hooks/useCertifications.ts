import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Certification } from '@/mocks/certifications';

export function useCertifications(vendorSlug?: string) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('vendor_certifications')
        .select('*')
        .order('issued_at', { ascending: false });
      if (vendorSlug) query = query.eq('vendor_slug', vendorSlug);
      const { data, error: err } = await query;
      if (err) throw err;
      setCertifications((data as Certification[] | null) ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load certifications');
    } finally {
      setLoading(false);
    }
  }, [vendorSlug]);

  useEffect(() => {
    load();
  }, [load]);

  return { certifications, loading, error, reload: load };
}

// Map of vendor slug -> active certification, for list/card rendering.
export function activeCertMap(certs: Certification[]): Record<string, Certification> {
  const map: Record<string, Certification> = {};
  certs.forEach((c) => {
    if (c.status === 'active') map[c.vendor_slug] = c;
  });
  return map;
}

// Resolve a user-typed query against the certificate ID, vendor slug or vendor name.
export function findCertification(certs: Certification[], rawQuery: string): Certification | null {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return null;
  return (
    certs.find((c) => c.cert_id.toLowerCase() === q) ??
    certs.find((c) => c.cert_id.toLowerCase().includes(q)) ??
    certs.find((c) => c.vendor_slug.toLowerCase() === q) ??
    certs.find((c) => c.vendor_name.toLowerCase() === q) ??
    certs.find((c) => c.vendor_name.toLowerCase().includes(q)) ??
    null
  );
}

export function formatCertDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function certStatusLabel(status: Certification['status']): string {
  if (status === 'active') return 'Active';
  if (status === 'suspended') return 'Suspended';
  return 'Revoked';
}