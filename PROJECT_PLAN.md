# BDBMego Technologies — Project Overview

## What we are building

A simple welcome page for BDBMego Technologies, a recently founded company that designs and builds software, websites, and mobile apps for clients based on their needs.

The page will introduce the company's services and invite interested visitors to get in touch by email.

## Target customers and focus

People who have an idea for starting a company but have not fully worked out the product details.

BDBMego mainly focuses on building the product. There is no preference between website, mobile app, and custom software projects.

## Main message

Cost-effective, high-quality development using multiple AI agents, with human guidance, review, and testing.

Offer a more accessible price while emphasizing quality and personal service. Keep pricing private.

## Page content

1. An opening slogan and introduction.
2. Services: websites, mobile apps, and custom software.
3. The AI-assisted development approach and a short explanation of the project process.
4. An email contact section at the end.

The selected copy is recorded in [PAGE_DESIGN.md](PAGE_DESIGN.md).

Keep the original slogan and selected copy. Do not add a personal biography or an additional section describing the founder's involvement.

## Visual direction

A concise, minimal page with artistic character and moderate playfulness. Use geometric graphics, a warm off-white, charcoal, and coral palette, and one central scroll transformation that keeps the text easy to read throughout.

## Requirements

- Use Next.js.
- Keep the website frontend-only, without backend interaction.
- Keep the page simple; the company is new and has no work examples yet.

## Hosting and domain

- Host the static export on Cloudflare Pages using the Free plan within its limits.
- Connect the GitHub repository so pushes or merges to `main` automatically build
  and deploy the public website. Configure release checks as part of step 11.
- The owner purchased `bdbmego.com` through Cloudflare and connected both the apex
  and `www` hostnames to the Pages project `bdbmego-intro` over HTTPS. Domain
  registration and recurring renewal are separate from hosting costs.
- Use `https://bdbmego.com` as the canonical URL. The optional `www` redirect is
  deferred at the owner's request.
- Keep `bdbmego@gmail.com` as the public contact address. A domain purchase does
  not require changing the contact email or adding a mailbox service.

## Current stage

The page is implemented with responsive styling, scroll animation, email contact,
and production metadata/assets. Step 10 export verification has 29 passing browser
checks and one documented Windows WebKit keyboard skip at that stage. Cloudflare
Pages and both public hostnames are now set up. The release adds canonical URL
configuration, crawler metadata verification, and GitHub browser checks.
Deployment, maintenance, rollback instructions, and remaining QA coverage are in
[website/README.md](website/README.md).
