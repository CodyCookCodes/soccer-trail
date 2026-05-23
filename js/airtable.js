// ─── Airtable Data Layer ──────────────────────────────────────────────────────
// Replaces all Google Sheets CSV fetching
// AIRTABLE_API_KEY and AIRTABLE_BASE_ID are injected by GitHub Actions
// ─────────────────────────────────────────────────────────────────────────────

// AIRTABLE_BASE_ID is defined in constants.js
// AIRTABLE_API_KEY is defined in config.js (local) or injected by GitHub Actions

// ─── Fetch all records from a table, handling pagination ─────────────────────
async function airtableFetch(table, filterFormula = null) {
  const records = [];
  let offset = null;

  do {
    const params = new URLSearchParams({ pageSize: '100' });
    if (filterFormula) params.set('filterByFormula', filterFormula);
    if (offset) params.set('offset', offset);

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}?${params}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
    });

    if (!res.ok) throw new Error(`Airtable ${table} fetch failed: HTTP ${res.status}`);

    const data = await res.json();

    // Flatten fields from Airtable record format to plain objects
    data.records.forEach(r => records.push(r.fields));

    offset = data.offset || null;
  } while (offset);

  return records;
}

// ─── Fetch venues for a club ──────────────────────────────────────────────────
async function fetchVenues(clubSlug) {
  return airtableFetch('Venues', `{club_slug}="${clubSlug}"`);
}

// ─── Fetch all matches (shared across all clubs) ──────────────────────────────
async function fetchMatches() {
  const records = await airtableFetch('Matches');
  // Sort by date ascending
  return records.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
}

// ─── Fetch events for a club ──────────────────────────────────────────────────
async function fetchEvents(clubSlug) {
  return airtableFetch('Events', `{club_slug}="${clubSlug}"`);
}

// ─── Fetch hotels for a club ──────────────────────────────────────────────────
async function fetchHotels(clubSlug) {
  return airtableFetch('Hotels', `{club_slug}="${clubSlug}"`);
}

// ─── Fetch restaurants for a club ────────────────────────────────────────────
async function fetchRestaurants(clubSlug) {
  return airtableFetch('Restaurants', `{club_slug}="${clubSlug}"`);
}

// ─── localStorage cache helpers ──────────────────────────────────────────────
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function cacheSet(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(key + '_ts', Date.now().toString());
  } catch (e) { /* storage full */ }
}

function cacheGet(key) {
  try {
    const data = localStorage.getItem(key);
    const ts   = localStorage.getItem(key + '_ts');
    if (data && ts && (Date.now() - Number(ts)) < CACHE_TTL) {
      return JSON.parse(data);
    }
  } catch (e) {}
  return null;
}

// ─── Fetch with cache fallback ────────────────────────────────────────────────
async function fetchWithCache(cacheKey, fetchFn) {
  try {
    const data = await fetchFn();
    cacheSet(cacheKey, data);
    return data;
  } catch (err) {
    console.warn(`Fetch failed for ${cacheKey}, trying cache:`, err);
    const cached = cacheGet(cacheKey);
    if (cached) return cached;
    throw err;
  }
}