# TODO

Open tasks. See also [Known issues](README.md#known-issues).

## 1. Repository

- [x] Merge `ivda-frontend` and `nvwd-server` into one repository with both histories (`frontend/`, `backend/`)
- [x] Keep the unchanged 2022 state on the branch `original`
- [x] Remove the raw dataset from the history and add a download script with checksum
- [x] Rewrite commit e-mails: own addresses to nicolas.huber.dev@gmail.com, teammates to their GitHub noreply addresses
- [x] Create the GitHub repository and push `main` and `original`
- [x] Screenshots in the README

## 2. Step 1: run again with current dependencies (2022 app, see the history of `main`)

- [x] Backend on Python 3.13 with Flask 3, pandas 3, scikit-learn 1.9, managed with uv
- [x] React app on Vite 8, React 19, Bootstrap 5.3, ApexCharts 4.7 (last MIT release)
- [x] Fix what broke on the way; compare with the 2022 versions in the browser and through the API

## 3. Step 2: rebuild with Vue (branch `vue`)

- [x] Analysis in TypeScript, tested against the Flask API and scikit-learn
- [x] Export script for the profiles and reference results, checked in CI
- [x] Vue 3 app in the design of nicolas-huber.dev: questionnaire, map, person and group views, distributions
- [x] Answer options from the data, so every answer is valid
- [x] Remove the Docker image and the Hugging Face workflow; the app needs no server
- [ ] Merge `vue` into `main`
- [ ] Enable GitHub Pages with GitHub Actions and check the deployed site

## 4. Ideas

- [ ] Offer a one-hot encoding as an alternative, so that job and zodiac sign no longer dominate the map
- [ ] Share results with a link (answers in the URL)
- [ ] Keyboard access for the map (select people without a mouse)
- [ ] Re-run the notebooks with the current libraries; replace `pandas_profiling` with `ydata-profiling` once it
      supports pandas 3, or drop the profiling cells
- [ ] Remove the unused debug routes of the reference API (`/api/dev/...`, `/template-example`)

## 5. Before publishing

- [x] Choose and add a license (MIT, team and Nicolas Huber)
- [x] Add the project context (course, university, team) to the README
- [x] Credit the data source (Kim & Escobedo-Land, JSE_OkCupid)
- [x] Teammates agree with publishing under their names
- [ ] Check for secrets in the files and the git history, right before merging to `main`
