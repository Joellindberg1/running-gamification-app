export function getSwedishWeekendKey(date: Date): string {
  const day = date.getDay(); // 0 = söndag, 6 = lördag

  // Om söndag (0), gå tillbaka en dag
  const adjusted = new Date(date);
  if (day === 0) {
    adjusted.setDate(adjusted.getDate() - 1);
  }

  const year = adjusted.getFullYear();
  const jan1 = new Date(year, 0, 1);
  const days = Math.floor((adjusted.getTime() - jan1.getTime()) / 86400000);
  const week = Math.ceil((days + jan1.getDay() + 1) / 7);

  return `${year}-W${week}`;
}
