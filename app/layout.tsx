import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";
import AmbientAudioPlayer from "@/components/audio/AmbientAudioPlayer";
import WelcomePromoModal from "@/components/marketing/WelcomePromoModal";

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
  description: "Botas y calzado de raíz western, construcción tradicional Goodyear Welt 360° y presencia contemporánea. Hechas en León, Guanajuato, México.",
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
        <WelcomePromoModal />
      </body>
    </html>
  );
}

