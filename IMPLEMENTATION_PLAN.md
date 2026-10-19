# BDBMego Technologies — Code Implementation Plan

## Purpose

Implement and publish the website defined in [PROJECT_PLAN.md](PROJECT_PLAN.md) and [PAGE_DESIGN.md](PAGE_DESIGN.md). Refer to those files for copy, visual direction, and scope; this plan covers the code, verification, and deployment work.

The steps below are proposed implementation choices. Execute them in order, with the page working before adding animation. This is still a planning document; no application code has been created.

## Technical baseline

- Next.js App Router and TypeScript.
- Static export with `output: 'export'`.
- CSS Modules for component styles and CSS variables for shared design values.
- Motion for React for scroll-linked animation; SVG/CSS for graphics.
- npm and a committed lockfile.
- Playwright for a small set of browser smoke tests.

## Step 1 — Initialize the application

1. Check Git status and installed Node.js/npm versions. Preserve existing documents and user changes.
2. Create the application in a new `website/` directory using a stable Next.js scaffold with TypeScript, App Router, and `src/` enabled. Use CSS Modules rather than adding a UI framework.
3. Install compatible stable dependencies. Add `motion` for animation and `@playwright/test` as a development dependency when browser tests are introduced.
4. Remove scaffold demonstration content and unused assets.
5. Record the supported Node.js version in `package.json` and the README. Commit the generated dependency lockfile when committing the application.
6. Ignore `node_modules/`, `.next/`, `out/`, test reports, and local environment files.

**Result:** a clean application directory with reproducible installation.

## Step 2 — Configure static output and project commands

1. Set `output: 'export'` in `website/next.config.ts`.
2. Add scripts for `dev` (`next dev`), `build` (`next build`), and `typecheck` (`tsc --noEmit`).
3. Keep TypeScript strict checking enabled and configure `@/*` to resolve to `src/*`.
4. Avoid API routes, Server Actions, runtime data fetching, and other features that need a production application server.
5. Use local SVG assets. If raster images are introduced, pre-optimize them and use a static-compatible image configuration rather than the default runtime image optimizer.
6. Run the initial build and confirm that `out/index.html` and its assets exist.

