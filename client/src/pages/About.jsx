
import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Paper, 
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorageIcon from "@mui/icons-material/Storage";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CodeIcon from "@mui/icons-material/Code";

const About = () => {
  const features = [
    {
      icon: <InventoryIcon sx={{ fontSize: 32 }} />,
      title: "Inventory Control",
      desc: "Comprehensive management for adding, updating, and tracking book stock levels in real-time.",
      color: "#1976d2",
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 32 }} />,
      title: "RBAC Security",
      desc: "Role-Based Access Control ensures Admins and Staff see only the data relevant to their level.",
      color: "#2e7d32",
    },
    {
      icon: <StorageIcon sx={{ fontSize: 32 }} />,
      title: "Data Persistence",
      desc: "Powered by MongoDB to ensure your library data is safe, scalable, and always accessible.",
      color: "#ed6c02",
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 32 }} />,
      title: "Smart Filtering",
      desc: "Advanced search algorithms to find books by ISBN, author, shelf location, or pricing instantly.",
      color: "#9c27b0",
    },
  ];

  const techStack = [
    "React 18",
    "Material UI",
    "Node.js",
    "Express",
    "MongoDB",
    "Context API",
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 10 }}>
      {/* Hero Header */}
      <Box
        sx={{
          background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
          pt: 10,
          pb: 8,
          textAlign: "center",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Container maxWidth="md">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              margin: "0 auto",
              boxShadow: "0 10px 20px rgba(25, 118, 210, 0.2)",
            }}
          >
            <MenuBookIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            variant="h3"
            fontWeight={800}
            mt={3}
            gutterBottom
            sx={{ color: "#1e293b" }}
          >
            The Modern Library Solution
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: "600px", margin: "0 auto" }}
          >
            A professional-grade inventory management system designed for speed,
            security, and scalability.
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={1}
            mt={4}
          >
            {techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                variant="outlined"
                sx={{ fontWeight: 600, bgcolor: "white" }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -4 }}>
        {/* Features Grid */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 2,
                      borderRadius: 3,
                      bgcolor: `${feature.color}15`,
                      color: feature.color,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Narrative Section */}
        <Box sx={{ mt: 10, px: { xs: 2, md: 4 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Built for Efficiency
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ fontSize: "1.1rem" }}
              >
                Whether you're managing a local bookstore or a private
                collection, our app removes the friction of manual tracking. By
                utilizing a <strong>MERN Stack</strong> architecture, we provide
                a lightning-fast interface with reliable data persistence.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem" }}
              >
                Our mission was to create a tool that is powerful enough for
                admins but simple enough for staff to master in minutes.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: 4,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
              >
                <CodeIcon sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Developer Note
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  This project was built to demonstrate clean code architecture,
                  custom Material UI theming, and secure API integration.
                  Explore the source code to see how we handle global state with
                  Context API.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;