import { siteConfig } from "../src/content/site.ts";
import { isIP } from "node:net";

const errors = [];
if (!siteConfig.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email)) {
  errors.push("Set siteConfig.email to the public business email.");
}

try {
  const url = new URL(siteConfig.url ?? "");
  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || url.username || url.password ||
      url.search || url.hash || url.pathname !== "/" ||
      !host.includes(".") || isIP(host) || host.startsWith("[") ||
      /(^|\.)(localhost|local|test|invalid|example)$/.test(host) ||
      /(^|\.)example\.(com|net|org)$/.test(host)) {
    throw new Error("Invalid production URL");
  }
} catch {
  errors.push("Set siteConfig.url to the public HTTPS site root supplied by hosting (no placeholder, credentials, path, query, or fragment).");
}

if (errors.length) {
  console.error(`Release validation failed:\n${errors.map(error => `- ${error}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("Release configuration is valid. Rebuild before deploying.");
}
