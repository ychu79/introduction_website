import { siteContent } from "@/content/site";
import styles from "./Sections.module.css";

export default function Approach() {
  return (
    <section className={`${styles.section} ${styles.approach}`} id="approach" aria-labelledby="approach-heading">
      <div className={styles.heading}>
        <span className={styles.number} aria-hidden="true">02</span>
        <h2 id="approach-heading">{siteContent.approach.heading}</h2>
      </div>
      <p className={styles.description}>{siteContent.approach.description}</p>
      <ol className={styles.process} aria-label="Project process">
        {siteContent.processSteps.map((step) => (
          <li key={step.id} value={step.order}>{step.label}</li>
        ))}
      </ol>
    </section>
  );
}
