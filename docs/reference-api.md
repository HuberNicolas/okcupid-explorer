# Reference API (2022)

The 2022 app sent the questionnaire to a Flask API, [backend/src/app.py](../backend/src/app.py). Since 2026 the same
analysis runs in the browser ([frontend/src/engine/](../frontend/src/engine/)), and the API is no longer deployed. It
stays in the repository as the reference implementation:
[backend/scripts/export_frontend_data.py](../backend/scripts/export_frontend_data.py) calls it to produce the results
the TypeScript tests compare against.

Run it with `uv run flask --app src/app run --port 5001` in `backend/`. It allows requests from any origin (CORS).

> [!NOTE]
> Two bugs of the API are documented here and kept as they were: answers with values that no profile has fail with
> 500, and in `/api/post/users/std` the last row (your answers) carries the PCA coordinates of profile 0, because pandas
> aligns the appended row by its index 0.

## Endpoints used by the 2022 frontend

### Questionnaire endpoints

`POST /api/post/users/nonstd`, `POST /api/post/users/std` and `POST /api/post/user/std` take the same body:

```json
{
  "threshold": 0.6,
  "mode": 1,
  "data": {
    "age": 29, "sex": "f", "height": 66, "orientation": "straight", "body_type": "athletic",
    "diet": "anything", "diet_modifier": "mostly", "drinks": "socially", "smokes": "no", "drugs": "never",
    "sign": "leo", "sign_modifier": "no specified sign modifier", "income": 80000.0,
    "job": "science / tech / engineering", "status": "single",
    "education_status": "graduated from", "education_institution": "college/university",
    "offspring_status": "doesn't have kids", "offspring_future": "might want",
    "pets_cats": "likes cats", "pets_dogs": "likes dogs",
    "religion_type": "agnosticism", "religion_modifier": "not too serious about it",
    "ethnicities": ["white", "asian"], "speaks": ["english", "german", "french"]
  }
}
```

| Field | Meaning |
|---|---|
| `threshold` | 0 to 1; profiles with a (dis)similarity at or above it get `Label: 1` |
| `mode` | `1` similarity, `0` dissimilarity |
| `data` | The answers; values must occur in the profiles; the 2022 form ([fields.json](https://github.com/HuberNicolas/okcupid-explorer/blob/original/frontend/src/Components/Form/fields.json)) offered some that do not |

| Endpoint | Response |
|---|---|
| `/api/post/users/nonstd` | 842 profiles (clean values) with `PComp 1`–`PComp 4`, `Segment`, `Segment K-means PCA` and `Label` |
| `/api/post/users/std` | 843 rows: the encoded profiles and, last, the encoded answers, with the same extra columns plus `lables` (the label, without `index`) |
| `/api/post/user/std` | One row: the encoded answers |

### Radar endpoint

`POST /api/post/user/std/radar` takes one profile as returned by `/api/post/users/nonstd`:

```json
{"data": {"age": 36, "body_type": "average", "...": "..."}}
```

It returns one row with that profile's encoded values.

## Other routes

These routes are left from development in 2022. The frontend does not use them.

| Route | Status with the examples in [backend/src/requests/](../backend/src/requests/) |
|---|---|
| `GET /api/clean/index`, `GET /api/clean/<id>` | 200: clean profiles from SQLite |
| `GET /api/std/index`, `GET /api/std/<id>` | 200: encoded profiles |
| `GET /api/<id>` | 200: one profile |
| `POST /api/clean/age/between/` | 400 |
| `POST /api/dev`, `GET /api/dev/userInput`, `GET /api/dev/list`, `POST /api/dev/list` | 200 |
| `POST /api/dev/std`, `POST /api/dev/std/template`, `POST /api/dev/std/db`, `POST /api/dev/std/db/unsimilar` | 500 |
| `GET /template-example` | 500 |

The statuses are the same with the 2022 versions of the libraries.
