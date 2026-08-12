"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Html } from "@react-three/drei";
import { RobotPrototype } from "./RobotHero";
import styles from "./FloatingRobot.module.css";

const PHONE = "905323609256";

// Dictionary translation for the chat interface
const T: Record<string, any> = {
  tr: {
    intro:
      "Merhaba, sana nasıl yardımcı olabilirim? Hangi dille ilgileniyorsun?",
    langs: [
      "İngilizce",
      "Almanca",
      "Fransızca",
      "Rusça",
      "İspanyolca",
      "Diğer +",
    ],
    campusQ: "Hangi kampüsümüz sana daha uygun?",
    campuses: ["Avcılar", "Kadıköy", "Beşiktaş", "Bursa", "Ankara"],
    contactQ:
      "Harika! WhatsApp'tan konuşmaya başlamak için son bir adım kaldı. Seni tanıyabilir miyiz?",
    placeholderName: "Adınız Soyadınız",
    placeholderPhone: "0 (5XX) XXX XX XX",
    errorPhone: "Lütfen geçerli bir telefon numarası giriniz (Örn: 0532 123 45 67)",
    submit: "WhatsApp'a Git",
    close: "Geri",
    labelLang: "İlgilenilen Dil",
    labelExam: "Seçilen Sınav",
    labelCampus: "Seçilen Kampüs",
    labelName: "İsim",
    labelPhone: "Telefon",
    msgIntro: "Merhaba, şu eğitimle ilgileniyorum:",
    tooltip: "Sana nasıl yardımcı olabilirim?",
    title: "Asistan",
    status: "Çevrimiçi",
    ariaFab: "Asistanı Aç",
    examQ: "Hangi sınava hazırlanıyorsun?",
    exams: ["YDS", "YÖKDİL", "IELTS", "TOEFL", "PTE", "TestDaF", "Diğer"],
    playPrompt: "Merhaba 👋",
  },
  en: {
    intro: "Hello, how can I help you? Which language are you interested in?",
    langs: ["English", "German", "French", "Russian", "Spanish", "Other +"],
    campusQ: "Which campus is more convenient for you?",
    campuses: ["Avcilar", "Kadikoy", "Besiktas", "Bursa", "Ankara"],
    contactQ:
      "Great! Just one final step before we switch to WhatsApp. May we know who we are speaking with?",
    placeholderName: "Your Full Name",
    placeholderPhone: "0 (5XX) XXX XX XX",
    errorPhone: "Please enter a valid phone number",
    submit: "Go to WhatsApp",
    close: "Back",
    labelLang: "Language",
    labelExam: "Selected Exam",
    labelCampus: "Campus",
    labelName: "Name",
    labelPhone: "Phone",
    msgIntro: "Hello, I am interested in:",
    tooltip: "How can I help you?",
    title: "Assistant",
    status: "Online",
    ariaFab: "Open Assistant",
    examQ: "Which exam are you preparing for?",
    exams: ["YDS", "YÖKDİL", "IELTS", "TOEFL", "PTE", "TestDaF", "Other"],
    playPrompt: "Hello 👋",
  },
  ar: {
    intro: "مرحباً، كيف يمكنني مساعدتك؟ ما هي اللغة التي تهتم بها؟",
    langs: [
      "الإنجليزية",
      "الألمانية",
      "الفرنسية",
      "الروسية",
      "الإسبانية",
      "أخرى +",
    ],
    campusQ: "أي فرع هو الأنسب لك؟",
    campuses: ["أفجلار", "كاديكوي", "بشكتاش", "بورصة", "أنقرة"],
    contactQ:
      "رائع! خطوة واحدة أخيرة لبدء الدردشة عبر واتساب. هل يمكننا التعرف عليك؟",
    placeholderName: "الاسم الكامل",
    placeholderPhone: "0 (5XX) XXX XX XX",
    errorPhone: "يرجى إدخال رقم هاتف صحيح",
    submit: "انتقل إلى واتساب",
    close: "العودة",
    labelLang: "اللغة",
    labelExam: "الامتحان المختار",
    labelCampus: "الفرع",
    labelName: "الاسم",
    labelPhone: "الهاتف",
    msgIntro: "مرحبًا، أرغب في الحصول على معلومات حول الدورة:",
    tooltip: "كيف يمكنني مساعدتك؟",
    title: "مساعد",
    status: "متصل",
    ariaFab: "افتح المساعد",
    examQ: "لأي امتحان تستعد؟",
    exams: ["YDS", "YÖKDİL", "IELTS", "TOEFL", "PTE", "TestDaF", "أخرى"],
    playPrompt: "مرحبا 👋",
  },
};

