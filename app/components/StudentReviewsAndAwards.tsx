"use client";

import { useDictionary } from "../../src/context/DictionaryContext";
import styles from "./StudentReviewsAndAwards.module.css";
import { Star, PlayCircle, Quote } from "lucide-react";
import Image from "next/image";

export const StudentReviewsAndAwards = () => {
  const dictionary: any = useDictionary();
  const dict = dictionary?.studentReviewsAndAwards;

  if (!dict) return null;

  // Duplicate items for the marquee effect so it loops seamlessly
  const marqueeReviews = [...dict.reviews, ...dict.reviews];
  const marqueeAwards = [...dict.awards, ...dict.awards];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {dict.reviewsTitle.split(" ")[0]}{" "}
            <strong>{dict.reviewsTitle.split(" ").slice(1).join(" ")}</strong>
          </h2>
          <p className={styles.subtitle}>{dict.reviewsSubtitle}</p>
        </div>

        {/* REVIEWS CAROUSEL (MARQUEE) */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {marqueeReviews.map((review: any, index: number) => (
              <div key={`${review.id}-${index}`} className={styles.reviewCard}>
                <Quote className={styles.quoteIcon} />
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className={styles.reviewText}>"{review.text}"</p>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    {review.author.charAt(0)}
                  </div>
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>{review.author}</span>
                    <span className={styles.authorRole}>{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIDEOS SECTION */}
        <div className={styles.videosSection}>
          <div className={styles.bgLines}></div>
          <h3 className={styles.videosTitle}>
            <strong>{dict.videosTitle.split(" ")[0]}</strong>{" "}
            {dict.videosTitle.split(" ").slice(1).join(" ")}
          </h3>
          <div className={styles.videosWrapper}>
            {dict.videos.map((video: any) => (
              <div key={video.id} className={styles.videoSquare}>
                <Image
                  src={video.thumbnail}
                  alt={`Video ${video.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.videoImg}
                />
                <div className={styles.videoOverlay}>
                  <PlayCircle size={28} className={styles.playIcon} />
                  <span className={styles.watchNowText}>{dict.watchNow}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AWARDS SECTION (MARQUEE) */}
        <div className={styles.awardsSection}>
          <h2 className={styles.awardsTitle}>{dict.awardsTitle}</h2>
          <div className={styles.awardsMarqueeContainer}>
            <div className={styles.awardsTrack}>
              {marqueeAwards.map((award: any, index: number) => (
                <div key={`${award.id}-${index}`} className={styles.awardItem}>
                  <Image
                    src={award.image}
                    alt={`Award ${award.id}`}
                    width={180}
                    height={180}
                    className={styles.awardImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
