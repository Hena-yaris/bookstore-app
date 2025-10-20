const pool = require('../db/db-config');
const { StatusCodes } = require("http-status-codes");




// Add books (async/await, mysql2/promise style)
const addBooks = async (req, res) => {
  try {
    const { title, genre, price, author_name, shelf_number, stock } = req.body;

    // console.log("📥 Incoming book data:", req.body);

    if (!title || !author_name || !shelf_number) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Title,author, and shelf number are required" });
    }

    // 1. Check for duplicates
    const checkSql = `SELECT * FROM bookDetails WHERE title = ? AND author_name = ?`;
    const [existing] = await pool.execute(checkSql, [title, author_name]);

    if (existing.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This book already exists!" });
    }

    // 2. Insert new book
    const insertSql = `
      INSERT INTO bookDetails (title, genre, price, author_name, shelf_number, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(insertSql, [
      title,
      genre,
      price,
      author_name,
      shelf_number,
      stock,
    ]);

    res.status(StatusCodes.CREATED).json({
      message: "✅ Book added successfully",
      bookId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error inserting book:", err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to add book" });
  }
};

 //update books
const priceShelf_update = async (req,res) => {
  const { book_id } = req.params;
  const { price, shelf_number } = req.body;

  let updates = [];
  let params = [];

  if (price !== undefined) {
    updates.push("price = ?");
    params.push(price);
  }

  if (shelf_number !== undefined) {
    updates.push("shelf_number = ?");
    params.push(shelf_number);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No data to update" });
  }

  params.push(book_id);

  try {
    const [result] = await pool.execute(
      `UPDATE bookDetails
       SET ${updates.join(", ")}
       WHERE book_id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Book not found!" });
    }

    res.json({ message: "✅ Book updated successfully" });
  } catch (err) {
    console.error("❌ Error updating book:", err.message);
    res.status(500).json({ message: "DB error", error: err.message });
  }
};

//Deleting books

const removeBook = async (req, res) => {
  const { book_id } = req.params;

  if (!book_id) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  try {
    const [result] = await pool.execute(
      "DELETE FROM bookDetails WHERE book_id = ?",
      [book_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    return res.status(500).json({ message: "Server error" });
  }
};





 module.exports ={addBooks ,priceShelf_update,removeBook};