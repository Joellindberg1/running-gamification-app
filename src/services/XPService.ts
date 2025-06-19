
export function calculateBaseXP(distance: number): number {
  return distance * 10; // enkel regel: 10 XP per km
}

export function getMultiplikator(streakDays: number): number {
  if (streakDays >= 270) return 2.0;
  if (streakDays >= 240) return 1.9;
  if (streakDays >= 210) return 1.8;
  if (streakDays >= 180) return 1.7;
  if (streakDays >= 150) return 1.6;
  if (streakDays >= 120) return 1.5;
  if (streakDays >= 90) return 1.4;
  if (streakDays >= 60) return 1.3;
  if (streakDays >= 30) return 1.2;
  if (streakDays >= 15) return 1.1;
  return 1.0;
}

export function getStreakBonus(streakDays: number): number {
  const bonuses = [10, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return bonuses.includes(streakDays) ? 50 : 0;
}

export function calculateTotalXP(
  distance: number,
  streakDays: number
): number {
  const base = calculateBaseXP(distance);
  const multiplier = getMultiplikator(streakDays);
  const bonus = getStreakBonus(streakDays);

  const total = base * multiplier + bonus;
  return Math.round(total);
}