export default function FloatingRobot({ lang = "tr" }: { lang?: string }) {
  const t = T[lang] || T.tr;
  const lovedRef = useRef(false);
  const loveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState("");
  const [exam, setExam] = useState("");
  const [campus, setCampus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  const triggerLove = (duration = 1600) => {
    lovedRef.current = true;
    if (loveTimeoutRef.current) clearTimeout(loveTimeoutRef.current);
    loveTimeoutRef.current = setTimeout(() => {
      lovedRef.current = false;
    }, duration);
  };

  const selectLang = (l: string) => {
    setLanguage(l);
    triggerLove();
    // ikisi de seçildiyse kampüse geç
    if (exam !== "") setTimeout(() => setStep(1), 350);
  };

  const selectExam = (e: string) => {
    setExam(e);
    triggerLove();
    // ikisi de seçildiyse kampüse geç
    if (language !== "") setTimeout(() => setStep(1), 350);
  };

  const selectCampus = (c: string) => {
    setCampus(c);
    triggerLove();
    setStep(2); // iletişim formuna geç
  };

  const goBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (step === 0 && language !== "") {
      setLanguage("");
      setExam("");
    } else if (step === 1) {
      setExam("");
      setStep(0);
    } else if (step === 2) {
      setCampus("");
      setStep(1);
    }
  };

  const buildMessage = () => {
    const lines = [
      `\uD83D\uDC4B ${t.msgIntro}`,
      "",
      `\uD83C\uDF0D ${t.labelLang}: ${language}`,
      `\uD83C\uDF93 ${t.labelExam}: ${exam}`,
      `\uD83C\uDFEB ${t.labelCampus}: ${campus}`,
      `\uD83D\uDC64 ${t.labelName}: ${name}`,
      `\uD83D\uDCF1 ${t.labelPhone}: ${phone}`,
    ];
    return lines.join("\n");
  };

  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const submit = () => {
    const url = `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
    submitTimerRef.current = setTimeout(() => {
      setOpen(false);
      setStep(0);
      setLanguage("");
      setExam("");
      setCampus("");
      setName("");
      setPhone("");
    }, 500);
  };

  const panelRef = useRef<HTMLDivElement>(null);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (loveTimeoutRef.current) clearTimeout(loveTimeoutRef.current);
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [step, open, language]);

  const [isMobile, setIsMobile] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || open) return;
    const show = setTimeout(() => setBubbleVisible(true), 3000);
    const hide = setTimeout(() => setBubbleVisible(false), 10000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [isMobile, open]);

  useEffect(() => {
    if (open) setBubbleVisible(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest(`.${styles.robotTrigger}`)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const renderRobotCanvas = (scale = 1.4, isMobilePanel = false, noFall = false) => (
    <Canvas
      shadows={!isMobilePanel}
      camera={{ position: [0, 0.2, 6], fov: 40 }}
      dpr={isMobilePanel ? [1, 2] : [1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isMobilePanel ? 1.1 : 0.75} color="#ffffff" />
        <directionalLight
          position={[0, 6, 3]}
          intensity={0.4}
          color="#00ffe2"
          castShadow={!isMobilePanel}
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.0005}
        >
          {!isMobilePanel && (
            <orthographicCamera
              attach="shadow-camera"
              args={[-1.5, 1.5, 1.5, -1.5, 0.1, 20]}
            />
          )}
        </directionalLight>
        <directionalLight
          position={[-5, 2, -5]}
          intensity={0.2}
          color="#dbdbdb"
        />
        <Environment preset="studio" blur={0.5} resolution={isMobilePanel ? 32 : 256} />
        <group scale={isMobilePanel ? 1.5 : scale}>
          <group position={[0, isMobilePanel ? -0.2 : -0.45, 0]}>
            {!isMobilePanel && (
              <ContactShadows
                position={[0, -0.79, 0]}
                opacity={0.7}
                scale={12}
                resolution={512}
                blur={2}
                far={2.5}
                color="#000000"
              />
            )}
            <RobotPrototype
              neckParams={{
                baseR: 0.215,
                baseH: -0.05,
                midR: 0.28,
                midH: 0.02,
                lipBottomR: 0.295,
                lipBottomH: 0.045,
                lipTopR: 0.27,
                lipTopH: 0.055,
                innerR: 0.1,
                innerDropH: 0.0,
              }}
              bodyParams={{
                bodyBevelR: 0.235,
                bodyBevelY: 0.34,
                bodyBevelT: 0.025,
              }}
              color="#94a3b8"
              headColor="#111111"
              pantallaColor="#00ffc6"
              pantallaBrillo={1.4}
              blinkCycle={3.2}
              metalness={0.3}
              lovedRef={lovedRef}
              noFall={noFall}
              noBodyMove={isMobilePanel}
            >
              {!open && !isMobilePanel && (
                <Html position={[0, 0.65, 0]} zIndexRange={[100, 0]}>
                  <div
                    className={styles.hoverTooltipWrapper}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    <div className={styles.hoverTooltip}>
                      {t.tooltip}
                      <div className={styles.hoverTooltipTail} />
                    </div>
                  </div>
                </Html>
              )}
            </RobotPrototype>
          </group>
        </group>
      </Suspense>
    </Canvas>
  );

  return (
    <div className={styles.container}>
      {isMobile ? (
        <>
          {bubbleVisible && !open && (
            <div className={styles.playBubble} role="status">
              {t.playPrompt}
              <span className={styles.playBubbleTail} aria-hidden="true" />
            </div>
          )}
        <button
          type="button"
          className={styles.mobileFab}
          onClick={() => setOpen(true)}
          aria-label={t.ariaFab}
        >
          <span className={styles.fabScreen} aria-hidden="true">
            <span className={styles.fabEyes}>
              <span className={styles.fabEye} />
              <span className={styles.fabEye} />
            </span>
          </span>
        </button>
        </>
      ) : (
        <div
          className={styles.robotTrigger}
          onClick={() => setOpen(true)}
          style={{
            position: "absolute",
            inset: 0,
            cursor: open ? "default" : "pointer",
            zIndex: 1,
          }}
        >
          {renderRobotCanvas(1.5, false, true)}
        </div>
      )}

      {/* Chat Bubble Panel */}
      {open && (
        <div
          className={styles.panel}
          role="dialog"
          aria-label="Chat"
          style={{ zIndex: 10 }}
          ref={panelRef}
        >
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerDot} aria-hidden="true" />
              <div className={styles.headerInfo}>
                <div className={styles.headerTitle}>{t.title}</div>
                <div className={styles.headerSub}>
                  <div className={styles.statusDot} /> {t.status}
                </div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                aria-label={t.close}
                title={t.close}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          <div className={styles.chatPane} style={{ borderLeft: "none" }}>
            <div className={styles.messages} ref={bodyRef}>
              {/* Step 0: dil + sınav sorusu aynı anda görünür */}
              {step === 0 && (
                <div>
                  <div className={styles.bot}>{t.intro}</div>
                  <div className={styles.chips}>
                    {t.langs.map((l: string) => (
                      <button
                        key={l}
                        type="button"
                        className={`${styles.chip} ${language === l ? styles.chipActive : ""}`}
                        onClick={() => selectLang(l)}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className={styles.bot}>{t.examQ}</div>
                  <div className={styles.chips}>
                    {t.exams.map((e: string) => (
                      <button
                        key={e}
                        type="button"
                        className={`${styles.chip} ${exam === e ? styles.chipActive : ""}`}
                        onClick={() => selectExam(e)}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: kampüs (geçmiş: dil + sınav) */}
              {step >= 1 && (
                <>
                  <div className={styles.userMsg}>{language}</div>
                  <div className={styles.userMsg}>{exam}</div>
                  {step === 1 && (
                    <div>
                      <div className={styles.bot}>{t.campusQ}</div>
                      <div className={styles.chips}>
                        {t.campuses.map((c: string) => (
                          <button
                            key={c}
                            type="button"
                            className={styles.chip}
                            onClick={() => selectCampus(c)}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Step 2: iletişim formu */}
              {step >= 2 && (
                <>
                  <div className={styles.userMsg}>{campus}</div>
                  {step === 2 && (
                    <div>
                      <div className={styles.bot}>{t.contactQ}</div>
                      <form
                        className={styles.form}
                        onSubmit={(e) => {
                          e.preventDefault();
                          submit();
                        }}
                      >
                        <input
                          id="floating-robot-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          className={styles.input}
                          placeholder={t.placeholderName}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <input
                          id="floating-robot-phone"
                          name="tel"
                          type="tel"
                          autoComplete="tel"
                          className={styles.input}
                          placeholder={t.placeholderPhone}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          minLength={10}
                          pattern="[\d\s\+\-\(\)]{10,}"
                          title={t.errorPhone}
                        />
                        <button
                          type="submit"
                          className={styles.sendBtn}
                          disabled={!name.trim() || !phone.trim()}
                        >
                          {t.submit}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
              {isMobile && open && (
                <div className={styles.mobileRobotWrapper}>
                  {renderRobotCanvas(1.5, true, true)}
                </div>
              )}
            </div>

            {/* Footer — always rendered to prevent layout shift */}
            <footer className={styles.footer}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={goBack}
                style={{ visibility: (step > 0 || language !== "") ? "visible" : "hidden" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                {t.close || "Geri Dön"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
