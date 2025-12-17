"use client";

import { useState, useTransition } from "react";
import CartItem from "./CartItem";
import { SummaryCard } from "./SummaryCard";
import {
  updateCartItemQuantity,
  removeCartItem,
  checkoutAction,
  createStripePaymentIntent,
} from "../_lib/actions";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../../components/ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

function StripePayment({ clientSecret, orderId, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);

  async function handlePay() {
    if (!stripe || !elements) return;

    setIsPaying(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin, // ممكن تغير لصفحة نجاح
      },
    });

    if (error) {
      alert(error.message);
      setIsPaying(false);
    } else {
      onSuccess();
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-6">
      <PaymentElement />
      <Button onClick={handlePay} disabled={isPaying || !stripe || !elements}>
        {isPaying ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}

export default function CartClient({ cart }) {
  const [items, setItems] = useState(cart.cart_items);
  const [isPending, startTransition] = useTransition();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState(null);

  function changeQty(productId, newQty) {
    if (newQty < 1) return;

    setItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: newQty, total: item.price * newQty }
          : item
      )
    );

    startTransition(async () => {
      try {
        await updateCartItemQuantity(productId, newQty);
      } catch {
        setItems(cart.cart_items);
      }
    });
  }

  function removeItem(productId) {
    const snapshot = items;

    setItems((prev) => prev.filter((item) => item.product_id !== productId));

    startTransition(async () => {
      try {
        await removeCartItem(productId);
      } catch {
        setItems(snapshot);
      }
    });
  }

  // =========================
  // عرض الكارت الطبيعي + SummaryCard
  // =========================
  return (
    <div className="flex gap-7 mt-10 items-start">
      <div className="flex-1 flex flex-col gap-7">
        {items.map((item) => (
          <CartItem
            key={item.product_id}
            item={item}
            onIncrease={() => changeQty(item.product_id, item.quantity + 1)}
            onDecrease={() => changeQty(item.product_id, item.quantity - 1)}
            onRemove={() => removeItem(item.product_id)}
            disabled={isPending}
          />
        ))}
      </div>

      <SummaryCard items={items} />
    </div>
  );
}
