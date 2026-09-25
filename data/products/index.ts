// BRAVÍO — Product Data (Demonstration)
// Datos de demostración — no habilitar compra real sin inventario validado

export type ProductColor = {
  name: string;
  hex: string;
  slug: string;
};

export type ProductSize = {
  label: string;
  available: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "mujer" | "hombre";
  price: number;
  currency: "MXN";
  description: string;
  details: string[];
  materials: string[];
  construction: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  featured: boolean;
  available: boolean;
  isDemoData: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "brv-001",
    slug: "bota-vaquera-mujer-leon",
    name: "León",
    subtitle: "Bota Vaquera Mujer",
    category: "mujer",
    price: 3800,
    currency: "MXN",
    description:
      "Bota de piel genuina con punta cuadrada y media caña en café tabaco. Diseñada para acompañarte en cada paso de la vida contemporánea.",
    details: [
      "Punta cuadrada",
      "Media caña clásica",
      "Tacón apilado",
      "Forro interior de piel",
      "Suela de cuero",
    ],
    materials: [
      "Piel genuina vacuna",
      "Forro de piel",
      "Planta de cuero",
    ],
    construction: [
      "Manufactura artesanal",
      "Costura Goodyear",
      "Hecho en León, Guanajuato",
    ],
    colors: [
      { name: "Café Tabaco", hex: "#6B4C35", slug: "cafe-tabaco" },
      { name: "Negro", hex: "#1A1410", slug: "negro" },
    ],
    sizes: [
      { label: "22", available: true },
      { label: "23", available: true },
      { label: "24", available: true },
      { label: "25", available: true },
      { label: "26", available: true },
      { label: "27", available: false },
      { label: "28", available: true },
    ],
    images: [],
    featured: true,
    available: true,
    isDemoData: true,
  },
  {
    id: "brv-002",
    slug: "bota-vaquera-mujer-guanajuato",
    name: "Guanajuato",
    subtitle: "Bota Vaquera Mujer",
    category: "mujer",
    price: 4200,
    currency: "MXN",
    description:
      "Bordado artesanal en caña alta. Una pieza que honra el oficio leonés con una silueta contemporánea y femenina.",
    details: [
      "Caña alta bordada",
      "Punta ovalada",
      "Tacón cubano",
      "Bordado floral artesanal",
      "Suela de hule",
    ],
    materials: [
      "Piel genuina vacuna",
      "Bordado en hilo de seda",
      "Forro de microfibra",
      "Planta de hule",
    ],
    construction: [
      "Manufactura artesanal",
      "Bordado a mano",
      "Hecho en León, Guanajuato",
    ],
    colors: [
      { name: "Arena", hex: "#C4A882", slug: "arena" },
      { name: "Vino", hex: "#5E1C23", slug: "vino" },
    ],
    sizes: [
      { label: "22", available: true },
      { label: "23", available: true },
      { label: "24", available: false },
      { label: "25", available: true },
      { label: "26", available: true },
      { label: "27", available: true },
      { label: "28", available: false },
    ],
    images: [],
    featured: true,
    available: true,
    isDemoData: true,
  },
  {
    id: "brv-003",
    slug: "bota-vaquera-hombre-chapala",
    name: "Chapala",
    subtitle: "Bota Vaquera Hombre",
    category: "hombre",
    price: 4500,
    currency: "MXN",
    description:
      "Construcción robusta con punta cuadrada y caña clásica en piel café oscuro. Para el hombre que camina con propósito.",
    details: [
      "Punta cuadrada",
      "Caña clásica",
      "Tacón apilado de 4 cm",
      "Forro interior de piel",
      "Suela de cuero",
    ],
    materials: [
      "Piel genuina vacuna",
      "Forro de piel",
      "Planta de cuero cosida",
    ],
    construction: [
      "Manufactura artesanal",
      "Costura Goodyear Welt",
      "Hecho en León, Guanajuato",
    ],
    colors: [
      { name: "Café Oscuro", hex: "#4A3020", slug: "cafe-oscuro" },
      { name: "Negro Mate", hex: "#1A1410", slug: "negro-mate" },
      { name: "Tabaco", hex: "#7A5435", slug: "tabaco" },
    ],
    sizes: [
      { label: "25", available: true },
      { label: "26", available: true },
      { label: "27", available: true },
      { label: "28", available: true },
      { label: "29", available: false },
      { label: "30", available: true },
    ],
    images: ["/products/bota-frente.jpg", "/products/bota-perfil.jpg", "/products/bota-suela-zipper.jpg"],
    featured: true,
    available: true,
    isDemoData: false,
  },
  {
    id: "brv-004",
    slug: "bota-vaquera-hombre-silao",
    name: "Silao",
    subtitle: "Bota Vaquera Hombre",
    category: "hombre",
    price: 3600,
    currency: "MXN",
    description:
      "Diseño limpio, líneas exactas. La bota de entrada a BRAVÍO: directa, sin adornos innecesarios, con todo el oficio leonés.",
    details: [
      "Punta redonda",
      "Caña media",
      "Tacón clásico",
      "Suela de cuero",
    ],
    materials: [
      "Piel genuina vacuna",
      "Forro de piel",
      "Planta de cuero",
    ],
    construction: [
      "Manufactura artesanal",
      "Hecho en León, Guanajuato",
    ],
    colors: [
      { name: "Cognac", hex: "#8B5E3C", slug: "cognac" },
      { name: "Negro", hex: "#1A1410", slug: "negro" },
    ],
    sizes: [
      { label: "25", available: true },
      { label: "26", available: true },
      { label: "27", available: true },
      { label: "28", available: false },
      { label: "29", available: true },
      { label: "30", available: true },
    ],
    images: ["/products/bota-lifestyle-jeans.jpg", "/products/bota-suela-zipper.jpg"],
    featured: true,
    available: true,
    isDemoData: false,
  },
];

export const getProductsByCategory = (category: "mujer" | "hombre") =>
  PRODUCTS.filter((p) => p.category === category);

export const getFeaturedProducts = () => PRODUCTS.filter((p) => p.featured);

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);
