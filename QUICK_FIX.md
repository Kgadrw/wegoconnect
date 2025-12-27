# Quick Fix for 401 Login Error

## The Problem
You're getting 401 Unauthorized errors because the admin account doesn't exist yet.

## Solution 1: Restart Your Server (Easiest)

I've added code to automatically create the admin when the server starts. Just:

1. **Stop your server** (Ctrl+C in the terminal where it's running)

2. **Start it again:**
   ```bash
   cd server
   npm start
   ```

3. **Wait for this message:**
   ```
   ✅ Default admin created: admin@connectrwanda.com / admin123
   ```

4. **Then try logging in with:**
   - Email: `admin@connectrwanda.com`
   - Password: `admin123`

## Solution 2: Use the API Endpoint

If the server is running, call this endpoint:

**Using browser or Postman:**
- Method: POST
- URL: `http://localhost:3001/api/admin/ensure-admin`

This will create the admin immediately.

## Solution 3: Run the Script

Open a **NEW terminal** (keep server running) and run:

```bash
cd server
npm run ensure-admin
```

## Verify It Worked

After any of the above, check your server logs. You should see:
```
✅ Default admin created: admin@connectrwanda.com / admin123
```

Then try logging in again!

