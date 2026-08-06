const fs = require('fs');
const path = require('path');

const enSeo = [
  {
    level: "h1",
    title: "Kadıköy Language Course",
    desc: "Kadıköy language courses offer significant opportunities, especially for those starting from scratch or wanting to convert theoretical knowledge into fluent speaking skills. <b>Kadıköy Language Courses</b> provide a dynamic educational environment suitable for individuals at all levels with a completely student-centered approach. Kadıköy English Language Courses offer an interactive learning experience with expert instructors and focus on active communication rather than grammar memorization. In addition to improving language proficiency, it offers the opportunity to document this knowledge through international certificates. Drawing attention with its enriched programs for different language levels, foreign language courses in Kadıköy provide students with flexibility in terms of time and program.<br/><br/><b>Kadıköy Language Courses:</b>",
    table: {
      headers: ["Kadıköy Language Courses 2026", "Target Audience and Programs", "Location"],
      rows: [
        ["Akademik International Language Course", "Specially prepared training programs for all age groups from beginner to academic level", "Kadıköy/Istanbul"],
        ["Akademik Kids Language School", "Play-based programs prepared for every age and level specific to children", "Kadıköy Center"],
        ["Letslingo Language Course", "Interactive online training programs in 22 different foreign languages for students of all levels", "Online"],
        ["Akademik Abroad", "Consultancy and training programs for students who want to reinforce their foreign language education abroad", "Campus"]
      ]
    }
  },
  {
    level: "h2",
    title: "Best English Course in Kadıköy",
    desc: "<b>Best English Course in Kadıköy</b> serves within walking distance to all public transportation vehicles on Rıhtım Street, one of the most central points of the Anatolian Side. Akademik Language Course, which is at the top of recommendations as the Best English Course in Kadıköy, provides its students with fully equipped language education with its strategic location and comprehensive curriculum.<br/>In our modern classrooms with a maximum of 10-12 people:",
    bullets: [
      "International and academic exam preparation programs like English Course Group Lessons, TOEFL, IELTS, YDS",
      "Special English education for children aged 4-14 (Kids & Junior)",
      "Proficiency and academic English for university prep students",
      "Business English for working professionals",
      "Speaking Club activities",
      "Online makeup and support lessons",
      "One-on-one private lesson opportunities"
    ],
    bulletStyle: "triangle",
    summary: "are offered.<br/>Especially in our children's groups, learning by living methodology is used, while in our exam preparation groups, a result-oriented education process targeting exam strategies is carried out with our experienced staff. As Kadıköy Rıhtım English course, we offer flexible class hours and a free placement test with programs appealing to all age groups.<br/>We provide morning, noon, and evening groups for our students living around the Bull Statue, Moda coast, Bahariye, and Söğütlüçeşme, allowing you to get an education at the most suitable time. Additionally, thanks to our collaborations with corporate companies in the region, we are specialized in sectoral English."
  },
  {
    level: "h2",
    title: "Kadıköy English Course Prices 2026",
    desc: "<b>Kadıköy English Course Prices 2026</b> generally vary between 18.000 ₺ and 95.000 ₺. This price range differs according to the total course hour intensity, class size, and additional materials offered. As Akademik International Language Courses, which has an advantageous position in the <b>Kadıköy English Course Prices 2026</b> term, we have adopted the principle of offering our national experience in the center of Istanbul at accessible costs. We see the education fee not as an expense item, but as a value that will return with the competencies it will bring.<br/>We cover all the materials you will need throughout your education process with the publication support of \"The Academic Publishing\" at global standards. When you compare with <b>Kadıköy English Course Prices 2026</b>, the course hour density, free activities, and resource quality we offer place our institution at the top in the \"Price/Benefit\" balance. Kadıköy language course prices are designed with installment options and flexible payment plans that will not strain our students' economic planning. Our goal is to enable you to focus solely on language development without budget concerns.<br/><br/><b>Kadıköy English Course Prices 2026:</b>",
    table: {
      headers: ["English Level", "Lowest Price (₺)", "Highest Price (₺)"],
      rows: [
        ["Beginner (Basic)", "12.000 ₺", "20.000 ₺"],
        ["Foundation Level (Prep)", "15.000 ₺", "35.000 ₺"],
        ["Intermediate Level (Prep Plus)", "20.000 ₺", "38.000 ₺"],
        ["Advanced Level (Express)", "20.000 ₺", "40.000 ₺"],
        ["High Level (Academic Express)", "25.000 ₺", "42.000 ₺"],
        ["Upper Level (Academic Plus)", "30.000 ₺", "55.000 ₺"]
      ]
    },
    summary: "<b>Kadıköy English Course Prices 2026</b> may vary depending on the program, intensity, and the 2025 education period preferred by the student. You are at the right address for quality English education at affordable prices! Contact us for detailed information and seasonal campaigns."
  },
  {
    level: "h2",
    title: "Kadıköy English Course Recommendation: Our Programs",
    desc: "The training modules we implement within Akademik International Language Course, which is the most preferred <b>Kadıköy English Course Recommendation</b>, are shaped according to the age range, current language proficiency, and specific goals of the participants. Our entire curriculum is structured within the framework of the Common European Framework of Reference for Languages (CEFR) and is supported by modern pedagogical approaches."
  },
  {
    level: "h3",
    title: "Kadıköy English Language Course: General English Programs",
    bullets: [
      "<b>Beginner (A1-A2):</b> Building language foundations on solid ground and meeting daily basic needs.",
      "<b>Intermediate (B1-B2):</b> Mastery of complex sentence structures, gaining fluent and confident dialogue in social life.",
      "<b>Advanced (C1-C2):</b> Discussing abstract concepts, high-level language use mastering professional competence and nuances."
    ],
    bulletStyle: "diamond"
  },
  {
    level: "h3",
    title: "Special Purpose English Programs",
    bullets: [
      "<b>Business English:</b> Meeting management, professional writing techniques, and negotiation skills in line with global career goals.",
      "<b>Academic English:</b> Strategic study for literature review, article analysis, and Proficiency exams required in undergraduate and graduate processes.",
      "<b>English for Children:</b> Natural acquisition processes based on gamification and making language lovable for the 7-14 age group."
    ],
    bulletStyle: "diamond",
    summary: "In our <b>Kadıköy English course</b>, we draw the most suitable route for you instead of getting stuck in standard molds. You can plan your education process either by socializing within class dynamics or in a private lesson format where you can study one-on-one with your instructor."
  },
  {
    level: "h3",
    title: "Kadıköy Proficiency Exemption Course: Prep Exemption Exam Training",
    desc: "When choosing a <b>Kadıköy Proficiency Exemption Course</b>, it is necessary to focus not only on the name on the signboard but on the institution's educational philosophy and the vision it adds to the student. The most determining factor in this process is the education guarantee and deep-rooted experience offered by the institution.<br/>Acting with the vision of being the most preferred foreign language course among <b>Kadıköy Proficiency Exemption Course</b>, our branch rejects classical memorization methods and applies an original education model whose success has been proven across Turkey.<br/>We protect the status of <b>Kadıköy Proficiency Exemption Course</b> not only with advertisements but with the success stories of our graduated students. The satisfaction and success rate of over 90% we have achieved in evaluations at the end of the education process is the most transparent proof of our quality.<br/>The feature that distinguishes Akademik Foreign Language Course in your <b>Kadıköy Proficiency Exemption Course</b> research is teaching with an exam strategy without fragmenting the language. With our publication sets provided specially for the University exam program, which simultaneously develops reading, writing, listening, and speaking skills, we ensure that you reach your target score with the firmest steps."
  }
];

