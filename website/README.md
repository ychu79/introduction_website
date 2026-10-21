# BDBMego Technologies website

Next.js application for the BDBMego Technologies introduction page.

## Current stage

The website is hosted publicly on Cloudflare Pages at https://bdbmego.com.
The production configuration uses this canonical origin for search metadata,
social sharing, robots, and sitemap output. `www.bdbmego.com` also serves the
site; the optional hostname redirect is deferred by the owner.
Production builds export HTML, CSS, and JavaScript to `out/`.
Deployment and maintenance instructions for steps 11–12 are below; historical
validation records and remaining manual coverage follow them.

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
| `npm run preview` | Serve `out/` at http://127.0.0.1:4173 with real 404 responses. |
| `npm run test:browsers` | Install Playwright Chromium, Firefox, and WebKit. |
| `npm run test:e2e` | Test an already-built export in all three browser engines. |
| `npm run validate:release` | Require a business email and public HTTPS site root before release. |

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
script has been removed. Use `npm run dev` for development and `npm run preview`
to inspect the production export. Rebuild after source changes before previewing
or testing. The preview binds to loopback and does not use an SPA fallback.

Keep the application frontend-only: avoid API routes, Server Actions, and
request-time server features. Use local SVGs for artwork. If raster images are
added, pre-optimize them and configure them for static hosting rather than
relying on Next.js's runtime image optimizer.

## Source layout

- `src/content/site.ts`: typed, approved page copy and public site settings.
- `src/app/page.tsx`: composes Hero, Services, Approach, and Contact in order.
- `src/components/Hero.tsx`, `Services.tsx`, `Approach.tsx`, and `Contact.tsx`:
  static page sections using the shared content/configuration.
- `src/components/Hero.module.css` and `Sections.module.css`: introduction styles
  and shared section, service, process, and contact styles.
- `src/app/layout.tsx`: shared header, main region, skip link, footer, and metadata.
- `src/app/globals.css`: design variables, reset, keyboard focus, and system font.
- `src/components/SiteHeader.tsx` and `SiteFooter.tsx`: shared navigation and footer.
- `src/app/not-found.tsx`: custom 404 page with a homepage link.
- `next.config.ts`: Next.js configuration with `output: "export"`.

## Content and public settings

Edit `src/content/site.ts` to maintain the page's content in one place:

- `siteConfig` holds the company name, public business email, and public site URL.
  `email` is `bdbmego@gmail.com`; `url` is `https://bdbmego.com`.
  The same address is used by the contact button and visible email link. Contact
  retains a development fallback if the email is cleared. URL metadata omits
  production links until the URL is supplied, without inventing a destination.
- `siteContent` holds the approved hero, services, approach, process, and contact
  wording from `PAGE_DESIGN.md`. Service IDs are stable identifiers; process steps
  have stable IDs and explicit `order` values.
- All four page sections read their approved content from this module. The
  header/footer use its company name; document metadata uses the company name
  and approved hero description.

These values are public and available at build time. Keep credentials out of this
file. Rebuild the static export after changing content or settings.

## Production hosting and future updates

| Setting | Value |
| --- | --- |
| Canonical URL | https://bdbmego.com |
| Additional hostname | https://www.bdbmego.com |
| Cloudflare Pages project | `bdbmego-intro` |
| Provider URL | https://bdbmego-intro.pages.dev |
| Source repository | https://github.com/ychu79/introduction_website |
| Production branch | `main` |
| Build root / output | `website` / `out` |
| Framework | Next.js static export; no OpenNext adapter |
| Build command | `npm ci && npm run typecheck && npm run build` |
| Build environment | `NODE_VERSION=24.22.0`, npm 11.x |

