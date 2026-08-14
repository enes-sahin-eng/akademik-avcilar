import React from 'react';
import Image from 'next/image';
import styles from './InstagramFeed.module.css';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// TypeScript interface for the future API
interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
}

// MOCK API FETCH
// When you have the Meta API, replace this function with your actual fetch call:
// const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${process.env.IG_TOKEN}`);
async function getInstagramPosts(): Promise<InstagramPost[]> {
  // Gerçek Meta API bağlanana kadar, dış siteden (Unsplash) alakasız stok
  // fotoğraf çekmek yerine sitenin kendi gerçek kampüs/ders görselleri
  // ("Kursumuzdan Kareler" galerisiyle aynı fotoğraflar) kullanılıyor —
  // hem daha uygun içerik hem next/image tarafından optimize edilebiliyor
  // (harici URL'de "unoptimized" zorunluydu).
  return [
    {
      id: '1',
      media_url: '/course_photos/kursumuzdan-kareler-1.webp',
      permalink: 'https://www.instagram.com/avcilarakademik',
      caption: 'Öğrencilerimizle harika bir ders!',
    },
    {
      id: '2',
      media_url: '/course_photos/kursumuzdan-kareler-2.webp',
      permalink: 'https://www.instagram.com/avcilarakademik',
      caption: 'Akademik başarılar devam ediyor.',
    },
    {
      id: '3',
      media_url: '/course_photos/kursumuzdan-kareler-3.webp',
      permalink: 'https://www.instagram.com/avcilarakademik',
      caption: 'Eğitimde sınır tanımıyoruz.',
    },
    {
      id: '4',
      media_url: '/course_photos/kursumuzdan-kareler-4.webp',
      permalink: 'https://www.instagram.com/avcilarakademik',
      caption: 'İngilizce kurslarımıza hemen kayıt olun!',
    },
    {
      id: '5',
      media_url: '/course_photos/kursumuzdan-kareler-5.webp',
      permalink: 'https://www.instagram.com/avcilarakademik',
      caption: 'Yeni kampüsümüzde ilk gün heyecanı.',
    },
  ];
}

import { getDictionary, defaultLocale, type Locale } from "../../dictionaries/getDictionary";

export default async function InstagramFeed({ lang }: { lang?: string }) {
  const currentLang = (lang as Locale) || defaultLocale;
  const dict = await getDictionary(currentLang);
  const t = dict.instagram;

  const posts = await getInstagramPosts();

  return (
    <section className={styles.feedWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrapper}>
              <InstagramIcon size={24} />
            </div>
            <div>
              <h2 className={styles.title}>{t?.title || "Instagram'da Bizi Takip Edin"}</h2>
              <a href="https://www.instagram.com/avcilarakademik" target="_blank" rel="noopener noreferrer" className={styles.handle}>
                @avcilarakademik
              </a>
            </div>
          </div>
          <a href="https://www.instagram.com/avcilarakademik" target="_blank" rel="noopener noreferrer" className={styles.followBtn}>
            {t?.followBtn || "Takip Et"}
          </a>
        </div>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <a 
              key={post.id} 
              href={post.permalink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.postItem}
            >
              <Image
                src={post.media_url}
                alt={t?.posts?.[index] || post.caption || "Instagram Post"} title={t?.posts?.[index] || post.caption || "Instagram Post"}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <InstagramIcon size={32} className={styles.overlayIcon} />
                {(t?.posts?.[index] || post.caption) && <p className={styles.caption}>{(t?.posts?.[index] || post.caption).substring(0, 40)}...</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
