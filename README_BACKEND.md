# Backend Server Setup

This project includes a backend server using Node.js, Express, and MongoDB.

## Setup Instructions

### 1. Install Backend Dependencies

Navigate to the server directory and install dependencies:

```bash
cd server
npm install express mongoose cors dotenv bcryptjs
```

Or install from the root directory:

```bash
npm install express mongoose cors dotenv bcryptjs --save
```

### 2. Environment Variables

The MongoDB connection string is already configured in `server/.env`. The connection string is:
```
MONGODB_URI=mongodb+srv://kalisagad05_db_user:YfnSydiGq13YTLic@cluster0.1wul0sk.mongodb.net/?appName=Cluster0
```

### 3. Initialize Admin User

Run the initialization script to create the default admin user:

```bash
cd server
node initAdmin.js
```

This will create an admin user with:
- Email: `admin@wego.com`
- Password: `admin123`

### 4. Start the Backend Server

```bash
cd server
node index.js
```

The server will start on `http://localhost:3001`

### 5. Start Frontend and Backend Together

If you have `concurrently` installed, you can run both servers:

```bash
npm install -g concurrently
npm run dev:all
```

Or manually:
- Terminal 1: `npm run dev` (frontend on port 8080)
- Terminal 2: `cd server && node index.js` (backend on port 3001)

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Create admin user

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database

The MongoDB database name is `wego_ecommerce`. Collections:
- `products` - Product information
- `orders` - Order information
- `admins` - Admin users

## Frontend API Configuration

Make sure to set the API URL in your frontend `.env` file:

```
VITE_API_URL=http://localhost:3001/api
```

Or update `src/lib/api.ts` with your API URL.

