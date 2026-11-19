
import  { useEffect, useState } from "react";
import axios from "axios";

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface EmployeeTableProps {
  refreshKey: number;
  onEdit: (employee: Employee) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export function EmployeeTable({
  refreshKey,
  onEdit,
}: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/employees`);

      setEmployees(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshKey]);

  // Delete employee
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/employees/${id}`);

      setEmployees((prev) =>
        prev.filter((employee) => employee.id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl rounded-none bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-black">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

        <div>
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Employee Directory
          </h2>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            View and manage all registered employees.
          </p>
        </div>

        <div className="w-fit rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 dark:bg-zinc-900 dark:text-neutral-300">
          Total Employees: {employees.length}
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="py-12 text-center text-sm text-neutral-500">
          Loading employees...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}

          <button
            onClick={fetchEmployees}
            className="ml-2 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && employees.length === 0 && (
        <div className="rounded-xl border border-dashed border-neutral-300 py-12 text-center dark:border-neutral-700">

          <p className="font-medium text-neutral-700 dark:text-neutral-200">
            No employees found
          </p>

          <p className="mt-2 text-sm text-neutral-500">
            Add your first employee to get started.
          </p>

        </div>
      )}

      {/* Table */}
      {!loading && !error && employees.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">

          <table className="w-full min-w-162.5 text-left text-sm">

            <thead className="bg-neutral-100 dark:bg-zinc-900">
              <tr className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">

                <th className="px-6 py-4 font-semibold">
                  Employee
                </th>

                <th className="px-6 py-4 font-semibold">
                  Email Address
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-center font-semibold">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">

              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="transition hover:bg-neutral-50 dark:hover:bg-zinc-900/60"
                >

                  {/* Employee Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white dark:bg-neutral-700">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {employee.name}
                      </span>

                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5 text-neutral-600 dark:text-neutral-400">
                    {employee.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-zinc-800 dark:text-neutral-300">
                      {employee.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-4">

                      <button
                        onClick={() => onEdit(employee)}
                        className="text-sm font-medium text-neutral-700 transition hover:text-blue-600 dark:text-neutral-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-sm font-medium text-neutral-700 transition hover:text-red-600 dark:text-neutral-300"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">

        <p className="text-xs text-neutral-500">
          Showing {employees.length} employees
        </p>

        <button
          onClick={fetchEmployees}
          disabled={loading}
          className="rounded-md border border-neutral-300 px-4 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-zinc-900"
        >
          Refresh
        </button>

      </div>

    </div>
  );
}
