import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import ColeccionPage from "./ColeccionPage";

export const metadata: Metadata = {
  title: "Toda la Colección",
  description: "Explora toda la colección BRAVÍO: botas western para mujer y hombre. Hecho en León, Guanajuato.",
};

export default function Page() {
  return <ColeccionPage />;
}
