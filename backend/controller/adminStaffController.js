const pool = require("../db/db-config");
const { StatusCodes } = require("http-status-codes");

// Buy stock
const buy_stock = async (req, res) => {
  try {
    const { book_id } = req.params;
    const { quantity } = req.body;
    const q = quantity && quantity > 0 ? quantity : 1; // default 1

    const [result] = await pool.execute(
      `
      UPDATE bookDetails
      SET stock = stock - ?
      WHERE book_id = ? AND stock >= ?
      `,
      [q, book_id, q]
    );

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "❌ Not enough stock or book not found!" });
    }

    res.json({ message: `✅ Purchased ${q} copies` });
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

// Add stock
const add_stock = async (req, res) => {
  try {
    const { book_id } = req.params;
    const { add } = req.body;

    if (!add || add <= 0) {
      return res.status(400).json({ message: "Enter a valid number" });
    }

    const [result] = await pool.execute(
      "UPDATE bookDetails SET stock = stock + ? WHERE book_id = ?",
      [add, book_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: `✅ Added ${add} copies to stock` });
  } catch (err) {
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

//search books
const searchBooks = async (req, res) => {
  try {
    const { title, genre } = req.query;
    let sql = "SELECT * FROM bookDetails WHERE 1=1"; // ← correct table name
    const params = [];

    if (title) {
      sql += " AND (title LIKE ? OR author_name LIKE ?)";
      params.push(`%${title}%`, `%${title}%`);
    }

    if (genre) {
      sql += " AND genre LIKE ?";
      params.push(`%${genre}%`);
    }

    const [results] = await pool.execute(sql, params);
    res.json({
      count: results.length,
      books: results,
    });
  } catch (err) {
    console.error("❌ Error searching books:", err.message);
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

//Book list

  const allList = async (req,res) => {

    try {
        let sql = "SELECT title,genre,stock FROM bookDetails ORDER BY title ASC";
        const [rows] = await pool.execute(sql);

        res.status(200).json(rows)

    } catch (err) {
      console.log(err);
    }
  }

module.exports = { searchBooks, add_stock, buy_stock, allList };
