import { siteContent } from "@/content/site";
import styles from "./Hero.module.css";
import sectionStyles from "./Sections.module.css";

export default function Hero() {
  const { heading, description, buttonLabel, buttonHref } = siteContent.hero;

  return (
    <section className={styles.hero} id="introduction" aria-labelledby="intro-heading">
      <h1 className={styles.title} id="intro-heading">{heading}</h1>
      <p className={styles.description}>{description}</p>
      <a className={sectionStyles.action} href={buttonHref}>
        {buttonLabel}
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
