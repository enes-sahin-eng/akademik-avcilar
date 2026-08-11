"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ChatAgent.module.css";

const PHONE = "908503050516";

type Lang = "tr" | "en" | "ar";

const T = {
  tr: {
    open: "Bize Yazın",
    title: "Bilgi Danışmanı",
    subtitle: "Genellikle birkaç dakika içinde",
    q1: "Hangi dile ilgi duyuyorsunuz?",
    q2: "Hangi şube ilginizi çekiyor?",
    q3: "Son adım! İletişim bilgilerinizi paylaşın, size en kısa sürede dönelim.",
    namePh: "Ad Soyad",
    phonePh: "Telefon numarası",
    next: "Devam",
    send: "WhatsApp'tan Gönder",
    back: "Geri",
    close: "Kapat",
    intro: "Selam! 👋 Size en uygun kursu bulmak için birkaç kısa sorumuz olacak.",
    langs: ["İngilizce", "Almanca", "Rusça", "Arapça", "Fransızca", "Diğer"],
    campuses: ["Avcılar", "Kadıköy", "Bursa", "Çekmeköy", "Ankara", "İzmir", "Diğer"],
    labelLang: "Dil",
    labelCampus: "Şube",
    labelName: "Ad Soyad",
    labelPhone: "Telefon",
    msgIntro: "Merhaba, kurs hakkında bilgi almak istiyorum:",
    tipTitle: "Merhaba! 👋",
    tipText: "Kurs hakkında bilgi almak ister misin? Sadece 3 küçük soru.",
    tipDismiss: "Kapat",
  },
  en: {
    open: "Message Us",
    title: "Info Assistant",
    subtitle: "Usually replies in minutes",
    q1: "Which language are you interested in?",
    q2: "Which campus interests you?",
    q3: "Last step! Share your contact info and we'll get back to you shortly.",
    namePh: "Full Name",
    phonePh: "Phone number",
    next: "Next",
    send: "Send via WhatsApp",
    back: "Back",
    close: "Close",
    intro: "Hi! 👋 A few quick questions to find the best course for you.",
    langs: ["English", "German", "Russian", "Arabic", "French", "Other"],
    campuses: ["Avcılar", "Kadıköy", "Bursa", "Çekmeköy", "Ankara", "İzmir", "Other"],
    labelLang: "Language",
    labelCampus: "Campus",
    labelName: "Full Name",
    labelPhone: "Phone",
    msgIntro: "Hello, I'd like to get information about the course:",
    tipTitle: "Hi there! 👋",
    tipText: "Want info about our courses? Just 3 quick questions.",
    tipDismiss: "Dismiss",
  },
  ar: {
    open: "راسلنا",
    title: "مساعد المعلومات",
    subtitle: "عادة ما يرد في دقائق",
    q1: "ما اللغة التي تهتم بها؟",
    q2: "ما الفرع الذي يهمك؟",
    q3: "الخطوة الأخيرة! شارك معلومات الاتصال الخاصة بك وسنعاود الاتصال بك قريبًا.",
    namePh: "الاسم الكامل",
    phonePh: "رقم الهاتف",
    next: "التالي",
    send: "إرسال عبر واتساب",
    back: "رجوع",
    close: "إغلاق",
    intro: "مرحبًا! 👋 بعض الأسئلة السريعة لإيجاد أفضل دورة لك.",
    langs: ["الإنجليزية", "الألمانية", "الروسية", "العربية", "الفرنسية", "أخرى"],
    campuses: ["أفجيلار", "قاديكوي", "بورصة", "شكمكوي", "أنقرة", "إزمير", "أخرى"],
    labelLang: "اللغة",
    labelCampus: "الفرع",
    labelName: "الاسم الكامل",
    labelPhone: "الهاتف",
    msgIntro: "مرحبًا، أرغب في الحصول على معلومات حول الدورة:",
    tipTitle: "مرحبا! 👋",
    tipText: "هل تريد الحصول على معلومات حول دوراتنا؟ 3 أسئلة سريعة فقط.",
    tipDismiss: "إخفاء",
  },
};

interface Props { lang: string; }

