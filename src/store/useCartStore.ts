import { GameSessionDto } from "@/types/GameSessionDto";
import { create } from "zustand";

interface CartDto extends GameSessionDto {
  difficulty?: string;
}

type CartState = {
  cart: CartDto[];
};

type CartAction = {
  updateCart: (cart: CartState["cart"]) => void;
};

export const useCartStore = create<CartState & CartAction>((set) => ({
  cart: [],
  updateCart: (cart) => set(() => ({ cart: cart })),
}));
