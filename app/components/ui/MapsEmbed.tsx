import React from "react";
import { Reveal } from "../motion/Reveal";
import styles from "./MapsEmbed.module.css";

export const MapsEmbed = () => {
  return (
    <Reveal className={styles.mapContainer} y={0} scale={0.95}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.666113944747!2d28.718617!3d40.978665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa110682ba7bb%3A0xcab25c798031d8c9!2sAvc%C4%B1lar%20Akademik%20Yabanc%C4%B1%20Dil%20Kurslar%C4%B1!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
        className={styles.mapIframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Avcılar Akademik International Location"
      ></iframe>
    </Reveal>
  );
};
