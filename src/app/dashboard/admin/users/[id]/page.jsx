import { columns } from "@/components/BorrowTableByUser/columns";
import { BookTable, DataTable } from "@/components/book-table";
import Spinner from "@/components/LoadingSpinner";
import { Suspense, use } from "react";
import { getUser } from "@/appwrite/data-service/user.data";
import { getBook } from "@/appwrite/data-service/book.data";
import { getBorrowedBooksbyUser } from "@/appwrite/data-service/borrow.data";

async function Students({ params }) {
  const id = (await params)?.id;
  if (!id) return;

  const [user, borrowedBooks] = await Promise.all([
    getUser(id),
    getBorrowedBooksbyUser(id),
  ]);

  if (!user && !borrowedBooks) return;
  const updatedBooks = await Promise.all(
    borrowedBooks?.documents.map(async (record) => {
      const book = await getBook(record.bookId);
      return {
        ...record,
        title: book?.title || "Unknown Book",
      };
    })
  );

  return (
    <div className="p-4  mx-auto">
      <div className="bg-white p-6 border mb-8 text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{user.name}</h2>
        <h3 className="text-md text-gray-500">{user.email}</h3>
      </div>
      <Suspense fallback={<Spinner />}>
        <BookTable data={updatedBooks} columns={columns} />
      </Suspense>
    </div>
  );
}

export default Students;