**Result:** a minimal Next.js page that can be served as static files. Next.js documents this setup in its [static export guide](https://nextjs.org/docs/app/guides/static-exports).

## Step 3 — Create the content and configuration module

**File:** `src/content/site.ts`

1. Define typed objects for the hero, services, approach, process steps, and contact section.
2. Copy the selected wording from `PAGE_DESIGN.md` without rewriting it.
3. Give service items stable identifiers and process steps explicit ordering.
4. Store the company name, email address, and public site URL in one configuration object.
5. Represent the missing email and URL explicitly as unset values. Do not invent an address or render a working-looking link to a placeholder.
6. Keep all values public and build-time readable; this page needs no credentials in its application code.

**Result:** components consume one source of content, and later contact/domain changes require editing one place.

## Step 4 — Implement the document shell and shared styles

**Files:** `src/app/layout.tsx`, `src/app/globals.css`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`

1. Set the document language, global stylesheet, base page title, and description in the root layout.
2. Load a licensed local font using `next/font/local`, or start with a system font fallback until the font is selected.
3. Define CSS variables for the agreed palette, typography scale, spacing, content width, and motion durations. Keep exact values easy to tune.
4. Add a small CSS reset, consistent box sizing, readable body styles, and visible keyboard focus styles.
5. Create a simple header with links to stable section IDs and a company link to the page top.
6. Add a skip-to-content link, a semantic main region, and a minimal footer.
7. Create `src/app/not-found.tsx` with a link back to the homepage.

**Result:** a reusable page shell with working navigation and no dependency on animation.

## Step 5 — Build the page sections

**Files:** `src/app/page.tsx`, section components, and their CSS Modules

1. Implement `Hero.tsx` with one `h1`, the approved supporting paragraph, and an anchor link to `#contact`.
2. Implement `Services.tsx` by mapping the typed service data to semantic content blocks with stable keys.
3. Implement `Approach.tsx` with the selected explanation and an ordered list for the process.
4. Implement `Contact.tsx` with the selected invitation and a conditional contact action. Show an explicit development placeholder while the email is unset.
5. Compose the components in `page.tsx` in the documented order.
6. Keep non-interactive sections as default App Router components, rendered at build time. Add client boundaries only where browser behavior requires them.
7. Give every section a unique ID and logical heading level. Use `scroll-margin-top` where needed so navigation does not obscure a heading.
8. Check that the complete page is readable and navigable before introducing scroll effects.

**Result:** all approved content is implemented as a working static page.

## Step 6 — Implement responsive styling

**Files:** `src/app/globals.css` and component CSS Modules

1. Start with the narrow-screen layout and add wider layouts when the content has enough space.
2. Use a bounded content container, fluid side padding, and `clamp()` where useful for heading sizes and spacing.
3. Change service and process layouts from stacked to multi-column as space permits.
4. Allow the header, long headings, and email address to wrap without horizontal overflow.
5. Reserve space for the artwork before it loads or animates.
6. Add hover and focus treatments to links and buttons without changing their dimensions.
7. Review approximately 375px, 768px, and 1440px widths, plus a narrow 320px case and browser zoom.
8. Tune the unresolved font, exact shades, and composition against the existing design direction using the rendered page.

**Result:** a complete static layout ready for animation, without mobile content collisions.

## Step 7 — Implement the central scroll animation

**Files:** `src/components/ScrollExperience.tsx`, `src/components/ScrollArtwork.tsx`, and their CSS Module

1. Build the artwork as a static SVG/CSS composition first. Mark decorative graphics `aria-hidden` and prevent them from capturing pointer events.
2. Add a small `ScrollExperience` client wrapper around the intended scroll region. Pass the static section content through its `children` slot so animation does not require converting every section to a client component.
3. Attach a ref to that wrapper and use Motion's `useScroll` to obtain progress over the defined region.
4. Map progress to a small set of translation, rotation, scale, and opacity values with `useTransform`. Keep animation ranges separate from the drawing markup for easy adjustment.
5. Prototype the start, middle, and end states in the page. The exact sequence remains a visual implementation decision, not a new content requirement.
6. Use Motion values rather than React state updates on every scroll event. Avoid animating layout dimensions or reading layout repeatedly in a scroll handler.
7. Keep native scrolling and ensure the artwork never blocks navigation or contact. Only use sticky positioning if the layout supports it without an excessive scroll distance.
8. Provide a simpler mobile arrangement using the same artwork and reduced movement ranges.
9. Use `useReducedMotion` and CSS media queries to render a static state when reduced motion is requested.
10. Keep meaningful text visible by default, including before hydration and with JavaScript disabled.
11. Check forward/reverse scrolling, viewport resizing, loading at `#contact`, and rapidly jumping between section links.

**Result:** one bounded scroll transformation integrated with the page. See [Motion scroll utilities](https://motion.dev/docs/react-use-scroll) and [reduced-motion support](https://motion.dev/docs/react-use-reduced-motion).

## Step 8 — Finalize email contact

**Files:** `src/content/site.ts`, `src/components/Contact.tsx`

1. Obtain the actual public business email and replace the unset value.
2. Use the same configuration value for the visible address and both email links.
3. Construct a `mailto:` link; encode any optional subject text correctly.
4. Keep the address selectable and readable on small screens.
5. Verify the destination address in the rendered HTML and confirm that activation opens an email handler where configured.
6. Remove the development placeholder. Do not add submission state or a sent confirmation because the site cannot verify email delivery.

**Result:** a working contact path without adding a backend.

## Step 9 — Add production metadata and assets

**Files:** `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, and `public/`

1. Add the final page title and description through Next.js metadata.
2. Create a favicon and static social-sharing image using the page's visual identity.
3. Once hosting provides the production URL, set `metadataBase`, canonical URL, and social-sharing URLs from the shared configuration.
4. Generate robots and sitemap output at build time, using static-compatible metadata routes. Explicitly force static generation where required by the installed Next.js version.
5. Give assets predictable local paths; remove unused files and compress any raster assets.
6. Add a small `scripts/validate-release.mjs` command that fails when the launch email or public HTTPS URL is missing. Keep this release check separate from ordinary development builds.

**Result:** a release build with correct URLs, contact details, and sharing assets.

## Step 10 — Verify the production export

**Files:** `playwright.config.ts`, `tests/home.spec.ts`, and `package.json`

1. Add `serve` as a development dependency, `test:e2e` (`playwright test`), and `preview` (`serve out -l 4173`). Serve the exported files without a single-page-app fallback so missing paths remain detectable. Do not use `next start` to preview a static export.
2. Configure browser tests against that exported build. Install and record the browser engines available in the environment.
3. Add a small set of meaningful tests: section navigation reaches its target, contact links use the configured email, narrow layouts do not overflow, and key content remains visible with reduced motion and JavaScript disabled.
4. Run `npm run typecheck`, `npm run build`, and `npm run test:e2e` from `website/`.
5. Review the actual page with keyboard navigation, visible focus, heading structure, color contrast, and browser zoom.
6. Visually inspect animation quality, mobile scrolling, font loading, and layout shifts. Do not rely on automated assertions to judge the artwork.
7. Check available Chromium, Firefox, and WebKit behavior and document any unavailable browser or real-device coverage.
8. Fix failures, then repeat affected checks. Rebuild after changes before testing the export again.

**Result:** a verified static artifact with a short record of checks and any limitations.

## Step 11 — Configure and execute public deployment

The proposed route is Sites static hosting. The application remains portable; confirm the hosting destination and any account/cost requirements before provisioning it.

1. Obtain the business email and hosting access if still missing. A custom domain is optional for the first public release.
2. Check for an existing `website/.openai/hosting.json` project ID. Reuse it if present; otherwise register the Site once and persist the returned ID with `static.directory` set to `out`.
3. Obtain the expected public URL and update the site configuration before the release build.
4. Run release validation and the production checks. Through the Sites workflow, build and package the matching source version using the supported build helper; do not mix an old export with newer source.
5. Save the verified version. Configure public access for the requested launch and deploy that saved version using the public-compatible operation.
6. Wait for successful deployment and record the deployed version, source commit, and public URL.
7. Open the URL in a signed-out session and verify the page, assets, navigation, email links, and mobile layout.
8. If a custom domain is supplied, configure the host-provided DNS records without disturbing email records. Wait for HTTPS, update URL metadata, rebuild, and redeploy.
9. If the chosen hosting account cannot serve the site publicly, report the restriction and select another static host before calling the task complete.

**Result:** the verified site is accessible at a public HTTPS URL without signing in. Deployment should follow the installed [Sites workflow](C:/Users/45086/.codex/plugins/cache/openai-curated-remote/sites/1.0.2-remix-b.1/skills/sites/SKILL.md).

## Step 12 — Document maintenance and hand off

**File:** `website/README.md`

1. Record the required Node.js version and commands for installation, development, type checking, building, testing, and local export preview.
2. Document the content/configuration file, shared style variables, and animation components.
3. Explain how to rebuild and redeploy after changing the email, copy, or domain.
4. Record the production URL and deployment procedure without storing credentials.
5. Explain how to redeploy a previous verified version if a future release fails.
6. Report what was implemented, what was tested, the public URL, and any remaining limitations.

**Result:** the site can be maintained and redeployed without reconstructing this conversation.

## Completion criteria

The work is complete when the exported site implements the two source documents, passes the relevant checks, has functioning email links and scroll behavior, and is accessible publicly. A local preview or private deployment is an intermediate result.
