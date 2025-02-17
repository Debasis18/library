import { getLoggedInUser } from "@/appwrite/auth";
import { getBorrowedBooksbyUser } from "@/appwrite/data-service/borrow.data";
import BorrowBookList from "@/components/BorrowBookList";
import UserAuthLayout from "@/components/UserAuthLayout";

async function User() {
  const user = await getLoggedInUser();
  const books = await getBorrowedBooksbyUser(user?.$id);

  return (
    <UserAuthLayout>
      <div className="max-w-3xl mx-auto  space-y-4">
        <div className="border p-6 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-indigo-700">{user?.name}</h2>
          <p className="text-lg text-slate-700">{user?.email}</p>
        </div>

        <h2 className="text-xl font-semibold text-indigo-700 mb-4">
          📚 Your Borrowed Books
        </h2>

        <div className="space-y-4">
          {books?.documents.length > 0 ? (
            books?.documents.map((el) => (
              <BorrowBookList key={el.$id} borrowBookRecord={el} />
            ))
          ) : (
            <p className="text-slate-600 text-center italic">
              You haven't borrowed any books yet.
            </p>
          )}
        </div>
      </div>
    </UserAuthLayout>
  );
}

export default User;
