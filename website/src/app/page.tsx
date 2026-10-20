import { siteContent } from "@/content/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <section className={styles.introduction} id="introduction" aria-labelledby="intro-heading">
        <h1 className={styles.title} id="intro-heading">{siteContent.hero.heading}</h1>
      </section>
      {/* Section landmarks make shell navigation usable before step 5 adds the full content. */}
      <section className={styles.section} id="services" aria-labelledby="services-heading">
        <span className={styles.number} aria-hidden="true">01</span>
        <h2 id="services-heading">Services</h2>
      </section>
      <section className={styles.section} id="approach" aria-labelledby="approach-heading">
        <span className={styles.number} aria-hidden="true">02</span>
        <h2 id="approach-heading">{siteContent.approach.heading}</h2>
      </section>
      <section className={styles.section} id="contact" aria-labelledby="contact-heading">
        <span className={styles.number} aria-hidden="true">03</span>
        <h2 id="contact-heading">{siteContent.contact.heading}</h2>
      </section>
    </div>
  );
}
