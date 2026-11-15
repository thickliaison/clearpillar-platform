import Papa from "papaparse";

// All Bootcamp content Rachel edits directly lives in one spreadsheet with
// three tabs (Sessions, Speakers, Page Settings). Each tab needs its own
// gid in the CSV export URL - gid=0 does not reliably match any particular
// tab, so each one was looked up directly from the tab's URL in Sheets.
// Requires the spreadsheet to have link-sharing set to "Anyone with the
// link - Viewer" for the export endpoint to be reachable without auth.
const BOOTCAMP_SHEET_ID = "1paAjK8K1fKiHubyDEBVWaj27pMAVjfGqsHsmQ_KtM_M";
const SESSIONS_GID = "472647504";
const SPEAKERS_GID = "1025340818";
const PAGE_SETTINGS_GID = "1881480750";
const WORKSHOPS_GID = "2026111501";

function sheetCsvUrl(gid) {
  return `https://docs.google.com/spreadsheets/d/${BOOTCAMP_SHEET_ID}/export?format=csv&gid=${gid}`;
}

const SESSIONS_CSV_URL = sheetCsvUrl(SESSIONS_GID);
const SPEAKERS_CSV_URL = sheetCsvUrl(SPEAKERS_GID);
const PAGE_SETTINGS_CSV_URL = sheetCsvUrl(PAGE_SETTINGS_GID);
const WORKSHOPS_CSV_URL = sheetCsvUrl(WORKSHOPS_GID);

// List-style cells (fullDescription, studentsWillLearn, bio) use one entry
// per line within the cell (Alt+Enter in Sheets to add a line).
function splitLines(value) {
  return (value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function fetchCsv(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet (${response.status})`);
  }
  const text = await response.text();
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  return data;
}

// Fetches and assembles the segments (and their speakers) for a single
// session number. Returns null if the session has no title filled in yet
// (i.e. Rachel hasn't populated that session in the sheet), so the caller
// can fall back to the simple summary row.
export async function fetchBootcampSessionSegments(sessionNumber) {
  const [sessionRows, speakerRows] = await Promise.all([
    fetchCsv(SESSIONS_CSV_URL),
    fetchCsv(SPEAKERS_CSV_URL),
  ]);

  const rows = sessionRows.filter(
    (row) =>
      String(row.sessionNumber || "").trim() === String(sessionNumber) &&
      (row.title || "").trim(),
  );

  if (rows.length === 0) {
    return null;
  }

  return rows.map((row) => {
    const segmentSpeakers = speakerRows
      .filter(
        (s) =>
          String(s.sessionNumber || "").trim() === String(sessionNumber) &&
          (s.segment || "").trim() === (row.segment || "").trim(),
      )
      .map((s) => ({
        name: s.name || "",
        role: s.role || "",
        bio: splitLines(s.bio),
      }));

    return {
      segment: row.segment || "",
      title: row.title || "",
      date: row.date || "",
      startTime: row.startTime || "",
      endTime: row.endTime || "",
      location: row.location || "",
      format: row.format || "",
      language: row.language || "",
      shortDescription: row.shortDescription || "",
      fullDescription: splitLines(row.fullDescription),
      dataTopics: splitLines(row.dataTopics),
      studentsWillLearn: splitLines(row.studentsWillLearn),
      guidedActivity: row.guidedActivity || "",
      speakers: segmentSpeakers,
    };
  });
}

// Fetches the page-level title/subtitle from the Page Settings tab. Returns
// null if the sheet has no title filled in, so the caller can fall back to
// the i18n default.
export async function fetchBootcampPageSettings() {
  const rows = await fetchCsv(PAGE_SETTINGS_CSV_URL);
  const row = rows[0];

  if (!row || !(row.title || "").trim()) {
    return null;
  }

  return {
    title: row.title || "",
    subtitle: row.subtitle || "",
  };
}

// "December 5, 2026" -> local-midnight Date, or null if unparseable.
function parseSheetDate(value) {
  const parsed = new Date((value || "").trim());
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Normalizes one Workshops-tab row. server/utils/bootcampWorkshops.js reads
// the same tab, so keep the two in sync when columns change.
function normalizeWorkshopRow(row) {
  const title = (row.title || "").trim();
  const date = (row.date || "").trim();
  return {
    // Rachel may leave id blank; fall back to something stable enough to
    // identify the row within one page load.
    id: (row.id || "").trim() || slugify(`${date}-${title}`),
    title,
    date,
    dateValue: parseSheetDate(date),
    startTime: (row.startTime || "").trim(),
    endTime: (row.endTime || "").trim(),
    shortDescription: (row.shortDescription || "").trim(),
    // Blank status counts as open so a new row shows up without extra steps.
    isOpen: (row.status || "").trim().toLowerCase() !== "closed",
    format: (row.format || "").trim(),
    location: (row.location || "").trim(),
    meetingLink: (row.meetingLink || "").trim(),
  };
}

// Fetches the open-ended workshop list from the Workshops tab (one row per
// workshop). Returns only workshops that have a title, are not Closed, and
// are not in the past, sorted by date. Rows with an unparseable date are
// kept (at the end) rather than silently hidden.
export async function fetchWorkshops() {
  const rows = await fetchCsv(WORKSHOPS_CSV_URL);
  const today = startOfToday();

  return rows
    .map(normalizeWorkshopRow)
    .filter((w) => w.title && w.isOpen)
    .filter((w) => !w.dateValue || w.dateValue >= today)
    .sort((a, b) => {
      if (!a.dateValue) return 1;
      if (!b.dateValue) return -1;
      return a.dateValue - b.dateValue;
    });
}

// Sheet times are Eastern (per Rachel), so label them explicitly for
// families outside NY. "3:00 PM" + "4:30 PM" -> "3:00 PM – 4:30 PM ET".
export function formatWorkshopTime(workshop) {
  const { startTime, endTime } = workshop;
  if (!startTime) return "";
  return endTime ? `${startTime} – ${endTime} ET` : `${startTime} ET`;
}
