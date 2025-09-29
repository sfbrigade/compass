"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [815],
  {
    "./node_modules/@mui/icons-material/esm/ArrowBack.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var _utils_createSvgIcon_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/material/utils/createSvgIcon.js"
          ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      const __WEBPACK_DEFAULT_EXPORT__ = (0,
      _utils_createSvgIcon_js__WEBPACK_IMPORTED_MODULE_1__.Z)(
        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z",
        }),
        "ArrowBack"
      );
    },
    "./node_modules/@mui/material/AppBar/AppBar.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => AppBar_AppBar });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        capitalize = __webpack_require__(
          "./node_modules/@mui/material/utils/capitalize.js"
        ),
        createSimplePaletteValueFilter = __webpack_require__(
          "./node_modules/@mui/material/utils/createSimplePaletteValueFilter.js"
        ),
        Paper = __webpack_require__(
          "./node_modules/@mui/material/Paper/Paper.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getAppBarUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiAppBar", slot);
      }
      (0, generateUtilityClasses.Z)("MuiAppBar", [
        "root",
        "positionFixed",
        "positionAbsolute",
        "positionSticky",
        "positionStatic",
        "positionRelative",
        "colorDefault",
        "colorPrimary",
        "colorSecondary",
        "colorInherit",
        "colorTransparent",
        "colorError",
        "colorInfo",
        "colorSuccess",
        "colorWarning",
      ]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const joinVars = (var1, var2) =>
          var1 ? `${var1?.replace(")", "")}, ${var2})` : var2,
        AppBarRoot = (0, styled.ZP)(Paper.Z, {
          name: "MuiAppBar",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              styles[`position${(0, capitalize.Z)(ownerState.position)}`],
              styles[`color${(0, capitalize.Z)(ownerState.color)}`],
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            display: "flex",
            flexDirection: "column",
            width: "100%",
            boxSizing: "border-box",
            flexShrink: 0,
            variants: [
              {
                props: { position: "fixed" },
                style: {
                  position: "fixed",
                  zIndex: (theme.vars || theme).zIndex.appBar,
                  top: 0,
                  left: "auto",
                  right: 0,
                  "@media print": { position: "absolute" },
                },
              },
              {
                props: { position: "absolute" },
                style: {
                  position: "absolute",
                  zIndex: (theme.vars || theme).zIndex.appBar,
                  top: 0,
                  left: "auto",
                  right: 0,
                },
              },
              {
                props: { position: "sticky" },
                style: {
                  position: "sticky",
                  zIndex: (theme.vars || theme).zIndex.appBar,
                  top: 0,
                  left: "auto",
                  right: 0,
                },
              },
              { props: { position: "static" }, style: { position: "static" } },
              {
                props: { position: "relative" },
                style: { position: "relative" },
              },
              {
                props: { color: "inherit" },
                style: { "--AppBar-color": "inherit" },
              },
              {
                props: { color: "default" },
                style: {
                  "--AppBar-background": theme.vars
                    ? theme.vars.palette.AppBar.defaultBg
                    : theme.palette.grey[100],
                  "--AppBar-color": theme.vars
                    ? theme.vars.palette.text.primary
                    : theme.palette.getContrastText(theme.palette.grey[100]),
                  ...theme.applyStyles("dark", {
                    "--AppBar-background": theme.vars
                      ? theme.vars.palette.AppBar.defaultBg
                      : theme.palette.grey[900],
                    "--AppBar-color": theme.vars
                      ? theme.vars.palette.text.primary
                      : theme.palette.getContrastText(theme.palette.grey[900]),
                  }),
                },
              },
              ...Object.entries(theme.palette)
                .filter((0, createSimplePaletteValueFilter.Z)(["contrastText"]))
                .map(([color]) => ({
                  props: { color },
                  style: {
                    "--AppBar-background": (theme.vars ?? theme).palette[color]
                      .main,
                    "--AppBar-color": (theme.vars ?? theme).palette[color]
                      .contrastText,
                  },
                })),
              {
                props: (props) =>
                  !0 === props.enableColorOnDark &&
                  !["inherit", "transparent"].includes(props.color),
                style: {
                  backgroundColor: "var(--AppBar-background)",
                  color: "var(--AppBar-color)",
                },
              },
              {
                props: (props) =>
                  !1 === props.enableColorOnDark &&
                  !["inherit", "transparent"].includes(props.color),
                style: {
                  backgroundColor: "var(--AppBar-background)",
                  color: "var(--AppBar-color)",
                  ...theme.applyStyles("dark", {
                    backgroundColor: theme.vars
                      ? joinVars(
                          theme.vars.palette.AppBar.darkBg,
                          "var(--AppBar-background)"
                        )
                      : null,
                    color: theme.vars
                      ? joinVars(
                          theme.vars.palette.AppBar.darkColor,
                          "var(--AppBar-color)"
                        )
                      : null,
                  }),
                },
              },
              {
                props: { color: "transparent" },
                style: {
                  "--AppBar-background": "transparent",
                  "--AppBar-color": "inherit",
                  backgroundColor: "var(--AppBar-background)",
                  color: "var(--AppBar-color)",
                  ...theme.applyStyles("dark", { backgroundImage: "none" }),
                },
              },
            ],
          }))
        ),
        AppBar_AppBar = react.forwardRef(function AppBar(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiAppBar",
            }),
            {
              className,
              color = "primary",
              enableColorOnDark = !1,
              position = "fixed",
              ...other
            } = props,
            ownerState = { ...props, color, position, enableColorOnDark },
            classes = ((ownerState) => {
              const { color, position, classes } = ownerState,
                slots = {
                  root: [
                    "root",
                    `color${(0, capitalize.Z)(color)}`,
                    `position${(0, capitalize.Z)(position)}`,
                  ],
                };
              return (0, composeClasses.Z)(
                slots,
                getAppBarUtilityClass,
                classes
              );
            })(ownerState);
          return (0, jsx_runtime.jsx)(AppBarRoot, {
            square: !0,
            component: "header",
            ownerState,
            elevation: 4,
            className: (0, clsx.Z)(
              classes.root,
              className,
              "fixed" === position && "mui-fixed"
            ),
            ref,
            ...other,
          });
        });
    },
    "./node_modules/@mui/material/DialogActions/DialogActions.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => DialogActions_DialogActions,
      });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getDialogActionsUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiDialogActions", slot);
      }
      (0, generateUtilityClasses.Z)("MuiDialogActions", ["root", "spacing"]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const DialogActionsRoot = (0, styled.ZP)("div", {
          name: "MuiDialogActions",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [styles.root, !ownerState.disableSpacing && styles.spacing];
          },
        })({
          display: "flex",
          alignItems: "center",
          padding: 8,
          justifyContent: "flex-end",
          flex: "0 0 auto",
          variants: [
            {
              props: ({ ownerState }) => !ownerState.disableSpacing,
              style: { "& > :not(style) ~ :not(style)": { marginLeft: 8 } },
            },
          ],
        }),
        DialogActions_DialogActions = react.forwardRef(
          function DialogActions(inProps, ref) {
            const props = (0, DefaultPropsProvider.i)({
                props: inProps,
                name: "MuiDialogActions",
              }),
              { className, disableSpacing = !1, ...other } = props,
              ownerState = { ...props, disableSpacing },
              classes = ((ownerState) => {
                const { classes, disableSpacing } = ownerState,
                  slots = { root: ["root", !disableSpacing && "spacing"] };
                return (0, composeClasses.Z)(
                  slots,
                  getDialogActionsUtilityClass,
                  classes
                );
              })(ownerState);
            return (0, jsx_runtime.jsx)(DialogActionsRoot, {
              className: (0, clsx.Z)(classes.root, className),
              ownerState,
              ref,
              ...other,
            });
          }
        );
    },
    "./node_modules/@mui/material/DialogContent/DialogContent.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => DialogContent_DialogContent,
      });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getDialogContentUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiDialogContent", slot);
      }
      (0, generateUtilityClasses.Z)("MuiDialogContent", ["root", "dividers"]);
      var dialogTitleClasses = __webpack_require__(
          "./node_modules/@mui/material/DialogTitle/dialogTitleClasses.js"
        ),
        jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      const DialogContentRoot = (0, styled.ZP)("div", {
          name: "MuiDialogContent",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [styles.root, ownerState.dividers && styles.dividers];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            flex: "1 1 auto",
            WebkitOverflowScrolling: "touch",
            overflowY: "auto",
            padding: "20px 24px",
            variants: [
              {
                props: ({ ownerState }) => ownerState.dividers,
                style: {
                  padding: "16px 24px",
                  borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
                  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
                },
              },
              {
                props: ({ ownerState }) => !ownerState.dividers,
                style: {
                  [`.${dialogTitleClasses.Z.root} + &`]: { paddingTop: 0 },
                },
              },
            ],
          }))
        ),
        DialogContent_DialogContent = react.forwardRef(
          function DialogContent(inProps, ref) {
            const props = (0, DefaultPropsProvider.i)({
                props: inProps,
                name: "MuiDialogContent",
              }),
              { className, dividers = !1, ...other } = props,
              ownerState = { ...props, dividers },
              classes = ((ownerState) => {
                const { classes, dividers } = ownerState,
                  slots = { root: ["root", dividers && "dividers"] };
                return (0, composeClasses.Z)(
                  slots,
                  getDialogContentUtilityClass,
                  classes
                );
              })(ownerState);
            return (0, jsx_runtime.jsx)(DialogContentRoot, {
              className: (0, clsx.Z)(classes.root, className),
              ownerState,
              ref,
              ...other,
            });
          }
        );
    },
    "./node_modules/@mui/material/DialogTitle/DialogTitle.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          "./node_modules/clsx/dist/clsx.mjs"
        ),
        _mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
          ),
        _Typography_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          "./node_modules/@mui/material/Typography/Typography.js"
        ),
        _zero_styled_index_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__("./node_modules/@mui/material/styles/styled.js"),
        _DefaultPropsProvider_index_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
          ),
        _dialogTitleClasses_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./node_modules/@mui/material/DialogTitle/dialogTitleClasses.js"
          ),
        _Dialog_DialogContext_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            "./node_modules/@mui/material/Dialog/DialogContext.js"
          ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      const DialogTitleRoot = (0,
        _zero_styled_index_js__WEBPACK_IMPORTED_MODULE_4__.ZP)(
          _Typography_index_js__WEBPACK_IMPORTED_MODULE_5__.Z,
          {
            name: "MuiDialogTitle",
            slot: "Root",
            overridesResolver: (props, styles) => styles.root,
          }
        )({ padding: "16px 24px", flex: "0 0 auto" }),
        __WEBPACK_DEFAULT_EXPORT__ =
          react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
            function DialogTitle(inProps, ref) {
              const props = (0,
                _DefaultPropsProvider_index_js__WEBPACK_IMPORTED_MODULE_6__.i)({
                  props: inProps,
                  name: "MuiDialogTitle",
                }),
                { className, id: idProp, ...other } = props,
                ownerState = props,
                classes = ((ownerState) => {
                  const { classes } = ownerState;
                  return (0,
                  _mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_2__.Z)(
                    { root: ["root"] },
                    _dialogTitleClasses_js__WEBPACK_IMPORTED_MODULE_3__.a,
                    classes
                  );
                })(ownerState),
                { titleId = idProp } =
                  react__WEBPACK_IMPORTED_MODULE_0__.useContext(
                    _Dialog_DialogContext_js__WEBPACK_IMPORTED_MODULE_7__.Z
                  );
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
                DialogTitleRoot,
                {
                  component: "h2",
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_8__.Z)(
                    classes.root,
                    className
                  ),
                  ownerState,
                  ref,
                  variant: "h6",
                  id: idProp ?? titleId,
                  ...other,
                }
              );
            }
          );
    },
    "./node_modules/@mui/material/DialogTitle/dialogTitleClasses.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
        a: () => getDialogTitleUtilityClass,
      });
      var _mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
          ),
        _mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
          );
      function getDialogTitleUtilityClass(slot) {
        return (0,
        _mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__.ZP)(
          "MuiDialogTitle",
          slot
        );
      }
      const __WEBPACK_DEFAULT_EXPORT__ = (0,
      _mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__.Z)(
        "MuiDialogTitle",
        ["root"]
      );
    },
    "./node_modules/@mui/material/Dialog/Dialog.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => Dialog_Dialog });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        useId = __webpack_require__(
          "./node_modules/@mui/utils/esm/useId/useId.js"
        ),
        capitalize = __webpack_require__(
          "./node_modules/@mui/material/utils/capitalize.js"
        ),
        Modal = __webpack_require__(
          "./node_modules/@mui/material/Modal/Modal.js"
        ),
        Fade = __webpack_require__("./node_modules/@mui/material/Fade/Fade.js"),
        Paper = __webpack_require__(
          "./node_modules/@mui/material/Paper/Paper.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getDialogUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiDialog", slot);
      }
      const Dialog_dialogClasses = (0, generateUtilityClasses.Z)("MuiDialog", [
        "root",
        "scrollPaper",
        "scrollBody",
        "container",
        "paper",
        "paperScrollPaper",
        "paperScrollBody",
        "paperWidthFalse",
        "paperWidthXs",
        "paperWidthSm",
        "paperWidthMd",
        "paperWidthLg",
        "paperWidthXl",
        "paperFullWidth",
        "paperFullScreen",
      ]);
      var DialogContext = __webpack_require__(
          "./node_modules/@mui/material/Dialog/DialogContext.js"
        ),
        Backdrop = __webpack_require__(
          "./node_modules/@mui/material/Backdrop/Backdrop.js"
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
        useSlot = __webpack_require__(
          "./node_modules/@mui/material/utils/useSlot.js"
        ),
        jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      const DialogBackdrop = (0, styled.ZP)(Backdrop.Z, {
          name: "MuiDialog",
          slot: "Backdrop",
          overrides: (props, styles) => styles.backdrop,
        })({ zIndex: -1 }),
        DialogRoot = (0, styled.ZP)(Modal.Z, {
          name: "MuiDialog",
          slot: "Root",
          overridesResolver: (props, styles) => styles.root,
        })({ "@media print": { position: "absolute !important" } }),
        DialogContainer = (0, styled.ZP)("div", {
          name: "MuiDialog",
          slot: "Container",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.container,
              styles[`scroll${(0, capitalize.Z)(ownerState.scroll)}`],
            ];
          },
        })({
          height: "100%",
          "@media print": { height: "auto" },
          outline: 0,
          variants: [
            {
              props: { scroll: "paper" },
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
            {
              props: { scroll: "body" },
              style: {
                overflowY: "auto",
                overflowX: "hidden",
                textAlign: "center",
                "&::after": {
                  content: '""',
                  display: "inline-block",
                  verticalAlign: "middle",
                  height: "100%",
                  width: "0",
                },
              },
            },
          ],
        }),
        DialogPaper = (0, styled.ZP)(Paper.Z, {
          name: "MuiDialog",
          slot: "Paper",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.paper,
              styles[`scrollPaper${(0, capitalize.Z)(ownerState.scroll)}`],
              styles[
                `paperWidth${(0, capitalize.Z)(String(ownerState.maxWidth))}`
              ],
              ownerState.fullWidth && styles.paperFullWidth,
              ownerState.fullScreen && styles.paperFullScreen,
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            margin: 32,
            position: "relative",
            overflowY: "auto",
            "@media print": { overflowY: "visible", boxShadow: "none" },
            variants: [
              {
                props: { scroll: "paper" },
                style: {
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "calc(100% - 64px)",
                },
              },
              {
                props: { scroll: "body" },
                style: {
                  display: "inline-block",
                  verticalAlign: "middle",
                  textAlign: "initial",
                },
              },
              {
                props: ({ ownerState }) => !ownerState.maxWidth,
                style: { maxWidth: "calc(100% - 64px)" },
              },
              {
                props: { maxWidth: "xs" },
                style: {
                  maxWidth:
                    "px" === theme.breakpoints.unit
                      ? Math.max(theme.breakpoints.values.xs, 444)
                      : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
                  [`&.${Dialog_dialogClasses.paperScrollBody}`]: {
                    [theme.breakpoints.down(
                      Math.max(theme.breakpoints.values.xs, 444) + 64
                    )]: { maxWidth: "calc(100% - 64px)" },
                  },
                },
              },
              ...Object.keys(theme.breakpoints.values)
                .filter((maxWidth) => "xs" !== maxWidth)
                .map((maxWidth) => ({
                  props: { maxWidth },
                  style: {
                    maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`,
                    [`&.${Dialog_dialogClasses.paperScrollBody}`]: {
                      [theme.breakpoints.down(
                        theme.breakpoints.values[maxWidth] + 64
                      )]: { maxWidth: "calc(100% - 64px)" },
                    },
                  },
                })),
              {
                props: ({ ownerState }) => ownerState.fullWidth,
                style: { width: "calc(100% - 64px)" },
              },
              {
                props: ({ ownerState }) => ownerState.fullScreen,
                style: {
                  margin: 0,
                  width: "100%",
                  maxWidth: "100%",
                  height: "100%",
                  maxHeight: "none",
                  borderRadius: 0,
                  [`&.${Dialog_dialogClasses.paperScrollBody}`]: {
                    margin: 0,
                    maxWidth: "100%",
                  },
                },
              },
            ],
          }))
        ),
        Dialog_Dialog = react.forwardRef(function Dialog(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiDialog",
            }),
            theme = (0, useTheme.Z)(),
            defaultTransitionDuration = {
              enter: theme.transitions.duration.enteringScreen,
              exit: theme.transitions.duration.leavingScreen,
            },
            {
              "aria-describedby": ariaDescribedby,
              "aria-labelledby": ariaLabelledbyProp,
              "aria-modal": ariaModal = !0,
              BackdropComponent,
              BackdropProps,
              children,
              className,
              disableEscapeKeyDown = !1,
              fullScreen = !1,
              fullWidth = !1,
              maxWidth = "sm",
              onBackdropClick,
              onClick,
              onClose,
              open,
              PaperComponent = Paper.Z,
              PaperProps = {},
              scroll = "paper",
              slots = {},
              slotProps = {},
              TransitionComponent = Fade.Z,
              transitionDuration = defaultTransitionDuration,
              TransitionProps,
              ...other
            } = props,
            ownerState = {
              ...props,
              disableEscapeKeyDown,
              fullScreen,
              fullWidth,
              maxWidth,
              scroll,
            },
            classes = ((ownerState) => {
              const { classes, scroll, maxWidth, fullWidth, fullScreen } =
                  ownerState,
                slots = {
                  root: ["root"],
                  container: [
                    "container",
                    `scroll${(0, capitalize.Z)(scroll)}`,
                  ],
                  paper: [
                    "paper",
                    `paperScroll${(0, capitalize.Z)(scroll)}`,
                    `paperWidth${(0, capitalize.Z)(String(maxWidth))}`,
                    fullWidth && "paperFullWidth",
                    fullScreen && "paperFullScreen",
                  ],
                };
              return (0, composeClasses.Z)(
                slots,
                getDialogUtilityClass,
                classes
              );
            })(ownerState),
            backdropClick = react.useRef(),
            ariaLabelledby = (0, useId.Z)(ariaLabelledbyProp),
            dialogContextValue = react.useMemo(
              () => ({ titleId: ariaLabelledby }),
              [ariaLabelledby]
            ),
            externalForwardedProps = {
              slots: { transition: TransitionComponent, ...slots },
              slotProps: {
                transition: TransitionProps,
                paper: PaperProps,
                backdrop: BackdropProps,
                ...slotProps,
              },
            },
            [RootSlot, rootSlotProps] = (0, useSlot.Z)("root", {
              elementType: DialogRoot,
              shouldForwardComponentProp: !0,
              externalForwardedProps,
              ownerState,
              className: (0, clsx.Z)(classes.root, className),
              ref,
            }),
            [BackdropSlot, backdropSlotProps] = (0, useSlot.Z)("backdrop", {
              elementType: DialogBackdrop,
              shouldForwardComponentProp: !0,
              externalForwardedProps,
              ownerState,
            }),
            [PaperSlot, paperSlotProps] = (0, useSlot.Z)("paper", {
              elementType: DialogPaper,
              shouldForwardComponentProp: !0,
              externalForwardedProps,
              ownerState,
              className: (0, clsx.Z)(classes.paper, PaperProps.className),
            }),
            [ContainerSlot, containerSlotProps] = (0, useSlot.Z)("container", {
              elementType: DialogContainer,
              externalForwardedProps,
              ownerState,
              className: (0, clsx.Z)(classes.container),
            }),
            [TransitionSlot, transitionSlotProps] = (0, useSlot.Z)(
              "transition",
              {
                elementType: Fade.Z,
                externalForwardedProps,
                ownerState,
                additionalProps: {
                  appear: !0,
                  in: open,
                  timeout: transitionDuration,
                  role: "presentation",
                },
              }
            );
          return (0, jsx_runtime.jsx)(RootSlot, {
            closeAfterTransition: !0,
            slots: { backdrop: BackdropSlot },
            slotProps: {
              backdrop: {
                transitionDuration,
                as: BackdropComponent,
                ...backdropSlotProps,
              },
            },
            disableEscapeKeyDown,
            onClose,
            open,
            onClick: (event) => {
              onClick && onClick(event),
                backdropClick.current &&
                  ((backdropClick.current = null),
                  onBackdropClick && onBackdropClick(event),
                  onClose && onClose(event, "backdropClick"));
            },
            ...rootSlotProps,
            ...other,
            children: (0, jsx_runtime.jsx)(TransitionSlot, {
              ...transitionSlotProps,
              children: (0, jsx_runtime.jsx)(ContainerSlot, {
                onMouseDown: (event) => {
                  backdropClick.current = event.target === event.currentTarget;
                },
                ...containerSlotProps,
                children: (0, jsx_runtime.jsx)(PaperSlot, {
                  as: PaperComponent,
                  elevation: 24,
                  role: "dialog",
                  "aria-describedby": ariaDescribedby,
                  "aria-labelledby": ariaLabelledby,
                  "aria-modal": ariaModal,
                  ...paperSlotProps,
                  children: (0, jsx_runtime.jsx)(DialogContext.Z.Provider, {
                    value: dialogContextValue,
                    children,
                  }),
                }),
              }),
            }),
          });
        });
    },
    "./node_modules/@mui/material/Dialog/DialogContext.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__(
        "./node_modules/next/dist/compiled/react/index.js"
      ).createContext({});
    },
    "./node_modules/@mui/material/IconButton/IconButton.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => IconButton_IconButton,
      });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        useId = __webpack_require__(
          "./node_modules/@mui/material/utils/useId.js"
        ),
        colorManipulator = __webpack_require__(
          "./node_modules/@mui/system/esm/colorManipulator/colorManipulator.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        createSimplePaletteValueFilter = __webpack_require__(
          "./node_modules/@mui/material/utils/createSimplePaletteValueFilter.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        ButtonBase = __webpack_require__(
          "./node_modules/@mui/material/ButtonBase/ButtonBase.js"
        ),
        CircularProgress = __webpack_require__(
          "./node_modules/@mui/material/CircularProgress/CircularProgress.js"
        ),
        capitalize = __webpack_require__(
          "./node_modules/@mui/material/utils/capitalize.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getIconButtonUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiIconButton", slot);
      }
      const IconButton_iconButtonClasses = (0, generateUtilityClasses.Z)(
        "MuiIconButton",
        [
          "root",
          "disabled",
          "colorInherit",
          "colorPrimary",
          "colorSecondary",
          "colorError",
          "colorInfo",
          "colorSuccess",
          "colorWarning",
          "edgeStart",
          "edgeEnd",
          "sizeSmall",
          "sizeMedium",
          "sizeLarge",
          "loading",
          "loadingIndicator",
          "loadingWrapper",
        ]
      );
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const IconButtonRoot = (0, styled.ZP)(ButtonBase.Z, {
          name: "MuiIconButton",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              ownerState.loading && styles.loading,
              "default" !== ownerState.color &&
                styles[`color${(0, capitalize.Z)(ownerState.color)}`],
              ownerState.edge &&
                styles[`edge${(0, capitalize.Z)(ownerState.edge)}`],
              styles[`size${(0, capitalize.Z)(ownerState.size)}`],
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            textAlign: "center",
            flex: "0 0 auto",
            fontSize: theme.typography.pxToRem(24),
            padding: 8,
            borderRadius: "50%",
            color: (theme.vars || theme).palette.action.active,
            transition: theme.transitions.create("background-color", {
              duration: theme.transitions.duration.shortest,
            }),
            variants: [
              {
                props: (props) => !props.disableRipple,
                style: {
                  "--IconButton-hoverBg": theme.vars
                    ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : (0, colorManipulator.Fq)(
                        theme.palette.action.active,
                        theme.palette.action.hoverOpacity
                      ),
                  "&:hover": {
                    backgroundColor: "var(--IconButton-hoverBg)",
                    "@media (hover: none)": { backgroundColor: "transparent" },
                  },
                },
              },
              { props: { edge: "start" }, style: { marginLeft: -12 } },
              {
                props: { edge: "start", size: "small" },
                style: { marginLeft: -3 },
              },
              { props: { edge: "end" }, style: { marginRight: -12 } },
              {
                props: { edge: "end", size: "small" },
                style: { marginRight: -3 },
              },
            ],
          })),
          (0, memoTheme.Z)(({ theme }) => ({
            variants: [
              { props: { color: "inherit" }, style: { color: "inherit" } },
              ...Object.entries(theme.palette)
                .filter((0, createSimplePaletteValueFilter.Z)())
                .map(([color]) => ({
                  props: { color },
                  style: { color: (theme.vars || theme).palette[color].main },
                })),
              ...Object.entries(theme.palette)
                .filter((0, createSimplePaletteValueFilter.Z)())
                .map(([color]) => ({
                  props: { color },
                  style: {
                    "--IconButton-hoverBg": theme.vars
                      ? `rgba(${(theme.vars || theme).palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                      : (0, colorManipulator.Fq)(
                          (theme.vars || theme).palette[color].main,
                          theme.palette.action.hoverOpacity
                        ),
                  },
                })),
              {
                props: { size: "small" },
                style: { padding: 5, fontSize: theme.typography.pxToRem(18) },
              },
              {
                props: { size: "large" },
                style: { padding: 12, fontSize: theme.typography.pxToRem(28) },
              },
            ],
            [`&.${IconButton_iconButtonClasses.disabled}`]: {
              backgroundColor: "transparent",
              color: (theme.vars || theme).palette.action.disabled,
            },
            [`&.${IconButton_iconButtonClasses.loading}`]: {
              color: "transparent",
            },
          }))
        ),
        IconButtonLoadingIndicator = (0, styled.ZP)("span", {
          name: "MuiIconButton",
          slot: "LoadingIndicator",
          overridesResolver: (props, styles) => styles.loadingIndicator,
        })(({ theme }) => ({
          display: "none",
          position: "absolute",
          visibility: "visible",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: (theme.vars || theme).palette.action.disabled,
          variants: [{ props: { loading: !0 }, style: { display: "flex" } }],
        })),
        IconButton_IconButton = react.forwardRef(
          function IconButton(inProps, ref) {
            const props = (0, DefaultPropsProvider.i)({
                props: inProps,
                name: "MuiIconButton",
              }),
              {
                edge = !1,
                children,
                className,
                color = "default",
                disabled = !1,
                disableFocusRipple = !1,
                size = "medium",
                id: idProp,
                loading = null,
                loadingIndicator: loadingIndicatorProp,
                ...other
              } = props,
              loadingId = (0, useId.Z)(idProp),
              loadingIndicator =
                loadingIndicatorProp ??
                (0, jsx_runtime.jsx)(CircularProgress.Z, {
                  "aria-labelledby": loadingId,
                  color: "inherit",
                  size: 16,
                }),
              ownerState = {
                ...props,
                edge,
                color,
                disabled,
                disableFocusRipple,
                loading,
                loadingIndicator,
                size,
              },
              classes = ((ownerState) => {
                const { classes, disabled, color, edge, size, loading } =
                    ownerState,
                  slots = {
                    root: [
                      "root",
                      loading && "loading",
                      disabled && "disabled",
                      "default" !== color && `color${(0, capitalize.Z)(color)}`,
                      edge && `edge${(0, capitalize.Z)(edge)}`,
                      `size${(0, capitalize.Z)(size)}`,
                    ],
                    loadingIndicator: ["loadingIndicator"],
                    loadingWrapper: ["loadingWrapper"],
                  };
                return (0, composeClasses.Z)(
                  slots,
                  getIconButtonUtilityClass,
                  classes
                );
              })(ownerState);
            return (0, jsx_runtime.jsxs)(IconButtonRoot, {
              id: loading ? loadingId : idProp,
              className: (0, clsx.Z)(classes.root, className),
              centerRipple: !0,
              focusRipple: !disableFocusRipple,
              disabled: disabled || loading,
              ref,
              ...other,
              ownerState,
              children: [
                "boolean" == typeof loading &&
                  (0, jsx_runtime.jsx)("span", {
                    className: classes.loadingWrapper,
                    style: { display: "contents" },
                    children: (0, jsx_runtime.jsx)(IconButtonLoadingIndicator, {
                      className: classes.loadingIndicator,
                      ownerState,
                      children: loading && loadingIndicator,
                    }),
                  }),
                children,
              ],
            });
          }
        );
    },
    "./node_modules/@mui/material/Toolbar/Toolbar.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => Toolbar_Toolbar });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getToolbarUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiToolbar", slot);
      }
      (0, generateUtilityClasses.Z)("MuiToolbar", [
        "root",
        "gutters",
        "regular",
        "dense",
      ]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const ToolbarRoot = (0, styled.ZP)("div", {
          name: "MuiToolbar",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              !ownerState.disableGutters && styles.gutters,
              styles[ownerState.variant],
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            position: "relative",
            display: "flex",
            alignItems: "center",
            variants: [
              {
                props: ({ ownerState }) => !ownerState.disableGutters,
                style: {
                  paddingLeft: theme.spacing(2),
                  paddingRight: theme.spacing(2),
                  [theme.breakpoints.up("sm")]: {
                    paddingLeft: theme.spacing(3),
                    paddingRight: theme.spacing(3),
                  },
                },
              },
              { props: { variant: "dense" }, style: { minHeight: 48 } },
              { props: { variant: "regular" }, style: theme.mixins.toolbar },
            ],
          }))
        ),
        Toolbar_Toolbar = react.forwardRef(function Toolbar(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiToolbar",
            }),
            {
              className,
              component = "div",
              disableGutters = !1,
              variant = "regular",
              ...other
            } = props,
            ownerState = { ...props, component, disableGutters, variant },
            classes = ((ownerState) => {
              const { classes, disableGutters, variant } = ownerState,
                slots = {
                  root: ["root", !disableGutters && "gutters", variant],
                };
              return (0, composeClasses.Z)(
                slots,
                getToolbarUtilityClass,
                classes
              );
            })(ownerState);
          return (0, jsx_runtime.jsx)(ToolbarRoot, {
            as: component,
            className: (0, clsx.Z)(classes.root, className),
            ref,
            ownerState,
            ...other,
          });
        });
    },
    "./node_modules/@mui/material/useMediaQuery/index.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => material_useMediaQuery,
      });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        react_namespaceObject = __webpack_require__.t(react, 2),
        useEnhancedEffect = __webpack_require__(
          "./node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js"
        ),
        getThemeProps = __webpack_require__(
          "./node_modules/@mui/system/esm/useThemeProps/getThemeProps.js"
        ),
        useThemeWithoutDefault = __webpack_require__(
          "./node_modules/@mui/system/esm/useThemeWithoutDefault/useThemeWithoutDefault.js"
        );
      function useMediaQueryOld(
        query,
        defaultMatches,
        matchMedia,
        ssrMatchMedia,
        noSsr
      ) {
        const [match, setMatch] = react.useState(() =>
          noSsr && matchMedia
            ? matchMedia(query).matches
            : ssrMatchMedia
              ? ssrMatchMedia(query).matches
              : defaultMatches
        );
        return (
          (0, useEnhancedEffect.Z)(() => {
            if (!matchMedia) return;
            const queryList = matchMedia(query),
              updateMatch = () => {
                setMatch(queryList.matches);
              };
            return (
              updateMatch(),
              queryList.addEventListener("change", updateMatch),
              () => {
                queryList.removeEventListener("change", updateMatch);
              }
            );
          }, [query, matchMedia]),
          match
        );
      }
      const maybeReactUseSyncExternalStore = { ...react_namespaceObject }
        .useSyncExternalStore;
      function useMediaQueryNew(
        query,
        defaultMatches,
        matchMedia,
        ssrMatchMedia,
        noSsr
      ) {
        const getDefaultSnapshot = react.useCallback(
            () => defaultMatches,
            [defaultMatches]
          ),
          getServerSnapshot = react.useMemo(() => {
            if (noSsr && matchMedia) return () => matchMedia(query).matches;
            if (null !== ssrMatchMedia) {
              const { matches } = ssrMatchMedia(query);
              return () => matches;
            }
            return getDefaultSnapshot;
          }, [getDefaultSnapshot, query, ssrMatchMedia, noSsr, matchMedia]),
          [getSnapshot, subscribe] = react.useMemo(() => {
            if (null === matchMedia)
              return [getDefaultSnapshot, () => () => {}];
            const mediaQueryList = matchMedia(query);
            return [
              () => mediaQueryList.matches,
              (notify) => (
                mediaQueryList.addEventListener("change", notify),
                () => {
                  mediaQueryList.removeEventListener("change", notify);
                }
              ),
            ];
          }, [getDefaultSnapshot, matchMedia, query]);
        return maybeReactUseSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      }
      function unstable_createUseMediaQuery(params = {}) {
        const { themeId } = params;
        return function useMediaQuery(queryInput, options = {}) {
          let theme = (0, useThemeWithoutDefault.Z)();
          theme && themeId && (theme = theme[themeId] || theme);
          const supportMatchMedia =
              "undefined" != typeof window && void 0 !== window.matchMedia,
            {
              defaultMatches = !1,
              matchMedia = supportMatchMedia ? window.matchMedia : null,
              ssrMatchMedia = null,
              noSsr = !1,
            } = (0, getThemeProps.Z)({
              name: "MuiUseMediaQuery",
              props: options,
              theme,
            });
          let query =
            "function" == typeof queryInput ? queryInput(theme) : queryInput;
          query = query.replace(/^@media( ?)/m, "");
          return (
            void 0 !== maybeReactUseSyncExternalStore
              ? useMediaQueryNew
              : useMediaQueryOld
          )(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
        };
      }
      unstable_createUseMediaQuery();
      const material_useMediaQuery = unstable_createUseMediaQuery({
        themeId: __webpack_require__(
          "./node_modules/@mui/material/styles/identifier.js"
        ).Z,
      });
    },
    "./node_modules/@mui/material/utils/createSvgIcon.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => createSvgIcon });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        capitalize = __webpack_require__(
          "./node_modules/@mui/material/utils/capitalize.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getSvgIconUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiSvgIcon", slot);
      }
      (0, generateUtilityClasses.Z)("MuiSvgIcon", [
        "root",
        "colorPrimary",
        "colorSecondary",
        "colorAction",
        "colorError",
        "colorDisabled",
        "fontSizeInherit",
        "fontSizeSmall",
        "fontSizeMedium",
        "fontSizeLarge",
      ]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const SvgIconRoot = (0, styled.ZP)("svg", {
          name: "MuiSvgIcon",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              "inherit" !== ownerState.color &&
                styles[`color${(0, capitalize.Z)(ownerState.color)}`],
              styles[`fontSize${(0, capitalize.Z)(ownerState.fontSize)}`],
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            userSelect: "none",
            width: "1em",
            height: "1em",
            display: "inline-block",
            flexShrink: 0,
            transition: theme.transitions?.create?.("fill", {
              duration: (theme.vars ?? theme).transitions?.duration?.shorter,
            }),
            variants: [
              {
                props: (props) => !props.hasSvgAsChild,
                style: { fill: "currentColor" },
              },
              {
                props: { fontSize: "inherit" },
                style: { fontSize: "inherit" },
              },
              {
                props: { fontSize: "small" },
                style: {
                  fontSize: theme.typography?.pxToRem?.(20) || "1.25rem",
                },
              },
              {
                props: { fontSize: "medium" },
                style: {
                  fontSize: theme.typography?.pxToRem?.(24) || "1.5rem",
                },
              },
              {
                props: { fontSize: "large" },
                style: {
                  fontSize: theme.typography?.pxToRem?.(35) || "2.1875rem",
                },
              },
              ...Object.entries((theme.vars ?? theme).palette)
                .filter(([, value]) => value && value.main)
                .map(([color]) => ({
                  props: { color },
                  style: {
                    color: (theme.vars ?? theme).palette?.[color]?.main,
                  },
                })),
              {
                props: { color: "action" },
                style: { color: (theme.vars ?? theme).palette?.action?.active },
              },
              {
                props: { color: "disabled" },
                style: {
                  color: (theme.vars ?? theme).palette?.action?.disabled,
                },
              },
              { props: { color: "inherit" }, style: { color: void 0 } },
            ],
          }))
        ),
        SvgIcon = react.forwardRef(function SvgIcon(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiSvgIcon",
            }),
            {
              children,
              className,
              color = "inherit",
              component = "svg",
              fontSize = "medium",
              htmlColor,
              inheritViewBox = !1,
              titleAccess,
              viewBox = "0 0 24 24",
              ...other
            } = props,
            hasSvgAsChild =
              react.isValidElement(children) && "svg" === children.type,
            ownerState = {
              ...props,
              color,
              component,
              fontSize,
              instanceFontSize: inProps.fontSize,
              inheritViewBox,
              viewBox,
              hasSvgAsChild,
            },
            more = {};
          inheritViewBox || (more.viewBox = viewBox);
          const classes = ((ownerState) => {
            const { color, fontSize, classes } = ownerState,
              slots = {
                root: [
                  "root",
                  "inherit" !== color && `color${(0, capitalize.Z)(color)}`,
                  `fontSize${(0, capitalize.Z)(fontSize)}`,
                ],
              };
            return (0, composeClasses.Z)(
              slots,
              getSvgIconUtilityClass,
              classes
            );
          })(ownerState);
          return (0, jsx_runtime.jsxs)(SvgIconRoot, {
            as: component,
            className: (0, clsx.Z)(classes.root, className),
            focusable: "false",
            color: htmlColor,
            "aria-hidden": !titleAccess || void 0,
            role: titleAccess ? "img" : void 0,
            ref,
            ...more,
            ...other,
            ...(hasSvgAsChild && children.props),
            ownerState,
            children: [
              hasSvgAsChild ? children.props.children : children,
              titleAccess
                ? (0, jsx_runtime.jsx)("title", { children: titleAccess })
                : null,
            ],
          });
        });
      SvgIcon.muiName = "SvgIcon";
      const SvgIcon_SvgIcon = SvgIcon;
      function createSvgIcon(path, displayName) {
        function Component(props, ref) {
          return (0, jsx_runtime.jsx)(SvgIcon_SvgIcon, {
            "data-testid": `${displayName}Icon`,
            ref,
            ...props,
            children: path,
          });
        }
        return (
          (Component.muiName = SvgIcon_SvgIcon.muiName),
          react.memo(react.forwardRef(Component))
        );
      }
    },
    "./node_modules/@mui/system/esm/useThemeProps/getThemeProps.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => getThemeProps });
      var _mui_utils_resolveProps__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(
          "./node_modules/@mui/utils/esm/resolveProps/resolveProps.js"
        );
      function getThemeProps(params) {
        const { theme, name, props } = params;
        return theme &&
          theme.components &&
          theme.components[name] &&
          theme.components[name].defaultProps
          ? (0, _mui_utils_resolveProps__WEBPACK_IMPORTED_MODULE_0__.Z)(
              theme.components[name].defaultProps,
              props
            )
          : props;
      }
    },
  },
]);
