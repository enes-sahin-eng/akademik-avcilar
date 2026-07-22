import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "ar"];
const defaultLocale = "tr";
const localeCookieName = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    // Kullanıcının seçtiği dili hatırlamak için cookie güncelle
    const currentLocale = pathname.split("/")[1];
    const response = NextResponse.next();
    response.cookies.set(localeCookieName, currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 yıl
      sameSite: "lax",
    });
    return response;
  }

  // Öncelik: cookie'de kayıtlı dil > defaultLocale
  // NOT: Accept-Language header'ına göre otomatik yönlendirme YAPMIYORUZ.
  // Bu, arama motorlarının farklı dil versiyonlarını (hreflang ile) taramasını
  // engellememek için bilinçli bir tercih. Google bile bunu önerir.
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const targetLocale =
    cookieLocale && locales.includes(cookieLocale)
      ? cookieLocale
      : defaultLocale;

  const newPath =
    pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;

  const redirectUrl = new URL(newPath + search, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Şu path'leri hariç tut:
     * - api (API route'ları)
     * - _next/static, _next/image (Next.js dahili dosyaları)
     * - favicon.ico, robots.txt, sitemap.xml, manifest.json (SEO için kritik, redirect edilmemeli)
     * - Uzantılı tüm statik dosyalar (.png, .jpg, .svg, .css, .js vs)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|ttf|eot)$).*)",
  ],
};
