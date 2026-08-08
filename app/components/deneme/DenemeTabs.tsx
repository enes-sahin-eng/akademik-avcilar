"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DenemeTabs.module.css";

const tabsData = [
  {
    id: "tab1",
    label: "Tab 1",
    title: "Tab 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image: "https://images.unsplash.com/photo-1599598425947-330026e643c1?w=500&h=500&fit=crop"
  },
  {
    id: "tab2",
    label: "Tab 2",
    title: "Tab 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image: "https://images.unsplash.com/photo-1598046162354-9426f076fa97?w=500&h=500&fit=crop"
  },
  {
    id: "tab3",
    label: "Tab 3",
    title: "Tab 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image: "https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?w=500&h=500&fit=crop"
  }
];

export default function DenemeTabs() {
  const [activeTabId, setActiveTabId] = useState(tabsData[0].id);

  const activeTab = tabsData.find(t => t.id === activeTabId) || tabsData[0];

  return (
    <div className={styles.container}>
      <div className={styles.tabsHeader}>
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`${styles.tabButton} ${activeTabId === tab.id ? styles.tabButtonActive : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.contentInner}
          >
            <div className={styles.imageContainer}>
              <Image
                src={activeTab.image}
                alt={activeTab.title}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className={styles.image}
                unoptimized
              />
            </div>
            
            <div className={styles.textContent}>
              <h2 className={styles.title}>{activeTab.title}</h2>
              <p className={styles.description}>{activeTab.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
