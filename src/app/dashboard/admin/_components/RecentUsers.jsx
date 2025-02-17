import Link from "next/link";

async function RecentUsers({ data }) {
  const users = data?.slice(0, 5);

  return (
    <div className="flex flex-wrap items-center  gap-4 py-4  rounded-md">
      {users?.map((user) => (
        <Link href={`/dashboard/admin/users/${user.$id}`} key={user.$id}>
          <div className="flex flex-col items-center gap-2  rounded-lg w-48 ">
            <div className="flex items-center justify-center w-14 h-14 bg-indigo-300 text-slate-900 font-bold rounded-full text-xl">
              {user.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>

            <p className="text-md font-semibold text-gray-800 text-center">
              {user.name}
            </p>
            <p className="text-sm text-gray-600 text-center">{user.email}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecentUsers;
