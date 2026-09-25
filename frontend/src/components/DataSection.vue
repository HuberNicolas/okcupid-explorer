<script setup lang="ts">
import { DATASET, PAPER } from '../links';
</script>

<template>
  <section id="data" class="section data">
    <div class="container data__inner">
      <div>
        <p class="kicker reveal" data-accent="amber">// the data</p>
        <h2 class="section-title reveal">Real people, handled with care</h2>
        <p class="data__text reveal">
          The profiles come from a dataset that OkCupid allowed to be published for teaching: 59,946 users within 25 miles
          of San Francisco, collected by Albert Y. Kim and Adriana Escobedo-Land. The 2021 revision removed locations and
          dates and added noise to the ages. This app uses the 842 profiles that answered every question it asks.
        </p>
        <p class="data__text reveal">
          The profiles include sensitive attributes such as ethnicity, religion, sexual orientation and drug use. Use them
          to explore patterns, not to identify anyone.
        </p>
        <div class="data__links reveal">
          <a class="btn btn--small" :href="DATASET" target="_blank" rel="noopener">Dataset on GitHub ↗</a>
          <a class="btn btn--small" :href="PAPER" target="_blank" rel="noopener">Paper (JSE, 2015) ↗</a>
        </div>
      </div>
      <ul class="data__facts reveal">
        <li data-accent="amber"><span class="mono">59,946</span>profiles in the original dataset</li>
        <li data-accent="pink"><span class="mono">842</span>complete profiles used here</li>
        <li data-accent="blue"><span class="mono">0</span>answers of yours sent anywhere</li>
      </ul>
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
.data__facts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.data__facts li {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  color: var(--text-dim);
  font-size: 14px;
}
.data__facts .mono {
  font-size: 26px;
  font-weight: 600;
  color: var(--accent);
  min-width: 96px;
}
@media (max-width: 860px) {
  .data__inner {
    grid-template-columns: 1fr;
  }
}
</style>
