import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderItem } from "@/lib/types";

interface CommerceState {
  // Cart
  cart: OrderItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<OrderItem, "quantity">, quantity?: number) => void;
  removeFromCart: (sku: string, size: string) => void;
  updateQuantity: (sku: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; shipping: number; total: number; count: number };

  // Audio Player
  isPlayingAudio: boolean;
  isMuted: boolean;
  volume: number;
  trackName: string;
  hasInteracted: boolean;
  setPlayingAudio: (playing: boolean) => void;
  toggleAudio: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (vol: number) => void;
  setInteracted: () => void;
}

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (i) => i.sku === item.sku && i.size === item.size
          );
          if (existingIndex > -1) {
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated, isCartOpen: true };
          }
          return {
            cart: [...state.cart, { ...item, quantity }],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (sku, size) => {
        set((state) => ({
          cart: state.cart.filter((i) => !(i.sku === sku && i.size === size)),
        }));
      },

      updateQuantity: (sku, size, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((i) => !(i.sku === sku && i.size === size)),
            };
          }
          return {
            cart: state.cart.map((i) =>
              i.sku === sku && i.size === size ? { ...i, quantity } : i
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const cart = get().cart;
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        // Free shipping on orders over $3,500 MXN
        const shipping = subtotal > 3500 || subtotal === 0 ? 0 : 250;
        const total = subtotal + shipping;
        return { subtotal, shipping, total, count };
      },

      // Audio State
      isPlayingAudio: false,
      isMuted: false,
      volume: 0.28,
      trackName: "Sonora Sunset (Ambient)",
      hasInteracted: false,
      setPlayingAudio: (playing) => set({ isPlayingAudio: playing }),
      toggleAudio: () => set((state) => ({ isPlayingAudio: !state.isPlayingAudio })),
      setMuted: (muted) => set({ isMuted: muted }),
      setVolume: (vol) => set({ volume: Math.max(0, Math.min(1, vol)) }),
      setInteracted: () => set({ hasInteracted: true }),
    }),
    {
      name: "bravio_commerce_v2",
      partialize: (state) => ({
        cart: state.cart,
        volume: state.volume,
        isMuted: state.isMuted,
      }),
    }
  )
);

