"use client";

import { ShoppingCart } from "lucide-react";
import { addToCart } from "../_lib/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";

export default function AddToCartButton({
  productId,
  children,
  position,
  disabled,
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await addToCart(productId);
        toast.success("Product added to cart");
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    });
  }

  return (
    <Button
      className={`${position === "end" ? "self-end" : ""}`}
      onClick={handleClick}
      disabled={isPending || disabled}
    >
      {children}
    </Button>
  );
}
