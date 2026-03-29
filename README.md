# BACKEND NOT HOSTED ANYMORE
# Books & Quotes Management System 📚💬

This project is a technical assessment developed for **RedRiver Consulting**. It is a full-stack application designed to manage a book collection and personal quotes, featuring secure authentication and a responsive design.

## 🚀 Live Demo
*   **Frontend**: [praktikbook.netlify.app](https://praktikbook.netlify.app/)
*   **Test Account**: `admin` / `123`

## ✨ Features
*   **Full CRUD for Books**: Create, read, update, and delete books (Title, Author, Date).
*   **Quotes Management**: A dedicated "My Quotes" section to manage favorite book quotes.
*   **Authentication**: Secure User Registration and Login using **JWT (JSON Web Tokens)**.
*   **Responsive Design**: Built with **Bootstrap** and **Font Awesome**, fully optimized for mobile, tablet, and desktop.
*   **Theme Toggle**: Support for switching between **Light** and **Dark** modes.

## 🛠️ Tech Stack

### Backend (`BooksApi`)
*   **Framework**: .NET 9 C# Web API
*   **Security**: JWT Authentication & BCrypt Password Hashing
*   **Database**: Entity Framework Core (SQL Server/PostgreSQL)

### Frontend (`books-frontend`)
*   **Framework**: Angular 20
*   **Styling**: Bootstrap 5 & Font Awesome
*   **State Management**: LocalStorage for Token persistence

## 📂 Project Structure
```text
├── BooksApi/         # .NET 9 REST API (Backend)
└── books-frontend/   # Angular 20 SPA (Frontend)
```

## ⚙️ Setup & Installation
### Backend Setup
Navigate to BooksApi/.
Update connection string in appsettings.json.
Run migrations and start the server:

```bash
dotnet build
dotnet run
```
Frontend Setup
Navigate to books-frontend/.
Install dependencies:
```bash
npm install
ng serve
```

📜 Key Requirements Met
- [x] CRUD operations for Books & Quotes.
- [x] Secure JWT-based Authentication.
- [x] Responsive layout with collapsible mobile menu.
- [x] Light/Dark mode implementation.
- [x] Professional UI using Bootstrap classes.
