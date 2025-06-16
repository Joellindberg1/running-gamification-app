type LevelDefinition = {
  level: number;
  requiredXP: number;
};

const levels: LevelDefinition[] = [
  { level: 1, requiredXP: 0 },
  { level: 2, requiredXP: 50 },
  { level: 3, requiredXP: 102.5 },
  { level: 4, requiredXP: 158.15 },
  { level: 5, requiredXP: 217.139 },
  { level: 6, requiredXP: 280.847 },
  { level: 7, requiredXP: 349.651 },
  { level: 8, requiredXP: 423.961 },
  { level: 9, requiredXP: 504.958 },
  { level: 10, requiredXP: 594.054 },
  { level: 11, requiredXP: 693.842 },
  { level: 12, requiredXP: 806.603 },
  { level: 13, requiredXP: 934.023 },
  { level: 14, requiredXP: 1079.281 },
  { level: 15, requiredXP: 1244.876 },
  { level: 16, requiredXP: 1436.966 },
  { level: 17, requiredXP: 1659.790 },
  { level: 18, requiredXP: 1920.494 },
  { level: 19, requiredXP: 2228.125 },
  { level: 20, requiredXP: 2591.129 },
  { level: 21, requiredXP: 3026.734 },
  { level: 22, requiredXP: 3549.461 },
  { level: 23, requiredXP: 4181.960 },
  { level: 24, requiredXP: 4953.609 },
  { level: 25, requiredXP: 5902.736 },
  { level: 26, requiredXP: 7089.146 },
  { level: 27, requiredXP: 8584.023 },
  { level: 28, requiredXP: 10482.516 },
  { level: 29, requiredXP: 12912.587 },
  { level: 30, requiredXP: 16071.680 }
];

export function getLevelFromXP(xp: number): number {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].requiredXP) {
      return levels[i].level;
    }
  }
  return 1;
}

export function getProgressToNextLevel(xp: number): number {
  const currentLevel = getLevelFromXP(xp);
  const currentXP = levels.find(l => l.level === currentLevel)?.requiredXP ?? 0;
  const nextXP = levels.find(l => l.level === currentLevel + 1)?.requiredXP;

  if (nextXP === undefined) return 100; // max level
  if (xp === currentXP) return 0;       // start på nivån = 100% kvar

  const progress = ((xp - currentXP) / (nextXP - currentXP)) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

export function getRemainingXPToNextLevel(xp: number): number {
  const currentLevel = getLevelFromXP(xp);
  const nextXP = levels.find(l => l.level === currentLevel + 1)?.requiredXP;

  if (!nextXP) return 0;
  return Math.max(nextXP - xp, 0);
}
