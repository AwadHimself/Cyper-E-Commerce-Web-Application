export function calculateFinalPrice(product, discount) {
  if (!discount) return product.price;

  if (discount.type === "percentage") {
    return product.price - (product.price * discount.value) / 100;
  }

  if (discount.type === "fixed") {
    return product.price - discount.value;
  }

  return product.price;
}
