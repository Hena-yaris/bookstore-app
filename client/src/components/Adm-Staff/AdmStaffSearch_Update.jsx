// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&2

import { useContext, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axiosBase from "../../api/axiosBase";
const API_URL = import.meta.env.VITE_API_URL;

function AdminStaffSearch_Update() {
  const [titleQuery, setTitleQuery] = useState("");
  const [genreQuery, setGenreQuery] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [stockInput, setStockInput] = useState("");
  const [buyInput, setBuyInput] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const [openConfirm, setOpenConfirm] =useState(false);
  const [bookToDelete,SetBookToDelete]=useState(null);

  const { user } = useContext(AuthContext);

  const handleSearch = async (type) => {
    let queryParam = "";
    if (type === "title") {
      if (!titleQuery.trim())
        return setSnackbar({
          open: true,
          msg: "Enter a title or author",
          type: "warning",
        });
      queryParam = `title=${titleQuery}`;
    } else if (type === "genre") {
      if (!genreQuery.trim())
        return setSnackbar({
          open: true,
          msg: "Enter a genre",
          type: "warning",
        });
      queryParam = `genre=${genreQuery}`;
    }

    try {
      const res = await fetch(
        `${API_URL}/adminStaff/search-books?${queryParam}`
      );
      const { books } = await res.json();
      setResults(books);
      setMessage(books.length === 0 ? "No books found." : "");
    } catch (err) {
      setSnackbar({ open: true, msg: "Something went wrong", type: "error" });
      setResults([]);
    }
  };


  //Delete book
  const handleDelete = async () => {
    if(!bookToDelete) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axiosBase.delete(`/admin/books/${bookToDelete.book_id}`);
      setSnackbar({
        open: true,
        msg: res.data.message || "Book deleted successfully",
        type:'success',
      })

      // Remove the deleted book from the results state
      setResults(results.filter((b) => b.book_id !== bookToDelete.book_id));

      // Close dialog if deleted book is currently selected
      if (selectedBook && selectedBook.book_id === bookToDelete.book_id) {
        setOpenDialog(false);
        setSelectedBook(null);
      }
    } catch (err) {
      console.error("Error deleting book:", err);
       setSnackbar({
         open: true,
         msg: "Failed to delete book",
         type: "error",
       });
    }finally{
        setOpenConfirm(false);
    }
  };


  //add stock
  const addStock = async () => {
    const value = stockInput.trim();

    if (value === "") {
      return alert("please enter a number");
    }
    const add = Number(value);
    if (isNaN(add) || add <= 0) {
      return alert("Please enter a valid integer number of copies to add");
    }

    try {
      const res = await fetch(
        `${API_URL}/adminStaff/books/${selectedBook.book_id}/add-stock`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ add }),
        }
      );
      const data = await res.json();
      alert(data.message);
      setStockInput("");
      setSelectedBook({
        ...selectedBook,
        stock: selectedBook.stock + add,
      });
      setResults(
        results.map((b) =>
          b.book_id === selectedBook.book_id
            ? { ...b, stock: selectedBook.stock + add }
            : b
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  //buy stock
  const buyStock = async () => {
    const value = buyInput.trim();
    if (value === "") {
      return alert("please enter a number");
    }

    const quantity = Number(value);

    //valid no
    if (isNaN(quantity) || quantity <= 0) {
      return alert("Please enter a valid positive number quantity");
    }

    // Not enough stock
    if (quantity > selectedBook.stock) {
      return alert("Not enough stock");
    }

    try {
      const res = await fetch(
        `${API_URL}/adminStaff/books/${selectedBook.book_id}/buy`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        }
      );
      const data = await res.json();
      alert(data.message);
      setBuyInput("");
      setSelectedBook({
        ...selectedBook,
        stock: selectedBook.stock - quantity,
      });
      setResults(
        results.map((b) =>
          b.book_id === selectedBook.book_id
            ? { ...b, stock: selectedBook.stock - quantity }
            : b
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  //save changes
  const saveChange = async () => {
    if (!selectedBook.price || !selectedBook.shelf_number) {
      return alert(
        "Please fill out all required fields (price, shelf number)."
      );
    }

    const token = localStorage.getItem("token");
    try {

      const bodyData =
        user.role === "admin"
          ? {
              price: selectedBook.price,
              shelf_number: selectedBook.shelf_number,
              role: user.role,
            }
          : {
              shelf_number: selectedBook.shelf_number,
              role: user.role,
            };
            
       

      const res = await axiosBase.put(
        `admin/update_books/${selectedBook.book_id}`,
        bodyData, // ✅ send data directly
        {headers: {
          Authorization: `Bearer ${token}`
        }}
      );

      // ✅ Axios automatically gives you parsed JSON in res.data
      const data = res.data;
      alert(data.message);

      setResults(
        results.map((b) =>
          b.book_id === selectedBook.book_id ? selectedBook : b
        )
      );
      setOpenDialog(false);
    } catch (err) {
      alert(err.message);
    }
  };



  return (
    <Container maxWidth="md" sx={{ mt: 5, py: 5 }}>
      <Typography variant="h4" gutterBottom color="primary">
        🔍 Search Books
      </Typography>

      {/* Search Fields */}
      <Grid
        container
        spacing={2}
        sx={{ mb: 3, alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Search by Title/Author"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch("title")}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleSearch("title")}
          >
            Search
          </Button>
        </Grid>

        {/* Vertical Divider */}
        <Grid
          item
          xs={12}
          sm={1}
          sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center" }}
        >
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            size="small"
            label="Search by Genre"
            value={genreQuery}
            onChange={(e) => setGenreQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch("genre")}
            sx={{ mb: 1 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => handleSearch("genre")}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {message && (
        <Typography color="error" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}

      {/* Results */}
      <Grid container spacing={2} justifyContent="center">
        {results.map((book) => (
          <Grid item xs={12} sm={6} key={book.book_id}>
            <Card
              sx={{
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedBook(book);
                    setOpenDialog(true);
                  }}
                >
                  {book.title}
                </Typography>
                <Typography variant="body2">
                  Author: {book.author_name}
                </Typography>
                <Typography variant="body2">Genre: {book.genre}</Typography>
                <Typography variant="body2">Price: ${book.price}</Typography>
                <Typography variant="body2">
                  Shelf: {book.shelf_number}
                </Typography>
                <Typography
                  variant="body2"
                  color={book.stock > 0 ? "green" : "red"}
                >
                  {book.stock > 0 ? `In Stock (${book.stock})` : "Out of Stock"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Book Details</DialogTitle>
        {selectedBook && (
          <DialogContent>
            <Typography>Author: {selectedBook.author_name}</Typography>
            <Typography>Genre: {selectedBook.genre}</Typography>

            {/* admin only change price*/}

            <TextField
              label="Price"
              InputProps={{ readOnly: user.role !== "admin" }}
              type="number"
              fullWidth
              margin="normal"
              value={selectedBook.price}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  price: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
            />

            <TextField
              label="Shelf Number"
              fullWidth
              margin="normal"
              value={selectedBook.shelf_number}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  shelf_number: e.target.value,
                })
              }
            />

            <Typography sx={{ mt: 1 }}>
              {selectedBook.stock > 0 ? (
                <span style={{ color: "green" }}>
                  In Stock ({selectedBook.stock})
                </span>
              ) : (
                <span style={{ color: "red" }}>Out of Stock</span>
              )}
            </Typography>
            {/* admin only add stock */}
            {user.role === "admin" && (
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    SetBookToDelete(selectedBook);
                    setOpenConfirm(true);
                  }}
                >
                  Delete this book
                </Button>
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <TextField
                    label="Add Stock"
                    type="number"
                    size="small"
                    value={stockInput}
                    onChange={(e) => setStockInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={addStock}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            )}

            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <TextField
                label="Buy Quantity"
                type="number"
                size="small"
                value={buyInput}
                onChange={(e) => setBuyInput(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={buyStock}>
                Buy
              </Button>
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={saveChange}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you wanna delete{" "}
            <strong>{bookToDelete?.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default AdminStaffSearch_Update;
