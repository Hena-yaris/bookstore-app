import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import CodeIcon from "@mui/icons-material/Code";

const About = () => {

    const features = [
      {
        icon: <InventoryIcon color="primary" sx={{ fontSize: 40 }} />,
        title: "Inventory Control",
        desc: "Add, update, and manage book stock in real-time.",
      },
      {
        icon: <GroupIcon color="primary" sx={{ fontSize: 40 }} />,
        title: "Role-Based Access",
        desc: "Separate dashboards for Admins and Users to ensure security.",
      },
      {
        icon: <CodeIcon color="primary" sx={{ fontSize: 40 }} />,
        title: "Modern Stack",
        desc: "Built with React, Node.js, MongoDB, and Material UI.",
      },
      {
        icon: <MenuBookIcon color="primary" sx={{ fontSize: 40 }} />,
        title: "Smart Search",
        desc: "Quickly find any book by title, author, or shelf number.",
      },
    ];


  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <MenuBookIcon sx={{ fontSize: 60, color: "primary.main" }} />
        <Typography variant="h4" fontWeight="bold" mt={2}>
          About Our Book Inventory App
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={1}>
          Manage, search, and track your entire bookstore effortlessly.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Description */}
      <Typography variant="body1" paragraph>
        The <strong>Book Inventory Management App</strong> is designed to help
        bookstores and libraries easily organize and track their book
        collections. With a clean interface and powerful features, you can
        quickly search books by title, author, shelf number, or price — and
        always know how many are left in stock.
      </Typography>

      <Typography variant="body1" paragraph mt={6}>
        Admins can also manage the entire catalog — adding, editing, or removing
        books as needed. Whether you're running a small local bookstore or
        managing a large library, this app keeps your inventory smart and
        simple.
      </Typography>

      {/* Feature Grid */}
      <Grid container spacing={3} mt={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index} display="flex">
            <Card
              sx={{
                width: 250,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                transition: "0.3s",
              }}
            >
              <CardContent>
                {feature.icon}
                <Typography>
                    {feature.title}
                </Typography>
                <Typography>
                    {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box textAlign="center" mt={6}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Book Inventory App | Built with ❤️ by
          Henok
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
