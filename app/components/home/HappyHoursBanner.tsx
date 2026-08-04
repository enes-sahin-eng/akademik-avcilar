import React from "react";
import { MousePointerClick } from "lucide-react";
import styles from "./HappyHoursBanner.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { Reveal } from "../motion/Reveal";
import { HappyHoursCountdown } from "./HappyHoursCountdown";

interface Props {
  lang: Locale;
}

export const HappyHoursBanner = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const content = (dict as any)?.homeContentSection?.happyHours;

  if (!content) return null;

  return (
    <Reveal className={styles.banner} y={0} scale={0.95} duration={0.5} margin="-50px">
      <h2 className={styles.title}>{content.title}</h2>

      {/* Nabız efekti CSS @keyframes ile — JS gerekmiyor */}
      <div className={`${styles.subtitle} ${styles.subtitlePulse}`}>
        {content.subtitle}
      </div>

      <HappyHoursCountdown
        labels={{
          days: content.days,
          hours: content.hours,
          minutes: content.minutes,
        }}
      />

      <button className={styles.btn}>
        {content.btnText} <MousePointerClick size={18} />
      </button>
    </Reveal>
  );
};
