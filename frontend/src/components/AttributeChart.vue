<script setup lang="ts">
import { computed } from 'vue';
import EChart from './EChart.vue';
import { axisStyle, baseOption, COLORS, MATCH_COLOR, YOU_COLOR } from '../charts/theme';
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

const name = computed(() => ATTRIBUTES[props.attribute].label);
const label = computed(
  () =>
    `Bar chart of ${name.value.toLowerCase()}: the share of each answer among all profiles and among your matches. Your answer: ${valueLabel(answers.categorical[props.attribute])}.`,
);
const activeValue = computed(() => (filter.value?.key === props.attribute ? filter.value.value : undefined));

const option = computed(() => {
  const key = props.attribute;
  const { match } = analysis.value;
  const matches = profiles.filter((_, i) => match[i]);
  const share = (rows: typeof profiles, value: string | number) =>
    rows.length ? rows.filter((row) => row[key] === value).length / rows.length : 0;
  const yours = answers.categorical[key];
  const active = activeValue.value;

  return {
    ...baseOption,
    grid: { left: 8, right: 8, top: 26, bottom: 4, outerBoundsMode: 'same', outerBoundsContain: 'axisLabel' },
    legend: { show: false },
    tooltip: {
      ...baseOption.tooltip,
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: COLORS.hover } },
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
          itemStyle: { color: active === v ? COLORS.barActive : COLORS.bar, borderRadius: horizontal.value ? [0, 4, 4, 0] : [4, 4, 0, 0] },
        })),
      },
      {
        name: 'Your matches',
        type: 'bar',
        data: values.value.map((v) => ({
          value: share(matches, v),
          itemStyle: {
            color: v === yours ? YOU_COLOR : MATCH_COLOR,
            opacity: active === undefined || active === v ? 1 : 0.35,
            borderRadius: horizontal.value ? [0, 4, 4, 0] : [4, 4, 0, 0],
          },
        })),
      },
    ],
  };
});

function toggleFilter(value: string | number) {
  filter.value = activeValue.value === value ? null : { key: props.attribute, value };
}

function onClick(params: Record<string, unknown>) {
  toggleFilter(values.value[params.dataIndex as number]);
}
</script>

<template>
  <div class="attr panel" :class="{ 'attr--wide': wide }">
    <p class="attr__title">{{ name }}</p>
    <EChart :key="String(horizontal)" :option="option" :label="label" :height="height" @click="onClick" />
    <!-- Keyboard path to the bar filter: hidden until one of the buttons has focus -->
    <div class="attr__keys" role="group" :aria-label="`Filter the map by ${name.toLowerCase()}`">
      <button
        v-for="v in values"
        :key="String(v)"
        type="button"
        class="chip"
        :aria-pressed="activeValue === v"
        @click="toggleFilter(v)"
      >
        {{ valueLabel(v) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.attr {
  padding: 16px 16px 10px;
}
.attr--wide {
  grid-column: 1 / -1;
}
.attr__keys:not(:focus-within) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.attr__keys:focus-within {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0 6px;
}
.attr__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
</style>
