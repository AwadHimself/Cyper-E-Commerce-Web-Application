"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createStripePaymentIntent } from "../_lib/actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

function CheckoutForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();

  async function handlePay() {
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/${orderId}`,
      },
    });

    if (error) alert(error.message);
  }

  return (
    <>
      <PaymentElement />
      <button
        onClick={handlePay}
        className="bg-black text-white px-6 py-3 rounded mt-4"
      >
        Pay Now
      </button>
    </>
  );
}

export default function StripeCheckout({ orderId }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createStripePaymentIntent(orderId).then((res) =>
      setClientSecret(res.clientSecret)
    );
  }, [orderId]);

  if (!clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm orderId={orderId} />
    </Elements>
  );
}
