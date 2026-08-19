"use client";

import { useState, useEffect } from "react";
import { X, User, Phone, MapPin, Send, Sparkles } from "lucide-react";
import styles from "./Contact.module.css";
import { FormSuccessModal } from "../ui/FormSuccessModal";

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState(campuses[0]?.name || "Avcılar");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, branch, source: "İletişim Sayfası - Kampüs Başvurusu" }),
      });
      if (!res.ok) throw new Error("Gönderim başarısız");
      setStatus("sent");
      setName("");
      setPhone("");
      setOpen(false);
    } catch {
      setStatus("error");
    }
  };

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
            <button type="button" className={styles.modalClose} onClick={() => setOpen(false)} aria-label="Kapat">
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
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <User size={17} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder={formData?.namePlaceholder || "İsim ve Soyisim"}
                  className={styles.formInput}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <Phone size={17} className={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder={formData?.phonePlaceholder || "Telefon Numarası"}
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
                <MapPin size={17} className={styles.inputIcon} />
                <select className={styles.formInput} value={branch} onChange={(e) => setBranch(e.target.value)}>
                  {campuses.map((campus, i) => (
                    <option key={i} value={campus.name}>
                      {campus.label || campus.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.modalSubmitBtn} disabled={status === "sending"}>
                <Send size={16} />
                {status === "sending" ? "Gönderiliyor..." : formData?.submitBtn || "Başvuru Gönder"}
              </button>
              {status === "error" && (
                <p style={{ color: "#ff8a8a", fontSize: 12, fontWeight: 600, textAlign: "center", marginTop: 8 }}>
                  Bir şeyler ters gitti, lütfen tekrar deneyin.
                </p>
              )}
            </form>

            <p className={styles.modalDisclaimer}>
              Formu doldurarak Yasal Uyarı / Kullanım Şartlarını kabul ediyorum.
            </p>
          </div>
        </div>
      )}

      <FormSuccessModal
        open={status === "sent"}
        onClose={() => setStatus("idle")}
        desc="Kampüs başvurunuz bize ulaştı, en kısa sürede sizi arayacağız."
      />
    </>
  );
};
