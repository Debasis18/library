import React from "react";
import SideNavigation from "../../components/SideNavigation";
import { getLoggedInUser } from "@/appwrite/auth";
import Header from "@/components/Header";

async function Layout({ children }) {
  const user = await getLoggedInUser();
  if (!user) return null;

  const isAdmin = user.labels[0] === "admin";
  return (
    <div className="flex w-full min-h-screen flex-col">
      <Header />
      <SideNavigation isAdmin={isAdmin} name={user.name} email={user.email} />
      <main className="p-4 md:p-8 flex-grow md:ml-64 mt-16 bg-slate-50 h-full flex flex-col">
        {children}
      </main>
    </div>
  );
}

export default Layout;
