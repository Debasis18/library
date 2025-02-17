"use client";
import { registerWithEmail } from "@/appwrite/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Spinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState();

  const create = async (data) => {
    setError("");
    const result = await registerWithEmail(data);
    if (result.success) {
      router.push("/login");
    } else if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex flex-col items-end w-full my-16">
      <Header />
      <div className="mx-auto bg-white my-auto w-full max-w-lg rounded-xl my-8 p-10 border border-black/10">
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <h2 className="font-bold text-3xl mb-4">Sign up</h2>
        <p className="text-gray-600 mt-4 mb-4">
          Sign up to manage your library account, borrow books, and stay updated
          with the latest collections.
        </p>
        <form onSubmit={handleSubmit(create)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                ID Card No.
              </label>
              <Input
                type="text"
                placeholder="Enter your ID No"
                {...register("idCardNo", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Mobile No
              </label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <span className="px-3 ">+91</span>
                <Input
                  type="tel"
                  placeholder="Enter your mobile no."
                  className="flex-1"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  maxLength={10}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Register"}
          </Button>
        </form>
        <p className="text-gray-600 text-center py-4">
          Already have account ?
          <Link className="text-black underline" href={"/login"}>
            Login In
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
