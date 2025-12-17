import { getAppUsers, getFullProduct } from "../../_lib/data-service";
import { calculateFinalPrice } from "../../_lib/helpers";

import { BreadCrumbNavigation } from "../../_components/BreadCrumbNavigation";
import { ProductCarousel } from "../../_components/ProductCarousel";
import ProductDetails from "../../_components/ProductDetails";
import ProductRating from "../../_components/ProductRating";
import ProductReviewsList from "../../_components/ProductReviewsList";

async function Page({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.productid;

  const product = await getFullProduct(productId);

  if (!product) return <div>Product Not Found</div>;

  const finalPrice = calculateFinalPrice(product, product.activeDiscount);

  const primaryCategory = product.categories?.[0] || null;

  const appUsers = await getAppUsers();

  console.log(appUsers);
  console.log(product.product_reviews);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-60 items-center py-10">
        <div className="flex flex-col gap-10">
          <BreadCrumbNavigation
            productCategory={
              primaryCategory?.slug || primaryCategory?.name || ""
            }
            productName={product.name}
          />

          <ProductCarousel images={product.product_images} />
        </div>

        <ProductDetails
          finalPrice={finalPrice}
          productData={product}
          productDiscount={product.activeDiscount}
        />
      </div>

      {product.ratingSummary && (
        <ProductRating
          productRatingSummary={product.ratingSummary}
          ProductReviews={product.product_reviews}
        />
      )}

      <ProductReviewsList
        ProductReviews={product.product_reviews}
        appUsers={appUsers}
      />
    </div>
  );
}

export default Page;
