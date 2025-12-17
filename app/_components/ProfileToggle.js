"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Link from "next/link";
import { signOutAction } from "../_lib/actions";

export function ProfileToggle({ session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          className="w-7 rounded-full"
          src={session.user.image}
          alt={session.user.name}
          referrerPolicy="no-referrer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/orders">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOutAction()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
