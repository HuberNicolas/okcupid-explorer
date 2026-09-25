/** Small seeded pseudo-random generator (mulberry32), so results are the same on every run. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const distance2 = (a: number[], b: number[]) => a.reduce((sum, x, i) => sum + (x - b[i]) ** 2, 0);

function nearest(point: number[], centers: number[][]): [index: number, distance: number] {
  let best = 0;
  let bestDistance = Infinity;
  centers.forEach((center, i) => {
    const d = distance2(point, center);
    if (d < bestDistance) [best, bestDistance] = [i, d];
  });
  return [best, bestDistance];
}

/** Greedy k-means++ seeding, as in scikit-learn: 2 + ln(k) candidates per step, keep the best. */
function seedCenters(points: number[][], k: number, random: () => number): number[][] {
  const trials = 2 + Math.floor(Math.log(k));
  const centers = [points[Math.floor(random() * points.length)]];
  let closest = points.map((p) => distance2(p, centers[0]));

  while (centers.length < k) {
    const potential = closest.reduce((sum, d) => sum + d, 0);
    let bestCandidate = 0;
    let bestPotential = Infinity;
    let bestClosest = closest;
    for (let t = 0; t < trials; t++) {
      let r = random() * potential;
      let candidate = 0;
      while (candidate < points.length - 1 && r >= closest[candidate]) r -= closest[candidate++];
      const updated = points.map((p, i) => Math.min(closest[i], distance2(p, points[candidate])));
      const sum = updated.reduce((s, d) => s + d, 0);
      if (sum < bestPotential) [bestCandidate, bestPotential, bestClosest] = [candidate, sum, updated];
    }
    centers.push(points[bestCandidate]);
    closest = bestClosest;
  }
  return centers.map((c) => [...c]);
}

export interface KMeansResult {
  labels: number[];
  centers: number[][];
  inertia: number;
}

function lloyd(points: number[][], centers: number[][], tolerance: number, maxIter = 300): KMeansResult {
  const dims = points[0].length;
  let labels = points.map((p) => nearest(p, centers)[0]);
  for (let iter = 0; iter < maxIter; iter++) {
    const sums = centers.map(() => new Array<number>(dims).fill(0));
    const counts = centers.map(() => 0);
    points.forEach((p, i) => {
      counts[labels[i]]++;
      p.forEach((x, j) => (sums[labels[i]][j] += x));
    });
    const moved = centers.map((center, c) => (counts[c] ? sums[c].map((s) => s / counts[c]) : center));
    const shift = moved.reduce((sum, center, c) => sum + distance2(center, centers[c]), 0);
    centers = moved;
    labels = points.map((p) => nearest(p, centers)[0]);
    if (shift <= tolerance) break;
  }
  const inertia = points.reduce((sum, p, i) => sum + distance2(p, centers[labels[i]]), 0);
  return { labels, centers, inertia };
}

/**
 * k-means with k-means++ seeding and several restarts; returns the run with the lowest inertia.
 * Like scikit-learn, the tolerance is relative to the mean variance of the features.
 */
export function kmeans(points: number[][], k: number, { restarts = 10, seed = 420, tol = 1e-4 } = {}): KMeansResult {
  const dims = points[0].length;
  const variances = Array.from({ length: dims }, (_, j) => {
    const mean = points.reduce((sum, p) => sum + p[j], 0) / points.length;
    return points.reduce((sum, p) => sum + (p[j] - mean) ** 2, 0) / points.length;
  });
  const tolerance = (tol * variances.reduce((sum, v) => sum + v, 0)) / dims;

  const random = seededRandom(seed);
  let best: KMeansResult | undefined;
  for (let run = 0; run < restarts; run++) {
    const result = lloyd(points, seedCenters(points, k, random), tolerance);
    if (!best || result.inertia < best.inertia) best = result;
  }
  return best!;
}
