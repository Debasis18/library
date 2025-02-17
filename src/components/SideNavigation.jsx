"use client";
import React, { useState } from "react";
import {
  BookOpenIcon,
  HomeIcon,
  PencilSquareIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./LogOutButton";
import { BookPlus, User, UserPlus } from "lucide-react";
import Image from "next/image";

function SideNavigation({ isAdmin, name, email }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    {
      name: "Home",
      href: "/dashboard/admin",
      icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
      active: isAdmin,
    },
    {
      name: "All Users",
      href: "/dashboard/admin/users",
      icon: <UsersIcon className="h-5 w-5 text-primary-600" />,
      active: isAdmin,
    },
    {
      name: "All Books",
      href: "/dashboard/admin/books",
      icon: <BookOpenIcon className="h-5 w-5 text-primary-600" />,
      active: isAdmin,
    },
    {
      name: "Issue Book",
      href: "/dashboard/admin/borrowandissue",
      icon: <PencilSquareIcon className="h-5 w-5 text-primary-600" />,
      active: isAdmin,
    },
    {
      name: "Account Request",
      href: "/dashboard/admin/requestedUsers",
      icon: <UserPlus className="h-5 w-5 text-primary-600" />,
      active: isAdmin,
    },
    {
      name: "Book Request",
      href: "/dashboard/admin/requestedbooks",
      icon: <BookPlus className="h-5 w-5 text-primary-600" />,
      active: isAdmin,
    },
    {
      name: "My Profile",
      href: "/dashboard/user",
      icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
      active: !isAdmin,
    },

    {
      name: "All Books",
      href: "/dashboard/user/books",
      icon: <BookOpenIcon className="h-5 w-5 text-primary-600" />,
      active: !isAdmin,
    },

    {
      name: "Request Book",
      href: "/dashboard/user/requestbook",
      icon: <BookPlus className="h-5 w-5 text-primary-600" />,
      active: !isAdmin,
    },
    {
      name: "My Profile",
      href: "/dashboard/user/profile",
      icon: <User className="h-5 w-5 text-primary-600" />,
      active: !isAdmin,
    },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 p-2 bg-indigo-500 text-white rounded"
      >
        ☰
      </button>

      <div
        className={`fixed  inset-y-0 left-0 transform flex flex-col justify-between ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out border-r p-4 w-64 bg-white z-50`}
      >
        <div>
          <div className="w-full flex flex-col items-center justify-center mb-8 b  ">
            <Image
              src={"/logo.png"}
              height={100}
              width={100}
              alt="logo"
              className="border p-4 rounded-full"
            />
            <h2 className="font-bold text-2xl text-slate-600">The LMS</h2>
          </div>

          {navLinks.map((link, index) => (
            <h2 key={index} onClick={toggleSidebar}>
              {link.active && (
                <Link
                  className={`py-3 px-5 rounded hover:bg-indigo-100 transition-colors flex items-center gap-4 font-semibold ${
                    pathname === link.href
                      ? "bg-indigo-900 text-slate-100"
                      : "text-slate-800"
                  }`}
                  href={link.href}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              )}
            </h2>
          ))}
          <SignOutButton />
        </div>
        <div className="mb-24 flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-900 text-white text-lg font-bold">
            {name.charAt(0)}
            {name.split(" ").length > 1 ? name.split(" ")[1].charAt(0) : ""}
          </div>

          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <h2 className="text-gray-600">{email}</h2>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default SideNavigation;
