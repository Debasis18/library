import { UserTable } from "@/components/user-table";
import { columns } from "@/components/RequestedUserTable/columns";
import React from "react";
import { getAllUsers } from "@/appwrite/data-service/user.data";

async function page() {
  const response = await getAllUsers([]);
  const users = response?.documents;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Requested users</h2>
      <UserTable columns={columns} data={users} />
    </div>
  );
}

export default page;
