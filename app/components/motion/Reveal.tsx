"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

type Tag = "div" | "section" | "article" | "li" | "span";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  once?: boolean;
  margin?: string;
  /**
   * "inView" (varsayılan): scroll ile görünür olunca animasyon başlar.
   * "mount": bileşen mount olur olmaz başlar — hero gibi ekranın üstündeki
   * bölümlerde kullanılır.
   */
  trigger?: "inView" | "mount";
  id?: string;
}

const motionTagMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

/**
 * Küçük, tek amaçlı client component: içeriği fade+slide ile göstermek için
 * framer-motion'a ihtiyaç duyar. Tüm gerçek içerik (metin, alt component'lar)
 * server component olarak `children` üzerinden geçirilir; bu wrapper'ın
 * kendisi hiçbir metin/veri bilmez — sözlükten tek kelime bile taşımaz.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  duration = 0.5,
  x,
  y = 30,
  scale,
  once = true,
  margin = "-100px",
  trigger = "inView",
  id,
}: RevealProps) {
  const MotionTag = motionTagMap[as];

  const hidden = {
    opacity: 0,
    ...(x !== undefined ? { x } : {}),
    ...(y !== undefined ? { y } : {}),
    ...(scale !== undefined ? { scale } : {}),
  };

  const visible = {
    opacity: 1,
    ...(x !== undefined ? { x: 0 } : {}),
    ...(y !== undefined ? { y: 0 } : {}),
    ...(scale !== undefined ? { scale: 1 } : {}),
  };

  const variants: Variants = { hidden, visible };

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once, margin },
        };

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      variants={variants}
      transition={{ duration, delay }}
      {...triggerProps}
    >
      {children}
    </MotionTag>
  );
}
