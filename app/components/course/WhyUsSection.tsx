import React from "react";
import styles from "./WhyUsSection.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { AnimatedAdvantageStack } from "./AnimatedAdvantageStack";
import { WhyUsAccordion } from "./WhyUsAccordion";

interface Props {
  courseKey: string;
  lang: Locale;
}

export const WhyUsSection = async ({ courseKey, lang }: Props) => {
  const dictionary = await getDictionary(lang);
  const pageData = (dictionary as any)[courseKey]?.whyUs;

  if (!pageData) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{pageData.title}</h2>
          <p className={styles.subtitle}>{pageData.subtitle}</p>
        </div>

        <div className={styles.contentWrapper}>
          {/* Left: Animated Card Stack for Advantages */}
          <div className={styles.advantagesGrid}>
            <AnimatedAdvantageStack
              advantages={pageData.advantages}
              btnNext={pageData.btnNext}
            />
          </div>

          {/* Right: Accordion FAQs */}
          <div className={styles.accordionContainer}>
            <WhyUsAccordion faqs={pageData.faqs || []} styles={styles} />
          </div>
        </div>
      </div>
    </section>
  );
};
