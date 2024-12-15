# Task, Project, and User Management API

This project provides a backend API for managing tasks, projects, and users. The API is designed to support operations like creating, reading, updating, and deleting tasks and users, and it also allows the management of projects. It is built using **Node.js** with **Express.js** and **MongoDB** as the database.

---

## Features

### Task Management
- **Create Task**: Create new tasks and assign them to projects or users.
- **Get All Tasks**: Retrieve a list of tasks with pagination.
- **Get Task By ID**: Fetch details of a specific task.
- **Update Task**: Modify the details of an existing task.
- **Delete Task**: Delete a task from the database.

### Project Management
- **Create Project**: Add new projects to the system.
- **Get All Projects**: List all projects with pagination.
- **Get Project By ID**: Fetch the details of a specific project.
- **Update Project**: Modify the details of an existing project.
- **Delete Project**: Remove a project from the system.

### User Management
- **Create User**: Add new users to the system.
- **Get All Users**: List all users with pagination.
- **Get User By ID**: Retrieve a specific user's details.
- **Update User**: Modify the details of an existing user.
- **Delete User**: Delete a user from the system.

---

## Installation

To set up this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/pritamkumarbishwas/skillsFrontend.git
cd skillsFrontend
   npm i
   npm start



PORT=8000
CORS_ORIGIN=*
MONGODB_URI=mongodb+srv://<your-mongodb-uri>
ACCESS_TOKEN_SECRET=your-secret-key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRY=10d



http://localhost:8000/api/v1/users
http://localhost:8000/api/v1/users/login
http://localhost:8000/api/v1/users/register


http://localhost:8000/api/v1/projects

http://localhost:8000/api/v1/tasks

