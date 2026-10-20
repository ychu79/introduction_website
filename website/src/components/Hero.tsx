import { siteContent } from "@/content/site";
import styles from "./Hero.module.css";
import sectionStyles from "./Sections.module.css";

export default function Hero() {
  const { heading, description, buttonLabel, buttonHref } = siteContent.hero;

  return (
    <section className={styles.hero} id="introduction" aria-labelledby="intro-heading">
      <div className={styles.copy}>
        <h1 className={styles.title} id="intro-heading">{heading}</h1>
        <p className={styles.description}>{description}</p>
        <a className={sectionStyles.action} href={buttonHref}>
          {buttonLabel}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      {/* This square reserves the artwork's space before step 7 adds motion. */}
      <div className={styles.artwork} aria-hidden="true">
        <svg width="400" height="400" viewBox="0 0 400 400" focusable="false">
          <path d="M32 32h152v152H32zM216 216h152v152H216z" fill="currentColor" />
          <circle cx="292" cy="108" r="76" fill="var(--color-accent)" />
          <circle cx="108" cy="292" r="75" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}
