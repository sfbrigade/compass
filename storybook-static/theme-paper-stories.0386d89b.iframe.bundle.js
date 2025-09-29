"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [302],
  {
    "./node_modules/@mui/material/Box/Box.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => Box_Box });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        styled_engine = __webpack_require__(
          "./node_modules/@mui/styled-engine/index.js"
        ),
        styleFunctionSx = __webpack_require__(
          "./node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"
        ),
        extendSxProp = __webpack_require__(
          "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"
        ),
        useTheme = __webpack_require__(
          "./node_modules/@mui/system/esm/useTheme/useTheme.js"
        ),
        jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      var ClassNameGenerator = __webpack_require__(
          "./node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js"
        ),
        createTheme = __webpack_require__(
          "./node_modules/@mui/material/styles/createTheme.js"
        ),
        identifier = __webpack_require__(
          "./node_modules/@mui/material/styles/identifier.js"
        );
      const Box_boxClasses = (0,
        __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ).Z)("MuiBox", ["root"]),
        defaultTheme = (0, createTheme.Z)(),
        Box = (function createBox(options = {}) {
          const {
              themeId,
              defaultTheme,
              defaultClassName = "MuiBox-root",
              generateClassName,
            } = options,
            BoxRoot = (0, styled_engine.ZP)("div", {
              shouldForwardProp: (prop) =>
                "theme" !== prop && "sx" !== prop && "as" !== prop,
            })(styleFunctionSx.Z);
          return react.forwardRef(function Box(inProps, ref) {
            const theme = (0, useTheme.Z)(defaultTheme),
              {
                className,
                component = "div",
                ...other
              } = (0, extendSxProp.Z)(inProps);
            return (0, jsx_runtime.jsx)(BoxRoot, {
              as: component,
              ref,
              className: (0, clsx.Z)(
                className,
                generateClassName
                  ? generateClassName(defaultClassName)
                  : defaultClassName
              ),
              theme: (themeId && theme[themeId]) || theme,
              ...other,
            });
          });
        })({
          themeId: identifier.Z,
          defaultTheme,
          defaultClassName: Box_boxClasses.root,
          generateClassName: ClassNameGenerator.Z.generate,
        }),
        Box_Box = Box;
    },
    "./node_modules/@mui/material/Paper/Paper.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => Paper_Paper });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        colorManipulator = __webpack_require__(
          "./node_modules/@mui/system/esm/colorManipulator/colorManipulator.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        useTheme = __webpack_require__(
          "./node_modules/@mui/material/styles/useTheme.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        getOverlayAlpha = __webpack_require__(
          "./node_modules/@mui/material/styles/getOverlayAlpha.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getPaperUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiPaper", slot);
      }
      (0, generateUtilityClasses.Z)("MuiPaper", [
        "root",
        "rounded",
        "outlined",
        "elevation",
        "elevation0",
        "elevation1",
        "elevation2",
        "elevation3",
        "elevation4",
        "elevation5",
        "elevation6",
        "elevation7",
        "elevation8",
        "elevation9",
        "elevation10",
        "elevation11",
        "elevation12",
        "elevation13",
        "elevation14",
        "elevation15",
        "elevation16",
        "elevation17",
        "elevation18",
        "elevation19",
        "elevation20",
        "elevation21",
        "elevation22",
        "elevation23",
        "elevation24",
      ]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const PaperRoot = (0, styled.ZP)("div", {
          name: "MuiPaper",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              styles[ownerState.variant],
              !ownerState.square && styles.rounded,
              "elevation" === ownerState.variant &&
                styles[`elevation${ownerState.elevation}`],
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            backgroundColor: (theme.vars || theme).palette.background.paper,
            color: (theme.vars || theme).palette.text.primary,
            transition: theme.transitions.create("box-shadow"),
            variants: [
              {
                props: ({ ownerState }) => !ownerState.square,
                style: { borderRadius: theme.shape.borderRadius },
              },
              {
                props: { variant: "outlined" },
                style: {
                  border: `1px solid ${(theme.vars || theme).palette.divider}`,
                },
              },
              {
                props: { variant: "elevation" },
                style: {
                  boxShadow: "var(--Paper-shadow)",
                  backgroundImage: "var(--Paper-overlay)",
                },
              },
            ],
          }))
        ),
        Paper_Paper = react.forwardRef(function Paper(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiPaper",
            }),
            theme = (0, useTheme.Z)(),
            {
              className,
              component = "div",
              elevation = 1,
              square = !1,
              variant = "elevation",
              ...other
            } = props,
            ownerState = { ...props, component, elevation, square, variant },
            classes = ((ownerState) => {
              const { square, elevation, variant, classes } = ownerState,
                slots = {
                  root: [
                    "root",
                    variant,
                    !square && "rounded",
                    "elevation" === variant && `elevation${elevation}`,
                  ],
                };
              return (0, composeClasses.Z)(
                slots,
                getPaperUtilityClass,
                classes
              );
            })(ownerState);
          return (0, jsx_runtime.jsx)(PaperRoot, {
            as: component,
            ownerState,
            className: (0, clsx.Z)(classes.root, className),
            ref,
            ...other,
            style: {
              ...("elevation" === variant && {
                "--Paper-shadow": (theme.vars || theme).shadows[elevation],
                ...(theme.vars && {
                  "--Paper-overlay": theme.vars.overlays?.[elevation],
                }),
                ...(!theme.vars &&
                  "dark" === theme.palette.mode && {
                    "--Paper-overlay": `linear-gradient(${(0, colorManipulator.Fq)("#fff", (0, getOverlayAlpha.Z)(elevation))}, ${(0, colorManipulator.Fq)("#fff", (0, getOverlayAlpha.Z)(elevation))})`,
                  }),
              }),
              ...other.style,
            },
          });
        });
    },
    "./node_modules/@mui/material/styles/useTheme.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => useTheme });
      __webpack_require__("./node_modules/next/dist/compiled/react/index.js");
      var _mui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/@mui/system/esm/useTheme/useTheme.js"
        ),
        _defaultTheme_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          "./node_modules/@mui/material/styles/defaultTheme.js"
        ),
        _identifier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          "./node_modules/@mui/material/styles/identifier.js"
        );
      function useTheme() {
        const theme = (0, _mui_system__WEBPACK_IMPORTED_MODULE_1__.Z)(
          _defaultTheme_js__WEBPACK_IMPORTED_MODULE_2__.Z
        );
        return theme[_identifier_js__WEBPACK_IMPORTED_MODULE_3__.Z] || theme;
      }
    },
    "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => extendSxProp });
      var _mui_utils_deepmerge__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/deepmerge/deepmerge.js"
          ),
        _defaultSxConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js"
        );
      const splitProps = (props) => {
        const result = { systemProps: {}, otherProps: {} },
          config =
            props?.theme?.unstable_sxConfig ??
            _defaultSxConfig_js__WEBPACK_IMPORTED_MODULE_0__.Z;
        return (
          Object.keys(props).forEach((prop) => {
            config[prop]
              ? (result.systemProps[prop] = props[prop])
              : (result.otherProps[prop] = props[prop]);
          }),
          result
        );
      };
      function extendSxProp(props) {
        const { sx: inSx, ...other } = props,
          { systemProps, otherProps } = splitProps(other);
        let finalSx;
        return (
          (finalSx = Array.isArray(inSx)
            ? [systemProps, ...inSx]
            : "function" == typeof inSx
              ? (...args) => {
                  const result = inSx(...args);
                  return (0,
                  _mui_utils_deepmerge__WEBPACK_IMPORTED_MODULE_1__.P)(result)
                    ? { ...systemProps, ...result }
                    : systemProps;
                }
              : { ...systemProps, ...inSx }),
          { ...otherProps, sx: finalSx }
        );
      }
    },
    "./node_modules/@mui/system/esm/useTheme/useTheme.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var _createTheme_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@mui/system/esm/createTheme/createTheme.js"
          ),
        _useThemeWithoutDefault_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/system/esm/useThemeWithoutDefault/useThemeWithoutDefault.js"
          );
      const systemDefaultTheme = (0,
      _createTheme_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)();
      const __WEBPACK_DEFAULT_EXPORT__ = function useTheme(
        defaultTheme = systemDefaultTheme
      ) {
        return (0,
        _useThemeWithoutDefault_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
          defaultTheme
        );
      };
    },
    "./src/theme/paper.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Elevations: () => Elevations,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        _barrel_optimize_names_Box_Paper_mui_material__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__("./node_modules/@mui/material/Paper/Paper.js"),
        _barrel_optimize_names_Box_Paper_mui_material__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./node_modules/@mui/material/Box/Box.js");
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: "Paper",
          component:
            _barrel_optimize_names_Box_Paper_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
        },
        Elevations = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            _barrel_optimize_names_Box_Paper_mui_material__WEBPACK_IMPORTED_MODULE_2__.Z,
            {
              display: "flex",
              children: new Array(6).fill(0).map((_, i) =>
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  _barrel_optimize_names_Box_Paper_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  {
                    elevation: i,
                    sx: {
                      width: "10rem",
                      height: "10rem",
                      margin: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    children: ["Elevation: ", i],
                  },
                  i
                )
              ),
            }
          ),
        __namedExportsOrder = ["Elevations"];
      Elevations.parameters = {
        ...Elevations.parameters,
        docs: {
          ...Elevations.parameters?.docs,
          source: {
            originalSource:
              '() => <Box display="flex">\r\n    {new Array(6).fill(0).map((_, i) => <Paper key={i} elevation={i} sx={{\n    width: "10rem",\n    height: "10rem",\n    margin: "1rem",\n    display: "flex",\n    justifyContent: "center",\n    alignItems: "center"\n  }}>\r\n        Elevation: {i}\r\n      </Paper>)}\r\n  </Box>',
            ...Elevations.parameters?.docs?.source,
          },
        },
      };
    },
  },
]);
