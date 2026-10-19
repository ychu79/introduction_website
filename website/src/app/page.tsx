import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <p className={styles.company}>BDBMego Technologies</p>
      <h1 className={styles.title}>Big ideas. Lean budgets. Built well.</h1>
    </main>
  );
}
