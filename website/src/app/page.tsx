import { siteConfig, siteContent } from "@/content/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <p className={styles.company}>{siteConfig.companyName}</p>
      <h1 className={styles.title}>{siteContent.hero.heading}</h1>
    </main>
  );
}
