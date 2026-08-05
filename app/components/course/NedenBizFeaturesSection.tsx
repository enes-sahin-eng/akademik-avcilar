import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import {
  GraduationCap,
  Monitor,
  Users,
  Award,
  BookOpen,
  Globe,
  MessageCircle,
  Star,
  Laptop,
} from "lucide-react";
import { NedenBizAccordion } from "./NedenBizAccordion";
import styles from "./NedenBizFeaturesSection.module.css";
import type { ReactElement } from "react";

const ICON_MAP: Record<string, ReactElement> = {
  GraduationCap: <GraduationCap size={26} />,
  Monitor: <Monitor size={26} />,
  Users: <Users size={26} />,
  Award: <Award size={26} />,
  BookOpen: <BookOpen size={26} />,
  Globe: <Globe size={26} />,
  MessageCircle: <MessageCircle size={26} />,
  Star: <Star size={26} />,
  Laptop: <Laptop size={26} />,
};

interface Props {
  courseKey: string;
  lang: Locale;
}

export const NedenBizFeaturesSection = async ({ courseKey, lang }: Props) => {
  const dict = await getDictionary(lang);
  const data = (dict as any)?.[courseKey]?.nedenBiz;
  if (!data) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Sol: Statik özellik listesi */}
        <div className={styles.left}>
          <h2 className={styles.columnTitle}>{data.leftTitle}</h2>
          <p className={styles.columnSubtitle}>{data.leftSubtitle}</p>

          <ul className={styles.featureList}>
            {(data.features as any[]).map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  {ICON_MAP[feature.icon] ?? <Award size={26} />}
                </div>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ: Accordion */}
        <div className={styles.right}>
          <h2 className={styles.columnTitle}>{data.rightTitle}</h2>
          <p className={styles.columnSubtitle}>{data.rightSubtitle}</p>
          <NedenBizAccordion items={data.accordion} />
        </div>
      </div>
    </section>
  );
};
