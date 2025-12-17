// app/orders/page.js
import { auth } from "../_lib/auth";
import { supabase } from "../_lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { getUserOrders } from "../_lib/data-service";
import { TableDeleteButton } from "../_components/TableDeleteButton";
import { table } from "console";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.currentUserId) return <p>Please log in</p>;
  const userId = session.user.currentUserId;

  const orders = await getUserOrders(userId);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Shipping Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const shipping =
              order.shipping_address &&
              typeof order.shipping_address === "string"
                ? JSON.parse(order.shipping_address)
                : order.shipping_address || {};

            return (
              <TableRow key={order.id}>
                <TableCell>{order.id.slice(0, 8)}...</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.currency}</TableCell>
                <TableCell>
                  {shipping.address || "-"}, {shipping.city || "-"} ,{" "}
                  {shipping.phone || "-"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toISOString().split("T")[0]}
                </TableCell>
                <TableCell>
                  {order.status === "completed" && (
                    <TableDeleteButton order={order} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
