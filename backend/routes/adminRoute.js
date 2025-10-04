const express = require('express')
const router = express.Router();
const {addBooks,priceShelf_update,removeBook} = require('../controller/adminController')

//middleware
const roleMiddleware = require('../middleware/roleMiddleware')


router.post("/add-books",roleMiddleware('admin'), addBooks);
router.put(
  "/update_books/:book_id",
  roleMiddleware("admin"),
  priceShelf_update
);
router.delete(
    "/books/:book_id", roleMiddleware("admin"), 
    removeBook
);


module.exports =router;