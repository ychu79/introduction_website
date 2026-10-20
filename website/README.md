# BDBMego Technologies website

Next.js application for the BDBMego Technologies introduction page.

## Current stage

Implementation steps 1 through 4: application initialization, static output,
centralized content/configuration, and the shared page shell. The starter contains
a company header, section navigation, keyboard skip link, footer, and custom 404,
TypeScript, App Router, a `src/` directory, and CSS Modules. Production builds
export HTML, CSS, and JavaScript to `out/`. Motion is installed for the later
animation step. The full page design, browser tests, and deployment are later
steps in
[IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md).

The approved scope and copy are in [PROJECT_PLAN.md](../PROJECT_PLAN.md) and
[PAGE_DESIGN.md](../PAGE_DESIGN.md).

## Requirements

- Node.js 24 LTS, version 24.22.0 or later within the 24.x release line.
- npm 11.x. This scaffold was installed with Node.js 24.22.0 and npm 11.19.1.
- `.node-version` records the setup version; `package.json` declares the supported
  Node.js and npm ranges.

## Install and run

From this `website/` directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Stop the server with Ctrl+C.

Use `npm ci` to reproduce the versions in `package-lock.json`. Keep that lockfile
in version control alongside changes to `package.json`.

On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution policy
blocks the npm PowerShell wrapper.

### Project-local Node.js in the current checkout

The initial machine had no Node.js installation available on PATH. A portable
Node.js runtime was downloaded from nodejs.org into the repository's ignored
`.tools/` directory and its SHA-256 checksum was verified against the official
release checksums. Dependencies are already installed in this checkout.

To use that runtime, run the following from the **repository root** in PowerShell:

```powershell
$env:Path = "$PWD\.tools\node-v24.22.0-win-x64;$env:Path"
Set-Location website
npm.cmd run dev
```

The PATH change applies only to the current shell. `.tools/` is not committed or
available in a fresh clone; install the supported Node.js version for other
checkouts.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run typecheck` | Check TypeScript types without emitting application files. |
| `npm run build` | Generate the static website in `out/`. |

TypeScript strict checking is enabled, and the `@/*` import alias resolves to
`src/*`.

## Static output

From `website/`, run:

```sh
npm run typecheck
npm run build
```

The build creates `out/index.html`, `out/404.html`, and bundled assets under
`out/_next/`. The complete `out/` directory can be served by a static web host;
production does not need a Node.js application server. Generated output stays
out of version control and must be rebuilt after source changes.

`next start` is incompatible with this export mode, so the scaffold's `start`
script has been removed. Use `npm run dev` for development. The dedicated static
preview command and browser tests will be added in step 10.

Keep the application frontend-only: avoid API routes, Server Actions, and
request-time server features. Use local SVGs for artwork. If raster images are
added, pre-optimize them and configure them for static hosting rather than
relying on Next.js's runtime image optimizer.

## Source layout

- `src/content/site.ts`: typed, approved page copy and public site settings.
- `src/app/page.tsx`: slogan and section landmarks for working header navigation.
- `src/app/page.module.css`: component-scoped page styles.
- `src/app/layout.tsx`: shared header, main region, skip link, footer, and metadata.
- `src/app/globals.css`: design variables, reset, keyboard focus, and system font.
- `src/components/SiteHeader.tsx` and `SiteFooter.tsx`: shared navigation and footer.
- `src/app/not-found.tsx`: custom 404 page with a homepage link.
- `next.config.ts`: Next.js configuration with `output: "export"`.

## Content and public settings

Edit `src/content/site.ts` to maintain the page's content in one place:

- `siteConfig` holds the company name, public business email, and public site URL.
  `email` and `url` are explicitly `null` until real values are supplied. Future
  contact and URL metadata components must handle these unset values without
  rendering placeholder destinations.
- `siteContent` holds the approved hero, services, approach, process, and contact
  wording from `PAGE_DESIGN.md`. Service IDs are stable identifiers; process steps
  have stable IDs and explicit `order` values.
- The current homepage reads its company name and slogan from this module.
  Document metadata uses the company name and the approved hero description.
  The remaining section content will be rendered in step 5.

These values are public and available at build time. Keep credentials out of this
file. Rebuild the static export after changing content or settings.

## Shared page shell

The header links to `/#services`, `/#approach`, and `/#contact`; its company link
returns to `/#top`. These homepage-prefixed URLs also work from the 404 page.
The section destinations currently show only their headings. Step 5 will add
their full approved content.

Press Tab on a freshly loaded page to reveal **Skip to content**, then Enter to
move focus to the main region. Interactive links have visible focus outlines.
The header and footer wrap on narrow screens without a JavaScript menu.

Edit the variables at the top of `src/app/globals.css` to tune the off-white,
charcoal, and coral palette, type sizes, spacing, content width, and transition
durations. A system font is used until a local font is selected. The shell and
its navigation work without JavaScript or animation.

The export includes the custom `out/404.html`. A production static host must be
configured to serve it with HTTP 404 for unknown paths. During development,
Next.js handles that routing automatically.

No backend, credentials, external font downloads, or UI framework are required.
A committed Playwright test suite is planned for step 10. Step 4 browser checks
used isolated tooling in the ignored `.tools/` directory.

The scaffold's optional ESLint tooling was removed: its dependency chain included
an unpatched `braces` advisory (GHSA-vfj7-8cjw-p6xm). The planned validation uses
TypeScript checking and, later, browser tests.

## Step 1 validation

- `npm run build`: passed.
- `node node_modules/typescript/bin/tsc --noEmit`: passed.
- `npm audit --json` with registry access: zero reported vulnerabilities.

The build required permission to spawn worker processes outside the restricted
development sandbox. Browser and visual checks have not been performed at this
initialization stage.

## Step 2 validation

- `npm run typecheck`: passed.
- `npm run build`: passed with static export enabled.
- Confirmed `out/index.html` and `out/404.html` were generated.
- Confirmed the company name and slogan are present in the exported HTML.
- Verified all eight homepage asset references resolve to exported files:
  two stylesheets and six JavaScript files.
- Confirmed `out/` remains ignored by Git.

## Step 3 validation

- `npm run typecheck` and `npm run build`: passed.
- Compared all 17 copy entries against `PAGE_DESIGN.md` without rewriting them.
- Confirmed unique service/process IDs and explicit process ordering of 1, 2, 3.
- Confirmed the email and public URL are `null`.
- Checked that the exported homepage and metadata use the shared content and
  contain no placeholder email or canonical links.

## Step 4 validation

- `npm run typecheck` and `npm run build`: passed.
- Eight browser check groups passed against the exported site in Microsoft Edge
  155.0.4283.62 using a temporary Playwright installation:
  - Homepage content, document language, and semantic header/main/footer regions.
  - Keyboard skip link, visible focus outline, and focus transfer to main content.
  - All header section links, company link, and footer return-to-top link.
  - No horizontal overflow at 320, 375, 768, and 1440px viewport widths.
  - Text contrast: body 13.79:1, muted text 5.37:1, accent text 5.54:1.
  - Visible content and working navigation with JavaScript disabled and reduced
    motion enabled.
  - Custom 404 returned with HTTP 404, correct title, homepage return link, and
    working section links back to the homepage.
  - No browser runtime errors.
- Visually reviewed desktop, mobile, and 404 screenshots. Temporary screenshots
  and the JSON check report are in the ignored `.tools/` directory.
- The local preview server was configured to return the exported `404.html` for
  unknown paths, matching the intended static hosting behavior.

Firefox, Safari/WebKit, and real mobile devices were not tested in this step.
