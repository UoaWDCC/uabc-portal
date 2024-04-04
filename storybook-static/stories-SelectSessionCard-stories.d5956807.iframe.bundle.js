"use strict";
(self.webpackChunkuabc_portal = self.webpackChunkuabc_portal || []).push([
  [719],
  {
    "./src/stories/SelectSessionCard.stories.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => SelectSessionCard_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@14.1.3_@babel+core@7.24.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        io5 = __webpack_require__(
          "__barrel_optimize__?names=IoCheckmarkCircle!=!./node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/io5/index.mjs",
        ),
        bundle_mjs = __webpack_require__(
          "./node_modules/.pnpm/tailwind-merge@2.2.2/node_modules/tailwind-merge/dist/bundle-mjs.mjs",
        ),
        utils = __webpack_require__("./src/lib/utils.ts"),
        Card = __webpack_require__("./src/components/Card.tsx");
      const weekdayMap = new Map([
          [0, "Sunday"],
          [1, "Monday"],
          [2, "Tuesday"],
          [3, "Wednesday"],
          [4, "Thursday"],
          [5, "Friday"],
          [6, "Saturday"],
        ]),
        backgroundColorMap = new Map([
          ["default", "bg-secondary"],
          ["selected", "bg-primary"],
          ["disabled", "bg-secondary"],
        ]),
        textColorMap = new Map([
          ["default", "text-secondary-foreground"],
          ["selected", "text-primary-foreground"],
          ["disabled", "text-secondary-foreground"],
        ]),
        SelectSessionCard = (param) => {
          let { weekday, startTime, endTime, status, locationName } = param;
          return (0, jsx_runtime.jsxs)(Card.Z, {
            className: (0, utils.cn)(
              "border px-6 py-4 min-h-24 flex font-medium align-middle",
              backgroundColorMap.get(status),
              "disabled" === status && "opacity-50",
            ),
            children: [
              (0, jsx_runtime.jsxs)("div", {
                className: (0, bundle_mjs.Id)(
                  textColorMap.get(status),
                  "leading-5",
                ),
                children: [
                  (0, jsx_runtime.jsxs)("span", {
                    className: "text-lg leading-6",
                    children: [
                      weekdayMap.get(weekday),
                      " ",
                      "disabled" === status && "(Session Full)",
                    ],
                  }),
                  (0, jsx_runtime.jsx)("br", {}),
                  (0, jsx_runtime.jsxs)("span", {
                    className: "opacity-60",
                    children: [
                      locationName,
                      " ",
                      (0, jsx_runtime.jsx)("br", {}),
                      (0, jsx_runtime.jsxs)("span", {
                        className: "uppercase tracking-tight",
                        children: [startTime, " - ", endTime],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)("div", {
                className: "flex grow justify-end",
                children:
                  "selected" === status &&
                  (0, jsx_runtime.jsx)(io5.G3G, {
                    className: "self-center ml-1",
                    color: "white",
                    size: 30,
                  }),
              }),
            ],
          });
        };
      var _Default_parameters, _Default_parameters_docs, _Default_parameters1;
      SelectSessionCard.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "SelectSessionCard",
        props: {
          weekday: {
            required: !0,
            tsType: { name: "number" },
            description: "",
          },
          startTime: {
            required: !0,
            tsType: { name: "string" },
            description: "",
          },
          endTime: {
            required: !0,
            tsType: { name: "string" },
            description: "",
          },
          locationName: {
            required: !0,
            tsType: { name: "string" },
            description: "",
          },
          status: {
            required: !0,
            tsType: {
              name: "union",
              raw: '"default" | "selected" | "disabled"',
              elements: [
                { name: "literal", value: '"default"' },
                { name: "literal", value: '"selected"' },
                { name: "literal", value: '"disabled"' },
              ],
            },
            description: "",
          },
        },
      };
      const SelectSessionCard_stories = {
          title: "SelectSessionCard",
          component: SelectSessionCard,
          parameters: { layout: "fullscreen" },
          tags: ["autodocs"],
          argTypes: {
            status: {
              control: { type: "select" },
              options: ["default", "selected", "disabled"],
            },
          },
        },
        Default = {
          args: {
            weekday: 0,
            startTime: new Date().toLocaleTimeString([], {
              timeStyle: "short",
            }),
            endTime: new Date().toLocaleTimeString([], { timeStyle: "short" }),
            status: "default",
            locationName: "Location",
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
              '{\n  args: {\n    weekday: 0,\n    startTime: new Date().toLocaleTimeString([], {\n      timeStyle: "short"\n    }),\n    endTime: new Date().toLocaleTimeString([], {\n      timeStyle: "short"\n    }),\n    status: "default",\n    locationName: "Location"\n  }\n}',
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
