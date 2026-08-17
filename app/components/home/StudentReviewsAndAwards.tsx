import React from "react";
import styles from "./StudentReviewsAndAwards.module.css";
import { Star, Quote, Award } from "lucide-react";
import Image from "next/image";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { VideoLightbox } from "./VideoLightbox";
import { CertificateLightbox } from "./CertificateLightbox";

interface Props {
  lang: Locale;
}

export const StudentReviewsAndAwards = async ({ lang }: Props) => {
  const dictionary: any = await getDictionary(lang);
  const dict = dictionary?.studentReviewsAndAwards;

  if (!dict) return null;

  // Marquee'nin kesintisiz dönmesi için orijinal dizileri kullanıp CSS'te iki grup halinde render edeceğiz.
  const awards = dict.awards || [];
  const certificates = dict.certificates || [];

  // Başlıktaki orta iki kelimeyi (ör. "Language School") vurgulamak için
  // metni kelime bazında bölüyoruz — metin sözlükten aynen geliyor, sadece
  // görsel vurgu ekleniyor.
  const awardsTitleWords: string[] = (dict.awardsTitle || "").split(" ");
  const awardsTitleBefore = awardsTitleWords.slice(0, 2).join(" ");
  const awardsTitleHighlight = awardsTitleWords.slice(2, 4).join(" ");
  const awardsTitleAfter = awardsTitleWords.slice(4).join(" ");

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

        {/* VIDEOS SECTION */}
        <div className={styles.videosSection}>
          <div className={styles.bgLines}></div>
          <h3 className={styles.videosTitle}>
            <strong>{dict.videosTitle.split(" ")[0]}</strong>{" "}
            {dict.videosTitle.split(" ").slice(1).join(" ")}
          </h3>
          <VideoLightbox
            videos={dict.videos}
            watchNow={dict.watchNow}
            videosAlt={dict.videosAlt}
          />
        </div>

        {/* REVIEWS CAROUSEL (MARQUEE) */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((groupIndex) => (
              <div key={`review-group-${groupIndex}`} className={styles.reviewsGroup}>
                {dict.reviews.map((review: any, index: number) => (
                  <div key={`review-${review.id}-${index}`} className={styles.reviewCard}>
                    <Quote className={styles.quoteIcon} />
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className={styles.reviewText}>&quot;{review.text}&quot;</p>
                    <div className={styles.authorInfo}>
                      <div className={styles.avatar}>{review.author.charAt(0)}</div>
                      <div className={styles.authorDetails}>
                        <span className={styles.authorName}>{review.author}</span>
                        <span className={styles.authorRole}>{review.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* AWARDS & CERTIFICATES SECTION */}
        <div className={styles.awardsSection}>
          <div className={styles.awardsHeader}>
            <Award className={styles.awardsKicker} size={22} strokeWidth={1.5} aria-hidden="true" />
            <h2 className={styles.awardsTitle}>
              {awardsTitleBefore}{" "}
              <strong>{awardsTitleHighlight}</strong>{" "}
              {awardsTitleAfter}
            </h2>
          </div>

          {/* PLAQUES — yavaş marquee */}
          <div className={styles.awardsMarqueeContainer}>
            <div className={styles.awardsTrack}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((groupIndex) => (
                <div key={`award-group-${groupIndex}`} className={styles.awardGroup}>
                  {awards.map((award: any) => (
                    <div key={`award-${award.id}-${groupIndex}`} className={styles.awardItem}>
                      <Image
                        src={award.image}
                        alt={dict.awardsAlt || `Avcılar Yabancı Dil Okulu Başarı Ödülü ${award.id}`}
                        title="Avcılar İngilizce Dil Kursu Başarı ve Kalite Ödülleri"
                        width={200}
                        height={200}
                        sizes="(max-width: 768px) 150px, 200px"
                        className={styles.awardImg}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CERTIFICATES — kart ızgarası + büyütme lightbox'ı */}
          {certificates.length > 0 && (
            <>
              <div className={styles.awardsDivider} />
              <CertificateLightbox
                certificates={certificates}
                zoomLabel={dict.certificateZoomLabel}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
