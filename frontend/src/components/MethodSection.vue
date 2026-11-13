<script setup lang="ts">
import { FEATURES } from '../engine';

const steps = [
  {
    n: '01',
    title: 'Encode',
    text: `Your answers and every profile become ${FEATURES.length} numbers: age and height are standardised, every other answer gets a code, languages and ethnicities become yes/no flags.`,
    formula: 'x = (value − mean) / std',
  },
  {
    n: '02',
    title: 'Compare',
    text: 'The cosine similarity measures how closely each profile points in the same direction as you. In “opposites attract” mode, it is turned around.',
    formula: 'sim = a·b / (‖a‖ ‖b‖)',
  },
  {
    n: '03',
    title: 'Project',
    text: 'A principal component analysis squeezes all attributes, plus whether a profile passes your threshold, into four axes. The map shows the first two.',
    formula: 'PCA → 4 components',
  },
  {
    n: '04',
    title: 'Group',
    text: 'k-means splits everyone, you included, into four groups of people who sit close together on those axes. It restarts ten times and keeps the tightest result.',
    formula: 'k-means · k = 4',
  },
];
</script>

<template>
  <section id="method" class="section method">
    <div class="container">
      <h2 class="section-title">Four steps</h2>
      <p class="section-lead">
        The same analysis the 2022 Flask backend ran, now in TypeScript. Tests check it against the original Python code:
        encoding and matches are identical, the projection agrees to six decimals.
      </p>
      <div class="method__grid">
        <article
          v-for="s in steps"
          :key="s.n"
          class="step panel"
        >
          <span class="step__n mono">{{ s.n }}</span>
          <h3 class="step__title">{{ s.title }}</h3>
          <p class="step__text">{{ s.text }}</p>
          <code class="step__formula">{{ s.formula }}</code>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.method {
  border-top: 1px solid var(--line);
}
.method__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.step {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}
.step__n {
  color: var(--text-faint);
  font-size: 13px;
}
.step__title {
  font-size: 20px;
  margin: 0;
}
.step__text {
  color: var(--text-dim);
  font-size: 14.5px;
  margin: 0;
  flex: 1;
}
.step__formula {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-dim);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 6px 10px;
  align-self: flex-start;
}
@media (max-width: 960px) {
  .method__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .method__grid {
    grid-template-columns: 1fr;
  }
}
</style>
