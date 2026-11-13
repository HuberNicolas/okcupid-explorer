<script setup lang="ts">
import LineIcon from './LineIcon.vue';
import { computed, ref } from 'vue';
import AgeChart from './AgeChart.vue';
import AttributeChart from './AttributeChart.vue';
import DetailPanel from './DetailPanel.vue';
import ScatterMap from './ScatterMap.vue';
import { GROUP_COLORS } from '../charts/theme';
import { useExplorer } from '../composables/useExplorer';
import { ATTRIBUTES, isWide, MAX_CHARTS, valueLabel } from '../content/attributes';
import { CATEGORICAL } from '../engine';
import { percent } from '../insights';

const { analysis, profiles, settings, charts, filter, selection, groups, toggleChart } = useExplorer();

const matches = computed(() => analysis.value.match.filter(Boolean).length);
const youGroup = computed(() => analysis.value.group[analysis.value.group.length - 1]);
const best = computed(() => {
  const { score } = analysis.value;
  return score.reduce((b, s, i) => (s > score[b] ? i : b), 0);
});
const fill = computed(() => `${settings.threshold * 100}%`);

const kpis = computed(() => [
  {
    value: matches.value.toLocaleString('en-US'),
    label: `profiles at ${percent(settings.threshold)} or more ${settings.mode === 'similar' ? 'similarity' : 'opposition'} · ${percent(matches.value / profiles.length)} of everyone`,
    accent: 'pink',
  },
  {
    value: `Group ${youGroup.value + 1}`,
    label: `your group · ${groups.value[youGroup.value].size} people · ${groups.value[youGroup.value].summary}`,
    dot: GROUP_COLORS[youGroup.value],
  },
  {
    value: percent(analysis.value.score[best.value]),
    label: `${settings.mode === 'similar' ? 'your closest match' : 'your strongest opposite'}, click to see`,
    dot: GROUP_COLORS[analysis.value.group[best.value]],
    action: true,
  },
]);

// Normal charts first, full-width ones after them. The last normal chart stretches to close its row,
// in the three-column and in the two-column layout.
const orderedCharts = computed(() => [...charts.value.filter((k) => !isWide(k)), ...charts.value.filter(isWide)]);
const lastNormal = computed(() => {
  const count = charts.value.filter((k) => !isWide(k)).length;
  if (!count) return { key: undefined, classes: {} };
  const key = orderedCharts.value[count - 1];
  return { key, classes: { 'fill-3-2': count % 3 === 2, 'fill-3-3': count % 3 === 1, 'fill-2-2': count % 2 === 1 } };
});

// The picker shows the chosen attributes; the others open on demand, so 20 chips do not compete at once
const pickerOpen = ref(false);
const pickerKeys = computed(() => (pickerOpen.value ? CATEGORICAL : CATEGORICAL.filter((key) => charts.value.includes(key))));

function showBest() {
  selection.value = { type: 'person', index: best.value };
  document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <section id="results" class="section results">
    <div class="container">
      <h2 class="section-title">Here is where you land</h2>

      <div class="controls panel" data-accent="pink">
        <div class="controls__item">
          <span class="controls__label">mode</span>
          <div class="segmented" role="group" aria-label="Mode">
            <button type="button" :aria-pressed="settings.mode === 'similar'" @click="settings.mode = 'similar'"><LineIcon name="heart" />similar to me</button>
            <button type="button" :aria-pressed="settings.mode === 'opposite'" @click="settings.mode = 'opposite'"><LineIcon name="swap" />opposites attract</button>
          </div>
        </div>
        <label class="controls__item controls__item--grow">
          <span class="controls__label">threshold · {{ percent(settings.threshold) }}</span>
          <input v-model.number="settings.threshold" type="range" min="0" max="1" step="0.01" :style="{ '--fill': fill }" />
        </label>
        <a href="#explore" class="btn btn--small">
          <LineIcon name="edit" />
          Edit answers
        </a>
      </div>

      <div class="kpis">
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
          <span class="kpi__value num">
            <span v-if="kpi.dot" class="kpi__dot" :style="{ background: kpi.dot }" aria-hidden="true"></span>{{ kpi.value }}
          </span>
          <span class="kpi__label">{{ kpi.label }}</span>
        </component>
      </div>

      <div id="map" class="grid">
        <ScatterMap />
        <DetailPanel />
      </div>

      <div class="dist">
        <div class="dist__head">
          <div>
            <h3 class="dist__title">How your matches compare</h3>
            <p class="panel__hint">
              Grey bars show all profiles, white bars your matches, pink is your answer. Click a bar to filter the
              map.
            </p>
          </div>
          <button v-if="filter" type="button" class="chip" aria-pressed="true" @click="filter = null">
            {{ ATTRIBUTES[filter.key].label }}: {{ valueLabel(filter.value) }}
            <LineIcon name="close" />
          </button>
        </div>
        <div id="dist-picker" class="dist__picker" role="group" aria-label="Attributes shown as charts">
          <button
            v-for="key in pickerKeys"
            :key="key"
            type="button"
            class="chip"
            :aria-pressed="charts.includes(key)"
            :disabled="!charts.includes(key) && charts.length >= MAX_CHARTS"
            @click="toggleChart(key)"
          >
            {{ ATTRIBUTES[key].label }}
          </button>
          <button
            type="button"
            class="chip dist__more"
            :aria-expanded="pickerOpen"
            aria-controls="dist-picker"
            @click="pickerOpen = !pickerOpen"
          >
            <LineIcon :name="pickerOpen ? 'close' : 'plus'" />
            {{ pickerOpen ? 'Done' : `Add attribute (up to ${MAX_CHARTS})` }}
          </button>
        </div>
        <div class="dist__grid">
          <AgeChart class="dist__wide" />
          <TransitionGroup name="fade">
            <AttributeChart
              v-for="key in orderedCharts"
              :key="key"
              :attribute="key"
              :class="key === lastNormal.key ? lastNormal.classes : undefined"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.results {
  border-top: 1px solid var(--line);
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
  grid-template-columns: repeat(3, 1fr);
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
.kpi__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: 0.15em;
}
.kpi__value {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 600;
  color: var(--accent, var(--text));
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
.dist__more {
  border-style: dashed;
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
/* Stretch the last chart so its row has no empty cell (see lastNormal) */
.dist__grid .fill-3-2 {
  grid-column: span 2;
}
.dist__grid .fill-3-3 {
  grid-column: 1 / -1;
}
@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .dist__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dist__grid .fill-3-2,
  .dist__grid .fill-3-3 {
    grid-column: auto;
  }
  .dist__grid .fill-2-2 {
    grid-column: 1 / -1;
  }
}
@media (max-width: 640px) {
  .kpis {
    grid-template-columns: 1fr;
  }
  .kpi {
    border-left: 0;
  }
  .kpi + .kpi {
    border-top: 1px solid var(--line);
  }
  .dist__grid {
    grid-template-columns: 1fr;
  }
}
</style>
