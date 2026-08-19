"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import styles from "./FormSuccessModal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  desc?: string;
  autoCloseMs?: number;
}

export const FormSuccessModal = ({
  open,
  onClose,
  title = "Gönderildi!",
  desc = "Bilgileriniz bize ulaştı, en kısa sürede sizinle iletişime geçeceğiz.",
  autoCloseMs = 3500,
}: Props) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, autoCloseMs, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.card}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Kapat">
              <X size={18} />
            </button>
            <div className={styles.checkCircle}>
              <Check size={32} strokeWidth={3} className={styles.checkIcon} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.desc}>{desc}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
