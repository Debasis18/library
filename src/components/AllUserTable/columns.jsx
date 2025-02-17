"use client";
import Link from "next/link";
import UserAction from "./userAction";

export const columns = [
  {
    accessorKey: "SL No",
    cell: ({ row }) => <p className="text-1xl">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile No",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
    accessorKey: "borrowedBooks",
    header: "Borrowed Book",
    cell: ({ row }) => (
      <p className="text-center">{row.original.borrowedBooks.length}</p>
    ),
  },
  {
    accessorKey: "requestedBooks",
    header: "Requested Book",
    cell: ({ row }) => (
      <p className="text-center">{row.original.requestedBooks.length}</p>
    ),
  },

  {
    id: "view",
    header: () => <div>Details</div>,
    cell: ({ row }) => (
      <Link
        className="px-3 py-1  border text-blue-800 bg-blue-200 font-bold rounded"
        href={`/dashboard/admin/users/${row.original.$id}`}
      >
        View
      </Link>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <UserAction
        id={row.original.$id}
        userId={row.original.userId}
        name={row.original.name}
      />
    ),
  },
];
