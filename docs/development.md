# Development

## Setup

| Tool | Version | Used for |
|---|---|---|
| Node.js | 24 ([.nvmrc](../frontend/.nvmrc)) | The app ([package.json](../frontend/package.json), [package-lock.json](../frontend/package-lock.json)) |
| [uv](https://docs.astral.sh/uv/) | current | Only for `backend/`: data preparation, reference API, export script |

## Frontend commands

In `frontend/`:

| Task | Command |
|---|---|
| Install | `npm ci` |
| Dev server on port 3000 | `npm run dev` |
| Tests (Vitest) | `npm test` |
| Lint (ESLint with the TypeScript and Vue rules) | `npm run lint` |
| Type check (vue-tsc) | `npm run typecheck` |
| Production build into `dist/` (includes the type check) | `npm run build` |
| Serve the build on port 4173 | `npm run preview` |

## Backend commands

In `backend/`:

| Task | Command |
|---|---|
| Install | `uv sync` |
| Export profiles and reference results for the app | `uv run python scripts/export_frontend_data.py` |
| Run the reference API | `uv run flask --app src/app run --port 5001` |
| Tests | `uv run pytest` |
| Lint and format | `uv run ruff check .` and `uv run ruff format .` |
| Download the raw data | `uv run python pipeline/download_data.py` |
| Notebooks | `uv run --group notebooks jupyter lab` |

Run the export after changing the database or the reference answers in the script. CI checks that
`frontend/src/data/profiles.json` matches the database.

## Where to change what

| Change | File |
|---|---|
| Questionnaire steps, attribute labels, answer order | [frontend/src/content/attributes.ts](../frontend/src/content/attributes.ts) |
| The analysis | [frontend/src/engine/](../frontend/src/engine/); keep [engine.test.ts](../frontend/src/engine/engine.test.ts) green |
| Colours, fonts, buttons, chips | [frontend/src/styles/main.css](../frontend/src/styles/main.css), chart theme in [frontend/src/charts/echarts.ts](../frontend/src/charts/echarts.ts) |
| Chart types (to keep the bundle small, register new ones) | [frontend/src/charts/echarts.ts](../frontend/src/charts/echarts.ts) |
| Links to the repository and the portfolio | [frontend/src/links.ts](../frontend/src/links.ts) |

## Notes

- Answer options come from the profiles, so every answer is valid. The engine throws on values no profile has, like
  scikit-learn does; `useExplorer` resets stored answers that no longer fit the data.
- Every profile speaks English, so English cannot be switched off in the questionnaire.
- Height is stored in inches, as in the dataset; the questionnaire shows centimetres.
- On macOS, port 5000 is used by AirPlay, so the reference API runs on 5001.
- The `notebooks` group installs on Linux (tested in Docker). With an x86_64 Python under Rosetta on an Apple Silicon
  Mac, `argon2-cffi-bindings` (a JupyterLab dependency) has no prebuilt wheel and needs a working C compiler; use an
  arm64 Python instead.
