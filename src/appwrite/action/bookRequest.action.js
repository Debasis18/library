"use server";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { createAdminClient, createSessionClient } from "../appwrite";
import { getUser } from "../data-service/user.data";
import { updateUser } from "./user.action";
import { redirect } from "next/dist/server/api-utils";

export async function createRequestBook(userId, data) {
  const { title, author, description } = data;

  try {
    const { database } = await createSessionClient();
    const result = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_REQUESTEDBOOK_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        title,
        author,
        description,
      }
    );
    if (result) {
      const user = await getUser(userId);
      const requestedBooks = user.requestedBooks;
      requestedBooks.push(result.$id);
      await updateUser(userId, { requestedBooks });
    }
    revalidatePath("/dashboard/user/requestbook");
    return true;
  } catch (error) {
    console.log("Failed to RequestBook :", error);
    return false;
  }
}

export async function updateRequestBook(id, data) {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_REQUESTEDBOOK_COLLECTION_ID,
      id,
      data
    );
    revalidatePath("/dashboard/admin/requestedbooks");
    return true;
  } catch (error) {
    console.log("Failed to update Requested Book :", error);
    return false;
  }
}
