"use server";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";

let user = null;

export async function getLoggedInUser() {
  if (user) {
    return user;
  }
  const session = (await cookies()).get("apwrite-session");
  if (!session?.value) return;
  try {
    const { account } = await createSessionClient();
    user = await account.get();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function logOut() {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    user = null;
    (await cookies()).delete("apwrite-session");
    return { success: true };
  } catch (error) {
    console.log("Error to log out", error);
  }
}

export async function registerWithEmail(data) {
  const { idCardNo, name, email, password, phone } = data;
  try {
    const { account, database } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!newUserAccount) throw new Error("Error creating user Account");
    const newUser = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
      newUserAccount.$id,
      {
        userId: idCardNo,
        name: name,
        email: email,
        mobileNo: phone,
      }
    );
    if (!newUser) throw new Error("Error creating user Account");
    return { success: true };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function login(data) {
  const { email, password } = data;

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("apwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 7 * 24 * 60 * 60,
    });
    return { success: true };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
