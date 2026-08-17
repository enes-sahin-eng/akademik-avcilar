"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import styles from "./StudentReviewsAndAwards.module.css";

interface Certificate {
  id: number | string;
  image: string;
}

interface Props {
  certificates: Certificate[];
  zoomLabel?: string;
}

/**
 * Sertifika ızgarası ve büyütme lightbox'ı — yalnızca tıklama/modal durumu
 * için client. Görseller ve metinler server component'tan prop olarak gelir.
 */
export const CertificateLightbox = ({ certificates, zoomLabel }: Props) => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <>
      <div className={styles.certificatesGrid}>
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            className={styles.certificateItem}
            onClick={() => setActiveCert(cert)}
            aria-label={zoomLabel || "Sertifikayı büyüt"}
          >
            <Image
              src={cert.image}
              alt={`Uluslararası Dil Sertifikası ${cert.id}`}
              title="Uluslararası Dil Sertifikaları"
              width={300}
              height={200}
              sizes="(max-width: 768px) 50vw, 300px"
              className={styles.certificateImg}
            />
            <span className={styles.certificateZoomHint}>
              <Expand size={15} />
            </span>
          </button>
        ))}
      </div>

      {activeCert && (
        <div
          className={styles.certModalBackdrop}
          onClick={() => setActiveCert(null)}
        >
          <div
            className={styles.certModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModalBtn}
              onClick={() => setActiveCert(null)}
              aria-label="Kapat"
            >
              ✕
            </button>
            <Image
              src={activeCert.image}
              alt={`Uluslararası Dil Sertifikası ${activeCert.id}`}
              title="Uluslararası Dil Sertifikaları"
              width={900}
              height={1200}
              className={styles.certModalImg}
            />
          </div>
        </div>
      )}
    </>
  );
};
