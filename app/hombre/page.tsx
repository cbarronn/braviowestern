import type { Metadata } from "next";
import HombrePage from "./HombrePage";

export const metadata: Metadata = {
  title: "BRAVÍO Hombre",
  description: "Colección de botas BRAVÍO para hombre. Para el hombre que camina con propósito. Hecho en León, Guanajuato.",
};

export default function Page() {
  return <HombrePage />;
}
