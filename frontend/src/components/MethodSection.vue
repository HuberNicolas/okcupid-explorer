<script setup lang="ts">
import { computed } from 'vue';
import LineIcon from './LineIcon.vue';
import { GROUP_COLORS } from '../charts/theme';
import { useExplorer } from '../composables/useExplorer';
import { FEATURES } from '../engine';
import { percent } from '../insights';
import { REPOSITORY } from '../links';

const { analysis, groups, submitted, settings } = useExplorer();
const TESTS = `${REPOSITORY}/blob/main/frontend/src/engine/engine.test.ts`;

const signed = (n: number) => `${n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}`;

// Each stage shows what it produced for the visitor's own answers
const stages = computed(() => {
  const { you, score, coords, group } = analysis.value;
  const others = score.slice(0, -1);
  const best = Math.max(...others);
  const passing = others.filter((s) => s >= settings.threshold).length;
  const [x, y] = coords[coords.length - 1];
  const g = group[group.length - 1];
  return [
    {
      title: 'Encode',
      value: `${you.slice(0, 4).map(signed).join('  ')}  …`,
      text: `Your answers become ${FEATURES.length} numbers: age and height are standardised, every other answer gets a code, languages and ethnicities become yes/no flags.`,
      formula: 'x = (value − mean) / std',
    },
    {
      title: 'Compare',
      value: `${percent(best)} closest`,
      text: `The cosine similarity measures how closely each profile points in the same direction as you. ${passing} profiles reach your threshold of ${percent(settings.threshold)}.`,
      formula: 'sim = a·b / (‖a‖ ‖b‖)',
    },
    {
      title: 'Project',
      value: `x ${signed(x)}  y ${signed(y)}`,
      text: 'A principal component analysis squeezes all attributes, plus whether a profile passes your threshold, into four axes. The map shows the first two.',
      formula: 'PCA → 4 components',
    },
    {
      title: 'Group',
      value: `Group ${g + 1}`,
      dot: GROUP_COLORS[g],
      text: `k-means splits everyone, you included, into four groups that sit close together on those axes. Yours: ${groups.value[g].summary}.`,
      formula: 'k-means · k = 4, best of 10 runs',
    },
  ];
});
</script>

<template>
  <section id="method" class="section method">
    <div class="container">
      <h2 class="section-title">From 24 answers to one dot</h2>
      <p class="section-lead">
        The same analysis the 2022 Flask backend ran, now in TypeScript. Tests check it against the original Python code:
        encoding and matches are identical, the projection agrees to six decimals.
        <a class="method__tests" :href="TESTS" target="_blank" rel="noopener">See the tests<LineIcon name="external" /></a>
      </p>

      <ol class="pipe">
        <li v-for="(s, i) in stages" :key="s.title" class="stage">
          <h3 class="stage__title"><span class="stage__n num">{{ i + 1 }}</span>{{ s.title }}</h3>
          <p class="stage__value num">
            <span v-if="s.dot" class="stage__dot" :style="{ background: s.dot }" aria-hidden="true"></span>{{ s.value }}
          </p>
          <p class="stage__text">{{ s.text }}</p>
          <code class="stage__formula">{{ s.formula }}</code>
        </li>
      </ol>
      <p class="method__source">
        {{ submitted ? 'Values from your answers.' : 'Values from the most common answers; take the questionnaire to see yours.' }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.method {
  border-top: 1px solid var(--line);
}
.method__tests {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text);
  border-bottom: 1px solid var(--line-strong);
  transition: border-color var(--dur) var(--ease);
}
.method__tests:hover {
  border-color: var(--text);
}
.method__tests .icon {
  width: 14px;
  height: 14px;
}

/* A pipeline: one line through four stations; the last station is your dot */
.pipe {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  position: relative;
}
.pipe::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 6px;
  right: 6px;
  height: 1px;
  background: var(--line-strong);
}
.stage {
  position: relative;
  padding: 32px 28px 0 0;
}
.stage::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--text-faint);
}
.stage:last-child::before {
  background: var(--pink);
  border-color: var(--pink);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--pink) 18%, transparent);
}
.stage__title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}
.stage__n {
  color: var(--text-faint);
  font-weight: 500;
}
.stage__value {
  margin: 10px 0 12px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: pre;
}
.stage__dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: 0.15em;
}
.stage__text {
  margin: 0 0 14px;
  font-size: 14.5px;
  color: var(--text-dim);
}
.stage__formula {
  font-family: inherit;
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  color: var(--text-faint);
}
.method__source {
  margin: 32px 0 0;
  font-size: 13px;
  color: var(--text-faint);
}

@media (max-width: 860px) {
  .pipe {
    grid-template-columns: 1fr;
  }
  .pipe::before {
    top: 6px;
    bottom: 0;
    left: 5px;
    right: auto;
    width: 1px;
    height: auto;
  }
  .stage {
    padding: 0 0 32px 32px;
  }
  .stage::before {
    top: 4px;
  }
}
</style>
