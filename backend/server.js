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

//staff routes middleware file
const staffRoute =require('./routes/adding')
app.use('/book',staffRoute);



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



