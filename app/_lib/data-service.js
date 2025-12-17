import { supabase } from "./supabase";

export async function getBanners() {
  const { data: banners, error } = await supabase.from("banners").select("*");
  if (error) throw new Error("error while fetching banners");
  return banners;
}

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error) throw new Error("error while fetching categories");
  return categories;
}

export async function getProducts(offset = 0, limit = 12, category = "all") {
  let query;
  if (category === "all") {
    query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .range(offset, offset + limit - 1);
  } else {
    query = supabase
      .from("products")
      .select(
        `
        *,
        product_categories!inner (
          categories!inner (slug)
        )
      `,
        { count: "exact" }
      )
      .eq("product_categories.categories.slug", category)
      .range(offset, offset + limit - 1);
  }

  const { data: products, count, error } = await query;
  if (error) throw new Error(error.message);
  return { products, count };
}

export async function getFullProduct(productId) {
  const now = new Date().toISOString();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (*),
      discounts (*),
      product_reviews (*)
    `
    )
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  const { data: ratingSummary, error: ratingError } = await supabase
    .from("product_rating_summary")
    .select("*")
    .eq("product_id", productId)
    .maybeSingle();

  if (ratingError) {
    console.error("Error fetching rating summary:", ratingError);
  }

  const { data: productCategories, error: categoryError } = await supabase
    .from("product_categories")
    .select(
      `
      categories (
        id,
        name,
        slug
      )
    `
    )
    .eq("product_id", productId);

  if (categoryError) {
    console.error("Error fetching categories:", categoryError);
  }

  const categories = productCategories?.map((pc) => pc.categories) || [];

  const primaryCategory = categories.length > 0 ? categories[0] : null;

  const activeDiscount =
    product?.discounts &&
    product.discounts?.starts_at <= now &&
    product.discounts?.ends_at >= now &&
    product.discounts?.active
      ? product.discounts
      : null;

  return {
    ...product,
    activeDiscount,
    ratingSummary: ratingSummary || null,
    categories,
    primaryCategory,
  };
}

export async function getAppUsers() {
  const { data: users, error } = await supabase.from("app_users").select("*");
  if (error) throw new Error("error while fetching app users");
  return users;
}

export async function getAppUserByEmail(email) {
  if (!email) return null;

  const { data, error } = await supabase
    .from("app_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching app_user:", error);
  }

  return data || null;
}

export async function createAppUser(newUser) {
  const { data, error } = await supabase.from("app_users").insert([newUser]);

  if (error) {
    console.error("Error creating app_user:", error);
    throw new Error("App user could not be created");
  }

  return data;
}

export async function getUserCart(userId) {
  const { data, error } = await supabase
    .from("carts")
    .select(
      `
      id,
      created_at,
      cart_items (
        quantity,
        price,
        total,
        product_id,
        products (
          id,
          name,
          slug,
          price,
          primary_image,
          currency,
          is_active
        )
      )
    `
    )
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user cart:", error);
    throw new Error("Failed to fetch cart");
  }

  return data;
}

export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data || [];
}
