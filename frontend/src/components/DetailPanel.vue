<script setup lang="ts">
import LineIcon from './LineIcon.vue';
import { computed } from 'vue';
import EChart from './EChart.vue';
import { alpha, baseOption, COLORS, GROUP_ACCENTS, GROUP_COLORS, YOU_COLOR } from '../charts/theme';
import { useExplorer } from '../composables/useExplorer';
import { ATTRIBUTES, valueLabel } from '../content/attributes';
import { GROUPS } from '../engine';
import { compare, heightLabel, percent, scalePosition, standouts } from '../insights';

const { analysis, profiles, selection, answers, charts, settings } = useExplorer();

const youGroup = computed(() => analysis.value.group[analysis.value.group.length - 1]);

/** Profiles shown in the panel: the brushed area, or your group when nothing is selected */
const members = computed(() => {
  const s = selection.value;
  if (s?.type === 'group') return s.indices;
  return profiles.map((_, i) => i).filter((i) => analysis.value.group[i] === youGroup.value);
});

const groupStats = computed(() => {
  const indices = members.value;
  const { group, match } = analysis.value;
  const composition = Array.from({ length: GROUPS }, (_, g) => indices.filter((i) => group[i] === g).length);
  const matches = indices.filter((i) => match[i]).length;
  const ages = indices.map((i) => Number(profiles[i].age));
  return {
    size: indices.length,
    composition,
    matchShare: indices.length ? matches / indices.length : 0,
    meanAge: ages.length ? ages.reduce((a, b) => a + b, 0) / ages.length : 0,
    women: indices.length ? indices.filter((i) => profiles[i].sex === 'f').length / indices.length : 0,
    standouts: standouts(indices.map((i) => profiles[i]), profiles),
  };
});

const person = computed(() => (selection.value?.type === 'person' ? selection.value.index : null));
const personRow = computed(() => (person.value === null ? null : profiles[person.value]));
const radarKeys = computed(() => (charts.value.length >= 3 ? charts.value : Object.keys(ATTRIBUTES).slice(0, 8)) as (keyof typeof ATTRIBUTES)[]);

const radarOption = computed(() => {
  const row = personRow.value;
  if (!row) return {};
  const keys = radarKeys.value;
  return {
    ...baseOption,
    legend: { bottom: 0, icon: 'circle', itemWidth: 9, textStyle: { color: COLORS.dim, fontSize: 11.5 } },
    tooltip: { ...baseOption.tooltip, trigger: 'item' },
    radar: {
      radius: '62%',
      center: ['50%', '46%'],
      indicator: keys.map((key) => ({ name: ATTRIBUTES[key].label, max: 1, min: 0 })),
      axisName: { color: COLORS.dim, fontSize: 11 },
      splitLine: { lineStyle: { color: COLORS.line } },
      splitArea: { areaStyle: { color: ['transparent'] } },
      axisLine: { lineStyle: { color: COLORS.line } },
    },
    series: [
      {
        type: 'radar',
        symbolSize: 5,
        // You last, so your shape is drawn on top
        data: [
          {
            name: 'Them',
            value: keys.map((key) => scalePosition(key, row[key])),
            itemStyle: { color: GROUP_COLORS[analysis.value.group[person.value!]] },
            areaStyle: { color: alpha(GROUP_COLORS[analysis.value.group[person.value!]], 0.14) },
          },
          {
            name: 'You',
            value: keys.map((key) => scalePosition(key, answers.categorical[key])),
            itemStyle: { color: YOU_COLOR },
            areaStyle: { color: alpha(YOU_COLOR, 0.18) },
            lineStyle: { width: 2 },
          },
        ],
      },
    ],
  };
});

const comparison = computed(() => (personRow.value ? compare(answers, personRow.value) : []));

/** The five people in the panel closest to you (or most opposite, in that mode); a keyboard path to people */
const closest = computed(() => {
  const { score } = analysis.value;
  return [...members.value].sort((a, b) => score[b] - score[a]).slice(0, 5);
});
const describe = (i: number) =>
  `${profiles[i].age}, ${valueLabel(profiles[i].sex).toLowerCase()}, ${valueLabel(profiles[i].job).toLowerCase()}`;

const radarLabel = computed(
  () =>
    `Radar chart comparing your answers with this person's on ${radarKeys.value.map((k) => ATTRIBUTES[k].label.toLowerCase()).join(', ')}.`,
);
const sameCount = computed(() => comparison.value.filter((c) => c.same).length);
</script>

