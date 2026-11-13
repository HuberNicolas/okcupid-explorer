import { describe, expect, it } from 'vitest';
import { profiles } from './data/profiles';
import { analyze, prepare } from './engine';
import { defaultAnswers, randomAnswers } from './composables/useExplorer';
import { DESCRIPTIVE, groupSummary, standouts } from './insights';
import { ATTRIBUTES } from './content/attributes';

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

describe('groupSummary', () => {
  it('names the typical age and only descriptive attributes', () => {
    const students = profiles.filter((row) => row.job === 'student');
    const summary = groupSummary(students, profiles);
    expect(summary).toMatch(/^around \d+/);
    const labels = summary.split(' · ').slice(1).map((part) => part.split(':')[0]);
    const allowed = DESCRIPTIVE.map((key) => ATTRIBUTES[key].label.toLowerCase());
    for (const label of labels) expect(allowed).toContain(label);
  });

  it('never lists unspecified answers as standing out', () => {
    const result = standouts(profiles.slice(0, 200), profiles, 20, 1);
    expect(result.some((s) => /not specified|rather not say/i.test(s.label))).toBe(false);
  });
});
