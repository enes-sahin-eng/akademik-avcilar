"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, PenSquare, User, Phone, Store, AlarmClock } from "lucide-react";
import styles from "./LeadFormModal.module.css";


export const LeadFormModalClient: React.FC<{ formDict: any }> = ({ formDict }) => {



  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleClose = () => {
    setIsOpen(false);
    setIsDismissed(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsDismissed(true);
    }, 2000);
  };

  if (!formDict) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Kapat"
              >
                <X size={20} />
              </button>

              <div className={styles.modalContent}>
                {!isSubmitted ? (
                  <>
                    <div className={styles.header}>
                      <h2 className={styles.title}>
                        <PenSquare size={24} />
                        {formDict.title}
                      </h2>
                      <p className={styles.subtitle}>{formDict.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <User size={16} className={styles.labelIcon} />
                          {formDict.nameLabel}
                        </label>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder={formDict.namePlaceholder}
                          required
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <Phone size={16} className={styles.labelIcon} />
                          {formDict.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          className={styles.input}
                          placeholder={formDict.phonePlaceholder}
                          required
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          <Store size={16} className={styles.labelIcon} />
                          {formDict.branchLabel}
                        </label>
                        <select className={styles.select} required defaultValue="">
                          <option value="" disabled>
                            {formDict.branchPlaceholder}
                          </option>
                          {formDict.branchOptions.map((branch: string, idx: number) => (
                            <option key={idx} value={branch}>
                              {branch}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button type="submit" className={styles.submitBtn}>
                        <div className={styles.submitBtnTop}>
                          <span>{formDict.submitButton}</span>
                          <Send size={18} />
                        </div>
                        <span className={styles.submitBtnBottom}>
                          {formDict.submitButtonSub}
                        </span>
                      </button>

                      <div className={styles.checkboxGroup}>
                        <input type="checkbox" id="terms" className={styles.checkbox} required />
                        <label htmlFor="terms" className={styles.checkboxLabel}>
                          {formDict.checkboxText}
                        </label>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className={styles.successContainer}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <div className={styles.successIcon}>
                        <Send size={32} />
                      </div>
                    </motion.div>
                    <h2 className={`${styles.title} ${styles.successTitle}`}>
                      {formDict.successMessage}
                    </h2>
                  </div>
                )}
              </div>

              {/* Alt Kırmızı Sayaç Banner */}
              {!isSubmitted && (
                <div className={styles.countdownBanner}>
                  <AlarmClock size={40} />
                  <div className={styles.countdownInfo}>
                    <div className={styles.countdownTitle}>{formDict.countdownTitle}</div>
                    <div className={styles.countdownNumbers}>
                      <div className={styles.numberGroup}>
                        <span className={styles.number}>9</span>
                        <span className={styles.unit}>{formDict.countdownDays}</span>
                      </div>
                      <div className={styles.numberGroup}>
                        <span className={styles.number}>13</span>
                        <span className={styles.unit}>{formDict.countdownHours}</span>
                      </div>
                      <div className={styles.numberGroup}>
                        <span className={styles.number}>28</span>
                        <span className={styles.unit}>{formDict.countdownMins}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kapatıldığında Sol Altta Beliren Yüzen Buton */}
      <AnimatePresence>
        {!isOpen && isDismissed && (
          <motion.button
            className={styles.floatingBtn}
            onClick={handleOpen}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare size={20} className={styles.floatingBtnIcon} />
            <span>{formDict.floatingButton}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
