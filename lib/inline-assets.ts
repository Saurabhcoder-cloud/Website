const OG_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">TaxHelp AI Social Preview</title>
  <desc id="desc">Banner showcasing TaxHelp AI headline and benefits.</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" rx="40" />
  <g fill="#f8fafc" font-family="'Inter', 'Segoe UI', sans-serif">
    <text x="80" y="170" font-size="72" font-weight="700">TaxHelp AI</text>
    <text x="80" y="240" font-size="40" font-weight="500">Smart, Simple &amp; Affordable Tax Filing</text>
    <text x="80" y="320" font-size="28">• 24/7 AI guidance • Multi-language • Privacy-first</text>
    <text x="80" y="380" font-size="28">• $9.99–$24.99 transparent pricing</text>
  </g>
  <g transform="translate(860 160)">
    <rect x="0" y="0" width="240" height="320" rx="24" fill="#0ea5e9" opacity="0.15" />
    <rect x="20" y="30" width="200" height="60" rx="12" fill="#38bdf8" opacity="0.6" />
    <rect x="20" y="110" width="200" height="60" rx="12" fill="#38bdf8" opacity="0.4" />
    <rect x="20" y="190" width="200" height="60" rx="12" fill="#38bdf8" opacity="0.25" />
  </g>
</svg>`;

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="img" aria-labelledby="title">
  <title id="title">TaxHelp AI Favicon</title>
  <rect width="48" height="48" rx="10" fill="#0f172a" />
  <path d="M13 14h8v20h-8zm12 0h8v8h8v4h-8v8h-8z" fill="#38bdf8" />
</svg>`;

const APPLE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" role="img" aria-labelledby="title desc">
  <title id="title">TaxHelp AI Icon</title>
  <desc id="desc">Rounded square icon with stylized letters T and H.</desc>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="160" height="160" rx="32" fill="url(#bg)" />
  <path d="M54 60h24v60h-24zm36 0h24v24h24v12h-24v24h-24z" fill="#f8fafc" />
</svg>`;

function toDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const OG_IMAGE_DATA_URI = toDataUri(OG_IMAGE_SVG);
export const FAVICON_DATA_URI = toDataUri(FAVICON_SVG);
export const APPLE_ICON_DATA_URI = toDataUri(APPLE_ICON_SVG);
