"use client";

import React from "react";
import styles from "./PublicationsShowcase.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";
import { CheckCircle2 } from "lucide-react";

interface Props {
  courseKey: string;
}

export const PublicationsShowcase = ({ courseKey }: Props) => {
  const dictionary = useDictionary();
  const pageData = (dictionary as any)[courseKey]?.publications;

  if (!pageData) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>{pageData.subtitle}</div>
          <h2 className={styles.title}>{pageData.title}</h2>
          <div className={styles.features}>
            {pageData.features?.map((feature: string, index: number) => (
              <div key={index} className={styles.featureItem}>
                <CheckCircle2 size={20} className={styles.checkIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.booksGrid}>
          {pageData.books?.map((book: any, index: number) => (
            <div key={index} className={styles.bookCard}>
              <div className={styles.bookCoverPlaceholder}>
                {book.name}
              </div>
              <h3 className={styles.bookName}>{book.name}</h3>
              <p className={styles.bookType}>{book.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
