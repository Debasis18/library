import React, { useTransition } from "react";
import { BellRing, CircleCheck } from "lucide-react";
import { toast } from "react-toastify";
import ActionMenu from "../ActionMenu";
import {
  sendNotification,
  updateBorrowRecord,
} from "@/appwrite/action/borrow.action";
import Spinner from "../LoadingSpinner";
import { renewDays } from "@/constants/constants";

function BorrowAction({ data }) {
  const {
    $id: id,
    userId,
    dueDate,
    bookId,
    renewedCount,
    status,
    notificationSent,
  } = data;
  const [isPending, startTransition] = useTransition();

  async function handleReturn() {
    const isConfirmed = window.confirm(
      "Are you sure you want to Return this record"
    );
    if (!isConfirmed) return;
    startTransition(async () => {
      const res = await updateBorrowRecord(id, {
        userId,
        bookId,
        status: "returned",
        returnDate: new Date().toISOString().split("T")[0],
        dueDate: null,
      });
      if (res) {
        toast.success("Book Returned Successfull");
      } else {
        toast.error("Failed to Return the book,Please try again");
      }
    });
  }

  async function handleRenew() {
    const isConfirmed = window.confirm(
      "Are you sure you want to Renew this record"
    );
    if (!isConfirmed) return;
    const currentDueDate = new Date(dueDate);
    currentDueDate.setDate(currentDueDate.getDate() + renewDays);
    const newDueDate = currentDueDate.toISOString().split("T")[0];

    startTransition(async () => {
      const response = await updateBorrowRecord(id, {
        dueDate: newDueDate,
        status: "renewed",
        renewedCount: (renewedCount || 0) + 1,
      });
      if (response) {
        toast("Book renewed successfully");
      } else {
        toast.error("Failed to Renew the Book");
      }
    });
  }

  async function handleNotification() {
    const content = `📚 Library Notice: Your book ${data.title} is due on ${data.dueDate}. Please return it on time to avoid late fees. Thank you!`;

    const isConfirmed = window.confirm(
      "Are you sure you want to send this notification?"
    );

    if (isConfirmed) {
      startTransition(async () => {
        const res = await sendNotification(userId, content);
        if (res) {
          toast.success("SMS notification sent successfully!");
          await updateBorrowRecord(id, {
            notificationSent: true,
          });
        } else {
          toast.error("Failed to send SMS");
        }
      });
    }
  }

  return (
    <div>
      {status !== "returned" && (
        <div className="flex felx-col gap-1 justify-center items-center ">
          {!notificationSent ? (
            <BellRing
              onClick={() => handleNotification()}
              className="cursor-pointer"
            />
          ) : (
            <CircleCheck className="text-green-400" />
          )}

          {!isPending ? (
            <ActionMenu
              actions={[
                {
                  label: "Renew",
                  onClick: handleRenew,
                  className: "text-violet-500",
                },
                {
                  label: "Return",
                  onClick: handleReturn,
                  className: "text-green-500",
                },
              ]}
            />
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
}

export default BorrowAction;
