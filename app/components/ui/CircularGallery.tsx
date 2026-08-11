"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import styles from './CircularGallery.module.css';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by?: string;
  };
  href?: string;
  buttonText?: string;
  badge?: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className = "", radius = 600, autoRotateSpeed = 0.015, ...props }, ref) => {
    const rotationRef = useRef(0);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Responsive card size + radius
    const [cardW, setCardW] = useState(300);
    const [cardH, setCardH] = useState(400);
    const [effectiveRadius, setEffectiveRadius] = useState(radius);

    useEffect(() => {
      const update = () => {
        const vw = window.innerWidth;
        if (vw < 480) {
          setCardW(195); setCardH(260); setEffectiveRadius(Math.min(radius, 215));
        } else if (vw < 768) {
          setCardW(240); setCardH(320); setEffectiveRadius(Math.min(radius, 300));
        } else {
          setCardW(300); setCardH(400); setEffectiveRadius(radius);
        }
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, [radius]);

    const isInteractingRef = useRef(false);
    const isDraggingRef = useRef(false);
    const isHoveringRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const lastDragRotationRef = useRef(0);
    const velocityRef = useRef(0);
    const lastTimeRef = useRef(0);
    const lastXRef = useRef(0);

    const anglePerItem = 360 / items.length;

    const updateDOM = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      
      itemsRef.current.forEach((itemNode, i) => {
        if (itemNode) {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotationRef.current % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));
          
          itemNode.style.opacity = opacity.toString();
        }
      });
    };

    useEffect(() => {
      const autoRotate = () => {
        if (selectedItem) {
          animationFrameRef.current = requestAnimationFrame(autoRotate);
          return;
        }

        if (!isInteractingRef.current && !isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 0.05) {
             rotationRef.current += velocityRef.current * 16; 
             velocityRef.current *= 0.92; 
          } else {
             velocityRef.current = 0;
             if (!isHoveringRef.current) {
               rotationRef.current += autoRotateSpeed;
             }
          }
          updateDOM();
        }
        
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed, selectedItem]);

    const handlePointerDown = (e: React.PointerEvent) => {
      isDraggingRef.current = true;
      isInteractingRef.current = true;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      lastXRef.current = e.clientX;
      lastTimeRef.current = Date.now();
      lastDragRotationRef.current = rotationRef.current;
      velocityRef.current = 0;
      
      const target = e.target as HTMLElement;
      if (target.setPointerCapture) {
        target.setPointerCapture(e.pointerId);
      }
      
      itemsRef.current.forEach(node => {
        if (node) node.style.transition = 'none';
      });
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      
      const deltaX = e.clientX - startXRef.current;
      const rotationDelta = deltaX * 0.08; 
      
      rotationRef.current = lastDragRotationRef.current + rotationDelta;
      updateDOM();
      
      const now = Date.now();
      const timeDelta = now - lastTimeRef.current;
      if (timeDelta > 0) {
        const moveDelta = (e.clientX - lastXRef.current) * 0.08;
        velocityRef.current = moveDelta / timeDelta;
      }
      
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      isInteractingRef.current = false;
      
      const target = e.target as HTMLElement;
      if (target.releasePointerCapture) {
        target.releasePointerCapture(e.pointerId);
      }
      
      itemsRef.current.forEach(node => {
        if (node) node.style.transition = 'opacity 0.3s linear';
      });
    };

    const handleItemClick = (e: React.MouseEvent, item: GalleryItem) => {
      const dx = Math.abs(e.clientX - startXRef.current);
      const dy = Math.abs(e.clientY - startYRef.current);
      if (dx < 5 && dy < 5) {
        setSelectedItem(item);
      }
    };

    useEffect(() => {
      updateDOM();
    }, []);

    return (
      <>
        <div
          ref={ref}
          role="region"
          aria-label="Circular 3D Gallery"
          className={`${styles.container} ${className}`}
          style={{ perspective: '2000px', touchAction: 'pan-y' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => { isHoveringRef.current = true; }}
          onMouseLeave={() => { isHoveringRef.current = false; }}
          {...props}
        >
          <div
            ref={wrapperRef}
            className={styles.galleryWrapper}
          >
            {items.map((item, i) => {
              const itemAngle = i * anglePerItem;

              return (
                <div
                  key={item.photo.url} 
                  ref={el => { itemsRef.current[i] = el; }}
                  role="group"
                  aria-label={item.common}
                  className={styles.itemWrapper}
                  onClick={(e) => handleItemClick(e, item)}
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: `${-cardW / 2}px`,
                    marginTop: `${-cardH / 2}px`,
                    width: `${cardW}px`,
                    height: `${cardH}px`,
                    cursor: 'pointer',
                    transition: 'opacity 0.3s linear'
                  }}
                >
                  <div className={styles.card}>
                    <Image
                      src={item.photo.url}
                      alt={item.photo.text}
                      fill
                      className={styles.image}
                      style={{ objectFit: 'cover', objectPosition: item.photo.pos || 'center' }}
                      draggable={false}
                      sizes="(max-width: 480px) 195px, (max-width: 768px) 240px, 300px"
                    />
                    {item.badge && (
                      <span className={styles.badge}>{item.badge}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.modalOverlay}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.modalCloseBtn}
                  onClick={() => setSelectedItem(null)}
                  aria-label="Kapat"
                >
                  <X size={24} />
                </button>
                <div className={styles.modalImageWrapper}>
                  <img
                    src={selectedItem.photo.url}
                    alt={selectedItem.photo.text}
                    className={styles.modalImage}
                    draggable={false}
                  />
                  {selectedItem.href && (
                    <div className={styles.modalActions}>
                      <Link href={selectedItem.href} className={styles.modalButton}>
                        {selectedItem.buttonText || "Şubeyi İncele"}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
