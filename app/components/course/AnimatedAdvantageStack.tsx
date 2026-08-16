"use client";

import React, { useState, useRef, useEffect } from "react";
import { Award, BookOpen, MessageCircle, Laptop, Globe, ArrowRight } from "lucide-react";
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
    case "Globe": return <Globe size={size} />;
    default: return <Award size={size} />;
  }
};

export const AnimatedAdvantageStack = ({ advantages, btnNext }: Props) => {
  const [items, setItems] = useState<AdvantageWithId[]>(
    advantages.map((adv, i) => ({ ...adv, uniqueId: i }))
  );
  const [nextId, setNextId] = useState(advantages.length);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [flyingId, setFlyingId] = useState<number | null>(null);

  const startPos = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const animating = useRef(false);
  const lastDragPos = useRef({ x: 0, y: 0 });
  const stackRef = useRef<HTMLDivElement>(null);
  const dragElRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Kayma miktarı CSS custom property'lerden okunuyor (.stack --card-offset-*),
  // mobilde medya sorgusuyla otomatik küçülüyor.
  const getBackPosition = (totalItems: number) => {
    const i = totalItems - 1;
    const el = stackRef.current;
    const cs = el ? getComputedStyle(el) : null;
    const x = parseFloat(cs?.getPropertyValue('--card-offset-x') || '-22') || -22;
    const y = parseFloat(cs?.getPropertyValue('--card-offset-y') || '-16') || -16;
    const rotate = parseFloat(cs?.getPropertyValue('--card-rotate') || '-4') || -4;
    return { x: i * x, y: i * y, rotate: i * rotate };
  };

  const advanceStack = () => {
    if (animating.current || items.length <= 1) return;
    animating.current = true;
    const topId = items[0].uniqueId;
    setFlyingId(topId);
    setDragPos({ x: 0, y: 0 });
    setTimeout(() => {
      setItems(prev => {
        const next = [...prev];
        const top = next.shift()!;
        next.push({ ...top, uniqueId: nextId });
        return next;
      });
      setNextId(prev => prev + 1);
      setFlyingId(null);
      setTimeout(() => { animating.current = false; }, 50);
    }, 400);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animating.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragElRef.current = e.currentTarget;
    dragging.current = true;
    lastDragPos.current = { x: 0, y: 0 };
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    setDragPos({ x: 0, y: 0 });
  };

  // pointermove tarayıcıda 60Hz'in çok üzerinde ateşlenebiliyor; her
  // event'te React state güncellemesi (=tüm bileşen re-render'ı) mobilde
  // FPS düşüşünün asıl kaynağıydı. Artık sürükleme sırasında state hiç
  // güncellenmiyor — pozisyon doğrudan DOM'a, kare başına en fazla bir kez
  // (rAF ile) yazılıyor. React sadece sürükleme başlayıp bitince render olur.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const pos = { x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y };
    lastDragPos.current = pos;

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = dragElRef.current;
        if (el && dragging.current) {
          const { x, y } = lastDragPos.current;
          el.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.05}deg) scale(1.03) translateZ(0)`;
        }
      });
    }
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    dragElRef.current = null;
    setIsDragging(false);
    const { x, y } = lastDragPos.current;
    const dist = Math.sqrt(x ** 2 + y ** 2);

    if (dist > 60) {
      advanceStack();
    } else {
      setDragPos({ x: 0, y: 0 });
    }
  };

  if (!items || items.length === 0) return null;

  const back = getBackPosition(items.length);

  return (
    <div className={styles.stackWrapper}>
      {/*
       * SEO/GEO: Tüm avantajlar her zaman DOM'da bulunur — botlar tümünü görür.
       * Görsel stack ayrı katmanda çalışır, içerik katmanı gizlidir
       * ama taranabilir (screen-reader safe "visually hidden" tekniği).
       */}
      <div className={styles.seoContent} aria-hidden="false">
        {advantages.map((adv, i) => (
          <div key={i} className={styles.seoItem}>
            <h3>{adv.title}</h3>
            <p>{adv.desc}</p>
          </div>
        ))}
      </div>

      {/* Görsel diyagonal kart yığını — sürüklenebilir/tıklanabilir */}
      <div className={styles.stackContainer} aria-hidden="true">
        <div className={styles.stack} ref={stackRef}>
          {items.map((item, index) => {
            const isTop = index === 0;
            const isFlying = item.uniqueId === flyingId;
            let cardStyle: React.CSSProperties;

            if (isFlying) {
              cardStyle = {
                transform: `translate(${back.x}px, ${back.y}px) rotate(${back.rotate}deg) scale(0.85) translateZ(0)`,
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.4s ease',
                opacity: 0.3,
                zIndex: 0,
                pointerEvents: 'none',
              };
            } else if (isTop && isDragging) {
              cardStyle = {
                transform: `translate(${dragPos.x}px, ${dragPos.y}px) rotate(${dragPos.x * 0.05}deg) scale(1.03) translateZ(0)`,
                transition: 'none',
                zIndex: 100,
                cursor: 'grabbing',
              };
            } else if (index === 0) {
              cardStyle = { zIndex: 5, transform: 'translate(0,0) rotate(0deg) translateZ(0)', opacity: 1 };
            } else {
              const opacity = Math.max(0.55, 1 - index * 0.15);
              cardStyle = {
                ['--i' as any]: index,
                zIndex: 5 - index,
                opacity,
              };
            }

            const isStacked = !isFlying && !(isTop && isDragging) && index !== 0;

            return (
              <div
                key={item.uniqueId}
                className={`${styles.card} ${isTop && !isFlying ? styles.topCard : ''} ${isStacked ? styles.stackedCard : ''}`}
                style={cardStyle}
                onPointerDown={isTop && !isFlying ? handlePointerDown : undefined}
                onPointerMove={isTop && !isFlying ? handlePointerMove : undefined}
                onPointerUp={isTop && !isFlying ? handlePointerUp : undefined}
              >
                <div className={styles.iconContainer}>
                  {getAdvantageIcon(item.icon, 32)}
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          onClick={advanceStack}
          className={styles.animateButton}
          disabled={items.length <= 1}
        >
          {btnNext || "Sonraki Ayrıcalık"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
