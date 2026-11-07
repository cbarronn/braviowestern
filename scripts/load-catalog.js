const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelPath = path.join(__dirname, '../public/products/BRAVIO CATALOGO/fichas tecnicas.xlsx');
const catDir = path.join(__dirname, '../public/products/catalogo');
const catalogFolders = fs.readdirSync(catDir).filter(f => fs.statSync(path.join(catDir, f)).isDirectory());

const getPhotos = (sku) => {
  const norm = sku.toLowerCase().replace('ñ', 'n');
  const folder = catalogFolders.find(f => f.toLowerCase() === norm);
  if (!folder) return [];
  return fs.readdirSync(path.join(catDir, folder))
    .filter(f => !f.startsWith('.'))
    .sort()
    .map(f => `/products/catalogo/${folder}/${f}`);
};

const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const wb = xlsx.readFile(excelPath);

const titleOverrides = {
  'BW-SIN-GA-ARE': 'Bota Sinaloa Gamuza Arena',
  'BW-SIN-GA-MIE': 'Bota Sinaloa Gamuza Miel',
  'BW-SIN-RE-NEG': 'Bota Sinaloa Res Negro',
  'BW-SIN-RE-CAF': 'Bota Sinaloa Res Café',
  'BW-SIN-RE-MAR': 'Bota Sinaloa Res Marrón',
  'BW-SIN-ALL-NEG': 'Bota Sinaloa Grabado Alligator Negro',
  'BW-SIN-AVE-COÑ': 'Bota Sinaloa Grabado Avestruz Coñac',
  'BW-SIN-AVE-CON': 'Bota Sinaloa Grabado Avestruz Coñac',
  'BW-SIN-AVE-CAF': 'Bota Sinaloa Grabado Avestruz Café',
  'BW-SIN-AVE-NEG': 'Bota Sinaloa Grabado Avestruz Negro',
  'BW-SIN-PIT-CAF': 'Bota Sinaloa Pitón Café',
  'BW-SIN-PIT-BLA': 'Bota Sinaloa Pitón Black Cherry',
  'BW-SIN-CAI-NEG': 'Bota Sinaloa Grabado Caimán Negro',
  'BW-SIN-CAI-CAF': 'Bota Sinaloa Grabado Caimán Café',
};

const colorHexes = {
  'arena': '#D7C4A5',
  'miel': '#C68B45',
  'negro': '#1A1A1A',
  'café': '#4A2E1B',
  'cafe': '#4A2E1B',
  'marrón': '#5C3826',
  'marron': '#5C3826',
  'coñac': '#9E5B26',
  'black cherry': '#3A141A',
  'vino': '#4A121A',
};

const products = [];

