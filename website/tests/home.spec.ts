import { test, expect, type Page } from "@playwright/test";
import { siteConfig, siteContent } from "../src/content/site";

async function expectNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

async function expectContent(page: Page) {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(siteContent.hero.heading);
  for (const text of [siteContent.hero.description, siteContent.approach.description,
    siteContent.contact.description, ...siteContent.services.map(service => service.description)]) {
    await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
}

test("content, section navigation, and contact", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expectContent(page);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.locator("main h1, main h2, main h3")).toHaveText([
    siteContent.hero.heading, "Services", ...siteContent.services.map(service => service.title),
    siteContent.approach.heading, siteContent.contact.heading,
  ]);
  for (const section of ["services", "approach", "contact", "services", "contact"]) {
    await page.getByRole("navigation").locator(`a[href="/#${section}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${section}$`));
    await expect(page.locator(`#${section} h2`)).toBeInViewport();
  }
  expect(siteConfig.email).toBeTruthy();
  const links = page.locator('#contact a[href^="mailto:"]');
  await expect(links).toHaveCount(2);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", `mailto:${siteConfig.email}`);
    await link.focus();
    await expect(link).toBeFocused();
  }
  await expect(page.getByRole("link", { name: siteConfig.email!, exact: true })).toBeVisible();
  await page.goto("/#contact");
  await expect(page.locator("#contact h2")).toBeInViewport();
  expect(errors).toEqual([]);
});

test("keyboard skip link transfers focus to main content", async ({ page, browserName }) => {
  test.skip(browserName === "webkit" && process.platform === "win32",
    "Windows WebKit skips links with Tab and Alt+Tab, also on a minimal plain HTML page; verify on Safari/macOS.");
  await page.goto("/");
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

for (const width of [320, 375, 768, 960, 1440]) {
  test(`responsive layout and enlarged text at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expectContent(page);
    await expectNoOverflow(page);
    await page.screenshot({ path: testInfo.outputPath(`layout-${width}.png`), fullPage: true });
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await expectContent(page);
    // This check covers focus styling and layout; keyboard traversal has its own test.
    await page.getByRole("link", { name: "Skip to content" }).focus();
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeInViewport();
    await expectNoOverflow(page);
  });
}

test("content and navigation without JavaScript, with reduced motion", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce",
    viewport: { width: 375, height: 812 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL!);
    await expectContent(page);
    await page.getByRole("link", { name: siteContent.hero.buttonLabel }).click();
    await expect(page.locator("#contact h2")).toBeInViewport();
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(2);
    await expectNoOverflow(page);
  } finally {
    await context.close();
  }
});

test("scroll animation reverses and respects live reduced-motion changes", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const artwork = page.locator('#introduction div[aria-hidden="true"]');
  const pieces = artwork.locator(":scope > div");
  const transforms = () => pieces.evaluateAll(items => items.map(item => getComputedStyle(item).transform));
  const scroll = async (progress: number) => {
    await page.evaluate(p => {
      const section = document.getElementById("introduction")!;
      scrollTo(0, section.getBoundingClientRect().top + scrollY + section.offsetHeight * p);
    }, progress);
  };
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await scroll(0);
    await expect.poll(async () => (await transforms()).every(value => value !== "none")).toBe(true);
    // Wait for Motion's initial scroll sample before comparing start and return states.
    await expect.poll(async () => (await transforms())[0]).toBe("matrix(1, 0, 0, 1, 0, 0)");
    const start = await transforms();
    for (const progress of [0.3, 0.65]) {
      await scroll(progress);
      await expect.poll(transforms).not.toEqual(start);
      await expectNoOverflow(page);
      await expect.poll(() => artwork.evaluate(element => {
        const outer = element.getBoundingClientRect();
        return [...element.children].every(child => {
          const rect = child.getBoundingClientRect();
          return rect.left >= outer.left - 1 && rect.right <= outer.right + 1
            && rect.top >= outer.top - 1 && rect.bottom <= outer.bottom + 1;
        });
      })).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`motion-${width}-${progress}.png`), fullPage: true });
    }
    await scroll(0);
    await expect.poll(transforms).toEqual(start);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await scroll(0.3);
  await expect.poll(transforms).toEqual(["none", "none", "none", "none"]);
  await scroll(0.65);
  await expect.poll(transforms).toEqual(["none", "none", "none", "none"]);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(transforms).not.toEqual(["none", "none", "none", "none"]);
});

test("export serves assets and a real custom 404", async ({ page, request }) => {
  for (const path of ["/favicon.svg", "/social-preview.png", "/robots.txt", "/sitemap.xml"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  const response = await page.goto("/missing-step10-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("couldn’t be found");
  await page.getByRole("link", { name: "Back to homepage" }).click();
  await expectContent(page);
  expect((await request.get("/missing-step10-asset.js")).status()).toBe(404);
});
