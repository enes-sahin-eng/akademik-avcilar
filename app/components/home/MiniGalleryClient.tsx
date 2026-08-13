"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { CardItem } from "./CardFanCarousel";

const CardFanCarousel = dynamic(() => import("./CardFanCarousel"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400 }} />,
});

interface Props {
  cards: CardItem[];
}

export default function MiniGalleryClient({ cards }: Props) {
  return <CardFanCarousel cards={cards} />;
}
