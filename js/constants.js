// ─── Club Configuration ───────────────────────────────────────────────────────
// Each club page sets window.CLUB_CONFIG before loading this file
// window.CLUB_CONFIG = {
//   name:       'Oakland Roots SC',
//   city:       'Oakland',
//   region:     'East Bay, CA',
//   color:      '#25B67C',
//   sheet_id:   '2PACX-...',   // the published sheet ID
//   gids: {
//     bars:         '0',
//     matches:      '499767530',
//     watchparties: '696168736',
//     hotels:       '737220771',
//     restaurants:  '79488506',
//   }
// }

const cfg = window.CLUB_CONFIG || {};
const BASE = cfg.sheet_id
  ? `https://docs.google.com/spreadsheets/d/e/${cfg.sheet_id}/pub?single=true&output=csv`
  : null;

const gid = (id) => BASE ? `${BASE}&gid=${id}` : null;

const SHEET_CSV_URL        = gid(cfg.gids?.bars         || '0');
const MATCHES_CSV_URL      = gid(cfg.gids?.matches      || '499767530');
const WATCH_PARTIES_CSV_URL= gid(cfg.gids?.watchparties || '696168736');
const HOTELS_CSV_URL       = gid(cfg.gids?.hotels       || '737220771');
const RESTAURANTS_CSV_URL  = gid(cfg.gids?.restaurants  || '79488506');

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

// ─── Map pin SVGs (same shapes, updated for light theme) ──────────────────────
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

// Club pin uses the club's primary color from CLUB_CONFIG
const CLUB_PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z"
        fill="${cfg.color || '#00245D'}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
  <circle cx="14" cy="14" r="5" fill="#ffffff" opacity="0.9"/>
</svg>`;

// For OSG/Watch Party pins — use club color
const ROOTS_PIN_SVG = CLUB_PIN_SVG;