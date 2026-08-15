import React from "react";
import styles from "./ExclusiveProgramsSection.module.css";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { CheckCircle2, Clock, Banknote, Briefcase, GraduationCap, Baby, MessageCircle } from "lucide-react";

interface Props {
  courseKey: string;
  lang: Locale;
}

export async function ExclusiveProgramsSection({ courseKey, lang }: Props) {
  const dict = await getDictionary(lang);
  const data = (dict as any)?.[courseKey]?.exclusivePrograms;

  if (!data) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>{data.title}</h2>

        {/* 1. Mesleki İngilizce */}
        {data.mesleki && (
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{data.mesleki.title}</h3>
            <p className={styles.cardDesc}>{data.mesleki.desc}</p>
            
            <div className={styles.twoColGrid}>
              <div>
                <h4 className={styles.subTitle}>
                  <Briefcase size={20} />
                  {data.mesleki.branchesTitle}
                </h4>
                <ul className={styles.bulletList}>
                  {data.mesleki.branches?.map((item: string, i: number) => (
                    <li key={i} className={styles.bulletItem}>
                      <div className={styles.iconWrapper}><CheckCircle2 size={18} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={styles.subTitle}>
                  <CheckCircle2 size={20} />
                  {data.mesleki.contentTitle}
                </h4>
                <ul className={styles.bulletList}>
                  {data.mesleki.content?.map((item: string, i: number) => (
                    <li key={i} className={styles.bulletItem}>
                      <div className={styles.iconWrapper}><CheckCircle2 size={18} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {data.mesleki.footer && (
              <div className={styles.footerBadge}>{data.mesleki.footer}</div>
            )}
          </article>
        )}

        {/* 2. EAP (Akademik) */}
        {data.eap && (
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{data.eap.title}</h3>
            <p className={styles.cardDesc}>{data.eap.desc}</p>
            
            <div className={styles.twoColGrid}>
              <div>
                <h4 className={styles.subTitle}>
                  <GraduationCap size={20} />
                  {data.eap.contentTitle}
                </h4>
                <ul className={styles.bulletList}>
                  {data.eap.content?.map((item: string, i: number) => (
                    <li key={i} className={styles.bulletItem}>
                      <div className={styles.iconWrapper}><CheckCircle2 size={18} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={styles.subTitle}>
                  <CheckCircle2 size={20} />
                  {data.eap.prepTitle}
                </h4>
                <ul className={styles.bulletList}>
                  {data.eap.prepTopics?.map((item: string, i: number) => (
                    <li key={i} className={styles.bulletItem}>
                      <div className={styles.iconWrapper}><CheckCircle2 size={18} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {data.eap.footer && (
              <div className={styles.footerBadge}>{data.eap.footer}</div>
            )}
          </article>
        )}

        {/* 3. Çocuk Programları */}
        {data.kids && (
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{data.kids.title}</h3>
            <p className={styles.cardDesc}>{data.kids.desc}</p>
            
            <h4 className={styles.subTitle} style={{ marginBottom: "1.5rem" }}>
              <Baby size={20} />
              {data.kids.ageGroupsTitle}
            </h4>
            
            <div className={styles.kidsGrid}>
              {data.kids.ageGroups?.map((group: any, i: number) => (
                <div key={i} className={styles.kidCard}>
                  <div className={styles.kidCardName}>{group.name}</div>
                  <div className={styles.kidCardAge}>{group.age}</div>
                  <div className={styles.kidCardContent}>{group.content}</div>
                  <div className={styles.kidCardDetail}>
                    <Clock size={16} /> {group.hours}
                  </div>
                  {group.price && (
                    <div className={styles.kidCardDetail}>
                      <Banknote size={16} className={styles.kidCardPrice} />
                      <span className={styles.kidCardPrice}>{group.price}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h4 className={styles.subTitle}>
              <CheckCircle2 size={20} />
              {data.kids.featuresTitle}
            </h4>
            <ul className={styles.bulletList}>
              {data.kids.features?.map((item: string, i: number) => (
                <li key={i} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}><CheckCircle2 size={18} /></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        )}

        {/* 4. Speaking Club */}
        {data.speaking && (
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{data.speaking.title}</h3>
            <p className={styles.cardDesc}>{data.speaking.desc}</p>
            
            <h4 className={styles.subTitle} style={{ marginBottom: "1.5rem" }}>
              <MessageCircle size={20} />
              {data.speaking.formatsTitle}
            </h4>
            
            <div className={styles.speakingGrid}>
              {data.speaking.formats?.map((format: any, i: number) => (
                <div key={i} className={styles.speakingCard}>
                  <div className={styles.speakingCardHeader}>
                    <div className={styles.speakingCardName}>{format.name}</div>
                    <div className={styles.speakingCardDuration}>{format.duration}</div>
                  </div>
                  <ul className={styles.bulletList}>
                    {format.details?.map((detail: string, j: number) => (
                      <li key={j} className={styles.bulletItem} style={{ fontSize: "0.95rem" }}>
                        <div className={styles.iconWrapper}><CheckCircle2 size={16} /></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h4 className={styles.subTitle}>
              <CheckCircle2 size={20} />
              {data.speaking.advantagesTitle}
            </h4>
            <ul className={styles.bulletList}>
              {data.speaking.advantages?.map((item: string, i: number) => (
                <li key={i} className={styles.bulletItem}>
                  <div className={styles.iconWrapper}><CheckCircle2 size={18} /></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </section>
  );
}
