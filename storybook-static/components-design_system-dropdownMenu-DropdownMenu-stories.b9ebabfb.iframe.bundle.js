"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [131],
  {
    "./src/components/design_system/dropdownMenu/DropdownMenu.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Selected: () => Selected,
          Unselected: () => Unselected,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: "Components/Design System/Dropdown Menu",
          component: __webpack_require__(
            "./src/components/design_system/dropdownMenu/DropdownMenu.tsx"
          ).Z,
          decorators: [
            (Story) =>
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      "div",
                      {
                        id: "anchor",
                        children: (0,
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          Story,
                          {}
                        ),
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      "div",
                      { style: { height: "8rem" } }
                    ),
                  ],
                }
              ),
          ],
        },
        Unselected = {
          args: {
            anchorEl: () => document.getElementById("anchor"),
            backdropDisabled: !0,
            open: !0,
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ],
          },
        },
        Selected = {
          args: {
            anchorEl: () => document.getElementById("anchor"),
            backdropDisabled: !0,
            open: !0,
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ],
            selectedValue: "option2",
          },
        },
        __namedExportsOrder = ["Unselected", "Selected"];
      (Unselected.parameters = {
        ...Unselected.parameters,
        docs: {
          ...Unselected.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    anchorEl: () => document.getElementById("anchor") as Element,\n    backdropDisabled: true,\n    open: true,\n    options: [{\n      label: "Option 1",\n      value: "option1"\n    }, {\n      label: "Option 2",\n      value: "option2"\n    }, {\n      label: "Option 3",\n      value: "option3"\n    }]\n  }\n}',
            ...Unselected.parameters?.docs?.source,
          },
        },
      }),
        (Selected.parameters = {
          ...Selected.parameters,
          docs: {
            ...Selected.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    anchorEl: () => document.getElementById("anchor") as Element,\n    backdropDisabled: true,\n    open: true,\n    options: [{\n      label: "Option 1",\n      value: "option1"\n    }, {\n      label: "Option 2",\n      value: "option2"\n    }, {\n      label: "Option 3",\n      value: "option3"\n    }],\n    selectedValue: "option2"\n  }\n}',
              ...Selected.parameters?.docs?.source,
            },
          },
        });
    },
    "./src/components/design_system/dropdownMenu/DropdownMenu.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => dropdownMenu_DropdownMenu,
      });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        Menu = __webpack_require__("./node_modules/@mui/material/Menu/Menu.js"),
        react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        colorManipulator = __webpack_require__(
          "./node_modules/@mui/system/esm/colorManipulator/colorManipulator.js"
        ),
        rootShouldForwardProp = __webpack_require__(
          "./node_modules/@mui/material/styles/rootShouldForwardProp.js"
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
        ListContext = __webpack_require__(
          "./node_modules/@mui/material/List/ListContext.js"
        ),
        ButtonBase = __webpack_require__(
          "./node_modules/@mui/material/ButtonBase/ButtonBase.js"
        ),
        useEnhancedEffect = __webpack_require__(
          "./node_modules/@mui/material/utils/useEnhancedEffect.js"
        ),
        useForkRef = __webpack_require__(
          "./node_modules/@mui/material/utils/useForkRef.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        );
      const Divider_dividerClasses = (0, generateUtilityClasses.Z)(
        "MuiDivider",
        [
          "root",
          "absolute",
          "fullWidth",
          "inset",
          "middle",
          "flexItem",
          "light",
          "vertical",
          "withChildren",
          "withChildrenVertical",
          "textAlignRight",
          "textAlignLeft",
          "wrapper",
          "wrapperVertical",
        ]
      );
      const ListItemIcon_listItemIconClasses = (0, generateUtilityClasses.Z)(
        "MuiListItemIcon",
        ["root", "alignItemsFlexStart"]
      );
      const ListItemText_listItemTextClasses = (0, generateUtilityClasses.Z)(
        "MuiListItemText",
        ["root", "multiline", "dense", "inset", "primary", "secondary"]
      );
      var generateUtilityClass_generateUtilityClass = __webpack_require__(
        "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
      );
      function getMenuItemUtilityClass(slot) {
        return (0, generateUtilityClass_generateUtilityClass.ZP)(
          "MuiMenuItem",
          slot
        );
      }
      const MenuItem_menuItemClasses = (0, generateUtilityClasses.Z)(
          "MuiMenuItem",
          [
            "root",
            "focusVisible",
            "dense",
            "disabled",
            "divider",
            "gutters",
            "selected",
          ]
        ),
        MenuItemRoot = (0, styled.ZP)(ButtonBase.Z, {
          shouldForwardProp: (prop) =>
            (0, rootShouldForwardProp.Z)(prop) || "classes" === prop,
          name: "MuiMenuItem",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              ownerState.dense && styles.dense,
              ownerState.divider && styles.divider,
              !ownerState.disableGutters && styles.gutters,
            ];
          },
        })(
          (0, memoTheme.Z)(({ theme }) => ({
            ...theme.typography.body1,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            textDecoration: "none",
            minHeight: 48,
            paddingTop: 6,
            paddingBottom: 6,
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            "&:hover": {
              textDecoration: "none",
              backgroundColor: (theme.vars || theme).palette.action.hover,
              "@media (hover: none)": { backgroundColor: "transparent" },
            },
            [`&.${MenuItem_menuItemClasses.selected}`]: {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
                : (0, colorManipulator.Fq)(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                  ),
              [`&.${MenuItem_menuItemClasses.focusVisible}`]: {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
                  : (0, colorManipulator.Fq)(
                      theme.palette.primary.main,
                      theme.palette.action.selectedOpacity +
                        theme.palette.action.focusOpacity
                    ),
              },
            },
            [`&.${MenuItem_menuItemClasses.selected}:hover`]: {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
                : (0, colorManipulator.Fq)(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity +
                      theme.palette.action.hoverOpacity
                  ),
              "@media (hover: none)": {
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
                  : (0, colorManipulator.Fq)(
                      theme.palette.primary.main,
                      theme.palette.action.selectedOpacity
                    ),
              },
            },
            [`&.${MenuItem_menuItemClasses.focusVisible}`]: {
              backgroundColor: (theme.vars || theme).palette.action.focus,
            },
            [`&.${MenuItem_menuItemClasses.disabled}`]: {
              opacity: (theme.vars || theme).palette.action.disabledOpacity,
            },
            [`& + .${Divider_dividerClasses.root}`]: {
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            },
            [`& + .${Divider_dividerClasses.inset}`]: { marginLeft: 52 },
            [`& .${ListItemText_listItemTextClasses.root}`]: {
              marginTop: 0,
              marginBottom: 0,
            },
            [`& .${ListItemText_listItemTextClasses.inset}`]: {
              paddingLeft: 36,
            },
            [`& .${ListItemIcon_listItemIconClasses.root}`]: { minWidth: 36 },
            variants: [
              {
                props: ({ ownerState }) => !ownerState.disableGutters,
                style: { paddingLeft: 16, paddingRight: 16 },
              },
              {
                props: ({ ownerState }) => ownerState.divider,
                style: {
                  borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
                  backgroundClip: "padding-box",
                },
              },
              {
                props: ({ ownerState }) => !ownerState.dense,
                style: { [theme.breakpoints.up("sm")]: { minHeight: "auto" } },
              },
              {
                props: ({ ownerState }) => ownerState.dense,
                style: {
                  minHeight: 32,
                  paddingTop: 4,
                  paddingBottom: 4,
                  ...theme.typography.body2,
                  [`& .${ListItemIcon_listItemIconClasses.root} svg`]: {
                    fontSize: "1.25rem",
                  },
                },
              },
            ],
          }))
        ),
        MenuItem_MenuItem = react.forwardRef(function MenuItem(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiMenuItem",
            }),
            {
              autoFocus = !1,
              component = "li",
              dense = !1,
              divider = !1,
              disableGutters = !1,
              focusVisibleClassName,
              role = "menuitem",
              tabIndex: tabIndexProp,
              className,
              ...other
            } = props,
            context = react.useContext(ListContext.Z),
            childContext = react.useMemo(
              () => ({ dense: dense || context.dense || !1, disableGutters }),
              [context.dense, dense, disableGutters]
            ),
            menuItemRef = react.useRef(null);
          (0, useEnhancedEffect.Z)(() => {
            autoFocus && menuItemRef.current && menuItemRef.current.focus();
          }, [autoFocus]);
          const ownerState = {
              ...props,
              dense: childContext.dense,
              divider,
              disableGutters,
            },
            classes = ((ownerState) => {
              const {
                  disabled,
                  dense,
                  divider,
                  disableGutters,
                  selected,
                  classes,
                } = ownerState,
                slots = {
                  root: [
                    "root",
                    dense && "dense",
                    disabled && "disabled",
                    !disableGutters && "gutters",
                    divider && "divider",
                    selected && "selected",
                  ],
                },
                composedClasses = (0, composeClasses.Z)(
                  slots,
                  getMenuItemUtilityClass,
                  classes
                );
              return { ...classes, ...composedClasses };
            })(props),
            handleRef = (0, useForkRef.Z)(menuItemRef, ref);
          let tabIndex;
          return (
            props.disabled ||
              (tabIndex = void 0 !== tabIndexProp ? tabIndexProp : -1),
            (0, jsx_runtime.jsx)(ListContext.Z.Provider, {
              value: childContext,
              children: (0, jsx_runtime.jsx)(MenuItemRoot, {
                ref: handleRef,
                role,
                tabIndex,
                component,
                focusVisibleClassName: (0, clsx.Z)(
                  classes.focusVisible,
                  focusVisibleClassName
                ),
                className: (0, clsx.Z)(classes.root, className),
                ...other,
                ownerState,
                classes,
              }),
            })
          );
        });
      var Typography = __webpack_require__(
          "./node_modules/@mui/material/Typography/Typography.js"
        ),
        classnames = __webpack_require__("./node_modules/classnames/index.js"),
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
        DropdownMenu_module = __webpack_require__(
          "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/dropdownMenu/DropdownMenu.module.css"
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, "head")),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(DropdownMenu_module.Z, options);
      const dropdownMenu_DropdownMenu_module =
        DropdownMenu_module.Z && DropdownMenu_module.Z.locals
          ? DropdownMenu_module.Z.locals
          : void 0;
      function DropdownMenu({
        anchorEl,
        backdropDisabled = !1,
        className,
        minWidth = 0,
        onClick,
        onClose,
        open,
        options,
        selectedValue,
      }) {
        return (0, jsx_runtime.jsx)(Menu.Z, {
          anchorEl,
          disableScrollLock: backdropDisabled,
          hideBackdrop: backdropDisabled,
          open,
          onClose,
          slotProps: {
            list: {
              className: classnames_default()(
                dropdownMenu_DropdownMenu_module["dropdown-menu"],
                className
              ),
            },
            paper: {
              elevation: 1,
              sx: { mt: "2px", pointerEvents: "auto", minWidth },
            },
            root: { sx: { pointerEvents: backdropDisabled ? "none" : "auto" } },
          },
          children: options.map((option) =>
            (0, jsx_runtime.jsx)(
              MenuItem_MenuItem,
              {
                onClick: () => (null == onClick ? void 0 : onClick(option)),
                className: classnames_default()(
                  dropdownMenu_DropdownMenu_module["dropdown-menu__item"],
                  {
                    [dropdownMenu_DropdownMenu_module[
                      "dropdown-menu__item--selected"
                    ]]: selectedValue === option.value,
                  }
                ),
                children: (0, jsx_runtime.jsx)(Typography.Z, {
                  variant: "button",
                  children: option.label,
                }),
              },
              option.value
            )
          ),
        });
      }
      const dropdownMenu_DropdownMenu = DropdownMenu;
      try {
        (DropdownMenu.displayName = "DropdownMenu"),
          (DropdownMenu.__docgenInfo = {
            description: "",
            displayName: "DropdownMenu",
            props: {
              anchorEl: {
                defaultValue: null,
                description: "",
                name: "anchorEl",
                required: !1,
                type: {
                  name: "Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null",
                },
              },
              backdropDisabled: {
                defaultValue: { value: "false" },
                description: "",
                name: "backdropDisabled",
                required: !1,
                type: { name: "boolean" },
              },
              className: {
                defaultValue: null,
                description: "",
                name: "className",
                required: !1,
                type: { name: "string" },
              },
              minWidth: {
                defaultValue: { value: "0" },
                description: "",
                name: "minWidth",
                required: !1,
                type: { name: "number" },
              },
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !1,
                type: { name: "((option: DropdownMenuOption) => void)" },
              },
              onClose: {
                defaultValue: null,
                description: "",
                name: "onClose",
                required: !1,
                type: {
                  name: '(({ event, reason, }: { event: unknown; reason: "escapeKeyDown" | "backdropClick" | "tabKeyDown"; }) => void)',
                },
              },
              open: {
                defaultValue: null,
                description: "",
                name: "open",
                required: !0,
                type: { name: "boolean" },
              },
              options: {
                defaultValue: null,
                description: "",
                name: "options",
                required: !0,
                type: { name: "DropdownMenuOption[]" },
              },
              selectedValue: {
                defaultValue: null,
                description: "",
                name: "selectedValue",
                required: !1,
                type: { name: "string" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/design_system/dropdownMenu/DropdownMenu.tsx#DropdownMenu"
            ] = {
              docgenInfo: DropdownMenu.__docgenInfo,
              name: "DropdownMenu",
              path: "src/components/design_system/dropdownMenu/DropdownMenu.tsx#DropdownMenu",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/dropdownMenu/DropdownMenu.module.css":
      (module, __webpack_exports__, __webpack_require__) => {
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
          ".DropdownMenu_dropdown-menu__oiuuq {\n  padding: 0.875rem 0.5rem;\n}\n\n.DropdownMenu_dropdown-menu__item__vPMwK {\n  padding: 0.4375rem 0.75rem;\n\n  &:hover {\n    background-color: var(--primary-99);\n    color: var(--primary);\n  }\n}\n\n.DropdownMenu_dropdown-menu__item--selected__QZ0UA {\n  background-color: var(--primary-99);\n  border-left: 0.25rem solid var(--primary-60);\n  padding-left: 0.5rem;\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./src/components/design_system/dropdownMenu/DropdownMenu.module.css",
            ],
            names: [],
            mappings:
              "AAAA;EACE,wBAAwB;AAC1B;;AAEA;EACE,0BAA0B;;EAE1B;IACE,mCAAmC;IACnC,qBAAqB;EACvB;AACF;;AAEA;EACE,mCAAmC;EACnC,4CAA4C;EAC5C,oBAAoB;AACtB",
            sourcesContent: [
              ".dropdown-menu {\n  padding: 0.875rem 0.5rem;\n}\n\n.dropdown-menu__item {\n  padding: 0.4375rem 0.75rem;\n\n  &:hover {\n    background-color: var(--primary-99);\n    color: var(--primary);\n  }\n}\n\n.dropdown-menu__item--selected {\n  background-color: var(--primary-99);\n  border-left: 0.25rem solid var(--primary-60);\n  padding-left: 0.5rem;\n}\n",
            ],
            sourceRoot: "",
          },
        ]),
          (___CSS_LOADER_EXPORT___.locals = {
            "dropdown-menu": "DropdownMenu_dropdown-menu__oiuuq",
            "dropdown-menu__item": "DropdownMenu_dropdown-menu__item__vPMwK",
            "dropdown-menu__item--selected":
              "DropdownMenu_dropdown-menu__item--selected__QZ0UA",
          });
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
  },
]);
