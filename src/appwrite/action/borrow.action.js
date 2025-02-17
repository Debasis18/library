"use server";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "../appwrite";
import { getBook } from "../data-service/book.data";
import { getUser } from "../data-service/user.data";
import { updateUser } from "./user.action";

export async function createBorrowRecord(data) {
  try {
    const { database } = await createAdminClient();
    const result = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
      ID.unique(),
      {
        userId: data.userId,
        bookId: data.bookId,
        bookUniqueId: data.bookUniqueId,
        borrowDate: data.borrowDate,
        dueDate: data.dueDate,
        status: "borrowed",
      }
    );
    if (result) {
      //update book
      const book = await getBook(data.bookId);
      const totalCopies = book.totalCopies - 1;
      await database.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
        data.bookId,
        { totalCopies }
      );

      // update user
      const user = await getUser(data.userId);
      const borrowedBooks = user.borrowedBooks;
      borrowedBooks.push(result.$id);
      await updateUser(data.userId, { borrowedBooks });
    }
    revalidatePath("/dashboard/admin/borrowing");
    return true;
  } catch (error) {
    console.error("Failed to create borrow record:", error.message);
    return false;
  }
}

export async function updateBorrowRecord(id, updateData) {
  try {
    const { database } = await createAdminClient();
    if (updateData.status === "returned") {
      //update book
      const book = await getBook(updateData.bookId);
      const totalCopies = book.totalCopies + 1;
      await database.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_BOOK_COLLECTION_ID,
        updateData.bookId,
        { totalCopies }
      );
    }
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
      id,
      updateData
    );
    revalidatePath("/dashboard/admin/borrowing");
    return true;
  } catch (error) {
    console.error("Failed to update borrow record:", error.message);
    return false;
  }
}

export async function deleteBoorowRecord(id, userId) {
  try {
    const { database } = await createAdminClient();
    //update user
    const user = await getUser(userId);
    const PriviousBorrowbook = user.borrowedBooks;
    const borrowedBooks = PriviousBorrowbook.filter((bookId) => bookId !== id);
    const res = await updateUser(userId, { borrowedBooks });

    //delete record
    if (res) {
      await database.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_BORROW_COLLECTION_ID,
        id
      );
    }
    revalidatePath(`/dashboard/admin/user/`);
    return true;
  } catch (error) {
    console.log("Failed to delete borrow record", error);
    return false;
  }
}

export async function sendNotification(userId, content) {
  try {
    const { messaging } = await createAdminClient();

    const response = await messaging.createEmail(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return true;
  } catch (error) {
    console.log("Failed to send notification:", error.message);
    return false;
  }
}
