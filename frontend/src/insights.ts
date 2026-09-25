import { ATTRIBUTES, attributeValues, valueLabel } from './content/attributes';
import { CATEGORICAL, type Answers, type Categorical, type Row } from './engine';

export interface Standout {
  key: Categorical;
  value: string | number;
  label: string;
  /** Share within the selection */
  share: number;
  /** Share within the selection divided by the share among all profiles */
  lift: number;
}

/**
 * Attribute values that are much more common in a selection than among all profiles, at most one per attribute.
 * Values need at least `minCount` people in the selection to count.
 */
export function standouts(selection: Row[], all: Row[], limit = 5, minCount = 5): Standout[] {
  if (!selection.length) return [];
  const result: Standout[] = [];
  for (const key of CATEGORICAL) {
    const overall = new Map<string | number, number>();
    for (const row of all) overall.set(row[key], (overall.get(row[key]) ?? 0) + 1);
    const inside = new Map<string | number, number>();
    for (const row of selection) inside.set(row[key], (inside.get(row[key]) ?? 0) + 1);
    for (const [value, count] of inside) {
      if (count < minCount) continue;
      const share = count / selection.length;
      const lift = share / ((overall.get(value) ?? 1) / all.length);
      result.push({ key, value, share, lift, label: `${ATTRIBUTES[key].label}: ${valueLabel(value)}` });
    }
  }
  // Keep the strongest value per attribute, so one attribute cannot fill the whole list
  const strongest = new Map<Categorical, Standout>();
  for (const s of result) if (!strongest.has(s.key) || s.lift > strongest.get(s.key)!.lift) strongest.set(s.key, s);
  return [...strongest.values()].sort((a, b) => b.lift - a.lift).slice(0, limit);
}

/** Position of a value on its attribute's scale, from 0 to 1, for radar charts. */
export function scalePosition(key: Categorical, value: string | number): number {
  const values = attributeValues(key);
  return values.length > 1 ? values.indexOf(value) / (values.length - 1) : 0;
}

export interface Comparison {
  key: Categorical;
  label: string;
  you: string;
  them: string;
  same: boolean;
}

export function compare(answers: Answers, row: Row, keys: readonly Categorical[] = CATEGORICAL): Comparison[] {
  return keys.map((key) => ({
    key,
    label: ATTRIBUTES[key].label,
    you: valueLabel(answers.categorical[key]),
    them: valueLabel(row[key]),
    same: answers.categorical[key] === row[key],
  }));
}

export const percent = (share: number, digits = 0) => `${(share * 100).toFixed(digits)}%`;

export const heightLabel = (inches: number) =>
  `${Math.round(Number(inches) * 2.54)} cm`;
