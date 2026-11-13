// Chart colours and shared ECharts options. Plain data, so importing it does not load ECharts.

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
};

/** The one typeface of the app, also used inside the charts */
export const SANS = "'Space Grotesk', system-ui, sans-serif";

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
