import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://braviowestern.com.mx";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                            lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/mujer`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/hombre`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/coleccion`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/nosotros`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guia-de-tallas`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/envios-y-devoluciones`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contacto`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/aviso-de-privacidad`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
