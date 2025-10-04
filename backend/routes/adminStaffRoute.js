const express = require('express')
const router = express.Router();
const {searchBooks,add_stock,buy_stock,allList} = require('../controller/adminStaffController')


router.get("/search-books", searchBooks);
router.put("/books/:book_id/add-stock", add_stock);
  router.put("/books/:book_id/buy", buy_stock);
router.get("/books/allList", allList);


module.exports =router;