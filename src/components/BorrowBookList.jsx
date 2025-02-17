import { getBook } from "@/appwrite/data-service/book.data";
import { fine } from "@/constants/constants";

async function BorrowBookList({ borrowBookRecord }) {
  let { bookId, borrowDate, returnDate, dueDate, status, renewedCount } =
    borrowBookRecord;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const bookName = await getBook(bookId);
  let fineAmount;

  if (dueDate && new Date(dueDate) < new Date() && status !== "returned") {
    const day = Math.floor(
      (new Date() - new Date(dueDate)) / (1000 * 60 * 60 * 24)
    );
    if (day > 0) {
      fineAmount = `${day} days :Rs ${day *fine }`;
      status = "OVERDUE";
    } else if (day == 0) {
      fineAmount = "DUE TODAY";
    }
  }

  return (
    <div className="flex-grow bg-white border rounded-xl p-6 shadow-md">
      <h3 className="text-2xl font-bold text-indigo-700 border-b pb-2 mb-4">
        {bookName.title}
      </h3>

      <div className="space-y-3 text-base text-slate-700">
        <div className="flex justify-between items-center">
          <span className="font-medium text-indigo-600">📅 Borrow Date:</span>
          <span className="text-slate-900">{formatDate(borrowDate)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-indigo-600">⏳ Due Date:</span>
          <span className="text-slate-900">{formatDate(dueDate)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-indigo-600">✅ Return Date:</span>
          <span className="text-slate-900">{formatDate(returnDate)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-indigo-600">🔄 Renew Count:</span>
          <span className="text-slate-900">{renewedCount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-indigo-600">💰 Fine Amount:</span>
          <span className="text-slate-900 px-4 py-2 bg-indigo-200 rounded-xl font-bold">
            {fineAmount === undefined ? "No Fine" : fineAmount}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-indigo-600">📌 Status:</span>
          <span
            className={`text-1xl font-bold px-4 py-2 rounded-md  ${
              status !== "OVERDUE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-500"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BorrowBookList;
