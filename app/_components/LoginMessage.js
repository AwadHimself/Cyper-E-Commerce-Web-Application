import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";

function LoginMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 my-30 ">
      <TriangleAlert size={150} />
      <h1 className="text-4xl font-bold ">You Need To Be Logged In</h1>
      <Link href="/login">
        <Button className="text-lg px-10 py-5">Login</Button>
      </Link>
    </div>
  );
}

export default LoginMessage;
