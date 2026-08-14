import React from "react";
import { CircularGallery, GalleryItem } from "../ui/CircularGallery";
import styles from "./MiniGallery.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";

// Boyutlar, modaldaki next/image'in dogru srcset uretmesi ve yer kaymasi
// olusmamasi icin. Bir gorsel degistirilirse buradaki degerler de guncellenmeli.
// Her fotografin kendi alt/title metni var (SEO ve erisilebilirlik icin
// jenerik "Kampus Gorseli 1, 2, 3..." yerine gercek aciklama).
const images = [
  {
    src: "/course_photos/kursumuzdan-kareler-1.webp",
    width: 500,
    height: 666,
    alt: "Avcılar İngilizce Dil Kursu Avcılar giriş kapısı - Dünya Dillerini Öğretiyoruz",
    title: "Avcılar İngilizce Dil Kursu Avcılar Şubesi Giriş",
  },
  {
    src: "/course_photos/kursumuzdan-kareler-2.webp",
    width: 1000,
    height: 750,
    alt: "Oxford Üniversitesi temalı İngilizce dil sınıfı",
    title: "Avcılar İngilizce Dil Kursu - İngilizce Dil Sınıfı",
  },
  {
    src: "/course_photos/kursumuzdan-kareler-3.webp",
    width: 1000,
    height: 750,
    alt: "Avcılar İngilizce Dil Kursu 1984 resepsiyon alanı",
    title: "Avcılar İngilizce Dil Kursu - Kurumsal Marka Duvarı",
  },
  {
    src: "/course_photos/kursumuzdan-kareler-4.webp",
    width: 1000,
    height: 750,
    alt: "Kırmızı koltuklu konferans ve seminer salonu",
    title: "Avcılar İngilizce Dil Kursu - Konferans Salonu",
  },
  {
    src: "/course_photos/kursumuzdan-kareler-5.webp",
    width: 750,
    height: 1000,
    alt: "Şehir manzaralı İngilizce dil sınıfı",
    title: "Avcılar İngilizce Dil Kursu - Manzaralı Sınıf",
  },
  {
    src: "/course_photos/kursumuzdan-kareler-6.webp",
    width: 750,
    height: 1000,
    alt: "Yayın koleksiyonu sergi duvarı",
    title: "Avcılar İngilizce Dil Kursu - Yayın Koleksiyonu Sergisi",
  },
  {
    src: "/course_photos/kursumuzdan-kareler-7.webp",
    width: 1000,
    height: 562,
    alt: "Avcılar İngilizce Dil Kursu 1984 ana lobi girişi",
    title: "Avcılar İngilizce Dil Kursu Avcılar - Ana Lobi",
  },
];

interface Props {
  lang?: Locale;
}

export const MiniGallery = async ({ lang = "tr" }: Props) => {
  const dict = await getDictionary(lang);
  const t = (dict as any)?.miniGallery || {
    title: "Kursumuzdan Kareler",
    subtitle: "Kampüsümüzden ve etkinliklerimizden öne çıkan anlar",
  };

  const galleryItems: GalleryItem[] = images.map((img) => ({
    common: img.title,
    binomial: "",
    photo: {
      url: img.src,
      text: img.alt,
      title: img.title,
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
