"use client";

import { motion, useMotionTemplate, useTransform, type MotionValue } from "motion/react";
import styles from "./ScrollExperience.module.css";

// Finish while the artwork is still visible; native scrolling needs no extra runway.
const phases = [0, 0.3, 0.65];
const travel = [0, 12, 23];
const turn = [0, 45, 90];
const size = [1, 0.88, 0.78];

function Piece({ progress, reducedMotion, index }: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  index: number;
}) {
  const xDirection = index % 2 === 0 ? 1 : -1;
  const yDirection = index < 2 ? 1 : -1;
  const x = useTransform(progress, phases, travel.map(value => value * xDirection));
  const y = useTransform(progress, phases, travel.map(value => value * yDirection));
  const rotate = useTransform(progress, phases, turn.map(value => value * xDirection));
  const scale = useTransform(progress, phases, size);
  const transform = useMotionTemplate`translate(calc(${x}% * var(--motion-strength)), calc(${y}% * var(--motion-strength))) rotate(calc(${rotate}deg * var(--motion-strength))) scale(${scale})`;

  return (
    <motion.div className={styles.piece} style={{ transform: reducedMotion ? "none" : transform }}>
      <svg width="152" height="152" viewBox="0 0 152 152" focusable="false">
        {index === 1 ? (
          <circle cx="76" cy="76" r="76" fill="var(--color-accent)" />
        ) : index === 2 ? (
          <circle cx="76" cy="76" r="75" fill="none" stroke="currentColor" strokeWidth="2" />
        ) : (
          <path d="M0 0h152v152H0z" fill="currentColor" />
        )}
      </svg>
    </motion.div>
  );
}

export default function ScrollArtwork({ progress, reducedMotion }: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  return (
    <div className={styles.artwork} aria-hidden="true">
      {[0, 1, 2, 3].map(index => (
        <Piece key={index} index={index} progress={progress} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
