"use client";

import { ShoppingCart } from "lucide-react";
import { addToCart } from "../_lib/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function CartButton({ productId }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await addToCart(productId);
        toast.success("Product added to cart");
      } catch (error) {
        toast.error("Failed to add product");
        console.error(error);
      }
    });
  }

  return (
    <ShoppingCart
      className={`cursor-pointer self-end ${
        isPending ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={handleClick}
    />
  );
}
