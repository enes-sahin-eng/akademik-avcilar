import React from "react";
import styles from "./Contact.module.css";
import anim from "../motion/animations.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

interface Props {
  lang: Locale;
}

export const ContactCorporate = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const corporateData = dict?.iletisim?.corporate;

  if (!corporateData) return null;

  return (
    <div className={`${styles.corporateSection} ${anim.fadeUp}`}>
      <div className={styles.corporateCard}>
        <div className={styles.corporateItem}>
          <div className={styles.corporateTitle}>{corporateData.title1}</div>
          <div className={styles.corporateValue}>{corporateData.value1}</div>
        </div>
        <div className={styles.corporateItem}>
          <div className={styles.corporateTitle}>{corporateData.title2}</div>
          <div className={styles.corporateValue}>{corporateData.value2}</div>
        </div>
      </div>
    </div>
  );
};
