"use client";
import { Button } from "@/components/ui/button";
import BorrowAction from "./BorrowAction";
import StatusBadge from "./StatusBadge";
import { ArrowUpDown } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const columns = [
  {
    accessorKey: "SL No",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Book Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p className="text-center">{row.original.title}</p>,
  },
  {
    accessorKey: "bookUniqueId",
    header: "Unique Id",
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p className="text-center">{row.original.userName}</p>,
  },
  {
    accessorKey: "borrowDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Borrow Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-center">{formatDate(row.original.borrowDate)}</p>
    ),
  },
  {
    accessorKey: "returnDate",
    header: () => <p className="text-center">Return Date</p>,
    cell: ({ row }) => (
      <p className="text-center">{formatDate(row.original.returnDate)}</p>
    ),
  },
  {
    accessorKey: "dueDate",
    header: () => <p className="text-center">Due Date</p>,
    cell: ({ row }) => (
      <p className="text-center">{formatDate(row.original.dueDate)}</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status </p>,
    cell: ({ row }) => (
      <div>
        <StatusBadge
          status={row.original.status}
          dueDate={row.original.dueDate}
        />
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <p className="text-center">Actions</p>,
    cell: ({ row }) => (
      <BorrowAction data={row.original} userId={row.original.userId} />
    ),
  },
];
