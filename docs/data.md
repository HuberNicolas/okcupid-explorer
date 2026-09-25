# Data

## Source

The profiles come from the OkCupid dataset by Albert Y. Kim and Adriana Escobedo-Land
([JSE_OkCupid](https://github.com/rudeboybert/JSE_OkCupid)), published with the paper *OkCupid Data for Introductory
Statistics and Data Science Courses* (Journal of Statistics Education, 2015,
[doi:10.1080/10691898.2015.11889737](https://doi.org/10.1080/10691898.2015.11889737)).

- 59,946 profiles of OkCupid users within 25 miles of San Francisco.
- OkCupid allowed the use of the data on condition that the dataset stays public. There is no formal open data license.
- The 2021 revision (`profiles_revised.csv`) removed location and last-online time, added noise to age and removed
  the collection date. This project uses the revised version without the essays.

The data contains sensitive attributes (ethnicity, religion, sexual orientation, drug use). Use it for teaching and
research only, and do not try to identify people.

## Files

| File | Rows | What it is | In the repository |
|---|---|---|---|
| `backend/data/profiles_revised.csv` | 59,946 | Raw dataset | No; run `uv run python pipeline/download_data.py` in `backend/` |
| [backend/pipeline/data/cleaned.csv](../backend/pipeline/data/cleaned.csv) | 842 | Cleaned profiles; the API fits its encoder on them | Yes |
| [backend/src/okcupid.sqlite](../backend/src/okcupid.sqlite) | 842 per table | `okcupid_clean` (clean values), `okcupid_std` (encoded values), two empty tables for user input | Yes |
| [backend/pipeline/okcupid.sqlite](../backend/pipeline/okcupid.sqlite) | 842 per table | Notebook output with `okcupid_clean` and `okcupid_std`; the API uses the copy in `src/` | Yes |
| [backend/pipeline/exploration/](../backend/pipeline/exploration/) | – | Plots and a pandas-profiling report of the raw data | Yes |

The download script checks the SHA-256 checksum of the file; it is the same file that was in the 2022 repository.

## How the cleaned data was made

[backend/pipeline/data-exploration.ipynb](../backend/pipeline/data-exploration.ipynb) reads the raw CSV, cleans it
with the functions in [backend/pipeline/preprocess.py](../backend/pipeline/preprocess.py) and writes `cleaned.csv` and
`okcupid.sqlite`. [backend/cleaning.md](../backend/cleaning.md) lists the cleaned columns. The cleaning:

- splits combined answers into two columns, for example `diet` → `diet_modifier` + `diet`, `education` →
  `education_status` + `education_institution`, `offspring` → `offspring_status` + `offspring_future`,
  `pets` → `pets_cats` + `pets_dogs`, `religion` → `religion_type` + `religion_modifier`, `sign` → `sign` +
  `sign_modifier`;
- turns `ethnicity` and `speaks` into one 0/1 column per value, and keeps eight languages;
- drops rows with missing or unspecified values in the used columns, which leaves 842 profiles.

The notebook was not re-run in 2026 (see [Known issues](../README.md#known-issues)).
