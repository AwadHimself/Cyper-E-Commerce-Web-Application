import { auth } from "../_lib/auth";
import LoginMessage from "../_components/LoginMessage";
import { getUserCart } from "../_lib/data-service";
import CartClient from "../_components/CartClient";

export default async function page() {
  const session = await auth();

  if (!session?.user) return <LoginMessage />;

  const userCart = await getUserCart(session.user.currentUserId);

  return (
    <div className="max-w-[80%] m-auto">
      <h1>Shopping Cart</h1>

      <CartClient cart={userCart} />
    </div>
  );
}
