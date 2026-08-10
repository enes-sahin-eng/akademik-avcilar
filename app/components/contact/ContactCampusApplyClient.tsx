"use client";

import { useState, useEffect } from "react";
import { X, User, Phone, MapPin, Send, Sparkles } from "lucide-react";
import styles from "./Contact.module.css";

interface Props {
  buttonLabel: string;
  campuses: { name: string; label: string }[];
  formData?: {
    namePlaceholder?: string;
    phonePlaceholder?: string;
    branchPlaceholder?: string;
    submitBtn?: string;
  };
}

export const ContactCampusApplyClient = ({ buttonLabel, campuses, formData }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className={styles.campusApplyBtn} onClick={() => setOpen(true)}>
        {buttonLabel}
      </button>

      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button className={styles.modalClose} onClick={() => setOpen(false)} aria-label="Kapat">
              <X size={20} />
            </button>

            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalBadge}>
                <Sparkles size={12} />
                Ücretsiz Ön Bilgilendirme
              </div>
              <h2 className={styles.modalTitle}>Kampüs Başvurusu</h2>
              <p className={styles.modalSubtitle}>
                Size en uygun şubemizde ücretsiz ön bilgilendirme için formu doldurun, sizi arayalım.
              </p>
            </div>

            {/* Form */}
            <form className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <User size={17} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder={formData?.namePlaceholder || "İsim ve Soyisim"}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <Phone size={17} className={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder={formData?.phonePlaceholder || "Telefon Numarası"}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <MapPin size={17} className={styles.inputIcon} />
                <select className={styles.formInput} defaultValue="">
                  <option value="" disabled hidden>
                    {formData?.branchPlaceholder || "Şube Seçiniz"}
                  </option>
                  {campuses.map((campus, i) => (
                    <option key={i} value={campus.name}>
                      {campus.label || campus.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" className={styles.modalSubmitBtn}>
                <Send size={16} />
                {formData?.submitBtn || "Başvuru Gönder"}
              </button>
            </form>

            <p className={styles.modalDisclaimer}>
              Formu doldurarak Yasal Uyarı / Kullanım Şartlarını kabul ediyorum.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
