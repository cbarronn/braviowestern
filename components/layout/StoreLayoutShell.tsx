"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";
import AmbientAudioPlayer from "@/components/audio/AmbientAudioPlayer";
import WelcomePromoModal from "@/components/marketing/WelcomePromoModal";

export default function StoreLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = pathname?.startsWith("/admin");

  // If in /admin, do not render shop Header, Footer, CartDrawer, AmbientAudioPlayer or Welcome modal
  if (isAdmin) {
    return <main className="flex-1 min-h-screen bg-[#F8FAFC]">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {mounted && (
        <>
          <CartDrawer />
          <AmbientAudioPlayer />
          <WelcomePromoModal />
        </>
      )}
    </>
  );
}
