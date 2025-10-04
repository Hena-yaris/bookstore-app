// src/pages/Unauthorized.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#f9f9f9",
        p: 3,
      }}
    >
      <LockOutlined sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Unauthorized
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        You don’t have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
}

export default Unauthorized;
