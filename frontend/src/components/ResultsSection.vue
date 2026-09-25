<script setup lang="ts">
import { computed } from 'vue';
import AgeChart from './AgeChart.vue';
import AttributeChart from './AttributeChart.vue';
import DetailPanel from './DetailPanel.vue';
import ScatterMap from './ScatterMap.vue';
import { GROUP_ACCENTS } from '../charts/echarts';
import { useExplorer } from '../composables/useExplorer';
import { ATTRIBUTES, MAX_CHARTS, valueLabel } from '../content/attributes';
import { CATEGORICAL } from '../engine';
import { percent } from '../insights';

const { analysis, profiles, settings, charts, filter, selection, toggleChart } = useExplorer();

const matches = computed(() => analysis.value.match.filter(Boolean).length);
const youGroup = computed(() => analysis.value.group[analysis.value.group.length - 1]);
const groupSize = computed(() => analysis.value.group.slice(0, -1).filter((g) => g === youGroup.value).length);
const best = computed(() => {
  const { score } = analysis.value;
  return score.reduce((b, s, i) => (s > score[b] ? i : b), 0);
});
const fill = computed(() => `${settings.threshold * 100}%`);

const kpis = computed(() => [
  {
    value: matches.value.toLocaleString('en-US'),
    label: `profiles at ${percent(settings.threshold)} or more ${settings.mode === 'similar' ? 'similarity' : 'opposition'}`,
    accent: 'pink',
  },
  { value: percent(matches.value / profiles.length, 1), label: 'of everyone', accent: 'blue' },
  { value: `Group ${youGroup.value + 1}`, label: `your group · ${groupSize.value} people`, accent: GROUP_ACCENTS[youGroup.value] },
  {
    value: percent(analysis.value.score[best.value]),
    label: `${settings.mode === 'similar' ? 'your closest match' : 'your strongest opposite'}, click to see`,
    accent: 'green',
    action: true,
  },
]);

function showBest() {
  selection.value = { type: 'person', index: best.value };
  document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <section id="results" class="section results">
    <div class="container">
      <p class="kicker reveal" data-accent="pink">// your results</p>
      <h2 class="section-title reveal">Here is where you land</h2>

      <div class="controls panel reveal" data-accent="pink">
        <div class="controls__item">
          <span class="controls__label mono">mode</span>
          <div class="segmented" role="group" aria-label="Mode">
            <button type="button" :aria-pressed="settings.mode === 'similar'" @click="settings.mode = 'similar'">♥ similar to me</button>
            <button type="button" :aria-pressed="settings.mode === 'opposite'" @click="settings.mode = 'opposite'">⇄ opposites attract</button>
          </div>
        </div>
        <label class="controls__item controls__item--grow">
          <span class="controls__label mono">threshold · {{ percent(settings.threshold) }}</span>
          <input v-model.number="settings.threshold" type="range" min="0" max="1" step="0.01" :style="{ '--fill': fill }" />
        </label>
        <a href="#explore" class="btn btn--small">✎ Edit answers</a>
      </div>

      <div class="kpis reveal">
        <component
          :is="kpi.action ? 'button' : 'div'"
          v-for="kpi in kpis"
          :key="kpi.label"
          class="kpi"
          :class="{ 'kpi--action': kpi.action }"
          :data-accent="kpi.accent"
          :type="kpi.action ? 'button' : undefined"
          @click="kpi.action && showBest()"
        >
          <span class="kpi__value mono">{{ kpi.value }}</span>
          <span class="kpi__label">{{ kpi.label }}</span>
        </component>
      </div>

      <div id="map" class="grid reveal">
        <ScatterMap />
        <DetailPanel />
      </div>

      <div class="dist">
        <div class="dist__head reveal">
          <div>
            <h3 class="dist__title">How your matches compare</h3>
            <p class="panel__hint">
              Pick up to {{ MAX_CHARTS }} attributes. Grey bars show all profiles, blue bars your matches, pink is your
              answer. Click a bar to filter the map.
            </p>
          </div>
          <button v-if="filter" type="button" class="chip" aria-pressed="true" data-accent="amber" @click="filter = null">
            {{ ATTRIBUTES[filter.key].label }}: {{ valueLabel(filter.value) }} ×
          </button>
        </div>
        <div class="dist__picker reveal">
          <button
            v-for="key in CATEGORICAL"
            :key="key"
            type="button"
            class="chip"
            data-accent="blue"
            :aria-pressed="charts.includes(key)"
            :disabled="!charts.includes(key) && charts.length >= MAX_CHARTS"
            @click="toggleChart(key)"
          >
            {{ ATTRIBUTES[key].label }}
          </button>
        </div>
        <div class="dist__grid">
          <AgeChart class="dist__wide" />
          <TransitionGroup name="fade">
            <AttributeChart v-for="key in charts" :key="key" :attribute="key" />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.results {
  border-top: 1px solid var(--line);
  background: radial-gradient(900px circle at 50% 0%, rgba(255, 143, 199, 0.05), transparent 60%);
}
.controls {
  display: flex;
  align-items: center;
  gap: 24px 32px;
  flex-wrap: wrap;
  padding: 16px 20px;
  margin-bottom: 16px;
}
.controls__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.controls__item--grow {
  flex: 1;
  min-width: 220px;
}
.controls__label {
  font-size: 11.5px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 16px;
}
.kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 22px;
  border: 0;
  border-left: 1px solid var(--line);
  background: var(--panel);
  text-align: left;
}
.kpi:first-child {
  border-left: 0;
}
.kpi--action {
  cursor: pointer;
  transition: background var(--dur) var(--ease);
}
.kpi--action:hover {
  background: var(--panel-strong);
}
.kpi__value {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -0.02em;
}
.kpi__label {
  font-size: 12.5px;
  color: var(--text-dim);
}
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  scroll-margin-top: calc(var(--nav-h) + 16px);
}
.dist {
  margin-top: clamp(48px, 7vw, 80px);
}
.dist__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}
.dist__title {
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}
.dist__picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.dist__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.dist__wide {
  grid-column: 1 / -1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .dist__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }
  .kpi:nth-child(3) {
    border-left: 0;
  }
  .kpi:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }
  .dist__grid {
    grid-template-columns: 1fr;
  }
}
</style>
