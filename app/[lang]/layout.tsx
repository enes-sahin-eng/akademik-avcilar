import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  getDictionary,
  locales,
  defaultLocale,
  type Locale,
} from "../dictionaries/getDictionary";
import { ThemeProvider } from "../../src/context/ThemeContext";
import { Footer } from "../components/layout/Footer";
import { getOrganizationSchema } from "../../src/utils/seo";

/** Gövde metni — yüksek okunabilirlik */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Başlıklar, butonlar, etiketler — geometrik karakter */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const ogLocaleMap: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  ar: "ar_SA",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) {
    notFound();
  }
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const title: string = dict?.meta?.title ?? "Avcılar Frontend";
  const description: string =
    dict?.meta?.description ?? "Avcılar Frontend sitesi";

  const titleSuffix =
    lang === "en"
      ? "Akademik International Language Schools - Avcılar"
      : lang === "ar"
        ? "مدارس أكاديميك الدولية للغات - أفجيلار"
        : "Akademik International Dil Okulları - Avcılar";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${title} | ${titleSuffix}`,
      template: `%s | ${titleSuffix}`,
    },
    description,

    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
        ),

        "x-default": `${siteUrl}/${locales[0]}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}`,
      siteName: title,
      locale: ogLocaleMap[lang] || ogLocaleMap[defaultLocale],
      alternateLocale: locales
        .filter((l) => l !== lang)
        .map((l) => ogLocaleMap[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) {
    notFound();
  }
  const lang = rawLang as Locale;

  const direction = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      <head>
        {/*
          Temayı React hydrate olmadan ÖNCE uygular (tema flash'ını önler).
        */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.setAttribute("data-theme",d?"dark":"light");r.classList.add(d?"dark":"light");}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${geistMono.variable}`}
      >
        <ThemeProvider>
          <script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getOrganizationSchema(siteUrl))
            }}
          />
          {children}
          <Footer lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
