import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { deleteUser } from "@/appwrite/action/user.action";
import Spinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import UserUpdateFrom from "../UserUpdateFrom";
import CustomDialog from "../Dialog";

function UserAction({ id, userId, name }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;

    startTransition(async () => {
      const result = await deleteUser(id);
      if (result) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user. Please try again.");
      }
    });
  }

  return (
    <div className="w-full flex gap-2 items-center justify-center">
      <CustomDialog
        variant="ghost"
        buttonLabel="Edit"
        className="text-green-500"
        title="Edit Profile"
      >
        <UserUpdateFrom
          id={id}
          userId={userId}
          name={name}
          onClose={handleClose}
        />
      </CustomDialog>

      <Button
        className="text-red-400"
        variant="ghost"
        onClick={() => handleDelete()}
      >
        {!isPending ? " Delete" : <Spinner />}
      </Button>
    </div>
  );
}

export default UserAction;