wb.SheetNames.forEach((sheetName, i) => {
  const s = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(s, { header: 1 });

  let sku = sheetName.replace('COÑ', 'CON');
  let rawName = '';
  let price = 3199;
  let color = '';
  let leather = '';
  let forro = '100% res';
  let suela = 'Cuero 100%';
  let horma = 'Oval';
  let tacon = 'Cuero 100%';
  let alturaTacon = '4 cm';
  let alturaTubo = '25 cm';
  let construccion = 'Goodyear Welt';
  let desc = '';
  const careTips = [];

  rows.forEach(r => {
    if (!r) return;
    const c0 = String(r[0] || '').trim().toUpperCase();
    const c1 = r[1];
    if (c0 === 'NOMBRE') rawName = String(c1 || '').trim();
    if (c0.includes('PRECIO')) price = Number(c1) || price;
    if (c0.includes('COLOR')) color = String(c1 || '').trim();
    if (c0 === 'PIEL') leather = String(c1 || '').trim();
    if (c0 === 'FORRO') forro = String(c1 || forro).trim();
    if (c0 === 'SUELA') suela = String(c1 || suela).trim();
    if (c0 === 'HORMA') horma = String(c1 || horma).trim();
    if (c0.includes('ALTURA TACON')) alturaTacon = String(c1 || alturaTacon).trim();
    if (c0.includes('ALTURA TUBO')) alturaTubo = String(c1 || alturaTubo).trim();
    if (c0.includes('CONSTRUCCION')) construccion = String(c1 || construccion).trim();
  });

  // Description
  for (let r = 0; r < rows.length; r++) {
    const rowStr = (rows[r] || []).join(' ');
    if (rowStr.toLowerCase().includes('descripcion comercial')) {
      for (let j = r + 1; j < Math.min(r + 6, rows.length); j++) {
        const text = (rows[j] || []).find(cell => typeof cell === 'string' && cell.trim().length > 30);
        if (text) {
          desc = text.trim();
          break;
        }
      }
    }
    if (rowStr.toLowerCase().includes('cuidados y recomendaciones')) {
      for (let j = r + 1; j < Math.min(r + 20, rows.length); j++) {
        const cell = (rows[j] || [])[0];
        if (typeof cell === 'string' && cell.trim().length > 10 && !cell.toUpperCase().includes('CUIDADOS DE')) {
          careTips.push(cell.trim());
        }
      }
    }
  }

  // Variants
  const variants = [];
  rows.forEach(r => {
    if (!r) return;
    for (let c = 2; c < r.length; c++) {
      const val = r[c];
      if (typeof val === 'number' && val >= 24 && val <= 32) {
        const vSku = r[c+1];
        const stock = r[c+2] !== undefined ? Number(r[c+2]) : 1;
        if (typeof vSku === 'string' && vSku.includes('BW-SIN')) {
          variants.push({
            size: `${val} MX`,
            sku: vSku,
            stock: isNaN(stock) ? 1 : stock
          });
        }
      }
    }
  });

  const photos = getPhotos(sku);
  const displayName = titleOverrides[sheetName] || titleOverrides[sku] || `Bota Sinaloa ${rawName}`;
  const hex = colorHexes[color.toLowerCase()] || '#605246';

  products.push({
    id: `prod-${i + 1}`,
    sku,
    skuBase: sku,
    slug: slugify(displayName),
    name: displayName,
    subtitle: `Construcción Goodyear Welt Tradicional en ${leather}`,
    price,
    compareAtPrice: Math.round(price * 1.1),
    description: desc,
    leatherType: leather,
    color,
    construction: 'Goodyear Welt Tradicional',
    category: 'hombre',
    gender: 'hombre',
    collectionId: 'sinaloa',
    featuredImage: photos[0] || '',
    images: photos,
    variants,
    colors: [
      { name: color, hex, slug: slugify(color) }
    ],
    sizes: variants.map(v => ({ label: v.size, available: v.stock > 0 })),
    tags: ['bota', 'hombre', 'sinaloa', slugify(color), slugify(leather)],
    isFeatured: i < 6,
    available: true,
    status: 'active',
    details: {
      horma,
      suela,
      tubo: alturaTubo,
      tacon: alturaTacon,
      forro,
      construccion,
      origen: 'Hecho a mano en León, Guanajuato, México'
    },
    careInstructions: careTips.length > 0 ? {
      title: `Cuidados de la ${leather}`,
      tips: careTips
    } : undefined
  });
});

