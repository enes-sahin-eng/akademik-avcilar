"use client";

import { useState } from "react";
import styles from "./CourseHeroSlider.module.css";
import { buildLeadMailto } from "../../../src/utils/mailto";

interface Props {
  heroData: any;
  campuses: any[];
}

export const CourseHeroSliderForm = ({ heroData, campuses }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("Avcılar");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildLeadMailto({
      name,
      phone,
      branch,
      source: `${heroData?.title || "Kurs Sayfası"} Hero Formu`,
    });
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

      <button type="submit" className={styles.submitBtn}>
        {heroData.submitBtn}
      </button>
      <div className={styles.formFooter}>
        {heroData.formDisclaimer || "Bilgi formunu doldurarak, Yasal Uyarı/Kullanım Şartlarını kabul ediyorum."}
      </div>
    </form>
  );
};
