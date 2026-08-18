const LEAD_EMAIL = "istanbul@akademik.com.tr";

export function buildLeadMailto({
  name,
  phone,
  branch,
  source,
}: {
  name: string;
  phone: string;
  branch: string;
  source: string;
}) {
  const divider = "──────────────────────────────";
  const subject = `🎓 Yeni Ön Bilgi Formu — ${branch || "Şube Belirtilmedi"}`;
  const body = [
    divider,
    "   YENİ ÖN BİLGİ FORMU TALEBİ",
    divider,
    "",
    `👤  İsim Soyisim  : ${name}`,
    `📞  Telefon       : ${phone}`,
    `🏫  Şube          : ${branch}`,
    `🌐  Kaynak Sayfa  : ${source}`,
    "",
    divider,
    "Bu talep avcilaringilizcekursu.com.tr üzerinden",
    "otomatik olarak oluşturulmuştur. Lütfen en kısa",
    "sürede öğrenciyle iletişime geçiniz.",
    divider,
  ].join("\n");

  return `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
