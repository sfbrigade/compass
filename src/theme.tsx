import { createTheme } from "@mui/material";

const { breakpoints } = createTheme();

import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";

export const compassTheme = createTheme({
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
    /*neutral: {
      10: "#021426",
      20: "#2a333c",
      30: "#586874",
      40: "#788591",
      50: "#a2acb3",
      60: "#b9c1c6",
      70: "#d6dde1",
      80: "#f4f6f7",
      90: "#f6f8f9",
      100: "#ffffff",
    },*/
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
    MuiStep: {
      defaultProps: {},
      styleOverrides: {
        /*
        valueLabel: ({ ownerState, theme }) => ({
          ...(ownerState.orientation === 'vertical' && {
            backgroundColor: 'transparent',
            color: theme.palette.grey[500],
          }),
        }),
        */
        root: ({ ownerState, theme }) => ({
          padding: 0,
          marginRight: !ownerState.last ? "16px" : 0,
          // index < steps.length - 1 ? "16px" : 0,
          "&.Mui-disabled": {
            //TODO: broken b/c MUI does not add this className as described in MUI docs
          },
          "&.Mui-active": {
            //TODO: broken b/c MUI does not add this className as described in MUI docs
          },
          "&.Mui-completed": {
            //TODO: this works, but the others are broken b/c MUI does not add their classNames as described in MUI docs; once fixed, we can move the purple border-top styling here instead
          },
        }),
      },
    },
    /*MuiStep: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: '#202020',
              color: '#fff',
            }),
        }),
      },
    },*/
    MuiStepLabel: {
      defaultProps: {
        icon: <TripOriginRoundedIcon />,
      },
      styleOverrides: {
        iconContainer: ({ ownerState, theme }) => ({
          position: "absolute",
          left: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          "&.Mui-disabled": {
            color: "#a2acb3",
          },
          "&.Mui-active": {
            color: theme.palette.primary.light,
          },
          "&.Mui-completed": {
            color: theme.palette.primary.main,
          },
        }),
        // // TODO: does this line up with StepLabel-labelContainer .MuiStepLabel-alternativeLabel
        // labelContainer: ({ ownerState, theme }) => ({
        //   marginTop: 0,
        //   textAlign: "left",
        // }),
        // alternativeLabel: ({ ownerState, theme }) => ({
        //   marginTop: 0,
        //   textAlign: "left",
        // }),
        label: ({ ownerState, theme }) => ({
          padding: "9px",
          paddingLeft: "32px",
          textAlign: "left",
          "&.MuiStepLabel-alternativeLabel": {
            marginTop: 0,
            textAlign: "left",
          },
          "&.Mui-disabled": {
            color: "#2A333C",
            borderTop: `4px solid #a2acb3`,
          },
          "&.Mui-active": {
            color: "#2A333C",
            borderTop: `4px solid ${theme.palette.primary.light}`,
          },
          "&.Mui-completed": {
            color: theme.palette.primary.main,
            borderTop: `4px solid ${theme.palette.primary.main}`,
          },
        }),
      },
    },
  },
});
