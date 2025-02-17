import Image from "next/image";
import React from "react";
import BookForm from "@/components/BookForm";
import { Calendar, Plus } from "lucide-react";
import CustomDialog from "@/components/Dialog";
import { getFilePreview } from "@/appwrite/data-service/book.data";

async function RecentBooks({ data }) {
  const books = data?.slice(0, 5);

  return (
    <div className="p-2">
      <CustomDialog
        buttonLabel="Add New Books"
        className="w-full hover:bg-indigo-300 text-slate-900 bg-indigo-100 my-4 px-4 py-8 rounded-full"
        icon={<Plus className="font-bold" />}
      >
        <BookForm />
      </CustomDialog>
      <div className="space-y-2">
        {books?.map(async (book) => (
          <div
            key={book.$id}
            className="flex flex-col md:flex-row gap-6 items-start p-2  bg-indigo-50 rounded shadow border"
          >
            <Image
              src={await getFilePreview(book.image)}
              alt={book.title}
              height={100}
              width={100}
              className="h-24 w-20 border shadow-md"
            />

            <div className="w-full">
              <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 mt-1">By {book.author}</p>
                <p className="text-sm text-gray-600 mt-1">
                  ​ &#9679; {book.category}
                </p>
              </div>

              <p className="text-xs flex gap-2 items-center  text-gray-500 mt-2">
                <Calendar /> {new Date(book.$createdAt).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentBooks;
