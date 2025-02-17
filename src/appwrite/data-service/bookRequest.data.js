import { Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";

export async function getAllrequestedBooks() {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createAdminClient();
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_REQUESTEDBOOK_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.log("Failed to fetch requested all books: ", error);
    return false;
  }
}

export async function getRequestedBooksbyUser(userId) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_REQUESTEDBOOK_COLLECTION_ID,
      [Query.equal("userId", userId),Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.log("Failed to fetch requestedBooks by User: ", error);
    return false;
  }
}
