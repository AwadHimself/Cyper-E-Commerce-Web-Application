import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { auth } from "../_lib/auth";
import CartButton from "./AddToCartButton";
import AddToCartButton from "./AddToCartButton";
import { ShoppingCart } from "lucide-react";

async function ProductItem({ product }) {
  const session = await auth();
  const { name, id, price, currency, primary_image, stock_count } = product;

  return (
    <div className="flex flex-col items-center gap-10 bg-muted rounded-2xl py-5 px-4">
      <AddToCartButton
        disabled={stock_count === 0}
        productId={id}
        position="end"
      >
        <ShoppingCart />
      </AddToCartButton>

      <div className="relative h-30 w-30">
        <Image src={primary_image} fill className="object-cover" alt={name} />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold">{name}</h1>
        <p>
          <span className="font-bold">{price}</span> {currency}
        </p>
      </div>

      <Link href={`/products/${id}`}>
        <Button className="px-15">Shop Now</Button>
      </Link>
    </div>
  );
}

export default ProductItem;
