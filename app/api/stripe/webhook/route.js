// app/api/stripe/webhook/route.js
import { stripe } from "../../../_lib/stripe";
import { supabaseAdmin } from "../../../_lib/supabase-admin";

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      const orderId = intent.metadata.order_id;

      await supabaseAdmin
        .from("payments")
        .update({ status: "completed", paid_at: new Date() })
        .eq("order_id", orderId);

      await supabaseAdmin
        .from("orders")
        .update({ status: "completed" })
        .eq("id", orderId);
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object;
      const orderId = intent.metadata.order_id;

      await supabaseAdmin
        .from("payments")
        .update({ status: "failed" })
        .eq("order_id", orderId);

      await supabaseAdmin
        .from("orders")
        .update({ status: "pending" })
        .eq("id", orderId);
    }
  } catch (err) {
    console.error("Error handling event:", err);
    return new Response("Webhook processing error", { status: 500 });
  }

  return new Response("OK");
}
