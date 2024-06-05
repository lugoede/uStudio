// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#0954c0",
    },
    // secondary: {
    //   main: "#EBEBEB",
    // },
    text: {
      primary: "#000000",
    },
    background: {
      default: "#f2eded",
    },
  },
  typography: {
    fontFamily: "'Chivo Mono', monospace",
    h1: {
      fontWeight: 700,
      lineHeight: 0.5,
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
