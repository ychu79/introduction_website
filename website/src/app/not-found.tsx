import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: `Page not found | ${siteConfig.companyName}`,
  description: `This page could not be found. Return to the ${siteConfig.companyName} homepage.`,
};

export default function NotFound() {
  return (
    <div className={`container ${styles.content}`}>
      <p className={styles.code}>404</p>
      <h1>This page couldn’t be found.</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <a className={styles.homeLink} href="/">Back to homepage <span aria-hidden="true">&rarr;</span></a>
    </div>
  );
}
