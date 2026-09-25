"use client";

import { useEffect } from "react";
import { useLenis } from "@/lib/animations/useLenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
