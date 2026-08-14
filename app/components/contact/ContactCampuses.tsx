import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";
import styles from "./Contact.module.css";
import anim from "../motion/animations.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { ContactCampusApplyClient } from "./ContactCampusApplyClient";

interface Props {
  lang: Locale;
}

export const ContactCampuses = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const campusesData = dict?.iletisim?.campuses;

  if (!campusesData) return null;

  return (
    <div className={`${styles.campusesSection} ${anim.fadeUp}`}>
      <h2 className={styles.campusesTitle}>{campusesData.title}</h2>

      <div className={styles.campusesGrid}>
        {campusesData.items.map((campus: any, index: number) => (
          <div key={index} className={styles.campusCard}>
            {campus.href ? (
              <Link href={`/${lang}${campus.href}`} className={styles.campusImageLink}>
                <div className={styles.campusImageWrapper}>
                  <div className={styles.campusTopBadge}>{campus.name}</div>
                  <Image
                    src={campus.image || "/brand/logo2.png"}
                    alt={campus.name}
                    title={campus.name}
                    fill
                    quality={100}
                    style={{ objectFit: "cover" }}
                    className={styles.campusImage}
                    unoptimized={campus.image?.startsWith("http")}
                  />
                </div>
              </Link>
            ) : (
              <div className={styles.campusImageWrapper}>
                <div className={styles.campusTopBadge}>{campus.name}</div>
                <Image
                  src={campus.image || "/brand/logo2.png"}
                  alt={campus.name}
                  title={campus.name}
                  fill
                  quality={100}
                  style={{ objectFit: "cover" }}
                  className={styles.campusImage}
                  unoptimized={campus.image?.startsWith("http")}
                />
              </div>
            )}
            <div className={styles.campusInfoBox}>
              <div className={styles.campusLabel}>{campus.label}</div>
              <a
                href={`tel:${campus.phone.replace(/\s/g, "")}`}
                className={styles.campusPhone}
              >
                <Phone size={14} /> {campus.phone}
              </a>
            </div>
          </div>
        ))}
      </div>

      <ContactCampusApplyClient
        buttonLabel={campusesData.button}
        campuses={campusesData.items}
        formData={(dict as any)?.iletisim?.formSection}
      />
    </div>
  );
};
