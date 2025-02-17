import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { Query } from "node-appwrite";

export async function getAllUsers() {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { database } = await createAdminClient();
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
     [ Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.log("Failed to fetch all users : ", error);
    return false;
  }
}

export async function getUser(id) {
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;

  try {
    const { database } = await createSessionClient();
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.log("Failed to fetch user details : ", error);
    return false;
  }
}