The `prebuild` hook runs release validation when Cloudflare sets `CF_PAGES=1`.
Thus the existing dashboard build command rejects missing/invalid production
settings before `next build`. Local development builds still permit unset
configuration; run `npm run validate:release` explicitly before a release.
Do not enable npm's `ignore-scripts` option on the host, since that bypasses
the hook. See [Cloudflare build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

Make content changes in `src/content/site.ts`; shared design variables live in
`src/app/globals.css`, and scroll behavior lives in `ScrollExperience.tsx` and
`ScrollArtwork.tsx`. For each update:

1. Create a Git branch, make the change, and install dependencies with `npm ci`
   if the lockfile changed. Install test browsers with `npm run test:browsers`.
2. From `website/`, run `npm run validate:release`, `npm run typecheck`,
   `npm run build`, and `npm run test:e2e`. Inspect visual changes with
   `npm run preview` after tests have stopped their server.
3. Push the branch and open a pull request. The `Website checks` workflow runs
   `Verify production export` on a standard Ubuntu GitHub runner, covering all
   three browser engines. It also runs on pushes to `main`. Standard runners
   for this public repository are covered by GitHub's free public-repository
   allowance; no paid runner or billing setting is enabled by this workflow.
4. Wait for checks to pass, then merge to `main`. Cloudflare's Git integration
   builds and deploys the new commit automatically. Local edits and local
   commits alone do not publish changes. GitHub checks and Cloudflare builds run
   independently; required branch checks must enforce the pre-merge gate.
   `main` requires the `Verify production export` check on an up-to-date branch,
   including for administrators; force pushes and branch deletion are disabled.
5. In Cloudflare, open Workers & Pages → `bdbmego-intro` → Deployments. Confirm
   success and the source commit, then verify the public homepage, contact,
   metadata, `/robots.txt`, `/sitemap.xml`, and a missing path returning HTTP 404.

Do not merge a failing check. If a browser is unavailable, record that limitation
explicitly rather than treating an unexecuted test as passed. Existing manual
coverage limitations are listed in the Step 10 record.

## Domain ownership and DNS

The owner purchased `bdbmego.com` through Cloudflare and is responsible for its
registration renewal, payment details, and account recovery. Review the renewal
date and auto-renew setting in the registrar dashboard; these settings have not
been independently inspected. Domain renewal is separate from Pages hosting.

Both hostnames must remain registered under the Pages project's Custom domains.
The owner's latest DNS screenshot shows proxied CNAME records:
`bdbmego.com` → `bdbmego-intro.pages.dev`, and `www.bdbmego.com` → `bdbmego.com`.
A CNAME is not an HTTP redirect. The owner deferred redirects; the canonical
metadata points to the apex domain even when viewing the additional hostname.
The provider address is also retained without a redirect.

For a future domain change, first add and activate the new hostname in Pages,
verify DNS and HTTPS, then update `siteConfig.url` and deploy through the same
checks. Preserve any email DNS records. The public contact currently remains
Gmail; this site does not configure an `@bdbmego.com` mailbox.

## Rollback and recovery

If a build fails, inspect its logs and fix the source; confirm the previous
successful deployment still serves the public site. If a successful deployment
has a regression, open Cloudflare Pages → Deployments → All deployments, select
the previous known-good production deployment's menu, and choose **Rollback to
this deployment**. Preview deployments are not rollback targets. See
[Cloudflare rollback instructions](https://developers.cloudflare.com/pages/configuration/rollbacks/).

Then revert or fix the offending commit in a new GitHub pull request, pass checks,
and merge it so future automatic deployments retain the correction. Dashboard
rollback does not revert Git history. Verify the public site after both actions.
Keep the last known-good deployment and commit identifiable in the dashboard;
do not store account credentials or API tokens in this repository.

## Historical validation records

The step records below describe the configuration and coverage at each stage.
Earlier references to unset email/URL values are historical.

### Production release validation

- Release configuration, TypeScript, and the Cloudflare-mode build passed locally.
- Local production browser suite: 32 passed, 1 documented Windows WebKit
  keyboard skip. Canonical/social URLs, robots allowing crawling, and the
  homepage sitemap are covered by the added release test.
- GitHub branch protection was configured and read back successfully for `main`.
- Public deployment verification and the final release commit are recorded in
  the release pull request and Cloudflare deployment history.
- Native browser zoom, real mobile devices, Safari/macOS keyboard behavior, and
  opening an installed mail application remain outside the verified coverage.
  No failing release was deliberately deployed to production to test recovery.

## Shared page shell

The header links to `/#services`, `/#approach`, and `/#contact`; its company link
returns to `/#top`. These homepage-prefixed URLs also work from the 404 page.
The hero's call to action links to `#contact`. Each section has a unique ID and
labelled heading; service descriptions use `article` elements with `h3` headings,
and the process uses an ordered list. All sections render at build time and need
no client component or browser JavaScript to show their content.

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
The Playwright suite is in `tests/home.spec.ts`. Step 4 and 5 browser checks
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

## Step 5 validation

- `npm run typecheck` and `npm run build`: passed; the homepage remains a static
  export.
- Eight check groups passed using temporary Playwright tooling and Microsoft
  Edge 155.0.4283.62:
  - All approved paragraphs, section order, unique IDs, and heading hierarchy.
  - Three semantic service blocks and the ordered three-step process.
  - An explicit development placeholder and no email links while email is unset.
  - Keyboard skip link, visible focus, hero contact link, and header navigation.
  - Visible content and no horizontal overflow at 320, 375, 768, and 1440px.
  - Full content and contact navigation with JavaScript disabled and reduced
    motion enabled.
  - Contact renders two matching email links when configured; null, empty, and
    whitespace values render the placeholder. This isolated render used an
    in-memory fixture; no test address was saved to source or the export.
  - No browser runtime errors.
- Visually reviewed desktop and mobile screenshots. Temporary QA script, JSON
  results, and screenshots are in the ignored `.tools/step5-*` files.

Browser coverage in this step is limited to Microsoft Edge. The real email
address is still required for launch; the current contact placeholder is
intentional.

## Step 6 responsive layout and validation

The layout starts with stacked sections. At 48rem, services and process steps
use three columns; at 60rem, the hero, approach, and contact use wider layouts.
The content container is capped at 72rem, with fluid gutters, type sizes, and
section spacing. The existing system font and warm palette are retained.
The decorative hero artwork reserves a square and does not capture pointer
events. Step 7 adds its scroll transformation.

- `npm run typecheck` and `npm run build`: passed.
- Nine check groups passed against the static export in Microsoft Edge
  155.0.4283.62 using the existing temporary Playwright tooling:
  - Layouts at 320, 375, 768, 960, and 1440px: no horizontal overflow or
    collisions between hero artwork and content.
  - 200% root text size at 320, 375, 768, and 1440px, including the focused
    skip link: content remains visible without horizontal overflow.
  - Artwork space remains reserved when the SVG is hidden.
  - Keyboard skip link, hero contact link, and header navigation work.
  - Hover and keyboard focus preserve link dimensions and show focus outlines.
  - Body, muted, and accent text contrast exceeds 4.5:1.
  - A long email wraps in the real Contact component using an in-memory fixture;
    no test address was saved to application content.
  - Content and navigation work without JavaScript and with reduced motion.
  - The narrow 404 layout works, with no browser runtime errors.
- Visually reviewed mobile, tablet, and desktop screenshots. QA scripts,
  screenshots, and results are in the ignored `.tools/step6-*` files.

Browser coverage is limited to Microsoft Edge; real devices, Firefox, and
Safari/WebKit remain unchecked. The attempted native browser zoom automation
did not apply its requested zoom level. Enlarged-text and narrow-viewport
checks passed, but manual 200% and 400% browser zoom review remains outstanding.

## Step 7 scroll experience and validation

The four hero shapes rotate, shrink, and move inward as the opening section
scrolls away. Scrolling back reverses the transformation. The sequence uses
the existing section height, with no scroll interception or sticky runway.

- `ScrollExperience.tsx` owns the hero region ref and Motion's `useScroll` and
  `useReducedMotion` hooks. Hero copy passes through its `children` slot from
  the server component; other sections remain server components.
- `ScrollArtwork.tsx` maps scroll progress to transform values without React
  state updates on each scroll event. The phase, travel, rotation, and scale
  arrays at the top of the file define the sequence.
- `ScrollExperience.module.css` owns the responsive hero grid and reserved
  artwork space. Below 60rem, translation and rotation use 45% of the desktop
  movement. Reduced motion disables transforms in both the hook and CSS.
- Text and static SVG artwork render in the exported HTML, including when
  JavaScript is disabled. Decorative graphics are hidden from assistive
  technology and cannot capture pointer events.

Validation: type checking and static production build passed. Temporary
Playwright checks in Microsoft Edge passed for forward/reverse scrolling,
resizing across 320, 375, 768, 960, and 1440px, artwork containment, horizontal
overflow, section jumps, direct `#contact` loading, live reduced-motion
changes, and content/navigation with JavaScript disabled. No browser runtime
errors were observed. Screenshots and the QA script are under `.tools/step7-*`.
Cross-browser and real-device animation review remain for the production QA
step.

## Step 8 email contact and validation

The public contact address is `bdbmego@gmail.com`. Both the contact button and
selectable address link use `mailto:bdbmego@gmail.com`, sourced from
`src/content/site.ts`. The exported page no longer shows the development
placeholder. Contact uses the visitor's email handler, with no backend,
submission state, or delivery confirmation.

- Type checking and production static build passed.
- Exported HTML contains both correct email links and no development placeholder.
- Microsoft Edge checks passed at 320, 375, 768, and 1440px: no horizontal
  overflow, selectable visible address, keyboard access, and matching link
  activation targets. Both links also render without JavaScript.
- Visually reviewed the mobile contact section. Temporary QA script and
  screenshots are under `.tools/step8-*`.

The automated check intercepted activation to verify destinations; opening an
actual configured email application remains a manual check. No email was sent.

## Step 9 metadata and assets

The root layout defines the final search title and approved description, plus
Open Graph and Twitter large-image metadata once `siteConfig.url` is supplied.
Canonical and sharing URLs use that same setting. Set it to the public HTTPS
site root supplied by hosting in step 11, then validate and rebuild.

`public/favicon.svg` repeats the page's four geometric shapes.
`public/social-preview.png` is an optimized 1200 x 630 sharing image (about 23 KB).
Its editable vector source is `scripts/social-preview.svg`; to regenerate it
with the installed Sharp dependency, run from `website/`:

```sh
node -e "require('sharp')('scripts/social-preview.svg').png({compressionLevel:9,palette:true}).toFile('public/social-preview.png')"
```

`src/app/robots.ts` and `sitemap.ts` explicitly generate static files. While
`url` is unset, robots disallows crawling, the sitemap has no URLs, and canonical
and social tags are omitted. Once configured, robots allows crawling and links
to the sitemap, which lists the homepage. No placeholder domain is emitted.

Run `npm run validate:release` before the release build. It reads the shared
TypeScript configuration using the supported Node.js 24 runtime, and exits
nonzero for a missing/invalid email or missing/non-public/non-HTTPS root URL.
Ordinary builds stay available while hosting is pending. This check validates
configuration; it does not establish DNS, TLS, or mailbox availability.

Validation: TypeScript and production export passed. The export contains the
favicon, sharing image, robots.txt, and sitemap.xml. Temporary checks covered
seven release configuration cases, metadata and asset responses, and the page
in Microsoft Edge with no browser runtime errors. Desktop/mobile screenshots
are in `.tools/step9-*.png`. Release validation currently fails as expected
because the production URL is still unset. Broader browser QA remains step 10.

## Step 10 production export verification

From `website/`, after installing dependencies:

```sh
npm run test:browsers
npm run typecheck
npm run build
npm run test:e2e
```

Playwright starts and stops the static preview server automatically. Stop any
manual preview on port 4173 first; tests deliberately refuse to reuse an existing
server. `test:e2e` does not rebuild. Use `npm run test:e2e -- --project=chromium`
to run one engine, or `npx playwright show-report` to inspect the HTML report.
Reports, screenshots, and failure traces are ignored under `playwright-report/`
and `test-results/`. Browser setup follows the
[Playwright browser installation guide](https://playwright.dev/docs/browsers).

In this Windows checkout, browsers were installed inside the ignored project
dependencies. Set this environment variable from `website/` before installing
or running browser tests to use that location:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\node_modules\.cache\ms-playwright"
```

Fresh checkouts can instead omit the variable for both commands to use
Playwright's standard browser cache. Reinstall browsers after upgrading
Playwright or removing the chosen cache.

Validation on October 20, 2026:

- Type checking and the production static build passed.
- Playwright 1.64.1: **29 passed, 1 explicitly skipped**, with no failing tests.
  Engines: Chromium 156.0.8078.4, Firefox 157.0, and WebKit 27.2 on Windows.
- Tests cover approved content and heading order, section navigation and direct
  contact loading, configured email destinations, keyboard skip-link behavior,
  layouts at 320/375/768/960/1440px, 200% root text size, focused skip-link
  visibility, JavaScript-disabled content/navigation, forward/reverse animation,
  live reduced-motion changes, artwork containment, assets, and real custom 404s.
- The Windows WebKit keyboard skip-link test is explicitly skipped. In an
  isolated plain HTML reproduction, Tab focused inputs/buttons but skipped
  links, and Alt+Tab did not resolve it. Other WebKit checks pass, including
  programmatic focus and visible skip-link layout. This is not a claim that
  Safari keyboard behavior has been verified. See the related
  [Playwright keyboard discussion](https://github.com/microsoft/playwright/issues/5609).
- Visually reviewed desktop/mobile layouts, WebKit tablet layout, and sampled
  scroll states. Text and artwork remain separate, and the artwork stays inside
  its reserved region. Chromium sampling at 375px and 1440px recorded zero
  layout-shift sum through load and scroll samples. This is a local observation,
  not field performance data or a real-device smoothness measurement.
- Computed body, muted, and accent text contrast: 13.79:1, 5.37:1, and 5.54:1.
  The system font stack requires no font downloads. Additional local visual
  samples and the review script are in ignored `.tools/step10-*` files.
- npm installation audit reported zero vulnerabilities. A scoped `serve`
  override selects patched `compression` >=1.8.2 within version 1; the preview
  server was tested with that override.

Remaining manual coverage: native 200%/400% browser zoom, Safari/macOS keyboard
navigation, real iOS/Android touch scrolling and animation smoothness, and
opening a configured email application. Enlarged-text and narrow-viewport
checks do not substitute for native browser zoom. No email was sent.

Production URL configuration and the deployment/rollback procedure are now
documented above. Release validation uses `https://bdbmego.com`.
