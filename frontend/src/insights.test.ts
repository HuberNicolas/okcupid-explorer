import { describe, expect, it } from 'vitest';
import { profiles } from './data/profiles';
import { analyze, prepare } from './engine';
import { defaultAnswers, randomAnswers } from './composables/useExplorer';
import { standouts } from './insights';

const prepared = prepare(profiles);

describe('answers', () => {
  it('default answers only use values that occur in the data', () => {
    expect(() => analyze(prepared, defaultAnswers(), { threshold: 0.8, mode: 'similar' })).not.toThrow();
  });

  it('random answers only use values that occur in the data', () => {
    for (let i = 0; i < 50; i++) {
      expect(() => analyze(prepared, randomAnswers(), { threshold: 0.5, mode: 'opposite' })).not.toThrow();
    }
  });
});

describe('standouts', () => {
  it('lists at most one value per attribute, strongest first', () => {
    const women = profiles.filter((row) => row.sex === 'f');
    const result = standouts(women, profiles, 10);
    expect(new Set(result.map((s) => s.key)).size).toBe(result.length);
    expect(result.map((s) => s.lift)).toEqual([...result.map((s) => s.lift)].sort((a, b) => b - a));
    expect(result[0]).toMatchObject({ key: 'sex', value: 'f' });
  });
});
