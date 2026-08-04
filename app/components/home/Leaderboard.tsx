import React from "react";
import { BarChart3 } from "lucide-react";
import styles from "./Leaderboard.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { Reveal } from "../motion/Reveal";
import { LeaderboardTabs } from "./LeaderboardTabs";

const dummyData = [
  { name: "E**** Y*****", program: "IELTS", score: "7.5" },
  { name: "A**** G****", program: "IELTS", score: "8.0" },
  { name: "G******* Y*******", program: "IELTS", score: "7.5" },
  { name: "T**** K******", program: "IELTS", score: "8.0" },
  { name: "E**** Y******", program: "IELTS", score: "7.5" },
  { name: "M**** Y*****", program: "IELTS", score: "7.0" },
  { name: "M**** A**", program: "IELTS", score: "7.5" },
];

interface Props {
  lang: Locale;
}

export const Leaderboard = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const content = (dict as any)?.homeContentSection?.leaderboard;

  if (!content) return null;

  return (
    <Reveal className={styles.leaderboardCard} x={30} y={0} duration={0.5}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <BarChart3 size={28} />
          <h2 className={styles.title}>{content.title}</h2>
        </div>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>

      <LeaderboardTabs tabs={content.tabs} />

      <div className={styles.tableHeader}>
        <span>{content.headers.name}</span>
        <span>{content.headers.program}</span>
        <span>{content.headers.score}</span>
      </div>

      <div className={styles.tableBody}>
        {dummyData.map((row, idx) => (
          <div key={idx} className={styles.tableRow}>
            <span>{row.name}</span>
            <span>{row.program}</span>
            <span className={styles.scoreCell}>{row.score}</span>
          </div>
        ))}
      </div>

      <button className={styles.btnAll}>{content.btnAll}</button>
    </Reveal>
  );
};