<template>
  <aside class="detail panel" aria-live="polite">
    <!-- A person -->
    <template v-if="personRow && person !== null">
      <div class="detail__head">
        <div>
          <p class="meta" :data-accent="GROUP_ACCENTS[analysis.group[person]]">
            Group {{ analysis.group[person] + 1 }} · profile #{{ personRow.index }}
          </p>
          <h3 class="detail__title">
            {{ personRow.age }}, {{ valueLabel(personRow.sex).toLowerCase() }}, {{ valueLabel(personRow.job).toLowerCase() }}
          </h3>
        </div>
        <button type="button" class="detail__close" aria-label="Close" @click="selection = null"><LineIcon name="close" /></button>
      </div>
      <div class="detail__score">
        <span class="detail__big num">{{ percent(analysis.score[person]) }}</span>
        <span class="dim">{{ settings.mode === 'similar' ? 'similar to you' : 'opposite of you' }} · {{ sameCount }} of {{ comparison.length }} answers alike</span>
      </div>
      <EChart :option="radarOption" height="280px" :label="radarLabel" />
      <div class="detail__compare" tabindex="0" role="region" aria-label="Your answers and theirs">
        <table>
          <thead>
            <tr>
              <th scope="col"><span class="sr-only">Question</span></th>
              <th scope="col">You</th>
              <th scope="col">Them</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Height</th>
              <td>{{ heightLabel(answers.height) }}</td>
              <td>{{ heightLabel(Number(personRow.height)) }}</td>
            </tr>
            <tr v-for="c in comparison" :key="c.key" :class="{ same: c.same }">
              <th scope="row">{{ c.label }}</th>
              <td>{{ c.you }}</td>
              <td>{{ c.them }}<span v-if="c.same" class="sr-only"> (same)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- A group: the brushed area, or your own group -->
    <template v-else>
      <div class="detail__head">
        <div>
          <p class="meta" :data-accent="selection ? 'violet' : GROUP_ACCENTS[youGroup]">
            {{ selection ? 'Your selection' : `Your group · Group ${youGroup + 1}` }}
          </p>
          <h3 class="detail__title">
            {{ groupStats.size }} people
            <span class="dim">· {{ percent(groupStats.matchShare) }} pass your threshold</span>
          </h3>
        </div>
        <button v-if="selection" type="button" class="detail__close" aria-label="Clear selection" @click="selection = null">
          <LineIcon name="close" />
        </button>
      </div>

      <div class="detail__facts">
        <div><span class="num">{{ groupStats.meanAge.toFixed(1) }}</span><small>average age</small></div>
        <div><span class="num">{{ percent(groupStats.women) }}</span><small>women</small></div>
      </div>

      <p class="detail__label">Groups in here</p>
      <div class="detail__bar" role="img" :aria-label="groupStats.composition.map((n, g) => `group ${g + 1}: ${n}`).join(', ')">
        <span
          v-for="(n, g) in groupStats.composition"
          v-show="n"
          :key="g"
          :style="{ flexGrow: n, background: GROUP_COLORS[g] }"
          :title="`Group ${g + 1}: ${n}`"
        ></span>
      </div>

      <p id="closest-label" class="detail__label">{{ settings.mode === 'similar' ? 'Closest to you' : 'Most opposite to you' }}</p>
      <ul class="detail__people" aria-labelledby="closest-label">
        <li v-for="i in closest" :key="i">
          <button type="button" @click="selection = { type: 'person', index: i }">
            <span>{{ describe(i) }}</span>
            <span class="num" :style="{ color: GROUP_COLORS[analysis.group[i]] }">{{ percent(analysis.score[i]) }}</span>
          </button>
        </li>
      </ul>

      <p class="detail__label">What stands out</p>
      <ul class="detail__standouts">
        <li v-for="s in groupStats.standouts" :key="s.label">
          <span>{{ s.label }}</span>
          <span class="num dim">{{ percent(s.share) }} · {{ s.lift.toFixed(1) }}×</span>
        </li>
        <li v-if="!groupStats.standouts.length" class="dim">Select at least a few people to compare.</li>
      </ul>
      <p class="detail__tip">
        <template v-if="!selection">Click a dot to compare yourself with one person, or select an area on the map.</template>
        <template v-else>“2.5×” means the value is 2.5 times as common here as among all profiles.</template>
      </p>
    </template>
  </aside>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.detail__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.detail__head .meta {
  margin-bottom: 6px;
}
.detail__title {
  font-size: 20px;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
  line-height: 1.25;
}
.detail__title .dim {
  font-size: 14px;
  font-weight: 400;
}
.detail__close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--text-dim);
  cursor: pointer;
}
.detail__close svg {
  width: 15px;
  height: 15px;
}
.detail__close:hover {
  color: var(--text);
  border-color: var(--line-strong);
}
.detail__score {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 13px;
}
.detail__big {
  font-size: 30px;
  font-weight: 600;
  color: var(--pink);
}
.detail__compare {
  margin: 8px 0 0;
  max-height: 260px;
  overflow-y: auto;
  border-radius: 4px;
}
.detail__compare table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12.5px;
}
.detail__compare th,
.detail__compare td {
  padding: 6px 8px 6px 0;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
  font-weight: 400;
  color: var(--text-dim);
}
.detail__compare tbody th {
  color: var(--text-faint);
}
.detail__compare thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-faint);
}
.detail__compare tr.same td {
  color: var(--text);
  font-weight: 500;
}
.detail__people {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
}
.detail__people button {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  min-height: 40px;
  padding: 8px 10px;
  margin: 0 -10px;
  width: calc(100% + 20px);
  border: 0;
  border-bottom: 1px solid var(--line);
  border-radius: 6px;
  background: transparent;
  font-size: 13.5px;
  text-align: left;
  cursor: pointer;
  transition: background var(--dur) var(--ease);
}
.detail__people button:hover {
  background: var(--panel-strong);
}
.detail__people .num {
  font-weight: 600;
  white-space: nowrap;
}
.detail__facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}
.detail__facts div {
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
}
.detail__facts .num {
  font-size: 22px;
  font-weight: 600;
}
.detail__facts small {
  color: var(--text-dim);
  font-size: 12px;
}
.detail__label {
  font-size: 11.5px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 8px;
}
.detail__bar {
  display: flex;
  height: 10px;
  border-radius: 99px;
  overflow: hidden;
  gap: 2px;
  margin-bottom: 20px;
}
.detail__standouts {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13.5px;
}
.detail__standouts li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--line);
}
.detail__standouts .num {
  font-size: 12px;
  white-space: nowrap;
}
.detail__tip {
  margin: auto 0 0;
  padding-top: 18px;
  font-size: 12.5px;
  color: var(--text-faint);
}
</style>
