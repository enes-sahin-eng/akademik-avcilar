import React from "react";
import styles from "./CourseInfoSection.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { BookOpen, BookA, PenTool, Mic } from "lucide-react";

const getIcon = (id: string) => {
  switch (id) {
    case "grammar":
      return <BookOpen size={24} />;
    case "reading":
      return <BookA size={24} />;
    case "writing":
      return <PenTool size={24} />;
    case "speaking":
      return <Mic size={24} />;
    default:
      return <BookOpen size={24} />;
  }
};

const getIconColorClass = (index: number) => {
  const colors = [styles.red, styles.blue, styles.green, styles.purple];
  return colors[index % colors.length];
};

interface Props {
  courseKey: string;
  lang: Locale;
}

export const CourseInfoSection = async ({ courseKey, lang }: Props) => {
  const dictionary = await getDictionary(lang);
  const pageData = (dictionary as any)[courseKey]?.about;

  if (!pageData) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            {pageData.badge && (
              <div className={styles.badge}>{pageData.badge}</div>
            )}
            <h1 className={styles.title}>{pageData.title}</h1>
            <div
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: pageData.desc }}
            />
          </div>

          <div className={styles.skillsGrid}>
            {pageData.skills?.map((skill: any, index: number) => (
              <div key={index} className={styles.skillCard}>
                <div
                  className={`${styles.iconWrapper} ${getIconColorClass(index)}`}
                >
                  {getIcon(skill.id)}
                </div>
                <h3 className={styles.skillTitle}>{skill.title}</h3>
                <div
                  className={styles.skillDesc}
                  dangerouslySetInnerHTML={{ __html: skill.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
