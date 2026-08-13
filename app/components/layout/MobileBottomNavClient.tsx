"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ClipboardCheck, Languages, GraduationCap, MapPin } from "lucide-react";
import styles from "./MobileBottomNav.module.css";

export interface BottomNavDict {
  placement: string;
  languages: string;
  exams: string;
  branches: string;
  home: string;
}

interface Props {
  lang: string;
  dict: BottomNavDict;
}

const PLACEMENT_URL = "https://atc.akademik.com.tr/";

export const MobileBottomNavClient = ({ lang, dict }: Props) => {
  const pathname = usePathname();

  const languagesHref = `/${lang}/diger-diller`;
  const examsHref = `/${lang}/akademik-sinavlar`;
  const branchesHref = `/${lang}/subelerimiz`;
  const homeHref = `/${lang}`;

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={styles.bar} aria-label={dict.home}>
      <Link
        href={PLACEMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.item}
      >
        <ClipboardCheck className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>{dict.placement}</span>
      </Link>

      <Link
        href={languagesHref}
        className={`${styles.item} ${isActive(languagesHref) ? styles.itemActive : ""}`}
        aria-current={isActive(languagesHref) ? "page" : undefined}
      >
        <Languages className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>{dict.languages}</span>
      </Link>

      <Link href={homeHref} className={styles.brand} aria-label={dict.home}>
        <span className={styles.brandCircle}>
          <Image
            src="/brand/nav-mark.webp"
            alt="Akademik International"
            width={128}
            height={128}
            loading="eager"
            className={styles.brandImg}
          />
        </span>
      </Link>

      <Link
        href={examsHref}
        className={`${styles.item} ${isActive(examsHref) ? styles.itemActive : ""}`}
        aria-current={isActive(examsHref) ? "page" : undefined}
      >
        <GraduationCap className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>{dict.exams}</span>
      </Link>

      <Link
        href={branchesHref}
        className={`${styles.item} ${isActive(branchesHref) ? styles.itemActive : ""}`}
        aria-current={isActive(branchesHref) ? "page" : undefined}
      >
        <MapPin className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>{dict.branches}</span>
      </Link>
    </nav>
  );
};
