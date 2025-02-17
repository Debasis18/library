"use client";

import Link from "next/link";
import BookAction from "./BookAction";

export const columns = [
  {
    accessorKey: "SL No",
    cell: ({ row }) => <p className="text-1xl">{row.index + 1}</p>,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "category",
    header: "Gener",
  },
  {
    id: "borrowedCopies",
    header: "Total Copies",
    cell: ({ row }) => (
      <p className="text-center">
        {" "}
        {row.original.borrowedCopies + row.original.totalCopies}
      </p>
    ),
  },
  {
    accessorKey: "totalCopies",
    header: "Available Copies",
    cell: ({ row }) => (
      <p className="text-center">{row.original.totalCopies}</p>
    ),
  },

  {
    id: "view",
    header: () => <div>Details</div>,
    cell: ({ row }) => (
      <Link
        className="px-3 py-1  border text-blue-800 bg-blue-200 font-bold rounded"
        href={`/dashboard/admin/books/${row.original.$id}`}
      >
        View
      </Link>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <BookAction book={row.original} />
      </div>
    ),
  },
];
