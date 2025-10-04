
import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

import axiosBase from "../../api/axiosBase";

function AdminAddBooks() {

  //states
      //taking data
      const [formData, setFormData] = useState({
        title: "",
        genre: "",
        price: "",
        author_name: "",
        shelf_number: "",
        stock: "",
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      //price and stock errors
      const [errors,setErrors] = useState({
        price: "",
        stock: ""
      });
      //Snackbar state 
      const [snackbar,setSnackbar] = useState({
        open:false,
        message: "",
        severity: "success", //success || error
      })
      
  //functions
      //track changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const genres = [
        "Romance",
        "History",
        "Classic",
        "Fantasy",
        "Programming",
        "Self-help",
      ];


      //data submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const tempErrors ={price: "",stock:""};
        let valid= true;

        const price =Number(formData.price);
        const stock= Number(formData.stock);

        if(isNaN(price)|| price<=0){
          tempErrors.price= "price must be greater than 0";
          valid=false;
        }
        if(isNaN(stock) || stock<=0 || !Number.isInteger(stock)){
          tempErrors.stock= "stock must be a positive whole number";
          valid = false;
        }

        setErrors(tempErrors);

        if(!valid){
          setIsSubmitting(false);
          return;
        }

        try {
          const res = await axiosBase.post("/admin/add-books", {
            ...formData,
            price,
            stock,
          });

          
          // ❌ axios doesn’t have res.json()
          // alert(`✅ ${res.data.message}`);
          setSnackbar({
            open: true,
            message: res.data.message,
            severity: "success"
          })

          // reset form
          setFormData({
            title: "",
            genre: "",
            price: "",
            author_name: "",
            shelf_number: "",
            stock: "",
          });

          setErrors({ price: "", stock: "" }); // clear errors after success
        } catch (err) {
          console.error(err);
          setSnackbar({
            open: true,
            message: err.response?.data?.message || "Failed to add book",
            severity: "error",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          bgcolor: "background.default",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            📚 Add New Book
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Book Title"
              name="title"
              fullWidth
              margin="dense"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              select
              label="Genre"
              name="genre"
              fullWidth
              margin="dense"
              value={formData.genre}
              onChange={handleChange}
            >
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              margin="dense"
              value={formData.price}
              onChange={handleChange}
              slotProps={{
                input: {
                  min: 0.01,
                  step: "0.01", // ✅ allows decimals
                },
              }}
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              label="Author"
              name="author_name"
              fullWidth
              margin="dense"
              value={formData.author_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Shelf Number"
              name="shelf_number"
              fullWidth
              margin="dense"
              value={formData.shelf_number}
              onChange={handleChange}
              required
            />
            <TextField
              label="Stock (number of copies)"
              name="stock"
              type="number"
              fullWidth
              margin="dense"
              value={formData.stock}
              onChange={handleChange}
              slotProps={{
                input: {
                  min: 1,
                  step: "1", // ✅ only integers
                },
              }}
              error={!!errors.stock}
              helperText={errors.stock}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 3,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#E64A19" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Book"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminAddBooks;
