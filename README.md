# MERN Stack Basic Authentication

A full-stack web application implementing user authentication using the MERN (MongoDB, Express, React, Node.js) stack. This project demonstrates secure user registration, login, and session management, with MongoDB Atlas as the cloud database.

---

## 🚀 Features

- 🔐 User Registration
- 🔐 User Login with JWT authentication
- 🛡️ Password hashing with bcrypt
- 🔒 Protected routes (backend)
- 🌐 React frontend with login/register forms
- 🌍 MongoDB Atlas for cloud data storage
- ⚙️ Environment variable support

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, Tailwind CSS (optional)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JSON Web Tokens (JWT), bcrypt

/client # React frontend
/server # Express backend
├── models # Mongoose schemas
├── routes # API routes
├── middleware# Auth middlewares
└── .env # Environment variables (ignored in git)

Set Up Backend:
1. cd server
2. npm install
3. npm start

.env:
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key

Set Up Frontend:
1.cd ../client
2.npm install
3.npm start

Home Page:

![home](https://github.com/user-attachments/assets/cba80304-2786-4ed3-9c45-60e33686f1a0)

Login Form:

![login](https://github.com/user-attachments/assets/d8effae1-ae94-4ca8-9c62-036005ed3719)

