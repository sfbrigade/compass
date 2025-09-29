"use strict";
(self.webpackChunkproject_compass =
  self.webpackChunkproject_compass || []).push([
  [999],
  {
    "./node_modules/@mui/material/List/ListContext.js": (
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
    "./node_modules/@mui/material/Menu/Menu.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, { Z: () => Menu_Menu });
      var react = __webpack_require__(
          "./node_modules/next/dist/compiled/react/index.js"
        ),
        clsx = __webpack_require__("./node_modules/clsx/dist/clsx.mjs"),
        composeClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"
        ),
        RtlProvider = __webpack_require__(
          "./node_modules/@mui/system/esm/RtlProvider/index.js"
        ),
        useSlotProps = __webpack_require__(
          "./node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js"
        ),
        ownerDocument = __webpack_require__(
          "./node_modules/@mui/material/utils/ownerDocument.js"
        ),
        styled = __webpack_require__(
          "./node_modules/@mui/material/styles/styled.js"
        ),
        DefaultPropsProvider = __webpack_require__(
          "./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"
        ),
        ListContext = __webpack_require__(
          "./node_modules/@mui/material/List/ListContext.js"
        ),
        generateUtilityClasses = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"
        ),
        generateUtilityClass = __webpack_require__(
          "./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"
        );
      function getListUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiList", slot);
      }
      (0, generateUtilityClasses.Z)("MuiList", [
        "root",
        "padding",
        "dense",
        "subheader",
      ]);
      var jsx_runtime = __webpack_require__(
        "./node_modules/next/dist/compiled/react/jsx-runtime.js"
      );
      const ListRoot = (0, styled.ZP)("ul", {
          name: "MuiList",
          slot: "Root",
          overridesResolver: (props, styles) => {
            const { ownerState } = props;
            return [
              styles.root,
              !ownerState.disablePadding && styles.padding,
              ownerState.dense && styles.dense,
              ownerState.subheader && styles.subheader,
            ];
          },
        })({
          listStyle: "none",
          margin: 0,
          padding: 0,
          position: "relative",
          variants: [
            {
              props: ({ ownerState }) => !ownerState.disablePadding,
              style: { paddingTop: 8, paddingBottom: 8 },
            },
            {
              props: ({ ownerState }) => ownerState.subheader,
              style: { paddingTop: 0 },
            },
          ],
        }),
        List_List = react.forwardRef(function List(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiList",
            }),
            {
              children,
              className,
              component = "ul",
              dense = !1,
              disablePadding = !1,
              subheader,
              ...other
            } = props,
            context = react.useMemo(() => ({ dense }), [dense]),
            ownerState = { ...props, component, dense, disablePadding },
            classes = ((ownerState) => {
              const { classes, disablePadding, dense, subheader } = ownerState,
                slots = {
                  root: [
                    "root",
                    !disablePadding && "padding",
                    dense && "dense",
                    subheader && "subheader",
                  ],
                };
              return (0, composeClasses.Z)(slots, getListUtilityClass, classes);
            })(ownerState);
          return (0, jsx_runtime.jsx)(ListContext.Z.Provider, {
            value: context,
            children: (0, jsx_runtime.jsxs)(ListRoot, {
              as: component,
              className: (0, clsx.Z)(classes.root, className),
              ref,
              ownerState,
              ...other,
              children: [subheader, children],
            }),
          });
        });
      const utils_getScrollbarSize = __webpack_require__(
        "./node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js"
      ).Z;
      var useForkRef = __webpack_require__(
          "./node_modules/@mui/material/utils/useForkRef.js"
        ),
        useEnhancedEffect = __webpack_require__(
          "./node_modules/@mui/material/utils/useEnhancedEffect.js"
        ),
        ownerWindow = __webpack_require__(
          "./node_modules/@mui/material/utils/ownerWindow.js"
        );
      function nextItem(list, item, disableListWrap) {
        return list === item
          ? list.firstChild
          : item && item.nextElementSibling
            ? item.nextElementSibling
            : disableListWrap
              ? null
              : list.firstChild;
      }
      function previousItem(list, item, disableListWrap) {
        return list === item
          ? disableListWrap
            ? list.firstChild
            : list.lastChild
          : item && item.previousElementSibling
            ? item.previousElementSibling
            : disableListWrap
              ? null
              : list.lastChild;
      }
      function textCriteriaMatches(nextFocus, textCriteria) {
        if (void 0 === textCriteria) return !0;
        let text = nextFocus.innerText;
        return (
          void 0 === text && (text = nextFocus.textContent),
          (text = text.trim().toLowerCase()),
          0 !== text.length &&
            (textCriteria.repeating
              ? text[0] === textCriteria.keys[0]
              : text.startsWith(textCriteria.keys.join("")))
        );
      }
      function moveFocus(
        list,
        currentFocus,
        disableListWrap,
        disabledItemsFocusable,
        traversalFunction,
        textCriteria
      ) {
        let wrappedOnce = !1,
          nextFocus = traversalFunction(
            list,
            currentFocus,
            !!currentFocus && disableListWrap
          );
        for (; nextFocus; ) {
          if (nextFocus === list.firstChild) {
            if (wrappedOnce) return !1;
            wrappedOnce = !0;
          }
          const nextFocusDisabled =
            !disabledItemsFocusable &&
            (nextFocus.disabled ||
              "true" === nextFocus.getAttribute("aria-disabled"));
          if (
            nextFocus.hasAttribute("tabindex") &&
            textCriteriaMatches(nextFocus, textCriteria) &&
            !nextFocusDisabled
          )
            return nextFocus.focus(), !0;
          nextFocus = traversalFunction(list, nextFocus, disableListWrap);
        }
        return !1;
      }
      const MenuList_MenuList = react.forwardRef(function MenuList(props, ref) {
        const {
            actions,
            autoFocus = !1,
            autoFocusItem = !1,
            children,
            className,
            disabledItemsFocusable = !1,
            disableListWrap = !1,
            onKeyDown,
            variant = "selectedMenu",
            ...other
          } = props,
          listRef = react.useRef(null),
          textCriteriaRef = react.useRef({
            keys: [],
            repeating: !0,
            previousKeyMatched: !0,
            lastTime: null,
          });
        (0, useEnhancedEffect.Z)(() => {
          autoFocus && listRef.current.focus();
        }, [autoFocus]),
          react.useImperativeHandle(
            actions,
            () => ({
              adjustStyleForScrollbar: (containerElement, { direction }) => {
                const noExplicitWidth = !listRef.current.style.width;
                if (
                  containerElement.clientHeight <
                    listRef.current.clientHeight &&
                  noExplicitWidth
                ) {
                  const scrollbarSize = `${utils_getScrollbarSize((0, ownerWindow.Z)(containerElement))}px`;
                  (listRef.current.style[
                    "rtl" === direction ? "paddingLeft" : "paddingRight"
                  ] = scrollbarSize),
                    (listRef.current.style.width = `calc(100% + ${scrollbarSize})`);
                }
                return listRef.current;
              },
            }),
            []
          );
        const handleRef = (0, useForkRef.Z)(listRef, ref);
        let activeItemIndex = -1;
        react.Children.forEach(children, (child, index) => {
          react.isValidElement(child)
            ? (child.props.disabled ||
                ((("selectedMenu" === variant && child.props.selected) ||
                  -1 === activeItemIndex) &&
                  (activeItemIndex = index)),
              activeItemIndex === index &&
                (child.props.disabled ||
                  child.props.muiSkipListHighlight ||
                  child.type.muiSkipListHighlight) &&
                ((activeItemIndex += 1),
                activeItemIndex >= children.length && (activeItemIndex = -1)))
            : activeItemIndex === index &&
              ((activeItemIndex += 1),
              activeItemIndex >= children.length && (activeItemIndex = -1));
        });
        const items = react.Children.map(children, (child, index) => {
          if (index === activeItemIndex) {
            const newChildProps = {};
            return (
              autoFocusItem && (newChildProps.autoFocus = !0),
              void 0 === child.props.tabIndex &&
                "selectedMenu" === variant &&
                (newChildProps.tabIndex = 0),
              react.cloneElement(child, newChildProps)
            );
          }
          return child;
        });
        return (0, jsx_runtime.jsx)(List_List, {
          role: "menu",
          ref: handleRef,
          className,
          onKeyDown: (event) => {
            const list = listRef.current,
              key = event.key;
            if (event.ctrlKey || event.metaKey || event.altKey)
              return void (onKeyDown && onKeyDown(event));
            const currentFocus = (0, ownerDocument.Z)(list).activeElement;
            if ("ArrowDown" === key)
              event.preventDefault(),
                moveFocus(
                  list,
                  currentFocus,
                  disableListWrap,
                  disabledItemsFocusable,
                  nextItem
                );
            else if ("ArrowUp" === key)
              event.preventDefault(),
                moveFocus(
                  list,
                  currentFocus,
                  disableListWrap,
                  disabledItemsFocusable,
                  previousItem
                );
            else if ("Home" === key)
              event.preventDefault(),
                moveFocus(
                  list,
                  null,
                  disableListWrap,
                  disabledItemsFocusable,
                  nextItem
                );
            else if ("End" === key)
              event.preventDefault(),
                moveFocus(
                  list,
                  null,
                  disableListWrap,
                  disabledItemsFocusable,
                  previousItem
                );
            else if (1 === key.length) {
              const criteria = textCriteriaRef.current,
                lowerKey = key.toLowerCase(),
                currTime = performance.now();
              criteria.keys.length > 0 &&
                (currTime - criteria.lastTime > 500
                  ? ((criteria.keys = []),
                    (criteria.repeating = !0),
                    (criteria.previousKeyMatched = !0))
                  : criteria.repeating &&
                    lowerKey !== criteria.keys[0] &&
                    (criteria.repeating = !1)),
                (criteria.lastTime = currTime),
                criteria.keys.push(lowerKey);
              const keepFocusOnCurrent =
                currentFocus &&
                !criteria.repeating &&
                textCriteriaMatches(currentFocus, criteria);
              criteria.previousKeyMatched &&
              (keepFocusOnCurrent ||
                moveFocus(
                  list,
                  currentFocus,
                  !1,
                  disabledItemsFocusable,
                  nextItem,
                  criteria
                ))
                ? event.preventDefault()
                : (criteria.previousKeyMatched = !1);
            }
            onKeyDown && onKeyDown(event);
          },
          tabIndex: autoFocus ? 0 : -1,
          ...other,
          children: items,
        });
      });
      var isHostComponent = __webpack_require__(
          "./node_modules/@mui/material/utils/isHostComponent.js"
        ),
        debounce = __webpack_require__(
          "./node_modules/@mui/material/utils/debounce.js"
        ),
        useTimeout = __webpack_require__(
          "./node_modules/@mui/utils/esm/useTimeout/useTimeout.js"
        ),
        getReactElementRef = __webpack_require__(
          "./node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js"
        ),
        Transition = __webpack_require__(
          "./node_modules/react-transition-group/esm/Transition.js"
        ),
        useTheme = __webpack_require__(
          "./node_modules/@mui/material/styles/useTheme.js"
        ),
        utils = __webpack_require__(
          "./node_modules/@mui/material/transitions/utils.js"
        );
      function getScale(value) {
        return `scale(${value}, ${value ** 2})`;
      }
      const styles = {
          entering: { opacity: 1, transform: getScale(1) },
          entered: { opacity: 1, transform: "none" },
        },
        isWebKit154 =
          "undefined" != typeof navigator &&
          /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) &&
          /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
        Grow = react.forwardRef(function Grow(props, ref) {
          const {
              addEndListener,
              appear = !0,
              children,
              easing,
              in: inProp,
              onEnter,
              onEntered,
              onEntering,
              onExit,
              onExited,
              onExiting,
              style,
              timeout = "auto",
              TransitionComponent = Transition.ZP,
              ...other
            } = props,
            timer = (0, useTimeout.Z)(),
            autoTimeout = react.useRef(),
            theme = (0, useTheme.Z)(),
            nodeRef = react.useRef(null),
            handleRef = (0, useForkRef.Z)(
              nodeRef,
              (0, getReactElementRef.Z)(children),
              ref
            ),
            normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
              if (callback) {
                const node = nodeRef.current;
                void 0 === maybeIsAppearing
                  ? callback(node)
                  : callback(node, maybeIsAppearing);
              }
            },
            handleEntering = normalizedTransitionCallback(onEntering),
            handleEnter = normalizedTransitionCallback((node, isAppearing) => {
              (0, utils.n)(node);
              const {
                duration: transitionDuration,
                delay,
                easing: transitionTimingFunction,
              } = (0, utils.C)({ style, timeout, easing }, { mode: "enter" });
              let duration;
              "auto" === timeout
                ? ((duration = theme.transitions.getAutoHeightDuration(
                    node.clientHeight
                  )),
                  (autoTimeout.current = duration))
                : (duration = transitionDuration),
                (node.style.transition = [
                  theme.transitions.create("opacity", { duration, delay }),
                  theme.transitions.create("transform", {
                    duration: isWebKit154 ? duration : 0.666 * duration,
                    delay,
                    easing: transitionTimingFunction,
                  }),
                ].join(",")),
                onEnter && onEnter(node, isAppearing);
            }),
            handleEntered = normalizedTransitionCallback(onEntered),
            handleExiting = normalizedTransitionCallback(onExiting),
            handleExit = normalizedTransitionCallback((node) => {
              const {
                duration: transitionDuration,
                delay,
                easing: transitionTimingFunction,
              } = (0, utils.C)({ style, timeout, easing }, { mode: "exit" });
              let duration;
              "auto" === timeout
                ? ((duration = theme.transitions.getAutoHeightDuration(
                    node.clientHeight
                  )),
                  (autoTimeout.current = duration))
                : (duration = transitionDuration),
                (node.style.transition = [
                  theme.transitions.create("opacity", { duration, delay }),
                  theme.transitions.create("transform", {
                    duration: isWebKit154 ? duration : 0.666 * duration,
                    delay: isWebKit154 ? delay : delay || 0.333 * duration,
                    easing: transitionTimingFunction,
                  }),
                ].join(",")),
                (node.style.opacity = 0),
                (node.style.transform = getScale(0.75)),
                onExit && onExit(node);
            }),
            handleExited = normalizedTransitionCallback(onExited);
          return (0, jsx_runtime.jsx)(TransitionComponent, {
            appear,
            in: inProp,
            nodeRef,
            onEnter: handleEnter,
            onEntered: handleEntered,
            onEntering: handleEntering,
            onExit: handleExit,
            onExited: handleExited,
            onExiting: handleExiting,
            addEndListener: (next) => {
              "auto" === timeout && timer.start(autoTimeout.current || 0, next),
                addEndListener && addEndListener(nodeRef.current, next);
            },
            timeout: "auto" === timeout ? null : timeout,
            ...other,
            children: (state, { ownerState, ...restChildProps }) =>
              react.cloneElement(children, {
                style: {
                  opacity: 0,
                  transform: getScale(0.75),
                  visibility: "exited" !== state || inProp ? void 0 : "hidden",
                  ...styles[state],
                  ...style,
                  ...children.props.style,
                },
                ref: handleRef,
                ...restChildProps,
              }),
          });
        });
      Grow && (Grow.muiSupportAuto = !0);
      const Grow_Grow = Grow;
      var Modal = __webpack_require__(
          "./node_modules/@mui/material/Modal/Modal.js"
        ),
        Paper = __webpack_require__(
          "./node_modules/@mui/material/Paper/Paper.js"
        );
      function getPopoverUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiPopover", slot);
      }
      (0, generateUtilityClasses.Z)("MuiPopover", ["root", "paper"]);
      var useSlot = __webpack_require__(
        "./node_modules/@mui/material/utils/useSlot.js"
      );
      function mergeSlotProps(externalSlotProps, defaultSlotProps) {
        if (!externalSlotProps) return defaultSlotProps;
        if (
          "function" == typeof externalSlotProps ||
          "function" == typeof defaultSlotProps
        )
          return (ownerState) => {
            const defaultSlotPropsValue =
                "function" == typeof defaultSlotProps
                  ? defaultSlotProps(ownerState)
                  : defaultSlotProps,
              externalSlotPropsValue =
                "function" == typeof externalSlotProps
                  ? externalSlotProps({
                      ...ownerState,
                      ...defaultSlotPropsValue,
                    })
                  : externalSlotProps,
              className = (0, clsx.Z)(
                ownerState?.className,
                defaultSlotPropsValue?.className,
                externalSlotPropsValue?.className
              );
            return {
              ...defaultSlotPropsValue,
              ...externalSlotPropsValue,
              ...(!!className && { className }),
              ...(defaultSlotPropsValue?.style &&
                externalSlotPropsValue?.style && {
                  style: {
                    ...defaultSlotPropsValue.style,
                    ...externalSlotPropsValue.style,
                  },
                }),
              ...(defaultSlotPropsValue?.sx &&
                externalSlotPropsValue?.sx && {
                  sx: [
                    ...(Array.isArray(defaultSlotPropsValue.sx)
                      ? defaultSlotPropsValue.sx
                      : [defaultSlotPropsValue.sx]),
                    ...(Array.isArray(externalSlotPropsValue.sx)
                      ? externalSlotPropsValue.sx
                      : [externalSlotPropsValue.sx]),
                  ],
                }),
            };
          };
        const typedDefaultSlotProps = defaultSlotProps,
          className = (0, clsx.Z)(
            typedDefaultSlotProps?.className,
            externalSlotProps?.className
          );
        return {
          ...defaultSlotProps,
          ...externalSlotProps,
          ...(!!className && { className }),
          ...(typedDefaultSlotProps?.style &&
            externalSlotProps?.style && {
              style: {
                ...typedDefaultSlotProps.style,
                ...externalSlotProps.style,
              },
            }),
          ...(typedDefaultSlotProps?.sx &&
            externalSlotProps?.sx && {
              sx: [
                ...(Array.isArray(typedDefaultSlotProps.sx)
                  ? typedDefaultSlotProps.sx
                  : [typedDefaultSlotProps.sx]),
                ...(Array.isArray(externalSlotProps.sx)
                  ? externalSlotProps.sx
                  : [externalSlotProps.sx]),
              ],
            }),
        };
      }
      function getOffsetTop(rect, vertical) {
        let offset = 0;
        return (
          "number" == typeof vertical
            ? (offset = vertical)
            : "center" === vertical
              ? (offset = rect.height / 2)
              : "bottom" === vertical && (offset = rect.height),
          offset
        );
      }
      function getOffsetLeft(rect, horizontal) {
        let offset = 0;
        return (
          "number" == typeof horizontal
            ? (offset = horizontal)
            : "center" === horizontal
              ? (offset = rect.width / 2)
              : "right" === horizontal && (offset = rect.width),
          offset
        );
      }
      function getTransformOriginValue(transformOrigin) {
        return [transformOrigin.horizontal, transformOrigin.vertical]
          .map((n) => ("number" == typeof n ? `${n}px` : n))
          .join(" ");
      }
      function resolveAnchorEl(anchorEl) {
        return "function" == typeof anchorEl ? anchorEl() : anchorEl;
      }
      const PopoverRoot = (0, styled.ZP)(Modal.Z, {
          name: "MuiPopover",
          slot: "Root",
          overridesResolver: (props, styles) => styles.root,
        })({}),
        PopoverPaper = (0, styled.ZP)(Paper.Z, {
          name: "MuiPopover",
          slot: "Paper",
          overridesResolver: (props, styles) => styles.paper,
        })({
          position: "absolute",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: 16,
          minHeight: 16,
          maxWidth: "calc(100% - 32px)",
          maxHeight: "calc(100% - 32px)",
          outline: 0,
        }),
        Popover_Popover = react.forwardRef(function Popover(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiPopover",
            }),
            {
              action,
              anchorEl,
              anchorOrigin = { vertical: "top", horizontal: "left" },
              anchorPosition,
              anchorReference = "anchorEl",
              children,
              className,
              container: containerProp,
              elevation = 8,
              marginThreshold = 16,
              open,
              PaperProps: PaperPropsProp = {},
              slots = {},
              slotProps = {},
              transformOrigin = { vertical: "top", horizontal: "left" },
              TransitionComponent,
              transitionDuration: transitionDurationProp = "auto",
              TransitionProps = {},
              disableScrollLock = !1,
              ...other
            } = props,
            paperRef = react.useRef(),
            ownerState = {
              ...props,
              anchorOrigin,
              anchorReference,
              elevation,
              marginThreshold,
              transformOrigin,
              TransitionComponent,
              transitionDuration: transitionDurationProp,
              TransitionProps,
            },
            classes = ((ownerState) => {
              const { classes } = ownerState;
              return (0, composeClasses.Z)(
                { root: ["root"], paper: ["paper"] },
                getPopoverUtilityClass,
                classes
              );
            })(ownerState),
            getAnchorOffset = react.useCallback(() => {
              if ("anchorPosition" === anchorReference) return anchorPosition;
              const resolvedAnchorEl = resolveAnchorEl(anchorEl),
                anchorRect = (
                  resolvedAnchorEl && 1 === resolvedAnchorEl.nodeType
                    ? resolvedAnchorEl
                    : (0, ownerDocument.Z)(paperRef.current).body
                ).getBoundingClientRect();
              return {
                top:
                  anchorRect.top +
                  getOffsetTop(anchorRect, anchorOrigin.vertical),
                left:
                  anchorRect.left +
                  getOffsetLeft(anchorRect, anchorOrigin.horizontal),
              };
            }, [
              anchorEl,
              anchorOrigin.horizontal,
              anchorOrigin.vertical,
              anchorPosition,
              anchorReference,
            ]),
            getTransformOrigin = react.useCallback(
              (elemRect) => ({
                vertical: getOffsetTop(elemRect, transformOrigin.vertical),
                horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
              }),
              [transformOrigin.horizontal, transformOrigin.vertical]
            ),
            getPositioningStyle = react.useCallback(
              (element) => {
                const elemRect = {
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                  },
                  elemTransformOrigin = getTransformOrigin(elemRect);
                if ("none" === anchorReference)
                  return {
                    top: null,
                    left: null,
                    transformOrigin:
                      getTransformOriginValue(elemTransformOrigin),
                  };
                const anchorOffset = getAnchorOffset();
                let top = anchorOffset.top - elemTransformOrigin.vertical,
                  left = anchorOffset.left - elemTransformOrigin.horizontal;
                const bottom = top + elemRect.height,
                  right = left + elemRect.width,
                  containerWindow = (0, ownerWindow.Z)(
                    resolveAnchorEl(anchorEl)
                  ),
                  heightThreshold =
                    containerWindow.innerHeight - marginThreshold,
                  widthThreshold = containerWindow.innerWidth - marginThreshold;
                if (null !== marginThreshold && top < marginThreshold) {
                  const diff = top - marginThreshold;
                  (top -= diff), (elemTransformOrigin.vertical += diff);
                } else if (
                  null !== marginThreshold &&
                  bottom > heightThreshold
                ) {
                  const diff = bottom - heightThreshold;
                  (top -= diff), (elemTransformOrigin.vertical += diff);
                }
                if (null !== marginThreshold && left < marginThreshold) {
                  const diff = left - marginThreshold;
                  (left -= diff), (elemTransformOrigin.horizontal += diff);
                } else if (right > widthThreshold) {
                  const diff = right - widthThreshold;
                  (left -= diff), (elemTransformOrigin.horizontal += diff);
                }
                return {
                  top: `${Math.round(top)}px`,
                  left: `${Math.round(left)}px`,
                  transformOrigin: getTransformOriginValue(elemTransformOrigin),
                };
              },
              [
                anchorEl,
                anchorReference,
                getAnchorOffset,
                getTransformOrigin,
                marginThreshold,
              ]
            ),
            [isPositioned, setIsPositioned] = react.useState(open),
            setPositioningStyles = react.useCallback(() => {
              const element = paperRef.current;
              if (!element) return;
              const positioning = getPositioningStyle(element);
              null !== positioning.top &&
                element.style.setProperty("top", positioning.top),
                null !== positioning.left &&
                  (element.style.left = positioning.left),
                (element.style.transformOrigin = positioning.transformOrigin),
                setIsPositioned(!0);
            }, [getPositioningStyle]);
          react.useEffect(
            () => (
              disableScrollLock &&
                window.addEventListener("scroll", setPositioningStyles),
              () => window.removeEventListener("scroll", setPositioningStyles)
            ),
            [anchorEl, disableScrollLock, setPositioningStyles]
          );
          react.useEffect(() => {
            open && setPositioningStyles();
          }),
            react.useImperativeHandle(
              action,
              () =>
                open
                  ? {
                      updatePosition: () => {
                        setPositioningStyles();
                      },
                    }
                  : null,
              [open, setPositioningStyles]
            ),
            react.useEffect(() => {
              if (!open) return;
              const handleResize = (0, debounce.Z)(() => {
                  setPositioningStyles();
                }),
                containerWindow = (0, ownerWindow.Z)(anchorEl);
              return (
                containerWindow.addEventListener("resize", handleResize),
                () => {
                  handleResize.clear(),
                    containerWindow.removeEventListener("resize", handleResize);
                }
              );
            }, [anchorEl, open, setPositioningStyles]);
          let transitionDuration = transitionDurationProp;
          const externalForwardedProps = {
              slots: { transition: TransitionComponent, ...slots },
              slotProps: {
                transition: TransitionProps,
                paper: PaperPropsProp,
                ...slotProps,
              },
            },
            [TransitionSlot, transitionSlotProps] = (0, useSlot.Z)(
              "transition",
              {
                elementType: Grow_Grow,
                externalForwardedProps,
                ownerState,
                getSlotProps: (handlers) => ({
                  ...handlers,
                  onEntering: (element, isAppearing) => {
                    handlers.onEntering?.(element, isAppearing),
                      setPositioningStyles();
                  },
                  onExited: (element) => {
                    handlers.onExited?.(element), setIsPositioned(!1);
                  },
                }),
                additionalProps: { appear: !0, in: open },
              }
            );
          "auto" !== transitionDurationProp ||
            TransitionSlot.muiSupportAuto ||
            (transitionDuration = void 0);
          const container =
              containerProp ||
              (anchorEl
                ? (0, ownerDocument.Z)(resolveAnchorEl(anchorEl)).body
                : void 0),
            [
              RootSlot,
              {
                slots: rootSlotsProp,
                slotProps: rootSlotPropsProp,
                ...rootProps
              },
            ] = (0, useSlot.Z)("root", {
              ref,
              elementType: PopoverRoot,
              externalForwardedProps: { ...externalForwardedProps, ...other },
              shouldForwardComponentProp: !0,
              additionalProps: {
                slots: { backdrop: slots.backdrop },
                slotProps: {
                  backdrop: mergeSlotProps(
                    "function" == typeof slotProps.backdrop
                      ? slotProps.backdrop(ownerState)
                      : slotProps.backdrop,
                    { invisible: !0 }
                  ),
                },
                container,
                open,
              },
              ownerState,
              className: (0, clsx.Z)(classes.root, className),
            }),
            [PaperSlot, paperProps] = (0, useSlot.Z)("paper", {
              ref: paperRef,
              className: classes.paper,
              elementType: PopoverPaper,
              externalForwardedProps,
              shouldForwardComponentProp: !0,
              additionalProps: {
                elevation,
                style: isPositioned ? void 0 : { opacity: 0 },
              },
              ownerState,
            });
          return (0, jsx_runtime.jsx)(RootSlot, {
            ...rootProps,
            ...(!(0, isHostComponent.Z)(RootSlot) && {
              slots: rootSlotsProp,
              slotProps: rootSlotPropsProp,
              disableScrollLock,
            }),
            children: (0, jsx_runtime.jsx)(TransitionSlot, {
              ...transitionSlotProps,
              timeout: transitionDuration,
              children: (0, jsx_runtime.jsx)(PaperSlot, {
                ...paperProps,
                children,
              }),
            }),
          });
        });
      var rootShouldForwardProp = __webpack_require__(
        "./node_modules/@mui/material/styles/rootShouldForwardProp.js"
      );
      function getMenuUtilityClass(slot) {
        return (0, generateUtilityClass.ZP)("MuiMenu", slot);
      }
      (0, generateUtilityClasses.Z)("MuiMenu", ["root", "paper", "list"]);
      const RTL_ORIGIN = { vertical: "top", horizontal: "right" },
        LTR_ORIGIN = { vertical: "top", horizontal: "left" },
        MenuRoot = (0, styled.ZP)(Popover_Popover, {
          shouldForwardProp: (prop) =>
            (0, rootShouldForwardProp.Z)(prop) || "classes" === prop,
          name: "MuiMenu",
          slot: "Root",
          overridesResolver: (props, styles) => styles.root,
        })({}),
        MenuPaper = (0, styled.ZP)(PopoverPaper, {
          name: "MuiMenu",
          slot: "Paper",
          overridesResolver: (props, styles) => styles.paper,
        })({
          maxHeight: "calc(100% - 96px)",
          WebkitOverflowScrolling: "touch",
        }),
        MenuMenuList = (0, styled.ZP)(MenuList_MenuList, {
          name: "MuiMenu",
          slot: "List",
          overridesResolver: (props, styles) => styles.list,
        })({ outline: 0 }),
        Menu_Menu = react.forwardRef(function Menu(inProps, ref) {
          const props = (0, DefaultPropsProvider.i)({
              props: inProps,
              name: "MuiMenu",
            }),
            {
              autoFocus = !0,
              children,
              className,
              disableAutoFocusItem = !1,
              MenuListProps = {},
              onClose,
              open,
              PaperProps = {},
              PopoverClasses,
              transitionDuration = "auto",
              TransitionProps: { onEntering, ...TransitionProps } = {},
              variant = "selectedMenu",
              slots = {},
              slotProps = {},
              ...other
            } = props,
            isRtl = (0, RtlProvider.V)(),
            ownerState = {
              ...props,
              autoFocus,
              disableAutoFocusItem,
              MenuListProps,
              onEntering,
              PaperProps,
              transitionDuration,
              TransitionProps,
              variant,
            },
            classes = ((ownerState) => {
              const { classes } = ownerState;
              return (0, composeClasses.Z)(
                { root: ["root"], paper: ["paper"], list: ["list"] },
                getMenuUtilityClass,
                classes
              );
            })(ownerState),
            autoFocusItem = autoFocus && !disableAutoFocusItem && open,
            menuListActionsRef = react.useRef(null);
          let activeItemIndex = -1;
          react.Children.map(children, (child, index) => {
            react.isValidElement(child) &&
              (child.props.disabled ||
                ((("selectedMenu" === variant && child.props.selected) ||
                  -1 === activeItemIndex) &&
                  (activeItemIndex = index)));
          });
          const externalForwardedProps = {
              slots,
              slotProps: {
                list: MenuListProps,
                transition: TransitionProps,
                paper: PaperProps,
                ...slotProps,
              },
            },
            rootSlotProps = (0, useSlotProps.Z)({
              elementType: slots.root,
              externalSlotProps: slotProps.root,
              ownerState,
              className: [classes.root, className],
            }),
            [PaperSlot, paperSlotProps] = (0, useSlot.Z)("paper", {
              className: classes.paper,
              elementType: MenuPaper,
              externalForwardedProps,
              shouldForwardComponentProp: !0,
              ownerState,
            }),
            [ListSlot, listSlotProps] = (0, useSlot.Z)("list", {
              className: (0, clsx.Z)(classes.list, MenuListProps.className),
              elementType: MenuMenuList,
              shouldForwardComponentProp: !0,
              externalForwardedProps,
              getSlotProps: (handlers) => ({
                ...handlers,
                onKeyDown: (event) => {
                  ((event) => {
                    "Tab" === event.key &&
                      (event.preventDefault(),
                      onClose && onClose(event, "tabKeyDown"));
                  })(event),
                    handlers.onKeyDown?.(event);
                },
              }),
              ownerState,
            }),
            resolvedTransitionProps =
              "function" == typeof externalForwardedProps.slotProps.transition
                ? externalForwardedProps.slotProps.transition(ownerState)
                : externalForwardedProps.slotProps.transition;
          return (0, jsx_runtime.jsx)(MenuRoot, {
            onClose,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: isRtl ? "right" : "left",
            },
            transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
            slots: {
              root: slots.root,
              paper: PaperSlot,
              backdrop: slots.backdrop,
              ...(slots.transition && { transition: slots.transition }),
            },
            slotProps: {
              root: rootSlotProps,
              paper: paperSlotProps,
              backdrop:
                "function" == typeof slotProps.backdrop
                  ? slotProps.backdrop(ownerState)
                  : slotProps.backdrop,
              transition: {
                ...resolvedTransitionProps,
                onEntering: (...args) => {
                  ((element, isAppearing) => {
                    menuListActionsRef.current &&
                      menuListActionsRef.current.adjustStyleForScrollbar(
                        element,
                        { direction: isRtl ? "rtl" : "ltr" }
                      ),
                      onEntering && onEntering(element, isAppearing);
                  })(...args),
                    resolvedTransitionProps?.onEntering?.(...args);
                },
              },
            },
            open,
            ref,
            transitionDuration,
            ownerState,
            ...other,
            classes: PopoverClasses,
            children: (0, jsx_runtime.jsx)(ListSlot, {
              actions: menuListActionsRef,
              autoFocus:
                autoFocus && (-1 === activeItemIndex || disableAutoFocusItem),
              autoFocusItem,
              variant,
              ...listSlotProps,
              children,
            }),
          });
        });
    },
    "./node_modules/@mui/material/utils/debounce.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__(
        "./node_modules/@mui/utils/esm/debounce/debounce.js"
      ).Z;
    },
    "./node_modules/@mui/material/utils/isHostComponent.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = function isHostComponent(element) {
        return "string" == typeof element;
      };
    },
    "./node_modules/@mui/material/utils/ownerDocument.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__(
        "./node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js"
      ).Z;
    },
    "./node_modules/@mui/material/utils/ownerWindow.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__(
        "./node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js"
      ).Z;
    },
    "./node_modules/@mui/material/utils/useEnhancedEffect.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.d(__webpack_exports__, {
        Z: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = __webpack_require__(
        "./node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js"
      ).Z;
    },
    "./node_modules/@mui/utils/esm/debounce/debounce.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      function debounce(func, wait = 166) {
        let timeout;
        function debounced(...args) {
          clearTimeout(timeout),
            (timeout = setTimeout(() => {
              func.apply(this, args);
            }, wait));
        }
        return (
          (debounced.clear = () => {
            clearTimeout(timeout);
          }),
          debounced
        );
      }
      __webpack_require__.d(__webpack_exports__, { Z: () => debounce });
    },
    "./node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
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
  },
]);
