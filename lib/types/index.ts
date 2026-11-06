export type MediaType = 
  | "product"
  | "editorial"
  | "banner"
  | "hero"
  | "collection"
  | "women"
  | "video"
  | "intro_video"
  | "audio";

export type VirtualFolder = 
  | "Hombre"
  | "Mujer"
  | "Productos"
  | "Colecciones"
  | "Campañas"
  | "Hero"
  | "Historia"
  | "Amuleto"
  | "Videos"
  | "Música";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  storagePath: string;
  fileType: string;
  mimeType: string;
  sizeBytes: number;
  dimensions?: { width: number; height: number };
  virtualFolder: VirtualFolder;
  category: MediaType;
  relatedSku?: string;
  relatedCollection?: string;
  relatedCampaign?: string;
  altText: string;
  sortOrder: number;
  status: "published" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
  licenseInfo?: string;
  usedIn?: string[]; // E.g., ['home.hero', 'product.BW-SIN-GA-ARE', 'collection.sinaloa']
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  url: string;
  durationSeconds: number;
  isMain: boolean;
  isEnabled: boolean;
  initialVolume: number; // 0.0 to 1.0
  loop: boolean;
  licenseDetails: string;
  uploadedAt: string;
}

export interface ProductVariant {
  size: string; // e.g. "25", "26", "27", "28", "29", "30"
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  leatherType: string;
  color: string;
  construction: string;
  category?: string;
  gender: "hombre" | "mujer" | "unisex";
  collectionId: string;
  images: string[];
  featuredImage: string;
  variants: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  status: "active" | "draft" | "archived";
  details: {
    horma: string;
    suela: string;
    tubo: string;
    tacon: string;
    origen: string;
  };
}

export interface CollectionItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  gallery: {
    id: string;
    url: string;
    alt: string;
    order: number;
    isCover: boolean;
    status: "published" | "hidden";
  }[];
  productSkus: string[];
  sortOrder: number;
  status: "published" | "draft" | "archived";
  seo: {
    title: string;
    description: string;
  };
  publishDate?: string;
}

export interface CampaignItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  destinationUrl: string;
  coverMedia: string;
  mediaType: "image" | "video";
  photos: string[];
  videos: string[];
  headline: string;
  bodyText: string;
  status: "active" | "draft" | "archived";
  validFrom: string;
  validTo?: string;
  sortOrder: number;
}

export interface HomeSectionConfig {
  id: string;
  type: "hero" | "manifesto" | "universe" | "featured_boots" | "craftsmanship" | "newsletter";
  title: string;
  subtitle?: string;
  enabled: boolean;
  sortOrder: number;
  data: Record<string, any>;
}

export interface IntroConfig {
  enabled: boolean;
  videoUrl: string;
  posterUrl: string;
  durationSeconds: number;
  frequency: "once_per_session" | "always" | "first_visit_ever";
  allowSkip: boolean;
  respectReducedMotion: boolean;
  headline: string;
  descriptor: string;
}

export interface OrderItem {
  productId: string;
  sku: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: "pending_payment" | "paid" | "preparing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "mercadopago" | "transferencia" | "tarjeta";
  paymentId?: string;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageLimit?: number;
  timesUsed: number;
  description: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  createdAt: string;
  notes?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "operations" | "content_editor";
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface InventoryRecord {
  sku: string;
  productName: string;
  leatherType: string;
  sizes: Record<string, { physical: number; reserved: number; available: number }>;
  totalPhysical: number;
  totalAvailable: number;
  reorderLevel: number;
}


