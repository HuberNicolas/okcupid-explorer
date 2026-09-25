<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ label: string; min: number; max: number; step?: number; display: (value: number) => string }>();
const model = defineModel<number>({ required: true });
const fill = computed(() => `${((model.value - props.min) / (props.max - props.min)) * 100}%`);
</script>

<template>
  <label class="range">
    <span class="range__head">
      <span class="range__label">{{ label }}</span>
      <span class="range__value mono">{{ display(model) }}</span>
    </span>
    <input v-model.number="model" type="range" :min="min" :max="max" :step="step ?? 1" :style="{ '--fill': fill }" />
  </label>
</template>

<style scoped>
.range {
  display: block;
}
.range__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}
.range__label {
  font-size: 14px;
  font-weight: 600;
}
.range__value {
  font-size: 13px;
  color: var(--accent, var(--green));
}
</style>