const arSeo = [
  {
    level: "h1",
    title: "دورة اللغة في كاديكوي",
    desc: "تقدم دورات اللغة في كاديكوي فرصًا مهمة، خاصة لأولئك الذين يبدأون من الصفر أو يرغبون في تحويل معرفتهم النظرية إلى مهارات تحدث بطلاقة. توفر <b>دورات اللغة في كاديكوي</b> بيئة تعليمية ديناميكية مناسبة للأفراد في جميع المستويات مع نهج يركز بالكامل على الطالب. تقدم دورات اللغة الإنجليزية في كاديكوي تجربة تعليمية تفاعلية مع مدربين خبراء وتركز على التواصل النشط بدلاً من حفظ القواعد.<br/><br/><b>دورات اللغة في كاديكوي:</b>",
    table: {
      headers: ["دورات اللغة في كاديكوي 2026", "الجمهور المستهدف والبرامج", "الموقع"],
      rows: [
        ["دورة أكاديميك الدولية للغات", "برامج تدريبية معدة خصيصًا لجميع الفئات العمرية من المبتدئين إلى المستوى الأكاديمي", "كاديكوي/اسطنبول"],
        ["مدرسة أكاديميك كيدز للغات", "برامج قائمة على اللعب معدة لكل عمر ومستوى خاص بالأطفال", "مركز كاديكوي"],
        ["دورة ليتسلينغو للغات", "برامج تدريبية تفاعلية عبر الإنترنت بـ 22 لغة أجنبية مختلفة للطلاب من جميع المستويات", "عبر الإنترنت"],
        ["أكاديميك بالخارج", "برامج استشارية وتدريبية للطلاب الذين يرغبون في تعزيز تعليم اللغات الأجنبية في الخارج", "الحرم الجامعي"]
      ]
    }
  },
  {
    level: "h2",
    title: "أفضل دورة لغة إنجليزية في كاديكوي",
    desc: "تعمل <b>أفضل دورة لغة إنجليزية في كاديكوي</b> على مسافة قريبة من جميع مركبات النقل العام في شارع ريهتيم. توفر دورة اللغة الأكاديمية، التي تتصدر التوصيات كأفضل دورة لغة إنجليزية في كاديكوي، لطلابها تعليمًا لغويًا مجهزًا بالكامل بموقعها الاستراتيجي ومناهجها الشاملة.<br/>في فصولنا الحديثة بحد أقصى 10-12 شخصًا:",
    bullets: [
      "برامج التحضير للامتحانات الدولية والأكاديمية مثل التوفل والآيلتس (TOEFL, IELTS, YDS)",
      "تعليم اللغة الإنجليزية الخاص للأطفال الذين تتراوح أعمارهم بين 4 و 14 عامًا",
      "اللغة الإنجليزية الأكاديمية واختبار الإعفاء (Proficiency) لطلاب الجامعة",
      "لغة إنجليزية للأعمال للمهنيين العاملين",
      "أنشطة نادي المحادثة (Speaking Club)",
      "دروس تعويضية ودعم عبر الإنترنت",
      "فرص دروس خاصة فردية"
    ],
    bulletStyle: "triangle",
    summary: "يتم تقديمها.<br/>نقدم مجموعات صباحية وظهرية ومسائية لطلابنا الذين يعيشون في كاديكوي وحولها، مما يتيح لك الحصول على التعليم في الوقت الأنسب."
  },
  {
    level: "h2",
    title: "أسعار دورة اللغة الإنجليزية في كاديكوي 2026",
    desc: "تتراوح <b>أسعار دورة اللغة الإنجليزية في كاديكوي 2026</b> بشكل عام بين 18.000 ليرة تركية و 95.000 ليرة تركية. يختلف هذا النطاق السعري وفقًا لكثافة ساعات الدورة وحجم الفصل والمواد الإضافية المقدمة. هدفنا هو تمكينك من التركيز فقط على تطوير اللغة دون مخاوف تتعلق بالميزانية.<br/><br/><b>أسعار دورة اللغة الإنجليزية في كاديكوي 2026:</b>",
    table: {
      headers: ["مستوى اللغة الإنجليزية", "أدنى سعر (₺)", "أعلى سعر (₺)"],
      rows: [
        ["مبتدئ (Basic)", "12.000 ₺", "20.000 ₺"],
        ["مستوى أساسي (Prep)", "15.000 ₺", "35.000 ₺"],
        ["مستوى متوسط (Prep Plus)", "20.000 ₺", "38.000 ₺"],
        ["مستوى متقدم (Express)", "20.000 ₺", "40.000 ₺"],
        ["مستوى عالي (Academic Express)", "25.000 ₺", "42.000 ₺"],
        ["مستوى أعلى (Academic Plus)", "30.000 ₺", "55.000 ₺"]
      ]
    },
    summary: "قد تختلف <b>أسعار دورة اللغة الإنجليزية في كاديكوي 2026</b> وفقًا للبرنامج. أنت في العنوان الصحيح لتعليم اللغة الإنجليزية عالي الجودة بأسعار معقولة!"
  },
  {
    level: "h2",
    title: "توصية دورة اللغة الإنجليزية في كاديكوي: برامجنا",
    desc: "تتشكل وحدات التدريب التي ننفذها داخل دورة أكاديميك الدولية للغات وفقًا للفئة العمرية والكفاءة اللغوية الحالية وأهداف المشاركين."
  },
  {
    level: "h3",
    title: "دورة اللغة الإنجليزية في كاديكوي: برامج اللغة الإنجليزية العامة",
    bullets: [
      "<b>مبتدئ (A1-A2):</b> بناء أسس اللغة على أرض صلبة وتلبية الاحتياجات الأساسية اليومية.",
      "<b>متوسط (B1-B2):</b> إتقان هياكل الجمل المعقدة واكتساب حوار طلاقة وواثق في الحياة الاجتماعية.",
      "<b>متقدم (C1-C2):</b> مناقشة المفاهيم المجردة واستخدام اللغة عالي المستوى مع إتقان الكفاءة المهنية."
    ],
    bulletStyle: "diamond"
  },
  {
    level: "h3",
    title: "برامج اللغة الإنجليزية لأغراض خاصة",
    bullets: [
      "<b>لغة إنجليزية للأعمال:</b> إدارة الاجتماعات وتقنيات الكتابة المهنية ومهارات التفاوض.",
      "<b>لغة إنجليزية أكاديمية:</b> دراسة استراتيجية لمراجعة الأدبيات وتحليل المقالات لامتحانات الكفاءة.",
      "<b>اللغة الإنجليزية للأطفال:</b> عمليات اكتساب طبيعية تعتمد على اللعب لفئة 7-14 عامًا."
    ],
    bulletStyle: "diamond",
    summary: "في <b>دورة اللغة الإنجليزية في كاديكوي</b>، نرسم لك المسار الأنسب بدلاً من العالق في القوالب القياسية."
  },
  {
    level: "h3",
    title: "دورة كاديكوي للإعفاء من التحضيري (Proficiency): تدريب امتحان الإعفاء",
    desc: "عند اختيار <b>دورة كاديكوي للإعفاء من التحضيري (Proficiency)</b>، من الضروري التركيز ليس فقط على الاسم بل على الفلسفة التعليمية للمؤسسة. من خلال مجموعات النشر الخاصة بنا المقدمة لبرنامج الامتحانات الجامعية، والتي تطور مهارات القراءة والكتابة والاستماع والتحدث في وقت واحد، نضمن لك الوصول إلى هدفك بأكثر الخطوات ثباتًا."
  }
];

const dictPath = path.join(__dirname, 'app', 'dictionaries');

['en', 'ar'].forEach(lang => {
  const filePath = path.join(dictPath, lang + '.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (lang === 'en') {
    data.kadikoyIngilizceLandingPage.seoContent = enSeo;
  } else if (lang === 'ar') {
    data.kadikoyIngilizceLandingPage.seoContent = arSeo;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log("English and Arabic full SEO translations updated in dictionaries.");
