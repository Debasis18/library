import { getBook } from "@/appwrite/data-service/book.data";
import BookDetails from "@/components/BookDetails";

export async function generateMetadata({ params }) {
  const id = (await params)?.id;
  const book = await getBook(id);
  return { title: `Book ${book?.title}` };
}

async function page({ params }) {
  const id = (await params)?.id;
  const book = await getBook(id);
  if (!book) return;

  return <BookDetails book={book} />;
}

export default page;
