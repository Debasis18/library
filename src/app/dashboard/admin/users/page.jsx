import { getAllUsers } from "@/appwrite/data-service/user.data";
import { columns } from "@/components/AllUserTable/columns";
import { UserTable } from "@/components/user-table";

async function Users() {
  const response = await getAllUsers([]);
  const users = await response?.documents;
  const acceptedUsers=users.filter((user)=>user.permission===true)
  

  return (
    <div>
      <h1 className="text-2xl mb-4 text-accent-500 font-medium">All Users</h1>
      <UserTable columns={columns} data={acceptedUsers} />
    </div>
  );
}

export default Users;
