import { BookTable } from "@/components/book-table";
import { columns } from "@/components/RequestedBookTable/UserColumn";
import RequestForm from "@/components/requestBookFrom";
import React from "react";
import CustomDialog from "@/components/Dialog";
import { getLoggedInUser } from "@/appwrite/auth";
import { getRequestedBooksbyUser } from "@/appwrite/data-service/bookRequest.data";
import UserAuthLayout from "@/components/UserAuthLayout";
import { getUser } from "@/appwrite/data-service/user.data";

const Page = async () => {
  const loginuser = await getLoggedInUser();
  const response = await getRequestedBooksbyUser(loginuser.$id);
  const requestedBooks = response.documents;

  const updatedBooks = await Promise.all(
    requestedBooks.map(async (bookRecord) => {
      const user = await getUser(loginuser.$id);
      return {
        ...bookRecord,
        userName: user?.name || "Unknown User",
        userEmail: user?.email || "Unknown",
        userId: user?.userId,
      };
    })
  );

  return (
    <UserAuthLayout>
      <div className="flex flex-col p-4">
        <div className="w-fit">
          <CustomDialog
            buttonLabel="Request a Book"
            title="Request a Book by filling the details below"
            className="bg-indigo-900"
          >
            <RequestForm id={loginuser.$id} />
          </CustomDialog>
        </div>
        <BookTable columns={columns} data={updatedBooks} />
      </div>
    </UserAuthLayout>
  );
};

export default Page;
