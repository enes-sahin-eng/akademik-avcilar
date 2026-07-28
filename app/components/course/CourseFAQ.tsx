import React from "react";
import { HelpCircle } from "lucide-react";
import styles from "./CourseFAQ.module.css";
import anim from "../motion/animations.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { Accordion } from "../ui/Accordion";

interface CourseFAQProps {
  courseKey: string;
  lang: Locale;
}

export const CourseFAQ = async ({ courseKey, lang }: CourseFAQProps) => {
  const dict = await getDictionary(lang);
  const content = (dict as any)?.[courseKey]?.faq;

  if (!content) return null;

  return (
    <section className={`${styles.faqSectionWrapper} ${anim.fadeUp}`}>
      <div className={styles.container}>
        <div className={styles.faqContainer}>
          {/* Left: Title & Desc */}
          <div className={styles.faqHeader}>
            <div className={styles.iconWrapper}>
              <HelpCircle size={28} />
            </div>
            <div className={styles.headerText}>
              <h2 className={styles.title}>{content.title}</h2>
              <p className={styles.desc}>{content.desc}</p>
            </div>
          </div>

          {/* Right: Accordion */}
          <Accordion items={content.items} type="course" styles={styles} />
        </div>
      </div>
    </section>
  );
};
