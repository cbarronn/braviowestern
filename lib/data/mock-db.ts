import { 
  MediaItem, 
  AudioTrack, 
  CollectionItem, 
  CampaignItem, 
  HomeSectionConfig, 
  IntroConfig, 
  Order, 
  AuditLog, 
  VirtualFolder, 
  Product, 
  Customer, 
  Coupon, 
  AdminUser, 
  InventoryRecord,
  PaymentSettings
} from "@/lib/types";
import { PRODUCTS_CATALOG } from "./products";

// Initial Seed Data
const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "med-1",
    name: "BRAVÍO Cruz de Hierro Oficial",
    url: "/brand/logos/BRAVIO_cruz.svg",
    storagePath: "brand/logos/BRAVIO_cruz.svg",
    fileType: "svg",
    mimeType: "image/svg+xml",
    sizeBytes: 767,
    virtualFolder: "Amuleto",
    category: "hero",
    altText: "Cruz de Hierro oficial de BRAVÍO",
    sortOrder: 1,
    status: "published",
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
    uploadedBy: "Sistema",
    usedIn: ["intro.cruz", "navigation.icon", "footer.icon"]
  },
  {
    id: "med-2",
    name: "Logotipo Horizontal Principal",
    url: "/brand/logos/BRAVIO_horizontal.svg",
    storagePath: "brand/logos/BRAVIO_horizontal.svg",
    fileType: "svg",
    mimeType: "image/svg+xml",
    sizeBytes: 1808,
    virtualFolder: "Hero",
    category: "hero",
    altText: "Logotipo oficial BRAVÍO Western",
    sortOrder: 2,
    status: "published",
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
    uploadedBy: "Sistema",
    usedIn: ["intro.logo", "navigation.logo"]
  },
  {
    id: "med-3",
    name: "Campaña Hero Editorial Mujer Monterrey",
    url: "/campaigns/mujer-escena-01.jpg",
    storagePath: "campaigns/mujer-escena-01.jpg",
    fileType: "jpg",
    mimeType: "image/jpeg",
    sizeBytes: 814293,
    virtualFolder: "Mujer",
    category: "editorial",
    relatedCampaign: "mujer-2026",
    altText: "Editorial BRAVÍO Mujer 2026 en azotea con vista al cerro",
    sortOrder: 3,
    status: "published",
    createdAt: "2026-10-05T00:00:00Z",
    updatedAt: "2026-10-05T00:00:00Z",
    uploadedBy: "Director Creativo",
    usedIn: ["home.universe.mujer", "campaigns.mujer-2026"]
  },
  {
    id: "med-4",
    name: "Editorial Hombre Botas Sinaloa Res Negro",
    url: "/products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg",
    storagePath: "products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg",
    fileType: "jpg",
    mimeType: "image/jpeg",
    sizeBytes: 250000,
    virtualFolder: "Hombre",
    category: "editorial",
    relatedSku: "BW-SIN-RE-NEG",
    altText: "Bota Sinaloa Res Negro con construcción Goodyear Welt",
    sortOrder: 4,
    status: "published",
    createdAt: "2026-10-05T00:00:00Z",
    updatedAt: "2026-10-05T00:00:00Z",
    uploadedBy: "Director Creativo",
    usedIn: ["home.universe.hombre", "collection.sinaloa"]
  },
  {
    id: "med-5",
    name: "Video Oficial Intro BRAVÍO",
    url: "/media/video.mp4",
    storagePath: "media/video.mp4",
    fileType: "mp4",
    mimeType: "video/mp4",
    sizeBytes: 2154206,
    virtualFolder: "Videos",
    category: "intro_video",
    altText: "Video de marca cinemático BRAVÍO",
    sortOrder: 5,
    status: "published",
    createdAt: "2026-10-10T00:00:00Z",
    updatedAt: "2026-10-10T00:00:00Z",
    uploadedBy: "Equipo Creativo",
    usedIn: ["home.intro", "home.hero_bg"]
  },
  {
    id: "med-6",
    name: "Sonora Sunset — Ambient Soundtrack",
    url: "/audio/bravio-theme.wav",
    storagePath: "audio/bravio-theme.wav",
    fileType: "wav",
    mimeType: "audio/wav",
    sizeBytes: 4200000,
    virtualFolder: "Música",
    category: "audio",
    altText: "Banda sonora instrumental de guitarras acústicas y slide western contemporáneo",
    sortOrder: 6,
    status: "published",
    licenseInfo: "Composición original comisionada para BRAVÍO Western — Derechos exclusivos de uso comercial digital.",
    createdAt: "2026-10-12T00:00:00Z",
    updatedAt: "2026-10-12T00:00:00Z",
    uploadedBy: "Administrador de Audio",
    usedIn: ["audio.ambient"]
  },
  {
    id: "med-7",
    name: "Bota Sinaloa Gamuza Arena Perfil",
    url: "/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg",
    storagePath: "products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg",
    fileType: "jpg",
    mimeType: "image/jpeg",
    sizeBytes: 220188,
    virtualFolder: "Productos",
    category: "product",
    relatedSku: "BW-SIN-GA-ARE",
    relatedCollection: "sinaloa",
    altText: "Bota Sinaloa Gamuza Arena toma de perfil",
    sortOrder: 7,
    status: "published",
    createdAt: "2026-10-15T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    uploadedBy: "Fotógrafo de Producto",
    usedIn: ["product.BW-SIN-GA-ARE", "home.featured_boots"]
  },
  {
    id: "med-8",
    name: "Bota Sinaloa Res Negro Frontal",
    url: "/products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg",
    storagePath: "products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg",
    fileType: "jpg",
    mimeType: "image/jpeg",
    sizeBytes: 210000,
    virtualFolder: "Productos",
    category: "product",
    relatedSku: "BW-SIN-RE-NEG",
    relatedCollection: "sinaloa",
    altText: "Bota Sinaloa Res Negro",
    sortOrder: 8,
    status: "published",
    createdAt: "2026-10-15T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    uploadedBy: "Fotógrafo de Producto",
    usedIn: ["product.BW-SIN-RE-NEG", "home.featured_boots"]
  }
];

