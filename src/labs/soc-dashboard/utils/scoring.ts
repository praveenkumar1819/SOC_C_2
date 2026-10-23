export const calculateReasoningScore = (
  reasoning: string,
  keyTerms: string[]
): { score: number; matchedTerms: string[] } => {
  if (!reasoning || reasoning.trim().length < 10) {
    return { score: 0, matchedTerms: [] };
  }

  const lower = reasoning.toLowerCase();
  const matched = keyTerms.filter((term) => lower.includes(term.toLowerCase()));
  const ratio = matched.length / Math.max(1, keyTerms.length);

  // Scale score between 40 (for effort) and 100 based on matched domain concepts
  const score = Math.min(100, Math.round(40 + ratio * 60));
  return { score, matchedTerms: matched };
};

export const calculateWeightedScore = (
  componentScores: { weight: number; score: number }[]
): number => {
  const totalWeight = componentScores.reduce((acc, c) => acc + c.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedSum = componentScores.reduce(
    (acc, c) => acc + c.weight * c.score,
    0
  );
  return Math.round(weightedSum / totalWeight);
};
