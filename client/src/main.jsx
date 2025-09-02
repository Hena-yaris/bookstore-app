import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// MUI imports
import { ThemeProvider, CssBaseline } from "@mui/material";
import Theme from "./components/Theme/Theme.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
