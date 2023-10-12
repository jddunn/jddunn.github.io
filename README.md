# Portfolio page

Lives at https://jddunn.github.io/

# Description

SEO-ready portfolio and blog page with a Alice in Wonderland-inspired interactive fiction game on the homepage powered by my text-rpg-engine JS library. Uses GraphQL and GitHub API to build open-source page. All the data fetching from the API and from local markdown files (for the blog and project posts) is done at build time with `getStaticProps`, allowing for static exports so the site can live on a static server like GitHub Pages while allowing for SEO. Blog and project posts are written in Markdown and stored in the repository under `/_posts`. Also uses three.js for an interactive sketch.

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

## Setup / build

```bash

# Install dependencies
$ npm install

# Serve at port 3000
$ npm run dev

# Build / export, exported files outputted to /out dir
$ npm run build
```


