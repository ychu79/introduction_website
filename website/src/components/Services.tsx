import { siteContent } from "@/content/site";
import styles from "./Sections.module.css";

export default function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.heading}>
        <span className={styles.number} aria-hidden="true">01</span>
        <h2 id="services-heading">Services</h2>
      </div>
      <div className={styles.services}>
        {siteContent.services.map((service) => (
          <article className={styles.service} key={service.id} aria-labelledby={`${service.id}-heading`}>
            <h3 id={`${service.id}-heading`}>{service.title}</h3>
            <p className={styles.description}>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
