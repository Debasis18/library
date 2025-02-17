import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white border-b shadow px-4 sm:px-6 lg:px-8 w-full fixed top-0 w-full">
      <ul className="flex h-16 items-center justify-end  w-full gap-6 text-sm  mx-auto">
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75"
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75"
            href="/info/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="text-gray-500 transition hover:text-gray-500/75"
            href="/info/contactUs"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
