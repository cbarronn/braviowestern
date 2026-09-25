import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/commerce/cart";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import GoogleTagManager, { GTMNoScript } from "@/components/analytics/GoogleAnalytics";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://braviowestern.com.mx"),
  title: {
    default: "BRAVÍO — Botas Western en León, Guanajuato",
    template: "%s | BRAVÍO Western",
  },
  description:
    "Botas western contemporáneas hechas a mano en León, Guanajuato. BRAVÍO: calzado de piel genuina para mujer y hombre. Envíos a todo México.",
  keywords: [
    "botas western", "botas vaqueras", "botas de piel", "botas mujer", "botas hombre",
    "calzado mexicano", "botas León Guanajuato", "botas artesanales", "BRAVÍO",
    "western contemporáneo", "botas vaqueras México", "bota de cuero México",
  ],
  authors: [{ name: "BRAVÍO Western", url: "https://braviowestern.com.mx" }],
  creator: "BRAVÍO Western",
  publisher: "BRAVÍO Western",
  alternates: { canonical: "https://braviowestern.com.mx" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://braviowestern.com.mx",
    siteName: "BRAVÍO Western",
    title: "BRAVÍO — Botas Western en León, Guanajuato",
    description: "Botas western contemporáneas hechas a mano en León, Guanajuato. Calzado de piel genuina para mujer y hombre.",
    images: [{ url: "/brand/images/Avatar_BRAVIO_principal_1000px.png", width: 1200, height: 630, alt: "BRAVÍO Western — Botas hechas en León, Guanajuato" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRAVÍO — Botas Western en León, Guanajuato",
    description: "Botas western contemporáneas hechas a mano en León, Guanajuato.",
    images: ["/brand/images/Avatar_BRAVIO_principal_1000px.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/brand/logos/BRAVIO_cruz.svg",
    apple: "/brand/logos/BRAVIO_cruz.svg",
  },
  verification: {
    google: "ZlJC9LNwdI6xIqgJjR5vQRI4ABs_enGcG_qEQEjBlBw",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://braviowestern.com.mx/#organization",
      name: "BRAVÍO Western",
      url: "https://braviowestern.com.mx",
      logo: { "@type": "ImageObject", url: "https://braviowestern.com.mx/brand/images/Avatar_BRAVIO_principal_1000px.png" },
      contactPoint: { "@type": "ContactPoint", telephone: "+52-477-729-6578", contactType: "customer service", availableLanguage: "Spanish" },
      sameAs: [
        "https://www.instagram.com/wbravio",
        "https://www.facebook.com/share/1DqKq1kg4q/",
        "https://www.tiktok.com/@bravio.western.01",
      ],
    },
    {
      "@type": "LocalBusiness",
      name: "BRAVÍO Western",
      description: "Botas western contemporáneas hechas a mano en León, Guanajuato, México.",
      url: "https://braviowestern.com.mx",
      telephone: "+52-477-729-6578",
      email: "hola@braviowestern.com.mx",
      address: { "@type": "PostalAddress", addressLocality: "León", addressRegion: "Guanajuato", addressCountry: "MX" },
      priceRange: "$$$",
      image: "https://braviowestern.com.mx/brand/images/Avatar_BRAVIO_principal_1000px.png",
    },
    {
      "@type": "WebSite",
      url: "https://braviowestern.com.mx",
      name: "BRAVÍO Western",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://braviowestern.com.mx/coleccion?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="max-w-[100vw] overflow-x-hidden w-full">
        <GTMNoScript />
        <GoogleTagManager />
        <CartProvider>
          <SmoothScrollProvider>
            <Navigation />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
