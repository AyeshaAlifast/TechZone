# ⚡ TechZone - Electronics E-commerce Store

A full-stack web application for browsing and purchasing electronics online. Built with Node.js, Express, TypeScript, MongoDB, and EJS templating.

## Project Description

TechZone provides a seamless online shopping experience for electronics. Customers can browse products, manage their cart, and place orders. Admins have full control over products, users, and orders through a dedicated dashboard. The platform includes secure authentication with role-based access control.

## Key Features

- User Registration and Secure Login
- Role Based Access Control (Admin, Customer)
- Password Hashing with bcrypt
- Token-Based Password Reset via Email
- Session Management with Expiry
- Admin Dashboard with Stats
- Product Management (Add, Edit, Delete)
- User Management (Activate, Deactivate, Change Role)
- Order Management with Status Updates
- Client and Server Side Form Validation
- Responsive UI across all devices

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Frontend:** HTML, CSS, JavaScript, EJS
- **Auth:** express-session, bcrypt, connect-flash
- **Email:** Nodemailer with Gmail

## Team

- **Ayesha Ali** (I222128) — Authentication, Admin Panel
- **Hanzala Bin Zubair** (I230845) — Product Browsing, Cart, Checkout

## How to Run

1. Ensure you have Node.js and MongoDB installed.
2. Clone the repository:
   git clone https://github.com/AyeshaAlifast/TechZone.git
3. Navigate to the project directory:
   cd TechZone
4. Install dependencies:
   npm install
5. Create a `.env` file in the root directory:
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/techzone
   SESSION_SECRET=your_secret_key
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_app_password
6. Run the development server:
   npm run dev
7. Open your browser and navigate to http://localhost:3000
8. Register a new account or use admin credentials to explore the application.

## Admin Setup

Run the seed script once to create an admin account: 7. Open your browser and navigate to http://localhost:3000 8. Register a new account or use admin credentials to explore the application.

## Admin Setup

Run the seed script once to create an admin account:
npx ts-node src/config/seed.ts
Then login with `admin@techzone.com` / `admin123`
