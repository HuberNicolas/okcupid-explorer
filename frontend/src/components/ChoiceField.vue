<script setup lang="ts">
import { computed } from 'vue';
import { valueLabel } from '../content/attributes';

const props = defineProps<{
  label: string;
  options: (string | number)[];
  multiple?: boolean;
  /** Options that are always selected and cannot be removed */
  locked?: (string | number)[];
  hint?: string;
}>();
const model = defineModel<string | number | (string | number)[]>({ required: true });

const selected = computed(() => (Array.isArray(model.value) ? model.value : [model.value]));

function toggle(option: string | number) {
  if (!props.multiple) {
    model.value = option;
    return;
  }
  if (props.locked?.includes(option)) return;
  const current = selected.value;
  model.value = current.includes(option) ? current.filter((v) => v !== option) : [...current, option];
}
</script>

<template>
  <fieldset class="field">
    <legend class="field__label">{{ label }}</legend>
    <div class="field__options" :role="multiple ? 'group' : 'radiogroup'">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        class="chip"
        :aria-pressed="selected.includes(option)"
        :disabled="locked?.includes(option)"
        @click="toggle(option)"
      >
        {{ valueLabel(option) }}
      </button>
    </div>
    <p v-if="hint" class="field__hint">{{ hint }}</p>
  </fieldset>
</template>

<style scoped>
.field {
  border: 0;
  padding: 0;
  margin: 0;
}
.field__label {
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  margin-bottom: 10px;
}
.field__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.field__options .chip:disabled[aria-pressed='true'] {
  opacity: 0.8;
}
.field__hint {
  font-size: 12.5px;
  color: var(--text-faint);
  margin: 8px 0 0;
}
</style>
