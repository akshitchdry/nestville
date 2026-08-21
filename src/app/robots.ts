import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
 const baseUrl = "https://nestville-ten.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}