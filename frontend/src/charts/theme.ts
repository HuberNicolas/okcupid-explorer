// Chart colours and shared ECharts options. Plain data, so importing it does not load ECharts.
// The colour values mirror the tokens in styles/main.css; theme.test.ts fails if the two drift apart.

/** Colours of the four k-means groups, and of the user */
export const GROUP_COLORS = ['#5cf0b0', '#6eb5ff', '#c99bff', '#ffc06e'];
export const GROUP_ACCENTS = ['green', 'blue', 'violet', 'amber'] as const;
export const YOU_COLOR = '#ff8fc7';

export const COLORS = {
  text: '#eaeaf2',
  dim: '#9a9aad',
  faint: '#7a7a90',
  line: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.16)',
  tooltip: 'rgba(13, 13, 20, 0.96)',
  /** Background bars (all profiles) and the highlighted one when it filters the map */
  bar: 'rgba(255, 255, 255, 0.12)',
  barActive: 'rgba(255, 255, 255, 0.35)',
  /** Column highlight under the axis pointer */
  hover: 'rgba(255, 255, 255, 0.03)',
};

// Group colours mean groups only. Everything else in the charts is told apart by lightness.
/** Your matches in the distribution charts: white against the grey of all profiles */
export const MATCH_COLOR = COLORS.text;
/** Women and men in the age chart: lighter and darker, all profiles faint behind your matches */
export const SEX_COLORS = {
  f: COLORS.text,
  m: COLORS.dim,
  allF: 'rgba(255, 255, 255, 0.08)',
  allM: 'rgba(255, 255, 255, 0.18)',
};
/** An area selected with the brush on the map */
export const SELECTION_COLOR = COLORS.text;

/** A #rrggbb colour with transparency, for the canvas (which cannot read CSS color-mix) */
export function alpha(hex: string, opacity: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${opacity})`;
}

/** The one typeface of the app, also used inside the charts */
export const SANS = "'Space Grotesk Variable', system-ui, sans-serif";

export const baseOption = {
  backgroundColor: 'transparent',
  textStyle: { fontFamily: SANS, color: COLORS.dim },
  animationDuration: 600,
  animationEasing: 'cubicOut' as const,
  tooltip: {
    backgroundColor: COLORS.tooltip,
    borderColor: COLORS.lineStrong,
    borderWidth: 1,
    padding: [10, 12],
    textStyle: { color: COLORS.text, fontSize: 12.5 },
    extraCssText: 'border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.5);',
  },
};

export const axisStyle = {
  axisLine: { lineStyle: { color: COLORS.lineStrong } },
  axisTick: { show: false },
  axisLabel: { color: COLORS.dim, fontFamily: SANS, fontSize: 11 },
  splitLine: { lineStyle: { color: COLORS.line } },
  nameTextStyle: { color: COLORS.faint, fontFamily: SANS, fontSize: 11 },
};
