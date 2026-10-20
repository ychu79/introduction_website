"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion, useScroll } from "motion/react";
import ScrollArtwork from "./ScrollArtwork";
import styles from "./ScrollExperience.module.css";

export default function ScrollExperience({ children }: { children: ReactNode }) {
  const region = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: region,
    offset: ["start start", "end start"],
  });

  return (
    <section ref={region} className={styles.region} id="introduction" aria-labelledby="intro-heading">
      {children}
      <ScrollArtwork progress={scrollYProgress} reducedMotion={reducedMotion !== false} />
    </section>
  );
}
