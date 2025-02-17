import { getBook } from "@/appwrite/data-service/book.data";
import { getAllBorrowedBooks } from "@/appwrite/data-service/borrow.data";
import { getUser } from "@/appwrite/data-service/user.data";
import { BookTable } from "@/components/book-table";
import { columns } from "@/components/BorrowTable/columns";

export default async function AllBorrows() {
  const booksResponse = await getAllBorrowedBooks();
  const books = booksResponse?.documents;

  if (!books) return;
  const updatedBooks = await Promise.all(
    books?.map(async (bookRecord) => {
      const user = await getUser(bookRecord?.userId);
      const book = await getBook(bookRecord?.bookId);
      return {
        ...bookRecord,
        userName: user?.name || "Unknown User",
        userEmail: user?.email,
        userId: user?.$id,
        title: book?.title || "Unknown Book",
      };
    })
  );

  return <BookTable data={updatedBooks} columns={columns} />;
}
