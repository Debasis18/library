import Image from "next/image";
import {
  BookCopy,
  CheckCircle,
  Notebook,
  UsersIcon,
  XCircle,
} from "lucide-react";
import { getFilePreview } from "@/appwrite/data-service/book.data";

const BookDetails = async ({ book }) => {
  const { image, title, description, author, category, totalCopies } = book;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-4">
      <div className="rounded-lg bg-gray-200">
        <Image
          src={await getFilePreview(image)}
          alt={title}
          height={200}
          width={200}
          className="object-cover h-full w-full rounded-sm"
        />
      </div>
      <div className="rounded-lg bg-slate-900 lg:col-span-2 p-6 shadow-md">
        <h3 className="text-slate-100 font-extrabold text-3xl truncate mb-4">
          {title}
        </h3>

        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-indigo-600" />
            <span className="text-lg text-slate-200">
              <span className="font-semibold text-slate-200 mr-2 ">
                Author:
              </span>
              {author}
            </span>
          </li>

          <li className="flex items-center gap-3">
            <BookCopy className="h-5 w-5 text-indigo-600" />
            <span className="text-lg">
              <span className="font-semibold text-slate-200 me-2">
                Category:
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">
                {category}
              </span>
            </span>
          </li>

          <li className="flex items-center gap-3">
            {totalCopies > 0 ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-rose-600" />
            )}
            {totalCopies > 0 ? (
              <span className="font-medium text-green-600">
                Available ({totalCopies} copies)
              </span>
            ) : (
              <span className="font-medium text-rose-600">Not Available</span>
            )}
          </li>
          <p className="text-lg text-slate-200 mb-8 flex items-start gap-2">
            <span className="mt-1">
              <Notebook className="h-6 w-6 text-indigo-600" />
            </span>
            <span className="flex-1">{description}</span>
          </p>
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
