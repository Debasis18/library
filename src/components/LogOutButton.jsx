import { logOut } from "@/appwrite/auth";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "./LoadingSpinner";

function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      const response = await logOut();
      if (response.success) {
        router.push("/");
      }
    });
  };

  return (
    <button
      className="py-3 rounded px-5 hover:bg-indigo-200 transition-colors flex  items-center gap-4 font-semibold text-gray-800 w-full"
      type="button"
      onClick={handleLogout}
    >
      {!isPending ? (
        <>
          <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
          <span>Sign out</span>
        </>
      ) : (
        <Spinner />
      )}
    </button>
  );
}

export default SignOutButton;
