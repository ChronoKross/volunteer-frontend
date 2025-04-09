/**
 * Determines if a given date is during the night shift (7 PM to 7 AM).
 * @param date - The date to check.
 * @returns True if the date is during the night shift, false otherwise.
 */
export function isDuringNightShift(date: Date): boolean {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const decimal = hour + minute / 60;
  return decimal < 7 || decimal >= 19;
}

/**
 * Calculates the hours missed during the shift (7 PM to 7 AM).
 * @param leaveTime - The time the employee leaves.
 * @returns The number of hours missed, or 0 if the leave time is outside the shift.
 */
export function calculateHoursVolunteered(leaveTime: Date): number {
  if (!isDuringNightShift(leaveTime)) return 0;

  const shiftStart = new Date(leaveTime);
  shiftStart.setHours(19, 0, 0, 0); // 7 PM

  if (leaveTime < shiftStart) {
    shiftStart.setDate(shiftStart.getDate() - 1); // Adjust to the previous day
  }

  const ms = shiftStart.getTime() + 12 * 3600000 - leaveTime.getTime(); // 12-hour shift
  return Math.max(0, Math.min(12, Math.round(ms / 3600000 * 100) / 100));
}
