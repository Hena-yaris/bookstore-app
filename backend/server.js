const express = require('express');
const cors = require('cors');
require('dotenv').config();  // load .env variables

const PORT = process.env.PORT|| 4000;


const app = express();
app.use(express.json());
app.use(cors());



//users routes middleware file
const userRoute = require('./routes/userRoute');
app.use('/api/users',userRoute);

//admin routes middleware file
const adminRoute = require('./routes/adminRoute');
 app.use('/api/admin', adminRoute);


 //admin-Staff  routes middleware file
const adminStaffRoute = require('./routes/adminStaffRoute');
 app.use('/api/adminStaff', adminStaffRoute);



//db connection
const pool = require('./db/db-config')

async function start() {
  try {
    // test DB connection
    await pool.execute("SELECT 'DB Connected'");
    console.log("✅ Database connection established");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect DB:", err.message);
  }
}

start();



