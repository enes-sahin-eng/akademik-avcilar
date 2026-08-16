const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'app/dictionaries/tr.json');
const enPath = path.join(__dirname, 'app/dictionaries/en.json');
const arPath = path.join(__dirname, 'app/dictionaries/ar.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

function reorderAndAdd(langCode, dict) {
  const tabs = dict.avcilarIngilizceLandingPage.institutionStatsTabs.tabs;
  const egitmen = tabs.find(t => t.id === 'egitmen-kadrosu');
  const basari = tabs.find(t => t.id === 'basari-istatistikleri');
  const garantiler = tabs.find(t => t.id === 'garantiler');

  let dersSaatleri, kayitSureci;

  if (langCode === 'tr') {
    dersSaatleri = {
      id: "ders-saatleri",
      label: "Ders Saatleri ve Takvimi",
      color: "navy",
      sections: [
        {
          title: "Avcılar İngilizce Kursu Ders Saatleri ve Takvimi",
          content: "Avcılar İngilizce Kursu, yoğun yaşam temposu ile uyum sağlayan esnek ders saatleri sunmaktadır. Sabah sınıfları saat 08:00'den başlayıp öğleden sonrası sınıfları saat 17:00'ye kadar, akşam sınıfları ise 18:30-21:30 arasında yapılmaktadır. Hafta sonu pazar günü özel sınıflar da mevcuttur; cumartesi ve pazar günleri 09:00-13:00 arasında yoğun program seçeneği bulunmaktadır. Avcılar'da İngilizce Kursu takvimi, devlet okulları tatillerine uyum göstermekte, yazlık yoğun kurslar (Haziran-Ağustos) ve kış kursları (Aralık-Şubat) ayrı ayrı planlanmaktadır. Online sınıflar ise 24/7 esneklikle sunulur; öğrenci istediği saatte canlı derslerine katılabilir."
        }
      ]
    };
    kayitSureci = {
      id: "kayit-sureci",
      label: "Kayıt Süreci",
      color: "red",
      sections: [
        {
          title: "Avcılar Akademik International Dil Kursu'na Kaydolmak Çok Kolay!",
          content: "Avcılar İngilizce Kursu'na kayıt yaptırmak oldukça basit ve hızlıdır. İlk adım olarak, öğrenci Avcılar'daki kurs merkezine gelerek veya çevrimiçi olarak ücretsiz seviye tespit sınavı (Placement Test) yapmaktadır. Bu sınavda; dinleme, okuma, gramer ve konuşma becerisi ölçülmektedir. Testin ardından Avcılar Akademik International Dil Kursu danışmanları, öğrencinin seviyesi, hedefi ve uygun program önerir. Kayıt dosyası tamamlandıktan sonra ödeme yapılmakta, öğrenci ilk dersine katılma hakkı elde etmektedir. Avcılar İngilizce Kursu'nda erken kayıt kampanyaları düzenli olarak yapılmakta; yılbaşı, yaz ve eğitim-öğretim yılı başında %10-20 indirim uygulanmaktadır. Çevrimiçi kayıt sistemi sayesinde Avcılar'da İngilizce Kursu'na evden kayıt mümkündür. Avcılar Akademik International Dil Kursu'nda hızlı kayıt süreci tamamlandıktan sonra, öğrenci aynı hafta içinde derslerine başlayabilir."
        },
        {
          title: "Kayıt Adımları:",
          list: [
            "Ücretsiz seviye tespit sınavı (online veya yüz yüze)",
            "Danışman görüşmesi ve program seçimi",
            "Ödeme ve sözleşme imzalama",
            "İlk ders tarihinin belirlenmesi",
            "Ders materyallerinin teslimi"
          ]
        }
      ]
    };
  } else if (langCode === 'en') {
    dersSaatleri = {
      id: "ders-saatleri",
      label: "Lesson Hours and Schedule",
      color: "navy",
      sections: [
        {
          title: "Avcılar English Course Lesson Hours and Schedule",
          content: "Avcılar English Course offers flexible lesson hours adapting to intensive life paces. Morning classes start from 08:00 and afternoon classes continue until 17:00, while evening classes are held between 18:30-21:30. Special Sunday classes are available on weekends; intensive programs are offered on Saturdays and Sundays between 09:00-13:00. The English Course schedule in Avcılar aligns with public school holidays, and intensive summer courses (June-August) and winter courses (December-February) are planned separately. Online classes are offered with 24/7 flexibility; students can join live lessons at their preferred time."
        }
      ]
    };
    kayitSureci = {
      id: "kayit-sureci",
      label: "Registration Process",
      color: "red",
      sections: [
        {
          title: "Registering for Avcılar Akademik International Language Course is Very Easy!",
          content: "Registering for the Avcılar English Course is quite simple and fast. As a first step, the student takes a free placement test either by visiting the course center in Avcılar or online. In this test; listening, reading, grammar, and speaking skills are measured. Following the test, Avcılar Akademik International Language Course consultants recommend a suitable program based on the student's level and goal. After the registration file is completed, payment is made, and the student gains the right to attend their first lesson. Early registration campaigns are regularly organized at the Avcılar English Course; a 10-20% discount is applied at New Year, summer, and the beginning of the academic year. Thanks to the online registration system, it is possible to register for the English Course in Avcılar from home. After completing the quick registration process at Avcılar Akademik International Language Course, students can start their lessons within the same week."
        },
        {
          title: "Registration Steps:",
          list: [
            "Free placement test (online or face-to-face)",
            "Consultant interview and program selection",
            "Payment and signing the contract",
            "Determining the first lesson date",
            "Delivery of course materials"
          ]
        }
      ]
    };
  } else if (langCode === 'ar') {
    dersSaatleri = {
      id: "ders-saatleri",
      label: "ساعات الدروس والجدول الزمني",
      color: "navy",
      sections: [
        {
          title: "ساعات الدروس والجدول الزمني لدورة اللغة الإنجليزية في أفجلار",
          content: "تقدم دورة اللغة الإنجليزية في أفجلار ساعات دروس مرنة تتناسب مع وتيرة الحياة المكثفة. تبدأ الفصول الصباحية من الساعة 08:00 وتستمر فصول ما بعد الظهر حتى الساعة 17:00، بينما تُعقد الفصول المسائية بين الساعة 18:30 و 21:30. تتوفر فصول خاصة يوم الأحد في عطلات نهاية الأسبوع؛ وتُقدم برامج مكثفة يومي السبت والأحد بين الساعة 09:00 و 13:00. يتماشى جدول دورة اللغة الإنجليزية في أفجلار مع عطلات المدارس الحكومية، ويتم التخطيط للدورات الصيفية المكثفة (يونيو-أغسطس) والدورات الشتوية (ديسمبر-فبراير) بشكل منفصل. تُقدم الفصول عبر الإنترنت بمرونة على مدار الساعة طوال أيام الأسبوع؛ حيث يمكن للطلاب الانضمام إلى الدروس المباشرة في الوقت المفضل لديهم."
        }
      ]
    };
    kayitSureci = {
      id: "kayit-sureci",
      label: "عملية التسجيل",
      color: "red",
      sections: [
        {
          title: "التسجيل في دورة أفجلار أكاديميك إنترناشونال للغات سهل للغاية!",
          content: "عملية التسجيل في دورة أفجلار للغة الإنجليزية بسيطة وسريعة للغاية. كخطوة أولى، يخضع الطالب لاختبار تحديد مستوى مجاني إما عن طريق زيارة مركز الدورة في أفجلار أو عبر الإنترنت. في هذا الاختبار؛ يتم قياس مهارات الاستماع والقراءة والقواعد والتحدث. بعد الاختبار، يوصي مستشارو دورة أفجلار أكاديميك إنترناشونال للغات ببرنامج مناسب بناءً على مستوى الطالب وهدفه. بعد اكتمال ملف التسجيل، يتم الدفع، ويكتسب الطالب الحق في حضور درسه الأول. يتم تنظيم حملات التسجيل المبكر بانتظام في دورة أفجلار للغة الإنجليزية؛ يتم تطبيق خصم بنسبة 10-20٪ في رأس السنة، والصيف، وبداية العام الدراسي. بفضل نظام التسجيل عبر الإنترنت، من الممكن التسجيل في دورة اللغة الإنجليزية في أفجلار من المنزل. بعد إكمال عملية التسجيل السريعة في دورة أفجلار أكاديميك إنترناشونال للغات، يمكن للطلاب بدء دروسهم في نفس الأسبوع."
        },
        {
          title: "خطوات التسجيل:",
          list: [
            "اختبار تحديد المستوى المجاني (عبر الإنترنت أو وجهاً لوجه)",
            "مقابلة المستشار واختيار البرنامج",
            "الدفع وتوقيع العقد",
            "تحديد تاريخ الدرس الأول",
            "تسليم المواد الدراسية"
          ]
        }
      ]
    };
  }

  dict.avcilarIngilizceLandingPage.institutionStatsTabs.tabs = [
    egitmen,
    garantiler,
    dersSaatleri,
    kayitSureci,
    basari
  ];
}

reorderAndAdd('tr', tr);
reorderAndAdd('en', en);
reorderAndAdd('ar', ar);

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2) + '\n');
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2) + '\n');

console.log("Dictionary updated.");
