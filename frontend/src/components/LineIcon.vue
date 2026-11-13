<script setup lang="ts">
// The app's line icons: 24px grid, 2px stroke, round caps. Decorative, so hidden from screen readers;
// the control around an icon carries the name.
defineProps<{
  name: 'arrow-right' | 'arrow-left' | 'close' | 'dice' | 'edit' | 'heart' | 'select' | 'swap';
}>();
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-if="name === 'arrow-right'" d="M5 12h14M13 6l6 6-6 6" />
    <path v-else-if="name === 'arrow-left'" d="M19 12H5M11 6l-6 6 6 6" />
    <path v-else-if="name === 'close'" d="M6 6l12 12M18 6 6 18" />
    <template v-else-if="name === 'dice'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <circle cx="9" cy="15" r="1" fill="currentColor" />
      <circle cx="15" cy="15" r="1" fill="currentColor" />
    </template>
    <template v-else-if="name === 'edit'">
      <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
      <path d="m13 7 4 4" />
    </template>
    <path
      v-else-if="name === 'heart'"
      d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
      fill="currentColor"
    />
    <rect v-else-if="name === 'select'" x="4" y="4" width="16" height="16" rx="2" stroke-dasharray="3 3" />
    <path v-else-if="name === 'swap'" d="M4 8h14l-3-3M20 16H6l3 3" />
  </svg>
</template>
