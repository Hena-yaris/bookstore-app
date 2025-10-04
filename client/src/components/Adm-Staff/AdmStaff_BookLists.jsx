import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";   // History
import MenuBookIcon from "@mui/icons-material/MenuBook";       // Classic
import AutoStoriesIcon from "@mui/icons-material/AutoStories"; // Fantasy
import CodeIcon from "@mui/icons-material/Code";               // Programming
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"; // Self-help
import BookIcon from "@mui/icons-material/Book";               // Default
import axiosBase from "../../api/axiosBase";

function AdmStaff_BookLists() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const fetchBooks = async ()=>{
      try {
        const res = await axiosBase.get("/adminStaff/books/allList");
        setBooks(res.data.data || res.data)
      }catch(err){
        console.error("Error fetching Books",err)
      }finally{
        setLoading(false);
      }
    }

     fetchBooks();
  }, [])

 

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // 🔥 helper to shorten long titles
  const truncate = (str, length = 25) =>
    str.length > length ? str.slice(0, length) + "..." : str;

  // 🎭 genre → icon mapper
  const getGenreIcon = (genre) => {
    switch (genre?.toLowerCase()) {
      case "romance":
        return <FavoriteIcon fontSize="large" sx={{color: "red"}}/>;
      case "history":
        return <HistoryEduIcon fontSize="large" color="primary" />;
      case "classic":
        return <MenuBookIcon fontSize="large" color="secondary" />;
      case "fantasy":
        return <AutoStoriesIcon fontSize="large" sx={{ color: "purple" }} />;
      case "programming":
        return <CodeIcon fontSize="large" sx={{ color: "green" }} />;
      case "self-help":
        return (
          <SelfImprovementIcon fontSize="large" sx={{ color: "orange" }} />
        );
      default:
        return <BookIcon fontSize="large" />;
    }
  };
  

  return (
    <Container sx={{ py: 4, textAlign: "center" }} maxWidth="lg">
      <Typography variant="h4" component="h1" fontWeight="bold" display='flex' justifyContent='center' alignItems='center' mb={4}>
        <LibraryBooksIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />{" "}
        Book List
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {books.map((book, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
            justifyContent="center"
          >
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
              <CardContent
                sx={{
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* 🔑 Genre-based Icon */}
                {getGenreIcon(book.genre)}

                <Typography variant="h6" gutterBottom noWrap>
                  {truncate(book.title, 25)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genre: {book.genre}
                </Typography>
                <Typography
                  variant="body1"
                  color={book.stock > 0 ? "success.main" : "error.main"}
                  mt={1}
                >
                  Stock: {book.stock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AdmStaff_BookLists;
