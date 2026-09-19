import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Heaven Funeral Services — Wayanad",
    short_name: siteConfig.shortName,
    description:
      "24-hour Funeral services in Wayanad: coffins for sale, mortuary freezer boxes on rent, hearse van, and long-distance transport from our Payyampally and Chennalode shops.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfaf7",
    theme_color: "#173940",
    lang: "en-IN",
    categories: ["business", "lifestyle"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
