import Link from "next/link";
import { auth } from "../_lib/auth";
import NavLinks from "./NavLinks";
import { ShoppingCart, User } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { ProfileToggle } from "./ProfileToggle";
import { getUserCart } from "../_lib/data-service";

export default async function Navigation() {
  const session = await auth();

  let cartItemsCount = 0;

  if (session?.user?.currentUserId) {
    try {
      const cart = await getUserCart(session.user.currentUserId);

      cartItemsCount =
        cart?.cart_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    } catch (error) {
      console.error("Error fetching user cart:", error);
      cartItemsCount = 0;
    }
  }

  return (
    <div className="flex items-center gap-28">
      <NavLinks />

      <div className="flex items-center gap-5">
        <Link href="/cart" className="relative">
          <ShoppingCart className="cursor-pointer text-foreground hover:text-muted-foreground" />
          <span className="absolute -top-4 font-bold text-destructive right-0">
            {cartItemsCount}
          </span>
        </Link>

        {session?.user ? (
          <ProfileToggle session={session} />
        ) : (
          <Link href={session ? "/profile" : "/login"}>
            <User className="cursor-pointer text-foreground hover:text-muted-foreground" />
          </Link>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}
