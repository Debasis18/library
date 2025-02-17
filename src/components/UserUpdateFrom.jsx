"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "./LoadingSpinner";
import { updateUser } from "@/appwrite/action/user.action";
import { toast } from "react-toastify";

function UserUpdateForm({ id, userId, name, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { userId, name },
  });

  const submit = async (data) => {
    const response = await updateUser(id, {
      userId: data.userId,
      name: data.name,
    });
    if (response) {
      toast.success("User Id  Updated");
      onClose();
    } else {
      toast.error("Failed to Update User Id");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full">
        <div className="mb-6">
          <p className="m-1 ">User ID :</p>
          <Input
            placeholder="User Id"
            {...register("userId", { required: "User ID is required" })}
          />

          {errors.userId && (
            <p className="text-red-500">{errors.userId.message}</p>
          )}
        </div>

        <div className="mb-6">
          <p className="m-1 ">User Name :</p>
          <Input
            placeholder="User Id"
            {...register("name", { required: "User Name is required" })}
          />

          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-indigo-900 "
        >
          {isSubmitting ? <Spinner /> : "Update"}
        </Button>
      </div>
    </form>
  );
}

export default UserUpdateForm;