export default function ChatAgent({ lang }: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("");
  const [campus, setCampus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tipVisible, setTipVisible] = useState(false);
  const [tipDismissed, setTipDismissed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || open || tipDismissed) return;
    const show = setTimeout(() => setTipVisible(true), 3500);
    const hide = setTimeout(() => setTipVisible(false), 16000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [mounted, open, tipDismissed]);

  useEffect(() => {
    if (open) setTipVisible(false);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [step, open]);

  if (!mounted) return null;

  const t = T[(lang as Lang)] || T.tr;

  const reset = () => {
    setStep(0); setLanguage(""); setCampus(""); setName(""); setPhone("");
  };

  const buildMessage = () => {
    const lines = [
      t.msgIntro,
      "",
      `• ${t.labelLang}: ${language}`,
      `• ${t.labelCampus}: ${campus}`,
    ];
    if (name) lines.push(`• ${t.labelName}: ${name}`);
    if (phone) lines.push(`• ${t.labelPhone}: ${phone}`);
    return lines.join("\n");
  };

  const submit = () => {
    if (!name.trim() || !phone.trim()) return;
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setTimeout(reset, 400);
  };

  return (
    <>
      {!open && (
        <>
          {tipVisible && (
            <div className={styles.tooltip} role="status">
              <div className={styles.tooltipAvatar} aria-hidden="true">
                <span className={styles.tooltipDot} />
                <span className={styles.tooltipDot} />
                <span className={styles.tooltipDot} />
              </div>
              <div className={styles.tooltipContent}>
                <div className={styles.tooltipTitle}>{t.tipTitle}</div>
                <div className={styles.tooltipText}>{t.tipText}</div>
              </div>
              <button
                type="button"
                className={styles.tooltipDismiss}
                onClick={() => { setTipVisible(false); setTipDismissed(true); }}
                aria-label={t.tipDismiss}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <button
            className={styles.launcher}
            onClick={() => setOpen(true)}
            aria-label={t.open}
            type="button"
          >
            <span className={styles.pulseRing} aria-hidden="true" />
            <span className={`${styles.pulseRing} ${styles.pulseRingDelayed}`} aria-hidden="true" />
            <span className={styles.launcherShine} aria-hidden="true" />
            <span className={styles.launcherIcon} aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className={styles.launcherBadge} aria-hidden="true">1</span>
          </button>
        </>
      )}

      {open && (
        <div className={styles.panel} role="dialog" aria-modal="false" aria-label={t.title}>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div>
                <div className={styles.headerTitle}>{t.title}</div>
                <div className={styles.headerSub}>
                  <span className={styles.dot} aria-hidden="true" />
                  {t.subtitle}
                </div>
              </div>
            </div>
            <button className={styles.iconBtn} onClick={() => setOpen(false)} aria-label={t.close} type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className={styles.body} ref={bodyRef}>
            {step === 0 && (
              <>
                <div className={styles.bot}>{t.intro}</div>
                <div className={styles.bot}>{t.q1}</div>
                <div className={styles.chips}>
                  {t.langs.map((l) => (
                    <button key={l} type="button" className={styles.chip} onClick={() => { setLanguage(l); setStep(1); }}>
                      {l}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className={styles.userMsg}>{language}</div>
                <div className={styles.bot}>{t.q2}</div>
                <div className={styles.chips}>
                  {t.campuses.map((c) => (
                    <button key={c} type="button" className={styles.chip} onClick={() => { setCampus(c); setStep(2); }}>
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.userMsg}>{campus}</div>
                <div className={styles.bot}>{t.q3}</div>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submit(); }}>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    id="chatagent-name"
                    placeholder={t.namePh}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label={t.labelName}
                    autoComplete="name"
                    required
                  />
                  <input
                    className={styles.input}
                    type="tel"
                    name="tel"
                    id="chatagent-tel"
                    placeholder={t.phonePh}
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-label={t.labelPhone}
                    autoComplete="tel"
                    required
                  />
                  <button
                    type="submit"
                    className={styles.sendBtn}
                    disabled={!name.trim() || !phone.trim()}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.86-6.97z" />
                    </svg>
                    {t.send}
                  </button>
                </form>
              </>
            )}
          </div>

          <footer className={styles.footer}>
            {step > 0 ? (
              <button type="button" className={styles.back} onClick={() => setStep(step - 1)}>
                ← {t.back}
              </button>
            ) : <span />}
            <div className={styles.stepDots} aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`${styles.stepDot} ${i === step ? styles.stepDotActive : ""}`} />
              ))}
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
