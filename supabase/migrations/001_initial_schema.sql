-- ============================================================
-- VPR – initial schema
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- ── vendor_reviews ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vendor_reviews (
  id              bigserial PRIMARY KEY,
  vendor_slug     text        NOT NULL,
  author          text        NOT NULL,
  order_ref       text,
  proof_hash      text        NOT NULL,
  rating          smallint    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  compound        text,
  verified_buyer  boolean     NOT NULL DEFAULT false,
  has_lab         boolean     NOT NULL DEFAULT false,
  body            text        NOT NULL,
  reply           text,
  reply_by        text,
  ruo_status      text        NOT NULL DEFAULT 'published',
  status          text        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending','published','rejected')),
  ruo_flags       jsonb,
  attachment_path text,
  moderated_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_reviews_slug_status
  ON vendor_reviews (vendor_slug, status);

ALTER TABLE vendor_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published reviews"
  ON vendor_reviews FOR SELECT
  USING (status = 'published');

-- ── coa_batches ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coa_batches (
  id              bigserial PRIMARY KEY,
  vendor_slug     text        NOT NULL,
  batch_no        text        NOT NULL,
  compound        text        NOT NULL,
  purity          text,
  lab             text,
  linked_reviews  integer     NOT NULL DEFAULT 0,
  batch_date      text,
  status          text        NOT NULL DEFAULT 'Pending',
  file_path       text,
  file_name       text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_coa_batches_vendor
  ON coa_batches (vendor_slug);

ALTER TABLE coa_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read COA batches"
  ON coa_batches FOR SELECT
  USING (true);

-- ── vendor_certifications ────────────────────────────────────
CREATE TABLE IF NOT EXISTS vendor_certifications (
  id               bigserial PRIMARY KEY,
  vendor_slug      text        NOT NULL,
  vendor_name      text        NOT NULL,
  grade            text        NOT NULL CHECK (grade IN ('ruo_verified','true_coa_verified')),
  status           text        NOT NULL DEFAULT 'active'
                               CHECK (status IN ('active','suspended','revoked')),
  cert_id          text        NOT NULL UNIQUE,
  coa_batch_no     text,
  coa_lab          text,
  coa_compound     text,
  reviewed_by      text,
  issued_at        timestamptz NOT NULL DEFAULT now(),
  last_reviewed_at timestamptz,
  expires_at       timestamptz,
  revoked_at       timestamptz,
  revoke_reason    text,
  notes            text
);

CREATE INDEX IF NOT EXISTS idx_vendor_certs_slug
  ON vendor_certifications (vendor_slug);

ALTER TABLE vendor_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read certifications"
  ON vendor_certifications FOR SELECT
  USING (true);

-- ── coa_leads (email capture for COA verifier) ───────────────
CREATE TABLE IF NOT EXISTS coa_leads (
  id         bigserial PRIMARY KEY,
  email      text        NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE coa_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit COA lead email"
  ON coa_leads FOR INSERT
  WITH CHECK (true);
