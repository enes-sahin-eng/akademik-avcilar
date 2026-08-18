"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Phone as PhoneIcon, Send } from "lucide-react";
import styles from "./Contact.module.css";
import { buildLeadMailto } from "../../../src/utils/mailto";


export const ContactFormSectionClient: React.FC<{
  formData: any;
  mapData: any;
  campuses: any[];
}> = ({ formData, mapData, campuses }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("Avcılar");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildLeadMailto({
      name,
      phone,
      branch,
      source: "İletişim Sayfası Formu",
    });
  };

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
          
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formBox}>
              <div className={styles.boxTitle}>
                <span className={styles.boxIcon}>📝</span> {formData.formTitle || "Ön Bilgi Formu"}
              </div>
              <p className={styles.boxDesc}>{formData.formDesc || "Nitelikli dil eğitimlerimiz hakkında detaylı bilgi için hemen formu doldurunuz."}</p>

              <div className={styles.inputGroup}>
                <User size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder={formData.namePlaceholder || "İsim ve soyisim giriniz..."}
                  className={styles.formInput}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <PhoneIcon size={18} className={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder={formData.phonePlaceholder || "Telefon Numarası"}
                  className={styles.formInput}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  minLength={10}
                  pattern="[\d\s\+\-\(\)]{10,}"
                  title="Lütfen geçerli bir telefon numarası giriniz (Örn: 0532 123 45 67)"
                />
              </div>
              <div className={styles.inputGroup}>
                <MapPin size={18} className={styles.inputIcon} />
                <select className={styles.formInput} value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {campuses?.map((campus: any, index: number) => (
                    <option key={index} value={campus.name}>
                      {campus.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.submitBtn}>
                <Send size={16} /> {formData.submitBtn || "Gönder"}
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
              src={`https://maps.google.com/maps?q=${encodeURIComponent("Avcılar Akademik Yabancı Dil Kursları - Avcılar İngilizce Kursu, Merkez, Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul")}&t=&z=16&ie=UTF8&iwloc=&output=embed`} 
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
