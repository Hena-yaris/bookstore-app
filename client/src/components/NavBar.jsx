// src/components/Navbar.jsx
import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const menuItems = !user
    ? [
        { text: "Login", to: "/login" },
        { text: "Register", to: "/register" },
      ]
    : [
        { text: "Home", to: "/" },
        { text: "Logout", action: handleLogout },
      ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              "&:hover": { color: "secondary.main" },
            }}
          >
            git commit -m "Client: Add Navbar with responsive
            menu, login, logout, and AuthContext integration" git push 📚
            Bookstore
          </Typography>

          {/* Right side (Welcome + Menu) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Show welcome message if logged in */}
            {user && (
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                Welcome, {user.username || user.email}
              </Typography>
            )}

            {/* Desktop menu */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {menuItems.map((item, idx) =>
                item.action ? (
                  <Button key={idx} color="inherit" onClick={item.action}>
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={idx}
                    color="inherit"
                    component={Link}
                    to={item.to}
                  >
                    {item.text}
                  </Button>
                )
              )}
            </Box>

            {/* Mobile hamburger */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 220, p: 2 }}>
          {user && (
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              Welcome, {user.username || user.email}
            </Typography>
          )}
          {menuItems.map((item, idx) => (
            <ListItemButton
              key={idx}
              onClick={() => {
                setOpen(false);
                if (item.action) {
                  item.action();
                } else {
                  navigate(item.to);
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
