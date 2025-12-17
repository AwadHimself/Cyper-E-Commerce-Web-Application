"use client";

import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export function BreadCrumbNavigation({
  categories = [],
  productName = "",
  productCategory = "",
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryQuery = searchParams?.get("category") || "";
  const pathParts = pathname?.split("/").filter(Boolean) || [];

  const isProductPage = pathParts.length === 2 && pathParts[0] === "products";

  const formatString = (str) =>
    str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/products">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {isProductPage ? (
          <>
            {productCategory && (
              <>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/products?category=${productCategory.toLowerCase()}`}
                    >
                      {formatString(productCategory)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {productName && (
              <>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbPage>{productName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </>
        ) : (
          <>
            {categoryQuery && (
              <>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbPage>{formatString(categoryQuery)}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}

            {categories.length > 0 && (
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="size-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    {categories.map((cat) => (
                      <DropdownMenuItem asChild key={cat}>
                        <Link href={`/products?category=${cat}`}>
                          {formatString(cat)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            )}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
