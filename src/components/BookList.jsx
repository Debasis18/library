import { getAllBooks, getFilePreview } from "@/appwrite/data-service/book.data";
import Image from "next/image";
import Link from "next/link";

async function BookList({ filter, name, categories }) {
  const booksData = await getAllBooks([]);
  const books = await booksData.documents;

  let displayedBooks;
  if (filter === "all") {
    displayedBooks = books;
  }

  categories.map((category) => {
    if (filter === category) {
      displayedBooks = books.filter((book) => book.category === category);
    }
  });

  if (name) {
    displayedBooks = books.filter((book) =>
      book.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (!books.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {displayedBooks.map(async (book) => {
        const { $id, title, image, totalCopies, author } = book;

        return (
          <div
            key={$id}
            className="relative  overflow-hidden rounded-tr-3xl border border-gray-200 h-full flex flex-col bg-white"
          >
            <span
              className={`absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white ${
                totalCopies > 0 ? "bg-indigo-600" : "bg-rose-600"
              }`}
            >
              {totalCopies > 0 ? "AVAILABLE" : "NOT AVAILABLE"}
            </span>

            <Image
              src={await getFilePreview(image)}
              alt={title}
              height={200}
              width={200}
              className="h-60 w-full object-cover rounded-tr-3xl"
            />

            <div className="p-4 text-center flex flex-col flex-grow">
              <strong className="block text-lg font-semibold text-gray-900 line-clamp-2">
                {title}
              </strong>
              <p className="mt-1 text-sm text-gray-600 flex-grow">{author}</p>

              <Link href={`/dashboard/user/books/${$id}`}>
                <span className="mt-4 inline-block w-full rounded-md border border-indigo-900 bg-indigo-900 px-4 py-2 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-white hover:text-indigo-900">
                  View Details
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
