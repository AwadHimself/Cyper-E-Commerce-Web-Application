import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image src="/Logo.png" height="60" width="60" alt="The Wild Oasis logo" />
    </Link>
  );
}

export default Logo;
