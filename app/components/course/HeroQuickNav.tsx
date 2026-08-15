import React from 'react';
import { getDictionary, type Locale } from '../../dictionaries/getDictionary';
import { InteractiveCard } from '../ui/InteractiveCard';
import styles from './HeroQuickNav.module.css';

interface Props {
  lang: Locale;
}

const cardStyles = [
  {
    image: null,
    themeColor: "#1e3a8a",
    gradient: "linear-gradient(to right, #0f172a, #1e3a8a)",
  },
  {
    image: null,
    themeColor: "#701a75",
    gradient: "linear-gradient(to right, #4a044e, #701a75)",
  },
  {
    image: null,
    themeColor: "#0f766e",
    gradient: "linear-gradient(to right, #042f2e, #0f766e)",
  },
  {
    // Bu kartın Unsplash görseli kaynakta silinmiş (404) — hiçbir zaman
    // render edilmiyordu. Görünüm aynı kalsın diye görselsiz bırakıldı.
    image: null,
    themeColor: "#7f1d1d",
    gradient: "linear-gradient(to right, #450a0a, #7f1d1d)",
  }
];

export const HeroQuickNav = async ({ lang }: Props) => {
  const dictionary = await getDictionary(lang);
  const quickNav = (dictionary as any)?.quickNav || [];

  if (!quickNav || quickNav.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridContainer}>
        {quickNav.map((item: any, index: number) => {
          const style = cardStyles[index] || cardStyles[0];
          
          // Next.js Link needs to include locale prefix if it's internal
          const href = item.link.startsWith('/') && item.link !== '/' 
            ? `/${lang}${item.link}` 
            : item.link === '/' 
              ? `/${lang}` 
              : item.link;

          const cardData = {
            title: item.title,
            description: item.desc,
            image: style.image,
            themeColor: style.themeColor,
            gradient: style.gradient,
            iconName: item.icon, 
            href: href,
            btnText: item.btn
          };

          return <InteractiveCard key={index} card={cardData} />;
        })}
      </div>
    </div>
  );
};
