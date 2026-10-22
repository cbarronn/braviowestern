// BRAVÍO — Catálogo Oficial de Productos
// Basado estrictamente en las fotografías y fichas técnicas reales entregadas

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
  leatherType: "gamuza" | "res" | "exotico" | "vacuno";
  skuBase?: string;
  price: number;
  originalPrice?: number;
  currency: "MXN";
  description: string;
  details: string[];
  materials: string[];
  construction: string[];
  careInstructions?: {
    title: string;
    tips: string[];
  };
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  featured: boolean;
  available: boolean;
  isDemoData: boolean;
};

export const SINALOA_LEATHER_VARIABLES = [
  { name: "Gamuza Miel", type: "Gamuza de Res", sku: "BW-SIN-GA-MIE", ready: true },
  { name: "Gamuza Arena", type: "Gamuza de Res", sku: "BW-SIN-GA-ARE", ready: true },
  { name: "Res Negro", type: "Piel de Res", sku: "BW-SIN-RE-NEG", ready: false },
  { name: "Res Café", type: "Piel de Res", sku: "BW-SIN-RE-CAF", ready: false },
  { name: "Res Tabaco", type: "Piel de Res", sku: "BW-SIN-RE-TAB", ready: false },
  { name: "Gamuza Olivo", type: "Gamuza de Res", sku: "BW-SIN-GA-OLI", ready: false },
  { name: "Gamuza Gris Ceniza", type: "Gamuza de Res", sku: "BW-SIN-GA-CEN", ready: false },
  { name: "Pitón Natural", type: "Piel Exótica", sku: "BW-SIN-EX-PIT-NAT", ready: false },
  { name: "Pitón Negro Mate", type: "Piel Exótica", sku: "BW-SIN-EX-PIT-NEG", ready: false },
  { name: "Cuello de Toro Café", type: "Piel Rústica", sku: "BW-SIN-EX-TORO-CAF", ready: false },
  { name: "Mantarraya Negro", type: "Piel Exótica", sku: "BW-SIN-EX-MAN-NEG", ready: false },
  { name: "Avestruz Tabaco", type: "Piel Exótica", sku: "BW-SIN-EX-AVE-TAB", ready: false },
];

const STANDARD_MEN_SIZES: ProductSize[] = [
  { label: "25", available: true },
  { label: "25.5", available: true },
  { label: "26", available: true },
  { label: "26.5", available: true },
  { label: "27", available: true },
  { label: "27.5", available: true },
  { label: "28", available: true },
  { label: "28.5", available: true },
  { label: "29", available: true },
  { label: "29.5", available: true },
  { label: "30", available: true },
];

const STANDARD_WOMEN_SIZES: ProductSize[] = [
  { label: "22", available: true },
  { label: "22.5", available: true },
  { label: "23", available: true },
  { label: "23.5", available: true },
  { label: "24", available: true },
  { label: "24.5", available: true },
  { label: "25", available: true },
  { label: "25.5", available: true },
  { label: "26", available: true },
  { label: "26.5", available: true },
  { label: "27", available: true },
];

