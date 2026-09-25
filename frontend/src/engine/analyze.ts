import { answersToRow, type Answers, type Row } from './columns';
import { encode, fitEncoder, type Encoder } from './encode';
import { kmeans } from './kmeans';
import { pca } from './pca';

export type Mode = 'similar' | 'opposite';

export interface Settings {
  /** 0 to 1; profiles at or above it count as matches */
  threshold: number;
  mode: Mode;
}

export interface Analysis {
  /** Encoded values of the user, in FEATURES order */
  you: number[];
  /** Encoded values of every profile, in FEATURES order */
  profiles: number[][];
  /** Cosine similarity of each profile to the user (1 - similarity in opposite mode) */
  score: number[];
  /** 1 if score >= threshold, else 0 */
  match: (0 | 1)[];
  /** PCA coordinates; the last entry is the user */
  coords: number[][];
  /** k-means group per profile, the last entry is the user; groups are ordered by their first coordinate */
  group: number[];
  /** Share of variance of each PCA component */
  explained: number[];
}

export const GROUPS = 4;
const COMPONENTS = 4;

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}

/** Everything that does not depend on the answers; compute once. */
export interface Prepared {
  encoder: Encoder;
  profiles: number[][];
}

export function prepare(rows: Row[]): Prepared {
  const encoder = fitEncoder(rows);
  return { encoder, profiles: rows.map((row) => encode(encoder, row)) };
}

/**
 * The analysis of the 2022 API (backend/src/app.py): encode, cosine similarity to the answers,
 * a 0/1 label by threshold, PCA with four components on all rows plus the label, k-means with four groups.
 */
export function analyze(prepared: Prepared, answers: Answers, settings: Settings): Analysis {
  const you = encode(prepared.encoder, answersToRow(answers));
  const all = [...prepared.profiles, you];

  const similarity = all.map((row) => cosine(row, you));
  const score = settings.mode === 'opposite' ? similarity.map((s) => 1 - s) : similarity;
  const labels = score.map((s) => (s < settings.threshold ? 0 : 1));

  const { scores: coords, explained } = pca(
    all.map((row, i) => [...row, labels[i]]),
    COMPONENTS,
  );
  const { labels: raw, centers } = kmeans(coords, GROUPS);

  // Number the groups from left to right, so colours stay stable between runs
  const order = centers.map((c, i) => [c[0], i] as const).sort((a, b) => a[0] - b[0]).map(([, i]) => i);
  const rank = new Map(order.map((original, position) => [original, position]));

  return {
    you,
    profiles: prepared.profiles,
    score: score.slice(0, -1),
    match: labels.slice(0, -1) as (0 | 1)[],
    coords,
    group: raw.map((g) => rank.get(g)!),
    explained,
  };
}
