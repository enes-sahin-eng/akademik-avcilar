import Link from "next/link";
import {
  Mic,
  Globe,
  Users,
  Clock,
  BookOpen,
  GraduationCap,
  BarChart2,
  UserRound,
  School,
  PenLine,
  Headphones,
  Star,
  Play,
  ArrowRight,
} from "lucide-react";
import { getDictionary } from "../../dictionaries/getDictionary";
import styles from "./CourseHighlightTabs.module.css";

const ICON_MAP: Record<string, React.ReactNode> = {
  mic: <Mic size={18} />,
  globe: <Globe size={18} />,
  users: <Users size={18} />,
  clock: <Clock size={18} />,
  book: <BookOpen size={18} />,
  graduation: <GraduationCap size={18} />,
  chart: <BarChart2 size={18} />,
  user: <UserRound size={18} />,
  school: <School size={18} />,
  pen: <PenLine size={18} />,
  headphones: <Headphones size={18} />,
  star: <Star size={18} />,
  play: <Play size={18} />,
};

const THEME_CLASS: Record<string, string> = {
  navy: styles.themeNavy,
  red: styles.themeRed,
  green: styles.themeGreen,
  orange: styles.themeOrange,
};

/* Decorative SVG shapes per theme */
function NavyShapes() {
  return (
    <svg className={styles.shapeSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="340" cy="60" r="110" fill="rgba(255,255,255,0.06)" />
      <circle cx="320" cy="80" r="72" fill="rgba(255,255,255,0.05)" />
      <circle cx="-30" cy="340" r="130" fill="rgba(255,255,255,0.04)" />
      <path d="M0,200 Q80,120 200,180 T400,160" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" fill="none" />
      <path d="M0,300 Q100,260 200,290 T400,270" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function RedShapes() {
  return (
    <svg className={styles.shapeSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="360" cy="-20" r="120" fill="rgba(255,255,255,0.07)" />
      <circle cx="340" cy="20" r="68" fill="rgba(255,255,255,0.06)" />
      <rect x="-20" y="280" width="120" height="120" rx="32" fill="rgba(255,255,255,0.04)" transform="rotate(-15 -20 280)" />
      <path d="M30,100 Q130,40 220,110 T420,80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
    </svg>
  );
}

function GreenShapes() {
  return (
    <svg className={styles.shapeSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Large organic blob top-right */}
      <path
        d="M280,-30 C340,-10 410,60 400,130 C390,200 320,220 270,200 C220,180 190,120 210,60 C230,0 250,-50 280,-30 Z"
        fill="rgba(255,255,255,0.07)"
      />
      {/* Medium blob bottom-left */}
      <path
        d="M-40,310 C-10,270 50,260 80,280 C110,300 110,360 70,390 C30,420 -40,380 -40,310 Z"
        fill="rgba(255,255,255,0.06)"
      />
      {/* Small scattered circles */}
      <circle cx="50" cy="80" r="18" fill="rgba(255,255,255,0.06)" />
      <circle cx="320" cy="320" r="28" fill="rgba(255,255,255,0.05)" />
      <circle cx="180" cy="350" r="12" fill="rgba(255,255,255,0.05)" />
      {/* Flowing wave lines */}
      <path
        d="M0,160 C60,130 120,170 200,150 C280,130 340,160 400,140"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0,240 C80,220 160,250 240,230 C320,210 370,240 400,225"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Dot scatter */}
      <circle cx="100" cy="300" r="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="130" cy="340" r="3" fill="rgba(255,255,255,0.10)" />
      <circle cx="80" cy="360" r="5" fill="rgba(255,255,255,0.08)" />
      <circle cx="350" cy="100" r="4" fill="rgba(255,255,255,0.10)" />
      <circle cx="370" cy="140" r="3" fill="rgba(255,255,255,0.08)" />
    </svg>
  );
}

function OrangeShapes() {
  return (
    <svg className={styles.shapeSvg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="380" cy="30" r="100" fill="rgba(255,255,255,0.07)" />
      <circle cx="360" cy="60" r="56" fill="rgba(255,255,255,0.06)" />
      <circle cx="20" cy="380" r="90" fill="rgba(255,255,255,0.05)" />
      <path d="M0,180 Q100,140 200,170 T400,150" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
      <circle cx="60" cy="60" r="14" fill="rgba(255,255,255,0.07)" />
      <circle cx="200" cy="320" r="22" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}

const SHAPES: Record<string, React.ReactNode> = {
  navy: <NavyShapes />,
  red: <RedShapes />,
  green: <GreenShapes />,
  orange: <OrangeShapes />,
};

interface Props {
  lang: string;
}

export default async function CourseHighlightTabs({ lang }: Props) {
  const dict = await getDictionary(lang as "tr" | "en" | "ar");
  const section = (dict as any).courseHighlightSection;
  if (!section?.tabs?.length) return null;

  const tabs: Array<{
    label: string;
    color: string;
    leftTitle: string;
    leftDesc: string;
    rightTitle: string;
    rightDesc: string;
    features: Array<{ text: string; icon: string }>;
    ctaHref: string;
    ctaText: string;
  }> = section.tabs;

  return (
    <section className={styles.section}>
      {/* Hidden radio inputs — must be siblings of .panels for CSS ~ combinator */}
      {tabs.map((tab, i) => (
        <input
          key={i}
          type="radio"
          id={`courseTab${i}`}
          name="courseHighlightTab"
          className={styles.tabInput}
          defaultChecked={i === 0}
          aria-label={tab.label}
        />
      ))}

      <div className={styles.panels}>
        {tabs.map((tab, i) => {
          const themeClass = THEME_CLASS[tab.color] ?? styles.themeNavy;
          return (
            <div
              key={i}
              className={`${styles.panel} ${styles[`panel${i}` as keyof typeof styles]} ${themeClass}`}
            >
              {/* Left colored card */}
              <div className={styles.leftCard}>
                {SHAPES[tab.color]}
                <div className={styles.leftContent}>
                  <h2 className={styles.leftTitle}>{tab.leftTitle}</h2>
                  <p className={styles.leftDesc}>{tab.leftDesc}</p>
                </div>
                {/* Tab navigation pills at bottom of left card */}
                <nav className={styles.tabNav} aria-label="Kurs kategorileri">
                  {tabs.map((t, j) => (
                    <label
                      key={j}
                      htmlFor={`courseTab${j}`}
                      className={`${styles.tabLabel} ${i === j ? styles.tabLabelActive : ""}`}
                    >
                      {t.label}
                    </label>
                  ))}
                </nav>
              </div>

              {/* Right content */}
              <div className={styles.rightContent}>
                <div className={styles.rightInner}>
                  <h3 className={styles.rightTitle}>{tab.rightTitle}</h3>
                  <p className={styles.rightDesc}>{tab.rightDesc}</p>
                  <div className={styles.featureGrid}>
                    {tab.features.map((f, fi) => (
                      <div key={fi} className={styles.featureItem}>
                        <span className={styles.featureIcon}>
                          {ICON_MAP[f.icon] ?? <Star size={18} />}
                        </span>
                        <span className={styles.featureText}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.ctaRow}>
                    <Link href={`/${lang}${tab.ctaHref}`} className={styles.ctaBtn}>
                      {tab.ctaText}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
