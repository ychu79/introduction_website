# BDBMego Technologies website

Next.js application for the BDBMego Technologies introduction page.

## Current stage

Implementation step 1: application initialization. The starter contains a minimal
company page, TypeScript, App Router, a `src/` directory, and CSS Modules. Motion
is installed for the later animation step. Static export, the full page design,
browser tests, and deployment are later steps in
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
| `npm run build` | Compile the application for production. |
| `npm run start` | Run the current scaffold's production server after a build. |

Static export and a dedicated type-check command will be configured in step 2.
The `start` command is for the current scaffold; it will not be the preview
command once static export is enabled.

## Source layout

- `src/app/page.tsx`: minimal homepage using the approved company name and slogan.
- `src/app/page.module.css`: component-scoped page styles.
- `src/app/layout.tsx`: document shell and basic metadata.
- `src/app/globals.css`: minimal global styles and system-font fallback.
- `next.config.ts`: Next.js configuration, ready for step 2.

No backend, credentials, external font downloads, or UI framework are required.
Playwright will be added when browser tests are introduced.

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
