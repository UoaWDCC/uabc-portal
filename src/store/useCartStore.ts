import { SelectSessionCardProps } from "@/components/booking/SelectSessionCard";
import { create } from "zustand";

interface CartDto extends SelectSessionCardProps {
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
