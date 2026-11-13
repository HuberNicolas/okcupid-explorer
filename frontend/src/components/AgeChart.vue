<script setup lang="ts">
import { computed } from 'vue';
import EChart from './EChart.vue';
import { axisStyle, baseOption, COLORS, SANS, YOU_COLOR } from '../charts/theme';
import { useExplorer } from '../composables/useExplorer';
import { useMediaQuery } from '../composables/useMediaQuery';

const { analysis, profiles, answers } = useExplorer();

// On narrow screens the legend wraps to two lines; the plot then moves down to clear the "you" label
const narrow = useMediaQuery('(max-width: 480px)');

const option = computed(() => {
  const ages = Array.from({ length: 50 }, (_, i) => 17 + i);
  const { match } = analysis.value;
  const count = (sex: string, onlyMatches: boolean) =>
    ages.map((age) => profiles.filter((row, i) => row.age === age && row.sex === sex && (!onlyMatches || match[i])).length);
  return {
    ...baseOption,
    grid: { left: 8, right: 12, top: narrow.value ? 60 : 36, bottom: 4, outerBoundsMode: 'same', outerBoundsContain: 'axisLabel' },
    legend: { top: 0, right: 0, icon: 'circle', itemWidth: 9, textStyle: { color: COLORS.dim, fontSize: 11.5 } },
    tooltip: { ...baseOption.tooltip, trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,0.03)' } } },
    xAxis: { ...axisStyle, type: 'category', data: ages, axisLabel: { ...axisStyle.axisLabel, interval: 4 } },
    yAxis: { ...axisStyle, type: 'value' },
    series: [
      { name: 'Women', type: 'bar', stack: 'all', data: count('f', false), itemStyle: { color: 'rgba(201,155,255,0.25)' } },
      { name: 'Men', type: 'bar', stack: 'all', data: count('m', false), itemStyle: { color: 'rgba(110,181,255,0.25)' } },
      { name: 'Matching women', type: 'bar', stack: 'matches', barGap: '-100%', data: count('f', true), itemStyle: { color: '#c99bff' } },
      {
        name: 'Matching men',
        type: 'bar',
        stack: 'matches',
        data: count('m', true),
        itemStyle: { color: '#6eb5ff' },
        markLine: {
          symbol: 'none',
          silent: true,
          lineStyle: { color: YOU_COLOR, type: 'dashed', width: 1.5 },
          label: { color: YOU_COLOR, formatter: 'you', fontFamily: SANS },
          data: [{ xAxis: String(Math.min(Math.max(answers.age, 17), 66)) }],
        },
      },
    ],
  };
});
</script>

<template>
  <div class="age panel">
    <p class="age__title">Age</p>
    <p class="panel__hint">All profiles in the background, your matches in front.</p>
    <EChart :option="option" height="240px" />
  </div>
</template>

<style scoped>
.age__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}
</style>
