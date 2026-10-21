# BDBMego Technologies

**Big ideas. Lean budgets. Built well.**

The company website for BDBMego Technologies: custom websites, mobile apps, and software built with AI-assisted development and human guidance, review, and testing.

**[Visit bdbmego.com](https://bdbmego.com)** · [Contact us](mailto:bdbmego@gmail.com)

## About the website

A responsive, single-page introduction to our services, approach, project process, and contact information. Geometric artwork and a scroll-linked animation give the page its visual character, with reduced-motion support and content that remains readable without JavaScript.

Built with Next.js App Router, TypeScript, CSS Modules, and Motion for React. The site exports static files and is hosted on Cloudflare Pages.

## Run locally

Use Node.js 24.x (24.22.0 or later) and npm 11.x.

```sh
cd website
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). On Windows, use `npm.cmd` if PowerShell blocks `npm` scripts.

## Project structure

| Path | Purpose |
| --- | --- |
| `website/src/content/site.ts` | Website copy and production settings |
| `website/src/app/` | Page entry points, global styles, and metadata |
| `website/src/components/` | Page sections and interactive components |
| `website/public/` | Static assets |
| `.github/workflows/website-checks.yml` | Automated release and browser checks |

## Deployment

Cloudflare Pages automatically builds and deploys changes to `main`. Pull requests must pass the required production export check before merging, including release configuration validation, TypeScript checks, a production build, and Playwright browser tests.

The Cloudflare project uses `website` as its root directory and publishes the generated `out` directory. See the [development and deployment guide](website/README.md) for build commands, hosting configuration, testing, and maintenance.

## Project documentation

- [Project overview](PROJECT_PLAN.md)
- [Page content and design](PAGE_DESIGN.md)
- [Implementation plan and completion status](IMPLEMENTATION_PLAN.md)
- [Development and deployment guide](website/README.md)
