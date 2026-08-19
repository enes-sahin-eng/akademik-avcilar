import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const divider = "──────────────────────────────";

function buildLeadText({
  name,
  phone,
  branch,
  source,
}: {
  name: string;
  phone: string;
  branch?: string;
  source?: string;
}) {
  return [
    divider,
    "   YENİ ÖN BİLGİ FORMU TALEBİ",
    divider,
    "",
    `👤  İsim Soyisim  : ${name}`,
    `📞  Telefon       : ${phone}`,
    `🏫  Şube          : ${branch || "Belirtilmedi"}`,
    `🌐  Kaynak Sayfa  : ${source || "Bilinmiyor"}`,
    "",
    divider,
    "Bu talep avcilaringilizcekursu.com.tr üzerinden",
    "otomatik olarak oluşturulmuştur. Lütfen en kısa",
    "sürede öğrenciyle iletişime geçiniz.",
    divider,
  ].join("\n");
}

function buildNewsletterText({ email, source }: { email: string; source?: string }) {
  return [
    divider,
    "   YENİ BÜLTEN ABONELİĞİ",
    divider,
    "",
    `📧  E-posta       : ${email}`,
    `🌐  Kaynak Sayfa  : ${source || "Bilinmiyor"}`,
    "",
    divider,
    "Bu abonelik avcilaringilizcekursu.com.tr üzerinden",
    "otomatik olarak oluşturulmuştur.",
    divider,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, phone, branch, email, source } = body;

    let subject: string;
    let text: string;

    if (type === "newsletter") {
      if (!email) {
        return NextResponse.json({ error: "E-posta zorunlu." }, { status: 400 });
      }
      subject = "📧 Yeni Bülten Aboneliği";
      text = buildNewsletterText({ email, source });
    } else {
      if (!name || !phone) {
        return NextResponse.json({ error: "İsim ve telefon zorunlu." }, { status: 400 });
      }
      subject = `🎓 Yeni Ön Bilgi Formu — ${branch || "Şube Belirtilmedi"}`;
      text = buildLeadText({ name, phone, branch, source });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Avcılar İngilizce Kursu - Site" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_TO_EMAIL,
      replyTo: process.env.SMTP_USER,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead mail gönderim hatası:", err);
    return NextResponse.json({ error: "Mail gönderilemedi." }, { status: 500 });
  }
}
