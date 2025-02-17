"use client";
import CustomDialog from "../Dialog";
import Details from "./Details";
import RequestedBookAction from "./requestedBookAction";

export const columns = [
  {
    accessorKey: "SlNo",
    header: () => <p className="text-center">SL No</p>,
    cell: ({ row }) => <p className="text-center">{row.index + 1}</p>,
  },
  {
    accessorKey: "title",
    header: "Book Name",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    id: "details",
    header: () => <div className="text-center">Details</div>,
    cell: ({ row }) => (
      <div className="text-center">
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
    header: () => <div className="text-center ml-12">Status</div>,
    cell: ({ row }) => (
      <p
        className={`border px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center ml-12 ${
          row.original.status === "accepted"
            ? "bg-green-100 text-green-800 border-green-300"
            : row.original.status === "rejected"
            ? "bg-red-100 text-red-800 border-red-300"
            : "bg-yellow-100 text-yellow-800 border-yellow-300"
        }`}
      >
        {row.original.status === "accepted"
          ? "Accepted"
          : row.original.status === "rejected"
          ? "Rejected"
          : "Pending"}
      </p>
    ),
  },

  {
    id: "actions",
    header: () => <div className="text-end mr-12">Actions</div>,
    cell: ({ row }) => <RequestedBookAction id={row.original.$id} />,
  },
];
