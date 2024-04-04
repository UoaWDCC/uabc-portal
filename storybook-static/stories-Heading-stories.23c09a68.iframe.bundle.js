"use strict";
(self.webpackChunkuabc_portal = self.webpackChunkuabc_portal || []).push([
  [123],
  {
    "./src/stories/Heading.stories.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Heading_stories,
        });
      var jsx_runtime = __webpack_require__(
          "./node_modules/.pnpm/next@14.1.3_@babel+core@7.24.3_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js",
        ),
        utils = __webpack_require__("./src/lib/utils.ts");
      const Heading = (param) => {
        let { children, className } = param;
        return (0, jsx_runtime.jsx)("h1", {
          className: (0, utils.cn)("text-3xl font-bold", className),
          children,
        });
      };
      var _Default_parameters, _Default_parameters_docs, _Default_parameters1;
      Heading.__docgenInfo = {
        description: "",
        methods: [],
        displayName: "Heading",
        props: {
          children: {
            required: !0,
            tsType: { name: "string" },
            description: "",
          },
          className: {
            required: !1,
            tsType: { name: "string" },
            description: "",
          },
        },
      };
      const Heading_stories = {
          title: "Heading",
          component: Heading,
          parameters: { layout: "centered" },
          tags: ["autodocs"],
          argTypes: {},
        },
        Default = { args: { children: "Heading" } };
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...(null === (_Default_parameters = Default.parameters) ||
          void 0 === _Default_parameters
            ? void 0
            : _Default_parameters.docs),
          source: {
            originalSource: '{\n  args: {\n    children: "Heading"\n  }\n}',
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
    "./src/lib/utils.ts": (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      function r(e) {
        var t,
          f,
          n = "";
        if ("string" == typeof e || "number" == typeof e) n += e;
        else if ("object" == typeof e)
          if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++)
              e[t] && (f = r(e[t])) && (n && (n += " "), (n += f));
          } else for (f in e) e[f] && (n && (n += " "), (n += f));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
          (e = arguments[f]) && (t = r(e)) && (n && (n += " "), (n += t));
        return n;
      }
      __webpack_require__.d(__webpack_exports__, { cn: () => cn });
      var bundle_mjs = __webpack_require__(
        "./node_modules/.pnpm/tailwind-merge@2.2.2/node_modules/tailwind-merge/dist/bundle-mjs.mjs",
      );
      function cn() {
        for (
          var _len = arguments.length, inputs = new Array(_len), _key = 0;
          _key < _len;
          _key++
        )
          inputs[_key] = arguments[_key];
        return (0, bundle_mjs.QP)(clsx(inputs));
      }
    },
  },
]);
