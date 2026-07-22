const fs = require('fs');

const addKeys = (file, additions) => {
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.navbar = { ...data.navbar, ...additions };
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

addKeys('app/dictionaries/tr.json', {
  weeklyProgram: "Haftalık Aktivite Programı",
  marquee1: "Seramik Hamuruyla Yaratıcı Tasarımlar - Yaz Okulu 2026",
  marquee2: "Yaz Okulu 2026: Boncuklu Fotoğraf Çerçevesi Atölyesi",
  marquee3: "Yaz Okulu 2026'da Tarak Ebru: Geleneksel Sanatla Buluşma"
});

addKeys('app/dictionaries/en.json', {
  weeklyProgram: "Weekly Activity Program",
  marquee1: "Creative Designs with Ceramic Clay - Summer School 2026",
  marquee2: "Summer School 2026: Beaded Photo Frame Workshop",
  marquee3: "Comb Marbling at Summer School 2026: Meeting Traditional Art"
});

addKeys('app/dictionaries/ar.json', {
  weeklyProgram: "برنامج النشاط الأسبوعي",
  marquee1: "تصميمات إبداعية بعجينة السيراميك - المدرسة الصيفية 2026",
  marquee2: "المدرسة الصيفية 2026: ورشة عمل إطار الصور المزيّن بالخرز",
  marquee3: "فن الإيبرو بالمشط في المدرسة الصيفية 2026: لقاء مع الفن التقليدي"
});

console.log("Dictionaries updated successfully");
