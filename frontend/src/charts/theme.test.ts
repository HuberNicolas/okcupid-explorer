// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { COLORS, GROUP_COLORS, YOU_COLOR } from './theme';

// The charts draw on a canvas and cannot use CSS variables, so theme.ts repeats the colour
// tokens of main.css. This test keeps the two in step.
const css = readFileSync(new URL('../styles/main.css', import.meta.url), 'utf8');
const token = (name: string) => css.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();

describe('chart colours', () => {
  it('match the CSS tokens', () => {
    expect(GROUP_COLORS).toEqual(['green', 'blue', 'violet', 'amber'].map(token));
    expect(YOU_COLOR).toBe(token('pink'));
    expect(COLORS.text).toBe(token('text'));
    expect(COLORS.dim).toBe(token('text-dim'));
    expect(COLORS.faint).toBe(token('text-faint'));
    expect(COLORS.line).toBe(token('line'));
    expect(COLORS.lineStrong).toBe(token('line-strong'));
  });
});
