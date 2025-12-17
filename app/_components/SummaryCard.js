import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export function SummaryCard({ items }) {
  const subtotal = items.reduce((acc, i) => acc + i.total, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const total = subtotal + shipping;

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardFooter className="flex-col gap-3">
        <div className="flex justify-between w-full">
          <span>Subtotal</span>
          <span>{subtotal} EGP</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Shipping</span>
          <span>{shipping} EGP</span>
        </div>
        <div className="flex justify-between font-bold w-full">
          <span>Total</span>
          <span>{total} EGP</span>
        </div>
        <Link href="/checkout" className="w-full mt-6">
          <Button className="w-full mt-6">Checkout</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
