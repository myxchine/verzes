import type { MetadataRoute } from "next";

const baseUrl = "https://verzes.com";
const urls = ["/", "/signin", "/workout-generator"];
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = urls.map((url) => ({
    url: `${baseUrl}${url}`,
  }));
  return routes;
}
