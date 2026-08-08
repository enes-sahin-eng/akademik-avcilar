const fs = require('fs');
const files = ['tr', 'en', 'ar'];

const data = {
  tr: {
    title: "Size En Yakın İngilizce Dil Kursu Şubelerimiz",
    desc: "İstanbul, Ankara, Bursa ve Kocaeli'de bulunan Akademik International Yabancı Dil Kursu şubelerimizle, uluslararası standartlarda dil eğitimini kapınıza getiriyoruz."
  },
  en: {
    title: "Our English Language Course Branches Nearest to You",
    desc: "With our Akademik International Foreign Language Course branches located in Istanbul, Ankara, Bursa, and Kocaeli, we bring language education at international standards to your doorstep."
  },
  ar: {
    title: "فروع دورات اللغة الإنجليزية الأقرب إليك",
    desc: "من خلال فروع أكاديميك إنترناشيونال لدورات اللغات الأجنبية في إسطنبول وأنقرة وبورصة وكوجالي، نقدم لك تعليم لغات بمعايير دولية."
  }
};

files.forEach(lang => {
  const filePath = 'app/dictionaries/' + lang + '.json';
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (dict.iletisim && dict.iletisim.campuses) {
    dict.iletisim.campuses.title = data[lang].title;
    dict.iletisim.campuses.desc = data[lang].desc;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2), 'utf8');
});

console.log('Dictionaries updated with CampusTabs SEO titles!');
