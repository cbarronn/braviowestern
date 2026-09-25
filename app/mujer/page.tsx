import type { Metadata } from "next";
import MujerPage from "./MujerPage";

export const metadata: Metadata = {
  title: "BRAVÍO Mujer",
  description:
    "El camino cambió. El amuleto sigue. La colección BRAVÍO Mujer: botas western contemporáneas para la mujer que avanza.",
  openGraph: {
    title: "BRAVÍO Mujer — El camino cambió. El amuleto sigue.",
    description:
      "Colección de botas BRAVÍO para mujer. Hecho en León, Guanajuato.",
  },
};

export default function Page() {
  return <MujerPage />;
}
