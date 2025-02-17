import { Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";

export async function getAllBorrowedBooks() {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createAdminClient();
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.log("Failed to fetch all Borrowed Books:", error);
    return false;
  }
}

export async function getBorrowInfo(id) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.log("Failed to fetch borrow info:", error);
    return false;
  }
}

export async function getBorrowedBooksbyUser(userId) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
      [Query.equal("userId", userId),Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.error("Error fetching borrowed books by user:", error);
    return false;
  }
}

export async function getNumOfBorroweBookbyId(bookId) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
      [Query.equal("bookId", bookId)]
    );

    const numBook = response.documents.filter(
      (book) => book.status !== "returned"
    );
    return numBook.length;
  } catch (error) {
    console.error("Error fetching borrowed books by user:", error);
    return false;
  }
}
