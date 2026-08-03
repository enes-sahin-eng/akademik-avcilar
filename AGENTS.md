# AGENTS.md — Akademik International (Avcılar) Frontend

Bu dosya, bu repoda kod yazan yapay zeka ajanları (Cursor, Claude Code vb.) ve geliştiriciler içindir. Son kullanıcıya veya cevap motorlarına yönelik değildir; site kapsamı için kök dizindeki `public/llms.txt` dosyasına bakınız.

## Proje Özeti

Akademik International Yabancı Dil Okulları (genel merkez: Avcılar) için çok dilli, SEO/GEO odaklı bir Next.js (App Router) web uygulaması. Şu an toplam **33 ana sayfa** yayındadır:

### Temel Sayfalar
- Anasayfa (`/`)
- İletişim (`/iletisim`)

### Genel İngilizce Kursları (Yetişkin & Seviye Bazlı)
- Genel İngilizce Kursu (`/ingilizce-kursu`)
- Prep - Temel İngilizce Hazırlık A1 (`/temel-ingilizce-kursu-hazirlik`)
- Prep Plus - Temel İngilizce Hazırlık Plus A2 (`/temel-ingilizce-kursu-hazirlik-plus`)
- Academic Express B1 (`/academic-express-ingilizce-kursu`)
- Academic B2-C1 (`/academic-ingilizce-kursu`)
- Academic Plus C1-C2 (`/academic-plus-ingilizce-kursu`)

### Yaş Grubu ve Özel Programlar
- İlköğretim İngilizce (`/ilkogretim-ingilizce-kursu`)
- Ortaokul İngilizce (`/ortaokul-ingilizce-kursu`)
- Lise İngilizce (`/lise-ingilizce-kursu`)
- İngilizce Özel Ders (`/ingilizce-ozel-ders`)

### Kurumsal & Profesyonel Hizmetler
- Kurumlara Özel / Kurumsal İngilizce (`/kurumlara-ozel-ingilizce-kursu`)
- İş İngilizcesi Kursu (`/is-ingilizcesi`)
- Havacılık ve Pilotluk İngilizcesi Kursu (`/havacilik-pilotluk-ingilizcesi-kursu`)
- Tercüme Hizmetleri (`/tercume-hizmeti`)

### Akademik Sınav Hazırlık — İngilizce
- Akademik İngilizce (`/akademik-ingilizce-kursu`) — kategori ana sayfası, breadcrumb'larda 2. seviye referans olarak kullanılır
- YDS Hazırlık (`/yds-hazirlik-kursu`)
- YÖKDİL Hazırlık (`/yokdil-hazirlik-kursu`)
- YKS-DİL / YDT Hazırlık (`/yks-dil-ydt-hazirlik-kursu`)
- IELTS Hazırlık (`/ielts-hazirlik-kursu`)
- TOEFL Hazırlık (`/toefl-hazirlik-kursu`)
- TOEIC Hazırlık (`/toeic-hazirlik-kursu`)
- GRE Hazırlık (`/gre-sinavi-hazirlik-kursu`)
- GMAT Hazırlık (`/gmat-hazirlik-kursu`)
- iTEP Hazırlık (`/itep-hazirlik-kursu`)
- Üniversite Hazırlık Atlama / Proficiency (`/ingilizce-hazirlik-atlama`)
- E-TEP Sınavı Nedir? (`/e-tep-sinavi-nedir`)
- SAT Hazırlık (`/sat-kursu`)
- PTE Hazırlık (`/pte-kursu`)
- CAE Hazırlık (`/cae-kursu`)

### Akademik Sınav Hazırlık — Almanca
- TestDaF Almanca (`/testdaf-almanca-kursu`)
- Goethe Sınavı Hazırlık (`/almanca-goethe-sinavi-hazirlik-kursu`)
- ÖSD Almanca Dil Sertifikası (`/osd-almanca-dil-sertifikasi-kursu`)

### Akademik Sınav Hazırlık — Diğer Diller
- TORFL Hazırlık (Rusça) (`/torfl-kursu`)
- CILS Hazırlık (İtalyanca) (`/cils-kursu`)
- TEF Hazırlık (Fransızca) (`/tef-kursu`)
- TELC Hazırlık (Almanca ve Diğer) (`/telc-kursu`)

### Amaca Yönelik Almanca Programları
- Almanca Aile Birleşimi Kursu (`/almanca-aile-birlesimi-kursu`)
- İzmir Almanca Aile Birleşimi Kursu (`/izmir-almanca-aile-birlesimi-kursu`)

