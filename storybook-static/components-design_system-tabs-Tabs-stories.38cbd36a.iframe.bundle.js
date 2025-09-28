"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [425],
  {
    "./src/components/design_system/tabs/Tabs.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Disabled: () => Disabled,
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__("./node_modules/@mui/material/Tabs/Tabs.js"),
        _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__("./node_modules/@mui/material/Tab/Tab.js");
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: "Components/Design System/Tabs",
          component:
            _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_2__.Z,
        },
        Primary = {
          args: {},
          render: (args) => {
            const [value, setValue] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_2__.Z,
              {
                ...args,
                value,
                onChange: (e, newValue) => setValue(newValue),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,
                    { value: 1, label: "Item One" }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,
                    { value: 2, label: "Item Two" }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,
                    { value: 3, label: "Item Three" }
                  ),
                ],
              }
            );
          },
        },
        Disabled = {
          args: {},
          render: (args) => {
            const [value, setValue] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_2__.Z,
              {
                ...args,
                value,
                onChange: (e, newValue) => setValue(newValue),
                children: (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _barrel_optimize_names_Tab_Tabs_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,
                  { value: 1, label: "Item One", disabled: !0 }
                ),
              }
            );
          },
        },
        __namedExportsOrder = ["Primary", "Disabled"];
      (Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {},\n  render: args => {\n    const [value, setValue] = useState<number>(1);\n    return <Tabs {...args} value={value} onChange={(e, newValue) => setValue(newValue as number)}>\r\n        <Tab value={1} label="Item One" />\r\n        <Tab value={2} label="Item Two" />\r\n        <Tab value={3} label="Item Three" />\r\n      </Tabs>;\n  }\n}',
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Disabled.parameters = {
          ...Disabled.parameters,
          docs: {
            ...Disabled.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {},\n  render: args => {\n    const [value, setValue] = useState<number>(1);\n    return <Tabs {...args} value={value} onChange={(e, newValue) => setValue(newValue as number)}>\r\n        <Tab value={1} label="Item One" disabled />\r\n      </Tabs>;\n  }\n}',
              ...Disabled.parameters?.docs?.source,
            },
          },
        });
    },
  },
]);
