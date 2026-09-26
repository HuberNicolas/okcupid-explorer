# Frontend

The Vue app of the [OkCupid Explorer](../README.md). It runs the whole analysis in the browser.

```bash
npm ci
```

```bash
npm run dev
```

| Path | Content |
|---|---|
| [src/engine/](src/engine/) | Encoding, cosine similarity, PCA and k-means, with tests against the Python reference |
| [src/data/](src/data/) | The 842 profiles (exported from `backend/`) |
| [src/components/](src/components/) | Sections, charts and panels |
| [src/composables/](src/composables/) | Shared state (`useExplorer`) and the scroll reveal |
| [src/content/attributes.ts](src/content/attributes.ts) | Questionnaire steps, labels and answer order |
| [src/charts/echarts.ts](src/charts/echarts.ts) | ECharts modules and theme |
| [src/styles/main.css](src/styles/main.css) | Design system |

See [docs/architecture.md](../docs/architecture.md) and [docs/development.md](../docs/development.md).
