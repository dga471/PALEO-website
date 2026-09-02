// Small helpers shared by the page templates.

/** Format a date as "2 September 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Sort a list newest-first by a date (or year) field. */
export function newestFirst<T>(items: T[], getDate: (item: T) => Date | number): T[] {
  return [...items].sort((a, b) => Number(getDate(b)) - Number(getDate(a)));
}
