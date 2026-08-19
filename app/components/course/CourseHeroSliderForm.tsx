"use client";

import { useState } from "react";
import styles from "./CourseHeroSlider.module.css";
import { FormSuccessModal } from "../ui/FormSuccessModal";

interface Props {
  heroData: any;
  campuses: any[];
}

export const CourseHeroSliderForm = ({ heroData, campuses }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("Avcılar");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          branch,
          source: `${heroData?.title || "Kurs Sayfası"} Hero Formu`,
        }),
      });
      if (!res.ok) throw new Error("Gönderim başarısız");
      setStatus("sent");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder={heroData.namePlaceholder}
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="tel"
          placeholder={heroData.phonePlaceholder}
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          minLength={10}
          pattern="[\d\s\+\-\(\)]{10,}"
          title="Lütfen geçerli bir telefon numarası giriniz (Örn: 0532 123 45 67)"
        />
      </div>

      <div className={styles.inputGroup}>
        <select
          className={styles.input}
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          aria-label={heroData.branchPlaceholder || "Şube Seçiniz"}
        >
          {campuses.map((campus: any, index: number) => (
            <option key={index} value={campus.name}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
        {status === "sending" ? "Gönderiliyor..." : heroData.submitBtn}
      </button>
      {status === "error" && (
        <div className={styles.formFooter} style={{ color: "#ff8a8a" }}>
          Bir şeyler ters gitti, lütfen tekrar deneyin.
        </div>
      )}
      <div className={styles.formFooter}>
        {heroData.formDisclaimer || "Bilgi formunu doldurarak, Yasal Uyarı/Kullanım Şartlarını kabul ediyorum."}
      </div>

      <FormSuccessModal
        open={status === "sent"}
        onClose={() => setStatus("idle")}
        desc="Bilgileriniz bize ulaştı, en kısa sürede sizi arayacağız."
      />
    </form>
  );
};
