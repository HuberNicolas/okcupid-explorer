<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue';
import type { ECharts, EChartsCoreOption } from 'echarts/core';
import { echarts } from '../charts/echarts';

const props = defineProps<{ option: EChartsCoreOption; height?: string }>();
const emit = defineEmits<{
  click: [params: Record<string, unknown>];
  brush: [params: Record<string, unknown>];
  ready: [chart: ECharts];
}>();

const el = useTemplateRef<HTMLDivElement>('el');
const chart = shallowRef<ECharts>();
let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  chart.value = echarts.init(el.value!, undefined, { renderer: 'canvas' });
  chart.value.setOption(props.option);
  chart.value.on('click', (params) => emit('click', params as unknown as Record<string, unknown>));
  chart.value.on('brushSelected', (params) => emit('brush', params as unknown as Record<string, unknown>));
  resizeObserver = new ResizeObserver(() => chart.value?.resize());
  resizeObserver.observe(el.value!);
  emit('ready', chart.value);
});

watch(
  () => props.option,
  (option) => chart.value?.setOption(option, { notMerge: false, lazyUpdate: true }),
);

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  chart.value?.dispose();
});

defineExpose({ chart });
</script>

<template>
  <div ref="el" class="echart" :style="{ height: height ?? '320px' }"></div>
</template>

<style scoped>
.echart {
  width: 100%;
}
</style>
