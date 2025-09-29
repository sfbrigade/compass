(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [179],
  {
    "./node_modules/@storybook/instrumenter/dist sync recursive": (module) => {
      function webpackEmptyContext(req) {
        var e = new Error("Cannot find module '" + req + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (webpackEmptyContext.keys = () => []),
        (webpackEmptyContext.resolve = webpackEmptyContext),
        (webpackEmptyContext.id =
          "./node_modules/@storybook/instrumenter/dist sync recursive"),
        (module.exports = webpackEmptyContext);
    },
    "./.storybook/preview.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          default: () => _storybook_preview,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        StyledEngineProvider =
          (__webpack_require__(
            "./node_modules/next/dist/compiled/react/index.js"
          ),
          __webpack_require__(
            "./node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js"
          )),
        ThemeProvider = __webpack_require__(
          "./node_modules/@mui/material/styles/ThemeProvider.js"
        ),
        createTheme = __webpack_require__(
          "./node_modules/@mui/material/styles/createTheme.js"
        );
      const { breakpoints } = (0, createTheme.Z)(),
        compassTheme = (0, createTheme.Z)({
          cssVariables: !0,
          palette: {
            primary: { main: "#3023b8", light: "#9b93f1", dark: "#080155" },
            error: { main: "#b3261e" },
            warning: { main: "#ffaa44", light: "#fbf6d9", dark: "#1c1b1f" },
            success: { main: "#24804d", light: "#f0fff6", dark: "#001e0d" },
          },
          breakpoints,
          shadows: [
            "none",
            "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
            "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
            "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
            "0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
            "0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
            ...new Array(19).map(() => "none"),
          ],
          typography: {
            allVariants: { letterSpacing: "normal", lineHeight: "100%" },
            h1: {
              fontWeight: 600,
              fontSize: "2.5rem",
              fontFamily: "var(--quicksand), sans-serif",
              [breakpoints.down("md")]: { fontSize: "2rem" },
            },
            h2: {
              fontWeight: 600,
              fontSize: "2rem",
              fontFamily: "var(--quicksand), sans-serif",
              [breakpoints.down("sm")]: { fontSize: "1.5rem" },
            },
            h3: {
              fontWeight: 600,
              fontSize: "1.5rem",
              fontFamily: "var(--quicksand), sans-serif",
              [breakpoints.down("md")]: { fontSize: "1.25rem" },
            },
            h4: {
              fontWeight: 600,
              fontSize: "1.25rem",
              fontFamily: "var(--quicksand), sans-serif",
              [breakpoints.down("md")]: { fontWeight: 500 },
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
                root: { borderRadius: "0.5rem", boxShadow: "none" },
              },
            },
            MuiCardContent: { styleOverrides: { root: { padding: "1.5rem" } } },
            MuiCheckbox: { defaultProps: { disableRipple: !0 } },
            MuiDialogActions: {
              styleOverrides: {
                root: { padding: ".5rem 1.5rem 1.5rem 1.5rem" },
              },
            },
            MuiDialogTitle: {
              styleOverrides: {
                root: { paddingTop: "1.5rem", paddingBottom: "1.5rem" },
              },
            },
            MuiDialogContent: {
              styleOverrides: {
                root: { padding: ".5rem 1.5rem 1.5rem 1.5rem !important" },
              },
            },
            MuiInputLabel: {
              styleOverrides: {
                root: {
                  color: "var(--grey-10)",
                  "&.Mui-focused": { color: "var(--primary)" },
                },
              },
            },
            MuiInputBase: {
              styleOverrides: {
                root: {
                  "& .MuiInputLabel-outlined": {
                    color: "var(--grey-10)",
                    "&.Mui-focused": { color: "var(--primary)" },
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
                  td: { border: "none" },
                },
              },
            },
            MuiTableCell: {
              styleOverrides: {
                root: {
                  fontSize: ".875rem",
                  [breakpoints.down("sm")]: { fontSize: ".75rem" },
                },
              },
            },
            MuiTablePagination: {
              styleOverrides: {
                root: {
                  "& .MuiToolbar-root": { backgroundColor: "transparent" },
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
                  "&.Mui-active": { color: "var(--grey-40)" },
                },
              },
            },
            MuiTextField: {
              defaultProps: { slotProps: { inputLabel: { shrink: !0 } } },
              styleOverrides: {
                root: {
                  "& .MuiInputLabel-outlined": {
                    color: "var(--grey-10)",
                    "&.Mui-focused": { color: "var(--primary)" },
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
                  marginRight: ownerState.last ? 0 : "16px",
                  "&.Mui-disabled": {},
                  "&.Mui-active": {},
                  "&.Mui-completed": {},
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
                  "&.Mui-disabled": { color: "#a2acb3" },
                  "&.Mui-active": { color: theme.palette.primary.light },
                  "&.Mui-completed": { color: theme.palette.primary.main },
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
                    borderTop: "4px solid #a2acb3",
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
                  "&.Mui-disabled": { color: "var(--primary)" },
                },
              },
            },
            MuiTabs: { defaultProps: { indicatorColor: "transparent" } },
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
      var target_path_src_components_font_provider_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_ =
          __webpack_require__(
            './node_modules/next/font/google/target.css?{"path":"src\\\\components\\\\font-provider.tsx","import":"Inter","arguments":[{"subsets":["latin"],"variable":"--font-inter"}],"variableName":"inter"}'
          ),
        target_path_src_components_font_provider_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_default =
          __webpack_require__.n(
            target_path_src_components_font_provider_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_
          ),
        target_path_src_components_font_provider_tsx_import_Quicksand_arguments_weight_500_600_subsets_latin_variable_font_quicksand_variableName_quicksand_ =
          __webpack_require__(
            './node_modules/next/font/google/target.css?{"path":"src\\\\components\\\\font-provider.tsx","import":"Quicksand","arguments":[{"weight":["500","600"],"subsets":["latin"],"variable":"--font-quicksand"}],"variableName":"quicksand"}'
          ),
        target_path_src_components_font_provider_tsx_import_Quicksand_arguments_weight_500_600_subsets_latin_variable_font_quicksand_variableName_quicksand_default =
          __webpack_require__.n(
            target_path_src_components_font_provider_tsx_import_Quicksand_arguments_weight_500_600_subsets_latin_variable_font_quicksand_variableName_quicksand_
          );
      const FontProvider = ({ children }) =>
        (0, jsx_runtime.jsx)("div", {
          className: `${target_path_src_components_font_provider_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_default().className} ${target_path_src_components_font_provider_tsx_import_Quicksand_arguments_weight_500_600_subsets_latin_variable_font_quicksand_variableName_quicksand_default().className}`,
          children,
        });
      try {
        (FontProvider.displayName = "FontProvider"),
          (FontProvider.__docgenInfo = {
            description: "",
            displayName: "FontProvider",
            props: {},
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/font-provider.tsx#FontProvider"
            ] = {
              docgenInfo: FontProvider.__docgenInfo,
              name: "FontProvider",
              path: "src/components/font-provider.tsx#FontProvider",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      var injectStylesIntoStyleTag = __webpack_require__(
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
        globals = __webpack_require__(
          "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/styles/globals.css"
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, "head")),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(globals.Z, options);
      globals.Z && globals.Z.locals && globals.Z.locals;
      const _storybook_preview = {
        parameters: {
          controls: {
            matchers: { color: /(background|color)$/i, date: /Date$/i },
          },
          options: { storySort: (a, b) => a.title.localeCompare(b.title) },
        },
        decorators: [
          (Story) =>
            (0, jsx_runtime.jsx)(FontProvider, {
              children: (0, jsx_runtime.jsx)(StyledEngineProvider.Z, {
                injectFirst: !0,
                children: (0, jsx_runtime.jsx)(ThemeProvider.Z, {
                  theme: compassTheme,
                  children: (0, jsx_runtime.jsx)(Story, {}),
                }),
              }),
            }),
        ],
        tags: ["autodocs"],
      };
    },
    "./node_modules/@storybook/nextjs/dist sync recursive": (module) => {
      function webpackEmptyContext(req) {
        var e = new Error("Cannot find module '" + req + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (webpackEmptyContext.keys = () => []),
        (webpackEmptyContext.resolve = webpackEmptyContext),
        (webpackEmptyContext.id =
          "./node_modules/@storybook/nextjs/dist sync recursive"),
        (module.exports = webpackEmptyContext);
    },
    "./storybook-config-entry.js": (
      __unused_webpack_module,
      __unused_webpack___webpack_exports__,
      __webpack_require__
    ) => {
      "use strict";
      var external_STORYBOOK_MODULE_CHANNELS_ = __webpack_require__(
          "storybook/internal/channels"
        ),
        csf = __webpack_require__(
          "./node_modules/@storybook/core/dist/csf/index.js"
        ),
        external_STORYBOOK_MODULE_PREVIEW_API_ = __webpack_require__(
          "storybook/internal/preview-api"
        ),
        external_STORYBOOK_MODULE_GLOBAL_ =
          __webpack_require__("@storybook/global");
      const importers = [
        async (path) => {
          if (
            !/^\.[\\/](?:src(?:[\\/](?!\.)(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/]|[\\/]|$)(?!\.)(?=.)[^\\/]*?\.mdx)$/.exec(
              path
            )
          )
            return;
          const pathRemainder = path.substring(6);
          return __webpack_require__(
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.mdx)$"
          )("./" + pathRemainder);
        },
        async (path) => {
          if (
            !/^\.[\\/](?:src(?:[\\/](?!\.)(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/]|[\\/]|$)(?!\.)(?=.)[^\\/]*?\.stories\.(js|jsx|mjs|ts|tsx))$/.exec(
              path
            )
          )
            return;
          const pathRemainder = path.substring(6);
          return __webpack_require__(
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.stories\\.(js%7Cjsx%7Cmjs%7Cts%7Ctsx))$"
          )("./" + pathRemainder);
        },
      ];
      const channel = (0,
      external_STORYBOOK_MODULE_CHANNELS_.createBrowserChannel)({
        page: "preview",
      });
      external_STORYBOOK_MODULE_PREVIEW_API_.addons.setChannel(channel),
        "DEVELOPMENT" ===
          external_STORYBOOK_MODULE_GLOBAL_.global.CONFIG_TYPE &&
          (window.__STORYBOOK_SERVER_CHANNEL__ = channel);
      const preview = new external_STORYBOOK_MODULE_PREVIEW_API_.PreviewWeb(
        async function importFn(path) {
          for (let i = 0; i < importers.length; i++) {
            const moduleExports = await ((x = () => importers[i](path)), x());
            if (moduleExports) return moduleExports;
          }
          var x;
        },
        () => {
          const previewAnnotations = [
              __webpack_require__(
                "./node_modules/@storybook/react/dist/entry-preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/react/dist/entry-preview-docs.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/nextjs/dist/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-links/dist/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/actions/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/docs/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/measure/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/outline/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs"
              ),
              __webpack_require__(
                "./node_modules/@storybook/addon-interactions/dist/preview.mjs"
              ),
              __webpack_require__("./.storybook/preview.tsx"),
            ],
            userPreview =
              previewAnnotations[previewAnnotations.length - 1]?.default;
          return (0, csf.JF)(userPreview)
            ? userPreview.composed
            : (0, external_STORYBOOK_MODULE_PREVIEW_API_.composeConfigs)(
                previewAnnotations
              );
        }
      );
      (window.__STORYBOOK_PREVIEW__ = preview),
        (window.__STORYBOOK_STORY_STORE__ = preview.storyStore),
        (window.__STORYBOOK_ADDONS_CHANNEL__ = channel);
    },
    "./node_modules/@storybook/test/dist sync recursive": (module) => {
      function webpackEmptyContext(req) {
        var e = new Error("Cannot find module '" + req + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      (webpackEmptyContext.keys = () => []),
        (webpackEmptyContext.resolve = webpackEmptyContext),
        (webpackEmptyContext.id =
          "./node_modules/@storybook/test/dist sync recursive"),
        (module.exports = webpackEmptyContext);
    },
    "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/styles/globals.css":
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
          '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Quicksand:wght@300..700&display=swap");\n\n:root {\n  --primary: #20159e;\n  --on-primary: #ffffff;\n  --primary-container: #f6f5ff;\n  --on-primary-container: #080155;\n\n  --accent: #1680a1;\n  --on-accent: #ffffff;\n  --accent-container: #f5fcff;\n  --on-accent-container: #001b23;\n  --background: #ffffff;\n  --on-background: #021426;\n  --surface: #fbfbff;\n  --on-surface: #021426;\n  --outline: #d6dde1;\n  --outline-variant: #021426;\n\n  --success: #24804d;\n  --on-success: #ffffff;\n  --success-container: #f0fff6;\n  --on-success-container: #001e0d;\n  --warning-state: #fbf6d9;\n  --on-warning: #1c1b1f;\n  --warning-container: #ffaa44;\n  --on-warning-container: #1c1b1f;\n  --error: #b3261e;\n  --error-container: #f9dedc;\n\n  --primary-10: #030123;\n  --primary-20: #080155;\n  --primary-30: #140b7a;\n  --primary-40: #20159e;\n  --primary-50: #3023b8;\n  --primary-60: #5347d7;\n  --primary-70: #766ce3;\n  --primary-80: #9b93f1;\n  --primary-90: #c2bdf9;\n  --primary-95: #dfdcfc;\n  --primary-99: #f6f5ff;\n\n  --grey-10: #021426;\n  --grey-20: #2a333c;\n  --grey-30: #586874;\n  --grey-40: #788591;\n  --grey-50: #a2acb3;\n  --grey-60: #b9c1c6;\n  --grey-70: #d6dde1;\n  --grey-80: #f4f6f7;\n  --grey-90: #f6f8f9;\n  --grey-100: #ffffff;\n\n  /* Fonts */\n  --quicksand: Quicksand;\n  --inter: Inter;\n  --regular: 300;\n  --semibold: 600;\n  --bold: 700;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n  padding: 0;\n  margin: 0;\n}\n\nhtml,\nbody,\n#__next {\n  height: 100%;\n  overflow-x: auto;\n  font-size: 16px;\n}\n\nstrong {\n  font-weight: 700;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput[type="text"],\ninput[type="password"],\ntextarea {\n  border: none;\n  outline: none;\n}\n',
          "",
          {
            version: 3,
            sources: ["webpack://./src/styles/globals.css"],
            names: [],
            mappings:
              "AAAA,uHAAA;;AAEA;EACE,kBAAkB;EAClB,qBAAqB;EACrB,4BAA4B;EAC5B,+BAA+B;;EAE/B,iBAAiB;EACjB,oBAAoB;EACpB,2BAA2B;EAC3B,8BAA8B;EAC9B,qBAAqB;EACrB,wBAAwB;EACxB,kBAAkB;EAClB,qBAAqB;EACrB,kBAAkB;EAClB,0BAA0B;;EAE1B,kBAAkB;EAClB,qBAAqB;EACrB,4BAA4B;EAC5B,+BAA+B;EAC/B,wBAAwB;EACxB,qBAAqB;EACrB,4BAA4B;EAC5B,+BAA+B;EAC/B,gBAAgB;EAChB,0BAA0B;;EAE1B,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;;EAErB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;;EAEnB,UAAU;EACV,sBAAsB;EACtB,cAAc;EACd,cAAc;EACd,eAAe;EACf,WAAW;AACb;;AAEA;EACE,sBAAsB;AACxB;;AAEA;;;EAGE,mBAAmB;EACnB,UAAU;EACV,SAAS;AACX;;AAEA;;;EAGE,YAAY;EACZ,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;EAGE,YAAY;EACZ,aAAa;AACf",
            sourcesContent: [
              '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Quicksand:wght@300..700&display=swap");\n\n:root {\n  --primary: #20159e;\n  --on-primary: #ffffff;\n  --primary-container: #f6f5ff;\n  --on-primary-container: #080155;\n\n  --accent: #1680a1;\n  --on-accent: #ffffff;\n  --accent-container: #f5fcff;\n  --on-accent-container: #001b23;\n  --background: #ffffff;\n  --on-background: #021426;\n  --surface: #fbfbff;\n  --on-surface: #021426;\n  --outline: #d6dde1;\n  --outline-variant: #021426;\n\n  --success: #24804d;\n  --on-success: #ffffff;\n  --success-container: #f0fff6;\n  --on-success-container: #001e0d;\n  --warning-state: #fbf6d9;\n  --on-warning: #1c1b1f;\n  --warning-container: #ffaa44;\n  --on-warning-container: #1c1b1f;\n  --error: #b3261e;\n  --error-container: #f9dedc;\n\n  --primary-10: #030123;\n  --primary-20: #080155;\n  --primary-30: #140b7a;\n  --primary-40: #20159e;\n  --primary-50: #3023b8;\n  --primary-60: #5347d7;\n  --primary-70: #766ce3;\n  --primary-80: #9b93f1;\n  --primary-90: #c2bdf9;\n  --primary-95: #dfdcfc;\n  --primary-99: #f6f5ff;\n\n  --grey-10: #021426;\n  --grey-20: #2a333c;\n  --grey-30: #586874;\n  --grey-40: #788591;\n  --grey-50: #a2acb3;\n  --grey-60: #b9c1c6;\n  --grey-70: #d6dde1;\n  --grey-80: #f4f6f7;\n  --grey-90: #f6f8f9;\n  --grey-100: #ffffff;\n\n  /* Fonts */\n  --quicksand: Quicksand;\n  --inter: Inter;\n  --regular: 300;\n  --semibold: 600;\n  --bold: 700;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n  padding: 0;\n  margin: 0;\n}\n\nhtml,\nbody,\n#__next {\n  height: 100%;\n  overflow-x: auto;\n  font-size: 16px;\n}\n\nstrong {\n  font-weight: 700;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput[type="text"],\ninput[type="password"],\ntextarea {\n  border: none;\n  outline: none;\n}\n',
            ],
            sourceRoot: "",
          },
        ]);
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
    "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.mdx)$":
      (module) => {
        function webpackEmptyAsyncContext(req) {
          return Promise.resolve().then(() => {
            var e = new Error("Cannot find module '" + req + "'");
            throw ((e.code = "MODULE_NOT_FOUND"), e);
          });
        }
        (webpackEmptyAsyncContext.keys = () => []),
          (webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext),
          (webpackEmptyAsyncContext.id =
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.mdx)$"),
          (module.exports = webpackEmptyAsyncContext);
      },
    "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.stories\\.(js%7Cjsx%7Cmjs%7Cts%7Ctsx))$":
      (module, __unused_webpack_exports, __webpack_require__) => {
        var map = {
          "./components/counter/counter.stories": [
            "./src/components/counter/counter.stories.tsx",
            304,
          ],
          "./components/counter/counter.stories.tsx": [
            "./src/components/counter/counter.stories.tsx",
            304,
          ],
          "./components/design_system/breadcrumbs/Breadcrumbs.stories": [
            "./src/components/design_system/breadcrumbs/Breadcrumbs.stories.tsx",
            877,
            395,
            402,
            87,
          ],
          "./components/design_system/breadcrumbs/Breadcrumbs.stories.tsx": [
            "./src/components/design_system/breadcrumbs/Breadcrumbs.stories.tsx",
            877,
            395,
            402,
            87,
          ],
          "./components/design_system/button/Button.stories": [
            "./src/components/design_system/button/Button.stories.tsx",
            877,
            395,
            574,
            501,
          ],
          "./components/design_system/button/Button.stories.tsx": [
            "./src/components/design_system/button/Button.stories.tsx",
            877,
            395,
            574,
            501,
          ],
          "./components/design_system/button/ButtonIcon.stories": [
            "./src/components/design_system/button/ButtonIcon.stories.tsx",
            877,
            395,
            642,
          ],
          "./components/design_system/button/ButtonIcon.stories.tsx": [
            "./src/components/design_system/button/ButtonIcon.stories.tsx",
            877,
            395,
            642,
          ],
          "./components/design_system/card/Card.stories": [
            "./src/components/design_system/card/Card.stories.tsx",
            877,
            395,
            574,
            822,
          ],
          "./components/design_system/card/Card.stories.tsx": [
            "./src/components/design_system/card/Card.stories.tsx",
            877,
            395,
            574,
            822,
          ],
          "./components/design_system/dialog/Dialog.stories": [
            "./src/components/design_system/dialog/Dialog.stories.tsx",
            877,
            395,
            99,
            574,
            815,
            665,
          ],
          "./components/design_system/dialog/Dialog.stories.tsx": [
            "./src/components/design_system/dialog/Dialog.stories.tsx",
            877,
            395,
            99,
            574,
            815,
            665,
          ],
          "./components/design_system/dropdownMenu/DropdownMenu.stories": [
            "./src/components/design_system/dropdownMenu/DropdownMenu.stories.tsx",
            877,
            395,
            99,
            999,
            131,
          ],
          "./components/design_system/dropdownMenu/DropdownMenu.stories.tsx": [
            "./src/components/design_system/dropdownMenu/DropdownMenu.stories.tsx",
            877,
            395,
            99,
            999,
            131,
          ],
          "./components/design_system/filterChip/FilterChip.stories": [
            "./src/components/design_system/filterChip/FilterChip.stories.tsx",
            877,
            395,
            99,
            999,
            913,
          ],
          "./components/design_system/filterChip/FilterChip.stories.tsx": [
            "./src/components/design_system/filterChip/FilterChip.stories.tsx",
            877,
            395,
            99,
            999,
            913,
          ],
          "./components/design_system/search/Search.stories": [
            "./src/components/design_system/search/Search.stories.tsx",
            877,
            548,
            741,
          ],
          "./components/design_system/search/Search.stories.tsx": [
            "./src/components/design_system/search/Search.stories.tsx",
            877,
            548,
            741,
          ],
          "./components/design_system/tabs/Tabs.stories": [
            "./src/components/design_system/tabs/Tabs.stories.tsx",
            877,
            395,
            24,
            425,
          ],
          "./components/design_system/tabs/Tabs.stories.tsx": [
            "./src/components/design_system/tabs/Tabs.stories.tsx",
            877,
            395,
            24,
            425,
          ],
          "./components/student/EditStudentModal.stories": [
            "./src/components/student/EditStudentModal.stories.tsx",
            877,
            395,
            99,
            574,
            999,
            548,
            600,
            485,
          ],
          "./components/student/EditStudentModal.stories.tsx": [
            "./src/components/student/EditStudentModal.stories.tsx",
            877,
            395,
            99,
            574,
            999,
            548,
            600,
            485,
          ],
          "./theme/paper.stories": ["./src/theme/paper.stories.tsx", 877, 302],
          "./theme/paper.stories.tsx": [
            "./src/theme/paper.stories.tsx",
            877,
            302,
          ],
          "./theme/typography.stories": [
            "./src/theme/typography.stories.tsx",
            877,
            933,
          ],
          "./theme/typography.stories.tsx": [
            "./src/theme/typography.stories.tsx",
            877,
            933,
          ],
        };
        function webpackAsyncContext(req) {
          if (!__webpack_require__.o(map, req))
            return Promise.resolve().then(() => {
              var e = new Error("Cannot find module '" + req + "'");
              throw ((e.code = "MODULE_NOT_FOUND"), e);
            });
          var ids = map[req],
            id = ids[0];
          return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() =>
            __webpack_require__(id)
          );
        }
        (webpackAsyncContext.keys = () => Object.keys(map)),
          (webpackAsyncContext.id =
            "./src lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:[\\\\/]src(?:[\\\\/](?%21\\.)(?:(?:(?%21(?:^%7C[\\\\/])\\.).)*?)[\\\\/]%7C[\\\\/]%7C$)(?%21\\.)(?=.)[^\\\\/]*?\\.stories\\.(js%7Cjsx%7Cmjs%7Cts%7Ctsx))$"),
          (module.exports = webpackAsyncContext);
      },
    "storybook/internal/channels": (module) => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CHANNELS__;
    },
    "storybook/internal/client-logger": (module) => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CLIENT_LOGGER__;
    },
    "storybook/internal/preview-errors": (module) => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
    },
    "storybook/internal/core-events": (module) => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_CORE_EVENTS__;
    },
    "@storybook/global": (module) => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_GLOBAL__;
    },
    "storybook/internal/preview-api": (module) => {
      "use strict";
      module.exports = __STORYBOOK_MODULE_PREVIEW_API__;
    },
    "?c969": () => {},
    "?ed1b": () => {},
    "?d17e": () => {},
  },
  (__webpack_require__) => {
    __webpack_require__.O(0, [149], () => {
      return (
        (moduleId = "./storybook-config-entry.js"),
        __webpack_require__((__webpack_require__.s = moduleId))
      );
      var moduleId;
    });
    __webpack_require__.O();
  },
]);
