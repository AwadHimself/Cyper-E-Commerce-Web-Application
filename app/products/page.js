import { Suspense } from "react";
import { getCategories, getProducts } from "../_lib/data-service";
import { BreadCrumbNavigation } from "../_components/BreadCrumbNavigation";
import PaginationComponent from "../_components/PaginationComponent";
import ProductsList from "../_components/ProductsList";
import { ProductsListSkelton } from "../_components/ProductsListSkelton";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const currentPage = params.page || 1;
  const category = params.category || "all";

  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const { count } = await getProducts(offset, limit, category);

  const totalPages = Math.ceil(count / limit);

  const categories = await getCategories();
  const slugs = categories.map((category) => category.slug);

  return (
    <div className="mx-35 my-20">
      <BreadCrumbNavigation categories={slugs} />

      <Suspense
        key={`${category}-${currentPage}`}
        fallback={<ProductsListSkelton />}
      >
        <ProductsList offset={offset} limit={limit} category={category} />
      </Suspense>

      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}
