// const pool = require("./db-config");

// const createBookDetails = `
//   CREATE TABLE IF NOT EXISTS bookDetails (
//     book_id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     genre VARCHAR(100),
//     price DECIMAL(10,2),
//     author_name VARCHAR(255) NOT NULL,
//     shelf_number VARCHAR(50),
//     stock INT DEFAULT 0
//   );
// `;

// const createUsers = `CREATE TABLE IF NOT EXISTS users (
//   user_id INT AUTO_INCREMENT PRIMARY KEY,
//   username VARCHAR(50) UNIQUE NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   role ENUM('admin','staff') DEFAULT 'staff',
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

// );`;

// (async () => {
//   try {
//     await pool.execute(createBookDetails);
//     console.log("✅ Books Table ready");

//     await pool.execute(createUsers);
//     console.log("✅ Users Table ready");
//   } catch (err) {
//     console.error("❌ Error creating table:", err.message);
//   }
// })();
