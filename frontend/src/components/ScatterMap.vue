<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { ECharts } from 'echarts/core';
import EChart from './EChart.vue';
import { axisStyle, baseOption, COLORS, GROUP_COLORS, YOU_COLOR } from '../charts/echarts';
import { useExplorer } from '../composables/useExplorer';
import { ATTRIBUTES, valueLabel } from '../content/attributes';
import { GROUPS } from '../engine';
import { heightLabel, percent } from '../insights';

const { analysis, profiles, selection, visible, settings, filter } = useExplorer();
const chart = shallowRef<ECharts>();
const brushing = shallowRef(false);

const option = computed(() => {
  const { coords, group, match, score, explained } = analysis.value;
  const you = coords[coords.length - 1];
  const selected = selection.value;
  const picked = new Set(selected?.type === 'group' ? selected.indices : selected ? [selected.index] : []);
  const person = selected?.type === 'person' ? selected.index : -1;

  const series = Array.from({ length: GROUPS }, (_, g) => ({
    name: `Group ${g + 1}`,
    type: 'scatter',
    color: GROUP_COLORS[g],
    data: profiles
      .map((_, i) => i)
      .filter((i) => group[i] === g && visible.value[i])
      .map((i) => ({
        value: [coords[i][0], coords[i][1], i],
        symbolSize: person === i ? 13 : match[i] ? 7.5 : 5,
        itemStyle: {
          opacity: picked.size && !picked.has(i) ? 0.12 : match[i] || picked.has(i) ? 0.95 : 0.28,
          borderColor: person === i ? '#fff' : 'transparent',
          borderWidth: person === i ? 2 : 0,
        },
      })),
    emphasis: { scale: 1.8, itemStyle: { opacity: 1 } },
    animationDurationUpdate: 700,
  }));

  return {
    ...baseOption,
    grid: { left: 44, right: 18, top: 58, bottom: 40 },
    legend: {
      top: 0,
      left: 0,
      icon: 'circle',
      itemWidth: 9,
      itemHeight: 9,
      textStyle: { color: COLORS.dim, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5 },
      data: [...series.map((s) => s.name), 'You'],
    },
    xAxis: { ...axisStyle, type: 'value', scale: true, name: `PC 1 · ${percent(explained[0])}`, nameLocation: 'middle', nameGap: 26 },
    yAxis: { ...axisStyle, type: 'value', scale: true, name: `PC 2 · ${percent(explained[1])}`, nameLocation: 'middle', nameGap: 30 },
    tooltip: {
      ...baseOption.tooltip,
      trigger: 'item',
      formatter: (params: { value: number[]; seriesName: string; color: string }) => {
        if (params.seriesName === 'You') return `<b style="color:${YOU_COLOR}">You</b><br/>Group ${group[group.length - 1] + 1}`;
        const i = params.value[2];
        const row = profiles[i];
        const word = settings.mode === 'similar' ? 'similar' : 'opposite';
        return [
          `<b style="color:${params.color}">${params.seriesName}</b> · ${percent(score[i])} ${word}`,
          `${row.age} years · ${valueLabel(row.sex)} · ${valueLabel(row.orientation)} · ${heightLabel(Number(row.height))}`,
          `${valueLabel(row.job)} · ${valueLabel(row.education_institution)}`,
          `<span style="color:${COLORS.faint}">click for details</span>`,
        ].join('<br/>');
      },
    },
    brush: {
      xAxisIndex: 0,
      brushType: 'rect',
      brushMode: 'single',
      throttleType: 'debounce',
      throttleDelay: 250,
      brushStyle: { color: 'rgba(201,155,255,0.08)', borderColor: 'rgba(201,155,255,0.6)', borderWidth: 1 },
      outOfBrush: { colorAlpha: 0.15 },
    },
    series: [
      ...series,
      {
        name: 'You',
        type: 'scatter',
        color: YOU_COLOR,
        z: 10,
        symbol: 'path://M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3.2 4 7 4c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.8 0 6.1 4.2 4.6 7.7C19.5 16.4 12 21 12 21Z',
        symbolSize: 22,
        data: [{ value: [you[0], you[1], -1] }],
        itemStyle: { shadowBlur: 18, shadowColor: YOU_COLOR },
      },
    ],
  };
});

function onReady(instance: ECharts) {
  chart.value = instance;
}

function onClick(params: Record<string, unknown>) {
  const value = params.value as number[] | undefined;
  if (!value || value[2] < 0) return;
  selection.value = { type: 'person', index: value[2] };
}

function onBrush(params: Record<string, unknown>) {
  const batch = (params.batch as { selected: { seriesIndex: number; dataIndex: number[] }[] }[])[0];
  const series = option.value.series;
  const indices = batch.selected.flatMap(({ seriesIndex, dataIndex }) =>
    seriesIndex < GROUPS ? dataIndex.map((d) => (series[seriesIndex].data[d] as { value: number[] }).value[2]) : [],
  );
  if (indices.length) selection.value = { type: 'group', indices };
}

function toggleBrush() {
  brushing.value = !brushing.value;
  chart.value?.dispatchAction({
    type: 'takeGlobalCursor',
    key: 'brush',
    brushOption: brushing.value ? { brushType: 'rect', brushMode: 'single' } : { brushType: false },
  });
  if (!brushing.value) chart.value?.dispatchAction({ type: 'brush', areas: [] });
}
</script>

<template>
  <div class="map panel">
    <div class="map__head">
      <div>
        <h3 class="panel__title">The map of all profiles</h3>
        <p class="panel__hint">
          Each dot is a person, placed by the first two principal components and coloured by group.
          Bright dots pass your threshold.
        </p>
      </div>
      <div class="map__tools">
        <button v-if="filter" type="button" class="chip" aria-pressed="true" data-accent="amber" @click="filter = null">
          only {{ ATTRIBUTES[filter.key].label.toLowerCase() }}: {{ valueLabel(filter.value) }} ×
        </button>
        <button type="button" class="chip" :aria-pressed="brushing" data-accent="violet" @click="toggleBrush">
          ⬚ {{ brushing ? 'Selecting… drag on the map' : 'Select an area' }}
        </button>
      </div>
    </div>
    <EChart :option="option" height="440px" @ready="onReady" @click="onClick" @brush="onBrush" />
  </div>
</template>

<style scoped>
.map__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}
.map__head .panel__hint {
  max-width: 520px;
}
.map__tools {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
