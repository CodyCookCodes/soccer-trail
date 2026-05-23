// ─── Club Configuration ───────────────────────────────────────────────────────
// window.CLUB_CONFIG is set by clubs.js before this file loads
// ─────────────────────────────────────────────────────────────────────────────

const cfg = window.CLUB_CONFIG || {};

// ─── Airtable ─────────────────────────────────────────────────────────────────
const AIRTABLE_BASE_ID = 'app8vW4D9KnDWCJr8';
// AIRTABLE_API_KEY and MAPS_API_KEY are defined in config.js (local)
// or appended here by GitHub Actions at deploy time

// ─── Country → flagcdn code map ───────────────────────────────────────────────
const FLAGS = {
  'canada':         'ca', 'mexico':         'mx', 'usa':            'us',
  'algeria':        'dz', 'argentina':      'ar', 'australia':      'au',
  'austria':        'at', 'belgium':        'be', 'brazil':         'br',
  'cabo verde':     'cv', 'colombia':       'co', 'croatia':        'hr',
  'curaçao':        'cw', 'côte d\'ivoire': 'ci', 'ecuador':        'ec',
  'egypt':          'eg', 'england':        'gb-eng', 'france':      'fr',
  'germany':        'de', 'ghana':          'gh', 'haiti':          'ht',
  'ir iran':        'ir', 'japan':          'jp', 'jordan':         'jo',
  'korea republic': 'kr', 'morocco':        'ma', 'netherlands':    'nl',
  'new zealand':    'nz', 'norway':         'no', 'panama':         'pa',
  'paraguay':       'py', 'portugal':       'pt', 'qatar':          'qa',
  'saudi arabia':   'sa', 'scotland':       'gb-sct', 'senegal':    'sn',
  'south africa':   'za', 'spain':          'es', 'switzerland':    'ch',
  'tunisia':        'tn', 'uruguay':        'uy', 'uzbekistan':     'uz',
  'ireland':        'ie', 'türkiye':        'tr', 'bosnia-herzegovina': 'ba',
  'czechia':        'cz', 'congo dr':       'cd', 'sweden':         'se',
  'iraq':           'iq', 'all nations':    null,
};

// ─── Google Maps LIGHT style ──────────────────────────────────────────────────
const MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#f5f7fa' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b7a9a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f7fa' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#e8edf5' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dde3ee' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9aa4bb' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c8d8e8' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9aa4bb' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eef1f7' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#ddeedd' }] },
  { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c8d0e0' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#00245D' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f0f3f8' }] },
];

// ─── Map pin SVGs ─────────────────────────────────────────────────────────────
const ORANGE_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="#F79621" stroke="#c97000" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.9"/>
</svg>`;

const GREY_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="#b0b8cc" stroke="#8890a8" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.7"/>
</svg>`;

const RED_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="#E4002B" stroke="#a80020" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.9"/>
</svg>`;

const BLUE_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="#65C2EE" stroke="#4a9ab5" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.9"/>
</svg>`;

const YELLOW_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="#C8A96E" stroke="#9a7c3a" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.7"/>
</svg>`;

const CLUB_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="${cfg.color || '#00245D'}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.9"/>
</svg>`;

const ROOTS_PIN_SVG = CLUB_PIN_SVG;