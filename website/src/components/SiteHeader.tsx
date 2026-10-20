import { siteConfig } from "@/content/site";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="/#top">
          <svg
            className={styles.mark}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0 0h16v16H0zM16 16h16v16H16z" fill="currentColor" />
            <circle cx="24" cy="8" r="8" fill="var(--color-accent)" />
          </svg>
          <span>{siteConfig.companyName}</span>
        </a>
        <nav aria-label="Primary">
          <ul className={styles.links}>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#approach">Approach</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
