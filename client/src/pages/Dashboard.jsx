// src/components/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Container,
  Chip,
} from "@mui/material";

// import trendingBooks from "../data/trendingBooks";
 // <-- import your local trending books

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { trendingBooks, featuredBooks } from "../data/books";

export default function Dashboard() {
  const { user } = useContext(AuthContext);


  const cardHover = {
    transition: "transform 200ms ease, box-shadow 200ms ease",
    willChange: "transform",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6,
    },
  };

  return (
    <Box sx={{ py: 3 }}>
      {/* Hero carousel */}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Welcome back, {user?.username || "Guest"} 👋
      </Typography>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 1 },
        }}
      >
        {featuredBooks.map((book, idx) => (
          <SwiperSlide key={idx}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <img
                src={book.img}
                alt={book.title}
                style={{
                  width: "100%",
                  height: 400,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{ mt: 1, fontWeight: 600, textAlign: "center" }}
              >
                {book.title}
              </Typography>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trending Books */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Trending Books
          </Typography>
          <Chip label="This week" color="primary" size="small" />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {trendingBooks.map((book, idx) => (
            <Grid
              item
              key={idx}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: {
                    xs: "100%",
                    sm: 221,
                  },
                  
                  maxwidth: 300, // 👈 fixed width like 2nd example
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                  transition: "0.3s",
                }}
              >
                <CardMedia
                  component="img"
                  image={book.img}
                  alt={book.title}
                  sx={{
                    // aspectRatio: "3 / 4",
                    height: {
                      sm:200
                    }
                    ,
                    aspectRatio: {
                      xs:"9 / 4"
                    },
                     // 👈 maintains book-like proportion
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1, // 👈 makes text section stretch to equalize
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                    noWrap
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Announcements */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Announcements
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography>
            🎉 New arrivals are now available in our bookstore!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
