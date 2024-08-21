import { BorderAllRounded, BorderColor } from "@mui/icons-material";
import { createTheme } from "@mui/material";

const { breakpoints } = createTheme();

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3023b8", // --primary-50
      light: "#9b93f1", // --primary-80
      dark: "#080155", // --primary-20
    },
    error: {
      main: "#b3261e", // --error
    },
    warning: {
      main: "#ffaa44", // --warning-container
      light: "#fbf6d9", // --warning-state
      dark: "#1c1b1f", // --on-warning
    },
    success: {
      main: "#24804d", // --success
      light: "#f0fff6", // --success-container
      dark: "#001e0d", // --on-success-container
    },
  },
  breakpoints,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  shadows: [
    "none",
    "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
    "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
    "0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
    "0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
    ...new Array(20).map(() => "none"),
    // type requires 20+ elements
  ] as any,
  typography: {
    allVariants: {
      letterSpacing: "normal",
      lineHeight: "100%",
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.5em",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontSize: "2em",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "2em",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontSize: "1.5em",
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5em",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontSize: "1.25em",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25em",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontWeight: 500,
      },
    },
    h5: {
      fontWeight: 700,
      fontSize: "1em",
      fontFamily: "var(--inter), sans-serif",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1em",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    body2: {
      fontWeight: 500,
      fontSize: "0.875em",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    button: {
      fontWeight: 600,
      fontSize: "1em",
      fontFamily: "var(--quicksand), sans-serif",
      lineHeight: "150%",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75em",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.75em",
      fontFamily: "var(--inter), sans-serif",
    },
  },
  components: {
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
