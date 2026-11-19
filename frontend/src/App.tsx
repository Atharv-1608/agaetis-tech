
import { useState } from "react";
import axios from "axios";

import {
  EmployeeForm,
  type EmployeeInput,
} from "./components/EmployeeForm";

import {
  EmployeeTable,
  type Employee,
} from "./components/EmployeeTable";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  // Add or update employee
  const handleSubmit = async (data: EmployeeInput) => {
    if (editingEmployee) {
      await axios.put(
        `${API_URL}/employees/${editingEmployee.id}`,
        data
      );
    } else {
      await axios.post(`${API_URL}/employees`, data);
    }

    setEditingEmployee(null);
    setRefreshKey((prev) => prev + 1);
  };

  // Edit employee
  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100 px-4 py-10 dark:bg-neutral-950">

      <EmployeeForm
        key={editingEmployee?.id ?? "new"}
        onSubmit={handleSubmit}
        initialValues={
          editingEmployee
            ? {
                name: editingEmployee.name,
                email: editingEmployee.email,
                role: editingEmployee.role,
              }
            : undefined
        }
        isEditing={!!editingEmployee}
        onCancel={() => setEditingEmployee(null)}
      />

      <EmployeeTable
        refreshKey={refreshKey}
        onEdit={handleEdit}
      />

    </div>
  );
}

export default App;
