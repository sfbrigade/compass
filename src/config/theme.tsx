import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#8784ae",
      light: "#cecafa",
      main: "#c2bdf9",
      contrastText: "#000",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#000",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
