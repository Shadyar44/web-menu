# Restaurant Menu

The restaurant menu is deployed to GitHub Pages at
https://Shadyar44.github.io/happybirthday/.

## Local development

From this directory, install dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

Run the production build and lint checks with:

```sh
npm run build
npm run lint
```

## GitHub Pages deployment

The GitHub Actions workflow at `../.github/workflows/deploy-pages.yml` builds
this app and publishes it to GitHub Pages whenever changes are pushed to
`main`. In the repository's **Settings > Pages**, set the build and deployment
source to **GitHub Actions**. After that one-time setup, pushing changes to
`main` automatically updates the published site.
