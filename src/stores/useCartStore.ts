import { create } from "zustand";

import type { GameSessionDto } from "@/types/game-session";
import type { playLevel } from "@/types/types";

interface CartState {
  cart: GameSessionDto[];
}

interface CartAction {
  updateCart: (cart: CartState["cart"]) => void;
  updatePlayLevelById: (id: number, playLevel: playLevel) => void;
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
}));
