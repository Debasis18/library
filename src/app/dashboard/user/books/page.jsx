import { getBookCategories } from "@/appwrite/data-service/book.data";
import BookList from "@/components/BookList";
import Filter from "@/components/Filter";
import Spinner from "@/components/LoadingSpinner";
import UserAuthLayout from "@/components/UserAuthLayout";
import { Suspense } from "react";

export const metadata = {
  title: "Books",
};
async function AllBooks({ searchParams }) {
  const filter = (await searchParams)?.category ?? "all";
  const bookname = (await searchParams)?.bookname;
  const categoriesData = await getBookCategories();

  return (
    <UserAuthLayout>
      <Filter categories={categoriesData} />
      <Suspense fallback={<Spinner />} key={filter}>
        <BookList filter={filter} name={bookname} categories={categoriesData} />
      </Suspense>
    </UserAuthLayout>
  );
}

export default AllBooks;
