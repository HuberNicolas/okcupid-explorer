# Backend

Flask API of the [OkCupid Explorer](../README.md). It encodes the questionnaire answers, compares them with 842 OkCupid
profiles and returns the profiles with PCA components, k-means groups and similarity labels.

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
| [tests/](tests/) | Smoke tests |
| [Dockerfile](Dockerfile) | Image for deployment |

See [docs/api.md](../docs/api.md), [docs/data.md](../docs/data.md) and [docs/development.md](../docs/development.md).
