import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const pages = [
    "",
    "/catalogue",
    "/blog",
    "/collections",
    "/auteurs",
    "/lecteurs",
    "/bibliotheque",
    "/notifications",
    "/a-propos",
    "/contact",
    "/faq",
    "/cgu",
    "/confidentialite",
  ];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