### Lokasyon Bazlı Dil Kursları
- Kadıköy Almanca Kursu (`/kadikoy-almanca-kursu`)
- Beşiktaş Fransızca Kursu (`/fransizca-kursu-besiktas`)

> Diğer şube lokasyon sayfaları (Bursa, İzmir, Ankara vb.) ve İspanyolca/Fransızca gibi diğer diller yol haritasındadır. Footer'da bu sayfalar için `href="#"` placeholder linkleri bulunmaktadır — yeni sayfa açılınca hem `href` doldurulmalı hem `sitemap.ts` ve `llms.txt` güncellenmelidir.

## Teknoloji Yığını & Ortam

- **Çalışma Ortamı:** Node.js >= 18.x
- **Paket Yöneticisi:** `npm` (Tüm kurulum ve scriptler `npm` üzerinden yürütülecektir).
- **Doğrulama Komutları:** Geliştirme için `npm run dev`, hataları yakalamak için `npm run lint`, derleme testi için `npm run build`.
- **Framework:** Next.js (App Router). İnteraktif yaprak bileşenlerde `"use client"`; içerik/layout bileşenleri mümkün olduğunca Server Component kalmalı.
- **Stil:** Vanilla CSS Modules (`*.module.css`). **TailwindCSS kullanılmaz.**
- **Animasyon:** `framer-motion` — yalnızca UX'i gerçekten iyileştirdiğinde.
- **İkonlar:** `lucide-react`.
- **i18n:** Özel `DictionaryContext` + `/app/dictionaries/{tr,en,ar}.json`. Varsayılan dil: Türkçe. Middleware statik dosyaları hariç tutar; **`[lang]/layout.tsx` içinde geçersiz locale param'ları `notFound()` ile 404 verir** — asla `defaultLocale`'e fallback etme.

## Dizin Yapısı

- `/app` — Sayfa route'ları ve sözlükler (`/app/dictionaries`).
- `/app/components` — Yeniden kullanılabilir React bileşenleri (örn: `SeoContentBlock`) ve ilgili CSS modülleri.
- `/public` — Görseller, logo, ikon, statik varlıklar ve `llms.txt`.
- `/app/icon.png` — Next.js App Router konvensiyonu; `<link rel="icon">` meta tag'i buradan üretilir. Silinmesin.
- `/app/favicon.ico` — Browser'ların default `/favicon.ico` isteğini karşılar. **`app/icon.png` tek başına yetmez** — tarayıcı yine `/favicon.ico`'yu ister ve 404 alır. İki dosya da bulunmak zorunda.

## Ajanlar İçin Kesin Kurallar

### 1. Statik Metin Yasağı (i18n)

Bileşen koduna (`.tsx`) doğrudan Türkçe/İngilizce/Arapça metin yazma. Tüm kullanıcıya görünen metinler `tr.json`, `en.json` ve `ar.json` dosyalarına eklenir ve `useDictionary()` ile çağrılır. Üç sözlük de eş zamanlı güncellenmeli; eksik anahtar bırakma. Fallback (yedek) metinler yazarken mutlaka hedeflenen SEO anahtar kelimelerini (örn: LGS, YKS-DİL, Native Speaker) kullan.

### 2. Görsel Optimizasyonu & A11y (Erişilebilirlik)

- Ham `<img>` kullanma; daima `next/image` (`<Image />`).
- **A11y Zorunluluğu:** Her görselde açıklayıcı `alt` etiketi bulunmak zorundadır. Sadece ikon işlevi gören interaktif butonlarda (kapatma, menü vb.) mutlaka `aria-label` kullanılmalıdır (Örn: `LeadFormModal.tsx` içindeki `<button aria-label="Kapat">`).
- Klavye navigasyonu (focus state) CSS'te unutulmamalıdır.

### 3. İç Navigasyon: `<Link>` Zorunluluğu

- **Tüm iç sayfa linkleri `next/link`'ten `<Link>` ile yazılır.** Ham `<a href="/...">` kullanmak SEO/GEO açısından zayıftır (client-side prefetch ve navigation avantajı kaybolur).
- Yalnızca şu durumlarda `<a>` kullanılır: harici linkler (`https://...`, sosyal medya), `tel:`, `mailto:`, `wa.me`, ve sayfa-içi anchor (`#kimlik`).
- `href="#"` placeholder linkleri henüz açılmayan sayfalar içindir; sayfa açıldığında hem gerçek URL yazılır hem `<Link>`'e çevrilir.

### 4. Tasarım Dili (Premium & Modern)

Düz kutu ve yalın arka planlardan kaçın. Yeni bir tasarım dili icat etme; mevcut token ve component paternlerine sadık kal.

