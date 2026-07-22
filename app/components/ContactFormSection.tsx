"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, User, Phone as PhoneIcon, Send } from "lucide-react";
import styles from "./Contact.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const ContactFormSection: React.FC = () => {
  const dict = useDictionary();
  const formData = dict?.iletisim?.formSection;
  const mapData = dict?.iletisim?.mapSection;

  if (!formData || !mapData) return null;

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.formMapWrapper}>
        {/* FORM */}
        <motion.div 
          className={styles.formCard}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>{formData.title}</h2>
          <p className={styles.sectionDesc}>{formData.desc}</p>
          
          <form className={styles.contactForm}>
            <div className={styles.formBox}>
              <div className={styles.boxTitle}>
                <span className={styles.boxIcon}>📝</span> Ön Bilgi Formu
              </div>
              <p className={styles.boxDesc}>Nitelikli dil eğitimlerimiz hakkında detaylı bilgi için hemen formu doldurunuz.</p>
              
              <div className={styles.inputGroup}>
                <User size={18} className={styles.inputIcon} />
                <input type="text" placeholder="İsim ve soyisim giriniz..." className={styles.formInput} />
              </div>
              <div className={styles.inputGroup}>
                <PhoneIcon size={18} className={styles.inputIcon} />
                <input type="tel" placeholder="Telefon Numarası" className={styles.formInput} />
              </div>
              <button type="button" className={styles.submitBtn}>
                <Send size={16} /> Gönder
              </button>
            </div>
          </form>
        </motion.div>

        {/* MAP */}
        <motion.div 
          className={styles.mapCard}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.mapHeader}>
            <MapPin size={24} className={styles.mapIcon} />
            <div>
              <h3 className={styles.mapTitle}>{mapData.title}</h3>
              <p className={styles.mapDesc}>{mapData.address}</p>
            </div>
          </div>
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.65089334468!2d29.02324931566879!3d40.98910407930268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab863e46c4f75%3A0x8e833486c99c36!2zS2FkxLFrw7Z5LCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1687500000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "12px" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