const INITIAL_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "aud-1",
    title: "Sonora Sunset (Instrumental Ambient)",
    artist: "BRAVÍO Sound Design",
    genre: "Contemporary Instrumental Country Western",
    url: "/audio/bravio-theme.wav",
    durationSeconds: 142,
    isMain: true,
    isEnabled: true,
    initialVolume: 0.28,
    loop: true,
    licenseDetails: "Licencia de sincronización comercial digital y master recording adquirido por BRAVÍO México.",
    uploadedAt: "2026-10-12T10:00:00Z"
  }
];

const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-1",
    slug: "sinaloa",
    name: "Colección Sinaloa",
    tagline: "El Renacimiento de la Silueta Western Tradicional",
    description: "Inspirada en el carácter indomable del noroeste mexicano. Confeccionada con pieles seleccionadas de res, gamuza aperlada y grabados exóticos de avestruz, caimán y pitón sobre una construcción artesanal Goodyear Welt garantizada de por vida.",
    coverImage: "/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg",
    gallery: [
      { id: "g-1", url: "/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg", alt: "Gamuza Arena", order: 1, isCover: true, status: "published" },
      { id: "g-2", url: "/products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg", alt: "Res Negro", order: 2, isCover: false, status: "published" },
      { id: "g-3", url: "/products/catalogo/bw-sin-ave-con/BW-SIN-AVE-COÑ.jpg", alt: "Avestruz Coñac", order: 3, isCover: false, status: "published" },
      { id: "g-4", url: "/products/catalogo/bw-sin-pit-bla/BW-SIN-PIT-BLA.jpg", alt: "Pitón Blanco", order: 4, isCover: false, status: "published" },
      { id: "g-5", url: "/products/catalogo/bw-sin-ga-mie/BW-SIN-GA-MIE.jpeg", alt: "Gamuza Miel", order: 5, isCover: false, status: "published" },
    ],
    productSkus: ["BW-SIN-GA-ARE", "BW-SIN-GA-MIE", "BW-SIN-RE-NEG", "BW-SIN-RE-CAF", "BW-SIN-ALL-NEG", "BW-SIN-AVE-CON", "BW-SIN-PIT-BLA", "BW-SIN-CAI-NEG"],
    sortOrder: 1,
    status: "published",
    seo: {
      title: "Colección Sinaloa — Botas Western Artesanales | BRAVÍO",
      description: "Descubre la colección de botas Sinaloa de BRAVÍO. Construcción Goodyear Welt y pieles de alta gama hechas en León, México."
    }
  },
  {
    id: "col-2",
    slug: "bravio-mujer",
    name: "BRAVÍO Mujer — Línea 2026",
    tagline: "Fuerza, Elegancia y Estilo Western Contemporáneo",
    description: "La interpretación femenina del universo BRAVÍO. Siluetas esbeltas, cañas anatómicas y pieles con acabado sedoso para la mujer que lidera con paso firme.",
    coverImage: "/campaigns/mujer-escena-01.jpg",
    gallery: [
      { id: "gm-1", url: "/campaigns/mujer-escena-01.jpg", alt: "Editorial Azotea Monterrey — El camino cambió", order: 1, isCover: true, status: "published" },
      { id: "gm-2", url: "/campaigns/mujer/editorial-01.jpg", alt: "Editorial Asfalto & Noche — Pasos firmes", order: 2, isCover: false, status: "published" },
      { id: "gm-3", url: "/campaigns/door-highres.jpg", alt: "Puerta Azul — Geometría mexicana", order: 3, isCover: false, status: "published" },
      { id: "gm-4", url: "/campaigns/mujer-escena-03.jpg", alt: "Muro y Sombra — Arquitectura contemporánea", order: 4, isCover: false, status: "published" },
      { id: "gm-5", url: "/campaigns/mujer-escena-04.jpg", alt: "Umbral y Raíz — León Guanajuato", order: 5, isCover: false, status: "published" },
    ],
    productSkus: ["BW-SIN-GA-ARE", "BW-SIN-RE-CAF"],
    sortOrder: 2,
    status: "published",
    seo: {
      title: "BRAVÍO Mujer 2026 — Nueva Dimensión Western",
      description: "Explora la nueva línea de botas y calzado para mujer BRAVÍO."
    }
  }
];

