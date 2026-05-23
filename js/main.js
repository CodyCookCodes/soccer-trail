// ─── Bootstrap ────────────────────────────────────────────────────────────────
const slug = (window.CLUB_CONFIG || {}).slug || '';

// ─── Load venues ──────────────────────────────────────────────────────────────
async function loadBars() {
  const cacheKey = `at_venues_${slug}`;

  try {
    const bars = await fetchWithCache(cacheKey, () => fetchVenues(slug));

    if (!bars.length) {
      document.getElementById('barList').innerHTML = `
        <div class="state-box">
          <div class="icon">🚧</div>
          <p>Venue listings coming soon for ${esc((window.CLUB_CONFIG || {}).name || 'this club')}.</p>
        </div>`;
      return;
    }

    buildPage(bars);
    window._barsData = bars;
    if (window._mapReady) {
      window.buildMap(bars);
    } else {
      window._barsReady = true;
    }
  } catch (err) {
    console.error('Venues load failed:', err);
    document.getElementById('barList').innerHTML = `
      <div class="state-box">
        <div class="icon">⚠️</div>
        <p>Couldn't load venues. Please try refreshing.</p>
      </div>`;
    const mapSection = document.querySelector('.map-section');
    if (mapSection) mapSection.style.display = 'none';
  }
}

// ─── Load hotels and restaurants ─────────────────────────────────────────────
async function loadHotelsAndRestaurants() {
  try {
    const [hotels, restaurants] = await Promise.all([
      fetchWithCache(`at_hotels_${slug}`,      () => fetchHotels(slug)),
      fetchWithCache(`at_restaurants_${slug}`, () => fetchRestaurants(slug)),
    ]);

    window._hotelsData      = hotels;
    window._restaurantsData = restaurants;

    if (hotels.length)      renderHotelCards(hotels);
    if (restaurants.length) renderRestaurantCards(restaurants);

    // Re-apply filters so hotels/restaurants start hidden per active filter state
    if (typeof applyFilters === 'function') applyFilters();

    const tryPlace = () => {
      if (window._gMapReady) {
        if (hotels.length)      window.buildHotelMarkers(hotels);
        if (restaurants.length) window.buildRestaurantMarkers(restaurants);
      } else {
        setTimeout(tryPlace, 200);
      }
    };
    tryPlace();
  } catch (err) {
    console.warn('Hotels/restaurants load failed:', err);
  }
}

// ─── Load matches and events ──────────────────────────────────────────────────
async function loadMatchesAndWatchParties() {
  try {
    const [matches, events] = await Promise.all([
      fetchWithCache('at_matches', fetchMatches),
      fetchWithCache(`at_events_${slug}`, () => fetchEvents(slug)),
    ]);

    buildMatchCarousel(matches, events);

    // Wait for _matchById to be populated by buildMatchCarousel
    const matchById = window._matchById || {};

    const enriched = events.map(ev => {
      const match = matchById[ev.match_id];
      if (match) {
        return {
          ...ev,
          home_team:  match.home_team,
          away_team:  match.away_team,
          match_date: match.date,
          match_time: match.time,
        };
      }
      return ev;
    });

    window._watchPartiesData = enriched;
    window._watchPartiesReady = true;

    const tryPlace = () => {
      if (window._gMapReady) {
        window.buildWatchPartyMarkers(enriched);
      } else {
        setTimeout(tryPlace, 200);
      }
    };
    setTimeout(tryPlace, 200);

    // Refresh event cards if they're already visible
    if (typeof renderWatchPartyCards === 'function') {
      renderWatchPartyCards();
    }

  } catch (err) {
    console.warn('Matches/events load failed:', err);
    const track = document.getElementById('matchTrack');
    if (track) track.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:0.8rem;padding:20px;">Schedule unavailable.</div>';
  }
}

// ─── Next event banner ────────────────────────────────────────────────────────
async function loadNextEvent() {
  try {
    const events = await fetchWithCache(`at_events_${slug}`, () => fetchEvents(slug));
    if (!events.length) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find first upcoming event — handles both ISO dates and human-readable like "June 12th"
    const upcoming = events.find(e => {
      if (!e.date) return true;
      const cleaned = e.date.replace(/(\d+)(st|nd|rd|th)/, '$1');
      const parsed = new Date(cleaned);
      return isNaN(parsed) || parsed >= today;
    }) || events[0];

    if (!upcoming || !upcoming.name) return;

    const banner   = document.getElementById('next-event-banner');
    const nameEl   = document.getElementById('next-event-name');
    const detailEl = document.getElementById('next-event-details');
    const linkEl   = document.getElementById('next-event-link');

    if (!banner || !nameEl) return;

    nameEl.textContent   = upcoming.name;
    detailEl.textContent = [
      upcoming.location || upcoming.address || '',
      upcoming.date || '',
      upcoming.time || ''
    ].filter(Boolean).join(' · ');
    linkEl.style.display = 'inline-block';
    banner.style.display = 'block';
  } catch (err) {
    console.warn('Next event load failed:', err);
  }
}

// ─── Google Maps callback ─────────────────────────────────────────────────────
function initMap() {
  if (window._barsReady) {
    window.buildMap(window._barsData);
  } else {
    window._mapReady = true;
  }
  if (window._watchPartiesReady && window._watchPartiesData && window._watchPartiesData.length) {
    window.buildWatchPartyMarkers(window._watchPartiesData);
  }
}

// ─── Page loader dismiss ──────────────────────────────────────────────────────
function dismissLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  loader.classList.add('fade-out');
  setTimeout(() => loader.classList.add('hidden'), 400);
}

// ─── Kick everything off ──────────────────────────────────────────────────────
Promise.all([
  loadBars(),
  loadMatchesAndWatchParties(),
  loadHotelsAndRestaurants(),
  loadNextEvent(),
]).then(dismissLoader);

// ─── Load Google Maps ─────────────────────────────────────────────────────────
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
script.async = true;
script.defer = true;
document.head.appendChild(script);