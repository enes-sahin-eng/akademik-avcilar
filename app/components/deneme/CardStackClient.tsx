'use client';
import { useState, useRef } from 'react';
import styles from './CardStack.module.css';

interface CardData {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
}

interface CardStackClientProps {
  cards: CardData[];
}

export default function CardStackClient({ cards: initialCards }: CardStackClientProps) {
  const [cards, setCards] = useState(initialCards);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [flyingId, setFlyingId] = useState<number | null>(null);

  const startPos = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const animating = useRef(false);
  const lastDragPos = useRef({ x: 0, y: 0 });
  const stackRef = useRef<HTMLDivElement>(null);

  // Kayma miktarı CSS custom property'lerden okunuyor (.stack --card-offset-*),
  // böylece mobildeki küçültülmüş değerler medya sorgusuyla otomatik uygulanır.
  const getBackPosition = (totalCards: number) => {
    const i = totalCards - 1;
    const el = stackRef.current;
    const cs = el ? getComputedStyle(el) : null;
    const x = parseFloat(cs?.getPropertyValue('--card-offset-x') || '-22') || -22;
    const y = parseFloat(cs?.getPropertyValue('--card-offset-y') || '-16') || -16;
    const rotate = parseFloat(cs?.getPropertyValue('--card-rotate') || '-4') || -4;
    return { x: i * x, y: i * y, rotate: i * rotate };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animating.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    setDragPos({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const pos = { x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y };
    lastDragPos.current = pos;
    setDragPos(pos);
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    const { x, y } = lastDragPos.current;
    const dist = Math.sqrt(x ** 2 + y ** 2);

    if (dist > 60) {
      animating.current = true;
      const topCardId = cards[0].id;
      setFlyingId(topCardId);
      setDragPos({ x: 0, y: 0 });
      setTimeout(() => {
        setCards(prev => {
          const next = [...prev];
          const top = next.shift()!;
          next.push(top);
          return next;
        });
        setFlyingId(null);
        setTimeout(() => { animating.current = false; }, 50);
      }, 400);
    } else {
      setDragPos({ x: 0, y: 0 });
    }
  };

  const back = getBackPosition(cards.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.stack} ref={stackRef}>
        {cards.map((card, index) => {
          const isTop = index === 0;
          const isFlying = card.id === flyingId;
          let cardStyle: React.CSSProperties;

          if (isFlying) {
            cardStyle = {
              transform: `translate(${back.x}px, ${back.y}px) rotate(${back.rotate}deg) scale(0.85)`,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.4s ease',
              opacity: 0.3,
              zIndex: 0,
              pointerEvents: 'none',
            };
          } else if (isTop && isDragging) {
            cardStyle = {
              transform: `translate(${dragPos.x}px, ${dragPos.y}px) rotate(${dragPos.x * 0.05}deg) scale(1.06)`,
              transition: 'none',
              zIndex: 100,
              cursor: 'grabbing',
            };
          } else if (index === 0) {
            cardStyle = { zIndex: 5, transform: 'translate(0,0) rotate(0deg)', opacity: 1 };
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
              key={card.id}
              className={`${styles.card} ${isTop && !isFlying ? styles.topCard : ''} ${isStacked ? styles.stackedCard : ''}`}
              style={cardStyle}
              onPointerDown={isTop && !isFlying ? handlePointerDown : undefined}
              onPointerMove={isTop && !isFlying ? handlePointerMove : undefined}
              onPointerUp={isTop && !isFlying ? handlePointerUp : undefined}
            >
              <span className={styles.cardBadge}>{card.badge}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.cardLine} aria-hidden="true" />
              <p className={styles.cardSubtitle}>{card.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
