"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [304],
  {
    "./src/components/counter/counter.stories.tsx": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Basic: () => Basic,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => counter_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/next/dist/compiled/react/jsx-runtime.js"
        ),
        injectStylesIntoStyleTag =
          (__webpack_require__(
            "./node_modules/next/dist/compiled/react/index.js"
          ),
          __webpack_require__(
            "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
          )),
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
        Paratrials_module = __webpack_require__(
          "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/paraTrials/Paratrials.module.css"
        ),
        options = {};
      (options.styleTagTransform = styleTagTransform_default()),
        (options.setAttributes = setAttributesWithoutAttributes_default()),
        (options.insert = insertBySelector_default().bind(null, "head")),
        (options.domAPI = styleDomAPI_default()),
        (options.insertStyleElement = insertStyleElement_default());
      injectStylesIntoStyleTag_default()(Paratrials_module.Z, options);
      const paraTrials_Paratrials_module =
          Paratrials_module.Z && Paratrials_module.Z.locals
            ? Paratrials_module.Z.locals
            : void 0,
        counter_counter = ({
          title,
          count,
          onIncrement,
          onDecrement,
          disableInc,
          disableDec,
          color,
        }) =>
          (0, jsx_runtime.jsxs)("div", {
            className: paraTrials_Paratrials_module.counterContainer,
            children: [
              (0, jsx_runtime.jsxs)("div", {
                className: paraTrials_Paratrials_module.counterButtonContainer,
                children: [
                  (0, jsx_runtime.jsx)("button", {
                    onClick: onDecrement,
                    className: `${paraTrials_Paratrials_module.counterButton} ${paraTrials_Paratrials_module[`counterButton-${color}`]}`,
                    disabled: disableDec,
                    children: "-",
                  }),
                  (0, jsx_runtime.jsx)("p", {
                    className: `${paraTrials_Paratrials_module.counterNumberDisplay} ${paraTrials_Paratrials_module[`counterNumberDisplay-${color}`]}`,
                    children: count,
                  }),
                  (0, jsx_runtime.jsx)("button", {
                    onClick: onIncrement,
                    className: `${paraTrials_Paratrials_module.counterButton} ${paraTrials_Paratrials_module[`counterButton-${color}`]}`,
                    disabled: disableInc,
                    children: "+",
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)("p", {
                className: paraTrials_Paratrials_module.counterTitle,
                children: title,
              }),
            ],
          });
      try {
        (counter.displayName = "counter"),
          (counter.__docgenInfo = {
            description: "",
            displayName: "counter",
            props: {
              title: {
                defaultValue: null,
                description: "",
                name: "title",
                required: !0,
                type: { name: "ReactNode" },
              },
              count: {
                defaultValue: null,
                description: "",
                name: "count",
                required: !0,
                type: { name: "number" },
              },
              onIncrement: {
                defaultValue: null,
                description: "",
                name: "onIncrement",
                required: !0,
                type: { name: "() => void" },
              },
              onDecrement: {
                defaultValue: null,
                description: "",
                name: "onDecrement",
                required: !0,
                type: { name: "() => void" },
              },
              disableInc: {
                defaultValue: null,
                description: "",
                name: "disableInc",
                required: !0,
                type: { name: "boolean" },
              },
              disableDec: {
                defaultValue: null,
                description: "",
                name: "disableDec",
                required: !0,
                type: { name: "boolean" },
              },
              color: {
                defaultValue: null,
                description: "",
                name: "color",
                required: !0,
                type: {
                  name: "enum",
                  value: [
                    { value: '"blue"' },
                    { value: '"green"' },
                    { value: '"yellow"' },
                    { value: '"red"' },
                  ],
                },
              },
            },
          }),
          "undefined" != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              "src/components/counter/counter.tsx#counter"
            ] = {
              docgenInfo: counter.__docgenInfo,
              name: "counter",
              path: "src/components/counter/counter.tsx#counter",
            });
      } catch (__react_docgen_typescript_loader_error) {}
      const counter_stories = { component: counter_counter },
        Basic = {},
        __namedExportsOrder = ["Basic"];
      Basic.parameters = {
        ...Basic.parameters,
        docs: {
          ...Basic.parameters?.docs,
          source: { originalSource: "{}", ...Basic.parameters?.docs?.source },
        },
      };
    },
    "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[6].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/components/paraTrials/Paratrials.module.css":
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
          "/* Styles for counter component */\n.Paratrials_counterContainer__TpfVW {\n  margin: 10px 0;\n  width: 100%;\n}\n\n.Paratrials_counterButtonContainer__IC8vM {\n  display: grid;\n  grid-template-columns: 30% 40% 30%;\n  height: 50px;\n  margin: 0 auto;\n  border-radius: 4px;\n  overflow: hidden;\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 40px;\n}\n\n.Paratrials_counterButton__oMwvk {\n  color: var(--grey-100);\n  font-family: inherit;\n  font-size: 2rem;\n  width: 100%;\n  height: 100%;\n  border: none;\n  cursor: pointer;\n}\n\n/* TODO: Ask design team for disabled button versions */\n.Paratrials_counterButton__oMwvk:disabled {\n  background-color: var(--grey-50);\n  cursor: default;\n}\n\n.Paratrials_counterNumberDisplay__pOi1G {\n  color: var(--grey-10);\n  font-family: inherit;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.Paratrials_counterButton-blue__kJoLG {\n  background-color: var(--accent);\n}\n.Paratrials_counterNumberDisplay-blue__4dEEA {\n  background-color: var(--accent);\n}\n.Paratrials_counterButton-green__J70R_ {\n  background-color: var(--success);\n}\n.Paratrials_counterNumberDisplay-green__5hjAA {\n  background-color: var(--success-container);\n}\n.Paratrials_counterButton-yellow__uv4XB {\n  background-color: var(--warning-container);\n}\n.Paratrials_counterNumberDisplay-yellow__nPQ13 {\n  background-color: var(--warning-state);\n}\n.Paratrials_counterButton-red___6Klh {\n  background-color: var(--error);\n}\n.Paratrials_counterNumberDisplay-red__zOObn {\n  background-color: var(--error-container);\n}\n\n.Paratrials_counterTitle___C_eZ {\n  font-family: inherit;\n  font-size: 20px;\n  font-weight: 600;\n  color: var(--grey-30);\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.25em;\n}\n\n/* Styles for timer components */\n.Paratrials_timerContainer__Fwssh {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  align-items: center;\n  justify-items: center;\n}\n\n.Paratrials_startStopButton__xR2l9 {\n  border: none;\n  border-radius: 50%;\n  color: var(--on-primary);\n  background-color: var(--primary);\n  height: 50px;\n  width: 50px;\n  cursor: pointer;\n}\n\n.Paratrials_resetButton__iUjoc {\n  border: none;\n  background: none;\n  color: var(--primary-40);\n  font-size: 50px;\n  cursor: pointer;\n}\n\n.Paratrials_timer__5zzl2 {\n  font-size: 40px;\n  font-weight: 600;\n  display: flex;\n  color: var(--primary);\n}\n\n.Paratrials_timer__5zzl2 span {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.Paratrials_timer__5zzl2 span p {\n  font-size: 16px;\n  font-weight: normal;\n}\n\n.Paratrials_numPadContainer__oNqcu {\n  color: var(--primary);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.Paratrials_numPadContainer__oNqcu h2 {\n  color: var(--on-surface);\n}\n\n.Paratrials_numPad__YZL_b {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  grid-template-rows: repeat(4, minmax(0, 1fr));\n  row-gap: 5px;\n  column-gap: 5px;\n}\n\n.Paratrials_numPadButton__jTYLg {\n  color: inherit;\n  background: none;\n  border: none;\n  font-size: 32px;\n  font-weight: 600;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.Paratrials_startButton__sTcjE {\n  border: none;\n  border-radius: 50%;\n  height: 100px;\n  width: 100px;\n  background-color: var(--primary);\n  color: var(--on-primary);\n  cursor: pointer;\n}\n\n.Paratrials_setTimerButton__9le0K {\n  border-radius: 20px;\n  background: none;\n  padding: 5px 10px;\n  border: 1px solid black;\n  cursor: pointer;\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./src/components/paraTrials/Paratrials.module.css",
            ],
            names: [],
            mappings:
              "AAAA,iCAAA;AACA;EACE,cAAc;EACd,WAAW;AACb;;AAEA;EACE,aAAa;EACb,kCAAkC;EAClC,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,gBAAgB;EAChB,oBAAoB;EACpB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;EACE,sBAAsB;EACtB,oBAAoB;EACpB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,eAAe;AACjB;;AAEA,uDAAuD;AACvD;EACE,gCAAgC;EAChC,eAAe;AACjB;;AAEA;EACE,qBAAqB;EACrB,oBAAoB;EACpB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,sCAAsC;AACxC;AACA;EACE,8BAA8B;AAChC;AACA;EACE,wCAAwC;AAC1C;;AAEA;EACE,oBAAoB;EACpB,eAAe;EACf,gBAAgB;EAChB,qBAAqB;EACrB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,WAAW;AACb;;AAEA,gCAAgC;AAChC;EACE,aAAa;EACb,kCAAkC;EAClC,mBAAmB;EACnB,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,wBAAwB;EACxB,gCAAgC;EAChC,YAAY;EACZ,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,wBAAwB;EACxB,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;EACrB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,gDAAgD;EAChD,6CAA6C;EAC7C,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,YAAY;EACZ,eAAe;EACf,gBAAgB;EAChB,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,YAAY;EACZ,gCAAgC;EAChC,wBAAwB;EACxB,eAAe;AACjB;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,uBAAuB;EACvB,eAAe;AACjB",
            sourcesContent: [
              "/* Styles for counter component */\n.counterContainer {\n  margin: 10px 0;\n  width: 100%;\n}\n\n.counterButtonContainer {\n  display: grid;\n  grid-template-columns: 30% 40% 30%;\n  height: 50px;\n  margin: 0 auto;\n  border-radius: 4px;\n  overflow: hidden;\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 40px;\n}\n\n.counterButton {\n  color: var(--grey-100);\n  font-family: inherit;\n  font-size: 2rem;\n  width: 100%;\n  height: 100%;\n  border: none;\n  cursor: pointer;\n}\n\n/* TODO: Ask design team for disabled button versions */\n.counterButton:disabled {\n  background-color: var(--grey-50);\n  cursor: default;\n}\n\n.counterNumberDisplay {\n  color: var(--grey-10);\n  font-family: inherit;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.counterButton-blue {\n  background-color: var(--accent);\n}\n.counterNumberDisplay-blue {\n  background-color: var(--accent);\n}\n.counterButton-green {\n  background-color: var(--success);\n}\n.counterNumberDisplay-green {\n  background-color: var(--success-container);\n}\n.counterButton-yellow {\n  background-color: var(--warning-container);\n}\n.counterNumberDisplay-yellow {\n  background-color: var(--warning-state);\n}\n.counterButton-red {\n  background-color: var(--error);\n}\n.counterNumberDisplay-red {\n  background-color: var(--error-container);\n}\n\n.counterTitle {\n  font-family: inherit;\n  font-size: 20px;\n  font-weight: 600;\n  color: var(--grey-30);\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.25em;\n}\n\n/* Styles for timer components */\n.timerContainer {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  align-items: center;\n  justify-items: center;\n}\n\n.startStopButton {\n  border: none;\n  border-radius: 50%;\n  color: var(--on-primary);\n  background-color: var(--primary);\n  height: 50px;\n  width: 50px;\n  cursor: pointer;\n}\n\n.resetButton {\n  border: none;\n  background: none;\n  color: var(--primary-40);\n  font-size: 50px;\n  cursor: pointer;\n}\n\n.timer {\n  font-size: 40px;\n  font-weight: 600;\n  display: flex;\n  color: var(--primary);\n}\n\n.timer span {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.timer span p {\n  font-size: 16px;\n  font-weight: normal;\n}\n\n.numPadContainer {\n  color: var(--primary);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.numPadContainer h2 {\n  color: var(--on-surface);\n}\n\n.numPad {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  grid-template-rows: repeat(4, minmax(0, 1fr));\n  row-gap: 5px;\n  column-gap: 5px;\n}\n\n.numPadButton {\n  color: inherit;\n  background: none;\n  border: none;\n  font-size: 32px;\n  font-weight: 600;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.startButton {\n  border: none;\n  border-radius: 50%;\n  height: 100px;\n  width: 100px;\n  background-color: var(--primary);\n  color: var(--on-primary);\n  cursor: pointer;\n}\n\n.setTimerButton {\n  border-radius: 20px;\n  background: none;\n  padding: 5px 10px;\n  border: 1px solid black;\n  cursor: pointer;\n}\n",
            ],
            sourceRoot: "",
          },
        ]),
          (___CSS_LOADER_EXPORT___.locals = {
            counterContainer: "Paratrials_counterContainer__TpfVW",
            counterButtonContainer: "Paratrials_counterButtonContainer__IC8vM",
            counterButton: "Paratrials_counterButton__oMwvk",
            counterNumberDisplay: "Paratrials_counterNumberDisplay__pOi1G",
            "counterButton-blue": "Paratrials_counterButton-blue__kJoLG",
            "counterNumberDisplay-blue":
              "Paratrials_counterNumberDisplay-blue__4dEEA",
            "counterButton-green": "Paratrials_counterButton-green__J70R_",
            "counterNumberDisplay-green":
              "Paratrials_counterNumberDisplay-green__5hjAA",
            "counterButton-yellow": "Paratrials_counterButton-yellow__uv4XB",
            "counterNumberDisplay-yellow":
              "Paratrials_counterNumberDisplay-yellow__nPQ13",
            "counterButton-red": "Paratrials_counterButton-red___6Klh",
            "counterNumberDisplay-red":
              "Paratrials_counterNumberDisplay-red__zOObn",
            counterTitle: "Paratrials_counterTitle___C_eZ",
            timerContainer: "Paratrials_timerContainer__Fwssh",
            startStopButton: "Paratrials_startStopButton__xR2l9",
            resetButton: "Paratrials_resetButton__iUjoc",
            timer: "Paratrials_timer__5zzl2",
            numPadContainer: "Paratrials_numPadContainer__oNqcu",
            numPad: "Paratrials_numPad__YZL_b",
            numPadButton: "Paratrials_numPadButton__jTYLg",
            startButton: "Paratrials_startButton__sTcjE",
            setTimerButton: "Paratrials_setTimerButton__9le0K",
          });
        const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
      },
  },
]);
