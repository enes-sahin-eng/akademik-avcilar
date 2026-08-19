"use client";

import React, { useState } from "react";
import styles from "./Footer.module.css";
import { FormSuccessModal } from "../ui/FormSuccessModal";

interface Props {
  footerData: any;
}

export const NewsletterForm = ({ footerData }: Props) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setHasError(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email, source: "Footer Bülten Aboneliği" }),
      });
      if (!res.ok) throw new Error("Gönderim başarısız");
      setEmail("");
      setShowSuccess(true);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
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
              className={styles.sendBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? footerData.sendingBtn : footerData.sendBtn}
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
          {hasError && (
            <p style={{ color: "#ff8a8a", fontSize: 12, fontWeight: 600 }}>
              Bir şeyler ters gitti, lütfen tekrar deneyin.
            </p>
          )}
        </form>
      </div>

      <FormSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={footerData.successTitle}
        desc={footerData.successDesc}
      />
    </>
  );
};
