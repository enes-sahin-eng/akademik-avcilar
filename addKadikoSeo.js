const fs = require('fs');
const path = require('path');

const trSeo = [
  {
    level: "h1",
    title: "Kadıköy Dil Kursu",
    desc: "Kadıköy dil kursları, özellikle dil eğitimine sıfırdan başlayanlar veya mevcut teorik bilgisini akıcı bir konuşma becerisine dönüştürmek isteyenler için önemli fırsatlar sunmaktadır. <b>Kadıköy Dil Kursları</b>, tamamen öğrenci merkezli bir yaklaşımla ilerleyerek her seviyedeki bireye uygun, dinamik bir eğitim ortamı sağlar. Kadıköy İngilizce Dil Kursları, alanında uzman eğitmenler eşliğinde interaktif bir öğrenme deneyimi sunar ve gramer ezberinden ziyade aktif iletişime odaklanır. Dil yetkinliğini geliştirmenin yanı sıra uluslararası sertifikalar aracılığıyla bu bilgiyi belgeleme imkanı sunar. Farklı dil seviyelerine yönelik zenginleştirilmiş programlarıyla dikkat çeken Kadıköy'de bulunan yabancı dil kursları, öğrencilere zaman ve program konusunda esneklik sağlar.<br/><br/><b>Kadıköy Dil Kursları:</b>",
    table: {
      headers: ["Kadıköy Dil Kursları 2026", "Hedef Kitle ve Programları", "Konum"],
      rows: [
        ["Akademik International Yabancı Dil Kursu", "Başlangıç seviyesinden akademik düzeye kadar her yaş grubu için özel hazırlanmış eğitim programları", "Rasimpaşa Mahallesi Rıhtım Caddesi Recaizade Sokak Kadıköy/İstanbul"],
        ["Akademik Kids Dil Okulu", "Çocuklara özgü her yaş ve seviye için hazırlanmış oyun temelli programlar", "Kadıköy Merkez"],
        ["Letslingo Dil Kursu", "Her seviyeden öğrenciler için 22 farklı yabancı dil eğitiminde interaktif online eğitim programları", "Online"],
        ["Akademik Abroad", "Yabancı dil eğitimini yurt dışında pekiştirmek isteyen öğrenciler için danışmanlık ve eğitim programları", "Kampüs"]
      ]
    }
  },
  {
    level: "h2",
    title: "Kadıköy En İyi İngilizce Kursu",
    desc: "<b>Kadıköy En İyi İngilizce Kursu</b>, Anadolu Yakası'nın en merkezi noktalarından biri olan Rıhtım Caddesin de tüm toplu ulaşım araçlarına yürüme mesafesinde hizmet vermektedir. Kadıköy'ün En İyi İngilizce Kursu olarak tavsiye ve öneri sıralamalarında zirvede olan Akademik Dil Kursu stratejik konumu ve kapsamlı müfredatı ile öğrencilerine tam donanımlı bir dil eğitimi sağlamaktadır.<br/>Modern dersliklerimiz ve maksimum 10-12 kişilik sınıflarımızda:",
    bullets: [
      "İngilizce Kursu Grup Dersleri, TOEFL, IELTS, YDS gibi uluslararası ve akademik sınav hazırlık programları",
      "4-14 yaş arası çocuklar için özel İngilizce eğitimi (Kids & Junior)",
      "Üniversite hazırlık öğrencileri için Proficiency ve akademik İngilizce",
      "Çalışan profesyoneller için İş İngilizcesi (Business English)",
      "Speaking Club (Konuşma Kulübü) aktiviteleri",
      "Online telafi ve destek dersleri",
      "Birebir özel ders imkanı"
    ],
    bulletStyle: "triangle",
    summary: "sunulmaktadır.<br/>Özellikle çocuk gruplarımızda yaşayarak öğrenme metodolojisi kullanılırken, sınav hazırlık gruplarımızda deneyimli kadromuzla sınav stratejilerine yönelik, sonuç odaklı bir eğitim süreci yürütülmektedir. Kadıköy Rıhtım İngilizce kursu olarak bölgemizdeki öğrencilerimize esnek ders saatleri ve ücretsiz seviye tespit sınavı ile her yaş grubuna hitap eden programlar sunmaktayız.<br/>Boğa Heykeli, Moda sahili, Bahariye ve Söğütlüçeşme çevresinde yaşayan öğrencilerimiz için sabah, öğle ve akşam grupları oluşturarak, size en uygun zaman diliminde eğitim alma imkanı sağlıyoruz. Ayrıca bölgedeki kurumsal şirketlerle yaptığımız işbirlikleri sayesinde, sektörel İngilizce konusunda da uzmanlaşmış durumdayız."
  },
  {
    level: "h2",
    title: "Kadıköy İngilizce Kursu Fiyatları 2026",
    desc: "<b>Kadıköy İngilizce Kursu Fiyatları 2026</b> yılında genel olarak 18.000 ₺ ile 95.000 ₺ arasında değişkenlik göstermektedir. Bu fiyat aralığı; alınan eğitimin toplam ders saati yoğunluğuna, sınıf mevcuduna ve sunulan ek materyallere göre farklılıklar arz eder. <b>Kadıköy İngilizce Kursu Fiyatları 2026</b> yılı döneminde avantajlı konumda olan Akademik International Dil Kursları olarak, ulusal çaptaki tecrübemizi İstanbul'un merkezinde, ulaşılabilir maliyetlerle sunmayı ilke edindik. Eğitim ücretini bir masraf kalemi olarak değil, kazandıracağı yetkinliklerle geri dönecek bir değer olarak görüyoruz.<br/>Eğitim süreciniz boyunca ihtiyaç duyacağınız tüm materyalleri, global standartlardaki \"The Academic Publishing\" yayın desteğiyle karşılıyoruz. <b>Kadıköy İngilizce Kursu Fiyatları 2026</b> fiyatları ile kıyaslandığınızda, sunduğumuz ders saati yoğunluğu, ücretsiz aktiviteler ve kaynak kalitesi; kurumumuzu \"Fiyat/Fayda\" dengesinde zirveye taşımaktadır. Kadıköy dil kursu fiyatları, öğrencilerimizin ekonomik planlamalarını zorlamayacak taksit seçenekleri ve esnek ödeme planlarıyla kurgulanmıştır. Amacımız, bütçe kaygısı yaşamadan sadece dil gelişimine odaklanmanızı sağlamaktır.<br/><br/><b>Kadıköy İngilizce Kursu Fiyatları 2026:</b>",
    table: {
      headers: ["İngilizce Seviye", "En Düşük Fiyat (₺)", "En Yüksek Fiyat (₺)"],
      rows: [
        ["Başlangıç (Basic)", "12.000 ₺", "20.000 ₺"],
        ["Temel Seviye (Prep)", "15.000 ₺", "35.000 ₺"],
        ["Orta Seviye (Prep Plus)", "20.000 ₺", "38.000 ₺"],
        ["İleri Seviye (Express)", "20.000 ₺", "40.000 ₺"],
        ["Yüksek Seviye (Academic Express)", "25.000 ₺", "42.000 ₺"],
        ["Üst Seviye (Academic Plus)", "30.000 ₺", "55.000 ₺"]
      ]
    },
    summary: "<b>Kadıköy İngilizce Kursu Fiyatları 2026</b>, öğrencinin tercih edeceği programa, yoğunluğa ve 2025 yılı eğitim dönemine göre değişkenlik gösterebilir. Uygun fiyatlarla kaliteli İngilizce eğitimi için en doğru adrestesiniz! Detaylı bilgi ve dönemsel kampanyalar için bize ulaşın."
  },
  {
    level: "h2",
    title: "Kadıköy İngilizce Kursu Tavsiye: Programlarımız",
    desc: "<b>Kadıköy İngilizce Kursu Tavsiyesi</b> olarak en çok tercih edilen Akademik International Dil Kursu bünyesinde uyguladığımız eğitim modülleri, katılımcıların yaş aralığına, mevcut dil yetkinliğine ve ulaşmak istedikleri spesifik hedeflere göre şekillenmektedir. Tüm müfredatımız, Avrupa Ortak Dil Kriterleri (CEFR) çerçevesinde yapılandırılmış olup, modern pedagojik yaklaşımlarla desteklenmektedir."
  },
  {
    level: "h3",
    title: "Kadıköy İngilizce Dil Kursu: Genel İngilizce Programları",
    bullets: [
      "<b>Başlangıç (A1-A2):</b> Dilin yapı taşlarını sağlam bir zemin üzerine kurma ve günlük temel ihtiyaçları karşılama.",
      "<b>Orta Seviye (B1-B2):</b> Karmaşık cümle yapılarına hakimiyet, sosyal hayatta özgüvenli diyalog ve akıcılık kazanma.",
      "<b>İleri Seviye (C1-C2):</b> Soyut kavramları tartışabilme, profesyonel yetkinlik ve nüanslara hakim üst düzey dil kullanımı."
    ],
    bulletStyle: "diamond"
  },
  {
    level: "h3",
    title: "Özel Amaçlı İngilizce Programları",
    bullets: [
      "<b>İş İngilizcesi:</b> Global kariyer hedefleri doğrultusunda toplantı yönetimi, profesyonel yazışma teknikleri ve müzakere becerileri.",
      "<b>Akademik İngilizce:</b> Lisans ve yüksek lisans süreçlerinde gerekli olan literatür tarama, makale analizi ve Proficiency sınavlarına yönelik stratejik çalışma.",
      "<b>Çocuklara Özel İngilizce:</b> 7-14 yaş grubu için çocuk pedagojisine uygun, oyunlaştırma tabanlı ve dili sevdiren doğal edinim süreçleri."
    ],
    bulletStyle: "diamond",
    summary: "<b>Kadıköy'deki İngilizce kursumuzda</b>, standart kalıplara sıkışmak yerine size en uygun rotayı çiziyoruz. İster sınıf dinamiği içerisinde sosyalleşerek, dilerseniz eğitmeninizle birebir çalışabileceğiniz özel ders formatında eğitim sürecinizi planlayabilirsiniz."
  },
  {
    level: "h3",
    title: "Kadıköy Hazırlık Atlama (Proficiency) Kursu: Hazırlık Atlama Sınav Eğitimi",
    desc: "<b>Kadıköy Hazırlık Atlama (Proficiency) Kursu</b> seçimi yaparken, sadece tabeladaki isme değil, kurumun eğitim felsefesine ve öğrenciye kattığı vizyona odaklanmak gerekir. Bu süreçte en belirleyici unsur, kurumun sunduğu eğitim garantisi ve köklü tecrübesidir.<br/><b>Kadıköy Hazırlık Atlama (Proficiency) Kursu</b> arasında en çok tercih edilen yabancı dil kursu olma vizyonuyla hareket eden şubemiz, klasik ezber yöntemlerini reddeden ve Türkiye genelinde başarısı kanıtlanmış özgün bir eğitim modeli uygular.<br/><b>Kadıköy Hazırlık Atlama (Proficiency) Kursu</b> statüsünü, sadece reklamlarla değil, mezun ettiğimiz öğrencilerimizin başarı hikayeleriyle koruyoruz. Eğitim süreçlerinin sonunda yapılan değerlendirmelerde elde ettiğimiz %90'ın üzerindeki memnuniyet ve başarı oranı, kalitemizin en şeffaf kanıtıdır.<br/><b>Kadıköy Hazırlık Atlama (Proficiency) Kursu</b> araştırmanızda Akademik Yabancı Dil Kursu'nu farklı kılan özellik; dili parçalara ayırmadan sınav stratejisi ile öğretmesidir. Okuma, yazma, dinleme ve konuşma becerilerini eş zamanlı geliştiren ve Üniversite sınav programına özel olarak sağlanan yayın setlerimizle, hedeflediğiniz skora en sağlam adımlarla ulaşmanızı sağlıyoruz."
  }
];

