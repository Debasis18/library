import { getLoggedInUser } from "@/appwrite/auth";
import { getUser } from "@/appwrite/data-service/user.data";
import UserAuthLayout from "@/components/UserAuthLayout";

import {
  User,
  Mail,
  Smartphone,
  CheckCircle,
  Book,
  ClipboardList,
  Calendar,
} from "lucide-react";
import React from "react";

async function page() {
  const user = await getLoggedInUser();
  const userData = await getUser(user?.$id);
  if(!userData) return null;

  return (
    <UserAuthLayout>
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br border border-slate-200 bg-white rounded-2xl shadow-lg mt-10 hover:shadow-xl transition-shadow duration-300">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {userData.name}
            </h2>
            <p className="text-gray-600 mt-2">User Profile Details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  justify-items-center ">
            <div className="space-y-4">
              <p className="text-gray-700 flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <strong className="text-gray-900 font-semibold">
                  Email:
                </strong>{" "}
                <span className="text-blue-600 ml-1">{userData.email}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <User className="h-5 w-5 text-purple-600 mr-2" />
                <strong className="text-gray-900 font-semibold">
                  User ID:
                </strong>{" "}
                <span className="text-purple-600 ml-1">{userData.userId}</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                <strong className="text-gray-900 font-semibold">
                  Mobile No:
                </strong>
                <span className="text-green-600 ml-1">{userData.mobileNo}</span>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <strong className="text-gray-900 font-semibold">
                  Permission:
                </strong>{" "}
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    userData.permission
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {userData.permission ? "Granted" : "Denied"}
                </span>
              </p>
              <p className="text-gray-700 flex items-center">
                <Book className="h-5 w-5 text-orange-600 mr-2" />
                <strong className="text-gray-900 font-semibold">
                  No. of Books Borrowed:
                </strong>{" "}
                <span className="text-orange-600 ml-1">
                  {userData?.borrowedBooks?.length}
                </span>
              </p>
              <p className="text-gray-700 flex items-center">
                <ClipboardList className="h-5 w-5 text-pink-600 mr-2" />
                <strong className="text-gray-900 font-semibold">
                  No. of Books Requested:
                </strong>{" "}
                <span className="text-pink-600 ml-1">
                  {userData?.requestedBooks?.length}
                </span>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm flex items-center justify-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <strong className="text-gray-900">
                Account Created At:
              </strong>{" "}
              {new Date(userData.$createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </UserAuthLayout>
  );
}

export default page;
