import { describe, expect, it } from 'vitest';
import reference from './__fixtures__/reference.json';
import { profiles } from '../data/profiles';
import { analyze, answersToRow, encode, FEATURES, fitEncoder, prepare, round2, type Answers, type Categorical } from '.';
import { kmeans } from './kmeans';
import { pca } from './pca';

type Case = (typeof reference.cases)[number];

function toAnswers(c: Case): Answers {
  const { age, height, ethnicities, speaks, ...rest } = c.data;
  return { age, height, ethnicities, speaks, categorical: rest as Record<Categorical, string | number> };
}

const prepared = prepare(profiles);

describe('round2', () => {
  it('rounds half to even like numpy', () => {
    expect(round2(0.125)).toBe(0.12);
    expect(round2(0.135)).toBe(0.14);
    expect(round2(-1.005)).toBe(-1);
    expect(round2(2.5e-3)).toBe(0);
  });
});

describe.each(reference.cases)('reference case "$name"', (c) => {
  const answers = toAnswers(c);
  const result = analyze(prepared, answers, { threshold: c.threshold, mode: c.mode === 1 ? 'similar' : 'opposite' });

  it('encodes the answers like the Flask API', () => {
    const expected = FEATURES.map((column) => (c.encoded as Record<string, number>)[column]);
    expect(encode(prepared.encoder, answersToRow(answers))).toEqual(expected);
  });

  it('labels the same profiles as matches', () => {
    expect(result.match).toEqual(c.labels);
  });

  it('projects with the same PCA', () => {
    const maxDiff = Math.max(...result.coords.flatMap((row, i) => row.map((x, j) => Math.abs(x - c.scores[i][j]))));
    expect(maxDiff).toBeLessThan(1e-6);
  });

  it('finds groups at least as compact as scikit-learn', () => {
    const { inertia } = kmeans(result.coords, 4);
    expect(inertia).toBeLessThanOrEqual(c.inertia * 1.001);
  });
});

describe('encoder', () => {
  it('rejects values that no profile has', () => {
    const encoder = fitEncoder(profiles);
    expect(() => encode(encoder, { ...profiles[0], pets_cats: 'does not like cats' })).toThrow(/pets_cats/);
  });
});

describe('pca', () => {
  it('orders components by explained variance', () => {
    const { explained } = pca(prepared.profiles, 4);
    expect([...explained].sort((a, b) => b - a)).toEqual(explained);
  });
});
