import Image from "next/image";
import React from "react";
import { Calendar, Eye, User } from "lucide-react";
import { getUser } from "@/appwrite/data-service/user.data";
import { getBook, getFilePreview } from "@/appwrite/data-service/book.data";
import Link from "next/link";

async function RecentBorrows({ data }) {
  const books = data?.slice(0, 5);
  if (!books) return null;

  const updatedBooks = await Promise.all(
    books?.map(async (bookRecord) => {
      const user = await getUser(bookRecord.userId);
      const book = await getBook(bookRecord.bookId);
      return {
        ...bookRecord,
        userName: user?.name || "Unknown User",
        bookId: book?.image,
        bookTitle: book?.title || "Unknown Book",
        bookCategory: book?.category,
        bookAuthor: book?.author,
      };
    })
  );

  return (
    <div className="space-y-2 p-2">
      {updatedBooks.map(async (book) => (
        <div
          key={book.$id}
          className="flex flex-col md:flex-row gap-6 items-start p-2  bg-indigo-50 rounded shadow border"
        >
          <Image
            src={await getFilePreview(book.bookId)}
            alt={book.bookTitle}
            height={100}
            width={100}
            className="h-24 w-20 border shadow-md"
          />

          <div className="w-full items-center">
            <h3 className="text-lg font-bold text-gray-800">
              {book.bookTitle}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 mt-1">By {book.bookAuthor}</p>
              <p className="text-sm text-gray-600 mt-1">
                &#9679; {book.bookCategory}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs flex gap-1 items-center  text-gray-500 mt-2">
                <User className="text-slate-50 bg-indigo-400 rounded-full " />{" "}
                {book.userName}
              </p>
              <p className="text-xs flex gap-1 items-center  text-gray-500 mt-2">
                <Calendar /> {new Date(book.$createdAt).toDateString()}
              </p>
            </div>
          </div>

          <p className="bg-indigo-300  text-center rounded-full px-2 text-slate-700">
            <Link href={`/dashboard/admin/users/${book.userId}`}>view</Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export default RecentBorrows;
