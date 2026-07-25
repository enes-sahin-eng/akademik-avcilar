"use client";

import React from "react";
import { motion } from "framer-motion";
import { Telescope, GraduationCap, Users, UserSquare, Building, Languages } from "lucide-react";
import styles from "./MegaMenu.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const MegaMenuGenelIngilizce: React.FC = () => {
  const dict = useDictionary();
  const megaMenu = dict?.megaMenuGenelIngilizce;

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
                    <div className={styles.sectionTitle}>{section.title}</div>
                    <p className={styles.sectionSubtitle}>{section.subtitle}</p>
                  </div>
                </div>
                <ul className={styles.itemList}>
                  {section.items.map((item: string, i: number) => (
                    <li key={i} className={styles.item}>
                      <span className={styles.dot}>•</span> {item}
                    </li>
                  ))}
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
           <img 
             src="https://picsum.photos/seed/grammar/200/280" 
             alt="Academic Express" 
             className={styles.promoImage} 
           />
        </div>
        <button className={styles.promoBtn}>{megaMenu.promo.button}</button>
      </div>
    </motion.div>
  );
};
