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

function sheetCsvUrl(gid) {
  return `https://docs.google.com/spreadsheets/d/${BOOTCAMP_SHEET_ID}/export?format=csv&gid=${gid}`;
}

const SESSIONS_CSV_URL = sheetCsvUrl(SESSIONS_GID);
const SPEAKERS_CSV_URL = sheetCsvUrl(SPEAKERS_GID);
const PAGE_SETTINGS_CSV_URL = sheetCsvUrl(PAGE_SETTINGS_GID);

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
