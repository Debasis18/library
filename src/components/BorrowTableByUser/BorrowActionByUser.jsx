import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import BookBorrowForm from "../BorrowFrom";
import { Edit, MoreHorizontal } from "lucide-react";
import {
  deleteBoorowRecord,
  updateBorrowRecord,
} from "@/appwrite/action/borrow.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "../LoadingSpinner";
import { renewDays } from "@/constants/constants";

function BorrowAction({ data }) {
  const { $id: id, dueDate, bookId, userId, renewedCount, status } = data;
  const [isPending, startTransition] = useTransition();

  async function handelReturn() {
    startTransition(async () => {
      const res = await updateBorrowRecord(id, {
        userId,
        bookId,
        status: "returned",
        returnDate: new Date().toISOString().split("T")[0],
        dueDate: null,
      });
      if (res) {
        toast.success("Book Returned Successfull");
      } else {
        toast.error("Failed to return book");
      }
    });
  }

  async function handleRenew() {
    const currentDueDate = new Date(dueDate);
    currentDueDate.setDate(currentDueDate.getDate() + renewDays);
    const newDueDate = currentDueDate.toISOString().split("T")[0];
    startTransition(async () => {
      const response = await updateBorrowRecord(id, {
        dueDate: newDueDate,
        status: "renewed",
        renewedCount: (renewedCount || 0) + 1,
      });
      if (response) {
        toast.success("Book renewed successfully");
      } else {
        toast.error("Failed to renewe the Book");
      }
    });
  }

  async function handleDelete() {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (!isConfirmed) return;
    if (status !== "returned") {
      toast("Book Must me Return before delete Record");
      return;
    }
    startTransition(async () => {
      const res = await deleteBoorowRecord(id, userId);
      if (res) {
        toast.success("Deleted successfully!");
      } else {
        toast.error("Failed to Delete the Book");
      }
    });
  }

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Edit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <BookBorrowForm borrowinfo={data} />
        </DialogContent>
      </Dialog>

      {!isPending ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {status !== "returned" && (
              <>
                <DropdownMenuItem
                  className="text-violet-500"
                  onClick={handleRenew}
                >
                  Renew
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-green-500"
                  onClick={handelReturn}
                >
                  Return
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default BorrowAction;
