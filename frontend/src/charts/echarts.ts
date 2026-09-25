import * as echarts from 'echarts/core';
import { BarChart, RadarChart, ScatterChart } from 'echarts/charts';
import {
  BrushComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  RadarComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  RadarChart,
  ScatterChart,
  BrushComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  RadarComponent,
  TooltipComponent,
  CanvasRenderer,
]);

export { echarts };

/** Colours of the four k-means groups, and of the user */
export const GROUP_COLORS = ['#5cf0b0', '#6eb5ff', '#c99bff', '#ffc06e'];
export const GROUP_ACCENTS = ['green', 'blue', 'violet', 'amber'] as const;
export const YOU_COLOR = '#ff8fc7';

export const COLORS = {
  text: '#eaeaf2',
  dim: '#9a9aad',
  faint: '#55556a',
  line: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.16)',
  tooltip: 'rgba(13, 13, 20, 0.96)',
};

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const baseOption = {
  backgroundColor: 'transparent',
  textStyle: { fontFamily: "'Space Grotesk', system-ui, sans-serif", color: COLORS.dim },
  animationDuration: 600,
  animationEasing: 'cubicOut' as const,
  tooltip: {
    backgroundColor: COLORS.tooltip,
    borderColor: COLORS.lineStrong,
    borderWidth: 1,
    padding: [10, 12],
    textStyle: { color: COLORS.text, fontSize: 12.5 },
    extraCssText: 'border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.5);backdrop-filter:blur(6px);',
  },
};

export const axisStyle = {
  axisLine: { lineStyle: { color: COLORS.lineStrong } },
  axisTick: { show: false },
  axisLabel: { color: COLORS.dim, fontFamily: MONO, fontSize: 11 },
  splitLine: { lineStyle: { color: COLORS.line } },
  nameTextStyle: { color: COLORS.faint, fontFamily: MONO, fontSize: 11 },
};
