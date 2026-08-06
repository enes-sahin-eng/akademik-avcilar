import Image from "next/image";
import styles from "./ReferanslarShowcase.module.css";
import type { Locale } from "../../dictionaries/getDictionary";

interface Props {
  lang: Locale;
  title: string;
  subtitle: string;
  statsLabel: string;
  yearLabel: string;
  sectorLabel: string;
}

const LOGOS = [
  {
    src: "/references/turkish-airlines_da1e4f_opk.jpg",
    alt: "Turkish Airlines – Akademik International Kurumsal Referansı",
    title: "Turkish Airlines",
    category: "corporate",
  },
  {
    src: "/references/turkcell_515622afac.webp",
    alt: "Turkcell – Akademik International Kurumsal Referansı",
    title: "Turkcell",
    category: "corporate",
  },
  {
    src: "/references/iskur.png",
    alt: "İŞKUR Türkiye İş Kurumu – Akademik International Kurumsal Referansı",
    title: "İŞKUR – Türkiye İş Kurumu",
    category: "public",
  },
  {
    src: "/references/kosgeb logolar -27.png",
    alt: "KOSGEB – Akademik International Kurumsal Referansı",
    title: "KOSGEB",
    category: "public",
  },
  {
    src: "/references/Kyocera_logo.svg.webp",
    alt: "Kyocera – Akademik International Kurumsal Referansı",
    title: "Kyocera",
    category: "corporate",
  },
  {
    src: "/references/saglıkBakanligi.webp",
    alt: "T.C. Sağlık Bakanlığı – Akademik International Kurumsal Referansı",
    title: "T.C. Sağlık Bakanlığı",
    category: "public",
  },
  {
    src: "/references/isbankasi.png",
    alt: "Türkiye İş Bankası – Akademik International Kurumsal Referansı",
    title: "Türkiye İş Bankası",
    category: "corporate",
  },
  {
    src: "/references/trt_1659e9b0792600.svg",
    alt: "TRT Türkiye Radyo ve Televizyon Kurumu – Akademik International Kurumsal Referansı",
    title: "TRT – Türkiye Radyo ve Televizyon Kurumu",
    category: "public",
  },
  {
    src: "/references/ticaret-bakanligi_1659e8bc0af351.svg",
    alt: "T.C. Ticaret Bakanlığı – Akademik International Kurumsal Referansı",
    title: "T.C. Ticaret Bakanlığı",
    category: "public",
  },
  {
    src: "/references/akademik-koleji_1659e981c4991c.svg",
    alt: "Akademik Koleji International School – Akademik International Kurumsal Referansı",
    title: "Akademik Koleji International School",
    category: "education",
  },
  {
    src: "/references/british-council-ielts_1659ead2ff1886.svg",
    alt: "British Council IELTS – Akademik International Yetkili Sınav Merkezi",
    title: "British Council IELTS",
    category: "education",
  },
  {
    src: "/references/qnb_1659eadbc8ded4.svg",
    alt: "QNB Finansbank – Akademik International Kurumsal Referansı",
    title: "QNB Finansbank",
    category: "corporate",
  },
  {
    src: "/references/tbmm_166ad26db0a205.svg",
    alt: "Türkiye Büyük Millet Meclisi – Akademik International Kurumsal Referansı",
    title: "TBMM – Türkiye Büyük Millet Meclisi",
    category: "public",
  },
  {
    src: "/references/bilgisayar-muhendisleri-odasi_166ad2760e8d06.svg",
    alt: "Bilgisayar Mühendisleri Odası – Akademik International Kurumsal Referansı",
    title: "Bilgisayar Mühendisleri Odası",
    category: "corporate",
  },
  {
    src: "/references/acibadem-hastanesi_166ad27ac9d194.svg",
    alt: "Acıbadem Hastanesi – Akademik International Kurumsal Referansı",
    title: "Acıbadem Hastanesi",
    category: "health",
  },
  {
    src: "/references/bezmialem-vakif-universitesi_166ad27ebc298f.svg",
    alt: "Bezmialem Vakıf Üniversitesi – Akademik International Kurumsal Referansı",
    title: "Bezmialem Vakıf Üniversitesi",
    category: "education",
  },
  {
    src: "/references/ingiltere-konsoloslugu_166b20f8a40e49.webp",
    alt: "İngiltere Başkonsolosluğu – Akademik International Kurumsal Referansı",
    title: "İngiltere Başkonsolosluğu",
    category: "public",
  },
];

export const ReferanslarShowcase = ({ title, subtitle, statsLabel, yearLabel, sectorLabel }: Props) => {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.tag}>✦ {statsLabel}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>17+</span>
            <span className={styles.statLabel}>{statsLabel}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>12+</span>
            <span className={styles.statLabel}>{yearLabel}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>5</span>
            <span className={styles.statLabel}>{sectorLabel}</span>
          </div>
        </div>
      </div>

      {/* Logo grid */}
      <div className={styles.grid}>
        {LOGOS.map((logo) => (
          <div key={logo.src} className={`${styles.card} ${styles[`cat_${logo.category}`]}`} title={logo.title}>
            <div className={styles.imageWrapper}>
              <Image
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                fill
                className={styles.logo}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
              />
            </div>
            <span className={styles.logoName}>{logo.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
