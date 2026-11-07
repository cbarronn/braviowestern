import { PRODUCTS_CATALOG, Product } from "@/lib/data/products";

export type ProductColor = {
  name: string;
  hex: string;
  slug: string;
};

export type ProductSize = {
  label: string;
  available: boolean;
};

export type { Product } from "@/lib/types";

export const PRODUCTS = PRODUCTS_CATALOG;

export const SINALOA_LEATHER_VARIABLES = PRODUCTS_CATALOG.map(p => ({
  name: p.name,
  type: p.leatherType,
  sku: p.sku,
  ready: true
}));

export function getProductsByCategory(category: string) {
  if (category === "all") return PRODUCTS_CATALOG;
  return PRODUCTS_CATALOG.filter(
    (p) => p.gender === category || p.category === category || p.collectionId === category
  );
}

export function getProductBySlug(slug: string) {
  return PRODUCTS_CATALOG.find((p) => p.slug === slug);
}
