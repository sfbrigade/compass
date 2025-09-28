/*! For license information please see components-design_system-button-ButtonIcon-stories.cda8c71b.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [642],
  {
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
    "./node_modules/@mui/material/utils/useSlot.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.d(__webpack_exports__, { Z: () => useSlot });
      var _mui_utils_useForkRef__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/useForkRef/useForkRef.js"
          ),
        _mui_utils_appendOwnerState__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js"
          ),
        _mui_utils_resolveComponentProps__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js"
          ),
        _mui_utils_mergeSlotProps__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            "./node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js"
          );
      function useSlot(name, parameters) {
        const {
            className,
            elementType: initialElementType,
            ownerState,
            externalForwardedProps,
            internalForwardedProps,
            shouldForwardComponentProp = !1,
            ...useSlotPropsParams
          } = parameters,
          {
            component: rootComponent,
            slots = { [name]: void 0 },
            slotProps = { [name]: void 0 },
            ...other
          } = externalForwardedProps,
          elementType = slots[name] || initialElementType,
          resolvedComponentsProps = (0,
          _mui_utils_resolveComponentProps__WEBPACK_IMPORTED_MODULE_0__.Z)(
            slotProps[name],
            ownerState
          ),
          {
            props: { component: slotComponent, ...mergedProps },
            internalRef,
          } = (0, _mui_utils_mergeSlotProps__WEBPACK_IMPORTED_MODULE_1__.Z)({
            className,
            ...useSlotPropsParams,
            externalForwardedProps: "root" === name ? other : void 0,
            externalSlotProps: resolvedComponentsProps,
          }),
          ref = (0, _mui_utils_useForkRef__WEBPACK_IMPORTED_MODULE_2__.Z)(
            internalRef,
            resolvedComponentsProps?.ref,
            parameters.ref
          ),
          LeafComponent =
            "root" === name ? slotComponent || rootComponent : slotComponent;
        return [
          elementType,
          (0, _mui_utils_appendOwnerState__WEBPACK_IMPORTED_MODULE_3__.Z)(
            elementType,
            {
              ...("root" === name &&
                !rootComponent &&
                !slots[name] &&
                internalForwardedProps),
              ...("root" !== name && !slots[name] && internalForwardedProps),
              ...mergedProps,
              ...(LeafComponent &&
                !shouldForwardComponentProp && { as: LeafComponent }),
              ...(LeafComponent &&
                shouldForwardComponentProp && { component: LeafComponent }),
              ref,
            },
            ownerState
          ),
        ];
      }
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
    "./src/components/design_system/button/ButtonIcon.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => ButtonIcon_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        createSvgIcon = __webpack_require__(
          "./node_modules/@mui/material/utils/createSvgIcon.js"
        );
      const AccessAlarm = (0, createSvgIcon.Z)(
        (0, jsx_runtime.jsx)("path", {
          d: "m22 5.72-4.6-3.86-1.29 1.53 4.6 3.86zM7.88 3.39 6.6 1.86 2 5.71l1.29 1.53zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9m0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7",
        }),
        "AccessAlarm"
      );
      var ButtonBase = __webpack_require__(
          "./node_modules/@mui/material/ButtonBase/ButtonBase.js"
        ),
        react = __webpack_require__(
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
        );
      const Person = (0, createSvgIcon.Z)(
        (0, jsx_runtime.jsx)("path", {
          d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
        }),
        "Person"
      );
      var generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getAvatarUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiAvatar", slot);
      }
      (0, generateUtilityClasses.Z)("MuiAvatar", [
        "root",
        "colorDefault",
        "circular",
        "rounded",
        "square",
        "img",
        "fallback",
      ]);
      var useSlot = __webpack_require__(
        "./node_modules/@mui/material/utils/useSlot.js"
      );
      const AvatarRoot = (0, styled.ZP)("div", {
          name: "MuiAvatar",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              styles[ownerState.variant],
              ownerState.colorDefault && styles.colorDefault,
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 40,
            height: 40,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.pxToRem(20),
            lineHeight: 1,
            borderRadius: "50%",
            overflow: "hidden",
            userSelect: "none",
            variants: [
              {
                props: { variant: "rounded" },
                style: {
                  borderRadius: (theme.vars || theme).shape.borderRadius,
                },
              },
              { props: { variant: "square" }, style: { borderRadius: 0 } },
              {
                props: { colorDefault: !0 },
                style: {
                  color: (theme.vars || theme).palette.background.default,
                  ...(theme.vars
                    ? { backgroundColor: theme.vars.palette.Avatar.defaultBg }
                    : {
                        backgroundColor: theme.palette.grey[400],
                        ...theme.applyStyles("dark", {
                          backgroundColor: theme.palette.grey[600],
                        }),
                      }),
                },
              },
            ],
          }))
        ),
        AvatarImg = (0, styled.ZP)("img", {
          name: "MuiAvatar",
          slot: "Img",
          overridesResolver: (props, styles) => styles.img,
        })({
          width: "100%",
          height: "100%",
          textAlign: "center",
          objectFit: "cover",
          color: "transparent",
          textIndent: 1e4,
        }),
        AvatarFallback = (0, styled.ZP)(Person, {
          name: "MuiAvatar",
          slot: "Fallback",
          overridesResolver: (props, styles) => styles.fallback,
        })({ width: "75%", height: "75%" });
      const Avatar_Avatar = react.forwardRef(function Avatar(inProps, ref) {
        const props = (0, DefaultPropsProvider.i)({
            props: inProps,
            name: "MuiAvatar",
          }),
          {
            alt,
            children: childrenProp,
            className,
            component = "div",
            slots = {},
            slotProps = {},
            imgProps,
            sizes,
            src,
            srcSet,
            variant = "circular",
            ...other
          } = props;
        let children = null;
        const ownerState = { ...props, component, variant },
          loaded = (function useLoaded({
            crossOrigin,
            referrerPolicy,
            src,
            srcSet,
          }) {
            const [loaded, setLoaded] = react.useState(!1);
            return (
              react.useEffect(() => {
                if (!src && !srcSet) return;
                setLoaded(!1);
                let active = !0;
                const image = new Image();
                return (
                  (image.onload = () => {
                    active && setLoaded("loaded");
                  }),
                  (image.onerror = () => {
                    active && setLoaded("error");
                  }),
                  (image.crossOrigin = crossOrigin),
                  (image.referrerPolicy = referrerPolicy),
                  (image.src = src),
                  srcSet && (image.srcset = srcSet),
                  () => {
                    active = !1;
                  }
                );
              }, [crossOrigin, referrerPolicy, src, srcSet]),
              loaded
            );
          })({
            ...imgProps,
            ...("function" == typeof slotProps.img
              ? slotProps.img(ownerState)
              : slotProps.img),
            src,
            srcSet,
          }),
          hasImg = src || srcSet,
          hasImgNotFailing = hasImg && "error" !== loaded;
        (ownerState.colorDefault = !hasImgNotFailing),
          delete ownerState.ownerState;
        const classes = ((ownerState) => {
            const { classes, variant, colorDefault } = ownerState,
              slots = {
                root: ["root", variant, colorDefault && "colorDefault"],
                img: ["img"],
                fallback: ["fallback"],
              };
            return (0, composeClasses.Z)(slots, getAvatarUtilityClass, classes);
          })(ownerState),
          [ImgSlot, imgSlotProps] = (0, useSlot.Z)("img", {
            className: classes.img,
            elementType: AvatarImg,
            externalForwardedProps: {
              slots,
              slotProps: { img: { ...imgProps, ...slotProps.img } },
            },
            additionalProps: { alt, src, srcSet, sizes },
            ownerState,
          });
        return (
          (children = hasImgNotFailing
            ? (0, jsx_runtime.jsx)(ImgSlot, { ...imgSlotProps })
            : childrenProp || 0 === childrenProp
              ? childrenProp
              : hasImg && alt
                ? alt[0]
                : (0, jsx_runtime.jsx)(AvatarFallback, {
                    ownerState,
                    className: classes.fallback,
                  })),
          (0, jsx_runtime.jsx)(AvatarRoot, {
            as: component,
            className: (0, clsx.Z)(classes.root, className),
            ref,
            ...other,
            ownerState,
            children,
          })
        );
      });
      var classnames = __webpack_require__(
          "./node_modules/classnames/index.js"
        ),
        classnames_default = __webpack_require__.n(classnames),
        injectStylesIntoStyleTag = __webpack_require__(
          "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
        ),
        injectStylesIntoStyleTag_default = __webpack_require__.n(
          injectStylesIntoStyleTag
        ),
        styleDomAPI = __webpack_require__(
          "./node_modules/style-loader/dist/runtime/styleDomAPI.js"
        ),
        styleDomAPI_default = __webpack_require__.n(styleDomAPI),
        insertBySelector = __webpack_require__(
          "./node_modules/style-loader/dist/runtime/insertBySelector.js"
        ),
        insertBySelector_default = __webpack_require__.n(insertBySelector),
        setAttributesWithoutAttributes = __webpack_require__(
          "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
        ),
        setAttributesWithoutAttributes_default = __webpack_require__.n(
          setAttributesWithoutAttributes
        ),
        insertStyleElement = __webpack_require__(
          "./node_modules/style-loader/dist/runtime/insertStyleElement.js"
        ),
        insertStyleElement_default = __webpack_require__.n(insertStyleElement),
        styleTagTransform = __webpack_require__(
          "./node_modules/style-loader/dist/runtime/styleTagTransform.js"
        ),
        styleTagTransform_default = __webpack_require__.n(styleTagTransform),
        ButtonIcon_module = __webpack_require__(
          "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/button/ButtonIcon.module.css"
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, "head")),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(ButtonIcon_module.Z, options);
      const button_ButtonIcon_module =
        ButtonIcon_module.Z && ButtonIcon_module.Z.locals
          ? ButtonIcon_module.Z.locals
          : void 0;
      function ButtonIcon({ children, className, disabled, onClick, sx }) {
        return (0, jsx_runtime.jsx)(ButtonBase.Z, {
          className: classnames_default()(
            button_ButtonIcon_module["button-icon"],
            className
          ),
          disabled,
          disableRipple: !0,
          onClick,
          sx,
          children: (0, jsx_runtime.jsx)(Avatar_Avatar, {
            className: button_ButtonIcon_module["button-icon__background"],
            children,
          }),
        });
      }
      const button_ButtonIcon = ButtonIcon;
      try {
        (ButtonIcon.displayName = "ButtonIcon"),
          (ButtonIcon.__docgenInfo = {
            description: "",
            displayName: "ButtonIcon",
            props: {
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              disabled: {
                defaultValue: null,
                description: "",
                name: "disabled",
                required: !1,
                type: { name: "boolean" },
              },
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !1,
                type: { name: "MouseEventHandler<HTMLButtonElement>" },
              },
              sx: {
                defaultValue: null,
                description: "",
                name: "sx",
                required: !1,
                type: { name: "SxProps<Theme>" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/design_system/button/ButtonIcon.tsx#ButtonIcon"
            ] = {
              docgenInfo: ButtonIcon.__docgenInfo,
              name: "ButtonIcon",
              path: "src/components/design_system/button/ButtonIcon.tsx#ButtonIcon",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const ButtonIcon_stories = {
          title: "Components/Design System/Button Icon",
          component: button_ButtonIcon,
        },
        Primary = { args: { children: (0, jsx_runtime.jsx)(AccessAlarm, {}) } },
        __namedExportsOrder = ["Primary"];
      Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    children: <AccessAlarmIcon />\n  }\n}",
            ...Primary.parameters?.docs?.source,
          },
        },
      };
    },
    "./node_modules/classnames/index.js": (module, exports) => {
      var __WEBPACK_AMD_DEFINE_RESULT__;
      !(function () {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames() {
          for (var classes = "", i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            arg && (classes = appendClass(classes, parseValue(arg)));
          }
          return classes;
        }
        function parseValue(arg) {
          if ("string" == typeof arg || "number" == typeof arg) return arg;
          if ("object" != typeof arg) return "";
          if (Array.isArray(arg)) return classNames.apply(null, arg);
          if (
            arg.toString !== Object.prototype.toString &&
            !arg.toString.toString().includes("[native code]")
          )
            return arg.toString();
          var classes = "";
          for (var key in arg)
            hasOwn.call(arg, key) &&
              arg[key] &&
              (classes = appendClass(classes, key));
          return classes;
        }
        function appendClass(value, newClass) {
          return newClass
            ? value
              ? value + " " + newClass
              : value + newClass
            : value;
        }
        module.exports
          ? ((classNames.default = classNames), (module.exports = classNames))
          : void 0 ===
              (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return classNames;
              }.apply(exports, [])) ||
            (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
      })();
    },
    "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/button/ButtonIcon.module.css":
      (module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        __webpack_require__.d(__webpack_exports__, {
          Z: () => __WEBPACK_DEFAULT_EXPORT__,
        });
        var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              "./node_modules/css-loader/dist/runtime/sourceMaps.js"
            ),
          _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default =
            __webpack_require__.n(
              _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__
            ),
          _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
            __webpack_require__(
              "./node_modules/css-loader/dist/runtime/api.js"
            ),
          ___CSS_LOADER_EXPORT___ = __webpack_require__.n(
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__
          )()(
            _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()
          );
        ___CSS_LOADER_EXPORT___.push([
          module.id,
          ".ButtonIcon_button-icon__45CBQ {\n  background-color: inherit;\n  border: none;\n  cursor: pointer;\n  height: 3rem;\n  padding: 0.25rem;\n  width: 3rem;\n}\n\n.ButtonIcon_button-icon__background__qZC3M {\n  background-color: var(--primary);\n  height: 2.5rem;\n  width: 2.5rem;\n}\n\n.ButtonIcon_button-icon__45CBQ:focus .ButtonIcon_button-icon__background__qZC3M {\n  background-color: var(--primary-60);\n}\n\n.ButtonIcon_button-icon__45CBQ:hover .ButtonIcon_button-icon__background__qZC3M {\n  background-color: var(--primary-50);\n}\n\n.ButtonIcon_button-icon__45CBQ:active .ButtonIcon_button-icon__background__qZC3M {\n  background-color: var(--primary-40);\n}\n\n.ButtonIcon_button-icon__45CBQ:disabled {\n  cursor: default;\n  .ButtonIcon_button-icon__background__qZC3M {\n    background-color: var(--grey-50);\n    color: var(--grey-40);\n  }\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./src/components/design_system/button/ButtonIcon.module.css",
            ],
            names: [],
            mappings:
              "AAAA;EACE,yBAAyB;EACzB,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,gCAAgC;EAChC,cAAc;EACd,aAAa;AACf;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,eAAe;EACf;IACE,gCAAgC;IAChC,qBAAqB;EACvB;AACF",
            sourcesContent: [
              ".button-icon {\n  background-color: inherit;\n  border: none;\n  cursor: pointer;\n  height: 3rem;\n  padding: 0.25rem;\n  width: 3rem;\n}\n\n.button-icon__background {\n  background-color: var(--primary);\n  height: 2.5rem;\n  width: 2.5rem;\n}\n\n.button-icon:focus .button-icon__background {\n  background-color: var(--primary-60);\n}\n\n.button-icon:hover .button-icon__background {\n  background-color: var(--primary-50);\n}\n\n.button-icon:active .button-icon__background {\n  background-color: var(--primary-40);\n}\n\n.button-icon:disabled {\n  cursor: default;\n  .button-icon__background {\n    background-color: var(--grey-50);\n    color: var(--grey-40);\n  }\n}\n",
            ],
            sourceRoot: "",
          },
        ]),
          (___CSS_LOADER_EXPORT___.locals = {
            "button-icon": "ButtonIcon_button-icon__45CBQ",
            "button-icon__background":
              "ButtonIcon_button-icon__background__qZC3M",
          });
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
  },
]);
