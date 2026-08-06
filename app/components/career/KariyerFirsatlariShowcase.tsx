import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import styles from "./KariyerFirsatlariShowcase.module.css";
import type { Locale } from "../../dictionaries/getDictionary";

interface Job {
  title: string;
  department: string;
  departmentType: "management" | "teacher" | "other";
  locations: string[];
  applyUrl: string;
}

interface Props {
  lang: Locale;
  sectionTitle: string;
  sectionSubtitle: string;
  openPositionsLabel: string;
  cityLabel: string;
  applyBtn: string;
  jobs: Job[];
}

const DEPT_COLORS: Record<string, string> = {
  management: styles.deptManagement,
  teacher: styles.deptTeacher,
  other: styles.deptOther,
};

export const KariyerFirsatlariShowcase = ({
  sectionTitle,
  sectionSubtitle,
  openPositionsLabel,
  cityLabel,
  applyBtn,
  jobs,
}: Props) => {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>✦ Akademik International</span>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <p className={styles.subtitle}>{sectionSubtitle}</p>

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statPill}>
              <Briefcase size={15} />
              <span>{jobs.length} {openPositionsLabel}</span>
            </div>
            <div className={styles.statPill}>
              <MapPin size={15} />
              <span>5+ {cityLabel}</span>
            </div>
          </div>
        </div>

        {/* Job grid */}
        <div className={styles.grid}>
          {jobs.map((job, i) => (
            <div key={i} className={`${styles.card} ${DEPT_COLORS[job.departmentType] ?? ""}`}>
              <div className={styles.cardTop}>
                <span className={styles.deptBadge}>{job.department}</span>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                {job.locations.length > 0 && (
                  <div className={styles.locations}>
                    <MapPin size={13} className={styles.pinIcon} />
                    <span>{job.locations.join(" / ")}</span>
                  </div>
                )}
              </div>
              <a
                href={job.applyUrl}
                className={styles.applyBtn}
                target={job.applyUrl.startsWith("http") ? "_blank" : undefined}
                rel={job.applyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {applyBtn}
                <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
