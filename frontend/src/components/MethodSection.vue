<script setup lang="ts">
import { FEATURES } from '../engine';

const steps = [
  {
    n: '01',
    title: 'Encode',
    accent: 'pink',
    text: `Your answers and every profile become ${FEATURES.length} numbers: age and height are standardised, every other answer gets a code, languages and ethnicities become yes/no flags.`,
    formula: 'x = (value − mean) / std',
  },
  {
    n: '02',
    title: 'Compare',
    accent: 'blue',
    text: 'The cosine similarity measures how closely each profile points in the same direction as you. In “opposites attract” mode, it is turned around.',
    formula: 'sim = a·b / (‖a‖ ‖b‖)',
  },
  {
    n: '03',
    title: 'Project',
    accent: 'violet',
    text: 'A principal component analysis squeezes all attributes, plus whether a profile passes your threshold, into four axes. The map shows the first two.',
    formula: 'PCA → 4 components',
  },
  {
    n: '04',
    title: 'Group',
    accent: 'green',
    text: 'k-means splits everyone, you included, into four groups of people who sit close together on those axes. It restarts ten times and keeps the tightest result.',
    formula: 'k-means · k = 4',
  },
];
</script>

<template>
  <section id="method" class="section method">
    <div class="container">
      <p class="kicker reveal" data-accent="blue">// how it works</p>
      <h2 class="section-title reveal">Four steps, all in your browser</h2>
      <p class="section-lead reveal">
        The same analysis the 2022 Flask backend ran, now in TypeScript. Tests check it against the original Python code:
        encoding and matches are identical, the projection agrees to six decimals.
      </p>
      <p class="method__note reveal">
        <span class="mono">note</span> Because answers are coded as consecutive numbers, attributes with many values
        weigh most: the map's first axis is essentially the job, the second the zodiac sign. That is how the 2022
        analysis worked, and it is kept here on purpose.
      </p>
      <div class="method__grid">
        <article
          v-for="(s, i) in steps"
          :key="s.n"
          class="step panel reveal"
          :data-accent="s.accent"
          :style="{ transitionDelay: 0.07 * i + 's' }"
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
.method__note {
  font-size: 14px;
  color: var(--text-dim);
  max-width: 760px;
  margin: -24px 0 36px;
  padding: 12px 16px;
  border-left: 2px solid var(--amber);
  background: rgba(255, 192, 110, 0.05);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
.method__note .mono {
  color: var(--amber);
  font-size: 12px;
  margin-right: 6px;
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
  overflow: hidden;
  transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.step::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: var(--accent);
  opacity: 0.7;
}
.step:hover {
  border-color: var(--line-strong);
  transform: translateY(-3px);
}
.step__n {
  color: var(--accent);
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
  color: var(--accent);
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
