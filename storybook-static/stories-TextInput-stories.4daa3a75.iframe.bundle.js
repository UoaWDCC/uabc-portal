"use strict";
(self.webpackChunkuabc_portal = self.webpackChunkuabc_portal || []).push([
  [550],
  {
    "./src/stories/TextInput.stories.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => TextInput_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@14.1.3_@babel+core@7.24.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        react = __webpack_require__(
          "./node_modules/.pnpm/next@14.1.3_@babel+core@7.24.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js",
        ),
        bundle_mjs = __webpack_require__(
          "./node_modules/.pnpm/tailwind-merge@2.2.2/node_modules/tailwind-merge/dist/bundle-mjs.mjs",
        );
      const TextInput = (props) => {
        const [active, setActive] = (0, react.useState)(!1);
        return (0, jsx_runtime.jsxs)("div", {
          className: "relative",
          children: [
            (0, jsx_runtime.jsx)("h2", {
              className: (0, bundle_mjs.QP)(
                "absolute left-3 transition-all ",
                active || "" != props.value
                  ? "top-[-0.75rem] bg-white px-2 text-sm  text-blue-500"
                  : "top-1.5 cursor-text text-gray-500",
                props.isError &&
                  "absolute left-3 top-[-0.75rem] bg-white px-2 text-sm  text-red-500",
              ),
              children: props.label,
            }),
            (0, jsx_runtime.jsx)("input", {
              type: props.type,
              defaultValue: props.value,
              onChange: (e) => props.onChange(e.target.value),
              onFocus: () => setActive(!0),
              onBlur: () => setActive(!1),
              className: (0, bundle_mjs.QP)(
                "w-full rounded-md border-none p-2 outline-none ring-2",
                active
                  ? "ring-blue-500 focus:ring-blue-500"
                  : "ring-blue-400 focus:ring-blue-400",
                props.isError && "ring-red-500 focus:ring-red-500",
              ),
              required: !0,
            }),
          ],
        });
      };
      var _Default_parameters, _Default_parameters_docs, _Default_parameters1;
      TextInput.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "TextInput",
        props: {
          label: { required: !1, tsType: { name: "string" }, description: "" },
          value: { required: !0, tsType: { name: "string" }, description: "" },
          type: { required: !0, tsType: { name: "string" }, description: "" },
          isError: {
            required: !0,
            tsType: { name: "boolean" },
            description: "",
          },
          onChange: {
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
        },
      };
      const TextInput_stories = {
          title: "TextInput",
          component: TextInput,
          parameters: { layout: "centered" },
          tags: ["autodocs"],
          argTypes: {},
        },
        Default = {
          args: {
            label: "Text Input",
            value: "",
            type: "text",
            isError: !1,
            onChange: () => {},
          },
        };
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...(null === (_Default_parameters = Default.parameters) ||
          void 0 === _Default_parameters
            ? void 0
            : _Default_parameters.docs),
          source: {
            originalSource:
              '{\n  args: {\n    label: "Text Input",\n    value: "",\n    type: "text",\n    isError: false,\n    onChange: () => {}\n  }\n}',
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
