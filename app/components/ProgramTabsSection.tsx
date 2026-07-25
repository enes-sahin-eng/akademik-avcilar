import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProgramTabsSection.module.css';

export const ProgramTabsSection = () => {
  const [activeTab, setActiveTab] = useState('tum');

  const programCards = [
    { id: 1, category: 'nitelikli', title: 'Prep Temel\nİngilizce Kursu', img: '/slider1.webp', flags: ['🇬🇧'] },
    { id: 2, category: 'nitelikli', title: 'Prep Plus İngilizce\nKursu', img: '/slider2.webp', flags: ['🇬🇧'] },
    { id: 3, category: 'nitelikli', title: 'Academic\nİngilizce Kursu', img: '/slider3.webp', flags: ['🇬🇧'] },
    { id: 4, category: 'nitelikli', title: 'Academic Plus\nKursu', img: '/slider1.webp', flags: ['🇬🇧'] },
    { id: 5, category: 'nitelikli', title: 'Genel İngilizce\nKursu', img: '/slider2.webp', flags: ['🇬🇧'] },
    { id: 6, category: 'nitelikli', title: 'İngilizce Özel Ders', img: '/slider3.webp', flags: ['🇬🇧'] },
    { id: 7, category: 'nitelikli', title: 'Kurumlara Özel /\nKurumsal İngilizce\nKursu', img: '/slider1.webp', flags: ['🇬🇧'] },
    { id: 8, category: 'sinav', title: 'YDS Hazırlık Kursu', img: '/slider2.webp', flags: ['🇬🇧'] },
    { id: 9, category: 'sinav', title: 'YKS-DİL (YDT)\nHazırlık Kursu', img: '/slider3.webp', flags: ['🇬🇧'] },
    { id: 10, category: 'sinav', title: 'TOEFL Hazırlık\nKursu', img: '/slider1.webp', flags: ['🇬🇧'] },
    { id: 11, category: 'sinav', title: 'IELTS Hazırlık\nKursu', img: '/slider2.webp', flags: ['🇬🇧'] },
    { id: 12, category: 'sinav', title: 'Hazırlık Atlama\nKursu -\nProficiency', img: '/slider3.webp', flags: ['🇬🇧'] },
    { id: 13, category: 'sinav', title: 'GMAT', img: '/slider1.webp', flags: ['🇬🇧'] },
    { id: 14, category: 'sinav', title: 'Almanca Goethe\nSınavı Hazırlık\nKursu', img: '/slider2.webp', flags: ['🇩🇪'] },
    { id: 15, category: 'sinav', title: 'SAT Kursu', img: '/slider3.webp', flags: ['🇬🇧'] },
    { id: 16, category: 'sinav', title: 'PTE Kursu', img: '/slider1.webp', flags: ['🇬🇧'] },
    { id: 17, category: 'sinav', title: 'TELC Kursu', img: '/slider2.webp', flags: ['🇩🇪', '🇬🇧'] },
  ];

  const filteredCards = activeTab === 'tum' 
    ? programCards 
    : programCards.filter(c => c.category === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Avcılar İngilizce Dil Kursu'nda Verilen Programlar
        </h2>
        <p className={styles.subtitle}>
          Avcılar İngilizce Kursu - En İyi Yabancı Dil Kursu Tavsiye Avcılar
        </p>

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'tum' ? styles.active : ''}`}
            onClick={() => setActiveTab('tum')}
          >
            TÜM PROGRAMLAR
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'nitelikli' ? styles.active : ''}`}
            onClick={() => setActiveTab('nitelikli')}
          >
            NİTELİKLİ İNGİLİZCE KURSLARI
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'sinav' ? styles.active : ''}`}
            onClick={() => setActiveTab('sinav')}
          >
            AKADEMİK SINAV KURSLARI
          </button>
        </div>

        <div className={styles.cardsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredCards.map(card => (
              <motion.div 
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={styles.card}
              >
                <Image 
                  src={card.img} 
                  alt={card.title.replace(/\n/g, ' ')} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImg} 
                />
                <div className={styles.gradientOverlay}></div>
                
                {/* Top Right Icons (UK/GER flag + vertical icons) */}
                <div className={styles.iconStack}>
                  <div className={styles.flagsWrapper}>
                    {card.flags.map((flag, i) => (
                      <div key={i} className={styles.flagIcon}>{flag}</div>
                    ))}
                  </div>
                  <div className={styles.smallIcons}>
                    <span>💬</span>
                    <span>📖</span>
                    <span>✍️</span>
                    <span>🎧</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3>
                    {card.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
