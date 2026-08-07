import React from "react";
import styles from "../course/WhyUsSection.module.css";
import anim from "../motion/animations.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { AnimatedAdvantageStack } from "../course/AnimatedAdvantageStack";
import { WhyUsAccordion } from "../course/WhyUsAccordion";

interface Props {
  lang: Locale;
}

export const FAQSection = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const content = (dict as any)?.homeContentSection?.faq;

  if (!content) return null;

  return (
    <section className={`${styles.section} ${anim.fadeUp4}`} style={{ marginTop: '3rem' }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.subtitle}>{content.desc}</p>
        </div>

        <div className={styles.contentWrapper}>
          {/* Left: Animated Card Stack for Advantages */}
          <div className={styles.advantagesGrid}>
            <AnimatedAdvantageStack
              advantages={content.advantages || []}
              btnNext={content.btnNext || "Daha Fazla"}
            />
          </div>

          {/* Right: Accordion FAQs */}
          <div className={styles.accordionContainer}>
            <WhyUsAccordion faqs={content.items || []} styles={styles} />
          </div>
        </div>
      </div>
    </section>
  );
};
