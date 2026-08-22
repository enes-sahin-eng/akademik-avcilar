"use client";

import React, { useEffect, useState } from "react";
import { Star, Quote, X } from "lucide-react";
import styles from "./StudentReviewsAndAwards.module.css";

interface Review {
  id: number | string;
  text: string;
  author: string;
  role?: string;
}

interface Props {
  reviews: Review[];
  readMoreText?: string;
  closeText?: string;
}

/**
 * Yorum marquee'si ve "Devamını Oku" modal'ı — yalnızca tıklama/genişletme
 * durumu için client. Kart içindeki metin CSS ile görsel olarak kısaltılır
 * (line-clamp), ama tam metin her zaman DOM'da render edilir; böylece
 * "Devamını Oku" kapalıyken bile arama motorları/sayfa kaynağı tam yorumu
 * okuyabilir — sadece görünüm kısaltılmıştır.
 */
export const ReviewsMarquee = ({ reviews, readMoreText, closeText }: Props) => {
  const [activeReview, setActiveReview] = useState<Review | null>(null);

  // Sunucu tarafında ve ilk hydration'da SADECE tek bir grup (22 gerçek yorum)
  // render edilir — arama motorları sayfa kaynağında tek kopya görür.
  // Kesintisiz kayan animasyon için gereken görsel ikinci kopya, hydration
  // tamamlandıktan hemen sonra istemci tarafında eklenir; SEO'yu etkilemez,
  // kullanıcı gözünde de hiçbir gecikme fark edilmez (animasyon 130s sürdüğü
  // için ilk piksellik kayma bile gerçekleşmeden ikinci grup zaten hazır olur).
  const [loopDuplicated, setLoopDuplicated] = useState(false);
  useEffect(() => {
    setLoopDuplicated(true);
  }, []);

  const groupIndexes = loopDuplicated ? [0, 1] : [0];

  return (
    <>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {groupIndexes.map((groupIndex) => (
            <div
              key={`review-group-${groupIndex}`}
              className={styles.reviewsGroup}
              aria-hidden={groupIndex === 1 ? true : undefined}
            >
              {reviews.map((review, index) => (
                <div key={`review-${review.id}-${groupIndex}-${index}`} className={styles.reviewCard}>
                  <Quote className={styles.quoteIcon} />
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className={styles.reviewText}>&quot;{review.text}&quot;</p>
                  <button
                    type="button"
                    className={styles.reviewReadMoreBtn}
                    onClick={() => setActiveReview(review)}
                    tabIndex={groupIndex === 1 ? -1 : undefined}
                  >
                    {readMoreText || "Devamını Oku"}
                  </button>
                  <div className={styles.authorInfo}>
                    <div className={styles.avatar}>{review.author.charAt(0)}</div>
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>{review.author}</span>
                      {review.role && (
                        <span className={styles.authorRole}>{review.role}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {activeReview && (
        <div
          className={styles.reviewModalBackdrop}
          onClick={() => setActiveReview(null)}
        >
          <div
            className={styles.reviewModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModalBtn}
              onClick={() => setActiveReview(null)}
              aria-label={closeText || "Kapat"}
            >
              <X size={18} />
            </button>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} fill="currentColor" />
              ))}
            </div>
            <p className={styles.reviewModalText}>&quot;{activeReview.text}&quot;</p>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>{activeReview.author.charAt(0)}</div>
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>{activeReview.author}</span>
                {activeReview.role && (
                  <span className={styles.authorRole}>{activeReview.role}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
