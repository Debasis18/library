"use client";
import BorrowAction from "./BorrowActionByUser";
import StatusBadge from "./StatusBadgeByUser";

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
    header: "SL No",
    cell: ({ row }) => <p className="text-center">{row.index + 1}</p>,
  },
  {
    accessorKey: "title",
    header: "Book Name",
  },
  {
    accessorKey: "bookUniqueId",
    header: "Unique Id",
  },
  {
    accessorKey: "borrowDate",
    header: "Borrow Date",
    cell: ({ row }) => <p>{formatDate(row.original.borrowDate)}</p>,
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => <p>{formatDate(row.original.returnDate)}</p>,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => <p>{formatDate(row.original.dueDate)}</p>,
  },
  {
    accessorKey: "renewedCount",
    header: "Renews",
    cell: ({ row }) => (
      <p className="text-center">{row.original.renewedCount}</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => (
      <div className="flex justify-center">
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
      <div className="flex justify-center gap-1">
        <BorrowAction data={row.original} />
      </div>
    ),
  },
];
