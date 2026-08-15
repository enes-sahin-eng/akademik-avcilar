import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { Navbar } from "../components/layout/Navbar";
import styles from "./NotFound.module.css";
import { MoveRight } from "lucide-react";
import { Locale } from "../dictionaries/getDictionary";

export default async function NotFound() {
  let lang: Locale = "tr";

  try {
    const cookieStore = await cookies();
    const cookieLang = cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieLang === "en" || cookieLang === "ar" || cookieLang === "tr") {
      lang = cookieLang as Locale;
    }
  } catch (e) {
    // ignore
  }
  
  const content = {
    tr: {
      error: "404",
      title: "Sayfa Bulunamadı",
      desc: "Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Lütfen URL'yi kontrol edin veya ana sayfaya dönün.",
      button: "Ana Sayfaya Dön"
    },
    en: {
      error: "404",
      title: "Page Not Found",
      desc: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      button: "Back to Homepage"
    },
    ar: {
      error: "404",
      title: "الصفحة غير موجودة",
      desc: "قد تكون الصفحة التي تبحث عنها قد أزيلت أو تم تغيير اسمها أو غير متاحة مؤقتًا.",
      button: "العودة للصفحة الرئيسية"
    }
  };

  const t = content[lang] || content.tr;
  const isRtl = lang === "ar";

  return (
    <>
      <Navbar lang={lang} />
      <div className={styles.container} dir={isRtl ? "rtl" : "ltr"}>
        <div className={styles.background}>
          <div className={styles.glow} />
          <div className={styles.glow2} />
        </div>

        <div className={styles.content}>
          <div className={styles.errorWrapper}>
            <h1 className={styles.errorCode}>{t.error}</h1>
          </div>
          
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.desc}>{t.desc}</p>
          
          <Link href={`/${lang}`} className={styles.button}>
            <span>{t.button}</span>
            <MoveRight className={`${styles.icon} ${isRtl ? styles.iconRtl : ""}`} size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}
