const multipliers: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000
};

export const durationToMs = (value: string): number => {
  const match = value.match(/^(\d+)([smhd])$/i);
  if (!match) {
    throw new Error(`Invalid duration string: ${value}`);
  }

  const [, amount, unit] = match;
  return Number(amount) * multipliers[unit.toLowerCase()];
};
