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
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

// ======== كومبوننت الدفع ب Stripe ========
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
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-6">
      <PaymentElement />
      <button
        onClick={handlePay}
        disabled={isPaying || !stripe || !elements}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {isPaying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

// ======== الصفحة الرئيسية للـ Checkout ========
export default function CheckoutPage() {
  const router = useRouter();
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // default: card
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // عند الضغط على Proceed to Payment
  async function handleProceed(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ إنشاء الأوردر في DB مع بيانات الشحن وطريقة الدفع
      const { orderId: newOrderId } = await checkoutAction(
        paymentMethod,
        shippingData
      );
      setOrderId(newOrderId);

      // لو الدفع عبر Stripe
      if (paymentMethod === "card") {
        const { clientSecret } = await createStripePaymentIntent(newOrderId);
        setClientSecret(clientSecret);
      } else {
        // دفع عند الاستلام → الأوردر تم إنشاؤه فورًا
        toast.success("Order placed! Please pay on delivery.");
        router.push("/orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  // بعد الحصول على clientSecret → عرض Stripe Elements
  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePayment clientSecret={clientSecret} orderId={orderId} />
      </Elements>
    );
  }

  // نموذج بيانات الشحن + اختيار طريقة الدفع
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Shipping & Payment</h1>
      <form onSubmit={handleProceed} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Address"
          value={shippingData.address}
          onChange={(e) =>
            setShippingData({ ...shippingData, address: e.target.value })
          }
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={shippingData.city}
          onChange={(e) =>
            setShippingData({ ...shippingData, city: e.target.value })
          }
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={shippingData.phone}
          onChange={(e) =>
            setShippingData({ ...shippingData, phone: e.target.value })
          }
          className="border p-2 rounded"
          required
        />

        {/* اختيار طريقة الدفع */}
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

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}
