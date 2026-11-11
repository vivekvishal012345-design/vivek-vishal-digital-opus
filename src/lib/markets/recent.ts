/** Groups within the 7 calendar days ending on the newest report date (inclusive). */
export function recentGroups<T extends { date: string }>(groups: T[], days = 7): T[] {
  if (!groups.length) return [];
  const newest = groups.reduce((m, g) => (g.date > m ? g.date : m), groups[0].date);
  const start = new Date(`${newest}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  const from = start.toISOString().slice(0, 10);
  return groups.filter((g) => g.date >= from && g.date <= newest).sort((a, b) => (a.date < b.date ? 1 : -1));
}
