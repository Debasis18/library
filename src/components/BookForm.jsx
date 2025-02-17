"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "./LoadingSpinner";
import { Textarea } from "@/components/ui/textarea";
import { createBook, updateBook } from "@/appwrite/action/book.action";
import { toast } from "react-toastify";

function BookForm({ book = {}, onClose }) {
  const { $id: editID, ...editValues } = book;
  const isEditSession = Boolean(editID);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const submit = async (data) => {
    if (isEditSession) {
      // Book id is providing so that if new image is given the old image should be  deleted
      const res = await updateBook(editID, book.image, data);
      if (res) {
        toast.success("Book Updated SucessFully");
        onClose();
      } else {
        toast.error("Failed to  Update Book");
      }
    } else {
      const res = await createBook(data);
      if (res) {
        toast.success("Book Created SucessFully");
        onClose();
      } else {
        toast.error("Failed to  Created Book");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap bg-white p-6"
    >
      <div className="w-full">
        <div>
          <Input
            placeholder="Title"
            className="mb-6"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Author Name"
            className="mb-6 "
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && (
            <p className="text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Category"
            className="mb-6 "
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="ISBN Number"
            className="mb-6 "
            {...register("isbn", { required: "ISBN is required" })}
          />
          {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Enter total number of copies"
            className="mb-6 "
            {...register("totalCopies", {
              required: "Total copies are required",
              valueAsNumber: true,
              min: { value: 0, message: "Must be at least 1" },
              max: { value: 100, message: "Must be below 100" },
            })}
          />
          {errors.totalCopies && (
            <p className="text-red-500">{errors.totalCopies.message}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Description"
            className="mb-6 "
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.author && (
            <p className="text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Input
            type="file"
            className="mb-6 "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: isEditSession ? false : "Image is required",
            })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-6 bg-indigo-900"
        >
          {isSubmitting ? <Spinner /> : isEditSession ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default BookForm;
