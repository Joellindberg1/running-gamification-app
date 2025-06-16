import { RunLog } from '../contexts/UserContext';

export function calculateStreak(runHistory: RunLog[]): number {
  if (!runHistory || runHistory.length === 0) return 0;

  // Sortera loggar nyast → äldst
  const sorted = [...runHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  let currentDate = new Date();

  for (const run of sorted) {
    const runDate = new Date(run.date);
    const diff = Math.floor(
      (currentDate.setHours(0, 0, 0, 0) - runDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 0 || diff === 1) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1); // gå bakåt en dag
    } else if (diff > 1) {
      break;
    }
  }

  return streak;
}
