import React from "react";
import { CircularGallery, GalleryItem } from "../ui/CircularGallery";
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

  const galleryItems: GalleryItem[] = images.map((img, idx) => ({
    common: t.imgTitle,
    binomial: "",
    photo: {
      url: img,
      text: `${t.imgAlt} ${idx + 1}`,
    }
  }));

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>{t.title}</h2>
        <p className={styles.gallerySubtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.galleryContainer}>
        <CircularGallery items={galleryItems} radius={500} autoRotateSpeed={0.07} />
      </div>
    </section>
  );
};
