import React from "react";
import styles from "./CoursePricing.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { Check } from "lucide-react";

interface Props {
  courseKey: string;
  lang: Locale;
}

export const CoursePricing = async ({ courseKey, lang }: Props) => {
  const dictionary = await getDictionary(lang);
  const data = (dictionary as any)[courseKey]?.coursePricing;

  if (!data || !data.cards || data.cards.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>

        <div className={styles.grid}>
          {data.cards.map((card: any, index: number) => {
            const isPopular = card.isPopular;
            return (
              <div 
                key={index} 
                className={`${styles.card} ${isPopular ? styles.popularCard : ''}`}
              >
                {isPopular && card.popularBadge && (
                  <div className={styles.badge}>{card.popularBadge}</div>
                )}
                
                <h3 className={styles.tier}>{card.tier}</h3>
                
                <div className={styles.priceContainer}>
                  <div className={styles.price}>{card.price}</div>
                  <div className={styles.priceDetail}>{card.priceDetail}</div>
                </div>

                <div className={styles.divider}></div>

                <ul className={styles.featuresList}>
                  {card.features.map((feature: string, idx: number) => (
                    <li key={idx} className={styles.featureItem}>
                      <Check className={styles.checkIcon} size={20} strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={styles.button}>
                  {card.btnText || (lang === 'tr' ? 'Detaylı Bilgi Al' : lang === 'ar' ? 'الحصول على تفاصيل' : 'Get Details')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