export const PRODUCTS: Product[] = [
  // ── CABALLERO: BOTÍN SINALOA (FOTOGRAFÍAS REALES DEL SHOOTING) ──

  // 1. Botín Sinaloa Gamuza Miel
  {
    id: "bw-sin-ga-mie",
    slug: "botin-sinaloa-gamuza-miel",
    name: "Botín Sinaloa Gamuza Miel",
    subtitle: "Botín Western Caballero · Piel Gamuza",
    category: "hombre",
    leatherType: "gamuza",
    skuBase: "BW-SIN-GA-MIE",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Descubre el auténtico estilo western con el Botín Sinaloa de BRAVÍO Western, diseñado para quienes buscan destacar con elegancia, carácter y tradición. Su acabado en gamuza tono miel aporta una textura sofisticada y un estilo versátil que combina a la perfección con tu día a día.",
    details: [
      "Horma: Oval refinada",
      "Altura del tubo: 25 cm (caña corta)",
      "Altura del tacón: 4 cm en 100% cuero",
      "Cierre lateral interior de latón reforzado",
      "Costura decorativa frontal en pala",
      "Suela 100% cuero natural de alta durabilidad",
      "10% de descuento en tu primera compra",
    ],
    materials: [
      "Piel: Gamuza de res 100% genuina seleccionada",
      "Forro: 100% flor de res transpirable",
      "Suela: 100% cuero legítimo",
      "Tacón: 100% cuero apilado",
    ],
    construction: [
      "Construcción tradicional Goodyear Welt",
      "Montado artesanal en horma oval",
      "Hecho a mano en León, Guanajuato, México",
    ],
    careInstructions: {
      title: "Cuidados de la Gamuza",
      tips: [
        "Limpia con cepillo especial para gamuza con movimientos suaves.",
        "Evita el contacto directo con agua.",
        "Aplica protector hidrofugante para gamuza.",
        "Guarda en lugar fresco y seco.",
      ],
    },
    colors: [
      { name: "Miel", hex: "#C68241", slug: "miel" },
      { name: "Arena", hex: "#A8947C", slug: "arena" },
    ],
    sizes: STANDARD_MEN_SIZES,
    images: [
      "/products/sinaloa/sinaloa-gamuza-miel-pair.jpg",
      "/products/sinaloa/sinaloa-gamuza-miel-1.jpg",
      "/products/sinaloa/sinaloa-gamuza-miel-2.jpg",
      "/products/sinaloa/sinaloa-gamuza-miel-3.jpg",
    ],
    featured: true,
    available: true,
    isDemoData: false,
  },

  // 2. Botín Sinaloa Gamuza Arena
  {
    id: "bw-sin-ga-are",
    slug: "botin-sinaloa-gamuza-arena",
    name: "Botín Sinaloa Gamuza Arena",
    subtitle: "Botín Western Caballero · Piel Gamuza",
    category: "hombre",
    leatherType: "gamuza",
    skuBase: "BW-SIN-GA-ARE",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Diseño de líneas limpias en tono arena desértico con cerco y suela de cuero al natural. La textura suave de la gamuza y su horma oval otorgan una silueta moderna sin perder la esencia tradicional del calzado leonés.",
    details: [
      "Horma: Oval",
      "Altura del tubo: 25 cm",
      "Altura del tacón: 4 cm en 100% cuero",
      "Cerco natural con pespunte perimetral blanco",
      "Cierre lateral interior",
      "10% de descuento en tu primera compra",
    ],
    materials: [
      "Piel: Gamuza de res 100% genuina",
      "Forro: 100% res transpirable",
      "Suela: Cuero 100% al tono natural",
      "Tacón: Cuero 100% con tapa de hule antiderrapante",
    ],
    construction: [
      "Construcción Goodyear Welt",
      "Horma oval leonesa",
      "Hecho a mano en León, Guanajuato",
    ],
    careInstructions: {
      title: "Cuidados de la Gamuza Arena",
      tips: [
        "Retira polvo superficial con cepillo de cerdas suaves.",
        "Usa protector de gamuza contra salpicaduras.",
        "Si se humedece, secar a sombra y temperatura ambiente.",
      ],
    },
    colors: [
      { name: "Arena", hex: "#A8947C", slug: "arena" },
      { name: "Miel", hex: "#C68241", slug: "miel" },
    ],
    sizes: STANDARD_MEN_SIZES,
    images: [
      "/products/sinaloa/sinaloa-gamuza-arena-pair.jpg",
      "/products/sinaloa/sinaloa-gamuza-arena-1.jpg",
      "/products/sinaloa/sinaloa-gamuza-arena-2.jpg",
      "/products/sinaloa/sinaloa-gamuza-arena-3.jpg",
      "/products/sinaloa/sinaloa-gamuza-arena-detail.jpg",
    ],
    featured: true,
    available: true,
    isDemoData: false,
  },

  // ── DAMA: LÍNEA FEMENINA ──

  // 3. Bota León Dama
  {
    id: "brv-001",
    slug: "bota-vaquera-mujer-leon",
    name: "Bota León Dama",
    subtitle: "Bota Vaquera Mujer · Piel Vacuna",
    category: "mujer",
    leatherType: "vacuno",
    price: 3800,
    currency: "MXN",
    description:
      "Bota de piel genuina con caña media y silueta estilizada en café tabaco. Diseñada para acompañarte en cada paso de la vida contemporánea con presencia y balance.",
    details: [
      "Punta perfilada",
      "Media caña clásica",
      "Tacón apilado de madera y cuero",
      "Forro interior de piel suave",
      "Suela de cuero natural",
      "Hecho en León, Guanajuato",
    ],
    materials: [
      "Piel genuina vacuna de primera selección",
      "Forro de piel transpirable",
      "Planta de cuero",
    ],
    construction: [
      "Manufactura artesanal",
      "Costura Goodyear Welt",
      "Hecho en León, Guanajuato",
    ],
    colors: [
      { name: "Café Tabaco", hex: "#6B4C35", slug: "cafe-tabaco" },
      { name: "Negro", hex: "#1A1410", slug: "negro" },
    ],
    sizes: STANDARD_WOMEN_SIZES,
    images: ["/products/bota-frente.jpg"],
    featured: true,
    available: true,
    isDemoData: false,
  },

  // 4. Bota Guanajuato Dama
  {
    id: "brv-002",
    slug: "bota-vaquera-mujer-guanajuato",
    name: "Bota Guanajuato Dama",
    subtitle: "Bota Vaquera Mujer · Bordado Artesanal",
    category: "mujer",
    leatherType: "vacuno",
    price: 4200,
    currency: "MXN",
    description:
      "Bordado artesanal de alta densidad en caña alta. Una pieza que honra el centenario oficio leonés con una silueta contemporánea, audaz y femenina.",
    details: [
      "Caña alta con bordado floral",
      "Punta ovalada",
      "Tacón cubano biselado",
      "Forro de piel genuina",
      "Suela de cuero sellado",
    ],
    materials: [
      "Piel genuina vacuna",
      "Bordado con hilo de alta resistencia",
      "Forro de flor de piel",
    ],
    construction: [
      "Manufactura artesanal leonesa",
      "Bordado de precisión",
      "Hecho en León, Guanajuato",
    ],
    colors: [
      { name: "Arena", hex: "#C4A882", slug: "arena" },
      { name: "Vino Óxido", hex: "#5E1C23", slug: "vino" },
    ],
    sizes: STANDARD_WOMEN_SIZES,
    images: ["/products/bota-perfil.jpg"],
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
