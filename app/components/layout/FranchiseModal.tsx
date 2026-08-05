"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./FranchiseModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  labels: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    checkboxLabel: string;
    submitBtn: string;
    successMsg: string;
  };
}

export const FranchiseModal = ({ isOpen, onClose, labels }: Props) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", agreed: false });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", message: "", agreed: false });
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Kapat">
          <X size={16} />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{labels.title}</h2>
        </div>

        {submitted ? (
          <p className={styles.success}>{labels.successMsg}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>{labels.nameLabel}</label>
              <input
                type="text"
                className={styles.input}
                placeholder={labels.namePlaceholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{labels.phoneLabel}</label>
              <input
                type="tel"
                className={styles.input}
                placeholder={labels.phonePlaceholder}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{labels.emailLabel}</label>
              <input
                type="email"
                className={styles.input}
                placeholder={labels.emailPlaceholder}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{labels.messageLabel}</label>
              <textarea
                className={styles.textarea}
                placeholder={labels.messagePlaceholder}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
              />
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                id="franchise-agree"
                className={styles.checkbox}
                checked={form.agreed}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                required
              />
              <label htmlFor="franchise-agree" className={styles.checkboxLabel}>
                {labels.checkboxLabel}
              </label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {labels.submitBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
