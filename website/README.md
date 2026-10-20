# BDBMego Technologies website

Next.js application for the BDBMego Technologies introduction page.

## Current stage

Implementation steps 1 through 9: application initialization, static output,
centralized content/configuration, the shared page shell, all four content
sections, responsive styling, the central scroll animation, email contact,
and production metadata/assets (production URL pending hosting).
The page includes the approved introduction, services, approach, three-step
process, and contact invitation. Production builds export HTML, CSS, and
JavaScript to `out/`. A committed browser test suite and
deployment are later steps in
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
script has been removed. Use `npm run dev` for development. The dedicated static
preview command and browser tests will be added in step 10.

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
  `email` is `bdbmego@gmail.com`; `url` remains `null` until hosting is configured.
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
A committed Playwright test suite is planned for step 10. Step 4 and 5 browser checks
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
