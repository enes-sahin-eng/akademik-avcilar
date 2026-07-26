"use client";

import React from "react";
import styles from "./EducationModels.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { CheckCircle2, Phone, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  courseKey: string;
}

export const EducationModels = ({ courseKey }: Props) => {
  const dictionary = useDictionary();
  const pageData = (dictionary as any)[courseKey]?.models;
  const params = useParams();
  const lang = params?.lang || "tr";

  if (!pageData) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{pageData.title}</h2>
        </div>

        <div className={styles.cardsGrid}>
          {/* Face to Face Card */}
          <div className={`${styles.card} ${styles.popularCard}`}>
            <div className={styles.badge}>{pageData.faceToFace.badge}</div>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{pageData.faceToFace.title}</h3>
              <p className={styles.cardDesc}>{pageData.faceToFace.desc}</p>
            </div>
            <div className={styles.cardBody}>
              <ul className={styles.featureList}>
                {pageData.faceToFace.features?.map((feat: string, index: number) => (
                  <li key={index} className={styles.featureItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.cardFooter}>
              <a 
                href="https://wa.me/905323609256?text=Merhaba%2C%20y%C3%BCz%20y%C3%BCze%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsapp}
              >
                <Phone size={18} />
                {pageData.faceToFace.btnWhatsapp}
              </a>
              <Link href={`/${lang}/iletisim`} className={styles.btnForm}>
                <FileText size={18} />
                {pageData.faceToFace.btnForm}
              </Link>
            </div>
          </div>

          {/* Online Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{pageData.online.title}</h3>
              <p className={styles.cardDesc}>{pageData.online.desc}</p>
            </div>
            <div className={styles.cardBody}>
              <ul className={styles.featureList}>
                {pageData.online.features?.map((feat: string, index: number) => (
                  <li key={index} className={styles.featureItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.cardFooter}>
              <a 
                href="https://wa.me/905323609256?text=Merhaba%2C%20online%20e%C4%9Fitim%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsapp}
              >
                <Phone size={18} />
                {pageData.online.btnWhatsapp}
              </a>
              <Link href={`/${lang}/iletisim`} className={styles.btnForm}>
                <FileText size={18} />
                {pageData.online.btnForm}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
