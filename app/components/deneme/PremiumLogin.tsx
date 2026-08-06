import React from "react";
import styles from "./PremiumLogin.module.css";
import Image from "next/image";

export function PremiumLogin() {
  return (
    <div className={styles.container}>
      
      {/* SOL TARAF - GÖRSEL ALAN (Sadece Masaüstünde Görünür) */}
      <div className={styles.leftSide}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/slider/campus-stock-1.jpg" // Using an existing image instead of '/kampus-resmi.jpg' which might not exist
            alt="Kampüs Resmi"
            fill
            className={styles.image}
          />
        </div>
        {/* Koyu Degrade Örtü */}
        <div className={styles.gradientOverlay}></div>
        {/* Slogan */}
        <div className={styles.sloganContent}>
          <h2 className={styles.sloganTitle}>Eğitimde Sınırları Aşın.</h2>
          <p className={styles.sloganText}>Akademik International ile hedeflerinize bir adım daha yaklaşın.</p>
        </div>
      </div>

      {/* SAĞ TARAF - FORM ALANI */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          
          {/* Başlık */}
          <div className={styles.headerArea}>
            <h1 className={styles.title}>
              Tekrar Hoş Geldiniz
            </h1>
            <p className={styles.subtitle}>
              Lütfen devam etmek için bilgilerinizi girin.
            </p>
          </div>

          {/* Form */}
          <form className={styles.form}>
            <div className={styles.inputsArea}>
              {/* Input Alanı 1 */}
              <div className={styles.inputWrapper}>
                <label className={styles.label}>
                  Öğrenci / TC Kimlik No
                </label>
                <input 
                  type="text" 
                  className={styles.input}
                  placeholder="Numaranızı giriniz"
                />
              </div>

              {/* Input Alanı 2 */}
              <div className={styles.inputWrapper}>
                <label className={styles.label}>
                  Şifre
                </label>
                <input 
                  type="password" 
                  className={styles.input}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Şifremi Unuttum & Beni Hatırla */}
            <div className={styles.formFooter}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Beni Hatırla</span>
              </label>
              <a href="#" className={styles.forgotPassword}>
                Şifremi unuttum
              </a>
            </div>

            {/* Buton */}
            <button className={styles.submitBtn}>
              Giriş Yap
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
