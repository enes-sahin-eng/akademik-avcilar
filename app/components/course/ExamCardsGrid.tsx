import Link from "next/link";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import styles from "./ExamCardsGrid.module.css";

interface Exam {
  name: string;
  shortDesc: string;
  targetScore: string;
  link: string;
}

interface Category {
  id: string;
  label: string;
  exams: Exam[];
}

interface Props {
  courseKey: string;
  lang: Locale;
}

export async function ExamCardsGrid({ courseKey, lang }: Props) {
  const dict = await getDictionary(lang);
  const data = (dict as any)?.[courseKey]?.examCards;

  if (!data) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          {data.subtitle && (
            <p className={styles.subtitle}>{data.subtitle}</p>
          )}
        </header>

        {(data.categories as Category[]).map((cat) => (
          <div key={cat.id} className={styles.category}>
            <h3 className={styles.catLabel}>{cat.label}</h3>
            <div className={styles.grid}>
              {cat.exams.map((exam) => (
                <Link
                  key={exam.name}
                  href={`/${lang}${exam.link}`}
                  className={styles.card}
                >
                  <div className={styles.cardName}>{exam.name}</div>
                  <p className={styles.cardDesc}>{exam.shortDesc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.targetScore}>
                      {exam.targetScore}
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