// Add Piton Vino
if (!products.find(p => p.sku.includes('PIT-VIN'))) {
  const sku = 'BW-SIN-PIT-VIN';
  const photos = getPhotos(sku);
  products.push({
    id: `prod-${products.length + 1}`,
    sku,
    skuBase: sku,
    slug: 'bota-sinaloa-piton-vino',
    name: 'Bota Sinaloa Pitón Vino',
    subtitle: 'Construcción Goodyear Welt Tradicional en Piel Pitón Genuina',
    price: 4200,
    compareAtPrice: 4620,
    description: 'Uno de nuestros modelos más exclusivos de Bravio Western. Es un botín de pitón en tono vino profundo, con una combinación de piel exótica elegante y sofisticada. Su diseño es ideal para el cliente que busca distinción y autenticidad western para la vida actual.',
    leatherType: 'piton 100% genuina',
    color: 'Vino',
    construction: 'Goodyear Welt Tradicional',
    category: 'hombre',
    gender: 'hombre',
    collectionId: 'sinaloa',
    featuredImage: photos[0] || '',
    images: photos,
    variants: [
      { size: '25 MX', sku: 'BW-SIN-PIT-VIN-250', stock: 1 },
      { size: '25.5 MX', sku: 'BW-SIN-PIT-VIN-255', stock: 1 },
      { size: '26 MX', sku: 'BW-SIN-PIT-VIN-260', stock: 2 },
      { size: '26.5 MX', sku: 'BW-SIN-PIT-VIN-265', stock: 2 },
      { size: '27 MX', sku: 'BW-SIN-PIT-VIN-270', stock: 2 },
      { size: '27.5 MX', sku: 'BW-SIN-PIT-VIN-275', stock: 2 },
      { size: '28 MX', sku: 'BW-SIN-PIT-VIN-280', stock: 2 },
      { size: '28.5 MX', sku: 'BW-SIN-PIT-VIN-285', stock: 1 },
      { size: '29 MX', sku: 'BW-SIN-PIT-VIN-290', stock: 1 },
      { size: '29.5 MX', sku: 'BW-SIN-PIT-VIN-295', stock: 1 },
      { size: '30 MX', sku: 'BW-SIN-PIT-VIN-300', stock: 1 },
    ],
    colors: [
      { name: 'Vino', hex: '#4A121A', slug: 'vino' }
    ],
    sizes: [
      { label: '25 MX', available: true },
      { label: '25.5 MX', available: true },
      { label: '26 MX', available: true },
      { label: '26.5 MX', available: true },
      { label: '27 MX', available: true },
      { label: '27.5 MX', available: true },
      { label: '28 MX', available: true },
      { label: '28.5 MX', available: true },
      { label: '29 MX', available: true },
      { label: '29.5 MX', available: true },
      { label: '30 MX', available: true },
    ],
    tags: ['bota', 'hombre', 'sinaloa', 'piton', 'vino', 'exotico'],
    isFeatured: true,
    available: true,
    status: 'active',
    details: {
      horma: 'Oval',
      suela: 'Cuero 100%',
      tubo: '25 cm',
      tacon: '4 cm',
      forro: '100% res',
      construccion: 'Goodyear Welt',
      origen: 'Hecho a mano en León, Guanajuato, México'
    }
  });
}

// Generate lib/data/products.ts content
const tsContent = `import { Product } from "@/lib/types";

// =====================================================================
// BRAVÍO — CATÁLOGO OFICIAL GENERADO DESDE FICHAS TÉCNICAS (EXCEL)
// Y FOTOGRAFÍAS REALES EN FONDO BLANCO PURO
// =====================================================================

export const PRODUCTS_CATALOG: Product[] = ${JSON.stringify(products, null, 2)};

export const PRODUCTS = PRODUCTS_CATALOG;

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return PRODUCTS_CATALOG;
  return PRODUCTS_CATALOG.filter(
    (p) => p.gender === category || p.category === category || p.collectionId === category
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_CATALOG.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS_CATALOG.find((p) => p.id === id);
}

export function getProductBySku(sku: string): Product | undefined {
  return PRODUCTS_CATALOG.find((p) => p.sku === sku);
}
`;

fs.writeFileSync(path.join(__dirname, '../lib/data/products.ts'), tsContent, 'utf-8');
console.log('Successfully wrote lib/data/products.ts with', products.length, 'products.');

// Also generate data/products/index.ts
const dataProductsContent = `import { PRODUCTS_CATALOG, Product } from "@/lib/data/products";

export type ProductColor = {
  name: string;
  hex: string;
  slug: string;
};

export type ProductSize = {
  label: string;
  available: boolean;
};

export type { Product } from "@/lib/types";

export const PRODUCTS = PRODUCTS_CATALOG;

export const SINALOA_LEATHER_VARIABLES = PRODUCTS_CATALOG.map(p => ({
  name: p.name,
  type: p.leatherType,
  sku: p.sku,
  ready: true
}));

export function getProductsByCategory(category: string) {
  if (category === "all") return PRODUCTS_CATALOG;
  return PRODUCTS_CATALOG.filter(
    (p) => p.gender === category || p.category === category || p.collectionId === category
  );
}

export function getProductBySlug(slug: string) {
  return PRODUCTS_CATALOG.find((p) => p.slug === slug);
}
`;

fs.writeFileSync(path.join(__dirname, '../data/products/index.ts'), dataProductsContent, 'utf-8');
console.log('Successfully wrote data/products/index.ts.');

