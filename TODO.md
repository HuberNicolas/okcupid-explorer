# TODO

Open tasks before and after the repository is made public. See also [Known issues](README.md#known-issues).

## 1. Repository

- [x] Merge `ivda-frontend` and `nvwd-server` into one repository with both histories (`frontend/`, `backend/`)
- [x] Keep the unchanged 2022 state on the branch `original`
- [x] Remove the raw dataset from the history and add a download script with checksum
- [x] Rewrite commit e-mails: own addresses to nicolas.huber.dev@gmail.com, teammates to their GitHub noreply addresses
- [x] Remove IDE files and add one `.gitignore`
- [x] Create the GitHub repository and push `main` and `original`
- [ ] Add a screenshot of the app to the README

## 2. Run again with current dependencies (step 1)

- [x] Backend on Python 3.13 with Flask 3, pandas 3, scikit-learn 1.9, managed with uv
- [x] Replace sklearn-pandas with a `ColumnTransformer`; compare responses with the 2022 versions
- [x] Frontend on Vite 8, React 19, Bootstrap 5.3
- [x] Pin ApexCharts to 4.7.0 and react-apexcharts to 1.7.0, the last MIT-licensed releases
- [x] Fix what broke on the way: landing page with React 19, card text colour, scatter tooltip, group selection
- [x] API URL configurable with `VITE_API_URL`
- [x] Smoke tests for the backend and the frontend, CI workflow
- [x] Ruff and ESLint set up; 2022 findings in the frontend are warnings
- [ ] Re-run the notebooks with the current libraries; replace `pandas_profiling` with `ydata-profiling` once it
      supports pandas 3, or drop the profiling cells

## 3. Deployment

- [x] Dockerfile for the backend, tested locally
- [x] Workflows for GitHub Pages (frontend) and a Hugging Face Space (backend)
- [ ] Create the Hugging Face Space, add `HF_TOKEN` and `HF_SPACE` (see [docs/deployment.md](docs/deployment.md))
- [ ] Enable GitHub Pages with GitHub Actions and set `VITE_API_URL`
- [ ] Check the deployed site end to end

## 4. Clean-up and refactoring (step 2, on a separate branch)

- [ ] Fix the 40 ESLint warnings (unused variables and imports, missing `key` props, `setState` in effects)
- [ ] Remove the unused debug routes (`/api/dev/...`, `/template-example`) and the templates, or fix them
- [ ] Share the duplicated request code in `app.py` (the four `/api/post/...` routes repeat the same steps)
- [ ] Return 400 instead of 500 for answers with unknown values
- [ ] Fix the ApexCharts console error when a person or group is opened (path animation in ApexCharts 4.7)
- [ ] Format the scatter plot's y axis labels
- [ ] Keep the charts readable when a person or group is opened
- [ ] Split the 900 kB JavaScript bundle (Vite warns about chunks over 500 kB)
- [ ] Rename the misspelled fields and labels (`Questionaire`, `lables`, `Eudcation`, `filerType`)

## 5. Before publishing

- [x] Choose and add a license (MIT, team and Nicolas Huber)
- [x] Add the project context (course, university, team) to the README
- [x] Credit the data source (Kim & Escobedo-Land, JSE_OkCupid)
- [ ] Check for secrets in the files and the git history, right before publishing
- [x] Teammates agree with publishing under their names
