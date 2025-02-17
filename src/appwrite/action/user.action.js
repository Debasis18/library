"use server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "../appwrite";

export async function deleteUser(id) {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
      id
    );
    revalidatePath("/dashboard/admin/users");
    return true;
  } catch (error) {
    console.log("Failed to delete User: ", error);
    return false;
  }
}

export async function updateUser(id, data) {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
      id,
      data
    );
    revalidatePath("/dashboard/admin/requestedUsers");
    return true;
  } catch (error) {
    console.log("Failed to update User", error);
    return false;
  }
}
