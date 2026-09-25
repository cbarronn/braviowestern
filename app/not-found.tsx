import Link from "next/link";
import { CruzDeHierro, BravioLogoApilado } from "@/components/ui/BravioLogo";

export default function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="mb-8">
          <CruzDeHierro size={48} color="#5E1C23" className="mx-auto" />
        </div>
        <p className="text-label-caps text-[#849AAD] mb-4">Error 404</p>
        <h1 className="font-archivo text-[#605246] mb-6"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: "0.9", letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          ESTA RUTA<br />NO EXISTE.
        </h1>
        <p className="font-[SpaceGrotesk] text-[#849AAD] mb-10">
          Pero el camino siempre tiene otra dirección.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">Regresar al inicio</Link>
          <Link href="/coleccion" className="btn-outline text-[#605246] border-[#605246]">Ver la colección</Link>
        </div>
      </div>
    </div>
  );
}
