"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/LoadingSpinner";
import { getLoggedInUser, login } from "@/appwrite/auth";
import { toast } from "react-toastify";
import SpinnerBig from "@/components/SpinnerBig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handelLogin = async (data) => {
    const result = await login(data);
    if (result.success) {
      setLoading(true);
      const user = await getLoggedInUser();
      toast.success("Login Success");

      if (user?.labels[0] === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    } else if (result.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <Header />
      {!loading ? (
        <div className="mx-auto my-auto max-w-lg rounded-xl p-10 border bg-white ">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-gray-600 mt-4">
            Login in to manage your library account, borrow books, and stay
            updated with the latest collections.
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form
            onSubmit={handleSubmit(handelLogin)}
            className="my-4 space-y-5 "
          >
            <div>
              <p className="text-gray-600 mb-4">Email</p>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <p className="text-gray-600 mb-4">Password</p>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Log in"}
            </Button>
          </form>
          <p className="text-gray-600 text-center">
            Don't have account ?
            <Link className="text-black underline" href={"/register"}>
              Register
            </Link>
          </p>
        </div>
      ) : (
        <SpinnerBig />
      )}
      <Footer />
    </div>
  );
}

export default Login;