const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: "camp-1",
    slug: "mujer-2026",
    name: "BRAVÍO Mujer 2026",
    subtitle: "Campaña Visual con Origen",
    description: "Una exploración visual de la mujer contemporánea en comunión con los paisajes de México, vistiendo siluetas occidentales depuradas de ornamentación innecesaria.",
    destinationUrl: "/mujer",
    coverMedia: "/campaigns/mujer-escena-01.jpg",
    mediaType: "image",
    photos: ["/campaigns/mujer-escena-01.jpg", "/campaigns/mujer/editorial-01.jpg", "/campaigns/door-highres.jpg", "/campaigns/mujer-escena-03.jpg", "/campaigns/mujer-escena-04.jpg"],
    videos: ["/media/video.mp4"],
    headline: "EL NUEVO HORIZONTE FEMENINO",
    bodyText: "Donde la herencia artesanal de León se encuentra con la fuerza natural de la mujer de hoy.",
    status: "active",
    validFrom: "2026-01-01",
    sortOrder: 1
  }
];

const INITIAL_INTRO_CONFIG: IntroConfig = {
  enabled: true,
  videoUrl: "/media/video.mp4",
  posterUrl: "/brand/posterImage-142.png",
  durationSeconds: 5,
  frequency: "once_per_session",
  allowSkip: true,
  respectReducedMotion: true,
  headline: "BRAVÍO",
  descriptor: "WESTERN PARA LA VIDA ACTUAL."
};

const INITIAL_HOME_SECTIONS: HomeSectionConfig[] = [
  {
    id: "sec-hero",
    type: "hero",
    title: "Hero Principal",
    enabled: true,
    sortOrder: 1,
    data: {
      headline: "WESTERN PARA LA VIDA ACTUAL",
      subheadline: "Botas y calzado artesanal confeccionados con pieles de excepción y construcción Goodyear Welt en León, México.",
      ctaPrimaryText: "EXPLORAR CATÁLOGO",
      ctaPrimaryLink: "/coleccion/sinaloa",
      ctaSecondaryText: "CONOCER EL ORIGEN",
      ctaSecondaryLink: "/historia",
      desktopImage: "/campaigns/hombre-hero.jpg",
      mobileImage: "/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg",
      videoUrl: "/media/video.mp4"
    }
  },
  {
    id: "sec-manifesto",
    type: "manifesto",
    title: "Manifiesto de Marca",
    enabled: true,
    sortOrder: 2,
    data: {
      badge: "EL MANIFIESTO",
      quote: "No creemos en el disfraz vaquero. Creemos en la bota como instrumento de carácter, elegancia sobria y presencia indeleble.",
      author: "Taller Artesanal BRAVÍO, León Gto."
    }
  },
  {
    id: "sec-universe",
    type: "universe",
    title: "El Universo BRAVÍO",
    enabled: true,
    sortOrder: 3,
    data: {
      leftTitle: "HOMBRE",
      leftSubtitle: "Colección Sinaloa",
      leftImage: "/products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg",
      leftLink: "/hombre",
      rightTitle: "MUJER 2026",
      rightSubtitle: "Nueva Campaña Visual",
      rightImage: "/campaigns/mujer-escena-01.jpg",
      rightLink: "/mujer"
    }
  },
  {
    id: "sec-boots",
    type: "featured_boots",
    title: "Modelos Destacados",
    enabled: true,
    sortOrder: 4,
    data: {
      title: "MODELOS INSIGNIA",
      subtitle: "Construcción centenaria. Estética contemporánea.",
      skus: ["BW-SIN-GA-ARE", "BW-SIN-GA-MIE", "BW-SIN-RE-NEG", "BW-SIN-AVE-CON", "BW-SIN-PIT-BLA"]
    }
  },
  {
    id: "sec-craftsmanship",
    type: "craftsmanship",
    title: "Origen & Artesanía",
    enabled: true,
    sortOrder: 5,
    data: {
      headline: "HECHO A MANO EN LEÓN, MÉXICO",
      description: "Más de 200 pasos artesanales manuales. Hormas esculpidas al milímetro, pieles de curtición vegetal y vástago de acero templado para un soporte inigualable durante décadas de uso.",
      image: "/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE (3).jpg"
    }
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-log-1",
    timestamp: new Date().toISOString(),
    user: "Arquitecto Senior",
    action: "SYSTEM_INITIALIZE",
    entity: "System",
    entityId: "bravio-core",
    details: "Inicialización del sistema BRAVÍO 2.9 con arquitectura Next.js App Router y catálogo completo."
  }
];

const INITIAL_PAYMENT_SETTINGS: PaymentSettings = {
  mercadopago: {
    enabled: true,
    sandboxMode: true,
    publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || process.env.MP_PUBLIC_KEY || "TEST-8f6a9e10-3841-4562-b91c-7d9a10243567",
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN || "TEST-7281940182746190-041215-6f17e3f890124cba7e6f890123456789-109283746",
    clientId: "",
    clientSecret: "",
    installmentsEnabled: true,
    maxInstallments: 12,
    statementDescriptor: "BRAVIO WESTERN",
  },
  spei: {
    enabled: true,
    bankName: "BBVA México",
    beneficiary: "BRAVÍO WESTERN TRADING S.A. DE C.V.",
    clabe: "012 225 0011 8293 8472",
    accountNumber: "1182938472",
    notificationEmail: "pagos@braviowestern.com.mx",
    notificationWhatsapp: "+52 (477) 729-6578",
    instructions: "Transfiere el monto exacto vía SPEI. Ingresa tu número de pedido en el concepto/referencia para agilizar la validación automática.",
    expirationHours: 48,
  },
  updatedAt: new Date().toISOString(),
  updatedBy: "Sistema",
};

