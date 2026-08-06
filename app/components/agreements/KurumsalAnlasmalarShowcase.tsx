import Image from "next/image";
import styles from "./KurumsalAnlasmalarShowcase.module.css";
import type { Locale } from "../../dictionaries/getDictionary";

interface Agreement {
  src: string;
  alt: string;
  title: string;
  company: string;
  tag?: string;
}

const AGREEMENTS: Agreement[] = [
  {
    src: "/kurumsalAnlasmalar/bau-x-boun-train-23_165a7bfdf09646.webp",
    alt: "BAU × BOUN TRAIN'23 – Akademik International Kurumsal Eğitim Etkinliği",
    title: "BAU × BOUN TRAIN'23 Kurumsal Eğitim Etkinliği",
    company: "BAU & BOUN",
    tag: "Etkinlik",
  },
  {
    src: "/kurumsalAnlasmalar/akademik-international-dil-kursu-yesilova-holding-arasinda-kurumsal-indirim-anlasmasi-imzalandi_166041707c2f67.webp",
    alt: "Akademik International Dil Kursu ile Yeşilova Holding Arasında Kurumsal İndirim Anlaşması İmzalandı",
    title: "Akademik International – Yeşilova Holding Kurumsal İndirim Anlaşması",
    company: "Yeşilova Holding",
    tag: "Anlaşma",
  },
  {
    src: "/kurumsalAnlasmalar/akademik-international-dil-kursu-ile-btso-arasinda-kurumsal-indirim-anlasmasi-imzalandi_1660413caf3625.webp",
    alt: "Akademik International Dil Kursu ile Bursa Ticaret ve Sanayi Odası (BTSO) Arasında Kurumsal İndirim Anlaşması İmzalandı",
    title: "Akademik International – BTSO Kurumsal İndirim Anlaşması",
    company: "BTSO",
    tag: "Anlaşma",
  },
  {
    src: "/kurumsalAnlasmalar/akademik-international-dil-kursu-ile-turkiye-is-bankasi-arasinda-kurumsal-indirim-anlasmasi-imzalandi_166041270059aa.webp",
    alt: "Akademik International Dil Kursu ile Türkiye İş Bankası Arasında Kurumsal İndirim Anlaşması İmzalandı",
    title: "Akademik International – Türkiye İş Bankası Kurumsal İndirim Anlaşması",
    company: "Türkiye İş Bankası",
    tag: "Anlaşma",
  },
  {
    src: "/kurumsalAnlasmalar/akademik-international-dil-kurslari-ile-tumsiad-arasinda-kurumsal-indirim-anlasmasi-imzalandi_16604112504369.webp",
    alt: "Akademik International Dil Kursları ile Tüm Sanayici ve İşadamları Derneği (TÜMSİAD) Arasında Kurumsal İndirim Anlaşması İmzalandı",
    title: "Akademik International – TÜMSİAD Kurumsal İndirim Anlaşması",
    company: "TÜMSİAD",
    tag: "Anlaşma",
  },
  {
    src: "/kurumsalAnlasmalar/akademik-international-dil-kursu-ile-tek-gida-is-sendikasi-arasinda-kurumsal-indirim-anlasmasi-imzalandi_166040adee46b8.webp",
    alt: "Akademik International Dil Kursu ile Tek Gıda İş Sendikası Arasında Kurumsal İndirim Anlaşması İmzalandı",
    title: "Akademik International – Tek Gıda İş Sendikası Kurumsal İndirim Anlaşması",
    company: "Tek Gıda İş Sendikası",
    tag: "Anlaşma",
  },
];

interface Props {
  lang: Locale;
  sectionTitle: string;
  sectionSubtitle: string;
  agreementBadge: string;
  eventBadge: string;
}

export const KurumsalAnlasmalarShowcase = ({
  sectionTitle,
  sectionSubtitle,
  agreementBadge,
  eventBadge,
}: Props) => {
  const getBadgeLabel = (tag?: string) => {
    if (tag === "Etkinlik") return eventBadge;
    return agreementBadge;
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>✦ Akademik International</span>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <p className={styles.subtitle}>{sectionSubtitle}</p>
        </div>

        {/* Card grid */}
        <div className={styles.grid}>
          {AGREEMENTS.map((item) => (
            <article key={item.src} className={styles.card}>
              {/* Background image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className={styles.overlay} />
              </div>

              {/* Badge top-right */}
              <span className={styles.badge}>{getBadgeLabel(item.tag)}</span>

              {/* Company chip top-left */}
              <span className={styles.company}>{item.company}</span>

              {/* Bottom text */}
              <div className={styles.textBlock}>
                <p className={styles.cardTitle}>{item.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
