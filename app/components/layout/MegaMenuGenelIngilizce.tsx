"use client";
import Image from 'next/image';

import React from "react";
import { motion } from "framer-motion";
import { Telescope, GraduationCap, Users, UserSquare, Building, Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./MegaMenu.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";

export const MegaMenuGenelIngilizce: React.FC = () => {
  const dict = useDictionary();
  const megaMenu = dict?.megaMenuGenelIngilizce;
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "tr";

  if (!megaMenu) return null;

  return (
    <motion.div
      className={styles.megaMenuContainer}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.megaMenuLeft}>
        <div className={styles.megaMenuColumns}>
          {/* Sütun 1 */}
          <div className={styles.col}>
            {megaMenu.col1.map((section: any, idx: number) => (
              <div key={idx} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.iconWrapper}>
                    {idx === 0 ? <Telescope size={24} /> : <GraduationCap size={24} />}
                  </div>
                  <div>
                    <a 
                      href={idx === 0 ? `/${currentLocale}/ingilizce-kursu` : `/${currentLocale}/akademik-ingilizce-kursu`}
                      className={styles.sectionTitle}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      {section.title}
                    </a>
                    <p className={styles.sectionSubtitle}>{section.subtitle}</p>
                  </div>
                </div>
                <ul className={styles.itemList}>
                  {section.items.map((item: string, i: number) => {
                    const normalizedItem = item.toLowerCase();
                    let slug = "#";
                    
                    if (normalizedItem.includes("prep plus")) {
                      slug = "temel-ingilizce-kursu-hazirlik-plus";
                    } else if (normalizedItem.includes("prep") || (normalizedItem.includes("hazırlık") && !normalizedItem.includes("plus"))) {
                      slug = "temel-ingilizce-kursu-hazirlik";
                    } else if (normalizedItem.includes("akademik express") || normalizedItem.includes("academic express")) {
                      slug = "academic-express-ingilizce-kursu";
                    } else if (normalizedItem.includes("akademik plus") || normalizedItem.includes("academic plus")) {
                      slug = "academic-plus-ingilizce-kursu";
                    } else if (normalizedItem.includes("akademik") || normalizedItem.includes("academic")) {
                      slug = "academic-ingilizce-kursu";
                    }
                    
                    const href = slug !== "#" ? `/${currentLocale}/${slug}` : "#";
                    
                    return (
                      <li key={i} className={styles.item}>
                        <a href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                          <span className={styles.dot}>•</span> {item}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Sütun 2 */}
          <div className={styles.col}>
            {megaMenu.col2.map((section: any, idx: number) => (
              <div key={idx} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.iconWrapper}>
                    <Users size={24} />
                  </div>
                  <div>
                    <div className={styles.sectionTitle}>{section.title}</div>
                    <p className={styles.sectionSubtitle}>{section.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alt Linkler Şeridi */}
        <div className={styles.bottomLinksStrip}>
          {megaMenu.bottomLinks.map((link: any, idx: number) => (
            <a href="#" key={idx} className={styles.bottomLink}>
              {idx === 0 && <UserSquare size={20} />}
              {idx === 1 && <Building size={20} />}
              {idx === 2 && <Languages size={20} />}
              <span>{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sağ Taraf - Promosyon */}
      <div className={styles.megaMenuRight}>
        <div className={styles.promoTitle}>{megaMenu.promo.title}</div>
        {/* Placeholder görsel (Gerçek görsel yerine css tasarımı ya da placehoder image) */}
        <div className={styles.promoImageWrapper}>
           <Image 
             src="https://picsum.photos/seed/grammar/200/280" 
             alt="Academic Express" title="Academic Express" 
             className={styles.promoImage} 
           width={40} height={40} />
        </div>
        <button className={styles.promoBtn}>{megaMenu.promo.button}</button>
      </div>
    </motion.div>
  );
};
