import { create } from "zustand";

import type { CartGameSession } from "@/types/game-session";
import type { PlayLevel } from "@/types/types";

interface CartState {
  cart: CartGameSession[];
}

interface CartAction {
  updateCart: (cart: CartState["cart"]) => void;
  updatePlayLevelById: (id: number, PlayLevel: PlayLevel) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState & CartAction>((set) => ({
  cart: [],
  updateCart: (cart) => set(() => ({ cart: cart })),
  updatePlayLevelById: (id, playLevel) =>
    set((state) => ({
      cart: state.cart.map((session) => {
        if (session.id === id) return { ...session, playLevel };
        return session;
      }),
    })),
  clearCart: () => set(() => ({ cart: [] })),
}));