const enSeo = JSON.parse(JSON.stringify(trSeo));
enSeo[0].title = "Kadıköy Language Course";
enSeo[1].title = "Best English Course in Kadıköy";
enSeo[2].title = "Kadıköy English Course Prices 2026";
enSeo[3].title = "Kadıköy English Course Recommendation: Our Programs";
enSeo[4].title = "Kadıköy English Language Course: General English Programs";
enSeo[5].title = "Special Purpose English Programs";
enSeo[6].title = "Kadıköy Proficiency Exemption Course: Prep Exemption Exam Training";

const arSeo = JSON.parse(JSON.stringify(trSeo));
arSeo[0].title = "دورة اللغة في كاديكوي";
arSeo[1].title = "أفضل دورة لغة إنجليزية في كاديكوي";
arSeo[2].title = "أسعار دورة اللغة الإنجليزية في كاديكوي 2026";
arSeo[3].title = "توصية دورة اللغة الإنجليزية في كاديكوي: برامجنا";
arSeo[4].title = "دورة اللغة الإنجليزية في كاديكوي: برامج اللغة الإنجليزية العامة";
arSeo[5].title = "برامج اللغة الإنجليزية لأغراض خاصة";
arSeo[6].title = "دورة كاديكوي للإعفاء من التحضيري (Proficiency): تدريب امتحان الإعفاء";

const dictPath = path.join(__dirname, 'app', 'dictionaries');

['tr', 'en', 'ar'].forEach(lang => {
  const filePath = path.join(dictPath, lang + '.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.kadikoyIngilizceLandingPage) {
    data.kadikoyIngilizceLandingPage = {};
  }
  
  if (lang === 'tr') {
    data.kadikoyIngilizceLandingPage.seoContent = trSeo;
  } else if (lang === 'en') {
    data.kadikoyIngilizceLandingPage.seoContent = enSeo;
  } else if (lang === 'ar') {
    data.kadikoyIngilizceLandingPage.seoContent = arSeo;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log("SEO content added to dictionaries.");
