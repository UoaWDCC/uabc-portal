"use client";

import { useEffect } from "react";

import { useCartStore } from "@/stores/useCartStore";

export function CartClearer() {
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
