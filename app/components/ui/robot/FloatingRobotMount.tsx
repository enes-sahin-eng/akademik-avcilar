"use client";

import dynamic from "next/dynamic";

const FloatingRobot = dynamic(() => import("./FloatingRobot"), {
  ssr: false,
  loading: () => null,
});

export default function FloatingRobotMount({ lang = "tr" }: { lang?: string }) {
  return <FloatingRobot lang={lang} />;
}
