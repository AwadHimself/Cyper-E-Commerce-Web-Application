import Link from "next/link";
import { auth } from "../_lib/auth";
import NavLinks from "./NavLinks";
import { ShoppingCart, User } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { ProfileToggle } from "./ProfileToggle";

export default async function Navigation() {
  const session = await auth();

  return (
    <div className="flex items-center gap-28">
      <NavLinks />

      <div className="flex items-center gap-5">
        <Link href="/cart" className="relative">
          <ShoppingCart className="cursor-pointer text-foreground hover:text-muted-foreground" />
          <span className="absolute">1</span>
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
