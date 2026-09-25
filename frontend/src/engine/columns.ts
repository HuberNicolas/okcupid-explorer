// Feature columns in the order the 2022 API encoded them (backend/src/app.py)

export const CONTINUOUS = ['age', 'height'] as const;

export const CATEGORICAL = [
  'body_type', 'drinks', 'drugs', 'income', 'job', 'orientation', 'sex', 'smokes',
  'diet', 'diet_modifier',
  'education_status', 'education_institution',
  'offspring_status', 'offspring_future',
  'pets_cats', 'pets_dogs',
  'religion_type', 'religion_modifier',
  'sign', 'sign_modifier',
] as const;

export const ETHNICITIES = [
  'ethnicities_middle_eastern', 'ethnicities_hispanic_/_latin',
  'ethnicities_white', 'ethnicities_indian', 'ethnicities_other',
  'ethnicities_asian', 'ethnicities_black', 'ethnicities_native_american',
  'ethnicities_pacific_islander',
] as const;

export const SPEAKS = [
  'speaks_english', 'speaks_spanish', 'speaks_french', 'speaks_c++',
  'speaks_chinese', 'speaks_japanese', 'speaks_german', 'speaks_italian',
] as const;

export const FEATURES: readonly string[] = [...CONTINUOUS, ...CATEGORICAL, ...ETHNICITIES, ...SPEAKS];

export type Categorical = (typeof CATEGORICAL)[number];

/** A profile or the user's answers as one flat row, like a row of the okcupid_clean table. */
export type Row = Record<string, string | number>;

/** The questionnaire answers; ethnicities and languages are lists of values such as "hispanic / latin". */
export interface Answers {
  age: number;
  height: number;
  categorical: Record<Categorical, string | number>;
  ethnicities: string[];
  speaks: string[];
}

/** "hispanic / latin" → "ethnicities_hispanic_/_latin" */
export const ethnicityColumn = (value: string) => `ethnicities_${value.replaceAll(' ', '_')}`;
export const speaksColumn = (value: string) => `speaks_${value.replaceAll(' ', '_')}`;

/** Turn answers into a row with the same columns as a profile. */
export function answersToRow(answers: Answers): Row {
  const row: Row = { age: answers.age, height: answers.height, ...answers.categorical };
  for (const column of ETHNICITIES) row[column] = 0;
  for (const column of SPEAKS) row[column] = 0;
  for (const value of answers.ethnicities) row[ethnicityColumn(value)] = 1;
  for (const value of answers.speaks) row[speaksColumn(value)] = 1;
  return row;
}
