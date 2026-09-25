import type { Categorical } from '../engine';
import { valueCounts } from '../data/profiles';

export type Accent = 'green' | 'blue' | 'violet' | 'amber';

export interface Attribute {
  key: Categorical;
  label: string;
  /** Answer values in display order; values not listed are appended by frequency */
  order?: (string | number)[];
}

export const ATTRIBUTES: Record<Categorical, Attribute> = {
  sex: { key: 'sex', label: 'Sex', order: ['f', 'm'] },
  orientation: { key: 'orientation', label: 'Orientation', order: ['straight', 'gay', 'bisexual'] },
  body_type: {
    key: 'body_type',
    label: 'Body type',
    order: ['skinny', 'thin', 'average', 'fit', 'athletic', 'jacked', 'curvy', 'a little extra', 'full figured', 'overweight', 'used up'],
  },
  diet: { key: 'diet', label: 'Diet', order: ['anything', 'vegetarian', 'vegan', 'kosher', 'halal', 'other'] },
  diet_modifier: { key: 'diet_modifier', label: 'Diet strictness', order: ['no specified diet modifier', 'mostly', 'strictly'] },
  drinks: { key: 'drinks', label: 'Drinks', order: ['not at all', 'rarely', 'socially', 'often', 'very often', 'desperately'] },
  smokes: { key: 'smokes', label: 'Smokes', order: ['no', 'trying to quit', 'when drinking', 'sometimes', 'yes'] },
  drugs: { key: 'drugs', label: 'Drugs', order: ['never', 'sometimes', 'often'] },
  education_institution: {
    key: 'education_institution',
    label: 'Education',
    order: ['high school', 'two-year college', 'college/university', 'masters program', 'ph.d program', 'law school', 'med school', 'space camp'],
  },
  education_status: {
    key: 'education_status',
    label: 'Education status',
    order: ['working on', 'graduated from', 'dropped out of', 'no specified educational status'],
  },
  job: { key: 'job', label: 'Job' },
  income: { key: 'income', label: 'Income', order: [20000, 30000, 40000, 50000, 60000, 70000, 80000, 100000, 150000, 250000, 500000, 1000000] },
  religion_type: {
    key: 'religion_type',
    label: 'Religion',
    order: ['agnosticism', 'atheism', 'christianity', 'catholicism', 'judaism', 'buddhism', 'hinduism', 'islam', 'other'],
  },
  religion_modifier: {
    key: 'religion_modifier',
    label: 'Religion importance',
    order: ['laughing about it', 'not too serious about it', 'somewhat serious about it', 'very serious about it'],
  },
  sign: {
    key: 'sign',
    label: 'Zodiac sign',
    order: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'],
  },
  sign_modifier: {
    key: 'sign_modifier',
    label: 'Astrology',
    order: ['no specified sign modifier', "but it doesn't matter", "and it's fun to think about", 'and it matters a lot'],
  },
  offspring_status: { key: 'offspring_status', label: 'Kids now', order: ["doesn't have kids", 'has a kid', 'has kids'] },
  offspring_future: { key: 'offspring_future', label: 'Kids later', order: ["doesn't want", 'might want', 'wants'] },
  pets_cats: { key: 'pets_cats', label: 'Cats', order: ['likes cats', 'has cats'] },
  pets_dogs: { key: 'pets_dogs', label: 'Dogs', order: ['likes dogs', 'has dogs'] },
};

const VALUE_LABELS: Record<string, string> = {
  f: 'Woman',
  m: 'Man',
  'no specified diet modifier': 'Not specified',
  'no specified educational status': 'Not specified',
  'no specified sign modifier': 'Not specified',
  "but it doesn't matter": "It doesn't matter",
  "and it's fun to think about": "It's fun to think about",
  'and it matters a lot': 'It matters a lot',
  'college/university': 'College / university',
  'ph.d program': 'PhD program',
  "doesn't have kids": 'No kids',
  "doesn't want": "Doesn't want kids",
  'might want': 'Might want kids',
  wants: 'Wants kids',
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Human-readable label of an answer value. */
export function valueLabel(value: string | number): string {
  if (typeof value === 'number') {
    return value >= 1000 ? `$${value.toLocaleString('en-US')}` : String(value);
  }
  return VALUE_LABELS[value] ?? capitalize(value);
}

/** All values of an attribute that occur in the data, in display order. */
export function attributeValues(key: Categorical): (string | number)[] {
  const byCount = valueCounts(key).map((entry) => entry.value);
  const order = ATTRIBUTES[key].order ?? [];
  return [...order.filter((value) => byCount.includes(value)), ...byCount.filter((value) => !order.includes(value))];
}

export const ETHNICITY_VALUES = [
  'white', 'asian', 'hispanic / latin', 'black', 'indian', 'middle eastern', 'native american', 'pacific islander', 'other',
];
export const LANGUAGE_VALUES = ['english', 'spanish', 'french', 'german', 'italian', 'chinese', 'japanese', 'c++'];

export interface Step {
  id: string;
  title: string;
  kicker: string;
  accent: Accent;
  fields: (Categorical | 'age' | 'height' | 'ethnicities' | 'speaks')[];
}

export const STEPS: Step[] = [
  { id: 'you', kicker: '01', title: 'About you', accent: 'green', fields: ['age', 'height', 'sex', 'orientation', 'body_type'] },
  { id: 'life', kicker: '02', title: 'Lifestyle', accent: 'blue', fields: ['diet', 'diet_modifier', 'drinks', 'smokes', 'drugs'] },
  { id: 'work', kicker: '03', title: 'Work & education', accent: 'violet', fields: ['education_institution', 'education_status', 'job', 'income'] },
  { id: 'beliefs', kicker: '04', title: 'Beliefs', accent: 'amber', fields: ['religion_type', 'religion_modifier', 'sign', 'sign_modifier'] },
  { id: 'family', kicker: '05', title: 'Kids & pets', accent: 'green', fields: ['offspring_status', 'offspring_future', 'pets_cats', 'pets_dogs'] },
  { id: 'background', kicker: '06', title: 'Languages & background', accent: 'blue', fields: ['speaks', 'ethnicities'] },
];

/** Attributes shown as distribution charts before the user picks others */
export const DEFAULT_CHARTS: Categorical[] = ['sex', 'orientation', 'body_type', 'drinks', 'religion_type', 'job'];
export const MAX_CHARTS = 9;
