"use client";

import React, { useState } from "react";
import styles from "./UpcomingProgramsTable.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props {
  tableData: {
    title?: string;
    programs: {
      code: string;
      start: string;
      end: string;
      status?: string;
      quotaTotal?: number;
      quotaFilled?: number;
      link?: string;
    }[];
    startDateLabel?: string;
    remainingDays?: string;
    startsToday?: string;
    started?: string;
    urgentSpots?: string;
    spotsLeft?: string;
    quotaFilledText?: string;
    detailBtn?: string;
    statusFull?: string;
    generalProgram?: string;
    modal?: {
      weekdays?: string;
      description?: string;
      daysLabel?: string;
      daysValue?: string;
      hoursLabel?: string;
      hoursValue?: string;
      durationLabel?: string;
      durationValue?: string;
      classSizeLabel?: string;
      classSizeValue?: string;
      features?: string[];
      reserveBtn?: string;
      pageBtn?: string;
      statusFullText?: string;
      statusClosingText?: string;
      statusOpenText?: string;
    };
  };
  lang: string;
}

export const UpcomingProgramsTableClient = ({ tableData, lang }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [modalProgram, setModalProgram] = useState<Props["tableData"]["programs"][0] | null>(null);
  // now rendered istemci tarafında stabil, SSR/client fark önemli değil
  // (sadece gün hesabı için; render sırasında doğrudan hesaplanır)
  const now = new Date();

  if (!tableData) return null;

  // Array of glow classes to loop through for the card background
  const glowClasses = [styles.glowGreen, styles.glowOrange, styles.glowRed, styles.glowBlue];

  return (
    <motion.div 
      className={styles.tableWrapper}
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {tableData.title && (
        <h2 className={styles.sectionTitle}>{tableData.title}</h2>
      )}
      <div className={styles.gridContainer}>
        {tableData.programs.map((prog: Props["tableData"]["programs"][number], i: number) => {
          const isExpanded = expandedId === i;
          const quotaTotal = prog.quotaTotal || 12;
          const quotaFilled = prog.quotaFilled || (prog.status === 'full' ? 12 : 0);
          const remainingSpots = quotaTotal - quotaFilled;
          const progressPercent = Math.min(100, Math.max(0, (quotaFilled / quotaTotal) * 100));
          
          let daysLeft = 0;
          if (now) {
            const startDate = new Date(prog.start);
            daysLeft = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
          }

          const isUrgentSpots = remainingSpots > 0 && remainingSpots < 5;
          const isMediumSpots = remainingSpots >= 5 && remainingSpots <= 8;
          const isFull = prog.status === 'full' || remainingSpots <= 0;

          // Theme colors based on index for the card's radial glow
          const glowClass = glowClasses[i % glowClasses.length];
          
          // Progress bar color logic based on remaining spots
          let fillClass = styles.fillGreen;
          if (isFull) {
            fillClass = styles.fillFull;
          } else if (isUrgentSpots) {
            fillClass = styles.fillUrgent;
          } else if (isMediumSpots) {
            fillClass = styles.fillOrange;
          }

          // Text color logic for "X KİŞİLİK YER" text — computed for possible future use
          const _spotsTextClass = isUrgentSpots
            ? styles.spotsUrgent
            : isMediumSpots
            ? styles.spotsOrange ?? styles.spotsGreen
            : styles.spotsGreen;
          void _spotsTextClass;
          
          // Remaining time text calculation
          let timeText = "";
          if (daysLeft > 0) {
             timeText = tableData.remainingDays?.replace('{days}', daysLeft.toString()) || `${daysLeft} Gün`;
          } else if (daysLeft === 0) {
             timeText = tableData.startsToday || "Bugün Başlıyor";
          } else {
             timeText = tableData.started || "Başladı";
          }

          return (
            <motion.div 
              key={i} 
              className={`${styles.programCard} ${glowClass}`}
              onClick={() => setExpandedId(isExpanded ? null : i)}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              layout
            >
              {/* Header: Date + Pill */}
              <motion.div className={styles.cardHeader} layout="position">
                <div className={styles.dateBlock}>
                  <div className={styles.dateLabelWrapper}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>{tableData.startDateLabel || "BAŞLANGIÇ TARİHİ"}</span>
                  </div>
                  <span className={styles.startDate}>{prog.start.split('-').reverse().join('.')}</span>
                </div>
                
                <div className={styles.headerRight}>
                  <div className={`${styles.pill} ${styles.countdownPill}`}>
                    {timeText}
                  </div>
                </div>
              </motion.div>
              
              {/* Body: Titles */}
              <motion.div className={styles.cardBody} layout="position">
                <h3 className={styles.programName}>{prog.code.split(" (")[0]}</h3>
                <span className={styles.programLevel}>
                  {prog.code.includes("(") ? "(" + prog.code.split(" (")[1] : (tableData.generalProgram || "Genel Program")}
                </span>
              </motion.div>

              {/* Progress Section */}
              <motion.div className={styles.progressSection} layout="position">
                <div className={styles.progressHeader}>
                  <div className={styles.pillWrapper}>
                    {isFull ? (
                      <div className={`${styles.pill} ${styles.fullPill}`}>
                        {tableData.statusFull?.toUpperCase() || 'KONTENJAN DOLDU'}
                      </div>
                    ) : isUrgentSpots ? (
                      <div className={`${styles.pill} ${styles.urgentPill}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                        {tableData.urgentSpots?.replace('{spots}', remainingSpots.toString()) || `SON ${remainingSpots} KİŞİ`}
                      </div>
                    ) : (
                      <div className={`${styles.pill} ${isMediumSpots ? styles.pillOrange : styles.pillGreen}`}>
                        {tableData.spotsLeft?.replace('{spots}', remainingSpots.toString()).toUpperCase() || `${remainingSpots} KİŞİLİK KONTENJAN`}
                      </div>
                    )}
                  </div>
                  <span className={styles.spotsRatio}>
                    {tableData.quotaFilledText?.replace('{filled}', quotaFilled.toString()).replace('{total}', quotaTotal.toString()) || `${quotaFilled} / ${quotaTotal} dolu`}
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={`${styles.progressFill} ${fillClass}`} 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </motion.div>

              {/* Action Area (Always Visible) */}
              <div className={styles.actionArea}>
                <button className={styles.detailBtn} onClick={(e) => { e.stopPropagation(); setModalProgram(prog); }}>
                  {tableData.detailBtn}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {modalProgram && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProgram(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <button className={styles.closeBtn} onClick={() => setModalProgram(null)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                </button>
                
                <div className={styles.modalPill}>
                  {modalProgram.code.includes("(") ? modalProgram.code.split(" (")[1].replace(")", "") : "GENEL"}
                </div>
                
                <h2 className={styles.modalTitle}>{modalProgram.code}</h2>
                
                <div className={styles.modalHeaderTags}>
                  <div className={styles.modalTag}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {modalProgram.start.split('-').reverse().join('.')} — {modalProgram.end.split('-').reverse().join('.')}
                  </div>
                  <div className={styles.modalTag}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {tableData.modal?.weekdays || "Hafta İçi"}
                  </div>
                  {((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)) > 0 && ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)) <= 5 && (
                    <div className={`${styles.modalTag} ${styles.modalTagUrgent}`}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                       {tableData.urgentSpots?.replace('{spots}', ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)).toString()) || `SON ${(modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)} KİŞİ`}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                {/* Progress Card in Modal */}
                <div className={styles.modalProgressCard}>
                  <div className={styles.progressHeader}>
                    <span className={`${styles.spotsLeft} ${((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)) <= 5 ? styles.spotsUrgent : styles.spotsGreen}`}>
                      {modalProgram.status === 'full' ? tableData.statusFull?.toUpperCase() : 
                       ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)) <= 5 ? (tableData.urgentSpots?.replace('{spots}', ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)).toString()) || `SON ${(modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)} KİŞİ`).toUpperCase() : 
                       (tableData.spotsLeft?.replace('{spots}', ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)).toString()) || `${(modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)} KİŞİLİK KONTENJAN`).toUpperCase()}
                    </span>
                    <span className={styles.spotsRatio}>
                      {tableData.quotaFilledText?.replace('{filled}', (modalProgram.quotaFilled || 0).toString()).replace('{total}', (modalProgram.quotaTotal || 12).toString()) || `${modalProgram.quotaFilled || 0} / ${modalProgram.quotaTotal || 12} dolu`}
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={`${styles.progressFill} ${modalProgram.status === 'full' ? styles.fillFull : ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)) <= 5 ? styles.fillUrgent : styles.fillGreen}`} 
                      style={{ width: `${Math.min(100, Math.max(0, ((modalProgram.quotaFilled || 0) / (modalProgram.quotaTotal || 12)) * 100))}%` }}
                    ></div>
                  </div>
                  <p className={styles.modalProgressStatusText}>
                    {modalProgram.status === 'full' ? (tableData.modal?.statusFullText || "Kontenjan doldu") : ((modalProgram.quotaTotal || 12) - (modalProgram.quotaFilled || 0)) <= 5 ? (tableData.modal?.statusClosingText || "Kayıtlar kapanmak üzere") : (tableData.modal?.statusOpenText || "Kayıtlar devam ediyor")}
                  </p>
                </div>

                <p className={styles.modalDesc}>{tableData.modal?.description}</p>

                <div className={styles.modalGrid}>
                  <div className={styles.modalGridItem}>
                    <span className={styles.modalGridLabel}>{tableData.modal?.daysLabel}</span>
                    <span className={styles.modalGridValue}>{tableData.modal?.daysValue}</span>
                  </div>
                  <div className={styles.modalGridItem}>
                    <span className={styles.modalGridLabel}>{tableData.modal?.hoursLabel}</span>
                    <span className={styles.modalGridValue}>{tableData.modal?.hoursValue}</span>
                  </div>
                  <div className={styles.modalGridItem}>
                    <span className={styles.modalGridLabel}>{tableData.modal?.durationLabel}</span>
                    <span className={styles.modalGridValue}>{tableData.modal?.durationValue}</span>
                  </div>
                  <div className={styles.modalGridItem}>
                    <span className={styles.modalGridLabel}>{tableData.modal?.classSizeLabel}</span>
                    <span className={styles.modalGridValue}>{tableData.modal?.classSizeValue}</span>
                  </div>
                </div>

                <ul className={styles.modalFeatures}>
                  {tableData.modal?.features?.map((feature: string, idx: number) => (
                    <li key={idx}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#01c3a8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.modalFooterActions}>
                  <a 
                    href={`https://wa.me/905323609256?text=${encodeURIComponent(`Merhaba, ${modalProgram.code} programı hakkında bilgi almak ve yer ayırtmak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalReserveBtn}
                  >
                    {tableData.modal?.reserveBtn || "Hemen Yer Ayırt"}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <Link href={modalProgram.link ? `/${lang}${modalProgram.link}` : `/${lang}/`} className={styles.modalPageBtn} onClick={() => setModalProgram(null)}>
                    {tableData.modal?.pageBtn || "Program Sayfasına Git"}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
