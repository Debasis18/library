import { updateRequestBook } from "@/appwrite/action/bookRequest.action";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "react-toastify";
import Spinner from "../LoadingSpinner";

function RequestedBookAction({ id }) {
  const [isPending, startTransition] = useTransition();

  async function handelAccept() {
    startTransition(async () => {
      const response = await updateRequestBook(id, {
        status: "accepted",
      });
      if (response) {
        toast.success("Book request accepted");
      } else {
        toast.error("Failed to accept book request");
      }
    });
  }
  async function handelReject() {
    startTransition(async () => {
      const response = await updateRequestBook(id, {
        status: "rejected",
      });
      if (response) {
        toast.success("Book request Rejected");
      } else {
        toast.error("Failed to reject book request");
      }
    });
  }

  return (
    <div className="flex items-center justify-end">
      {!isPending ? (
        <>
          <Button
            variant="ghost"
            className="text-green-400"
            onClick={handelAccept}
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            className="text-red-400"
            onClick={handelReject}
          >
            Reject
          </Button>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default RequestedBookAction;
