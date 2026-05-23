// ─── USL Soccer Trail · Club Registry ────────────────────────────────────────
// To add a club:
//   1. Add an entry below with the slug matching the URL you want (/club/?team=SLUG)
//   2. Set sheet_id to the published Google Sheet ID
//   3. Add the club pin to map.html CLUBS array
//   4. Done — no other files need to change
//
// sheet_id: the long ID from the Google Sheets published CSV URL
// e.g. https://docs.google.com/spreadsheets/d/e/SHEET_ID/pub?...
// ─────────────────────────────────────────────────────────────────────────────

const CLUBS_REGISTRY = {

  // ── LIVE ──────────────────────────────────────────────────────────────────

  'oakland-roots': {
    name:    'Oakland Roots SC',
    city:    'Oakland',
    region:  'East Bay, CA',
    color:   '#25B67C',
    center:  { lat: 37.8044, lng: -122.2712 },
    live:    true,
    sheet_id: '2PACX-1vTkHOkygOrrQTtoGTP5ivH6Fe-U_Ym1cqrt7TymLNEHyTSOE1KQJOnCLqi0KpuUEA_UVkXvL8a5OQoe',
    gids: {
      bars:         '0',
      matches:      '499767530',
      watchparties: '696168736',
      hotels:       '737220771',
      restaurants:  '79488506',
    },
    logo:    '/assets/Oakland_Roots.png',
    stickyLinks: [
      { label: 'Roots Store',    url: 'https://shop.oaklandrootssc.com',         class: 'sticky-cta-btn--store' },
      { label: 'Roots Schedule', url: 'https://www.oaklandrootssc.com/schedule', class: 'sticky-cta-btn--schedule' },
    ],
  },

  // ── COMING SOON ───────────────────────────────────────────────────────────

  'birmingham-legion': {
    name:    'Birmingham Legion FC',
    city:    'Birmingham',
    region:  'Birmingham, AL',
    color:   '#00245D',
    center:  { lat: 33.5276, lng: -86.8081 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/birmingham-legion-logo.png',
    stickyLinks: [],
  },
 
  'brooklyn-fc': {
    name:    'Brooklyn FC',
    city:    'Brooklyn',
    region:  'Brooklyn, NY',
    color:   '#003DA5',
    center:  { lat: 40.5739, lng: -73.9846 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/brooklyn-fc-logo.png',
    stickyLinks: [],
  },
 
  'charleston-battery': {
    name:    'Charleston Battery',
    city:    'Charleston',
    region:  'Charleston, SC',
    color:   '#FFC72C',
    center:  { lat: 32.7936, lng: -79.9144 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/charleston-battery-logo.png',
    stickyLinks: [],
  },
 
  'colorado-springs-switchbacks': {
    name:    'Colorado Springs Switchbacks FC',
    city:    'Colorado Springs',
    region:  'Colorado Springs, CO',
    color:   '#00843D',
    center:  { lat: 38.8286, lng: -104.8217 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/colorado-springs-switchbacks-logo.png',
    stickyLinks: [],
  },
 
  'detroit-city': {
    name:    'Detroit City FC',
    city:    'Detroit',
    region:  'Detroit, MI',
    color:   '#C8102E',
    center:  { lat: 42.3941, lng: -83.0538 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/detroit-city-logo.png',
    stickyLinks: [],
  },
 
  'el-paso-locomotive': {
    name:    'El Paso Locomotive FC',
    city:    'El Paso',
    region:  'El Paso, TX',
    color:   '#FF6B00',
    center:  { lat: 31.7594, lng: -106.4912 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/el-paso-locomotive-logo.png',
    stickyLinks: [],
  },
 
  'hartford-athletic': {
    name:    'Hartford Athletic',
    city:    'Hartford',
    region:  'Hartford, CT',
    color:   '#00A94F',
    center:  { lat: 41.7508, lng: -72.6719 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/hartford-athletic-logo.png',
    stickyLinks: [],
  },
 
  'indy-eleven': {
    name:    'Indy Eleven',
    city:    'Indianapolis',
    region:  'Indianapolis, IN',
    color:   '#FFCD00',
    center:  { lat: 39.7719, lng: -86.1764 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/indy-eleven-logo.png',
    stickyLinks: [],
  },
 
  'las-vegas-lights': {
    name:    'Las Vegas Lights FC',
    city:    'Las Vegas',
    region:  'Las Vegas, NV',
    color:   '#FFD100',
    center:  { lat: 36.1797, lng: -115.1311 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/las-vegas-lights-logo.png',
    stickyLinks: [],
  },
 
  'lexington-sc': {
    name:    'Lexington SC',
    city:    'Lexington',
    region:  'Lexington, KY',
    color:   '#00205B',
    center:  { lat: 38.0064, lng: -84.4239 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/lexington-sc-logo.png',
    stickyLinks: [],
  },
 
  'loudoun-united': {
    name:    'Loudoun United FC',
    city:    'Loudoun',
    region:  'Loudoun, VA',
    color:   '#D4131A',
    center:  { lat: 39.0661, lng: -77.5244 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/loudoun-united-logo.png',
    stickyLinks: [],
  },
 
  'louisville-city': {
    name:    'Louisville City FC',
    city:    'Louisville',
    region:  'Louisville, KY',
    color:   '#6C1D45',
    center:  { lat: 38.2594, lng: -85.7336 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/louisville-city-logo.png',
    stickyLinks: [],
  },
 
  'miami-fc': {
    name:    'Miami FC',
    city:    'Miami',
    region:  'Miami, FL',
    color:   '#00B2A9',
    center:  { lat: 25.7525, lng: -80.3781 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/miami-fc-logo.png',
    stickyLinks: [],
  },
 
  'monterey-bay': {
    name:    'Monterey Bay FC',
    city:    'Monterey Bay',
    region:  'Seaside, CA',
    color:   '#00827F',
    center:  { lat: 36.6536, lng: -121.8025 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/monterey-bay-logo.png',
    stickyLinks: [],
  },
 
  'new-mexico-united': {
    name:    'New Mexico United',
    city:    'Albuquerque',
    region:  'Albuquerque, NM',
    color:   '#231F20',
    center:  { lat: 35.0694, lng: -106.6292 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/new-mexico-united-logo.png',
    stickyLinks: [],
  },
 
  'orange-county': {
    name:    'Orange County SC',
    city:    'Orange County',
    region:  'Orange County, CA',
    color:   '#F7A800',
    center:  { lat: 33.6644, lng: -117.7472 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/orange-county-logo.png',
    stickyLinks: [],
  },
 
  'phoenix-rising': {
    name:    'Phoenix Rising FC',
    city:    'Phoenix',
    region:  'Phoenix, AZ',
    color:   '#FF6B00',
    center:  { lat: 33.4358, lng: -111.9606 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/phoenix-rising-logo.png',
    stickyLinks: [],
  },
 
  'pittsburgh-riverhounds': {
    name:    'Pittsburgh Riverhounds SC',
    city:    'Pittsburgh',
    region:  'Pittsburgh, PA',
    color:   '#FFB81C',
    center:  { lat: 40.4344, lng: -80.0114 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/pittsburgh-riverhounds-logo.png',
    stickyLinks: [],
  },
 
  'rhode-island-fc': {
    name:    'Rhode Island FC',
    city:    'Providence',
    region:  'Providence, RI',
    color:   '#00245D',
    center:  { lat: 41.8742, lng: -71.3789 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/rhode-island-fc-logo.png',
    stickyLinks: [],
  },
 
  'sacramento-republic': {
    name:    'Sacramento Republic FC',
    city:    'Sacramento',
    region:  'Sacramento, CA',
    color:   '#00529B',
    center:  { lat: 38.5919, lng: -121.4367 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/sacramento-republic-logo.png',
    stickyLinks: [],
  },
 
  'san-antonio-fc': {
    name:    'San Antonio FC',
    city:    'San Antonio',
    region:  'San Antonio, TX',
    color:   '#002B5C',
    center:  { lat: 29.5542, lng: -98.3794 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/san-antonio-fc-logo.png',
    stickyLinks: [],
  },
 
  'sporting-club-jacksonville': {
    name:    'Sporting Club Jacksonville',
    city:    'Jacksonville',
    region:  'Jacksonville, FL',
    color:   '#00A3E0',
    center:  { lat: 30.2725, lng: -81.5097 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/sporting-club-jacksonville-logo.png',
    stickyLinks: [],
  },
 
  'tampa-bay-rowdies': {
    name:    'Tampa Bay Rowdies',
    city:    'Tampa Bay',
    region:  'Tampa Bay, FL',
    color:   '#009639',
    center:  { lat: 27.7694, lng: -82.6336 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/tampa-bay-rowdies-logo.png',
    stickyLinks: [],
  },
 
  'fc-tulsa': {
    name:    'FC Tulsa',
    city:    'Tulsa',
    region:  'Tulsa, OK',
    color:   '#002B5C',
    center:  { lat: 36.1600, lng: -95.9939 },
    live:    true,
    sheet_id: null,
    gids:    {},
    logo:    '/assets/fc-tulsa-logo.png',
    stickyLinks: [],
  },

  // ── TEMPLATE — copy/paste to add more clubs ───────────────────────────────
  // 'club-slug': {
  //   name:    'Club Name',
  //   city:    'City',
  //   region:  'City, ST',
  //   color:   '#000000',
  //   center:  { lat: 0, lng: 0 },
  //   live:    true,
  //   sheet_id: null,
  //   gids:    { bars: '0', matches: '', watchparties: '', hotels: '', restaurants: '' },
  //   logo:    '/assets/club-logo.png',
  //   stickyLinks: [],
  // },

};

// ─── Resolve club config from URL param ──────────────────────────────────────
// Called once on club/index.html load
function resolveClubConfig() {
  const slug = new URLSearchParams(window.location.search).get('team');
  const club = CLUBS_REGISTRY[slug];
  if (!club) return null;
  // Merge into the shape constants.js expects
  return {
    ...club,
    slug,
  };
}