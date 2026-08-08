import React from "react";
import MiniGalleryClient from "./MiniGalleryClient";
import styles from "./MiniGallery.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

const images = [
  "/sliders/slider1.webp",
  "/sliders/slider2.webp",
  "/sliders/slider3.webp",
  "/sliders/slider4.webp",
  "/sliders/slider5.webp",
  "/campuses/sube-avcilar.jpg",
  "/campuses/sube-kadikoy.webp",
];

interface Props {
  lang?: Locale;
}

export const MiniGallery = async ({ lang = "tr" }: Props) => {
  const dict = await getDictionary(lang);
  const t = (dict as any)?.miniGallery || {
    title: "Kursumuzdan Kareler",
    subtitle: "Kampüsümüzden ve etkinliklerimizden öne çıkan anlar",
    imgAlt: "Avcılar Akademik International Etkinlik ve Kampüs Görseli",
    imgTitle: "Avcılar Yabancı Dil Kursu Eğitim Merkezi ve Sosyal Aktiviteler"
  };

  const cards = images.map((img, idx) => ({
    imgUrl: img,
    alt: `${t.imgAlt} ${idx + 1}`,
    title: t.imgTitle,
  }));

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>{t.title}</h2>
        <p className={styles.gallerySubtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.galleryContainer}>
        <MiniGalleryClient cards={cards} />
      </div>
    </section>
  );
};
