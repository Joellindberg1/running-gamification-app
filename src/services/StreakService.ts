import { RunLog } from '../contexts/UserContext';

export function calculateStreak(runHistory: RunLog[]) {
  if (!runHistory || runHistory.length === 0) {
    return { currentStreak: 0, maxStreak: 0, multiplier: 1 };
  }

  // Sortera nyast först
  const sorted = [...runHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let currentStreak = 0;
  let maxStreak = 0;
  let streakCounter = 0;
  let currentDate = new Date();

  for (const run of sorted) {
    const runDate = new Date(run.date);
    const diff = Math.floor(
      (currentDate.setHours(0, 0, 0, 0) - runDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 0 || diff === 1) {
      streakCounter++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (diff > 1) {
      break;
    }
  }

  currentStreak = streakCounter;

  // Beräkna max streak
  streakCounter = 1;
  maxStreak = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].date);
    const curr = new Date(sorted[i].date);
    const diff = Math.floor(
      (prev.setHours(0, 0, 0, 0) - curr.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 1) {
      streakCounter++;
      maxStreak = Math.max(maxStreak, streakCounter);
    } else if (diff > 1) {
      streakCounter = 1;
    }
  }

  const multiplier = 1 + currentStreak * 0.05;

  return { currentStreak, maxStreak, multiplier };
}
