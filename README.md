

# Vehicle-Rental-System

A complete vehicle rental management system where customers can rent vehicles by selecting dates, and admins can manage vehicles, bookings, and user roles.

Live URL: https://vehicle-rental-system-beige.vercel.app



## Features

 ✅ 1. Authentication & Authorization

User registration (POST /auth/register)

User login with JWT (POST /auth/login)

Role-based access:

admin

customer

Auth middleware to protect routes

👥 2. User Management (Admin Only)

List all users

View single user

Update user

Delete user


## Tech Stack


Node.js

Express.js

PostgreSQL

pg (PostgreSQL client)

JSON Web Token (JWT)

bcrypt for password hashing

TypeScript (optional, if you used it)
## Deployment

To deploy this project run
1. Clone the Repository
```
git clone https://github.com/your-username/your-project.git
cd your-project
````
2. Install Dependencies
```
npm install
```
3. Configure Environment Variables

Create a .env file in the root directory:
```
PORT=5000
DATABASE_URL=your database url
JWT_SECRET=your_jwt_secret_key
```
4. Create Tables

Use your SQL tool or pgAdmin to import your schema:
```
CREATE TABLE users (...);
CREATE TABLE vehicles (...);
CREATE TABLE bookings (...);
```
5. Start the Server
```
npm run dev
```
OR
```
npm start
```







## Usage/Examples

```
Register User

POST: /api/auth/v1/register
```
```
Login

POST: /api/auth/v1/login
```
Header:
```
Authorization: Bearer <token>
```
Create Booking
```
POST: /api/v1/bookings
````
Admin Routes
```
Require role: admin in JWT.
```
