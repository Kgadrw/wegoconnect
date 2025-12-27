# Fix Login 401 Error - Step by Step Guide

## Problem
Getting `ERR_CONNECTION_REFUSED` or `401 Unauthorized` when trying to login.

## Solution

### Step 1: Make sure server is running

Open a terminal and run:
```bash
cd server
npm start
```

You should see:
```
✅ Connected to MongoDB successfully
🚀 Server is running on http://localhost:3001
```

**Keep this terminal open!** The server must stay running.

### Step 2: Fix the admin account

Open a **NEW terminal** (keep the server running in the first one) and run:

```bash
cd server
npm run ensure-admin
```

This will:
- Create the admin if it doesn't exist
- Convert hashed passwords to plain text
- Set password to `admin123`

You should see:
```
✅ Connected to MongoDB
✅ Admin created successfully (or ✓ Admin already exists)
📋 Admin Credentials:
   Email: admin@wego.com
   Password: admin123
```

### Step 3: Test the login

Now try logging in with:
- **Email:** `admin@wego.com`
- **Password:** `admin123`

### Step 4: Check server logs

If login still fails, check the server terminal. You'll see debug logs like:
```
🔍 Login attempt for: admin@wego.com
🔍 Stored password length: 8
🔍 Stored password starts with $2 (hashed): false
🔍 Provided password length: 8
```

This will tell you exactly what's wrong.

## Alternative: Use the API endpoint

If the server is running, you can also call this endpoint to fix the admin:

**Using curl:**
```bash
curl -X POST http://localhost:3001/api/admin/ensure-admin
```

**Using Postman or browser:**
- Method: POST
- URL: `http://localhost:3001/api/admin/ensure-admin`

## Troubleshooting

### Server won't start?
1. Check if port 3001 is already in use
2. Make sure you're in the `server` directory
3. Run `npm install` to install dependencies

### Still getting 401?
1. Check server logs for debug messages
2. Make sure you ran `npm run ensure-admin`
3. Try the `/api/admin/ensure-admin` endpoint
4. Verify the password is exactly `admin123` (no spaces)

### Connection refused?
- Make sure the server is running in a separate terminal
- Check that it says "Server is running on http://localhost:3001"
- Wait a few seconds after starting the server before trying to login

