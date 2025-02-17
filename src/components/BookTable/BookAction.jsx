"use client";
import { useState, useTransition } from "react";
import BookForm from "@/components/BookForm";
import Spinner from "@/components/LoadingSpinner";
import { Edit, Pencil, Trash } from "lucide-react";
import { deleteBook } from "@/appwrite/action/book.action";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function BookAction({ book }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  function handelDeleteBook() {
    if (confirm("Are you sure you wnat to delete this Book"))
      startTransition(async () => {
        const res = await deleteBook(book.$id, book.image);
        if (res) {
          toast.success("Book deleted sucessfully");
        } else {
          toast.error("Failed to delete book");
        }
      });
  }
  return (
    <div className="w-full flex gap-4 items-center justify-center">
      {!isPending ? (
        <Trash className="text-red-500" onClick={handelDeleteBook}>
          Delete
        </Trash>
      ) : (
        <Spinner />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <BookForm book={book} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookAction;
