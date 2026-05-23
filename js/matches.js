// ─── Matches Module ───────────────────────────────────────────────────────────
// Data is fetched by main.js via Airtable — this file handles rendering only
// ─────────────────────────────────────────────────────────────────────────────

// ─── Date helpers ─────────────────────────────────────────────────────────────
function parseLocalDate(str) {
  if (!str) return null;
  // Handle both YYYY-MM-DD and ISO datetime strings from Airtable
  const dateStr = str.includes('T') ? str.split('T')[0] : str;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function getDayState(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  if (!date) return 'future';
  if (date.getTime() === today.getTime()) return 'today';
  if (date < today) return 'past';
  if (date <= weekFromNow) return 'soon';
  return 'future';
}

function formatDayHeader(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function stageLabel(stage) {
  const map = {
    'group stage': 'Group Stage', 'round of 32': 'R32', 'round of 16': 'R16',
    'quarter-final': 'QF', 'semi-final': 'SF', 'bronze final': '3rd Place', 'final': 'FINAL',
  };
  return map[(stage || '').toLowerCase().trim()] || stage || '';
}

// ─── Single match row ─────────────────────────────────────────────────────────
function buildMatchRow(match, watchPartyMatchIds, hasCatchAll) {
  // Airtable returns undefined for empty fields — normalize everything
  const homeScore = match.home_score != null ? String(match.home_score) : '';
  const awayScore = match.away_score != null ? String(match.away_score) : '';
  const time      = match.time || 'TBD';
  const homeName  = match.home_team || 'TBD';
  const awayName  = match.away_team || 'TBD';

  const hasScore = homeScore !== '' && awayScore !== '';
  const homeWon  = hasScore && Number(homeScore) > Number(awayScore);
  const awayWon  = hasScore && Number(awayScore) > Number(homeScore);

  const scoreOrTime = hasScore
    ? `<span class="mr-score">
         <span class="${homeWon ? 'score-win' : awayWon ? 'score-loss' : ''}">${esc(homeScore)}</span>
         <span class="score-sep">–</span>
         <span class="${awayWon ? 'score-win' : homeWon ? 'score-loss' : ''}">${esc(awayScore)}</span>
       </span>`
    : `<span class="mr-time">${esc(time)}</span>`;

  const groupInfo = match.group
    ? `<span class="mr-stage">${esc(stageLabel(match.stage))} · Grp ${esc(match.group)}</span>`
    : `<span class="mr-stage">${esc(stageLabel(match.stage || ''))}</span>`;

  const homeKey = homeName.toLowerCase().trim();
  const awayKey = awayName.toLowerCase().trim();

  const hasWatchParty = hasCatchAll || (watchPartyMatchIds && watchPartyMatchIds.has(match.match_id));
  const watchPartyBadge = hasWatchParty
    ? `<span class="mr-watch-party">Official Events</span>`
    : '';

  const clickable = !hasScore;

  return `
    <div class="match-row${hasScore ? ' match-row--past' : ''}${clickable ? '' : ' match-row--no-click'}"
         ${clickable ? `data-home="${homeKey}" data-away="${awayKey}" data-match-id="${esc(match.match_id || '')}" title="Filter bars for this match"` : ''}>
      <div class="mr-teams">
        <span class="mr-team">
          ${getMatchFlag(homeName)}
          <span class="mr-name ${homeWon ? 'team--winner' : ''}">${esc(homeName)}</span>
        </span>
        <span class="mr-middle">${scoreOrTime}</span>
        <span class="mr-team mr-team--away">
          <span class="mr-name ${awayWon ? 'team--winner' : ''}">${esc(awayName)}</span>
          ${getMatchFlag(awayName)}
        </span>
      </div>
      ${groupInfo}
      ${watchPartyBadge}
    </div>`;
}

// ─── Day column card ──────────────────────────────────────────────────────────
function buildDayCard(dateStr, matchesForDay, state, watchPartyMatchIds, hasCatchAll) {
  const date = parseLocalDate(dateStr);
  const stateClass = {
    past: 'day-card--past', today: 'day-card--today',
    soon: 'day-card--soon', future: 'day-card--future'
  }[state] || '';

  return `
    <div class="day-card ${stateClass}">
      <div class="day-header">${formatDayHeader(date)}</div>
      <div class="day-matches">
        ${matchesForDay.map(m => buildMatchRow(m, watchPartyMatchIds, hasCatchAll)).join('')}
      </div>
    </div>`;
}

// ─── Match row click handler ──────────────────────────────────────────────────
function handleMatchRowClick(e) {
  const row = e.currentTarget;
  const home = row.dataset.home;
  const away = row.dataset.away;
  const matchId = row.dataset.matchId || null;

  document.getElementById('barList').classList.remove('hidden');
  document.querySelectorAll('#barList .category-block').forEach(block => {
    const blockNations = (block.dataset.nations || '').split(',');
    const isMatch = blockNations.includes(home) || blockNations.includes(away) || blockNations.includes('all nations');
    block.classList.toggle('hidden', !isMatch);
  });

  const allWPs = window._watchPartiesData || [];
  const matchWPs = allWPs.filter(wp => {
    const wpHome = (wp.home_team || '').toLowerCase().trim();
    const wpAway = (wp.away_team || '').toLowerCase().trim();
    const isCatchAll = !wp.match_id || !wp.match_id.trim();
    return isCatchAll
      || (matchId && wp.match_id && wp.match_id.trim() === matchId.trim())
      || (wpHome && wpAway && wpHome === home && wpAway === away);
  });

  const wpList = document.getElementById('watchPartyList');
  if (wpList) {
    if (matchWPs.length) {
      const container = document.getElementById('watchPartyCards');
      if (container) container.innerHTML = matchWPs.map(buildWatchPartyCard).join('');
      wpList.classList.remove('hidden');
    } else {
      wpList.classList.add('hidden');
    }
  }

  if (window.filterMapPinsMulti) window.filterMapPinsMulti([home, away], matchId);

  const mapSection = document.querySelector('.map-section');
  if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.querySelectorAll('.match-row').forEach(r => r.classList.remove('match-row--active'));
  row.classList.add('match-row--active');
}

// ─── Build and render the carousel ───────────────────────────────────────────
function buildMatchCarousel(matches, watchParties) {
  const section = document.getElementById('matchCarousel');
  if (!section) return;

  const watchPartyMatchIds = new Set(
    (watchParties || []).map(wp => wp.match_id).filter(Boolean)
  );
  const hasCatchAll = (watchParties || []).some(wp => !wp.match_id || !wp.match_id.trim());

  const matchById = {};
  matches.forEach(m => { if (m.match_id) matchById[m.match_id] = m; });
  window._matchById = matchById;

  if (!matches.length) {
    const track = document.getElementById('matchTrack');
    if (track) track.innerHTML = '<div style="color:#555;font-size:0.8rem;padding:20px 0;">Match schedule coming soon.</div>';
    return;
  }

  matches.sort((a, b) => {
    const da = parseLocalDate(a.date), db = parseLocalDate(b.date);
    if (da && db && da.getTime() !== db.getTime()) return da - db;
    return (a.time || '').localeCompare(b.time || '');
  });

  const byDate = {};
  matches.forEach(m => {
    const key = (m.date || '').includes('T') ? m.date.split('T')[0] : (m.date || 'unknown');
    if (!byDate[key]) byDate[key] = [];
    byDate[key].push(m);
  });

  const track = document.getElementById('matchTrack');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allDates = Object.keys(byDate).map(d => parseLocalDate(d)).filter(Boolean);
  const firstMatchDate = allDates.length ? new Date(Math.min(...allDates.map(d => d.getTime()))) : null;
  const beforeTournament = firstMatchDate && today < firstMatchDate;
  let firstFutureDone = false;

  track.innerHTML = Object.entries(byDate).map(([dateStr, dayMatches]) => {
    const date = parseLocalDate(dateStr);
    let state = date ? getDayState(date) : 'future';
    if (beforeTournament && state === 'future' && !firstFutureDone) {
      state = 'today';
      firstFutureDone = true;
    }
    return buildDayCard(dateStr, dayMatches, state, watchPartyMatchIds, hasCatchAll);
  }).join('');

  track.querySelectorAll('.match-row:not(.match-row--no-click)').forEach(row => {
    row.addEventListener('click', handleMatchRowClick);
  });

  requestAnimationFrame(() => {
    const todayCard = track.querySelector('.day-card--today, .day-card--soon');
    if (todayCard) {
      const scrollLeft = todayCard.offsetLeft - (track.parentElement.getBoundingClientRect().width / 2) + (todayCard.getBoundingClientRect().width / 2);
      track.parentElement.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
    }
  });

  document.getElementById('matchPrev').addEventListener('click', () => {
    track.parentElement.scrollBy({ left: -300, behavior: 'smooth' });
  });
  document.getElementById('matchNext').addEventListener('click', () => {
    track.parentElement.scrollBy({ left: 300, behavior: 'smooth' });
  });
}