"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import styles from "./StudentReviewsAndAwards.module.css";

interface Video {
  id: number | string;
  youtubeId: string;
  thumbnail?: string;
}

interface Props {
  videos: Video[];
  watchNow: string;
  videosAlt?: string;
}

/**
 * Video ızgarası ve lightbox — yalnızca tıklama/modal durumu için client.
 * Tüm metinler server component'tan prop olarak gelir.
 */
export const VideoLightbox = ({ videos, watchNow, videosAlt }: Props) => {
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  return (
    <>
      <div className={styles.videosWrapper}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoSquare}>
            <Image
              src={
                video.thumbnail ||
                `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
              }
              alt={
                videosAlt ||
                `Öğrenci Yorumu - Avcılar Yabancı Dil Kursu ${video.id}`
              }
              title="Avcılar Yabancı Dil Kursu Öğrenci Tavsiyeleri"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.videoImg}
              style={{ objectFit: "cover" }}
            />
            <button
              type="button"
              className={styles.videoOverlay}
              onClick={() => setActiveModalVideo(video.youtubeId)}
              style={{ cursor: "pointer" }}
              aria-label={watchNow}
            >
              <PlayCircle size={28} className={styles.playIcon} />
              <span className={styles.watchNowText}>{watchNow}</span>
            </button>
          </div>
        ))}
      </div>

      {activeModalVideo && (
        <div
          className={styles.videoModalBackdrop}
          onClick={() => setActiveModalVideo(null)}
        >
          <div
            className={styles.videoModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModalBtn}
              onClick={() => setActiveModalVideo(null)}
              aria-label="Kapat"
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${activeModalVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0 }}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
