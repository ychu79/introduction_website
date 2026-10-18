# BDBMego Technologies — Page Design Specification

## Design intent

Create a compact, approachable, professional introduction page. Visitors should quickly understand what BDBMego builds, why its approach can keep costs under control, and how to discuss a project.

The copy below was selected by the founder. The visual details are proposed defaults for discussion, rather than finalized brand decisions.

## Reference direction

- [Forgeline Studio](https://forgeline-studio.com/): Clear services, a straightforward process, and an accessible introduction to an independent studio.
- [Bytewren](https://bytewren.com/): Presenting websites and mobile apps as a coherent service offering.
- [Built by Buffalo](https://builtbybuffalo.com/): Friendly language and an approachable agency personality.

Use these as inspiration for clarity, organization, and tone. Develop an original visual identity for BDBMego.

## Proposed visual system

| Element | Proposed treatment |
| --- | --- |
| Overall feel | Light, spacious, confident, and friendly. |
| Background | Warm off-white, such as `#F8FAF7`. |
| Primary text | Deep slate, such as `#17211D`. |
| Secondary text | Muted slate, such as `#526158`. |
| Brand accent | Deep green, such as `#16634A`, for buttons and selected details. |
| Soft accent | Pale green, such as `#EAF3ED`, for the approach panel or small highlights. |
| Borders | Subtle gray-green, such as `#DCE5DE`. |
| Typography | One readable sans-serif family, such as locally bundled Geist Sans, with a system sans-serif fallback. |
| Cards | Modest rounded corners, thin borders, and minimal shadows. |
| Icons | Small, consistent outline icons for websites, mobile apps, and custom software. |
| Imagery | Optional simple geometric decoration built in CSS or SVG; no stock team photos or simulated client projects. |

Validate the final color combinations for accessible contrast during implementation.

Use a centered content container with a maximum width of approximately 1120px. Allow roughly 80–104px between major sections on desktop and 48–64px on mobile. Keep paragraphs comfortably narrow, around 60–65 characters per line.

## Header

- Show **BDBMego Technologies** as a text wordmark until a logo is available.
- Include compact links: **Services**, **Our approach**, and **Contact**.
- Point the wordmark to the top of the page.
- On small screens, allow a simple second row of links rather than adding a menu drawer.
- A normal, non-sticky header is sufficient for this short page.

## 1. Introduction

### Selected copy

**Big ideas. Lean budgets. Built well.**

Custom websites, mobile apps, and software built around your business. We combine AI-powered development with hands-on expertise to help bring your ideas to life at a price that makes sense.

**Button:** Let’s talk about your idea

### Layout and behavior

- Make the headline the strongest visual element, with deliberate line breaks where space allows.
- Use approximately 56–72px headline text on desktop and 36–44px on mobile, adjusted to avoid awkward wrapping.
- Place the supporting paragraph directly below, followed by one prominent button.
- Keep the introduction primarily typographic; an illustration is optional.
- The button links to `#contact` on the same page.
- Avoid quantified savings, client counts, or quality badges without evidence.

## 2. Services

**Section heading:** What we build

### Selected copy

**Websites**

Make your business stand out with a fast, responsive website designed around your brand and goals.

**Mobile apps**

Bring your idea to your customers’ fingertips with apps for iOS and Android.

**Custom software**

Simplify everyday work with tools, dashboards, and applications built for the way your business operates.

### Layout and behavior

- Use three equally weighted cards in a row on wide screens and a single column on small screens.
- Give each card a simple icon, a heading, and its short description.
- Keep the cards informational; they do not need separate detail pages or buttons.
- Use `id="services"` as the navigation target.
- Confirm iOS and Android delivery capabilities before publishing the selected mobile app copy.

## 3. Approach and process

### Selected copy

**Powered by AI. Guided by people.**

We use multiple AI agents to accelerate development and reduce repetitive work. Every project is guided, reviewed, and tested by a developer—keeping your requirements at the center and development costs under control.

### Selected process

**Tell us your idea → Agree on the scope and quote → We design, build, and test**

### Layout and behavior

- Give this section a pale green background or a softly bordered panel to distinguish it from the services.
- Keep the explanation in ordinary language; visitors do not need agent names, model details, or a technical architecture diagram.
- Place the process below the explanation as three numbered steps.
- Arrange the steps horizontally on desktop and vertically on mobile, preserving their order.
- Treat arrows as decorative and use an ordered list for the actual process structure.
- Use `id="approach"` as the navigation target.
- Confirm that developer guidance, review, and testing describe the actual delivery process before launch.

## 4. Contact

### Selected copy

**What would you like to build?**

Tell us a little about your idea, the problem you want to solve, and any timeline or budget you have in mind. It’s okay if you’re still figuring things out.

**Button:** Email us about your project

**Visible address:** [Business email address — to be supplied]

### Layout and behavior

- Use a generous, uncluttered closing section with a clear heading and one primary action.
- Set the section target to `id="contact"`.
- Once the real address is supplied, link the button and visible address using `mailto:`.
- An optional prefilled subject is **Project inquiry — BDBMego Technologies**; encode it correctly in the link.
- Keep the email address selectable and allow long addresses to wrap on small screens.
- Do not show a message-sent confirmation: the website opens an email application and cannot verify delivery.
- Do not publish a fabricated email address or an unverified response-time promise.

## Footer

Keep the footer minimal: **© [publication year] BDBMego Technologies**. Add social links only if real company profiles are provided.

## Responsive behavior and accessibility

- Keep the same content and reading order on all screen sizes.
- Use approximately 20px side padding on mobile and 32–48px on larger screens.
- Use a body text size of at least 16px, with comfortable line spacing.
- Make primary links and buttons easy to tap, aiming for a minimum height of 44px.
- Use one `h1`, section-level `h2` headings, and `h3` headings for service cards.
- Provide a skip-to-content link and visible keyboard focus styles.
- Use semantic header, navigation, main, section, and footer elements.
- Hide purely decorative icons from assistive technology.
- Keep all essential content visible without waiting for animation or JavaScript.

## Motion and interaction

Use short, subtle hover and focus transitions. Smooth anchor scrolling is optional and must respect reduced-motion preferences. Avoid scroll hijacking, autoplay video, carousels, and large animated backgrounds for this initial version.

## Suggested metadata

**Page title:** BDBMego Technologies | Custom Websites, Apps & Software

**Description:** Custom websites, mobile apps, and software built around your business. Discover BDBMego Technologies’ AI-powered, developer-guided approach.

Set the canonical URL and sharing image when the domain and visual identity are available.

## Boundaries for the initial design

No portfolio, testimonials, invented client logos, pricing tiers, account system, contact form, or separate service pages are needed. Keep the emphasis on the selected message, the three services, a credible process, and email contact.
