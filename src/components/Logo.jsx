import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <div className="size-12">
        <Image src={logo} height="auto" alt="LMS logo" quality={100} />
      </div>
      <p className="text-2xl font-semibold text-primary-100">LMS</p>
    </Link>
  );
}

export default Logo;
