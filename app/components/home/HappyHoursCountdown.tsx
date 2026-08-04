"use client";

import React, { useState, useEffect } from "react";
import styles from "./HappyHoursBanner.module.css";

interface Props {
  labels: { days: string; hours: string; minutes: string };
  initial?: { days: number; hours: number; minutes: number };
}

/**
 * Sadece geri sayım rakamlarını güncelleyen client bileşen.
 * Etiket metinleri server component'tan prop olarak gelir.
 */
export const HappyHoursCountdown = ({
  labels,
  initial = { days: 9, hours: 12, minutes: 20 },
}: Props) => {
  const [timeLeft, setTimeLeft] = useState(initial);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) minutes -= 1;
        else if (hours > 0) {
          hours -= 1;
          minutes = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
        }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.timerGrid}>
      <div className={styles.timerBlock}>
        <span className={styles.timerValue}>{timeLeft.days}</span>
        <span className={styles.timerLabel}>{labels.days}</span>
      </div>
      <div className={styles.timerBlock}>
        <span className={styles.timerValue}>{timeLeft.hours}</span>
        <span className={styles.timerLabel}>{labels.hours}</span>
      </div>
      <div className={styles.timerBlock}>
        <span className={styles.timerValue}>{timeLeft.minutes}</span>
        <span className={styles.timerLabel}>{labels.minutes}</span>
      </div>
    </div>
  );
};
