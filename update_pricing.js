const fs = require('fs');
const path = require('path');

const dataTr = {
  title: "Avcılar İngilizce Kursu Fiyatları 2026",
  description: "Avcılar İngilizce Kursu 2026 yılı güncel fiyatları 18.000 ₺ ile 72.000 ₺ arasında değişkenlik göstermektedir. Fiyat farklılıkları; kurs süresi, program türü (grup dersleri, birebir özel ders, online eğitim), eğitmenlerin sertifikasyon düzeyi, sınıf kapasitesi ve ek hizmetlere (yazma-konuşma değerlendirmesi, sınav hazırlığı danışmanlığı) bağlı olarak belirlenmektedir. Avcılar bölgesindeki İngilizce kursları; başlangıç seviyesi, orta seviye ve ileri seviye programları için farklı fiyat seçenekleri sunmaktadır. TOEFL, IELTS, YDT, Proficiency gibi uluslararası sınavlara hazırlık programları daha yüksek fiyat aralığında yer almaktadır. Avcılar İngilizce Kursu'nda uzun vadeli paket kurslara kayıt yapan öğrencilerin indirim avantajı bulunmaktadır. Kurs seçiminde fiyat kadar eğitmen tecrübesi, ders materyalinin kalitesi, başarı oranları ve öğrenci memnuniyeti de önemli kriterler arasında yer almaktadır.",
  cards: [
    {
      tier: "Genel İngilizce",
      price: "18.000 ₺",
      priceDetail: "'den başlayan fiyatlarla",
      features: [
        "Başlangıç, Orta ve İleri Seviye",
        "Grup Dersleri veya Online Eğitim",
        "Eğitmen Tecrübesi & Başarı Oranı"
      ],
      isPopular: false,
      btnText: "Bilgi Alın"
    },
    {
      tier: "Sınav Hazırlık Paketleri",
      price: "İndirim",
      priceDetail: "Avantajları",
      features: [
        "TOEFL, IELTS, YDT, Proficiency",
        "Yazma-Konuşma Değerlendirmesi",
        "Sınav Hazırlığı Danışmanlığı",
        "Uzun Vadeli Kayıt Avantajı"
      ],
      isPopular: true,
      popularBadge: "En Çok Tercih Edilen",
      btnText: "Fiyat Teklifi İsteyin"
    },
    {
      tier: "Özel Ders / Premium",
      price: "72.000 ₺",
      priceDetail: "'ye varan özel programlar",
      features: [
        "Birebir Özel Ders Seçeneği",
        "Özel Sınıf Kapasitesi",
        "Uluslararası Sertifikalı Eğitmenler"
      ],
      isPopular: false,
      btnText: "Detayları Görün"
    }
  ]
};

const dataEn = {
  title: "Avcılar English Course Prices 2026",
  description: "Avcılar English Course 2026 current prices vary between 18,000 ₺ and 72,000 ₺. Price differences are determined depending on course duration, program type (group classes, one-on-one private lessons, online education), certification level of instructors, class capacity and additional services (writing-speaking evaluation, exam preparation consulting). English courses in the Avcılar region offer different pricing options for beginner, intermediate and advanced level programs. Preparation programs for international exams such as TOEFL, IELTS, YDT, Proficiency are in a higher price range. Students who enroll in long-term package courses at Avcılar English Course have a discount advantage. In course selection, instructor experience, quality of course materials, success rates and student satisfaction are also among the important criteria as much as price.",
  cards: [
    {
      tier: "General English",
      price: "18.000 ₺",
      priceDetail: "starting prices",
      features: [
        "Beginner, Intermediate and Advanced Levels",
        "Group Classes or Online Education",
        "Instructor Experience & Success Rate"
      ],
      isPopular: false,
      btnText: "Get Info"
    },
    {
      tier: "Exam Preparation",
      price: "Discount",
      priceDetail: "Advantages",
      features: [
        "TOEFL, IELTS, YDT, Proficiency",
        "Writing-Speaking Evaluation",
        "Exam Preparation Consulting",
        "Long-term Enrollment Advantage"
      ],
      isPopular: true,
      popularBadge: "Most Preferred",
      btnText: "Request Quote"
    },
    {
      tier: "Private Lessons / Premium",
      price: "72.000 ₺",
      priceDetail: "up to premium programs",
      features: [
        "One-on-One Private Lesson Option",
        "Special Class Capacity",
        "Internationally Certified Instructors"
      ],
      isPopular: false,
      btnText: "See Details"
    }
  ]
};

