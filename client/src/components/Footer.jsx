// src/components/Footer.jsx
import { Box, Container, Typography, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 4,
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Logo + Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBookIcon fontSize="large" />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Bookstore
          </Typography>
        </Box>

        {/* Social Icons */}
        <Box>
          <IconButton
            color="inherit"
            href="https://facebook.com"
            target="_blank"
            sx={{
              ":hover": { color: "secondary.main" },
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com"
            target="_blank"
            sx={{
              ":hover": { color: "secondary.main" },
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://instagram.com"
            target="_blank"
            sx={{
              ":hover": { color: "secondary.main" },
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>

      {/* Divider line */}
      <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />

      {/* Copyright */}
      <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
        © {new Date().getFullYear()} Henok-21. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
