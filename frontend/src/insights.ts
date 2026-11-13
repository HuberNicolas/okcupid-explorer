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

/** Answers that say nothing about a person; they never count as standing out */
const UNINFORMATIVE = /^(not specified|rather not say)$/i;

/**
 * Attribute values that are much more common in a selection than among all profiles, at most one per attribute.
 * Values need at least `minCount` people in the selection to count.
 */
export function standouts(
  selection: Row[],
  all: Row[],
  limit = 5,
  minCount = 5,
  keys: readonly Categorical[] = CATEGORICAL,
): Standout[] {
  if (!selection.length) return [];
  const result: Standout[] = [];
  for (const key of keys) {
    const overall = new Map<string | number, number>();
    for (const row of all) overall.set(row[key], (overall.get(row[key]) ?? 0) + 1);
    const inside = new Map<string | number, number>();
    for (const row of selection) inside.set(row[key], (inside.get(row[key]) ?? 0) + 1);
    for (const [value, count] of inside) {
      if (count < minCount || UNINFORMATIVE.test(valueLabel(value))) continue;
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

/**
 * Attributes that may describe a group. Sex, orientation, ethnicity, religion, drugs, body type and income are left
 * out on purpose: naming a group by them would label people rather than describe what they have in common.
 */
export const DESCRIPTIVE: readonly Categorical[] = [
  'job', 'education_institution', 'education_status', 'drinks', 'smokes', 'diet',
  'offspring_status', 'offspring_future', 'pets_cats', 'pets_dogs', 'sign',
];

/** A short, neutral portrait of a group: its typical age and the two values that stand out most. */
export function groupSummary(rows: Row[], all: Row[]): string {
  if (!rows.length) return '';
  const age = Math.round(rows.reduce((sum, row) => sum + Number(row.age), 0) / rows.length);
  const traits = standouts(rows, all, DESCRIPTIVE.length, 10, DESCRIPTIVE)
    .filter((s) => s.lift >= 1.2 && valueLabel(s.value).toLowerCase() !== 'other')
    .slice(0, 2)
    .map((s) => `${ATTRIBUTES[s.key].label.toLowerCase()}: ${valueLabel(s.value).toLowerCase()}`);
  return [`around ${age}`, ...traits].join(' · ');
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
