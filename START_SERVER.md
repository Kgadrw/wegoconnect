# How to Start the Backend Server

## Quick Start

1. **Open a terminal/command prompt**

2. **Navigate to the server directory:**
   ```bash
   cd server
   ```

3. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **You should see:**
   ```
   ✅ Connected to MongoDB successfully
   🚀 Server is running on http://localhost:3001
   ```

## Troubleshooting ERR_CONNECTION_REFUSED

### Issue: Server not running
**Solution:** Make sure the server is started (see steps above)

### Issue: Port 3001 already in use
**Solution:** 
- Check if another process is using port 3001
- Kill the process or change the port in `server/index.js`

### Issue: MongoDB connection error
**Solution:**
- Check your internet connection
- Verify MongoDB Atlas cluster is running (not paused)
- Check if your IP is whitelisted in MongoDB Atlas

### Issue: Dependencies not installed
**Solution:**
```bash
cd server
npm install
```

## Verify Server is Running

Open your browser and visit:
```
http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Test Login Endpoint

Once the server is running, you can test the login:
- URL: `http://localhost:3001/api/admin/login`
- Method: POST
- Body: 
  ```json
  {
    "email": "admin@wego.com",
    "password": "admin123"
  }
  ```

