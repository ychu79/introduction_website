// Cloudflare's existing `npm run build` command must validate release settings.
// Ordinary local builds still support an unset URL for development previews.
if (process.env.CF_PAGES === "1") {
  await import("./validate-release.mjs");
}
