"use server";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "../appwrite";

export async function uploadFile(file) {
  const { bucket } = await createAdminClient();
  try {
    return await bucket.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );
  } catch (error) {
    console.log("Failed to upload file : ",error);
    return false;
  }
}

export async function deleteFile(fileId) {
  const { bucket } = await createAdminClient();
  try {
    await bucket.deleteFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.log("Failed to delete file: ",error);
    return false;
  }
}



export async function createBook(data) {
  const { title, author, isbn, category, totalCopies, description } = data;

  const file = await uploadFile(data.image[0]);
  const image = file.$id;

  try {
    const { database } = await createAdminClient();
     await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
      ID.unique(),
      {
        title,
        author,
        isbn,
        image,
        category,
        totalCopies,
        description,
      }
    );
    revalidatePath("/dashboard/admin/books");
    return true;
  } catch (error) {
    console.log("Failed to create book: ",error);
    return false;
  }
}

export async function updateBook(id, imageId, data) {
  const { title, author, isbn, category, totalCopies, description } = data;

  let image;
  if (typeof data.image === "string") {
    image = data.image;
  } else {
    const response = await uploadFile(data.image[0]);
    await deleteFile(imageId);
    image = response.$id;
  }

  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
      id,
      { title, author, isbn, image, category, totalCopies, description }
    );
    revalidatePath("/dashboard/admin/books");
    return true;
  } catch (error) {
    console.log("Failed to Update book :", error);
    return false;
  }
}

export async function deleteBook(id, imageId) {
  try {
    const { database } = await createAdminClient();
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
      id
    );
    await deleteFile(imageId);
    revalidatePath("/dashboard/admin/books");
    return true;
  } catch (error) {
    console.log("Failed to delete book: ",error);
    return false;
  }
}

