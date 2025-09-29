"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [933],
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
    "./node_modules/@mui/material/Typography/Typography.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => Typography_Typography,
      });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        zero_styled = __webpack_require__(
          "./node_modules/@mui/material/zero-styled/index.js"
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
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getTypographyUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiTypography", slot);
      }
      (0, generateUtilityClasses.Z)("MuiTypography", [
        "root",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "inherit",
        "button",
        "caption",
        "overline",
        "alignLeft",
        "alignRight",
        "alignCenter",
        "alignJustify",
        "noWrap",
        "gutterBottom",
        "paragraph",
      ]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const v6Colors = {
          primary: !0,
          secondary: !0,
          error: !0,
          info: !0,
          success: !0,
          warning: !0,
          textPrimary: !0,
          textSecondary: !0,
          textDisabled: !0,
        },
        extendSxProp = (0, zero_styled.u7)(),
        TypographyRoot = (0, styled.ZP)("span", {
          name: "MuiTypography",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              ownerState.variant && styles[ownerState.variant],
              "inherit" !== ownerState.align &&
                styles[`align${(0, capitalize.Z)(ownerState.align)}`],
              ownerState.noWrap && styles.noWrap,
              ownerState.gutterBottom && styles.gutterBottom,
              ownerState.paragraph && styles.paragraph,
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            margin: 0,
            variants: [
              {
                props: { variant: "inherit" },
                style: {
                  font: "inherit",
                  lineHeight: "inherit",
                  letterSpacing: "inherit",
                },
              },
              ...Object.entries(theme.typography)
                .filter(
                  ([variant, value]) =>
                    "inherit" !== variant && value && "object" == typeof value
                )
                .map(([variant, value]) => ({
                  props: { variant },
                  style: value,
                })),
              ...Object.entries(theme.palette)
                .filter((0, createSimplePaletteValueFilter.Z)())
                .map(([color]) => ({
                  props: { color },
                  style: { color: (theme.vars || theme).palette[color].main },
                })),
              ...Object.entries(theme.palette?.text || {})
                .filter(([, value]) => "string" == typeof value)
                .map(([color]) => ({
                  props: { color: `text${(0, capitalize.Z)(color)}` },
                  style: { color: (theme.vars || theme).palette.text[color] },
                })),
              {
                props: ({ ownerState }) => "inherit" !== ownerState.align,
                style: { textAlign: "var(--Typography-textAlign)" },
              },
              {
                props: ({ ownerState }) => ownerState.noWrap,
                style: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              },
              {
                props: ({ ownerState }) => ownerState.gutterBottom,
                style: { marginBottom: "0.35em" },
              },
              {
                props: ({ ownerState }) => ownerState.paragraph,
                style: { marginBottom: 16 },
              },
            ],
          }))
        ),
        defaultVariantMapping = {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h6",
          subtitle2: "h6",
          body1: "p",
          body2: "p",
          inherit: "p",
        },
        Typography_Typography = react.forwardRef(
          function Typography(inProps, ref) {
            const { color, ...themeProps } = (0, DefaultPropsProvider.i)({
                props: inProps,
                name: "MuiTypography",
              }),
              props = extendSxProp({
                ...themeProps,
                ...(!v6Colors[color] && { color }),
              }),
              {
                align = "inherit",
                className,
                component,
                gutterBottom = !1,
                noWrap = !1,
                paragraph = !1,
                variant = "body1",
                variantMapping = defaultVariantMapping,
                ...other
              } = props,
              ownerState = {
                ...props,
                align,
                color,
                className,
                component,
                gutterBottom,
                noWrap,
                paragraph,
                variant,
                variantMapping,
              },
              Component =
                component ||
                (paragraph
                  ? "p"
                  : variantMapping[variant] ||
                    defaultVariantMapping[variant]) ||
                "span",
              classes = ((ownerState) => {
                const {
                    align,
                    gutterBottom,
                    noWrap,
                    paragraph,
                    variant,
                    classes,
                  } = ownerState,
                  slots = {
                    root: [
                      "root",
                      variant,
                      "inherit" !== ownerState.align &&
                        `align${(0, capitalize.Z)(align)}`,
                      gutterBottom && "gutterBottom",
                      noWrap && "noWrap",
                      paragraph && "paragraph",
                    ],
                  };
                return (0, composeClasses.Z)(
                  slots,
                  getTypographyUtilityClass,
                  classes
                );
              })(ownerState);
            return (0, jsx_runtime.jsx)(TypographyRoot, {
              as: Component,
              ref,
              className: (0, clsx.Z)(classes.root, className),
              ...other,
              ownerState,
              style: {
                ...("inherit" !== align && { "--Typography-textAlign": align }),
                ...other.style,
              },
            });
          }
        );
    },
    "./node_modules/@mui/material/utils/capitalize.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__(
        "./node_modules/@mui/utils/esm/capitalize/capitalize.js"
      ).Z;
    },
    "./node_modules/@mui/material/utils/createSimplePaletteValueFilter.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      function createSimplePaletteValueFilter(
        additionalPropertiesToCheck = []
      ) {
        return ([, value]) =>
          value &&
          (function checkSimplePaletteColorValues(
            obj,
            additionalPropertiesToCheck = []
          ) {
            if (
              !(function hasCorrectMainProperty(obj) {
                return "string" == typeof obj.main;
              })(obj)
            )
              return !1;
            for (const value of additionalPropertiesToCheck)
              if (!obj.hasOwnProperty(value) || "string" != typeof obj[value])
                return !1;
            return !0;
          })(value, additionalPropertiesToCheck);
      }
      __webpack_require__.d(__webpack_exports__, {
        Z: () => createSimplePaletteValueFilter,
      });
    },
    "./node_modules/@mui/material/zero-styled/index.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        zY: () => globalCss,
        u7: () => internal_createExtendSxProp,
      });
      __webpack_require__("./node_modules/next/dist/compiled/react/index.js");
      var extendSxProp = __webpack_require__(
          "./node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"
        ),
        GlobalStyles = __webpack_require__(
          "./node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js"
        ),
        useTheme = __webpack_require__(
          "./node_modules/@mui/system/esm/useTheme/useTheme.js"
        ),
        jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      const esm_GlobalStyles_GlobalStyles = function GlobalStyles_GlobalStyles({
        styles,
        themeId,
        defaultTheme = {},
      }) {
        const upperTheme = (0, useTheme.Z)(defaultTheme),
          globalStyles =
            "function" == typeof styles
              ? styles((themeId && upperTheme[themeId]) || upperTheme)
              : styles;
        return (0, jsx_runtime.jsx)(GlobalStyles.Z, { styles: globalStyles });
      };
      var defaultTheme = __webpack_require__(
          "./node_modules/@mui/material/styles/defaultTheme.js"
        ),
        identifier = __webpack_require__(
          "./node_modules/@mui/material/styles/identifier.js"
        );
      const material_GlobalStyles_GlobalStyles =
        function GlobalStyles_GlobalStyles_GlobalStyles(props) {
          return (0, jsx_runtime.jsx)(esm_GlobalStyles_GlobalStyles, {
            ...props,
            defaultTheme: defaultTheme.Z,
            themeId: identifier.Z,
          });
        };
      function globalCss(styles) {
        return function GlobalStylesWrapper(props) {
          return (0, jsx_runtime.jsx)(material_GlobalStyles_GlobalStyles, {
            styles:
              "function" == typeof styles
                ? (theme) => styles({ theme, ...props })
                : styles,
          });
        };
      }
      function internal_createExtendSxProp() {
        return extendSxProp.Z;
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
    "./src/theme/typography.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          TextVariants: () => TextVariants,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/material/Typography/Typography.js"
          ),
        _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./node_modules/@mui/material/Box/Box.js");
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: "Typography",
          component:
            _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
        },
        TextVariants = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_2__.Z,
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1.875em",
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "h1", children: "Heading 1" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "h2", children: "Heading 2" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "h3", children: "Heading 3" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "h4", children: "Heading 4" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "body1", children: "Body 1" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "body1Bold", children: "Body 1 Bold" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "body2", children: "Body 2" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "button", children: "Button" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "caption", children: "Caption" }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Box_Typography_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,
                  { variant: "overline", children: "Overline" }
                ),
              ],
            }
          ),
        __namedExportsOrder = ["TextVariants"];
      TextVariants.parameters = {
        ...TextVariants.parameters,
        docs: {
          ...TextVariants.parameters?.docs,
          source: {
            originalSource:
              '() => <Box display="flex" flexDirection="column" alignItems="flex-start" gap="1.875em">\r\n    <Typography variant="h1">Heading 1</Typography>\r\n    <Typography variant="h2">Heading 2</Typography>\r\n    <Typography variant="h3">Heading 3</Typography>\r\n    <Typography variant="h4">Heading 4</Typography>\r\n    <Typography variant="body1">Body 1</Typography>\r\n    <Typography variant="body1Bold">Body 1 Bold</Typography>\r\n    <Typography variant="body2">Body 2</Typography>\r\n    <Typography variant="button">Button</Typography>\r\n    <Typography variant="caption">Caption</Typography>\r\n    <Typography variant="overline">Overline</Typography>\r\n  </Box>',
            ...TextVariants.parameters?.docs?.source,
          },
        },
      };
    },
  },
]);
