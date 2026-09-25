<script setup lang="ts">
import { computed } from 'vue';
import { GROUP_COLORS, YOU_COLOR } from '../charts/echarts';
import { useExplorer } from '../composables/useExplorer';
import { REPOSITORY } from '../links';

const { analysis, submitted } = useExplorer();

// The real PCA map of all profiles, drawn as a constellation
const stars = computed(() => {
  const { coords, group } = analysis.value;
  const xs = coords.map((c) => c[0]);
  const ys = coords.map((c) => c[1]);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  return coords.map((c, i) => ({
    x: 20 + ((c[0] - minX) / (maxX - minX)) * 460,
    y: 20 + ((maxY - c[1]) / (maxY - minY)) * 460,
    color: i === coords.length - 1 ? YOU_COLOR : GROUP_COLORS[group[i]],
    you: i === coords.length - 1,
    delay: (i % 17) * 0.35,
  }));
});
const you = computed(() => stars.value[stars.value.length - 1]);
</script>

<template>
  <section id="top" class="hero">
    <div class="container hero__inner">
      <div class="hero__text">
        <p class="hero__badge reveal"><span class="dot"></span>University of Zurich · IVDA · 2022</p>
        <h1 class="hero__title reveal">
          How many people<br />
          are <span class="hero__accent">just like you?</span>
        </h1>

        <div class="formula reveal">
          <span class="formula__item formula__item--a">your answers</span>
          <span class="formula__arrow">→</span>
          <span class="formula__item formula__item--b">similarity</span>
          <span class="formula__arrow">→</span>
          <span class="formula__item formula__item--c">clusters</span>
        </div>

        <p class="hero__lead reveal">
          Answer 24 questions and see where you land among <strong>842 real OkCupid profiles</strong> from the San
          Francisco area. Everything is computed in your browser; nothing you enter leaves this page.
        </p>

        <div class="hero__cta reveal">
          <a class="btn btn--primary" href="#explore">
            {{ submitted ? 'Back to your results' : 'Take the questionnaire' }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a class="btn" :href="REPOSITORY" target="_blank" rel="noopener">Source on GitHub</a>
        </div>
      </div>

      <figure class="hero__map reveal" aria-label="All profiles as points, coloured by group">
        <svg viewBox="0 0 500 500" role="img">
          <g class="hero__stars">
            <circle
              v-for="(s, i) in stars.slice(0, -1)"
              :key="i"
              :cx="s.x"
              :cy="s.y"
              r="2.6"
              :fill="s.color"
              :style="{ animationDelay: `${s.delay}s` }"
            />
          </g>
          <g v-if="you" class="hero__you" :transform="`translate(${you.x} ${you.y})`">
            <circle r="16" :stroke="YOU_COLOR" fill="none" class="hero__pulse" />
            <circle r="6" :fill="YOU_COLOR" />
          </g>
        </svg>
        <figcaption class="mono">~/pca-map · 842 profiles · <span class="you">● you</span></figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-h);
}
.hero__inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(32px, 6vw, 72px);
  align-items: center;
  padding-top: 40px;
  padding-bottom: 60px;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-dim);
  padding: 6px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel);
  margin: 0 0 26px;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--pink);
  box-shadow: 0 0 12px var(--pink);
}
.hero__title {
  font-size: clamp(38px, 6.4vw, 72px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin: 0 0 26px;
}
.hero__accent {
  background: linear-gradient(100deg, var(--pink), var(--violet) 45%, var(--blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.formula {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  margin-bottom: 24px;
}
.formula__item {
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--panel);
}
.formula__item--a {
  color: var(--pink);
}
.formula__item--b {
  color: var(--blue);
}
.formula__item--c {
  color: var(--green);
}
.formula__arrow {
  color: var(--text-faint);
}
.hero__lead {
  color: var(--text-dim);
  font-size: 17px;
  max-width: 540px;
  margin: 0 0 32px;
}
.hero__lead strong {
  color: var(--text);
  font-weight: 500;
}
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.hero__map {
  margin: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: radial-gradient(circle at 50% 45%, rgba(201, 155, 255, 0.07), transparent 70%), var(--panel);
  padding: 14px;
}
.hero__map svg {
  width: 100%;
  height: auto;
  display: block;
}
.hero__stars circle {
  opacity: 0.75;
  animation: twinkle 5.5s ease-in-out infinite;
}
.hero__pulse {
  stroke-width: 1.5;
  animation: pulse 2.4s var(--ease) infinite;
  transform-origin: center;
}
.hero__map figcaption {
  font-size: 12px;
  color: var(--text-faint);
  padding: 8px 4px 0;
}
.you {
  color: var(--pink);
}
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.75;
  }
  50% {
    opacity: 0.3;
  }
}
@keyframes pulse {
  0% {
    transform: scale(0.4);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
@media (max-width: 880px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }
  .hero__map {
    max-width: 460px;
  }
}
</style>
