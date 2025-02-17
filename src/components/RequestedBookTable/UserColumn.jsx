"use client";
import CustomDialog from "../Dialog";
import Details from "./Details";

export const columns = [
  {
    id: "SLNo",
    header: () => <p className="text-center">SL No</p>,
    cell: ({ row }) => (
      <p className="text-center font-medium">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "title",
    header: () => <p className="text-center">Book Name</p>,
    cell: ({ row }) => (
      <p className="text-center font-medium">{row.original.title}</p>
    ),
  },
  {
    accessorKey: "author",
    header: () => <p className="text-center">Author</p>,
    cell: ({ row }) => (
      <p className="text-center text-gray-700">{row.original.author}</p>
    ),
  },
  {
    id: "details",
    header: () => <p className="text-center">Details</p>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CustomDialog
          buttonLabel="View"
          className="border h-fit w-fit px-6 rounded-full text-xs font-medium text-violet-800 bg-violet-100 hover:bg-violet-200 transition"
          variant="ghost"
          title="Requested Book Details"
        >
          <Details details={row.original} />
        </CustomDialog>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => {
      const statusColors = {
        accepted: "bg-green-100 text-green-800 border-green-300",
        rejected: "bg-red-100 text-red-800 border-red-300",
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      };

      return (
        <div className="flex justify-center">
          <span
            className={`border px-8 py-1 rounded-full text-xs font-medium ${
              statusColors[row.original.status] || statusColors.pending
            }`}
          >
            {row.original.status.charAt(0).toUpperCase() +
              row.original.status.slice(1)}
          </span>
        </div>
      );
    },
  },
];
