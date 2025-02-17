import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t bg-white w-full px-4  ">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <Image src={"/logo.png"} alt="logo" width={80} height={50} />
        <p className="text-sm text-gray-500 text-center">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
