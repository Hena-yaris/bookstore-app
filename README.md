📚 Bookstore Inventory App

A full-stack Bookstore Inventory Management System built with React, Node.js, Express, and MySQL.
It allows admins and staff to manage, search, and update books efficiently with role-based authentication.

🚀 Features
👨‍💼 Admin
    Add new books with title, author, genre, price, and shelf number.

    Edit book details (price, shelf number, etc.).

    Delete books from inventory.

    View all books and their stock levels.

    Add new stock or manage quantities.

👩‍💻 Staff
    Search books by title, author, or genre.

    Update shelf numbers.

    View available stock and book information.

🧩 Tech Stack
##Frontend (client)

    React (Vite)

    Material UI (MUI)

    Axios

    React Router

    Backend (server)

    Node.js & Express

    MySQL

    JWT Authentication

    Role-based Access Control (Middleware)

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/Hena-yaris/bookstore-app.git
cd bookstore-app

2️⃣ Install dependencies

##Backend

    cd backend
    npm install


##Frontend

    cd ../client
    npm install

3️⃣ Run the app

##Backend

    node .server


##Frontend

    npm run dev

🧠 Authentication & Roles

The app uses JWT tokens for authentication and a middleware that checks user roles before granting access:

    Admin → Full access to all routes

    Staff → Limited access to inventory functions

🏁 Future Improvements

    Add pagination and sorting for book lists.

    Implement image uploads for book covers.

    Add user activity logs and history.

👨‍💻 Author

Henok ✈️
Passionate about technology, design, and building efficient full-stack apps.