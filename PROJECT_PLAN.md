# BDBMego Technologies — Project Overview and Plan

## What we are building

A welcoming, single-page company website for BDBMego Technologies, a newly founded software development business. The company designs and implements custom websites, mobile apps, and software for clients based on their requirements.

The website should help potential clients understand what the company offers, how its development approach makes projects more affordable, and how to start a conversation by email.

This is an introduction and inquiry website. Project requirements, quotes, payments, and delivery are handled outside the website.

## Audience and positioning

The primary audience is small businesses, founders, and people with a product idea who need help designing and building it. Visitors may have little technical knowledge or may still be working out their requirements.

The core message is quality development at an accessible price. Multiple AI agents help accelerate development and reduce repetitive work, with a developer guiding, reviewing, and testing the result.

Lead with customer benefits and explain AI as part of the process. Avoid unsupported savings percentages, guaranteed outcomes, or claims that the company is the cheapest option.

## Agreed content direction

- Opening headline: **Big ideas. Lean budgets. Built well.**
- Services: websites, mobile apps, and custom software.
- Approach headline: **Powered by AI. Guided by people.**
- Process: **Tell us your idea → Agree on the scope and quote → We design, build, and test**
- Contact headline: **What would you like to build?**

The full selected copy and proposed visual treatment are in [PAGE_DESIGN.md](PAGE_DESIGN.md).

## Page structure

1. **Introduction:** Company identity, a memorable headline, a short explanation, and a button leading to contact.
2. **Services:** Three concise cards explaining what clients can commission.
3. **Approach:** How AI agents and human oversight work together, followed by the three-step process.
4. **Contact:** A friendly invitation, a visible business email address, and an email button.

Use a compact header and footer. Keep the process within the approach section to preserve a short page.

The company has no work examples yet, so a portfolio and testimonials are outside the initial scope. A blog, pricing table, separate About page, and elaborate company history are also unnecessary for launch.

## Technical scope

- Build with Next.js and support deployment as a static export.
- Deliver a frontend-only website with no application backend, API routes, database, authentication, or server-side business logic.
- Use local content and assets; no CMS or runtime data service is needed.
- Use anchor links to navigate between page sections.
- Make the contact button a `mailto:` link that opens the visitor's configured email application. Keep the address visible and selectable as an alternative.
- Do not include a contact form or in-site payment flow.
- Support mobile, tablet, and desktop layouts.
- Include semantic markup, keyboard accessibility, readable contrast, and reduced-motion support.
- Add basic search and sharing metadata, including a page title and description. Complete domain-dependent metadata when a domain is available.

## Implementation plan

### 1. Confirm content and visual direction

- Review the selected copy and the proposed design specification.
- Supply the public business email address.
- Confirm that the advertised platforms and the description of developer oversight accurately reflect the services offered.
- Confirm or refine the proposed colors, typography, and layout.

### 2. Build the page

- Set up the Next.js project for static output.
- Implement the header, introduction, service cards, approach, contact section, and footer.
- Apply responsive styling and a small amount of optional motion.
- Connect the anchor links and email contact action.

### 3. Validate

- Run the production build and verify that static export succeeds.
- Check the page at mobile, tablet, and desktop widths for overflow, wrapping, and readability.
- Check keyboard navigation, visible focus states, heading order, and color contrast.
- Verify section navigation and the email link, including its destination address.
- Check metadata, loading performance, and reduced-motion behavior.
- Remove placeholders and confirm that the page makes no unsupported claims.

### 4. Prepare for launch

- Choose a static hosting destination and connect the domain when available.
- Review the completed page before publishing.
- Publishing is a later action; the current task is documentation only.

## Information still needed

| Item | Status |
| --- | --- |
| Business email address | Required before launch; not supplied yet. |
| Logo | Not supplied; a text wordmark is the proposed starting point. |
| Brand colors and typography | Proposed in the design document; not yet confirmed. |
| Domain and hosting | To be chosen before launch. |

## Definition of done

A polished, responsive introduction page that clearly explains BDBMego Technologies' services and approach, lets visitors make contact by email, and builds successfully as a static Next.js website. No backend is required, and no portfolio content is fabricated.

## Current status

Planning and content documentation only. No application code or deployment is included in this stage.
