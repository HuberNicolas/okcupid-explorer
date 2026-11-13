<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue';
import type { ECharts, EChartsCoreOption } from 'echarts/core';

import { useMediaQuery } from '../composables/useMediaQuery';

/** `label` is the chart's text alternative: what a screen reader announces instead of the canvas */
const props = defineProps<{ option: EChartsCoreOption; label: string; height?: string }>();
const emit = defineEmits<{
  click: [params: Record<string, unknown>];
  brush: [params: Record<string, unknown>];
  ready: [chart: ECharts];
}>();

const el = useTemplateRef<HTMLDivElement>('el');
const chart = shallowRef<ECharts>();
let resizeObserver: ResizeObserver | undefined;

// ECharts animates on its canvas, which the CSS reduced-motion rule cannot reach
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const withMotion = (option: EChartsCoreOption) => (reduceMotion.value ? { ...option, animation: false } : option);

let unmounted = false;

onMounted(async () => {
  // Load ECharts only when the first chart mounts, so it does not delay the first render
  const { echarts } = await import('../charts/echarts');
  if (unmounted || !el.value) return;
  chart.value = echarts.init(el.value, undefined, { renderer: 'canvas' });
  chart.value.setOption(withMotion(props.option));
  chart.value.on('click', (params) => emit('click', params as unknown as Record<string, unknown>));
  chart.value.on('brushSelected', (params) => emit('brush', params as unknown as Record<string, unknown>));
  resizeObserver = new ResizeObserver(() => chart.value?.resize());
  resizeObserver.observe(el.value!);
  emit('ready', chart.value);
});

watch([() => props.option, reduceMotion], ([option]) =>
  chart.value?.setOption(withMotion(option), { notMerge: false, lazyUpdate: true }),
);

onBeforeUnmount(() => {
  unmounted = true;
  resizeObserver?.disconnect();
  chart.value?.dispose();
});

defineExpose({ chart });
</script>

<template>
  <div ref="el" class="echart" role="img" :aria-label="label" :style="{ height: height ?? '320px' }"></div>
</template>

<style scoped>
.echart {
  width: 100%;
}
</style>
