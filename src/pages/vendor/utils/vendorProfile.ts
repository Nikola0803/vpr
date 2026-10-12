import type { Vendor } from '@/mocks/vendors';

const regionBlurb: Record<Vendor['region'], string> = {
  'USA Domestic': 'US-based research peptide supplier',
  Canada: 'Canada-based research peptide supplier',
};

export function getVendorAbout(vendor: Vendor): string {
  if (vendor.about) return vendor.about;

  const topCompounds = vendor.compounds.slice(0, 3).join(', ');
  const labs = vendor.thirdPartyLab
    ? 'independent third-party laboratories such as Janoshik Analytical and Colmaric Analytical Labs'
    : 'an analytical laboratory';
  const coaLine = vendor.publicCoa
    ? 'Full certificates of analysis are published openly so buyers can verify purity before purchase'
    : 'Purity results are shared with buyers on request';
  const banner = vendor.verified
    ? 'The vendor is an audited, verified merchant on this platform.'
    : 'The vendor is currently completing the platform verification process.';

  return `${vendor.name} is a ${regionBlurb[vendor.region]} operating out of ${vendor.country} and registered since ${vendor.registered}. The catalogue centres on high-purity research compounds such as ${topCompounds} among its most requested lines. Every batch is tested at ${labs}. ${coaLine}. ${banner}`;
}

function strengthSentences(vendor: Vendor): string[] {
  const notes: string[] = [];
  if (vendor.support >= 4.75) {
    notes.push(
      'the support team is repeatedly praised for fast, patient and genuinely knowledgeable answers rather than sales pressure',
    );
  }
  if (vendor.shipping >= 4.7) {
    notes.push('reviewers highlight exceptionally quick delivery and discreet, well-protected packaging');
  }
  if (vendor.purity >= 4.75) {
    notes.push('buyers consistently report that received purity matches the published lab documentation');
  }
  if (vendor.publicCoa) {
    notes.push('the visibility of third-party certificates of analysis is called out as a major trust factor');
  }
  if (vendor.qrVerify) {
    notes.push('the QR batch-verification system is mentioned as proof that each vial maps to a real lab report');
  }
  return notes;
}

export function getVendorAiSummary(vendor: Vendor): string {
  // Curated summaries may embed a {count} token so the quoted number always tracks
  // the vendor's live review total on this platform instead of a stale figure.
  if (vendor.aiSummary) {
    return vendor.aiSummary.replace(/\{count\}/g, vendor.reviews.toLocaleString());
  }

  const window = vendor.aiSummaryCount ?? Math.max(24, Math.round(vendor.reviews * 0.06));
  const average = vendor.score.toFixed(1);
  const strengths = strengthSentences(vendor);
  const top = vendor.compounds.slice(0, 3).join(', ');

  const opener =
    vendor.score >= 4.75
      ? `Considering ${window} recent reviews, buyers overwhelmingly had a great experience with this company, landing it at ${average} out of 5.`
      : vendor.score >= 4.4
        ? `Across ${window} recent reviews, most buyers had a positive experience with this company, holding a ${average} out of 5 average.`
        : `Based on ${window} recent reviews, buyers report a mixed but improving experience with this company, averaging ${average} out of 5.`;

  const body = strengths.length
    ? ` Researchers frequently mention that ${strengths.slice(0, 2).join(', and ')}.`
    : '';

  const compounds = ` Popular lines in the reviews include ${top}, and the ordering process is described as straightforward and well documented.`;

  const closer = vendor.thirdPartyLab
    ? ' Reviewers emphasise that the clear, third-party testing documentation gives them confidence that what they ordered is what they received.'
    : ' Several reviewers note they would like to see more openly published lab documentation to back up the listed purity.';

  return `${opener}${body}${compounds}${closer}`;
}

export interface VendorFact {
  label: string;
  value: string;
  icon: string;
}

export function getVendorFacts(vendor: Vendor): VendorFact[] {
  return [
    { label: 'Headquarters', value: vendor.country, icon: 'ri-map-pin-2-line' },
    { label: 'Operating Since', value: vendor.registered, icon: 'ri-calendar-line' },
    { label: 'Testing', value: vendor.thirdPartyLab ? 'Third-Party Verified' : 'In-House Testing', icon: 'ri-flask-line' },
    { label: 'Public COAs', value: vendor.publicCoa ? 'Published Openly' : 'On Request', icon: 'ri-file-shield-2-line' },
    { label: 'Shipping Region', value: vendor.region, icon: 'ri-truck-line' },
    { label: 'Catalog Size', value: `${vendor.compounds.length} core compounds`, icon: 'ri-test-tube-line' },
  ];
}