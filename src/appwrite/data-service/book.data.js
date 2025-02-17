"use server";
import { Client, Storage } from "appwrite";
import { createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

export async function getAllBooks() {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
     [ Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.log("Failed to fetch Books data: ", error);
    return false;
  }
}

export async function getBook(id) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.log("Failed to fetch Book ", error);
    return false;
  }
}

// get all the book categories as an array from the books collection
export async function getBookCategories() {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createSessionClient();
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID
    );

    const categories = response.documents.map((book) => book.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error("Error fetching book categories:", error);
    return [];
  }
}

export async function getFilePreview(fileId) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  if (!fileId) return;
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const bucket = new Storage(client);

  return bucket.getFilePreview(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
    fileId
  );
}
