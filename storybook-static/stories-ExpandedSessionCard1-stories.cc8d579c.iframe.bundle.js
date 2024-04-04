"use strict";
(self.webpackChunkuabc_portal = self.webpackChunkuabc_portal || []).push([
  [655],
  {
    "./src/stories/ExpandedSessionCard1.stories.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => ExpandedSessionCard1_stories,
        });
      var ExpandedSessionCard_namespaceObject = {};
      __webpack_require__.r(ExpandedSessionCard_namespaceObject);
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@14.1.3_@babel+core@7.24.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        react = __webpack_require__(
          "./node_modules/.pnpm/next@14.1.3_@babel+core@7.24.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js",
        ),
        bundle_mjs =
          (__webpack_require__(
            "__barrel_optimize__?names=IoCheckmarkCircle!=!./node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/io5/index.mjs",
          ),
          __webpack_require__("./src/components/Card.tsx"),
          __webpack_require__(
            "./node_modules/.pnpm/tailwind-merge@2.2.2/node_modules/tailwind-merge/dist/bundle-mjs.mjs",
          ));
      const Modal = (props) =>
        (0, jsx_runtime.jsxs)("div", {
          className: (0, bundle_mjs.Id)(
            "fixed left-0 top-0 flex h-dvh w-dvw flex-col",
            !props.isOpen && "hidden",
          ),
          children: [
            (0, jsx_runtime.jsx)("div", {
              onClick: props.onClose,
              className: "grow bg-black opacity-60",
            }),
            props.children,
          ],
        });
      Modal.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "Modal",
        props: {
          isOpen: {
            required: !0,
            tsType: { name: "boolean" },
            description: "",
          },
          onClose: {
            required: !0,
            tsType: {
              name: "signature",
              type: "function",
              raw: "() => void",
              signature: { arguments: [], return: { name: "void" } },
            },
            description: "",
          },
          children: {
            required: !0,
            tsType: { name: "ReactNode" },
            description: "",
          },
        },
      };
      const SegmentedController = (props) => {
        var _props_defaultIndex;
        const [activeIndex, setActiveIndex] = (0, react.useState)(
          null !== (_props_defaultIndex = props.defaultIndex) &&
            void 0 !== _props_defaultIndex
            ? _props_defaultIndex
            : -1,
        );
        return (0, jsx_runtime.jsx)("div", {
          className: "flex",
          children: (0, jsx_runtime.jsx)("div", {
            className:
              "m-auto inline-flex justify-between rounded-md bg-white p-2 shadow-lg",
            children: props.segments.map((item, i) =>
              (0, jsx_runtime.jsxs)(
                "div",
                {
                  className: "relative rounded-md text-center ".concat(
                    i == activeIndex ? "absolute left-0 z-0 bg-blue-500" : "",
                  ),
                  children: [
                    (0, jsx_runtime.jsx)("input", {
                      type: "radio",
                      value: item.value,
                      id: item.value,
                      onChange: () =>
                        ((value, i) => {
                          setActiveIndex(i), props.callback(value);
                        })(item.value, i),
                      checked: i == activeIndex,
                      className:
                        "absolute inset-0 m-0 size-full cursor-pointer opacity-0",
                    }),
                    (0, jsx_runtime.jsx)("label", {
                      htmlFor: item.value,
                      className:
                        "relative block cursor-pointer px-3 py-5 text-xs uppercase transition-colors ".concat(
                          i == activeIndex ? "text-white" : "text-gray-500",
                        ),
                      children: item.value,
                    }),
                  ],
                },
                item.value,
              ),
            ),
          }),
        });
      };
      SegmentedController.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "SegmentedController",
        props: {
          segments: {
            required: !0,
            tsType: {
              name: "Array",
              elements: [
                {
                  name: "signature",
                  type: "object",
                  raw: "{\n  value: string;\n}",
                  signature: {
                    properties: [
                      { key: "value", value: { name: "string", required: !0 } },
                    ],
                  },
                },
              ],
              raw: "Segment[]",
            },
            description: "",
          },
          callback: {
            required: !0,
            tsType: {
              name: "signature",
              type: "function",
              raw: "(value: string) => void",
              signature: {
                arguments: [{ type: { name: "string" }, name: "value" }],
                return: { name: "void" },
              },
            },
            description: "",
          },
          defaultIndex: {
            required: !1,
            tsType: { name: "number" },
            description: "",
          },
        },
      };
      const LevelSelector = (props) => {
        const levels = [
            { value: "beginner" },
            { value: "intermediate" },
            { value: "advanced" },
          ],
          defaultIndex = props.default
            ? levels.map((item) => item.value).indexOf(props.default)
            : -1;
        return (0, jsx_runtime.jsx)(Modal, {
          isOpen: props.isOpen,
          onClose: props.onClose,
          children: (0, jsx_runtime.jsxs)("div", {
            className: "flex w-full flex-col bg-gray-200 py-6",
            children: [
              (0, jsx_runtime.jsx)("p", {
                className: "mb-5 text-center font-bold",
                children: "Please select a play level",
              }),
              (0, jsx_runtime.jsx)(SegmentedController, {
                segments: levels,
                callback: props.onSelect,
                defaultIndex,
              }),
            ],
          }),
        });
      };
      LevelSelector.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "LevelSelector",
        props: {
          isOpen: {
            required: !0,
            tsType: { name: "boolean" },
            description: "",
          },
          onClose: {
            required: !0,
            tsType: {
              name: "signature",
              type: "function",
              raw: "() => void",
              signature: { arguments: [], return: { name: "void" } },
            },
            description: "",
          },
          default: {
            required: !1,
            tsType: { name: "string" },
            description: "",
          },
          onSelect: {
            required: !0,
            tsType: {
              name: "signature",
              type: "function",
              raw: "(level: string | undefined) => void",
              signature: {
                arguments: [
                  {
                    type: {
                      name: "union",
                      raw: "string | undefined",
                      elements: [{ name: "string" }, { name: "undefined" }],
                    },
                    name: "level",
                  },
                ],
                return: { name: "void" },
              },
            },
            description: "",
          },
        },
      };
      var _Default_parameters, _Default_parameters_docs, _Default_parameters1;
      const ExpandedSessionCard1_stories = {
          title: "Components/ExpandedSessionCard1",
          component: ExpandedSessionCard_namespaceObject.ExpandedSessionCard1,
          parameters: { layout: "fullscreen" },
          tags: ["autodocs"],
        },
        Default = () => ({
          args: {
            day: "Sunday",
            time: "5 to 7pm",
            location: "Sample Location",
            address: "Sample Address",
          },
        });
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...(null === (_Default_parameters = Default.parameters) ||
          void 0 === _Default_parameters
            ? void 0
            : _Default_parameters.docs),
          source: {
            originalSource:
              '() => ({\n  args: {\n    day: "Sunday",\n    time: "5 to 7pm",\n    location: "Sample Location",\n    address: "Sample Address"\n  }\n})',
            ...(null === (_Default_parameters1 = Default.parameters) ||
            void 0 === _Default_parameters1 ||
            null === (_Default_parameters_docs = _Default_parameters1.docs) ||
            void 0 === _Default_parameters_docs
              ? void 0
              : _Default_parameters_docs.source),
          },
        },
      };
      const __namedExportsOrder = ["Default"];
    },
  },
]);
