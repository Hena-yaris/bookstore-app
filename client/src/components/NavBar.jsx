// // // src/components/Navbar.jsx
// // import { useState, useContext } from "react";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Button,
// //   Box,
// //   IconButton,
// //   Drawer,
// //   List,
// //   ListItemText,
// //   ListItemButton,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import { Link, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { user, setUser } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const [open, setOpen] = useState(false);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     setUser(null);
// //     navigate("/login");
// //   };

// //   const menuItems = !user
// //     ? [
// //         { text: "Login", to: "/login" },
// //         { text: "Register", to: "/register" },
// //       ]
// //     : [
// //         { text: "Home", to: "/" },
// //         { text: "Logout", action: handleLogout },
// //       ];

// //   return (
// //     <>
// //       <AppBar position="static" color="primary">
// //         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
// //           {/* Logo / Title */}
// //           <Typography
// //             variant="h6"
// //             component={Link}
// //             to="/"
// //             sx={{
// //               textDecoration: "none",
// //               color: "inherit",
// //               fontWeight: "bold",
// //               "&:hover": { color: "secondary.main" },
// //             }}
// //           >
// //              📚
// //             Bookstore
// //           </Typography>

// //           {/* Right side (Welcome + Menu) */}
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //             {/* Show welcome message if logged in */}
// //             {user && (
// //               <Typography variant="body1" sx={{ fontWeight: "500" }}>
// //                 Welcome, {user.username || user.email}
// //               </Typography>
// //             )}

// //             {/* Desktop menu */}
// //             <Box sx={{ display: { xs: "none", md: "flex" } }}>
// //               {menuItems.map((item, idx) =>
// //                 item.action ? (
// //                   <Button key={idx} color="inherit" onClick={item.action}>
// //                     {item.text}
// //                   </Button>
// //                 ) : (
// //                   <Button
// //                     key={idx}
// //                     color="inherit"
// //                     component={Link}
// //                     to={item.to}
// //                   >
// //                     {item.text}
// //                   </Button>
// //                 )
// //               )}
// //             </Box>

// //             {/* Mobile hamburger */}
// //             <IconButton
// //               sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
// //               onClick={() => setOpen(true)}
// //             >
// //               <MenuIcon />
// //             </IconButton>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Drawer for mobile */}
// //       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
// //         <Box sx={{ width: 220, p: 2 }}>
// //           {user && (
// //             <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
// //               Welcome, {user.username || user.email}
// //             </Typography>
// //           )}
// //           {menuItems.map((item, idx) => (
// //             <ListItemButton
// //               key={idx}
// //               onClick={() => {
// //                 setOpen(false);
// //                 if (item.action) {
// //                   item.action();
// //                 } else {
// //                   navigate(item.to);
// //                 }
// //               }}
// //             >
// //               <ListItemText primary={item.text} />
// //             </ListItemButton>
// //           ))}
// //         </Box>
// //       </Drawer>
// //     </>
// //   );
// // };

// // export default Navbar;



// //****************************** */
// import { useState, useContext } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItemText,
//   ListItemButton,
//   Badge,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import InfoIcon from "@mui/icons-material/Info";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   // Example cart count (later replace with real state from context/store)
//   const cartCount = 21;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const menuItems = !user
//     ? [
//         { text: "Home", to: "/" },
//         { text: "About", to: "/about" },
//         { text: "Login", to: "/login" },
//         { text: "Register", to: "/register" },
//       ]
//     : [
//         { text: "Logout", action: handleLogout },
//       ];

//   // Admin navbar
//   if (user?.role === "admin") {
//     menuItems.splice(menuItems.length - 1, 0, {
//       text: "Admin-Dashboard",
//       to: "/admin/add-books",
//     });
//   }

//   //Staff navbar
//   if(user?.role === "staff") {
//     menuItems.splice(menuItems.length - 1, 0 , {
//       text: "Staff-Dashboard",
//       to: "/staff"
//     })
//   }
//   return (
//     <>
//       <AppBar position="sticky" color="primary">
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           {/* Logo / Title */}

//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{
//               textDecoration: "none",
//               color: "inherit",
//               fontWeight: "bold",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               "&:hover": { color: "secondary.main" },
//             }}
//           >
//             <MenuBookIcon /> Bookstore
//           </Typography>
//           {/* Right side */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {/* Show welcome if logged in */}
//             {user && (
//               <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                 Welcome, {user.username || user.email}
//               </Typography>
//             )}

//             {/* Cart always visible */}
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/cart"
//               sx={{ display: { xs: "none", md: "flex" } }}
//             >
//               <Badge badgeContent={cartCount} color="secondary">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>

//             {/* Desktop menu */}
//             <Box sx={{ display: { xs: "none", md: "flex" } }}>
//               {menuItems.map((item, idx) =>
//                 item.action ? (
//                   <Button key={idx} color="inherit" onClick={item.action}>
//                     {item.text}
//                   </Button>
//                 ) : (
//                   <Button
//                     key={idx}
//                     color="inherit"
//                     component={Link}
//                     to={item.to}
//                   >
//                     {item.text}
//                   </Button>
//                 )
//               )}
//             </Box>

//             {/* Profile menu if logged in */}
//             {user && (
//               <>
//                 <IconButton
//                   color="inherit"
//                   onClick={handleProfileMenuOpen}
//                   sx={{ display: { xs: "none", md: "flex" } }}
//                 >
//                   <InfoIcon />
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleProfileMenuClose}
//                 >
//                   <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
//                   <MenuItem onClick={() => navigate("/help")}>Help</MenuItem>
//                   <MenuItem
//                     onClick={() => {
//                       handleProfileMenuClose();
//                       handleLogout();
//                     }}
//                   >
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </>
//             )}

//             {/* Mobile hamburger */}
//             <IconButton
//               sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
//               onClick={() => setOpen(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ width: 240, p: 2 }}>
//           {user && (
//             <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
//               Welcome, {user.username || user.email}
//             </Typography>
//           )}
//           {menuItems.map((item, idx) => (
//             <ListItemButton
//               key={idx}
//               onClick={() => {
//                 setOpen(false);
//                 if (item.action) {
//                   item.action();
//                 } else {
//                   navigate(item.to);
//                 }
//               }}
//             >
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           ))}

//           {/* Cart inside drawer too */}
//           <ListItemButton onClick={() => navigate("/cart")}>
//             <ShoppingCartIcon />
//             <ListItemText primary={`Cart (${cartCount})`} sx={{ ml: 1 }} />
//           </ListItemButton>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;



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


