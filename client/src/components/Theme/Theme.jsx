// components/Theme/Theme.jsx
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// 1. Create your base theme
let Theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // your brand color (blue)
    },
    secondary: {
      main: "#f50057", // accent (pink/red)
    },
    background: {
      default: "#f9f9f9", // app background
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none", // no ALL CAPS on buttons
      fontWeight: 600,
    },
  },
});

// 2. Make it responsive 🚀
// This scales typography based on screen size
Theme = responsiveFontSizes(Theme);

export default Theme;
