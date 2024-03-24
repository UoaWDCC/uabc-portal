import { GameSessionDto } from "@/types/GameSessionDto";
import { create } from "zustand";

interface CartDto {
  id: number;
  weekday: number;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  isFull: boolean;
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
