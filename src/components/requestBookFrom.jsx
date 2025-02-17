"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { createRequestBook } from "@/appwrite/action/bookRequest.action";
import Spinner from "@/components/LoadingSpinner";

const RequestForm = ({ id, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await createRequestBook(id, data);
    if (res) {
      toast.success("Book Requested Sucessfully");
      onClose();
      reset();
    } else {
      toast.error("Failed to Request book ,Please try again ");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md    bg-white rounded space-y-4"
    >
      <div>
        <Input
          type="text"
          placeholder="Book Title"
          {...register("title", { required: "Book title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Input
          type="text"
          placeholder="Author"
          {...register("author", { required: "Author is required" })}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder="Type your message here."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-indigo-900"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
};

export default RequestForm;
