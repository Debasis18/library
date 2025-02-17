"use client";
import UserAction from "./UserAction";

export const columns = [
  {
    accessorKey: "SL No",
    cell: ({ row }) => <p className="text-1xl">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p>{row.original.email}</p>,
  },
  {
    accessorKey: "userId",
    header: "ID No.",
    cell: ({ row }) => <p>{row.original.userId}</p>,
  },
  {
    accessorKey: "permission",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => (
      <p
        className={`border px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center ${
          row.original.permission === true
            ? "bg-green-100 text-green-800 border-green-300"
            : row.original.permission === false
            ? "bg-red-100 text-red-800 border-red-300"
            : "bg-yellow-100 text-yellow-800 border-yellow-300"
        }`}
      >
        {row.original.permission === true
          ? "Accepted"
          : row.original.permission === false
          ? "Rejected"
          : "Pending"}
      </p>
    ),
  },

  {
    id: "actions",
    header: () => <p className="text-center">Action</p>,
    cell: ({ row }) => (
      <UserAction id={row.original.$id} permission={row.original.permission} />
    ),
  },
];
