// Runs the analysis off the main thread, so dragging the threshold keeps the page responsive.
import { analyze, type Analysis, type Prepared, type Settings } from './analyze';
import type { Answers } from './columns';

export type WorkerRequest =
  | { type: 'init'; prepared: Prepared }
  | { type: 'analyze'; id: number; answers: Answers; settings: Settings };
export type WorkerResponse = { id: number; analysis: Analysis };

// Typed locally: the project compiles against the DOM library, not the worker library
const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage(message: WorkerResponse): void;
};

let prepared: Prepared | undefined;

scope.onmessage = ({ data }) => {
  if (data.type === 'init') {
    prepared = data.prepared;
  } else if (prepared) {
    scope.postMessage({ id: data.id, analysis: analyze(prepared, data.answers, data.settings) });
  }
};
