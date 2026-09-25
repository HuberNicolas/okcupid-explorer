<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import ChoiceField from './ChoiceField.vue';
import RangeField from './RangeField.vue';
import { ATTRIBUTES, attributeValues, ETHNICITY_VALUES, LANGUAGE_VALUES, STEPS } from '../content/attributes';
import { defaultAnswers, randomAnswers, useExplorer } from '../composables/useExplorer';
import type { Categorical } from '../engine';

const { answers, submitted, setAnswers } = useExplorer();
const current = ref(0);
const step = computed(() => STEPS[current.value]);
const isLast = computed(() => current.value === STEPS.length - 1);
const progress = computed(() => `${((current.value + 1) / STEPS.length) * 100}%`);

const inches = (cm: number) => Math.round(cm / 2.54);
const heightCm = computed({
  get: () => Math.round(answers.height * 2.54),
  set: (cm: number) => (answers.height = inches(cm)),
});
const showHeight = (cm: number) => `${cm} cm · ${Math.floor(inches(cm) / 12)}′${inches(cm) % 12}″`;

async function finish() {
  submitted.value = true;
  await nextTick();
  document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
}

function randomize() {
  setAnswers(randomAnswers());
}

function reset() {
  setAnswers(defaultAnswers());
  current.value = 0;
}

const isCategorical = (field: string): field is Categorical => field in ATTRIBUTES;
</script>

<template>
  <section id="explore" class="section">
    <div class="container">
      <p class="kicker reveal" data-accent="pink">// questionnaire</p>
      <h2 class="section-title reveal">Tell us about yourself</h2>
      <p class="section-lead reveal">
        The same questions the OkCupid users answered. Every option comes from the data itself, and the most common
        answer is preselected. Change as much as you like.
      </p>

      <div class="quiz reveal">
        <ol class="quiz__steps" aria-label="Steps">
          <li v-for="(s, i) in STEPS" :key="s.id">
            <button
              type="button"
              class="quiz__step"
              :class="{ 'is-active': i === current, 'is-done': i < current }"
              :data-accent="s.accent"
              :aria-current="i === current ? 'step' : undefined"
              @click="current = i"
            >
              <span class="quiz__num mono">{{ s.kicker }}</span>
              <span>{{ s.title }}</span>
            </button>
          </li>
        </ol>

        <div class="quiz__body panel" :data-accent="step.accent">
          <div class="quiz__progress"><span :style="{ width: progress }"></span></div>
          <div class="quiz__head">
            <p class="kicker">step {{ step.kicker }} / {{ String(STEPS.length).padStart(2, '0') }}</p>
            <div class="quiz__tools">
              <button type="button" class="btn btn--small" @click="randomize">🎲 Random answers</button>
              <button type="button" class="btn btn--small" @click="reset">Reset</button>
            </div>
          </div>
          <h3 class="quiz__title">{{ step.title }}</h3>

          <Transition name="swap" mode="out-in">
            <div :key="step.id" class="quiz__fields">
              <template v-for="field in step.fields" :key="field">
                <RangeField
                  v-if="field === 'age'"
                  v-model="answers.age"
                  label="Age"
                  :min="18"
                  :max="80"
                  :display="(v) => `${v} years`"
                />
                <RangeField
                  v-else-if="field === 'height'"
                  v-model="heightCm"
                  label="Height"
                  :min="145"
                  :max="210"
                  :display="showHeight"
                />
                <ChoiceField
                  v-else-if="field === 'speaks'"
                  v-model="answers.speaks as string[]"
                  label="Languages you speak"
                  :options="LANGUAGE_VALUES"
                  :locked="['english']"
                  multiple
                  hint="Every profile in the data speaks English, so English is always on."
                />
                <ChoiceField
                  v-else-if="field === 'ethnicities'"
                  v-model="answers.ethnicities as string[]"
                  label="Ethnicity"
                  :options="ETHNICITY_VALUES"
                  multiple
                  hint="Select all that apply."
                />
                <ChoiceField
                  v-else-if="isCategorical(field)"
                  v-model="answers.categorical[field]"
                  :label="ATTRIBUTES[field].label"
                  :options="attributeValues(field)"
                />
              </template>
            </div>
          </Transition>

          <div class="quiz__nav">
            <button type="button" class="btn" :disabled="current === 0" @click="current--">← Back</button>
            <button v-if="!isLast" type="button" class="btn btn--primary" @click="current++">Next →</button>
            <button v-else type="button" class="btn btn--primary" @click="finish">
              {{ submitted ? 'Update my results' : 'Show my results' }} ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quiz {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;
}
.quiz__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
.quiz__step {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  transition: all var(--dur) var(--ease);
}
.quiz__step:hover {
  color: var(--text);
  background: var(--panel);
}
.quiz__step.is-active {
  color: var(--text);
  border-color: var(--line);
  background: var(--panel-strong);
}
.quiz__num {
  font-size: 12px;
  color: var(--text-faint);
}
.quiz__step.is-active .quiz__num,
.quiz__step.is-done .quiz__num {
  color: var(--accent);
}
.quiz__body {
  position: relative;
  overflow: hidden;
  min-height: 460px;
  display: flex;
  flex-direction: column;
}
.quiz__progress {
  position: absolute;
  inset: 0 0 auto;
  height: 2px;
  background: var(--line);
}
.quiz__progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--pink), var(--accent));
  transition: width 0.5s var(--ease);
}
.quiz__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.quiz__head .kicker {
  margin: 0;
}
.quiz__tools {
  display: flex;
  gap: 8px;
}
.quiz__title {
  font-size: 26px;
  letter-spacing: -0.02em;
  margin: 10px 0 24px;
}
.quiz__fields {
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
}
.quiz__nav {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
}
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}
.swap-enter-from {
  opacity: 0;
  transform: translateX(14px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateX(-14px);
}
@media (max-width: 820px) {
  .quiz {
    grid-template-columns: 1fr;
  }
  .quiz__steps {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .quiz__step {
    white-space: nowrap;
  }
}
</style>
