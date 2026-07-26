# AGENTS.md — Akademik International (Avcılar) Frontend

Bu dosya, bu repoda kod yazan yapay zeka ajanları (Cursor, Claude Code vb.) ve geliştiriciler içindir. Son kullanıcıya veya cevap motorlarına yönelik değildir; site kapsamı için kök dizindeki `public/llms.txt` dosyasına bakınız.

## Proje Özeti

Akademik International Yabancı Dil Okulları (genel merkez: Avcılar) için çok dilli, SEO/GEO odaklı bir Next.js (App Router) web uygulaması. Şu an yalnızca anasayfa (`/`) ve iletişim (`/iletisim`) route'ları kodlanmıştır; program ve şube sayfaları aşamalı eklenecektir.

## Teknoloji Yığını

- **Framework:** Next.js (App Router). İnteraktif yaprak bileşenlerde `"use client"`; içerik/layout bileşenleri mümkün olduğunca Server Component kalmalı.
- **Stil:** Vanilla CSS Modules (`*.module.css`). **TailwindCSS kullanılmaz.**
- **Animasyon:** `framer-motion` — yalnızca UX'i gerçekten iyileştirdiğinde.
- **İkonlar:** `lucide-react`.
- **i18n:** Özel `DictionaryContext` + `/app/dictionaries/{tr,en,ar}.json`. Varsayılan dil: Türkçe.

## Dizin Yapısı

- `/app` — Sayfa route'ları ve sözlükler (`/app/dictionaries`).
- `/app/components` — Yeniden kullanılabilir React bileşenleri ve ilgili CSS modülleri.
- `/public` — Görseller, logo, ikon, statik varlıklar ve `llms.txt`.

## Ajanlar İçin Kesin Kurallar

### 1. Statik Metin Yasağı (i18n)

Bileşen koduna (`.tsx`) doğrudan Türkçe/İngilizce/Arapça metin yazma. Tüm kullanıcıya görünen metinler `tr.json`, `en.json` ve `ar.json` dosyalarına eklenir ve `useDictionary()` ile çağrılır. Üç sözlük de eş zamanlı güncellenmeli; eksik anahtar bırakma.

### 2. Görsel Optimizasyonu

Ham `<img>` kullanma; daima `next/image` (`<Image />`). Her görselde açıklayıcı `alt`, doğru `width`/`height` (CLS önlemi) ve above-the-fold görsellerde `priority`. Bulanıklık sorununda önce `sizes` ve kaynak çözünürlüğünü kontrol et; `quality={100}` / `unoptimized` yalnızca son çare.

### 3. Tasarım Dili (Premium & Modern)

Düz kutu ve yalın arka planlardan kaçın. Mesh gradient, glassmorphism, yumuşak box-shadow ve akıcı framer-motion geçişleri hedeflenir. Yeni bir tasarım dili icat etme; mevcut token ve component paternlerine sadık kal.

### 4. SEO & GEO Disiplini (zorunlu)

- Semantik HTML: sayfa başına tek `<h1>`, atlamayan başlık hiyerarşisi (`<h2>` → `<h3>`), `<section>`/`<nav>`/`<address>`.
- DOM kaynak sırası anlamlı olsun; CSS ile görsel sırayı bozarken ana içeriği DOM'da geri itme.
- Her bölüm kendi kendine anlaşılır olmalı (chunk'lanabilirlik): başlık + özneyi içeren net metin. Reuse edilen bileşenlerde özne/bağlam prop olarak metne girsin.
- Yeni sayfalar için: self-referencing canonical, sayfaya özel `metadata` (title/description), ve uygun JSON-LD (`EducationalOrganization`, `Course`, `FAQPage`, `BreadcrumbList`). Aynı sayfada bir entity için tek JSON-LD bloğu.
- Gizli/açılır içerik (accordion, tab) koşullu render değil, DOM'da mevcut olup CSS ile gizlensin.

### 5. Kurumsal Bilgiler (tek doğruluk kaynağı)

- Genel merkez: Avcılar. Adres: Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul. Tel: 0850 305 05 16.
- Harita iframe'i, adres ve şube verileri güncellenirken bu bilgiyi esas al. Şube listesi JSON/sözlük olarak tutulur (12 şube).

## Yeni Route Eklerken

Program veya şube sayfası oluştururken: URL yapısını netleştir, üç dilde metadata + sözlük anahtarları ekle, ilgili JSON-LD'yi ekle ve **yeni yayınlanan sayfayı `public/llms.txt`'ye linkle**. llms.txt'de yalnızca gerçekten erişilebilir URL'ler linklenir.
