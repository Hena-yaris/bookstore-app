// import React, { useState,useEffect } from "react";
// import { useNavigate ,Link} from "react-router-dom";
// import axiosBase from "../api/axiosBase";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Box,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   Paper,
//   Slide,
//   Slider
// } from "@mui/material";

// function Register() {
//     const navigate = useNavigate();
//     const [checked, setChecked] = useState(false); // for Slide animation

//       useEffect(() => {
//         setChecked(true); // triggers slide-in on mount
//       }, []);
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!user.username) newErrors.username = "Username is required";
//     if (!user.email) newErrors.email = "Email is required";
//     if (!user.password) newErrors.password = "Password is required";
//     if (user.password && user.password.length < 8)
//       newErrors.password = "Password must be at least 8 characters";
//     if (!user.role) newErrors.role = "Role is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axiosBase.post(
//         "/users/register",
//         user // axios automatically handles JSON.stringify and headers
//       );

//       setSnackbar({ open: true, message: res.data.msg, severity: "success" });
//       setUser({ username: "", email: "", password: "", role: "" });
//       setErrors({});
//       navigate('/login')
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
//       <Slide
//         direction="up"
//         in={checked}
//         mountOnEnter
//         unmountOnExit
//         timeout={1000}
//       >
//         <Paper
//           elevation={4}
//           sx={{
//             p: { xs: 3, sm: 5 }, // responsive padding
//             borderRadius: 3,
//             width: "100%",
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{ color: "primary.main", fontWeight: "bold" }}
//           >
//             Register
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             display="flex"
//             flexDirection="column"
//             gap={2}
//           >
//             <TextField
//               label="Username"
//               name="username"
//               fullWidth
//               value={user.username}
//               onChange={handleChange}
//               error={!!errors.username}
//               helperText={errors.username}
//             />

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

//             <FormControl fullWidth error={!!errors.role}>
//               <InputLabel>Role</InputLabel>
//               <Select
//                 name="role"
//                 value={user.role}
//                 label="Role"
//                 onChange={handleChange}
//               >
//                 <MenuItem value="staff">Staff</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//               </Select>
//               {errors.role && (
//                 <Typography variant="caption" color="error">
//                   {errors.role}
//                 </Typography>
//               )}
//             </FormControl>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               disabled={loading}
//               sx={{
//                 mt: 2,
//                 py: 1.2,
//                 fontWeight: "bold",
//                 fontSize: "1rem",
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Sign up"
//               )}
//             </Button>
//             <Link
//               to={"/login"}
//               variant="h4"
//               align="center"
//               gutterBottom
//               sx={{ color: "secondary.main" }}
//             >
//               Login
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

// export default Register;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  PersonOutline,
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  BadgeOutlined,
} from "@mui/icons-material";

function Register() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!user.username) newErrors.username = "Username is required";
    if (!user.email) newErrors.email = "Email is required";
    if (!user.password) newErrors.password = "Password is required";
    if (user.password && user.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!user.role) newErrors.role = "Please select a role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axiosBase.post("/users/register", user);
      setSnackbar({
        open: true,
        message: "Account created! Redirecting...",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || "Registration failed",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4, 
      }}
    >
      <Container maxWidth="sm">
        <Slide direction="up" in={checked} timeout={800}>
          <Paper
            elevation={6}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Join us and start managing your workspace
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              display="flex"
              flexDirection="column"
              gap={2.5}
            >
              <TextField
                label="Username"
                name="username"
                fullWidth
                value={user.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
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

              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-label">User Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={user.role}
                  label="User Role"
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start" sx={{ ml: 1, mr: -1 }}>
                      <BadgeOutlined color="action" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="staff">Staff Member</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
                {errors.role && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.5 }}
                  >
                    {errors.role}
                  </Typography>
                )}
              </FormControl>

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
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                {loading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  "Get Started"
                )}
              </Button>

              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                  >
                    Sign in here
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
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Register;