/**
 * Determines if a given date and time is blocked based on the list of blocked times.
 */
export function isTimeBlocked(
  blockedTimes: { date: string; time: string }[],
  date: string,
  time: string
): boolean {
  if (!date || !time) return false;

  return blockedTimes.some((b) => {
    if (!b.date) return false;

    let bDateStr = b.date.toString().trim();
    let bDate = bDateStr;

    // Handle Excel/Sheets serial numbers (e.g., 46106 for 2026-03-25)
    if (!isNaN(Number(bDateStr)) && Number(bDateStr) > 40000) {
      const excelDate = Number(bDateStr);
      const d = new Date((excelDate - 25569) * 86400 * 1000);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      const day = String(d.getUTCDate()).padStart(2, '0');
      bDate = `${y}-${m}-${day}`;
    } else {
      // Handle DD.MM.YYYY or DD/MM/YYYY
      // Only split by dot if it's not an ISO string with milliseconds
      if (!bDateStr.includes('T') && bDateStr.includes('.')) {
        bDateStr = bDateStr.split('.').reverse().join('-');
      }
      if (!bDateStr.includes('T') && bDateStr.includes('/')) {
        bDateStr = bDateStr.split('/').reverse().join('-');
      }

      const d = new Date(bDateStr);
      if (!isNaN(d.getTime())) {
        // If it's an ISO string with a timezone offset (e.g., "2026-03-24T21:00:00.000Z")
        // Add 12 hours to push it to the intended local day
        if (bDateStr.includes('T') && bDateStr.endsWith('Z')) {
          d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
        }
        const y = d.getUTCFullYear();
        const m = String(d.getUTCMonth() + 1).padStart(2, '0');
        const day = String(d.getUTCDate()).padStart(2, '0');
        bDate = `${y}-${m}-${day}`;
      }
    }

    if (bDate !== date) return false;

    if (!b.time) return true; // Whole day blocked

    let timeStr = b.time.toString().trim();

    // If time is an ISO string from Google Sheets (e.g. "1899-12-30T07:00:00.000Z")
    if (timeStr.includes('T')) {
      const d = new Date(timeStr);
      timeStr = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    } else if (!timeStr.includes(':') && !isNaN(Number(timeStr))) {
      const fraction = Number(timeStr);
      const totalMinutes = Math.round(fraction * 24 * 60);
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      timeStr = `${h}:${String(m).padStart(2, '0')}`;
    }

    const uParts = time.split(':');
    const uTimeInMinutes = parseInt(uParts[0], 10) * 60 + parseInt(uParts[1], 10);

    // Check if it's a range like "14:30-16:30" or "14:30 - 16:30"
    if (timeStr.includes('-')) {
      const [startStr, endStr] = timeStr.split('-');
      const parseMinutes = (t: string) => {
        const parts = t.trim().split(':');
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      };

      const startMins = parseMinutes(startStr);
      const endMins = parseMinutes(endStr);

      if (!isNaN(startMins) && !isNaN(endMins)) {
        return uTimeInMinutes >= startMins && uTimeInMinutes <= endMins;
      }
    }

    // If it's a single time like "14:30" or "14:30:00"
    const bParts = timeStr.split(':');
    const bTimeInMinutes = parseInt(bParts[0], 10) * 60 + parseInt(bParts[1], 10);

    if (!isNaN(bTimeInMinutes)) {
      return Math.abs(bTimeInMinutes - uTimeInMinutes) <= 90;
    }

    return false;
  });
}
