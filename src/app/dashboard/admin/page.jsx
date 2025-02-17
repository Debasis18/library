import { Suspense } from "react";
import { BookCheck, BookOpen, User } from "lucide-react";
import Crad from "./_components/Card";
import RecentBooks from "./_components/RecentBooks";
import RecentBorrows from "./_components/RecentBorrows";
import RecentUsers from "./_components/RecentUsers";
import Spinner from "@/components/LoadingSpinner";
import { getAllBooks } from "@/appwrite/data-service/book.data";
import { getAllBorrowedBooks } from "@/appwrite/data-service/borrow.data";
import { getAllUsers } from "@/appwrite/data-service/user.data";
import Card from "./_components/Card";

export default async function Admin() {
  const [booksResponse, borrowedBooksResponse, usersResponse] =
    await Promise.all([getAllBooks(), getAllBorrowedBooks(), getAllUsers()]);

  const books = booksResponse?.documents;
  const borrowbooks = borrowedBooksResponse?.documents;
  const users = usersResponse?.documents;

  return (
    <div className="flex flex-col w-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          icon={<BookCheck />}
          title="Borrowed Books"
          value={borrowbooks?.length}
        />
        <Card
          icon={<User className="text-yellow-700" />}
          className="bg-yellow-200"
          title="Total Users"
          value={users?.length}
        />
        <Crad
          icon={<BookOpen className="text-green-700 " />}
          className="bg-green-200"
          title="Total Books"
          value={books?.length}
        />
      </div>

      <div className="flex h-full flex-wrap md:flex-nowrap justify-between gap-8 mt-8   ">
        <div className="flex flex-col rounded-lg w-full md:w-1/2 gap-4 bg-white p-4">
          <h2 className="font-bold text-xl">Recent Borrowed Books</h2>
          <Suspense fallback={<Spinner />}>
            <RecentBorrows data={borrowbooks} />
          </Suspense>
        </div>

        <div className="flex flex-col rounded-lg p-4 w-full md:w-1/2 gap-4 bg-white">
          <h2 className="font-bold text-xl">Recently Added Books</h2>
          <Suspense fallback={<Spinner />}>
            <RecentBooks data={books} />
          </Suspense>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 mt-8">
        <h2 className="font-bold text-xl my-4">Recently Added Users</h2>
        <Suspense fallback={<Spinner />}>
          <RecentUsers data={users} />
        </Suspense>
      </div>
    </div>
  );
}
