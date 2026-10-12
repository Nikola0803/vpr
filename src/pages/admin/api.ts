import { supabase } from '@/lib/supabase';

export interface QueueReview {
  id: number;
  vendor_slug: string;
  author: string;
  order_ref: string | null;
  proof_hash: string;
  rating: number;
  compound: string | null;
  verified_buyer: boolean;
  has_lab: boolean;
  body: string;
  attachment_path: string | null;
  attachmentUrl: string | null;
  created_at: string;
  status: string;
}

export interface QueueData {
  pending: QueueReview[];
  rejected: QueueReview[];
}

const KEY_STORAGE = 'vpr_mod_key_v1';

export function getModKey(): string {
  try {
    return sessionStorage.getItem(KEY_STORAGE) ?? '';
  } catch {
    return '';
  }
}

export function setModKey(key: string) {
  try {
    sessionStorage.setItem(KEY_STORAGE, key);
  } catch {
    // session storage unavailable, key stays in memory only
  }
}

export function clearModKey() {
  try {
    sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    // ignore
  }
}

async function invoke(body: Record<string, unknown>) {
  const res = await supabase.functions.invoke('moderate-review', { body });
  if (res.error) {
    let message = res.error.message || 'Request failed';
    const ctx = (res.error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      try {
        const parsed = await ctx.json();
        if (parsed?.error) message = String(parsed.error);
      } catch {
        // keep the original message
      }
    }
    throw new Error(message);
  }
  const data = res.data as Record<string, unknown> | null;
  if (data?.error) throw new Error(String(data.error));
  return data;
}

export async function fetchQueue(key: string): Promise<QueueData> {
  const data = await invoke({ action: 'list', key });
  return {
    pending: (data?.pending as QueueReview[] | undefined) ?? [],
    rejected: (data?.rejected as QueueReview[] | undefined) ?? [],
  };
}

export async function moderateReview(id: number, action: 'approve' | 'reject') {
  return invoke({ action, ids: [id], key: getModKey() });
}