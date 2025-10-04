import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminCTA() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 9 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            bgcolor: "background.default",
          }}
        >
          {/* Welcome text */}
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Hey {user.username}, what’s on your mind today?
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": { bgcolor: "#3E2723" }, // darker brown
              }}
              onClick={() => navigate("/admin/add-books")}
            >
              ➕ Add Books
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": { bgcolor: "#E64A19" }, // deeper orange
              }}
              onClick={() => navigate("/adminStaff/books/allList")}
            >
              📚 View All Books
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "#EFEBE9",
                  borderColor: "primary.dark",
                },
              }}
              onClick={() => navigate("/adminStaff/search-books")}
            >
              🔍 Search & Update
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminCTA;
