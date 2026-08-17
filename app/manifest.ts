import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Avcılar İngilizce Dil Kursu",
    short_name: "Avcılar İngilizce",
    description: "Avcılar merkezli, Türkiye genelinde şubeleri bulunan yabancı dil eğitim kurumu.",
    start_url: "/tr",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f26522",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
