"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sun, Award, BookOpen, Trophy, Building2, Baby, Briefcase } from "lucide-react";
import styles from "./InteractiveCard.module.css";

// Inverted corner SVG component for a perfect cutout curve
const InvertedCorner = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 24 L24 24 L24 0 A24 24 0 0 0 0 24 Z" fill="white" />
  </svg>
);

const iconMap: Record<string, any> = {
  sun: Sun,
  award: Award,
  bookOpen: BookOpen,
  trophy: Trophy,
  Building2: Building2,
  Baby: Baby,
  Briefcase: Briefcase,
  Award: Award
};

export function InteractiveCard({ card }: { card: any }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  
  const Icon = iconMap[card.iconName] || Sun;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (y - height / 2) / (height / 2) * -6; 
    const rotateY = (x - width / 2) / (width / 2) * 6;   

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <Link 
      href={card.href || "#"}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={styles.card}
    >
      
      {/* Background Image */}
      <div 
        className={styles.bgImage}
        style={{ backgroundImage: `url(${card.image})` }}
      />

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} style={{ background: card.gradient }} />

      {/* Content Container (3D Parallax) */}
      <div className={styles.contentContainer}>
        {/* Top Texts */}
        <div>
          <h3 className={styles.title}>
            {card.title}
          </h3>
          <p className={styles.description}>
            {card.description}
          </p>
        </div>

        {/* Bottom Button */}
        <div>
          <button className={styles.btnContainer}>
            <span className={styles.btnText}>{card.btnText || "Sayfayı Gör"}</span>
            <div className={styles.btnIconWrapper}>
              <ArrowUpRight color="black" size={16} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>

      {/* The White Cutout Wrapper (3D Parallax) */}
      <div className={styles.cutoutWrapper}>
        <div className={styles.cutoutBg}>
          
          {/* Inner Colored Circle with Icon */}
          <div className={styles.iconCircle} style={{ backgroundColor: card.themeColor }}>
            <Icon color="white" size={28} strokeWidth={2.5} />
          </div>

          {/* Top Inverted Corner */}
          <InvertedCorner className={styles.cornerTop} />
          
          {/* Left Inverted Corner */}
          <InvertedCorner className={styles.cornerLeft} />
          
        </div>
      </div>

    </Link>
  );
}
