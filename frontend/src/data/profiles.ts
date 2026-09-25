import raw from './profiles.json';
import type { Row } from '../engine';

/** The 842 cleaned OkCupid profiles (backend/src/okcupid.sqlite, table okcupid_clean). */
export const profiles: Row[] = raw.rows.map((values) =>
  Object.fromEntries(raw.columns.map((column, i) => [column, values[i] as string | number])),
);

/** Distinct values of a column with how often they occur, most frequent first. */
export function valueCounts(column: string, rows: Row[] = profiles): { value: string | number; count: number }[] {
  const counts = new Map<string | number, number>();
  for (const row of rows) counts.set(row[column], (counts.get(row[column]) ?? 0) + 1);
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count);
}
