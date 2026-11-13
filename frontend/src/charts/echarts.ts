import * as echarts from 'echarts/core';
import { BarChart, RadarChart, ScatterChart } from 'echarts/charts';
import {
  BrushComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  RadarComponent,
  ToolboxComponent,
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
  ToolboxComponent,
  TooltipComponent,
  CanvasRenderer,
]);

export { echarts };
