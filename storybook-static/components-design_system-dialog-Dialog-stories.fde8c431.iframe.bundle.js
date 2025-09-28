"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [665],
  {
    "./src/components/design_system/dialog/Dialog.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Dialog_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        useMediaQuery = __webpack_require__(
          "./node_modules/@mui/material/useMediaQuery/index.js"
        ),
        Dialog = __webpack_require__(
          "./node_modules/@mui/material/Dialog/Dialog.js"
        ),
        AppBar = __webpack_require__(
          "./node_modules/@mui/material/AppBar/AppBar.js"
        ),
        Toolbar = __webpack_require__(
          "./node_modules/@mui/material/Toolbar/Toolbar.js"
        ),
        IconButton = __webpack_require__(
          "./node_modules/@mui/material/IconButton/IconButton.js"
        ),
        DialogTitle = __webpack_require__(
          "./node_modules/@mui/material/DialogTitle/DialogTitle.js"
        ),
        DialogContent = __webpack_require__(
          "./node_modules/@mui/material/DialogContent/DialogContent.js"
        ),
        DialogActions = __webpack_require__(
          "./node_modules/@mui/material/DialogActions/DialogActions.js"
        ),
        useTheme = __webpack_require__(
          "./node_modules/@mui/material/styles/useTheme.js"
        ),
        ArrowBack = __webpack_require__(
          "./node_modules/@mui/icons-material/esm/ArrowBack.js"
        ),
        Button = __webpack_require__(
          "./src/components/design_system/button/Button.tsx"
        );
      function Dialog_Dialog({
        cancelLabel,
        children,
        confirmLabel,
        fullScreenOnMobile = !1,
        onCancel,
        onConfirm,
        open,
        size = "sm",
        title,
      }) {
        const theme = (0, useTheme.Z)(),
          isMobile = (0, useMediaQuery.Z)(theme.breakpoints.down("sm"));
        return (0, jsx_runtime.jsxs)(Dialog.Z, {
          open,
          fullScreen: fullScreenOnMobile && isMobile,
          fullWidth: !0,
          maxWidth: size,
          children: [
            isMobile &&
              (0, jsx_runtime.jsx)(AppBar.Z, {
                position: "fixed",
                children: (0, jsx_runtime.jsx)(Toolbar.Z, {
                  children: (0, jsx_runtime.jsx)(IconButton.Z, {
                    onClick: () => (null == onCancel ? void 0 : onCancel()),
                    color: "inherit",
                    sx: { padding: "1.25rem" },
                    children: (0, jsx_runtime.jsx)(ArrowBack.Z, {}),
                  }),
                }),
              }),
            (0, jsx_runtime.jsxs)("form", {
              onSubmit: function onFormSubmit(event) {
                event.preventDefault(), null == onConfirm || onConfirm();
              },
              children: [
                (0, jsx_runtime.jsx)(DialogTitle.Z, {
                  align: "center",
                  variant: "h3",
                  sx: { paddingTop: { xs: "5.5rem", sm: "1.5rem" } },
                  children: title,
                }),
                (0, jsx_runtime.jsx)(DialogContent.Z, { children }),
                (0, jsx_runtime.jsxs)(DialogActions.Z, {
                  children: [
                    cancelLabel &&
                      (0, jsx_runtime.jsx)(Button.Z, {
                        variant: "secondary",
                        onClick: () => (null == onCancel ? void 0 : onCancel()),
                        children: cancelLabel,
                      }),
                    confirmLabel &&
                      (0, jsx_runtime.jsx)(Button.Z, {
                        type: "submit",
                        variant: "primary",
                        children: confirmLabel,
                      }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      const dialog_Dialog = Dialog_Dialog;
      try {
        (Dialog_Dialog.displayName = "Dialog"),
          (Dialog_Dialog.__docgenInfo = {
            description: "",
            displayName: "Dialog",
            props: {
              cancelLabel: {
                defaultValue: null,
                description: "",
                name: "cancelLabel",
                required: !1,
                type: { name: "string" },
              },
              confirmLabel: {
                defaultValue: null,
                description: "",
                name: "confirmLabel",
                required: !1,
                type: { name: "string" },
              },
              fullScreenOnMobile: {
                defaultValue: { value: "false" },
                description: "",
                name: "fullScreenOnMobile",
                required: !1,
                type: { name: "boolean" },
              },
              onCancel: {
                defaultValue: null,
                description: "",
                name: "onCancel",
                required: !1,
                type: { name: "(() => void)" },
              },
              onConfirm: {
                defaultValue: null,
                description: "",
                name: "onConfirm",
                required: !1,
                type: { name: "(() => void)" },
              },
              open: {
                defaultValue: null,
                description: "",
                name: "open",
                required: !0,
                type: { name: "boolean" },
              },
              size: {
                defaultValue: { value: "sm" },
                description: "",
                name: "size",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"xs"' },
                    { value: '"sm"' },
                    { value: '"md"' },
                    { value: '"lg"' },
                    { value: '"xl"' },
                  ],
                },
              },
              title: {
                defaultValue: null,
                description: "",
                name: "title",
                required: !0,
                type: { name: "ReactNode" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/design_system/dialog/Dialog.tsx#Dialog"
            ] = {
              docgenInfo: Dialog_Dialog.__docgenInfo,
              name: "Dialog",
              path: "src/components/design_system/dialog/Dialog.tsx#Dialog",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const Dialog_stories = {
          title: "Components/Design System/Dialog",
          component: dialog_Dialog,
        },
        Default = {
          args: {
            open: !0,
            size: "sm",
            title: "Dialog Test",
            children: (0, jsx_runtime.jsx)("p", {
              style: { width: "100%" },
              children: "Testing, testing testing",
            }),
            cancelLabel: "Cancel",
            confirmLabel: "Save",
            fullScreenOnMobile: !0,
          },
        },
        __namedExportsOrder = ["Default"];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    open: true,\n    size: "sm",\n    title: "Dialog Test",\n    children: <p style={{\n      width: "100%"\n    }}>Testing, testing testing</p>,\n    cancelLabel: "Cancel",\n    confirmLabel: "Save",\n    fullScreenOnMobile: true\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
    "./src/components/design_system/button/Button.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => button_Button });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        Button = __webpack_require__(
          "./node_modules/@mui/material/Button/Button.js"
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
        Button_module = __webpack_require__(
          "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/button/Button.module.css"
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, "head")),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(Button_module.Z, options);
      const button_Button_module =
        Button_module.Z && Button_module.Z.locals
          ? Button_module.Z.locals
          : void 0;
      function Button_Button({
        children,
        className,
        disabled,
        form,
        onClick,
        size = "large",
        sx = [],
        type,
        variant = "primary",
      }) {
        return (0, jsx_runtime.jsx)(Button.Z, {
          className: classnames_default()(
            button_Button_module.button,
            button_Button_module[`button--${size}`],
            button_Button_module[`button--${variant}`],
            className
          ),
          disabled,
          form,
          onClick,
          sx,
          type,
          children,
        });
      }
      const button_Button = Button_Button;
      try {
        (Button_Button.displayName = "Button"),
          (Button_Button.__docgenInfo = {
            description: "",
            displayName: "Button",
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
              form: {
                defaultValue: null,
                description: "",
                name: "form",
                required: !1,
                type: { name: "string" },
              },
              onClick: {
                defaultValue: null,
                description: "",
                name: "onClick",
                required: !1,
                type: { name: "MouseEventHandler<HTMLButtonElement>" },
              },
              size: {
                defaultValue: { value: "large" },
                description: "",
                name: "size",
                required: !1,
                type: {
                  name: "enum",
                  value: [{ value: '"small"' }, { value: '"large"' }],
                },
              },
              sx: {
                defaultValue: { value: "[]" },
                description: "",
                name: "sx",
                required: !1,
                type: { name: "SxProps<Theme>" },
              },
              type: {
                defaultValue: null,
                description: "",
                name: "type",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"button"' },
                    { value: '"submit"' },
                    { value: '"reset"' },
                  ],
                },
              },
              variant: {
                defaultValue: { value: "primary" },
                description: "",
                name: "variant",
                required: !1,
                type: {
                  name: "enum",
                  value: [
                    { value: '"secondary"' },
                    { value: '"primary"' },
                    { value: '"tertiary"' },
                  ],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/design_system/button/Button.tsx#Button"
            ] = {
              docgenInfo: Button_Button.__docgenInfo,
              name: "Button",
              path: "src/components/design_system/button/Button.tsx#Button",
            });
      } catch (__react_docgen_typescript_loader_error) {}
    },
    "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/button/Button.module.css":
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
          ".Button_button__aOy_f {\n  display: inline-block;\n  border-style: solid;\n  border-width: 1px;\n  cursor: pointer;\n  font-family: var(--quicksand);\n  font-weight: var(--semibold);\n  letter-spacing: 0;\n  min-width: 0;\n  text-decoration: none;\n  text-align: center;\n  text-transform: none;\n}\n\n.Button_button--small__Mx9JD {\n  border-radius: 0.5rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  padding: 0.4375rem 0.4375rem;\n}\n\n.Button_button--large__j1iil {\n  border-radius: 0.5rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  padding: 0.4375rem 1.4375rem;\n}\n\n.Button_button--primary__ISGgn {\n  background-color: var(--primary);\n  border-color: var(--primary);\n  color: var(--on-primary);\n}\n\n.Button_button--primary__ISGgn:hover {\n  box-shadow:\n    0px 1px 2px 0px rgba(0, 0, 0, 0.3),\n    0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n  background-color: var(--primary-50);\n}\n\n.Button_button--primary__ISGgn:active {\n  background-color: var(--primary-60);\n}\n\n.Button_button--primary__ISGgn:disabled {\n  border-color: var(--grey-70);\n  background-color: var(--grey-70);\n  color: var(--grey-50);\n  cursor: default;\n}\n\n.Button_button--primary__ISGgn:disabled:hover {\n  box-shadow: none;\n}\n\n.Button_button--secondary__OKB50 {\n  background-color: inherit;\n  border-color: var(--primary-50);\n  color: var(--primary-50);\n}\n\n.Button_button--secondary__OKB50:hover {\n  background-color: var(--primary-container);\n}\n\n.Button_button--secondary__OKB50:disabled {\n  border-color: var(--grey-50);\n}\n\n.Button_button--tertiary__byKUI {\n  background-color: inherit;\n  border-color: transparent;\n  color: var(--primary-50);\n  text-decoration: underline;\n}\n\n.Button_button--tertiary__byKUI:hover {\n  background-color: var(--primary-container);\n  text-decoration: none;\n}\n\n.Button_button--tertiary__byKUI:disabled {\n  text-decoration: none;\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./src/components/design_system/button/Button.module.css",
            ],
            names: [],
            mappings:
              "AAAA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,eAAe;EACf,6BAA6B;EAC7B,4BAA4B;EAC5B,iBAAiB;EACjB,YAAY;EACZ,qBAAqB;EACrB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,iBAAiB;EACjB,4BAA4B;AAC9B;;AAEA;EACE,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,4BAA4B;AAC9B;;AAEA;EACE,gCAAgC;EAChC,4BAA4B;EAC5B,wBAAwB;AAC1B;;AAEA;EACE;;uCAEqC;EACrC,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,4BAA4B;EAC5B,gCAAgC;EAChC,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,+BAA+B;EAC/B,wBAAwB;AAC1B;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,yBAAyB;EACzB,yBAAyB;EACzB,wBAAwB;EACxB,0BAA0B;AAC5B;;AAEA;EACE,0CAA0C;EAC1C,qBAAqB;AACvB;;AAEA;EACE,qBAAqB;AACvB",
            sourcesContent: [
              ".button {\n  display: inline-block;\n  border-style: solid;\n  border-width: 1px;\n  cursor: pointer;\n  font-family: var(--quicksand);\n  font-weight: var(--semibold);\n  letter-spacing: 0;\n  min-width: 0;\n  text-decoration: none;\n  text-align: center;\n  text-transform: none;\n}\n\n.button--small {\n  border-radius: 0.5rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  padding: 0.4375rem 0.4375rem;\n}\n\n.button--large {\n  border-radius: 0.5rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  padding: 0.4375rem 1.4375rem;\n}\n\n.button--primary {\n  background-color: var(--primary);\n  border-color: var(--primary);\n  color: var(--on-primary);\n}\n\n.button--primary:hover {\n  box-shadow:\n    0px 1px 2px 0px rgba(0, 0, 0, 0.3),\n    0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n  background-color: var(--primary-50);\n}\n\n.button--primary:active {\n  background-color: var(--primary-60);\n}\n\n.button--primary:disabled {\n  border-color: var(--grey-70);\n  background-color: var(--grey-70);\n  color: var(--grey-50);\n  cursor: default;\n}\n\n.button--primary:disabled:hover {\n  box-shadow: none;\n}\n\n.button--secondary {\n  background-color: inherit;\n  border-color: var(--primary-50);\n  color: var(--primary-50);\n}\n\n.button--secondary:hover {\n  background-color: var(--primary-container);\n}\n\n.button--secondary:disabled {\n  border-color: var(--grey-50);\n}\n\n.button--tertiary {\n  background-color: inherit;\n  border-color: transparent;\n  color: var(--primary-50);\n  text-decoration: underline;\n}\n\n.button--tertiary:hover {\n  background-color: var(--primary-container);\n  text-decoration: none;\n}\n\n.button--tertiary:disabled {\n  text-decoration: none;\n}\n",
            ],
            sourceRoot: "",
          },
        ]),
          (___CSS_LOADER_EXPORT___.locals = {
            button: "Button_button__aOy_f",
            "button--small": "Button_button--small__Mx9JD",
            "button--large": "Button_button--large__j1iil",
            "button--primary": "Button_button--primary__ISGgn",
            "button--secondary": "Button_button--secondary__OKB50",
            "button--tertiary": "Button_button--tertiary__byKUI",
          });
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
  },
]);