const dataAr = {
  title: "أسعار دورة أفجيلار للغة الإنجليزية 2026",
  description: "تتراوح الأسعار الحالية لدورة أفجيلار للغة الإنجليزية لعام 2026 بين 18,000 ₺ و 72,000 ₺. يتم تحديد فروق الأسعار اعتمادًا على مدة الدورة، نوع البرنامج (دروس جماعية، دروس خصوصية فردية، تعليم عبر الإنترنت)، مستوى شهادة المدربين، سعة الفصل والخدمات الإضافية (تقييم الكتابة والتحدث، استشارات التحضير للامتحانات). تقدم دورات اللغة الإنجليزية في منطقة أفجيلار خيارات تسعير مختلفة لبرامج المبتدئين والمتوسطين والمتقدمين. برامج التحضير للامتحانات الدولية مثل TOEFL، IELTS، YDT، الكفاءة هي في نطاق سعري أعلى. يتمتع الطلاب الذين يسجلون في دورات باقات طويلة الأجل في دورة أفجيلار للغة الإنجليزية بميزة الخصم. في اختيار الدورة، تعد خبرة المدرب، جودة مواد الدورة، معدلات النجاح ورضا الطلاب من بين المعايير المهمة أيضًا بقدر السعر.",
  cards: [
    {
      tier: "اللغة الإنجليزية العامة",
      price: "18.000 ₺",
      priceDetail: "أسعار تبدأ من",
      features: [
        "مستويات المبتدئين والمتوسطين والمتقدمين",
        "دروس جماعية أو تعليم عبر الإنترنت",
        "خبرة المدرب ومعدل النجاح"
      ],
      isPopular: false,
      btnText: "احصل على معلومات"
    },
    {
      tier: "التحضير للامتحانات",
      price: "مزايا",
      priceDetail: "الخصم",
      features: [
        "TOEFL, IELTS, YDT, Proficiency",
        "تقييم الكتابة والتحدث",
        "استشارات التحضير للامتحانات",
        "ميزة التسجيل طويل الأجل"
      ],
      isPopular: true,
      popularBadge: "الأكثر تفضيلاً",
      btnText: "اطلب تسعيرة"
    },
    {
      tier: "دروس خصوصية / مميزة",
      price: "72.000 ₺",
      priceDetail: "تصل إلى البرامج المميزة",
      features: [
        "خيار الدرس الخصوصي الفردي",
        "سعة الفصل الخاصة",
        "مدربون معتمدون دوليًا"
      ],
      isPopular: false,
      btnText: "انظر التفاصيل"
    }
  ]
};

const paths = [
  { file: path.join(__dirname, 'app', 'dictionaries', 'tr.json'), data: dataTr, lang: 'tr' },
  { file: path.join(__dirname, 'app', 'dictionaries', 'en.json'), data: dataEn, lang: 'en' },
  { file: path.join(__dirname, 'app', 'dictionaries', 'ar.json'), data: dataAr, lang: 'ar' }
];

paths.forEach(({ file, data, lang }) => {
  let content = fs.readFileSync(file, 'utf8');
  let obj = JSON.parse(content);
  if (obj.avcilarIngilizceLandingPage) {
    obj.avcilarIngilizceLandingPage.coursePricing = data;
    fs.writeFileSync(file, JSON.stringify(obj, null, 2), 'utf8');
    console.log(`Added coursePricing to ${lang}.json`);
  }
});
