import { createTheme, Shadows } from "@mui/material";

const { breakpoints } = createTheme();

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body1Bold: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    body1Bold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body1Bold: true;
  }
}

declare module "@mui/material/Tabs" {
  interface TabsPropsIndicatorColorOverrides {
    transparent: true;
  }
}

export const compassTheme = createTheme({
  cssVariables: true,
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
    ...new Array(19).map(() => "none"),
    // type requires 20+ elements
  ] as Shadows,
  typography: {
    allVariants: {
      letterSpacing: "normal",
      lineHeight: "100%",
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontSize: "2rem",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontSize: "1.25rem",
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      fontFamily: "var(--quicksand), sans-serif",
      [breakpoints.down("md")]: {
        fontWeight: 500,
      },
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    body1Bold: {
      fontWeight: 600,
      fontSize: "1rem",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    body2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    button: {
      fontWeight: 600,
      fontSize: "1rem",
      fontFamily: "var(--quicksand), sans-serif",
      lineHeight: "150%",
      textTransform: "none",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      fontFamily: "var(--inter), sans-serif",
      lineHeight: "150%",
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.75rem",
      fontFamily: "var(--inter), sans-serif",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1.5rem",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: ".5rem 1.5rem 1.5rem 1.5rem",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: ".5rem 1.5rem 1.5rem 1.5rem !important",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--grey-10)",
          "&.Mui-focused": {
            color: "var(--primary)",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-outlined": {
            color: "var(--grey-10)",
            "&.Mui-focused": {
              color: "var(--primary)",
            },
          },
          "& .MuiOutlinedInput-input": {
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          },
          "& .MuiOutlinedInput-root": {
            color: "var(--grey-10)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary)",
              borderWidth: "1px",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary)",
                borderWidth: "2px",
              },
            },
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--grey-10)",
              },
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "> tr:nth-of-type(even)": {
            backgroundColor: "var(--grey-90)",
          },
          "> tr:hover": {
            backgroundColor: "var(--grey-70)",
            cursor: "pointer",
          },
          td: {
            border: "none",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: ".875rem",
          [breakpoints.down("sm")]: {
            fontSize: ".75rem",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiToolbar-root": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "var(--grey-40)",
          fontWeight: "600",
          fontSize: ".875rem",
          [breakpoints.down("sm")]: {
            fontSize: ".75rem",
            fontWeight: "normal",
            whiteSpace: "nowrap",
          },
          "&.Mui-active": {
            color: "var(--grey-40)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
      styleOverrides: {
        root: {
          "& .MuiInputLabel-outlined": {
            color: "var(--grey-10)",
            "&.Mui-focused": {
              color: "var(--primary)",
            },
          },
          "& .MuiOutlinedInput-input": {
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          },
          "& .MuiOutlinedInput-root": {
            color: "var(--grey-10)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary)",
              borderWidth: "1px",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary)",
                borderWidth: "2px",
              },
            },
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--grey-10)",
              },
            },
          },
        },
      },
    },
    MuiStep: {
      defaultProps: {},
      styleOverrides: {
        root: ({ ownerState }) => ({
          padding: 0,
          marginRight: !ownerState.last ? "16px" : 0,
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
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: ({ theme }) => ({
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
        label: ({ theme }) => ({
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
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary)",
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary)",
              borderWidth: "2px",
            },
          },
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--grey-10)",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "var(--primary)",
          fontWeight: "bold",
          padding: "1rem",
          "&.Mui-selected": {
            backgroundColor: "var(--primary-95)",
            borderTopLeftRadius: ".25rem",
            borderTopRightRadius: ".25rem",
          },
          "&.Mui-disabled": {
            color: "var(--primary)",
          },
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        indicatorColor: "transparent",
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--primary-40)",
          boxShadow: "0",
          display: "flex",
          justifyContent: "space-between",
          padding: "0",
        },
      },
    },
  },
});
