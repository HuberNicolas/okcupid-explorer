# Frontend

React app of the [OkCupid Explorer](../README.md), built with Vite.

```bash
npm ci
```

```bash
npm run dev
```

The app expects the API at `http://127.0.0.1:5001`; set `VITE_API_URL` to use another one.

| Path | Content |
|---|---|
| [src/App.jsx](src/App.jsx) | Landing page or main view |
| [src/Components/](src/Components/) | Questionnaire, charts and detail views |
| [src/Components/Form/fields.json](src/Components/Form/fields.json) | Questions and answer options |
| [src/Chart.js](src/Chart.js) | ApexCharts React component |
| [src/config.js](src/config.js) | API URL |

See [docs/architecture.md](../docs/architecture.md) and [docs/development.md](../docs/development.md).
