"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, BookOpen, MessageCircle, Laptop, ArrowRight } from "lucide-react";
import styles from "./AnimatedAdvantageStack.module.css";

interface Advantage {
  title: string;
  desc: string;
  icon: string;
}

interface AdvantageWithId extends Advantage {
  uniqueId: number;
}

interface Props {
  advantages: Advantage[];
  btnNext?: string;
}

const getAdvantageIcon = (iconName: string, size = 32) => {
  switch (iconName) {
    case "Award": return <Award size={size} />;
    case "BookOpen": return <BookOpen size={size} />;
    case "MessageCircle": return <MessageCircle size={size} />;
    case "Laptop": return <Laptop size={size} />;
    default: return <Award size={size} />;
  }
};

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
};

const enterAnimation = {
  y: -16,
  scale: 0.9,
};

function CardContent({ advantage }: { advantage: Advantage }) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.iconContainer}>
        {getAdvantageIcon(advantage.icon, 48)}
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.cardTitle}>{advantage.title}</h3>
        <p className={styles.cardDesc}>{advantage.desc}</p>
      </div>
    </div>
  );
}

function AnimatedCard({
  advantage,
  index,
}: {
  advantage: AdvantageWithId;
  index: number;
}) {
  const styleIndex = Math.min(index, 2);
  const { scale, y } = positionStyles[styleIndex] ?? positionStyles[2];
  
  // Normal stacking order (3 for front, 2 for middle, 1 for back)
  const zIndex = 3 - index;

  const exitAnim = index === 0 ? exitAnimation : undefined;
  const initialAnim = index >= 2 ? enterAnimation : undefined;

  return (
    <motion.div
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
        mass: 1,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className={styles.animatedCard}
    >
      <CardContent advantage={advantage} />
    </motion.div>
  );
}

export const AnimatedAdvantageStack = ({ advantages, btnNext }: Props) => {
  // Add a unique ID to each advantage initially so Framer Motion can track them perfectly
  const [items, setItems] = useState<AdvantageWithId[]>(
    advantages.map((adv, i) => ({ ...adv, uniqueId: i }))
  );
  
  React.useEffect(() => {
    setItems(advantages.map((adv, i) => ({ ...adv, uniqueId: i })));
    setNextId(advantages.length);
  }, [advantages]);

  const [nextId, setNextId] = useState(advantages.length);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimate = () => {
    if (isAnimating || items.length <= 1) return;
    setIsAnimating(true);

    // The item that falls off the stack
    const exitingItem = items[0];
    
    // Create a new array: remove the first item, and append it at the end with a NEW uniqueId
    const newItems = [
      ...items.slice(1), 
      { ...exitingItem, uniqueId: nextId }
    ];
    
    setItems(newItems);
    setNextId((prev) => prev + 1);
    
    // Delay matches the spring animation length roughly
    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={styles.stackWrapper}>
      <div className={styles.stackContainer}>
        <AnimatePresence initial={false}>
          {items.slice(0, 3).map((item, index) => (
            <AnimatedCard 
              key={item.uniqueId} // Now completely unique per render lifecycle!
              advantage={item} 
              index={index} 
            />
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          onClick={handleAnimate}
          className={styles.animateButton}
          disabled={isAnimating}
        >
          {btnNext || "Sonraki Ayrıcalık"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
