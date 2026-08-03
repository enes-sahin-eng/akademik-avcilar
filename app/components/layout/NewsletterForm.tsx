"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Footer.module.css";

interface Props {
  footerData: any;
}

export const NewsletterForm = ({ footerData }: Props) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setEmail("");
      
      // Auto close success modal
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <>
      <div className={styles.newsletterBox}>
        <div className={styles.columnTitle}>{footerData.newsletterTitle}</div>
        <p className={styles.middleDesc}>{footerData.newsletterDesc}</p>
        <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
          <div className={styles.inputWrapper}>
            <input 
              type="email" 
              placeholder={footerData.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required 
            />
            <button 
              type="submit" 
              className={styles.subscribeBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? footerData.subscribingBtn : footerData.subscribeBtn}
            </button>
          </div>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" required />
            <span>{footerData.checkbox1}</span>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" required />
            <span>{footerData.checkbox2}</span>
          </label>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.successModal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className={styles.checkCircle}>
                <Check size={40} className={styles.checkIcon} />
              </div>
              <h3 className={styles.modalTitle}>Başarılı</h3>
              <p className={styles.modalDesc}>Abonelik Talebiniz Alınmıştır</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className={styles.modalCloseBtn}
              >
                Tamam
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
