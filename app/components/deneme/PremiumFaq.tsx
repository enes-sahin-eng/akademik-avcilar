"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PremiumFaq.module.css";
import { Plus } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Eğitimler ne kadar sürüyor, program esnek mi?",
    answer: "Eğitim sürelerimiz mevcut İngilizce seviyenize ve ulaşmak istediğiniz hedeflere göre özel olarak planlanmaktadır. Standart bir kur genellikle 8-10 hafta sürer. Ayrıca çalışan profesyoneller ve öğrenciler için hafta içi akşam ile hafta sonu gibi tamamen esnek, VIP sınıflarımız mevcuttur."
  },
  {
    id: 2,
    question: "Native speaker (yabancı uyruklu) hocalarınız var mı?",
    answer: "Kesinlikle. Akademik International olarak, dilin sadece gramerden ibaret olmadığına inanıyoruz. Bu nedenle 'Speaking' ve pratik odaklı derslerimizde doğrudan anadili İngilizce olan (Native Speaker) ve pedagojik formasyona sahip uzman eğitmenlerimizle çalışıyoruz."
  },
  {
    id: 3,
    question: "YDS, IELTS veya TOEFL gibi sınavlara özel programlar var mı?",
    answer: "Evet, akademik sınavlarda Türkiye derecesi çıkaran köklü bir geçmişimiz var. YDS, YÖKDİL, IELTS, TOEFL ve PTE gibi hem ulusal hem uluslararası sınavlar için; tamamen taktik, test tekniği ve zaman yönetimine dayalı özel kapalı grup eğitimlerimiz bulunmaktadır."
  },
  {
    id: 4,
    question: "Kurumlara özel (Corporate) eğitim veriyor musunuz?",
    answer: "Şirketlerin sektörüne (Havacılık, Tıp, Hukuk, Mühendislik vb.) ve çalışanların mesleki terminoloji ihtiyaçlarına göre özel müfredatlar hazırlıyoruz. Eğitimleri ister kendi VIP şubelerimizde ister doğrudan şirketinizin ofisinde on-site olarak gerçekleştirebiliyoruz."
  },
  {
    id: 5,
    question: "Kayıt olmadan önce seviyemi nasıl öğrenebilirim?",
    answer: "Her öğrencimiz eğitim sürecine başlamadan önce mutlaka 4 aşamalı (Okuma, Yazma, Dinleme, Konuşma) detaylı bir Placement Test (Seviye Tespit Sınavı) aşamasından geçer. Bu sınav tamamen ücretsizdir ve sonucunuza göre size en uygun program çizilir."
  }
];

export default function PremiumFaq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={styles.header}
        >
          <h2 className={styles.title}>Sıkça Sorulan Sorular</h2>
        </motion.div>

        <div className={styles.accordionContainer}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={faq.id} className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <motion.div 
                    className={styles.iconWrapper}
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Plus size={20} strokeWidth={2} className={styles.icon} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, type: "spring", bounce: 0, damping: 25 }}
                      className={styles.accordionContentWrapper}
                    >
                      <div className={styles.accordionContent}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
