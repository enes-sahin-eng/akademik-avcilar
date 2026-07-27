# AGENTS.md — Akademik International (Avcılar) Frontend

Bu dosya, bu repoda kod yazan yapay zeka ajanları (Cursor, Claude Code vb.) ve geliştiriciler içindir. Son kullanıcıya veya cevap motorlarına yönelik değildir; site kapsamı için kök dizindeki `public/llms.txt` dosyasına bakınız.

## Proje Özeti

Akademik International Yabancı Dil Okulları (genel merkez: Avcılar) için çok dilli, SEO/GEO odaklı bir Next.js (App Router) web uygulaması. Şu an toplam **15 ana sayfa** yayındadır:

- **Temel Sayfalar:** Anasayfa (`/`), İletişim (`/iletisim`)
- **Genel & Akademik Programlar:** (`/ingilizce-kursu`, `/akademik-ingilizce-kursu`)
- **Seviye ve Sınav Odaklı Sayfalar:** (`/temel-ingilizce-kursu-hazirlik`, `/temel-ingilizce-kursu-hazirlik-plus`, `/academic-express-ingilizce-kursu`, `/academic-ingilizce-kursu`, `/academic-plus-ingilizce-kursu`)
- **Yaş Grubu ve Özel Programlar:** İlköğretim (`/ilkogretim-ingilizce-kursu`), Ortaokul (`/ortaokul-ingilizce-kursu`), Lise (`/lise-ingilizce-kursu`), Özel Ders (`/ingilizce-ozel-ders`)
- **Kurumsal & Profesyonel Hizmetler:** Kurumsal İngilizce (`/kurumsal-ingilizce`), Tercüme Hizmetleri (`/tercume-hizmeti`)

## Teknoloji Yığını & Ortam

- **Çalışma Ortamı:** Node.js >= 18.x
- **Paket Yöneticisi:** `npm` (Tüm kurulum ve scriptler `npm` üzerinden yürütülecektir).
- **Doğrulama Komutları:** Geliştirme için `npm run dev`, hataları yakalamak için `npm run lint`, derleme testi için `npm run build`.
- **Framework:** Next.js (App Router). İnteraktif yaprak bileşenlerde `"use client"`; içerik/layout bileşenleri mümkün olduğunca Server Component kalmalı.
- **Stil:** Vanilla CSS Modules (`*.module.css`). **TailwindCSS kullanılmaz.**
- **Animasyon:** `framer-motion` — yalnızca UX'i gerçekten iyileştirdiğinde.
- **İkonlar:** `lucide-react`.
- **i18n:** Özel `DictionaryContext` + `/app/dictionaries/{tr,en,ar}.json`. Varsayılan dil: Türkçe.

## Dizin Yapısı

- `/app` — Sayfa route'ları ve sözlükler (`/app/dictionaries`).
- `/app/components` — Yeniden kullanılabilir React bileşenleri (örn: `SeoContentBlock`) ve ilgili CSS modülleri.
- `/public` — Görseller, logo, ikon, statik varlıklar ve `llms.txt`.

## Ajanlar İçin Kesin Kurallar

### 1. Statik Metin Yasağı (i18n)

Bileşen koduna (`.tsx`) doğrudan Türkçe/İngilizce/Arapça metin yazma. Tüm kullanıcıya görünen metinler `tr.json`, `en.json` ve `ar.json` dosyalarına eklenir ve `useDictionary()` ile çağrılır. Üç sözlük de eş zamanlı güncellenmeli; eksik anahtar bırakma. Fallback (yedek) metinler yazarken mutlaka hedeflenen SEO anahtar kelimelerini (örn: LGS, YKS-DİL, Native Speaker) kullan.

### 2. Görsel Optimizasyonu & A11y (Erişilebilirlik)

- Ham `<img>` kullanma; daima `next/image` (`<Image />`).
- **A11y Zorunluluğu:** Her görselde açıklayıcı `alt` etiketi bulunmak zorundadır. Sadece ikon işlevi gören interaktif butonlarda (kapatma, menü vb.) mutlaka `aria-label` kullanılmalıdır (Örn: `LeadFormModal.tsx` içindeki `<button aria-label="Kapat">`).
- Klavye navigasyonu (focus state) CSS'te unutulmamalıdır.

### 3. Tasarım Dili (Premium & Modern)

Düz kutu ve yalın arka planlardan kaçın. Yeni bir tasarım dili icat etme; mevcut token ve component paternlerine sadık kal.

- **Referanslar:** Glassmorphism ve Mesh Gradient etkileri için `CourseHeroSlider.module.css` ve `Contact.module.css` dosyalarındaki `.formWrapper` ve `.heroContainer` yapılarını incele.
- Alternatifli arka planlar için `:nth-child(even)` gibi CSS kurallarını kullan (Örn: `SeoContentBlock.module.css`).

### 4. SEO & GEO Disiplini

- **Semantik HTML:** Sayfa başına tek `<h1>`, atlamayan başlık hiyerarşisi (`<h2>` → `<h3>`), `<section>`/`<nav>`/`<article>` etiketlerini kullan.
- **Meta Veriler:** `generateMetadata` fonksiyonunda daima `openGraph` (type: "website") ve `twitter` (card: "summary_large_image") kartları zorunlu olarak tanımlanmalıdır. Hiçbir sayfanın `description` alanı bir diğeriyle kopya olamaz.
- **JSON-LD Şemaları:** Sayfanın amacına göre `EducationalOrganization`, `Course` (Eğitimler için), `Service` (Tercüme vb. hizmetler için) ve `FAQPage` şemalarını doğru ata. Aynı sayfada aynı entity için tek JSON-LD bloğu kullan.

### 5. Kurumsal Bilgiler (Tek Doğruluk Kaynağı)

- Genel merkez: Avcılar. Adres: Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul. Tel: 0850 305 05 16.
- Formlarda ve banner'larda (örn: ÜCRETSİZ İNGİLİZCE) bulunan sabit dönüşüm metinlerini asla değiştirme.

---

## 🛑 Otonom Ajan Kapanış Kontrol Listesi (Pre-flight Checklist)

Bir ajan (Cursor, Claude vb.) görevi tamamladığını kullanıcıya bildirmeden önce **kendi terminalinde ve sanal ortamında** şu kontrolleri yapmak zorundadır:

- [ ] `tr.json`, `en.json`, `ar.json` dosyalarının üçüne de yeni eklenen metinlerin anahtarları (keys) eklendi mi?
- [ ] Kodun içinde "hardcoded" (statik) metin unutuldu mu?
- [ ] Yeni bir sayfa/route oluşturulduysa `public/llms.txt` dosyasına URL eklendi mi?
- [ ] `generateMetadata` içerisinde OpenGraph ve Twitter kartları eksiksiz girildi mi?
- [ ] Sayfada birden fazla, çakışan JSON-LD (Schema) bloğu var mı? (Sadece 1 Course/Service ve 1 FAQPage olmalı).
- [ ] Terminalde `npm run lint` komutu çalıştırıldı ve sıfır hata/uyarı verdi mi?
- [ ] Terminalde `npm run build` komutu çalıştırıldı ve build işlemi hatasız tamamlandı mı?