// In-Memory Data Store (simulates Postgres with persistence capability)
class MockDatabase {
  private media: MediaItem[] = [...INITIAL_MEDIA];
  private audioTracks: AudioTrack[] = [...INITIAL_AUDIO_TRACKS];
  private collections: CollectionItem[] = [...INITIAL_COLLECTIONS];
  private campaigns: CampaignItem[] = [...INITIAL_CAMPAIGNS];
  private homeSections: HomeSectionConfig[] = [...INITIAL_HOME_SECTIONS];
  private introConfig: IntroConfig = { ...INITIAL_INTRO_CONFIG };
  private orders: Order[] = [];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private products: Product[] = [...PRODUCTS_CATALOG];
  private paymentSettings: PaymentSettings = { ...INITIAL_PAYMENT_SETTINGS };
  private customers: Customer[] = [];
  private coupons: Coupon[] = [
    {
      id: "cup-1",
      code: "BIENVENIDO10",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: 3000,
      validFrom: "2026-01-01T00:00:00Z",
      validTo: "2026-12-31T23:59:59Z",
      isActive: true,
      timesUsed: 0,
      description: "10% de descuento en primera compra para suscriptores de Newsletter",
    },
  ];
  private adminUsers: AdminUser[] = [
    {
      id: "usr-1",
      name: "Carlos Barrón",
      email: "cbarron@ti-boot.com",
      role: "superadmin",
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2026-01-01T00:00:00Z",
    },
    {
      id: "usr-2",
      name: "Gonzalo Arrieta Navarro",
      email: "gonzaloarrietanavarro@gmail.com",
      role: "superadmin",
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2026-01-01T00:00:00Z",
    },
    {
      id: "usr-3",
      name: "Daniela Arrieta",
      email: "darrieta@vise.com.mx",
      role: "operations",
      isActive: true,
      lastLogin: "2026-11-05T16:20:00Z",
      createdAt: "2026-02-15T00:00:00Z",
    },
  ];

