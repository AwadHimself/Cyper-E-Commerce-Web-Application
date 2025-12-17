"use server";

import { signIn, signOut, auth } from "./auth";
import { supabase } from "./supabase";
import { supabaseAdmin } from "./supabase-admin";
import { stripe } from "./stripe";

/* =========================
   AUTH ACTIONS
========================= */

export async function signInGoogleAction() {
  await signIn("google", { redirectTo: "/products" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

/* =========================
   CART HELPERS
========================= */

async function getOrCreateCart(userId) {
  let { data: cart } = await supabaseAdmin
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!cart) {
    const { data: newCart, error } = await supabaseAdmin
      .from("carts")
      .insert({ user_id: userId })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    cart = newCart;
  }

  return cart;
}

/* =========================
   CART ACTIONS
========================= */

export async function addToCart(productId) {
  const session = await auth();
  if (!session?.user?.currentUserId) throw new Error("Not authenticated");

  const userId = session.user.currentUserId;
  const cart = await getOrCreateCart(userId);

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("price")
    .eq("id", productId)
    .single();

  if (productError) throw new Error(productError.message);

  const { data: item } = await supabaseAdmin
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (item) {
    await supabaseAdmin
      .from("cart_items")
      .update({ quantity: item.quantity + 1 })
      .eq("id", item.id);
  } else {
    await supabaseAdmin.from("cart_items").insert({
      cart_id: cart.id,
      product_id: productId,
      quantity: 1,
      price: product.price,
    });
  }

  return { success: true };
}

export async function updateCartItemQuantity(productId, quantity) {
  const session = await auth();
  if (!session?.user?.currentUserId) throw new Error("Not authenticated");

  if (quantity < 1) throw new Error("Invalid quantity");

  const userId = session.user.currentUserId;
  const cart = await getOrCreateCart(userId);

  const { error } = await supabaseAdmin
    .from("cart_items")
    .update({ quantity })
    .eq("cart_id", cart.id)
    .eq("product_id", productId);

  if (error) throw new Error(error.message);

  return { success: true };
}

export async function removeCartItem(productId) {
  const session = await auth();
  if (!session?.user?.currentUserId) throw new Error("Not authenticated");

  const userId = session.user.currentUserId;
  const cart = await getOrCreateCart(userId);

  const { error } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("cart_id", cart.id)
    .eq("product_id", productId);

  if (error) throw new Error(error.message);

  return { success: true };
}

export async function clearCart() {
  const session = await auth();
  if (!session?.user?.currentUserId) throw new Error("Not authenticated");

  const userId = session.user.currentUserId;
  const cart = await getOrCreateCart(userId);

  await supabaseAdmin.from("cart_items").delete().eq("cart_id", cart.id);

  return { success: true };
}

/* =========================
   CHECKOUT / ORDER ACTIONS
========================= */

export async function checkoutAction(paymentMethod, shippingData) {
  const session = await auth();
  if (!session?.user?.currentUserId) throw new Error("Not authenticated");

  const userId = session.user.currentUserId;
  const cart = await getOrCreateCart(userId);

  const { data: cartItems } = await supabaseAdmin
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id);

  if (!cartItems || cartItems.length === 0) throw new Error("Cart is empty");

  // 1️⃣ Create order with shipping address
  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: userId,
      status: "pending",
      shipping_address: shippingData, // ← هنا
    })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  // باقي الكود كما هو
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }));
  await supabaseAdmin.from("order_items").insert(orderItems);

  const total = cartItems.reduce((sum, item) => sum + Number(item.total), 0);
  await supabaseAdmin.from("orders").update({ total }).eq("id", order.id);

  await supabaseAdmin.from("payments").insert({
    order_id: order.id,
    payment_method: paymentMethod,
    amount: total,
    status: "pending",
  });

  await supabaseAdmin
    .from("orders")
    .update({ status: paymentMethod === "cash" ? "processing" : "pending" })
    .eq("id", order.id);

  await supabaseAdmin.from("cart_items").delete().eq("cart_id", cart.id);

  return { success: true, orderId: order.id };
}

/* =========================
   STRIPE PAYMENT INTENT
========================= */

export async function createStripePaymentIntent(orderId) {
  const session = await auth();
  if (!session?.user?.currentUserId) throw new Error("Not authenticated");

  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("id, total, currency")
    .eq("id", orderId)
    .single();

  if (!order) throw new Error("Order not found");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.total * 100), // EGP → piasters
    currency: order.currency.toLowerCase(),
    metadata: {
      order_id: order.id,
      user_id: session.user.currentUserId,
    },
  });

  return { clientSecret: paymentIntent.client_secret };
}

export async function deleteOrderAction(orderId) {
  const { data: order, error: fetchError } = await supabaseAdmin
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .single();

  if (fetchError) throw new Error(fetchError.message);
  if (!order) throw new Error("Order not found");

  if (order.status !== "completed") {
    throw new Error("Only completed orders can be deleted");
  }

  const { error: deleteError } = await supabaseAdmin
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (deleteError) throw new Error(deleteError.message);

  return { success: true };
}
