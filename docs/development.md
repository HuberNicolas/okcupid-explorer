# Development

## Setup

| Tool | Version | Used for |
|---|---|---|
| [uv](https://docs.astral.sh/uv/) | current | Python 3.13 and the backend dependencies ([pyproject.toml](../backend/pyproject.toml), [uv.lock](../backend/uv.lock)) |
| Node.js | 24 ([.nvmrc](../frontend/.nvmrc)) | Frontend ([package.json](../frontend/package.json), [package-lock.json](../frontend/package-lock.json)) |
| Docker | optional | Backend image |

The backend has three dependency groups: the API itself, `dev` (Ruff, pytest) and `notebooks` (JupyterLab, Plotly,
Matplotlib and the other libraries the notebooks import). `uv sync` installs the API and `dev`.

## Commands

Backend, in `backend/`:

| Task | Command |
|---|---|
| Install | `uv sync` |
| Run the API | `uv run flask --app src/app run --port 5001` |
| Tests | `uv run pytest` |
| Lint | `uv run ruff check .` |
| Format | `uv run ruff format .` |
| Download the raw data | `uv run python pipeline/download_data.py` |
| Notebooks | `uv run --group notebooks jupyter lab` |

Frontend, in `frontend/`:

| Task | Command |
|---|---|
| Install | `npm ci` |
| Dev server on port 3000 | `npm run dev` |
| Tests | `npm test` |
| Lint | `npm run lint` |
| Production build into `dist/` | `npm run build` |
| Serve the build on port 4173 | `npm run preview` |

To point the frontend at another API, set `VITE_API_URL`, for example
`VITE_API_URL=https://example.hf.space npm run build`.

## Linting

- Ruff with the rules `E4`, `E7`, `E9`, `F` and `I`; `E711`, `E741` and `F841` are ignored for the 2022 code.
  Notebooks and `dev/` are excluded. Configuration in [pyproject.toml](../backend/pyproject.toml).
- ESLint with the recommended, React Hooks and React Refresh rules. Unused variables and a few other findings in the
  2022 code are warnings for now. Configuration in [eslint.config.js](../frontend/eslint.config.js).

## Where to change what

| Change | File |
|---|---|
| Questions and answer options | [frontend/src/Components/Form/fields.json](../frontend/src/Components/Form/fields.json) |
| Attributes for the distribution charts | [frontend/src/Components/Form/preselection.json](../frontend/src/Components/Form/preselection.json) |
| API URL default | [frontend/src/config.js](../frontend/src/config.js) |
| Encoding, similarity, PCA, k-means | [backend/src/app.py](../backend/src/app.py) (the columns at the top, the logic in each `/api/post/...` route) |
| Colours and layout | [frontend/src/App.css](../frontend/src/App.css) and the `Card` styles in the components |

## Notes

- The questionnaire only accepts values that occur in the 842 profiles; the options in `fields.json` are chosen that
  way. Another value (for example a new income) makes the API return 500.
- On macOS, port 5000 is used by AirPlay, so the API runs on 5001.
- The React app runs in `StrictMode` in development, which mounts components twice.
- `backend/src/app.py` reads its data relative to its own location and can be started from any folder.
- The `notebooks` group installs on Linux (tested in Docker). With an x86_64 Python under Rosetta on an Apple Silicon
  Mac, `argon2-cffi-bindings` (a JupyterLab dependency) has no prebuilt wheel and needs a working C compiler; use an
  arm64 Python instead.
