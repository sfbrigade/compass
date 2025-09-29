"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [87],
  {
    "./src/components/design_system/breadcrumbs/Breadcrumbs.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Primary: () => Primary,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Breadcrumbs_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        next_link = __webpack_require__("./node_modules/next/link.js"),
        link_default = __webpack_require__.n(next_link),
        Typography = __webpack_require__(
          "./node_modules/@mui/material/Typography/Typography.js"
        ),
        Breadcrumbs = __webpack_require__(
          "./node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js"
        ),
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
        Breadcrumbs_module = __webpack_require__(
          "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/breadcrumbs/Breadcrumbs.module.css"
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, "head")),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(Breadcrumbs_module.Z, options);
      const breadcrumbs_Breadcrumbs_module =
          Breadcrumbs_module.Z && Breadcrumbs_module.Z.locals
            ? Breadcrumbs_module.Z.locals
            : void 0,
        Breadcrumbs_Breadcrumbs = ({ data }) => {
          const breadcrumbs =
            null == data
              ? void 0
              : data.map((bc, index) =>
                  bc.href
                    ? (0, jsx_runtime.jsx)(
                        link_default(),
                        {
                          href: bc.href,
                          className:
                            breadcrumbs_Breadcrumbs_module.breadcrumbs__link,
                          children: bc.children,
                        },
                        index
                      )
                    : (0, jsx_runtime.jsx)(
                        Typography.Z,
                        { variant: "overline", children: bc.children },
                        index
                      )
                );
          return (0, jsx_runtime.jsx)(Breadcrumbs.Z, {
            className: breadcrumbs_Breadcrumbs_module.breadcrumbs,
            separator: (0, jsx_runtime.jsx)(Typography.Z, {
              className: breadcrumbs_Breadcrumbs_module.breadcrumbs__separator,
              variant: "h3",
              children: "/",
            }),
            "aria-label": "breadcrumb",
            children: breadcrumbs,
          });
        },
        breadcrumbs_Breadcrumbs = Breadcrumbs_Breadcrumbs;
      try {
        (Breadcrumbs_Breadcrumbs.displayName = "Breadcrumbs"),
          (Breadcrumbs_Breadcrumbs.__docgenInfo = {
            description: "",
            displayName: "Breadcrumbs",
            props: {
              data: {
                defaultValue: null,
                description: "",
                name: "data",
                required: !1,
                type: { name: "Breadcrumb[]" },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/design_system/breadcrumbs/Breadcrumbs.tsx#Breadcrumbs"
            ] = {
              docgenInfo: Breadcrumbs_Breadcrumbs.__docgenInfo,
              name: "Breadcrumbs",
              path: "src/components/design_system/breadcrumbs/Breadcrumbs.tsx#Breadcrumbs",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const Breadcrumbs_stories = {
          title: "Components/Design System/Breadcrumbs",
          component: breadcrumbs_Breadcrumbs,
        },
        Primary = {
          args: {
            data: [
              { href: "/students", children: "Students" },
              { href: "/students/:student_id", children: "Student Name" },
              {
                href: "/students/:student_id/goals/:goal_id",
                children: "Goal #1",
              },
              { children: "Create Benchmark" },
            ],
          },
        },
        __namedExportsOrder = ["Primary"];
      Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    data\n  }\n}",
            ...Primary.parameters?.docs?.source,
          },
        },
      };
    },
    "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/design_system/breadcrumbs/Breadcrumbs.module.css":
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
          ".Breadcrumbs_breadcrumbs__g1ool {\n  color: var(--primary);\n  font: var(--mui-font-overline);\n  text-transform: uppercase;\n}\n\n.Breadcrumbs_breadcrumbs__link__0L17g {\n  text-decoration: none;\n  color: var(--grey-10);\n}\n\n.Breadcrumbs_breadcrumbs__link__0L17g:hover {\n  text-decoration: underline;\n}\n\n.Breadcrumbs_breadcrumbs__separator__6fatB {\n  font-weight: normal;\n  color: var(--grey-10);\n  position: relative;\n  top: -1px;\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./src/components/design_system/breadcrumbs/Breadcrumbs.module.css",
            ],
            names: [],
            mappings:
              "AAAA;EACE,qBAAqB;EACrB,8BAA8B;EAC9B,yBAAyB;AAC3B;;AAEA;EACE,qBAAqB;EACrB,qBAAqB;AACvB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,kBAAkB;EAClB,SAAS;AACX",
            sourcesContent: [
              ".breadcrumbs {\n  color: var(--primary);\n  font: var(--mui-font-overline);\n  text-transform: uppercase;\n}\n\n.breadcrumbs__link {\n  text-decoration: none;\n  color: var(--grey-10);\n}\n\n.breadcrumbs__link:hover {\n  text-decoration: underline;\n}\n\n.breadcrumbs__separator {\n  font-weight: normal;\n  color: var(--grey-10);\n  position: relative;\n  top: -1px;\n}\n",
            ],
            sourceRoot: "",
          },
        ]),
          (___CSS_LOADER_EXPORT___.locals = {
            breadcrumbs: "Breadcrumbs_breadcrumbs__g1ool",
            breadcrumbs__link: "Breadcrumbs_breadcrumbs__link__0L17g",
            breadcrumbs__separator: "Breadcrumbs_breadcrumbs__separator__6fatB",
          });
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
  },
]);
