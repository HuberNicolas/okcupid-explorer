<script setup lang="ts">
import LineIcon from './LineIcon.vue';
import { profiles } from '../data/profiles';
import { DATASET, PAPER } from '../links';

const ORIGINAL_COUNT = 59946;
const share = profiles.length / ORIGINAL_COUNT;
const format = (n: number) => n.toLocaleString('en-US');
</script>

<template>
  <section id="data" class="section data">
    <div class="container data__inner">
      <div>
        <h2 class="section-title">Where the 842 come from</h2>
        <p class="data__text">
          The profiles come from a dataset that OkCupid allowed to be published for teaching: 59,946 users within 25 miles
          of San Francisco, collected by Albert Y. Kim and Adriana Escobedo-Land. The 2021 revision removed locations and
          dates and added noise to the ages. This app uses the 842 profiles that answered every question it asks.
        </p>
        <p class="data__text">
          The profiles include sensitive attributes such as ethnicity, religion, sexual orientation and drug use. Use them
          to explore patterns, not to identify anyone.
        </p>
        <div class="data__links">
          <a class="btn btn--small" :href="DATASET" target="_blank" rel="noopener">Dataset on GitHub<LineIcon name="external" /></a>
          <a class="btn btn--small" :href="PAPER" target="_blank" rel="noopener">Paper (JSE, 2015)<LineIcon name="external" /></a>
        </div>
      </div>
      <!-- Bars to scale: the 842 are 1.4% of the original dataset -->
      <figure class="funnel" :aria-label="`${format(ORIGINAL_COUNT)} profiles in the dataset, ${format(profiles.length)} of them complete`">
        <div class="funnel__row">
          <span class="funnel__num num">{{ format(ORIGINAL_COUNT) }}</span>
          <span class="funnel__track"><span class="funnel__bar" style="width: 100%"></span></span>
          <span class="funnel__label">profiles in the dataset, all within 25 miles of San Francisco</span>
        </div>
        <div class="funnel__row">
          <span class="funnel__num num">{{ format(profiles.length) }}</span>
          <span class="funnel__track"><span class="funnel__bar funnel__bar--kept" :style="{ width: `${share * 100}%` }"></span></span>
          <span class="funnel__label">answered every question this app asks: {{ (share * 100).toFixed(1) }}% of them</span>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.data {
  border-top: 1px solid var(--line);
}
.data__inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(32px, 6vw, 72px);
  align-items: center;
}
.data__text {
  color: var(--text-dim);
  margin: 0 0 16px;
  max-width: 620px;
}
.data__links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 24px;
}
.funnel {
  margin: 0;
  display: grid;
  gap: 28px;
}
.funnel__row {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  align-items: center;
  column-gap: 16px;
  row-gap: 6px;
}
.funnel__num {
  font-size: 26px;
  font-weight: 600;
}
.funnel__track {
  height: 8px;
  border-radius: 99px;
  background: var(--panel-strong);
  overflow: hidden;
}
.funnel__bar {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: var(--line-strong);
}
.funnel__bar--kept {
  min-width: 4px;
  background: var(--text);
}
.funnel__label {
  grid-column: 2;
  font-size: 13.5px;
  color: var(--text-dim);
}
@media (max-width: 860px) {
  .data__inner {
    grid-template-columns: 1fr;
  }
}
</style>
