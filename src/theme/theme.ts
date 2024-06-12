// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5",
          color: "#0000FF",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#0000FF",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "'Chivo Mono', monospace",
    h1: {
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: "0.25em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1,
      letterSpacing: "0.3em",
    },
  },
});

export default theme;
