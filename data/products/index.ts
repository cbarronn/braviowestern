// BRAVÍO — Catálogo Oficial de Productos
// Fichas técnicas oficiales de León, Guanajuato

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
  leatherType: "res" | "gamuza" | "exotico" | "vacuno";
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
  // ── CABALLERO: MODELO ÚNICO "BOTÍN SINALOA" CON SUS 12 VARIABLES ──

  // 1. Gamuza Miel (Ficha Técnica Oficial BW-SIN-GA-MIE)
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
      title: "Cuidados de la Gamuza Miel",
      tips: [
        "Limpia con cepillo especial para gamuza con movimientos suaves para retirar polvo.",
        "Evita el contacto directo con agua y humedad excesiva.",
        "Aplica protector hidrofugante para gamuza.",
        "Guarda en lugar fresco, seco y ventilado con soporte para caña.",
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

  // 2. Gamuza Arena (Ficha Técnica Oficial BW-SIN-GA-ARE)
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

  // 3. Res Negro (Ficha Técnica Oficial BW-SIN-RE-NEG)
  {
    id: "bw-sin-re-neg",
    slug: "botin-sinaloa-res-negro",
    name: "Botín Sinaloa Res Negro",
    subtitle: "Botín Western Caballero · Piel de Res",
    category: "hombre",
    leatherType: "res",
    skuBase: "BW-SIN-RE-NEG",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Lleva tu estilo al siguiente nivel con el Botín Sinaloa en acabado negro profundo. Piel de res 100% genuina con tratamiento de brillo satinado sobrio. Un básico de autoridad y elegancia western contemporánea.",
    details: [
      "Horma: Oval",
      "Altura del tubo: 25 cm",
      "Altura del tacón: 4 cm",
      "Suela: 100% cuero negro entintado a mano",
      "Cierre lateral interior reforzado",
      "10% de descuento en tu primera compra",
    ],
    materials: [
      "Piel: Res 100% genuina de primera selección",
      "Forro: 100% res",
      "Suela: Cuero 100%",
      "Tacón: Cuero 100%",
    ],
    construction: [
      "Construcción Goodyear Welt",
      "Acabado entintado y sellado a mano",
      "Hecho en León, Guanajuato",
    ],
    careInstructions: {
      title: "Cuidados de la Piel de Res Negra",
      tips: [
        "Retirar polvo con paño de microfibra o cepillo suave.",
        "Aplicar crema hidratante para piel o grasa de castilla neutra.",
        "Lustrar suavemente para conservar el tono intenso.",
      ],
    },
    colors: [
      { name: "Negro", hex: "#1A1410", slug: "negro" },
      { name: "Café", hex: "#4E3629", slug: "cafe" },
    ],
    sizes: STANDARD_MEN_SIZES,
    images: [
      "/products/bota-suela-zipper.jpg",
      "/products/bota-lifestyle-jeans.jpg",
    ],
    featured: true,
    available: true,
    isDemoData: false,
  },

  // 4. Res Café (Ficha Técnica Oficial BW-SIN-RE-CAF)
  {
    id: "bw-sin-re-caf",
    slug: "botin-sinaloa-res-cafe",
    name: "Botín Sinaloa Res Café",
    subtitle: "Botín Western Caballero · Piel de Res",
    category: "hombre",
    leatherType: "res",
    skuBase: "BW-SIN-RE-CAF",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Piel de res en acabado café moka con matices naturales que adquieren carácter con cada uso. Su diseño de caña corta aporta una silueta moderna y cómoda que luce impecable tanto en ciudad como en carretera.",
    details: [
      "Horma: Oval",
      "Altura del tubo: 25 cm",
      "Altura del tacón: 4 cm",
      "Suela: 100% cuero café artesanal",
      "10% de descuento en tu primera compra",
    ],
    materials: [
      "Piel: Res 100% genuina",
      "Forro: 100% res",
      "Suela: Cuero 100%",
      "Tacón: Cuero 100%",
    ],
    construction: [
      "Construcción Goodyear Welt",
      "Costura artesanal en León, Guanajuato",
    ],
    colors: [
      { name: "Café", hex: "#4E3629", slug: "cafe" },
      { name: "Tabaco", hex: "#7B5135", slug: "tabaco" },
    ],
    sizes: STANDARD_MEN_SIZES,
    images: [
      "/products/bota-frente.jpg",
      "/products/bota-perfil.jpg",
    ],
    featured: true,
    available: true,
    isDemoData: false,
  },

  // 5. Res Tabaco Encerado
  {
    id: "bw-sin-re-tab",
    slug: "botin-sinaloa-res-tabaco",
    name: "Botín Sinaloa Res Tabaco",
    subtitle: "Botín Western Caballero · Piel Encerada",
    category: "hombre",
    leatherType: "res",
    skuBase: "BW-SIN-RE-TAB",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Piel vacuna curtida al aceite con acabado pull-up en tono tabaco. Cada marca y doblez cuenta la historia de quien la viste.",
    details: [
      "Horma: Oval",
      "Piel encerada efecto pull-up",
      "Altura del tubo: 25 cm",
      "Altura tacón: 4 cm",
      "Construcción Goodyear Welt",
    ],
    materials: ["Piel de res encerada 100%", "Forro 100% res", "Suela 100% cuero"],
    construction: ["Goodyear Welt", "Hecho en León, Guanajuato"],
    colors: [{ name: "Tabaco", hex: "#7B5135", slug: "tabaco" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/bota-lifestyle-jeans.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // 6. Gamuza Olivo Desierto
  {
    id: "bw-sin-ga-oli",
    slug: "botin-sinaloa-gamuza-olivo",
    name: "Botín Sinaloa Gamuza Olivo",
    subtitle: "Botín Western Caballero · Piel Gamuza",
    category: "hombre",
    leatherType: "gamuza",
    skuBase: "BW-SIN-GA-OLI",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Una tonalidad verde olivo profundo inspirada en la vegetación serrana y desértica. Textura afelpada de tacto fino y gran presencia.",
    details: ["Horma: Oval", "Altura tubo: 25 cm", "Suela de cuero natural", "Goodyear Welt"],
    materials: ["Gamuza de res 100%", "Forro 100% res", "Suela 100% cuero"],
    construction: ["Goodyear Welt", "Hecho a mano en León, Guanajuato"],
    colors: [{ name: "Olivo", hex: "#555A46", slug: "olivo" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/sinaloa/sinaloa-gamuza-arena-2.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // 7. Gamuza Gris Ceniza
  {
    id: "bw-sin-ga-cen",
    slug: "botin-sinaloa-gamuza-ceniza",
    name: "Botín Sinaloa Gamuza Gris Ceniza",
    subtitle: "Botín Western Caballero · Piel Gamuza",
    category: "hombre",
    leatherType: "gamuza",
    skuBase: "BW-SIN-GA-CEN",
    price: 3199,
    originalPrice: 3550,
    currency: "MXN",
    description:
      "Elegancia monocromática en tono gris piedra volcánica. Combina naturalmente con mezclilla cruda, pantalones sastre o prendas de lana.",
    details: ["Horma: Oval", "Altura tubo: 25 cm", "Tacón de cuero 4 cm", "Goodyear Welt"],
    materials: ["Gamuza de res 100%", "Forro 100% res", "Suela de cuero"],
    construction: ["Goodyear Welt", "Hecho en León, Guanajuato"],
    colors: [{ name: "Ceniza", hex: "#6F6C66", slug: "ceniza" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/sinaloa/sinaloa-gamuza-arena-3.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // ── LÍNEA EXÓTICOS Y ACABADOS ESPECIALES (CABALLERO) ──

  // 8. Exótico Pitón Natural
  {
    id: "bw-sin-ex-pit-nat",
    slug: "botin-sinaloa-exotico-piton-natural",
    name: "Botín Sinaloa Exótico Pitón Natural",
    subtitle: "Botín Western Caballero · Piel Exótica Pitón",
    category: "hombre",
    leatherType: "exotico",
    skuBase: "BW-SIN-EX-PIT-NAT",
    price: 4999,
    originalPrice: 5500,
    currency: "MXN",
    description:
      "Pieza de colección en piel legítima de pitón con escama abierta al centro y patrón geométrico natural. Cada par es irrepetible por el dibujo orgánico de la piel.",
    details: [
      "Horma: Oval de precisión",
      "Piel de pitón legítimo con certificado de procedencia legal",
      "Tubo en flor de res suave",
      "Suela de cuero grabada",
      "Goodyear Welt artesanal",
    ],
    materials: [
      "Pala: Piel genuina de pitón",
      "Tubo y forro: 100% res de primera flor",
      "Suela: 100% cuero natural",
    ],
    construction: ["Goodyear Welt", "Corte manual de escama", "Hecho en León, Gto."],
    colors: [{ name: "Natural / Bicolor", hex: "#D6C6B0", slug: "piton-natural" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/sinaloa/sinaloa-gamuza-miel-pair.jpg"],
    featured: true,
    available: true,
    isDemoData: false,
  },

  // 9. Exótico Pitón Negro Mate
  {
    id: "bw-sin-ex-pit-neg",
    slug: "botin-sinaloa-exotico-piton-negro",
    name: "Botín Sinaloa Exótico Pitón Negro Mate",
    subtitle: "Botín Western Caballero · Piel Exótica Pitón",
    category: "hombre",
    leatherType: "exotico",
    skuBase: "BW-SIN-EX-PIT-NEG",
    price: 4999,
    originalPrice: 5500,
    currency: "MXN",
    description:
      "La audacia de la textura de pitón combinada con la discreción del teñido negro azabache mate. Lujo silencioso y presencia inconfundible.",
    details: ["Horma: Oval", "Escama mate", "Suela negra entintada a mano", "Goodyear Welt"],
    materials: ["Piel de pitón legítimo teñido negro", "Forro 100% res", "Suela 100% cuero"],
    construction: ["Goodyear Welt", "Hecho a mano en León"],
    colors: [{ name: "Negro Mate", hex: "#1A1410", slug: "piton-negro" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/bota-suela-zipper.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // 10. Cuello de Toro Grabado
  {
    id: "bw-sin-ex-toro-caf",
    slug: "botin-sinaloa-cuello-toro-cafe",
    name: "Botín Sinaloa Cuello de Toro",
    subtitle: "Botín Western Caballero · Piel Rústica Texturizada",
    category: "hombre",
    leatherType: "exotico",
    skuBase: "BW-SIN-EX-TORO-CAF",
    price: 3699,
    originalPrice: 4100,
    currency: "MXN",
    description:
      "Piel de cuello de toro con grabado natural de grano grueso y máxima resistencia al desgaste. Una bota recia para trabajo pesado y vida urbana sin concesiones.",
    details: ["Horma: Oval", "Grano de cuello de toro grueso", "Resistencia superior", "Goodyear Welt"],
    materials: ["Piel cuello de toro 100%", "Forro 100% res", "Suela 100% cuero"],
    construction: ["Goodyear Welt", "Hecho en León, Guanajuato"],
    colors: [{ name: "Café Chocolate", hex: "#3F2A1D", slug: "cuello-toro-cafe" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/bota-frente.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // 11. Exótico Mantarraya Negro
  {
    id: "bw-sin-ex-manta-neg",
    slug: "botin-sinaloa-exotico-mantarraya-negro",
    name: "Botín Sinaloa Exótico Mantarraya",
    subtitle: "Botín Western Caballero · Piel Exótica Mantarraya",
    category: "hombre",
    leatherType: "exotico",
    skuBase: "BW-SIN-EX-MAN-NEG",
    price: 5499,
    originalPrice: 6100,
    currency: "MXN",
    description:
      "La piel más duradera del mundo. Confeccionada con lomo central de mantarraya perlada pulida al diamante. Brillo perlado indestructible.",
    details: ["Horma: Oval", "Lomo perlado pulido", "Máxima dureza y distinción", "Goodyear Welt"],
    materials: ["Piel de mantarraya legítima", "Forro 100% res", "Suela 100% cuero"],
    construction: ["Goodyear Welt", "Hecho a mano en León"],
    colors: [{ name: "Negro Perla", hex: "#151311", slug: "mantarraya-negro" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/bota-suela-zipper.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // 12. Exótico Avestruz Tabaco
  {
    id: "bw-sin-ex-aves-tab",
    slug: "botin-sinaloa-exotico-avestruz-tabaco",
    name: "Botín Sinaloa Exótico Avestruz",
    subtitle: "Botín Western Caballero · Piel Exótica Avestruz",
    category: "hombre",
    leatherType: "exotico",
    skuBase: "BW-SIN-EX-AVE-TAB",
    price: 5299,
    originalPrice: 5800,
    currency: "MXN",
    description:
      "Piel de avestruz de primer corte (full quill) con folículo cerrado y textura inigualablemente flexible y suave al pie.",
    details: ["Horma: Oval", "Avestruz primera selección", "Suavidad y confort supremo", "Goodyear Welt"],
    materials: ["Piel de avestruz legítima", "Forro 100% res", "Suela 100% cuero"],
    construction: ["Goodyear Welt", "Hecho en León, Guanajuato"],
    colors: [{ name: "Tabaco Dorado", hex: "#8A5A36", slug: "avestruz-tabaco" }],
    sizes: STANDARD_MEN_SIZES,
    images: ["/products/sinaloa/sinaloa-gamuza-miel-1.jpg"],
    featured: false,
    available: true,
    isDemoData: false,
  },

  // ── DAMA: LÍNEA FEMENINA ──

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

export const getMenVariables = () =>
  PRODUCTS.filter((p) => p.category === "hombre");
