# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: portfolio visitors. Recruiters, hiring managers and peers who come from nicolas-huber.dev or the GitHub
repository. They spend a few minutes with the app and decide whether the author can turn real data into a working,
understandable visual analysis. They are evaluating the craft, not looking for a date.

Others use it too (curious visitors who fill in the questionnaire for fun, people interested in the method), but
decisions favour the portfolio visitor.

## Product Purpose

Project Eros asks 24 questions (age, height, diet, drinking, education, religion, languages and more) and places the
visitor among 842 real OkCupid profiles. It computes the cosine similarity to each profile, projects everyone onto a
map with PCA (four components, two shown) and splits them into four groups with k-means.

Success: a portfolio visitor reaches their own position on the map quickly, explores people and groups, and leaves
convinced that the analysis is real, correct and carefully built.

## Positioning

A rebuild of a 2022 university group project (IVDA, University of Zurich, group nvwd). The whole analysis runs in the
browser in TypeScript, with no server, and tests check it against the original Python and scikit-learn code: encoding
and match labels are identical, PCA agrees to 1e-6. The visitor's answers never leave the page.

## Operating Context

- Static site on GitHub Pages: https://hubernicolas.github.io/okcupid-explorer/
- Flow: hero → questionnaire in six steps (random answers, reset, answers saved in the browser) → results: PCA map
  coloured by group with the visitor as a pink heart, similarity or "opposites attract" mode, threshold, person view
  (score, radar chart, answer-by-answer comparison), area selection (group size, group mix, standout values),
  distribution charts for up to nine attributes, method section.
- Usually opened on a desktop from a link in a portfolio or CV; it must also work on a phone.

## Capabilities and Constraints

- Vue 3, TypeScript, Vite, Apache ECharts 6; Vitest and ESLint. No backend at runtime.
- Every answer option comes from the data, so every answer is valid.
- Known limitation: PC1 is almost only the job code (loading 0.99) and PC2 the zodiac sign (0.98), because the 2022
  analysis encodes categories as consecutive integers. The README and docs record this. One-hot encoding is an idea in
  TODO.md, not a decision.
- Open ideas (TODO.md): share results through a link, keyboard access for the map.

## Brand Commitments

- None beyond the content. Name ("Project Eros"), the current dark look modelled on nicolas-huber.dev and the
  accent colours are the existing state, not binding commitments.

## Evidence on Hand

- The dataset: Kim & Escobedo-Land, *OkCupid Data for Introductory Statistics and Data Science Courses*, JSE 23(2),
  2015, revised 2021; permission from OkCupid. 842 profiles in `frontend/src/data/profiles.json`.
- Engine tests against reference results: `frontend/src/engine/engine.test.ts`, `frontend/src/engine/__fixtures__/`.
- Screenshots: `docs/images/`.
- Team credits in the README. No testimonials, usage figures or press exist; do not invent them.

## Product Principles

1. **Show the result, keep the method's caveats in the docs.** The app presents the analysis; methodological
   weaknesses are documented in the README and docs, not argued in the interface.
2. **Proof through working software.** The interactive analysis is the portfolio piece; claims stay limited to what the
   tests show.
3. **Get to your own dot fast.** The visitor's position among the profiles is the payoff, so nothing should delay it.
4. **Respect the people in the data.** The profiles are real, pseudonymised people.

## Accessibility & Inclusion

- Sensitive attributes (ethnicity, religion, sexual orientation, drug use) are shown neutrally and as data, never in
  a judgemental, sensational or showy way. No jokes, ranking or emphasis on them.
- No standard (such as WCAG AA) was set as binding.
