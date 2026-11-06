import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";
import AmbientAudioPlayer from "@/components/audio/AmbientAudioPlayer";

const archivoBlack = localFont({
  src: "../public/brand/fonts/ArchivoBlack-Regular.ttf",
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../public/brand/fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BRAVÍO | Western para la vida actual",
  description: "Botas y calzado artesanal de alta gama. Construcción Goodyear Welt y pieles de selección elaboradas en León, Guanajuato, México.",
  keywords: ["botas western", "bravio", "botas de piel", "leon guanajuato", "goodyear welt", "botas vaqueras contemporaneas"],
  icons: {
    icon: "/brand/logos/BRAVIO_cruz.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivoBlack.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bravio-volcanic text-bravio-bone min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <AmbientAudioPlayer />
      </body>
    </html>
  );
}
