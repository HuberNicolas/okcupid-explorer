import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { profiles, valueCounts } from '../data/profiles';
import { analyze, CATEGORICAL, prepare, type Analysis, type Answers, type Categorical, type Settings } from '../engine';
import type { WorkerRequest, WorkerResponse } from '../engine/analysis.worker';
import { DEFAULT_CHARTS, ETHNICITY_VALUES, LANGUAGE_VALUES, MAX_CHARTS } from '../content/attributes';

export type Selection = { type: 'person'; index: number } | { type: 'group'; indices: number[] } | null;
export interface Filter {
  key: Categorical;
  value: string | number;
}

const STORAGE_KEY = 'okcupid-explorer:v1';

function load<T>(fallback: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

const mostCommon = (key: Categorical) => valueCounts(key)[0].value;

export function defaultAnswers(): Answers {
  return {
    age: 30,
    height: 68,
    categorical: Object.fromEntries(CATEGORICAL.map((key) => [key, mostCommon(key)])) as Answers['categorical'],
    ethnicities: ['white'],
    speaks: ['english'],
  };
}

/** Random answers, weighted by how often each value occurs among the profiles. */
export function randomAnswers(): Answers {
  const pick = (key: Categorical) => {
    const counts = valueCounts(key);
    let r = Math.random() * profiles.length;
    for (const { value, count } of counts) if ((r -= count) < 0) return value;
    return counts[0].value;
  };
  const extras = (values: string[], chance: number) => values.filter(() => Math.random() < chance);
  return {
    age: 20 + Math.floor(Math.random() * 40),
    height: 60 + Math.floor(Math.random() * 16),
    categorical: Object.fromEntries(CATEGORICAL.map((key) => [key, pick(key)])) as Answers['categorical'],
    ethnicities: [ETHNICITY_VALUES[Math.floor(Math.random() * 4)]],
    // Every profile speaks English, so the engine only knows English as "yes"
    speaks: ['english', ...extras(LANGUAGE_VALUES.slice(1), 0.15)],
  };
}

const prepared = prepare(profiles);
const stored = load({
  answers: defaultAnswers(),
  settings: { threshold: 0.8, mode: 'similar' } as Settings,
  charts: DEFAULT_CHARTS,
  submitted: false,
});

// Answers stored by an older version may contain values the data no longer has
try {
  analyze(prepared, stored.answers, stored.settings);
} catch {
  stored.answers = defaultAnswers();
  stored.submitted = false;
}

const answers = reactive<Answers>(stored.answers);
const settings = reactive<Settings>(stored.settings);
const charts = ref<Categorical[]>(stored.charts);
const submitted = ref(stored.submitted);
const selection = shallowRef<Selection>(null);
const filter = shallowRef<Filter | null>(null);
const analysis = shallowRef<Analysis>(analyze(prepared, answers, settings));

function applyAnalysis(next: Analysis) {
  analysis.value = next;
  if (selection.value?.type === 'group') selection.value = null;
}

// The analysis takes about 100 ms, so it runs in a worker. At most one request is in flight;
// changes made meanwhile (for example while dragging the threshold) are merged into the next one.
let worker: Worker | undefined;
try {
  worker = new Worker(new URL('../engine/analysis.worker.ts', import.meta.url), { type: 'module' });
  worker.postMessage({ type: 'init', prepared } satisfies WorkerRequest);
} catch {
  worker = undefined; // No worker support (tests, very old browsers): compute on the main thread
}

let latestId = 0;
let busy = false;
let pending = false;

function request() {
  if (!worker) return;
  if (busy) {
    pending = true;
    return;
  }
  busy = true;
  pending = false;
  // Plain copies: reactive proxies cannot be sent to a worker
  const { answers: a, settings: s } = JSON.parse(JSON.stringify({ answers, settings })) as { answers: Answers; settings: Settings };
  worker.postMessage({ type: 'analyze', id: ++latestId, answers: a, settings: s } satisfies WorkerRequest);
}

if (worker) {
  worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
    busy = false;
    // Show every finished result, so the map follows a drag; then compute the newest state
    if (data.id === latestId) applyAnalysis(data.analysis);
    if (pending) request();
  };
  worker.onerror = () => {
    // Fall back to the main thread if the worker fails to load
    worker?.terminate();
    worker = undefined;
    busy = false;
    applyAnalysis(analyze(prepared, answers, settings));
  };
}

let frame = 0;
watch(
  [answers, settings],
  () => {
    if (worker) return request();
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => applyAnalysis(analyze(prepared, answers, settings)));
  },
  { deep: true },
);

watch(
  [answers, settings, charts, submitted],
  () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, settings, charts: charts.value, submitted: submitted.value }),
      );
    } catch {
      // Storage can be unavailable (private mode); the app works without it
    }
  },
  { deep: true },
);

/** Profile indices that pass the attribute filter (all when no filter is set). */
const visible = computed(() => {
  const f = filter.value;
  return profiles.map((row) => !f || row[f.key] === f.value);
});

function setAnswers(next: Answers) {
  Object.assign(answers, next);
}

function toggleChart(key: Categorical) {
  if (charts.value.includes(key)) charts.value = charts.value.filter((k) => k !== key);
  else if (charts.value.length < MAX_CHARTS) charts.value = [...charts.value, key];
}

export function useExplorer() {
  return {
    profiles,
    answers,
    settings,
    charts,
    submitted,
    selection,
    filter,
    analysis,
    visible,
    setAnswers,
    toggleChart,
  };
}
