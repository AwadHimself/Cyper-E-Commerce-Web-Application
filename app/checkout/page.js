"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkoutAction, createStripePaymentIntent } from "../_lib/actions";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

function StripePayment({ clientSecret, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  async function handlePay() {
    if (!stripe || !elements) return;

    setIsPaying(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setIsPaying(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Order completed!");
      router.push("/orders");
    } else {
      toast("Payment pending...");
      setIsPaying(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-[80%] mx-auto mt-6">
      <PaymentElement />
      <Button onClick={handlePay} disabled={isPaying || !stripe || !elements}>
        {isPaying ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);

  async function handleProceed(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { orderId: newOrderId } = await checkoutAction(
        paymentMethod,
        shippingData
      );
      setOrderId(newOrderId);

      if (paymentMethod === "card") {
        const { clientSecret } = await createStripePaymentIntent(newOrderId);
        setClientSecret(clientSecret);
      } else {
        toast.success("Order placed! Please pay on delivery.");
        router.push("/orders");
      }
    } catch (err) {
      console.error(err);
      toast.error(`Checkout failed : ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePayment clientSecret={clientSecret} orderId={orderId} />
      </Elements>
    );
  }

  return (
    <div className="w-[80%] mx-auto mt-20">
      <div className="flex flex-col  justify-center  w-full">
        <h1 className="text-2xl font-bold mb-4">Shipping & Payment</h1>
        <form onSubmit={handleProceed} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Address"
            value={shippingData.address}
            onChange={(e) =>
              setShippingData({ ...shippingData, address: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <Input
            type="text"
            placeholder="City"
            value={shippingData.city}
            onChange={(e) =>
              setShippingData({ ...shippingData, city: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <Input
            type="text"
            placeholder="Phone"
            value={shippingData.phone}
            onChange={(e) =>
              setShippingData({ ...shippingData, phone: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <div className="flex gap-4 items-center mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash on Delivery
            </label>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
