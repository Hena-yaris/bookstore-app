import React, { useState,useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";
import axiosBase from "../api/axiosBase";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Slide,
  Slider
} from "@mui/material";

function Register() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false); // for Slide animation
    
      useEffect(() => {
        setChecked(true); // triggers slide-in on mount
      }, []);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
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
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!user.username) newErrors.username = "Username is required";
    if (!user.email) newErrors.email = "Email is required";
    if (!user.password) newErrors.password = "Password is required";
    if (user.password && user.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!user.role) newErrors.role = "Role is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await axiosBase.post(
        "/users/register",
        user // axios automatically handles JSON.stringify and headers
      );

      setSnackbar({ open: true, message: res.data.msg, severity: "success" });
      setUser({ username: "", email: "", password: "", role: "" });
      setErrors({});
      navigate('/login')
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
      <Slide
        direction="up"
        in={checked}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 5 }, // responsive padding
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
            Register
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={user.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />

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

            <FormControl fullWidth error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={user.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error">
                  {errors.role}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign up"
              )}
            </Button>
            <Link
              to={"/login"}
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              Login
            </Link>
          </Box>
        </Paper>
      </Slide>

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

export default Register;
