import { getSwedishWeekendKey } from '../utils/dateUtils';
import { User} from '../contexts/RunContext';


export type TitleAssignments = {
  longestRun?: string;
  totalKm?: string;
  weekendAvg?: string;
  longestStreak?: string;
};

export function assignTitles(users: User[]): TitleAssignments {
  const titles: TitleAssignments = {};

  let maxRun = 0;
  let maxRunHolder = '';
  let maxRunDate = new Date(0);

  let maxTotalKm = 0;
  let maxTotalKmHolder = '';
  let maxTotalKmDate = new Date(0);

  let maxStreak = 0;
  let maxStreakHolder = '';
  let maxStreakDate = new Date(0);

  let maxAvg = 0;
  let maxAvgHolder = '';
  let maxAvgDate = new Date(0);

  for (const user of users) {
    const history = user.runHistory || [];
    if (history.length === 0) continue;

    // Längsta runda
    const longest = history.reduce((max, run) => run.distance > max ? run.distance : max, 0);
    const longestDate = history.find(run => run.distance === longest)?.date ?? new Date(0);
    if (longest >= 12) {
      if (
        longest > maxRun ||
        (longest === maxRun && new Date(longestDate) < maxRunDate)
      ) {
        maxRun = longest;
        maxRunHolder = user.id;
        maxRunDate = new Date(longestDate);
      }
    }

    // Total km
    const totalKm = history.reduce((sum, run) => sum + run.distance, 0);
    const lastRunDate = new Date(Math.max(...history.map(run => new Date(run.date).getTime())));
    if (totalKm >= 100) {
      if (
        totalKm > maxTotalKm ||
        (totalKm === maxTotalKm && lastRunDate < maxTotalKmDate)
      ) {
        maxTotalKm = totalKm;
        maxTotalKmHolder = user.id;
        maxTotalKmDate = lastRunDate;
      }
    }

    // Helg snitt
    const weekends: Record<string, { total: number; lastDate: Date }> = {};

    for (const run of history) {
      const date = new Date(run.date);
      const day = date.getDay(); // 6 = lördag, 0 = söndag
      if (day === 0 || day === 6) {
        const weekKey = getSwedishWeekendKey(date);
        if (!weekends[weekKey]) {
          weekends[weekKey] = { total: 0, lastDate: date };
        }
        weekends[weekKey].total += run.distance;
        if (date > weekends[weekKey].lastDate) {
          weekends[weekKey].lastDate = date;
        }
      }
    }

    const validWeeks = Object.values(weekends).filter(week => week.total > 0);
    const weekendAvg = validWeeks.length > 0
      ? validWeeks.reduce((sum, w) => sum + w.total, 0) / validWeeks.length
      : 0;

    const lastWeekendDate = validWeeks.length > 0
      ? validWeeks.reduce((latest, w) => w.lastDate > latest ? w.lastDate : latest, new Date(0))
      : new Date(0);

    if (weekendAvg >= 9) {
      if (
        weekendAvg > maxAvg ||
        (weekendAvg === maxAvg && lastWeekendDate < maxAvgDate)
      ) {
        maxAvg = weekendAvg;
        maxAvgHolder = user.id;
        maxAvgDate = lastWeekendDate;
      }
    }

    // Streak
    const streak = calculateStreak(history);
    if (streak >= 20) {
      if (
        streak > maxStreak ||
        (streak === maxStreak && lastRunDate < maxStreakDate)
      ) {
        maxStreak = streak;
        maxStreakHolder = user.id;
        maxStreakDate = lastRunDate;
      }
    }
  }

  titles.longestRun = maxRunHolder;
  titles.totalKm = maxTotalKmHolder;
  titles.weekendAvg = maxAvgHolder;
  titles.longestStreak = maxStreakHolder;

  return titles;
}

function calculateStreak(history: { date: string }[]): number {
  const sorted = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (diff > 1) {
      break;
    }
  }

  return streak;
}
