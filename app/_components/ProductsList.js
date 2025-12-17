import { getCategories, getProducts } from "../_lib/data-service";
import ProductItem from "./ProductItem";

async function ProductsList({ offset, limit, category }) {
  // await new Promise((r) => setTimeout(r, 5000)); test

  const { products } = await getProducts(offset, limit, category);

  if (!products.length) return null;

  return (
    <div className="grid grid-cols-4 gap-5 mt-10">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductsList;
