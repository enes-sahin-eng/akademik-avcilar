import React from "react";
import { Info } from "lucide-react";
import styles from "./FAQSection.module.css";
import anim from "../motion/animations.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { Accordion } from "../ui/Accordion";

interface Props {
  lang: Locale;
}

export const FAQSection = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const content = (dict as any)?.homeContentSection?.faq;

  if (!content) return null;

  return (
    <div className={`${styles.faqContainer} ${anim.fadeUp4}`}>
      <div className={styles.faqHeader}>
        <Info size={28} className={styles.infoIcon} />
        <div className={styles.headerText}>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.desc}>{content.desc}</p>
        </div>
      </div>
      <Accordion items={content.items} type="faq" styles={styles} />
    </div>
  );
};
