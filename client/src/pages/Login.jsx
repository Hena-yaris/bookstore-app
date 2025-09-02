import React, { useState, useContext } from "react"; // add useContext
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../api/axiosBase";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext"; // ✅ import context

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // ✅ get setUser from context

  const [user, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!user.email) newErrors.email = "Email is required";
    if (!user.password) newErrors.password = "Password is required";
    if (user.password && user.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosBase.post("/users/login", user);
      const { data } = res;

      // Save token
      localStorage.setItem("token", data.token);

      // ✅ Update AuthContext with logged in user
      setUser(data.user); // (assuming backend sends back user info)

      setSnackbar({ open: true, message: data.msg, severity: "success" });
      setUserInput({ email: "", password: "" });
      setErrors({});
      navigate("/"); // redirect home
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={user.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={user.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, py: 1.2, fontWeight: "bold", fontSize: "1rem" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Link to="/register" style={{ textAlign: "center", marginTop: 10 }}>
            Create account
          </Link>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
