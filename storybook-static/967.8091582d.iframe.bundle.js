"use strict";
(self.webpackChunkuabc_portal = self.webpackChunkuabc_portal || []).push([
  [967],
  {
    "./node_modules/.pnpm/@storybook+components@8.0.5_@types+react@18.2.69_react-dom@18.2.0_react@18.2.0/node_modules/@storybook/components/dist/formatter-B5HCVTEV.mjs":
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__),
          __webpack_require__.d(__webpack_exports__, {
            formatter: () => formatter,
          });
        var memoizerific__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            "./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific/memoizerific.js",
          ),
          memoizerific__WEBPACK_IMPORTED_MODULE_0___default =
            __webpack_require__.n(memoizerific__WEBPACK_IMPORTED_MODULE_0__),
          console = __webpack_require__(
            "./node_modules/.pnpm/console-browserify@1.2.0/node_modules/console-browserify/index.js",
          ),
          Ks = Object.defineProperty,
          Yr = (t8, e) => {
            for (var r in e) Ks(t8, r, { get: e[r], enumerable: !0 });
          },
          jr = (t8, e, r) => {
            if (!e.has(t8)) throw TypeError("Cannot " + r);
          },
          Q = (t8, e, r) => (
            jr(t8, e, "read from private field"), r ? r.call(t8) : e.get(t8)
          ),
          Ur = {};
        Yr(Ur, {
          languages: () => zs,
          options: () => Ys,
          parsers: () => Hr,
          printers: () => To,
        });
        var v = (t8, e, r, n) => {
            if (!t8 || null != e)
              return e.replaceAll
                ? e.replaceAll(r, n)
                : r.global
                  ? e.replace(r, n)
                  : e.split(r).join(n);
          },
          we = "string",
          be = "array",
          Te = "cursor",
          oe = "indent",
          ue = "align",
          xe = "trim",
          ee = "group",
          le = "fill",
          ce = "if-break",
          pe = "indent-if-break",
          ke = "line-suffix",
          Be = "line-suffix-boundary",
          G = "line",
          Le = "label",
          he = "break-parent",
          ft = new Set([Te, oe, ue, xe, ee, le, ce, pe, ke, Be, G, Le, he]);
        var Fe = function Xs(t8) {
          if ("string" == typeof t8) return we;
          if (Array.isArray(t8)) return be;
          if (!t8) return;
          let { type: e } = t8;
          return ft.has(e) ? e : void 0;
        };
        function Zs(t8) {
          let e = null === t8 ? "null" : typeof t8;
          if ("string" !== e && "object" !== e)
            return `Unexpected doc '${e}', \nExpected it to be 'string' or 'object'.`;
          if (Fe(t8)) throw new Error("doc is valid.");
          let r = Object.prototype.toString.call(t8);
          if ("[object Object]" !== r) return `Unexpected doc '${r}'.`;
          let n = ((t8) =>
            new Intl.ListFormat("en-US", { type: "disjunction" }).format(t8))(
            [...ft].map((s) => `'${s}'`),
          );
          return `Unexpected doc.type '${t8.type}'.\nExpected it to be ${n}.`;
        }
        var mt = class extends Error {
            name = "InvalidDocError";
            constructor(e) {
              super(Zs(e)), (this.doc = e);
            }
          },
          dt = () => {};
        function R(t8) {
          return { type: oe, contents: t8 };
        }
        function Jr(t8, e) {
          return { type: ue, contents: e, n: t8 };
        }
        function E(t8, e = {}) {
          return (
            dt(e.expandedStates),
            {
              type: ee,
              id: e.id,
              contents: t8,
              break: !!e.shouldBreak,
              expandedStates: e.expandedStates,
            }
          );
        }
        function gt(t8) {
          return { type: le, parts: t8 };
        }
        function fe(t8, e = "", r = {}) {
          return {
            type: ce,
            breakContents: t8,
            flatContents: e,
            groupId: r.groupId,
          };
        }
        var re = { type: he },
          A = { type: G },
          b = { type: G, soft: !0 },
          S = [{ type: G, hard: !0 }, re],
          rn = [{ type: G, hard: !0, literal: !0 }, re];
        function Y(t8, e) {
          let r = [];
          for (let n = 0; n < e.length; n++)
            0 !== n && r.push(t8), r.push(e[n]);
          return r;
        }
        var me = (t8, e, r) => {
          if (!t8 || null != e)
            return Array.isArray(e) || "string" == typeof e
              ? e[r < 0 ? e.length + r : r]
              : e.at(r);
        };
        function Ct(t8, e) {
          if ("string" == typeof t8) return e(t8);
          let r = new Map();
          return n(t8);
          function n(i) {
            if (r.has(i)) return r.get(i);
            let a = (function s(i) {
              switch (Fe(i)) {
                case be:
                  return e(i.map(n));
                case le:
                  return e({ ...i, parts: i.parts.map(n) });
                case ce:
                  return e({
                    ...i,
                    breakContents: n(i.breakContents),
                    flatContents: n(i.flatContents),
                  });
                case ee: {
                  let { expandedStates: a, contents: o } = i;
                  return (
                    a ? ((a = a.map(n)), (o = a[0])) : (o = n(o)),
                    e({ ...i, contents: o, expandedStates: a })
                  );
                }
                case ue:
                case oe:
                case pe:
                case Le:
                case ke:
                  return e({ ...i, contents: n(i.contents) });
                case we:
                case Te:
                case xe:
                case Be:
                case G:
                case he:
                  return e(i);
                default:
                  throw new mt(i);
              }
            })(i);
            return r.set(i, a), a;
          }
        }
        function nn(t8) {
          return Ct(t8, (e) =>
            (function ni(t8) {
              switch (Fe(t8)) {
                case le:
                  if (t8.parts.every((e) => "" === e)) return "";
                  break;
                case ee:
                  if (!(t8.contents || t8.id || t8.break || t8.expandedStates))
                    return "";
                  if (
                    t8.contents.type === ee &&
                    t8.contents.id === t8.id &&
                    t8.contents.break === t8.break &&
                    t8.contents.expandedStates === t8.expandedStates
                  )
                    return t8.contents;
                  break;
                case ue:
                case oe:
                case pe:
                case ke:
                  if (!t8.contents) return "";
                  break;
                case ce:
                  if (!t8.flatContents && !t8.breakContents) return "";
                  break;
                case be: {
                  let e = [];
                  for (let r of t8) {
                    if (!r) continue;
                    let [n, ...s] = Array.isArray(r) ? r : [r];
                    "string" == typeof n && "string" == typeof me(!1, e, -1)
                      ? (e[e.length - 1] += n)
                      : e.push(n),
                      e.push(...s);
                  }
                  return 0 === e.length ? "" : 1 === e.length ? e[0] : e;
                }
                case we:
                case Te:
                case xe:
                case Be:
                case G:
                case Le:
                case he:
                  break;
                default:
                  throw new mt(t8);
              }
              return t8;
            })(e),
          );
        }
        function T(t8, e = rn) {
          return Ct(t8, (r) =>
            "string" == typeof r ? Y(e, r.split("\n")) : r,
          );
        }
        var sn = class extends Error {
          name = "UnexpectedNodeError";
          constructor(e, r, n = "type") {
            super(`Unexpected ${r} node ${n}: ${JSON.stringify(e[n])}.`),
              (this.node = e);
          }
        };
        var on = function si(t8, e) {
          let r = !0 === e || "'" === e ? "'" : '"',
            n = "'" === r ? '"' : "'",
            s = 0,
            i = 0;
          for (let a of t8) a === r ? s++ : a === n && i++;
          return s > i ? n : r;
        };
        var O;
        O = new WeakMap();
        var un = class {
            constructor(e) {
              ((t8, e, r) => {
                if (e.has(t8))
                  throw TypeError(
                    "Cannot add the same private member more than once",
                  );
                e instanceof WeakSet ? e.add(t8) : e.set(t8, r);
              })(this, O, void 0),
                ((t8, e, r, n) => {
                  jr(t8, e, "write to private field"),
                    n ? n.call(t8, r) : e.set(t8, r);
                })(this, O, new Set(e));
            }
            getLeadingWhitespaceCount(e) {
              let r = Q(this, O),
                n = 0;
              for (let s = 0; s < e.length && r.has(e.charAt(s)); s++) n++;
              return n;
            }
            getTrailingWhitespaceCount(e) {
              let r = Q(this, O),
                n = 0;
              for (let s = e.length - 1; s >= 0 && r.has(e.charAt(s)); s--) n++;
              return n;
            }
            getLeadingWhitespace(e) {
              let r = this.getLeadingWhitespaceCount(e);
              return e.slice(0, r);
            }
            getTrailingWhitespace(e) {
              let r = this.getTrailingWhitespaceCount(e);
              return e.slice(e.length - r);
            }
            hasLeadingWhitespace(e) {
              return Q(this, O).has(e.charAt(0));
            }
            hasTrailingWhitespace(e) {
              return Q(this, O).has(me(!1, e, -1));
            }
            trimStart(e) {
              let r = this.getLeadingWhitespaceCount(e);
              return e.slice(r);
            }
            trimEnd(e) {
              let r = this.getTrailingWhitespaceCount(e);
              return e.slice(0, e.length - r);
            }
            trim(e) {
              return this.trimEnd(this.trimStart(e));
            }
            split(e, r = !1) {
              let n = `[${(function sr(t8) {
                  if ("string" != typeof t8)
                    throw new TypeError("Expected a string");
                  return t8
                    .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                    .replace(/-/g, "\\x2d");
                })([...Q(this, O)].join(""))}]+`,
                s = new RegExp(r ? `(${n})` : n);
              return e.split(s);
            }
            hasWhitespaceCharacter(e) {
              let r = Q(this, O);
              return Array.prototype.some.call(e, (n) => r.has(n));
            }
            hasNonWhitespaceCharacter(e) {
              let r = Q(this, O);
              return Array.prototype.some.call(e, (n) => !r.has(n));
            }
            isWhitespaceOnly(e) {
              let r = Q(this, O);
              return Array.prototype.every.call(e, (n) => r.has(n));
            }
          },
          H = new un(["\t", "\n", "\f", "\r", " "]);
        var Pe = function oi(t8) {
            return "front-matter" === t8?.type;
          },
          ui = new Set([
            "sourceSpan",
            "startSourceSpan",
            "endSourceSpan",
            "nameSpan",
            "valueSpan",
            "keySpan",
            "tagDefinition",
            "tokens",
            "valueTokens",
          ]),
          li = new Set(["if", "else if", "for", "switch", "case"]);
        function ln(t8, e) {
          var r;
          if (
            "text" === t8.type ||
            "comment" === t8.type ||
            Pe(t8) ||
            "yaml" === t8.type ||
            "toml" === t8.type
          )
            return null;
          if (
            ("attribute" === t8.type && delete e.value,
            "docType" === t8.type && delete e.value,
            "angularControlFlowBlock" === t8.type &&
              null != (r = e.parameters) &&
              r.children)
          )
            for (let n of e.parameters.children)
              li.has(t8.name)
                ? delete n.expression
                : (n.expression = n.expression.trim());
        }
        ln.ignoredProperties = ui;
        var cn = ln,
          ci = (t8) => String(t8).split(/[/\\]/).pop();
        function pn(t8, e) {
          if (!e) return;
          let r = ci(e).toLowerCase();
          return t8.find((n) => {
            var s, i;
            return (
              (null == (s = n.extensions)
                ? void 0
                : s.some((a) => r.endsWith(a))) ||
              (null == (i = n.filenames)
                ? void 0
                : i.some((a) => a.toLowerCase() === r))
            );
          });
        }
        var Ne = function hi(t8, e) {
            let r = t8.plugins.flatMap((s) => s.languages ?? []),
              n =
                (function pi(t8, e) {
                  if (e)
                    return (
                      t8.find(({ name: r }) => r.toLowerCase() === e) ??
                      t8.find(({ aliases: r }) => r?.includes(e)) ??
                      t8.find(({ extensions: r }) => r?.includes(`.${e}`))
                    );
                })(r, e.language) ??
                pn(r, e.physicalFile) ??
                pn(r, e.file) ??
                void e.physicalFile;
            return n?.parsers[0];
          },
          hn = "inline",
          fn = {
            area: "none",
            base: "none",
            basefont: "none",
            datalist: "none",
            head: "none",
            link: "none",
            meta: "none",
            noembed: "none",
            noframes: "none",
            param: "block",
            rp: "none",
            script: "block",
            style: "none",
            template: "inline",
            title: "none",
            html: "block",
            body: "block",
            address: "block",
            blockquote: "block",
            center: "block",
            dialog: "block",
            div: "block",
            figure: "block",
            figcaption: "block",
            footer: "block",
            form: "block",
            header: "block",
            hr: "block",
            legend: "block",
            listing: "block",
            main: "block",
            p: "block",
            plaintext: "block",
            pre: "block",
            search: "block",
            xmp: "block",
            slot: "contents",
            ruby: "ruby",
            rt: "ruby-text",
            article: "block",
            aside: "block",
            h1: "block",
            h2: "block",
            h3: "block",
            h4: "block",
            h5: "block",
            h6: "block",
            hgroup: "block",
            nav: "block",
            section: "block",
            dir: "block",
            dd: "block",
            dl: "block",
            dt: "block",
            menu: "block",
            ol: "block",
            ul: "block",
            li: "list-item",
            table: "table",
            caption: "table-caption",
            colgroup: "table-column-group",
            col: "table-column",
            thead: "table-header-group",
            tbody: "table-row-group",
            tfoot: "table-footer-group",
            tr: "table-row",
            td: "table-cell",
            th: "table-cell",
            input: "inline-block",
            button: "inline-block",
            fieldset: "block",
            marquee: "inline-block",
            source: "block",
            track: "block",
            details: "block",
            summary: "block",
            meter: "inline-block",
            progress: "inline-block",
            object: "inline-block",
            video: "inline-block",
            audio: "inline-block",
            select: "inline-block",
            option: "block",
            optgroup: "block",
          },
          mn = "normal",
          dn = {
            listing: "pre",
            plaintext: "pre",
            pre: "pre",
            xmp: "pre",
            nobr: "nowrap",
            table: "initial",
            textarea: "pre-wrap",
          };
        var de = function fi(t8) {
            return (
              "element" === t8.type &&
              !t8.hasExplicitNamespace &&
              !["html", "svg"].includes(t8.namespace)
            );
          },
          ar = (t8) => ((t8) => v(!1, t8, /^[\t\f\r ]*\n/g, ""))(H.trimEnd(t8)),
          gn = (t8) => {
            let e = t8,
              r = H.getLeadingWhitespace(e);
            r && (e = e.slice(r.length));
            let n = H.getTrailingWhitespace(e);
            return (
              n && (e = e.slice(0, -n.length)),
              { leadingWhitespace: r, trailingWhitespace: n, text: e }
            );
          };
        function _t(t8, e) {
          return !!(
            ("ieConditionalComment" === t8.type &&
              t8.lastChild &&
              !t8.lastChild.isSelfClosing &&
              !t8.lastChild.endSourceSpan) ||
            ("ieConditionalComment" === t8.type && !t8.complete) ||
            (ge(t8) &&
              t8.children.some(
                (r) => "text" !== r.type && "interpolation" !== r.type,
              )) ||
            (Dt(t8, e) && !V(t8) && "interpolation" !== t8.type)
          );
        }
        function Ge(t8) {
          return (
            !("attribute" === t8.type || !t8.parent || !t8.prev) &&
            (function di(t8) {
              return (
                "comment" === t8.type && "prettier-ignore" === t8.value.trim()
              );
            })(t8.prev)
          );
        }
        function N(t8) {
          return "text" === t8.type || "comment" === t8.type;
        }
        function V(t8) {
          return (
            "element" === t8.type &&
            ("script" === t8.fullName ||
              "style" === t8.fullName ||
              "svg:style" === t8.fullName ||
              "svg:script" === t8.fullName ||
              (de(t8) && ("script" === t8.name || "style" === t8.name)))
          );
        }
        function or(t8) {
          return kn(t8).startsWith("pre");
        }
        function _n(t8, e) {
          var s, i;
          let r = (function n() {
            return (
              !Pe(t8) &&
              "angularControlFlowBlock" !== t8.type &&
              (!(
                ("text" !== t8.type && "interpolation" !== t8.type) ||
                !t8.prev ||
                ("text" !== t8.prev.type && "interpolation" !== t8.prev.type)
              ) ||
                (!(!t8.parent || "none" === t8.parent.cssDisplay) &&
                  (!!ge(t8.parent) ||
                    !(
                      (!t8.prev &&
                        ("root" === t8.parent.type ||
                          (ge(t8) && t8.parent) ||
                          V(t8.parent) ||
                          Ke(t8.parent, e) ||
                          !(function Ai(t8) {
                            return !je(t8) && "inline-block" !== t8;
                          })(t8.parent.cssDisplay))) ||
                      (t8.prev &&
                        !(function yi(t8) {
                          return !je(t8);
                        })(t8.prev.cssDisplay))
                    ))))
            );
          })();
          return r &&
            !t8.prev &&
            null != (i = null == (s = t8.parent) ? void 0 : s.tagDefinition) &&
            i.ignoreFirstLf
            ? "interpolation" === t8.type
            : r;
        }
        function En(t8, e) {
          return (
            !Pe(t8) &&
            "angularControlFlowBlock" !== t8.type &&
            (!(
              ("text" !== t8.type && "interpolation" !== t8.type) ||
              !t8.next ||
              ("text" !== t8.next.type && "interpolation" !== t8.next.type)
            ) ||
              (!(!t8.parent || "none" === t8.parent.cssDisplay) &&
                (!!ge(t8.parent) ||
                  !(
                    (!t8.next &&
                      ("root" === t8.parent.type ||
                        (ge(t8) && t8.parent) ||
                        V(t8.parent) ||
                        Ke(t8.parent, e) ||
                        !(function Di(t8) {
                          return !je(t8) && "inline-block" !== t8;
                        })(t8.parent.cssDisplay))) ||
                    (t8.next &&
                      !(function vi(t8) {
                        return !je(t8);
                      })(t8.next.cssDisplay))
                  ))))
          );
        }
        function An(t8) {
          return (
            (function wi(t8) {
              return !je(t8) && "inline-block" !== t8;
            })(t8.cssDisplay) && !V(t8)
          );
        }
        function Ye(t8) {
          return (
            Pe(t8) ||
            (t8.next &&
              t8.sourceSpan.end &&
              t8.sourceSpan.end.line + 1 < t8.next.sourceSpan.start.line)
          );
        }
        function Dn(t8) {
          return (
            ur(t8) ||
            ("element" === t8.type &&
              t8.children.length > 0 &&
              (["body", "script", "style"].includes(t8.name) ||
                t8.children.some((e) =>
                  (function Ci(t8) {
                    var e;
                    return null == (e = t8.children)
                      ? void 0
                      : e.some((r) => "text" !== r.type);
                  })(e),
                ))) ||
            (t8.firstChild &&
              t8.firstChild === t8.lastChild &&
              "text" !== t8.firstChild.type &&
              yn(t8.firstChild) &&
              (!t8.lastChild.isTrailingSpaceSensitive || wn(t8.lastChild)))
          );
        }
        function ur(t8) {
          return (
            "element" === t8.type &&
            t8.children.length > 0 &&
            (["html", "head", "ul", "ol", "select"].includes(t8.name) ||
              (t8.cssDisplay.startsWith("table") &&
                "table-cell" !== t8.cssDisplay))
          );
        }
        function Et(t8) {
          return (
            bn(t8) ||
            (t8.prev &&
              (function gi(t8) {
                return (
                  bn(t8) ||
                  ("element" === t8.type && "br" === t8.fullName) ||
                  vn(t8)
                );
              })(t8.prev)) ||
            vn(t8)
          );
        }
        function vn(t8) {
          return yn(t8) && wn(t8);
        }
        function yn(t8) {
          return (
            t8.hasLeadingSpaces &&
            (t8.prev
              ? t8.prev.sourceSpan.end.line < t8.sourceSpan.start.line
              : "root" === t8.parent.type ||
                t8.parent.startSourceSpan.end.line < t8.sourceSpan.start.line)
          );
        }
        function wn(t8) {
          return (
            t8.hasTrailingSpaces &&
            (t8.next
              ? t8.next.sourceSpan.start.line > t8.sourceSpan.end.line
              : "root" === t8.parent.type ||
                (t8.parent.endSourceSpan &&
                  t8.parent.endSourceSpan.start.line > t8.sourceSpan.end.line))
          );
        }
        function bn(t8) {
          switch (t8.type) {
            case "ieConditionalComment":
            case "comment":
            case "directive":
              return !0;
            case "element":
              return ["script", "select"].includes(t8.name);
          }
          return !1;
        }
        function At(t8) {
          return t8.lastChild ? At(t8.lastChild) : t8;
        }
        function Tn(t8) {
          if (t8)
            switch (t8) {
              case "module":
              case "text/javascript":
              case "text/babel":
              case "application/javascript":
                return "babel";
              case "application/x-typescript":
                return "typescript";
              case "text/markdown":
                return "markdown";
              case "text/html":
                return "html";
              case "text/x-handlebars-template":
                return "glimmer";
              default:
                if (
                  t8.endsWith("json") ||
                  t8.endsWith("importmap") ||
                  "speculationrules" === t8
                )
                  return "json";
            }
        }
        function lr(t8, e) {
          return (
            (function Si(t8, e) {
              let { name: r, attrMap: n } = t8;
              if (
                "script" !== r ||
                Object.prototype.hasOwnProperty.call(n, "src")
              )
                return;
              let { type: s, lang: i } = t8.attrMap;
              return i || s ? Ne(e, { language: i }) ?? Tn(s) : "babel";
            })(t8, e) ??
            (function Ei(t8, e) {
              if ("style" !== t8.name) return;
              let { lang: r } = t8.attrMap;
              return r ? Ne(e, { language: r }) : "css";
            })(t8, e) ??
            (function _i(t8, e) {
              if (!Dt(t8, e)) return;
              let { attrMap: r } = t8;
              if (Object.prototype.hasOwnProperty.call(r, "src")) return;
              let { type: n, lang: s } = r;
              return Ne(e, { language: s }) ?? Tn(n);
            })(t8, e)
          );
        }
        function je(t8) {
          return "block" === t8 || "list-item" === t8 || t8.startsWith("table");
        }
        function ge(t8) {
          return kn(t8).startsWith("pre");
        }
        function kn(t8) {
          return (
            ("element" === t8.type &&
              (!t8.namespace || de(t8)) &&
              dn[t8.name]) ||
            mn
          );
        }
        function cr(
          t8,
          e = (function Ti(t8) {
            let e = Number.POSITIVE_INFINITY;
            for (let r of t8.split("\n")) {
              if (0 === r.length) continue;
              let n = H.getLeadingWhitespaceCount(r);
              if (0 === n) return 0;
              r.length !== n && n < e && (e = n);
            }
            return e === Number.POSITIVE_INFINITY ? 0 : e;
          })(t8),
        ) {
          return 0 === e
            ? t8
            : t8
                .split("\n")
                .map((r) => r.slice(e))
                .join("\n");
        }
        function pr(t8) {
          return v(!1, v(!1, t8, "&apos;", "'"), "&quot;", '"');
        }
        function L(t8) {
          return pr(t8.value);
        }
        var xi = new Set(["template", "style", "script"]);
        function Ke(t8, e) {
          return Ce(t8, e) && !xi.has(t8.fullName);
        }
        function Ce(t8, e) {
          return (
            "vue" === e.parser &&
            "element" === t8.type &&
            "root" === t8.parent.type &&
            "html" !== t8.fullName.toLowerCase()
          );
        }
        function Dt(t8, e) {
          return (
            Ce(t8, e) &&
            (Ke(t8, e) || (t8.attrMap.lang && "html" !== t8.attrMap.lang))
          );
        }
        function vt(t8, e = t8.value) {
          return t8.parent.isWhitespaceSensitive
            ? t8.parent.isIndentationSensitive
              ? T(e)
              : T(cr(ar(e)), S)
            : Y(A, H.split(e));
        }
        function yt(t8, e) {
          return Ce(t8, e) && "script" === t8.name;
        }
        function wt(t8) {
          return (t8 >= 9 && t8 <= 32) || 160 == t8;
        }
        function hr(t8) {
          return 48 <= t8 && t8 <= 57;
        }
        function bt(t8) {
          return (t8 >= 97 && t8 <= 122) || (t8 >= 65 && t8 <= 90);
        }
        function fr(t8) {
          return 10 === t8 || 13 === t8;
        }
        function mr(t8) {
          return 48 <= t8 && t8 <= 55;
        }
        function dr(t8) {
          return 39 === t8 || 34 === t8 || 96 === t8;
        }
        var ki = /-+([a-z0-9])/g;
        var Tt,
          t8,
          ne = class t {
            constructor(e, r, n, s) {
              (this.file = e),
                (this.offset = r),
                (this.line = n),
                (this.col = s);
            }
            toString() {
              return null != this.offset
                ? `${this.file.url}@${this.line}:${this.col}`
                : this.file.url;
            }
            moveBy(e) {
              let r = this.file.content,
                n = r.length,
                s = this.offset,
                i = this.line,
                a = this.col;
              for (; s > 0 && e < 0; )
                if ((s--, e++, 10 == r.charCodeAt(s))) {
                  i--;
                  let u = r.substring(0, s - 1).lastIndexOf("\n");
                  a = u > 0 ? s - u : s;
                } else a--;
              for (; s < n && e > 0; ) {
                let o = r.charCodeAt(s);
                s++, e--, 10 == o ? (i++, (a = 0)) : a++;
              }
              return new t(this.file, s, i, a);
            }
            getContext(e, r) {
              let n = this.file.content,
                s = this.offset;
              if (null != s) {
                s > n.length - 1 && (s = n.length - 1);
                let i = s,
                  a = 0,
                  o = 0;
                for (
                  ;
                  a < e && s > 0 && (s--, a++, "\n" != n[s] || ++o != r);

                );
                for (
                  a = 0, o = 0;
                  a < e &&
                  i < n.length - 1 &&
                  (i++, a++, "\n" != n[i] || ++o != r);

                );
                return {
                  before: n.substring(s, this.offset),
                  after: n.substring(this.offset, i + 1),
                };
              }
              return null;
            }
          },
          Se = class {
            constructor(e, r) {
              (this.content = e), (this.url = r);
            }
          },
          f = class {
            constructor(e, r, n = e, s = null) {
              (this.start = e),
                (this.end = r),
                (this.fullStart = n),
                (this.details = s);
            }
            toString() {
              return this.start.file.content.substring(
                this.start.offset,
                this.end.offset,
              );
            }
          };
        ((t8 = Tt || (Tt = {}))[(t8.WARNING = 0)] = "WARNING"),
          (t8[(t8.ERROR = 1)] = "ERROR");
        var Re = class {
            constructor(e, r, n = Tt.ERROR) {
              (this.span = e), (this.msg = r), (this.level = n);
            }
            contextualMessage() {
              let e = this.span.start.getContext(100, 3);
              return e
                ? `${this.msg} ("${e.before}[${Tt[this.level]} ->]${e.after}")`
                : this.msg;
            }
            toString() {
              let e = this.span.details ? `, ${this.span.details}` : "";
              return `${this.contextualMessage()}: ${this.span.start}${e}`;
            }
          },
          Bi = [
            function Fi(t8) {
              t8.walk((e) => {
                if (
                  "element" === e.type &&
                  e.tagDefinition.ignoreFirstLf &&
                  e.children.length > 0 &&
                  "text" === e.children[0].type &&
                  "\n" === e.children[0].value[0]
                ) {
                  let r = e.children[0];
                  1 === r.value.length
                    ? e.removeChild(r)
                    : (r.value = r.value.slice(1));
                }
              });
            },
            function Pi(t8) {
              let e = (r) => {
                var n, s;
                return (
                  "element" === r.type &&
                  "ieConditionalStartComment" ===
                    (null == (n = r.prev) ? void 0 : n.type) &&
                  r.prev.sourceSpan.end.offset ===
                    r.startSourceSpan.start.offset &&
                  "ieConditionalEndComment" ===
                    (null == (s = r.firstChild) ? void 0 : s.type) &&
                  r.firstChild.sourceSpan.start.offset ===
                    r.startSourceSpan.end.offset
                );
              };
              t8.walk((r) => {
                if (r.children)
                  for (let n = 0; n < r.children.length; n++) {
                    let s = r.children[n];
                    if (!e(s)) continue;
                    let i = s.prev,
                      a = s.firstChild;
                    r.removeChild(i), n--;
                    let o = new f(i.sourceSpan.start, a.sourceSpan.end),
                      u = new f(o.start, s.sourceSpan.end);
                    (s.condition = i.condition),
                      (s.sourceSpan = u),
                      (s.startSourceSpan = o),
                      s.removeChild(a);
                  }
              });
            },
            function Ii(t8) {
              return (function Ni(t8, e, r) {
                t8.walk((n) => {
                  if (n.children)
                    for (let s = 0; s < n.children.length; s++) {
                      let i = n.children[s];
                      if ("text" !== i.type && !e(i)) continue;
                      "text" !== i.type &&
                        ((i.type = "text"), (i.value = r(i)));
                      let a = i.prev;
                      !a ||
                        "text" !== a.type ||
                        ((a.value += i.value),
                        (a.sourceSpan = new f(
                          a.sourceSpan.start,
                          i.sourceSpan.end,
                        )),
                        n.removeChild(i),
                        s--);
                    }
                });
              })(
                t8,
                (e) => "cdata" === e.type,
                (e) => `<![CDATA[${e.value}]]>`,
              );
            },
            function $i(t8, e) {
              if ("html" === e.parser) return;
              let r = /{{(.+?)}}/s;
              t8.walk((n) => {
                if (
                  (function Cn(t8) {
                    return t8.children && !V(t8);
                  })(n)
                )
                  for (let s of n.children) {
                    if ("text" !== s.type) continue;
                    let i = s.sourceSpan.start,
                      a = null,
                      o = s.value.split(r);
                    for (let u = 0; u < o.length; u++, i = a) {
                      let p = o[u];
                      u % 2 != 0
                        ? ((a = i.moveBy(p.length + 4)),
                          n.insertChildBefore(s, {
                            type: "interpolation",
                            sourceSpan: new f(i, a),
                            children:
                              0 === p.length
                                ? []
                                : [
                                    {
                                      type: "text",
                                      value: p,
                                      sourceSpan: new f(
                                        i.moveBy(2),
                                        a.moveBy(-2),
                                      ),
                                    },
                                  ],
                          }))
                        : ((a = i.moveBy(p.length)),
                          p.length > 0 &&
                            n.insertChildBefore(s, {
                              type: "text",
                              value: p,
                              sourceSpan: new f(i, a),
                            }));
                    }
                    n.removeChild(s);
                  }
              });
            },
            function Oi(t8) {
              t8.walk((e) => {
                if (!e.children) return;
                if (
                  0 === e.children.length ||
                  (1 === e.children.length &&
                    "text" === e.children[0].type &&
                    0 === H.trim(e.children[0].value).length)
                )
                  return (
                    (e.hasDanglingSpaces = e.children.length > 0),
                    void (e.children = [])
                  );
                let r = (function Sn(t8) {
                    return V(t8) || "interpolation" === t8.type || or(t8);
                  })(e),
                  n = or(e);
                if (!r)
                  for (let s = 0; s < e.children.length; s++) {
                    let i = e.children[s];
                    if ("text" !== i.type) continue;
                    let {
                        leadingWhitespace: a,
                        text: o,
                        trailingWhitespace: u,
                      } = gn(i.value),
                      p = i.prev,
                      l = i.next;
                    o
                      ? ((i.value = o),
                        (i.sourceSpan = new f(
                          i.sourceSpan.start.moveBy(a.length),
                          i.sourceSpan.end.moveBy(-u.length),
                        )),
                        a &&
                          (p && (p.hasTrailingSpaces = !0),
                          (i.hasLeadingSpaces = !0)),
                        u &&
                          ((i.hasTrailingSpaces = !0),
                          l && (l.hasLeadingSpaces = !0)))
                      : (e.removeChild(i),
                        s--,
                        (a || u) &&
                          (p && (p.hasTrailingSpaces = !0),
                          l && (l.hasLeadingSpaces = !0)));
                  }
                (e.isWhitespaceSensitive = r), (e.isIndentationSensitive = n);
              });
            },
            function Hi(t8, e) {
              t8.walk((r) => {
                r.cssDisplay = (function xn(t8, e) {
                  var n;
                  if (Ce(t8, e)) return "block";
                  if ("comment" === (null == (n = t8.prev) ? void 0 : n.type)) {
                    let s = t8.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
                    if (s) return s[1];
                  }
                  let r = !1;
                  if ("element" === t8.type && "svg" === t8.namespace) {
                    if (
                      !(function bi(t8, e) {
                        let r = t8;
                        for (; r; ) {
                          if (e(r)) return !0;
                          r = r.parent;
                        }
                        return !1;
                      })(t8, (s) => "svg:foreignObject" === s.fullName)
                    )
                      return "svg" === t8.name ? "inline-block" : "block";
                    r = !0;
                  }
                  switch (e.htmlWhitespaceSensitivity) {
                    case "strict":
                      return "inline";
                    case "ignore":
                      return "block";
                    default:
                      return (
                        ("element" === t8.type &&
                          (!t8.namespace || r || de(t8)) &&
                          fn[t8.name]) ||
                        hn
                      );
                  }
                })(r, e);
              });
            },
            function Mi(t8) {
              t8.walk((e) => {
                e.isSelfClosing =
                  !e.children ||
                  ("element" === e.type &&
                    (e.tagDefinition.isVoid ||
                      (e.endSourceSpan &&
                        e.startSourceSpan.start === e.endSourceSpan.start &&
                        e.startSourceSpan.end === e.endSourceSpan.end)));
              });
            },
            function qi(t8, e) {
              t8.walk((r) => {
                "element" === r.type &&
                  (r.hasHtmComponentClosingTag =
                    r.endSourceSpan &&
                    /^<\s*\/\s*\/\s*>$/.test(
                      e.originalText.slice(
                        r.endSourceSpan.start.offset,
                        r.endSourceSpan.end.offset,
                      ),
                    ));
              });
            },
            function Vi(t8, e) {
              t8.walk((r) => {
                let { children: n } = r;
                if (n) {
                  if (0 === n.length)
                    return void (r.isDanglingSpaceSensitive = An(r));
                  for (let s of n)
                    (s.isLeadingSpaceSensitive = _n(s, e)),
                      (s.isTrailingSpaceSensitive = En(s, e));
                  for (let s = 0; s < n.length; s++) {
                    let i = n[s];
                    (i.isLeadingSpaceSensitive =
                      (0 === s || i.prev.isTrailingSpaceSensitive) &&
                      i.isLeadingSpaceSensitive),
                      (i.isTrailingSpaceSensitive =
                        (s === n.length - 1 ||
                          i.next.isLeadingSpaceSensitive) &&
                        i.isTrailingSpaceSensitive);
                  }
                }
              });
            },
            function Ri(t8) {
              let e = (r) => {
                var n, s;
                return (
                  "element" === r.type &&
                  0 === r.attrs.length &&
                  1 === r.children.length &&
                  "text" === r.firstChild.type &&
                  !H.hasWhitespaceCharacter(r.children[0].value) &&
                  !r.firstChild.hasLeadingSpaces &&
                  !r.firstChild.hasTrailingSpaces &&
                  r.isLeadingSpaceSensitive &&
                  !r.hasLeadingSpaces &&
                  r.isTrailingSpaceSensitive &&
                  !r.hasTrailingSpaces &&
                  "text" === (null == (n = r.prev) ? void 0 : n.type) &&
                  "text" === (null == (s = r.next) ? void 0 : s.type)
                );
              };
              t8.walk((r) => {
                if (r.children)
                  for (let n = 0; n < r.children.length; n++) {
                    let s = r.children[n];
                    if (!e(s)) continue;
                    let i = s.prev,
                      a = s.next;
                    (i.value +=
                      `<${s.rawName}>` +
                      s.firstChild.value +
                      `</${s.rawName}>` +
                      a.value),
                      (i.sourceSpan = new f(
                        i.sourceSpan.start,
                        a.sourceSpan.end,
                      )),
                      (i.isTrailingSpaceSensitive = a.isTrailingSpaceSensitive),
                      (i.hasTrailingSpaces = a.hasTrailingSpaces),
                      r.removeChild(s),
                      n--,
                      r.removeChild(a);
                  }
              });
            },
          ];
        var In = function Li(t8, e) {
          for (let r of Bi) r(t8, e);
          return t8;
        };
        function Rn(t8) {
          return /^\s*<!--\s*@(?:format|prettier)\s*-->/.test(t8);
        }
        function se(t8) {
          return t8.sourceSpan.start.offset;
        }
        function ie(t8) {
          return t8.sourceSpan.end.offset;
        }
        var On = async function Ui(t8, e) {
            if ("yaml" === t8.lang) {
              let r = t8.value.trim(),
                n = r ? await e(r, { parser: "yaml" }) : "";
              return (function en(t8) {
                return Jr({ type: "root" }, t8);
              })([t8.startDelimiter, S, n, n ? S : "", t8.endDelimiter]);
            }
          },
          Mn = new Proxy(() => {}, { get: () => Mn }),
          gr = Mn;
        var xt = function Wi(t8) {
          return Array.isArray(t8) && t8.length > 0;
        };
        function Qe(t8, e) {
          return [t8.isSelfClosing ? "" : zi(t8, e), Xe(t8, e)];
        }
        function zi(t8, e) {
          return t8.lastChild && Ae(t8.lastChild) ? "" : [Gi(t8, e), kt(t8, e)];
        }
        function Xe(t8, e) {
          return (t8.next ? j(t8.next) : Ee(t8.parent))
            ? ""
            : [_e(t8, e), U(t8, e)];
        }
        function Gi(t8, e) {
          return Ee(t8) ? _e(t8.lastChild, e) : "";
        }
        function U(t8, e) {
          return Ae(t8) ? kt(t8.parent, e) : Je(t8) ? Bt(t8.next) : "";
        }
        function kt(t8, e) {
          if ((gr(!t8.isSelfClosing), qn(t8, e))) return "";
          switch (t8.type) {
            case "ieConditionalComment":
              return "<!";
            case "element":
              if (t8.hasHtmComponentClosingTag) return "<//";
            default:
              return `</${t8.rawName}`;
          }
        }
        function _e(t8, e) {
          if (qn(t8, e)) return "";
          switch (t8.type) {
            case "ieConditionalComment":
            case "ieConditionalEndComment":
              return "[endif]--\x3e";
            case "ieConditionalStartComment":
              return "]>\x3c!--\x3e";
            case "interpolation":
              return "}}";
            case "element":
              if (t8.isSelfClosing) return "/>";
            default:
              return ">";
          }
        }
        function qn(t8, e) {
          return (
            !t8.isSelfClosing &&
            !t8.endSourceSpan &&
            (Ge(t8) || _t(t8.parent, e))
          );
        }
        function j(t8) {
          return (
            t8.prev &&
            "docType" !== t8.prev.type &&
            "angularControlFlowBlock" !== t8.type &&
            !N(t8.prev) &&
            t8.isLeadingSpaceSensitive &&
            !t8.hasLeadingSpaces
          );
        }
        function Ee(t8) {
          var e;
          return (
            (null == (e = t8.lastChild)
              ? void 0
              : e.isTrailingSpaceSensitive) &&
            !t8.lastChild.hasTrailingSpaces &&
            !N(At(t8.lastChild)) &&
            !ge(t8)
          );
        }
        function Ae(t8) {
          return (
            !t8.next &&
            !t8.hasTrailingSpaces &&
            t8.isTrailingSpaceSensitive &&
            N(At(t8))
          );
        }
        function Je(t8) {
          return (
            t8.next &&
            !N(t8.next) &&
            N(t8) &&
            t8.isTrailingSpaceSensitive &&
            !t8.hasTrailingSpaces
          );
        }
        function Ze(t8) {
          return !t8.prev && t8.isLeadingSpaceSensitive && !t8.hasLeadingSpaces;
        }
        function ji(t8, e, r) {
          var m;
          let { node: n } = t8;
          if (!xt(n.attrs)) return n.isSelfClosing ? " " : "";
          let s =
              "comment" === (null == (m = n.prev) ? void 0 : m.type) &&
              (function Yi(t8) {
                let e = t8
                  .trim()
                  .match(/^prettier-ignore-attribute(?:\s+(.+))?$/s);
                return !!e && (!e[1] || e[1].split(/\s+/));
              })(n.prev.value),
            i =
              "boolean" == typeof s
                ? () => s
                : Array.isArray(s)
                  ? (d) => s.includes(d.rawName)
                  : () => !1,
            a = t8.map(
              ({ node: d }) =>
                i(d) ? T(e.originalText.slice(se(d), ie(d))) : r(),
              "attrs",
            ),
            o =
              "element" === n.type &&
              "script" === n.fullName &&
              1 === n.attrs.length &&
              "src" === n.attrs[0].fullName &&
              0 === n.children.length,
            p =
              e.singleAttributePerLine && n.attrs.length > 1 && !Ce(n, e)
                ? S
                : A,
            l = [R([o ? " " : A, Y(p, a)])];
          return (
            (n.firstChild && Ze(n.firstChild)) ||
            (n.isSelfClosing && Ee(n.parent)) ||
            o
              ? l.push(n.isSelfClosing ? " " : "")
              : l.push(
                  e.bracketSameLine
                    ? n.isSelfClosing
                      ? " "
                      : ""
                    : n.isSelfClosing
                      ? A
                      : b,
                ),
            l
          );
        }
        function Ki(t8) {
          return t8.firstChild && Ze(t8.firstChild) ? "" : Lt(t8);
        }
        function et(t8, e, r) {
          let { node: n } = t8;
          return [tt(n, e), ji(t8, e, r), n.isSelfClosing ? "" : Ki(n)];
        }
        function tt(t8, e) {
          return t8.prev && Je(t8.prev) ? "" : [W(t8, e), Bt(t8)];
        }
        function W(t8, e) {
          return Ze(t8) ? Lt(t8.parent) : j(t8) ? _e(t8.prev, e) : "";
        }
        function Bt(t8) {
          switch (t8.type) {
            case "ieConditionalComment":
            case "ieConditionalStartComment":
              return `\x3c!--[if ${t8.condition}`;
            case "ieConditionalEndComment":
              return "\x3c!--<!";
            case "interpolation":
              return "{{";
            case "docType":
              return "html" === t8.value ? "<!doctype" : "<!DOCTYPE";
            case "element":
              if (t8.condition)
                return `\x3c!--[if ${t8.condition}]>\x3c!--\x3e<${t8.rawName}`;
            default:
              return `<${t8.rawName}`;
          }
        }
        function Lt(t8) {
          switch ((gr(!t8.isSelfClosing), t8.type)) {
            case "ieConditionalComment":
              return "]>";
            case "element":
              if (t8.condition) return ">\x3c!--<![endif]--\x3e";
            default:
              return ">";
          }
        }
        var Cr = new WeakMap();
        var $e = function Qi(t8, e) {
          let { root: r } = t8;
          return (
            Cr.has(r) ||
              Cr.set(
                r,
                r.children.some(
                  (n) =>
                    yt(n, e) && ["ts", "typescript"].includes(n.attrMap.lang),
                ),
              ),
            Cr.get(r)
          );
        };
        var Ft = function Xi(t8, e) {
          if (!t8.endSourceSpan) return "";
          let r = t8.startSourceSpan.end.offset;
          t8.firstChild && Ze(t8.firstChild) && (r -= Lt(t8).length);
          let n = t8.endSourceSpan.start.offset;
          return (
            t8.lastChild && Ae(t8.lastChild)
              ? (n += kt(t8, e).length)
              : Ee(t8) && (n -= _e(t8.lastChild, e).length),
            e.originalText.slice(r, n)
          );
        };
        function Hn(t8) {
          return (
            "\t" === t8 ||
            "\n" === t8 ||
            "\f" === t8 ||
            "\r" === t8 ||
            " " === t8
          );
        }
        var Ji = /^[ \t\n\r\u000c]+/,
          Zi = /^[, \t\n\r\u000c]+/,
          ea = /^[^ \t\n\r\u000c]+/,
          ta = /[,]+$/,
          Vn = /^\d+$/,
          ra = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
        var Un = function na(t8) {
          let r,
            n,
            s,
            i,
            a,
            u,
            e = t8.length,
            o = 0;
          function p(C) {
            let _2,
              D = C.exec(t8.substring(o));
            if (D) return ([_2] = D), (o += _2.length), _2;
          }
          let l = [];
          for (;;) {
            if ((p(Zi), o >= e)) {
              if (0 === l.length)
                throw new Error(
                  "Must contain one or more image candidate strings.",
                );
              return l;
            }
            (u = o),
              (r = p(ea)),
              (n = []),
              "," === r.slice(-1) ? ((r = r.replace(ta, "")), d()) : m();
          }
          function m() {
            for (p(Ji), s = "", i = "in descriptor"; ; ) {
              if (((a = t8.charAt(o)), "in descriptor" === i))
                if (Hn(a)) s && (n.push(s), (s = ""), (i = "after descriptor"));
                else {
                  if ("," === a) return (o += 1), s && n.push(s), void d();
                  if ("(" === a) (s += a), (i = "in parens");
                  else {
                    if ("" === a) return s && n.push(s), void d();
                    s += a;
                  }
                }
              else if ("in parens" === i)
                if (")" === a) (s += a), (i = "in descriptor");
                else {
                  if ("" === a) return n.push(s), void d();
                  s += a;
                }
              else if ("after descriptor" === i && !Hn(a)) {
                if ("" === a) return void d();
                (i = "in descriptor"), (o -= 1);
              }
              o += 1;
            }
          }
          function d() {
            let _2,
              D,
              P2,
              B,
              g,
              y2,
              $,
              w2,
              q2,
              C = !1,
              c = {};
            for (B = 0; B < n.length; B++)
              (g = n[B]),
                (y2 = g[g.length - 1]),
                ($ = g.substring(0, g.length - 1)),
                (w2 = parseInt($, 10)),
                (q2 = parseFloat($)),
                Vn.test($) && "w" === y2
                  ? ((_2 || D) && (C = !0), 0 === w2 ? (C = !0) : (_2 = w2))
                  : ra.test($) && "x" === y2
                    ? ((_2 || D || P2) && (C = !0),
                      q2 < 0 ? (C = !0) : (D = q2))
                    : Vn.test($) && "h" === y2
                      ? ((P2 || D) && (C = !0), 0 === w2 ? (C = !0) : (P2 = w2))
                      : (C = !0);
            if (C)
              throw new Error(
                `Invalid srcset descriptor found in "${t8}" at "${g}".`,
              );
            (c.source = { value: r, startOffset: u }),
              _2 && (c.width = { value: _2 }),
              D && (c.density = { value: D }),
              P2 && (c.height = { value: P2 }),
              l.push(c);
          }
        };
        function De(t8, e = !0) {
          return [R([b, t8]), e ? b : ""];
        }
        function K(t8, e) {
          let r =
            "NGRoot" === t8.type
              ? "NGMicrosyntax" === t8.node.type &&
                1 === t8.node.body.length &&
                "NGMicrosyntaxExpression" === t8.node.body[0].type
                ? t8.node.body[0].expression
                : t8.node
              : "JsExpressionRoot" === t8.type
                ? t8.node
                : t8;
          return (
            r &&
            ("ObjectExpression" === r.type ||
              "ArrayExpression" === r.type ||
              (("__vue_expression" === e.parser ||
                "__vue_ts_expression" === e.parser) &&
                ("TemplateLiteral" === r.type || "StringLiteral" === r.type)))
          );
        }
        async function x(t8, e, r, n) {
          r = { __isInHtmlAttribute: !0, __embeddedInHtml: !0, ...r };
          let s = !0;
          n &&
            (r.__onHtmlBindingRoot = (a, o) => {
              s = n(a, o);
            });
          let i = await e(t8, r, e);
          return s ? E(i) : De(i);
        }
        var Wn = { width: "w", height: "h", density: "x" },
          ia = Object.keys(Wn);
        var zn = function sa(t8) {
          if (
            "srcset" === t8.node.fullName &&
            ("img" === t8.parent.fullName || "source" === t8.parent.fullName)
          )
            return () =>
              (function aa(t8) {
                let e = Un(t8),
                  r = ia.filter((l) =>
                    e.some((m) => Object.prototype.hasOwnProperty.call(m, l)),
                  );
                if (r.length > 1)
                  throw new Error(
                    "Mixed descriptor in srcset is not supported",
                  );
                let [n] = r,
                  s = Wn[n],
                  i = e.map((l) => l.source.value),
                  a = Math.max(...i.map((l) => l.length)),
                  o = e.map((l) => (l[n] ? String(l[n].value) : "")),
                  u = o.map((l) => {
                    let m = l.indexOf(".");
                    return -1 === m ? l.length : m;
                  }),
                  p = Math.max(...u);
                return De(
                  Y(
                    [",", A],
                    i.map((l, m) => {
                      let d = [l],
                        C = o[m];
                      if (C) {
                        let _2 = a - l.length + 1,
                          D = p - u[m],
                          P2 = " ".repeat(_2 + D);
                        d.push(fe(P2, " "), C + s);
                      }
                      return d;
                    }),
                  ),
                );
              })(L(t8.node));
        };
        var Gn = function oa(t8, e) {
          let { node: r } = t8,
            n = L(r);
          if ("class" === r.fullName && !e.parentParser && !n.includes("{{"))
            return () => n.trim().split(/\s+/).join(" ");
        };
        function Yn(t8, e) {
          let { node: r } = t8,
            n = L(t8.node).trim();
          if ("style" === r.fullName && !e.parentParser && !n.includes("{{"))
            return async (s) =>
              De(await s(n, { parser: "css", __isHTMLStyleAttribute: !0 }));
        }
        async function jn(t8, e, r, n) {
          let s = L(r.node),
            {
              left: i,
              operator: a,
              right: o,
            } = (function ua(t8) {
              let e = /(.*?)\s+(in|of)\s+(.*)/s,
                r = /,([^,\]}]*)(?:,([^,\]}]*))?$/,
                n = /^\(|\)$/g,
                s = t8.match(e);
              if (!s) return;
              let i = {};
              if (((i.for = s[3].trim()), !i.for)) return;
              let a = v(!1, s[1].trim(), n, ""),
                o = a.match(r);
              o
                ? ((i.alias = a.replace(r, "")),
                  (i.iterator1 = o[1].trim()),
                  o[2] && (i.iterator2 = o[2].trim()))
                : (i.alias = a);
              let u = [i.alias, i.iterator1, i.iterator2];
              if (
                !u.some(
                  (p, l) => !p && (0 === l || u.slice(l + 1).some(Boolean)),
                )
              )
                return {
                  left: u.filter(Boolean).join(","),
                  operator: s[2],
                  right: i.for,
                };
            })(s),
            u = $e(r, n);
          return [
            E(
              await x(`function _(${i}) {}`, t8, {
                parser: u ? "babel-ts" : "babel",
                __isVueForBindingLeft: !0,
              }),
            ),
            " ",
            a,
            " ",
            await x(o, t8, {
              parser: u ? "__ts_expression" : "__js_expression",
            }),
          ];
        }
        function Kn(t8, e, r) {
          let { node: n } = r;
          return x(
            `type T<${L(n)}> = any`,
            t8,
            { parser: "babel-ts", __isEmbeddedTypescriptGenericParameters: !0 },
            K,
          );
        }
        function Jn(t8, e, { parseWithTs: r }) {
          return x(
            t8,
            e,
            { parser: r ? "__ts_expression" : "__js_expression" },
            K,
          );
        }
        var Zn = function la(t8, e) {
            if ("vue" !== e.parser) return;
            let { node: r } = t8,
              n = r.fullName;
            if ("v-for" === n) return jn;
            if ("generic" === n && yt(r.parent, e)) return Kn;
            let s = L(r),
              i = $e(t8, e);
            return (function Bn(t8) {
              let e = t8.fullName;
              return (
                "#" === e.charAt(0) ||
                "slot-scope" === e ||
                "v-slot" === e ||
                e.startsWith("v-slot:")
              );
            })(r) ||
              (function Ln(t8, e) {
                let r = t8.parent;
                if (!Ce(r, e)) return !1;
                let n = r.fullName,
                  s = t8.fullName;
                return (
                  ("script" === n && "setup" === s) ||
                  ("style" === n && "vars" === s)
                );
              })(r, e)
              ? (a) =>
                  (function Qn(t8, e, { parseWithTs: r }) {
                    return x(`function _(${t8}) {}`, e, {
                      parser: r ? "babel-ts" : "babel",
                      __isVueBindings: !0,
                    });
                  })(s, a, { parseWithTs: i })
              : n.startsWith("@") || n.startsWith("v-on:")
                ? (a) =>
                    (function ca(t8, e, { parseWithTs: r }) {
                      return (function Xn(t8) {
                        let n = t8.trim();
                        return (
                          /^(?:[\w$]+|\([^)]*\))\s*=>|^function\s*\(/.test(n) ||
                          /^[$_a-z][\w$]*(?:\.[$_a-z][\w$]*|\['[^']*']|\["[^"]*"]|\[\d+]|\[[$_a-z][\w$]*])*$/i.test(
                            n,
                          )
                        );
                      })(t8)
                        ? Jn(t8, e, { parseWithTs: r })
                        : x(
                            t8,
                            e,
                            {
                              parser: r
                                ? "__vue_ts_event_binding"
                                : "__vue_event_binding",
                            },
                            K,
                          );
                    })(s, a, { parseWithTs: i })
                : n.startsWith(":") || n.startsWith("v-bind:")
                  ? (a) =>
                      (function pa(t8, e, { parseWithTs: r }) {
                        return x(
                          t8,
                          e,
                          {
                            parser: r
                              ? "__vue_ts_expression"
                              : "__vue_expression",
                          },
                          K,
                        );
                      })(s, a, { parseWithTs: i })
                  : n.startsWith("v-")
                    ? (a) => Jn(s, a, { parseWithTs: i })
                    : void 0;
          },
          Sr = /{{(.+?)}}/s;
        function _r({ parser: t8 }) {
          return (e, r, n) =>
            x(L(n.node), e, { parser: t8, trailingComma: "none" }, K);
        }
        var ha = _r({ parser: "__ng_action" }),
          fa = _r({ parser: "__ng_binding" }),
          ma = _r({ parser: "__ng_directive" });
        var ts = function da(t8, e) {
          if ("angular" !== e.parser) return;
          let { node: r } = t8,
            n = r.fullName;
          if ((n.startsWith("(") && n.endsWith(")")) || n.startsWith("on-"))
            return ha;
          if (
            (n.startsWith("[") && n.endsWith("]")) ||
            /^bind(?:on)?-/.test(n) ||
            /^ng-(?:if|show|hide|class|style)$/.test(n)
          )
            return fa;
          if (n.startsWith("*")) return ma;
          let s = L(r);
          return /^i18n(?:-.+)?$/.test(n)
            ? () => De(gt(vt(r, s.trim())), !s.includes("@@"))
            : Sr.test(s)
              ? (i) =>
                  (async function es(t8, e) {
                    let r = [];
                    for (let [n, s] of t8.split(Sr).entries())
                      if (n % 2 == 0) r.push(T(s));
                      else
                        try {
                          r.push(
                            E([
                              "{{",
                              R([
                                A,
                                await x(s, e, {
                                  parser: "__ng_interpolation",
                                  __isInHtmlInterpolation: !0,
                                  trailingComma: "none",
                                }),
                              ]),
                              A,
                              "}}",
                            ]),
                          );
                        } catch {
                          r.push("{{", T(s), "}}");
                        }
                    return r;
                  })(s, i)
              : void 0;
        };
        function Ca(t8) {
          return async (e, r, n, s) => {
            let i = await t8(e, r, n, s);
            if (i)
              return (
                (i = Ct(i, (a) =>
                  "string" == typeof a ? v(!1, a, '"', "&quot;") : a,
                )),
                [n.node.rawName, '="', E(i), '"']
              );
          };
        }
        var rs = function ga(t8, e) {
          let { node: r } = t8;
          if (r.value) {
            if (
              /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(
                e.originalText.slice(
                  r.valueSpan.start.offset,
                  r.valueSpan.end.offset,
                ),
              ) ||
              ("lwc" === e.parser &&
                r.value.startsWith("{") &&
                r.value.endsWith("}"))
            )
              return [r.rawName, "=", r.value];
            for (let n of [zn, Yn, Gn, Zn, ts]) {
              let s = n(t8, e);
              if (s) return Ca(s);
            }
          }
        };
        var ns = function Sa(t8, e, r, n) {
            let { node: s } = r,
              i = n.originalText.slice(
                s.sourceSpan.start.offset,
                s.sourceSpan.end.offset,
              );
            return /^\s*$/.test(i)
              ? ""
              : x(
                  i,
                  t8,
                  {
                    parser: "__ng_directive",
                    __isInHtmlAttribute: !1,
                    trailingComma: "none",
                  },
                  K,
                );
          },
          _a = new Set(["if", "else if", "for", "switch", "case"]);
        var ss = function Ea(t8, e) {
          let { node: r } = t8;
          switch (r.type) {
            case "element":
              if (V(r) || "interpolation" === r.type) return;
              if (!r.isSelfClosing && Dt(r, e)) {
                let n = lr(r, e);
                return n
                  ? async (s, i) => {
                      let a = Ft(r, e),
                        o = /^\s*$/.test(a),
                        u = "";
                      return (
                        o ||
                          ((u = await s(ar(a), {
                            parser: n,
                            __embeddedInHtml: !0,
                          })),
                          (o = "" === u)),
                        [
                          W(r, e),
                          E(et(t8, e, i)),
                          o ? "" : S,
                          u,
                          o ? "" : S,
                          Qe(r, e),
                          U(r, e),
                        ]
                      );
                    }
                  : void 0;
              }
              break;
            case "text":
              if (V(r.parent)) {
                let n = lr(r.parent, e);
                if (n)
                  return async (s) => {
                    let i =
                        "markdown" === n
                          ? cr(r.value.replace(/^[^\S\n]*\n/, ""))
                          : r.value,
                      a = { parser: n, __embeddedInHtml: !0 };
                    if ("html" === e.parser && "babel" === n) {
                      let o = "script",
                        { attrMap: u } = r.parent;
                      u &&
                        ("module" === u.type ||
                          ("text/babel" === u.type &&
                            "module" === u["data-type"])) &&
                        (o = "module"),
                        (a.__babelSourceType = o);
                    }
                    return [
                      re,
                      W(r, e),
                      await s(i, a, { stripTrailingHardline: !0 }),
                      U(r, e),
                    ];
                  };
              } else if ("interpolation" === r.parent.type)
                return async (n) => {
                  let s = { __isInHtmlInterpolation: !0, __embeddedInHtml: !0 };
                  return (
                    "angular" === e.parser
                      ? ((s.parser = "__ng_interpolation"),
                        (s.trailingComma = "none"))
                      : "vue" === e.parser
                        ? (s.parser = $e(t8, e)
                            ? "__vue_ts_expression"
                            : "__vue_expression")
                        : (s.parser = "__js_expression"),
                    [
                      R([A, await n(r.value, s)]),
                      r.parent.next && j(r.parent.next) ? " " : A,
                    ]
                  );
                };
              break;
            case "attribute":
              return rs(t8, e);
            case "front-matter":
              return (n) => On(r, n);
            case "angularControlFlowBlockParameters":
              return _a.has(t8.parent.name) ? ns : void 0;
          }
        };
        function rt(t8, e, r) {
          let n = t8.node;
          return Ge(n)
            ? [
                W(n, e),
                T(
                  e.originalText.slice(
                    se(n) + (n.prev && Je(n.prev) ? Bt(n).length : 0),
                    ie(n) - (n.next && j(n.next) ? _e(n, e).length : 0),
                  ),
                ),
                U(n, e),
              ]
            : r();
        }
        function Pt(t8, e) {
          return N(t8) && N(e)
            ? t8.isTrailingSpaceSensitive
              ? t8.hasTrailingSpaces
                ? Et(e)
                  ? S
                  : A
                : ""
              : Et(e)
                ? S
                : b
            : (Je(t8) &&
                  (Ge(e) ||
                    e.firstChild ||
                    e.isSelfClosing ||
                    ("element" === e.type && e.attrs.length > 0))) ||
                ("element" === t8.type && t8.isSelfClosing && j(e))
              ? ""
              : !e.isLeadingSpaceSensitive ||
                  Et(e) ||
                  (j(e) &&
                    t8.lastChild &&
                    Ae(t8.lastChild) &&
                    t8.lastChild.lastChild &&
                    Ae(t8.lastChild.lastChild))
                ? S
                : e.hasLeadingSpaces
                  ? A
                  : b;
        }
        function Oe(t8, e, r) {
          let { node: n } = t8;
          if (ur(n))
            return [
              re,
              ...t8.map((i) => {
                let a = i.node,
                  o = a.prev ? Pt(a.prev, a) : "";
                return [o ? [o, Ye(a.prev) ? S : ""] : "", rt(i, e, r)];
              }, "children"),
            ];
          let s = n.children.map(() => Symbol(""));
          return t8.map((i, a) => {
            let o = i.node;
            if (N(o)) {
              if (o.prev && N(o.prev)) {
                let _2 = Pt(o.prev, o);
                if (_2)
                  return Ye(o.prev) ? [S, S, rt(i, e, r)] : [_2, rt(i, e, r)];
              }
              return rt(i, e, r);
            }
            let u = [],
              p = [],
              l = [],
              m = [],
              d = o.prev ? Pt(o.prev, o) : "",
              C = o.next ? Pt(o, o.next) : "";
            return (
              d &&
                (Ye(o.prev)
                  ? u.push(S, S)
                  : d === S
                    ? u.push(S)
                    : N(o.prev)
                      ? p.push(d)
                      : p.push(fe("", b, { groupId: s[a - 1] }))),
              C &&
                (Ye(o)
                  ? N(o.next) && m.push(S, S)
                  : C === S
                    ? N(o.next) && m.push(S)
                    : l.push(C)),
              [...u, E([...p, E([rt(i, e, r), ...l], { id: s[a] })]), ...m]
            );
          }, "children");
        }
        function is(t8, e, r) {
          let { node: n } = t8;
          if (_t(n, e))
            return [
              W(n, e),
              E(et(t8, e, r)),
              T(Ft(n, e)),
              ...Qe(n, e),
              U(n, e),
            ];
          let s =
              1 === n.children.length &&
              "interpolation" === n.firstChild.type &&
              n.firstChild.isLeadingSpaceSensitive &&
              !n.firstChild.hasLeadingSpaces &&
              n.lastChild.isTrailingSpaceSensitive &&
              !n.lastChild.hasTrailingSpaces,
            i = Symbol("element-attr-group-id"),
            a = (l) => E([E(et(t8, e, r), { id: i }), l, Qe(n, e)]);
          return 0 === n.children.length
            ? a(n.hasDanglingSpaces && n.isDanglingSpaceSensitive ? A : "")
            : a([
                Dn(n) ? re : "",
                ((l = [
                  s
                    ? fe(b, "", { groupId: i })
                    : n.firstChild.hasLeadingSpaces &&
                        n.firstChild.isLeadingSpaceSensitive
                      ? A
                      : "text" === n.firstChild.type &&
                          n.isWhitespaceSensitive &&
                          n.isIndentationSensitive
                        ? (function Zr(t8) {
                            return Jr(Number.NEGATIVE_INFINITY, t8);
                          })(b)
                        : b,
                  Oe(t8, e, r),
                ]),
                s
                  ? (function tn(t8, e) {
                      return {
                        type: pe,
                        contents: t8,
                        groupId: e.groupId,
                        negate: e.negate,
                      };
                    })(l, { groupId: i })
                  : (!V(n) && !Ke(n, e)) ||
                      "root" !== n.parent.type ||
                      "vue" !== e.parser ||
                      e.vueIndentScriptAndStyle
                    ? R(l)
                    : l),
                (n.next ? j(n.next) : Ee(n.parent))
                  ? n.lastChild.hasTrailingSpaces &&
                    n.lastChild.isTrailingSpaceSensitive
                    ? " "
                    : ""
                  : s
                    ? fe(b, "", { groupId: i })
                    : n.lastChild.hasTrailingSpaces &&
                        n.lastChild.isTrailingSpaceSensitive
                      ? A
                      : ("comment" === n.lastChild.type ||
                            ("text" === n.lastChild.type &&
                              n.isWhitespaceSensitive &&
                              n.isIndentationSensitive)) &&
                          new RegExp(
                            `\\n[\\t ]{${e.tabWidth * (t8.ancestors.length - 1)}}$`,
                          ).test(n.lastChild.value)
                        ? ""
                        : b,
              ]);
          var l;
        }
        var as = new Map([
          ["if", new Set(["else if", "else"])],
          ["else if", new Set(["else if", "else"])],
          ["for", new Set(["empty"])],
          ["defer", new Set(["placeholder", "error", "loading"])],
          ["placeholder", new Set(["placeholder", "error", "loading"])],
          ["error", new Set(["placeholder", "error", "loading"])],
          ["loading", new Set(["placeholder", "error", "loading"])],
        ]);
        function os(t8, e, r) {
          let { node: n } = t8,
            s = [];
          (function Aa(t8) {
            let { previous: e } = t8;
            return "angularControlFlowBlock" === e?.type && !us(t8.previous);
          })(t8) && s.push("} "),
            s.push("@", n.name),
            n.parameters && s.push(" (", E(r("parameters")), ")"),
            s.push(" {");
          let i = us(n);
          return (
            n.children.length > 0
              ? ((n.firstChild.hasLeadingSpaces = !0),
                (n.lastChild.hasTrailingSpaces = !0),
                s.push(R([S, Oe(t8, e, r)])),
                i && s.push(S, "}"))
              : i && s.push("}"),
            E(s, { shouldBreak: !0 })
          );
        }
        function us(t8) {
          var e, r;
          return !(
            "angularControlFlowBlock" ===
              (null == (e = t8.next) ? void 0 : e.type) &&
            null != (r = as.get(t8.name)) &&
            r.has(t8.next.name)
          );
        }
        var nt = null;
        function st(t8) {
          if (null !== nt && (nt.property, 1)) {
            let e = nt;
            return (nt = st.prototype = null), e;
          }
          return (nt = st.prototype = t8 ?? Object.create(null)), new st();
        }
        for (let t8 = 0; t8 <= 10; t8++) st();
        var cs = function va(t8, e = "type") {
          return (
            (function Er(t8) {
              return st(t8);
            })(t8),
            function r(n) {
              let s = n[e],
                i = t8[s];
              if (!Array.isArray(i))
                throw Object.assign(
                  new Error(`Missing visitor keys for '${s}'.`),
                  { node: n },
                );
              return i;
            }
          );
        };
        var ms,
          ds,
          Ta = {
            preprocess: In,
            print: function ba(t8, e, r) {
              let { node: n } = t8;
              switch (n.type) {
                case "front-matter":
                  return T(n.raw);
                case "root":
                  return (
                    e.__onHtmlRoot && e.__onHtmlRoot(n), [E(Oe(t8, e, r)), S]
                  );
                case "element":
                case "ieConditionalComment":
                  return is(t8, e, r);
                case "angularControlFlowBlock":
                  return os(t8, e, r);
                case "angularControlFlowBlockParameters":
                  return (function ls(t8, e, r) {
                    return [R([b, Y([";", A], t8.map(r, "children"))]), b];
                  })(t8, 0, r);
                case "angularControlFlowBlockParameter":
                  return H.trim(n.expression);
                case "ieConditionalStartComment":
                case "ieConditionalEndComment":
                  return [tt(n), Xe(n)];
                case "interpolation":
                  return [tt(n, e), ...t8.map(r, "children"), Xe(n, e)];
                case "text": {
                  if ("interpolation" === n.parent.type) {
                    let i = /\n[^\S\n]*$/,
                      a = i.test(n.value);
                    return [
                      T(a ? n.value.replace(i, "") : n.value),
                      a ? S : "",
                    ];
                  }
                  let s = nn([W(n, e), ...vt(n), U(n, e)]);
                  return Array.isArray(s) ? gt(s) : s;
                }
                case "docType":
                  return [
                    E([
                      tt(n, e),
                      " ",
                      v(!1, n.value.replace(/^html\b/i, "html"), /\s+/g, " "),
                    ]),
                    Xe(n, e),
                  ];
                case "comment":
                  return [
                    W(n, e),
                    T(e.originalText.slice(se(n), ie(n))),
                    U(n, e),
                  ];
                case "attribute": {
                  if (null === n.value) return n.rawName;
                  let s = pr(n.value),
                    i = on(s, '"');
                  return [
                    n.rawName,
                    "=",
                    i,
                    T(
                      '"' === i
                        ? v(!1, s, '"', "&quot;")
                        : v(!1, s, "'", "&apos;"),
                    ),
                    i,
                  ];
                }
                default:
                  throw new sn(n, "HTML");
              }
            },
            insertPragma: function $n(t8) {
              return "\x3c!-- @format --\x3e\n\n" + t8;
            },
            massageAstNode: cn,
            embed: ss,
            getVisitorKeys: cs({
              "front-matter": [],
              root: ["children"],
              element: ["attrs", "children"],
              ieConditionalComment: ["children"],
              ieConditionalStartComment: [],
              ieConditionalEndComment: [],
              interpolation: ["children"],
              text: ["children"],
              docType: [],
              comment: [],
              attribute: [],
              cdata: [],
              angularControlFlowBlock: ["children", "parameters"],
              angularControlFlowBlockParameters: ["children"],
              angularControlFlowBlockParameter: [],
            }),
          },
          fs = Ta,
          Hr = {};
        Yr(Hr, {
          angular: () => vo,
          html: () => Do,
          lwc: () => wo,
          vue: () => yo,
        }),
          (function (t8) {
            (t8[(t8.Emulated = 0)] = "Emulated"),
              (t8[(t8.None = 2)] = "None"),
              (t8[(t8.ShadowDom = 3)] = "ShadowDom");
          })(ms || (ms = {})),
          (function (t8) {
            (t8[(t8.OnPush = 0)] = "OnPush"),
              (t8[(t8.Default = 1)] = "Default");
          })(ds || (ds = {}));
        var X,
          gs,
          F,
          It,
          Ar_name = "custom-elements",
          Dr_name = "no-errors-schema";
        function it(t8) {
          if (":" != t8[0]) return [null, t8];
          let e = t8.indexOf(":", 1);
          if (-1 === e)
            throw new Error(
              `Unsupported format "${t8}" expecting ":namespace:name"`,
            );
          return [t8.slice(1, e), t8.slice(e + 1)];
        }
        function vr(t8) {
          return "ng-container" === it(t8)[1];
        }
        function yr(t8) {
          return "ng-content" === it(t8)[1];
        }
        function Me(t8) {
          return null === t8 ? null : it(t8)[0];
        }
        function qe(t8, e) {
          return t8 ? `:${t8}:${e}` : e;
        }
        function wr() {
          return (
            It ||
              ((It = {}),
              Nt(X.HTML, ["iframe|srcdoc", "*|innerHTML", "*|outerHTML"]),
              Nt(X.STYLE, ["*|style"]),
              Nt(X.URL, [
                "*|formAction",
                "area|href",
                "area|ping",
                "audio|src",
                "a|href",
                "a|ping",
                "blockquote|cite",
                "body|background",
                "del|cite",
                "form|action",
                "img|src",
                "input|src",
                "ins|cite",
                "q|cite",
                "source|src",
                "track|src",
                "video|poster",
                "video|src",
              ]),
              Nt(X.RESOURCE_URL, [
                "applet|code",
                "applet|codebase",
                "base|href",
                "embed|src",
                "frame|src",
                "head|profile",
                "html|manifest",
                "iframe|src",
                "link|href",
                "media|src",
                "object|codebase",
                "object|data",
                "script|src",
              ])),
            It
          );
        }
        function Nt(t8, e) {
          for (let r of e) It[r.toLowerCase()] = t8;
        }
        !(function (t8) {
          (t8[(t8.NONE = 0)] = "NONE"),
            (t8[(t8.HTML = 1)] = "HTML"),
            (t8[(t8.STYLE = 2)] = "STYLE"),
            (t8[(t8.SCRIPT = 3)] = "SCRIPT"),
            (t8[(t8.URL = 4)] = "URL"),
            (t8[(t8.RESOURCE_URL = 5)] = "RESOURCE_URL");
        })(X || (X = {})),
          (function (t8) {
            (t8[(t8.Error = 0)] = "Error"),
              (t8[(t8.Warning = 1)] = "Warning"),
              (t8[(t8.Ignore = 2)] = "Ignore");
          })(gs || (gs = {})),
          (function (t8) {
            (t8[(t8.RAW_TEXT = 0)] = "RAW_TEXT"),
              (t8[(t8.ESCAPABLE_RAW_TEXT = 1)] = "ESCAPABLE_RAW_TEXT"),
              (t8[(t8.PARSABLE_DATA = 2)] = "PARSABLE_DATA");
          })(F || (F = {}));
        var Rt = class {},
          Fa = [
            "[Element]|textContent,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColSpan,%ariaCurrent,%ariaDescription,%ariaDisabled,%ariaExpanded,%ariaHasPopup,%ariaHidden,%ariaKeyShortcuts,%ariaLabel,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored",
            "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
            "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy",
            "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume",
            ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex",
            ":svg:graphics^:svg:|",
            ":svg:animation^:svg:|*begin,*end,*repeat",
            ":svg:geometry^:svg:|",
            ":svg:componentTransferFunction^:svg:|",
            ":svg:gradient^:svg:|",
            ":svg:textContent^:svg:graphics|",
            ":svg:textPositioning^:svg:textContent|",
            "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username",
            "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username",
            "audio^media|",
            "br^[HTMLElement]|clear",
            "base^[HTMLElement]|href,target",
            "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink",
            "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value",
            "canvas^[HTMLElement]|#height,#width",
            "content^[HTMLElement]|select",
            "dl^[HTMLElement]|!compact",
            "data^[HTMLElement]|value",
            "datalist^[HTMLElement]|",
            "details^[HTMLElement]|!open",
            "dialog^[HTMLElement]|!open,returnValue",
            "dir^[HTMLElement]|!compact",
            "div^[HTMLElement]|align",
            "embed^[HTMLElement]|align,height,name,src,type,width",
            "fieldset^[HTMLElement]|!disabled,name",
            "font^[HTMLElement]|color,face,size",
            "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target",
            "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src",
            "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows",
            "hr^[HTMLElement]|align,color,!noShade,size,width",
            "head^[HTMLElement]|",
            "h1,h2,h3,h4,h5,h6^[HTMLElement]|align",
            "html^[HTMLElement]|version",
            "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width",
            "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width",
            "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width",
            "li^[HTMLElement]|type,#value",
            "label^[HTMLElement]|htmlFor",
            "legend^[HTMLElement]|align",
            "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type",
            "map^[HTMLElement]|name",
            "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width",
            "menu^[HTMLElement]|!compact",
            "meta^[HTMLElement]|content,httpEquiv,media,name,scheme",
            "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value",
            "ins,del^[HTMLElement]|cite,dateTime",
            "ol^[HTMLElement]|!compact,!reversed,#start,type",
            "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width",
            "optgroup^[HTMLElement]|!disabled,label",
            "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value",
            "output^[HTMLElement]|defaultValue,%htmlFor,name,value",
            "p^[HTMLElement]|align",
            "param^[HTMLElement]|name,type,value,valueType",
            "picture^[HTMLElement]|",
            "pre^[HTMLElement]|#width",
            "progress^[HTMLElement]|#max,#value",
            "q,blockquote,cite^[HTMLElement]|",
            "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type",
            "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value",
            "slot^[HTMLElement]|name",
            "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width",
            "span^[HTMLElement]|",
            "style^[HTMLElement]|!disabled,media,type",
            "caption^[HTMLElement]|align",
            "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width",
            "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width",
            "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width",
            "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign",
            "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign",
            "template^[HTMLElement]|",
            "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap",
            "time^[HTMLElement]|dateTime",
            "title^[HTMLElement]|text",
            "track^[HTMLElement]|!default,kind,label,src,srclang",
            "ul^[HTMLElement]|!compact,type",
            "unknown^[HTMLElement]|",
            "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width",
            ":svg:a^:svg:graphics|",
            ":svg:animate^:svg:animation|",
            ":svg:animateMotion^:svg:animation|",
            ":svg:animateTransform^:svg:animation|",
            ":svg:circle^:svg:geometry|",
            ":svg:clipPath^:svg:graphics|",
            ":svg:defs^:svg:graphics|",
            ":svg:desc^:svg:|",
            ":svg:discard^:svg:|",
            ":svg:ellipse^:svg:geometry|",
            ":svg:feBlend^:svg:|",
            ":svg:feColorMatrix^:svg:|",
            ":svg:feComponentTransfer^:svg:|",
            ":svg:feComposite^:svg:|",
            ":svg:feConvolveMatrix^:svg:|",
            ":svg:feDiffuseLighting^:svg:|",
            ":svg:feDisplacementMap^:svg:|",
            ":svg:feDistantLight^:svg:|",
            ":svg:feDropShadow^:svg:|",
            ":svg:feFlood^:svg:|",
            ":svg:feFuncA^:svg:componentTransferFunction|",
            ":svg:feFuncB^:svg:componentTransferFunction|",
            ":svg:feFuncG^:svg:componentTransferFunction|",
            ":svg:feFuncR^:svg:componentTransferFunction|",
            ":svg:feGaussianBlur^:svg:|",
            ":svg:feImage^:svg:|",
            ":svg:feMerge^:svg:|",
            ":svg:feMergeNode^:svg:|",
            ":svg:feMorphology^:svg:|",
            ":svg:feOffset^:svg:|",
            ":svg:fePointLight^:svg:|",
            ":svg:feSpecularLighting^:svg:|",
            ":svg:feSpotLight^:svg:|",
            ":svg:feTile^:svg:|",
            ":svg:feTurbulence^:svg:|",
            ":svg:filter^:svg:|",
            ":svg:foreignObject^:svg:graphics|",
            ":svg:g^:svg:graphics|",
            ":svg:image^:svg:graphics|decoding",
            ":svg:line^:svg:geometry|",
            ":svg:linearGradient^:svg:gradient|",
            ":svg:mpath^:svg:|",
            ":svg:marker^:svg:|",
            ":svg:mask^:svg:|",
            ":svg:metadata^:svg:|",
            ":svg:path^:svg:geometry|",
            ":svg:pattern^:svg:|",
            ":svg:polygon^:svg:geometry|",
            ":svg:polyline^:svg:geometry|",
            ":svg:radialGradient^:svg:gradient|",
            ":svg:rect^:svg:geometry|",
            ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan",
            ":svg:script^:svg:|type",
            ":svg:set^:svg:animation|",
            ":svg:stop^:svg:|",
            ":svg:style^:svg:|!disabled,media,title,type",
            ":svg:switch^:svg:graphics|",
            ":svg:symbol^:svg:|",
            ":svg:tspan^:svg:textPositioning|",
            ":svg:text^:svg:textPositioning|",
            ":svg:textPath^:svg:textContent|",
            ":svg:title^:svg:|",
            ":svg:use^:svg:graphics|",
            ":svg:view^:svg:|#zoomAndPan",
            "data^[HTMLElement]|value",
            "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name",
            "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default",
            "summary^[HTMLElement]|",
            "time^[HTMLElement]|dateTime",
            ":svg:cursor^:svg:|",
          ],
          Cs = new Map(
            Object.entries({
              class: "className",
              for: "htmlFor",
              formaction: "formAction",
              innerHtml: "innerHTML",
              readonly: "readOnly",
              tabindex: "tabIndex",
            }),
          ),
          Pa = Array.from(Cs).reduce(
            (t8, [e, r]) => (t8.set(e, r), t8),
            new Map(),
          ),
          $t = class extends Rt {
            constructor() {
              super(),
                (this._schema = new Map()),
                (this._eventSchema = new Map()),
                Fa.forEach((e) => {
                  let r = new Map(),
                    n = new Set(),
                    [s, i] = e.split("|"),
                    a = i.split(","),
                    [o, u] = s.split("^");
                  o.split(",").forEach((l) => {
                    this._schema.set(l.toLowerCase(), r),
                      this._eventSchema.set(l.toLowerCase(), n);
                  });
                  let p = u && this._schema.get(u.toLowerCase());
                  if (p) {
                    for (let [l, m] of p) r.set(l, m);
                    for (let l of this._eventSchema.get(u.toLowerCase()))
                      n.add(l);
                  }
                  a.forEach((l) => {
                    if (l.length > 0)
                      switch (l[0]) {
                        case "*":
                          n.add(l.substring(1));
                          break;
                        case "!":
                          r.set(l.substring(1), "boolean");
                          break;
                        case "#":
                          r.set(l.substring(1), "number");
                          break;
                        case "%":
                          r.set(l.substring(1), "object");
                          break;
                        default:
                          r.set(l, "string");
                      }
                  });
                });
            }
            hasProperty(e, r, n) {
              if (n.some((i) => i.name === Dr_name)) return !0;
              if (e.indexOf("-") > -1) {
                if (vr(e) || yr(e)) return !1;
                if (n.some((i) => i.name === Ar_name)) return !0;
              }
              return (
                this._schema.get(e.toLowerCase()) || this._schema.get("unknown")
              ).has(r);
            }
            hasElement(e, r) {
              return (
                !!(
                  r.some((n) => n.name === Dr_name) ||
                  (e.indexOf("-") > -1 &&
                    (vr(e) || yr(e) || r.some((n) => n.name === Ar_name)))
                ) || this._schema.has(e.toLowerCase())
              );
            }
            securityContext(e, r, n) {
              n && (r = this.getMappedPropName(r)),
                (e = e.toLowerCase()),
                (r = r.toLowerCase());
              let s = wr()[e + "|" + r];
              return s || ((s = wr()["*|" + r]), s || X.NONE);
            }
            getMappedPropName(e) {
              return Cs.get(e) ?? e;
            }
            getDefaultComponentElementName() {
              return "ng-component";
            }
            validateProperty(e) {
              return e.toLowerCase().startsWith("on")
                ? {
                    error: !0,
                    msg: `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...\nIf '${e}' is a directive input, make sure the directive is imported by the current module.`,
                  }
                : { error: !1 };
            }
            validateAttribute(e) {
              return e.toLowerCase().startsWith("on")
                ? {
                    error: !0,
                    msg: `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...`,
                  }
                : { error: !1 };
            }
            allKnownElementNames() {
              return Array.from(this._schema.keys());
            }
            allKnownAttributesOfElement(e) {
              let r =
                this._schema.get(e.toLowerCase()) ||
                this._schema.get("unknown");
              return Array.from(r.keys()).map((n) => Pa.get(n) ?? n);
            }
            allKnownEventsOfElement(e) {
              return Array.from(this._eventSchema.get(e.toLowerCase()) ?? []);
            }
            normalizeAnimationStyleProperty(e) {
              return (function Nn(t8) {
                return t8.replace(ki, (...e) => e[1].toUpperCase());
              })(e);
            }
            normalizeAnimationStyleValue(e, r, n) {
              let s = "",
                i = n.toString().trim(),
                a = null;
              if (
                (function Na(t8) {
                  switch (t8) {
                    case "width":
                    case "height":
                    case "minWidth":
                    case "minHeight":
                    case "maxWidth":
                    case "maxHeight":
                    case "left":
                    case "top":
                    case "bottom":
                    case "right":
                    case "fontSize":
                    case "outlineWidth":
                    case "outlineOffset":
                    case "paddingTop":
                    case "paddingLeft":
                    case "paddingBottom":
                    case "paddingRight":
                    case "marginTop":
                    case "marginLeft":
                    case "marginBottom":
                    case "marginRight":
                    case "borderRadius":
                    case "borderWidth":
                    case "borderTopWidth":
                    case "borderLeftWidth":
                    case "borderRightWidth":
                    case "borderBottomWidth":
                    case "textIndent":
                      return !0;
                    default:
                      return !1;
                  }
                })(e) &&
                0 !== n &&
                "0" !== n
              )
                if ("number" == typeof n) s = "px";
                else {
                  let o = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                  o &&
                    0 == o[1].length &&
                    (a = `Please provide a CSS unit value for ${r}:${n}`);
                }
              return { error: a, value: i + s };
            }
          };
        var Ss,
          at,
          h = class {
            constructor({
              closedByChildren: e,
              implicitNamespacePrefix: r,
              contentType: n = F.PARSABLE_DATA,
              closedByParent: s = !1,
              isVoid: i = !1,
              ignoreFirstLf: a = !1,
              preventNamespaceInheritance: o = !1,
              canSelfClose: u = !1,
            } = {}) {
              (this.closedByChildren = {}),
                (this.closedByParent = !1),
                e &&
                  e.length > 0 &&
                  e.forEach((p) => (this.closedByChildren[p] = !0)),
                (this.isVoid = i),
                (this.closedByParent = s || i),
                (this.implicitNamespacePrefix = r || null),
                (this.contentType = n),
                (this.ignoreFirstLf = a),
                (this.preventNamespaceInheritance = o),
                (this.canSelfClose = u ?? i);
            }
            isClosedByChild(e) {
              return this.isVoid || e.toLowerCase() in this.closedByChildren;
            }
            getContentType(e) {
              return "object" == typeof this.contentType
                ? (void 0 === e ? void 0 : this.contentType[e]) ??
                    this.contentType.default
                : this.contentType;
            }
          };
        function He(t8) {
          return (
            at ||
              ((Ss = new h({ canSelfClose: !0 })),
              (at = Object.assign(Object.create(null), {
                base: new h({ isVoid: !0 }),
                meta: new h({ isVoid: !0 }),
                area: new h({ isVoid: !0 }),
                embed: new h({ isVoid: !0 }),
                link: new h({ isVoid: !0 }),
                img: new h({ isVoid: !0 }),
                input: new h({ isVoid: !0 }),
                param: new h({ isVoid: !0 }),
                hr: new h({ isVoid: !0 }),
                br: new h({ isVoid: !0 }),
                source: new h({ isVoid: !0 }),
                track: new h({ isVoid: !0 }),
                wbr: new h({ isVoid: !0 }),
                p: new h({
                  closedByChildren: [
                    "address",
                    "article",
                    "aside",
                    "blockquote",
                    "div",
                    "dl",
                    "fieldset",
                    "footer",
                    "form",
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "header",
                    "hgroup",
                    "hr",
                    "main",
                    "nav",
                    "ol",
                    "p",
                    "pre",
                    "section",
                    "table",
                    "ul",
                  ],
                  closedByParent: !0,
                }),
                thead: new h({ closedByChildren: ["tbody", "tfoot"] }),
                tbody: new h({
                  closedByChildren: ["tbody", "tfoot"],
                  closedByParent: !0,
                }),
                tfoot: new h({
                  closedByChildren: ["tbody"],
                  closedByParent: !0,
                }),
                tr: new h({ closedByChildren: ["tr"], closedByParent: !0 }),
                td: new h({
                  closedByChildren: ["td", "th"],
                  closedByParent: !0,
                }),
                th: new h({
                  closedByChildren: ["td", "th"],
                  closedByParent: !0,
                }),
                col: new h({ isVoid: !0 }),
                svg: new h({ implicitNamespacePrefix: "svg" }),
                foreignObject: new h({
                  implicitNamespacePrefix: "svg",
                  preventNamespaceInheritance: !0,
                }),
                math: new h({ implicitNamespacePrefix: "math" }),
                li: new h({ closedByChildren: ["li"], closedByParent: !0 }),
                dt: new h({ closedByChildren: ["dt", "dd"] }),
                dd: new h({
                  closedByChildren: ["dt", "dd"],
                  closedByParent: !0,
                }),
                rb: new h({
                  closedByChildren: ["rb", "rt", "rtc", "rp"],
                  closedByParent: !0,
                }),
                rt: new h({
                  closedByChildren: ["rb", "rt", "rtc", "rp"],
                  closedByParent: !0,
                }),
                rtc: new h({
                  closedByChildren: ["rb", "rtc", "rp"],
                  closedByParent: !0,
                }),
                rp: new h({
                  closedByChildren: ["rb", "rt", "rtc", "rp"],
                  closedByParent: !0,
                }),
                optgroup: new h({
                  closedByChildren: ["optgroup"],
                  closedByParent: !0,
                }),
                option: new h({
                  closedByChildren: ["option", "optgroup"],
                  closedByParent: !0,
                }),
                pre: new h({ ignoreFirstLf: !0 }),
                listing: new h({ ignoreFirstLf: !0 }),
                style: new h({ contentType: F.RAW_TEXT }),
                script: new h({ contentType: F.RAW_TEXT }),
                title: new h({
                  contentType: {
                    default: F.ESCAPABLE_RAW_TEXT,
                    svg: F.PARSABLE_DATA,
                  },
                }),
                textarea: new h({
                  contentType: F.ESCAPABLE_RAW_TEXT,
                  ignoreFirstLf: !0,
                }),
              })),
              new $t().allKnownElementNames().forEach((e) => {
                !at[e] &&
                  null === Me(e) &&
                  (at[e] = new h({ canSelfClose: !1 }));
              })),
            at[t8] ?? Ss
          );
        }
        var ve = class {
            constructor(e, r) {
              (this.sourceSpan = e), (this.i18n = r);
            }
          },
          Ot = class extends ve {
            constructor(e, r, n, s) {
              super(r, s),
                (this.value = e),
                (this.tokens = n),
                (this.type = "text");
            }
            visit(e, r) {
              return e.visitText(this, r);
            }
          },
          Mt = class extends ve {
            constructor(e, r, n, s) {
              super(r, s),
                (this.value = e),
                (this.tokens = n),
                (this.type = "cdata");
            }
            visit(e, r) {
              return e.visitCdata(this, r);
            }
          },
          qt = class extends ve {
            constructor(e, r, n, s, i, a) {
              super(s, a),
                (this.switchValue = e),
                (this.type = r),
                (this.cases = n),
                (this.switchValueSourceSpan = i);
            }
            visit(e, r) {
              return e.visitExpansion(this, r);
            }
          },
          Ht = class {
            constructor(e, r, n, s, i) {
              (this.value = e),
                (this.expression = r),
                (this.sourceSpan = n),
                (this.valueSourceSpan = s),
                (this.expSourceSpan = i);
            }
            visit(e, r) {
              return e.visitExpansionCase(this, r);
            }
          },
          Vt = class extends ve {
            constructor(e, r, n, s, i, a, o) {
              super(n, o),
                (this.name = e),
                (this.value = r),
                (this.keySpan = s),
                (this.valueSpan = i),
                (this.valueTokens = a),
                (this.type = "attribute");
            }
            visit(e, r) {
              return e.visitAttribute(this, r);
            }
            get nameSpan() {
              return this.keySpan;
            }
          },
          z = class extends ve {
            constructor(e, r, n, s, i, a = null, o = null, u) {
              super(s, u),
                (this.name = e),
                (this.attrs = r),
                (this.children = n),
                (this.startSourceSpan = i),
                (this.endSourceSpan = a),
                (this.nameSpan = o),
                (this.type = "element");
            }
            visit(e, r) {
              return e.visitElement(this, r);
            }
          },
          Ut = class {
            constructor(e, r) {
              (this.value = e), (this.sourceSpan = r), (this.type = "comment");
            }
            visit(e, r) {
              return e.visitComment(this, r);
            }
          },
          Wt = class {
            constructor(e, r) {
              (this.value = e), (this.sourceSpan = r), (this.type = "docType");
            }
            visit(e, r) {
              return e.visitDocType(this, r);
            }
          },
          J = class {
            constructor(e, r, n, s, i, a = null) {
              (this.name = e),
                (this.parameters = r),
                (this.children = n),
                (this.sourceSpan = s),
                (this.startSourceSpan = i),
                (this.endSourceSpan = a),
                (this.type = "block");
            }
            visit(e, r) {
              return e.visitBlock(this, r);
            }
          },
          ot = class {
            constructor(e, r) {
              (this.expression = e),
                (this.sourceSpan = r),
                (this.type = "blockParameter"),
                (this.startSourceSpan = null),
                (this.endSourceSpan = null);
            }
            visit(e, r) {
              return e.visitBlockParameter(this, r);
            }
          };
        function zt(t8, e, r = null) {
          let n = [],
            s = t8.visit
              ? (i) => t8.visit(i, r) || i.visit(t8, r)
              : (i) => i.visit(t8, r);
          return (
            e.forEach((i) => {
              let a = s(i);
              a && n.push(a);
            }),
            n
          );
        }
        var ut = class {
            constructor() {}
            visitElement(e, r) {
              this.visitChildren(r, (n) => {
                n(e.attrs), n(e.children);
              });
            }
            visitAttribute(e, r) {}
            visitText(e, r) {}
            visitCdata(e, r) {}
            visitComment(e, r) {}
            visitDocType(e, r) {}
            visitExpansion(e, r) {
              return this.visitChildren(r, (n) => {
                n(e.cases);
              });
            }
            visitExpansionCase(e, r) {}
            visitBlock(e, r) {
              this.visitChildren(r, (n) => {
                n(e.parameters), n(e.children);
              });
            }
            visitBlockParameter(e, r) {}
            visitChildren(e, r) {
              let n = [],
                s = this;
              return (
                r(function i(a) {
                  a && n.push(zt(s, a, e));
                }),
                Array.prototype.concat.apply([], n)
              );
            }
          },
          Ve = {
            AElig: "Æ",
            AMP: "&",
            amp: "&",
            Aacute: "Á",
            Abreve: "Ă",
            Acirc: "Â",
            Acy: "А",
            Afr: "𝔄",
            Agrave: "À",
            Alpha: "Α",
            Amacr: "Ā",
            And: "⩓",
            Aogon: "Ą",
            Aopf: "𝔸",
            ApplyFunction: "⁡",
            af: "⁡",
            Aring: "Å",
            angst: "Å",
            Ascr: "𝒜",
            Assign: "≔",
            colone: "≔",
            coloneq: "≔",
            Atilde: "Ã",
            Auml: "Ä",
            Backslash: "∖",
            setminus: "∖",
            setmn: "∖",
            smallsetminus: "∖",
            ssetmn: "∖",
            Barv: "⫧",
            Barwed: "⌆",
            doublebarwedge: "⌆",
            Bcy: "Б",
            Because: "∵",
            becaus: "∵",
            because: "∵",
            Bernoullis: "ℬ",
            Bscr: "ℬ",
            bernou: "ℬ",
            Beta: "Β",
            Bfr: "𝔅",
            Bopf: "𝔹",
            Breve: "˘",
            breve: "˘",
            Bumpeq: "≎",
            HumpDownHump: "≎",
            bump: "≎",
            CHcy: "Ч",
            COPY: "©",
            copy: "©",
            Cacute: "Ć",
            Cap: "⋒",
            CapitalDifferentialD: "ⅅ",
            DD: "ⅅ",
            Cayleys: "ℭ",
            Cfr: "ℭ",
            Ccaron: "Č",
            Ccedil: "Ç",
            Ccirc: "Ĉ",
            Cconint: "∰",
            Cdot: "Ċ",
            Cedilla: "¸",
            cedil: "¸",
            CenterDot: "·",
            centerdot: "·",
            middot: "·",
            Chi: "Χ",
            CircleDot: "⊙",
            odot: "⊙",
            CircleMinus: "⊖",
            ominus: "⊖",
            CirclePlus: "⊕",
            oplus: "⊕",
            CircleTimes: "⊗",
            otimes: "⊗",
            ClockwiseContourIntegral: "∲",
            cwconint: "∲",
            CloseCurlyDoubleQuote: "”",
            rdquo: "”",
            rdquor: "”",
            CloseCurlyQuote: "’",
            rsquo: "’",
            rsquor: "’",
            Colon: "∷",
            Proportion: "∷",
            Colone: "⩴",
            Congruent: "≡",
            equiv: "≡",
            Conint: "∯",
            DoubleContourIntegral: "∯",
            ContourIntegral: "∮",
            conint: "∮",
            oint: "∮",
            Copf: "ℂ",
            complexes: "ℂ",
            Coproduct: "∐",
            coprod: "∐",
            CounterClockwiseContourIntegral: "∳",
            awconint: "∳",
            Cross: "⨯",
            Cscr: "𝒞",
            Cup: "⋓",
            CupCap: "≍",
            asympeq: "≍",
            DDotrahd: "⤑",
            DJcy: "Ђ",
            DScy: "Ѕ",
            DZcy: "Џ",
            Dagger: "‡",
            ddagger: "‡",
            Darr: "↡",
            Dashv: "⫤",
            DoubleLeftTee: "⫤",
            Dcaron: "Ď",
            Dcy: "Д",
            Del: "∇",
            nabla: "∇",
            Delta: "Δ",
            Dfr: "𝔇",
            DiacriticalAcute: "´",
            acute: "´",
            DiacriticalDot: "˙",
            dot: "˙",
            DiacriticalDoubleAcute: "˝",
            dblac: "˝",
            DiacriticalGrave: "`",
            grave: "`",
            DiacriticalTilde: "˜",
            tilde: "˜",
            Diamond: "⋄",
            diam: "⋄",
            diamond: "⋄",
            DifferentialD: "ⅆ",
            dd: "ⅆ",
            Dopf: "𝔻",
            Dot: "¨",
            DoubleDot: "¨",
            die: "¨",
            uml: "¨",
            DotDot: "⃜",
            DotEqual: "≐",
            doteq: "≐",
            esdot: "≐",
            DoubleDownArrow: "⇓",
            Downarrow: "⇓",
            dArr: "⇓",
            DoubleLeftArrow: "⇐",
            Leftarrow: "⇐",
            lArr: "⇐",
            DoubleLeftRightArrow: "⇔",
            Leftrightarrow: "⇔",
            hArr: "⇔",
            iff: "⇔",
            DoubleLongLeftArrow: "⟸",
            Longleftarrow: "⟸",
            xlArr: "⟸",
            DoubleLongLeftRightArrow: "⟺",
            Longleftrightarrow: "⟺",
            xhArr: "⟺",
            DoubleLongRightArrow: "⟹",
            Longrightarrow: "⟹",
            xrArr: "⟹",
            DoubleRightArrow: "⇒",
            Implies: "⇒",
            Rightarrow: "⇒",
            rArr: "⇒",
            DoubleRightTee: "⊨",
            vDash: "⊨",
            DoubleUpArrow: "⇑",
            Uparrow: "⇑",
            uArr: "⇑",
            DoubleUpDownArrow: "⇕",
            Updownarrow: "⇕",
            vArr: "⇕",
            DoubleVerticalBar: "∥",
            par: "∥",
            parallel: "∥",
            shortparallel: "∥",
            spar: "∥",
            DownArrow: "↓",
            ShortDownArrow: "↓",
            darr: "↓",
            downarrow: "↓",
            DownArrowBar: "⤓",
            DownArrowUpArrow: "⇵",
            duarr: "⇵",
            DownBreve: "̑",
            DownLeftRightVector: "⥐",
            DownLeftTeeVector: "⥞",
            DownLeftVector: "↽",
            leftharpoondown: "↽",
            lhard: "↽",
            DownLeftVectorBar: "⥖",
            DownRightTeeVector: "⥟",
            DownRightVector: "⇁",
            rhard: "⇁",
            rightharpoondown: "⇁",
            DownRightVectorBar: "⥗",
            DownTee: "⊤",
            top: "⊤",
            DownTeeArrow: "↧",
            mapstodown: "↧",
            Dscr: "𝒟",
            Dstrok: "Đ",
            ENG: "Ŋ",
            ETH: "Ð",
            Eacute: "É",
            Ecaron: "Ě",
            Ecirc: "Ê",
            Ecy: "Э",
            Edot: "Ė",
            Efr: "𝔈",
            Egrave: "È",
            Element: "∈",
            in: "∈",
            isin: "∈",
            isinv: "∈",
            Emacr: "Ē",
            EmptySmallSquare: "◻",
            EmptyVerySmallSquare: "▫",
            Eogon: "Ę",
            Eopf: "𝔼",
            Epsilon: "Ε",
            Equal: "⩵",
            EqualTilde: "≂",
            eqsim: "≂",
            esim: "≂",
            Equilibrium: "⇌",
            rightleftharpoons: "⇌",
            rlhar: "⇌",
            Escr: "ℰ",
            expectation: "ℰ",
            Esim: "⩳",
            Eta: "Η",
            Euml: "Ë",
            Exists: "∃",
            exist: "∃",
            ExponentialE: "ⅇ",
            ee: "ⅇ",
            exponentiale: "ⅇ",
            Fcy: "Ф",
            Ffr: "𝔉",
            FilledSmallSquare: "◼",
            FilledVerySmallSquare: "▪",
            blacksquare: "▪",
            squarf: "▪",
            squf: "▪",
            Fopf: "𝔽",
            ForAll: "∀",
            forall: "∀",
            Fouriertrf: "ℱ",
            Fscr: "ℱ",
            GJcy: "Ѓ",
            GT: ">",
            gt: ">",
            Gamma: "Γ",
            Gammad: "Ϝ",
            Gbreve: "Ğ",
            Gcedil: "Ģ",
            Gcirc: "Ĝ",
            Gcy: "Г",
            Gdot: "Ġ",
            Gfr: "𝔊",
            Gg: "⋙",
            ggg: "⋙",
            Gopf: "𝔾",
            GreaterEqual: "≥",
            ge: "≥",
            geq: "≥",
            GreaterEqualLess: "⋛",
            gel: "⋛",
            gtreqless: "⋛",
            GreaterFullEqual: "≧",
            gE: "≧",
            geqq: "≧",
            GreaterGreater: "⪢",
            GreaterLess: "≷",
            gl: "≷",
            gtrless: "≷",
            GreaterSlantEqual: "⩾",
            geqslant: "⩾",
            ges: "⩾",
            GreaterTilde: "≳",
            gsim: "≳",
            gtrsim: "≳",
            Gscr: "𝒢",
            Gt: "≫",
            NestedGreaterGreater: "≫",
            gg: "≫",
            HARDcy: "Ъ",
            Hacek: "ˇ",
            caron: "ˇ",
            Hat: "^",
            Hcirc: "Ĥ",
            Hfr: "ℌ",
            Poincareplane: "ℌ",
            HilbertSpace: "ℋ",
            Hscr: "ℋ",
            hamilt: "ℋ",
            Hopf: "ℍ",
            quaternions: "ℍ",
            HorizontalLine: "─",
            boxh: "─",
            Hstrok: "Ħ",
            HumpEqual: "≏",
            bumpe: "≏",
            bumpeq: "≏",
            IEcy: "Е",
            IJlig: "Ĳ",
            IOcy: "Ё",
            Iacute: "Í",
            Icirc: "Î",
            Icy: "И",
            Idot: "İ",
            Ifr: "ℑ",
            Im: "ℑ",
            image: "ℑ",
            imagpart: "ℑ",
            Igrave: "Ì",
            Imacr: "Ī",
            ImaginaryI: "ⅈ",
            ii: "ⅈ",
            Int: "∬",
            Integral: "∫",
            int: "∫",
            Intersection: "⋂",
            bigcap: "⋂",
            xcap: "⋂",
            InvisibleComma: "⁣",
            ic: "⁣",
            InvisibleTimes: "⁢",
            it: "⁢",
            Iogon: "Į",
            Iopf: "𝕀",
            Iota: "Ι",
            Iscr: "ℐ",
            imagline: "ℐ",
            Itilde: "Ĩ",
            Iukcy: "І",
            Iuml: "Ï",
            Jcirc: "Ĵ",
            Jcy: "Й",
            Jfr: "𝔍",
            Jopf: "𝕁",
            Jscr: "𝒥",
            Jsercy: "Ј",
            Jukcy: "Є",
            KHcy: "Х",
            KJcy: "Ќ",
            Kappa: "Κ",
            Kcedil: "Ķ",
            Kcy: "К",
            Kfr: "𝔎",
            Kopf: "𝕂",
            Kscr: "𝒦",
            LJcy: "Љ",
            LT: "<",
            lt: "<",
            Lacute: "Ĺ",
            Lambda: "Λ",
            Lang: "⟪",
            Laplacetrf: "ℒ",
            Lscr: "ℒ",
            lagran: "ℒ",
            Larr: "↞",
            twoheadleftarrow: "↞",
            Lcaron: "Ľ",
            Lcedil: "Ļ",
            Lcy: "Л",
            LeftAngleBracket: "⟨",
            lang: "⟨",
            langle: "⟨",
            LeftArrow: "←",
            ShortLeftArrow: "←",
            larr: "←",
            leftarrow: "←",
            slarr: "←",
            LeftArrowBar: "⇤",
            larrb: "⇤",
            LeftArrowRightArrow: "⇆",
            leftrightarrows: "⇆",
            lrarr: "⇆",
            LeftCeiling: "⌈",
            lceil: "⌈",
            LeftDoubleBracket: "⟦",
            lobrk: "⟦",
            LeftDownTeeVector: "⥡",
            LeftDownVector: "⇃",
            dharl: "⇃",
            downharpoonleft: "⇃",
            LeftDownVectorBar: "⥙",
            LeftFloor: "⌊",
            lfloor: "⌊",
            LeftRightArrow: "↔",
            harr: "↔",
            leftrightarrow: "↔",
            LeftRightVector: "⥎",
            LeftTee: "⊣",
            dashv: "⊣",
            LeftTeeArrow: "↤",
            mapstoleft: "↤",
            LeftTeeVector: "⥚",
            LeftTriangle: "⊲",
            vartriangleleft: "⊲",
            vltri: "⊲",
            LeftTriangleBar: "⧏",
            LeftTriangleEqual: "⊴",
            ltrie: "⊴",
            trianglelefteq: "⊴",
            LeftUpDownVector: "⥑",
            LeftUpTeeVector: "⥠",
            LeftUpVector: "↿",
            uharl: "↿",
            upharpoonleft: "↿",
            LeftUpVectorBar: "⥘",
            LeftVector: "↼",
            leftharpoonup: "↼",
            lharu: "↼",
            LeftVectorBar: "⥒",
            LessEqualGreater: "⋚",
            leg: "⋚",
            lesseqgtr: "⋚",
            LessFullEqual: "≦",
            lE: "≦",
            leqq: "≦",
            LessGreater: "≶",
            lessgtr: "≶",
            lg: "≶",
            LessLess: "⪡",
            LessSlantEqual: "⩽",
            leqslant: "⩽",
            les: "⩽",
            LessTilde: "≲",
            lesssim: "≲",
            lsim: "≲",
            Lfr: "𝔏",
            Ll: "⋘",
            Lleftarrow: "⇚",
            lAarr: "⇚",
            Lmidot: "Ŀ",
            LongLeftArrow: "⟵",
            longleftarrow: "⟵",
            xlarr: "⟵",
            LongLeftRightArrow: "⟷",
            longleftrightarrow: "⟷",
            xharr: "⟷",
            LongRightArrow: "⟶",
            longrightarrow: "⟶",
            xrarr: "⟶",
            Lopf: "𝕃",
            LowerLeftArrow: "↙",
            swarr: "↙",
            swarrow: "↙",
            LowerRightArrow: "↘",
            searr: "↘",
            searrow: "↘",
            Lsh: "↰",
            lsh: "↰",
            Lstrok: "Ł",
            Lt: "≪",
            NestedLessLess: "≪",
            ll: "≪",
            Map: "⤅",
            Mcy: "М",
            MediumSpace: " ",
            Mellintrf: "ℳ",
            Mscr: "ℳ",
            phmmat: "ℳ",
            Mfr: "𝔐",
            MinusPlus: "∓",
            mnplus: "∓",
            mp: "∓",
            Mopf: "𝕄",
            Mu: "Μ",
            NJcy: "Њ",
            Nacute: "Ń",
            Ncaron: "Ň",
            Ncedil: "Ņ",
            Ncy: "Н",
            NegativeMediumSpace: "​",
            NegativeThickSpace: "​",
            NegativeThinSpace: "​",
            NegativeVeryThinSpace: "​",
            ZeroWidthSpace: "​",
            NewLine: "\n",
            Nfr: "𝔑",
            NoBreak: "⁠",
            NonBreakingSpace: " ",
            nbsp: " ",
            Nopf: "ℕ",
            naturals: "ℕ",
            Not: "⫬",
            NotCongruent: "≢",
            nequiv: "≢",
            NotCupCap: "≭",
            NotDoubleVerticalBar: "∦",
            npar: "∦",
            nparallel: "∦",
            nshortparallel: "∦",
            nspar: "∦",
            NotElement: "∉",
            notin: "∉",
            notinva: "∉",
            NotEqual: "≠",
            ne: "≠",
            NotEqualTilde: "≂̸",
            nesim: "≂̸",
            NotExists: "∄",
            nexist: "∄",
            nexists: "∄",
            NotGreater: "≯",
            ngt: "≯",
            ngtr: "≯",
            NotGreaterEqual: "≱",
            nge: "≱",
            ngeq: "≱",
            NotGreaterFullEqual: "≧̸",
            ngE: "≧̸",
            ngeqq: "≧̸",
            NotGreaterGreater: "≫̸",
            nGtv: "≫̸",
            NotGreaterLess: "≹",
            ntgl: "≹",
            NotGreaterSlantEqual: "⩾̸",
            ngeqslant: "⩾̸",
            nges: "⩾̸",
            NotGreaterTilde: "≵",
            ngsim: "≵",
            NotHumpDownHump: "≎̸",
            nbump: "≎̸",
            NotHumpEqual: "≏̸",
            nbumpe: "≏̸",
            NotLeftTriangle: "⋪",
            nltri: "⋪",
            ntriangleleft: "⋪",
            NotLeftTriangleBar: "⧏̸",
            NotLeftTriangleEqual: "⋬",
            nltrie: "⋬",
            ntrianglelefteq: "⋬",
            NotLess: "≮",
            nless: "≮",
            nlt: "≮",
            NotLessEqual: "≰",
            nle: "≰",
            nleq: "≰",
            NotLessGreater: "≸",
            ntlg: "≸",
            NotLessLess: "≪̸",
            nLtv: "≪̸",
            NotLessSlantEqual: "⩽̸",
            nleqslant: "⩽̸",
            nles: "⩽̸",
            NotLessTilde: "≴",
            nlsim: "≴",
            NotNestedGreaterGreater: "⪢̸",
            NotNestedLessLess: "⪡̸",
            NotPrecedes: "⊀",
            npr: "⊀",
            nprec: "⊀",
            NotPrecedesEqual: "⪯̸",
            npre: "⪯̸",
            npreceq: "⪯̸",
            NotPrecedesSlantEqual: "⋠",
            nprcue: "⋠",
            NotReverseElement: "∌",
            notni: "∌",
            notniva: "∌",
            NotRightTriangle: "⋫",
            nrtri: "⋫",
            ntriangleright: "⋫",
            NotRightTriangleBar: "⧐̸",
            NotRightTriangleEqual: "⋭",
            nrtrie: "⋭",
            ntrianglerighteq: "⋭",
            NotSquareSubset: "⊏̸",
            NotSquareSubsetEqual: "⋢",
            nsqsube: "⋢",
            NotSquareSuperset: "⊐̸",
            NotSquareSupersetEqual: "⋣",
            nsqsupe: "⋣",
            NotSubset: "⊂⃒",
            nsubset: "⊂⃒",
            vnsub: "⊂⃒",
            NotSubsetEqual: "⊈",
            nsube: "⊈",
            nsubseteq: "⊈",
            NotSucceeds: "⊁",
            nsc: "⊁",
            nsucc: "⊁",
            NotSucceedsEqual: "⪰̸",
            nsce: "⪰̸",
            nsucceq: "⪰̸",
            NotSucceedsSlantEqual: "⋡",
            nsccue: "⋡",
            NotSucceedsTilde: "≿̸",
            NotSuperset: "⊃⃒",
            nsupset: "⊃⃒",
            vnsup: "⊃⃒",
            NotSupersetEqual: "⊉",
            nsupe: "⊉",
            nsupseteq: "⊉",
            NotTilde: "≁",
            nsim: "≁",
            NotTildeEqual: "≄",
            nsime: "≄",
            nsimeq: "≄",
            NotTildeFullEqual: "≇",
            ncong: "≇",
            NotTildeTilde: "≉",
            nap: "≉",
            napprox: "≉",
            NotVerticalBar: "∤",
            nmid: "∤",
            nshortmid: "∤",
            nsmid: "∤",
            Nscr: "𝒩",
            Ntilde: "Ñ",
            Nu: "Ν",
            OElig: "Œ",
            Oacute: "Ó",
            Ocirc: "Ô",
            Ocy: "О",
            Odblac: "Ő",
            Ofr: "𝔒",
            Ograve: "Ò",
            Omacr: "Ō",
            Omega: "Ω",
            ohm: "Ω",
            Omicron: "Ο",
            Oopf: "𝕆",
            OpenCurlyDoubleQuote: "“",
            ldquo: "“",
            OpenCurlyQuote: "‘",
            lsquo: "‘",
            Or: "⩔",
            Oscr: "𝒪",
            Oslash: "Ø",
            Otilde: "Õ",
            Otimes: "⨷",
            Ouml: "Ö",
            OverBar: "‾",
            oline: "‾",
            OverBrace: "⏞",
            OverBracket: "⎴",
            tbrk: "⎴",
            OverParenthesis: "⏜",
            PartialD: "∂",
            part: "∂",
            Pcy: "П",
            Pfr: "𝔓",
            Phi: "Φ",
            Pi: "Π",
            PlusMinus: "±",
            plusmn: "±",
            pm: "±",
            Popf: "ℙ",
            primes: "ℙ",
            Pr: "⪻",
            Precedes: "≺",
            pr: "≺",
            prec: "≺",
            PrecedesEqual: "⪯",
            pre: "⪯",
            preceq: "⪯",
            PrecedesSlantEqual: "≼",
            prcue: "≼",
            preccurlyeq: "≼",
            PrecedesTilde: "≾",
            precsim: "≾",
            prsim: "≾",
            Prime: "″",
            Product: "∏",
            prod: "∏",
            Proportional: "∝",
            prop: "∝",
            propto: "∝",
            varpropto: "∝",
            vprop: "∝",
            Pscr: "𝒫",
            Psi: "Ψ",
            QUOT: '"',
            quot: '"',
            Qfr: "𝔔",
            Qopf: "ℚ",
            rationals: "ℚ",
            Qscr: "𝒬",
            RBarr: "⤐",
            drbkarow: "⤐",
            REG: "®",
            circledR: "®",
            reg: "®",
            Racute: "Ŕ",
            Rang: "⟫",
            Rarr: "↠",
            twoheadrightarrow: "↠",
            Rarrtl: "⤖",
            Rcaron: "Ř",
            Rcedil: "Ŗ",
            Rcy: "Р",
            Re: "ℜ",
            Rfr: "ℜ",
            real: "ℜ",
            realpart: "ℜ",
            ReverseElement: "∋",
            SuchThat: "∋",
            ni: "∋",
            niv: "∋",
            ReverseEquilibrium: "⇋",
            leftrightharpoons: "⇋",
            lrhar: "⇋",
            ReverseUpEquilibrium: "⥯",
            duhar: "⥯",
            Rho: "Ρ",
            RightAngleBracket: "⟩",
            rang: "⟩",
            rangle: "⟩",
            RightArrow: "→",
            ShortRightArrow: "→",
            rarr: "→",
            rightarrow: "→",
            srarr: "→",
            RightArrowBar: "⇥",
            rarrb: "⇥",
            RightArrowLeftArrow: "⇄",
            rightleftarrows: "⇄",
            rlarr: "⇄",
            RightCeiling: "⌉",
            rceil: "⌉",
            RightDoubleBracket: "⟧",
            robrk: "⟧",
            RightDownTeeVector: "⥝",
            RightDownVector: "⇂",
            dharr: "⇂",
            downharpoonright: "⇂",
            RightDownVectorBar: "⥕",
            RightFloor: "⌋",
            rfloor: "⌋",
            RightTee: "⊢",
            vdash: "⊢",
            RightTeeArrow: "↦",
            map: "↦",
            mapsto: "↦",
            RightTeeVector: "⥛",
            RightTriangle: "⊳",
            vartriangleright: "⊳",
            vrtri: "⊳",
            RightTriangleBar: "⧐",
            RightTriangleEqual: "⊵",
            rtrie: "⊵",
            trianglerighteq: "⊵",
            RightUpDownVector: "⥏",
            RightUpTeeVector: "⥜",
            RightUpVector: "↾",
            uharr: "↾",
            upharpoonright: "↾",
            RightUpVectorBar: "⥔",
            RightVector: "⇀",
            rharu: "⇀",
            rightharpoonup: "⇀",
            RightVectorBar: "⥓",
            Ropf: "ℝ",
            reals: "ℝ",
            RoundImplies: "⥰",
            Rrightarrow: "⇛",
            rAarr: "⇛",
            Rscr: "ℛ",
            realine: "ℛ",
            Rsh: "↱",
            rsh: "↱",
            RuleDelayed: "⧴",
            SHCHcy: "Щ",
            SHcy: "Ш",
            SOFTcy: "Ь",
            Sacute: "Ś",
            Sc: "⪼",
            Scaron: "Š",
            Scedil: "Ş",
            Scirc: "Ŝ",
            Scy: "С",
            Sfr: "𝔖",
            ShortUpArrow: "↑",
            UpArrow: "↑",
            uarr: "↑",
            uparrow: "↑",
            Sigma: "Σ",
            SmallCircle: "∘",
            compfn: "∘",
            Sopf: "𝕊",
            Sqrt: "√",
            radic: "√",
            Square: "□",
            squ: "□",
            square: "□",
            SquareIntersection: "⊓",
            sqcap: "⊓",
            SquareSubset: "⊏",
            sqsub: "⊏",
            sqsubset: "⊏",
            SquareSubsetEqual: "⊑",
            sqsube: "⊑",
            sqsubseteq: "⊑",
            SquareSuperset: "⊐",
            sqsup: "⊐",
            sqsupset: "⊐",
            SquareSupersetEqual: "⊒",
            sqsupe: "⊒",
            sqsupseteq: "⊒",
            SquareUnion: "⊔",
            sqcup: "⊔",
            Sscr: "𝒮",
            Star: "⋆",
            sstarf: "⋆",
            Sub: "⋐",
            Subset: "⋐",
            SubsetEqual: "⊆",
            sube: "⊆",
            subseteq: "⊆",
            Succeeds: "≻",
            sc: "≻",
            succ: "≻",
            SucceedsEqual: "⪰",
            sce: "⪰",
            succeq: "⪰",
            SucceedsSlantEqual: "≽",
            sccue: "≽",
            succcurlyeq: "≽",
            SucceedsTilde: "≿",
            scsim: "≿",
            succsim: "≿",
            Sum: "∑",
            sum: "∑",
            Sup: "⋑",
            Supset: "⋑",
            Superset: "⊃",
            sup: "⊃",
            supset: "⊃",
            SupersetEqual: "⊇",
            supe: "⊇",
            supseteq: "⊇",
            THORN: "Þ",
            TRADE: "™",
            trade: "™",
            TSHcy: "Ћ",
            TScy: "Ц",
            Tab: "\t",
            Tau: "Τ",
            Tcaron: "Ť",
            Tcedil: "Ţ",
            Tcy: "Т",
            Tfr: "𝔗",
            Therefore: "∴",
            there4: "∴",
            therefore: "∴",
            Theta: "Θ",
            ThickSpace: "  ",
            ThinSpace: " ",
            thinsp: " ",
            Tilde: "∼",
            sim: "∼",
            thicksim: "∼",
            thksim: "∼",
            TildeEqual: "≃",
            sime: "≃",
            simeq: "≃",
            TildeFullEqual: "≅",
            cong: "≅",
            TildeTilde: "≈",
            ap: "≈",
            approx: "≈",
            asymp: "≈",
            thickapprox: "≈",
            thkap: "≈",
            Topf: "𝕋",
            TripleDot: "⃛",
            tdot: "⃛",
            Tscr: "𝒯",
            Tstrok: "Ŧ",
            Uacute: "Ú",
            Uarr: "↟",
            Uarrocir: "⥉",
            Ubrcy: "Ў",
            Ubreve: "Ŭ",
            Ucirc: "Û",
            Ucy: "У",
            Udblac: "Ű",
            Ufr: "𝔘",
            Ugrave: "Ù",
            Umacr: "Ū",
            UnderBar: "_",
            lowbar: "_",
            UnderBrace: "⏟",
            UnderBracket: "⎵",
            bbrk: "⎵",
            UnderParenthesis: "⏝",
            Union: "⋃",
            bigcup: "⋃",
            xcup: "⋃",
            UnionPlus: "⊎",
            uplus: "⊎",
            Uogon: "Ų",
            Uopf: "𝕌",
            UpArrowBar: "⤒",
            UpArrowDownArrow: "⇅",
            udarr: "⇅",
            UpDownArrow: "↕",
            updownarrow: "↕",
            varr: "↕",
            UpEquilibrium: "⥮",
            udhar: "⥮",
            UpTee: "⊥",
            bot: "⊥",
            bottom: "⊥",
            perp: "⊥",
            UpTeeArrow: "↥",
            mapstoup: "↥",
            UpperLeftArrow: "↖",
            nwarr: "↖",
            nwarrow: "↖",
            UpperRightArrow: "↗",
            nearr: "↗",
            nearrow: "↗",
            Upsi: "ϒ",
            upsih: "ϒ",
            Upsilon: "Υ",
            Uring: "Ů",
            Uscr: "𝒰",
            Utilde: "Ũ",
            Uuml: "Ü",
            VDash: "⊫",
            Vbar: "⫫",
            Vcy: "В",
            Vdash: "⊩",
            Vdashl: "⫦",
            Vee: "⋁",
            bigvee: "⋁",
            xvee: "⋁",
            Verbar: "‖",
            Vert: "‖",
            VerticalBar: "∣",
            mid: "∣",
            shortmid: "∣",
            smid: "∣",
            VerticalLine: "|",
            verbar: "|",
            vert: "|",
            VerticalSeparator: "❘",
            VerticalTilde: "≀",
            wr: "≀",
            wreath: "≀",
            VeryThinSpace: " ",
            hairsp: " ",
            Vfr: "𝔙",
            Vopf: "𝕍",
            Vscr: "𝒱",
            Vvdash: "⊪",
            Wcirc: "Ŵ",
            Wedge: "⋀",
            bigwedge: "⋀",
            xwedge: "⋀",
            Wfr: "𝔚",
            Wopf: "𝕎",
            Wscr: "𝒲",
            Xfr: "𝔛",
            Xi: "Ξ",
            Xopf: "𝕏",
            Xscr: "𝒳",
            YAcy: "Я",
            YIcy: "Ї",
            YUcy: "Ю",
            Yacute: "Ý",
            Ycirc: "Ŷ",
            Ycy: "Ы",
            Yfr: "𝔜",
            Yopf: "𝕐",
            Yscr: "𝒴",
            Yuml: "Ÿ",
            ZHcy: "Ж",
            Zacute: "Ź",
            Zcaron: "Ž",
            Zcy: "З",
            Zdot: "Ż",
            Zeta: "Ζ",
            Zfr: "ℨ",
            zeetrf: "ℨ",
            Zopf: "ℤ",
            integers: "ℤ",
            Zscr: "𝒵",
            aacute: "á",
            abreve: "ă",
            ac: "∾",
            mstpos: "∾",
            acE: "∾̳",
            acd: "∿",
            acirc: "â",
            acy: "а",
            aelig: "æ",
            afr: "𝔞",
            agrave: "à",
            alefsym: "ℵ",
            aleph: "ℵ",
            alpha: "α",
            amacr: "ā",
            amalg: "⨿",
            and: "∧",
            wedge: "∧",
            andand: "⩕",
            andd: "⩜",
            andslope: "⩘",
            andv: "⩚",
            ang: "∠",
            angle: "∠",
            ange: "⦤",
            angmsd: "∡",
            measuredangle: "∡",
            angmsdaa: "⦨",
            angmsdab: "⦩",
            angmsdac: "⦪",
            angmsdad: "⦫",
            angmsdae: "⦬",
            angmsdaf: "⦭",
            angmsdag: "⦮",
            angmsdah: "⦯",
            angrt: "∟",
            angrtvb: "⊾",
            angrtvbd: "⦝",
            angsph: "∢",
            angzarr: "⍼",
            aogon: "ą",
            aopf: "𝕒",
            apE: "⩰",
            apacir: "⩯",
            ape: "≊",
            approxeq: "≊",
            apid: "≋",
            apos: "'",
            aring: "å",
            ascr: "𝒶",
            ast: "*",
            midast: "*",
            atilde: "ã",
            auml: "ä",
            awint: "⨑",
            bNot: "⫭",
            backcong: "≌",
            bcong: "≌",
            backepsilon: "϶",
            bepsi: "϶",
            backprime: "‵",
            bprime: "‵",
            backsim: "∽",
            bsim: "∽",
            backsimeq: "⋍",
            bsime: "⋍",
            barvee: "⊽",
            barwed: "⌅",
            barwedge: "⌅",
            bbrktbrk: "⎶",
            bcy: "б",
            bdquo: "„",
            ldquor: "„",
            bemptyv: "⦰",
            beta: "β",
            beth: "ℶ",
            between: "≬",
            twixt: "≬",
            bfr: "𝔟",
            bigcirc: "◯",
            xcirc: "◯",
            bigodot: "⨀",
            xodot: "⨀",
            bigoplus: "⨁",
            xoplus: "⨁",
            bigotimes: "⨂",
            xotime: "⨂",
            bigsqcup: "⨆",
            xsqcup: "⨆",
            bigstar: "★",
            starf: "★",
            bigtriangledown: "▽",
            xdtri: "▽",
            bigtriangleup: "△",
            xutri: "△",
            biguplus: "⨄",
            xuplus: "⨄",
            bkarow: "⤍",
            rbarr: "⤍",
            blacklozenge: "⧫",
            lozf: "⧫",
            blacktriangle: "▴",
            utrif: "▴",
            blacktriangledown: "▾",
            dtrif: "▾",
            blacktriangleleft: "◂",
            ltrif: "◂",
            blacktriangleright: "▸",
            rtrif: "▸",
            blank: "␣",
            blk12: "▒",
            blk14: "░",
            blk34: "▓",
            block: "█",
            bne: "=⃥",
            bnequiv: "≡⃥",
            bnot: "⌐",
            bopf: "𝕓",
            bowtie: "⋈",
            boxDL: "╗",
            boxDR: "╔",
            boxDl: "╖",
            boxDr: "╓",
            boxH: "═",
            boxHD: "╦",
            boxHU: "╩",
            boxHd: "╤",
            boxHu: "╧",
            boxUL: "╝",
            boxUR: "╚",
            boxUl: "╜",
            boxUr: "╙",
            boxV: "║",
            boxVH: "╬",
            boxVL: "╣",
            boxVR: "╠",
            boxVh: "╫",
            boxVl: "╢",
            boxVr: "╟",
            boxbox: "⧉",
            boxdL: "╕",
            boxdR: "╒",
            boxdl: "┐",
            boxdr: "┌",
            boxhD: "╥",
            boxhU: "╨",
            boxhd: "┬",
            boxhu: "┴",
            boxminus: "⊟",
            minusb: "⊟",
            boxplus: "⊞",
            plusb: "⊞",
            boxtimes: "⊠",
            timesb: "⊠",
            boxuL: "╛",
            boxuR: "╘",
            boxul: "┘",
            boxur: "└",
            boxv: "│",
            boxvH: "╪",
            boxvL: "╡",
            boxvR: "╞",
            boxvh: "┼",
            boxvl: "┤",
            boxvr: "├",
            brvbar: "¦",
            bscr: "𝒷",
            bsemi: "⁏",
            bsol: "\\",
            bsolb: "⧅",
            bsolhsub: "⟈",
            bull: "•",
            bullet: "•",
            bumpE: "⪮",
            cacute: "ć",
            cap: "∩",
            capand: "⩄",
            capbrcup: "⩉",
            capcap: "⩋",
            capcup: "⩇",
            capdot: "⩀",
            caps: "∩︀",
            caret: "⁁",
            ccaps: "⩍",
            ccaron: "č",
            ccedil: "ç",
            ccirc: "ĉ",
            ccups: "⩌",
            ccupssm: "⩐",
            cdot: "ċ",
            cemptyv: "⦲",
            cent: "¢",
            cfr: "𝔠",
            chcy: "ч",
            check: "✓",
            checkmark: "✓",
            chi: "χ",
            cir: "○",
            cirE: "⧃",
            circ: "ˆ",
            circeq: "≗",
            cire: "≗",
            circlearrowleft: "↺",
            olarr: "↺",
            circlearrowright: "↻",
            orarr: "↻",
            circledS: "Ⓢ",
            oS: "Ⓢ",
            circledast: "⊛",
            oast: "⊛",
            circledcirc: "⊚",
            ocir: "⊚",
            circleddash: "⊝",
            odash: "⊝",
            cirfnint: "⨐",
            cirmid: "⫯",
            cirscir: "⧂",
            clubs: "♣",
            clubsuit: "♣",
            colon: ":",
            comma: ",",
            commat: "@",
            comp: "∁",
            complement: "∁",
            congdot: "⩭",
            copf: "𝕔",
            copysr: "℗",
            crarr: "↵",
            cross: "✗",
            cscr: "𝒸",
            csub: "⫏",
            csube: "⫑",
            csup: "⫐",
            csupe: "⫒",
            ctdot: "⋯",
            cudarrl: "⤸",
            cudarrr: "⤵",
            cuepr: "⋞",
            curlyeqprec: "⋞",
            cuesc: "⋟",
            curlyeqsucc: "⋟",
            cularr: "↶",
            curvearrowleft: "↶",
            cularrp: "⤽",
            cup: "∪",
            cupbrcap: "⩈",
            cupcap: "⩆",
            cupcup: "⩊",
            cupdot: "⊍",
            cupor: "⩅",
            cups: "∪︀",
            curarr: "↷",
            curvearrowright: "↷",
            curarrm: "⤼",
            curlyvee: "⋎",
            cuvee: "⋎",
            curlywedge: "⋏",
            cuwed: "⋏",
            curren: "¤",
            cwint: "∱",
            cylcty: "⌭",
            dHar: "⥥",
            dagger: "†",
            daleth: "ℸ",
            dash: "‐",
            hyphen: "‐",
            dbkarow: "⤏",
            rBarr: "⤏",
            dcaron: "ď",
            dcy: "д",
            ddarr: "⇊",
            downdownarrows: "⇊",
            ddotseq: "⩷",
            eDDot: "⩷",
            deg: "°",
            delta: "δ",
            demptyv: "⦱",
            dfisht: "⥿",
            dfr: "𝔡",
            diamondsuit: "♦",
            diams: "♦",
            digamma: "ϝ",
            gammad: "ϝ",
            disin: "⋲",
            div: "÷",
            divide: "÷",
            divideontimes: "⋇",
            divonx: "⋇",
            djcy: "ђ",
            dlcorn: "⌞",
            llcorner: "⌞",
            dlcrop: "⌍",
            dollar: "$",
            dopf: "𝕕",
            doteqdot: "≑",
            eDot: "≑",
            dotminus: "∸",
            minusd: "∸",
            dotplus: "∔",
            plusdo: "∔",
            dotsquare: "⊡",
            sdotb: "⊡",
            drcorn: "⌟",
            lrcorner: "⌟",
            drcrop: "⌌",
            dscr: "𝒹",
            dscy: "ѕ",
            dsol: "⧶",
            dstrok: "đ",
            dtdot: "⋱",
            dtri: "▿",
            triangledown: "▿",
            dwangle: "⦦",
            dzcy: "џ",
            dzigrarr: "⟿",
            eacute: "é",
            easter: "⩮",
            ecaron: "ě",
            ecir: "≖",
            eqcirc: "≖",
            ecirc: "ê",
            ecolon: "≕",
            eqcolon: "≕",
            ecy: "э",
            edot: "ė",
            efDot: "≒",
            fallingdotseq: "≒",
            efr: "𝔢",
            eg: "⪚",
            egrave: "è",
            egs: "⪖",
            eqslantgtr: "⪖",
            egsdot: "⪘",
            el: "⪙",
            elinters: "⏧",
            ell: "ℓ",
            els: "⪕",
            eqslantless: "⪕",
            elsdot: "⪗",
            emacr: "ē",
            empty: "∅",
            emptyset: "∅",
            emptyv: "∅",
            varnothing: "∅",
            emsp13: " ",
            emsp14: " ",
            emsp: " ",
            eng: "ŋ",
            ensp: " ",
            eogon: "ę",
            eopf: "𝕖",
            epar: "⋕",
            eparsl: "⧣",
            eplus: "⩱",
            epsi: "ε",
            epsilon: "ε",
            epsiv: "ϵ",
            straightepsilon: "ϵ",
            varepsilon: "ϵ",
            equals: "=",
            equest: "≟",
            questeq: "≟",
            equivDD: "⩸",
            eqvparsl: "⧥",
            erDot: "≓",
            risingdotseq: "≓",
            erarr: "⥱",
            escr: "ℯ",
            eta: "η",
            eth: "ð",
            euml: "ë",
            euro: "€",
            excl: "!",
            fcy: "ф",
            female: "♀",
            ffilig: "ﬃ",
            fflig: "ﬀ",
            ffllig: "ﬄ",
            ffr: "𝔣",
            filig: "ﬁ",
            fjlig: "fj",
            flat: "♭",
            fllig: "ﬂ",
            fltns: "▱",
            fnof: "ƒ",
            fopf: "𝕗",
            fork: "⋔",
            pitchfork: "⋔",
            forkv: "⫙",
            fpartint: "⨍",
            frac12: "½",
            half: "½",
            frac13: "⅓",
            frac14: "¼",
            frac15: "⅕",
            frac16: "⅙",
            frac18: "⅛",
            frac23: "⅔",
            frac25: "⅖",
            frac34: "¾",
            frac35: "⅗",
            frac38: "⅜",
            frac45: "⅘",
            frac56: "⅚",
            frac58: "⅝",
            frac78: "⅞",
            frasl: "⁄",
            frown: "⌢",
            sfrown: "⌢",
            fscr: "𝒻",
            gEl: "⪌",
            gtreqqless: "⪌",
            gacute: "ǵ",
            gamma: "γ",
            gap: "⪆",
            gtrapprox: "⪆",
            gbreve: "ğ",
            gcirc: "ĝ",
            gcy: "г",
            gdot: "ġ",
            gescc: "⪩",
            gesdot: "⪀",
            gesdoto: "⪂",
            gesdotol: "⪄",
            gesl: "⋛︀",
            gesles: "⪔",
            gfr: "𝔤",
            gimel: "ℷ",
            gjcy: "ѓ",
            glE: "⪒",
            gla: "⪥",
            glj: "⪤",
            gnE: "≩",
            gneqq: "≩",
            gnap: "⪊",
            gnapprox: "⪊",
            gne: "⪈",
            gneq: "⪈",
            gnsim: "⋧",
            gopf: "𝕘",
            gscr: "ℊ",
            gsime: "⪎",
            gsiml: "⪐",
            gtcc: "⪧",
            gtcir: "⩺",
            gtdot: "⋗",
            gtrdot: "⋗",
            gtlPar: "⦕",
            gtquest: "⩼",
            gtrarr: "⥸",
            gvertneqq: "≩︀",
            gvnE: "≩︀",
            hardcy: "ъ",
            harrcir: "⥈",
            harrw: "↭",
            leftrightsquigarrow: "↭",
            hbar: "ℏ",
            hslash: "ℏ",
            planck: "ℏ",
            plankv: "ℏ",
            hcirc: "ĥ",
            hearts: "♥",
            heartsuit: "♥",
            hellip: "…",
            mldr: "…",
            hercon: "⊹",
            hfr: "𝔥",
            hksearow: "⤥",
            searhk: "⤥",
            hkswarow: "⤦",
            swarhk: "⤦",
            hoarr: "⇿",
            homtht: "∻",
            hookleftarrow: "↩",
            larrhk: "↩",
            hookrightarrow: "↪",
            rarrhk: "↪",
            hopf: "𝕙",
            horbar: "―",
            hscr: "𝒽",
            hstrok: "ħ",
            hybull: "⁃",
            iacute: "í",
            icirc: "î",
            icy: "и",
            iecy: "е",
            iexcl: "¡",
            ifr: "𝔦",
            igrave: "ì",
            iiiint: "⨌",
            qint: "⨌",
            iiint: "∭",
            tint: "∭",
            iinfin: "⧜",
            iiota: "℩",
            ijlig: "ĳ",
            imacr: "ī",
            imath: "ı",
            inodot: "ı",
            imof: "⊷",
            imped: "Ƶ",
            incare: "℅",
            infin: "∞",
            infintie: "⧝",
            intcal: "⊺",
            intercal: "⊺",
            intlarhk: "⨗",
            intprod: "⨼",
            iprod: "⨼",
            iocy: "ё",
            iogon: "į",
            iopf: "𝕚",
            iota: "ι",
            iquest: "¿",
            iscr: "𝒾",
            isinE: "⋹",
            isindot: "⋵",
            isins: "⋴",
            isinsv: "⋳",
            itilde: "ĩ",
            iukcy: "і",
            iuml: "ï",
            jcirc: "ĵ",
            jcy: "й",
            jfr: "𝔧",
            jmath: "ȷ",
            jopf: "𝕛",
            jscr: "𝒿",
            jsercy: "ј",
            jukcy: "є",
            kappa: "κ",
            kappav: "ϰ",
            varkappa: "ϰ",
            kcedil: "ķ",
            kcy: "к",
            kfr: "𝔨",
            kgreen: "ĸ",
            khcy: "х",
            kjcy: "ќ",
            kopf: "𝕜",
            kscr: "𝓀",
            lAtail: "⤛",
            lBarr: "⤎",
            lEg: "⪋",
            lesseqqgtr: "⪋",
            lHar: "⥢",
            lacute: "ĺ",
            laemptyv: "⦴",
            lambda: "λ",
            langd: "⦑",
            lap: "⪅",
            lessapprox: "⪅",
            laquo: "«",
            larrbfs: "⤟",
            larrfs: "⤝",
            larrlp: "↫",
            looparrowleft: "↫",
            larrpl: "⤹",
            larrsim: "⥳",
            larrtl: "↢",
            leftarrowtail: "↢",
            lat: "⪫",
            latail: "⤙",
            late: "⪭",
            lates: "⪭︀",
            lbarr: "⤌",
            lbbrk: "❲",
            lbrace: "{",
            lcub: "{",
            lbrack: "[",
            lsqb: "[",
            lbrke: "⦋",
            lbrksld: "⦏",
            lbrkslu: "⦍",
            lcaron: "ľ",
            lcedil: "ļ",
            lcy: "л",
            ldca: "⤶",
            ldrdhar: "⥧",
            ldrushar: "⥋",
            ldsh: "↲",
            le: "≤",
            leq: "≤",
            leftleftarrows: "⇇",
            llarr: "⇇",
            leftthreetimes: "⋋",
            lthree: "⋋",
            lescc: "⪨",
            lesdot: "⩿",
            lesdoto: "⪁",
            lesdotor: "⪃",
            lesg: "⋚︀",
            lesges: "⪓",
            lessdot: "⋖",
            ltdot: "⋖",
            lfisht: "⥼",
            lfr: "𝔩",
            lgE: "⪑",
            lharul: "⥪",
            lhblk: "▄",
            ljcy: "љ",
            llhard: "⥫",
            lltri: "◺",
            lmidot: "ŀ",
            lmoust: "⎰",
            lmoustache: "⎰",
            lnE: "≨",
            lneqq: "≨",
            lnap: "⪉",
            lnapprox: "⪉",
            lne: "⪇",
            lneq: "⪇",
            lnsim: "⋦",
            loang: "⟬",
            loarr: "⇽",
            longmapsto: "⟼",
            xmap: "⟼",
            looparrowright: "↬",
            rarrlp: "↬",
            lopar: "⦅",
            lopf: "𝕝",
            loplus: "⨭",
            lotimes: "⨴",
            lowast: "∗",
            loz: "◊",
            lozenge: "◊",
            lpar: "(",
            lparlt: "⦓",
            lrhard: "⥭",
            lrm: "‎",
            lrtri: "⊿",
            lsaquo: "‹",
            lscr: "𝓁",
            lsime: "⪍",
            lsimg: "⪏",
            lsquor: "‚",
            sbquo: "‚",
            lstrok: "ł",
            ltcc: "⪦",
            ltcir: "⩹",
            ltimes: "⋉",
            ltlarr: "⥶",
            ltquest: "⩻",
            ltrPar: "⦖",
            ltri: "◃",
            triangleleft: "◃",
            lurdshar: "⥊",
            luruhar: "⥦",
            lvertneqq: "≨︀",
            lvnE: "≨︀",
            mDDot: "∺",
            macr: "¯",
            strns: "¯",
            male: "♂",
            malt: "✠",
            maltese: "✠",
            marker: "▮",
            mcomma: "⨩",
            mcy: "м",
            mdash: "—",
            mfr: "𝔪",
            mho: "℧",
            micro: "µ",
            midcir: "⫰",
            minus: "−",
            minusdu: "⨪",
            mlcp: "⫛",
            models: "⊧",
            mopf: "𝕞",
            mscr: "𝓂",
            mu: "μ",
            multimap: "⊸",
            mumap: "⊸",
            nGg: "⋙̸",
            nGt: "≫⃒",
            nLeftarrow: "⇍",
            nlArr: "⇍",
            nLeftrightarrow: "⇎",
            nhArr: "⇎",
            nLl: "⋘̸",
            nLt: "≪⃒",
            nRightarrow: "⇏",
            nrArr: "⇏",
            nVDash: "⊯",
            nVdash: "⊮",
            nacute: "ń",
            nang: "∠⃒",
            napE: "⩰̸",
            napid: "≋̸",
            napos: "ŉ",
            natur: "♮",
            natural: "♮",
            ncap: "⩃",
            ncaron: "ň",
            ncedil: "ņ",
            ncongdot: "⩭̸",
            ncup: "⩂",
            ncy: "н",
            ndash: "–",
            neArr: "⇗",
            nearhk: "⤤",
            nedot: "≐̸",
            nesear: "⤨",
            toea: "⤨",
            nfr: "𝔫",
            nharr: "↮",
            nleftrightarrow: "↮",
            nhpar: "⫲",
            nis: "⋼",
            nisd: "⋺",
            njcy: "њ",
            nlE: "≦̸",
            nleqq: "≦̸",
            nlarr: "↚",
            nleftarrow: "↚",
            nldr: "‥",
            nopf: "𝕟",
            not: "¬",
            notinE: "⋹̸",
            notindot: "⋵̸",
            notinvb: "⋷",
            notinvc: "⋶",
            notnivb: "⋾",
            notnivc: "⋽",
            nparsl: "⫽⃥",
            npart: "∂̸",
            npolint: "⨔",
            nrarr: "↛",
            nrightarrow: "↛",
            nrarrc: "⤳̸",
            nrarrw: "↝̸",
            nscr: "𝓃",
            nsub: "⊄",
            nsubE: "⫅̸",
            nsubseteqq: "⫅̸",
            nsup: "⊅",
            nsupE: "⫆̸",
            nsupseteqq: "⫆̸",
            ntilde: "ñ",
            nu: "ν",
            num: "#",
            numero: "№",
            numsp: " ",
            nvDash: "⊭",
            nvHarr: "⤄",
            nvap: "≍⃒",
            nvdash: "⊬",
            nvge: "≥⃒",
            nvgt: ">⃒",
            nvinfin: "⧞",
            nvlArr: "⤂",
            nvle: "≤⃒",
            nvlt: "<⃒",
            nvltrie: "⊴⃒",
            nvrArr: "⤃",
            nvrtrie: "⊵⃒",
            nvsim: "∼⃒",
            nwArr: "⇖",
            nwarhk: "⤣",
            nwnear: "⤧",
            oacute: "ó",
            ocirc: "ô",
            ocy: "о",
            odblac: "ő",
            odiv: "⨸",
            odsold: "⦼",
            oelig: "œ",
            ofcir: "⦿",
            ofr: "𝔬",
            ogon: "˛",
            ograve: "ò",
            ogt: "⧁",
            ohbar: "⦵",
            olcir: "⦾",
            olcross: "⦻",
            olt: "⧀",
            omacr: "ō",
            omega: "ω",
            omicron: "ο",
            omid: "⦶",
            oopf: "𝕠",
            opar: "⦷",
            operp: "⦹",
            or: "∨",
            vee: "∨",
            ord: "⩝",
            order: "ℴ",
            orderof: "ℴ",
            oscr: "ℴ",
            ordf: "ª",
            ordm: "º",
            origof: "⊶",
            oror: "⩖",
            orslope: "⩗",
            orv: "⩛",
            oslash: "ø",
            osol: "⊘",
            otilde: "õ",
            otimesas: "⨶",
            ouml: "ö",
            ovbar: "⌽",
            para: "¶",
            parsim: "⫳",
            parsl: "⫽",
            pcy: "п",
            percnt: "%",
            period: ".",
            permil: "‰",
            pertenk: "‱",
            pfr: "𝔭",
            phi: "φ",
            phiv: "ϕ",
            straightphi: "ϕ",
            varphi: "ϕ",
            phone: "☎",
            pi: "π",
            piv: "ϖ",
            varpi: "ϖ",
            planckh: "ℎ",
            plus: "+",
            plusacir: "⨣",
            pluscir: "⨢",
            plusdu: "⨥",
            pluse: "⩲",
            plussim: "⨦",
            plustwo: "⨧",
            pointint: "⨕",
            popf: "𝕡",
            pound: "£",
            prE: "⪳",
            prap: "⪷",
            precapprox: "⪷",
            precnapprox: "⪹",
            prnap: "⪹",
            precneqq: "⪵",
            prnE: "⪵",
            precnsim: "⋨",
            prnsim: "⋨",
            prime: "′",
            profalar: "⌮",
            profline: "⌒",
            profsurf: "⌓",
            prurel: "⊰",
            pscr: "𝓅",
            psi: "ψ",
            puncsp: " ",
            qfr: "𝔮",
            qopf: "𝕢",
            qprime: "⁗",
            qscr: "𝓆",
            quatint: "⨖",
            quest: "?",
            rAtail: "⤜",
            rHar: "⥤",
            race: "∽̱",
            racute: "ŕ",
            raemptyv: "⦳",
            rangd: "⦒",
            range: "⦥",
            raquo: "»",
            rarrap: "⥵",
            rarrbfs: "⤠",
            rarrc: "⤳",
            rarrfs: "⤞",
            rarrpl: "⥅",
            rarrsim: "⥴",
            rarrtl: "↣",
            rightarrowtail: "↣",
            rarrw: "↝",
            rightsquigarrow: "↝",
            ratail: "⤚",
            ratio: "∶",
            rbbrk: "❳",
            rbrace: "}",
            rcub: "}",
            rbrack: "]",
            rsqb: "]",
            rbrke: "⦌",
            rbrksld: "⦎",
            rbrkslu: "⦐",
            rcaron: "ř",
            rcedil: "ŗ",
            rcy: "р",
            rdca: "⤷",
            rdldhar: "⥩",
            rdsh: "↳",
            rect: "▭",
            rfisht: "⥽",
            rfr: "𝔯",
            rharul: "⥬",
            rho: "ρ",
            rhov: "ϱ",
            varrho: "ϱ",
            rightrightarrows: "⇉",
            rrarr: "⇉",
            rightthreetimes: "⋌",
            rthree: "⋌",
            ring: "˚",
            rlm: "‏",
            rmoust: "⎱",
            rmoustache: "⎱",
            rnmid: "⫮",
            roang: "⟭",
            roarr: "⇾",
            ropar: "⦆",
            ropf: "𝕣",
            roplus: "⨮",
            rotimes: "⨵",
            rpar: ")",
            rpargt: "⦔",
            rppolint: "⨒",
            rsaquo: "›",
            rscr: "𝓇",
            rtimes: "⋊",
            rtri: "▹",
            triangleright: "▹",
            rtriltri: "⧎",
            ruluhar: "⥨",
            rx: "℞",
            sacute: "ś",
            scE: "⪴",
            scap: "⪸",
            succapprox: "⪸",
            scaron: "š",
            scedil: "ş",
            scirc: "ŝ",
            scnE: "⪶",
            succneqq: "⪶",
            scnap: "⪺",
            succnapprox: "⪺",
            scnsim: "⋩",
            succnsim: "⋩",
            scpolint: "⨓",
            scy: "с",
            sdot: "⋅",
            sdote: "⩦",
            seArr: "⇘",
            sect: "§",
            semi: ";",
            seswar: "⤩",
            tosa: "⤩",
            sext: "✶",
            sfr: "𝔰",
            sharp: "♯",
            shchcy: "щ",
            shcy: "ш",
            shy: "­",
            sigma: "σ",
            sigmaf: "ς",
            sigmav: "ς",
            varsigma: "ς",
            simdot: "⩪",
            simg: "⪞",
            simgE: "⪠",
            siml: "⪝",
            simlE: "⪟",
            simne: "≆",
            simplus: "⨤",
            simrarr: "⥲",
            smashp: "⨳",
            smeparsl: "⧤",
            smile: "⌣",
            ssmile: "⌣",
            smt: "⪪",
            smte: "⪬",
            smtes: "⪬︀",
            softcy: "ь",
            sol: "/",
            solb: "⧄",
            solbar: "⌿",
            sopf: "𝕤",
            spades: "♠",
            spadesuit: "♠",
            sqcaps: "⊓︀",
            sqcups: "⊔︀",
            sscr: "𝓈",
            star: "☆",
            sub: "⊂",
            subset: "⊂",
            subE: "⫅",
            subseteqq: "⫅",
            subdot: "⪽",
            subedot: "⫃",
            submult: "⫁",
            subnE: "⫋",
            subsetneqq: "⫋",
            subne: "⊊",
            subsetneq: "⊊",
            subplus: "⪿",
            subrarr: "⥹",
            subsim: "⫇",
            subsub: "⫕",
            subsup: "⫓",
            sung: "♪",
            sup1: "¹",
            sup2: "²",
            sup3: "³",
            supE: "⫆",
            supseteqq: "⫆",
            supdot: "⪾",
            supdsub: "⫘",
            supedot: "⫄",
            suphsol: "⟉",
            suphsub: "⫗",
            suplarr: "⥻",
            supmult: "⫂",
            supnE: "⫌",
            supsetneqq: "⫌",
            supne: "⊋",
            supsetneq: "⊋",
            supplus: "⫀",
            supsim: "⫈",
            supsub: "⫔",
            supsup: "⫖",
            swArr: "⇙",
            swnwar: "⤪",
            szlig: "ß",
            target: "⌖",
            tau: "τ",
            tcaron: "ť",
            tcedil: "ţ",
            tcy: "т",
            telrec: "⌕",
            tfr: "𝔱",
            theta: "θ",
            thetasym: "ϑ",
            thetav: "ϑ",
            vartheta: "ϑ",
            thorn: "þ",
            times: "×",
            timesbar: "⨱",
            timesd: "⨰",
            topbot: "⌶",
            topcir: "⫱",
            topf: "𝕥",
            topfork: "⫚",
            tprime: "‴",
            triangle: "▵",
            utri: "▵",
            triangleq: "≜",
            trie: "≜",
            tridot: "◬",
            triminus: "⨺",
            triplus: "⨹",
            trisb: "⧍",
            tritime: "⨻",
            trpezium: "⏢",
            tscr: "𝓉",
            tscy: "ц",
            tshcy: "ћ",
            tstrok: "ŧ",
            uHar: "⥣",
            uacute: "ú",
            ubrcy: "ў",
            ubreve: "ŭ",
            ucirc: "û",
            ucy: "у",
            udblac: "ű",
            ufisht: "⥾",
            ufr: "𝔲",
            ugrave: "ù",
            uhblk: "▀",
            ulcorn: "⌜",
            ulcorner: "⌜",
            ulcrop: "⌏",
            ultri: "◸",
            umacr: "ū",
            uogon: "ų",
            uopf: "𝕦",
            upsi: "υ",
            upsilon: "υ",
            upuparrows: "⇈",
            uuarr: "⇈",
            urcorn: "⌝",
            urcorner: "⌝",
            urcrop: "⌎",
            uring: "ů",
            urtri: "◹",
            uscr: "𝓊",
            utdot: "⋰",
            utilde: "ũ",
            uuml: "ü",
            uwangle: "⦧",
            vBar: "⫨",
            vBarv: "⫩",
            vangrt: "⦜",
            varsubsetneq: "⊊︀",
            vsubne: "⊊︀",
            varsubsetneqq: "⫋︀",
            vsubnE: "⫋︀",
            varsupsetneq: "⊋︀",
            vsupne: "⊋︀",
            varsupsetneqq: "⫌︀",
            vsupnE: "⫌︀",
            vcy: "в",
            veebar: "⊻",
            veeeq: "≚",
            vellip: "⋮",
            vfr: "𝔳",
            vopf: "𝕧",
            vscr: "𝓋",
            vzigzag: "⦚",
            wcirc: "ŵ",
            wedbar: "⩟",
            wedgeq: "≙",
            weierp: "℘",
            wp: "℘",
            wfr: "𝔴",
            wopf: "𝕨",
            wscr: "𝓌",
            xfr: "𝔵",
            xi: "ξ",
            xnis: "⋻",
            xopf: "𝕩",
            xscr: "𝓍",
            yacute: "ý",
            yacy: "я",
            ycirc: "ŷ",
            ycy: "ы",
            yen: "¥",
            yfr: "𝔶",
            yicy: "ї",
            yopf: "𝕪",
            yscr: "𝓎",
            yucy: "ю",
            yuml: "ÿ",
            zacute: "ź",
            zcaron: "ž",
            zcy: "з",
            zdot: "ż",
            zeta: "ζ",
            zfr: "𝔷",
            zhcy: "ж",
            zigrarr: "⇝",
            zopf: "𝕫",
            zscr: "𝓏",
            zwj: "‍",
            zwnj: "‌",
          };
        Ve.ngsp = "";
        var $a = [/^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
        var Tr = new (class t2 {
            static fromArray(e) {
              return e
                ? ((function _s(t8, e) {
                    if (null != e && (!Array.isArray(e) || 2 != e.length))
                      throw new Error(
                        `Expected '${t8}' to be an array, [start, end].`,
                      );
                    if (null != e) {
                      let r = e[0],
                        n = e[1];
                      $a.forEach((s) => {
                        if (s.test(r) || s.test(n))
                          throw new Error(
                            `['${r}', '${n}'] contains unusable interpolation symbol.`,
                          );
                      });
                    }
                  })("interpolation", e),
                  new t2(e[0], e[1]))
                : Tr;
            }
            constructor(e, r) {
              (this.start = e), (this.end = r);
            }
          })("{{", "}}"),
          ct = class extends Re {
            constructor(e, r, n) {
              super(n, e), (this.tokenType = r);
            }
          },
          Fr = class {
            constructor(e, r, n) {
              (this.tokens = e),
                (this.errors = r),
                (this.nonNormalizedIcuExpressions = n);
            }
          };
        var jt,
          ro = /\r\n?/g;
        function Ue(t8) {
          return `Unexpected character "${0 === t8 ? "EOF" : String.fromCharCode(t8)}"`;
        }
        function ws(t8) {
          return `Unknown entity "${t8}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
        }
        !(function (t8) {
          (t8.HEX = "hexadecimal"), (t8.DEC = "decimal");
        })(jt || (jt = {}));
        var pt = class {
            constructor(e) {
              this.error = e;
            }
          },
          Pr = class {
            constructor(e, r, n) {
              (this._getTagContentType = r),
                (this._currentTokenStart = null),
                (this._currentTokenType = null),
                (this._expansionCaseStack = []),
                (this._inInterpolation = !1),
                (this._fullNameStack = []),
                (this.tokens = []),
                (this.errors = []),
                (this.nonNormalizedIcuExpressions = []),
                (this._tokenizeIcu = n.tokenizeExpansionForms || !1),
                (this._interpolationConfig = n.interpolationConfig || Tr),
                (this._leadingTriviaCodePoints =
                  n.leadingTriviaChars &&
                  n.leadingTriviaChars.map((i) => i.codePointAt(0) || 0)),
                (this._canSelfClose = n.canSelfClose || !1),
                (this._allowHtmComponentClosingTags =
                  n.allowHtmComponentClosingTags || !1);
              let s = n.range || {
                endPos: e.content.length,
                startPos: 0,
                startLine: 0,
                startCol: 0,
              };
              (this._cursor = n.escapedString ? new Nr(e, s) : new Kt(e, s)),
                (this._preserveLineEndings = n.preserveLineEndings || !1),
                (this._i18nNormalizeLineEndingsInICUs =
                  n.i18nNormalizeLineEndingsInICUs || !1),
                (this._tokenizeBlocks = n.tokenizeBlocks ?? !0);
              try {
                this._cursor.init();
              } catch (i) {
                this.handleError(i);
              }
            }
            _processCarriageReturns(e) {
              return this._preserveLineEndings ? e : e.replace(ro, "\n");
            }
            tokenize() {
              for (; 0 !== this._cursor.peek(); ) {
                let e = this._cursor.clone();
                try {
                  if (this._attemptCharCode(60))
                    if (this._attemptCharCode(33))
                      this._attemptStr("[CDATA[")
                        ? this._consumeCdata(e)
                        : this._attemptStr("--")
                          ? this._consumeComment(e)
                          : this._attemptStrCaseInsensitive("doctype")
                            ? this._consumeDocType(e)
                            : this._consumeBogusComment(e);
                    else if (this._attemptCharCode(47))
                      this._consumeTagClose(e);
                    else {
                      let r = this._cursor.clone();
                      this._attemptCharCode(63)
                        ? ((this._cursor = r), this._consumeBogusComment(e))
                        : this._consumeTagOpen(e);
                    }
                  else
                    this._tokenizeBlocks && this._attemptCharCode(64)
                      ? this._consumeBlockStart(e)
                      : !this._tokenizeBlocks ||
                          this._inInterpolation ||
                          this._isInExpansionCase() ||
                          this._isInExpansionForm() ||
                          !this._attemptCharCode(125)
                        ? (this._tokenizeIcu &&
                            this._tokenizeExpansionForm()) ||
                          this._consumeWithInterpolation(
                            5,
                            8,
                            () => this._isTextEnd(),
                            () => this._isTagStart(),
                          )
                        : this._consumeBlockEnd(e);
                } catch (r) {
                  this.handleError(r);
                }
              }
              this._beginToken(30), this._endToken([]);
            }
            _getBlockName() {
              let e = !1,
                r = this._cursor.clone();
              return (
                this._attemptCharCodeUntilFn((n) =>
                  wt(n) ? !e : !xs(n) || ((e = !0), !1),
                ),
                this._cursor.getChars(r).trim()
              );
            }
            _consumeBlockStart(e) {
              this._beginToken(25, e);
              let r = this._endToken([this._getBlockName()]);
              if (40 === this._cursor.peek()) {
                if (
                  (this._cursor.advance(),
                  this._consumeBlockParameters(),
                  this._attemptCharCodeUntilFn(k),
                  !this._attemptCharCode(41))
                )
                  return void (r.type = 29);
                this._attemptCharCodeUntilFn(k);
              }
              this._attemptCharCode(123)
                ? (this._beginToken(26), this._endToken([]))
                : (r.type = 29);
            }
            _consumeBlockEnd(e) {
              this._beginToken(27, e), this._endToken([]);
            }
            _consumeBlockParameters() {
              for (
                this._attemptCharCodeUntilFn(ks);
                41 !== this._cursor.peek() && 0 !== this._cursor.peek();

              ) {
                this._beginToken(28);
                let e = this._cursor.clone(),
                  r = null,
                  n = 0;
                for (
                  ;
                  (59 !== this._cursor.peek() && 0 !== this._cursor.peek()) ||
                  null !== r;

                ) {
                  let s = this._cursor.peek();
                  if (92 === s) this._cursor.advance();
                  else if (s === r) r = null;
                  else if (null === r && dr(s)) r = s;
                  else if (40 === s && null === r) n++;
                  else if (41 === s && null === r) {
                    if (0 === n) break;
                    n > 0 && n--;
                  }
                  this._cursor.advance();
                }
                this._endToken([this._cursor.getChars(e)]),
                  this._attemptCharCodeUntilFn(ks);
              }
            }
            _tokenizeExpansionForm() {
              if (this.isExpansionFormStart())
                return this._consumeExpansionFormStart(), !0;
              if (
                (function oo(t8) {
                  return 125 !== t8;
                })(this._cursor.peek()) &&
                this._isInExpansionForm()
              )
                return this._consumeExpansionCaseStart(), !0;
              if (125 === this._cursor.peek()) {
                if (this._isInExpansionCase())
                  return this._consumeExpansionCaseEnd(), !0;
                if (this._isInExpansionForm())
                  return this._consumeExpansionFormEnd(), !0;
              }
              return !1;
            }
            _beginToken(e, r = this._cursor.clone()) {
              (this._currentTokenStart = r), (this._currentTokenType = e);
            }
            _endToken(e, r) {
              if (null === this._currentTokenStart)
                throw new ct(
                  "Programming error - attempted to end a token when there was no start to the token",
                  this._currentTokenType,
                  this._cursor.getSpan(r),
                );
              if (null === this._currentTokenType)
                throw new ct(
                  "Programming error - attempted to end a token which has no token type",
                  null,
                  this._cursor.getSpan(this._currentTokenStart),
                );
              let n = {
                type: this._currentTokenType,
                parts: e,
                sourceSpan: (r ?? this._cursor).getSpan(
                  this._currentTokenStart,
                  this._leadingTriviaCodePoints,
                ),
              };
              return (
                this.tokens.push(n),
                (this._currentTokenStart = null),
                (this._currentTokenType = null),
                n
              );
            }
            _createError(e, r) {
              this._isInExpansionForm() &&
                (e +=
                  ' (Do you have an unescaped "{" in your template? Use "{{ \'{\' }}") to escape it.)');
              let n = new ct(e, this._currentTokenType, r);
              return (
                (this._currentTokenStart = null),
                (this._currentTokenType = null),
                new pt(n)
              );
            }
            handleError(e) {
              if (
                (e instanceof ht &&
                  (e = this._createError(
                    e.msg,
                    this._cursor.getSpan(e.cursor),
                  )),
                !(e instanceof pt))
              )
                throw e;
              this.errors.push(e.error);
            }
            _attemptCharCode(e) {
              return this._cursor.peek() === e && (this._cursor.advance(), !0);
            }
            _attemptCharCodeCaseInsensitive(e) {
              return (
                !!(function uo(t8, e) {
                  return Ts(t8) === Ts(e);
                })(this._cursor.peek(), e) && (this._cursor.advance(), !0)
              );
            }
            _requireCharCode(e) {
              let r = this._cursor.clone();
              if (!this._attemptCharCode(e))
                throw this._createError(
                  Ue(this._cursor.peek()),
                  this._cursor.getSpan(r),
                );
            }
            _attemptStr(e) {
              let r = e.length;
              if (this._cursor.charsLeft() < r) return !1;
              let n = this._cursor.clone();
              for (let s = 0; s < r; s++)
                if (!this._attemptCharCode(e.charCodeAt(s)))
                  return (this._cursor = n), !1;
              return !0;
            }
            _attemptStrCaseInsensitive(e) {
              for (let r = 0; r < e.length; r++)
                if (!this._attemptCharCodeCaseInsensitive(e.charCodeAt(r)))
                  return !1;
              return !0;
            }
            _requireStr(e) {
              let r = this._cursor.clone();
              if (!this._attemptStr(e))
                throw this._createError(
                  Ue(this._cursor.peek()),
                  this._cursor.getSpan(r),
                );
            }
            _requireStrCaseInsensitive(e) {
              let r = this._cursor.clone();
              if (!this._attemptStrCaseInsensitive(e))
                throw this._createError(
                  Ue(this._cursor.peek()),
                  this._cursor.getSpan(r),
                );
            }
            _attemptCharCodeUntilFn(e) {
              for (; !e(this._cursor.peek()); ) this._cursor.advance();
            }
            _requireCharCodeUntilFn(e, r) {
              let n = this._cursor.clone();
              if ((this._attemptCharCodeUntilFn(e), this._cursor.diff(n) < r))
                throw this._createError(
                  Ue(this._cursor.peek()),
                  this._cursor.getSpan(n),
                );
            }
            _attemptUntilChar(e) {
              for (; this._cursor.peek() !== e; ) this._cursor.advance();
            }
            _readChar() {
              let e = String.fromCodePoint(this._cursor.peek());
              return this._cursor.advance(), e;
            }
            _consumeEntity(e) {
              this._beginToken(9);
              let r = this._cursor.clone();
              if ((this._cursor.advance(), this._attemptCharCode(35))) {
                let n = this._attemptCharCode(120) || this._attemptCharCode(88),
                  s = this._cursor.clone();
                if (
                  (this._attemptCharCodeUntilFn(io), 59 != this._cursor.peek())
                ) {
                  this._cursor.advance();
                  let a = n ? jt.HEX : jt.DEC;
                  throw this._createError(
                    (function no(t8, e) {
                      return `Unable to parse entity "${e}" - ${t8} character reference entities must end with ";"`;
                    })(a, this._cursor.getChars(r)),
                    this._cursor.getSpan(),
                  );
                }
                let i = this._cursor.getChars(s);
                this._cursor.advance();
                try {
                  let a = parseInt(i, n ? 16 : 10);
                  this._endToken([
                    String.fromCharCode(a),
                    this._cursor.getChars(r),
                  ]);
                } catch {
                  throw this._createError(
                    ws(this._cursor.getChars(r)),
                    this._cursor.getSpan(),
                  );
                }
              } else {
                let n = this._cursor.clone();
                if (
                  (this._attemptCharCodeUntilFn(ao), 59 != this._cursor.peek())
                )
                  this._beginToken(e, r),
                    (this._cursor = n),
                    this._endToken(["&"]);
                else {
                  let s = this._cursor.getChars(n);
                  this._cursor.advance();
                  let i = Ve[s];
                  if (!i)
                    throw this._createError(ws(s), this._cursor.getSpan(r));
                  this._endToken([i, `&${s};`]);
                }
              }
            }
            _consumeRawText(e, r) {
              this._beginToken(e ? 6 : 7);
              let n = [];
              for (;;) {
                let s = this._cursor.clone(),
                  i = r();
                if (((this._cursor = s), i)) break;
                e && 38 === this._cursor.peek()
                  ? (this._endToken([this._processCarriageReturns(n.join(""))]),
                    (n.length = 0),
                    this._consumeEntity(6),
                    this._beginToken(6))
                  : n.push(this._readChar());
              }
              this._endToken([this._processCarriageReturns(n.join(""))]);
            }
            _consumeComment(e) {
              this._beginToken(10, e),
                this._endToken([]),
                this._consumeRawText(!1, () => this._attemptStr("--\x3e")),
                this._beginToken(11),
                this._requireStr("--\x3e"),
                this._endToken([]);
            }
            _consumeBogusComment(e) {
              this._beginToken(10, e),
                this._endToken([]),
                this._consumeRawText(!1, () => 62 === this._cursor.peek()),
                this._beginToken(11),
                this._cursor.advance(),
                this._endToken([]);
            }
            _consumeCdata(e) {
              this._beginToken(12, e),
                this._endToken([]),
                this._consumeRawText(!1, () => this._attemptStr("]]>")),
                this._beginToken(13),
                this._requireStr("]]>"),
                this._endToken([]);
            }
            _consumeDocType(e) {
              this._beginToken(18, e),
                this._endToken([]),
                this._consumeRawText(!1, () => 62 === this._cursor.peek()),
                this._beginToken(19),
                this._cursor.advance(),
                this._endToken([]);
            }
            _consumePrefixAndName() {
              let n,
                e = this._cursor.clone(),
                r = "";
              for (; 58 !== this._cursor.peek() && !so(this._cursor.peek()); )
                this._cursor.advance();
              return (
                58 === this._cursor.peek()
                  ? ((r = this._cursor.getChars(e)),
                    this._cursor.advance(),
                    (n = this._cursor.clone()))
                  : (n = e),
                this._requireCharCodeUntilFn(bs, "" === r ? 0 : 1),
                [r, this._cursor.getChars(n)]
              );
            }
            _consumeTagOpen(e) {
              let r,
                n,
                s,
                i = [];
              try {
                if (!bt(this._cursor.peek()))
                  throw this._createError(
                    Ue(this._cursor.peek()),
                    this._cursor.getSpan(e),
                  );
                for (
                  s = this._consumeTagOpenStart(e),
                    n = s.parts[0],
                    r = s.parts[1],
                    this._attemptCharCodeUntilFn(k);
                  47 !== this._cursor.peek() &&
                  62 !== this._cursor.peek() &&
                  60 !== this._cursor.peek() &&
                  0 !== this._cursor.peek();

                ) {
                  let [o, u] = this._consumeAttributeName();
                  if (
                    (this._attemptCharCodeUntilFn(k), this._attemptCharCode(61))
                  ) {
                    this._attemptCharCodeUntilFn(k);
                    let p = this._consumeAttributeValue();
                    i.push({ prefix: o, name: u, value: p });
                  } else i.push({ prefix: o, name: u });
                  this._attemptCharCodeUntilFn(k);
                }
                this._consumeTagOpenEnd();
              } catch (o) {
                if (o instanceof pt)
                  return void (s
                    ? (s.type = 4)
                    : (this._beginToken(5, e), this._endToken(["<"])));
                throw o;
              }
              if (
                this._canSelfClose &&
                2 === this.tokens[this.tokens.length - 1].type
              )
                return;
              let a = this._getTagContentType(
                r,
                n,
                this._fullNameStack.length > 0,
                i,
              );
              this._handleFullNameStackForTagOpen(n, r),
                a === F.RAW_TEXT
                  ? this._consumeRawTextWithTagClose(n, r, !1)
                  : a === F.ESCAPABLE_RAW_TEXT &&
                    this._consumeRawTextWithTagClose(n, r, !0);
            }
            _consumeRawTextWithTagClose(e, r, n) {
              this._consumeRawText(
                n,
                () =>
                  !!(
                    this._attemptCharCode(60) &&
                    this._attemptCharCode(47) &&
                    (this._attemptCharCodeUntilFn(k),
                    this._attemptStrCaseInsensitive(e ? `${e}:${r}` : r))
                  ) &&
                  (this._attemptCharCodeUntilFn(k), this._attemptCharCode(62)),
              ),
                this._beginToken(3),
                this._requireCharCodeUntilFn((s) => 62 === s, 3),
                this._cursor.advance(),
                this._endToken([e, r]),
                this._handleFullNameStackForTagClose(e, r);
            }
            _consumeTagOpenStart(e) {
              this._beginToken(0, e);
              let r = this._consumePrefixAndName();
              return this._endToken(r);
            }
            _consumeAttributeName() {
              let e = this._cursor.peek();
              if (39 === e || 34 === e)
                throw this._createError(Ue(e), this._cursor.getSpan());
              this._beginToken(14);
              let r = this._consumePrefixAndName();
              return this._endToken(r), r;
            }
            _consumeAttributeValue() {
              let e;
              if (39 === this._cursor.peek() || 34 === this._cursor.peek()) {
                let r = this._cursor.peek();
                this._consumeQuote(r);
                let n = () => this._cursor.peek() === r;
                (e = this._consumeWithInterpolation(16, 17, n, n)),
                  this._consumeQuote(r);
              } else {
                let r = () => bs(this._cursor.peek());
                e = this._consumeWithInterpolation(16, 17, r, r);
              }
              return e;
            }
            _consumeQuote(e) {
              this._beginToken(15),
                this._requireCharCode(e),
                this._endToken([String.fromCodePoint(e)]);
            }
            _consumeTagOpenEnd() {
              let e = this._attemptCharCode(47) ? 2 : 1;
              this._beginToken(e),
                this._requireCharCode(62),
                this._endToken([]);
            }
            _consumeTagClose(e) {
              if (
                (this._beginToken(3, e),
                this._attemptCharCodeUntilFn(k),
                this._allowHtmComponentClosingTags && this._attemptCharCode(47))
              )
                this._attemptCharCodeUntilFn(k),
                  this._requireCharCode(62),
                  this._endToken([]);
              else {
                let [r, n] = this._consumePrefixAndName();
                this._attemptCharCodeUntilFn(k),
                  this._requireCharCode(62),
                  this._endToken([r, n]),
                  this._handleFullNameStackForTagClose(r, n);
              }
            }
            _consumeExpansionFormStart() {
              this._beginToken(20),
                this._requireCharCode(123),
                this._endToken([]),
                this._expansionCaseStack.push(20),
                this._beginToken(7);
              let e = this._readUntil(44),
                r = this._processCarriageReturns(e);
              if (this._i18nNormalizeLineEndingsInICUs) this._endToken([r]);
              else {
                let s = this._endToken([e]);
                r !== e && this.nonNormalizedIcuExpressions.push(s);
              }
              this._requireCharCode(44),
                this._attemptCharCodeUntilFn(k),
                this._beginToken(7);
              let n = this._readUntil(44);
              this._endToken([n]),
                this._requireCharCode(44),
                this._attemptCharCodeUntilFn(k);
            }
            _consumeExpansionCaseStart() {
              this._beginToken(21);
              let e = this._readUntil(123).trim();
              this._endToken([e]),
                this._attemptCharCodeUntilFn(k),
                this._beginToken(22),
                this._requireCharCode(123),
                this._endToken([]),
                this._attemptCharCodeUntilFn(k),
                this._expansionCaseStack.push(22);
            }
            _consumeExpansionCaseEnd() {
              this._beginToken(23),
                this._requireCharCode(125),
                this._endToken([]),
                this._attemptCharCodeUntilFn(k),
                this._expansionCaseStack.pop();
            }
            _consumeExpansionFormEnd() {
              this._beginToken(24),
                this._requireCharCode(125),
                this._endToken([]),
                this._expansionCaseStack.pop();
            }
            _consumeWithInterpolation(e, r, n, s) {
              this._beginToken(e);
              let i = [];
              for (; !n(); ) {
                let o = this._cursor.clone();
                this._interpolationConfig &&
                this._attemptStr(this._interpolationConfig.start)
                  ? (this._endToken(
                      [this._processCarriageReturns(i.join(""))],
                      o,
                    ),
                    (i.length = 0),
                    this._consumeInterpolation(r, o, s),
                    this._beginToken(e))
                  : 38 === this._cursor.peek()
                    ? (this._endToken([
                        this._processCarriageReturns(i.join("")),
                      ]),
                      (i.length = 0),
                      this._consumeEntity(e),
                      this._beginToken(e))
                    : i.push(this._readChar());
              }
              this._inInterpolation = !1;
              let a = this._processCarriageReturns(i.join(""));
              return this._endToken([a]), a;
            }
            _consumeInterpolation(e, r, n) {
              let s = [];
              this._beginToken(e, r), s.push(this._interpolationConfig.start);
              let i = this._cursor.clone(),
                a = null,
                o = !1;
              for (; 0 !== this._cursor.peek() && (null === n || !n()); ) {
                let u = this._cursor.clone();
                if (this._isTagStart())
                  return (
                    (this._cursor = u),
                    s.push(this._getProcessedChars(i, u)),
                    void this._endToken(s)
                  );
                if (null === a) {
                  if (this._attemptStr(this._interpolationConfig.end))
                    return (
                      s.push(this._getProcessedChars(i, u)),
                      s.push(this._interpolationConfig.end),
                      void this._endToken(s)
                    );
                  this._attemptStr("//") && (o = !0);
                }
                let p = this._cursor.peek();
                this._cursor.advance(),
                  92 === p
                    ? this._cursor.advance()
                    : p === a
                      ? (a = null)
                      : !o && null === a && dr(p) && (a = p);
              }
              s.push(this._getProcessedChars(i, this._cursor)),
                this._endToken(s);
            }
            _getProcessedChars(e, r) {
              return this._processCarriageReturns(r.getChars(e));
            }
            _isTextEnd() {
              return !!(
                this._isTagStart() ||
                0 === this._cursor.peek() ||
                (this._tokenizeIcu &&
                  !this._inInterpolation &&
                  (this.isExpansionFormStart() ||
                    (125 === this._cursor.peek() &&
                      this._isInExpansionCase()))) ||
                (this._tokenizeBlocks &&
                  !this._inInterpolation &&
                  !this._isInExpansion() &&
                  (this._isBlockStart() || 125 === this._cursor.peek()))
              );
            }
            _isTagStart() {
              if (60 === this._cursor.peek()) {
                let e = this._cursor.clone();
                e.advance();
                let r = e.peek();
                if (
                  (97 <= r && r <= 122) ||
                  (65 <= r && r <= 90) ||
                  47 === r ||
                  33 === r
                )
                  return !0;
              }
              return !1;
            }
            _isBlockStart() {
              if (this._tokenizeBlocks && 64 === this._cursor.peek()) {
                let e = this._cursor.clone();
                if ((e.advance(), xs(e.peek()))) return !0;
              }
              return !1;
            }
            _readUntil(e) {
              let r = this._cursor.clone();
              return this._attemptUntilChar(e), this._cursor.getChars(r);
            }
            _isInExpansion() {
              return this._isInExpansionCase() || this._isInExpansionForm();
            }
            _isInExpansionCase() {
              return (
                this._expansionCaseStack.length > 0 &&
                22 ===
                  this._expansionCaseStack[this._expansionCaseStack.length - 1]
              );
            }
            _isInExpansionForm() {
              return (
                this._expansionCaseStack.length > 0 &&
                20 ===
                  this._expansionCaseStack[this._expansionCaseStack.length - 1]
              );
            }
            isExpansionFormStart() {
              if (123 !== this._cursor.peek()) return !1;
              if (this._interpolationConfig) {
                let e = this._cursor.clone(),
                  r = this._attemptStr(this._interpolationConfig.start);
                return (this._cursor = e), !r;
              }
              return !0;
            }
            _handleFullNameStackForTagOpen(e, r) {
              let n = qe(e, r);
              (0 === this._fullNameStack.length ||
                this._fullNameStack[this._fullNameStack.length - 1] === n) &&
                this._fullNameStack.push(n);
            }
            _handleFullNameStackForTagClose(e, r) {
              let n = qe(e, r);
              0 !== this._fullNameStack.length &&
                this._fullNameStack[this._fullNameStack.length - 1] === n &&
                this._fullNameStack.pop();
            }
          };
        function k(t8) {
          return !wt(t8) || 0 === t8;
        }
        function bs(t8) {
          return (
            wt(t8) ||
            62 === t8 ||
            60 === t8 ||
            47 === t8 ||
            39 === t8 ||
            34 === t8 ||
            61 === t8 ||
            0 === t8
          );
        }
        function so(t8) {
          return (
            (t8 < 97 || 122 < t8) &&
            (t8 < 65 || 90 < t8) &&
            (t8 < 48 || t8 > 57)
          );
        }
        function io(t8) {
          return (
            59 === t8 ||
            0 === t8 ||
            !(function Fn(t8) {
              return (
                (t8 >= 97 && t8 <= 102) || (t8 >= 65 && t8 <= 70) || hr(t8)
              );
            })(t8)
          );
        }
        function ao(t8) {
          return 59 === t8 || 0 === t8 || !bt(t8);
        }
        function Ts(t8) {
          return t8 >= 97 && t8 <= 122 ? t8 - 97 + 65 : t8;
        }
        function xs(t8) {
          return bt(t8) || hr(t8) || 95 === t8;
        }
        function ks(t8) {
          return 59 !== t8 && k(t8);
        }
        var Kt = class t3 {
            constructor(e, r) {
              if (e instanceof t3) {
                (this.file = e.file),
                  (this.input = e.input),
                  (this.end = e.end);
                let n = e.state;
                this.state = {
                  peek: n.peek,
                  offset: n.offset,
                  line: n.line,
                  column: n.column,
                };
              } else {
                if (!r)
                  throw new Error(
                    "Programming error: the range argument must be provided with a file argument.",
                  );
                (this.file = e),
                  (this.input = e.content),
                  (this.end = r.endPos),
                  (this.state = {
                    peek: -1,
                    offset: r.startPos,
                    line: r.startLine,
                    column: r.startCol,
                  });
              }
            }
            clone() {
              return new t3(this);
            }
            peek() {
              return this.state.peek;
            }
            charsLeft() {
              return this.end - this.state.offset;
            }
            diff(e) {
              return this.state.offset - e.state.offset;
            }
            advance() {
              this.advanceState(this.state);
            }
            init() {
              this.updatePeek(this.state);
            }
            getSpan(e, r) {
              let n = (e = e || this);
              if (r)
                for (; this.diff(e) > 0 && -1 !== r.indexOf(e.peek()); )
                  n === e && (e = e.clone()), e.advance();
              let s = this.locationFromCursor(e),
                i = this.locationFromCursor(this),
                a = n !== e ? this.locationFromCursor(n) : s;
              return new f(s, i, a);
            }
            getChars(e) {
              return this.input.substring(e.state.offset, this.state.offset);
            }
            charAt(e) {
              return this.input.charCodeAt(e);
            }
            advanceState(e) {
              if (e.offset >= this.end)
                throw (
                  ((this.state = e), new ht('Unexpected character "EOF"', this))
                );
              let r = this.charAt(e.offset);
              10 === r ? (e.line++, (e.column = 0)) : fr(r) || e.column++,
                e.offset++,
                this.updatePeek(e);
            }
            updatePeek(e) {
              e.peek = e.offset >= this.end ? 0 : this.charAt(e.offset);
            }
            locationFromCursor(e) {
              return new ne(
                e.file,
                e.state.offset,
                e.state.line,
                e.state.column,
              );
            }
          },
          Nr = class t4 extends Kt {
            constructor(e, r) {
              e instanceof t4
                ? (super(e), (this.internalState = { ...e.internalState }))
                : (super(e, r), (this.internalState = this.state));
            }
            advance() {
              (this.state = this.internalState),
                super.advance(),
                this.processEscapeSequence();
            }
            init() {
              super.init(), this.processEscapeSequence();
            }
            clone() {
              return new t4(this);
            }
            getChars(e) {
              let r = e.clone(),
                n = "";
              for (; r.internalState.offset < this.internalState.offset; )
                (n += String.fromCodePoint(r.peek())), r.advance();
              return n;
            }
            processEscapeSequence() {
              let e = () => this.internalState.peek;
              if (92 === e())
                if (
                  ((this.internalState = { ...this.state }),
                  this.advanceState(this.internalState),
                  110 === e())
                )
                  this.state.peek = 10;
                else if (114 === e()) this.state.peek = 13;
                else if (118 === e()) this.state.peek = 11;
                else if (116 === e()) this.state.peek = 9;
                else if (98 === e()) this.state.peek = 8;
                else if (102 === e()) this.state.peek = 12;
                else if (117 === e())
                  if ((this.advanceState(this.internalState), 123 === e())) {
                    this.advanceState(this.internalState);
                    let r = this.clone(),
                      n = 0;
                    for (; 125 !== e(); )
                      this.advanceState(this.internalState), n++;
                    this.state.peek = this.decodeHexDigits(r, n);
                  } else {
                    let r = this.clone();
                    this.advanceState(this.internalState),
                      this.advanceState(this.internalState),
                      this.advanceState(this.internalState),
                      (this.state.peek = this.decodeHexDigits(r, 4));
                  }
                else if (120 === e()) {
                  this.advanceState(this.internalState);
                  let r = this.clone();
                  this.advanceState(this.internalState),
                    (this.state.peek = this.decodeHexDigits(r, 2));
                } else if (mr(e())) {
                  let r = "",
                    n = 0,
                    s = this.clone();
                  for (; mr(e()) && n < 3; )
                    (s = this.clone()),
                      (r += String.fromCodePoint(e())),
                      this.advanceState(this.internalState),
                      n++;
                  (this.state.peek = parseInt(r, 8)),
                    (this.internalState = s.internalState);
                } else
                  fr(this.internalState.peek)
                    ? (this.advanceState(this.internalState),
                      (this.state = this.internalState))
                    : (this.state.peek = this.internalState.peek);
            }
            decodeHexDigits(e, r) {
              let n = this.input.slice(
                  e.internalState.offset,
                  e.internalState.offset + r,
                ),
                s = parseInt(n, 16);
              if (isNaN(s))
                throw (
                  ((e.state = e.internalState),
                  new ht("Invalid hexadecimal escape sequence", e))
                );
              return s;
            }
          },
          ht = class {
            constructor(e, r) {
              (this.msg = e), (this.cursor = r);
            }
          },
          I = class t5 extends Re {
            static create(e, r, n) {
              return new t5(e, r, n);
            }
            constructor(e, r, n) {
              super(r, n), (this.elementName = e);
            }
          },
          $r = class {
            constructor(e, r) {
              (this.rootNodes = e), (this.errors = r);
            }
          },
          Qt = class {
            constructor(e) {
              this.getTagDefinition = e;
            }
            parse(e, r, n, s = !1, i) {
              let a =
                  (D) =>
                  (P2, ...B) =>
                    D(P2.toLowerCase(), ...B),
                o = s ? this.getTagDefinition : a(this.getTagDefinition),
                u = (D) => o(D).getContentType(),
                p = s ? i : a(i),
                m = (function Ps(t8, e, r, n = {}) {
                  let s = new Pr(new Se(t8, e), r, n);
                  return (
                    s.tokenize(),
                    new Fr(
                      (function lo(t8) {
                        let r,
                          e = [];
                        for (let n = 0; n < t8.length; n++) {
                          let s = t8[n];
                          (r && 5 === r.type && 5 === s.type) ||
                          (r && 16 === r.type && 16 === s.type)
                            ? ((r.parts[0] += s.parts[0]),
                              (r.sourceSpan.end = s.sourceSpan.end))
                            : ((r = s), e.push(r));
                        }
                        return e;
                      })(s.tokens),
                      s.errors,
                      s.nonNormalizedIcuExpressions,
                    )
                  );
                })(
                  e,
                  r,
                  i
                    ? (D, P2, B, c) => {
                        let g = p(D, P2, B, c);
                        return void 0 !== g ? g : u(D);
                      }
                    : u,
                  n,
                ),
                d = (n && n.canSelfClose) || !1,
                C = (n && n.allowHtmComponentClosingTags) || !1,
                _2 = new Or(m.tokens, o, d, C, s);
              return (
                _2.build(), new $r(_2.rootNodes, m.errors.concat(_2.errors))
              );
            }
          },
          Or = class t6 {
            constructor(e, r, n, s, i) {
              (this.tokens = e),
                (this.getTagDefinition = r),
                (this.canSelfClose = n),
                (this.allowHtmComponentClosingTags = s),
                (this.isTagNameCaseSensitive = i),
                (this._index = -1),
                (this._containerStack = []),
                (this.rootNodes = []),
                (this.errors = []),
                this._advance();
            }
            build() {
              for (; 30 !== this._peek.type; )
                0 === this._peek.type || 4 === this._peek.type
                  ? this._consumeStartTag(this._advance())
                  : 3 === this._peek.type
                    ? (this._closeVoidElement(),
                      this._consumeEndTag(this._advance()))
                    : 12 === this._peek.type
                      ? (this._closeVoidElement(),
                        this._consumeCdata(this._advance()))
                      : 10 === this._peek.type
                        ? (this._closeVoidElement(),
                          this._consumeComment(this._advance()))
                        : 5 === this._peek.type ||
                            7 === this._peek.type ||
                            6 === this._peek.type
                          ? (this._closeVoidElement(),
                            this._consumeText(this._advance()))
                          : 20 === this._peek.type
                            ? this._consumeExpansion(this._advance())
                            : 25 === this._peek.type
                              ? (this._closeVoidElement(),
                                this._consumeBlockOpen(this._advance()))
                              : 27 === this._peek.type
                                ? (this._closeVoidElement(),
                                  this._consumeBlockClose(this._advance()))
                                : 29 === this._peek.type
                                  ? (this._closeVoidElement(),
                                    this._consumeIncompleteBlock(
                                      this._advance(),
                                    ))
                                  : 18 === this._peek.type
                                    ? this._consumeDocType(this._advance())
                                    : this._advance();
              for (let e of this._containerStack)
                e instanceof J &&
                  this.errors.push(
                    I.create(
                      e.name,
                      e.sourceSpan,
                      `Unclosed block "${e.name}"`,
                    ),
                  );
            }
            _advance() {
              let e = this._peek;
              return (
                this._index < this.tokens.length - 1 && this._index++,
                (this._peek = this.tokens[this._index]),
                e
              );
            }
            _advanceIf(e) {
              return this._peek.type === e ? this._advance() : null;
            }
            _consumeCdata(e) {
              let r = this._advance(),
                n = this._getText(r),
                s = this._advanceIf(13);
              this._addToParent(
                new Mt(n, new f(e.sourceSpan.start, (s || r).sourceSpan.end), [
                  r,
                ]),
              );
            }
            _consumeComment(e) {
              let r = this._advanceIf(7),
                n = this._advanceIf(11),
                s = null != r ? r.parts[0].trim() : null,
                i = new f(e.sourceSpan.start, (n || r || e).sourceSpan.end);
              this._addToParent(new Ut(s, i));
            }
            _consumeDocType(e) {
              let r = this._advanceIf(7),
                n = this._advanceIf(19),
                s = null != r ? r.parts[0].trim() : null,
                i = new f(e.sourceSpan.start, (n || r || e).sourceSpan.end);
              this._addToParent(new Wt(s, i));
            }
            _consumeExpansion(e) {
              let r = this._advance(),
                n = this._advance(),
                s = [];
              for (; 21 === this._peek.type; ) {
                let a = this._parseExpansionCase();
                if (!a) return;
                s.push(a);
              }
              if (24 !== this._peek.type)
                return void this.errors.push(
                  I.create(
                    null,
                    this._peek.sourceSpan,
                    "Invalid ICU message. Missing '}'.",
                  ),
                );
              let i = new f(
                e.sourceSpan.start,
                this._peek.sourceSpan.end,
                e.sourceSpan.fullStart,
              );
              this._addToParent(
                new qt(r.parts[0], n.parts[0], s, i, r.sourceSpan),
              ),
                this._advance();
            }
            _parseExpansionCase() {
              let e = this._advance();
              if (22 !== this._peek.type)
                return (
                  this.errors.push(
                    I.create(
                      null,
                      this._peek.sourceSpan,
                      "Invalid ICU message. Missing '{'.",
                    ),
                  ),
                  null
                );
              let r = this._advance(),
                n = this._collectExpansionExpTokens(r);
              if (!n) return null;
              let s = this._advance();
              n.push({ type: 30, parts: [], sourceSpan: s.sourceSpan });
              let i = new t6(
                n,
                this.getTagDefinition,
                this.canSelfClose,
                this.allowHtmComponentClosingTags,
                this.isTagNameCaseSensitive,
              );
              if ((i.build(), i.errors.length > 0))
                return (this.errors = this.errors.concat(i.errors)), null;
              let a = new f(
                  e.sourceSpan.start,
                  s.sourceSpan.end,
                  e.sourceSpan.fullStart,
                ),
                o = new f(
                  r.sourceSpan.start,
                  s.sourceSpan.end,
                  r.sourceSpan.fullStart,
                );
              return new Ht(e.parts[0], i.rootNodes, a, e.sourceSpan, o);
            }
            _collectExpansionExpTokens(e) {
              let r = [],
                n = [22];
              for (;;) {
                if (
                  ((20 === this._peek.type || 22 === this._peek.type) &&
                    n.push(this._peek.type),
                  23 === this._peek.type)
                ) {
                  if (!Ns(n, 22))
                    return (
                      this.errors.push(
                        I.create(
                          null,
                          e.sourceSpan,
                          "Invalid ICU message. Missing '}'.",
                        ),
                      ),
                      null
                    );
                  if ((n.pop(), 0 === n.length)) return r;
                }
                if (24 === this._peek.type) {
                  if (!Ns(n, 20))
                    return (
                      this.errors.push(
                        I.create(
                          null,
                          e.sourceSpan,
                          "Invalid ICU message. Missing '}'.",
                        ),
                      ),
                      null
                    );
                  n.pop();
                }
                if (30 === this._peek.type)
                  return (
                    this.errors.push(
                      I.create(
                        null,
                        e.sourceSpan,
                        "Invalid ICU message. Missing '}'.",
                      ),
                    ),
                    null
                  );
                r.push(this._advance());
              }
            }
            _getText(e) {
              let r = e.parts[0];
              if (r.length > 0 && "\n" == r[0]) {
                let n = this._getClosestParentElement();
                null != n &&
                  0 == n.children.length &&
                  this.getTagDefinition(n.name).ignoreFirstLf &&
                  (r = r.substring(1));
              }
              return r;
            }
            _consumeText(e) {
              let r = [e],
                n = e.sourceSpan,
                s = e.parts[0];
              if (s.length > 0 && "\n" === s[0]) {
                let i = this._getContainer();
                null != i &&
                  0 === i.children.length &&
                  this.getTagDefinition(i.name).ignoreFirstLf &&
                  ((s = s.substring(1)),
                  (r[0] = {
                    type: e.type,
                    sourceSpan: e.sourceSpan,
                    parts: [s],
                  }));
              }
              for (
                ;
                8 === this._peek.type ||
                5 === this._peek.type ||
                9 === this._peek.type;

              )
                (e = this._advance()),
                  r.push(e),
                  8 === e.type
                    ? (s += e.parts.join("").replace(/&([^;]+);/g, Is))
                    : 9 === e.type
                      ? (s += e.parts[0])
                      : (s += e.parts.join(""));
              if (s.length > 0) {
                let i = e.sourceSpan;
                this._addToParent(
                  new Ot(s, new f(n.start, i.end, n.fullStart, n.details), r),
                );
              }
            }
            _closeVoidElement() {
              let e = this._getContainer();
              e instanceof z &&
                this.getTagDefinition(e.name).isVoid &&
                this._containerStack.pop();
            }
            _consumeStartTag(e) {
              let [r, n] = e.parts,
                s = [];
              for (; 14 === this._peek.type; )
                s.push(this._consumeAttr(this._advance()));
              let i = this._getElementFullName(
                  r,
                  n,
                  this._getClosestParentElement(),
                ),
                a = !1;
              if (2 === this._peek.type) {
                this._advance(), (a = !0);
                let C = this.getTagDefinition(i);
                this.canSelfClose ||
                  C.canSelfClose ||
                  null !== Me(i) ||
                  C.isVoid ||
                  this.errors.push(
                    I.create(
                      i,
                      e.sourceSpan,
                      `Only void, custom and foreign elements can be self closed "${e.parts[1]}"`,
                    ),
                  );
              } else 1 === this._peek.type && (this._advance(), (a = !1));
              let o = this._peek.sourceSpan.fullStart,
                u = new f(e.sourceSpan.start, o, e.sourceSpan.fullStart),
                p = new f(e.sourceSpan.start, o, e.sourceSpan.fullStart),
                l = new f(e.sourceSpan.start.moveBy(1), e.sourceSpan.end),
                m = new z(i, s, [], u, p, void 0, l),
                d = this._getContainer();
              this._pushContainer(
                m,
                d instanceof z &&
                  this.getTagDefinition(d.name).isClosedByChild(m.name),
              ),
                a
                  ? this._popContainer(i, z, u)
                  : 4 === e.type &&
                    (this._popContainer(i, z, null),
                    this.errors.push(
                      I.create(i, u, `Opening tag "${i}" not terminated.`),
                    ));
            }
            _pushContainer(e, r) {
              r && this._containerStack.pop(),
                this._addToParent(e),
                this._containerStack.push(e);
            }
            _consumeEndTag(e) {
              let r =
                this.allowHtmComponentClosingTags && 0 === e.parts.length
                  ? null
                  : this._getElementFullName(
                      e.parts[0],
                      e.parts[1],
                      this._getClosestParentElement(),
                    );
              if (r && this.getTagDefinition(r).isVoid)
                this.errors.push(
                  I.create(
                    r,
                    e.sourceSpan,
                    `Void elements do not have end tags "${e.parts[1]}"`,
                  ),
                );
              else if (!this._popContainer(r, z, e.sourceSpan)) {
                let n = `Unexpected closing tag "${r}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
                this.errors.push(I.create(r, e.sourceSpan, n));
              }
            }
            _popContainer(e, r, n) {
              let s = !1;
              for (let i = this._containerStack.length - 1; i >= 0; i--) {
                let a = this._containerStack[i];
                if (
                  Me(a.name)
                    ? a.name === e
                    : (null == e || a.name.toLowerCase() === e.toLowerCase()) &&
                      a instanceof r
                )
                  return (
                    (a.endSourceSpan = n),
                    (a.sourceSpan.end = null !== n ? n.end : a.sourceSpan.end),
                    this._containerStack.splice(
                      i,
                      this._containerStack.length - i,
                    ),
                    !s
                  );
                (a instanceof J ||
                  (a instanceof z &&
                    !this.getTagDefinition(a.name).closedByParent)) &&
                  (s = !0);
              }
              return !1;
            }
            _consumeAttr(e) {
              let s,
                r = qe(e.parts[0], e.parts[1]),
                n = e.sourceSpan.end;
              15 === this._peek.type && (s = this._advance());
              let o,
                u,
                i = "",
                a = [];
              if (16 === this._peek.type)
                for (
                  o = this._peek.sourceSpan, u = this._peek.sourceSpan.end;
                  16 === this._peek.type ||
                  17 === this._peek.type ||
                  9 === this._peek.type;

                ) {
                  let m = this._advance();
                  a.push(m),
                    17 === m.type
                      ? (i += m.parts.join("").replace(/&([^;]+);/g, Is))
                      : 9 === m.type
                        ? (i += m.parts[0])
                        : (i += m.parts.join("")),
                    (u = n = m.sourceSpan.end);
                }
              15 === this._peek.type &&
                (u = n = this._advance().sourceSpan.end);
              let l =
                o &&
                u &&
                new f(
                  s?.sourceSpan.start ?? o.start,
                  u,
                  s?.sourceSpan.fullStart ?? o.fullStart,
                );
              return new Vt(
                r,
                i,
                new f(e.sourceSpan.start, n, e.sourceSpan.fullStart),
                e.sourceSpan,
                l,
                a.length > 0 ? a : void 0,
                void 0,
              );
            }
            _consumeBlockOpen(e) {
              let r = [];
              for (; 28 === this._peek.type; ) {
                let o = this._advance();
                r.push(new ot(o.parts[0], o.sourceSpan));
              }
              26 === this._peek.type && this._advance();
              let n = this._peek.sourceSpan.fullStart,
                s = new f(e.sourceSpan.start, n, e.sourceSpan.fullStart),
                i = new f(e.sourceSpan.start, n, e.sourceSpan.fullStart),
                a = new J(e.parts[0], r, [], s, i);
              this._pushContainer(a, !1);
            }
            _consumeBlockClose(e) {
              this._popContainer(null, J, e.sourceSpan) ||
                this.errors.push(
                  I.create(
                    null,
                    e.sourceSpan,
                    'Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.',
                  ),
                );
            }
            _consumeIncompleteBlock(e) {
              let r = [];
              for (; 28 === this._peek.type; ) {
                let o = this._advance();
                r.push(new ot(o.parts[0], o.sourceSpan));
              }
              let n = this._peek.sourceSpan.fullStart,
                s = new f(e.sourceSpan.start, n, e.sourceSpan.fullStart),
                i = new f(e.sourceSpan.start, n, e.sourceSpan.fullStart),
                a = new J(e.parts[0], r, [], s, i);
              this._pushContainer(a, !1),
                this._popContainer(null, J, null),
                this.errors.push(
                  I.create(
                    e.parts[0],
                    s,
                    `Incomplete block "${e.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`,
                  ),
                );
            }
            _getContainer() {
              return this._containerStack.length > 0
                ? this._containerStack[this._containerStack.length - 1]
                : null;
            }
            _getClosestParentElement() {
              for (let e = this._containerStack.length - 1; e > -1; e--)
                if (this._containerStack[e] instanceof z)
                  return this._containerStack[e];
              return null;
            }
            _addToParent(e) {
              let r = this._getContainer();
              null === r ? this.rootNodes.push(e) : r.children.push(e);
            }
            _getElementFullName(e, r, n) {
              if (
                "" === e &&
                "" ===
                  (e =
                    this.getTagDefinition(r).implicitNamespacePrefix || "") &&
                null != n
              ) {
                let s = it(n.name)[1];
                this.getTagDefinition(s).preventNamespaceInheritance ||
                  (e = Me(n.name));
              }
              return qe(e, r);
            }
          };
        function Ns(t8, e) {
          return t8.length > 0 && t8[t8.length - 1] === e;
        }
        function Is(t8, e) {
          return void 0 !== Ve[e]
            ? Ve[e] || t8
            : /^#x[a-f0-9]+$/i.test(e)
              ? String.fromCodePoint(parseInt(e.slice(2), 16))
              : /^#\d+$/.test(e)
                ? String.fromCodePoint(parseInt(e.slice(1), 10))
                : t8;
        }
        var Xt = class extends Qt {
            constructor() {
              super(He);
            }
            parse(e, r, n, s = !1, i) {
              return super.parse(e, r, n, s, i);
            }
          },
          Mr = null,
          co = () => (Mr || (Mr = new Xt()), Mr);
        function qr(t8, e = {}) {
          let {
            canSelfClose: r = !1,
            allowHtmComponentClosingTags: n = !1,
            isTagNameCaseSensitive: s = !1,
            getTagContentType: i,
            tokenizeAngularBlocks: a = !1,
          } = e;
          return co().parse(
            t8,
            "angular-html-parser",
            {
              tokenizeExpansionForms: !1,
              interpolationConfig: void 0,
              canSelfClose: r,
              allowHtmComponentClosingTags: n,
              tokenizeBlocks: a,
            },
            s,
            i,
          );
        }
        var po = new RegExp(
          "^(?<startDelimiter>-{3}|\\+{3})(?<language>[^\\n]*)\\n(?:|(?<value>.*?)\\n)(?<endDelimiter>\\k<startDelimiter>|\\.{3})[^\\S\\n]*(?:\\n|$)",
          "s",
        );
        var Rs = function ho(t8) {
          let e = t8.match(po);
          if (!e) return { content: t8 };
          let {
              startDelimiter: r,
              language: n,
              value: s = "",
              endDelimiter: i,
            } = e.groups,
            a = n.trim() || "yaml";
          if (("+++" === r && (a = "toml"), "yaml" !== a && r !== i))
            return { content: t8 };
          let [o] = e;
          return {
            frontMatter: {
              type: "front-matter",
              lang: a,
              value: s,
              startDelimiter: r,
              endDelimiter: i,
              raw: o.replace(/\n$/, ""),
            },
            content: v(!1, o, /[^\n]/g, " ") + t8.slice(o.length),
          };
        };
        var $s = function fo(t8, e) {
            let r = new SyntaxError(
              t8 + " (" + e.loc.start.line + ":" + e.loc.start.column + ")",
            );
            return Object.assign(r, e);
          },
          Os = new Set([
            "a",
            "abbr",
            "acronym",
            "address",
            "applet",
            "area",
            "article",
            "aside",
            "audio",
            "b",
            "base",
            "basefont",
            "bdi",
            "bdo",
            "bgsound",
            "big",
            "blink",
            "blockquote",
            "body",
            "br",
            "button",
            "canvas",
            "caption",
            "center",
            "cite",
            "code",
            "col",
            "colgroup",
            "command",
            "content",
            "data",
            "datalist",
            "dd",
            "del",
            "details",
            "dfn",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "element",
            "em",
            "embed",
            "fieldset",
            "figcaption",
            "figure",
            "font",
            "footer",
            "form",
            "frame",
            "frameset",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hgroup",
            "hr",
            "html",
            "i",
            "iframe",
            "image",
            "img",
            "input",
            "ins",
            "isindex",
            "kbd",
            "keygen",
            "label",
            "legend",
            "li",
            "link",
            "listing",
            "main",
            "map",
            "mark",
            "marquee",
            "math",
            "menu",
            "menuitem",
            "meta",
            "meter",
            "multicol",
            "nav",
            "nextid",
            "nobr",
            "noembed",
            "noframes",
            "noscript",
            "object",
            "ol",
            "optgroup",
            "option",
            "output",
            "p",
            "param",
            "picture",
            "plaintext",
            "pre",
            "progress",
            "q",
            "rb",
            "rbc",
            "rp",
            "rt",
            "rtc",
            "ruby",
            "s",
            "samp",
            "script",
            "search",
            "section",
            "select",
            "shadow",
            "slot",
            "small",
            "source",
            "spacer",
            "span",
            "strike",
            "strong",
            "style",
            "sub",
            "summary",
            "sup",
            "svg",
            "table",
            "tbody",
            "td",
            "template",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "title",
            "tr",
            "track",
            "tt",
            "u",
            "ul",
            "var",
            "video",
            "wbr",
            "xmp",
          ]),
          Jt = new Map([
            [
              "*",
              new Set([
                "accesskey",
                "autocapitalize",
                "autofocus",
                "class",
                "contenteditable",
                "dir",
                "draggable",
                "enterkeyhint",
                "hidden",
                "id",
                "inert",
                "inputmode",
                "is",
                "itemid",
                "itemprop",
                "itemref",
                "itemscope",
                "itemtype",
                "lang",
                "nonce",
                "popover",
                "slot",
                "spellcheck",
                "style",
                "tabindex",
                "title",
                "translate",
              ]),
            ],
            [
              "a",
              new Set([
                "charset",
                "coords",
                "download",
                "href",
                "hreflang",
                "name",
                "ping",
                "referrerpolicy",
                "rel",
                "rev",
                "shape",
                "target",
                "type",
              ]),
            ],
            [
              "applet",
              new Set([
                "align",
                "alt",
                "archive",
                "code",
                "codebase",
                "height",
                "hspace",
                "name",
                "object",
                "vspace",
                "width",
              ]),
            ],
            [
              "area",
              new Set([
                "alt",
                "coords",
                "download",
                "href",
                "hreflang",
                "nohref",
                "ping",
                "referrerpolicy",
                "rel",
                "shape",
                "target",
                "type",
              ]),
            ],
            [
              "audio",
              new Set([
                "autoplay",
                "controls",
                "crossorigin",
                "loop",
                "muted",
                "preload",
                "src",
              ]),
            ],
            ["base", new Set(["href", "target"])],
            ["basefont", new Set(["color", "face", "size"])],
            ["blockquote", new Set(["cite"])],
            [
              "body",
              new Set([
                "alink",
                "background",
                "bgcolor",
                "link",
                "text",
                "vlink",
              ]),
            ],
            ["br", new Set(["clear"])],
            [
              "button",
              new Set([
                "disabled",
                "form",
                "formaction",
                "formenctype",
                "formmethod",
                "formnovalidate",
                "formtarget",
                "name",
                "popovertarget",
                "popovertargetaction",
                "type",
                "value",
              ]),
            ],
            ["canvas", new Set(["height", "width"])],
            ["caption", new Set(["align"])],
            [
              "col",
              new Set(["align", "char", "charoff", "span", "valign", "width"]),
            ],
            [
              "colgroup",
              new Set(["align", "char", "charoff", "span", "valign", "width"]),
            ],
            ["data", new Set(["value"])],
            ["del", new Set(["cite", "datetime"])],
            ["details", new Set(["name", "open"])],
            ["dialog", new Set(["open"])],
            ["dir", new Set(["compact"])],
            ["div", new Set(["align"])],
            ["dl", new Set(["compact"])],
            ["embed", new Set(["height", "src", "type", "width"])],
            ["fieldset", new Set(["disabled", "form", "name"])],
            ["font", new Set(["color", "face", "size"])],
            [
              "form",
              new Set([
                "accept",
                "accept-charset",
                "action",
                "autocomplete",
                "enctype",
                "method",
                "name",
                "novalidate",
                "target",
              ]),
            ],
            [
              "frame",
              new Set([
                "frameborder",
                "longdesc",
                "marginheight",
                "marginwidth",
                "name",
                "noresize",
                "scrolling",
                "src",
              ]),
            ],
            ["frameset", new Set(["cols", "rows"])],
            ["h1", new Set(["align"])],
            ["h2", new Set(["align"])],
            ["h3", new Set(["align"])],
            ["h4", new Set(["align"])],
            ["h5", new Set(["align"])],
            ["h6", new Set(["align"])],
            ["head", new Set(["profile"])],
            ["hr", new Set(["align", "noshade", "size", "width"])],
            ["html", new Set(["manifest", "version"])],
            [
              "iframe",
              new Set([
                "align",
                "allow",
                "allowfullscreen",
                "allowpaymentrequest",
                "allowusermedia",
                "frameborder",
                "height",
                "loading",
                "longdesc",
                "marginheight",
                "marginwidth",
                "name",
                "referrerpolicy",
                "sandbox",
                "scrolling",
                "src",
                "srcdoc",
                "width",
              ]),
            ],
            [
              "img",
              new Set([
                "align",
                "alt",
                "border",
                "crossorigin",
                "decoding",
                "fetchpriority",
                "height",
                "hspace",
                "ismap",
                "loading",
                "longdesc",
                "name",
                "referrerpolicy",
                "sizes",
                "src",
                "srcset",
                "usemap",
                "vspace",
                "width",
              ]),
            ],
            [
              "input",
              new Set([
                "accept",
                "align",
                "alt",
                "autocomplete",
                "checked",
                "dirname",
                "disabled",
                "form",
                "formaction",
                "formenctype",
                "formmethod",
                "formnovalidate",
                "formtarget",
                "height",
                "ismap",
                "list",
                "max",
                "maxlength",
                "min",
                "minlength",
                "multiple",
                "name",
                "pattern",
                "placeholder",
                "popovertarget",
                "popovertargetaction",
                "readonly",
                "required",
                "size",
                "src",
                "step",
                "type",
                "usemap",
                "value",
                "width",
              ]),
            ],
            ["ins", new Set(["cite", "datetime"])],
            ["isindex", new Set(["prompt"])],
            ["label", new Set(["for", "form"])],
            ["legend", new Set(["align"])],
            ["li", new Set(["type", "value"])],
            [
              "link",
              new Set([
                "as",
                "blocking",
                "charset",
                "color",
                "crossorigin",
                "disabled",
                "fetchpriority",
                "href",
                "hreflang",
                "imagesizes",
                "imagesrcset",
                "integrity",
                "media",
                "referrerpolicy",
                "rel",
                "rev",
                "sizes",
                "target",
                "type",
              ]),
            ],
            ["map", new Set(["name"])],
            ["menu", new Set(["compact"])],
            [
              "meta",
              new Set([
                "charset",
                "content",
                "http-equiv",
                "media",
                "name",
                "scheme",
              ]),
            ],
            [
              "meter",
              new Set(["high", "low", "max", "min", "optimum", "value"]),
            ],
            [
              "object",
              new Set([
                "align",
                "archive",
                "border",
                "classid",
                "codebase",
                "codetype",
                "data",
                "declare",
                "form",
                "height",
                "hspace",
                "name",
                "standby",
                "type",
                "typemustmatch",
                "usemap",
                "vspace",
                "width",
              ]),
            ],
            ["ol", new Set(["compact", "reversed", "start", "type"])],
            ["optgroup", new Set(["disabled", "label"])],
            ["option", new Set(["disabled", "label", "selected", "value"])],
            ["output", new Set(["for", "form", "name"])],
            ["p", new Set(["align"])],
            ["param", new Set(["name", "type", "value", "valuetype"])],
            ["pre", new Set(["width"])],
            ["progress", new Set(["max", "value"])],
            ["q", new Set(["cite"])],
            [
              "script",
              new Set([
                "async",
                "blocking",
                "charset",
                "crossorigin",
                "defer",
                "fetchpriority",
                "integrity",
                "language",
                "nomodule",
                "referrerpolicy",
                "src",
                "type",
              ]),
            ],
            [
              "select",
              new Set([
                "autocomplete",
                "disabled",
                "form",
                "multiple",
                "name",
                "required",
                "size",
              ]),
            ],
            ["slot", new Set(["name"])],
            [
              "source",
              new Set([
                "height",
                "media",
                "sizes",
                "src",
                "srcset",
                "type",
                "width",
              ]),
            ],
            ["style", new Set(["blocking", "media", "type"])],
            [
              "table",
              new Set([
                "align",
                "bgcolor",
                "border",
                "cellpadding",
                "cellspacing",
                "frame",
                "rules",
                "summary",
                "width",
              ]),
            ],
            ["tbody", new Set(["align", "char", "charoff", "valign"])],
            [
              "td",
              new Set([
                "abbr",
                "align",
                "axis",
                "bgcolor",
                "char",
                "charoff",
                "colspan",
                "headers",
                "height",
                "nowrap",
                "rowspan",
                "scope",
                "valign",
                "width",
              ]),
            ],
            [
              "template",
              new Set(["shadowrootdelegatesfocus", "shadowrootmode"]),
            ],
            [
              "textarea",
              new Set([
                "autocomplete",
                "cols",
                "dirname",
                "disabled",
                "form",
                "maxlength",
                "minlength",
                "name",
                "placeholder",
                "readonly",
                "required",
                "rows",
                "wrap",
              ]),
            ],
            ["tfoot", new Set(["align", "char", "charoff", "valign"])],
            [
              "th",
              new Set([
                "abbr",
                "align",
                "axis",
                "bgcolor",
                "char",
                "charoff",
                "colspan",
                "headers",
                "height",
                "nowrap",
                "rowspan",
                "scope",
                "valign",
                "width",
              ]),
            ],
            ["thead", new Set(["align", "char", "charoff", "valign"])],
            ["time", new Set(["datetime"])],
            ["tr", new Set(["align", "bgcolor", "char", "charoff", "valign"])],
            ["track", new Set(["default", "kind", "label", "src", "srclang"])],
            ["ul", new Set(["compact", "type"])],
            [
              "video",
              new Set([
                "autoplay",
                "controls",
                "crossorigin",
                "height",
                "loop",
                "muted",
                "playsinline",
                "poster",
                "preload",
                "src",
                "width",
              ]),
            ],
          ]),
          Zt = { attrs: !0, children: !0 },
          Ms = new Set(["parent"]),
          er = class t7 {
            constructor(e = {}) {
              for (let r of new Set([...Ms, ...Object.keys(e)]))
                this.setProperty(r, e[r]);
            }
            setProperty(e, r) {
              if (this[e] !== r) {
                if (
                  (e in Zt && (r = r.map((n) => this.createChild(n))),
                  !Ms.has(e))
                )
                  return void (this[e] = r);
                Object.defineProperty(this, e, {
                  value: r,
                  enumerable: !1,
                  configurable: !0,
                });
              }
            }
            map(e) {
              let r;
              for (let n in Zt) {
                let s = this[n];
                if (s) {
                  let i = mo(s, (a) => a.map(e));
                  r !== s &&
                    (r || (r = new t7({ parent: this.parent })),
                    r.setProperty(n, i));
                }
              }
              if (r) for (let n in this) n in Zt || (r[n] = this[n]);
              return e(r || this);
            }
            walk(e) {
              for (let r in Zt) {
                let n = this[r];
                if (n) for (let s = 0; s < n.length; s++) n[s].walk(e);
              }
              e(this);
            }
            createChild(e) {
              let r = e instanceof t7 ? e.clone() : new t7(e);
              return r.setProperty("parent", this), r;
            }
            insertChildBefore(e, r) {
              this.children.splice(
                this.children.indexOf(e),
                0,
                this.createChild(r),
              );
            }
            removeChild(e) {
              this.children.splice(this.children.indexOf(e), 1);
            }
            replaceChild(e, r) {
              this.children[this.children.indexOf(e)] = this.createChild(r);
            }
            clone() {
              return new t7(this);
            }
            get firstChild() {
              var e;
              return null == (e = this.children) ? void 0 : e[0];
            }
            get lastChild() {
              var e;
              return null == (e = this.children)
                ? void 0
                : e[this.children.length - 1];
            }
            get prev() {
              var e;
              return null == (e = this.parent)
                ? void 0
                : e.children[this.parent.children.indexOf(this) - 1];
            }
            get next() {
              var e;
              return null == (e = this.parent)
                ? void 0
                : e.children[this.parent.children.indexOf(this) + 1];
            }
            get rawName() {
              return this.hasExplicitNamespace ? this.fullName : this.name;
            }
            get fullName() {
              return this.namespace
                ? this.namespace + ":" + this.name
                : this.name;
            }
            get attrMap() {
              return Object.fromEntries(
                this.attrs.map((e) => [e.fullName, e.value]),
              );
            }
          };
        function mo(t8, e) {
          let r = t8.map(e);
          return r.some((n, s) => n !== t8[s]) ? r : t8;
        }
        var go = [
          {
            regex: /^(\[if([^\]]*)]>)(.*?)<!\s*\[endif]$/s,
            parse: function Co(t8, e, r) {
              let [, n, s, i] = r,
                a = 4 + n.length,
                o = t8.sourceSpan.start.moveBy(a),
                u = o.moveBy(i.length),
                [p, l] = (() => {
                  try {
                    return [!0, e(i, o).children];
                  } catch {
                    return [
                      !1,
                      [{ type: "text", value: i, sourceSpan: new f(o, u) }],
                    ];
                  }
                })();
              return {
                type: "ieConditionalComment",
                complete: p,
                children: l,
                condition: v(!1, s.trim(), /\s+/g, " "),
                sourceSpan: t8.sourceSpan,
                startSourceSpan: new f(t8.sourceSpan.start, o),
                endSourceSpan: new f(u, t8.sourceSpan.end),
              };
            },
          },
          {
            regex: /^\[if([^\]]*)]><!$/,
            parse: function So(t8, e, r) {
              let [, n] = r;
              return {
                type: "ieConditionalStartComment",
                condition: v(!1, n.trim(), /\s+/g, " "),
                sourceSpan: t8.sourceSpan,
              };
            },
          },
          {
            regex: /^<!\s*\[endif]$/,
            parse: function _o(t8) {
              return {
                type: "ieConditionalEndComment",
                sourceSpan: t8.sourceSpan,
              };
            },
          },
        ];
        function Vs(t8, e, r) {
          let {
              name: n,
              canSelfClose: s = !0,
              normalizeTagName: i = !1,
              normalizeAttributeName: a = !1,
              allowHtmComponentClosingTags: o = !1,
              isTagNameCaseSensitive: u = !1,
              shouldParseAsRawText: p,
            } = e,
            { rootNodes: l, errors: m } = qr(t8, {
              canSelfClose: s,
              allowHtmComponentClosingTags: o,
              isTagNameCaseSensitive: u,
              getTagContentType: p
                ? (...c) => (p(...c) ? F.RAW_TEXT : void 0)
                : void 0,
              tokenizeAngularBlocks: "angular" === n || void 0,
            });
          if ("vue" === n) {
            if (
              l.some(
                (w2) =>
                  ("docType" === w2.type && "html" === w2.value) ||
                  ("element" === w2.type && "html" === w2.name.toLowerCase()),
              )
            )
              return Vs(t8, Ws, r);
            let g,
              y2 = () =>
                g ??
                (g = qr(t8, {
                  canSelfClose: s,
                  allowHtmComponentClosingTags: o,
                  isTagNameCaseSensitive: u,
                })),
              $ = (w2) =>
                y2().rootNodes.find(
                  ({ startSourceSpan: q2 }) =>
                    q2 && q2.start.offset === w2.startSourceSpan.start.offset,
                ) ?? w2;
            for (let [w2, q2] of l.entries()) {
              let { endSourceSpan: Wr2, startSourceSpan: js } = q2;
              if (null === Wr2) (m = y2().errors), (l[w2] = $(q2));
              else if (Ao(q2, r)) {
                let zr2 = y2().errors.find(
                  (Gr2) =>
                    Gr2.span.start.offset > js.start.offset &&
                    Gr2.span.start.offset < Wr2.end.offset,
                );
                zr2 && Hs(zr2), (l[w2] = $(q2));
              }
            }
          }
          m.length > 0 && Hs(m[0]);
          let d = (c) => {
              let g = c.name.startsWith(":")
                  ? c.name.slice(1).split(":")[0]
                  : null,
                y2 = c.nameSpan.toString(),
                $ = null !== g && y2.startsWith(`${g}:`),
                w2 = $ ? y2.slice(g.length + 1) : y2;
              (c.name = w2), (c.namespace = g), (c.hasExplicitNamespace = $);
            },
            _2 = (c, g) => {
              let y2 = c.toLowerCase();
              return g(y2) ? y2 : c;
            };
          return (
            zt(
              new (class extends ut {
                visit(c) {
                  ((c) => {
                    switch (c.type) {
                      case "element":
                        d(c);
                        for (let g of c.attrs)
                          d(g),
                            g.valueSpan
                              ? ((g.value = g.valueSpan.toString()),
                                /["']/.test(g.value[0]) &&
                                  (g.value = g.value.slice(1, -1)))
                              : (g.value = null);
                        break;
                      case "comment":
                        c.value = c.sourceSpan.toString().slice(4, -3);
                        break;
                      case "text":
                        c.value = c.sourceSpan.toString();
                    }
                  })(c),
                    ((c) => {
                      if ("element" === c.type) {
                        let g = He(u ? c.name : c.name.toLowerCase());
                        !c.namespace ||
                        c.namespace === g.implicitNamespacePrefix ||
                        de(c)
                          ? (c.tagDefinition = g)
                          : (c.tagDefinition = He(""));
                      }
                    })(c),
                    ((c) => {
                      if (
                        "element" === c.type &&
                        (i &&
                          (!c.namespace ||
                            c.namespace ===
                              c.tagDefinition.implicitNamespacePrefix ||
                            de(c)) &&
                          (c.name = _2(c.name, (g) => Os.has(g))),
                        a)
                      )
                        for (let g of c.attrs)
                          g.namespace ||
                            (g.name = _2(
                              g.name,
                              (y2) =>
                                Jt.has(c.name) &&
                                (Jt.get("*").has(y2) || Jt.get(c.name).has(y2)),
                            ));
                    })(c),
                    ((c) => {
                      c.sourceSpan &&
                        c.endSourceSpan &&
                        (c.sourceSpan = new f(
                          c.sourceSpan.start,
                          c.endSourceSpan.end,
                        ));
                    })(c);
                }
              })(),
              l,
            ),
            l
          );
        }
        function Ao(t8, e) {
          var n;
          if ("element" !== t8.type || "template" !== t8.name) return !1;
          let r =
            null == (n = t8.attrs.find((s) => "lang" === s.name))
              ? void 0
              : n.value;
          return !r || "html" === Ne(e, { language: r });
        }
        function Hs(t8) {
          let {
            msg: e,
            span: { start: r, end: n },
          } = t8;
          throw $s(e, {
            loc: {
              start: { line: r.line + 1, column: r.col + 1 },
              end: { line: n.line + 1, column: n.col + 1 },
            },
            cause: t8,
          });
        }
        function Us(t8, e, r = {}, n = !0) {
          let { frontMatter: s, content: i } = n
              ? Rs(t8)
              : { frontMatter: null, content: t8 },
            a = new Se(t8, r.filepath),
            o = new ne(a, 0, 0, 0),
            u = o.moveBy(t8.length),
            p = {
              type: "root",
              sourceSpan: new f(o, u),
              children: Vs(i, e, r),
            };
          if (s) {
            let d = new ne(a, 0, 0, 0),
              C = d.moveBy(s.raw.length);
            (s.sourceSpan = new f(d, C)), p.children.unshift(s);
          }
          let l = new er(p),
            m = (d, C) => {
              let { offset: _2 } = C,
                B = Us(v(!1, t8.slice(0, _2), /[^\n\r]/g, " ") + d, e, r, !1);
              B.sourceSpan = new f(C, me(!1, B.children, -1).sourceSpan.end);
              let c = B.children[0];
              return (
                c.length === _2
                  ? B.children.shift()
                  : ((c.sourceSpan = new f(
                      c.sourceSpan.start.moveBy(_2),
                      c.sourceSpan.end,
                    )),
                    (c.value = c.value.slice(_2))),
                B
              );
            };
          return (
            l.walk((d) => {
              if ("comment" === d.type) {
                let C = (function qs(t8, e) {
                  if (t8.value)
                    for (let { regex: r, parse: n } of go) {
                      let s = t8.value.match(r);
                      if (s) return n(t8, e, s);
                    }
                  return null;
                })(d, m);
                C && d.parent.replaceChild(d, C);
              }
              !(function Eo(t8) {
                if ("block" === t8.type) {
                  if (
                    ((t8.name = v(
                      !1,
                      t8.name.toLowerCase(),
                      /\s+/g,
                      " ",
                    ).trim()),
                    (t8.type = "angularControlFlowBlock"),
                    !xt(t8.parameters))
                  )
                    return void delete t8.parameters;
                  for (let e of t8.parameters)
                    e.type = "angularControlFlowBlockParameter";
                  t8.parameters = {
                    type: "angularControlFlowBlockParameters",
                    children: t8.parameters,
                    sourceSpan: new f(
                      t8.parameters[0].sourceSpan.start,
                      me(!1, t8.parameters, -1).sourceSpan.end,
                    ),
                  };
                }
              })(d);
            }),
            l
          );
        }
        function tr(t8) {
          return {
            parse: (e, r) => Us(e, t8, r),
            hasPragma: Rn,
            astFormat: "html",
            locStart: se,
            locEnd: ie,
          };
        }
        var Ws = {
            name: "html",
            normalizeTagName: !0,
            normalizeAttributeName: !0,
            allowHtmComponentClosingTags: !0,
          },
          Do = tr(Ws),
          vo = tr({ name: "angular" }),
          yo = tr({
            name: "vue",
            isTagNameCaseSensitive: !0,
            shouldParseAsRawText: (t8, e, r, n) =>
              "html" !== t8.toLowerCase() &&
              !r &&
              ("template" !== t8 ||
                n.some(
                  ({ name: s, value: i }) =>
                    "lang" === s && "html" !== i && "" !== i && void 0 !== i,
                )),
          }),
          wo = tr({ name: "lwc", canSelfClose: !1 }),
          zs = [
            {
              linguistLanguageId: 146,
              name: "Angular",
              type: "markup",
              tmScope: "text.html.basic",
              aceMode: "html",
              codemirrorMode: "htmlmixed",
              codemirrorMimeType: "text/html",
              color: "#e34c26",
              aliases: ["xhtml"],
              extensions: [".component.html"],
              parsers: ["angular"],
              vscodeLanguageIds: ["html"],
              filenames: [],
            },
            {
              linguistLanguageId: 146,
              name: "HTML",
              type: "markup",
              tmScope: "text.html.basic",
              aceMode: "html",
              codemirrorMode: "htmlmixed",
              codemirrorMimeType: "text/html",
              color: "#e34c26",
              aliases: ["xhtml"],
              extensions: [
                ".html",
                ".hta",
                ".htm",
                ".html.hl",
                ".inc",
                ".xht",
                ".xhtml",
                ".mjml",
              ],
              parsers: ["html"],
              vscodeLanguageIds: ["html"],
            },
            {
              linguistLanguageId: 146,
              name: "Lightning Web Components",
              type: "markup",
              tmScope: "text.html.basic",
              aceMode: "html",
              codemirrorMode: "htmlmixed",
              codemirrorMimeType: "text/html",
              color: "#e34c26",
              aliases: ["xhtml"],
              extensions: [],
              parsers: ["lwc"],
              vscodeLanguageIds: ["html"],
              filenames: [],
            },
            {
              linguistLanguageId: 391,
              name: "Vue",
              type: "markup",
              color: "#41b883",
              extensions: [".vue"],
              tmScope: "text.html.vue",
              aceMode: "html",
              parsers: ["vue"],
              vscodeLanguageIds: ["vue"],
            },
          ],
          Vr = {
            bracketSpacing: {
              category: "Common",
              type: "boolean",
              default: !0,
              description: "Print spaces between brackets.",
              oppositeDescription: "Do not print spaces between brackets.",
            },
            singleQuote: {
              category: "Common",
              type: "boolean",
              default: !1,
              description: "Use single quotes instead of double quotes.",
            },
            proseWrap: {
              category: "Common",
              type: "choice",
              default: "preserve",
              description: "How to wrap prose.",
              choices: [
                {
                  value: "always",
                  description: "Wrap prose if it exceeds the print width.",
                },
                { value: "never", description: "Do not wrap prose." },
                { value: "preserve", description: "Wrap prose as-is." },
              ],
            },
            bracketSameLine: {
              category: "Common",
              type: "boolean",
              default: !1,
              description:
                "Put > of opening tags on the last line instead of on a new line.",
            },
            singleAttributePerLine: {
              category: "Common",
              type: "boolean",
              default: !1,
              description:
                "Enforce single attribute per line in HTML, Vue and JSX.",
            },
          },
          Ys = {
            bracketSameLine: Vr.bracketSameLine,
            htmlWhitespaceSensitivity: {
              category: "HTML",
              type: "choice",
              default: "css",
              description: "How to handle whitespaces in HTML.",
              choices: [
                {
                  value: "css",
                  description:
                    "Respect the default value of CSS display property.",
                },
                {
                  value: "strict",
                  description: "Whitespaces are considered sensitive.",
                },
                {
                  value: "ignore",
                  description: "Whitespaces are considered insensitive.",
                },
              ],
            },
            singleAttributePerLine: Vr.singleAttributePerLine,
            vueIndentScriptAndStyle: {
              category: "HTML",
              type: "boolean",
              default: !1,
              description: "Indent script and style tags in Vue files.",
            },
          },
          To = { html: fs },
          dh = Ur,
          lu = Object.create,
          $e2 = Object.defineProperty,
          fu = Object.getOwnPropertyDescriptor,
          Fu = Object.getOwnPropertyNames,
          pu = Object.getPrototypeOf,
          du = Object.prototype.hasOwnProperty,
          Me2 = (e, t8) => () => (
            t8 || e((t8 = { exports: {} }).exports, t8), t8.exports
          ),
          We = (e, t8) => {
            for (var r in t8) $e2(e, r, { get: t8[r], enumerable: !0 });
          },
          nr2 = (e, t8, r, n) => {
            if ((t8 && "object" == typeof t8) || "function" == typeof t8)
              for (let o of Fu(t8))
                !du.call(e, o) &&
                  o !== r &&
                  $e2(e, o, {
                    get: () => t8[o],
                    enumerable: !(n = fu(t8, o)) || n.enumerable,
                  });
            return e;
          },
          he2 = (e, t8, r) => (
            (r = null != e ? lu(pu(e)) : {}),
            nr2(
              !t8 && e && e.__esModule
                ? r
                : $e2(r, "default", { value: e, enumerable: !0 }),
              e,
            )
          ),
          ht2 = (e, t8, r) => {
            if (t8.has(e))
              throw TypeError(
                "Cannot add the same private member more than once",
              );
            t8 instanceof WeakSet ? t8.add(e) : t8.set(e, r);
          },
          ce2 = (e, t8, r) => (
            ((e, t8, r) => {
              if (!t8.has(e)) throw TypeError("Cannot " + r);
            })(e, t8, "access private method"),
            r
          ),
          or2 = Me2((gt2) => {
            function ur2() {}
            function gu(e, t8, r, n, o) {
              for (var u = 0, i = t8.length, s = 0, D = 0; u < i; u++) {
                var a = t8[u];
                if (a.removed) {
                  if (
                    ((a.value = e.join(n.slice(D, D + a.count))),
                    (D += a.count),
                    u && t8[u - 1].added)
                  ) {
                    var d = t8[u - 1];
                    (t8[u - 1] = t8[u]), (t8[u] = d);
                  }
                } else {
                  if (!a.added && o) {
                    var c = r.slice(s, s + a.count);
                    (c = c.map(function (p, l) {
                      var F2 = n[D + l];
                      return F2.length > p.length ? F2 : p;
                    })),
                      (a.value = e.join(c));
                  } else a.value = e.join(r.slice(s, s + a.count));
                  (s += a.count), a.added || (D += a.count);
                }
              }
              var f2 = t8[i - 1];
              return (
                i > 1 &&
                  "string" == typeof f2.value &&
                  (f2.added || f2.removed) &&
                  e.equals("", f2.value) &&
                  ((t8[i - 2].value += f2.value), t8.pop()),
                t8
              );
            }
            Object.defineProperty(gt2, "__esModule", { value: !0 }),
              (gt2.default = ur2),
              (ur2.prototype = {
                diff: function (t8, r) {
                  var n =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {},
                    o = n.callback;
                  "function" == typeof n && ((o = n), (n = {})),
                    (this.options = n);
                  var u = this;
                  function i(F2) {
                    return o
                      ? (setTimeout(function () {
                          o(void 0, F2);
                        }, 0),
                        !0)
                      : F2;
                  }
                  (t8 = this.castInput(t8)),
                    (r = this.castInput(r)),
                    (t8 = this.removeEmpty(this.tokenize(t8)));
                  var s = (r = this.removeEmpty(this.tokenize(r))).length,
                    D = t8.length,
                    a = 1,
                    c = s + D;
                  n.maxEditLength && (c = Math.min(c, n.maxEditLength));
                  var d = [{ newPos: -1, components: [] }],
                    f2 = this.extractCommon(d[0], r, t8, 0);
                  if (d[0].newPos + 1 >= s && f2 + 1 >= D)
                    return i([{ value: this.join(r), count: r.length }]);
                  function p() {
                    for (var F2 = -1 * a; F2 <= a; F2 += 2) {
                      var m = void 0,
                        E2 = d[F2 - 1],
                        C = d[F2 + 1],
                        g = (C ? C.newPos : 0) - F2;
                      E2 && (d[F2 - 1] = void 0);
                      var h2 = E2 && E2.newPos + 1 < s,
                        B = C && 0 <= g && g < D;
                      if (h2 || B) {
                        if (
                          (!h2 || (B && E2.newPos < C.newPos)
                            ? ((m = {
                                newPos: (e = C).newPos,
                                components: e.components.slice(0),
                              }),
                              u.pushComponent(m.components, void 0, !0))
                            : ((m = E2).newPos++,
                              u.pushComponent(m.components, !0, void 0)),
                          (g = u.extractCommon(m, r, t8, F2)),
                          m.newPos + 1 >= s && g + 1 >= D)
                        )
                          return i(
                            gu(u, m.components, r, t8, u.useLongestToken),
                          );
                        d[F2] = m;
                      } else d[F2] = void 0;
                    }
                    var e;
                    a++;
                  }
                  if (o)
                    !(function F2() {
                      setTimeout(function () {
                        if (a > c) return o();
                        p() || F2();
                      }, 0);
                    })();
                  else
                    for (; a <= c; ) {
                      var l = p();
                      if (l) return l;
                    }
                },
                pushComponent: function (t8, r, n) {
                  var o = t8[t8.length - 1];
                  o && o.added === r && o.removed === n
                    ? (t8[t8.length - 1] = {
                        count: o.count + 1,
                        added: r,
                        removed: n,
                      })
                    : t8.push({ count: 1, added: r, removed: n });
                },
                extractCommon: function (t8, r, n, o) {
                  for (
                    var u = r.length,
                      i = n.length,
                      s = t8.newPos,
                      D = s - o,
                      a = 0;
                    s + 1 < u && D + 1 < i && this.equals(r[s + 1], n[D + 1]);

                  )
                    s++, D++, a++;
                  return (
                    a && t8.components.push({ count: a }), (t8.newPos = s), D
                  );
                },
                equals: function (t8, r) {
                  return this.options.comparator
                    ? this.options.comparator(t8, r)
                    : t8 === r ||
                        (this.options.ignoreCase &&
                          t8.toLowerCase() === r.toLowerCase());
                },
                removeEmpty: function (t8) {
                  for (var r = [], n = 0; n < t8.length; n++)
                    t8[n] && r.push(t8[n]);
                  return r;
                },
                castInput: function (t8) {
                  return t8;
                },
                tokenize: function (t8) {
                  return t8.split("");
                },
                join: function (t8) {
                  return t8.join("");
                },
              });
          }),
          ir2 = Me2((ye) => {
            Object.defineProperty(ye, "__esModule", { value: !0 }),
              (ye.diffArrays = function _u(e, t8, r) {
                return ge2.diff(e, t8, r);
              }),
              (ye.arrayDiff = void 0);
            var ge2 = new ((function Bu(e) {
              return e && e.__esModule ? e : { default: e };
            })(or2()).default)();
            (ye.arrayDiff = ge2),
              (ge2.tokenize = function (e) {
                return e.slice();
              }),
              (ge2.join = ge2.removeEmpty =
                function (e) {
                  return e;
                });
          }),
          Pe2 = Me2((ps2, jr2) => {
            var Yr2 = new Proxy(String, { get: () => Yr2 });
            jr2.exports = Yr2;
          }),
          Fn2 = {};
        We(Fn2, { default: () => uo2, shouldHighlight: () => no2 });
        var no2,
          uo2,
          pn2 = ((e, t8) => () => (e && (t8 = e((e = 0))), t8))(() => {
            (no2 = () => !1), (uo2 = String);
          }),
          yn2 = Me2((Ft2) => {
            Object.defineProperty(Ft2, "__esModule", { value: !0 }),
              (Ft2.codeFrameColumns = gn2),
              (Ft2.default = function ao2(e, t8, r, n = {}) {
                if (!En2) {
                  En2 = !0;
                  let u =
                    "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
                  (new Error(u).name = "DeprecationWarning"),
                    console.warn(new Error(u));
                }
                return (
                  (r = Math.max(r, 0)),
                  gn2(e, { start: { column: r, line: t8 } }, n)
                );
              });
            var e,
              jt2,
              dn2 =
                (pn2(),
                (e = Fn2),
                nr2($e2({}, "__esModule", { value: !0 }), e)),
              mn2 = (function oo2(e, t8) {
                if (!t8 && e && e.__esModule) return e;
                if (
                  null === e ||
                  ("object" != typeof e && "function" != typeof e)
                )
                  return { default: e };
                var r = hn2(t8);
                if (r && r.has(e)) return r.get(e);
                var n = { __proto__: null },
                  o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var u in e)
                  if (
                    "default" !== u &&
                    Object.prototype.hasOwnProperty.call(e, u)
                  ) {
                    var i = o ? Object.getOwnPropertyDescriptor(e, u) : null;
                    i && (i.get || i.set)
                      ? Object.defineProperty(n, u, i)
                      : (n[u] = e[u]);
                  }
                return (n.default = e), r && r.set(e, n), n;
              })(Pe2(), !0);
            function hn2(e) {
              if ("function" != typeof WeakMap) return null;
              var t8 = new WeakMap(),
                r = new WeakMap();
              return (hn2 = function (n) {
                return n ? r : t8;
              })(e);
            }
            var En2 = !1;
            var Cn2 = /\r\n|[\n\r\u2028\u2029]/;
            function gn2(e, t8, r = {}) {
              let n =
                  (r.highlightCode || r.forceColor) &&
                  (0, dn2.shouldHighlight)(r),
                o = (function io2(e) {
                  return e
                    ? (null != jt2 ||
                        (jt2 = new mn2.default.constructor({
                          enabled: !0,
                          level: 1,
                        })),
                      jt2)
                    : mn2.default;
                })(r.forceColor),
                u = (function so2(e) {
                  return {
                    gutter: e.grey,
                    marker: e.red.bold,
                    message: e.red.bold,
                  };
                })(o),
                i = (F2, m) => (n ? F2(m) : m),
                s = e.split(Cn2),
                {
                  start: D,
                  end: a,
                  markerLines: c,
                } = (function Do2(e, t8, r) {
                  let n = Object.assign({ column: 0, line: -1 }, e.start),
                    o = Object.assign({}, n, e.end),
                    { linesAbove: u = 2, linesBelow: i = 3 } = r || {},
                    s = n.line,
                    D = n.column,
                    a = o.line,
                    c = o.column,
                    d = Math.max(s - (u + 1), 0),
                    f2 = Math.min(t8.length, a + i);
                  -1 === s && (d = 0), -1 === a && (f2 = t8.length);
                  let p = a - s,
                    l = {};
                  if (p)
                    for (let F2 = 0; F2 <= p; F2++) {
                      let m = F2 + s;
                      if (D)
                        if (0 === F2) {
                          let E2 = t8[m - 1].length;
                          l[m] = [D, E2 - D + 1];
                        } else if (F2 === p) l[m] = [0, c];
                        else {
                          let E2 = t8[m - F2].length;
                          l[m] = [0, E2];
                        }
                      else l[m] = !0;
                    }
                  else l[s] = D === c ? !D || [D, 0] : [D, c - D];
                  return { start: d, end: f2, markerLines: l };
                })(t8, s, r),
                d = t8.start && "number" == typeof t8.start.column,
                f2 = String(a).length,
                l = (n ? (0, dn2.default)(e, r) : e)
                  .split(Cn2, a)
                  .slice(D, a)
                  .map((F2, m) => {
                    let E2 = D + 1 + m,
                      g = ` ${` ${E2}`.slice(-f2)} |`,
                      h2 = c[E2],
                      B = !c[E2 + 1];
                    if (h2) {
                      let Z = "";
                      if (Array.isArray(h2)) {
                        let $ = F2.slice(0, Math.max(h2[0] - 1, 0)).replace(
                            /[^\t]/g,
                            " ",
                          ),
                          Q2 = h2[1] || 1;
                        (Z = [
                          "\n ",
                          i(u.gutter, g.replace(/\d/g, " ")),
                          " ",
                          $,
                          i(u.marker, "^").repeat(Q2),
                        ].join("")),
                          B &&
                            r.message &&
                            (Z += " " + i(u.message, r.message));
                      }
                      return [
                        i(u.marker, ">"),
                        i(u.gutter, g),
                        F2.length > 0 ? ` ${F2}` : "",
                        Z,
                      ].join("");
                    }
                    return ` ${i(u.gutter, g)}${F2.length > 0 ? ` ${F2}` : ""}`;
                  })
                  .join("\n");
              return (
                r.message &&
                  !d &&
                  (l = `${" ".repeat(f2 + 1)}${r.message}\n${l}`),
                n ? o.reset(l) : l
              );
            }
          }),
          tr2 = {};
        We(tr2, {
          __debug: () => ri2,
          check: () => ei2,
          doc: () => er2,
          format: () => cu,
          formatWithCursor: () => au,
          getSupportInfo: () => ti2,
          util: () => Qt2,
          version: () => Du,
        });
        var ee2 = (e, t8, r, n) => {
            if (!e || null != t8)
              return t8.replaceAll
                ? t8.replaceAll(r, n)
                : r.global
                  ? t8.replace(r, n)
                  : t8.split(r).join(n);
          },
          Kn2 = he2(ir2(), 1),
          M = "string",
          j2 = "array",
          W2 = "cursor",
          T2 = "indent",
          S2 = "align",
          v2 = "trim",
          _ = "group",
          k2 = "fill",
          x2 = "if-break",
          P = "indent-if-break",
          L2 = "line-suffix",
          I2 = "line-suffix-boundary",
          A2 = "line",
          O2 = "label",
          b2 = "break-parent",
          Ue2 = new Set([W2, T2, S2, v2, _, k2, x2, P, L2, I2, A2, O2, b2]);
        var U2 = function xu(e) {
          if ("string" == typeof e) return M;
          if (Array.isArray(e)) return j2;
          if (!e) return;
          let { type: t8 } = e;
          return Ue2.has(t8) ? t8 : void 0;
        };
        function bu(e) {
          let t8 = null === e ? "null" : typeof e;
          if ("string" !== t8 && "object" !== t8)
            return `Unexpected doc '${t8}', \nExpected it to be 'string' or 'object'.`;
          if (U2(e)) throw new Error("doc is valid.");
          let r = Object.prototype.toString.call(e);
          if ("[object Object]" !== r) return `Unexpected doc '${r}'.`;
          let n = ((e) =>
            new Intl.ListFormat("en-US", { type: "disjunction" }).format(e))(
            [...Ue2].map((o) => `'${o}'`),
          );
          return `Unexpected doc.type '${e.type}'.\nExpected it to be ${n}.`;
        }
        var yt2 = class extends Error {
            name = "InvalidDocError";
            constructor(t8) {
              super(bu(t8)), (this.doc = t8);
            }
          },
          q = yt2,
          sr2 = {};
        var Ae2 = function wu(e, t8, r, n) {
            let o = [e];
            for (; o.length > 0; ) {
              let u = o.pop();
              if (u === sr2) {
                r(o.pop());
                continue;
              }
              r && o.push(u, sr2);
              let i = U2(u);
              if (!i) throw new q(u);
              if (!1 !== t8?.(u))
                switch (i) {
                  case j2:
                  case k2: {
                    let s = i === j2 ? u : u.parts;
                    for (let a = s.length - 1; a >= 0; --a) o.push(s[a]);
                    break;
                  }
                  case x2:
                    o.push(u.flatContents, u.breakContents);
                    break;
                  case _:
                    if (n && u.expandedStates)
                      for (let D = u.expandedStates.length - 1; D >= 0; --D)
                        o.push(u.expandedStates[D]);
                    else o.push(u.contents);
                    break;
                  case S2:
                  case T2:
                  case P:
                  case O2:
                  case L2:
                    o.push(u.contents);
                    break;
                  case M:
                  case W2:
                  case v2:
                  case I2:
                  case A2:
                  case b2:
                    break;
                  default:
                    throw new q(u);
                }
            }
          },
          ze = () => {};
        function ie2(e) {
          return { type: T2, contents: e };
        }
        function oe2(e, t8) {
          return { type: S2, contents: t8, n: e };
        }
        function At2(e, t8 = {}) {
          return (
            ze(t8.expandedStates),
            {
              type: _,
              id: t8.id,
              contents: e,
              break: !!t8.shouldBreak,
              expandedStates: t8.expandedStates,
            }
          );
        }
        function Ge2(e) {
          return { type: k2, parts: e };
        }
        function Be2(e) {
          return { type: L2, contents: e };
        }
        var dr2 = { type: I2 },
          le2 = { type: b2 },
          mr2 = { type: v2 },
          _e2 = { type: A2, hard: !0 },
          Bt2 = { type: A2, hard: !0, literal: !0 },
          Ke2 = { type: A2 },
          Er2 = { type: A2, soft: !0 },
          G2 = [_e2, le2],
          He2 = [Bt2, le2],
          xe2 = { type: W2 };
        function ke2(e, t8) {
          let r = [];
          for (let n = 0; n < t8.length; n++)
            0 !== n && r.push(e), r.push(t8[n]);
          return r;
        }
        function qe2(e, t8, r) {
          let n = e;
          if (t8 > 0) {
            for (let o = 0; o < Math.floor(t8 / r); ++o) n = ie2(n);
            (n = oe2(t8 % r, n)), (n = oe2(Number.NEGATIVE_INFINITY, n));
          }
          return n;
        }
        var y = (e, t8, r) => {
          if (!e || null != t8)
            return Array.isArray(t8) || "string" == typeof t8
              ? t8[r < 0 ? t8.length + r : r]
              : t8.at(r);
        };
        function be2(e) {
          switch (e) {
            case "cr":
              return "\r";
            case "crlf":
              return "\r\n";
            default:
              return "\n";
          }
        }
        function _t2(e, t8) {
          let r;
          switch (t8) {
            case "\n":
              r = /\n/g;
              break;
            case "\r":
              r = /\r/g;
              break;
            case "\r\n":
              r = /\r\n/g;
              break;
            default:
              throw new Error(`Unexpected "eol" ${JSON.stringify(t8)}.`);
          }
          let n = e.match(r);
          return n ? n.length : 0;
        }
        var _r2 = (e) =>
            !(
              (function Ar2(e) {
                return (
                  12288 === e ||
                  (e >= 65281 && e <= 65376) ||
                  (e >= 65504 && e <= 65510)
                );
              })(e) ||
              (function Br(e) {
                return (
                  (e >= 4352 && e <= 4447) ||
                  8986 === e ||
                  8987 === e ||
                  9001 === e ||
                  9002 === e ||
                  (e >= 9193 && e <= 9196) ||
                  9200 === e ||
                  9203 === e ||
                  9725 === e ||
                  9726 === e ||
                  9748 === e ||
                  9749 === e ||
                  (e >= 9800 && e <= 9811) ||
                  9855 === e ||
                  9875 === e ||
                  9889 === e ||
                  9898 === e ||
                  9899 === e ||
                  9917 === e ||
                  9918 === e ||
                  9924 === e ||
                  9925 === e ||
                  9934 === e ||
                  9940 === e ||
                  9962 === e ||
                  9970 === e ||
                  9971 === e ||
                  9973 === e ||
                  9978 === e ||
                  9981 === e ||
                  9989 === e ||
                  9994 === e ||
                  9995 === e ||
                  10024 === e ||
                  10060 === e ||
                  10062 === e ||
                  (e >= 10067 && e <= 10069) ||
                  10071 === e ||
                  (e >= 10133 && e <= 10135) ||
                  10160 === e ||
                  10175 === e ||
                  11035 === e ||
                  11036 === e ||
                  11088 === e ||
                  11093 === e ||
                  (e >= 11904 && e <= 11929) ||
                  (e >= 11931 && e <= 12019) ||
                  (e >= 12032 && e <= 12245) ||
                  (e >= 12272 && e <= 12287) ||
                  (e >= 12289 && e <= 12350) ||
                  (e >= 12353 && e <= 12438) ||
                  (e >= 12441 && e <= 12543) ||
                  (e >= 12549 && e <= 12591) ||
                  (e >= 12593 && e <= 12686) ||
                  (e >= 12688 && e <= 12771) ||
                  (e >= 12783 && e <= 12830) ||
                  (e >= 12832 && e <= 12871) ||
                  (e >= 12880 && e <= 19903) ||
                  (e >= 19968 && e <= 42124) ||
                  (e >= 42128 && e <= 42182) ||
                  (e >= 43360 && e <= 43388) ||
                  (e >= 44032 && e <= 55203) ||
                  (e >= 63744 && e <= 64255) ||
                  (e >= 65040 && e <= 65049) ||
                  (e >= 65072 && e <= 65106) ||
                  (e >= 65108 && e <= 65126) ||
                  (e >= 65128 && e <= 65131) ||
                  (e >= 94176 && e <= 94180) ||
                  94192 === e ||
                  94193 === e ||
                  (e >= 94208 && e <= 100343) ||
                  (e >= 100352 && e <= 101589) ||
                  (e >= 101632 && e <= 101640) ||
                  (e >= 110576 && e <= 110579) ||
                  (e >= 110581 && e <= 110587) ||
                  110589 === e ||
                  110590 === e ||
                  (e >= 110592 && e <= 110882) ||
                  110898 === e ||
                  (e >= 110928 && e <= 110930) ||
                  110933 === e ||
                  (e >= 110948 && e <= 110951) ||
                  (e >= 110960 && e <= 111355) ||
                  126980 === e ||
                  127183 === e ||
                  127374 === e ||
                  (e >= 127377 && e <= 127386) ||
                  (e >= 127488 && e <= 127490) ||
                  (e >= 127504 && e <= 127547) ||
                  (e >= 127552 && e <= 127560) ||
                  127568 === e ||
                  127569 === e ||
                  (e >= 127584 && e <= 127589) ||
                  (e >= 127744 && e <= 127776) ||
                  (e >= 127789 && e <= 127797) ||
                  (e >= 127799 && e <= 127868) ||
                  (e >= 127870 && e <= 127891) ||
                  (e >= 127904 && e <= 127946) ||
                  (e >= 127951 && e <= 127955) ||
                  (e >= 127968 && e <= 127984) ||
                  127988 === e ||
                  (e >= 127992 && e <= 128062) ||
                  128064 === e ||
                  (e >= 128066 && e <= 128252) ||
                  (e >= 128255 && e <= 128317) ||
                  (e >= 128331 && e <= 128334) ||
                  (e >= 128336 && e <= 128359) ||
                  128378 === e ||
                  128405 === e ||
                  128406 === e ||
                  128420 === e ||
                  (e >= 128507 && e <= 128591) ||
                  (e >= 128640 && e <= 128709) ||
                  128716 === e ||
                  (e >= 128720 && e <= 128722) ||
                  (e >= 128725 && e <= 128727) ||
                  (e >= 128732 && e <= 128735) ||
                  128747 === e ||
                  128748 === e ||
                  (e >= 128756 && e <= 128764) ||
                  (e >= 128992 && e <= 129003) ||
                  129008 === e ||
                  (e >= 129292 && e <= 129338) ||
                  (e >= 129340 && e <= 129349) ||
                  (e >= 129351 && e <= 129535) ||
                  (e >= 129648 && e <= 129660) ||
                  (e >= 129664 && e <= 129672) ||
                  (e >= 129680 && e <= 129725) ||
                  (e >= 129727 && e <= 129733) ||
                  (e >= 129742 && e <= 129755) ||
                  (e >= 129760 && e <= 129768) ||
                  (e >= 129776 && e <= 129784) ||
                  (e >= 131072 && e <= 196605) ||
                  (e >= 196608 && e <= 262141)
                );
              })(e)
            ),
          Nu = /[^\x20-\x7F]/;
        var we2 = function Tu(e) {
            if (!e) return 0;
            if (!Nu.test(e)) return e.length;
            e = e.replace(
              /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g,
              "  ",
            );
            let t8 = 0;
            for (let r of e) {
              let n = r.codePointAt(0);
              n <= 31 ||
                (n >= 127 && n <= 159) ||
                (n >= 768 && n <= 879) ||
                (t8 += _r2(n) ? 1 : 2);
            }
            return t8;
          },
          br2 = (e) => {
            if (Array.isArray(e)) return e;
            if (e.type !== k2)
              throw new Error(`Expect doc to be 'array' or '${k2}'.`);
            return e.parts;
          };
        function Ne2(e, t8) {
          if ("string" == typeof e) return t8(e);
          let r = new Map();
          return n(e);
          function n(u) {
            if (r.has(u)) return r.get(u);
            let i = (function o(u) {
              switch (U2(u)) {
                case j2:
                  return t8(u.map(n));
                case k2:
                  return t8({ ...u, parts: u.parts.map(n) });
                case x2:
                  return t8({
                    ...u,
                    breakContents: n(u.breakContents),
                    flatContents: n(u.flatContents),
                  });
                case _: {
                  let { expandedStates: i, contents: s } = u;
                  return (
                    i ? ((i = i.map(n)), (s = i[0])) : (s = n(s)),
                    t8({ ...u, contents: s, expandedStates: i })
                  );
                }
                case S2:
                case T2:
                case P:
                case O2:
                case L2:
                  return t8({ ...u, contents: n(u.contents) });
                case M:
                case W2:
                case v2:
                case I2:
                case A2:
                case b2:
                  return t8(u);
                default:
                  throw new q(u);
              }
            })(u);
            return r.set(u, i), i;
          }
        }
        function Je2(e, t8, r) {
          let n = r,
            o = !1;
          return (
            Ae2(e, function u(i) {
              if (o) return !1;
              let s = t8(i);
              void 0 !== s && ((o = !0), (n = s));
            }),
            n
          );
        }
        function Su(e) {
          if (
            (e.type === _ && e.break) ||
            (e.type === A2 && e.hard) ||
            e.type === b2
          )
            return !0;
        }
        function xr(e) {
          if (e.length > 0) {
            let t8 = y(!1, e, -1);
            !t8.expandedStates && !t8.break && (t8.break = "propagated");
          }
          return null;
        }
        function vu(e) {
          return e.type !== A2 || e.hard
            ? e.type === x2
              ? e.flatContents
              : e
            : e.soft
              ? ""
              : " ";
        }
        function kr(e) {
          for (
            e = [...e];
            e.length >= 2 &&
            y(!1, e, -2).type === A2 &&
            y(!1, e, -1).type === b2;

          )
            e.length -= 2;
          if (e.length > 0) {
            let t8 = Oe2(y(!1, e, -1));
            e[e.length - 1] = t8;
          }
          return e;
        }
        function Oe2(e) {
          switch (U2(e)) {
            case S2:
            case T2:
            case P:
            case _:
            case L2:
            case O2: {
              let t8 = Oe2(e.contents);
              return { ...e, contents: t8 };
            }
            case x2:
              return {
                ...e,
                breakContents: Oe2(e.breakContents),
                flatContents: Oe2(e.flatContents),
              };
            case k2:
              return { ...e, parts: kr(e.parts) };
            case j2:
              return kr(e);
            case M:
              return e.replace(/[\n\r]*$/, "");
            case W2:
            case v2:
            case I2:
            case A2:
            case b2:
              break;
            default:
              throw new q(e);
          }
          return e;
        }
        function Xe2(e) {
          return Oe2(
            (function Lu(e) {
              return Ne2(e, (t8) =>
                (function Pu(e) {
                  switch (U2(e)) {
                    case k2:
                      if (e.parts.every((t8) => "" === t8)) return "";
                      break;
                    case _:
                      if (!(e.contents || e.id || e.break || e.expandedStates))
                        return "";
                      if (
                        e.contents.type === _ &&
                        e.contents.id === e.id &&
                        e.contents.break === e.break &&
                        e.contents.expandedStates === e.expandedStates
                      )
                        return e.contents;
                      break;
                    case S2:
                    case T2:
                    case P:
                    case L2:
                      if (!e.contents) return "";
                      break;
                    case x2:
                      if (!e.flatContents && !e.breakContents) return "";
                      break;
                    case j2: {
                      let t8 = [];
                      for (let r of e) {
                        if (!r) continue;
                        let [n, ...o] = Array.isArray(r) ? r : [r];
                        "string" == typeof n && "string" == typeof y(!1, t8, -1)
                          ? (t8[t8.length - 1] += n)
                          : t8.push(n),
                          t8.push(...o);
                      }
                      return 0 === t8.length
                        ? ""
                        : 1 === t8.length
                          ? t8[0]
                          : t8;
                    }
                    case M:
                    case W2:
                    case v2:
                    case I2:
                    case A2:
                    case O2:
                    case b2:
                      break;
                    default:
                      throw new q(e);
                  }
                  return e;
                })(t8),
              );
            })(e),
          );
        }
        function Iu(e) {
          if (e.type === A2) return !0;
        }
        function Ze2(e, t8) {
          return e.type === O2 ? { ...e, contents: t8(e.contents) } : t8(e);
        }
        var R2 = Symbol("MODE_BREAK"),
          K2 = Symbol("MODE_FLAT"),
          Te2 = Symbol("cursor");
        function Ru(e, t8) {
          return xt2(e, { type: "indent" }, t8);
        }
        function Yu(e, t8, r) {
          return t8 === Number.NEGATIVE_INFINITY
            ? e.root || { value: "", length: 0, queue: [] }
            : t8 < 0
              ? xt2(e, { type: "dedent" }, r)
              : t8
                ? "root" === t8.type
                  ? { ...e, root: e }
                  : xt2(
                      e,
                      {
                        type:
                          "string" == typeof t8 ? "stringAlign" : "numberAlign",
                        n: t8,
                      },
                      r,
                    )
                : e;
        }
        function xt2(e, t8, r) {
          let n =
              "dedent" === t8.type ? e.queue.slice(0, -1) : [...e.queue, t8],
            o = "",
            u = 0,
            i = 0,
            s = 0;
          for (let l of n)
            switch (l.type) {
              case "indent":
                c(), r.useTabs ? D(1) : a(r.tabWidth);
                break;
              case "stringAlign":
                c(), (o += l.n), (u += l.n.length);
                break;
              case "numberAlign":
                (i += 1), (s += l.n);
                break;
              default:
                throw new Error(`Unexpected type '${l.type}'`);
            }
          return f2(), { ...e, value: o, length: u, queue: n };
          function D(l) {
            (o += "\t".repeat(l)), (u += r.tabWidth * l);
          }
          function a(l) {
            (o += " ".repeat(l)), (u += l);
          }
          function c() {
            r.useTabs
              ? (function d() {
                  i > 0 && D(i), p();
                })()
              : f2();
          }
          function f2() {
            s > 0 && a(s), p();
          }
          function p() {
            (i = 0), (s = 0);
          }
        }
        function kt2(e) {
          let t8 = 0,
            r = 0,
            n = e.length;
          e: for (; n--; ) {
            let o = e[n];
            if (o !== Te2)
              for (let u = o.length - 1; u >= 0; u--) {
                let i = o[u];
                if (" " !== i && "\t" !== i) {
                  e[n] = o.slice(0, u + 1);
                  break e;
                }
                t8++;
              }
            else r++;
          }
          if (t8 > 0 || r > 0) for (e.length = n + 1; r-- > 0; ) e.push(Te2);
          return t8;
        }
        function Qe2(e, t8, r, n, o, u) {
          if (r === Number.POSITIVE_INFINITY) return !0;
          let i = t8.length,
            s = [e],
            D = [];
          for (; r >= 0; ) {
            if (0 === s.length) {
              if (0 === i) return !0;
              s.push(t8[--i]);
              continue;
            }
            let { mode: a, doc: c } = s.pop();
            switch (U2(c)) {
              case M:
                D.push(c), (r -= we2(c));
                break;
              case j2:
              case k2: {
                let d = br2(c);
                for (let f2 = d.length - 1; f2 >= 0; f2--)
                  s.push({ mode: a, doc: d[f2] });
                break;
              }
              case T2:
              case S2:
              case P:
              case O2:
                s.push({ mode: a, doc: c.contents });
                break;
              case v2:
                r += kt2(D);
                break;
              case _: {
                if (u && c.break) return !1;
                let d = c.break ? R2 : a,
                  f2 =
                    c.expandedStates && d === R2
                      ? y(!1, c.expandedStates, -1)
                      : c.contents;
                s.push({ mode: d, doc: f2 });
                break;
              }
              case x2: {
                let f2 =
                  (c.groupId ? o[c.groupId] || K2 : a) === R2
                    ? c.breakContents
                    : c.flatContents;
                f2 && s.push({ mode: a, doc: f2 });
                break;
              }
              case A2:
                if (a === R2 || c.hard) return !0;
                c.soft || (D.push(" "), r--);
                break;
              case L2:
                n = !0;
                break;
              case I2:
                if (n) return !1;
            }
          }
          return !1;
        }
        function fe2(e, t8) {
          let r = {},
            n = t8.printWidth,
            o = be2(t8.endOfLine),
            u = 0,
            i = [
              { ind: { value: "", length: 0, queue: [] }, mode: R2, doc: e },
            ],
            s = [],
            D = !1,
            a = [],
            c = 0;
          for (
            (function Or2(e) {
              let t8 = new Set(),
                r = [];
              Ae2(
                e,
                function n(u) {
                  if ((u.type === b2 && xr(r), u.type === _)) {
                    if ((r.push(u), t8.has(u))) return !1;
                    t8.add(u);
                  }
                },
                function o(u) {
                  u.type === _ && r.pop().break && xr(r);
                },
                !0,
              );
            })(e);
            i.length > 0;

          ) {
            let { ind: f2, mode: p, doc: l } = i.pop();
            switch (U2(l)) {
              case M: {
                let F2 = "\n" !== o ? ee2(!1, l, "\n", o) : l;
                s.push(F2), i.length > 0 && (u += we2(F2));
                break;
              }
              case j2:
                for (let F2 = l.length - 1; F2 >= 0; F2--)
                  i.push({ ind: f2, mode: p, doc: l[F2] });
                break;
              case W2:
                if (c >= 2)
                  throw new Error("There are too many 'cursor' in doc.");
                s.push(Te2), c++;
                break;
              case T2:
                i.push({ ind: Ru(f2, t8), mode: p, doc: l.contents });
                break;
              case S2:
                i.push({ ind: Yu(f2, l.n, t8), mode: p, doc: l.contents });
                break;
              case v2:
                u -= kt2(s);
                break;
              case _:
                switch (p) {
                  case K2:
                    if (!D) {
                      i.push({
                        ind: f2,
                        mode: l.break ? R2 : K2,
                        doc: l.contents,
                      });
                      break;
                    }
                  case R2: {
                    D = !1;
                    let F2 = { ind: f2, mode: K2, doc: l.contents },
                      m = n - u,
                      E2 = a.length > 0;
                    if (!l.break && Qe2(F2, i, m, E2, r)) i.push(F2);
                    else if (l.expandedStates) {
                      let C = y(!1, l.expandedStates, -1);
                      if (l.break) {
                        i.push({ ind: f2, mode: R2, doc: C });
                        break;
                      }
                      for (let g = 1; g < l.expandedStates.length + 1; g++) {
                        if (g >= l.expandedStates.length) {
                          i.push({ ind: f2, mode: R2, doc: C });
                          break;
                        }
                        {
                          let h2 = l.expandedStates[g],
                            B = { ind: f2, mode: K2, doc: h2 };
                          if (Qe2(B, i, m, E2, r)) {
                            i.push(B);
                            break;
                          }
                        }
                      }
                    } else i.push({ ind: f2, mode: R2, doc: l.contents });
                    break;
                  }
                }
                l.id && (r[l.id] = y(!1, i, -1).mode);
                break;
              case k2: {
                let F2 = n - u,
                  { parts: m } = l;
                if (0 === m.length) break;
                let [E2, C] = m,
                  g = { ind: f2, mode: K2, doc: E2 },
                  h2 = { ind: f2, mode: R2, doc: E2 },
                  B = Qe2(g, [], F2, a.length > 0, r, !0);
                if (1 === m.length) {
                  B ? i.push(g) : i.push(h2);
                  break;
                }
                let Z = { ind: f2, mode: K2, doc: C },
                  $ = { ind: f2, mode: R2, doc: C };
                if (2 === m.length) {
                  B ? i.push(Z, g) : i.push($, h2);
                  break;
                }
                m.splice(0, 2);
                let Q2 = { ind: f2, mode: p, doc: Ge2(m) },
                  rr2 = m[0];
                Qe2(
                  { ind: f2, mode: K2, doc: [E2, C, rr2] },
                  [],
                  F2,
                  a.length > 0,
                  r,
                  !0,
                )
                  ? i.push(Q2, Z, g)
                  : B
                    ? i.push(Q2, $, g)
                    : i.push(Q2, $, h2);
                break;
              }
              case x2:
              case P: {
                let F2 = l.groupId ? r[l.groupId] : p;
                if (F2 === R2) {
                  let m =
                    l.type === x2
                      ? l.breakContents
                      : l.negate
                        ? l.contents
                        : ie2(l.contents);
                  m && i.push({ ind: f2, mode: p, doc: m });
                }
                if (F2 === K2) {
                  let m =
                    l.type === x2
                      ? l.flatContents
                      : l.negate
                        ? ie2(l.contents)
                        : l.contents;
                  m && i.push({ ind: f2, mode: p, doc: m });
                }
                break;
              }
              case L2:
                a.push({ ind: f2, mode: p, doc: l.contents });
                break;
              case I2:
                a.length > 0 && i.push({ ind: f2, mode: p, doc: _e2 });
                break;
              case A2:
                switch (p) {
                  case K2:
                    if (!l.hard) {
                      l.soft || (s.push(" "), (u += 1));
                      break;
                    }
                    D = !0;
                  case R2:
                    if (a.length > 0) {
                      i.push({ ind: f2, mode: p, doc: l }, ...a.reverse()),
                        (a.length = 0);
                      break;
                    }
                    l.literal
                      ? f2.root
                        ? (s.push(o, f2.root.value), (u = f2.root.length))
                        : (s.push(o), (u = 0))
                      : ((u -= kt2(s)), s.push(o + f2.value), (u = f2.length));
                }
                break;
              case O2:
                i.push({ ind: f2, mode: p, doc: l.contents });
                break;
              case b2:
                break;
              default:
                throw new q(l);
            }
            0 === i.length &&
              a.length > 0 &&
              (i.push(...a.reverse()), (a.length = 0));
          }
          let d = s.indexOf(Te2);
          if (-1 !== d) {
            let f2 = s.indexOf(Te2, d + 1),
              p = s.slice(0, d).join(""),
              l = s.slice(d + 1, f2).join("");
            return {
              formatted: p + l + s.slice(f2 + 1).join(""),
              cursorNodeStart: p.length,
              cursorNodeText: l,
            };
          }
          return { formatted: s.join("") };
        }
        function J2(e) {
          var t8;
          if (!e) return "";
          if (Array.isArray(e)) {
            let r = [];
            for (let n of e)
              if (Array.isArray(n)) r.push(...J2(n));
              else {
                let o = J2(n);
                "" !== o && r.push(o);
              }
            return r;
          }
          return e.type === x2
            ? {
                ...e,
                breakContents: J2(e.breakContents),
                flatContents: J2(e.flatContents),
              }
            : e.type === _
              ? {
                  ...e,
                  contents: J2(e.contents),
                  expandedStates:
                    null == (t8 = e.expandedStates) ? void 0 : t8.map(J2),
                }
              : e.type === k2
                ? { type: "fill", parts: e.parts.map(J2) }
                : e.contents
                  ? { ...e, contents: J2(e.contents) }
                  : e;
        }
        var Fe2 = function ju(e, t8, r = 0) {
            let n = 0;
            for (let o = r; o < e.length; ++o)
              "\t" === e[o] ? (n = n + t8 - (n % t8)) : n++;
            return n;
          },
          Se2 = class extends Error {
            name = "ConfigError";
          },
          ve2 = class extends Error {
            name = "UndefinedParserError";
          },
          Lr = {
            cursorOffset: {
              category: "Special",
              type: "int",
              default: -1,
              range: { start: -1, end: 1 / 0, step: 1 },
              description:
                "Print (to stderr) where a cursor at the given position would move to after formatting.",
              cliCategory: "Editor",
            },
            endOfLine: {
              category: "Global",
              type: "choice",
              default: "lf",
              description: "Which end of line characters to apply.",
              choices: [
                {
                  value: "lf",
                  description:
                    "Line Feed only (\\n), common on Linux and macOS as well as inside git repos",
                },
                {
                  value: "crlf",
                  description:
                    "Carriage Return + Line Feed characters (\\r\\n), common on Windows",
                },
                {
                  value: "cr",
                  description:
                    "Carriage Return character only (\\r), used very rarely",
                },
                {
                  value: "auto",
                  description:
                    "Maintain existing\n(mixed values within one file are normalised by looking at what's used after the first line)",
                },
              ],
            },
            filepath: {
              category: "Special",
              type: "path",
              description:
                "Specify the input filepath. This will be used to do parser inference.",
              cliName: "stdin-filepath",
              cliCategory: "Other",
              cliDescription:
                "Path to the file to pretend that stdin comes from.",
            },
            insertPragma: {
              category: "Special",
              type: "boolean",
              default: !1,
              description:
                "Insert @format pragma into file's first docblock comment.",
              cliCategory: "Other",
            },
            parser: {
              category: "Global",
              type: "choice",
              default: void 0,
              description: "Which parser to use.",
              exception: (e) => "string" == typeof e || "function" == typeof e,
              choices: [
                { value: "flow", description: "Flow" },
                { value: "babel", description: "JavaScript" },
                { value: "babel-flow", description: "Flow" },
                { value: "babel-ts", description: "TypeScript" },
                { value: "typescript", description: "TypeScript" },
                { value: "acorn", description: "JavaScript" },
                { value: "espree", description: "JavaScript" },
                { value: "meriyah", description: "JavaScript" },
                { value: "css", description: "CSS" },
                { value: "less", description: "Less" },
                { value: "scss", description: "SCSS" },
                { value: "json", description: "JSON" },
                { value: "json5", description: "JSON5" },
                { value: "json-stringify", description: "JSON.stringify" },
                { value: "graphql", description: "GraphQL" },
                { value: "markdown", description: "Markdown" },
                { value: "mdx", description: "MDX" },
                { value: "vue", description: "Vue" },
                { value: "yaml", description: "YAML" },
                { value: "glimmer", description: "Ember / Handlebars" },
                { value: "html", description: "HTML" },
                { value: "angular", description: "Angular" },
                { value: "lwc", description: "Lightning Web Components" },
              ],
            },
            plugins: {
              type: "path",
              array: !0,
              default: [{ value: [] }],
              category: "Global",
              description:
                "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
              exception: (e) => "string" == typeof e || "object" == typeof e,
              cliName: "plugin",
              cliCategory: "Config",
            },
            printWidth: {
              category: "Global",
              type: "int",
              default: 80,
              description: "The line length where Prettier will try wrap.",
              range: { start: 0, end: 1 / 0, step: 1 },
            },
            rangeEnd: {
              category: "Special",
              type: "int",
              default: 1 / 0,
              range: { start: 0, end: 1 / 0, step: 1 },
              description:
                "Format code ending at a given character offset (exclusive).\nThe range will extend forwards to the end of the selected statement.",
              cliCategory: "Editor",
            },
            rangeStart: {
              category: "Special",
              type: "int",
              default: 0,
              range: { start: 0, end: 1 / 0, step: 1 },
              description:
                "Format code starting at a given character offset.\nThe range will extend backwards to the start of the first line containing the selected statement.",
              cliCategory: "Editor",
            },
            requirePragma: {
              category: "Special",
              type: "boolean",
              default: !1,
              description:
                "Require either '@prettier' or '@format' to be present in the file's first docblock comment\nin order for it to be formatted.",
              cliCategory: "Other",
            },
            tabWidth: {
              type: "int",
              category: "Global",
              default: 2,
              description: "Number of spaces per indentation level.",
              range: { start: 0, end: 1 / 0, step: 1 },
            },
            useTabs: {
              category: "Global",
              type: "boolean",
              default: !1,
              description: "Indent with tabs instead of spaces.",
            },
            embeddedLanguageFormatting: {
              category: "Global",
              type: "choice",
              default: "auto",
              description:
                "Control how Prettier formats quoted code embedded in the file.",
              choices: [
                {
                  value: "auto",
                  description:
                    "Format embedded code if Prettier can automatically identify it.",
                },
                {
                  value: "off",
                  description: "Never automatically format embedded code.",
                },
              ],
            },
          };
        function et2({ plugins: e = [], showDeprecated: t8 = !1 } = {}) {
          let r = e.flatMap((o) => o.languages ?? []),
            n = [];
          for (let o of (function $u(e) {
            let t8 = [];
            for (let [r, n] of Object.entries(e)) {
              let o = { name: r, ...n };
              Array.isArray(o.default) &&
                (o.default = y(!1, o.default, -1).value),
                t8.push(o);
            }
            return t8;
          })(Object.assign({}, ...e.map(({ options: u }) => u), Lr)))
            (!t8 && o.deprecated) ||
              (Array.isArray(o.choices) &&
                (t8 || (o.choices = o.choices.filter((u) => !u.deprecated)),
                "parser" === o.name &&
                  (o.choices = [...o.choices, ...Vu(o.choices, r, e)])),
              (o.pluginDefaults = Object.fromEntries(
                e
                  .filter((u) => {
                    var i;
                    return (
                      void 0 !==
                      (null == (i = u.defaultOptions) ? void 0 : i[o.name])
                    );
                  })
                  .map((u) => [u.name, u.defaultOptions[o.name]]),
              )),
              n.push(o));
          return { languages: r, options: n };
        }
        function* Vu(e, t8, r) {
          let n = new Set(e.map((o) => o.value));
          for (let o of t8)
            if (o.parsers)
              for (let u of o.parsers)
                if (!n.has(u)) {
                  n.add(u);
                  let i = r.find(
                      (D) =>
                        D.parsers &&
                        Object.prototype.hasOwnProperty.call(D.parsers, u),
                    ),
                    s = o.name;
                  null != i && i.name && (s += ` (plugin: ${i.name})`),
                    yield { value: u, description: s };
                }
        }
        var Mu = (e) => String(e).split(/[/\\]/).pop();
        function Ir(e, t8) {
          if (!t8) return;
          let r = Mu(t8).toLowerCase();
          return e.find((n) => {
            var o, u;
            return (
              (null == (o = n.extensions)
                ? void 0
                : o.some((i) => r.endsWith(i))) ||
              (null == (u = n.filenames)
                ? void 0
                : u.some((i) => i.toLowerCase() === r))
            );
          });
        }
        var Rr = function Uu(e, t8) {
            let r = e.plugins.flatMap((o) => o.languages ?? []),
              n =
                (function Wu(e, t8) {
                  if (t8)
                    return (
                      e.find(({ name: r }) => r.toLowerCase() === t8) ??
                      e.find(({ aliases: r }) => r?.includes(t8)) ??
                      e.find(({ extensions: r }) => r?.includes(`.${t8}`))
                    );
                })(r, t8.language) ??
                Ir(r, t8.physicalFile) ??
                Ir(r, t8.file) ??
                void t8.physicalFile;
            return n?.parsers[0];
          },
          te2 = {
            key: (e) =>
              /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? e : JSON.stringify(e),
            value(e) {
              if (null === e || "object" != typeof e) return JSON.stringify(e);
              if (Array.isArray(e))
                return `[${e.map((r) => te2.value(r)).join(", ")}]`;
              let t8 = Object.keys(e);
              return 0 === t8.length
                ? "{}"
                : `{ ${t8.map((r) => `${te2.key(r)}: ${te2.value(e[r])}`).join(", ")} }`;
            },
            pair: ({ key: e, value: t8 }) => te2.value({ [e]: t8 }),
          },
          bt2 = he2(Pe2(), 1),
          se2 = he2(Pe2(), 1),
          tt2 = Symbol.for("vnopts.VALUE_NOT_EXIST"),
          pe2 = Symbol.for("vnopts.VALUE_UNCHANGED"),
          $r2 = " ".repeat(2);
        function Mr2(e, t8, r, n) {
          return [
            `Invalid ${se2.default.red(n.key(e))} value.`,
            `Expected ${se2.default.blue(r)},`,
            `but received ${t8 === tt2 ? se2.default.gray("nothing") : se2.default.red(n.value(t8))}.`,
          ].join(" ");
        }
        function Ur2({ text: e, list: t8 }, r) {
          let n = [];
          return (
            e && n.push(`- ${se2.default.blue(e)}`),
            t8 &&
              n.push(
                [`- ${se2.default.blue(t8.title)}:`]
                  .concat(
                    t8.values.map((o) =>
                      Ur2(o, r - $r2.length).replace(/^|\n/g, `$&${$r2}`),
                    ),
                  )
                  .join("\n"),
              ),
            zr(n, r)
          );
        }
        function zr(e, t8) {
          if (1 === e.length) return e[0];
          let [r, n] = e,
            [o, u] = e.map((i) => i.split("\n", 1)[0].length);
          return o > t8 && o > u ? n : r;
        }
        var Nt2 = he2(Pe2(), 1),
          wt2 = [],
          Gr = [];
        var rt2 = (e, t8, { descriptor: r, logger: n, schemas: o }) => {
            let u = [
                `Ignored unknown option ${Nt2.default.yellow(r.pair({ key: e, value: t8 }))}.`,
              ],
              i = Object.keys(o)
                .sort()
                .find(
                  (s) =>
                    (function Ot2(e, t8) {
                      if (e === t8) return 0;
                      let r = e;
                      e.length > t8.length && ((e = t8), (t8 = r));
                      let n = e.length,
                        o = t8.length;
                      for (
                        ;
                        n > 0 && e.charCodeAt(~-n) === t8.charCodeAt(~-o);

                      )
                        n--, o--;
                      let u = 0;
                      for (; u < n && e.charCodeAt(u) === t8.charCodeAt(u); )
                        u++;
                      if (((n -= u), (o -= u), 0 === n)) return o;
                      let i,
                        s,
                        D,
                        a,
                        c = 0,
                        d = 0;
                      for (; c < n; )
                        (Gr[c] = e.charCodeAt(u + c)), (wt2[c] = ++c);
                      for (; d < o; )
                        for (
                          i = t8.charCodeAt(u + d), D = d++, s = d, c = 0;
                          c < n;
                          c++
                        )
                          (a = i === Gr[c] ? D : D + 1),
                            (D = wt2[c]),
                            (s = wt2[c] =
                              D > s ? (a > s ? s + 1 : a) : a > D ? D + 1 : a);
                      return s;
                    })(e, s) < 3,
                );
            i && u.push(`Did you mean ${Nt2.default.blue(r.key(i))}?`),
              n.warn(u.join(" "));
          },
          zu = [
            "default",
            "expected",
            "validate",
            "deprecated",
            "forward",
            "redirect",
            "overlap",
            "preprocess",
            "postprocess",
          ];
        var w = class {
          static create(t8) {
            return (function Gu(e, t8) {
              let r = new e(t8),
                n = Object.create(r);
              for (let o of zu)
                o in t8 && (n[o] = Ku(t8[o], r, w.prototype[o].length));
              return n;
            })(this, t8);
          }
          constructor(t8) {
            this.name = t8.name;
          }
          default(t8) {}
          expected(t8) {
            return "nothing";
          }
          validate(t8, r) {
            return !1;
          }
          deprecated(t8, r) {
            return !1;
          }
          forward(t8, r) {}
          redirect(t8, r) {}
          overlap(t8, r, n) {
            return t8;
          }
          preprocess(t8, r) {
            return t8;
          }
          postprocess(t8, r) {
            return pe2;
          }
        };
        function Ku(e, t8, r) {
          return "function" == typeof e
            ? (...n) => e(...n.slice(0, r - 1), t8, ...n.slice(r - 1))
            : () => e;
        }
        var nt2 = class extends w {
            constructor(t8) {
              super(t8), (this._sourceName = t8.sourceName);
            }
            expected(t8) {
              return t8.schemas[this._sourceName].expected(t8);
            }
            validate(t8, r) {
              return r.schemas[this._sourceName].validate(t8, r);
            }
            redirect(t8, r) {
              return this._sourceName;
            }
          },
          ut2 = class extends w {
            expected() {
              return "anything";
            }
            validate() {
              return !0;
            }
          },
          ot2 = class extends w {
            constructor({ valueSchema: t8, name: r = t8.name, ...n }) {
              super({ ...n, name: r }), (this._valueSchema = t8);
            }
            expected(t8) {
              let { text: r, list: n } = t8.normalizeExpectedResult(
                this._valueSchema.expected(t8),
              );
              return {
                text: r && `an array of ${r}`,
                list: n && {
                  title: "an array of the following values",
                  values: [{ list: n }],
                },
              };
            }
            validate(t8, r) {
              if (!Array.isArray(t8)) return !1;
              let n = [];
              for (let o of t8) {
                let u = r.normalizeValidateResult(
                  this._valueSchema.validate(o, r),
                  o,
                );
                !0 !== u && n.push(u.value);
              }
              return 0 === n.length || { value: n };
            }
            deprecated(t8, r) {
              let n = [];
              for (let o of t8) {
                let u = r.normalizeDeprecatedResult(
                  this._valueSchema.deprecated(o, r),
                  o,
                );
                !1 !== u &&
                  n.push(...u.map(({ value: i }) => ({ value: [i] })));
              }
              return n;
            }
            forward(t8, r) {
              let n = [];
              for (let o of t8) {
                let u = r.normalizeForwardResult(
                  this._valueSchema.forward(o, r),
                  o,
                );
                n.push(...u.map(Kr2));
              }
              return n;
            }
            redirect(t8, r) {
              let n = [],
                o = [];
              for (let u of t8) {
                let i = r.normalizeRedirectResult(
                  this._valueSchema.redirect(u, r),
                  u,
                );
                "remain" in i && n.push(i.remain),
                  o.push(...i.redirect.map(Kr2));
              }
              return 0 === n.length
                ? { redirect: o }
                : { redirect: o, remain: n };
            }
            overlap(t8, r) {
              return t8.concat(r);
            }
          };
        function Kr2({ from: e, to: t8 }) {
          return { from: [e], to: t8 };
        }
        var it2 = class extends w {
          expected() {
            return "true or false";
          }
          validate(t8) {
            return "boolean" == typeof t8;
          }
        };
        function qr2(e, t8) {
          let r = Object.create(null);
          for (let n of e) {
            let o = n[t8];
            if (r[o]) throw new Error(`Duplicate ${t8} ${JSON.stringify(o)}`);
            r[o] = n;
          }
          return r;
        }
        function en2(e, t8) {
          if (e === t8) return 0;
          let r = typeof e,
            n = typeof t8,
            o = ["undefined", "object", "boolean", "number", "string"];
          return r !== n
            ? o.indexOf(r) - o.indexOf(n)
            : "string" !== r
              ? Number(e) - Number(t8)
              : e.localeCompare(t8);
        }
        function Tt2(e) {
          return void 0 === e ? {} : e;
        }
        function St2(e) {
          if ("string" == typeof e) return { text: e };
          let { text: t8, list: r } = e;
          return (
            (function Hu(e, t8) {
              if (!e) throw new Error(t8);
            })(
              void 0 !== (t8 || r),
              "Unexpected `expected` result, there should be at least one field.",
            ),
            r
              ? {
                  text: t8,
                  list: { title: r.title, values: r.values.map(St2) },
                }
              : { text: t8 }
          );
        }
        function vt2(e, t8) {
          return !0 === e || (!1 === e ? { value: t8 } : e);
        }
        function Pt2(e, t8, r = !1) {
          return (
            !1 !== e &&
            (!0 === e
              ? !!r || [{ value: t8 }]
              : "value" in e
                ? [e]
                : 0 !== e.length && e)
          );
        }
        function Hr2(e, t8) {
          return "string" == typeof e || "key" in e
            ? { from: t8, to: e }
            : "from" in e
              ? { from: e.from, to: e.to }
              : { from: t8, to: e.to };
        }
        function st2(e, t8) {
          return void 0 === e
            ? []
            : Array.isArray(e)
              ? e.map((r) => Hr2(r, t8))
              : [Hr2(e, t8)];
        }
        function Lt2(e, t8) {
          let r = st2(
            "object" == typeof e && "redirect" in e ? e.redirect : e,
            t8,
          );
          return 0 === r.length
            ? { remain: t8, redirect: r }
            : "object" == typeof e && "remain" in e
              ? { remain: e.remain, redirect: r }
              : { redirect: r };
        }
        var It2,
          Dt2 = class extends w {
            constructor(t8) {
              super(t8),
                (this._choices = (function Jr2(e, t8) {
                  let r = new Map();
                  for (let n of e) {
                    let o = n[t8];
                    if (r.has(o))
                      throw new Error(`Duplicate ${t8} ${JSON.stringify(o)}`);
                    r.set(o, n);
                  }
                  return r;
                })(
                  t8.choices.map((r) =>
                    r && "object" == typeof r ? r : { value: r },
                  ),
                  "value",
                ));
            }
            expected({ descriptor: t8 }) {
              let r = Array.from(this._choices.keys())
                  .map((i) => this._choices.get(i))
                  .filter(({ hidden: i }) => !i)
                  .map((i) => i.value)
                  .sort(en2)
                  .map(t8.value),
                n = r.slice(0, -2),
                o = r.slice(-2);
              return {
                text: n.concat(o.join(" or ")).join(", "),
                list: { title: "one of the following values", values: r },
              };
            }
            validate(t8) {
              return this._choices.has(t8);
            }
            deprecated(t8) {
              let r = this._choices.get(t8);
              return !(!r || !r.deprecated) && { value: t8 };
            }
            forward(t8) {
              let r = this._choices.get(t8);
              return r ? r.forward : void 0;
            }
            redirect(t8) {
              let r = this._choices.get(t8);
              return r ? r.redirect : void 0;
            }
          },
          at2 = class extends w {
            expected() {
              return "a number";
            }
            validate(t8, r) {
              return "number" == typeof t8;
            }
          },
          ct2 = class extends at2 {
            expected() {
              return "an integer";
            }
            validate(t8, r) {
              return (
                !0 === r.normalizeValidateResult(super.validate(t8, r), t8) &&
                (function Qr2(e) {
                  return e === Math.floor(e);
                })(t8)
              );
            }
          },
          Le2 = class extends w {
            expected() {
              return "a string";
            }
            validate(t8) {
              return "string" == typeof t8;
            }
          },
          rn2 = te2,
          nn2 = rt2,
          un2 = (e, t8, r) => {
            let { text: n, list: o } = r.normalizeExpectedResult(
                r.schemas[e].expected(r),
              ),
              u = [];
            return (
              n && u.push(Mr2(e, t8, n, r.descriptor)),
              o &&
                u.push(
                  [Mr2(e, t8, o.title, r.descriptor)]
                    .concat(o.values.map((i) => Ur2(i, r.loggerPrintWidth)))
                    .join("\n"),
                ),
              zr(u, r.loggerPrintWidth)
            );
          },
          on2 = (e, t8, { descriptor: r }) => {
            let n = [
              `${bt2.default.yellow("string" == typeof e ? r.key(e) : r.pair(e))} is deprecated`,
            ];
            return (
              t8 &&
                n.push(
                  `we now treat it as ${bt2.default.blue("string" == typeof t8 ? r.key(t8) : r.pair(t8))}`,
                ),
              n.join("; ") + "."
            );
          },
          lt = class {
            constructor(t8, r) {
              let {
                logger: n = console,
                loggerPrintWidth: o = 80,
                descriptor: u = rn2,
                unknown: i = nn2,
                invalid: s = un2,
                deprecated: D = on2,
                missing: a = () => !1,
                required: c = () => !1,
                preprocess: d = (p) => p,
                postprocess: f2 = () => pe2,
              } = r || {};
              (this._utils = {
                descriptor: u,
                logger: n || { warn: () => {} },
                loggerPrintWidth: o,
                schemas: qr2(t8, "name"),
                normalizeDefaultResult: Tt2,
                normalizeExpectedResult: St2,
                normalizeDeprecatedResult: Pt2,
                normalizeForwardResult: st2,
                normalizeRedirectResult: Lt2,
                normalizeValidateResult: vt2,
              }),
                (this._unknownHandler = i),
                (this._invalidHandler = (function tn2(e) {
                  return (...t8) => {
                    let r = e(...t8);
                    return "string" == typeof r ? new Error(r) : r;
                  };
                })(s)),
                (this._deprecatedHandler = D),
                (this._identifyMissing = (p, l) => !(p in l) || a(p, l)),
                (this._identifyRequired = c),
                (this._preprocess = d),
                (this._postprocess = f2),
                this.cleanHistory();
            }
            cleanHistory() {
              this._hasDeprecationWarned = (function Xr2() {
                let e = Object.create(null);
                return (t8) => {
                  let r = JSON.stringify(t8);
                  return !!e[r] || ((e[r] = !0), !1);
                };
              })();
            }
            normalize(t8) {
              let r = {},
                o = [this._preprocess(t8, this._utils)],
                u = () => {
                  for (; 0 !== o.length; ) {
                    let i = o.shift(),
                      s = this._applyNormalization(i, r);
                    o.push(...s);
                  }
                };
              u();
              for (let i of Object.keys(this._utils.schemas)) {
                let s = this._utils.schemas[i];
                if (!(i in r)) {
                  let D = Tt2(s.default(this._utils));
                  "value" in D && o.push({ [i]: D.value });
                }
              }
              u();
              for (let i of Object.keys(this._utils.schemas)) {
                if (!(i in r)) continue;
                let s = this._utils.schemas[i],
                  D = r[i],
                  a = s.postprocess(D, this._utils);
                a !== pe2 && (this._applyValidation(a, i, s), (r[i] = a));
              }
              return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
            }
            _applyNormalization(t8, r) {
              let n = [],
                { knownKeys: o, unknownKeys: u } =
                  this._partitionOptionKeys(t8);
              for (let i of o) {
                let s = this._utils.schemas[i],
                  D = s.preprocess(t8[i], this._utils);
                this._applyValidation(D, i, s);
                let a = ({ from: p, to: l }) => {
                    n.push(
                      "string" == typeof l ? { [l]: p } : { [l.key]: l.value },
                    );
                  },
                  c = ({ value: p, redirectTo: l }) => {
                    let F2 = Pt2(s.deprecated(p, this._utils), D, !0);
                    if (!1 !== F2)
                      if (!0 === F2)
                        this._hasDeprecationWarned(i) ||
                          this._utils.logger.warn(
                            this._deprecatedHandler(i, l, this._utils),
                          );
                      else
                        for (let { value: m } of F2) {
                          let E2 = { key: i, value: m };
                          if (!this._hasDeprecationWarned(E2)) {
                            let C =
                              "string" == typeof l ? { key: l, value: m } : l;
                            this._utils.logger.warn(
                              this._deprecatedHandler(E2, C, this._utils),
                            );
                          }
                        }
                  };
                st2(s.forward(D, this._utils), D).forEach(a);
                let f2 = Lt2(s.redirect(D, this._utils), D);
                if ((f2.redirect.forEach(a), "remain" in f2)) {
                  let p = f2.remain;
                  (r[i] = i in r ? s.overlap(r[i], p, this._utils) : p),
                    c({ value: p });
                }
                for (let { from: p, to: l } of f2.redirect)
                  c({ value: p, redirectTo: l });
              }
              for (let i of u) {
                let s = t8[i];
                this._applyUnknownHandler(i, s, r, (D, a) => {
                  n.push({ [D]: a });
                });
              }
              return n;
            }
            _applyRequiredCheck(t8) {
              for (let r of Object.keys(this._utils.schemas))
                if (this._identifyMissing(r, t8) && this._identifyRequired(r))
                  throw this._invalidHandler(r, tt2, this._utils);
            }
            _partitionOptionKeys(t8) {
              let [r, n] = (function Zr2(e, t8) {
                let r = [],
                  n = [];
                for (let o of e) t8(o) ? r.push(o) : n.push(o);
                return [r, n];
              })(
                Object.keys(t8).filter((o) => !this._identifyMissing(o, t8)),
                (o) => o in this._utils.schemas,
              );
              return { knownKeys: r, unknownKeys: n };
            }
            _applyValidation(t8, r, n) {
              let o = vt2(n.validate(t8, this._utils), t8);
              if (!0 !== o) throw this._invalidHandler(r, o.value, this._utils);
            }
            _applyUnknownHandler(t8, r, n, o) {
              let u = this._unknownHandler(t8, r, this._utils);
              if (u)
                for (let i of Object.keys(u)) {
                  if (this._identifyMissing(i, u)) continue;
                  let s = u[i];
                  i in this._utils.schemas ? o(i, s) : (n[i] = s);
                }
            }
            _applyPostprocess(t8) {
              let r = this._postprocess(t8, this._utils);
              if (r !== pe2) {
                if (r.delete) for (let n of r.delete) delete t8[n];
                if (r.override) {
                  let { knownKeys: n, unknownKeys: o } =
                    this._partitionOptionKeys(r.override);
                  for (let u of n) {
                    let i = r.override[u];
                    this._applyValidation(i, u, this._utils.schemas[u]),
                      (t8[u] = i);
                  }
                  for (let u of o) {
                    let i = r.override[u];
                    this._applyUnknownHandler(u, i, t8, (s, D) => {
                      let a = this._utils.schemas[s];
                      this._applyValidation(D, s, a), (t8[s] = D);
                    });
                  }
                }
              }
            }
          };
        function Zu(e, { isCLI: t8, optionInfos: r, FlagSchema: n }) {
          let i,
            { name: o } = e,
            u = { name: o },
            s = {};
          switch (e.type) {
            case "int":
              (i = ct2), t8 && (u.preprocess = Number);
              break;
            case "string":
            case "path":
              i = Le2;
              break;
            case "choice":
              (i = Dt2),
                (u.choices = e.choices.map((D) =>
                  null != D && D.redirect
                    ? {
                        ...D,
                        redirect: { to: { key: e.name, value: D.redirect } },
                      }
                    : D,
                ));
              break;
            case "boolean":
              i = it2;
              break;
            case "flag":
              (i = n),
                (u.flags = r.flatMap((D) =>
                  [
                    D.alias,
                    D.description && D.name,
                    D.oppositeDescription && `no-${D.name}`,
                  ].filter(Boolean),
                ));
              break;
            default:
              throw new Error(`Unexpected type ${e.type}`);
          }
          if (
            (e.exception
              ? (u.validate = (D, a, c) => e.exception(D) || a.validate(D, c))
              : (u.validate = (D, a, c) => void 0 === D || a.validate(D, c)),
            e.redirect &&
              (s.redirect = (D) =>
                D
                  ? { to: { key: e.redirect.option, value: e.redirect.value } }
                  : void 0),
            e.deprecated && (s.deprecated = !0),
            t8 && !e.array)
          ) {
            let D = u.preprocess || ((a) => a);
            u.preprocess = (a, c, d) =>
              c.preprocess(D(Array.isArray(a) ? y(!1, a, -1) : a), d);
          }
          return e.array
            ? ot2.create({
                ...(t8
                  ? { preprocess: (D) => (Array.isArray(D) ? D : [D]) }
                  : {}),
                ...s,
                valueSchema: i.create(u),
              })
            : i.create({ ...u, ...s });
        }
        var sn2 = function Ju(
          e,
          t8,
          {
            logger: r = !1,
            isCLI: n = !1,
            passThrough: o = !1,
            FlagSchema: u,
            descriptor: i,
          } = {},
        ) {
          if (n) {
            if (!u) throw new Error("'FlagSchema' option is required.");
            if (!i) throw new Error("'descriptor' option is required.");
          } else i = te2;
          let s = o
              ? Array.isArray(o)
                ? (f2, p) => (o.includes(f2) ? { [f2]: p } : void 0)
                : (f2, p) => ({ [f2]: p })
              : (f2, p, l) => {
                  let { _: F2, ...m } = l.schemas;
                  return rt2(f2, p, { ...l, schemas: m });
                },
            D = (function Xu(e, { isCLI: t8, FlagSchema: r }) {
              let n = [];
              t8 && n.push(ut2.create({ name: "_" }));
              for (let o of e)
                n.push(Zu(o, { isCLI: t8, optionInfos: e, FlagSchema: r })),
                  o.alias &&
                    t8 &&
                    n.push(nt2.create({ name: o.alias, sourceName: o.name }));
              return n;
            })(t8, { isCLI: n, FlagSchema: u }),
            a = new lt(D, { logger: r, unknown: s, descriptor: i }),
            c = !1 !== r;
          c && It2 && (a._hasDeprecationWarned = It2);
          let d = a.normalize(e);
          return c && (It2 = a._hasDeprecationWarned), d;
        };
        function Rt2(e, t8) {
          if (!t8) throw new Error("parserName is required.");
          for (let n = e.length - 1; n >= 0; n--) {
            let o = e[n];
            if (
              o.parsers &&
              Object.prototype.hasOwnProperty.call(o.parsers, t8)
            )
              return o;
          }
          let r = `Couldn't resolve parser "${t8}".`;
          throw (
            ((r +=
              " Plugins must be explicitly added to the standalone bundle."),
            new Se2(r))
          );
        }
        function ft2({ plugins: e, parser: t8 }) {
          return Yt(Rt2(e, t8), t8);
        }
        function Yt(e, t8) {
          let r = e.parsers[t8];
          return "function" == typeof r ? r() : r;
        }
        var cn2 = {
          astFormat: "estree",
          printer: {},
          originalText: void 0,
          locStart: null,
          locEnd: null,
        };
        var re2 = async function Qu(e, t8 = {}) {
            var d;
            let r = { ...e };
            if (!r.parser) {
              if (!r.filepath)
                throw new ve2(
                  "No parser and no file path given, couldn't infer a parser.",
                );
              if (((r.parser = Rr(r, { physicalFile: r.filepath })), !r.parser))
                throw new ve2(
                  `No parser could be inferred for file "${r.filepath}".`,
                );
            }
            let n = et2({ plugins: e.plugins, showDeprecated: !0 }).options,
              o = {
                ...cn2,
                ...Object.fromEntries(
                  n
                    .filter((f2) => void 0 !== f2.default)
                    .map((f2) => [f2.name, f2.default]),
                ),
              },
              u = Rt2(r.plugins, r.parser),
              i = await Yt(u, r.parser);
            (r.astFormat = i.astFormat),
              (r.locEnd = i.locEnd),
              (r.locStart = i.locStart);
            let s =
                null != (d = u.printers) && d[i.astFormat]
                  ? u
                  : (function Dn2(e, t8) {
                      if (!t8) throw new Error("astFormat is required.");
                      for (let n = e.length - 1; n >= 0; n--) {
                        let o = e[n];
                        if (
                          o.printers &&
                          Object.prototype.hasOwnProperty.call(o.printers, t8)
                        )
                          return o;
                      }
                      let r = `Couldn't find plugin for AST format "${t8}".`;
                      throw (
                        ((r +=
                          " Plugins must be explicitly added to the standalone bundle."),
                        new Se2(r))
                      );
                    })(r.plugins, i.astFormat),
              D = await (function an2(e, t8) {
                let r = e.printers[t8];
                return "function" == typeof r ? r() : r;
              })(s, i.astFormat);
            r.printer = D;
            let c = {
              ...o,
              ...(s.defaultOptions
                ? Object.fromEntries(
                    Object.entries(s.defaultOptions).filter(
                      ([, f2]) => void 0 !== f2,
                    ),
                  )
                : {}),
            };
            for (let [f2, p] of Object.entries(c))
              (null === r[f2] || void 0 === r[f2]) && (r[f2] = p);
            return (
              "json" === r.parser && (r.trailingComma = "none"),
              sn2(r, n, { passThrough: Object.keys(cn2), ...t8 })
            );
          },
          ln2 = new Set([
            "tokens",
            "comments",
            "parent",
            "enclosingNode",
            "precedingNode",
            "followingNode",
          ]),
          eo = (e) => Object.keys(e).filter((t8) => !ln2.has(t8));
        var H2 = function to(e) {
          return e ? (t8) => e(t8, ln2) : eo;
        };
        var fn2 = function ro2(e, t8) {
            let {
              printer: { massageAstNode: r, getVisitorKeys: n },
            } = t8;
            if (!r) return e;
            let o = H2(n),
              u = r.ignoredProperties ?? new Set();
            return (function i(s, D) {
              if (null === s || "object" != typeof s) return s;
              if (Array.isArray(s))
                return s.map((f2) => i(f2, D)).filter(Boolean);
              let a = {},
                c = new Set(o(s));
              for (let f2 in s)
                !Object.prototype.hasOwnProperty.call(s, f2) ||
                  u.has(f2) ||
                  (c.has(f2) ? (a[f2] = i(s[f2], s)) : (a[f2] = s[f2]));
              let d = r(s, a, D);
              if (null !== d) return d ?? a;
            })(e);
          },
          An2 = he2(yn2(), 1);
        var Ie,
          $t2,
          de2,
          pt2,
          De2 = async function co2(e, t8) {
            let o,
              r = await ft2(t8),
              n = r.preprocess ? r.preprocess(e, t8) : e;
            t8.originalText = n;
            try {
              o = await r.parse(n, t8, t8);
            } catch (u) {
              !(function lo2(e, t8) {
                let { loc: r } = e;
                if (r) {
                  let n = (0, An2.codeFrameColumns)(t8, r, {
                    highlightCode: !0,
                  });
                  throw ((e.message += "\n" + n), (e.codeFrame = n), e);
                }
                throw e;
              })(u, e);
            }
            return { text: n, ast: o };
          };
        (Ie = new WeakSet()),
          ($t2 = function (t8) {
            let { stack: r } = this;
            for (let n = r.length - 1; n >= 0; n -= 2)
              if (!Array.isArray(r[n]) && --t8 < 0) return n;
            return -1;
          }),
          (de2 = new WeakSet()),
          (pt2 = function* () {
            let { stack: t8 } = this;
            for (let r = t8.length - 3; r >= 0; r -= 2) {
              let n = t8[r];
              Array.isArray(n) || (yield n);
            }
          });
        var Bn2 = class {
            constructor(t8) {
              ht2(this, Ie), ht2(this, de2), (this.stack = [t8]);
            }
            get key() {
              let { stack: t8, siblings: r } = this;
              return y(!1, t8, null === r ? -2 : -4) ?? null;
            }
            get index() {
              return null === this.siblings ? null : y(!1, this.stack, -2);
            }
            get node() {
              return y(!1, this.stack, -1);
            }
            get parent() {
              return this.getNode(1);
            }
            get grandparent() {
              return this.getNode(2);
            }
            get isInArray() {
              return null !== this.siblings;
            }
            get siblings() {
              let { stack: t8 } = this,
                r = y(!1, t8, -3);
              return Array.isArray(r) ? r : null;
            }
            get next() {
              let { siblings: t8 } = this;
              return null === t8 ? null : t8[this.index + 1];
            }
            get previous() {
              let { siblings: t8 } = this;
              return null === t8 ? null : t8[this.index - 1];
            }
            get isFirst() {
              return 0 === this.index;
            }
            get isLast() {
              let { siblings: t8, index: r } = this;
              return null !== t8 && r === t8.length - 1;
            }
            get isRoot() {
              return 1 === this.stack.length;
            }
            get root() {
              return this.stack[0];
            }
            get ancestors() {
              return [...ce2(this, de2, pt2).call(this)];
            }
            getName() {
              let { stack: t8 } = this,
                { length: r } = t8;
              return r > 1 ? y(!1, t8, -2) : null;
            }
            getValue() {
              return y(!1, this.stack, -1);
            }
            getNode(t8 = 0) {
              let r = ce2(this, Ie, $t2).call(this, t8);
              return -1 === r ? null : this.stack[r];
            }
            getParentNode(t8 = 0) {
              return this.getNode(t8 + 1);
            }
            call(t8, ...r) {
              let { stack: n } = this,
                { length: o } = n,
                u = y(!1, n, -1);
              for (let i of r) (u = u[i]), n.push(i, u);
              try {
                return t8(this);
              } finally {
                n.length = o;
              }
            }
            callParent(t8, r = 0) {
              let n = ce2(this, Ie, $t2).call(this, r + 1),
                o = this.stack.splice(n + 1);
              try {
                return t8(this);
              } finally {
                this.stack.push(...o);
              }
            }
            each(t8, ...r) {
              let { stack: n } = this,
                { length: o } = n,
                u = y(!1, n, -1);
              for (let i of r) (u = u[i]), n.push(i, u);
              try {
                for (let i = 0; i < u.length; ++i)
                  n.push(i, u[i]), t8(this, i, u), (n.length -= 2);
              } finally {
                n.length = o;
              }
            }
            map(t8, ...r) {
              let n = [];
              return (
                this.each(
                  (o, u, i) => {
                    n[u] = t8(o, u, i);
                  },
                  ...r,
                ),
                n
              );
            }
            match(...t8) {
              let r = this.stack.length - 1,
                n = null,
                o = this.stack[r--];
              for (let u of t8) {
                if (void 0 === o) return !1;
                let i = null;
                if (
                  ("number" == typeof n &&
                    ((i = n), (n = this.stack[r--]), (o = this.stack[r--])),
                  u && !u(o, n, i))
                )
                  return !1;
                (n = this.stack[r--]), (o = this.stack[r--]);
              }
              return !0;
            }
            findAncestor(t8) {
              for (let r of ce2(this, de2, pt2).call(this)) if (t8(r)) return r;
            }
            hasAncestor(t8) {
              for (let r of ce2(this, de2, pt2).call(this))
                if (t8(r)) return !0;
              return !1;
            }
          },
          _n2 = new Proxy(() => {}, { get: () => _n2 }),
          Re2 = _n2;
        function me2(e) {
          return (t8, r, n) => {
            let o = !(null == n || !n.backwards);
            if (!1 === r) return !1;
            let { length: u } = t8,
              i = r;
            for (; i >= 0 && i < u; ) {
              let s = t8.charAt(i);
              if (e instanceof RegExp) {
                if (!e.test(s)) return i;
              } else if (!e.includes(s)) return i;
              o ? i-- : i++;
            }
            return (-1 === i || i === u) && i;
          };
        }
        var xn2 = me2(/\s/),
          N2 = me2(" \t"),
          dt2 = me2(",; \t"),
          mt2 = me2(/[^\n\r]/);
        var Y2 = function fo2(e, t8, r) {
          let n = !(null == r || !r.backwards);
          if (!1 === t8) return !1;
          let o = e.charAt(t8);
          if (n) {
            if ("\r" === e.charAt(t8 - 1) && "\n" === o) return t8 - 2;
            if ("\n" === o || "\r" === o || "\u2028" === o || "\u2029" === o)
              return t8 - 1;
          } else {
            if ("\r" === o && "\n" === e.charAt(t8 + 1)) return t8 + 2;
            if ("\n" === o || "\r" === o || "\u2028" === o || "\u2029" === o)
              return t8 + 1;
          }
          return t8;
        };
        var V2 = function Fo(e, t8, r = {}) {
          let n = N2(e, r.backwards ? t8 - 1 : t8, r);
          return n !== Y2(e, n, r);
        };
        var Mt2 = function po2(e) {
          return Array.isArray(e) && e.length > 0;
        };
        var kn2 = function mo2(e) {
          return null !== e && "object" == typeof e;
        };
        function* Wt2(e, t8) {
          let { getVisitorKeys: r, filter: n = () => !0 } = t8,
            o = (u) => kn2(u) && n(u);
          for (let u of r(e)) {
            let i = e[u];
            if (Array.isArray(i)) for (let s of i) o(s) && (yield s);
            else o(i) && (yield i);
          }
        }
        function Ut2(e, t8) {
          (e.comments ?? (e.comments = [])).push(t8),
            (t8.printed = !1),
            (t8.nodeDescription = (function Eo2(e) {
              let t8 = e.type || e.kind || "(unknown type)",
                r = String(
                  e.name ||
                    (e.id && ("object" == typeof e.id ? e.id.name : e.id)) ||
                    (e.key &&
                      ("object" == typeof e.key ? e.key.name : e.key)) ||
                    (e.value &&
                      ("object" == typeof e.value ? "" : String(e.value))) ||
                    e.operator ||
                    "",
                );
              return (
                r.length > 20 && (r = r.slice(0, 19) + "…"),
                t8 + (r ? " " + r : "")
              );
            })(e));
        }
        function ne2(e, t8) {
          (t8.leading = !0), (t8.trailing = !1), Ut2(e, t8);
        }
        function X2(e, t8, r) {
          (t8.leading = !1),
            (t8.trailing = !1),
            r && (t8.marker = r),
            Ut2(e, t8);
        }
        function ue2(e, t8) {
          (t8.leading = !1), (t8.trailing = !0), Ut2(e, t8);
        }
        var zt2 = new WeakMap();
        function Et2(e, t8) {
          if (zt2.has(e)) return zt2.get(e);
          let {
            printer: {
              getCommentChildNodes: r,
              canAttachComment: n,
              getVisitorKeys: o,
            },
            locStart: u,
            locEnd: i,
          } = t8;
          if (!n) return [];
          let s = (
            r?.(e, t8) ?? [...Wt2(e, { getVisitorKeys: H2(o) })]
          ).flatMap((D) => (n(D) ? [D] : Et2(D, t8)));
          return s.sort((D, a) => u(D) - u(a) || i(D) - i(a)), zt2.set(e, s), s;
        }
        function On2(e, t8, r, n) {
          let a,
            c,
            { locStart: o, locEnd: u } = r,
            i = o(t8),
            s = u(t8),
            D = Et2(e, r),
            d = 0,
            f2 = D.length;
          for (; d < f2; ) {
            let p = (d + f2) >> 1,
              l = D[p],
              F2 = o(l),
              m = u(l);
            if (F2 <= i && s <= m) return On2(l, t8, r, l);
            if (m <= i) (a = l), (d = p + 1);
            else {
              if (!(s <= F2))
                throw new Error("Comment location overlaps with node location");
              (c = l), (f2 = p);
            }
          }
          if ("TemplateLiteral" === n?.type) {
            let { quasis: p } = n,
              l = Kt2(p, t8, r);
            a && Kt2(p, a, r) !== l && (a = null),
              c && Kt2(p, c, r) !== l && (c = null);
          }
          return { enclosingNode: n, precedingNode: a, followingNode: c };
        }
        var Gt = () => !1;
        var Tn2 = (e) => !/[\S\n\u2028\u2029]/.test(e);
        function Co2(e, t8, r, n) {
          let { comment: o, precedingNode: u } = r[n],
            { locStart: i, locEnd: s } = t8,
            D = i(o);
          if (u)
            for (let a = n - 1; a >= 0; a--) {
              let { comment: c, precedingNode: d } = r[a];
              if (d !== u || !Tn2(e.slice(s(c), D))) break;
              D = i(c);
            }
          return V2(e, D, { backwards: !0 });
        }
        function ho2(e, t8, r, n) {
          let { comment: o, followingNode: u } = r[n],
            { locStart: i, locEnd: s } = t8,
            D = s(o);
          if (u)
            for (let a = n + 1; a < r.length; a++) {
              let { comment: c, followingNode: d } = r[a];
              if (d !== u || !Tn2(e.slice(D, i(c)))) break;
              D = s(c);
            }
          return V2(e, D);
        }
        function wn2(e, t8) {
          var s, D;
          let r = e.length;
          if (0 === r) return;
          let i,
            { precedingNode: n, followingNode: o } = e[0],
            u = t8.locStart(o);
          for (i = r; i > 0; --i) {
            let { comment: a, precedingNode: c, followingNode: d } = e[i - 1];
            Re2.strictEqual(c, n), Re2.strictEqual(d, o);
            let f2 = t8.originalText.slice(t8.locEnd(a), u);
            if (
              !(
                (null == (D = (s = t8.printer).isGap)
                  ? void 0
                  : D.call(s, f2, t8)) ?? /^[\s(]*$/.test(f2)
              )
            )
              break;
            u = t8.locStart(a);
          }
          for (let [a, { comment: c }] of e.entries())
            a < i ? ue2(n, c) : ne2(o, c);
          for (let a of [n, o])
            a.comments &&
              a.comments.length > 1 &&
              a.comments.sort((c, d) => t8.locStart(c) - t8.locStart(d));
          e.length = 0;
        }
        function Kt2(e, t8, r) {
          let n = r.locStart(t8) - 1;
          for (let o = 1; o < e.length; ++o)
            if (n < r.locStart(e[o])) return o - 1;
          return 0;
        }
        var Ye2 = function go2(e, t8) {
          let r = t8 - 1;
          return (
            (r = N2(e, r, { backwards: !0 })),
            (r = Y2(e, r, { backwards: !0 })),
            (r = N2(e, r, { backwards: !0 })),
            r !== Y2(e, r, { backwards: !0 })
          );
        };
        function Sn2(e, t8) {
          return (e.node.printed = !0), t8.printer.printComment(e, t8);
        }
        function Bo(e, t8) {
          let r = e.node;
          if (!r) return {};
          let n = t8[Symbol.for("printedComments")];
          if (0 === (r.comments || []).filter((D) => !n.has(D)).length)
            return { leading: "", trailing: "" };
          let s,
            u = [],
            i = [];
          return (
            e.each(() => {
              let D = e.node;
              if (null != n && n.has(D)) return;
              let { leading: a, trailing: c } = D;
              a
                ? u.push(
                    (function yo2(e, t8) {
                      var c;
                      let r = e.node,
                        n = [Sn2(e, t8)],
                        {
                          printer: o,
                          originalText: u,
                          locStart: i,
                          locEnd: s,
                        } = t8;
                      if (null != (c = o.isBlockComment) && c.call(o, r)) {
                        let d = V2(u, s(r))
                          ? V2(u, i(r), { backwards: !0 })
                            ? G2
                            : Ke2
                          : " ";
                        n.push(d);
                      } else n.push(G2);
                      let a = Y2(u, N2(u, s(r)));
                      return !1 !== a && V2(u, a) && n.push(G2), n;
                    })(e, t8),
                  )
                : c &&
                  ((s = (function Ao2(e, t8, r) {
                    var a;
                    let n = e.node,
                      o = Sn2(e, t8),
                      { printer: u, originalText: i, locStart: s } = t8,
                      D =
                        null == (a = u.isBlockComment) ? void 0 : a.call(u, n);
                    if (
                      (null != r &&
                        r.hasLineSuffix &&
                        (null == r || !r.isBlock)) ||
                      V2(i, s(n), { backwards: !0 })
                    ) {
                      let c = Ye2(i, s(n));
                      return {
                        doc: Be2([G2, c ? G2 : "", o]),
                        isBlock: D,
                        hasLineSuffix: !0,
                      };
                    }
                    return !D || (null != r && r.hasLineSuffix)
                      ? {
                          doc: [Be2([" ", o]), le2],
                          isBlock: D,
                          hasLineSuffix: !0,
                        }
                      : { doc: [" ", o], isBlock: D, hasLineSuffix: !1 };
                  })(e, t8, s)),
                  i.push(s.doc));
            }, "comments"),
            { leading: u, trailing: i }
          );
        }
        async function Ln2(e, t8, r, n, o) {
          let {
            embeddedLanguageFormatting: u,
            printer: {
              embed: i,
              hasPrettierIgnore: s = () => !1,
              getVisitorKeys: D,
            },
          } = r;
          if (!i || "auto" !== u) return;
          if (i.length > 2)
            throw new Error(
              "printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/en/plugins.html#optional-embed",
            );
          let a = H2(i.getVisitorKeys ?? D),
            c = [];
          !(function p() {
            let { node: l } = e;
            if (null === l || "object" != typeof l || s(e)) return;
            for (let m of a(l))
              Array.isArray(l[m]) ? e.each(p, m) : e.call(p, m);
            let F2 = i(e, r);
            if (F2) {
              if ("function" == typeof F2)
                return void c.push({
                  print: F2,
                  node: l,
                  pathStack: [...e.stack],
                });
              o.set(l, F2);
            }
          })();
          let d = e.stack;
          for (let { print: l, node: F2, pathStack: m } of c)
            try {
              e.stack = m;
              let E2 = await l(f2, t8, e, r);
              E2 && o.set(F2, E2);
            } catch (E2) {
              if (globalThis.PRETTIER_DEBUG) throw E2;
            }
          function f2(l, F2) {
            return (async function _o2(e, t8, r, n) {
              let o = await re2(
                  { ...r, ...t8, parentParser: r.parser, originalText: e },
                  { passThrough: !0 },
                ),
                { ast: u } = await De2(e, o),
                i = await n(u, o);
              return Xe2(i);
            })(l, F2, r, n);
          }
          e.stack = d;
        }
        var Rn2 = function ko(e, t8) {
          let {
              originalText: r,
              [Symbol.for("comments")]: n,
              locStart: o,
              locEnd: u,
              [Symbol.for("printedComments")]: i,
            } = t8,
            { node: s } = e,
            D = o(s),
            a = u(s);
          for (let c of n) o(c) >= D && u(c) <= a && i.add(c);
          return r.slice(D, a);
        };
        async function je2(e, t8) {
          ({ ast: e } = await Ht2(e, t8));
          let r = new Map(),
            n = new Bn2(e),
            u = new Map();
          await Ln2(n, s, t8, je2, u);
          let i = await Yn2(n, t8, s, void 0, u);
          return (
            (function Pn(e) {
              let {
                [Symbol.for("comments")]: t8,
                [Symbol.for("printedComments")]: r,
              } = e;
              for (let n of t8) {
                if (!n.printed && !r.has(n))
                  throw new Error(
                    'Comment "' +
                      n.value.trim() +
                      '" was not printed. Please report this error!',
                  );
                delete n.printed;
              }
            })(t8),
            i
          );
          function s(a, c) {
            return void 0 === a || a === n
              ? D(c)
              : Array.isArray(a)
                ? n.call(() => D(c), ...a)
                : n.call(() => D(c), a);
          }
          function D(a) {
            let c = n.node;
            if (null == c) return "";
            let d = c && "object" == typeof c && void 0 === a;
            if (d && r.has(c)) return r.get(c);
            let f2 = Yn2(n, t8, s, a, u);
            return d && r.set(c, f2), f2;
          }
        }
        function Yn2(e, t8, r, n, o) {
          var D;
          let s,
            { node: u } = e,
            { printer: i } = t8;
          return (
            (s =
              null != (D = i.hasPrettierIgnore) && D.call(i, e)
                ? Rn2(e, t8)
                : o.has(u)
                  ? o.get(u)
                  : i.print(e, t8, r, n)),
            u === t8.cursorNode && (s = Ze2(s, (a) => [xe2, a, xe2])),
            i.printComment &&
              (!i.willPrintOwnComments || !i.willPrintOwnComments(e, t8)) &&
              (s = (function vn2(e, t8, r) {
                let { leading: n, trailing: o } = Bo(e, r);
                return n || o ? Ze2(t8, (u) => [n, u, o]) : t8;
              })(e, s, t8)),
            s
          );
        }
        async function Ht2(e, t8) {
          let r = e.comments ?? [];
          (t8[Symbol.for("comments")] = r),
            (t8[Symbol.for("tokens")] = e.tokens ?? []),
            (t8[Symbol.for("printedComments")] = new Set()),
            (function Nn2(e, t8) {
              let { comments: r } = e;
              if ((delete e.comments, !Mt2(r) || !t8.printer.canAttachComment))
                return;
              let n = [],
                {
                  locStart: o,
                  locEnd: u,
                  printer: {
                    experimentalFeatures: { avoidAstMutation: i = !1 } = {},
                    handleComments: s = {},
                  },
                  originalText: D,
                } = t8,
                { ownLine: a = Gt, endOfLine: c = Gt, remaining: d = Gt } = s,
                f2 = r.map((p, l) => ({
                  ...On2(e, p, t8),
                  comment: p,
                  text: D,
                  options: t8,
                  ast: e,
                  isLastComment: r.length - 1 === l,
                }));
              for (let [p, l] of f2.entries()) {
                let $,
                  {
                    comment: F2,
                    precedingNode: m,
                    enclosingNode: E2,
                    followingNode: C,
                    text: g,
                    options: h2,
                    ast: B,
                    isLastComment: Z,
                  } = l;
                if (
                  "json" === h2.parser ||
                  "json5" === h2.parser ||
                  "__js_expression" === h2.parser ||
                  "__ts_expression" === h2.parser ||
                  "__vue_expression" === h2.parser ||
                  "__vue_ts_expression" === h2.parser
                ) {
                  if (o(F2) - o(B) <= 0) {
                    ne2(B, F2);
                    continue;
                  }
                  if (u(F2) - u(B) >= 0) {
                    ue2(B, F2);
                    continue;
                  }
                }
                if (
                  (i
                    ? ($ = [l])
                    : ((F2.enclosingNode = E2),
                      (F2.precedingNode = m),
                      (F2.followingNode = C),
                      ($ = [F2, g, h2, B, Z])),
                  Co2(g, h2, f2, p))
                )
                  (F2.placement = "ownLine"),
                    a(...$) ||
                      (C ? ne2(C, F2) : m ? ue2(m, F2) : X2(E2 || B, F2));
                else if (ho2(g, h2, f2, p))
                  (F2.placement = "endOfLine"),
                    c(...$) ||
                      (m ? ue2(m, F2) : C ? ne2(C, F2) : X2(E2 || B, F2));
                else if (((F2.placement = "remaining"), !d(...$)))
                  if (m && C) {
                    let Q2 = n.length;
                    Q2 > 0 && n[Q2 - 1].followingNode !== C && wn2(n, h2),
                      n.push(l);
                  } else m ? ue2(m, F2) : C ? ne2(C, F2) : X2(E2 || B, F2);
              }
              if ((wn2(n, t8), !i))
                for (let p of r)
                  delete p.precedingNode,
                    delete p.enclosingNode,
                    delete p.followingNode;
            })(e, t8);
          let {
            printer: { preprocess: n },
          } = t8;
          return { ast: (e = n ? await n(e, t8) : e), comments: r };
        }
        var bo2 = ({ parser: e }) =>
          "json" === e || "json5" === e || "json-stringify" === e;
        function jn2(e) {
          let t8 = e.length - 1;
          for (;;) {
            let r = e[t8];
            if ("Program" !== r?.type && "File" !== r?.type) break;
            t8--;
          }
          return e.slice(0, t8 + 1);
        }
        function qt2(e, t8, r, n, o = [], u) {
          let { locStart: i, locEnd: s } = r,
            D = i(e),
            a = s(e);
          if (
            !(
              t8 > a ||
              t8 < D ||
              ("rangeEnd" === u && t8 === D) ||
              ("rangeStart" === u && t8 === a)
            )
          ) {
            for (let c of Et2(e, r)) {
              let d = qt2(c, t8, r, n, [e, ...o], u);
              if (d) return d;
            }
            if (!n || n(e, o[0])) return { node: e, parentNodes: o };
          }
        }
        var $n2 = new Set([
            "JsonRoot",
            "ObjectExpression",
            "ArrayExpression",
            "StringLiteral",
            "NumericLiteral",
            "BooleanLiteral",
            "NullLiteral",
            "UnaryExpression",
            "TemplateLiteral",
          ]),
          To2 = new Set([
            "OperationDefinition",
            "FragmentDefinition",
            "VariableDefinition",
            "TypeExtensionDefinition",
            "ObjectTypeDefinition",
            "FieldDefinition",
            "DirectiveDefinition",
            "EnumTypeDefinition",
            "EnumValueDefinition",
            "InputValueDefinition",
            "InputObjectTypeDefinition",
            "SchemaDefinition",
            "OperationTypeDefinition",
            "InterfaceTypeDefinition",
            "UnionTypeDefinition",
            "ScalarTypeDefinition",
          ]);
        function Vn2(e, t8, r) {
          if (!t8) return !1;
          switch (e.parser) {
            case "flow":
            case "babel":
            case "babel-flow":
            case "babel-ts":
            case "typescript":
            case "acorn":
            case "espree":
            case "meriyah":
            case "__babel_estree":
              return (function No(e, t8) {
                return (
                  "DeclareExportDeclaration" !== t8 &&
                  "TypeParameterDeclaration" !== e &&
                  ("Directive" === e ||
                    "TypeAlias" === e ||
                    "TSExportAssignment" === e ||
                    e.startsWith("Declare") ||
                    e.startsWith("TSDeclare") ||
                    e.endsWith("Statement") ||
                    e.endsWith("Declaration"))
                );
              })(t8.type, r?.type);
            case "json":
            case "json5":
            case "json-stringify":
              return $n2.has(t8.type);
            case "graphql":
              return To2.has(t8.kind);
            case "vue":
              return "root" !== t8.tag;
          }
          return !1;
        }
        function Mn2(e, t8, r) {
          let { rangeStart: n, rangeEnd: o, locStart: u, locEnd: i } = t8;
          Re2.ok(o > n);
          let s = e.slice(n, o).search(/\S/),
            D = -1 === s;
          if (!D) for (n += s; o > n && !/\S/.test(e[o - 1]); --o);
          let d,
            f2,
            a = qt2(r, n, t8, (p, l) => Vn2(t8, p, l), [], "rangeStart"),
            c = D ? a : qt2(r, o, t8, (p) => Vn2(t8, p), [], "rangeEnd");
          if (!a || !c) return { rangeStart: 0, rangeEnd: 0 };
          if (bo2(t8)) {
            let p = (function wo2(e, t8) {
              let r = [e.node, ...e.parentNodes],
                n = new Set([t8.node, ...t8.parentNodes]);
              return r.find((o) => $n2.has(o.type) && n.has(o));
            })(a, c);
            (d = p), (f2 = p);
          } else
            ({ startNode: d, endNode: f2 } = (function Oo(
              e,
              t8,
              { locStart: r, locEnd: n },
            ) {
              let o = e.node,
                u = t8.node;
              if (o === u) return { startNode: o, endNode: u };
              let i = r(e.node);
              for (let D of jn2(t8.parentNodes)) {
                if (!(r(D) >= i)) break;
                u = D;
              }
              let s = n(t8.node);
              for (let D of jn2(e.parentNodes)) {
                if (!(n(D) <= s)) break;
                if (((o = D), o === u)) break;
              }
              return { startNode: o, endNode: u };
            })(a, c, t8));
          return {
            rangeStart: Math.min(u(d), u(f2)),
            rangeEnd: Math.max(i(d), i(f2)),
          };
        }
        var Wn2 = function So2(e, t8) {
            let { cursorOffset: r, locStart: n, locEnd: o } = t8,
              u = H2(t8.printer.getVisitorKeys),
              i = (D) => n(D) <= r && o(D) >= r,
              s = e;
            for (let D of (function* bn2(e, t8) {
              let r = [e];
              for (let n = 0; n < r.length; n++) {
                let o = r[n];
                for (let u of Wt2(o, t8)) yield u, r.push(u);
              }
            })(e, { getVisitorKeys: u, filter: i }))
              s = D;
            return s;
          },
          Hn2 = "\ufeff",
          Un2 = Symbol("cursor");
        async function qn2(e, t8, r = 0) {
          if (!e || 0 === e.trim().length)
            return { formatted: "", cursorOffset: -1, comments: [] };
          let { ast: n, text: o } = await De2(e, t8);
          t8.cursorOffset >= 0 && (t8.cursorNode = Wn2(n, t8));
          let u = await je2(n, t8);
          r > 0 && (u = qe2([G2, u], r, t8.tabWidth));
          let i = fe2(u, t8);
          if (r > 0) {
            let D = i.formatted.trim();
            void 0 !== i.cursorNodeStart &&
              (i.cursorNodeStart -= i.formatted.indexOf(D)),
              (i.formatted = D + be2(t8.endOfLine));
          }
          let s = t8[Symbol.for("comments")];
          if (t8.cursorOffset >= 0) {
            let D, a, c, d, f2;
            if (
              (t8.cursorNode && i.cursorNodeText
                ? ((D = t8.locStart(t8.cursorNode)),
                  (a = o.slice(D, t8.locEnd(t8.cursorNode))),
                  (c = t8.cursorOffset - D),
                  (d = i.cursorNodeStart),
                  (f2 = i.cursorNodeText))
                : ((D = 0),
                  (a = o),
                  (c = t8.cursorOffset),
                  (d = 0),
                  (f2 = i.formatted)),
              a === f2)
            )
              return {
                formatted: i.formatted,
                cursorOffset: d + c,
                comments: s,
              };
            let p = a.split("");
            p.splice(c, 0, Un2);
            let l = f2.split(""),
              F2 = (0, Kn2.diffArrays)(p, l),
              m = d;
            for (let E2 of F2)
              if (E2.removed) {
                if (E2.value.includes(Un2)) break;
              } else m += E2.count;
            return { formatted: i.formatted, cursorOffset: m, comments: s };
          }
          return { formatted: i.formatted, cursorOffset: -1, comments: s };
        }
        function Jt2(e, t8, r) {
          return "number" != typeof t8 ||
            Number.isNaN(t8) ||
            t8 < 0 ||
            t8 > e.length
            ? r
            : t8;
        }
        function zn2(e, t8) {
          let { cursorOffset: r, rangeStart: n, rangeEnd: o } = t8;
          return (
            (r = Jt2(e, r, -1)),
            (n = Jt2(e, n, 0)),
            (o = Jt2(e, o, e.length)),
            { ...t8, cursorOffset: r, rangeStart: n, rangeEnd: o }
          );
        }
        function Jn2(e, t8) {
          let {
              cursorOffset: r,
              rangeStart: n,
              rangeEnd: o,
              endOfLine: u,
            } = zn2(e, t8),
            i = e.charAt(0) === Hn2;
          if (
            (i && ((e = e.slice(1)), r--, n--, o--),
            "auto" === u &&
              (u = (function hr2(e) {
                let t8 = e.indexOf("\r");
                return t8 >= 0
                  ? "\n" === e.charAt(t8 + 1)
                    ? "crlf"
                    : "cr"
                  : "lf";
              })(e)),
            e.includes("\r"))
          ) {
            let s = (D) => _t2(e.slice(0, Math.max(D, 0)), "\r\n");
            (r -= s(r)),
              (n -= s(n)),
              (o -= s(o)),
              (e = (function gr2(e) {
                return ee2(!1, e, /\r\n?/g, "\n");
              })(e));
          }
          return {
            hasBOM: i,
            text: e,
            options: zn2(e, {
              ...t8,
              cursorOffset: r,
              rangeStart: n,
              rangeEnd: o,
              endOfLine: u,
            }),
          };
        }
        async function Gn2(e, t8) {
          let r = await ft2(t8);
          return !r.hasPragma || r.hasPragma(e);
        }
        async function Xt2(e, t8) {
          let u,
            { hasBOM: r, text: n, options: o } = Jn2(e, await re2(t8));
          return (o.rangeStart >= o.rangeEnd && "" !== n) ||
            (o.requirePragma && !(await Gn2(n, o)))
            ? { formatted: e, cursorOffset: t8.cursorOffset, comments: [] }
            : (o.rangeStart > 0 || o.rangeEnd < n.length
                ? (u = await (async function vo2(e, t8) {
                    let { ast: r, text: n } = await De2(e, t8),
                      { rangeStart: o, rangeEnd: u } = Mn2(n, t8, r),
                      i = n.slice(o, u),
                      s = Math.min(o, n.lastIndexOf("\n", o) + 1),
                      D = n.slice(s, o).match(/^\s*/)[0],
                      a = Fe2(D, t8.tabWidth),
                      c = await qn2(
                        i,
                        {
                          ...t8,
                          rangeStart: 0,
                          rangeEnd: Number.POSITIVE_INFINITY,
                          cursorOffset:
                            t8.cursorOffset > o && t8.cursorOffset <= u
                              ? t8.cursorOffset - o
                              : -1,
                          endOfLine: "lf",
                        },
                        a,
                      ),
                      d = c.formatted.trimEnd(),
                      { cursorOffset: f2 } = t8;
                    f2 > u
                      ? (f2 += d.length - i.length)
                      : c.cursorOffset >= 0 && (f2 = c.cursorOffset + o);
                    let p = n.slice(0, o) + d + n.slice(u);
                    if ("lf" !== t8.endOfLine) {
                      let l = be2(t8.endOfLine);
                      f2 >= 0 &&
                        "\r\n" === l &&
                        (f2 += _t2(p.slice(0, f2), "\n")),
                        (p = ee2(!1, p, "\n", l));
                    }
                    return {
                      formatted: p,
                      cursorOffset: f2,
                      comments: c.comments,
                    };
                  })(n, o))
                : (!o.requirePragma &&
                    o.insertPragma &&
                    o.printer.insertPragma &&
                    !(await Gn2(n, o)) &&
                    (n = o.printer.insertPragma(n)),
                  (u = await qn2(n, o))),
              r &&
                ((u.formatted = Hn2 + u.formatted),
                u.cursorOffset >= 0 && u.cursorOffset++),
              u);
        }
        var Qt2 = {};
        We(Qt2, {
          addDanglingComment: () => X2,
          addLeadingComment: () => ne2,
          addTrailingComment: () => ue2,
          getAlignmentSize: () => Fe2,
          getIndentSize: () => nu,
          getMaxContinuousCount: () => ru,
          getNextNonSpaceNonCommentCharacter: () => iu,
          getNextNonSpaceNonCommentCharacterIndex: () => Go,
          getStringWidth: () => we2,
          hasNewline: () => V2,
          hasNewlineInRange: () => uu,
          hasSpaces: () => ou,
          isNextLineEmpty: () => Jo,
          isNextLineEmptyAfterIndex: () => Ct2,
          isPreviousLineEmpty: () => Ho,
          makeString: () => su,
          skip: () => me2,
          skipEverythingButNewLine: () => mt2,
          skipInlineComment: () => Ee2,
          skipNewline: () => Y2,
          skipSpaces: () => N2,
          skipToLineEnd: () => dt2,
          skipTrailingComment: () => Ce2,
          skipWhitespace: () => xn2,
        });
        var Ee2 = function Lo(e, t8) {
          if (!1 === t8) return !1;
          if ("/" === e.charAt(t8) && "*" === e.charAt(t8 + 1))
            for (let r = t8 + 2; r < e.length; ++r)
              if ("*" === e.charAt(r) && "/" === e.charAt(r + 1)) return r + 2;
          return t8;
        };
        var Ce2 = function Io(e, t8) {
          return (
            !1 !== t8 &&
            ("/" === e.charAt(t8) && "/" === e.charAt(t8 + 1) ? mt2(e, t8) : t8)
          );
        };
        var Ve2 = function Ro(e, t8) {
          let r = null,
            n = t8;
          for (; n !== r; )
            (r = n),
              (n = N2(e, n)),
              (n = Ee2(e, n)),
              (n = Ce2(e, n)),
              (n = Y2(e, n));
          return n;
        };
        var Ct2 = function Yo(e, t8) {
          let r = null,
            n = t8;
          for (; n !== r; )
            (r = n), (n = dt2(e, n)), (n = Ee2(e, n)), (n = N2(e, n));
          return (n = Ce2(e, n)), (n = Y2(e, n)), !1 !== n && V2(e, n);
        };
        var ru = function jo(e, t8) {
          let r = e.match(
            new RegExp(
              `(${(function Zt2(e) {
                if ("string" != typeof e)
                  throw new TypeError("Expected a string");
                return e
                  .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                  .replace(/-/g, "\\x2d");
              })(t8)})+`,
              "g",
            ),
          );
          return null === r
            ? 0
            : r.reduce((n, o) => Math.max(n, o.length / t8.length), 0);
        };
        var nu = function Vo(e, t8) {
          let r = e.lastIndexOf("\n");
          return -1 === r ? 0 : Fe2(e.slice(r + 1).match(/^[\t ]*/)[0], t8);
        };
        var uu = function $o(e, t8, r) {
          for (let n = t8; n < r; ++n) if ("\n" === e.charAt(n)) return !0;
          return !1;
        };
        var ou = function Mo(e, t8, r = {}) {
          return N2(e, r.backwards ? t8 - 1 : t8, r) !== t8;
        };
        var iu = function Wo(e, t8) {
          let r = Ve2(e, t8);
          return !1 === r ? "" : e.charAt(r);
        };
        var su = function Uo(e, t8, r) {
          let n = '"' === t8 ? "'" : '"',
            u = ee2(!1, e, /\\(.)|(["'])/gs, (i, s, D) =>
              s === n
                ? s
                : D === t8
                  ? "\\" + D
                  : D ||
                    (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(s)
                      ? s
                      : "\\" + s),
            );
          return t8 + u + t8;
        };
        function Go(e, t8) {
          return 2 === arguments.length || "number" == typeof t8
            ? Ve2(e, t8)
            : (function zo(e, t8, r) {
                return Ve2(e, r(t8));
              })(...arguments);
        }
        function Ho(e, t8) {
          return 2 === arguments.length || "number" == typeof t8
            ? Ye2(e, t8)
            : (function Ko(e, t8, r) {
                return Ye2(e, r(t8));
              })(...arguments);
        }
        function Jo(e, t8) {
          return 2 === arguments.length || "number" == typeof t8
            ? Ct2(e, t8)
            : (function qo(e, t8, r) {
                return Ct2(e, r(t8));
              })(...arguments);
        }
        var er2 = {};
        We(er2, { builders: () => Xo, printer: () => Zo, utils: () => Qo });
        var Xo = {
            join: ke2,
            line: Ke2,
            softline: Er2,
            hardline: G2,
            literalline: He2,
            group: At2,
            conditionalGroup: function fr2(e, t8) {
              return At2(e[0], { ...t8, expandedStates: e });
            },
            fill: Ge2,
            lineSuffix: Be2,
            lineSuffixBoundary: dr2,
            cursor: xe2,
            breakParent: le2,
            ifBreak: function Fr2(e, t8 = "", r = {}) {
              return {
                type: x2,
                breakContents: e,
                flatContents: t8,
                groupId: r.groupId,
              };
            },
            trim: mr2,
            indent: ie2,
            indentIfBreak: function pr2(e, t8) {
              return {
                type: P,
                contents: e,
                groupId: t8.groupId,
                negate: t8.negate,
              };
            },
            align: oe2,
            addAlignmentToDoc: qe2,
            markAsRoot: function cr2(e) {
              return oe2({ type: "root" }, e);
            },
            dedentToRoot: function ar2(e) {
              return oe2(Number.NEGATIVE_INFINITY, e);
            },
            dedent: function lr2(e) {
              return oe2(-1, e);
            },
            hardlineWithoutBreakParent: _e2,
            literallineWithoutBreakParent: Bt2,
            label: function Cr2(e, t8) {
              return e ? { type: O2, label: e, contents: t8 } : t8;
            },
            concat: (e) => e,
          },
          Zo = { printDocToString: fe2 },
          Qo = {
            willBreak: function wr2(e) {
              return Je2(e, Su, !1);
            },
            traverseDoc: Ae2,
            findInDoc: Je2,
            mapDoc: Ne2,
            removeLines: function Nr2(e) {
              return Ne2(e, vu);
            },
            stripTrailingHardline: Xe2,
            replaceEndOfLine: function Tr2(e, t8 = He2) {
              return Ne2(e, (r) =>
                "string" == typeof r ? ke2(t8, r.split("\n")) : r,
              );
            },
            canBreak: function Sr2(e) {
              return Je2(e, Iu, !1);
            },
          },
          Du = "3.1.1";
        function ae(e, t8 = 1) {
          return async (...r) => {
            let n = r[t8] ?? {},
              o = n.plugins ?? [];
            return (
              (r[t8] = {
                ...n,
                plugins: Array.isArray(o) ? o : Object.values(o),
              }),
              e(...r)
            );
          };
        }
        var au = ae(Xt2);
        async function cu(e, t8) {
          let { formatted: r } = await au(e, { ...t8, cursorOffset: -1 });
          return r;
        }
        async function ei2(e, t8) {
          return (await cu(e, t8)) === e;
        }
        var ti2 = ae(et2, 0),
          ri2 = {
            parse: ae(async function Xn2(e, t8, r) {
              let { text: n, options: o } = Jn2(e, await re2(t8)),
                u = await De2(n, o);
              return (
                r &&
                  (r.preprocessForPrint && (u.ast = await Ht2(u.ast, o)),
                  r.massage && (u.ast = fn2(u.ast, o))),
                u
              );
            }),
            formatAST: ae(async function Zn2(e, t8) {
              return (t8 = await re2(t8)), fe2(await je2(e, t8), t8);
            }),
            formatDoc: ae(async function Qn2(e, t8) {
              let r = (function Pr2(e) {
                  let t8 = Object.create(null),
                    r = new Set();
                  return (function n(u, i, s) {
                    var D, a;
                    if ("string" == typeof u) return JSON.stringify(u);
                    if (Array.isArray(u)) {
                      let c = u.map(n).filter(Boolean);
                      return 1 === c.length ? c[0] : `[${c.join(", ")}]`;
                    }
                    if (u.type === A2) {
                      let c =
                        (null == (D = s?.[i + 1]) ? void 0 : D.type) === b2;
                      return u.literal
                        ? c
                          ? "literalline"
                          : "literallineWithoutBreakParent"
                        : u.hard
                          ? c
                            ? "hardline"
                            : "hardlineWithoutBreakParent"
                          : u.soft
                            ? "softline"
                            : "line";
                    }
                    if (u.type === b2)
                      return (null == (a = s?.[i - 1]) ? void 0 : a.type) ===
                        A2 && s[i - 1].hard
                        ? void 0
                        : "breakParent";
                    if (u.type === v2) return "trim";
                    if (u.type === T2) return "indent(" + n(u.contents) + ")";
                    if (u.type === S2)
                      return u.n === Number.NEGATIVE_INFINITY
                        ? "dedentToRoot(" + n(u.contents) + ")"
                        : u.n < 0
                          ? "dedent(" + n(u.contents) + ")"
                          : "root" === u.n.type
                            ? "markAsRoot(" + n(u.contents) + ")"
                            : "align(" +
                              JSON.stringify(u.n) +
                              ", " +
                              n(u.contents) +
                              ")";
                    if (u.type === x2)
                      return (
                        "ifBreak(" +
                        n(u.breakContents) +
                        (u.flatContents ? ", " + n(u.flatContents) : "") +
                        (u.groupId
                          ? (u.flatContents ? "" : ', ""') +
                            `, { groupId: ${o(u.groupId)} }`
                          : "") +
                        ")"
                      );
                    if (u.type === P) {
                      let c = [];
                      u.negate && c.push("negate: true"),
                        u.groupId && c.push(`groupId: ${o(u.groupId)}`);
                      let d = c.length > 0 ? `, { ${c.join(", ")} }` : "";
                      return `indentIfBreak(${n(u.contents)}${d})`;
                    }
                    if (u.type === _) {
                      let c = [];
                      u.break &&
                        "propagated" !== u.break &&
                        c.push("shouldBreak: true"),
                        u.id && c.push(`id: ${o(u.id)}`);
                      let d = c.length > 0 ? `, { ${c.join(", ")} }` : "";
                      return u.expandedStates
                        ? `conditionalGroup([${u.expandedStates.map((f2) => n(f2)).join(",")}]${d})`
                        : `group(${n(u.contents)}${d})`;
                    }
                    if (u.type === k2)
                      return `fill([${u.parts.map((c) => n(c)).join(", ")}])`;
                    if (u.type === L2)
                      return "lineSuffix(" + n(u.contents) + ")";
                    if (u.type === I2) return "lineSuffixBoundary";
                    if (u.type === O2)
                      return `label(${JSON.stringify(u.label)}, ${n(u.contents)})`;
                    throw new Error("Unknown doc type " + u.type);
                  })(J2(e));
                  function o(u) {
                    if ("symbol" != typeof u) return JSON.stringify(String(u));
                    if (u in t8) return t8[u];
                    let i = u.description || "symbol";
                    for (let s = 0; ; s++) {
                      let D = i + (s > 0 ? ` #${s}` : "");
                      if (!r.has(D))
                        return (
                          r.add(D), (t8[u] = `Symbol.for(${JSON.stringify(D)})`)
                        );
                    }
                  }
                })(e),
                { formatted: n } = await Xt2(r, {
                  ...t8,
                  parser: "__js_expression",
                });
              return n;
            }),
            printToDoc: ae(async function eu(e, t8) {
              t8 = await re2(t8);
              let { ast: r } = await De2(e, t8);
              return je2(r, t8);
            }),
            printDocToString: ae(async function tu(e, t8) {
              return fe2(e, await re2(t8));
            }),
          },
          qc = tr2;
        var formatter = memoizerific__WEBPACK_IMPORTED_MODULE_0___default()(2)(
          async (type, source) =>
            !1 === type
              ? source
              : "dedent" === type || !0 === type
                ? (function dedent(templ) {
                    for (
                      var values = [], _i2 = 1;
                      _i2 < arguments.length;
                      _i2++
                    )
                      values[_i2 - 1] = arguments[_i2];
                    var strings = Array.from(
                      "string" == typeof templ ? [templ] : templ,
                    );
                    strings[strings.length - 1] = strings[
                      strings.length - 1
                    ].replace(/\r?\n([\t ]*)$/, "");
                    var indentLengths = strings.reduce(function (arr, str) {
                      var matches = str.match(/\n([\t ]+|(?!\s).)/g);
                      return matches
                        ? arr.concat(
                            matches.map(function (match) {
                              var _a2, _b;
                              return null !==
                                (_b =
                                  null === (_a2 = match.match(/[\t ]/g)) ||
                                  void 0 === _a2
                                    ? void 0
                                    : _a2.length) && void 0 !== _b
                                ? _b
                                : 0;
                            }),
                          )
                        : arr;
                    }, []);
                    if (indentLengths.length) {
                      var pattern_1 = new RegExp(
                        "\n[\t ]{" + Math.min.apply(Math, indentLengths) + "}",
                        "g",
                      );
                      strings = strings.map(function (str) {
                        return str.replace(pattern_1, "\n");
                      });
                    }
                    strings[0] = strings[0].replace(/^\r?\n/, "");
                    var string = strings[0];
                    return (
                      values.forEach(function (value, i) {
                        var endentations = string.match(/(?:^|\n)( *)$/),
                          endentation = endentations ? endentations[1] : "",
                          indentedValue = value;
                        "string" == typeof value &&
                          value.includes("\n") &&
                          (indentedValue = String(value)
                            .split("\n")
                            .map(function (str, i2) {
                              return 0 === i2 ? str : "" + endentation + str;
                            })
                            .join("\n")),
                          (string += indentedValue + strings[i + 1]);
                      }),
                      string
                    );
                  })(source)
                : (
                    await qc.format(source, {
                      parser: type,
                      plugins: [dh],
                      htmlWhitespaceSensitivity: "ignore",
                    })
                  ).trim(),
        );
      },
  },
]);