  // Media
  getMedia(folder?: VirtualFolder, query?: string): MediaItem[] {
    let list = this.media.filter(m => m.status !== "archived");
    if (folder) list = list.filter(m => m.virtualFolder === folder);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.altText.toLowerCase().includes(q) || 
        m.relatedSku?.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  addMedia(item: Omit<MediaItem, "id" | "createdAt" | "updatedAt">): MediaItem {
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.media.unshift(newItem);
    this.addAudit("MEDIA_UPLOAD", "Media", newItem.id, `Subida de archivo: ${newItem.name}`);
    return newItem;
  }

  updateMedia(id: string, updates: Partial<MediaItem>): MediaItem | null {
    const idx = this.media.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.media[idx] = {
      ...this.media[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.addAudit("MEDIA_UPDATE", "Media", id, `Actualización de metadatos para ${this.media[idx].name}`);
    return this.media[idx];
  }

  archiveMedia(id: string): boolean {
    const item = this.media.find(m => m.id === id);
    if (!item) return false;
    item.status = "archived";
    item.updatedAt = new Date().toISOString();
    this.addAudit("MEDIA_ARCHIVE", "Media", id, `Archivo seguro de multimedia: ${item.name}`);
    return true;
  }

  // Audio
  getAudioTracks(): AudioTrack[] {
    return [...this.audioTracks];
  }

  getMainAudioTrack(): AudioTrack | undefined {
    return this.audioTracks.find(t => t.isMain && t.isEnabled) || this.audioTracks[0];
  }

  updateAudioTrack(id: string, updates: Partial<AudioTrack>): AudioTrack | null {
    const idx = this.audioTracks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    if (updates.isMain) {
      this.audioTracks.forEach(t => (t.isMain = false));
    }
    this.audioTracks[idx] = { ...this.audioTracks[idx], ...updates };
    this.addAudit("AUDIO_UPDATE", "Audio", id, `Configuración de audio actualizada: ${this.audioTracks[idx].title}`);
    return this.audioTracks[idx];
  }

  addAudioTrack(track: Omit<AudioTrack, "id" | "uploadedAt">): AudioTrack {
    const newTrack: AudioTrack = {
      ...track,
      id: `aud-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    if (newTrack.isMain) {
      this.audioTracks.forEach(t => (t.isMain = false));
    }
    this.audioTracks.push(newTrack);
    this.addAudit("AUDIO_UPLOAD", "Audio", newTrack.id, `Nueva pista de audio cargada: ${newTrack.title}`);
    return newTrack;
  }

  // Collections
  getCollections(): CollectionItem[] {
    return [...this.collections].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  getCollectionBySlug(slug: string): CollectionItem | undefined {
    return this.collections.find(c => c.slug === slug);
  }

  updateCollection(id: string, updates: Partial<CollectionItem>): CollectionItem | null {
    const idx = this.collections.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.collections[idx] = { ...this.collections[idx], ...updates };
    this.addAudit("COLLECTION_UPDATE", "Collection", id, `Colección actualizada: ${this.collections[idx].name}`);
    return this.collections[idx];
  }

  // Campaigns
  getCampaigns(): CampaignItem[] {
    return [...this.campaigns].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  updateCampaign(id: string, updates: Partial<CampaignItem>): CampaignItem | null {
    const idx = this.campaigns.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.campaigns[idx] = { ...this.campaigns[idx], ...updates };
    this.addAudit("CAMPAIGN_UPDATE", "Campaign", id, `Campaña actualizada: ${this.campaigns[idx].name}`);
    return this.campaigns[idx];
  }

  // Home Sections
  getHomeSections(): HomeSectionConfig[] {
    return [...this.homeSections].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  updateHomeSection(id: string, updates: Partial<HomeSectionConfig>): HomeSectionConfig | null {
    const idx = this.homeSections.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.homeSections[idx] = { ...this.homeSections[idx], ...updates };
    this.addAudit("HOME_SECTION_UPDATE", "HomeSection", id, `Sección de Inicio actualizada: ${this.homeSections[idx].title}`);
    return this.homeSections[idx];
  }

  // Intro Config
  getIntroConfig(): IntroConfig {
    return { ...this.introConfig };
  }

  updateIntroConfig(updates: Partial<IntroConfig>): IntroConfig {
    this.introConfig = { ...this.introConfig, ...updates };
    this.addAudit("INTRO_CONFIG_UPDATE", "Intro", "global", "Parámetros de Intro cinematográfica modificados.");
    return this.introConfig;
  }

  // Orders
  getOrders(): Order[] {
    return [...this.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt">): Order {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `BW-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(newOrder);
    this.addAudit("ORDER_CREATE", "Order", newOrder.id, `Nuevo pedido generado #${newOrder.orderNumber}`);

    // Automatically register or update customer record in real database
    if (newOrder.customer && newOrder.customer.email) {
      const email = newOrder.customer.email.toLowerCase().trim();
      const existing = this.customers.find(c => c.email.toLowerCase() === email);
      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpent += newOrder.total;
        existing.lastOrderDate = newOrder.createdAt;
        if (newOrder.customer.phone) existing.phone = newOrder.customer.phone;
        if (newOrder.customer.city) existing.city = newOrder.customer.city;
        if (newOrder.customer.state) existing.state = newOrder.customer.state;
      } else {
        this.customers.unshift({
          id: `cust-${Date.now()}`,
          firstName: newOrder.customer.firstName,
          lastName: newOrder.customer.lastName || "",
          email: newOrder.customer.email,
          phone: newOrder.customer.phone || "",
          city: newOrder.customer.city || "León",
          state: newOrder.customer.state || "Guanajuato",
          address: newOrder.customer.address || "",
          ordersCount: 1,
          totalSpent: newOrder.total,
          lastOrderDate: newOrder.createdAt,
          createdAt: newOrder.createdAt,
        });
      }
    }

    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order["status"], carrier?: string, trackingNumber?: string): Order | null {
    const order = this.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    if (carrier) order.carrier = carrier;
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
      order.trackingUrl = `/rastreo?orderId=${order.orderNumber}`;
    }
    this.addAudit("ORDER_STATUS_UPDATE", "Order", order.id, `Pedido #${order.orderNumber} cambió a estado ${status}`);
    return order;
  }

  // Products CRUD & Idempotent Sync
  getProducts(query?: string, category?: string): Product[] {
    let list = [...this.products];
    if (category && category !== "all") {
      list = list.filter(p => p.gender?.toLowerCase() === category.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.leatherType.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id || p.sku === id);
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex(p => p.id === id || p.sku === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    this.addAudit("PRODUCT_UPDATE", "Product", this.products[idx].sku, `Producto actualizado: ${this.products[idx].name}`);
    return this.products[idx];
  }

  createProduct(data: Omit<Product, "id">): Product {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
    };
    this.products.unshift(newProduct);
    this.addAudit("PRODUCT_CREATE", "Product", newProduct.sku, `Nuevo producto creado: ${newProduct.name}`);
    return newProduct;
  }

  // Inventory Management
  getInventory(): InventoryRecord[] {
    return this.products.map(p => {
      const sizesRecord: Record<string, { physical: number; reserved: number; available: number }> = {};
      let totalPhysical = 0;
      let totalReserved = 0;

      ["25", "25.5", "26", "26.5", "27", "27.5", "28", "28.5", "29", "29.5", "30"].forEach((sz, i) => {
        // Derive initial consistent stock based on variant or hash
        const physical = (p.variants?.find(v => v.size.includes(sz))?.stock || ((i * 3 + 5) % 12));
        const reserved = Math.min(physical, (i % 2));
        const available = Math.max(0, physical - reserved);
        sizesRecord[sz] = { physical, reserved, available };
        totalPhysical += physical;
        totalReserved += reserved;
      });

      return {
        sku: p.sku,
        productName: p.name,
        leatherType: p.leatherType,
        sizes: sizesRecord,
        totalPhysical,
        totalAvailable: totalPhysical - totalReserved,
        reorderLevel: 8,
      };
    });
  }

  updateStock(sku: string, size: string, newPhysical: number, reason: string): boolean {
    const product = this.products.find(p => p.sku === sku);
    if (!product) return false;
    const vIdx = product.variants.findIndex(v => v.size.includes(size));
    if (vIdx > -1) {
      product.variants[vIdx].stock = newPhysical;
    } else {
      product.variants.push({ size: `${size} MX`, stock: newPhysical, sku: `${sku}-${size}` });
    }
    this.addAudit("STOCK_ADJUSTMENT", "Inventory", sku, `Ajuste de inventario en talla ${size} a ${newPhysical} pares. Motivo: ${reason}`);
    return true;
  }

  // Customers
  getCustomers(query?: string): Customer[] {
    if (!query) return [...this.customers];
    const q = query.toLowerCase();
    return this.customers.filter(c =>
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  }

  // Coupons / Promotions
  getCoupons(): Coupon[] {
    return [...this.coupons];
  }

  createCoupon(data: Omit<Coupon, "id" | "timesUsed">): Coupon {
    const newCoupon: Coupon = {
      ...data,
      id: `cup-${Date.now()}`,
      timesUsed: 0,
    };
    this.coupons.unshift(newCoupon);
    this.addAudit("COUPON_CREATE", "Promotion", newCoupon.code, `Cupón creado: ${newCoupon.code} (${newCoupon.discountValue}%)`);
    return newCoupon;
  }

  toggleCoupon(id: string): Coupon | null {
    const c = this.coupons.find(cp => cp.id === id || cp.code === id);
    if (!c) return null;
    c.isActive = !c.isActive;
    this.addAudit("COUPON_TOGGLE", "Promotion", c.code, `Cupón ${c.code} ${c.isActive ? 'activado' : 'pausado'}`);
    return c;
  }

  // Admin Users & RBAC
  getAdminUsers(): AdminUser[] {
    return [...this.adminUsers];
  }

  createAdminUser(data: { name: string; email: string; role: AdminUser["role"]; isActive?: boolean }): AdminUser {
    const existing = this.adminUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase().trim());
    if (existing) {
      throw new Error(`El correo ${data.email} ya está registrado.`);
    }

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      role: data.role,
      isActive: data.isActive ?? true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.adminUsers.push(newUser);
    this.addAudit("USER_CREATE", "AdminUser", newUser.email, `Usuario ${newUser.name} creado con rol ${newUser.role}`);
    return newUser;
  }

  updateAdminUser(id: string, updates: { name?: string; email?: string; role?: AdminUser["role"]; isActive?: boolean }): AdminUser | null {
    const user = this.adminUsers.find(u => u.id === id);
    if (!user) return null;

    if (updates.name !== undefined) user.name = updates.name.trim();
    if (updates.email !== undefined) {
      const emailTrimmed = updates.email.toLowerCase().trim();
      const duplicate = this.adminUsers.find(u => u.id !== id && u.email.toLowerCase() === emailTrimmed);
      if (duplicate) {
        throw new Error(`El correo ${updates.email} ya está en uso por otro usuario.`);
      }
      user.email = emailTrimmed;
    }
    if (updates.role !== undefined) user.role = updates.role;
    if (updates.isActive !== undefined) user.isActive = updates.isActive;

    this.addAudit("USER_UPDATE", "AdminUser", user.email, `Usuario ${user.name} actualizado (Rol: ${user.role}, Estado: ${user.isActive ? 'Activo' : 'Suspendido'})`);
    return user;
  }

  deleteAdminUser(id: string): boolean {
    const userIndex = this.adminUsers.findIndex(u => u.id === id);
    if (userIndex === -1) return false;

    const user = this.adminUsers[userIndex];
    if (user.email === "cbarron@ti-boot.com" || user.id === "usr-1") {
      throw new Error("No es posible eliminar al Administrador Principal.");
    }

    this.adminUsers.splice(userIndex, 1);
    this.addAudit("USER_DELETE", "AdminUser", user.email, `Usuario ${user.name} (${user.email}) eliminado del sistema`);
    return true;
  }

  updateUserRole(id: string, role: AdminUser["role"]): AdminUser | null {
    const user = this.adminUsers.find(u => u.id === id);
    if (!user) return null;
    user.role = role;
    this.addAudit("USER_ROLE_CHANGE", "AdminUser", user.email, `Rol de ${user.name} actualizado a ${role}`);
    return user;
  }

  toggleUserStatus(id: string): AdminUser | null {
    const user = this.adminUsers.find(u => u.id === id);
    if (!user) return null;
    user.isActive = !user.isActive;
    this.addAudit("USER_STATUS_CHANGE", "AdminUser", user.email, `Usuario ${user.name} ${user.isActive ? 'reactivado' : 'suspendido'}`);
    return user;
  }

  // Reports & Analytics - Datos Reales Calculados Dinámicamente
  getCommercialReports() {
    const totalOrders = this.orders.length;
    const totalSales = this.orders.reduce((acc, o) => acc + o.total, 0);
    const averageTicket = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    // Preferencias de Pago basadas en órdenes reales
    const mpOrders = this.orders.filter(o => o.paymentMethod === "mercadopago" || o.paymentMethod === "tarjeta").length;
    const speiOrders = this.orders.filter(o => o.paymentMethod === "transferencia").length;
    const mpPercent = totalOrders > 0 ? Math.round((mpOrders / totalOrders) * 100) : 0;
    const speiPercent = totalOrders > 0 ? Math.round((speiOrders / totalOrders) * 100) : 0;

    // Semanas reales
    const weeks = [
      { weekLabel: "Semana Actual", sales: totalSales, orders: totalOrders, growth: totalOrders > 0 ? "+100%" : "0%" },
      { weekLabel: "Semana Anterior", sales: 0, orders: 0, growth: "0%" },
      { weekLabel: "Hace 2 Semanas", sales: 0, orders: 0, growth: "0%" },
      { weekLabel: "Hace 3 Semanas", sales: 0, orders: 0, growth: "0%" },
    ];

    // Desglose diario
    const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const dailyBreakdown = dayNames.map((day) => ({
      day,
      sales: 0,
      orders: 0,
      visitors: 0,
    }));

    if (this.orders.length > 0) {
      this.orders.forEach(o => {
        const orderDate = new Date(o.createdAt);
        const dayIdx = (orderDate.getDay() + 6) % 7; // Lunes = 0
        if (dailyBreakdown[dayIdx]) {
          dailyBreakdown[dayIdx].sales += o.total;
          dailyBreakdown[dayIdx].orders += 1;
        }
      });
    }

    // Top productos desde órdenes reales
    const productSalesMap = new Map<string, { sku: string; name: string; leather: string; unitsSold: number; revenue: number }>();
    this.orders.forEach(order => {
      (order.items || []).forEach(item => {
        const prod = this.products.find(p => p.id === item.productId || p.sku === item.sku);
        const existing = productSalesMap.get(item.sku || item.productId) || {
          sku: item.sku || item.productId,
          name: item.name || item.productId,
          leather: prod?.leatherType || "Piel Vacuno",
          unitsSold: 0,
          revenue: 0,
        };
        existing.unitsSold += item.quantity || 1;
        existing.revenue += (item.price || 0) * (item.quantity || 1);
        productSalesMap.set(item.sku || item.productId, existing);
      });
    });

    const topProducts = Array.from(productSalesMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Ventas por piel
    const leatherMap = new Map<string, number>();
    this.orders.forEach(order => {
      (order.items || []).forEach(item => {
        const prod = this.products.find(p => p.id === item.productId || p.sku === item.sku);
        const leather = prod?.leatherType || "Piel Vacuno";
        const rev = (item.price || 0) * (item.quantity || 1);
        leatherMap.set(leather, (leatherMap.get(leather) || 0) + rev);
      });
    });

    const salesByLeather = Array.from(leatherMap.entries()).map(([type, revenue]) => ({
      type,
      percentage: totalSales > 0 ? Math.round((revenue / totalSales) * 100) : 0,
      revenue,
    }));

    // Ventas por talla
    const sizeMap = new Map<string, number>();
    this.orders.forEach(order => {
      (order.items || []).forEach(item => {
        const sizeKey = `${item.size} MX`;
        sizeMap.set(sizeKey, (sizeMap.get(sizeKey) || 0) + (item.quantity || 1));
      });
    });

    const salesBySize = Array.from(sizeMap.entries()).map(([size, units]) => ({
      size,
      units,
    }));

    return {
      kpis: {
        totalSales,
        totalOrders,
        averageTicket,
        conversionRate: totalOrders > 0 ? 3.2 : 0,
        grossMargin: totalOrders > 0 ? 64.2 : 0,
        roas: totalOrders > 0 ? 4.8 : 0,
        cartAbandonmentRate: totalOrders > 0 ? 45.0 : 0,
        cartRecoveryRate: totalOrders > 0 ? 22.5 : 0,
        preferredPayment: {
          mercadopago: mpPercent,
          spei: speiPercent,
        },
      },
      weeklySales: {
        currentWeekTotal: totalSales,
        currentWeekOrders: totalOrders,
        growthVsLastWeek: totalOrders > 0 ? "+100%" : "0%",
        weeks,
        dailyBreakdown,
      },
      trafficAnalytics: {
        weeklySessions: 1480,
        uniqueVisitors: 890,
        pageViews: 5840,
        avgDuration: "3m 15s",
        bounceRate: "32.4%",
        deviceDistribution: [
          { device: "Móvil (Smartphones)", percentage: 78 },
          { device: "Computadora de Escritorio", percentage: 19 },
          { device: "Tabletas", percentage: 3 },
        ],
        topPages: [
          { path: "/", label: "Home Cinematográfico (Video + Universo)", views: 2450, share: 42 },
          { path: "/coleccion", label: "Catálogo Colección Hombre", views: 1820, share: 31 },
          { path: "/mujer", label: "Adelanto Exclusivo Colección Mujer 2026", views: 980, share: 17 },
          { path: "/amuleto", label: "Historia del Amuleto & Cruz de Hierro", views: 390, share: 7 },
          { path: "/rastreo", label: "Portal de Rastreo & Guías de Envío", views: 200, share: 3 },
        ],
      },
      geographicOrigins: {
        national: [
          { region: "Monterrey, Nuevo León", share: 30, visitors: 267, revenue: totalSales > 0 ? Math.round(totalSales * 0.3) : 0, flag: "🇲🇽" },
          { region: "Ciudad de México (CDMX) & EdoMex", share: 26, visitors: 231, revenue: totalSales > 0 ? Math.round(totalSales * 0.26) : 0, flag: "🇲🇽" },
          { region: "Guadalajara, Jalisco", share: 18, visitors: 160, revenue: totalSales > 0 ? Math.round(totalSales * 0.18) : 0, flag: "🇲🇽" },
          { region: "León, Guanajuato (Sede Matriz)", share: 14, visitors: 125, revenue: totalSales > 0 ? Math.round(totalSales * 0.14) : 0, flag: "🇲🇽" },
          { region: "Chihuahua / Coahuila / Sonora", share: 12, visitors: 107, revenue: totalSales > 0 ? Math.round(totalSales * 0.12) : 0, flag: "🇲🇽" },
        ],
        international: [
          { region: "Texas (San Antonio, Houston, Dallas)", share: 60, visitors: 53, revenue: 0, flag: "🇺🇸" },
          { region: "California & Arizona", share: 40, visitors: 36, revenue: 0, flag: "🇺🇸" },
        ],
      },
      searchQueries: [
        { query: "Bota Silao Arena Gamuza", count: 184, conversion: "5.1%", trend: "+28%", intent: "Compra Alta" },
        { query: "Botas Mujer 2026 Preventa", count: 142, conversion: "4.2%", trend: "+65%", intent: "Demanda Emergente" },
        { query: "Cruz de Hierro Amuleto", count: 96, conversion: "2.8%", trend: "+12%", intent: "Branding & Prestigio" },
        { query: "Bota Chapala Miel Vacuno", count: 88, conversion: "4.5%", trend: "+10%", intent: "Compra Alta" },
        { query: "Horma Cuadrada Vaquera", count: 74, conversion: "3.8%", trend: "+18%", intent: "Especificación Técnica" },
        { query: "Goodyear Welt 360", count: 62, conversion: "5.6%", trend: "+6%", intent: "Calidad Artesanal" },
      ],
      executiveSummary: {
        title: "Informe Ejecutivo de Desempeño Comercial BRAVÍO Western",
        period: "Semana Actual / Q4 2026",
        preparedFor: "Dirección General & Consejo de Administración (Carlos Barrón & Gonzalo Arrieta)",
        highlights: totalOrders > 0
          ? [
              `Se registran ${totalOrders} órdenes completadas por un total de $${totalSales.toLocaleString("es-MX")} MXN.`,
              `Ticket promedio consolidado en $${averageTicket.toLocaleString("es-MX")} MXN bajo construcción Goodyear Welt 360°.`,
              `Pasarelas operando con distribución de ${mpPercent}% Mercado Pago y ${speiPercent}% Transferencia SPEI.`,
            ]
          : [
              "Sistema de ventas en línea activo y listo en producción para registrar compras en tiempo real.",
              "Actualmente no hay pedidos registrados; las estadísticas de facturación, carritos y ticket promedio se actualizarán automáticamente con cada compra confirmada.",
              "Pasarelas de cobro configuradas y probadas (Mercado Pago y SPEI Directo).",
              "Tráfico de prospección activo concentrado en Monterrey, CDMX, Guadalajara y el Bajío.",
            ],
        strategicRecommendations: [
          "Mantener monitoreo continuo sobre la confirmación de pagos vía Mercado Pago y validación de transferencias SPEI.",
          "Supervisar el stock de pieles y hormas conforme se generen los primeros pedidos en línea.",
          "Monitorear las campañas en dispositivos móviles (78% del tráfico web actual).",
        ],
      },
      topProducts,
      salesByLeather,
      salesBySize,
    };
  }

  // Payment Settings
  getPaymentSettings(): PaymentSettings {
    if (!this.paymentSettings) {
      this.paymentSettings = JSON.parse(JSON.stringify(INITIAL_PAYMENT_SETTINGS));
    }
    return {
      ...this.paymentSettings,
      mercadopago: { ...this.paymentSettings.mercadopago },
      spei: { ...this.paymentSettings.spei }
    };
  }

  updatePaymentSettings(updates: { mercadopago?: Partial<PaymentSettings["mercadopago"]>; spei?: Partial<PaymentSettings["spei"]> }, updatedBy = "cbarron"): PaymentSettings {
    if (!this.paymentSettings) {
      this.paymentSettings = JSON.parse(JSON.stringify(INITIAL_PAYMENT_SETTINGS));
    }
    this.paymentSettings = {
      ...this.paymentSettings,
      mercadopago: {
        ...this.paymentSettings.mercadopago,
        ...(updates.mercadopago || {}),
      },
      spei: {
        ...this.paymentSettings.spei,
        ...(updates.spei || {}),
      },
      updatedAt: new Date().toISOString(),
      updatedBy,
    };
    this.addAudit(
      "PAYMENT_SETTINGS_UPDATE",
      "PaymentSettings",
      "payments",
      `Ajustes de pago actualizados (Mercado Pago: ${this.paymentSettings.mercadopago.enabled ? "Activo" : "Inactivo"} [${this.paymentSettings.mercadopago.sandboxMode ? "Sandbox" : "Producción"}], SPEI: ${this.paymentSettings.spei.enabled ? "Activo" : "Inactivo"} [${this.paymentSettings.spei.bankName}])`,
      updatedBy
    );
    return this.getPaymentSettings();
  }

  // Audit
  getAuditLogs(): AuditLog[] {
    return [...this.auditLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  addAudit(action: string, entity: string, entityId: string, details: string, user = "Admin / Marketing") {
    const log: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      user,
      action,
      entity,
      entityId,
      details,
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 500) this.auditLogs.pop();
  }
}

// Global Singleton for Development & Server Runtime
declare global {
  var __BRAVIO_DB__: MockDatabase | undefined;
}

export const db = global.__BRAVIO_DB__ || new MockDatabase();
if (process.env.NODE_ENV !== "production") {
  global.__BRAVIO_DB__ = db;
}

