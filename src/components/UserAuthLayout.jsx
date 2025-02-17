import { getLoggedInUser } from "@/appwrite/auth";
import { getUser } from "@/appwrite/data-service/user.data";
import { redirect } from "next/navigation";
import React from "react";

async function UserAuthLayout({ children }) {
  const [user] = await Promise.all([getUser((await getLoggedInUser())?.$id)]);

  if (user && user.permission) return <div>{children}</div>;
  else redirect("/permission");
}

export default UserAuthLayout;
