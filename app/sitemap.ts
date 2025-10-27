import type { MetadataRoute } from "next";

const BASE_URL = "https://www.taxhelp.ai";
const routes = [
  "/",
  "/demo",
  "/pricing",
  "/security",
  "/contact",
  "/checkout",
  "/checkout/canceled",
  "/faq",
  "/accessibility",
  "/changelog",
  "/status",
  "/legal/privacy",
  "/legal/terms",
  "/404",
  "/500",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified
  }));
}
