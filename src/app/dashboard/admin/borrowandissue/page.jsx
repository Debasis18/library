import { Suspense } from "react";
import Spinner from "@/components/LoadingSpinner";
import AllBorrows from "../_components/AllBorrows";
import BookBorrowForm from "@/components/BorrowFrom";
import CustomDialog from "@/components/Dialog";
import { getAllBooks } from "@/appwrite/data-service/book.data";
import { getAllUsers } from "@/appwrite/data-service/user.data";
import { BookOpenCheck } from "lucide-react";

export default async function Page() {
  const allBooks = await getAllBooks();
  const allUsers = await getAllUsers();
  if (!allBooks && !allUsers) return null;

  const availableBooks = allBooks.documents.filter(
    (book) => book.totalCopies > 0
  );
  const acceptedUsers=allUsers.documents.filter((user)=>user.permission===true)

  return (
    <div className="flex flex-col ">
      <div className="w-fit mb-1">
        <CustomDialog
          title="Issue a Book"
          buttonLabel="Issue Book"
          className="bg-indigo-900 hover:bg-indigo-950"
          icon={<BookOpenCheck className="font-bold" />}
        >
          <BookBorrowForm users={acceptedUsers} books={availableBooks} />
        </CustomDialog>
      </div>
      <h2 className="text-2xl">Borrow Records</h2>
      <Suspense fallback={<Spinner />}>
        <AllBorrows />
      </Suspense>
    </div>
  );
}
