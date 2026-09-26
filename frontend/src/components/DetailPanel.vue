<script setup lang="ts">
import { computed } from 'vue';
import EChart from './EChart.vue';
import { baseOption, COLORS, GROUP_ACCENTS, GROUP_COLORS, YOU_COLOR } from '../charts/echarts';
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
            areaStyle: { color: 'rgba(110,181,255,0.14)' },
          },
          {
            name: 'You',
            value: keys.map((key) => scalePosition(key, answers.categorical[key])),
            itemStyle: { color: YOU_COLOR },
            areaStyle: { color: 'rgba(255,143,199,0.18)' },
            lineStyle: { width: 2 },
          },
        ],
      },
    ],
  };
});

const comparison = computed(() => (personRow.value ? compare(answers, personRow.value) : []));
const sameCount = computed(() => comparison.value.filter((c) => c.same).length);
</script>

<template>
  <aside class="detail panel" aria-live="polite">
    <!-- A person -->
    <template v-if="personRow && person !== null">
      <div class="detail__head">
        <div>
          <p class="kicker" :data-accent="GROUP_ACCENTS[analysis.group[person]]">
            // group {{ analysis.group[person] + 1 }} · profile #{{ personRow.index }}
          </p>
          <h3 class="detail__title">
            {{ personRow.age }}, {{ valueLabel(personRow.sex).toLowerCase() }}, {{ valueLabel(personRow.job).toLowerCase() }}
          </h3>
        </div>
        <button type="button" class="detail__close" aria-label="Close" @click="selection = null">×</button>
      </div>
      <div class="detail__score">
        <span class="detail__big mono">{{ percent(analysis.score[person]) }}</span>
        <span class="dim">{{ settings.mode === 'similar' ? 'similar to you' : 'opposite of you' }} · {{ sameCount }} of {{ comparison.length }} answers alike</span>
      </div>
      <EChart :option="radarOption" height="280px" />
      <ul class="detail__compare">
        <li class="detail__compare-head mono"><span></span><span>you</span><span>them</span></li>
        <li><span>Height</span><span>{{ heightLabel(answers.height) }}</span><span>{{ heightLabel(Number(personRow.height)) }}</span></li>
        <li v-for="c in comparison" :key="c.key" :class="{ same: c.same }">
          <span>{{ c.label }}</span><span>{{ c.you }}</span><span>{{ c.them }}</span>
        </li>
      </ul>
    </template>

    <!-- A group: the brushed area, or your own group -->
    <template v-else>
      <div class="detail__head">
        <div>
          <p class="kicker" :data-accent="selection ? 'violet' : GROUP_ACCENTS[youGroup]">
            {{ selection ? '// your selection' : `// your group · group ${youGroup + 1}` }}
          </p>
          <h3 class="detail__title">
            {{ groupStats.size }} people
            <span class="dim">· {{ percent(groupStats.matchShare) }} pass your threshold</span>
          </h3>
        </div>
        <button v-if="selection" type="button" class="detail__close" aria-label="Clear selection" @click="selection = null">×</button>
      </div>

      <div class="detail__facts">
        <div><span class="mono">{{ groupStats.meanAge.toFixed(1) }}</span><small>average age</small></div>
        <div><span class="mono">{{ percent(groupStats.women) }}</span><small>women</small></div>
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

      <p class="detail__label">What stands out</p>
      <ul class="detail__standouts">
        <li v-for="s in groupStats.standouts" :key="s.label">
          <span>{{ s.label }}</span>
          <span class="mono dim">{{ percent(s.share) }} · {{ s.lift.toFixed(1) }}×</span>
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
.detail__head .kicker {
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
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--text-dim);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
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
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  font-size: 12.5px;
  max-height: 260px;
  overflow-y: auto;
}
.detail__compare li {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid var(--line);
  color: var(--text-dim);
}
.detail__compare li span:first-child {
  color: var(--text-faint);
}
.detail__compare li.same span:not(:first-child) {
  color: var(--green);
}
.detail__compare-head {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
.detail__facts .mono {
  font-size: 22px;
  font-weight: 600;
}
.detail__facts small {
  color: var(--text-dim);
  font-size: 12px;
}
.detail__label {
  font-family: var(--font-mono);
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
.detail__standouts .mono {
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