- **Referanslar:** Glassmorphism ve Mesh Gradient etkileri için `CourseHeroSlider.module.css` ve `Contact.module.css` dosyalarındaki `.formWrapper` ve `.heroContainer` yapılarını incele.
- Alternatifli arka planlar için `:nth-child(even)` gibi CSS kurallarını kullan (Örn: `SeoContentBlock.module.css`).

### 5. SEO & GEO Disiplini

- **Semantik HTML:** Sayfa başına tek `<h1>`, atlamayan başlık hiyerarşisi (`<h2>` → `<h3>`), `<section>`/`<nav>`/`<article>` etiketlerini kullan.
- **Meta Veriler:** `generateMetadata` fonksiyonunda daima `openGraph` (type: "website") ve `twitter` (card: "summary_large_image") kartları zorunlu olarak tanımlanmalıdır. Hiçbir sayfanın `description` alanı bir diğeriyle kopya olamaz.
- **Canonical URL:** `alternates.canonical` **her zaman gerçek klasör adıyla** birebir eşleşmeli. Slug ile klasör adının uyuşmaması ciddi SEO bug'ıdır (örn: klasör `kadikoy-almanca-kursu` iken canonical `/almanca-kursu` YAZMA).
- **JSON-LD Şemaları:** Sayfanın amacına göre `EducationalOrganization`, `Course` (Eğitimler için), `Service` (Tercüme vb. hizmetler için) ve `FAQPage` şemalarını doğru ata. Aynı sayfada aynı entity için tek JSON-LD bloğu kullan.
- **BreadcrumbList Kuralı:** Breadcrumb'ta yazılan her `item` URL'inin **gerçekten var olan bir sayfayı** işaret ettiğinden emin ol. Var olmayan bir kategori URL'i (örn: `/almanca-kursu` gibi hayali bir ana kategori) breadcrumb'a yazılırsa Google'a kırık link sinyali verir. Ara seviye kategori yoksa 2 seviyeli breadcrumb kullan (Anasayfa → Sayfa).
- **Sayfa Ekleme Zorunlu Adımları:** Her yeni sayfa açıldığında (a) `app/sitemap.ts` routes listesine eklenir, (b) `public/llms.txt` içinde ilgili kategori bölümüne açıklamayla eklenir, (c) `AGENTS.md` sayfa listesine eklenir, (d) Footer/Navbar/MegaMenu bağlantıları `<Link>` ile döşenir.

### 6. Kurumsal Bilgiler (Tek Doğruluk Kaynağı)

- Genel merkez: Avcılar. Adres: Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul. Tel: 0850 305 05 16.
- Formlarda ve banner'larda (örn: ÜCRETSİZ İNGİLİZCE) bulunan sabit dönüşüm metinlerini asla değiştirme.
- Lokasyon bazlı sayfalarda (Kadıköy, Bursa vb.) Course/LocalBusiness şemasındaki `address` alanı ilgili şubenin **gerçek** adresini içermelidir — "Kadıköy, İstanbul" gibi belirsiz metin kullanma; adres bilgisi yoksa kullanıcıya sor.

---

## 🛑 Otonom Ajan Kapanış Kontrol Listesi (Pre-flight Checklist)

Bir ajan (Cursor, Claude vb.) görevi tamamladığını kullanıcıya bildirmeden önce **kendi terminalinde ve sanal ortamında** şu kontrolleri yapmak zorundadır:

- [ ] `tr.json`, `en.json`, `ar.json` dosyalarının üçüne de yeni eklenen metinlerin anahtarları (keys) eklendi mi?
- [ ] Kodun içinde "hardcoded" (statik) metin unutuldu mu?
- [ ] Yeni bir sayfa/route oluşturulduysa `public/llms.txt`, `app/sitemap.ts` VE bu `AGENTS.md` sayfa listesi güncellendi mi?
- [ ] Yeni sayfanın `alternates.canonical` değeri klasör adıyla birebir eşleşiyor mu?
- [ ] Breadcrumb'taki her `item` URL'i gerçekten var olan bir sayfayı işaret ediyor mu?
- [ ] `generateMetadata` içerisinde OpenGraph ve Twitter kartları eksiksiz girildi mi?
- [ ] Sayfada birden fazla, çakışan JSON-LD (Schema) bloğu var mı? (Sadece 1 Course/Service ve 1 FAQPage olmalı).
- [ ] Yeni iç sayfa linkleri `<Link>` ile mi eklendi (ham `<a>` değil)?
- [ ] Terminalde `npm run lint` komutu çalıştırıldı ve sıfır hata/uyarı verdi mi?
- [ ] Terminalde `npm run build` komutu çalıştırıldı ve build işlemi hatasız tamamlandı mı?
