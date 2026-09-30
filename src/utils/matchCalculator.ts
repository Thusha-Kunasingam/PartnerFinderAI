/**
 * Computes multi-dimensional compatibility score based on Stitch specifications:
 * Score = (0.40 * Skills) + (0.25 * Availability) + (0.20 * Interests) + (0.15 * Location)
 */
export function calculateMatchScore(
  skillsScore: number,
  availabilityScore: number,
  interestsScore: number,
  locationScore: number
): number {
  const composite =
    0.4 * skillsScore +
    0.25 * availabilityScore +
    0.2 * interestsScore +
    0.15 * locationScore;
  return Math.round(composite);
}
