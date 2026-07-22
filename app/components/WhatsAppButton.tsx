"use client";

import React from "react";
import styles from "./WhatsAppButton.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

interface WhatsAppButtonProps {
  phoneNumber?: string; // Tel numaranız (Örn: 905300000000)
  message?: string; // Tıklandığında hazır gönderilecek mesaj
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "905300000000",
  message,
}) => {
  const dict = useDictionary();
  const whatsappDict = dict?.whatsapp;

  const defaultMessage =
    whatsappDict?.message ||
    "Merhaba, dil kursları hakkında bilgi almak istiyorum.";
  const finalMessage = message || defaultMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloating}
      aria-label="WhatsApp Canlı Destek"
    >
      {/* Yeşil Çevrimiçi Rozeti */}
      <span className={styles.onlineBadge}>
        {whatsappDict?.onlineText || "Çevrimiçi"}
      </span>

      {/* WhatsApp Logosu */}
      <div className={styles.iconWrapper}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.86-6.97zM12.05 20.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.197 8.197 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.21 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z" />
        </svg>
      </div>

      {/* Başlık ve Alt Başlık */}
      <div className={styles.textContainer}>
        <span className={styles.subtitle}>
          {whatsappDict?.subtitle || "7/24 Canlı Destek"}
        </span>
        <span className={styles.title}>
          {whatsappDict?.title || "WhatsApp Bilgi Hattı"}
        </span>
      </div>
    </a>
  );
};
