

// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

// IMPORTANT: Importing the pool here runs the table creation logic
const pool = require('./db/db-config'); 

// users routes middleware file
const userRoute = require('./routes/userRoute');
app.use('/api/users', userRoute);

// admin routes middleware file
const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

// admin-Staff routes middleware file
const adminStaffRoute = require('./routes/adminStaffRoute');
app.use('/api/adminStaff', adminStaffRoute);


async function start() {
    try {
        // Test connection (this also waits for the table creation in db-config.js to complete)
        await pool.execute("SELECT 'DB Connected and Tables Ready'"); 
        console.log("✅ Database connection established and tables checked");

        // Start the server only after a successful DB check
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        // If pool.execute fails, it means connection/table creation failed
        console.error("❌ Failed to start server/connect to DB:", err.message);
    }
}

start();

