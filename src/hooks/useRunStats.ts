import { useUserContext } from '../contexts/UserContext';
import { RunLog } from '../contexts/RunContext';

export function useRunStats(userId?: string) {
  const { users, activeUserId } = useUserContext();
  const user = users.find(u => u.id === (userId || activeUserId));
  const history: RunLog[] = user?.runHistory || [];

  const totalKm = history.reduce((sum, r) => sum + r.distance, 0);
  const runCount = history.length;
  const longestRun = history.reduce((max, r) => Math.max(max, r.distance), 0);
  const averageKm = runCount > 0 ? totalKm / runCount : 0;
  const lastRun = history
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] || null;

  return {
    totalKm,
    runCount,
    longestRun,
    averageKm,
    lastRun,
    runHistory: history,
    user,
  };
}
