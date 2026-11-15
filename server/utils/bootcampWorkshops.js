const Papa = require('papaparse');

// Reads the Workshops tab of the Bootcamp Data sheet (the same tab the client
// reads in client/src/utils/bootcampSheetData.js; keep the two in sync).
// The registration route uses this to look up workshops by id, so emails and
// calendar files use the sheet's data rather than whatever the browser sent.
// The sheet must be shared as "Anyone with the link - Viewer".
const BOOTCAMP_SHEET_ID = '1paAjK8K1fKiHubyDEBVWaj27pMAVjfGqsHsmQ_KtM_M';
const WORKSHOPS_GID = '2026111501';
const WORKSHOPS_CSV_URL = `https://docs.google.com/spreadsheets/d/${BOOTCAMP_SHEET_ID}/export?format=csv&gid=${WORKSHOPS_GID}`;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeWorkshopRow(row) {
  const title = (row.title || '').trim();
  const date = (row.date || '').trim();
  return {
    id: (row.id || '').trim() || slugify(`${date}-${title}`),
    title,
    date,
    startTime: (row.startTime || '').trim(),
    endTime: (row.endTime || '').trim(),
    shortDescription: (row.shortDescription || '').trim(),
    isOpen: (row.status || '').trim().toLowerCase() !== 'closed',
    format: (row.format || '').trim(),
    location: (row.location || '').trim(),
    meetingLink: (row.meetingLink || '').trim(),
  };
}

// All titled rows, including Closed and past ones; callers decide what to
// accept (e.g. reject registration for a Closed workshop).
async function fetchWorkshops() {
  const response = await fetch(WORKSHOPS_CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch Workshops sheet (${response.status})`);
  }
  const { data } = Papa.parse(await response.text(), {
    header: true,
    skipEmptyLines: true,
  });
  return data.map(normalizeWorkshopRow).filter((w) => w.title);
}

async function fetchWorkshopsByIds(ids) {
  const wanted = new Set(ids);
  const workshops = await fetchWorkshops();
  return workshops.filter((w) => wanted.has(w.id));
}

// Sheet times are Eastern. Matches formatWorkshopTime on the client.
function formatWorkshopTime(workshop) {
  const { startTime, endTime } = workshop;
  if (!startTime) return '';
  return endTime ? `${startTime} – ${endTime} ET` : `${startTime} ET`;
}

// "Title — December 5, 2026, 3:00 PM – 4:30 PM ET"
function describeWorkshop(workshop) {
  const when = [workshop.date, formatWorkshopTime(workshop)]
    .filter(Boolean)
    .join(', ');
  return when ? `${workshop.title} — ${when}` : workshop.title;
}

module.exports = { fetchWorkshops, fetchWorkshopsByIds, describeWorkshop };
