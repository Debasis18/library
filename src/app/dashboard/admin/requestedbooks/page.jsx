import { getAllrequestedBooks } from "@/appwrite/data-service/bookRequest.data";
import { getUser } from "@/appwrite/data-service/user.data";
import { BookTable } from "@/components/book-table";
import { columns } from "@/components/RequestedBookTable/AdminColumn";

async function page() {
  const response = await getAllrequestedBooks();
  const books = response?.documents;
  if (!books) return null;

  const updatedBooks = await Promise.all(
    books?.map(async (bookRecord) => {
      const user = await getUser(bookRecord.userId);
      return {
        ...bookRecord,
        userName: user?.name || "Unknown User",
        userEmail: user?.email,
        userId: user?.userId,
      };
    })
  );
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Requested Books</h2>
      <BookTable columns={columns} data={updatedBooks} />
    </div>
  );
}

export default page;
