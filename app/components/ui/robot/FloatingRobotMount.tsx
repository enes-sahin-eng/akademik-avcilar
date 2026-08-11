"use client";

import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const FloatingRobot = dynamic(() => import("./FloatingRobot"), {
  ssr: false,
  loading: () => null,
});

export default function FloatingRobotMount({ lang = "tr" }: { lang?: string }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay rendering to improve Lighthouse TBT and initial load time
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return <FloatingRobot lang={lang} />;
}
