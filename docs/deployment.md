# Deployment

The app is a static site on GitHub Pages. [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) runs on
every push to `main` that changes `frontend/`: it installs, tests and builds the app and publishes `frontend/dist`.

## Setup

1. Under *Settings → Pages* of the repository, set *Source* to **GitHub Actions**.
2. Run the workflow *Deploy to GitHub Pages* (Actions tab → *Run workflow*) or push a change in `frontend/`.

The site is then at <https://hubernicolas.github.io/okcupid-explorer/>. The build uses relative asset paths, so it
works under any sub-path.

A custom domain of another repository (such as `nicolas-huber.dev` on the portfolio) does not carry over. To use a
subdomain, for example `eros.nicolas-huber.dev`, add a `CNAME` DNS record pointing to `hubernicolas.github.io` and
enter the domain under *Settings → Pages → Custom domain*.

## Elsewhere

`npm run build` in `frontend/` produces a folder `dist/` that any static host can serve.
