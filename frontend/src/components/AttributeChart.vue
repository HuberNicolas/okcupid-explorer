<script setup lang="ts">
import { computed } from 'vue';
import EChart from './EChart.vue';
import { axisStyle, baseOption, COLORS, YOU_COLOR } from '../charts/theme';
import { useExplorer } from '../composables/useExplorer';
import { useMediaQuery } from '../composables/useMediaQuery';
import { ATTRIBUTES, attributeValues, valueLabel } from '../content/attributes';
import type { Categorical } from '../engine';
import { percent } from '../insights';

const props = defineProps<{ attribute: Categorical }>();
const { analysis, profiles, answers, filter } = useExplorer();

const values = computed(() => attributeValues(props.attribute));
// Attributes with many values (such as job) take a full row; on phones their bars turn horizontal
const wide = computed(() => values.value.length > 12);
const narrow = useMediaQuery('(max-width: 640px)');
const horizontal = computed(() => wide.value && narrow.value);
const height = computed(() => (horizontal.value ? `${values.value.length * 22 + 40}px` : '210px'));

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
    grid: { left: 8, right: 8, top: 26, bottom: 4, outerBoundsMode: 'same', outerBoundsContain: 'axisLabel' },
    legend: { show: false },
    tooltip: {
      ...baseOption.tooltip,
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,0.03)' } },
      valueFormatter: (v: number) => percent(v, 1),
    },
    [horizontal.value ? 'yAxis' : 'xAxis']: {
      ...axisStyle,
      type: 'category',
      inverse: horizontal.value,
      data: values.value.map((v) => valueLabel(v)),
      axisLabel: {
        ...axisStyle.axisLabel,
        interval: 0,
        rotate: !horizontal.value && values.value.length > 5 ? 35 : 0,
        width: horizontal.value ? 120 : 90,
        overflow: 'truncate',
        color: (_: string, index: number) => (values.value[index] === yours ? YOU_COLOR : COLORS.dim),
      },
    },
    [horizontal.value ? 'xAxis' : 'yAxis']: {
      ...axisStyle,
      type: 'value',
      axisLabel: { ...axisStyle.axisLabel, formatter: (v: number) => percent(v) },
    },
    series: [
      {
        name: 'All profiles',
        type: 'bar',
        barGap: '10%',
        data: values.value.map((v) => ({
          value: share(profiles, v),
          itemStyle: { color: active === v ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)', borderRadius: horizontal.value ? [0, 4, 4, 0] : [4, 4, 0, 0] },
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
            borderRadius: horizontal.value ? [0, 4, 4, 0] : [4, 4, 0, 0],
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
  <div class="attr panel" :class="{ 'attr--wide': wide }">
    <p class="attr__title">{{ ATTRIBUTES[attribute].label }}</p>
    <EChart :key="String(horizontal)" :option="option" :height="height" @click="onClick" />
  </div>
</template>

<style scoped>
.attr {
  padding: 16px 16px 10px;
}
.attr--wide {
  grid-column: 1 / -1;
}
.attr__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
</style>
