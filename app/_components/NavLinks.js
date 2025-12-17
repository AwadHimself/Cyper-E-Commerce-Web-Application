"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "text-foreground font-bold"
      : "text-muted-foreground hover:text-foreground";

  return (
    <div className="flex items-center gap-10 text-lg">
      <Link className={linkClass("/")} href="/">
        Home
      </Link>
      <Link className={linkClass("/products")} href="/products">
        Products
      </Link>
      <Link className={linkClass("/contactus")} href="/contactus">
        Contact Us
      </Link>
    </div>
  );
}
