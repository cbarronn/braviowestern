import type { Metadata } from "next";
import CarritoPage from "./CarritoPage";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Tu carrito de compras BRAVÍO.",
};

export default function Page() {
  return <CarritoPage />;
}
