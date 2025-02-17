import Link from "next/link";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/appwrite/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function Home() {
  const user = await getLoggedInUser();
  if (user) {
    if (user?.labels[0] === "admin") {
      redirect("/dashboard/admin");
    } else {
      redirect("/dashboard/user");
    }
  }

  return (
    <section className="flex flex-col items-center justify-between relative bg-gray-900 text-white w-full ">
      <div className="z-50 w-full">
        <Header />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-32 text-center bg-cover bg-center"
        style={{ backgroundImage: "url(/lb.png)" }}
      >
        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Manage Your Library.
          <span className="sm:block">Simplify Your Workflow.</span>
        </h1>

        <p className="mt-4 max-w-xl sm:text-xl text-slate-50">
          Streamline your library operations with our comprehensive management
          system. Track books, manage members, and enhance your library
          experience.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none"
            href="/login"
          >
            Login
          </Link>

          <Link
            className="rounded-sm border border-blue-600 px-12 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>

      <Footer />
    </section>
  );
}
