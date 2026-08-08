import React from 'react';
import styles from './CampusLocation.module.css';
import { getDictionary, type Locale } from '@/app/dictionaries/getDictionary';
import { MapPin, Navigation, Bus, Ship, Footprints } from 'lucide-react';
interface Props {
  courseKey: string;
  lang: Locale;
}

const iconMap: Record<string, React.ReactNode> = {
  "bus": <Bus size={16} />,
  "bus-stop": <Bus size={16} />,
  "ferry": <Ship size={16} />,
  "walking": <Footprints size={16} />
};

export const CampusLocation = async ({ courseKey, lang }: Props) => {
  const dict = await getDictionary(lang);
  const locationData = (dict as any)?.[courseKey]?.location;

  if (!locationData) return null;

  return (
    <section className={styles.locationSection}>
      <div className={styles.container}>
        {/* Left Side: Title */}
        <div className={styles.titleArea}>
          <h3 className={styles.title}>{locationData.title}</h3>
        </div>
        
        {/* Middle Side: Animated Path and Chips */}
        <div className={styles.pathArea}>
          <div className={styles.animatedLine}></div>
          <div className={styles.scrollArea}>
            <div className={styles.chipsWrapper}>
              {locationData.distances?.map((dist: any, idx: number) => (
                <div key={idx} className={styles.chip}>
                  <div className={styles.chipIcon}>
                    {iconMap[dist.icon] || <MapPin size={16} />}
                  </div>
                  <span className={styles.chipText}>{dist.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Button */}
        <a href={locationData.directionLink} target="_blank" rel="noopener noreferrer" className={styles.directionBtn}>
          <Navigation size={18} />
          <span>{locationData.directionText}</span>
        </a>
      </div>
    </section>
  );
};
