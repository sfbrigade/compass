(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [402],
  {
    "./node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        Z: () => Breadcrumbs_Breadcrumbs,
      });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        useSlotProps = __webpack_require__(
          "./node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        Typography = __webpack_require__(
          "./node_modules/@mui/material/Typography/Typography.js"
        ),
        colorManipulator = __webpack_require__(
          "./node_modules/@mui/system/esm/colorManipulator/colorManipulator.js"
        ),
        memoTheme = __webpack_require__(
          "./node_modules/@mui/material/utils/memoTheme.js"
        ),
        createSvgIcon = __webpack_require__(
          "./node_modules/@mui/material/utils/createSvgIcon.js"
        ),
        jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        );
      const MoreHoriz = (0, createSvgIcon.Z)(
        (0, jsx_runtime.jsx)("path", {
          d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
        }),
        "MoreHoriz"
      );
      var ButtonBase = __webpack_require__(
        "./node_modules/@mui/material/ButtonBase/ButtonBase.js"
      );
      const BreadcrumbCollapsedButton = (0, styled.ZP)(ButtonBase.Z)(
          (0, memoTheme.Z)(({ theme }) => ({
            display: "flex",
            marginLeft: `calc(${theme.spacing(1)} * 0.5)`,
            marginRight: `calc(${theme.spacing(1)} * 0.5)`,
            ...("light" === theme.palette.mode
              ? {
                  backgroundColor: theme.palette.grey[100],
                  color: theme.palette.grey[700],
                }
              : {
                  backgroundColor: theme.palette.grey[700],
                  color: theme.palette.grey[100],
                }),
            borderRadius: 2,
            "&:hover, &:focus": {
              ...("light" === theme.palette.mode
                ? { backgroundColor: theme.palette.grey[200] }
                : { backgroundColor: theme.palette.grey[600] }),
            },
            "&:active": {
              boxShadow: theme.shadows[0],
              ...("light" === theme.palette.mode
                ? {
                    backgroundColor: (0, colorManipulator._4)(
                      theme.palette.grey[200],
                      0.12
                    ),
                  }
                : {
                    backgroundColor: (0, colorManipulator._4)(
                      theme.palette.grey[600],
                      0.12
                    ),
                  }),
            },
          }))
        ),
        BreadcrumbCollapsedIcon = (0, styled.ZP)(MoreHoriz)({
          width: 24,
          height: 16,
        });
      const Breadcrumbs_BreadcrumbCollapsed = function BreadcrumbCollapsed(
        props
      ) {
        const { slots = {}, slotProps = {}, ...otherProps } = props,
          ownerState = props;
        return (0, jsx_runtime.jsx)("li", {
          children: (0, jsx_runtime.jsx)(BreadcrumbCollapsedButton, {
            focusRipple: !0,
            ...otherProps,
            ownerState,
            children: (0, jsx_runtime.jsx)(BreadcrumbCollapsedIcon, {
              as: slots.CollapsedIcon,
              ownerState,
              ...slotProps.collapsedIcon,
            }),
          }),
        });
      };
      var generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getBreadcrumbsUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiBreadcrumbs", slot);
      }
      const Breadcrumbs_breadcrumbsClasses = (0, generateUtilityClasses.Z)(
          "MuiBreadcrumbs",
          ["root", "ol", "li", "separator"]
        ),
        BreadcrumbsRoot = (0, styled.ZP)(Typography.Z, {
          name: "MuiBreadcrumbs",
          slot: "Root",
          overridesResolver: (props, styles) => [
            { [`& .${Breadcrumbs_breadcrumbsClasses.li}`]: styles.li },
            styles.root,
          ],
        })({}),
        BreadcrumbsOl = (0, styled.ZP)("ol", {
          name: "MuiBreadcrumbs",
          slot: "Ol",
          overridesResolver: (props, styles) => styles.ol,
        })({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: 0,
          margin: 0,
          listStyle: "none",
        }),
        BreadcrumbsSeparator = (0, styled.ZP)("li", {
          name: "MuiBreadcrumbs",
          slot: "Separator",
          overridesResolver: (props, styles) => styles.separator,
        })({
          display: "flex",
          userSelect: "none",
          marginLeft: 8,
          marginRight: 8,
        });
      function insertSeparators(items, className, separator, ownerState) {
        return items.reduce(
          (acc, current, index) => (
            index < items.length - 1
              ? (acc = acc.concat(
                  current,
                  (0, jsx_runtime.jsx)(
                    BreadcrumbsSeparator,
                    {
                      "aria-hidden": !0,
                      className,
                      ownerState,
                      children: separator,
                    },
                    `separator-${index}`
                  )
                ))
              : acc.push(current),
            acc
          ),
          []
        );
      }
      const Breadcrumbs_Breadcrumbs = react.forwardRef(
        function Breadcrumbs(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiBreadcrumbs",
            }),
            {
              children,
              className,
              component = "nav",
              slots = {},
              slotProps = {},
              expandText = "Show path",
              itemsAfterCollapse = 1,
              itemsBeforeCollapse = 1,
              maxItems = 8,
              separator = "/",
              ...other
            } = props,
            [expanded, setExpanded] = react.useState(!1),
            ownerState = {
              ...props,
              component,
              expanded,
              expandText,
              itemsAfterCollapse,
              itemsBeforeCollapse,
              maxItems,
              separator,
            },
            classes = ((ownerState) => {
              const { classes } = ownerState;
              return (0, composeClasses.Z)(
                {
                  root: ["root"],
                  li: ["li"],
                  ol: ["ol"],
                  separator: ["separator"],
                },
                getBreadcrumbsUtilityClass,
                classes
              );
            })(ownerState),
            collapsedIconSlotProps = (0, useSlotProps.Z)({
              elementType: slots.CollapsedIcon,
              externalSlotProps: slotProps.collapsedIcon,
              ownerState,
            }),
            listRef = react.useRef(null),
            allItems = react.Children.toArray(children)
              .filter((child) => react.isValidElement(child))
              .map((child, index) =>
                (0, jsx_runtime.jsx)(
                  "li",
                  { className: classes.li, children: child },
                  `child-${index}`
                )
              );
          return (0, jsx_runtime.jsx)(BreadcrumbsRoot, {
            ref,
            component,
            color: "textSecondary",
            className: (0, clsx.Z)(classes.root, className),
            ownerState,
            ...other,
            children: (0, jsx_runtime.jsx)(BreadcrumbsOl, {
              className: classes.ol,
              ref: listRef,
              ownerState,
              children: insertSeparators(
                expanded || (maxItems && allItems.length <= maxItems)
                  ? allItems
                  : ((allItems) =>
                      itemsBeforeCollapse + itemsAfterCollapse >=
                      allItems.length
                        ? allItems
                        : [
                            ...allItems.slice(0, itemsBeforeCollapse),
                            (0, jsx_runtime.jsx)(
                              Breadcrumbs_BreadcrumbCollapsed,
                              {
                                "aria-label": expandText,
                                slots: { CollapsedIcon: slots.CollapsedIcon },
                                slotProps: {
                                  collapsedIcon: collapsedIconSlotProps,
                                },
                                onClick: () => {
                                  setExpanded(!0);
                                  const focusable =
                                    listRef.current.querySelector(
                                      "a[href],button,[tabindex]"
                                    );
                                  focusable && focusable.focus();
                                },
                              },
                              "ellipsis"
                            ),
                            ...allItems.slice(
                              allItems.length - itemsAfterCollapse,
                              allItems.length
                            ),
                          ])(allItems),
                classes.separator,
                separator,
                ownerState
              ),
            }),
          });
        }
      );
    },
    "./node_modules/@mui/material/Typography/Typography.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
    "./node_modules/@mui/material/utils/createSimplePaletteValueFilter.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
    "./node_modules/@mui/material/utils/createSvgIcon.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
    "./node_modules/@mui/material/zero-styled/index.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
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
      "use strict";
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
      "use strict";
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
    "./node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        Z: () => appendOwnerState_appendOwnerState,
      });
      const isHostComponent_isHostComponent = function isHostComponent(
        element
      ) {
        return "string" == typeof element;
      };
      const appendOwnerState_appendOwnerState = function appendOwnerState(
        elementType,
        otherProps,
        ownerState
      ) {
        return void 0 === elementType ||
          isHostComponent_isHostComponent(elementType)
          ? otherProps
          : {
              ...otherProps,
              ownerState: { ...otherProps.ownerState, ...ownerState },
            };
      };
    },
    "./node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
          Z: () => __WEBPACK_DEFAULT_EXPORT__,
        });
        const __WEBPACK_DEFAULT_EXPORT__ = function extractEventHandlers(
          object,
          excludeKeys = []
        ) {
          if (void 0 === object) return {};
          const result = {};
          return (
            Object.keys(object)
              .filter(
                (prop) =>
                  prop.match(/^on[A-Z]/) &&
                  "function" == typeof object[prop] &&
                  !excludeKeys.includes(prop)
              )
              .forEach((prop) => {
                result[prop] = object[prop];
              }),
            result
          );
        };
      },
    "./node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        Z: () => mergeSlotProps_mergeSlotProps,
      });
      var clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        extractEventHandlers = __webpack_require__(
          "./node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js"
        );
      const omitEventHandlers_omitEventHandlers = function omitEventHandlers(
        object
      ) {
        if (void 0 === object) return {};
        const result = {};
        return (
          Object.keys(object)
            .filter(
              (prop) =>
                !(prop.match(/^on[A-Z]/) && "function" == typeof object[prop])
            )
            .forEach((prop) => {
              result[prop] = object[prop];
            }),
          result
        );
      };
      const mergeSlotProps_mergeSlotProps = function mergeSlotProps(
        parameters
      ) {
        const {
          getSlotProps,
          additionalProps,
          externalSlotProps,
          externalForwardedProps,
          className,
        } = parameters;
        if (!getSlotProps) {
          const joinedClasses = (0, clsx.Z)(
              additionalProps?.className,
              className,
              externalForwardedProps?.className,
              externalSlotProps?.className
            ),
            mergedStyle = {
              ...additionalProps?.style,
              ...externalForwardedProps?.style,
              ...externalSlotProps?.style,
            },
            props = {
              ...additionalProps,
              ...externalForwardedProps,
              ...externalSlotProps,
            };
          return (
            joinedClasses.length > 0 && (props.className = joinedClasses),
            Object.keys(mergedStyle).length > 0 && (props.style = mergedStyle),
            { props, internalRef: void 0 }
          );
        }
        const eventHandlers = (0, extractEventHandlers.Z)({
            ...externalForwardedProps,
            ...externalSlotProps,
          }),
          componentsPropsWithoutEventHandlers =
            omitEventHandlers_omitEventHandlers(externalSlotProps),
          otherPropsWithoutEventHandlers = omitEventHandlers_omitEventHandlers(
            externalForwardedProps
          ),
          internalSlotProps = getSlotProps(eventHandlers),
          joinedClasses = (0, clsx.Z)(
            internalSlotProps?.className,
            additionalProps?.className,
            className,
            externalForwardedProps?.className,
            externalSlotProps?.className
          ),
          mergedStyle = {
            ...internalSlotProps?.style,
            ...additionalProps?.style,
            ...externalForwardedProps?.style,
            ...externalSlotProps?.style,
          },
          props = {
            ...internalSlotProps,
            ...additionalProps,
            ...otherPropsWithoutEventHandlers,
            ...componentsPropsWithoutEventHandlers,
          };
        return (
          joinedClasses.length > 0 && (props.className = joinedClasses),
          Object.keys(mergedStyle).length > 0 && (props.style = mergedStyle),
          { props, internalRef: internalSlotProps.ref }
        );
      };
    },
    "./node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
          Z: () => __WEBPACK_DEFAULT_EXPORT__,
        });
        const __WEBPACK_DEFAULT_EXPORT__ = function resolveComponentProps(
          componentProps,
          ownerState,
          slotState
        ) {
          return "function" == typeof componentProps
            ? componentProps(ownerState, slotState)
            : componentProps;
        };
      },
    "./node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var _useForkRef_index_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/useForkRef/useForkRef.js"
          ),
        _appendOwnerState_index_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js"
          ),
        _mergeSlotProps_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js"
          ),
        _resolveComponentProps_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js"
          );
      const __WEBPACK_DEFAULT_EXPORT__ = function useSlotProps(parameters) {
        const {
            elementType,
            externalSlotProps,
            ownerState,
            skipResolvingSlotProps = !1,
            ...other
          } = parameters,
          resolvedComponentsProps = skipResolvingSlotProps
            ? {}
            : (0,
              _resolveComponentProps_index_js__WEBPACK_IMPORTED_MODULE_0__.Z)(
                externalSlotProps,
                ownerState
              ),
          { props: mergedProps, internalRef } = (0,
          _mergeSlotProps_index_js__WEBPACK_IMPORTED_MODULE_1__.Z)({
            ...other,
            externalSlotProps: resolvedComponentsProps,
          }),
          ref = (0, _useForkRef_index_js__WEBPACK_IMPORTED_MODULE_2__.Z)(
            internalRef,
            resolvedComponentsProps?.ref,
            parameters.additionalProps?.ref
          );
        return (0, _appendOwnerState_index_js__WEBPACK_IMPORTED_MODULE_3__.Z)(
          elementType,
          { ...mergedProps, ref },
          ownerState
        );
      };
    },
    "./node_modules/next/dist/client/components/router-reducer/router-reducer-types.js":
      (module, exports) => {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (function _export(target, all) {
            for (var name in all)
              Object.defineProperty(target, name, {
                enumerable: !0,
                get: all[name],
              });
          })(exports, {
            ACTION_FAST_REFRESH: function () {
              return ACTION_FAST_REFRESH;
            },
            ACTION_NAVIGATE: function () {
              return ACTION_NAVIGATE;
            },
            ACTION_PREFETCH: function () {
              return ACTION_PREFETCH;
            },
            ACTION_REFRESH: function () {
              return ACTION_REFRESH;
            },
            ACTION_RESTORE: function () {
              return ACTION_RESTORE;
            },
            ACTION_SERVER_ACTION: function () {
              return ACTION_SERVER_ACTION;
            },
            ACTION_SERVER_PATCH: function () {
              return ACTION_SERVER_PATCH;
            },
            PrefetchCacheEntryStatus: function () {
              return PrefetchCacheEntryStatus;
            },
            PrefetchKind: function () {
              return PrefetchKind;
            },
            isThenable: function () {
              return isThenable;
            },
          });
        const ACTION_REFRESH = "refresh",
          ACTION_NAVIGATE = "navigate",
          ACTION_RESTORE = "restore",
          ACTION_SERVER_PATCH = "server-patch",
          ACTION_PREFETCH = "prefetch",
          ACTION_FAST_REFRESH = "fast-refresh",
          ACTION_SERVER_ACTION = "server-action";
        var PrefetchKind, PrefetchCacheEntryStatus;
        function isThenable(value) {
          return (
            value &&
            ("object" == typeof value || "function" == typeof value) &&
            "function" == typeof value.then
          );
        }
        !(function (PrefetchKind) {
          (PrefetchKind.AUTO = "auto"),
            (PrefetchKind.FULL = "full"),
            (PrefetchKind.TEMPORARY = "temporary");
        })(PrefetchKind || (PrefetchKind = {})),
          (function (PrefetchCacheEntryStatus) {
            (PrefetchCacheEntryStatus.fresh = "fresh"),
              (PrefetchCacheEntryStatus.reusable = "reusable"),
              (PrefetchCacheEntryStatus.expired = "expired"),
              (PrefetchCacheEntryStatus.stale = "stale");
          })(PrefetchCacheEntryStatus || (PrefetchCacheEntryStatus = {})),
          ("function" == typeof exports.default ||
            ("object" == typeof exports.default && null !== exports.default)) &&
            void 0 === exports.default.__esModule &&
            (Object.defineProperty(exports.default, "__esModule", {
              value: !0,
            }),
            Object.assign(exports.default, exports),
            (module.exports = exports.default));
      },
    "./node_modules/next/dist/client/get-domain-locale.js": (
      module,
      exports,
      __webpack_require__
    ) => {
      "use strict";
      var process = __webpack_require__("./node_modules/process/browser.js");
      Object.defineProperty(exports, "__esModule", { value: !0 }),
        Object.defineProperty(exports, "getDomainLocale", {
          enumerable: !0,
          get: function () {
            return getDomainLocale;
          },
        });
      const _normalizetrailingslash = __webpack_require__(
          "./node_modules/next/dist/client/normalize-trailing-slash.js"
        ),
        basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
      function getDomainLocale(path, locale, locales, domainLocales) {
        if (process.env.__NEXT_I18N_SUPPORT) {
          const normalizeLocalePath = __webpack_require__(
              "./node_modules/next/dist/client/normalize-locale-path.js"
            ).normalizeLocalePath,
            detectDomainLocale = __webpack_require__(
              "./node_modules/next/dist/client/detect-domain-locale.js"
            ).detectDomainLocale,
            target =
              locale || normalizeLocalePath(path, locales).detectedLocale,
            domain = detectDomainLocale(domainLocales, void 0, target);
          if (domain) {
            const proto = "http" + (domain.http ? "" : "s") + "://",
              finalLocale = target === domain.defaultLocale ? "" : "/" + target;
            return (
              "" +
              proto +
              domain.domain +
              (0, _normalizetrailingslash.normalizePathTrailingSlash)(
                "" + basePath + finalLocale + path
              )
            );
          }
          return !1;
        }
        return !1;
      }
      ("function" == typeof exports.default ||
        ("object" == typeof exports.default && null !== exports.default)) &&
        void 0 === exports.default.__esModule &&
        (Object.defineProperty(exports.default, "__esModule", { value: !0 }),
        Object.assign(exports.default, exports),
        (module.exports = exports.default));
    },
    "./node_modules/next/dist/client/link.js": (
      module,
      exports,
      __webpack_require__
    ) => {
      var process = __webpack_require__("./node_modules/process/browser.js");
      Object.defineProperty(exports, "__esModule", { value: !0 }),
        Object.defineProperty(exports, "default", {
          enumerable: !0,
          get: function () {
            return _default;
          },
        });
      const _interop_require_default = __webpack_require__(
          "./node_modules/@swc/helpers/cjs/_interop_require_default.cjs"
        ),
        _jsxruntime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        _react = _interop_require_default._(
          __webpack_require__(
            "./node_modules/next/dist/compiled/react/index.js"
          )
        ),
        _resolvehref = __webpack_require__(
          "./node_modules/next/dist/client/resolve-href.js"
        ),
        _islocalurl = __webpack_require__(
          "./node_modules/next/dist/shared/lib/router/utils/is-local-url.js"
        ),
        _formaturl = __webpack_require__(
          "./node_modules/next/dist/shared/lib/router/utils/format-url.js"
        ),
        _utils = __webpack_require__(
          "./node_modules/next/dist/shared/lib/utils.js"
        ),
        _addlocale = __webpack_require__(
          "./node_modules/next/dist/client/add-locale.js"
        ),
        _routercontextsharedruntime = __webpack_require__(
          "./node_modules/next/dist/shared/lib/router-context.shared-runtime.js"
        ),
        _approutercontextsharedruntime = __webpack_require__(
          "./node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js"
        ),
        _useintersection = __webpack_require__(
          "./node_modules/next/dist/client/use-intersection.js"
        ),
        _getdomainlocale = __webpack_require__(
          "./node_modules/next/dist/client/get-domain-locale.js"
        ),
        _addbasepath = __webpack_require__(
          "./node_modules/next/dist/client/add-base-path.js"
        ),
        _routerreducertypes = __webpack_require__(
          "./node_modules/next/dist/client/components/router-reducer/router-reducer-types.js"
        ),
        prefetched = new Set();
      function prefetch(router, href, as, options, appOptions, isAppRouter) {
        if ("undefined" == typeof window) return;
        if (!isAppRouter && !(0, _islocalurl.isLocalURL)(href)) return;
        if (!options.bypassPrefetchedCheck) {
          const locale =
              void 0 !== options.locale
                ? options.locale
                : "locale" in router
                  ? router.locale
                  : void 0,
            prefetchedKey = href + "%" + as + "%" + locale;
          if (prefetched.has(prefetchedKey)) return;
          prefetched.add(prefetchedKey);
        }
        (async () =>
          isAppRouter
            ? router.prefetch(href, appOptions)
            : router.prefetch(href, as, options))().catch((err) => {
          0;
        });
      }
      function formatStringOrUrl(urlObjOrString) {
        return "string" == typeof urlObjOrString
          ? urlObjOrString
          : (0, _formaturl.formatUrl)(urlObjOrString);
      }
      const _default = _react.default.forwardRef(
        function LinkComponent(props, forwardedRef) {
          let children;
          const {
            href: hrefProp,
            as: asProp,
            children: childrenProp,
            prefetch: prefetchProp = null,
            passHref,
            replace,
            shallow,
            scroll,
            locale,
            onClick,
            onMouseEnter: onMouseEnterProp,
            onTouchStart: onTouchStartProp,
            legacyBehavior = !1,
            ...restProps
          } = props;
          (children = childrenProp),
            !legacyBehavior ||
              ("string" != typeof children && "number" != typeof children) ||
              (children = (0, _jsxruntime.jsx)("a", { children }));
          const pagesRouter = _react.default.useContext(
              _routercontextsharedruntime.RouterContext
            ),
            appRouter = _react.default.useContext(
              _approutercontextsharedruntime.AppRouterContext
            ),
            router = null != pagesRouter ? pagesRouter : appRouter,
            isAppRouter = !pagesRouter,
            prefetchEnabled = !1 !== prefetchProp,
            appPrefetchKind =
              null === prefetchProp
                ? _routerreducertypes.PrefetchKind.AUTO
                : _routerreducertypes.PrefetchKind.FULL;
          const { href, as } = _react.default.useMemo(() => {
              if (!pagesRouter) {
                const resolvedHref = formatStringOrUrl(hrefProp);
                return {
                  href: resolvedHref,
                  as: asProp ? formatStringOrUrl(asProp) : resolvedHref,
                };
              }
              const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(
                pagesRouter,
                hrefProp,
                !0
              );
              return {
                href: resolvedHref,
                as: asProp
                  ? (0, _resolvehref.resolveHref)(pagesRouter, asProp)
                  : resolvedAs || resolvedHref,
              };
            }, [pagesRouter, hrefProp, asProp]),
            previousHref = _react.default.useRef(href),
            previousAs = _react.default.useRef(as);
          let child;
          legacyBehavior && (child = _react.default.Children.only(children));
          const childRef = legacyBehavior
              ? child && "object" == typeof child && child.ref
              : forwardedRef,
            [setIntersectionRef, isVisible, resetVisible] = (0,
            _useintersection.useIntersection)({ rootMargin: "200px" }),
            setRef = _react.default.useCallback(
              (el) => {
                (previousAs.current === as && previousHref.current === href) ||
                  (resetVisible(),
                  (previousAs.current = as),
                  (previousHref.current = href)),
                  setIntersectionRef(el),
                  childRef &&
                    ("function" == typeof childRef
                      ? childRef(el)
                      : "object" == typeof childRef && (childRef.current = el));
              },
              [as, childRef, href, resetVisible, setIntersectionRef]
            );
          _react.default.useEffect(() => {
            router &&
              isVisible &&
              prefetchEnabled &&
              prefetch(
                router,
                href,
                as,
                { locale },
                { kind: appPrefetchKind },
                isAppRouter
              );
          }, [
            as,
            href,
            isVisible,
            locale,
            prefetchEnabled,
            null == pagesRouter ? void 0 : pagesRouter.locale,
            router,
            isAppRouter,
            appPrefetchKind,
          ]);
          const childProps = {
            ref: setRef,
            onClick(e) {
              legacyBehavior || "function" != typeof onClick || onClick(e),
                legacyBehavior &&
                  child.props &&
                  "function" == typeof child.props.onClick &&
                  child.props.onClick(e),
                router &&
                  (e.defaultPrevented ||
                    (function linkClicked(
                      e,
                      router,
                      href,
                      as,
                      replace,
                      shallow,
                      scroll,
                      locale,
                      isAppRouter
                    ) {
                      const { nodeName } = e.currentTarget;
                      if (
                        "A" === nodeName.toUpperCase() &&
                        ((function isModifiedEvent(event) {
                          const target =
                            event.currentTarget.getAttribute("target");
                          return (
                            (target && "_self" !== target) ||
                            event.metaKey ||
                            event.ctrlKey ||
                            event.shiftKey ||
                            event.altKey ||
                            (event.nativeEvent && 2 === event.nativeEvent.which)
                          );
                        })(e) ||
                          (!isAppRouter && !(0, _islocalurl.isLocalURL)(href)))
                      )
                        return;
                      e.preventDefault();
                      const navigate = () => {
                        const routerScroll = null == scroll || scroll;
                        "beforePopState" in router
                          ? router[replace ? "replace" : "push"](href, as, {
                              shallow,
                              locale,
                              scroll: routerScroll,
                            })
                          : router[replace ? "replace" : "push"](as || href, {
                              scroll: routerScroll,
                            });
                      };
                      isAppRouter
                        ? _react.default.startTransition(navigate)
                        : navigate();
                    })(
                      e,
                      router,
                      href,
                      as,
                      replace,
                      shallow,
                      scroll,
                      locale,
                      isAppRouter
                    ));
            },
            onMouseEnter(e) {
              legacyBehavior ||
                "function" != typeof onMouseEnterProp ||
                onMouseEnterProp(e),
                legacyBehavior &&
                  child.props &&
                  "function" == typeof child.props.onMouseEnter &&
                  child.props.onMouseEnter(e),
                router &&
                  ((!prefetchEnabled && isAppRouter) ||
                    prefetch(
                      router,
                      href,
                      as,
                      { locale, priority: !0, bypassPrefetchedCheck: !0 },
                      { kind: appPrefetchKind },
                      isAppRouter
                    ));
            },
            onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START
              ? void 0
              : function onTouchStart(e) {
                  legacyBehavior ||
                    "function" != typeof onTouchStartProp ||
                    onTouchStartProp(e),
                    legacyBehavior &&
                      child.props &&
                      "function" == typeof child.props.onTouchStart &&
                      child.props.onTouchStart(e),
                    router &&
                      ((!prefetchEnabled && isAppRouter) ||
                        prefetch(
                          router,
                          href,
                          as,
                          { locale, priority: !0, bypassPrefetchedCheck: !0 },
                          { kind: appPrefetchKind },
                          isAppRouter
                        ));
                },
          };
          if ((0, _utils.isAbsoluteUrl)(as)) childProps.href = as;
          else if (
            !legacyBehavior ||
            passHref ||
            ("a" === child.type && !("href" in child.props))
          ) {
            const curLocale =
                void 0 !== locale
                  ? locale
                  : null == pagesRouter
                    ? void 0
                    : pagesRouter.locale,
              localeDomain =
                (null == pagesRouter ? void 0 : pagesRouter.isLocaleDomain) &&
                (0, _getdomainlocale.getDomainLocale)(
                  as,
                  curLocale,
                  null == pagesRouter ? void 0 : pagesRouter.locales,
                  null == pagesRouter ? void 0 : pagesRouter.domainLocales
                );
            childProps.href =
              localeDomain ||
              (0, _addbasepath.addBasePath)(
                (0, _addlocale.addLocale)(
                  as,
                  curLocale,
                  null == pagesRouter ? void 0 : pagesRouter.defaultLocale
                )
              );
          }
          return legacyBehavior
            ? _react.default.cloneElement(child, childProps)
            : (0, _jsxruntime.jsx)("a", {
                ...restProps,
                ...childProps,
                children,
              });
        }
      );
      ("function" == typeof exports.default ||
        ("object" == typeof exports.default && null !== exports.default)) &&
        void 0 === exports.default.__esModule &&
        (Object.defineProperty(exports.default, "__esModule", { value: !0 }),
        Object.assign(exports.default, exports),
        (module.exports = exports.default));
    },
    "./node_modules/next/dist/client/normalize-locale-path.js": (
      module,
      exports,
      __webpack_require__
    ) => {
      "use strict";
      var process = __webpack_require__("./node_modules/process/browser.js");
      Object.defineProperty(exports, "__esModule", { value: !0 }),
        Object.defineProperty(exports, "normalizeLocalePath", {
          enumerable: !0,
          get: function () {
            return normalizeLocalePath;
          },
        });
      const normalizeLocalePath = (pathname, locales) =>
        process.env.__NEXT_I18N_SUPPORT
          ? __webpack_require__(
              "./node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js"
            ).normalizeLocalePath(pathname, locales)
          : { pathname, detectedLocale: void 0 };
      ("function" == typeof exports.default ||
        ("object" == typeof exports.default && null !== exports.default)) &&
        void 0 === exports.default.__esModule &&
        (Object.defineProperty(exports.default, "__esModule", { value: !0 }),
        Object.assign(exports.default, exports),
        (module.exports = exports.default));
    },
    "./node_modules/next/dist/client/use-intersection.js": (
      module,
      exports,
      __webpack_require__
    ) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: !0 }),
        Object.defineProperty(exports, "useIntersection", {
          enumerable: !0,
          get: function () {
            return useIntersection;
          },
        });
      const _react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _requestidlecallback = __webpack_require__(
          "./node_modules/next/dist/client/request-idle-callback.js"
        ),
        hasIntersectionObserver = "function" == typeof IntersectionObserver,
        observers = new Map(),
        idList = [];
      function observe(element, callback, options) {
        const { id, observer, elements } = (function createObserver(options) {
          const id = {
              root: options.root || null,
              margin: options.rootMargin || "",
            },
            existing = idList.find(
              (obj) => obj.root === id.root && obj.margin === id.margin
            );
          let instance;
          if (existing && ((instance = observers.get(existing)), instance))
            return instance;
          const elements = new Map(),
            observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                const callback = elements.get(entry.target),
                  isVisible =
                    entry.isIntersecting || entry.intersectionRatio > 0;
                callback && isVisible && callback(isVisible);
              });
            }, options);
          return (
            (instance = { id, observer, elements }),
            idList.push(id),
            observers.set(id, instance),
            instance
          );
        })(options);
        return (
          elements.set(element, callback),
          observer.observe(element),
          function unobserve() {
            if (
              (elements.delete(element),
              observer.unobserve(element),
              0 === elements.size)
            ) {
              observer.disconnect(), observers.delete(id);
              const index = idList.findIndex(
                (obj) => obj.root === id.root && obj.margin === id.margin
              );
              index > -1 && idList.splice(index, 1);
            }
          }
        );
      }
      function useIntersection(param) {
        let { rootRef, rootMargin, disabled } = param;
        const isDisabled = disabled || !hasIntersectionObserver,
          [visible, setVisible] = (0, _react.useState)(!1),
          elementRef = (0, _react.useRef)(null),
          setElement = (0, _react.useCallback)((element) => {
            elementRef.current = element;
          }, []);
        (0, _react.useEffect)(() => {
          if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            const element = elementRef.current;
            if (element && element.tagName) {
              return observe(
                element,
                (isVisible) => isVisible && setVisible(isVisible),
                { root: null == rootRef ? void 0 : rootRef.current, rootMargin }
              );
            }
          } else if (!visible) {
            const idleCallback = (0, _requestidlecallback.requestIdleCallback)(
              () => setVisible(!0)
            );
            return () =>
              (0, _requestidlecallback.cancelIdleCallback)(idleCallback);
          }
        }, [isDisabled, rootMargin, rootRef, visible, elementRef.current]);
        const resetVisible = (0, _react.useCallback)(() => {
          setVisible(!1);
        }, []);
        return [setElement, visible, resetVisible];
      }
      ("function" == typeof exports.default ||
        ("object" == typeof exports.default && null !== exports.default)) &&
        void 0 === exports.default.__esModule &&
        (Object.defineProperty(exports.default, "__esModule", { value: !0 }),
        Object.assign(exports.default, exports),
        (module.exports = exports.default));
    },
    "./node_modules/next/link.js": (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      module.exports = __webpack_require__(
        "./node_modules/next/dist/client/link.js"
      );
    },
  },
]);
