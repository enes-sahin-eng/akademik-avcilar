import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, Baby, Laptop, Globe, Briefcase, Award, BookOpen } from 'lucide-react';
import styles from './HeroQuickNav.module.css';
import { getDictionary, type Locale } from '../../dictionaries/getDictionary';

interface Props {
  lang: Locale;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Building2': return <Building2 size={20} />;
    case 'Baby': return <Baby size={20} />;
    case 'Laptop': return <Laptop size={20} />;
    case 'Globe': return <Globe size={20} />;
    case 'Briefcase': return <Briefcase size={20} />;
    case 'Award': return <Award size={20} />;
    case 'BookOpen': return <BookOpen size={20} />;
    default: return <ArrowRight size={20} />;
  }
};

const getThemeClass = (themeName: string) => {
  switch (themeName) {
    case 'blue': return styles.themeBlue;
    case 'purple': return styles.themePurple;
    case 'green': return styles.themeGreen;
    case 'brown': return styles.themeBrown;
    case 'darkblue': return styles.themeDarkBlue;
    case 'darkred': return styles.themeDarkRed;
    case 'olive': return styles.themeOlive;
    default: return styles.themeBlue;
  }
};

export const HeroQuickNav = async ({ lang }: Props) => {
  const dictionary = await getDictionary(lang);
  const quickNav = (dictionary as any)?.quickNav || [];

  if (!quickNav || quickNav.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {quickNav.map((item: any, index: number) => {
          
          // Next.js Link needs to include locale prefix if it's internal
          const href = item.link.startsWith('/') && item.link !== '/' 
            ? `/${lang}${item.link}` 
            : item.link === '/' 
              ? `/${lang}` 
              : item.link;

          return (
            <Link key={index} href={href} className={`${styles.card} ${getThemeClass(item.theme)}`}>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.desc}</p>
              </div>
              
              <div className={styles.footer}>
                <span className={styles.btn}>
                  {item.btn} <ArrowRight size={14} />
                </span>
                <div className={styles.iconWrapper}>
                  {getIcon(item.icon)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
