# Backend

Data preparation and the 2022 Flask API of the [OkCupid Explorer](../README.md). The app no longer calls the API; it
runs the same analysis in the browser. The API stays as the reference the app's tests are checked against, and
[scripts/export_frontend_data.py](scripts/export_frontend_data.py) exports the profiles for the app.

```bash
uv sync
```

```bash
uv run flask --app src/app run --port 5001
```

| Path | Content |
|---|---|
| [src/app.py](src/app.py) | The API |
| [src/okcupid.sqlite](src/okcupid.sqlite) | The profiles the API reads |
| [src/requests/](src/requests/), [src/example-request-post.json](src/example-request-post.json) | Example requests from 2022 |
| [src/templates/](src/templates/) | Templates of debug routes |
| [pipeline/](pipeline/) | Cleaning code, exploration notebook, plots, cleaned CSV, [download script](pipeline/download_data.py) |
| [dev/](dev/), [src/vis.ipynb](src/vis.ipynb) | Exploration notebooks from 2022 |
| [cleaning.md](cleaning.md) | Cleaned columns |
| [scripts/export_frontend_data.py](scripts/export_frontend_data.py) | Exports the profiles and reference results to `frontend/src/` |
| [tests/](tests/) | Smoke tests of the API |

See [docs/reference-api.md](../docs/reference-api.md), [docs/data.md](../docs/data.md) and [docs/development.md](../docs/development.md).
