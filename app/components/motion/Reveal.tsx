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
  y?: number;
  scale?: number;
  once?: boolean;
  margin?: string;
}

const motionTagMap = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
} as const;

/**
 * Küçük, tek amaçlı client component: içeriği scroll'a girince fade+slide
 * ile göstermek için framer-motion'a ihtiyaç duyar. Tüm gerçek içerik
 * (metin, alt component'lar) server component olarak `children` üzerinden
 * geçirilir; bu wrapper'ın kendisi hiçbir metin/veri bilmez.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  duration = 0.5,
  y = 30,
  scale,
  once = true,
  margin = "-100px",
}: RevealProps) {
  const MotionTag = motionTagMap[as];
  const variants: Variants = {
    hidden: { opacity: 0, y, ...(scale !== undefined ? { scale } : {}) },
    visible: { opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}) },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      transition={{ duration, delay }}
    >
      {children}
    </MotionTag>
  );
}
