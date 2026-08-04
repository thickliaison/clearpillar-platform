import Papa from "papaparse";

// Published CSV export URLs for the two Bootcamp content sheets Rachel edits
// directly. Requires both sheets to have link-sharing set to "Anyone with
// the link - Viewer" for the export endpoint to be reachable without auth.
// No gid param: these sheets only have one tab each, and the tab's actual
// internal gid isn't 0 for a CSV-converted sheet - passing gid=0 404s.
const SESSIONS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1QQrQcsj5T6lw_b7AzH6dmc_Lj22udOdMga3sgL84FMc/export?format=csv";
const SPEAKERS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1BViO4Y5umOn3YDvPvRe-bEpyIVGWlbtvcEywIfdM6Ms/export?format=csv";

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
      studentsWillLearn: splitLines(row.studentsWillLearn),
      speakers: segmentSpeakers,
    };
  });
}
