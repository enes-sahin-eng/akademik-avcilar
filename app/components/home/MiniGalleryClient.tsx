"use client";

import dynamic from "next/dynamic";
import type { CardItem } from "../deneme/CardFanCarousel";

const CardFanCarousel = dynamic(() => import("../deneme/CardFanCarousel"), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400 }} />,
});

interface Props {
  cards: CardItem[];
}

export default function MiniGalleryClient({ cards }: Props) {
  return <CardFanCarousel cards={cards} />;
}
