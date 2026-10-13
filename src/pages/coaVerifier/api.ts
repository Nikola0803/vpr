import { supabase } from '@/lib/supabase';

export type CheckStatus = 'pass' | 'warn' | 'fail' | 'na';

export type Verdict = 'authentic' | 'minor_concerns' | 'suspicious' | 'tampered' | 'inconclusive';

export interface CoaCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
}

export interface CoaReport {
  verdict: Verdict;
  confidence: number;
  headline: string;
  summary: string;
  checks: CoaCheck[];
  signals: string[];
  recommendation: string;
  company?: string | null;
  product?: string | null;
}

export interface VerifyInput {
  data: string;
  mediaType: string;
  fileName: string;
}

export async function verifyCoa(input: VerifyInput): Promise<CoaReport> {
  const res = await supabase.functions.invoke('verify-coa', { body: input });

  if (res.error) {
    let message = res.error.message || 'Verification failed';
    const ctx = (res.error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      try {
        const parsed = await ctx.json();
        if (parsed?.message || parsed?.error) message = String(parsed.message || parsed.error);
      } catch {
        // keep the original message
      }
    }
    throw new Error(message);
  }

  const payload = res.data as { error?: string; message?: string; report?: CoaReport } | null;
  if (!payload || payload.error || !payload.report) {
    throw new Error(payload?.message || 'The verification engine returned an unexpected result. Please try again.');
  }

  return payload.report;
}