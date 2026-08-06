import React from "react";
import { InteractiveCard } from "../ui/InteractiveCard";

export function SchoolCards() {
  const cards = [
    {
      title: "Anaokulu",
      description: "Kendine güvenen, neşeli, sağlıklı ve motive çocuklar için.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
      themeColor: "bg-[#701a75]", // fuchsia
      gradient: "from-[#4a044e] via-[#701a75]",
      iconName: "sun",
    },
    {
      title: "İlkokul",
      description: "Akademik ve sosyal hayata emin adımlarla yürümek için.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600",
      themeColor: "bg-[#0f766e]", // teal
      gradient: "from-[#042f2e] via-[#0f766e]",
      iconName: "award",
    },
    {
      title: "Ortaokul",
      description: "Geleceğe yön verin, dünyanın zirvesine yürüyün!",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600",
      themeColor: "bg-[#7f1d1d]", // dark red
      gradient: "from-[#450a0a] via-[#7f1d1d]",
      iconName: "bookOpen",
    },
    {
      title: "Anadolu Lisesi",
      description: "Ülkemizin ve dünyanın en iyi üniversitelerine doğru yol alın.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
      themeColor: "bg-[#1e3a8a]", // navy
      gradient: "from-[#0f172a] via-[#1e3a8a]",
      iconName: "trophy",
    }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-16" style={{ perspective: "1200px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {cards.map((card, index) => (
          <InteractiveCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

