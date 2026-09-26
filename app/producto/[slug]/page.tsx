import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import ProductPage from "./ProductPage";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | BRAVÍO`,
      description: product.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: `https://braviowestern.com.mx${product.images[0] || "/brand/images/Avatar_BRAVIO_principal_1000px.png"}`,
            brand: {
              "@type": "Brand",
              name: "BRAVÍO Western"
            },
            offers: {
              "@type": "Offer",
              url: `https://braviowestern.com.mx/producto/${product.slug}`,
              priceCurrency: product.currency,
              price: product.price,
              availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition"
            }
          }),
        }}
      />
      <ProductPage product={product} />
    </>
  );
}
