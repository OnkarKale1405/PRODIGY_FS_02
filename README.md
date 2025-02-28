# Employee Management App

## Overview
This project implements an **Employee Management System** where admins can **read, update, delete**, and **assign work (add employee)** to already registered employees. The system uses **JWT-based authentication** to secure endpoints and **email verification** for user registration. The application ensures security, scalability, and a responsive user experience.

## Features
- Secure user authentication with **JWT (JSON Web Tokens)**
- Admin functionalities to **read, update, delete**, and **assign work** to employees
- **Email verification** through email service
- Protected routes for authorized users only
- Role-based secure routing (Admin/User)
- Responsive UI with **Tailwind CSS**
- Backend API built with **Node.js and Express**

## Screenshots

## Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Authentication:** JSON Web Tokens (JWT)
- **Email Service:** Nodemailer, milgen

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/OnkarKale1405/PRODIGY_FS_02.git
   cd PRODIGY_FS_02
   ```

2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

3. Environment Variables:
   - Create a `.env` file in the `backend` directory with the following content:
     ```env
      PORT = 8000
      MONGODB_URI = 
      CORS_ORIGIN =

      ACCESS_TOKEN_SECRET =
      ACCESS_TOKEN_EXPIRY =
      REFRESH_TOKEN_SECRET = 
      REFRESH_TOKEN_EXPIRY = 

      # cloudinary
      CLOUD_NAME =
      API_KEY =
      API_SECRET = 
      API = 

      USER_TEMPORARY_TOKEN_EXPIRY = 

      # MAILTRAP_SMTP_HOST = 
      MAILTRAP_SMTP_PORT = 
      MAILTRAP_SMTP_USER = 
      MAILTRAP_SMTP_PASS = 
     ```

4. Run the application:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

5. Visit the app at `http://localhost:5173`

## Contributing
Contributions are welcome! Feel free to submit a pull request or report issues.

## Contact
- Email: onkarkale0007@gmail.com
- GitHub: [OnkarKale1405](https://github.com/OnkarKale1405)

