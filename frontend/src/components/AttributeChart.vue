<script setup lang="ts">
import { computed } from 'vue';
import EChart from './EChart.vue';
import { axisStyle, baseOption, COLORS, YOU_COLOR } from '../charts/echarts';
import { useExplorer } from '../composables/useExplorer';
import { ATTRIBUTES, attributeValues, valueLabel } from '../content/attributes';
import type { Categorical } from '../engine';
import { percent } from '../insights';

const props = defineProps<{ attribute: Categorical }>();
const { analysis, profiles, answers, filter } = useExplorer();

const values = computed(() => attributeValues(props.attribute));

const option = computed(() => {
  const key = props.attribute;
  const { match } = analysis.value;
  const matches = profiles.filter((_, i) => match[i]);
  const share = (rows: typeof profiles, value: string | number) =>
    rows.length ? rows.filter((row) => row[key] === value).length / rows.length : 0;
  const yours = answers.categorical[key];
  const active = filter.value?.key === key ? filter.value.value : undefined;

  return {
    ...baseOption,
    grid: { left: 8, right: 8, top: 26, bottom: 4, containLabel: true },
    legend: { show: false },
    tooltip: {
      ...baseOption.tooltip,
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,0.03)' } },
      valueFormatter: (v: number) => percent(v, 1),
    },
    xAxis: {
      ...axisStyle,
      type: 'category',
      data: values.value.map((v) => valueLabel(v)),
      axisLabel: {
        ...axisStyle.axisLabel,
        interval: 0,
        rotate: values.value.length > 5 ? 35 : 0,
        width: 90,
        overflow: 'truncate',
        color: (_: string, index: number) => (values.value[index] === yours ? YOU_COLOR : COLORS.dim),
      },
    },
    yAxis: { ...axisStyle, type: 'value', axisLabel: { ...axisStyle.axisLabel, formatter: (v: number) => percent(v) } },
    series: [
      {
        name: 'All profiles',
        type: 'bar',
        barGap: '10%',
        data: values.value.map((v) => ({
          value: share(profiles, v),
          itemStyle: { color: active === v ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)', borderRadius: [4, 4, 0, 0] },
        })),
      },
      {
        name: 'Your matches',
        type: 'bar',
        data: values.value.map((v) => ({
          value: share(matches, v),
          itemStyle: {
            color: v === yours ? YOU_COLOR : '#6eb5ff',
            opacity: active === undefined || active === v ? 1 : 0.35,
            borderRadius: [4, 4, 0, 0],
          },
        })),
      },
    ],
  };
});

function onClick(params: Record<string, unknown>) {
  const value = values.value[params.dataIndex as number];
  const current = filter.value;
  filter.value = current?.key === props.attribute && current.value === value ? null : { key: props.attribute, value };
}
</script>

<template>
  <div class="attr panel">
    <p class="attr__title">{{ ATTRIBUTES[attribute].label }}</p>
    <EChart :option="option" height="210px" @click="onClick" />
  </div>
</template>

<style scoped>
.attr {
  padding: 16px 16px 10px;
}
.attr__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
</style>
