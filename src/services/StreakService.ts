import { RunLog } from '../contexts/RunContext';

export function calculateStreak(runHistory: RunLog[]): {
  currentStreak: number;
  maxStreak: number;
  multiplier: number;
} {
  if (!runHistory || runHistory.length === 0) {
    return { currentStreak: 0, maxStreak: 0, multiplier: 1 };
  }

  // Konvertera datumen till en Set av YYYY-MM-DD
  const runDates = new Set(
    runHistory.map((run) =>
      new Date(run.date).toISOString().split('T')[0]
    )
  );

  let currentStreak = 0;
  let maxStreak = 0;
  let date = new Date();
  date.setHours(0, 0, 0, 0);

  // Om ingen runda idag, börja från igår
  const todayStr = date.toISOString().split('T')[0];
  if (!runDates.has(todayStr)) {
    date.setDate(date.getDate() - 1);
  }

  // Räkna bakåt dag för dag
  while (true) {
    const dateStr = date.toISOString().split('T')[0];
    if (runDates.has(dateStr)) {
      currentStreak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  // Räkna ut max streak
  let tempStreak = 0;
  let streakTracker = new Set(runDates);
  let tempDate = new Date(Math.max(...[...runDates].map(d => new Date(d).getTime())));
  tempDate.setHours(0, 0, 0, 0);

  while (streakTracker.size > 0) {
    const dateStr = tempDate.toISOString().split('T')[0];
    if (streakTracker.has(dateStr)) {
      tempStreak++;
      streakTracker.delete(dateStr);
      tempDate.setDate(tempDate.getDate() - 1);
    } else {
      maxStreak = Math.max(maxStreak, tempStreak);
      tempStreak = 0;

      // hoppa till nästa senaste datum
      const timestamps = [...streakTracker].map(d => new Date(d).getTime());
      if (timestamps.length === 0) break;
      tempDate = new Date(Math.max(...timestamps));
      tempDate.setHours(0, 0, 0, 0);
    }
  }
  maxStreak = Math.max(maxStreak, tempStreak);

  // Multiplikator
  const multiplierTable = (day: number): number => {
    if (day >= 270) return 2;
    if (day >= 240) return 1.9;
    if (day >= 210) return 1.7;
    if (day >= 180) return 1.7;
    if (day >= 150) return 1.6;
    if (day >= 120) return 1.6;
    if (day >= 90) return 1.5;
    if (day >= 60) return 1.4;
    if (day >= 30) return 1.3;
    if (day >= 5) return 1.1;
    return 1;
  };

  const multiplier = multiplierTable(currentStreak);

  return { currentStreak, maxStreak, multiplier };
}
