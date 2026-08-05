import React from 'react';
import styles from './CampusLocation.module.css';
import { getDictionary, type Locale } from '@/app/dictionaries/getDictionary';
import { MapPin, Navigation, Bus, Ship, Footprints } from 'lucide-react';
interface Props {
  courseKey: string;
  lang: Locale;
}

const iconMap: Record<string, React.ReactNode> = {
  "bus": <Bus size={32} />,
  "bus-stop": <Bus size={32} />,
  "ferry": <Ship size={32} />,
  "walking": <Footprints size={32} />
};

export const CampusLocation = async ({ courseKey, lang }: Props) => {
  const dict = await getDictionary(lang);
  const locationData = (dict as any)?.[courseKey]?.location;

  if (!locationData) return null;

  return (
    <section className={styles.locationSection}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.addressInfo}>
            <div className={styles.iconBox}>
              <MapPin size={32} />
            </div>
            <div className={styles.addressText}>
              <h3 className={styles.title}>{locationData.title}</h3>
              <p className={styles.address}>{locationData.address}</p>
            </div>
          </div>
          
          <a href={locationData.directionLink} target="_blank" rel="noopener noreferrer" className={styles.directionBtn}>
            <Navigation size={32} />
            <span>{locationData.directionText}</span>
          </a>
        </div>

        <div className={styles.distancesGrid}>
          {locationData.distances?.map((dist: any, idx: number) => (
            <div key={idx} className={styles.distanceCard}>
              <div className={styles.distanceIcon}>
                {iconMap[dist.icon] || <Bus size={32} />}
              </div>
              <p className={styles.distanceText}>{dist.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
