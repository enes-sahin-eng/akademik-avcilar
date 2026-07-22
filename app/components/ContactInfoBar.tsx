"use client";

import React from "react";
import { PhoneCall, MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./ContactInfoBar.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

export const ContactInfoBar: React.FC = () => {
  const dict = useDictionary();
  const info = dict?.contactInfoBar;

  if (!info) return null;

  const telLink = `tel:${info.phoneNumber.replace(/\s+/g, "")}`;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Üst Kırmızı Telefon Kartı */}
      <motion.a 
        href={telLink} 
        className={styles.phoneCard}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className={styles.phoneIconWrapper}
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        >
          <PhoneCall size={40} />
        </motion.div>
        <div className={styles.phoneTextWrapper}>
          <span className={styles.phoneLabel}>
            {info.phoneLabel.split(" ").map((word: string, idx: number, arr: string[]) => (
              <React.Fragment key={idx}>
                {word}
                {idx === 0 ? <br /> : idx !== arr.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </span>
          <span className={styles.phoneNumber}>{info.phoneNumber}</span>
        </div>
      </motion.a>

      {/* Alt Adres Kartı */}
      <motion.div 
        className={styles.addressCard}
        whileHover={{ scale: 1.01, backgroundColor: "rgba(30, 15, 20, 0.8)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      >
        <div className={styles.addressContent}>
          <motion.div 
            className={styles.mapIconWrapper}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <MapPin size={32} />
          </motion.div>
          <div className={styles.addressTextWrapper}>
            <span className={styles.addressTitle}>{info.addressTitle}</span>
            <span className={styles.addressText}>{info.addressText}</span>
          </div>
        </div>

        <motion.a
          href={info.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.directionsBtn}
          whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
          whileTap={{ scale: 0.95 }}
        >
          <Navigation size={24} />
          <span className={styles.directionsBtnText}>
            {info.directionsButton}
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};
