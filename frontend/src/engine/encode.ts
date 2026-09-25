import { CONTINUOUS, FEATURES, type Row } from './columns';

/**
 * Round half to even at two decimals, like numpy.round(x, 2): scale, round the float to the
 * nearest integer with ties to even, scale back.
 */
export function round2(x: number): number {
  const y = x * 100;
  const floor = Math.floor(y);
  const diff = y - floor;
  let r = floor;
  if (diff > 0.5) r = floor + 1;
  else if (diff === 0.5) r = floor % 2 === 0 ? floor : floor + 1;
  return r / 100;
}

const compare = (a: string | number, b: string | number) =>
  typeof a === 'number' && typeof b === 'number' ? a - b : a < b ? -1 : a > b ? 1 : 0;

export interface Encoder {
  mean: Record<string, number>;
  std: Record<string, number>;
  categories: Record<string, (string | number)[]>;
}

/**
 * Fit the encoder of the 2022 API: StandardScaler (population standard deviation) for age and
 * height, and one integer code per sorted distinct value for every other column.
 */
export function fitEncoder(rows: Row[]): Encoder {
  const encoder: Encoder = { mean: {}, std: {}, categories: {} };
  for (const column of FEATURES) {
    const values = rows.map((row) => row[column]);
    if ((CONTINUOUS as readonly string[]).includes(column)) {
      const numbers = values.map(Number);
      const mean = numbers.reduce((sum, v) => sum + v, 0) / numbers.length;
      const variance = numbers.reduce((sum, v) => sum + (v - mean) ** 2, 0) / numbers.length;
      encoder.mean[column] = mean;
      encoder.std[column] = Math.sqrt(variance) || 1;
    } else {
      encoder.categories[column] = [...new Set(values)].sort(compare);
    }
  }
  return encoder;
}

/** Encode one row; throws on a value that no fitted row has, as scikit-learn does. */
export function encode(encoder: Encoder, row: Row): number[] {
  return FEATURES.map((column) => {
    if (column in encoder.mean) {
      return round2((Number(row[column]) - encoder.mean[column]) / encoder.std[column]);
    }
    const code = encoder.categories[column].indexOf(row[column]);
    if (code === -1) throw new Error(`Unknown value ${JSON.stringify(row[column])} for ${column}`);
    return code;
  });
}
