import { Button } from "../../components/ui/button";
import AddToCartButton from "./AddToCartButton";

function ProductDetails({ finalPrice, productData, productDiscount }) {
  return (
    <div className="self-center flex flex-col items-start gap-7 w-[450px]">
      <h1 className="text-5xl font-bold">{productData.name}</h1>

      {productDiscount ? (
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold ">{finalPrice} EGP</span>

          <span className="text-xl line-through text-muted-foreground ">
            {productData.price} EGP
          </span>
        </div>
      ) : (
        <span className="text-3xl font-bold">{productData.price} EGP</span>
      )}
      <div className="mt-5  grid grid-cols-2 gap-4">
        {productData.specs &&
          Object.entries(productData.specs).map(([key, value]) => (
            <span
              className="bg-muted px-4 py-3 rounded-xl text-xs  font-thin"
              key={key}
            >
              <strong>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </strong>
            </span>
          ))}
      </div>
      <p className="text-sm font-medium">{productData.description}</p>
      <div>
        <AddToCartButton
          productId={productData.id}
          disabled={productData.stock_count === 0}
          className="px-15 py-5 text-xl font-medium"
        >
          {productData.stock_count ? "Add To Cart" : "Out Of Stock"}
        </AddToCartButton>
      </div>
    </div>
  );
}

export default ProductDetails;
