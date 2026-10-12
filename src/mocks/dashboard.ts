export const kpis = [
  { label: 'Net Trust Score', value: '4.87', suffix: '/5.0', delta: '+0.06', up: true, icon: 'ri-shield-star-line', accent: 'cyan' },
  { label: 'Reviews Collected (30d)', value: '1,942', suffix: '', delta: '+18.4%', up: true, icon: 'ri-chat-check-line', accent: 'teal' },
  { label: 'Invite Conversion Rate', value: '31.6%', suffix: '', delta: '+4.2%', up: true, icon: 'ri-mail-send-line', accent: 'emerald' },
  { label: 'Active Embed Impressions', value: '428K', suffix: '', delta: '+62K', up: true, icon: 'ri-code-s-slash-line', accent: 'cyan' },
];

export const velocity = [
  { day: 'Sep 01', reviews: 42, invites: 180 },
  { day: 'Sep 04', reviews: 58, invites: 210 },
  { day: 'Sep 07', reviews: 51, invites: 195 },
  { day: 'Sep 10', reviews: 74, invites: 260 },
  { day: 'Sep 13', reviews: 69, invites: 245 },
  { day: 'Sep 16', reviews: 88, invites: 310 },
  { day: 'Sep 19', reviews: 96, invites: 348 },
  { day: 'Sep 22', reviews: 112, invites: 402 },
];

export const recentInvites = [
  { email: 'j***k@protonmail.com', order: '#8291-A44F', status: 'Reviewed', channel: 'Email', date: '2d ago' },
  { email: 'm***r@gmail.com', order: '#7742-B10C', status: 'Reviewed', channel: 'SMS', date: '3d ago' },
  { email: 'a***t@outlook.com', order: '#6108-C22E', status: 'Opened', channel: 'Email', date: '4d ago' },
  { email: 'd***v@yahoo.com', order: '#5902-D11A', status: 'Sent', channel: 'Email', date: '5d ago' },
  { email: 's***p@icloud.com', order: '#5501-E77B', status: 'Reviewed', channel: 'SMS', date: '6d ago' },
  { email: 'r***o@gmail.com', order: '#5210-F31C', status: 'Bounced', channel: 'Email', date: '6d ago' },
];

export const coaBatches = [
  { batch: 'KP-BPC-2409', compound: 'BPC-157', purity: '99.2%', lab: 'Janoshik', linked: 84, date: 'Sep 18, 2026', status: 'Verified' },
  { batch: 'KP-TIR-2408', compound: 'Tirzepatide', purity: '98.7%', lab: 'Colmaric', date: 'Sep 11, 2026', linked: 61, status: 'Verified' },
  { batch: 'KP-GHK-2407', compound: 'GHK-Cu', purity: '99.6%', lab: 'Janoshik', linked: 47, date: 'Sep 04, 2026', status: 'Verified' },
  { batch: 'KP-RET-2406', compound: 'Retatrutide', purity: '97.9%', lab: 'MZ Biolabs', linked: 22, date: 'Aug 28, 2026', status: 'Pending' },
  { batch: 'KP-TB5-2405', compound: 'TB-500', purity: '99.1%', lab: 'Colmaric', linked: 38, date: 'Aug 21, 2026', status: 'Verified' },
];

export const widgetTypes = [
  { id: 'float', name: 'Floating Trust Badge', desc: 'Fixed corner badge, always visible.', icon: 'ri-pushpin-2-line' },
  { id: 'inline', name: 'Inline Grid Carousel', desc: 'Embedded review grid on product pages.', icon: 'ri-layout-grid-line' },
  { id: 'sidebar', name: 'Sidebar Micro-Card', desc: 'Compact score card for sidebars.', icon: 'ri-layout-right-line' },
  { id: 'checkout', name: 'Checkout Trust Bar', desc: 'Thin verified strip above checkout CTA.', icon: 'ri-shopping-bag-3-line' },
];

export const widgetThemes = [
  { id: 'obsidian', name: 'Obsidian', bg: '#07090E', fg: '#FFFFFF', accent: '#0EA5E9' },
  { id: 'graphite', name: 'Graphite', bg: '#141B2D', fg: '#E2E8F0', accent: '#14B8A6' },
  { id: 'ivory', name: 'Ivory', bg: '#F8FAFC', fg: '#0F172A', accent: '#0EA5E9' },
  { id: 'mint', name: 'Clinical Mint', bg: '#ECFDF5', fg: '#064E3B', accent: '#10B981' },
];

export const integrations = [
  { name: 'WooCommerce', desc: 'Order hooks active · 2,417 synced', status: 'Connected', icon: 'ri-store-2-line' },
  { name: 'WordPress Plugin', desc: 'Shortcode live on storefront', status: 'Connected', icon: 'ri-wordpress-fill' },
  { name: 'Custom Checkout', desc: 'Signed order webhook verified', status: 'Connected', icon: 'ri-code-box-line' },
  { name: 'Third-Party Storefront', desc: 'Drop-in snippet pending', status: 'Pending', icon: 'ri-plug-2-line' },
];

export const csvColumns = [
  { source: 'customer_email', target: 'Email', required: true },
  { source: 'order_number', target: 'Order ID', required: true },
  { source: 'first_name', target: 'Researcher Name', required: false },
  { source: 'line_items', target: 'Products Purchased', required: true },
  { source: 'shipped_at', target: 'Ship Date', required: false },
];

export const emailTemplates = [
  { name: 'Fulfilment Follow-up', subject: 'How was your {{product}}? Verified review inside', opened: '42.1%', clicked: '31.6%' },
  { name: 'Post-Delivery Day 7', subject: 'Your batch {{batch_no}} COA is verified, share your results', opened: '38.4%', clicked: '27.2%' },
  { name: 'Reorder Nudge', subject: 'Ready to restock {{product}}?', opened: '35.9%', clicked: '22.8%' },
];