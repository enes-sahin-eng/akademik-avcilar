import React from "react";
import { CircularGallery, GalleryItem } from "../ui/CircularGallery";
import styles from "./MiniGallery.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

// Boyutlar, modaldaki next/image'in dogru srcset uretmesi ve yer kaymasi
// olusmamasi icin. Bir gorsel degistirilirse buradaki degerler de guncellenmeli.
const images = [
  { src: "/sliders/slider1.webp", width: 910, height: 552 },
  { src: "/sliders/slider2.webp", width: 910, height: 552 },
  { src: "/sliders/slider3.webp", width: 910, height: 552 },
  { src: "/sliders/slider4.webp", width: 910, height: 552 },
  { src: "/sliders/slider5.webp", width: 910, height: 552 },
  { src: "/campuses/sube-avcilar.jpg", width: 262, height: 262 },
  { src: "/campuses/sube-kadikoy.webp", width: 131, height: 131 },
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
      url: img.src,
      text: `${t.imgAlt} ${idx + 1}`,
      width: img.width,
      height: img.height,
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
