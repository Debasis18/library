import BookForm from "@/components/BookForm";
import CustomDialog from "@/components/Dialog";
import { columns } from "@/components/BookTable/columns";
import { BookTable } from "@/components/book-table";
import Filter from "@/components/FilterAdmin";
import {
  getAllBooks,
  getBookCategories,
} from "@/appwrite/data-service/book.data";
import { getNumOfBorroweBookbyId } from "@/appwrite/data-service/borrow.data";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Books",
};

async function Page({ searchParams }) {
  const filter = (await searchParams)?.category ?? "all";

  // Fetch all books and categories in parallel
  const [booksData, categoriesData] = await Promise.all([
    getAllBooks([]),
    getBookCategories(),
  ]);

  // Filter (extract from url) books by category before transforming the data
  const filteredBooks =
    filter === "all"
      ? booksData?.documents
      : booksData?.documents.filter((book) => book.category === filter);

  if (!filteredBooks) return null;
  // Transform books data to include borrowed counts
  const books = await Promise.all(
    filteredBooks?.map(async (book) => {
      const borrowedCount = await getNumOfBorroweBookbyId(book.$id);
      return {
        ...book,
        borrowedCopies: borrowedCount, // Add the borrowed count
      };
    })
  );

  return (
    <div>
      <h1 className="text-4xl mb-2 text-accent-500 font-medium">Our Books</h1>
      <Filter categories={categoriesData} />
      <BookTable data={books} columns={columns} />
      <CustomDialog
        title="Add Book"
        buttonLabel="Add Book"
        className="bg-indigo-900 hover:bg-indigo-950"
        icon={<Plus className="font-bold" />}
      >
        <BookForm />
      </CustomDialog>
    </div>
  );
}

export default Page;
