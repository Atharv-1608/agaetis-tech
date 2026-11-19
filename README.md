# 👥 Employee Directory — Agaetis Tech

A simple, modern, and responsive Employee Management System built as part of the **Full Stack Developer Assignment for Agaetis Technologies**.

The application provides a centralized interface to manage employee records, allowing users to add, view, update, and delete employees through a RESTful API.

---

## ✨ Features

- **Add Employees:** Register employees with their name, email address, and job role.
- **View Employees:** Fetch and display all employee records in a structured, responsive table.
- **Edit Employees:** Update existing employee information.
- **Delete Employees:** Remove employee records with a confirmation prompt.
- **Real-time API Integration:** Frontend communicates with the backend using Axios.
- **Responsive UI:** Clean and minimal interface built with Tailwind CSS.
- **Loading & Error States:** Feedback for API operations and failed requests.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend library |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | UI styling |
| Axios | HTTP requests and API integration |
| Node.js / Backend API | Server-side operations |
| PostgreSQL / MySQL | Database (depending on backend configuration) |

---

## 📂 Project Structure

```text
agaetis-tech/
├── backend/
│   ├── src/
│   ├── migrations/
│   ├── node_modules/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── prisma.config.ts
│   └── prisma-8.md
│
├── frontend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
│
└── README.md
frontend/
│
├── src/
│   ├── components/
│   │   ├── EmployeeForm.tsx
│   │   ├── EmployeeTable.tsx
│   │   └── ui/
│   │       └── input.tsx
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env
├── package.json
└── vite.config.ts
```

---

## ⚙️ Getting Started

Follow these steps to run the frontend locally.

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:5000
```

Replace the URL with your backend server's address and port.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

**Note:** Ensure that the backend server is running and CORS is configured to allow requests from the frontend.

---

## 🔗 API Endpoints

The application communicates with the backend through the following REST API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Retrieve all employees |
| POST | `/employees` | Add a new employee |
| PUT | `/employees/:id` | Update an existing employee |
| DELETE | `/employees/:id` | Delete an employee |

### Employee Data Structure

Each employee record contains:

| Field | Type | Description |
|---|---|---|
| id | Primary Key | Unique employee identifier |
| name | VARCHAR | Employee name |
| email | VARCHAR | Employee email address |
| role | VARCHAR | Employee job role |
| created_at | TIMESTAMP | Record creation timestamp |

### Example API Request

**POST `/employees`**

```json
{
  "name": "James Bond",
  "email": "james@example.com",
  "role": "Software Developer"
}
```

---

## 🔄 Application Workflow

1. The user opens the Employee Directory.
2. The frontend sends a GET request to retrieve existing employee records.
3. Users can submit the employee form to create a new record.
4. Axios sends the form data to the backend through a POST request.
5. The employee table refreshes to display the updated records.
6. Users can edit or delete existing employees using the corresponding API endpoints.

---

## 🎯 Project Objective

The objective of this project is to demonstrate practical full-stack development skills, including:

- Building reusable React components.
- Managing application state using React Hooks.
- Working with TypeScript interfaces and props.
- Integrating frontend applications with REST APIs.
- Implementing CRUD operations.
- Handling asynchronous requests and API errors.
- Creating a clean and responsive user interface.

---

## 👨‍💻 Developed For

**Agaetis Technologies — Full Stack Developer Assignment (2025)**

Built with React, TypeScript, Tailwind CSS, and Axios.

