"use client";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import SelectwithSearch from "./SelectwithSearch";
import {
  createBorrowRecord,
  updateBorrowRecord,
} from "@/appwrite/action/borrow.action";

function BookBorrowForm({ borrowinfo = {}, users = [], books = [], onClose }) {
  const { $id: editID, ...editValues } = borrowinfo;
  const isEditSession = Boolean(editID);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession ? editValues : { renewedCount: 0 },
  });
  const userId = watch("userId");
  const bookId = watch("bookId");

  const onSubmit = async (data) => {
    try {
      if (isEditSession) {
        const res = await updateBorrowRecord(editID, {
          bookUniqueId: data.bookUniqueId,
          borrowDate: data.borrowDate,
          dueDate: data.dueDate,
          returnDate: data.returnDate,
          renewedCount: data.renewedCount,
          status: data.status,
        });
        if (res) {
          toast.success("Borrowed record updated successfully");
          onClose();
        } else {
          toast("Unable to update borrow record");
        }
      } else {
        const res = await createBorrowRecord(data);
        if (res) {
          onClose();
          toast.success("Book borrowed successfully");
        } else {
          toast("Unable to Borrow Book");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white p-6"
    >
      {!isEditSession && (
        <>
          <div className="mb-6">
            <SelectwithSearch
              values={users}
              matcher="name"
              setValue={setValue}
              id={userId}
              register="userId"
              label="Select User:"
            />
          </div>

          <div className="mb-6">
            <SelectwithSearch
              values={books}
              matcher="title"
              setValue={setValue}
              id={bookId}
              register="bookId"
              label="Select Book:"
            />
          </div>
        </>
      )}

      <div className="mb-6">
        <Label htmlFor="bookUniqueId">Book Unique Id :</Label>
        <Input
          type="text"
          placeholder="Enter book unique Id"
          {...register("bookUniqueId", {
            required: "Book unique Id is required",
          })}
        />
        {errors.bookUniqueId && (
          <p className="text-red-500">{errors.bookUniqueId.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="borrowDate">Borrow Date:</Label>
        <Input
          type="date"
          {...register("borrowDate", { required: "Borrow date is required" })}
        />
        {errors.borrowDate && (
          <p className="text-red-500">{errors.borrowDate.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="dueDate">Due Date:</Label>
        <Input
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
        />
        {errors.dueDate && (
          <p className="text-red-500">{errors.dueDate.message}</p>
        )}
      </div>
      {isEditSession && (
        <>
          <div className="mb-6">
            <Label htmlFor="returnDate">Return Date:</Label>
            <Input type="date" {...register("returnDate")} />
            {errors.returnDate && (
              <p className="text-red-500">{errors.returnDate.message}</p>
            )}
          </div>
          <div className="mb-6">
            <Label htmlFor="renewedCount">Renew Count:</Label>
            <Input
              type="number"
              {...register("renewedCount", { valueAsNumber: true })}
            />
            {errors.renewedCount && (
              <p className="text-red-500">{errors.renewedCount.message}</p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="status">Status:</Label>
            <select
              id="status"
              {...register("status", { required: true })}
              className="px-3 py-2 border rounded-md shadow w-full"
            >
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="renewed">Renewed</option>
              <option value="overdue">OverDue</option>
            </select>
          </div>
        </>
      )}
      <Button type="submit" className="bg-indigo-900">
        {isSubmitting ? <Spinner /> : isEditSession ? "Update" : "Borrow"}
      </Button>
    </form>
  );
}

export default BookBorrowForm;
