// // src/components/ProtectedRoute.jsx
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useContext(AuthContext);
//   {
//     console.log(user);
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />; // redirect if not logged in
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children; // allow access if logged in
// };

// export default ProtectedRoute;




// *******************************
// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // While checking user, show spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role not allowed, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, render the children
  return children;
};

export default ProtectedRoute;
