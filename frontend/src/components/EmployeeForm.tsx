
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

export interface EmployeeInput {
  name: string;
  email: string;
  role: string;
}

interface EmployeeFormProps {
  onSubmit: (data: EmployeeInput) => Promise<void>;
  initialValues?: EmployeeInput;
  isEditing?: boolean;
  onCancel?: () => void;
}

const emptyForm: EmployeeInput = {
  name: "",
  email: "",
  role: "",
};

export function EmployeeForm({
  onSubmit,
  initialValues,
  isEditing = false,
  onCancel,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeInput>(
    initialValues ?? emptyForm
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData(initialValues ?? emptyForm);
    setMessage("");
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await onSubmit(formData);

      setMessage(
        isEditing
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );

      if (!isEditing) {
        setFormData(emptyForm);
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">

      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Agaetis Tech
      </h2>

      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {isEditing
          ? "Update employee information"
          : "Register yourself"}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
          <label
            htmlFor="name"
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Employee Name
          </label>

          <Input
            id="name"
            name="name"
            placeholder="James Bond"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Email Address
          </label>

          <Input
            id="email"
            name="email"
            placeholder="james@fc.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label
            htmlFor="role"
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            Job Role
          </label>

          <Input
            id="role"
            name="role"
            placeholder="Software Developer"
            type="text"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        {message && (
          <p
            className={`mb-4 text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Employee →"
              : "Add Employee →"}

          <BottomGradient />
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 w-full rounded-md border border-neutral-300 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300"
          >
            Cancel
          </button>
        )}

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />

      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
