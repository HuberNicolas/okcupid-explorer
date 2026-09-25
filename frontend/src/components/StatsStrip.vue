<script setup lang="ts">
import { FEATURES } from '../engine';

const stats = [
  { value: '842', label: 'real OkCupid profiles', accent: 'pink' },
  { value: String(FEATURES.length), label: 'attributes compared', accent: 'blue' },
  { value: '4', label: 'groups found by k-means', accent: 'violet' },
  { value: '0', label: 'servers, it all runs in your browser', accent: 'green' },
];
</script>

<template>
  <section class="stats">
    <div class="container stats__grid">
      <div
        v-for="(s, i) in stats"
        :key="s.label"
        class="stat reveal"
        :data-accent="s.accent"
        :style="{ transitionDelay: 0.06 * i + 's' }"
      >
        <span class="stat__value">{{ s.value }}</span>
        <span class="stat__label">{{ s.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.015), transparent);
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.stat {
  padding: 34px 26px;
  border-left: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.stat:first-child {
  border-left: 0;
}
.stat__value {
  font-family: var(--font-mono);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -0.02em;
}
.stat__label {
  font-size: 13.5px;
  color: var(--text-dim);
  line-height: 1.4;
}
@media (max-width: 760px) {
  .stats__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat:nth-child(3) {
    border-left: 0;
  }
  .stat:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }
}
</style>
