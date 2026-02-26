// ************************
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
  Badge,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const cartCount = 21; // Example, replace with real cart state later

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  // Show loading spinner while checking user
  if (loading) {
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="inherit" />
        </Toolbar>
      </AppBar>
    );
  }

  // Define menu items based on user role
  let menuItems = !user
    ? [
        { text: "Home", to: "/" },
        { text: "About", to: "/about" },
        { text: "Login", to: "/login" },
        { text: "Register", to: "/register" },
      ]
    : [{ text: "Logout", action: handleLogout }];

  if (user?.role === "admin") {
    menuItems.splice(menuItems.length - 1, 0, {
      text: "Admin-Dashboard",
      to: "/admin",
    });
  } else if (user?.role === "staff") {
    menuItems.splice(menuItems.length - 1, 0, {
      text: "Staff-Dashboard",
      to: "/staff",
    });
  }

  return (
    <>
      <AppBar position="sticky" color="primary">
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
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { color: "secondary.main" },
            }}
          >
            <MenuBookIcon /> jafar-Bookstore
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user && (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Welcome, {user.username || user.email}
              </Typography>
            )}

            {/* Cart */}
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

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

            {/* Profile menu */}
            {user && (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <InfoIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
                  <MenuItem onClick={() => navigate("/help")}>Help</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleProfileMenuClose();
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

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

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
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
                if (item.action) item.action();
                else navigate(item.to);
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}

          {/* Cart inside drawer */}
          <ListItemButton onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
            <ListItemText primary={`Cart (${cartCount})`} sx={{ ml: 1 }} />
          </ListItemButton>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;



// import { useState, useContext } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   ListItemText,
//   ListItemButton,
//   Badge,
//   Menu,
//   MenuItem,
//   CircularProgress,
//   Avatar,
//   Tooltip,
//   Divider,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, setUser, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const cartCount = 21;

//   const handleLogout = () => {
//     handleProfileMenuClose();
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleProfileMenuClose = () => setAnchorEl(null);

//   // Helper to highlight active link
//   const isActive = (path) => location.pathname === path;

//   if (loading) {
//     return (
//       <AppBar position="sticky" sx={{ bgcolor: "white", py: 1 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress size={24} />
//         </Toolbar>
//       </AppBar>
//     );
//   }

//   const guestItems = [
//     { text: "Home", to: "/" },
//     { text: "About", to: "/about" },
//   ];

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         elevation={0}
//         sx={{
//           bgcolor: "rgba(255, 255, 255, 0.8)",
//           backdropFilter: "blur(10px)",
//           borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
//           color: "text.primary",
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             px: { md: 4 },
//           }}
//         >
//           {/* Logo */}
//           <Box
//             component={Link}
//             to="/"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               textDecoration: "none",
//               color: "primary.main",
//             }}
//           >
//             <MenuBookIcon sx={{ fontSize: 32 }} />
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 800,
//                 letterSpacing: "-0.5px",
//                 color: "text.primary",
//               }}
//             >
//               Jafar<span style={{ color: "#1976d2" }}>Books</span>
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             {!user &&
//               guestItems.map((item) => (
//                 <Button
//                   key={item.text}
//                   component={Link}
//                   to={item.to}
//                   sx={{
//                     color: isActive(item.to)
//                       ? "primary.main"
//                       : "text.secondary",
//                     fontWeight: isActive(item.to) ? 700 : 500,
//                     textTransform: "none",
//                     "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
//                   }}
//                 >
//                   {item.text}
//                 </Button>
//               ))}

//             {user?.role === "admin" && (
//               <Button
//                 startIcon={<DashboardIcon />}
//                 component={Link}
//                 to="/admin"
//                 variant="outlined"
//                 size="small"
//                 sx={{ borderRadius: 2, textTransform: "none", ml: 2 }}
//               >
//                 Admin Panel
//               </Button>
//             )}
//           </Box>

//           {/* Action Icons */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 1, md: 2 },
//             }}
//           >
//             <Tooltip title="View Cart">
//               <IconButton component={Link} to="/cart" color="inherit">
//                 <Badge badgeContent={cartCount} color="error">
//                   <ShoppingCartOutlinedIcon />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             {user ? (
//               <>
//                 <Tooltip title="Account settings">
//                   <IconButton
//                     onClick={handleProfileMenuOpen}
//                     sx={{ p: 0, ml: 1 }}
//                   >
//                     <Avatar
//                       sx={{
//                         width: 35,
//                         height: 35,
//                         bgcolor: "primary.main",
//                         fontSize: "0.9rem",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {(user.username || user.email)[0].toUpperCase()}
//                     </Avatar>
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleProfileMenuClose}
//                   PaperProps={{
//                     elevation: 3,
//                     sx: { mt: 1.5, borderRadius: 2, minWidth: 180 },
//                   }}
//                   transformOrigin={{ horizontal: "right", vertical: "top" }}
//                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                 >
//                   <Box sx={{ px: 2, py: 1 }}>
//                     <Typography variant="subtitle2" noWrap>
//                       {user.username || "User"}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary" noWrap>
//                       {user.email}
//                     </Typography>
//                   </Box>
//                   <Divider />
//                   <MenuItem
//                     onClick={() => {
//                       handleProfileMenuClose();
//                       navigate("/profile");
//                     }}
//                   >
//                     My Profile
//                   </MenuItem>
//                   <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
//                     <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
//                 <Button
//                   component={Link}
//                   to="/login"
//                   variant="text"
//                   sx={{ textTransform: "none", fontWeight: 600 }}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   component={Link}
//                   to="/register"
//                   variant="contained"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 600,
//                     borderRadius: 2,
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               </Box>
//             )}

//             <IconButton
//               sx={{ display: { xs: "flex", md: "none" } }}
//               onClick={() => setOpen(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: 280, p: 3 }}>
//           <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>
//             JafarBooks
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {guestItems.map((item) => (
//             <ListItemButton
//               key={item.text}
//               onClick={() => {
//                 setOpen(false);
//                 navigate(item.to);
//               }}
//               sx={{ borderRadius: 2 }}
//             >
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           ))}

//           {user && (
//             <ListItemButton
//               onClick={handleLogout}
//               sx={{ mt: 2, color: "error.main", borderRadius: 2 }}
//             >
//               <LogoutIcon sx={{ mr: 2 }} />
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           )}

//           {!user && (
//             <Box
//               sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
//             >
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => {
//                   setOpen(false);
//                   navigate("/login");
//                 }}
//               >
//                 Login
//               </Button>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => {
//                   setOpen(false);
//                   navigate("/register");
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;