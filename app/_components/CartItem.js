"use client";

import { Button } from "../../components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { Separator } from "../../components/ui/separator";

function CartItem({ item, onIncrease, onDecrease, onRemove, disabled }) {
  return (
    <>
      <div className="flex gap-7 items-center">
        <Image
          src={item.products.primary_image}
          width={120}
          height={100}
          alt={item.products.name}
        />

        <p className="text-lg font-medium w-[150px]">{item.products.name}</p>

        <div className="flex items-center gap-5">
          <Button disabled={disabled} onClick={onDecrease}>
            -
          </Button>
          <span>{item.quantity}</span>
          <Button disabled={disabled} onClick={onIncrease}>
            +
          </Button>
        </div>

        <p className="font-medium">{item.quantity * item.price} EGP</p>

        <X className="cursor-pointer text-destructive" onClick={onRemove} />
      </div>
      <Separator />
    </>
  );
}

export default CartItem;
