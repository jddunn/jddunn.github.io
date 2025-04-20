# Portfolio page

Lives at https://jddunn.github.io/

# Description

SEO-ready portfolio and blog page with a Alice in Wonderland-inspired interactive fiction game on the homepage powered by my text-rpg-engine JS library. Uses GraphQL and GitHub API to build open-source page. All the data fetching from the API and from local markdown files (for the blog and project posts) is done at build time with `getStaticProps`, allowing for static exports so the site can live on a static server like GitHub Pages while allowing for SEO. Blog and project posts are written in Markdown and stored in the repository under `/_posts`. Also uses three.js for an interactive sketch.

Google Analytics functionality is included. The site uses the environment variables `GOOGLE_ANALYTICS_ID` and `GITHUB_API_TOKEN` for analytics and GitHub API access.

# Tech Used

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Sass](https://sass-lang.com/)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next SEO](https://github.com/garmeeh/next-seo/)
- [next-sitemap](https://www.npmjs.com/package/next-sitemap)
- [Three.js](https://threejs.org/)
- [Framer](https://www.framer.com/motion/)
- [Showdown](https://github.com/showdownjs/showdown)
- [text-rpg-engine](https://jddunn.github.io/text-rpg-engine/)

## Local Setup / Build

```bash
# Install dependencies
$ npm install

# Serve at port 3000
$ npm run dev

# Build
$ npm run build

# Build / export, exported files outputted to /out dir
$ npm run export
```

## Deployment

This repository is set up with GitHub Actions to automatically deploy to GitHub Pages whenever you push to the `main` or `master` branch.

### GitHub Actions Workflow

The automated workflow:
1. Checks out your repository
2. Sets up Node.js
3. Installs dependencies
4. Builds and exports the site with Next.js
5. Deploys to GitHub Pages

### Environment Variables

To use environment variables in the GitHub Actions workflow:

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following repository secrets:
   - `GH_API_TOKEN`: Your GitHub API token
   - `GOOGLE_ANALYTICS_ID`: Your Google Analytics ID

These secrets will be securely used during the build process.

### Manual Deployment

You can also manually trigger a deployment from the Actions tab in your GitHub repository.