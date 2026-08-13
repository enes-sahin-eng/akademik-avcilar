import CourseHighlightTabs from "../../components/home/CourseHighlightTabs";
import CardFanCarousel from "../../components/deneme/CardFanCarousel";
import DenemeTabs from "../../components/deneme/DenemeTabs";
import PremiumFaq from "../../components/deneme/PremiumFaq";
import { CircularGalleryDemo } from "../../components/ui/CircularGalleryDemo";
import CardStack from "../../components/deneme/CardStack";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{
    lang: any;
  }>;
}

const DEMO_CARDS = [
  { imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=700&fit=crop", alt: "Mountain landscape" },
  { imgUrl: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=400&h=700&fit=crop", alt: "City night" },
  { imgUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=700&fit=crop", alt: "Foggy forest" },
  { imgUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop", alt: "Sunlit woods" },
  { imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=700&fit=crop", alt: "Tropical beach" },
  { imgUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=700&fit=crop", alt: "Starry mountain" },
  { imgUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=400&h=700&fit=crop", alt: "Golden sunset" },
  { imgUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=700&fit=crop", alt: "Lake reflection" },
  { imgUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=700&fit=crop", alt: "Green valley" },
  { imgUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop", alt: "Sunbeam nature" },
];

export default async function DemoOne({ params }: PageProps) {
  const { lang } = await params;

  return (
    <>
      <main className={styles.main}>

        {/* CARD STACK — Deneme Sandbox */}
        <div className={styles.cardStackSection}>
          <CardStack cards={[
            { id: 1, badge: "Uluslararası Sertifika", title: "ISO 9001:2015", subtitle: "Kalite Yönetim Sistemi" },
            { id: 2, badge: "Uluslararası Sertifika", title: "ISO 10002:2018", subtitle: "Müşteri Memnuniyeti" },
            { id: 3, badge: "Küresel Başarı", title: "Avrupa'nın En İyisi", subtitle: "Best Language School" },
            { id: 4, badge: "Ulusal Ödül", title: "TÖMER Onaylı", subtitle: "Milli Eğitim Bakanlığı" },
            { id: 5, badge: "30+ Yıl Deneyim", title: "Akademik International", subtitle: "Türkiye Geneli #1" },
          ]} />
        </div>

        {/* NEW COMPONENT (CircularGallery) */}
        <div className={styles.gallerySection}>
          <CircularGalleryDemo />
        </div>

        <CardFanCarousel cards={DEMO_CARDS} />

        <div className={styles.spacedSection}>
          <CourseHighlightTabs lang={lang} />
        </div>

        <div className={styles.spacedSection}>
          <DenemeTabs />
        </div>

        <div className={styles.spacedSection}>
          <PremiumFaq />
        </div>
      </main>
    </>
  );
}
