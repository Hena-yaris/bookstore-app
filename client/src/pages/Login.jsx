// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axiosBase from "../api/axiosBase";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   Paper,
//   Slide,
// } from "@mui/material";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);
//   const [checked, setChecked] = useState(false); // for Slide animation

//   useEffect(() => {
//     setChecked(true); // triggers slide-in on mount
//   }, []);

//   const [user, setUserInput] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!user.email) newErrors.email = "Email is required";
//     if (!user.password) newErrors.password = "Password is required";
//     if (user.password && user.password.length < 8)
//       newErrors.password = "Password must be at least 8 characters";
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axiosBase.post("/users/login", user);
//       const { data } = res;

//       localStorage.setItem("token", data.token);
//       setUser(data.user);

//       setSnackbar({ open: true, message: data.msg, severity: "success" });
//       setUserInput({ email: "", password: "" });
//       setErrors({});
//       navigate("/");
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: err.response?.data?.msg || "Something went wrong",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Slide direction="down" in={checked} mountOnEnter unmountOnExit timeout={1000}>
//         <Paper
//           elevation={4}
//           sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, width: "100%" }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{ color: "primary.main", fontWeight: "bold" }}
//           >
//             Login
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             display="flex"
//             flexDirection="column"
//             gap={2}
//           >
//             <TextField
//               label="Email"
//               name="email"
//               type="email"
//               fullWidth
//               value={user.email}
//               onChange={handleChange}
//               error={!!errors.email}
//               helperText={errors.email}
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               fullWidth
//               value={user.password}
//               onChange={handleChange}
//               error={!!errors.password}
//               helperText={errors.password}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{ mt: 2, py: 1.2, fontWeight: "bold", fontSize: "1rem" }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Login"
//               )}
//             </Button>
//             <Link to="/register" style={{ textAlign: "center", marginTop: 10 }}>
//               Create account
//             </Link>
//           </Box>
//         </Paper>
//       </Slide>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default Login;

import React, { useState, useContext, useEffect } from "react";
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
  Slide,
  InputAdornment,
  IconButton,
} from "@mui/material";
// Icons make it look premium
import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New: UX improvement

  useEffect(() => {
    setChecked(true);
  }, []);

  const [user, setUserInput] = useState({ email: "", password: "" });
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
    // Clear error when user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: "" });
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
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setSnackbar({
        open: true,
        message: "Welcome back!",
        severity: "success",
      });
      navigate("/");
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.msg ||
          "Login failed. Please check your credentials.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle professional gradient
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Slide direction="up" in={checked} timeout={800}>
          <Paper
            elevation={6} // Deeper shadow for "floating" effect
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 4,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.95)", // Slight glassmorphism
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Please enter your details to sign in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                value={user.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={user.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none", // More modern than all-caps
                  fontWeight: "bold",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                {loading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                  >
                    Create one now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Slide>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled" // "Filled" looks more modern in portfolio projects
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Login;