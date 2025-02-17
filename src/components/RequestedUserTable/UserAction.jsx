import { updateUser } from "@/appwrite/action/user.action";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "react-toastify";
import Spinner from "../LoadingSpinner";

function UserAction({ id, permission }) {
  const [isPending, startTransition] = useTransition();

  async function handelAccept() {
    if (permission) {
      toast.success("User Permission already Updated");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to update this user permission?"
    );
    if (!isConfirmed) return;

    startTransition(async () => {
      const response = await updateUser(id, {
        permission: true,
      });
      if (response) {
        toast.success("User Permission Updated");
      } else {
        toast.error("Failed to Update Permission");
      }
    });
  }

  async function handelReject() {
    if (!permission) {
      toast.success("User Permission already Updated");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to update this user permission?"
    );

    if (!isConfirmed) return;
    startTransition(async () => {
      const response = await updateUser(id, {
        permission: false,
      });
      if (response) {
        toast.success("User Permission Updated");
      } else {
        toast.error("Failed to Update Permission");
      }
    });
  }

  return (
    <div className="flex items-center justify-center">
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

export default UserAction;
