import { siteConfig, siteContent } from "@/content/site";
import styles from "./Sections.module.css";

export default function Contact() {
  const email = siteConfig.email?.trim();

  return (
    <section className={`${styles.section} ${styles.contact}`} id="contact" aria-labelledby="contact-heading">
      <div className={styles.heading}>
        <span className={styles.number} aria-hidden="true">03</span>
        <h2 id="contact-heading">{siteContent.contact.heading}</h2>
      </div>
      <p className={styles.description}>{siteContent.contact.description}</p>
      {email ? (
        <div className={styles.contactActions}>
          <a className={styles.action} href={`mailto:${email}`}>
            {siteContent.contact.buttonLabel}
            <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.email} href={`mailto:${email}`}>{email}</a>
        </div>
      ) : (
        <p className={styles.placeholder}>
          Development preview — business email address pending.
        </p>
      )}
    </section>
  );
}
