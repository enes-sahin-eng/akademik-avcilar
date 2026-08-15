import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import styles from "./subeler.module.css";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const IELTS_HREFS = new Set([
  "/bursa-ingilizce-dil-kursu-fsm",
  "/ankara-ingilizce-dil-kursu",
  "/izmir-ingilizce-dil-kursu",
  "/avcilar-ingilizce-dil-kursu",
]);

const ISTANBUL_NAMES = new Set(["Avcılar", "Kadıköy", "İstanbul"]);

function groupCampuses(campuses: any[]) {
  const istanbul = campuses.filter(
    (c) => ISTANBUL_NAMES.has(c.name) || c.label === "Çekmeköy"
  );
  const bursa = campuses.filter((c) => c.name === "Bursa");
  const other = campuses.filter(
    (c) => !ISTANBUL_NAMES.has(c.name) && c.name !== "Bursa" && c.label !== "Çekmeköy"
  );
  return { istanbul, bursa, other };
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);
  const meta = (dict as any)?.subelerLandingPage?.meta;

  return {
    title: meta?.title,
    description: meta?.description,
    alternates: { canonical: `/${lang}/subelerimiz` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: "website",
    },
  };
}

export default async function SubelerPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  const page = (dict as any)?.subelerLandingPage || {};
  const campuses: any[] = (dict as any)?.iletisim?.campuses?.items || [];
  const { istanbul, bursa, other } = groupCampuses(campuses);

  const localBusinessSchemas = campuses
    .filter((c) => c.href)
    .map((c) => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://www.avcilaringilizcekursu.com.tr/${lang}${c.href}`,
      name: `Akademik International - ${c.label || c.name}`,
      telephone: c.phone,
      url: `https://www.avcilaringilizcekursu.com.tr/${lang}${c.href}`,
      image: `https://www.avcilaringilizcekursu.com.tr${c.image || "/brand/logo2.png"}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: "TR",
        addressLocality: c.name,
      },
    }));

  return (
    <main>
      <Navbar lang={lang} />

      {/* LocalBusiness schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemas) }}
      />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>{page.hero?.tag}</span>
          <h1 className={styles.heroTitle}>{page.hero?.title}</h1>
          <p className={styles.heroDesc}>{page.hero?.desc}</p>
          <div className={styles.statsRow}>
            {(page.hero?.stats || []).map((stat: any) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── İSTANBUL ── */}
      <CitySection
        title={page.istanbul?.cityTitle}
        desc={page.istanbul?.cityDesc}
        campuses={istanbul}
        lang={lang}
        page={page}
      />

      <hr className={styles.sectionDivider} />

      {/* ── BURSA ── */}
      <CitySection
        title={page.bursa?.cityTitle}
        desc={page.bursa?.cityDesc}
        campuses={bursa}
        lang={lang}
        page={page}
      />

      <hr className={styles.sectionDivider} />

      {/* ── DİĞER ŞEHİRLER ── */}
      <CitySection
        title={page.otherCities?.cityTitle}
        desc={page.otherCities?.cityDesc}
        campuses={other}
        lang={lang}
        page={page}
      />

      {/* ── SEO CONTENT ── */}
      <section className={styles.seoSection}>
        <div className={styles.seoInner}>
          <h2 className={styles.seoTitle}>{page.seoSection?.title}</h2>
          <p className={styles.seoContent}>{page.seoSection?.content}</p>
        </div>
      </section>

      <PlacementTestBanner lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}

function CitySection({
  title,
  desc,
  campuses,
  lang,
  page,
}: {
  title?: string;
  desc?: string;
  campuses: any[];
  lang: string;
  page: any;
}) {
  if (!campuses.length) return null;

  return (
    <section className={styles.citySection}>
      <div className={styles.citySectionHeader}>
        <div className={styles.cityTitleGroup}>
          <div className={styles.cityAccent}>
            <span className={styles.cityAccentDot} />
            <h2 className={styles.cityTitle}>{title}</h2>
          </div>
          {desc && <p className={styles.cityDesc}>{desc}</p>}
        </div>
        <span className={styles.branchCount}>
          {campuses.length} {lang === "ar" ? "فرع" : lang === "en" ? "branch" : "şube"}
        </span>
      </div>

      <div className={styles.grid}>
        {campuses.map((campus, i) => (
          <CampusCard key={i} campus={campus} lang={lang} page={page} />
        ))}
      </div>
    </section>
  );
}

function CampusCard({
  campus,
  lang,
  page,
}: {
  campus: any;
  lang: string;
  page: any;
}) {
  const isIelts = IELTS_HREFS.has(campus.href || "");
  const href = campus.href ? `/${lang}${campus.href}` : undefined;

  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrap}>
        <Image
          src={campus.image || "/brand/logo2.png"}
          alt={`${campus.label || campus.name} Şubesi - Akademik International Dil Kursu`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className={styles.cardImage}
          unoptimized
        />
        {isIelts && (
          <span className={styles.ieltsBadge}>
            {page.ieltsVenueBadge || "IELTS Test Venue"}
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <p className={styles.districtLabel}>{campus.name}</p>
        <h3 className={styles.cardTitle}>{campus.label || campus.name}</h3>

        <a
          href={`tel:${campus.phone?.replace(/\s/g, "")}`}
          className={styles.phoneLink}
        >
          <svg
            className={styles.phoneIcon}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.5a1 1 0 01-1 1C9.61 21.61 2.39 14.39 2 5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
          {campus.phone}
        </a>

        {href && (
          <div className={styles.cardActions}>
            <Link href={href} className={styles.visitLink}>
              {page.visitBranch || "Şubeyi İncele"}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
