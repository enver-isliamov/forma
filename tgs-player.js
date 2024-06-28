parcelRequire = function(e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function(r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }
    f.isParcelRequire = !0, f.Module = function(e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
        e[r] = [function(e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "ytxR": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;
        const e = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback;
        exports.isCEPolyfill = e;
        const o = (e, o, l = null, s = null) => {
            for (; o !== l;) {
                const l = o.nextSibling;
                e.insertBefore(o, s), o = l
            }
        };
        exports.reparentNodes = o;
        const l = (e, o, l = null) => {
            for (; o !== l;) {
                const l = o.nextSibling;
                e.removeChild(o), o = l
            }
        };
        exports.removeNodes = l;
    }, {}],
    "Av0K": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;
        const e = `{{lit-${String(Math.random()).slice(2)}}}`;
        exports.marker = e;
        const t = `\x3c!--${e}--\x3e`;
        exports.nodeMarker = t;
        const r = new RegExp(`${e}|${t}`);
        exports.markerRegex = r;
        const s = "$lit$";
        exports.boundAttributeSuffix = s;
        class o {
            constructor(t, o) {
                this.parts = [], this.element = o;
                const i = [],
                    l = [],
                    p = document.createTreeWalker(o.content, 133, null, !1);
                let c = 0,
                    d = -1,
                    u = 0;
                const {
                    strings: f,
                    values: {
                        length: h
                    }
                } = t;
                for (; u < h;) {
                    const t = p.nextNode();
                    if (null !== t) {
                        if (d++, 1 === t.nodeType) {
                            if (t.hasAttributes()) {
                                const e = t.attributes,
                                    {
                                        length: o
                                    } = e;
                                let i = 0;
                                for (let t = 0; t < o; t++) n(e[t].name, s) && i++;
                                for (; i-- > 0;) {
                                    const e = f[u],
                                        o = x.exec(e)[2],
                                        n = o.toLowerCase() + s,
                                        i = t.getAttribute(n);
                                    t.removeAttribute(n);
                                    const a = i.split(r);
                                    this.parts.push({
                                        type: "attribute",
                                        index: d,
                                        name: o,
                                        strings: a
                                    }), u += a.length - 1
                                }
                            }
                            "TEMPLATE" === t.tagName && (l.push(t), p.currentNode = t.content)
                        } else if (3 === t.nodeType) {
                            const o = t.data;
                            if (o.indexOf(e) >= 0) {
                                const e = t.parentNode,
                                    l = o.split(r),
                                    p = l.length - 1;
                                for (let r = 0; r < p; r++) {
                                    let o, i = l[r];
                                    if ("" === i) o = a();
                                    else {
                                        const e = x.exec(i);
                                        null !== e && n(e[2], s) && (i = i.slice(0, e.index) + e[1] + e[2].slice(0, -s.length) + e[3]), o = document.createTextNode(i)
                                    }
                                    e.insertBefore(o, t), this.parts.push({
                                        type: "node",
                                        index: ++d
                                    })
                                }
                                "" === l[p] ? (e.insertBefore(a(), t), i.push(t)) : t.data = l[p], u += p
                            }
                        } else if (8 === t.nodeType)
                            if (t.data === e) {
                                const e = t.parentNode;
                                null !== t.previousSibling && d !== c || (d++, e.insertBefore(a(), t)), c = d, this.parts.push({
                                    type: "node",
                                    index: d
                                }), null === t.nextSibling ? t.data = "" : (i.push(t), d--), u++
                            } else {
                                let r = -1;
                                for (; - 1 !== (r = t.data.indexOf(e, r + 1));) this.parts.push({
                                    type: "node",
                                    index: -1
                                }), u++
                            }
                    } else p.currentNode = l.pop()
                }
                for (const e of i) e.parentNode.removeChild(e)
            }
        }
        exports.Template = o;
        const n = (e, t) => {
                const r = e.length - t.length;
                return r >= 0 && e.slice(r) === t
            },
            i = e => -1 !== e.index;
        exports.isTemplatePartActive = i;
        const a = () => document.createComment("");
        exports.createMarker = a;
        const x = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
        exports.lastAttributeNameRegex = x;
    }, {}],
    "NXoq": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.removeNodesFromTemplate = n, exports.insertNodeIntoTemplate = l;
        var e = require("./template.js");
        const t = 133;

        function n(e, n) {
            const {
                element: {
                    content: r
                },
                parts: l
            } = e, u = document.createTreeWalker(r, t, null, !1);
            let c = o(l),
                d = l[c],
                s = -1,
                i = 0;
            const a = [];
            let p = null;
            for (; u.nextNode();) {
                s++;
                const e = u.currentNode;
                for (e.previousSibling === p && (p = null), n.has(e) && (a.push(e), null === p && (p = e)), null !== p && i++; void 0 !== d && d.index === s;) d.index = null !== p ? -1 : d.index - i, d = l[c = o(l, c)]
            }
            a.forEach(e => e.parentNode.removeChild(e))
        }
        const r = e => {
                let n = 11 === e.nodeType ? 0 : 1;
                const r = document.createTreeWalker(e, t, null, !1);
                for (; r.nextNode();) n++;
                return n
            },
            o = (t, n = -1) => {
                for (let r = n + 1; r < t.length; r++) {
                    const n = t[r];
                    if ((0, e.isTemplatePartActive)(n)) return r
                }
                return -1
            };

        function l(e, n, l = null) {
            const {
                element: {
                    content: u
                },
                parts: c
            } = e;
            if (null == l) return void u.appendChild(n);
            const d = document.createTreeWalker(u, t, null, !1);
            let s = o(c),
                i = 0,
                a = -1;
            for (; d.nextNode();) {
                for (a++, d.currentNode === l && (i = r(n), l.parentNode.insertBefore(n, l)); - 1 !== s && c[s].index === a;) {
                    if (i > 0) {
                        for (; - 1 !== s;) c[s].index += i, s = o(c, s);
                        return
                    }
                    s = o(c, s)
                }
            }
        }
    }, {
        "./template.js": "Av0K"
    }],
    "uWh2": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.isDirective = exports.directive = void 0;
        const e = new WeakMap,
            t = t => (...s) => {
                const i = t(...s);
                return e.set(i, !0), i
            };
        exports.directive = t;
        const s = t => "function" == typeof t && e.has(t);
        exports.isDirective = s;
    }, {}],
    "pnLb": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.nothing = exports.noChange = void 0;
        const e = {};
        exports.noChange = e;
        const o = {};
        exports.nothing = o;
    }, {}],
    "bn5t": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.TemplateInstance = void 0;
        var e = require("./dom.js"),
            t = require("./template.js");
        class s {
            constructor(e, t, s) {
                this.__parts = [], this.template = e, this.processor = t, this.options = s
            }
            update(e) {
                let t = 0;
                for (const s of this.__parts) void 0 !== s && s.setValue(e[t]), t++;
                for (const s of this.__parts) void 0 !== s && s.commit()
            }
            _clone() {
                const s = e.isCEPolyfill ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
                    o = [],
                    r = this.template.parts,
                    n = document.createTreeWalker(s, 133, null, !1);
                let i, p = 0,
                    l = 0,
                    a = n.nextNode();
                for (; p < r.length;)
                    if (i = r[p], (0, t.isTemplatePartActive)(i)) {
                        for (; l < i.index;) l++, "TEMPLATE" === a.nodeName && (o.push(a), n.currentNode = a.content), null === (a = n.nextNode()) && (n.currentNode = o.pop(), a = n.nextNode());
                        if ("node" === i.type) {
                            const e = this.processor.handleTextExpression(this.options);
                            e.insertAfterNode(a.previousSibling), this.__parts.push(e)
                        } else this.__parts.push(...this.processor.handleAttributeExpressions(a, i.name, i.strings, this.options));
                        p++
                    } else this.__parts.push(void 0), p++;
                return e.isCEPolyfill && (document.adoptNode(s), customElements.upgrade(s)), s
            }
        }
        exports.TemplateInstance = s;
    }, {
        "./dom.js": "ytxR",
        "./template.js": "Av0K"
    }],
    "cVNN": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SVGTemplateResult = exports.TemplateResult = void 0;
        var e = require("./dom.js"),
            t = require("./template.js");
        const s = ` ${t.marker} `;
        class r {
            constructor(e, t, s, r) {
                this.strings = e, this.values = t, this.type = s, this.processor = r
            }
            getHTML() {
                const e = this.strings.length - 1;
                let r = "",
                    n = !1;
                for (let l = 0; l < e; l++) {
                    const e = this.strings[l],
                        i = e.lastIndexOf("\x3c!--");
                    n = (i > -1 || n) && -1 === e.indexOf("--\x3e", i + 1);
                    const o = t.lastAttributeNameRegex.exec(e);
                    r += null === o ? e + (n ? s : t.nodeMarker) : e.substr(0, o.index) + o[1] + o[2] + t.boundAttributeSuffix + o[3] + t.marker
                }
                return r += this.strings[e]
            }
            getTemplateElement() {
                const e = document.createElement("template");
                return e.innerHTML = this.getHTML(), e
            }
        }
        exports.TemplateResult = r;
        class n extends r {
            getHTML() {
                return `<svg>${super.getHTML()}</svg>`
            }
            getTemplateElement() {
                const t = super.getTemplateElement(),
                    s = t.content,
                    r = s.firstChild;
                return s.removeChild(r), (0, e.reparentNodes)(s, r.firstChild), t
            }
        }
        exports.SVGTemplateResult = n;
    }, {
        "./dom.js": "ytxR",
        "./template.js": "Av0K"
    }],
    "atl2": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;
        var t = require("./directive.js"),
            e = require("./dom.js"),
            i = require("./part.js"),
            s = require("./template-instance.js"),
            n = require("./template-result.js"),
            r = require("./template.js");
        const o = t => null === t || !("object" == typeof t || "function" == typeof t);
        exports.isPrimitive = o;
        const a = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
        exports.isIterable = a;
        class h {
            constructor(t, e, i) {
                this.dirty = !0, this.element = t, this.name = e, this.strings = i, this.parts = [];
                for (let s = 0; s < i.length - 1; s++) this.parts[s] = this._createPart()
            }
            _createPart() {
                return new l(this)
            }
            _getValue() {
                const t = this.strings,
                    e = t.length - 1;
                let i = "";
                for (let s = 0; s < e; s++) {
                    i += t[s];
                    const e = this.parts[s];
                    if (void 0 !== e) {
                        const t = e.value;
                        if (o(t) || !a(t)) i += "string" == typeof t ? t : String(t);
                        else
                            for (const e of t) i += "string" == typeof e ? e : String(e)
                    }
                }
                return i += t[e]
            }
            commit() {
                this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()))
            }
        }
        exports.AttributeCommitter = h;
        class l {
            constructor(t) {
                this.value = void 0, this.committer = t
            }
            setValue(e) {
                e === i.noChange || o(e) && e === this.value || (this.value = e, (0, t.isDirective)(e) || (this.committer.dirty = !0))
            }
            commit() {
                for (;
                    (0, t.isDirective)(this.value);) {
                    const t = this.value;
                    this.value = i.noChange, t(this)
                }
                this.value !== i.noChange && this.committer.commit()
            }
        }
        exports.AttributePart = l;
        class u {
            constructor(t) {
                this.value = void 0, this.__pendingValue = void 0, this.options = t
            }
            appendInto(t) {
                this.startNode = t.appendChild((0, r.createMarker)()), this.endNode = t.appendChild((0, r.createMarker)())
            }
            insertAfterNode(t) {
                this.startNode = t, this.endNode = t.nextSibling
            }
            appendIntoPart(t) {
                t.__insert(this.startNode = (0, r.createMarker)()), t.__insert(this.endNode = (0, r.createMarker)())
            }
            insertAfterPart(t) {
                t.__insert(this.startNode = (0, r.createMarker)()), this.endNode = t.endNode, t.endNode = this.startNode
            }
            setValue(t) {
                this.__pendingValue = t
            }
            commit() {
                if (null === this.startNode.parentNode) return;
                for (;
                    (0, t.isDirective)(this.__pendingValue);) {
                    const t = this.__pendingValue;
                    this.__pendingValue = i.noChange, t(this)
                }
                const e = this.__pendingValue;
                e !== i.noChange && (o(e) ? e !== this.value && this.__commitText(e) : e instanceof n.TemplateResult ? this.__commitTemplateResult(e) : e instanceof Node ? this.__commitNode(e) : a(e) ? this.__commitIterable(e) : e === i.nothing ? (this.value = i.nothing, this.clear()) : this.__commitText(e))
            }
            __insert(t) {
                this.endNode.parentNode.insertBefore(t, this.endNode)
            }
            __commitNode(t) {
                this.value !== t && (this.clear(), this.__insert(t), this.value = t)
            }
            __commitText(t) {
                const e = this.startNode.nextSibling,
                    i = "string" == typeof(t = null == t ? "" : t) ? t : String(t);
                e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = i : this.__commitNode(document.createTextNode(i)), this.value = t
            }
            __commitTemplateResult(t) {
                const e = this.options.templateFactory(t);
                if (this.value instanceof s.TemplateInstance && this.value.template === e) this.value.update(t.values);
                else {
                    const i = new s.TemplateInstance(e, t.processor, this.options),
                        n = i._clone();
                    i.update(t.values), this.__commitNode(n), this.value = i
                }
            }
            __commitIterable(t) {
                Array.isArray(this.value) || (this.value = [], this.clear());
                const e = this.value;
                let i, s = 0;
                for (const n of t) void 0 === (i = e[s]) && (i = new u(this.options), e.push(i), 0 === s ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])), i.setValue(n), i.commit(), s++;
                s < e.length && (e.length = s, this.clear(i && i.endNode))
            }
            clear(t = this.startNode) {
                (0, e.removeNodes)(this.startNode.parentNode, t.nextSibling, this.endNode)
            }
        }
        exports.NodePart = u;
        class d {
            constructor(t, e, i) {
                if (this.value = void 0, this.__pendingValue = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");
                this.element = t, this.name = e, this.strings = i
            }
            setValue(t) {
                this.__pendingValue = t
            }
            commit() {
                for (;
                    (0, t.isDirective)(this.__pendingValue);) {
                    const t = this.__pendingValue;
                    this.__pendingValue = i.noChange, t(this)
                }
                if (this.__pendingValue === i.noChange) return;
                const e = !!this.__pendingValue;
                this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = e), this.__pendingValue = i.noChange
            }
        }
        exports.BooleanAttributePart = d;
        class c extends h {
            constructor(t, e, i) {
                super(t, e, i), this.single = 2 === i.length && "" === i[0] && "" === i[1]
            }
            _createPart() {
                return new p(this)
            }
            _getValue() {
                return this.single ? this.parts[0].value : super._getValue()
            }
            commit() {
                this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue())
            }
        }
        exports.PropertyCommitter = c;
        class p extends l {}
        exports.PropertyPart = p;
        let _ = !1;
        (() => {
            try {
                const e = {
                    get capture() {
                        return _ = !0, !1
                    }
                };
                window.addEventListener("test", e, e), window.removeEventListener("test", e, e)
            } catch (t) {}
        })();
        class m {
            constructor(t, e, i) {
                this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = i, this.__boundHandleEvent = (t => this.handleEvent(t))
            }
            setValue(t) {
                this.__pendingValue = t
            }
            commit() {
                for (;
                    (0, t.isDirective)(this.__pendingValue);) {
                    const t = this.__pendingValue;
                    this.__pendingValue = i.noChange, t(this)
                }
                if (this.__pendingValue === i.noChange) return;
                const e = this.__pendingValue,
                    s = this.value,
                    n = null == e || null != s && (e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive),
                    r = null != e && (null == s || n);
                n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), r && (this.__options = v(e), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = e, this.__pendingValue = i.noChange
            }
            handleEvent(t) {
                "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t)
            }
        }
        exports.EventPart = m;
        const v = t => t && (_ ? {
            capture: t.capture,
            passive: t.passive,
            once: t.once
        } : t.capture);
    }, {
        "./directive.js": "uWh2",
        "./dom.js": "ytxR",
        "./part.js": "pnLb",
        "./template-instance.js": "bn5t",
        "./template-result.js": "cVNN",
        "./template.js": "Av0K"
    }],
    "gbKZ": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.templateFactory = t, exports.templateCaches = void 0;
        var e = require("./template.js");

        function t(t) {
            let s = r.get(t.type);
            void 0 === s && (s = {
                stringsArray: new WeakMap,
                keyString: new Map
            }, r.set(t.type, s));
            let n = s.stringsArray.get(t.strings);
            if (void 0 !== n) return n;
            const a = t.strings.join(e.marker);
            return void 0 === (n = s.keyString.get(a)) && (n = new e.Template(t, t.getTemplateElement()), s.keyString.set(a, n)), s.stringsArray.set(t.strings, n), n
        }
        const r = new Map;
        exports.templateCaches = r;
    }, {
        "./template.js": "Av0K"
    }],
    "Fhpq": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.render = exports.parts = void 0;
        var e = require("./dom.js"),
            t = require("./parts.js"),
            r = require("./template-factory.js");
        const s = new WeakMap;
        exports.parts = s;
        const o = (o, a, p) => {
            let d = s.get(a);
            void 0 === d && ((0, e.removeNodes)(a, a.firstChild), s.set(a, d = new t.NodePart(Object.assign({
                templateFactory: r.templateFactory
            }, p))), d.appendInto(a)), d.setValue(o), d.commit()
        };
        exports.render = o;
    }, {
        "./dom.js": "ytxR",
        "./parts.js": "atl2",
        "./template-factory.js": "gbKZ"
    }],
    "LBiL": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;
        var e = require("./parts.js");
        class t {
            handleAttributeExpressions(t, r, s, o) {
                const a = r[0];
                if ("." === a) {
                    return new e.PropertyCommitter(t, r.slice(1), s).parts
                }
                return "@" === a ? [new e.EventPart(t, r.slice(1), o.eventContext)] : "?" === a ? [new e.BooleanAttributePart(t, r.slice(1), s)] : new e.AttributeCommitter(t, r, s).parts
            }
            handleTextExpression(t) {
                return new e.NodePart(t)
            }
        }
        exports.DefaultTemplateProcessor = t;
        const r = new t;
        exports.defaultTemplateProcessor = r;
    }, {
        "./parts.js": "atl2"
    }],
    "SPDu": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), Object.defineProperty(exports, "DefaultTemplateProcessor", {
            enumerable: !0,
            get: function() {
                return e.DefaultTemplateProcessor
            }
        }), Object.defineProperty(exports, "defaultTemplateProcessor", {
            enumerable: !0,
            get: function() {
                return e.defaultTemplateProcessor
            }
        }), Object.defineProperty(exports, "SVGTemplateResult", {
            enumerable: !0,
            get: function() {
                return t.SVGTemplateResult
            }
        }), Object.defineProperty(exports, "TemplateResult", {
            enumerable: !0,
            get: function() {
                return t.TemplateResult
            }
        }), Object.defineProperty(exports, "directive", {
            enumerable: !0,
            get: function() {
                return r.directive
            }
        }), Object.defineProperty(exports, "isDirective", {
            enumerable: !0,
            get: function() {
                return r.isDirective
            }
        }), Object.defineProperty(exports, "removeNodes", {
            enumerable: !0,
            get: function() {
                return n.removeNodes
            }
        }), Object.defineProperty(exports, "reparentNodes", {
            enumerable: !0,
            get: function() {
                return n.reparentNodes
            }
        }), Object.defineProperty(exports, "noChange", {
            enumerable: !0,
            get: function() {
                return o.noChange
            }
        }), Object.defineProperty(exports, "nothing", {
            enumerable: !0,
            get: function() {
                return o.nothing
            }
        }), Object.defineProperty(exports, "AttributeCommitter", {
            enumerable: !0,
            get: function() {
                return i.AttributeCommitter
            }
        }), Object.defineProperty(exports, "AttributePart", {
            enumerable: !0,
            get: function() {
                return i.AttributePart
            }
        }), Object.defineProperty(exports, "BooleanAttributePart", {
            enumerable: !0,
            get: function() {
                return i.BooleanAttributePart
            }
        }), Object.defineProperty(exports, "EventPart", {
            enumerable: !0,
            get: function() {
                return i.EventPart
            }
        }), Object.defineProperty(exports, "isIterable", {
            enumerable: !0,
            get: function() {
                return i.isIterable
            }
        }), Object.defineProperty(exports, "isPrimitive", {
            enumerable: !0,
            get: function() {
                return i.isPrimitive
            }
        }), Object.defineProperty(exports, "NodePart", {
            enumerable: !0,
            get: function() {
                return i.NodePart
            }
        }), Object.defineProperty(exports, "PropertyCommitter", {
            enumerable: !0,
            get: function() {
                return i.PropertyCommitter
            }
        }), Object.defineProperty(exports, "PropertyPart", {
            enumerable: !0,
            get: function() {
                return i.PropertyPart
            }
        }), Object.defineProperty(exports, "parts", {
            enumerable: !0,
            get: function() {
                return u.parts
            }
        }), Object.defineProperty(exports, "render", {
            enumerable: !0,
            get: function() {
                return u.render
            }
        }), Object.defineProperty(exports, "templateCaches", {
            enumerable: !0,
            get: function() {
                return p.templateCaches
            }
        }), Object.defineProperty(exports, "templateFactory", {
            enumerable: !0,
            get: function() {
                return p.templateFactory
            }
        }), Object.defineProperty(exports, "TemplateInstance", {
            enumerable: !0,
            get: function() {
                return a.TemplateInstance
            }
        }), Object.defineProperty(exports, "createMarker", {
            enumerable: !0,
            get: function() {
                return s.createMarker
            }
        }), Object.defineProperty(exports, "isTemplatePartActive", {
            enumerable: !0,
            get: function() {
                return s.isTemplatePartActive
            }
        }), Object.defineProperty(exports, "Template", {
            enumerable: !0,
            get: function() {
                return s.Template
            }
        }), exports.svg = exports.html = void 0;
        var e = require("./lib/default-template-processor.js"),
            t = require("./lib/template-result.js"),
            r = require("./lib/directive.js"),
            n = require("./lib/dom.js"),
            o = require("./lib/part.js"),
            i = require("./lib/parts.js"),
            u = require("./lib/render.js"),
            p = require("./lib/template-factory.js"),
            a = require("./lib/template-instance.js"),
            s = require("./lib/template.js");
        "undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");
        const l = (r, ...n) => new t.TemplateResult(r, n, "html", e.defaultTemplateProcessor);
        exports.html = l;
        const c = (r, ...n) => new t.SVGTemplateResult(r, n, "svg", e.defaultTemplateProcessor);
        exports.svg = c;
    }, {
        "./lib/default-template-processor.js": "LBiL",
        "./lib/template-result.js": "cVNN",
        "./lib/directive.js": "uWh2",
        "./lib/dom.js": "ytxR",
        "./lib/part.js": "pnLb",
        "./lib/parts.js": "atl2",
        "./lib/render.js": "Fhpq",
        "./lib/template-factory.js": "gbKZ",
        "./lib/template-instance.js": "bn5t",
        "./lib/template.js": "Av0K"
    }],
    "eBH8": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), Object.defineProperty(exports, "html", {
            enumerable: !0,
            get: function() {
                return a.html
            }
        }), Object.defineProperty(exports, "svg", {
            enumerable: !0,
            get: function() {
                return a.svg
            }
        }), Object.defineProperty(exports, "TemplateResult", {
            enumerable: !0,
            get: function() {
                return a.TemplateResult
            }
        }), exports.render = void 0;
        var e = require("./dom.js"),
            t = require("./modify-template.js"),
            r = require("./render.js"),
            n = require("./template-factory.js"),
            o = require("./template-instance.js"),
            s = require("./template.js"),
            a = require("../lit-html.js");
        const l = (e, t) => `${e}--${t}`;
        let i = !0;
        void 0 === window.ShadyCSS ? i = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), i = !1);
        const d = e => t => {
                const r = l(t.type, e);
                let o = n.templateCaches.get(r);
                void 0 === o && (o = {
                    stringsArray: new WeakMap,
                    keyString: new Map
                }, n.templateCaches.set(r, o));
                let a = o.stringsArray.get(t.strings);
                if (void 0 !== a) return a;
                const d = t.strings.join(s.marker);
                if (void 0 === (a = o.keyString.get(d))) {
                    const r = t.getTemplateElement();
                    i && window.ShadyCSS.prepareTemplateDom(r, e), a = new s.Template(t, r), o.keyString.set(d, a)
                }
                return o.stringsArray.set(t.strings, a), a
            },
            p = ["html", "svg"],
            c = e => {
                p.forEach(r => {
                    const o = n.templateCaches.get(l(r, e));
                    void 0 !== o && o.keyString.forEach(e => {
                        const {
                            element: {
                                content: r
                            }
                        } = e, n = new Set;
                        Array.from(r.querySelectorAll("style")).forEach(e => {
                            n.add(e)
                        }), (0, t.removeNodesFromTemplate)(e, n)
                    })
                })
            },
            m = new Set,
            y = (e, r, n) => {
                m.add(e);
                const o = n ? n.element : document.createElement("template"),
                    s = r.querySelectorAll("style"),
                    {
                        length: a
                    } = s;
                if (0 === a) return void window.ShadyCSS.prepareTemplateStyles(o, e);
                const l = document.createElement("style");
                for (let t = 0; t < a; t++) {
                    const e = s[t];
                    e.parentNode.removeChild(e), l.textContent += e.textContent
                }
                c(e);
                const i = o.content;
                n ? (0, t.insertNodeIntoTemplate)(n, l, i.firstChild) : i.insertBefore(l, i.firstChild), window.ShadyCSS.prepareTemplateStyles(o, e);
                const d = i.querySelector("style");
                if (window.ShadyCSS.nativeShadow && null !== d) r.insertBefore(d.cloneNode(!0), r.firstChild);
                else if (n) {
                    i.insertBefore(l, i.firstChild);
                    const e = new Set;
                    e.add(l), (0, t.removeNodesFromTemplate)(n, e)
                }
            },
            S = (t, n, s) => {
                if (!s || "object" != typeof s || !s.scopeName) throw new Error("The `scopeName` option is required.");
                const a = s.scopeName,
                    l = r.parts.has(n),
                    p = i && 11 === n.nodeType && !!n.host,
                    c = p && !m.has(a),
                    S = c ? document.createDocumentFragment() : n;
                if ((0, r.render)(t, S, Object.assign({
                        templateFactory: d(a)
                    }, s)), c) {
                    const t = r.parts.get(S);
                    r.parts.delete(S);
                    const s = t.value instanceof o.TemplateInstance ? t.value.template : void 0;
                    y(a, S, s), (0, e.removeNodes)(n, n.firstChild), n.appendChild(S), r.parts.set(n, t)
                }!l && p && window.ShadyCSS.styleElement(n.host)
            };
        exports.render = S;
    }, {
        "./dom.js": "ytxR",
        "./modify-template.js": "NXoq",
        "./render.js": "Fhpq",
        "./template-factory.js": "gbKZ",
        "./template-instance.js": "bn5t",
        "./template.js": "Av0K",
        "../lit-html.js": "SPDu"
    }],
    "fKvB": [function(require, module, exports) {
        "use strict";
        var t;
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0, window.JSCompiler_renameProperty = ((t, e) => t);
        const e = {
            toAttribute(t, e) {
                switch (e) {
                    case Boolean:
                        return t ? "" : null;
                    case Object:
                    case Array:
                        return null == t ? t : JSON.stringify(t)
                }
                return t
            },
            fromAttribute(t, e) {
                switch (e) {
                    case Boolean:
                        return null !== t;
                    case Number:
                        return null === t ? null : Number(t);
                    case Object:
                    case Array:
                        return JSON.parse(t)
                }
                return t
            }
        };
        exports.defaultConverter = e;
        const r = (t, e) => e !== t && (e == e || t == t);
        exports.notEqual = r;
        const s = {
                attribute: !0,
                type: String,
                converter: e,
                reflect: !1,
                hasChanged: r
            },
            i = 1,
            a = 4,
            o = 8,
            p = 16,
            n = "finalized";
        class h extends HTMLElement {
            constructor() {
                super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = new Promise(t => this._enableUpdatingResolver = t), this._changedProperties = new Map, this._reflectingProperties = void 0, this.initialize()
            }
            static get observedAttributes() {
                this.finalize();
                const t = [];
                return this._classProperties.forEach((e, r) => {
                    const s = this._attributeNameForProperty(r, e);
                    void 0 !== s && (this._attributeToPropertyMap.set(s, r), t.push(s))
                }), t
            }
            static _ensureClassProperties() {
                if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
                    this._classProperties = new Map;
                    const t = Object.getPrototypeOf(this)._classProperties;
                    void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t))
                }
            }
            static createProperty(t, e = s) {
                if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;
                const r = "symbol" == typeof t ? Symbol() : `__${t}`,
                    i = this.getPropertyDescriptor(t, r, e);
                void 0 !== i && Object.defineProperty(this.prototype, t, i)
            }
            static getPropertyDescriptor(t, e, r) {
                return {
                    get() {
                        return this[e]
                    },
                    set(r) {
                        const s = this[t];
                        this[e] = r, this._requestUpdate(t, s)
                    },
                    configurable: !0,
                    enumerable: !0
                }
            }
            static getPropertyOptions(t) {
                return this._classProperties && this._classProperties.get(t) || s
            }
            static finalize() {
                const t = Object.getPrototypeOf(this);
                if (t.hasOwnProperty(n) || t.finalize(), this[n] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map, this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
                    const t = this.properties,
                        e = [...Object.getOwnPropertyNames(t), ..."function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : []];
                    for (const r of e) this.createProperty(r, t[r])
                }
            }
            static _attributeNameForProperty(t, e) {
                const r = e.attribute;
                return !1 === r ? void 0 : "string" == typeof r ? r : "string" == typeof t ? t.toLowerCase() : void 0
            }
            static _valueHasChanged(t, e, s = r) {
                return s(t, e)
            }
            static _propertyValueFromAttribute(t, r) {
                const s = r.type,
                    i = r.converter || e,
                    a = "function" == typeof i ? i : i.fromAttribute;
                return a ? a(t, s) : t
            }
            static _propertyValueToAttribute(t, r) {
                if (void 0 === r.reflect) return;
                const s = r.type,
                    i = r.converter;
                return (i && i.toAttribute || e.toAttribute)(t, s)
            }
            initialize() {
                this._saveInstanceProperties(), this._requestUpdate()
            }
            _saveInstanceProperties() {
                this.constructor._classProperties.forEach((t, e) => {
                    if (this.hasOwnProperty(e)) {
                        const t = this[e];
                        delete this[e], this._instanceProperties || (this._instanceProperties = new Map), this._instanceProperties.set(e, t)
                    }
                })
            }
            _applyInstanceProperties() {
                this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0
            }
            connectedCallback() {
                this.enableUpdating()
            }
            enableUpdating() {
                void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0)
            }
            disconnectedCallback() {}
            attributeChangedCallback(t, e, r) {
                e !== r && this._attributeToProperty(t, r)
            }
            _propertyToAttribute(t, e, r = s) {
                const i = this.constructor,
                    a = i._attributeNameForProperty(t, r);
                if (void 0 !== a) {
                    const t = i._propertyValueToAttribute(e, r);
                    if (void 0 === t) return;
                    this._updateState = this._updateState | o, null == t ? this.removeAttribute(a) : this.setAttribute(a, t), this._updateState = this._updateState & ~o
                }
            }
            _attributeToProperty(t, e) {
                if (this._updateState & o) return;
                const r = this.constructor,
                    s = r._attributeToPropertyMap.get(t);
                if (void 0 !== s) {
                    const t = r.getPropertyOptions(s);
                    this._updateState = this._updateState | p, this[s] = r._propertyValueFromAttribute(e, t), this._updateState = this._updateState & ~p
                }
            }
            _requestUpdate(t, e) {
                let r = !0;
                if (void 0 !== t) {
                    const s = this.constructor,
                        i = s.getPropertyOptions(t);
                    s._valueHasChanged(this[t], e, i.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== i.reflect || this._updateState & p || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map), this._reflectingProperties.set(t, i))) : r = !1
                }!this._hasRequestedUpdate && r && (this._updatePromise = this._enqueueUpdate())
            }
            requestUpdate(t, e) {
                return this._requestUpdate(t, e), this.updateComplete
            }
            async _enqueueUpdate() {
                this._updateState = this._updateState | a;
                try {
                    await this._updatePromise
                } catch (e) {}
                const t = this.performUpdate();
                return null != t && await t, !this._hasRequestedUpdate
            }
            get _hasRequestedUpdate() {
                return this._updateState & a
            }
            get hasUpdated() {
                return this._updateState & i
            }
            performUpdate() {
                this._instanceProperties && this._applyInstanceProperties();
                let t = !1;
                const e = this._changedProperties;
                try {
                    (t = this.shouldUpdate(e)) ? this.update(e): this._markUpdated()
                } catch (r) {
                    throw t = !1, this._markUpdated(), r
                }
                t && (this._updateState & i || (this._updateState = this._updateState | i, this.firstUpdated(e)), this.updated(e))
            }
            _markUpdated() {
                this._changedProperties = new Map, this._updateState = this._updateState & ~a
            }
            get updateComplete() {
                return this._getUpdateComplete()
            }
            _getUpdateComplete() {
                return this._updatePromise
            }
            shouldUpdate(t) {
                return !0
            }
            update(t) {
                void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0), this._markUpdated()
            }
            updated(t) {}
            firstUpdated(t) {}
        }
        exports.UpdatingElement = h, h[t = n] = !0;
    }, {}],
    "FzpZ": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.property = i, exports.internalProperty = s, exports.query = c, exports.queryAsync = u, exports.queryAll = l, exports.eventOptions = f, exports.queryAssignedNodes = m, exports.customElement = void 0;
        const e = (e, t) => (window.customElements.define(e, t), t),
            t = (e, t) => {
                const {
                    kind: r,
                    elements: n
                } = t;
                return {
                    kind: r,
                    elements: n,
                    finisher(t) {
                        window.customElements.define(e, t)
                    }
                }
            },
            r = r => n => "function" == typeof n ? e(r, n) : t(r, n);
        exports.customElement = r;
        const n = (e, t) => "method" !== t.kind || !t.descriptor || "value" in t.descriptor ? {
                kind: "field",
                key: Symbol(),
                placement: "own",
                descriptor: {},
                initializer() {
                    "function" == typeof t.initializer && (this[t.key] = t.initializer.call(this))
                },
                finisher(r) {
                    r.createProperty(t.key, e)
                }
            } : Object.assign(Object.assign({}, t), {
                finisher(r) {
                    r.createProperty(t.key, e)
                }
            }),
            o = (e, t, r) => {
                t.constructor.createProperty(r, e)
            };

        function i(e) {
            return (t, r) => void 0 !== r ? o(e, t, r) : n(e, t)
        }

        function s(e) {
            return i({
                attribute: !1,
                hasChanged: null == e ? void 0 : e.hasChanged
            })
        }

        function c(e) {
            return (t, r) => {
                const n = {
                    get() {
                        return this.renderRoot.querySelector(e)
                    },
                    enumerable: !0,
                    configurable: !0
                };
                return void 0 !== r ? a(n, t, r) : d(n, t)
            }
        }

        function u(e) {
            return (t, r) => {
                const n = {
                    async get() {
                        return await this.updateComplete, this.renderRoot.querySelector(e)
                    },
                    enumerable: !0,
                    configurable: !0
                };
                return void 0 !== r ? a(n, t, r) : d(n, t)
            }
        }

        function l(e) {
            return (t, r) => {
                const n = {
                    get() {
                        return this.renderRoot.querySelectorAll(e)
                    },
                    enumerable: !0,
                    configurable: !0
                };
                return void 0 !== r ? a(n, t, r) : d(n, t)
            }
        }
        const a = (e, t, r) => {
                Object.defineProperty(t, r, e)
            },
            d = (e, t) => ({
                kind: "method",
                placement: "prototype",
                key: t.key,
                descriptor: e
            }),
            p = (e, t) => Object.assign(Object.assign({}, t), {
                finisher(r) {
                    Object.assign(r.prototype[t.key], e)
                }
            }),
            y = (e, t, r) => {
                Object.assign(t[r], e)
            };

        function f(e) {
            return (t, r) => void 0 !== r ? y(e, t, r) : p(e, t)
        }

        function m(e = "", t = !1) {
            return (r, n) => {
                const o = {
                    get() {
                        const r = `slot${e?`[name=${e}]`:""}`,
                            n = this.renderRoot.querySelector(r);
                        return n && n.assignedNodes({
                            flatten: t
                        })
                    },
                    enumerable: !0,
                    configurable: !0
                };
                return void 0 !== n ? a(o, r, n) : d(o, r)
            }
        }
    }, {}],
    "ZFCR": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;
        const e = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
        exports.supportsAdoptingStyleSheets = e;
        const t = Symbol();
        class s {
            constructor(e, s) {
                if (s !== t) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
                this.cssText = e
            }
            get styleSheet() {
                return void 0 === this._styleSheet && (e ? (this._styleSheet = new CSSStyleSheet, this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet
            }
            toString() {
                return this.cssText
            }
        }
        exports.CSSResult = s;
        const r = e => new s(String(e), t);
        exports.unsafeCSS = r;
        const o = e => {
                if (e instanceof s) return e.cssText;
                if ("number" == typeof e) return e;
                throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)
            },
            n = (e, ...r) => {
                const n = r.reduce((t, s, r) => t + o(s) + e[r + 1], e[0]);
                return new s(n, t)
            };
        exports.css = n;
    }, {}],
    "bhxD": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var e = {
            LitElement: !0,
            html: !0,
            svg: !0,
            TemplateResult: !0,
            SVGTemplateResult: !0
        };
        Object.defineProperty(exports, "html", {
            enumerable: !0,
            get: function() {
                return n.html
            }
        }), Object.defineProperty(exports, "svg", {
            enumerable: !0,
            get: function() {
                return n.svg
            }
        }), Object.defineProperty(exports, "TemplateResult", {
            enumerable: !0,
            get: function() {
                return n.TemplateResult
            }
        }), Object.defineProperty(exports, "SVGTemplateResult", {
            enumerable: !0,
            get: function() {
                return n.SVGTemplateResult
            }
        }), exports.LitElement = void 0;
        var t = require("lit-html/lib/shady-render.js"),
            r = require("./lib/updating-element.js");
        Object.keys(r).forEach(function(t) {
            "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
                enumerable: !0,
                get: function() {
                    return r[t]
                }
            }))
        });
        var s = require("./lib/decorators.js");
        Object.keys(s).forEach(function(t) {
            "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
                enumerable: !0,
                get: function() {
                    return s[t]
                }
            }))
        });
        var n = require("lit-html/lit-html.js"),
            o = require("./lib/css-tag.js");
        Object.keys(o).forEach(function(t) {
            "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
                enumerable: !0,
                get: function() {
                    return o[t]
                }
            }))
        }), (window.litElementVersions || (window.litElementVersions = [])).push("2.3.1");
        const i = {};
        class l extends r.UpdatingElement {
            static getStyles() {
                return this.styles
            }
            static _getUniqueStyles() {
                if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;
                const e = this.getStyles();
                if (void 0 === e) this._styles = [];
                else if (Array.isArray(e)) {
                    const t = (e, r) => e.reduceRight((e, r) => Array.isArray(r) ? t(r, e) : (e.add(r), e), r),
                        r = t(e, new Set),
                        s = [];
                    r.forEach(e => s.unshift(e)), this._styles = s
                } else this._styles = [e]
            }
            initialize() {
                super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles()
            }
            createRenderRoot() {
                return this.attachShadow({
                    mode: "open"
                })
            }
            adoptStyles() {
                const e = this.constructor._styles;
                0 !== e.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? o.supportsAdoptingStyleSheets ? this.renderRoot.adoptedStyleSheets = e.map(e => e.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e => e.cssText), this.localName))
            }
            connectedCallback() {
                super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this)
            }
            update(e) {
                const t = this.render();
                super.update(e), t !== i && this.constructor.render(t, this.renderRoot, {
                    scopeName: this.localName,
                    eventContext: this
                }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(e => {
                    const t = document.createElement("style");
                    t.textContent = e.cssText, this.renderRoot.appendChild(t)
                }))
            }
            render() {
                return i
            }
        }
        exports.LitElement = l, l.finalized = !0, l.render = t.render;
    }, {
        "lit-html/lib/shady-render.js": "eBH8",
        "./lib/updating-element.js": "fKvB",
        "./lib/decorators.js": "FzpZ",
        "lit-html/lit-html.js": "SPDu",
        "./lib/css-tag.js": "ZFCR"
    }],
    "tbG5": [function(require, module, exports) {
        "use strict";
        var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

        function t(r, t) {
            return Object.prototype.hasOwnProperty.call(r, t)
        }
        exports.assign = function(r) {
            for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
                var n = e.shift();
                if (n) {
                    if ("object" != typeof n) throw new TypeError(n + "must be non-object");
                    for (var a in n) t(n, a) && (r[a] = n[a])
                }
            }
            return r
        }, exports.shrinkBuf = function(r, t) {
            return r.length === t ? r : r.subarray ? r.subarray(0, t) : (r.length = t, r)
        };
        var e = {
                arraySet: function(r, t, e, n, a) {
                    if (t.subarray && r.subarray) r.set(t.subarray(e, e + n), a);
                    else
                        for (var o = 0; o < n; o++) r[a + o] = t[e + o]
                },
                flattenChunks: function(r) {
                    var t, e, n, a, o, s;
                    for (n = 0, t = 0, e = r.length; t < e; t++) n += r[t].length;
                    for (s = new Uint8Array(n), a = 0, t = 0, e = r.length; t < e; t++) o = r[t], s.set(o, a), a += o.length;
                    return s
                }
            },
            n = {
                arraySet: function(r, t, e, n, a) {
                    for (var o = 0; o < n; o++) r[a + o] = t[e + o]
                },
                flattenChunks: function(r) {
                    return [].concat.apply([], r)
                }
            };
        exports.setTyped = function(r) {
            r ? (exports.Buf8 = Uint8Array, exports.Buf16 = Uint16Array, exports.Buf32 = Int32Array, exports.assign(exports, e)) : (exports.Buf8 = Array, exports.Buf16 = Array, exports.Buf32 = Array, exports.assign(exports, n))
        }, exports.setTyped(r);
    }, {}],
    "sRJQ": [function(require, module, exports) {
        "use strict";
        var e = require("../utils/common"),
            t = 4,
            n = 0,
            _ = 1,
            r = 2;

        function a(e) {
            for (var t = e.length; --t >= 0;) e[t] = 0
        }
        var i = 0,
            l = 1,
            d = 2,
            f = 3,
            o = 258,
            b = 29,
            s = 256,
            u = s + 1 + b,
            c = 30,
            p = 19,
            h = 2 * u + 1,
            v = 15,
            y = 16,
            x = 7,
            g = 256,
            m = 16,
            w = 17,
            A = 18,
            k = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
            q = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
            S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            j = 512,
            B = new Array(2 * (u + 2));
        a(B);
        var C = new Array(2 * c);
        a(C);
        var D = new Array(j);
        a(D);
        var E = new Array(o - f + 1);
        a(E);
        var F = new Array(b);
        a(F);
        var G, H, I, J = new Array(c);

        function K(e, t, n, _, r) {
            this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = _, this.max_length = r, this.has_stree = e && e.length
        }

        function L(e, t) {
            this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
        }

        function M(e) {
            return e < 256 ? D[e] : D[256 + (e >>> 7)]
        }

        function N(e, t) {
            e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
        }

        function O(e, t, n) {
            e.bi_valid > y - n ? (e.bi_buf |= t << e.bi_valid & 65535, N(e, e.bi_buf), e.bi_buf = t >> y - e.bi_valid, e.bi_valid += n - y) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n)
        }

        function P(e, t, n) {
            O(e, n[2 * t], n[2 * t + 1])
        }

        function Q(e, t) {
            var n = 0;
            do {
                n |= 1 & e, e >>>= 1, n <<= 1
            } while (--t > 0);
            return n >>> 1
        }

        function R(e) {
            16 === e.bi_valid ? (N(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
        }

        function T(e, t) {
            var n, _, r, a, i, l, d = t.dyn_tree,
                f = t.max_code,
                o = t.stat_desc.static_tree,
                b = t.stat_desc.has_stree,
                s = t.stat_desc.extra_bits,
                u = t.stat_desc.extra_base,
                c = t.stat_desc.max_length,
                p = 0;
            for (a = 0; a <= v; a++) e.bl_count[a] = 0;
            for (d[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < h; n++)(a = d[2 * d[2 * (_ = e.heap[n]) + 1] + 1] + 1) > c && (a = c, p++), d[2 * _ + 1] = a, _ > f || (e.bl_count[a]++, i = 0, _ >= u && (i = s[_ - u]), l = d[2 * _], e.opt_len += l * (a + i), b && (e.static_len += l * (o[2 * _ + 1] + i)));
            if (0 !== p) {
                do {
                    for (a = c - 1; 0 === e.bl_count[a];) a--;
                    e.bl_count[a]--, e.bl_count[a + 1] += 2, e.bl_count[c]--, p -= 2
                } while (p > 0);
                for (a = c; 0 !== a; a--)
                    for (_ = e.bl_count[a]; 0 !== _;)(r = e.heap[--n]) > f || (d[2 * r + 1] !== a && (e.opt_len += (a - d[2 * r + 1]) * d[2 * r], d[2 * r + 1] = a), _--)
            }
        }

        function U(e, t, n) {
            var _, r, a = new Array(v + 1),
                i = 0;
            for (_ = 1; _ <= v; _++) a[_] = i = i + n[_ - 1] << 1;
            for (r = 0; r <= t; r++) {
                var l = e[2 * r + 1];
                0 !== l && (e[2 * r] = Q(a[l]++, l))
            }
        }

        function V() {
            var e, t, n, _, r, a = new Array(v + 1);
            for (n = 0, _ = 0; _ < b - 1; _++)
                for (F[_] = n, e = 0; e < 1 << k[_]; e++) E[n++] = _;
            for (E[n - 1] = _, r = 0, _ = 0; _ < 16; _++)
                for (J[_] = r, e = 0; e < 1 << q[_]; e++) D[r++] = _;
            for (r >>= 7; _ < c; _++)
                for (J[_] = r << 7, e = 0; e < 1 << q[_] - 7; e++) D[256 + r++] = _;
            for (t = 0; t <= v; t++) a[t] = 0;
            for (e = 0; e <= 143;) B[2 * e + 1] = 8, e++, a[8]++;
            for (; e <= 255;) B[2 * e + 1] = 9, e++, a[9]++;
            for (; e <= 279;) B[2 * e + 1] = 7, e++, a[7]++;
            for (; e <= 287;) B[2 * e + 1] = 8, e++, a[8]++;
            for (U(B, u + 1, a), e = 0; e < c; e++) C[2 * e + 1] = 5, C[2 * e] = Q(e, 5);
            G = new K(B, k, s + 1, u, v), H = new K(C, q, 0, c, v), I = new K(new Array(0), z, 0, p, x)
        }

        function W(e) {
            var t;
            for (t = 0; t < u; t++) e.dyn_ltree[2 * t] = 0;
            for (t = 0; t < c; t++) e.dyn_dtree[2 * t] = 0;
            for (t = 0; t < p; t++) e.bl_tree[2 * t] = 0;
            e.dyn_ltree[2 * g] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
        }

        function X(e) {
            e.bi_valid > 8 ? N(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
        }

        function Y(t, n, _, r) {
            X(t), r && (N(t, _), N(t, ~_)), e.arraySet(t.pending_buf, t.window, n, _, t.pending), t.pending += _
        }

        function Z(e, t, n, _) {
            var r = 2 * t,
                a = 2 * n;
            return e[r] < e[a] || e[r] === e[a] && _[t] <= _[n]
        }

        function $(e, t, n) {
            for (var _ = e.heap[n], r = n << 1; r <= e.heap_len && (r < e.heap_len && Z(t, e.heap[r + 1], e.heap[r], e.depth) && r++, !Z(t, _, e.heap[r], e.depth));) e.heap[n] = e.heap[r], n = r, r <<= 1;
            e.heap[n] = _
        }

        function ee(e, t, n) {
            var _, r, a, i, l = 0;
            if (0 !== e.last_lit)
                do {
                    _ = e.pending_buf[e.d_buf + 2 * l] << 8 | e.pending_buf[e.d_buf + 2 * l + 1], r = e.pending_buf[e.l_buf + l], l++, 0 === _ ? P(e, r, t) : (P(e, (a = E[r]) + s + 1, t), 0 !== (i = k[a]) && O(e, r -= F[a], i), P(e, a = M(--_), n), 0 !== (i = q[a]) && O(e, _ -= J[a], i))
                } while (l < e.last_lit);
            P(e, g, t)
        }

        function te(e, t) {
            var n, _, r, a = t.dyn_tree,
                i = t.stat_desc.static_tree,
                l = t.stat_desc.has_stree,
                d = t.stat_desc.elems,
                f = -1;
            for (e.heap_len = 0, e.heap_max = h, n = 0; n < d; n++) 0 !== a[2 * n] ? (e.heap[++e.heap_len] = f = n, e.depth[n] = 0) : a[2 * n + 1] = 0;
            for (; e.heap_len < 2;) a[2 * (r = e.heap[++e.heap_len] = f < 2 ? ++f : 0)] = 1, e.depth[r] = 0, e.opt_len--, l && (e.static_len -= i[2 * r + 1]);
            for (t.max_code = f, n = e.heap_len >> 1; n >= 1; n--) $(e, a, n);
            r = d;
            do {
                n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], $(e, a, 1), _ = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = _, a[2 * r] = a[2 * n] + a[2 * _], e.depth[r] = (e.depth[n] >= e.depth[_] ? e.depth[n] : e.depth[_]) + 1, a[2 * n + 1] = a[2 * _ + 1] = r, e.heap[1] = r++, $(e, a, 1)
            } while (e.heap_len >= 2);
            e.heap[--e.heap_max] = e.heap[1], T(e, t), U(a, f, e.bl_count)
        }

        function ne(e, t, n) {
            var _, r, a = -1,
                i = t[1],
                l = 0,
                d = 7,
                f = 4;
            for (0 === i && (d = 138, f = 3), t[2 * (n + 1) + 1] = 65535, _ = 0; _ <= n; _++) r = i, i = t[2 * (_ + 1) + 1], ++l < d && r === i || (l < f ? e.bl_tree[2 * r] += l : 0 !== r ? (r !== a && e.bl_tree[2 * r]++, e.bl_tree[2 * m]++) : l <= 10 ? e.bl_tree[2 * w]++ : e.bl_tree[2 * A]++, l = 0, a = r, 0 === i ? (d = 138, f = 3) : r === i ? (d = 6, f = 3) : (d = 7, f = 4))
        }

        function _e(e, t, n) {
            var _, r, a = -1,
                i = t[1],
                l = 0,
                d = 7,
                f = 4;
            for (0 === i && (d = 138, f = 3), _ = 0; _ <= n; _++)
                if (r = i, i = t[2 * (_ + 1) + 1], !(++l < d && r === i)) {
                    if (l < f)
                        do {
                            P(e, r, e.bl_tree)
                        } while (0 != --l);
                    else 0 !== r ? (r !== a && (P(e, r, e.bl_tree), l--), P(e, m, e.bl_tree), O(e, l - 3, 2)) : l <= 10 ? (P(e, w, e.bl_tree), O(e, l - 3, 3)) : (P(e, A, e.bl_tree), O(e, l - 11, 7));
                    l = 0, a = r, 0 === i ? (d = 138, f = 3) : r === i ? (d = 6, f = 3) : (d = 7, f = 4)
                }
        }

        function re(e) {
            var t;
            for (ne(e, e.dyn_ltree, e.l_desc.max_code), ne(e, e.dyn_dtree, e.d_desc.max_code), te(e, e.bl_desc), t = p - 1; t >= 3 && 0 === e.bl_tree[2 * S[t] + 1]; t--);
            return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
        }

        function ae(e, t, n, _) {
            var r;
            for (O(e, t - 257, 5), O(e, n - 1, 5), O(e, _ - 4, 4), r = 0; r < _; r++) O(e, e.bl_tree[2 * S[r] + 1], 3);
            _e(e, e.dyn_ltree, t - 1), _e(e, e.dyn_dtree, n - 1)
        }

        function ie(e) {
            var t, r = 4093624447;
            for (t = 0; t <= 31; t++, r >>>= 1)
                if (1 & r && 0 !== e.dyn_ltree[2 * t]) return n;
            if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return _;
            for (t = 32; t < s; t++)
                if (0 !== e.dyn_ltree[2 * t]) return _;
            return n
        }
        a(J);
        var le = !1;

        function de(e) {
            le || (V(), le = !0), e.l_desc = new L(e.dyn_ltree, G), e.d_desc = new L(e.dyn_dtree, H), e.bl_desc = new L(e.bl_tree, I), e.bi_buf = 0, e.bi_valid = 0, W(e)
        }

        function fe(e, t, n, _) {
            O(e, (i << 1) + (_ ? 1 : 0), 3), Y(e, t, n, !0)
        }

        function oe(e) {
            O(e, l << 1, 3), P(e, g, B), R(e)
        }

        function be(e, n, _, a) {
            var i, f, o = 0;
            e.level > 0 ? (e.strm.data_type === r && (e.strm.data_type = ie(e)), te(e, e.l_desc), te(e, e.d_desc), o = re(e), i = e.opt_len + 3 + 7 >>> 3, (f = e.static_len + 3 + 7 >>> 3) <= i && (i = f)) : i = f = _ + 5, _ + 4 <= i && -1 !== n ? fe(e, n, _, a) : e.strategy === t || f === i ? (O(e, (l << 1) + (a ? 1 : 0), 3), ee(e, B, C)) : (O(e, (d << 1) + (a ? 1 : 0), 3), ae(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), ee(e, e.dyn_ltree, e.dyn_dtree)), W(e), a && X(e)
        }

        function se(e, t, n) {
            return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (E[n] + s + 1)]++, e.dyn_dtree[2 * M(t)]++), e.last_lit === e.lit_bufsize - 1
        }
        exports._tr_init = de, exports._tr_stored_block = fe, exports._tr_flush_block = be, exports._tr_tally = se, exports._tr_align = oe;
    }, {
        "../utils/common": "tbG5"
    }],
    "uxo6": [function(require, module, exports) {
        "use strict";

        function e(e, r, o, t) {
            for (var u = 65535 & e | 0, i = e >>> 16 & 65535 | 0, n = 0; 0 !== o;) {
                o -= n = o > 2e3 ? 2e3 : o;
                do {
                    i = i + (u = u + r[t++] | 0) | 0
                } while (--n);
                u %= 65521, i %= 65521
            }
            return u | i << 16 | 0
        }
        module.exports = e;
    }, {}],
    "X4kj": [function(require, module, exports) {
        "use strict";

        function r() {
            for (var r, o = [], t = 0; t < 256; t++) {
                r = t;
                for (var n = 0; n < 8; n++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
                o[t] = r
            }
            return o
        }
        var o = r();

        function t(r, t, n, u) {
            var a = o,
                e = u + n;
            r ^= -1;
            for (var f = u; f < e; f++) r = r >>> 8 ^ a[255 & (r ^ t[f])];
            return -1 ^ r
        }
        module.exports = t;
    }, {}],
    "gMAY": [function(require, module, exports) {
        "use strict";
        module.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        };
    }, {}],
    "BLBk": [function(require, module, exports) {
        "use strict";
        var t, a = require("../utils/common"),
            e = require("./trees"),
            s = require("./adler32"),
            i = require("./crc32"),
            r = require("./messages"),
            n = 0,
            h = 1,
            l = 3,
            _ = 4,
            d = 5,
            o = 0,
            u = 1,
            g = -2,
            f = -3,
            c = -5,
            p = -1,
            m = 1,
            w = 2,
            v = 3,
            k = 4,
            z = 0,
            b = 2,
            x = 8,
            y = 9,
            B = 15,
            S = 8,
            q = 29,
            I = 256,
            A = I + 1 + q,
            C = 30,
            R = 19,
            j = 2 * A + 1,
            D = 15,
            E = 3,
            H = 258,
            K = H + E + 1,
            N = 32,
            F = 42,
            G = 69,
            J = 73,
            L = 91,
            M = 103,
            O = 113,
            P = 666,
            Q = 1,
            T = 2,
            U = 3,
            V = 4,
            W = 3;

        function X(t, a) {
            return t.msg = r[a], a
        }

        function Y(t) {
            return (t << 1) - (t > 4 ? 9 : 0)
        }

        function Z(t) {
            for (var a = t.length; --a >= 0;) t[a] = 0
        }

        function $(t) {
            var e = t.state,
                s = e.pending;
            s > t.avail_out && (s = t.avail_out), 0 !== s && (a.arraySet(t.output, e.pending_buf, e.pending_out, s, t.next_out), t.next_out += s, e.pending_out += s, t.total_out += s, t.avail_out -= s, e.pending -= s, 0 === e.pending && (e.pending_out = 0))
        }

        function tt(t, a) {
            e._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, a), t.block_start = t.strstart, $(t.strm)
        }

        function at(t, a) {
            t.pending_buf[t.pending++] = a
        }

        function et(t, a) {
            t.pending_buf[t.pending++] = a >>> 8 & 255, t.pending_buf[t.pending++] = 255 & a
        }

        function st(t, e, r, n) {
            var h = t.avail_in;
            return h > n && (h = n), 0 === h ? 0 : (t.avail_in -= h, a.arraySet(e, t.input, t.next_in, h, r), 1 === t.state.wrap ? t.adler = s(t.adler, e, h, r) : 2 === t.state.wrap && (t.adler = i(t.adler, e, h, r)), t.next_in += h, t.total_in += h, h)
        }

        function it(t, a) {
            var e, s, i = t.max_chain_length,
                r = t.strstart,
                n = t.prev_length,
                h = t.nice_match,
                l = t.strstart > t.w_size - K ? t.strstart - (t.w_size - K) : 0,
                _ = t.window,
                d = t.w_mask,
                o = t.prev,
                u = t.strstart + H,
                g = _[r + n - 1],
                f = _[r + n];
            t.prev_length >= t.good_match && (i >>= 2), h > t.lookahead && (h = t.lookahead);
            do {
                if (_[(e = a) + n] === f && _[e + n - 1] === g && _[e] === _[r] && _[++e] === _[r + 1]) {
                    r += 2, e++;
                    do {} while (_[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && _[++r] === _[++e] && r < u);
                    if (s = H - (u - r), r = u - H, s > n) {
                        if (t.match_start = a, n = s, s >= h) break;
                        g = _[r + n - 1], f = _[r + n]
                    }
                }
            } while ((a = o[a & d]) > l && 0 != --i);
            return n <= t.lookahead ? n : t.lookahead
        }

        function rt(t) {
            var e, s, i, r, n, h = t.w_size;
            do {
                if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= h + (h - K)) {
                    a.arraySet(t.window, t.window, h, h, 0), t.match_start -= h, t.strstart -= h, t.block_start -= h, e = s = t.hash_size;
                    do {
                        i = t.head[--e], t.head[e] = i >= h ? i - h : 0
                    } while (--s);
                    e = s = h;
                    do {
                        i = t.prev[--e], t.prev[e] = i >= h ? i - h : 0
                    } while (--s);
                    r += h
                }
                if (0 === t.strm.avail_in) break;
                if (s = st(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += s, t.lookahead + t.insert >= E)
                    for (n = t.strstart - t.insert, t.ins_h = t.window[n], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[n + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[n + E - 1]) & t.hash_mask, t.prev[n & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = n, n++, t.insert--, !(t.lookahead + t.insert < E)););
            } while (t.lookahead < K && 0 !== t.strm.avail_in)
        }

        function nt(t, a) {
            var e = 65535;
            for (e > t.pending_buf_size - 5 && (e = t.pending_buf_size - 5);;) {
                if (t.lookahead <= 1) {
                    if (rt(t), 0 === t.lookahead && a === n) return Q;
                    if (0 === t.lookahead) break
                }
                t.strstart += t.lookahead, t.lookahead = 0;
                var s = t.block_start + e;
                if ((0 === t.strstart || t.strstart >= s) && (t.lookahead = t.strstart - s, t.strstart = s, tt(t, !1), 0 === t.strm.avail_out)) return Q;
                if (t.strstart - t.block_start >= t.w_size - K && (tt(t, !1), 0 === t.strm.avail_out)) return Q
            }
            return t.insert = 0, a === _ ? (tt(t, !0), 0 === t.strm.avail_out ? U : V) : (t.strstart > t.block_start && (tt(t, !1), t.strm.avail_out), Q)
        }

        function ht(t, a) {
            for (var s, i;;) {
                if (t.lookahead < K) {
                    if (rt(t), t.lookahead < K && a === n) return Q;
                    if (0 === t.lookahead) break
                }
                if (s = 0, t.lookahead >= E && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + E - 1]) & t.hash_mask, s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== s && t.strstart - s <= t.w_size - K && (t.match_length = it(t, s)), t.match_length >= E)
                    if (i = e._tr_tally(t, t.strstart - t.match_start, t.match_length - E), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= E) {
                        t.match_length--;
                        do {
                            t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + E - 1]) & t.hash_mask, s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart
                        } while (0 != --t.match_length);
                        t.strstart++
                    } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                else i = e._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
                if (i && (tt(t, !1), 0 === t.strm.avail_out)) return Q
            }
            return t.insert = t.strstart < E - 1 ? t.strstart : E - 1, a === _ ? (tt(t, !0), 0 === t.strm.avail_out ? U : V) : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out) ? Q : T
        }

        function lt(t, a) {
            for (var s, i, r;;) {
                if (t.lookahead < K) {
                    if (rt(t), t.lookahead < K && a === n) return Q;
                    if (0 === t.lookahead) break
                }
                if (s = 0, t.lookahead >= E && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + E - 1]) & t.hash_mask, s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = E - 1, 0 !== s && t.prev_length < t.max_lazy_match && t.strstart - s <= t.w_size - K && (t.match_length = it(t, s), t.match_length <= 5 && (t.strategy === m || t.match_length === E && t.strstart - t.match_start > 4096) && (t.match_length = E - 1)), t.prev_length >= E && t.match_length <= t.prev_length) {
                    r = t.strstart + t.lookahead - E, i = e._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - E), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                    do {
                        ++t.strstart <= r && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + E - 1]) & t.hash_mask, s = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart)
                    } while (0 != --t.prev_length);
                    if (t.match_available = 0, t.match_length = E - 1, t.strstart++, i && (tt(t, !1), 0 === t.strm.avail_out)) return Q
                } else if (t.match_available) {
                    if ((i = e._tr_tally(t, 0, t.window[t.strstart - 1])) && tt(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return Q
                } else t.match_available = 1, t.strstart++, t.lookahead--
            }
            return t.match_available && (i = e._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < E - 1 ? t.strstart : E - 1, a === _ ? (tt(t, !0), 0 === t.strm.avail_out ? U : V) : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out) ? Q : T
        }

        function _t(t, a) {
            for (var s, i, r, h, l = t.window;;) {
                if (t.lookahead <= H) {
                    if (rt(t), t.lookahead <= H && a === n) return Q;
                    if (0 === t.lookahead) break
                }
                if (t.match_length = 0, t.lookahead >= E && t.strstart > 0 && (i = l[r = t.strstart - 1]) === l[++r] && i === l[++r] && i === l[++r]) {
                    h = t.strstart + H;
                    do {} while (i === l[++r] && i === l[++r] && i === l[++r] && i === l[++r] && i === l[++r] && i === l[++r] && i === l[++r] && i === l[++r] && r < h);
                    t.match_length = H - (h - r), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                }
                if (t.match_length >= E ? (s = e._tr_tally(t, 1, t.match_length - E), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (s = e._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), s && (tt(t, !1), 0 === t.strm.avail_out)) return Q
            }
            return t.insert = 0, a === _ ? (tt(t, !0), 0 === t.strm.avail_out ? U : V) : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out) ? Q : T
        }

        function dt(t, a) {
            for (var s;;) {
                if (0 === t.lookahead && (rt(t), 0 === t.lookahead)) {
                    if (a === n) return Q;
                    break
                }
                if (t.match_length = 0, s = e._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, s && (tt(t, !1), 0 === t.strm.avail_out)) return Q
            }
            return t.insert = 0, a === _ ? (tt(t, !0), 0 === t.strm.avail_out ? U : V) : t.last_lit && (tt(t, !1), 0 === t.strm.avail_out) ? Q : T
        }

        function ot(t, a, e, s, i) {
            this.good_length = t, this.max_lazy = a, this.nice_length = e, this.max_chain = s, this.func = i
        }

        function ut(a) {
            a.window_size = 2 * a.w_size, Z(a.head), a.max_lazy_match = t[a.level].max_lazy, a.good_match = t[a.level].good_length, a.nice_match = t[a.level].nice_length, a.max_chain_length = t[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = E - 1, a.match_available = 0, a.ins_h = 0
        }

        function gt() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = x, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new a.Buf16(2 * j), this.dyn_dtree = new a.Buf16(2 * (2 * C + 1)), this.bl_tree = new a.Buf16(2 * (2 * R + 1)), Z(this.dyn_ltree), Z(this.dyn_dtree), Z(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new a.Buf16(D + 1), this.heap = new a.Buf16(2 * A + 1), Z(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new a.Buf16(2 * A + 1), Z(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
        }

        function ft(t) {
            var a;
            return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = b, (a = t.state).pending = 0, a.pending_out = 0, a.wrap < 0 && (a.wrap = -a.wrap), a.status = a.wrap ? F : O, t.adler = 2 === a.wrap ? 0 : 1, a.last_flush = n, e._tr_init(a), o) : X(t, g)
        }

        function ct(t) {
            var a = ft(t);
            return a === o && ut(t.state), a
        }

        function pt(t, a) {
            return t && t.state ? 2 !== t.state.wrap ? g : (t.state.gzhead = a, o) : g
        }

        function mt(t, e, s, i, r, n) {
            if (!t) return g;
            var h = 1;
            if (e === p && (e = 6), i < 0 ? (h = 0, i = -i) : i > 15 && (h = 2, i -= 16), r < 1 || r > y || s !== x || i < 8 || i > 15 || e < 0 || e > 9 || n < 0 || n > k) return X(t, g);
            8 === i && (i = 9);
            var l = new gt;
            return t.state = l, l.strm = t, l.wrap = h, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = r + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + E - 1) / E), l.window = new a.Buf8(2 * l.w_size), l.head = new a.Buf16(l.hash_size), l.prev = new a.Buf16(l.w_size), l.lit_bufsize = 1 << r + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new a.Buf8(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = e, l.strategy = n, l.method = s, ct(t)
        }

        function wt(t, a) {
            return mt(t, a, x, B, S, z)
        }

        function vt(a, s) {
            var r, f, p, m;
            if (!a || !a.state || s > d || s < 0) return a ? X(a, g) : g;
            if (f = a.state, !a.output || !a.input && 0 !== a.avail_in || f.status === P && s !== _) return X(a, 0 === a.avail_out ? c : g);
            if (f.strm = a, r = f.last_flush, f.last_flush = s, f.status === F)
                if (2 === f.wrap) a.adler = 0, at(f, 31), at(f, 139), at(f, 8), f.gzhead ? (at(f, (f.gzhead.text ? 1 : 0) + (f.gzhead.hcrc ? 2 : 0) + (f.gzhead.extra ? 4 : 0) + (f.gzhead.name ? 8 : 0) + (f.gzhead.comment ? 16 : 0)), at(f, 255 & f.gzhead.time), at(f, f.gzhead.time >> 8 & 255), at(f, f.gzhead.time >> 16 & 255), at(f, f.gzhead.time >> 24 & 255), at(f, 9 === f.level ? 2 : f.strategy >= w || f.level < 2 ? 4 : 0), at(f, 255 & f.gzhead.os), f.gzhead.extra && f.gzhead.extra.length && (at(f, 255 & f.gzhead.extra.length), at(f, f.gzhead.extra.length >> 8 & 255)), f.gzhead.hcrc && (a.adler = i(a.adler, f.pending_buf, f.pending, 0)), f.gzindex = 0, f.status = G) : (at(f, 0), at(f, 0), at(f, 0), at(f, 0), at(f, 0), at(f, 9 === f.level ? 2 : f.strategy >= w || f.level < 2 ? 4 : 0), at(f, W), f.status = O);
                else {
                    var k = x + (f.w_bits - 8 << 4) << 8;
                    k |= (f.strategy >= w || f.level < 2 ? 0 : f.level < 6 ? 1 : 6 === f.level ? 2 : 3) << 6, 0 !== f.strstart && (k |= N), k += 31 - k % 31, f.status = O, et(f, k), 0 !== f.strstart && (et(f, a.adler >>> 16), et(f, 65535 & a.adler)), a.adler = 1
                } if (f.status === G)
                if (f.gzhead.extra) {
                    for (p = f.pending; f.gzindex < (65535 & f.gzhead.extra.length) && (f.pending !== f.pending_buf_size || (f.gzhead.hcrc && f.pending > p && (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)), $(a), p = f.pending, f.pending !== f.pending_buf_size));) at(f, 255 & f.gzhead.extra[f.gzindex]), f.gzindex++;
                    f.gzhead.hcrc && f.pending > p && (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)), f.gzindex === f.gzhead.extra.length && (f.gzindex = 0, f.status = J)
                } else f.status = J;
            if (f.status === J)
                if (f.gzhead.name) {
                    p = f.pending;
                    do {
                        if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > p && (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)), $(a), p = f.pending, f.pending === f.pending_buf_size)) {
                            m = 1;
                            break
                        }
                        m = f.gzindex < f.gzhead.name.length ? 255 & f.gzhead.name.charCodeAt(f.gzindex++) : 0, at(f, m)
                    } while (0 !== m);
                    f.gzhead.hcrc && f.pending > p && (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)), 0 === m && (f.gzindex = 0, f.status = L)
                } else f.status = L;
            if (f.status === L)
                if (f.gzhead.comment) {
                    p = f.pending;
                    do {
                        if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > p && (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)), $(a), p = f.pending, f.pending === f.pending_buf_size)) {
                            m = 1;
                            break
                        }
                        m = f.gzindex < f.gzhead.comment.length ? 255 & f.gzhead.comment.charCodeAt(f.gzindex++) : 0, at(f, m)
                    } while (0 !== m);
                    f.gzhead.hcrc && f.pending > p && (a.adler = i(a.adler, f.pending_buf, f.pending - p, p)), 0 === m && (f.status = M)
                } else f.status = M;
            if (f.status === M && (f.gzhead.hcrc ? (f.pending + 2 > f.pending_buf_size && $(a), f.pending + 2 <= f.pending_buf_size && (at(f, 255 & a.adler), at(f, a.adler >> 8 & 255), a.adler = 0, f.status = O)) : f.status = O), 0 !== f.pending) {
                if ($(a), 0 === a.avail_out) return f.last_flush = -1, o
            } else if (0 === a.avail_in && Y(s) <= Y(r) && s !== _) return X(a, c);
            if (f.status === P && 0 !== a.avail_in) return X(a, c);
            if (0 !== a.avail_in || 0 !== f.lookahead || s !== n && f.status !== P) {
                var z = f.strategy === w ? dt(f, s) : f.strategy === v ? _t(f, s) : t[f.level].func(f, s);
                if (z !== U && z !== V || (f.status = P), z === Q || z === U) return 0 === a.avail_out && (f.last_flush = -1), o;
                if (z === T && (s === h ? e._tr_align(f) : s !== d && (e._tr_stored_block(f, 0, 0, !1), s === l && (Z(f.head), 0 === f.lookahead && (f.strstart = 0, f.block_start = 0, f.insert = 0))), $(a), 0 === a.avail_out)) return f.last_flush = -1, o
            }
            return s !== _ ? o : f.wrap <= 0 ? u : (2 === f.wrap ? (at(f, 255 & a.adler), at(f, a.adler >> 8 & 255), at(f, a.adler >> 16 & 255), at(f, a.adler >> 24 & 255), at(f, 255 & a.total_in), at(f, a.total_in >> 8 & 255), at(f, a.total_in >> 16 & 255), at(f, a.total_in >> 24 & 255)) : (et(f, a.adler >>> 16), et(f, 65535 & a.adler)), $(a), f.wrap > 0 && (f.wrap = -f.wrap), 0 !== f.pending ? o : u)
        }

        function kt(t) {
            var a;
            return t && t.state ? (a = t.state.status) !== F && a !== G && a !== J && a !== L && a !== M && a !== O && a !== P ? X(t, g) : (t.state = null, a === O ? X(t, f) : o) : g
        }

        function zt(t, e) {
            var i, r, n, h, l, _, d, u, f = e.length;
            if (!t || !t.state) return g;
            if (2 === (h = (i = t.state).wrap) || 1 === h && i.status !== F || i.lookahead) return g;
            for (1 === h && (t.adler = s(t.adler, e, f, 0)), i.wrap = 0, f >= i.w_size && (0 === h && (Z(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0), u = new a.Buf8(i.w_size), a.arraySet(u, e, f - i.w_size, i.w_size, 0), e = u, f = i.w_size), l = t.avail_in, _ = t.next_in, d = t.input, t.avail_in = f, t.next_in = 0, t.input = e, rt(i); i.lookahead >= E;) {
                r = i.strstart, n = i.lookahead - (E - 1);
                do {
                    i.ins_h = (i.ins_h << i.hash_shift ^ i.window[r + E - 1]) & i.hash_mask, i.prev[r & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = r, r++
                } while (--n);
                i.strstart = r, i.lookahead = E - 1, rt(i)
            }
            return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = E - 1, i.match_available = 0, t.next_in = _, t.input = d, t.avail_in = l, i.wrap = h, o
        }
        t = [new ot(0, 0, 0, 0, nt), new ot(4, 4, 8, 4, ht), new ot(4, 5, 16, 8, ht), new ot(4, 6, 32, 32, ht), new ot(4, 4, 16, 16, lt), new ot(8, 16, 32, 32, lt), new ot(8, 16, 128, 128, lt), new ot(8, 32, 128, 256, lt), new ot(32, 128, 258, 1024, lt), new ot(32, 258, 258, 4096, lt)], exports.deflateInit = wt, exports.deflateInit2 = mt, exports.deflateReset = ct, exports.deflateResetKeep = ft, exports.deflateSetHeader = pt, exports.deflate = vt, exports.deflateEnd = kt, exports.deflateSetDictionary = zt, exports.deflateInfo = "pako deflate (from Nodeca project)";
    }, {
        "../utils/common": "tbG5",
        "./trees": "sRJQ",
        "./adler32": "uxo6",
        "./crc32": "X4kj",
        "./messages": "gMAY"
    }],
    "Q3ZD": [function(require, module, exports) {
        "use strict";
        var r = require("./common"),
            n = !0,
            t = !0;
        try {
            String.fromCharCode.apply(null, [0])
        } catch (u) {
            n = !1
        }
        try {
            String.fromCharCode.apply(null, new Uint8Array(1))
        } catch (u) {
            t = !1
        }
        for (var e = new r.Buf8(256), o = 0; o < 256; o++) e[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;

        function f(e, o) {
            if (o < 65534 && (e.subarray && t || !e.subarray && n)) return String.fromCharCode.apply(null, r.shrinkBuf(e, o));
            for (var f = "", u = 0; u < o; u++) f += String.fromCharCode(e[u]);
            return f
        }
        e[254] = e[254] = 1, exports.string2buf = function(n) {
            var t, e, o, f, u, a = n.length,
                i = 0;
            for (f = 0; f < a; f++) 55296 == (64512 & (e = n.charCodeAt(f))) && f + 1 < a && 56320 == (64512 & (o = n.charCodeAt(f + 1))) && (e = 65536 + (e - 55296 << 10) + (o - 56320), f++), i += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
            for (t = new r.Buf8(i), u = 0, f = 0; u < i; f++) 55296 == (64512 & (e = n.charCodeAt(f))) && f + 1 < a && 56320 == (64512 & (o = n.charCodeAt(f + 1))) && (e = 65536 + (e - 55296 << 10) + (o - 56320), f++), e < 128 ? t[u++] = e : e < 2048 ? (t[u++] = 192 | e >>> 6, t[u++] = 128 | 63 & e) : e < 65536 ? (t[u++] = 224 | e >>> 12, t[u++] = 128 | e >>> 6 & 63, t[u++] = 128 | 63 & e) : (t[u++] = 240 | e >>> 18, t[u++] = 128 | e >>> 12 & 63, t[u++] = 128 | e >>> 6 & 63, t[u++] = 128 | 63 & e);
            return t
        }, exports.buf2binstring = function(r) {
            return f(r, r.length)
        }, exports.binstring2buf = function(n) {
            for (var t = new r.Buf8(n.length), e = 0, o = t.length; e < o; e++) t[e] = n.charCodeAt(e);
            return t
        }, exports.buf2string = function(r, n) {
            var t, o, u, a, i = n || r.length,
                h = new Array(2 * i);
            for (o = 0, t = 0; t < i;)
                if ((u = r[t++]) < 128) h[o++] = u;
                else if ((a = e[u]) > 4) h[o++] = 65533, t += a - 1;
            else {
                for (u &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && t < i;) u = u << 6 | 63 & r[t++], a--;
                a > 1 ? h[o++] = 65533 : u < 65536 ? h[o++] = u : (u -= 65536, h[o++] = 55296 | u >> 10 & 1023, h[o++] = 56320 | 1023 & u)
            }
            return f(h, o)
        }, exports.utf8border = function(r, n) {
            var t;
            for ((n = n || r.length) > r.length && (n = r.length), t = n - 1; t >= 0 && 128 == (192 & r[t]);) t--;
            return t < 0 ? n : 0 === t ? n : t + e[r[t]] > n ? t : n
        };
    }, {
        "./common": "tbG5"
    }],
    "bdtv": [function(require, module, exports) {
        "use strict";

        function t() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
        }
        module.exports = t;
    }, {}],
    "nFS2": [function(require, module, exports) {
        "use strict";
        var t = require("./zlib/deflate"),
            i = require("./utils/common"),
            e = require("./utils/strings"),
            n = require("./zlib/messages"),
            r = require("./zlib/zstream"),
            s = Object.prototype.toString,
            o = 0,
            a = 4,
            u = 0,
            h = 1,
            d = 2,
            l = -1,
            f = 0,
            p = 8;

        function w(o) {
            if (!(this instanceof w)) return new w(o);
            this.options = i.assign({
                level: l,
                method: p,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: f,
                to: ""
            }, o || {});
            var a = this.options;
            a.raw && a.windowBits > 0 ? a.windowBits = -a.windowBits : a.gzip && a.windowBits > 0 && a.windowBits < 16 && (a.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r, this.strm.avail_out = 0;
            var h = t.deflateInit2(this.strm, a.level, a.method, a.windowBits, a.memLevel, a.strategy);
            if (h !== u) throw new Error(n[h]);
            if (a.header && t.deflateSetHeader(this.strm, a.header), a.dictionary) {
                var d;
                if (d = "string" == typeof a.dictionary ? e.string2buf(a.dictionary) : "[object ArrayBuffer]" === s.call(a.dictionary) ? new Uint8Array(a.dictionary) : a.dictionary, (h = t.deflateSetDictionary(this.strm, d)) !== u) throw new Error(n[h]);
                this._dict_set = !0
            }
        }

        function c(t, i) {
            var e = new w(i);
            if (e.push(t, !0), e.err) throw e.msg || n[e.err];
            return e.result
        }

        function m(t, i) {
            return (i = i || {}).raw = !0, c(t, i)
        }

        function g(t, i) {
            return (i = i || {}).gzip = !0, c(t, i)
        }
        w.prototype.push = function(n, r) {
            var l, f, p = this.strm,
                w = this.options.chunkSize;
            if (this.ended) return !1;
            f = r === ~~r ? r : !0 === r ? a : o, "string" == typeof n ? p.input = e.string2buf(n) : "[object ArrayBuffer]" === s.call(n) ? p.input = new Uint8Array(n) : p.input = n, p.next_in = 0, p.avail_in = p.input.length;
            do {
                if (0 === p.avail_out && (p.output = new i.Buf8(w), p.next_out = 0, p.avail_out = w), (l = t.deflate(p, f)) !== h && l !== u) return this.onEnd(l), this.ended = !0, !1;
                0 !== p.avail_out && (0 !== p.avail_in || f !== a && f !== d) || ("string" === this.options.to ? this.onData(e.buf2binstring(i.shrinkBuf(p.output, p.next_out))) : this.onData(i.shrinkBuf(p.output, p.next_out)))
            } while ((p.avail_in > 0 || 0 === p.avail_out) && l !== h);
            return f === a ? (l = t.deflateEnd(this.strm), this.onEnd(l), this.ended = !0, l === u) : f !== d || (this.onEnd(u), p.avail_out = 0, !0)
        }, w.prototype.onData = function(t) {
            this.chunks.push(t)
        }, w.prototype.onEnd = function(t) {
            t === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
        }, exports.Deflate = w, exports.deflate = c, exports.deflateRaw = m, exports.gzip = g;
    }, {
        "./zlib/deflate": "BLBk",
        "./utils/common": "tbG5",
        "./utils/strings": "Q3ZD",
        "./zlib/messages": "gMAY",
        "./zlib/zstream": "bdtv"
    }],
    "LP5M": [function(require, module, exports) {
        "use strict";
        var i = 30,
            e = 12;
        module.exports = function(o, a) {
            var t, d, n, l, s, f, r, b, c, u, v, m, w, h, k, _, x, g, p, z, j, q, y, A, B;
            t = o.state, d = o.next_in, A = o.input, n = d + (o.avail_in - 5), l = o.next_out, B = o.output, s = l - (a - o.avail_out), f = l + (o.avail_out - 257), r = t.dmax, b = t.wsize, c = t.whave, u = t.wnext, v = t.window, m = t.hold, w = t.bits, h = t.lencode, k = t.distcode, _ = (1 << t.lenbits) - 1, x = (1 << t.distbits) - 1;
            i: do {
                w < 15 && (m += A[d++] << w, w += 8, m += A[d++] << w, w += 8), g = h[m & _];
                e: for (;;) {
                    if (m >>>= p = g >>> 24, w -= p, 0 === (p = g >>> 16 & 255)) B[l++] = 65535 & g;
                    else {
                        if (!(16 & p)) {
                            if (0 == (64 & p)) {
                                g = h[(65535 & g) + (m & (1 << p) - 1)];
                                continue e
                            }
                            if (32 & p) {
                                t.mode = e;
                                break i
                            }
                            o.msg = "invalid literal/length code", t.mode = i;
                            break i
                        }
                        z = 65535 & g, (p &= 15) && (w < p && (m += A[d++] << w, w += 8), z += m & (1 << p) - 1, m >>>= p, w -= p), w < 15 && (m += A[d++] << w, w += 8, m += A[d++] << w, w += 8), g = k[m & x];
                        o: for (;;) {
                            if (m >>>= p = g >>> 24, w -= p, !(16 & (p = g >>> 16 & 255))) {
                                if (0 == (64 & p)) {
                                    g = k[(65535 & g) + (m & (1 << p) - 1)];
                                    continue o
                                }
                                o.msg = "invalid distance code", t.mode = i;
                                break i
                            }
                            if (j = 65535 & g, w < (p &= 15) && (m += A[d++] << w, (w += 8) < p && (m += A[d++] << w, w += 8)), (j += m & (1 << p) - 1) > r) {
                                o.msg = "invalid distance too far back", t.mode = i;
                                break i
                            }
                            if (m >>>= p, w -= p, j > (p = l - s)) {
                                if ((p = j - p) > c && t.sane) {
                                    o.msg = "invalid distance too far back", t.mode = i;
                                    break i
                                }
                                if (q = 0, y = v, 0 === u) {
                                    if (q += b - p, p < z) {
                                        z -= p;
                                        do {
                                            B[l++] = v[q++]
                                        } while (--p);
                                        q = l - j, y = B
                                    }
                                } else if (u < p) {
                                    if (q += b + u - p, (p -= u) < z) {
                                        z -= p;
                                        do {
                                            B[l++] = v[q++]
                                        } while (--p);
                                        if (q = 0, u < z) {
                                            z -= p = u;
                                            do {
                                                B[l++] = v[q++]
                                            } while (--p);
                                            q = l - j, y = B
                                        }
                                    }
                                } else if (q += u - p, p < z) {
                                    z -= p;
                                    do {
                                        B[l++] = v[q++]
                                    } while (--p);
                                    q = l - j, y = B
                                }
                                for (; z > 2;) B[l++] = y[q++], B[l++] = y[q++], B[l++] = y[q++], z -= 3;
                                z && (B[l++] = y[q++], z > 1 && (B[l++] = y[q++]))
                            } else {
                                q = l - j;
                                do {
                                    B[l++] = B[q++], B[l++] = B[q++], B[l++] = B[q++], z -= 3
                                } while (z > 2);
                                z && (B[l++] = B[q++], z > 1 && (B[l++] = B[q++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (d < n && l < f);
            d -= z = w >> 3, m &= (1 << (w -= z << 3)) - 1, o.next_in = d, o.next_out = l, o.avail_in = d < n ? n - d + 5 : 5 - (d - n), o.avail_out = l < f ? f - l + 257 : 257 - (l - f), t.hold = m, t.bits = w
        };
    }, {}],
    "uNlq": [function(require, module, exports) {
        "use strict";
        var r = require("../utils/common"),
            f = 15,
            i = 852,
            o = 592,
            e = 0,
            u = 1,
            t = 2,
            n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            l = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
            s = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
            b = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        module.exports = function(a, c, m, w, d, v, B, h) {
            var k, p, q, x, g, j, y, z, A, C = h.bits,
                D = 0,
                E = 0,
                F = 0,
                G = 0,
                H = 0,
                I = 0,
                J = 0,
                K = 0,
                L = 0,
                M = 0,
                N = null,
                O = 0,
                P = new r.Buf16(f + 1),
                Q = new r.Buf16(f + 1),
                R = null,
                S = 0;
            for (D = 0; D <= f; D++) P[D] = 0;
            for (E = 0; E < w; E++) P[c[m + E]]++;
            for (H = C, G = f; G >= 1 && 0 === P[G]; G--);
            if (H > G && (H = G), 0 === G) return d[v++] = 20971520, d[v++] = 20971520, h.bits = 1, 0;
            for (F = 1; F < G && 0 === P[F]; F++);
            for (H < F && (H = F), K = 1, D = 1; D <= f; D++)
                if (K <<= 1, (K -= P[D]) < 0) return -1;
            if (K > 0 && (a === e || 1 !== G)) return -1;
            for (Q[1] = 0, D = 1; D < f; D++) Q[D + 1] = Q[D] + P[D];
            for (E = 0; E < w; E++) 0 !== c[m + E] && (B[Q[c[m + E]]++] = E);
            if (a === e ? (N = R = B, j = 19) : a === u ? (N = n, O -= 257, R = l, S -= 257, j = 256) : (N = s, R = b, j = -1), M = 0, E = 0, D = F, g = v, I = H, J = 0, q = -1, x = (L = 1 << H) - 1, a === u && L > i || a === t && L > o) return 1;
            for (;;) {
                y = D - J, B[E] < j ? (z = 0, A = B[E]) : B[E] > j ? (z = R[S + B[E]], A = N[O + B[E]]) : (z = 96, A = 0), k = 1 << D - J, F = p = 1 << I;
                do {
                    d[g + (M >> J) + (p -= k)] = y << 24 | z << 16 | A | 0
                } while (0 !== p);
                for (k = 1 << D - 1; M & k;) k >>= 1;
                if (0 !== k ? (M &= k - 1, M += k) : M = 0, E++, 0 == --P[D]) {
                    if (D === G) break;
                    D = c[m + B[E]]
                }
                if (D > H && (M & x) !== q) {
                    for (0 === J && (J = H), g += F, K = 1 << (I = D - J); I + J < G && !((K -= P[I + J]) <= 0);) I++, K <<= 1;
                    if (L += 1 << I, a === u && L > i || a === t && L > o) return 1;
                    d[q = M & x] = H << 24 | I << 16 | g - v | 0
                }
            }
            return 0 !== M && (d[g + M] = D - J << 24 | 64 << 16 | 0), h.bits = H, 0
        };
    }, {
        "../utils/common": "tbG5"
    }],
    "GIDK": [function(require, module, exports) {
        "use strict";
        var e = require("../utils/common"),
            a = require("./adler32"),
            t = require("./crc32"),
            i = require("./inffast"),
            s = require("./inftrees"),
            n = 0,
            r = 1,
            o = 2,
            d = 4,
            l = 5,
            f = 6,
            c = 0,
            h = 1,
            k = 2,
            b = -2,
            m = -3,
            w = -4,
            u = -5,
            g = 8,
            v = 1,
            x = 2,
            p = 3,
            _ = 4,
            y = 5,
            z = 6,
            B = 7,
            S = 8,
            q = 9,
            C = 10,
            I = 11,
            R = 12,
            j = 13,
            A = 14,
            D = 15,
            E = 16,
            G = 17,
            H = 18,
            K = 19,
            N = 20,
            F = 21,
            J = 22,
            L = 23,
            M = 24,
            O = 25,
            P = 26,
            Q = 27,
            T = 28,
            U = 29,
            V = 30,
            W = 31,
            X = 32,
            Y = 852,
            Z = 592,
            $ = 15,
            ee = $;

        function ae(e) {
            return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
        }

        function te() {
            this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new e.Buf16(320), this.work = new e.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
        }

        function ie(a) {
            var t;
            return a && a.state ? (t = a.state, a.total_in = a.total_out = t.total = 0, a.msg = "", t.wrap && (a.adler = 1 & t.wrap), t.mode = v, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new e.Buf32(Y), t.distcode = t.distdyn = new e.Buf32(Z), t.sane = 1, t.back = -1, c) : b
        }

        function se(e) {
            var a;
            return e && e.state ? ((a = e.state).wsize = 0, a.whave = 0, a.wnext = 0, ie(e)) : b
        }

        function ne(e, a) {
            var t, i;
            return e && e.state ? (i = e.state, a < 0 ? (t = 0, a = -a) : (t = 1 + (a >> 4), a < 48 && (a &= 15)), a && (a < 8 || a > 15) ? b : (null !== i.window && i.wbits !== a && (i.window = null), i.wrap = t, i.wbits = a, se(e))) : b
        }

        function re(e, a) {
            var t, i;
            return e ? (i = new te, e.state = i, i.window = null, (t = ne(e, a)) !== c && (e.state = null), t) : b
        }

        function oe(e) {
            return re(e, ee)
        }
        var de, le, fe = !0;

        function ce(a) {
            if (fe) {
                var t;
                for (de = new e.Buf32(512), le = new e.Buf32(32), t = 0; t < 144;) a.lens[t++] = 8;
                for (; t < 256;) a.lens[t++] = 9;
                for (; t < 280;) a.lens[t++] = 7;
                for (; t < 288;) a.lens[t++] = 8;
                for (s(r, a.lens, 0, 288, de, 0, a.work, {
                        bits: 9
                    }), t = 0; t < 32;) a.lens[t++] = 5;
                s(o, a.lens, 0, 32, le, 0, a.work, {
                    bits: 5
                }), fe = !1
            }
            a.lencode = de, a.lenbits = 9, a.distcode = le, a.distbits = 5
        }

        function he(a, t, i, s) {
            var n, r = a.state;
            return null === r.window && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0, r.window = new e.Buf8(r.wsize)), s >= r.wsize ? (e.arraySet(r.window, t, i - r.wsize, r.wsize, 0), r.wnext = 0, r.whave = r.wsize) : ((n = r.wsize - r.wnext) > s && (n = s), e.arraySet(r.window, t, i - s, n, r.wnext), (s -= n) ? (e.arraySet(r.window, t, i - s, s, 0), r.wnext = s, r.whave = r.wsize) : (r.wnext += n, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += n))), 0
        }

        function ke(Y, Z) {
            var $, ee, te, ie, se, ne, re, oe, de, le, fe, ke, be, me, we, ue, ge, ve, xe, pe, _e, ye, ze, Be, Se = 0,
                qe = new e.Buf8(4),
                Ce = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!Y || !Y.state || !Y.output || !Y.input && 0 !== Y.avail_in) return b;
            ($ = Y.state).mode === R && ($.mode = j), se = Y.next_out, te = Y.output, re = Y.avail_out, ie = Y.next_in, ee = Y.input, ne = Y.avail_in, oe = $.hold, de = $.bits, le = ne, fe = re, ye = c;
            e: for (;;) switch ($.mode) {
                case v:
                    if (0 === $.wrap) {
                        $.mode = j;
                        break
                    }
                    for (; de < 16;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    if (2 & $.wrap && 35615 === oe) {
                        $.check = 0, qe[0] = 255 & oe, qe[1] = oe >>> 8 & 255, $.check = t($.check, qe, 2, 0), oe = 0, de = 0, $.mode = x;
                        break
                    }
                    if ($.flags = 0, $.head && ($.head.done = !1), !(1 & $.wrap) || (((255 & oe) << 8) + (oe >> 8)) % 31) {
                        Y.msg = "incorrect header check", $.mode = V;
                        break
                    }
                    if ((15 & oe) !== g) {
                        Y.msg = "unknown compression method", $.mode = V;
                        break
                    }
                    if (de -= 4, _e = 8 + (15 & (oe >>>= 4)), 0 === $.wbits) $.wbits = _e;
                    else if (_e > $.wbits) {
                        Y.msg = "invalid window size", $.mode = V;
                        break
                    }
                    $.dmax = 1 << _e, Y.adler = $.check = 1, $.mode = 512 & oe ? C : R, oe = 0, de = 0;
                    break;
                case x:
                    for (; de < 16;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    if ($.flags = oe, (255 & $.flags) !== g) {
                        Y.msg = "unknown compression method", $.mode = V;
                        break
                    }
                    if (57344 & $.flags) {
                        Y.msg = "unknown header flags set", $.mode = V;
                        break
                    }
                    $.head && ($.head.text = oe >> 8 & 1), 512 & $.flags && (qe[0] = 255 & oe, qe[1] = oe >>> 8 & 255, $.check = t($.check, qe, 2, 0)), oe = 0, de = 0, $.mode = p;
                case p:
                    for (; de < 32;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    $.head && ($.head.time = oe), 512 & $.flags && (qe[0] = 255 & oe, qe[1] = oe >>> 8 & 255, qe[2] = oe >>> 16 & 255, qe[3] = oe >>> 24 & 255, $.check = t($.check, qe, 4, 0)), oe = 0, de = 0, $.mode = _;
                case _:
                    for (; de < 16;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    $.head && ($.head.xflags = 255 & oe, $.head.os = oe >> 8), 512 & $.flags && (qe[0] = 255 & oe, qe[1] = oe >>> 8 & 255, $.check = t($.check, qe, 2, 0)), oe = 0, de = 0, $.mode = y;
                case y:
                    if (1024 & $.flags) {
                        for (; de < 16;) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        $.length = oe, $.head && ($.head.extra_len = oe), 512 & $.flags && (qe[0] = 255 & oe, qe[1] = oe >>> 8 & 255, $.check = t($.check, qe, 2, 0)), oe = 0, de = 0
                    } else $.head && ($.head.extra = null);
                    $.mode = z;
                case z:
                    if (1024 & $.flags && ((ke = $.length) > ne && (ke = ne), ke && ($.head && (_e = $.head.extra_len - $.length, $.head.extra || ($.head.extra = new Array($.head.extra_len)), e.arraySet($.head.extra, ee, ie, ke, _e)), 512 & $.flags && ($.check = t($.check, ee, ke, ie)), ne -= ke, ie += ke, $.length -= ke), $.length)) break e;
                    $.length = 0, $.mode = B;
                case B:
                    if (2048 & $.flags) {
                        if (0 === ne) break e;
                        ke = 0;
                        do {
                            _e = ee[ie + ke++], $.head && _e && $.length < 65536 && ($.head.name += String.fromCharCode(_e))
                        } while (_e && ke < ne);
                        if (512 & $.flags && ($.check = t($.check, ee, ke, ie)), ne -= ke, ie += ke, _e) break e
                    } else $.head && ($.head.name = null);
                    $.length = 0, $.mode = S;
                case S:
                    if (4096 & $.flags) {
                        if (0 === ne) break e;
                        ke = 0;
                        do {
                            _e = ee[ie + ke++], $.head && _e && $.length < 65536 && ($.head.comment += String.fromCharCode(_e))
                        } while (_e && ke < ne);
                        if (512 & $.flags && ($.check = t($.check, ee, ke, ie)), ne -= ke, ie += ke, _e) break e
                    } else $.head && ($.head.comment = null);
                    $.mode = q;
                case q:
                    if (512 & $.flags) {
                        for (; de < 16;) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        if (oe !== (65535 & $.check)) {
                            Y.msg = "header crc mismatch", $.mode = V;
                            break
                        }
                        oe = 0, de = 0
                    }
                    $.head && ($.head.hcrc = $.flags >> 9 & 1, $.head.done = !0), Y.adler = $.check = 0, $.mode = R;
                    break;
                case C:
                    for (; de < 32;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    Y.adler = $.check = ae(oe), oe = 0, de = 0, $.mode = I;
                case I:
                    if (0 === $.havedict) return Y.next_out = se, Y.avail_out = re, Y.next_in = ie, Y.avail_in = ne, $.hold = oe, $.bits = de, k;
                    Y.adler = $.check = 1, $.mode = R;
                case R:
                    if (Z === l || Z === f) break e;
                case j:
                    if ($.last) {
                        oe >>>= 7 & de, de -= 7 & de, $.mode = Q;
                        break
                    }
                    for (; de < 3;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    switch ($.last = 1 & oe, de -= 1, 3 & (oe >>>= 1)) {
                        case 0:
                            $.mode = A;
                            break;
                        case 1:
                            if (ce($), $.mode = N, Z === f) {
                                oe >>>= 2, de -= 2;
                                break e
                            }
                            break;
                        case 2:
                            $.mode = G;
                            break;
                        case 3:
                            Y.msg = "invalid block type", $.mode = V
                    }
                    oe >>>= 2, de -= 2;
                    break;
                case A:
                    for (oe >>>= 7 & de, de -= 7 & de; de < 32;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    if ((65535 & oe) != (oe >>> 16 ^ 65535)) {
                        Y.msg = "invalid stored block lengths", $.mode = V;
                        break
                    }
                    if ($.length = 65535 & oe, oe = 0, de = 0, $.mode = D, Z === f) break e;
                case D:
                    $.mode = E;
                case E:
                    if (ke = $.length) {
                        if (ke > ne && (ke = ne), ke > re && (ke = re), 0 === ke) break e;
                        e.arraySet(te, ee, ie, ke, se), ne -= ke, ie += ke, re -= ke, se += ke, $.length -= ke;
                        break
                    }
                    $.mode = R;
                    break;
                case G:
                    for (; de < 14;) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    if ($.nlen = 257 + (31 & oe), oe >>>= 5, de -= 5, $.ndist = 1 + (31 & oe), oe >>>= 5, de -= 5, $.ncode = 4 + (15 & oe), oe >>>= 4, de -= 4, $.nlen > 286 || $.ndist > 30) {
                        Y.msg = "too many length or distance symbols", $.mode = V;
                        break
                    }
                    $.have = 0, $.mode = H;
                case H:
                    for (; $.have < $.ncode;) {
                        for (; de < 3;) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        $.lens[Ce[$.have++]] = 7 & oe, oe >>>= 3, de -= 3
                    }
                    for (; $.have < 19;) $.lens[Ce[$.have++]] = 0;
                    if ($.lencode = $.lendyn, $.lenbits = 7, ze = {
                            bits: $.lenbits
                        }, ye = s(n, $.lens, 0, 19, $.lencode, 0, $.work, ze), $.lenbits = ze.bits, ye) {
                        Y.msg = "invalid code lengths set", $.mode = V;
                        break
                    }
                    $.have = 0, $.mode = K;
                case K:
                    for (; $.have < $.nlen + $.ndist;) {
                        for (; ue = (Se = $.lencode[oe & (1 << $.lenbits) - 1]) >>> 16 & 255, ge = 65535 & Se, !((we = Se >>> 24) <= de);) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        if (ge < 16) oe >>>= we, de -= we, $.lens[$.have++] = ge;
                        else {
                            if (16 === ge) {
                                for (Be = we + 2; de < Be;) {
                                    if (0 === ne) break e;
                                    ne--, oe += ee[ie++] << de, de += 8
                                }
                                if (oe >>>= we, de -= we, 0 === $.have) {
                                    Y.msg = "invalid bit length repeat", $.mode = V;
                                    break
                                }
                                _e = $.lens[$.have - 1], ke = 3 + (3 & oe), oe >>>= 2, de -= 2
                            } else if (17 === ge) {
                                for (Be = we + 3; de < Be;) {
                                    if (0 === ne) break e;
                                    ne--, oe += ee[ie++] << de, de += 8
                                }
                                de -= we, _e = 0, ke = 3 + (7 & (oe >>>= we)), oe >>>= 3, de -= 3
                            } else {
                                for (Be = we + 7; de < Be;) {
                                    if (0 === ne) break e;
                                    ne--, oe += ee[ie++] << de, de += 8
                                }
                                de -= we, _e = 0, ke = 11 + (127 & (oe >>>= we)), oe >>>= 7, de -= 7
                            }
                            if ($.have + ke > $.nlen + $.ndist) {
                                Y.msg = "invalid bit length repeat", $.mode = V;
                                break
                            }
                            for (; ke--;) $.lens[$.have++] = _e
                        }
                    }
                    if ($.mode === V) break;
                    if (0 === $.lens[256]) {
                        Y.msg = "invalid code -- missing end-of-block", $.mode = V;
                        break
                    }
                    if ($.lenbits = 9, ze = {
                            bits: $.lenbits
                        }, ye = s(r, $.lens, 0, $.nlen, $.lencode, 0, $.work, ze), $.lenbits = ze.bits, ye) {
                        Y.msg = "invalid literal/lengths set", $.mode = V;
                        break
                    }
                    if ($.distbits = 6, $.distcode = $.distdyn, ze = {
                            bits: $.distbits
                        }, ye = s(o, $.lens, $.nlen, $.ndist, $.distcode, 0, $.work, ze), $.distbits = ze.bits, ye) {
                        Y.msg = "invalid distances set", $.mode = V;
                        break
                    }
                    if ($.mode = N, Z === f) break e;
                case N:
                    $.mode = F;
                case F:
                    if (ne >= 6 && re >= 258) {
                        Y.next_out = se, Y.avail_out = re, Y.next_in = ie, Y.avail_in = ne, $.hold = oe, $.bits = de, i(Y, fe), se = Y.next_out, te = Y.output, re = Y.avail_out, ie = Y.next_in, ee = Y.input, ne = Y.avail_in, oe = $.hold, de = $.bits, $.mode === R && ($.back = -1);
                        break
                    }
                    for ($.back = 0; ue = (Se = $.lencode[oe & (1 << $.lenbits) - 1]) >>> 16 & 255, ge = 65535 & Se, !((we = Se >>> 24) <= de);) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    if (ue && 0 == (240 & ue)) {
                        for (ve = we, xe = ue, pe = ge; ue = (Se = $.lencode[pe + ((oe & (1 << ve + xe) - 1) >> ve)]) >>> 16 & 255, ge = 65535 & Se, !(ve + (we = Se >>> 24) <= de);) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        oe >>>= ve, de -= ve, $.back += ve
                    }
                    if (oe >>>= we, de -= we, $.back += we, $.length = ge, 0 === ue) {
                        $.mode = P;
                        break
                    }
                    if (32 & ue) {
                        $.back = -1, $.mode = R;
                        break
                    }
                    if (64 & ue) {
                        Y.msg = "invalid literal/length code", $.mode = V;
                        break
                    }
                    $.extra = 15 & ue, $.mode = J;
                case J:
                    if ($.extra) {
                        for (Be = $.extra; de < Be;) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        $.length += oe & (1 << $.extra) - 1, oe >>>= $.extra, de -= $.extra, $.back += $.extra
                    }
                    $.was = $.length, $.mode = L;
                case L:
                    for (; ue = (Se = $.distcode[oe & (1 << $.distbits) - 1]) >>> 16 & 255, ge = 65535 & Se, !((we = Se >>> 24) <= de);) {
                        if (0 === ne) break e;
                        ne--, oe += ee[ie++] << de, de += 8
                    }
                    if (0 == (240 & ue)) {
                        for (ve = we, xe = ue, pe = ge; ue = (Se = $.distcode[pe + ((oe & (1 << ve + xe) - 1) >> ve)]) >>> 16 & 255, ge = 65535 & Se, !(ve + (we = Se >>> 24) <= de);) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        oe >>>= ve, de -= ve, $.back += ve
                    }
                    if (oe >>>= we, de -= we, $.back += we, 64 & ue) {
                        Y.msg = "invalid distance code", $.mode = V;
                        break
                    }
                    $.offset = ge, $.extra = 15 & ue, $.mode = M;
                case M:
                    if ($.extra) {
                        for (Be = $.extra; de < Be;) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        $.offset += oe & (1 << $.extra) - 1, oe >>>= $.extra, de -= $.extra, $.back += $.extra
                    }
                    if ($.offset > $.dmax) {
                        Y.msg = "invalid distance too far back", $.mode = V;
                        break
                    }
                    $.mode = O;
                case O:
                    if (0 === re) break e;
                    if (ke = fe - re, $.offset > ke) {
                        if ((ke = $.offset - ke) > $.whave && $.sane) {
                            Y.msg = "invalid distance too far back", $.mode = V;
                            break
                        }
                        ke > $.wnext ? (ke -= $.wnext, be = $.wsize - ke) : be = $.wnext - ke, ke > $.length && (ke = $.length), me = $.window
                    } else me = te, be = se - $.offset, ke = $.length;
                    ke > re && (ke = re), re -= ke, $.length -= ke;
                    do {
                        te[se++] = me[be++]
                    } while (--ke);
                    0 === $.length && ($.mode = F);
                    break;
                case P:
                    if (0 === re) break e;
                    te[se++] = $.length, re--, $.mode = F;
                    break;
                case Q:
                    if ($.wrap) {
                        for (; de < 32;) {
                            if (0 === ne) break e;
                            ne--, oe |= ee[ie++] << de, de += 8
                        }
                        if (fe -= re, Y.total_out += fe, $.total += fe, fe && (Y.adler = $.check = $.flags ? t($.check, te, fe, se - fe) : a($.check, te, fe, se - fe)), fe = re, ($.flags ? oe : ae(oe)) !== $.check) {
                            Y.msg = "incorrect data check", $.mode = V;
                            break
                        }
                        oe = 0, de = 0
                    }
                    $.mode = T;
                case T:
                    if ($.wrap && $.flags) {
                        for (; de < 32;) {
                            if (0 === ne) break e;
                            ne--, oe += ee[ie++] << de, de += 8
                        }
                        if (oe !== (4294967295 & $.total)) {
                            Y.msg = "incorrect length check", $.mode = V;
                            break
                        }
                        oe = 0, de = 0
                    }
                    $.mode = U;
                case U:
                    ye = h;
                    break e;
                case V:
                    ye = m;
                    break e;
                case W:
                    return w;
                case X:
                default:
                    return b
            }
            return Y.next_out = se, Y.avail_out = re, Y.next_in = ie, Y.avail_in = ne, $.hold = oe, $.bits = de, ($.wsize || fe !== Y.avail_out && $.mode < V && ($.mode < Q || Z !== d)) && he(Y, Y.output, Y.next_out, fe - Y.avail_out) ? ($.mode = W, w) : (le -= Y.avail_in, fe -= Y.avail_out, Y.total_in += le, Y.total_out += fe, $.total += fe, $.wrap && fe && (Y.adler = $.check = $.flags ? t($.check, te, fe, Y.next_out - fe) : a($.check, te, fe, Y.next_out - fe)), Y.data_type = $.bits + ($.last ? 64 : 0) + ($.mode === R ? 128 : 0) + ($.mode === N || $.mode === D ? 256 : 0), (0 === le && 0 === fe || Z === d) && ye === c && (ye = u), ye)
        }

        function be(e) {
            if (!e || !e.state) return b;
            var a = e.state;
            return a.window && (a.window = null), e.state = null, c
        }

        function me(e, a) {
            var t;
            return e && e.state ? 0 == (2 & (t = e.state).wrap) ? b : (t.head = a, a.done = !1, c) : b
        }

        function we(e, t) {
            var i, s = t.length;
            return e && e.state ? 0 !== (i = e.state).wrap && i.mode !== I ? b : i.mode === I && a(1, t, s, 0) !== i.check ? m : he(e, t, s, s) ? (i.mode = W, w) : (i.havedict = 1, c) : b
        }
        exports.inflateReset = se, exports.inflateReset2 = ne, exports.inflateResetKeep = ie, exports.inflateInit = oe, exports.inflateInit2 = re, exports.inflate = ke, exports.inflateEnd = be, exports.inflateGetHeader = me, exports.inflateSetDictionary = we, exports.inflateInfo = "pako inflate (from Nodeca project)";
    }, {
        "../utils/common": "tbG5",
        "./adler32": "uxo6",
        "./crc32": "X4kj",
        "./inffast": "LP5M",
        "./inftrees": "uNlq"
    }],
    "xUUw": [function(require, module, exports) {
        "use strict";
        module.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
        };
    }, {}],
    "WIli": [function(require, module, exports) {
        "use strict";

        function t() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
        }
        module.exports = t;
    }, {}],
    "faQk": [function(require, module, exports) {
        "use strict";
        var t = require("./zlib/inflate"),
            i = require("./utils/common"),
            n = require("./utils/strings"),
            r = require("./zlib/constants"),
            s = require("./zlib/messages"),
            o = require("./zlib/zstream"),
            e = require("./zlib/gzheader"),
            a = Object.prototype.toString;

        function u(h) {
            if (!(this instanceof u)) return new u(h);
            this.options = i.assign({
                chunkSize: 16384,
                windowBits: 0,
                to: ""
            }, h || {});
            var _ = this.options;
            _.raw && _.windowBits >= 0 && _.windowBits < 16 && (_.windowBits = -_.windowBits, 0 === _.windowBits && (_.windowBits = -15)), !(_.windowBits >= 0 && _.windowBits < 16) || h && h.windowBits || (_.windowBits += 32), _.windowBits > 15 && _.windowBits < 48 && 0 == (15 & _.windowBits) && (_.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new o, this.strm.avail_out = 0;
            var w = t.inflateInit2(this.strm, _.windowBits);
            if (w !== r.Z_OK) throw new Error(s[w]);
            if (this.header = new e, t.inflateGetHeader(this.strm, this.header), _.dictionary && ("string" == typeof _.dictionary ? _.dictionary = n.string2buf(_.dictionary) : "[object ArrayBuffer]" === a.call(_.dictionary) && (_.dictionary = new Uint8Array(_.dictionary)), _.raw && (w = t.inflateSetDictionary(this.strm, _.dictionary)) !== r.Z_OK)) throw new Error(s[w])
        }

        function h(t, i) {
            var n = new u(i);
            if (n.push(t, !0), n.err) throw n.msg || s[n.err];
            return n.result
        }

        function _(t, i) {
            return (i = i || {}).raw = !0, h(t, i)
        }
        u.prototype.push = function(s, o) {
            var e, u, h, _, w, d = this.strm,
                l = this.options.chunkSize,
                f = this.options.dictionary,
                p = !1;
            if (this.ended) return !1;
            u = o === ~~o ? o : !0 === o ? r.Z_FINISH : r.Z_NO_FLUSH, "string" == typeof s ? d.input = n.binstring2buf(s) : "[object ArrayBuffer]" === a.call(s) ? d.input = new Uint8Array(s) : d.input = s, d.next_in = 0, d.avail_in = d.input.length;
            do {
                if (0 === d.avail_out && (d.output = new i.Buf8(l), d.next_out = 0, d.avail_out = l), (e = t.inflate(d, r.Z_NO_FLUSH)) === r.Z_NEED_DICT && f && (e = t.inflateSetDictionary(this.strm, f)), e === r.Z_BUF_ERROR && !0 === p && (e = r.Z_OK, p = !1), e !== r.Z_STREAM_END && e !== r.Z_OK) return this.onEnd(e), this.ended = !0, !1;
                d.next_out && (0 !== d.avail_out && e !== r.Z_STREAM_END && (0 !== d.avail_in || u !== r.Z_FINISH && u !== r.Z_SYNC_FLUSH) || ("string" === this.options.to ? (h = n.utf8border(d.output, d.next_out), _ = d.next_out - h, w = n.buf2string(d.output, h), d.next_out = _, d.avail_out = l - _, _ && i.arraySet(d.output, d.output, h, _, 0), this.onData(w)) : this.onData(i.shrinkBuf(d.output, d.next_out)))), 0 === d.avail_in && 0 === d.avail_out && (p = !0)
            } while ((d.avail_in > 0 || 0 === d.avail_out) && e !== r.Z_STREAM_END);
            return e === r.Z_STREAM_END && (u = r.Z_FINISH), u === r.Z_FINISH ? (e = t.inflateEnd(this.strm), this.onEnd(e), this.ended = !0, e === r.Z_OK) : u !== r.Z_SYNC_FLUSH || (this.onEnd(r.Z_OK), d.avail_out = 0, !0)
        }, u.prototype.onData = function(t) {
            this.chunks.push(t)
        }, u.prototype.onEnd = function(t) {
            t === r.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
        }, exports.Inflate = u, exports.inflate = h, exports.inflateRaw = _, exports.ungzip = h;
    }, {
        "./zlib/inflate": "GIDK",
        "./utils/common": "tbG5",
        "./utils/strings": "Q3ZD",
        "./zlib/constants": "xUUw",
        "./zlib/messages": "gMAY",
        "./zlib/zstream": "bdtv",
        "./zlib/gzheader": "WIli"
    }],
    "f4vO": [function(require, module, exports) {
        "use strict";
        var e = require("./lib/utils/common").assign,
            i = require("./lib/deflate"),
            r = require("./lib/inflate"),
            l = require("./lib/zlib/constants"),
            s = {};
        e(s, i, r, l), module.exports = s;
    }, {
        "./lib/utils/common": "tbG5",
        "./lib/deflate": "nFS2",
        "./lib/inflate": "faQk",
        "./lib/zlib/constants": "xUUw"
    }],
    "xaRr": [function(require, module, exports) {
        var define;
        var global = arguments[3];
        var define, global = arguments[3];
        "undefined" != typeof navigator && function(t, e) {
            "function" == typeof define && define.amd ? define(function() {
                return e(t)
            }) : "object" == typeof module && module.exports ? module.exports = e(t) : (t.lottie = e(t), t.bodymovin = t.lottie)
        }(window || {}, function(window) {
            "use strict";
            var svgNS = "http://www.w3.org/2000/svg",
                locationHref = "",
                initialDefaultFrame = -999999,
                subframeEnabled = !0,
                expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
                cachedColors = {},
                bm_rounder = Math.round,
                bm_rnd, bm_pow = Math.pow,
                bm_sqrt = Math.sqrt,
                bm_abs = Math.abs,
                bm_floor = Math.floor,
                bm_max = Math.max,
                bm_min = Math.min,
                blitter = 10,
                BMMath = {};

            function ProjectInterface() {
                return {}
            }! function() {
                var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
                    r = e.length;
                for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]]
            }(), BMMath.random = Math.random, BMMath.abs = function(t) {
                if ("object" === typeof t && t.length) {
                    var e, r = createSizedArray(t.length),
                        i = t.length;
                    for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
                    return r
                }
                return Math.abs(t)
            };
            var defaultCurveSegments = 150,
                degToRads = Math.PI / 180,
                roundCorner = .5519;

            function roundValues(t) {
                bm_rnd = t ? Math.round : function(t) {
                    return t
                }
            }

            function styleDiv(t) {
                t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
            }

            function BMEnterFrameEvent(t, e, r, i) {
                this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1
            }

            function BMCompleteEvent(t, e) {
                this.type = t, this.direction = e < 0 ? -1 : 1
            }

            function BMCompleteLoopEvent(t, e, r, i) {
                this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
            }

            function BMSegmentStartEvent(t, e, r) {
                this.type = t, this.firstFrame = e, this.totalFrames = r
            }

            function BMDestroyEvent(t, e) {
                this.type = t, this.target = e
            }

            function BMRenderFrameErrorEvent(t, e) {
                this.type = "renderFrameError", this.nativeError = t, this.currentTime = e
            }

            function BMConfigErrorEvent(t) {
                this.type = "configError", this.nativeError = t
            }

            function BMAnimationConfigErrorEvent(t, e) {
                this.type = t, this.nativeError = e, this.currentTime = currentTime
            }
            roundValues(!1);
            var createElementID = (_count = 0, function() {
                    return "__lottie_element_" + ++_count
                }),
                _count;

            function HSVtoRGB(t, e, r) {
                var i, s, a, n, o, h, l, p;
                switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
                    case 0:
                        i = r, s = p, a = h;
                        break;
                    case 1:
                        i = l, s = r, a = h;
                        break;
                    case 2:
                        i = h, s = r, a = p;
                        break;
                    case 3:
                        i = h, s = l, a = r;
                        break;
                    case 4:
                        i = p, s = h, a = r;
                        break;
                    case 5:
                        i = r, s = h, a = l
                }
                return [i, s, a]
            }

            function RGBtoHSV(t, e, r) {
                var i, s = Math.max(t, e, r),
                    a = Math.min(t, e, r),
                    n = s - a,
                    o = 0 === s ? 0 : n / s,
                    h = s / 255;
                switch (s) {
                    case a:
                        i = 0;
                        break;
                    case t:
                        i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
                        break;
                    case e:
                        i = r - t + 2 * n, i /= 6 * n;
                        break;
                    case r:
                        i = t - e + 4 * n, i /= 6 * n
                }
                return [i, o, h]
            }

            function addSaturationToRGB(t, e) {
                var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2])
            }

            function addBrightnessToRGB(t, e) {
                var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2])
            }

            function addHueToRGB(t, e) {
                var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
                return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2])
            }
            var rgbToHex = function() {
                var t, e, r = [];
                for (t = 0; t < 256; t += 1) e = t.toString(16), r[t] = 1 == e.length ? "0" + e : e;
                return function(t, e, i) {
                    return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + r[t] + r[e] + r[i]
                }
            }();

            function BaseEvent() {}
            BaseEvent.prototype = {
                triggerEvent: function(t, e) {
                    if (this._cbs[t])
                        for (var r = this._cbs[t].length, i = 0; i < r; i++) this._cbs[t][i](e)
                },
                addEventListener: function(t, e) {
                    return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
                        function() {
                            this.removeEventListener(t, e)
                        }.bind(this)
                },
                removeEventListener: function(t, e) {
                    if (e) {
                        if (this._cbs[t]) {
                            for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
                            this._cbs[t].length || (this._cbs[t] = null)
                        }
                    } else this._cbs[t] = null
                }
            };
            var createTypedArray = function() {
                return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(t, e) {
                    return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
                } : function(t, e) {
                    var r, i = 0,
                        s = [];
                    switch (t) {
                        case "int16":
                        case "uint8c":
                            r = 1;
                            break;
                        default:
                            r = 1.1
                    }
                    for (i = 0; i < e; i += 1) s.push(r);
                    return s
                }
            }();

            function createSizedArray(t) {
                return Array.apply(null, {
                    length: t
                })
            }

            function createNS(t) {
                return document.createElementNS(svgNS, t)
            }

            function createTag(t) {
                return document.createElement(t)
            }

            function DynamicPropertyContainer() {}
            DynamicPropertyContainer.prototype = {
                addDynamicProperty: function(t) {
                    -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
                },
                iterateDynamicProperties: function() {
                    this._mdf = !1;
                    var t, e = this.dynamicProperties.length;
                    for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
                },
                initDynamicPropertyContainer: function(t) {
                    this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
                }
            };
            var getBlendMode = (blendModeEnums = {
                    0: "source-over",
                    1: "multiply",
                    2: "screen",
                    3: "overlay",
                    4: "darken",
                    5: "lighten",
                    6: "color-dodge",
                    7: "color-burn",
                    8: "hard-light",
                    9: "soft-light",
                    10: "difference",
                    11: "exclusion",
                    12: "hue",
                    13: "saturation",
                    14: "color",
                    15: "luminosity"
                }, function(t) {
                    return blendModeEnums[t] || ""
                }),
                blendModeEnums, Matrix = function() {
                    var t = Math.cos,
                        e = Math.sin,
                        r = Math.tan,
                        i = Math.round;

                    function s() {
                        return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
                    }

                    function a(r) {
                        if (0 === r) return this;
                        var i = t(r),
                            s = e(r);
                        return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                    }

                    function n(r) {
                        if (0 === r) return this;
                        var i = t(r),
                            s = e(r);
                        return this._t(1, 0, 0, 0, 0, i, -s, 0, 0, s, i, 0, 0, 0, 0, 1)
                    }

                    function o(r) {
                        if (0 === r) return this;
                        var i = t(r),
                            s = e(r);
                        return this._t(i, 0, s, 0, 0, 1, 0, 0, -s, 0, i, 0, 0, 0, 0, 1)
                    }

                    function h(r) {
                        if (0 === r) return this;
                        var i = t(r),
                            s = e(r);
                        return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                    }

                    function l(t, e) {
                        return this._t(1, e, t, 1, 0, 0)
                    }

                    function p(t, e) {
                        return this.shear(r(t), r(e))
                    }

                    function f(i, s) {
                        var a = t(s),
                            n = e(s);
                        return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                    }

                    function m(t, e, r) {
                        return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
                    }

                    function c(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
                        return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = f, this.props[12] = m, this.props[13] = c, this.props[14] = d, this.props[15] = u, this
                    }

                    function d(t, e, r) {
                        return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
                    }

                    function u(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
                        var y = this.props;
                        if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f) return y[12] = y[12] * t + y[15] * m, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;
                        var g = y[0],
                            v = y[1],
                            b = y[2],
                            E = y[3],
                            x = y[4],
                            S = y[5],
                            P = y[6],
                            _ = y[7],
                            C = y[8],
                            A = y[9],
                            T = y[10],
                            k = y[11],
                            M = y[12],
                            D = y[13],
                            w = y[14],
                            F = y[15];
                        return y[0] = g * t + v * s + b * h + E * m, y[1] = g * e + v * a + b * l + E * c, y[2] = g * r + v * n + b * p + E * d, y[3] = g * i + v * o + b * f + E * u, y[4] = x * t + S * s + P * h + _ * m, y[5] = x * e + S * a + P * l + _ * c, y[6] = x * r + S * n + P * p + _ * d, y[7] = x * i + S * o + P * f + _ * u, y[8] = C * t + A * s + T * h + k * m, y[9] = C * e + A * a + T * l + k * c, y[10] = C * r + A * n + T * p + k * d, y[11] = C * i + A * o + T * f + k * u, y[12] = M * t + D * s + w * h + F * m, y[13] = M * e + D * a + w * l + F * c, y[14] = M * r + D * n + w * p + F * d, y[15] = M * i + D * o + w * f + F * u, this._identityCalculated = !1, this
                    }

                    function y() {
                        return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
                    }

                    function g(t) {
                        for (var e = 0; e < 16;) {
                            if (t.props[e] !== this.props[e]) return !1;
                            e += 1
                        }
                        return !0
                    }

                    function v(t) {
                        var e;
                        for (e = 0; e < 16; e += 1) t.props[e] = this.props[e]
                    }

                    function b(t) {
                        var e;
                        for (e = 0; e < 16; e += 1) this.props[e] = t[e]
                    }

                    function E(t, e, r) {
                        return {
                            x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
                            y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
                            z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                        }
                    }

                    function x(t, e, r) {
                        return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
                    }

                    function S(t, e, r) {
                        return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
                    }

                    function P(t, e, r) {
                        return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
                    }

                    function _() {
                        var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                            e = this.props[5] / t,
                            r = -this.props[1] / t,
                            i = -this.props[4] / t,
                            s = this.props[0] / t,
                            a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
                            n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
                            o = new Matrix;
                        return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = s, o.props[12] = a, o.props[13] = n, o
                    }

                    function C(t) {
                        return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0)
                    }

                    function A(t) {
                        var e, r = t.length,
                            i = [];
                        for (e = 0; e < r; e += 1) i[e] = C(t[e]);
                        return i
                    }

                    function T(t, e, r) {
                        var i = createTypedArray("float32", 6);
                        if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];
                        else {
                            var s = this.props[0],
                                a = this.props[1],
                                n = this.props[4],
                                o = this.props[5],
                                h = this.props[12],
                                l = this.props[13];
                            i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l
                        }
                        return i
                    }

                    function k(t, e, r) {
                        return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
                    }

                    function M(t, e) {
                        if (this.isIdentity()) return t + "," + e;
                        var r = this.props;
                        return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
                    }

                    function D() {
                        for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
                        return r
                    }

                    function w(t) {
                        return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t
                    }

                    function F() {
                        var t = this.props;
                        return "matrix(" + w(t[0]) + "," + w(t[1]) + "," + w(t[4]) + "," + w(t[5]) + "," + w(t[12]) + "," + w(t[13]) + ")"
                    }
                    return function() {
                        this.reset = s, this.rotate = a, this.rotateX = n, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = f, this.shear = l, this.scale = m, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = E, this.applyToX = x, this.applyToY = S, this.applyToZ = P, this.applyToPointArray = k, this.applyToTriplePoints = T, this.applyToPointStringified = M, this.toCSS = D, this.to2dCSS = F, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = A, this.inversePoint = C, this.getInverseMatrix = _, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
                    }
                }();
            ! function(t, e) {
                var r, i = this,
                    s = 256,
                    a = 6,
                    n = "random",
                    o = e.pow(s, a),
                    h = e.pow(2, 52),
                    l = 2 * h,
                    p = s - 1;

                function f(t) {
                    var e, r = t.length,
                        i = this,
                        a = 0,
                        n = i.i = i.j = 0,
                        o = i.S = [];
                    for (r || (t = [r++]); a < s;) o[a] = a++;
                    for (a = 0; a < s; a++) o[a] = o[n = p & n + t[a % r] + (e = o[a])], o[n] = e;
                    i.g = function(t) {
                        for (var e, r = 0, a = i.i, n = i.j, o = i.S; t--;) e = o[a = p & a + 1], r = r * s + o[p & (o[a] = o[n = p & n + e]) + (o[n] = e)];
                        return i.i = a, i.j = n, r
                    }
                }

                function m(t, e) {
                    return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
                }

                function c(t, e) {
                    for (var r, i = t + "", s = 0; s < i.length;) e[p & s] = p & (r ^= 19 * e[p & s]) + i.charCodeAt(s++);
                    return d(e)
                }

                function d(t) {
                    return String.fromCharCode.apply(0, t)
                }
                e["seed" + n] = function(p, u, y) {
                    var g = [],
                        v = c(function t(e, r) {
                            var i, s = [],
                                a = typeof e;
                            if (r && "object" == a)
                                for (i in e) try {
                                    s.push(t(e[i], r - 1))
                                } catch (n) {}
                            return s.length ? s : "string" == a ? e : e + "\0"
                        }((u = !0 === u ? {
                            entropy: !0
                        } : u || {}).entropy ? [p, d(t)] : null === p ? function() {
                            try {
                                if (r) return d(r.randomBytes(s));
                                var e = new Uint8Array(s);
                                return (i.crypto || i.msCrypto).getRandomValues(e), d(e)
                            } catch (o) {
                                var a = i.navigator,
                                    n = a && a.plugins;
                                return [+new Date, i, n, i.screen, d(t)]
                            }
                        }() : p, 3), g),
                        b = new f(g),
                        E = function() {
                            for (var t = b.g(a), e = o, r = 0; t < h;) t = (t + r) * s, e *= s, r = b.g(1);
                            for (; t >= l;) t /= 2, e /= 2, r >>>= 1;
                            return (t + r) / e
                        };
                    return E.int32 = function() {
                        return 0 | b.g(4)
                    }, E.quick = function() {
                        return b.g(4) / 4294967296
                    }, E.double = E, c(d(b.S), t), (u.pass || y || function(t, r, i, s) {
                        return s && (s.S && m(s, b), t.state = function() {
                            return m(b, {})
                        }), i ? (e[n] = t, r) : t
                    })(E, v, "global" in u ? u.global : this == e, u.state)
                }, c(e.random(), t)
            }([], BMMath);
            var BezierFactory = function() {
                var t = {
                        getBezierEasing: function(t, r, i, s, a) {
                            var n = a || ("bez_" + t + "_" + r + "_" + i + "_" + s).replace(/\./g, "p");
                            if (e[n]) return e[n];
                            var o = new c([t, r, i, s]);
                            return e[n] = o, o
                        }
                    },
                    e = {};
                var r = 4,
                    i = 1e-7,
                    s = 10,
                    a = 11,
                    n = 1 / (a - 1),
                    o = "function" == typeof Float32Array;

                function h(t, e) {
                    return 1 - 3 * e + 3 * t
                }

                function l(t, e) {
                    return 3 * e - 6 * t
                }

                function p(t) {
                    return 3 * t
                }

                function f(t, e, r) {
                    return ((h(e, r) * t + l(e, r)) * t + p(e)) * t
                }

                function m(t, e, r) {
                    return 3 * h(e, r) * t * t + 2 * l(e, r) * t + p(e)
                }

                function c(t) {
                    this._p = t, this._mSampleValues = o ? new Float32Array(a) : new Array(a), this._precomputed = !1, this.get = this.get.bind(this)
                }
                return c.prototype = {
                    get: function(t) {
                        var e = this._p[0],
                            r = this._p[1],
                            i = this._p[2],
                            s = this._p[3];
                        return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : f(this._getTForX(t), r, s)
                    },
                    _precompute: function() {
                        var t = this._p[0],
                            e = this._p[1],
                            r = this._p[2],
                            i = this._p[3];
                        this._precomputed = !0, t === e && r === i || this._calcSampleValues()
                    },
                    _calcSampleValues: function() {
                        for (var t = this._p[0], e = this._p[2], r = 0; r < a; ++r) this._mSampleValues[r] = f(r * n, t, e)
                    },
                    _getTForX: function(t) {
                        for (var e = this._p[0], o = this._p[2], h = this._mSampleValues, l = 0, p = 1, c = a - 1; p !== c && h[p] <= t; ++p) l += n;
                        var d = l + (t - h[--p]) / (h[p + 1] - h[p]) * n,
                            u = m(d, e, o);
                        return u >= .001 ? function(t, e, i, s) {
                            for (var a = 0; a < r; ++a) {
                                var n = m(e, i, s);
                                if (0 === n) return e;
                                e -= (f(e, i, s) - t) / n
                            }
                            return e
                        }(t, d, e, o) : 0 === u ? d : function(t, e, r, a, n) {
                            var o, h, l = 0;
                            do {
                                (o = f(h = e + (r - e) / 2, a, n) - t) > 0 ? r = h : e = h
                            } while (Math.abs(o) > i && ++l < s);
                            return h
                        }(t, l, l + n, e, o)
                    }
                }, t
            }();

            function extendPrototype(t, e) {
                var r, i, s = t.length;
                for (r = 0; r < s; r += 1)
                    for (var a in i = t[r].prototype) i.hasOwnProperty(a) && (e.prototype[a] = i[a])
            }

            function getDescriptor(t, e) {
                return Object.getOwnPropertyDescriptor(t, e)
            }

            function createProxyFunction(t) {
                function e() {}
                return e.prototype = t, e
            }

            function bezFunction() {
                Math;

                function t(t, e, r, i, s, a) {
                    var n = t * i + e * s + r * a - s * i - a * t - r * e;
                    return n > -.001 && n < .001
                }
                var e = function(t, e, r, i) {
                    var s, a, n, o, h, l, p = defaultCurveSegments,
                        f = 0,
                        m = [],
                        c = [],
                        d = bezier_length_pool.newElement();
                    for (n = r.length, s = 0; s < p; s += 1) {
                        for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1) o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bm_pow(h, 2) * i[a] + bm_pow(h, 3) * e[a], m[a] = o, null !== c[a] && (l += bm_pow(m[a] - c[a], 2)), c[a] = m[a];
                        l && (f += l = bm_sqrt(l)), d.percents[s] = h, d.lengths[s] = f
                    }
                    return d.addedLength = f, d
                };

                function r(t) {
                    this.segmentLength = 0, this.points = new Array(t)
                }

                function i(t, e) {
                    this.partialLength = t, this.point = e
                }
                var s, a = (s = {}, function(e, a, n, o) {
                    var h = (e[0] + "_" + e[1] + "_" + a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
                    if (!s[h]) {
                        var l, p, f, m, c, d, u, y = defaultCurveSegments,
                            g = 0,
                            v = null;
                        2 === e.length && (e[0] != a[0] || e[1] != a[1]) && t(e[0], e[1], a[0], a[1], e[0] + n[0], e[1] + n[1]) && t(e[0], e[1], a[0], a[1], a[0] + o[0], a[1] + o[1]) && (y = 2);
                        var b = new r(y);
                        for (f = n.length, l = 0; l < y; l += 1) {
                            for (u = createSizedArray(f), c = l / (y - 1), d = 0, p = 0; p < f; p += 1) m = bm_pow(1 - c, 3) * e[p] + 3 * bm_pow(1 - c, 2) * c * (e[p] + n[p]) + 3 * (1 - c) * bm_pow(c, 2) * (a[p] + o[p]) + bm_pow(c, 3) * a[p], u[p] = m, null !== v && (d += bm_pow(u[p] - v[p], 2));
                            g += d = bm_sqrt(d), b.points[l] = new i(d, u), v = u
                        }
                        b.segmentLength = g, s[h] = b
                    }
                    return s[h]
                });

                function n(t, e) {
                    var r = e.percents,
                        i = e.lengths,
                        s = r.length,
                        a = bm_floor((s - 1) * t),
                        n = t * e.addedLength,
                        o = 0;
                    if (a === s - 1 || 0 === a || n === i[a]) return r[a];
                    for (var h = i[a] > n ? -1 : 1, l = !0; l;)
                        if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || a >= s - 1) {
                            if (a === s - 1) return r[a];
                            l = !1
                        } return r[a] + (r[a + 1] - r[a]) * o
                }
                var o = createTypedArray("float32", 8);
                return {
                    getSegmentsLength: function(t) {
                        var r, i = segments_length_pool.newElement(),
                            s = t.c,
                            a = t.v,
                            n = t.o,
                            o = t.i,
                            h = t._length,
                            l = i.lengths,
                            p = 0;
                        for (r = 0; r < h - 1; r += 1) l[r] = e(a[r], a[r + 1], n[r], o[r + 1]), p += l[r].addedLength;
                        return s && h && (l[r] = e(a[r], a[0], n[r], o[0]), p += l[r].addedLength), i.totalLength = p, i
                    },
                    getNewSegment: function(t, e, r, i, s, a, h) {
                        var l, p = n(s = s < 0 ? 0 : s > 1 ? 1 : s, h),
                            f = n(a = a > 1 ? 1 : a, h),
                            m = t.length,
                            c = 1 - p,
                            d = 1 - f,
                            u = c * c * c,
                            y = p * c * c * 3,
                            g = p * p * c * 3,
                            v = p * p * p,
                            b = c * c * d,
                            E = p * c * d + c * p * d + c * c * f,
                            x = p * p * d + c * p * f + p * c * f,
                            S = p * p * f,
                            P = c * d * d,
                            _ = p * d * d + c * f * d + c * d * f,
                            C = p * f * d + c * f * f + p * d * f,
                            A = p * f * f,
                            T = d * d * d,
                            k = f * d * d + d * f * d + d * d * f,
                            M = f * f * d + d * f * f + f * d * f,
                            D = f * f * f;
                        for (l = 0; l < m; l += 1) o[4 * l] = Math.round(1e3 * (u * t[l] + y * r[l] + g * i[l] + v * e[l])) / 1e3, o[4 * l + 1] = Math.round(1e3 * (b * t[l] + E * r[l] + x * i[l] + S * e[l])) / 1e3, o[4 * l + 2] = Math.round(1e3 * (P * t[l] + _ * r[l] + C * i[l] + A * e[l])) / 1e3, o[4 * l + 3] = Math.round(1e3 * (T * t[l] + k * r[l] + M * i[l] + D * e[l])) / 1e3;
                        return o
                    },
                    getPointInSegment: function(t, e, r, i, s, a) {
                        var o = n(s, a),
                            h = 1 - o;
                        return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * r[0] + (o * o * h + h * o * o + o * h * o) * i[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * r[1] + (o * o * h + h * o * o + o * h * o) * i[1] + o * o * o * e[1])) / 1e3]
                    },
                    buildBezierData: a,
                    pointOnLine2D: t,
                    pointOnLine3D: function(e, r, i, s, a, n, o, h, l) {
                        if (0 === i && 0 === n && 0 === l) return t(e, r, s, a, o, h);
                        var p, f = Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - r, 2) + Math.pow(n - i, 2)),
                            m = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - r, 2) + Math.pow(l - i, 2)),
                            c = Math.sqrt(Math.pow(o - s, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));
                        return (p = f > m ? f > c ? f - m - c : c - m - f : c > m ? c - m - f : m - f - c) > -1e-4 && p < 1e-4
                    }
                }
            }! function() {
                for (var t = 0, e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[e[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[r] + "CancelAnimationFrame"] || window[e[r] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function(e, r) {
                    var i = (new Date).getTime(),
                        s = Math.max(0, 16 - (i - t)),
                        a = setTimeout(function() {
                            e(i + s)
                        }, s);
                    return t = i + s, a
                }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                    clearTimeout(t)
                })
            }();
            var bez = bezFunction();

            function dataFunctionManager() {
                function t(s, a, n) {
                    var o, h, l, f, m, c, d = s.length;
                    for (h = 0; h < d; h += 1)
                        if ("ks" in (o = s[h]) && !o.completed) {
                            if (o.completed = !0, o.tt && (s[h - 1].td = o.tt), [], -1, o.hasMask) {
                                var u = o.masksProperties;
                                for (f = u.length, l = 0; l < f; l += 1)
                                    if (u[l].pt.k.i) i(u[l].pt.k);
                                    else
                                        for (c = u[l].pt.k.length, m = 0; m < c; m += 1) u[l].pt.k[m].s && i(u[l].pt.k[m].s[0]), u[l].pt.k[m].e && i(u[l].pt.k[m].e[0])
                            }
                            0 === o.ty ? (o.layers = e(o.refId, a), t(o.layers, a, n)) : 4 === o.ty ? r(o.shapes) : 5 == o.ty && p(o, n)
                        }
                }

                function e(t, e) {
                    for (var r = 0, i = e.length; r < i;) {
                        if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
                        r += 1
                    }
                }

                function r(t) {
                    var e, s, a;
                    for (e = t.length - 1; e >= 0; e -= 1)
                        if ("sh" == t[e].ty) {
                            if (t[e].ks.k.i) i(t[e].ks.k);
                            else
                                for (a = t[e].ks.k.length, s = 0; s < a; s += 1) t[e].ks.k[s].s && i(t[e].ks.k[s].s[0]), t[e].ks.k[s].e && i(t[e].ks.k[s].e[0]);
                            !0
                        } else "gr" == t[e].ty && r(t[e].it)
                }

                function i(t) {
                    var e, r = t.i.length;
                    for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
                }

                function s(t, e) {
                    var r = e ? e.split(".") : [100, 100, 100];
                    return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && void 0))
                }
                var a, n = function() {
                        var t = [4, 4, 14];

                        function e(t) {
                            var e, r, i, s = t.length;
                            for (e = 0; e < s; e += 1) 5 === t[e].ty && (r = t[e], i = void 0, i = r.t.d, r.t.d = {
                                k: [{
                                    s: i,
                                    t: 0
                                }]
                            })
                        }
                        return function(r) {
                            if (s(t, r.v) && (e(r.layers), r.assets)) {
                                var i, a = r.assets.length;
                                for (i = 0; i < a; i += 1) r.assets[i].layers && e(r.assets[i].layers)
                            }
                        }
                    }(),
                    o = (a = [4, 7, 99], function(t) {
                        if (t.chars && !s(a, t.v)) {
                            var e, r, n, o, h, l = t.chars.length;
                            for (e = 0; e < l; e += 1)
                                if (t.chars[e].data && t.chars[e].data.shapes)
                                    for (n = (h = t.chars[e].data.shapes[0].it).length, r = 0; r < n; r += 1)(o = h[r].ks.k).__converted || (i(h[r].ks.k), o.__converted = !0)
                        }
                    }),
                    h = function() {
                        var t = [4, 1, 9];

                        function e(t) {
                            var r, i, s, a = t.length;
                            for (r = 0; r < a; r += 1)
                                if ("gr" === t[r].ty) e(t[r].it);
                                else if ("fl" === t[r].ty || "st" === t[r].ty)
                                if (t[r].c.k && t[r].c.k[0].i)
                                    for (s = t[r].c.k.length, i = 0; i < s; i += 1) t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255, t[r].c.k[i].s[1] /= 255, t[r].c.k[i].s[2] /= 255, t[r].c.k[i].s[3] /= 255), t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255, t[r].c.k[i].e[1] /= 255, t[r].c.k[i].e[2] /= 255, t[r].c.k[i].e[3] /= 255);
                                else t[r].c.k[0] /= 255, t[r].c.k[1] /= 255, t[r].c.k[2] /= 255, t[r].c.k[3] /= 255
                        }

                        function r(t) {
                            var r, i = t.length;
                            for (r = 0; r < i; r += 1) 4 === t[r].ty && e(t[r].shapes)
                        }
                        return function(e) {
                            if (s(t, e.v) && (r(e.layers), e.assets)) {
                                var i, a = e.assets.length;
                                for (i = 0; i < a; i += 1) e.assets[i].layers && r(e.assets[i].layers)
                            }
                        }
                    }(),
                    l = function() {
                        var t = [4, 4, 18];

                        function e(t) {
                            var r, i, s;
                            for (r = t.length - 1; r >= 0; r -= 1)
                                if ("sh" == t[r].ty) {
                                    if (t[r].ks.k.i) t[r].ks.k.c = t[r].closed;
                                    else
                                        for (s = t[r].ks.k.length, i = 0; i < s; i += 1) t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed), t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
                                    !0
                                } else "gr" == t[r].ty && e(t[r].it)
                        }

                        function r(t) {
                            var r, i, s, a, n, o, h = t.length;
                            for (i = 0; i < h; i += 1) {
                                if ((r = t[i]).hasMask) {
                                    var l = r.masksProperties;
                                    for (a = l.length, s = 0; s < a; s += 1)
                                        if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl;
                                        else
                                            for (o = l[s].pt.k.length, n = 0; n < o; n += 1) l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl)
                                }
                                4 === r.ty && e(r.shapes)
                            }
                        }
                        return function(e) {
                            if (s(t, e.v) && (r(e.layers), e.assets)) {
                                var i, a = e.assets.length;
                                for (i = 0; i < a; i += 1) e.assets[i].layers && r(e.assets[i].layers)
                            }
                        }
                    }();

                function p(t, e) {
                    0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0)
                }
                var f = {
                    completeData: function(e, r) {
                        e.__complete || (h(e), n(e), o(e), l(e), t(e.layers, e.assets, r), e.__complete = !0)
                    }
                };
                return f.checkColors = h, f.checkChars = o, f.checkShapes = l, f.completeLayers = t, f
            }
            var dataManager = dataFunctionManager(),
                FontManager = function() {
                    var t = 5e3,
                        e = {
                            w: 0,
                            size: 0,
                            shapes: []
                        },
                        r = [];

                    function i(t, e) {
                        var r = createTag("span");
                        r.style.fontFamily = e;
                        var i = createTag("span");
                        i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
                        var s = i.offsetWidth;
                        return i.style.fontFamily = t + ", " + e, {
                            node: i,
                            w: s,
                            parent: r
                        }
                    }

                    function s(t, e) {
                        var r = createNS("text");
                        return r.style.fontSize = "100px", r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", e.fStyle), r.setAttribute("font-weight", e.fWeight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r
                    }
                    r = r.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
                    var a = function() {
                        this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now()
                    };
                    return a.getCombinedCharacterCodes = function() {
                        return r
                    }, a.prototype.addChars = function(t) {
                        if (t) {
                            this.chars || (this.chars = []);
                            var e, r, i, s = t.length,
                                a = this.chars.length;
                            for (e = 0; e < s; e += 1) {
                                for (r = 0, i = !1; r < a;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
                                i || (this.chars.push(t[e]), a += 1)
                            }
                        }
                    }, a.prototype.addFonts = function(t, e) {
                        if (t) {
                            if (this.chars) return this.isLoaded = !0, void(this.fonts = t.list);
                            var r, a = t.list,
                                n = a.length,
                                o = n;
                            for (r = 0; r < n; r += 1) {
                                var h, l, p = !0;
                                if (a[r].loaded = !1, a[r].monoCase = i(a[r].fFamily, "monospace"), a[r].sansCase = i(a[r].fFamily, "sans-serif"), a[r].fPath) {
                                    if ("p" === a[r].fOrigin || 3 === a[r].origin) {
                                        if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + a[r].fFamily + '"], style[f-origin="3"][f-family="' + a[r].fFamily + '"]')).length > 0 && (p = !1), p) {
                                            var f = createTag("style");
                                            f.setAttribute("f-forigin", a[r].fOrigin), f.setAttribute("f-origin", a[r].origin), f.setAttribute("f-family", a[r].fFamily), f.type = "text/css", f.innerHTML = "@font-face {font-family: " + a[r].fFamily + "; font-style: normal; src: url('" + a[r].fPath + "');}", e.appendChild(f)
                                        }
                                    } else if ("g" === a[r].fOrigin || 1 === a[r].origin) {
                                        for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++) - 1 !== h[l].href.indexOf(a[r].fPath) && (p = !1);
                                        if (p) {
                                            var m = createTag("link");
                                            m.setAttribute("f-forigin", a[r].fOrigin), m.setAttribute("f-origin", a[r].origin), m.type = "text/css", m.rel = "stylesheet", m.href = a[r].fPath, document.body.appendChild(m)
                                        }
                                    } else if ("t" === a[r].fOrigin || 2 === a[r].origin) {
                                        for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++) a[r].fPath === h[l].src && (p = !1);
                                        if (p) {
                                            var c = createTag("link");
                                            c.setAttribute("f-forigin", a[r].fOrigin), c.setAttribute("f-origin", a[r].origin), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", a[r].fPath), e.appendChild(c)
                                        }
                                    }
                                } else a[r].loaded = !0, o -= 1;
                                a[r].helper = s(e, a[r]), a[r].cache = {}, this.fonts.push(a[r])
                            }
                            0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                        } else this.isLoaded = !0
                    }, a.prototype.getCharData = function(t, r, i) {
                        for (var s = 0, a = this.chars.length; s < a;) {
                            if (this.chars[s].ch === t && this.chars[s].style === r && this.chars[s].fFamily === i) return this.chars[s];
                            s += 1
                        }
                        return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, r, i), e
                    }, a.prototype.getFontByName = function(t) {
                        for (var e = 0, r = this.fonts.length; e < r;) {
                            if (this.fonts[e].fName === t) return this.fonts[e];
                            e += 1
                        }
                        return this.fonts[0]
                    }, a.prototype.measureText = function(t, e, r) {
                        var i = this.getFontByName(e),
                            s = t.charCodeAt(0);
                        if (!i.cache[s + 1]) {
                            var a = i.helper;
                            if (" " === t) {
                                a.textContent = "|" + t + "|";
                                var n = a.getComputedTextLength();
                                a.textContent = "||";
                                var o = a.getComputedTextLength();
                                i.cache[s + 1] = (n - o) / 100
                            } else a.textContent = t, i.cache[s + 1] = a.getComputedTextLength() / 100
                        }
                        return i.cache[s + 1] * r
                    }, a.prototype.checkLoadedFonts = function() {
                        var e, r, i, s = this.fonts.length,
                            a = s;
                        for (e = 0; e < s; e += 1) this.fonts[e].loaded ? a -= 1 : "n" === this.fonts[e].fOrigin || 0 === this.fonts[e].origin ? this.fonts[e].loaded = !0 : (r = this.fonts[e].monoCase.node, i = this.fonts[e].monoCase.w, r.offsetWidth !== i ? (a -= 1, this.fonts[e].loaded = !0) : (r = this.fonts[e].sansCase.node, i = this.fonts[e].sansCase.w, r.offsetWidth !== i && (a -= 1, this.fonts[e].loaded = !0)), this.fonts[e].loaded && (this.fonts[e].sansCase.parent.parentNode.removeChild(this.fonts[e].sansCase.parent), this.fonts[e].monoCase.parent.parentNode.removeChild(this.fonts[e].monoCase.parent)));
                        0 !== a && Date.now() - this.initTime < t ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function() {
                            this.isLoaded = !0
                        }.bind(this), 0)
                    }, a.prototype.loaded = function() {
                        return this.isLoaded
                    }, a
                }(),
                PropertyFactory = function() {
                    var t = initialDefaultFrame,
                        e = Math.abs;

                    function r(t, e) {
                        var r, s = this.offsetTime;
                        "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
                        for (var a, n, o, h, l, p, f, m, c = e.lastIndex, d = c, u = this.keyframes.length - 1, y = !0; y;) {
                            if (a = this.keyframes[d], n = this.keyframes[d + 1], d === u - 1 && t >= n.t - s) {
                                a.h && (a = n), c = 0;
                                break
                            }
                            if (n.t - s > t) {
                                c = d;
                                break
                            }
                            d < u - 1 ? d += 1 : (c = 0, y = !1)
                        }
                        var g, v, b, E, x, S, P, _, C, A, T = n.t - s,
                            k = a.t - s;
                        if (a.to) {
                            a.bezierData || (a.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
                            var M = a.bezierData;
                            if (t >= T || t < k) {
                                var D = t >= T ? M.points.length - 1 : 0;
                                for (h = M.points[D].point.length, o = 0; o < h; o += 1) r[o] = M.points[D].point[o]
                            } else {
                                a.__fnct ? m = a.__fnct : (m = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, a.__fnct = m), l = m((t - k) / (T - k));
                                var w, F = M.segmentLength * l,
                                    I = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastAddedLength : 0;
                                for (f = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastPoint : 0, y = !0, p = M.points.length; y;) {
                                    if (I += M.points[f].partialLength, 0 === F || 0 === l || f === M.points.length - 1) {
                                        for (h = M.points[f].point.length, o = 0; o < h; o += 1) r[o] = M.points[f].point[o];
                                        break
                                    }
                                    if (F >= I && F < I + M.points[f + 1].partialLength) {
                                        for (w = (F - I) / M.points[f + 1].partialLength, h = M.points[f].point.length, o = 0; o < h; o += 1) r[o] = M.points[f].point[o] + (M.points[f + 1].point[o] - M.points[f].point[o]) * w;
                                        break
                                    }
                                    f < p - 1 ? f += 1 : y = !1
                                }
                                e._lastPoint = f, e._lastAddedLength = I - M.points[f].partialLength, e._lastKeyframeIndex = d
                            }
                        } else {
                            var V, R, B, L, G;
                            if (u = a.s.length, g = n.s || a.e, this.sh && 1 !== a.h)
                                if (t >= T) r[0] = g[0], r[1] = g[1], r[2] = g[2];
                                else if (t <= k) r[0] = a.s[0], r[1] = a.s[1], r[2] = a.s[2];
                            else {
                                var z = i(a.s),
                                    N = i(g);
                                v = r, b = function(t, e, r) {
                                    var i, s, a, n, o, h = [],
                                        l = t[0],
                                        p = t[1],
                                        f = t[2],
                                        m = t[3],
                                        c = e[0],
                                        d = e[1],
                                        u = e[2],
                                        y = e[3];
                                    (s = l * c + p * d + f * u + m * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y);
                                    1 - s > 1e-6 ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, o = Math.sin(r * i) / a) : (n = 1 - r, o = r);
                                    return h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * f + o * u, h[3] = n * m + o * y, h
                                }(z, N, (t - k) / (T - k)), E = b[0], x = b[1], S = b[2], P = b[3], _ = Math.atan2(2 * x * P - 2 * E * S, 1 - 2 * x * x - 2 * S * S), C = Math.asin(2 * E * x + 2 * S * P), A = Math.atan2(2 * E * P - 2 * x * S, 1 - 2 * E * E - 2 * S * S), v[0] = _ / degToRads, v[1] = C / degToRads, v[2] = A / degToRads
                            } else
                                for (d = 0; d < u; d += 1) 1 !== a.h && (t >= T ? l = 1 : t < k ? l = 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []), a.__fnct[d] ? m = a.__fnct[d] : (V = void 0 === a.o.x[d] ? a.o.x[0] : a.o.x[d], R = void 0 === a.o.y[d] ? a.o.y[0] : a.o.y[d], B = void 0 === a.i.x[d] ? a.i.x[0] : a.i.x[d], L = void 0 === a.i.y[d] ? a.i.y[0] : a.i.y[d], m = BezierFactory.getBezierEasing(V, R, B, L).get, a.__fnct[d] = m)) : a.__fnct ? m = a.__fnct : (V = a.o.x, R = a.o.y, B = a.i.x, L = a.i.y, m = BezierFactory.getBezierEasing(V, R, B, L).get, a.__fnct = m), l = m((t - k) / (T - k)))), g = n.s || a.e, G = 1 === a.h ? a.s[d] : a.s[d] + (g[d] - a.s[d]) * l, "multidimensional" === this.propType ? r[d] = G : r = G
                        }
                        return e.lastIndex = c, r
                    }

                    function i(t) {
                        var e = t[0] * degToRads,
                            r = t[1] * degToRads,
                            i = t[2] * degToRads,
                            s = Math.cos(e / 2),
                            a = Math.cos(r / 2),
                            n = Math.cos(i / 2),
                            o = Math.sin(e / 2),
                            h = Math.sin(r / 2),
                            l = Math.sin(i / 2);
                        return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l]
                    }

                    function s() {
                        var e = this.comp.renderedFrame - this.offsetTime,
                            r = this.keyframes[0].t - this.offsetTime,
                            i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                        if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && e >= i || this._caching.lastFrame < r && e < r))) {
                            this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
                            var s = this.interpolateValue(e, this._caching);
                            this.pv = s
                        }
                        return this._caching.lastFrame = e, this.pv
                    }

                    function a(t) {
                        var r;
                        if ("unidimensional" === this.propType) r = t * this.mult, e(this.v - r) > 1e-5 && (this.v = r, this._mdf = !0);
                        else
                            for (var i = 0, s = this.v.length; i < s;) r = t[i] * this.mult, e(this.v[i] - r) > 1e-5 && (this.v[i] = r, this._mdf = !0), i += 1
                    }

                    function n() {
                        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                            if (this.lock) this.setVValue(this.pv);
                            else {
                                this.lock = !0, this._mdf = this._isFirstFrame;
                                var t, e = this.effectsSequence.length,
                                    r = this.kf ? this.pv : this.data.k;
                                for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
                                this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
                            }
                    }

                    function o(t) {
                        this.effectsSequence.push(t), this.container.addDynamicProperty(this)
                    }

                    function h(t, e, r, i) {
                        this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.addEffect = o
                    }

                    function l(t, e, r, i) {
                        this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
                        var s, h = e.k.length;
                        this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h);
                        createTypedArray("float32", h);
                        for (this.vel = createTypedArray("float32", h), s = 0; s < h; s += 1) this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
                        this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = n, this.setVValue = a, this.addEffect = o
                    }

                    function p(e, i, h, l) {
                        this.propType = "unidimensional", this.keyframes = i.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
                            lastFrame: t,
                            lastIndex: 0,
                            value: 0,
                            _lastKeyframeIndex: -1
                        }, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.effectsSequence = [s.bind(this)], this.addEffect = o
                    }

                    function f(e, i, h, l) {
                        this.propType = "multidimensional";
                        var p, f, m, c, d, u = i.k.length;
                        for (p = 0; p < u - 1; p += 1) i.k[p].to && i.k[p].s && i.k[p + 1] && i.k[p + 1].s && (f = i.k[p].s, m = i.k[p + 1].s, c = i.k[p].to, d = i.k[p].ti, (2 === f.length && (f[0] !== m[0] || f[1] !== m[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], f[0] + c[0], f[1] + c[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], m[0] + d[0], m[1] + d[1]) || 3 === f.length && (f[0] !== m[0] || f[1] !== m[1] || f[2] !== m[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], f[0] + c[0], f[1] + c[1], f[2] + c[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], m[0] + d[0], m[1] + d[1], m[2] + d[2])) && (i.k[p].to = null, i.k[p].ti = null), f[0] === m[0] && f[1] === m[1] && 0 === c[0] && 0 === c[1] && 0 === d[0] && 0 === d[1] && (2 === f.length || f[2] === m[2] && 0 === c[2] && 0 === d[2]) && (i.k[p].to = null, i.k[p].ti = null));
                        this.effectsSequence = [s.bind(this)], this.keyframes = i.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.frameId = -1;
                        var y = i.k[0].s.length;
                        for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) this.v[p] = t, this.pv[p] = t;
                        this._caching = {
                            lastFrame: t,
                            lastIndex: 0,
                            value: createTypedArray("float32", y)
                        }, this.addEffect = o
                    }
                    return {
                        getProp: function(t, e, r, i, s) {
                            var a;
                            if (e.k.length)
                                if ("number" == typeof e.k[0]) a = new l(t, e, i, s);
                                else switch (r) {
                                    case 0:
                                        a = new p(t, e, i, s);
                                        break;
                                    case 1:
                                        a = new f(t, e, i, s)
                                } else a = new h(t, e, i, s);
                            return a.effectsSequence.length && s.addDynamicProperty(a), a
                        }
                    }
                }(),
                TransformPropertyFactory = function() {
                    var t = [0, 0];

                    function e(t, e, r) {
                        if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
                                k: [0, 0, 0]
                            }, 1, 0, this), e.rx) {
                            if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
                                var i, s = e.or.k.length;
                                for (i = 0; i < s; i += 1) e.or.k[i].to = e.or.k[i].ti = null
                            }
                            this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
                        } else this.r = PropertyFactory.getProp(t, e.r || {
                            k: 0
                        }, 0, degToRads, this);
                        e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
                            k: [0, 0, 0]
                        }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
                            k: [100, 100, 100]
                        }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                            _mdf: !1,
                            v: 1
                        }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
                    }
                    return e.prototype = {
                        applyToMatrix: function(t) {
                            var e = this._mdf;
                            this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                        },
                        getValue: function(e) {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || e) {
                                    if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                                        var r, i, s = this.elem.globalData.frameRate;
                                        if (this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / s, 0), i = this.p.getValueAtTime(this.p.keyframes[0].t / s, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / s, 0), i = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / s, 0)) : (r = this.p.pv, i = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / s, this.p.offsetTime));
                                        else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                                            r = [], i = [];
                                            var a = this.px,
                                                n = this.py;
                                            a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t ? (r[0] = a.getValueAtTime((a.keyframes[0].t + .01) / s, 0), r[1] = n.getValueAtTime((n.keyframes[0].t + .01) / s, 0), i[0] = a.getValueAtTime(a.keyframes[0].t / s, 0), i[1] = n.getValueAtTime(n.keyframes[0].t / s, 0)) : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t ? (r[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / s, 0), r[1] = n.getValueAtTime(n.keyframes[n.keyframes.length - 1].t / s, 0), i[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / s, 0), i[1] = n.getValueAtTime((n.keyframes[n.keyframes.length - 1].t - .01) / s, 0)) : (r = [a.pv, n.pv], i[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / s, a.offsetTime), i[1] = n.getValueAtTime((n._caching.lastFrame + n.offsetTime - .01) / s, n.offsetTime))
                                        } else r = i = t;
                                        this.v.rotate(-Math.atan2(r[1] - i[1], r[0] - i[0]))
                                    }
                                    this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                                }
                                this.frameId = this.elem.globalData.frameId
                            }
                        },
                        precalculateMatrix: function() {
                            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
                                if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                                    if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                                    this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
                                }
                                if (this.r) {
                                    if (this.r.effectsSequence.length) return;
                                    this.pre.rotate(-this.r.v), this.appliedTransformations = 4
                                } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
                            }
                        },
                        autoOrient: function() {}
                    }, extendPrototype([DynamicPropertyContainer], e), e.prototype.addDynamicProperty = function(t) {
                        this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
                    }, e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
                        getTransformProperty: function(t, r, i) {
                            return new e(t, r, i)
                        }
                    }
                }();

            function ShapePath() {
                this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
            }
            ShapePath.prototype.setPathData = function(t, e) {
                this.c = t, this.setLength(e);
                for (var r = 0; r < e;) this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1
            }, ShapePath.prototype.setLength = function(t) {
                for (; this._maxLength < t;) this.doubleArrayLength();
                this._length = t
            }, ShapePath.prototype.doubleArrayLength = function() {
                this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
            }, ShapePath.prototype.setXYAt = function(t, e, r, i, s) {
                var a;
                switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
                    case "v":
                        a = this.v;
                        break;
                    case "i":
                        a = this.i;
                        break;
                    case "o":
                        a = this.o
                }(!a[i] || a[i] && !s) && (a[i] = point_pool.newElement()), a[i][0] = t, a[i][1] = e
            }, ShapePath.prototype.setTripleAt = function(t, e, r, i, s, a, n, o) {
                this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o)
            }, ShapePath.prototype.reverse = function() {
                var t = new ShapePath;
                t.setPathData(this.c, this._length);
                var e = this.v,
                    r = this.o,
                    i = this.i,
                    s = 0;
                this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
                var a, n = this._length - 1,
                    o = this._length;
                for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;
                return t
            };
            var ShapePropertyFactory = function() {
                    var t = -999999;

                    function e(t, e, r) {
                        var i, s, a, n, o, h, l, p, f, m = r.lastIndex,
                            c = this.keyframes;
                        if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, m = 0;
                        else if (t >= c[c.length - 1].t - this.offsetTime) i = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;
                        else {
                            for (var d, u, y = m, g = c.length - 1, v = !0; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t));) y < g - 1 ? y += 1 : v = !1;
                            if (m = y, !(a = 1 === d.h)) {
                                if (t >= u.t - this.offsetTime) p = 1;
                                else if (t < d.t - this.offsetTime) p = 0;
                                else {
                                    var b;
                                    d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)))
                                }
                                s = u.s ? u.s[0] : d.e[0]
                            }
                            i = d.s[0]
                        }
                        for (h = e._length, l = i.i[0].length, r.lastIndex = m, n = 0; n < h; n += 1)
                            for (o = 0; o < l; o += 1) f = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = f, f = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = f, f = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = f
                    }

                    function r() {
                        var e = this.comp.renderedFrame - this.offsetTime,
                            r = this.keyframes[0].t - this.offsetTime,
                            i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                            s = this._caching.lastFrame;
                        return s !== t && (s < r && e < r || s > i && e > i) || (this._caching.lastIndex = s < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv
                    }

                    function i() {
                        this.paths = this.localShapeCollection
                    }

                    function s(t) {
                        (function(t, e) {
                            if (t._length !== e._length || t.c !== e.c) return !1;
                            var r, i = t._length;
                            for (r = 0; r < i; r += 1)
                                if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
                            return !0
                        })(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
                    }

                    function a() {
                        if (this.elem.globalData.frameId !== this.frameId)
                            if (this.effectsSequence.length)
                                if (this.lock) this.setVValue(this.pv);
                                else {
                                    this.lock = !0, this._mdf = !1;
                                    var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                                        r = this.effectsSequence.length;
                                    for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e);
                                    this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId
                                }
                        else this._mdf = !1
                    }

                    function n(t, e, r) {
                        this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
                        var s = 3 === r ? e.pt.k : e.ks.k;
                        this.v = shape_pool.clone(s), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = []
                    }

                    function o(t) {
                        this.effectsSequence.push(t), this.container.addDynamicProperty(this)
                    }

                    function h(e, s, a) {
                        this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = 3 === a ? s.pt.k : s.ks.k, this.k = !0, this.kf = !0;
                        var n = this.keyframes[0].s[0].i.length;
                        this.keyframes[0].s[0].i[0].length;
                        this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, n), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = i, this._caching = {
                            lastFrame: t,
                            lastIndex: 0
                        }, this.effectsSequence = [r.bind(this)]
                    }
                    n.prototype.interpolateShape = e, n.prototype.getValue = a, n.prototype.setVValue = s, n.prototype.addEffect = o, h.prototype.getValue = a, h.prototype.interpolateShape = e, h.prototype.setVValue = s, h.prototype.addEffect = o;
                    var l = function() {
                            var t = roundCorner;

                            function e(t, e) {
                                this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
                            }
                            return e.prototype = {
                                reset: i,
                                getValue: function() {
                                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
                                },
                                convertEllToPath: function() {
                                    var e = this.p.v[0],
                                        r = this.p.v[1],
                                        i = this.s.v[0] / 2,
                                        s = this.s.v[1] / 2,
                                        a = 3 !== this.d,
                                        n = this.v;
                                    n.v[0][0] = e, n.v[0][1] = r - s, n.v[1][0] = a ? e + i : e - i, n.v[1][1] = r, n.v[2][0] = e, n.v[2][1] = r + s, n.v[3][0] = a ? e - i : e + i, n.v[3][1] = r, n.i[0][0] = a ? e - i * t : e + i * t, n.i[0][1] = r - s, n.i[1][0] = a ? e + i : e - i, n.i[1][1] = r - s * t, n.i[2][0] = a ? e + i * t : e - i * t, n.i[2][1] = r + s, n.i[3][0] = a ? e - i : e + i, n.i[3][1] = r + s * t, n.o[0][0] = a ? e + i * t : e - i * t, n.o[0][1] = r - s, n.o[1][0] = a ? e + i : e - i, n.o[1][1] = r + s * t, n.o[2][0] = a ? e - i * t : e + i * t, n.o[2][1] = r + s, n.o[3][0] = a ? e - i : e + i, n.o[3][1] = r - s * t
                                }
                            }, extendPrototype([DynamicPropertyContainer], e), e
                        }(),
                        p = function() {
                            function t(t, e) {
                                this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
                            }
                            return t.prototype = {
                                reset: i,
                                getValue: function() {
                                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
                                },
                                convertStarToPath: function() {
                                    var t, e, r, i, s = 2 * Math.floor(this.pt.v),
                                        a = 2 * Math.PI / s,
                                        n = !0,
                                        o = this.or.v,
                                        h = this.ir.v,
                                        l = this.os.v,
                                        p = this.is.v,
                                        f = 2 * Math.PI * o / (2 * s),
                                        m = 2 * Math.PI * h / (2 * s),
                                        c = -Math.PI / 2;
                                    c += this.r.v;
                                    var d = 3 === this.data.d ? -1 : 1;
                                    for (this.v._length = 0, t = 0; t < s; t += 1) {
                                        r = n ? l : p, i = n ? f : m;
                                        var u = (e = n ? o : h) * Math.cos(c),
                                            y = e * Math.sin(c),
                                            g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                                            v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                                        u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d
                                    }
                                },
                                convertPolygonToPath: function() {
                                    var t, e = Math.floor(this.pt.v),
                                        r = 2 * Math.PI / e,
                                        i = this.or.v,
                                        s = this.os.v,
                                        a = 2 * Math.PI * i / (4 * e),
                                        n = -Math.PI / 2,
                                        o = 3 === this.data.d ? -1 : 1;
                                    for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                                        var h = i * Math.cos(n),
                                            l = i * Math.sin(n),
                                            p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                                            f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                                        h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - f * a * s * o, h + p * a * s * o, l + f * a * s * o, t, !0), n += r * o
                                    }
                                    this.paths.length = 0, this.paths[0] = this.v
                                }
                            }, extendPrototype([DynamicPropertyContainer], t), t
                        }(),
                        f = function() {
                            function t(t, e) {
                                this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
                            }
                            return t.prototype = {
                                convertRectToPath: function() {
                                    var t = this.p.v[0],
                                        e = this.p.v[1],
                                        r = this.s.v[0] / 2,
                                        i = this.s.v[1] / 2,
                                        s = bm_min(r, i, this.r.v),
                                        a = s * (1 - roundCorner);
                                    this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)))
                                },
                                getValue: function(t) {
                                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
                                },
                                reset: i
                            }, extendPrototype([DynamicPropertyContainer], t), t
                        }();
                    var m = {
                        getShapeProp: function(t, e, r) {
                            var i;
                            return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new h(t, e, r) : new n(t, e, r) : 5 === r ? i = new f(t, e) : 6 === r ? i = new l(t, e) : 7 === r && (i = new p(t, e)), i.k && t.addDynamicProperty(i), i
                        },
                        getConstructorFunction: function() {
                            return n
                        },
                        getKeyframedConstructorFunction: function() {
                            return h
                        }
                    };
                    return m
                }(),
                ShapeModifiers = function() {
                    var t = {},
                        e = {};
                    return t.registerModifier = function(t, r) {
                        e[t] || (e[t] = r)
                    }, t.getModifier = function(t, r, i) {
                        return new e[t](r, i)
                    }, t
                }();

            function ShapeModifier() {}

            function TrimModifier() {}

            function RoundCornersModifier() {}

            function RepeaterModifier() {}

            function ShapeCollection() {
                this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
            }

            function DashProperty(t, e, r, i) {
                this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
                var s, a, n = e.length || 0;
                for (s = 0; s < n; s += 1) a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
                    n: e[s].n,
                    p: a
                };
                this.k || this.getValue(!0), this._isAnimated = this.k
            }

            function GradientProperty(t, e, r) {
                this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
                var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
                this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
            }
            ShapeModifier.prototype.initModifierProperties = function() {}, ShapeModifier.prototype.addShapeToModifier = function() {}, ShapeModifier.prototype.addShape = function(t) {
                if (!this.closed) {
                    t.sh.container.addDynamicProperty(t.sh);
                    var e = {
                        shape: t.sh,
                        data: t,
                        localShapeCollection: shapeCollection_pool.newShapeCollection()
                    };
                    this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
                }
            }, ShapeModifier.prototype.init = function(t, e) {
                this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }, ShapeModifier.prototype.processKeys = function() {
                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
            }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function(t, e) {
                this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
            }, TrimModifier.prototype.addShapeToModifier = function(t) {
                t.pathsData = []
            }, TrimModifier.prototype.calculateShapeEdges = function(t, e, r, i, s) {
                var a = [];
                e <= 1 ? a.push({
                    s: t,
                    e: e
                }) : t >= 1 ? a.push({
                    s: t - 1,
                    e: e - 1
                }) : (a.push({
                    s: t,
                    e: 1
                }), a.push({
                    s: 0,
                    e: e - 1
                }));
                var n, o, h = [],
                    l = a.length;
                for (n = 0; n < l; n += 1) {
                    var p, f;
                    if ((o = a[n]).e * s < i || o.s * s > i + r);
                    else p = o.s * s <= i ? 0 : (o.s * s - i) / r, f = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, f])
                }
                return h.length || h.push([0, 0]), h
            }, TrimModifier.prototype.releasePathsData = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1) segments_length_pool.release(t[e]);
                return t.length = 0, t
            }, TrimModifier.prototype.processShapes = function(t) {
                var e, r, i;
                if (this._mdf || t) {
                    var s = this.o.v % 360 / 360;
                    if (s < 0 && (s += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + s) > (r = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + s)) {
                        var a = e;
                        e = r, r = a
                    }
                    e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r
                } else e = this.sValue, r = this.eValue;
                var n, o, h, l, p, f, m = this.shapes.length,
                    c = 0;
                if (r === e)
                    for (n = 0; n < m; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
                else if (1 === r && 0 === e || 0 === r && 1 === e) {
                    if (this._mdf)
                        for (n = 0; n < m; n += 1) this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0
                } else {
                    var d, u, y = [];
                    for (n = 0; n < m; n += 1)
                        if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
                            if (h = (i = d.shape.paths)._length, f = 0, !d.shape._mdf && d.pathsData.length) f = d.totalShapeLength;
                            else {
                                for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), f += p.totalLength;
                                d.totalShapeLength = f, d.pathsData = l
                            }
                            c += f, d.shape._mdf = !0
                        } else d.shape.paths = d.localShapeCollection;
                    var g, v = e,
                        b = r,
                        E = 0;
                    for (n = m - 1; n >= 0; n -= 1)
                        if ((d = this.shapes[n]).shape._mdf) {
                            for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && m > 1 ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, E, c), E += d.totalShapeLength) : g = [
                                    [v, b]
                                ], h = g.length, o = 0; o < h; o += 1) {
                                v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
                                    s: d.totalShapeLength * v,
                                    e: d.totalShapeLength * b
                                }) : v >= 1 ? y.push({
                                    s: d.totalShapeLength * (v - 1),
                                    e: d.totalShapeLength * (b - 1)
                                }) : (y.push({
                                    s: d.totalShapeLength * v,
                                    e: d.totalShapeLength
                                }), y.push({
                                    s: 0,
                                    e: d.totalShapeLength * (b - 1)
                                }));
                                var x = this.addShapes(d, y[0]);
                                if (y[0].s !== y[0].e) {
                                    if (y.length > 1)
                                        if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                                            var S = x.pop();
                                            this.addPaths(x, u), x = this.addShapes(d, y[1], S)
                                        } else this.addPaths(x, u), x = this.addShapes(d, y[1]);
                                    this.addPaths(x, u)
                                }
                            }
                            d.shape.paths = u
                        }
                }
            }, TrimModifier.prototype.addPaths = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1) e.addShape(t[r])
            }, TrimModifier.prototype.addSegment = function(t, e, r, i, s, a, n) {
                s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1)
            }, TrimModifier.prototype.addSegmentFromArray = function(t, e, r, i) {
                e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1)
            }, TrimModifier.prototype.addShapes = function(t, e, r) {
                var i, s, a, n, o, h, l, p, f = t.pathsData,
                    m = t.shape.paths.shapes,
                    c = t.shape.paths._length,
                    d = 0,
                    u = [],
                    y = !0;
                for (r ? (o = r._length, p = r._length) : (r = shape_pool.newElement(), o = 0, p = 0), u.push(r), i = 0; i < c; i += 1) {
                    for (h = f[i].lengths, r.c = m[i].c, a = m[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1)
                        if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;
                        else {
                            if (d > e.e) {
                                r.c = !1;
                                break
                            }
                            e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[s], m[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[s], m[i].o[s - 1], m[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1
                        } if (m[i].c && h.length) {
                        if (n = h[s - 1], d <= e.e) {
                            var g = h[s - 1].addedLength;
                            e.s <= d && e.e >= d + g ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[0], m[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[0], m[i].o[s - 1], m[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1)
                        } else r.c = !1;
                        d += n.addedLength, o += 1
                    }
                    if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
                    i < c - 1 && (r = shape_pool.newElement(), y = !0, u.push(r), o = 0)
                }
                return u
            }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
            }, RoundCornersModifier.prototype.processPath = function(t, e) {
                var r = shape_pool.newElement();
                r.c = t.c;
                var i, s, a, n, o, h, l, p, f, m, c, d, u, y = t._length,
                    g = 0;
                for (i = 0; i < y; i += 1) s = t.v[i], n = t.o[i], a = t.i[i], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== i && i !== y - 1 || t.c ? (o = 0 === i ? t.v[y - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, f = u = s[1] - (s[1] - o[1]) * l, m = p - (p - s[0]) * roundCorner, c = f - (f - s[1]) * roundCorner, r.setTripleAt(p, f, m, c, d, u, g), g += 1, o = i === y - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = m = s[0] + (o[0] - s[0]) * l, f = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = f - (f - s[1]) * roundCorner, r.setTripleAt(p, f, m, c, d, u, g), g += 1) : (r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), g += 1) : (r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), g += 1);
                return r
            }, RoundCornersModifier.prototype.processShapes = function(t) {
                var e, r, i, s, a, n, o = this.shapes.length,
                    h = this.rd.v;
                if (0 !== h)
                    for (r = 0; r < o; r += 1) {
                        if ((a = this.shapes[r]).shape.paths, n = a.localShapeCollection, a.shape._mdf || this._mdf || t)
                            for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
                        a.shape.paths = a.localShapeCollection
                    }
                this.dynamicProperties.length || (this._mdf = !1)
            }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
            }, RepeaterModifier.prototype.applyTransforms = function(t, e, r, i, s, a) {
                var n = a ? -1 : 1,
                    o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
                    h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
                t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
            }, RepeaterModifier.prototype.init = function(t, e, r, i) {
                this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);
                for (; r > 0;) r -= 1, this._elements.unshift(e[r]), 1;
                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }, RepeaterModifier.prototype.resetElements = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
            }, RepeaterModifier.prototype.cloneElements = function(t) {
                t.length;
                var e = JSON.parse(JSON.stringify(t));
                return this.resetElements(e), e
            }, RepeaterModifier.prototype.changeGroupRender = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e)
            }, RepeaterModifier.prototype.processShapes = function(t) {
                var e, r, i, s, a;
                if (this._mdf || t) {
                    var n, o = Math.ceil(this.c.v);
                    if (this._groups.length < o) {
                        for (; this._groups.length < o;) {
                            var h = {
                                it: this.cloneElements(this._elements),
                                ty: "gr"
                            };
                            h.it.push({
                                a: {
                                    a: 0,
                                    ix: 1,
                                    k: [0, 0]
                                },
                                nm: "Transform",
                                o: {
                                    a: 0,
                                    ix: 7,
                                    k: 100
                                },
                                p: {
                                    a: 0,
                                    ix: 2,
                                    k: [0, 0]
                                },
                                r: {
                                    a: 1,
                                    ix: 6,
                                    k: [{
                                        s: 0,
                                        e: 0,
                                        t: 0
                                    }, {
                                        s: 0,
                                        e: 0,
                                        t: 1
                                    }]
                                },
                                s: {
                                    a: 0,
                                    ix: 3,
                                    k: [100, 100]
                                },
                                sa: {
                                    a: 0,
                                    ix: 5,
                                    k: 0
                                },
                                sk: {
                                    a: 0,
                                    ix: 4,
                                    k: 0
                                },
                                ty: "tr"
                            }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1
                        }
                        this.elem.reloadShapes()
                    }
                    for (a = 0, i = 0; i <= this._groups.length - 1; i += 1) n = a < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), a += 1;
                    this._currentCopies = o;
                    var l = this.o.v,
                        p = l % 1,
                        f = l > 0 ? Math.floor(l) : Math.ceil(l),
                        m = (this.tr.v.props, this.pMatrix.props),
                        c = this.rMatrix.props,
                        d = this.sMatrix.props;
                    this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
                    var u, y, g = 0;
                    if (l > 0) {
                        for (; g < f;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p)
                    } else if (l < 0) {
                        for (; g > f;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p)
                    }
                    for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
                        if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
                            for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];
                            this.matrix.reset()
                        } else
                            for (this.matrix.reset(), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];
                        g += 1, a -= 1, i += s
                    }
                } else
                    for (a = this._currentCopies, i = 0, s = 1; a;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s
            }, RepeaterModifier.prototype.addShape = function() {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function(t) {
                this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
            }, ShapeCollection.prototype.releaseShapes = function() {
                var t;
                for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
                this._length = 0
            }, DashProperty.prototype.getValue = function(t) {
                if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
                    var e = 0,
                        r = this.dataProps.length;
                    for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
                }
            }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function(t, e) {
                for (var r = 0, i = this.o.length / 2; r < i;) {
                    if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01) return !1;
                    r += 1
                }
                return !0
            }, GradientProperty.prototype.checkCollapsable = function() {
                if (this.o.length / 2 != this.c.length / 4) return !1;
                if (this.data.k.k[0].s)
                    for (var t = 0, e = this.data.k.k.length; t < e;) {
                        if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
                        t += 1
                    } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
                return !0
            }, GradientProperty.prototype.getValue = function(t) {
                if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
                    var e, r, i, s = 4 * this.data.p;
                    for (e = 0; e < s; e += 1) r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
                    if (this.o.length)
                        for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
                    this._mdf = !t
                }
            }, extendPrototype([DynamicPropertyContainer], GradientProperty);
            var buildShapeString = function(t, e, r, i) {
                    if (0 === e) return "";
                    var s, a = t.o,
                        n = t.i,
                        o = t.v,
                        h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
                    for (s = 1; s < e; s += 1) h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);
                    return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
                },
                ImagePreloader = function() {
                    var t = function() {
                        var t = createTag("canvas");
                        t.width = 1, t.height = 1;
                        var e = t.getContext("2d");
                        return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t
                    }();

                    function e() {
                        this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
                    }

                    function r(e) {
                        var r = function(t, e, r) {
                                var i = "";
                                if (t.e) i = t.p;
                                else if (e) {
                                    var s = t.p; - 1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s
                                } else i = r, i += t.u ? t.u : "", i += t.p;
                                return i
                            }(e, this.assetsPath, this.path),
                            i = createTag("img");
                        i.crossOrigin = "anonymous", i.addEventListener("load", this._imageLoaded.bind(this), !1), i.addEventListener("error", function() {
                            s.img = t, this._imageLoaded()
                        }.bind(this), !1), i.src = r;
                        var s = {
                            img: i,
                            assetData: e
                        };
                        return s
                    }

                    function i(t, e) {
                        this.imagesLoadedCb = e;
                        var r, i = t.length;
                        for (r = 0; r < i; r += 1) t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])))
                    }

                    function s(t) {
                        this.path = t || ""
                    }

                    function a(t) {
                        this.assetsPath = t || ""
                    }

                    function n(t) {
                        for (var e = 0, r = this.images.length; e < r;) {
                            if (this.images[e].assetData === t) return this.images[e].img;
                            e += 1
                        }
                    }

                    function o() {
                        this.imagesLoadedCb = null, this.images.length = 0
                    }

                    function h() {
                        return this.totalImages === this.loadedAssets
                    }
                    return function() {
                        this.loadAssets = i, this.setAssetsPath = a, this.setPath = s, this.loaded = h, this.destroy = o, this.getImage = n, this._createImageData = r, this._imageLoaded = e, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = []
                    }
                }(),
                featureSupport = function() {
                    var t = {
                        maskType: !0
                    };
                    return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t
                }(),
                filtersFactory = function() {
                    var t = {};
                    return t.createFilter = function(t) {
                        var e = createNS("filter");
                        return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
                    }, t.createAlphaToLuminanceFilter = function() {
                        var t = createNS("feColorMatrix");
                        return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
                    }, t
                }(),
                assetLoader = function() {
                    function t(t) {
                        return t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
                    }
                    return {
                        load: function(e, r, i) {
                            var s, a = new XMLHttpRequest;
                            a.open("GET", e, !0);
                            try {
                                a.responseType = "json"
                            } catch (n) {}
                            a.send(), a.onreadystatechange = function() {
                                if (4 == a.readyState)
                                    if (200 == a.status) s = t(a), r(s);
                                    else try {
                                        s = t(a), r(s)
                                    } catch (n) {
                                        i && i(n)
                                    }
                            }
                        }
                    }
                }();

            function TextAnimatorProperty(t, e, r) {
                this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
                    alignment: {}
                }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r)
            }

            function TextAnimatorDataProperty(t, e, r) {
                var i = {
                        propType: !1
                    },
                    s = PropertyFactory.getProp,
                    a = e.a;
                this.a = {
                    r: a.r ? s(t, a.r, 0, degToRads, r) : i,
                    rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
                    ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
                    sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
                    sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
                    s: a.s ? s(t, a.s, 1, .01, r) : i,
                    a: a.a ? s(t, a.a, 1, 0, r) : i,
                    o: a.o ? s(t, a.o, 0, .01, r) : i,
                    p: a.p ? s(t, a.p, 1, 0, r) : i,
                    sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
                    sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
                    fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
                    fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
                    fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
                    fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
                    t: a.t ? s(t, a.t, 0, 0, r) : i
                }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t
            }

            function LetterProps(t, e, r, i, s, a) {
                this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
                    o: !0,
                    sw: !!e,
                    sc: !!r,
                    fc: !!i,
                    m: !0,
                    p: !0
                }
            }

            function TextProperty(t, e) {
                this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
                    ascent: 0,
                    boxWidth: this.defaultBoxWidth,
                    f: "",
                    fStyle: "",
                    fWeight: "",
                    fc: "",
                    j: "",
                    justifyOffset: "",
                    l: [],
                    lh: 0,
                    lineWidths: [],
                    ls: "",
                    of: "",
                    s: "",
                    sc: "",
                    sw: 0,
                    t: 0,
                    tr: 0,
                    sz: 0,
                    ps: null,
                    fillColorAnim: !1,
                    strokeColorAnim: !1,
                    strokeWidthAnim: !1,
                    yOffset: 0,
                    finalSize: 0,
                    finalText: [],
                    finalLineHeight: 0,
                    __complete: !1
                }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
            }
            TextAnimatorProperty.prototype.searchProperties = function() {
                var t, e, r = this._textData.a.length,
                    i = PropertyFactory.getProp;
                for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
                this._textData.p && "m" in this._textData.p ? (this._pathData = {
                    f: i(this._elem, this._textData.p.f, 0, 0, this),
                    l: i(this._elem, this._textData.p.l, 0, 0, this),
                    r: this._textData.p.r,
                    m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
                }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
            }, TextAnimatorProperty.prototype.getMeasures = function(t, e) {
                if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
                    this._isFirstFrame = !1;
                    var r, i, s, a, n, o, h, l, p, f, m, c, d, u, y, g, v, b, E, x = this._moreOptions.alignment.v,
                        S = this._animatorsData,
                        P = this._textData,
                        _ = this.mHelper,
                        C = this._renderType,
                        A = this.renderedLetters.length,
                        T = (this.data, t.l);
                    if (this._hasMaskedPath) {
                        if (E = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                            var k, M = E.v;
                            for (this._pathData.r && (M = M.reverse()), n = {
                                    tLength: 0,
                                    segments: []
                                }, a = M._length - 1, g = 0, s = 0; s < a; s += 1) k = bez.buildBezierData(M.v[s], M.v[s + 1], [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], [M.i[s + 1][0] - M.v[s + 1][0], M.i[s + 1][1] - M.v[s + 1][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength;
                            s = a, E.v.c && (k = bez.buildBezierData(M.v[s], M.v[0], [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], [M.i[0][0] - M.v[0][0], M.i[0][1] - M.v[0][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength), this._pathData.pi = n
                        }
                        if (n = this._pathData.pi, o = this._pathData.f.v, m = 0, f = 1, l = 0, p = !0, u = n.segments, o < 0 && E.v.c)
                            for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), f = (d = u[m = u.length - 1].points).length - 1; o < 0;) o += d[f].partialLength, (f -= 1) < 0 && (f = (d = u[m -= 1].points).length - 1);
                        c = (d = u[m].points)[f - 1], y = (h = d[f]).partialLength
                    }
                    a = T.length, r = 0, i = 0;
                    var D, w, F, I, V = 1.2 * t.finalSize * .714,
                        R = !0;
                    F = S.length;
                    var B, L, G, z, N, O, H, j, q, W, Y, X, $, K = -1,
                        J = o,
                        Z = m,
                        U = f,
                        Q = -1,
                        tt = "",
                        et = this.defaultPropsArray;
                    if (2 === t.j || 1 === t.j) {
                        var rt = 0,
                            it = 0,
                            st = 2 === t.j ? -.5 : -1,
                            at = 0,
                            nt = !0;
                        for (s = 0; s < a; s += 1)
                            if (T[s].n) {
                                for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;
                                rt = 0, nt = !0
                            } else {
                                for (w = 0; w < F; w += 1)(D = S[w].a).t.propType && (nt && 2 === t.j && (it += D.t.v * st), (B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? rt += D.t.v * B[0] * st : rt += D.t.v * B * st);
                                nt = !1
                            } for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1
                    }
                    for (s = 0; s < a; s += 1) {
                        if (_.reset(), N = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = J, R = !1, 0, this._hasMaskedPath && (f = U, c = (d = u[m = Z].points)[f - 1], y = (h = d[f]).partialLength, l = 0), $ = W = X = tt = "", et = this.defaultPropsArray;
                        else {
                            if (this._hasMaskedPath) {
                                if (Q !== T[s].line) {
                                    switch (t.j) {
                                        case 1:
                                            o += g - t.lineWidths[T[s].line];
                                            break;
                                        case 2:
                                            o += (g - t.lineWidths[T[s].line]) / 2
                                    }
                                    Q = T[s].line
                                }
                                K !== T[s].ind && (T[K] && (o += T[K].extra), o += T[s].an / 2, K = T[s].ind), o += x[0] * T[s].an / 200;
                                var ot = 0;
                                for (w = 0; w < F; w += 1)(D = S[w].a).p.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? ot += D.p.v[0] * B[0] : ot += D.p.v[0] * B), D.a.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? ot += D.a.v[0] * B[0] : ot += D.a.v[0] * B);
                                for (p = !0; p;) l + y >= o + ot || !d ? (v = (o + ot - l) / h.partialLength, G = c.point[0] + (h.point[0] - c.point[0]) * v, z = c.point[1] + (h.point[1] - c.point[1]) * v, _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100), p = !1) : d && (l += h.partialLength, (f += 1) >= d.length && (f = 0, u[m += 1] ? d = u[m].points : E.v.c ? (f = 0, d = u[m = 0].points) : (l -= h.partialLength, d = null)), d && (c = h, y = (h = d[f]).partialLength));
                                L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0)
                            } else L = T[s].an / 2 - T[s].add, _.translate(-L, 0, 0), _.translate(-x[0] * T[s].an / 200, -x[1] * V / 100, 0);
                            for (T[s].l / 2, w = 0; w < F; w += 1)(D = S[w].a).t.propType && (B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? B.length ? o += D.t.v * B[0] : o += D.t.v * B : B.length ? r += D.t.v * B[0] : r += D.t.v * B));
                            for (T[s].l / 2, t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), w = 0; w < F; w += 1)(D = S[w].a).a.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? _.translate(-D.a.v[0] * B[0], -D.a.v[1] * B[1], D.a.v[2] * B[2]) : _.translate(-D.a.v[0] * B, -D.a.v[1] * B, D.a.v[2] * B));
                            for (w = 0; w < F; w += 1)(D = S[w].a).s.propType && ((B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars)).length ? _.scale(1 + (D.s.v[0] - 1) * B[0], 1 + (D.s.v[1] - 1) * B[1], 1) : _.scale(1 + (D.s.v[0] - 1) * B, 1 + (D.s.v[1] - 1) * B, 1));
                            for (w = 0; w < F; w += 1) {
                                if (D = S[w].a, B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars), D.sk.propType && (B.length ? _.skewFromAxis(-D.sk.v * B[0], D.sa.v * B[1]) : _.skewFromAxis(-D.sk.v * B, D.sa.v * B)), D.r.propType && (B.length ? _.rotateZ(-D.r.v * B[2]) : _.rotateZ(-D.r.v * B)), D.ry.propType && (B.length ? _.rotateY(D.ry.v * B[1]) : _.rotateY(D.ry.v * B)), D.rx.propType && (B.length ? _.rotateX(D.rx.v * B[0]) : _.rotateX(D.rx.v * B)), D.o.propType && (B.length ? N += (D.o.v * B[0] - N) * B[0] : N += (D.o.v * B - N) * B), t.strokeWidthAnim && D.sw.propType && (B.length ? H += D.sw.v * B[0] : H += D.sw.v * B), t.strokeColorAnim && D.sc.propType)
                                    for (q = 0; q < 3; q += 1) B.length ? O[q] = O[q] + (D.sc.v[q] - O[q]) * B[0] : O[q] = O[q] + (D.sc.v[q] - O[q]) * B;
                                if (t.fillColorAnim && t.fc) {
                                    if (D.fc.propType)
                                        for (q = 0; q < 3; q += 1) B.length ? j[q] = j[q] + (D.fc.v[q] - j[q]) * B[0] : j[q] = j[q] + (D.fc.v[q] - j[q]) * B;
                                    D.fh.propType && (j = B.length ? addHueToRGB(j, D.fh.v * B[0]) : addHueToRGB(j, D.fh.v * B)), D.fs.propType && (j = B.length ? addSaturationToRGB(j, D.fs.v * B[0]) : addSaturationToRGB(j, D.fs.v * B)), D.fb.propType && (j = B.length ? addBrightnessToRGB(j, D.fb.v * B[0]) : addBrightnessToRGB(j, D.fb.v * B))
                                }
                            }
                            for (w = 0; w < F; w += 1)(D = S[w].a).p.propType && (B = S[w].s.getMult(T[s].anIndexes[w], P.a[w].s.totalChars), this._hasMaskedPath ? B.length ? _.translate(0, D.p.v[1] * B[0], -D.p.v[2] * B[1]) : _.translate(0, D.p.v[1] * B, -D.p.v[2] * B) : B.length ? _.translate(D.p.v[0] * B[0], D.p.v[1] * B[1], -D.p.v[2] * B[2]) : _.translate(D.p.v[0] * B, D.p.v[1] * B, -D.p.v[2] * B));
                            if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
                                if (_.translate(0, -t.ls), _.translate(0, x[1] * V / 100 + i, 0), P.p.p) {
                                    b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                                    var ht = 180 * Math.atan(b) / Math.PI;
                                    h.point[0] < c.point[0] && (ht += 180), _.rotate(-ht * Math.PI / 180)
                                }
                                _.translate(G, z, 0), o -= x[0] * T[s].an / 200, T[s + 1] && K !== T[s + 1].ind && (o += T[s].an / 2, o += t.tr / 1e3 * t.finalSize)
                            } else {
                                switch (_.translate(r, i, 0), t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                                    case 1:
                                        _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
                                        break;
                                    case 2:
                                        _.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0)
                                }
                                _.translate(0, -t.ls), _.translate(L, 0, 0), _.translate(x[0] * T[s].an / 200, x[1] * V / 100, 0), r += T[s].l + t.tr / 1e3 * t.finalSize
                            }
                            "html" === C ? tt = _.toCSS() : "svg" === C ? tt = _.to2dCSS() : et = [_.props[0], _.props[1], _.props[2], _.props[3], _.props[4], _.props[5], _.props[6], _.props[7], _.props[8], _.props[9], _.props[10], _.props[11], _.props[12], _.props[13], _.props[14], _.props[15]], $ = N
                        }
                        A <= s ? (I = new LetterProps($, W, Y, X, tt, et), this.renderedLetters.push(I), A += 1, this.lettersChangedFlag = !0) : (I = this.renderedLetters[s], this.lettersChangedFlag = I.update($, W, Y, X, tt, et) || this.lettersChangedFlag)
                    }
                }
            }, TextAnimatorProperty.prototype.getValue = function() {
                this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
            }, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function(t, e, r, i, s, a) {
                this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
                var n = !1;
                return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, n = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, n = !0), this.m !== s && (this.m = s, this._mdf.m = !0, n = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = !0, n = !0), n
            }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                return t
            }, TextProperty.prototype.setCurrentData = function(t) {
                t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
            }, TextProperty.prototype.searchProperty = function() {
                return this.searchKeyframes()
            }, TextProperty.prototype.searchKeyframes = function() {
                return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
            }, TextProperty.prototype.addEffect = function(t) {
                this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
            }, TextProperty.prototype.getValue = function(t) {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
                    this.currentData.t = this.data.d.k[this.keysIndex].s.t;
                    var e = this.currentData,
                        r = this.keysIndex;
                    if (this.lock) this.setCurrentData(this.currentData);
                    else {
                        this.lock = !0, this._mdf = !1;
                        var i, s = this.effectsSequence.length,
                            a = t || this.data.d.k[this.keysIndex].s;
                        for (i = 0; i < s; i += 1) a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
                        e !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId
                    }
                }
            }, TextProperty.prototype.getKeyframeValue = function() {
                for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) r += 1;
                return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
            }, TextProperty.prototype.buildFinalText = function(t) {
                for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], s = 0, a = t.length; s < a;) e = t.charCodeAt(s), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(s) : e >= 55296 && e <= 56319 && (e = t.charCodeAt(s + 1)) >= 56320 && e <= 57343 ? (i.push(t.substr(s, 2)), ++s) : i.push(t.charAt(s)), s += 1;
                return i
            }, TextProperty.prototype.completeTextData = function(t) {
                t.__complete = !0;
                var e, r, i, s, a, n, o, h = this.elem.globalData.fontManager,
                    l = this.data,
                    p = [],
                    f = 0,
                    m = l.m.g,
                    c = 0,
                    d = 0,
                    u = 0,
                    y = [],
                    g = 0,
                    v = 0,
                    b = h.getFontByName(t.f),
                    E = 0,
                    x = b.fStyle ? b.fStyle.split(" ") : [],
                    S = "normal",
                    P = "normal";
                for (r = x.length, e = 0; e < r; e += 1) switch (x[e].toLowerCase()) {
                    case "italic":
                        P = "italic";
                        break;
                    case "bold":
                        S = "700";
                        break;
                    case "black":
                        S = "900";
                        break;
                    case "medium":
                        S = "500";
                        break;
                    case "regular":
                    case "normal":
                        S = "400";
                        break;
                    case "light":
                    case "thin":
                        S = "200"
                }
                t.fWeight = b.fWeight || S, t.fStyle = P, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
                var _, C = t.tr / 1e3 * t.finalSize;
                if (t.sz)
                    for (var A, T, k = !0, M = t.sz[0], D = t.sz[1]; k;) {
                        A = 0, g = 0, r = (T = this.buildFinalText(t.t)).length, C = t.tr / 1e3 * t.finalSize;
                        var w = -1;
                        for (e = 0; e < r; e += 1) _ = T[e].charCodeAt(0), i = !1, " " === T[e] ? w = e : 13 !== _ && 3 !== _ || (g = 0, i = !0, A += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(T[e], b.fStyle, b.fFamily), E = i ? 0 : o.w * t.finalSize / 100) : E = h.measureText(T[e], t.f, t.finalSize), g + E > M && " " !== T[e] ? (-1 === w ? r += 1 : e = w, A += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, w === e ? 1 : 0, "\r"), w = -1, g = 0) : (g += E, g += C);
                        A += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && D < A ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, r = t.finalText.length, k = !1)
                    }
                g = -C, E = 0;
                var F, I = 0;
                for (e = 0; e < r; e += 1)
                    if (i = !1, _ = (F = t.finalText[e]).charCodeAt(0), " " === F ? s = " " : 13 === _ || 3 === _ ? (I = 0, y.push(g), v = g > v ? g : v, g = -2 * C, s = "", i = !0, u += 1) : s = t.finalText[e], h.chars ? (o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily), E = i ? 0 : o.w * t.finalSize / 100) : E = h.measureText(s, t.f, t.finalSize), " " === F ? I += E + C : (g += E + C + I, I = 0), p.push({
                            l: E,
                            an: E,
                            add: c,
                            n: i,
                            anIndexes: [],
                            val: s,
                            line: u,
                            animatorJustifyOffset: 0
                        }), 2 == m) {
                        if (c += E, "" === s || " " === s || e === r - 1) {
                            for ("" !== s && " " !== s || (c -= E); d <= e;) p[d].an = c, p[d].ind = f, p[d].extra = E, d += 1;
                            f += 1, c = 0
                        }
                    } else if (3 == m) {
                    if (c += E, "" === s || e === r - 1) {
                        for ("" === s && (c -= E); d <= e;) p[d].an = c, p[d].ind = f, p[d].extra = E, d += 1;
                        c = 0, f += 1
                    }
                } else p[f].ind = f, p[f].extra = 0, f += 1;
                if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
                else switch (t.boxWidth = v, t.j) {
                    case 1:
                        t.justifyOffset = -t.boxWidth;
                        break;
                    case 2:
                        t.justifyOffset = -t.boxWidth / 2;
                        break;
                    default:
                        t.justifyOffset = 0
                }
                t.lineWidths = y;
                var V, R, B = l.a;
                n = B.length;
                var L, G, z = [];
                for (a = 0; a < n; a += 1) {
                    for ((V = B[a]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), G = 0, L = V.s.b, e = 0; e < r; e += 1)(R = p[e]).anIndexes[a] = G, (1 == L && "" !== R.val || 2 == L && "" !== R.val && " " !== R.val || 3 == L && (R.n || " " == R.val || e == r - 1) || 4 == L && (R.n || e == r - 1)) && (1 === V.s.rn && z.push(G), G += 1);
                    l.a[a].s.totalChars = G;
                    var N, O = -1;
                    if (1 === V.s.rn)
                        for (e = 0; e < r; e += 1) O != (R = p[e]).anIndexes[a] && (O = R.anIndexes[a], N = z.splice(Math.floor(Math.random() * z.length), 1)[0]), R.anIndexes[a] = N
                }
                t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100
            }, TextProperty.prototype.updateDocumentData = function(t, e) {
                e = void 0 === e ? this.keysIndex : e;
                var r = this.copyData({}, this.data.d.k[e].s);
                r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this)
            }, TextProperty.prototype.recalculate = function(t) {
                var e = this.data.d.k[t].s;
                e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
            }, TextProperty.prototype.canResizeFont = function(t) {
                this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
            }, TextProperty.prototype.setMinimumFontSize = function(t) {
                this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
            };
            var TextSelectorProp = function() {
                    var t = Math.max,
                        e = Math.min,
                        r = Math.floor;

                    function i(t, e) {
                        this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
                            k: 0
                        }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
                            v: 100
                        }, this.o = PropertyFactory.getProp(t, e.o || {
                            k: 0
                        }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
                            k: 0
                        }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
                            k: 0
                        }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
                    }
                    return i.prototype = {
                        getMult: function(i) {
                            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                            var s = 0,
                                a = 0,
                                n = 1,
                                o = 1;
                            this.ne.v > 0 ? s = this.ne.v / 100 : a = -this.ne.v / 100, this.xe.v > 0 ? n = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
                            var h = BezierFactory.getBezierEasing(s, a, n, o).get,
                                l = 0,
                                p = this.finalS,
                                f = this.finalE,
                                m = this.data.sh;
                            if (2 === m) l = h(l = f === p ? i >= f ? 1 : 0 : t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));
                            else if (3 === m) l = h(l = f === p ? i >= f ? 0 : 1 : 1 - t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));
                            else if (4 === m) f === p ? l = 0 : (l = t(0, e(.5 / (f - p) + (i - p) / (f - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5), l = h(l);
                            else if (5 === m) {
                                if (f === p) l = 0;
                                else {
                                    var c = f - p,
                                        d = -c / 2 + (i = e(t(0, i + .5 - p), f - p)),
                                        u = c / 2;
                                    l = Math.sqrt(1 - d * d / (u * u))
                                }
                                l = h(l)
                            } else 6 === m ? (f === p ? l = 0 : (i = e(t(0, i + .5 - p), f - p), l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (f - p))) / 2), l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(f, 1) - (p - i) : f - i, 1))), l = h(l));
                            return l * this.a.v
                        },
                        getValue: function(t) {
                            this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                            var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                                r = this.o.v / e,
                                i = this.s.v / e + r,
                                s = this.e.v / e + r;
                            if (i > s) {
                                var a = i;
                                i = s, s = a
                            }
                            this.finalS = i, this.finalE = s
                        }
                    }, extendPrototype([DynamicPropertyContainer], i), {
                        getTextSelectorProp: function(t, e, r) {
                            return new i(t, e, r)
                        }
                    }
                }(),
                pool_factory = function(t, e, r, i) {
                    var s = 0,
                        a = t,
                        n = createSizedArray(a);

                    function o() {
                        return s ? n[s -= 1] : e()
                    }
                    return {
                        newElement: o,
                        release: function(t) {
                            s === a && (n = pooling.double(n), a *= 2), r && r(t), n[s] = t, s += 1
                        }
                    }
                },
                pooling = function() {
                    return {
                        double: function(t) {
                            return t.concat(createSizedArray(t.length))
                        }
                    }
                }(),
                point_pool = function() {
                    return pool_factory(8, function() {
                        return createTypedArray("float32", 2)
                    })
                }(),
                shape_pool = function() {
                    var t = pool_factory(4, function() {
                        return new ShapePath
                    }, function(t) {
                        var e, r = t._length;
                        for (e = 0; e < r; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
                        t._length = 0, t.c = !1
                    });
                    return t.clone = function(e) {
                        var r, i = t.newElement(),
                            s = void 0 === e._length ? e.v.length : e._length;
                        for (i.setLength(s), i.c = e.c, r = 0; r < s; r += 1) i.setTripleAt(e.v[r][0], e.v[r][1], e.o[r][0], e.o[r][1], e.i[r][0], e.i[r][1], r);
                        return i
                    }, t
                }(),
                shapeCollection_pool = function() {
                    var t = {
                            newShapeCollection: function() {
                                var t;
                                t = e ? i[e -= 1] : new ShapeCollection;
                                return t
                            },
                            release: function(t) {
                                var s, a = t._length;
                                for (s = 0; s < a; s += 1) shape_pool.release(t.shapes[s]);
                                t._length = 0, e === r && (i = pooling.double(i), r *= 2);
                                i[e] = t, e += 1
                            }
                        },
                        e = 0,
                        r = 4,
                        i = createSizedArray(r);
                    return t
                }(),
                segments_length_pool = function() {
                    return pool_factory(8, function() {
                        return {
                            lengths: [],
                            totalLength: 0
                        }
                    }, function(t) {
                        var e, r = t.lengths.length;
                        for (e = 0; e < r; e += 1) bezier_length_pool.release(t.lengths[e]);
                        t.lengths.length = 0
                    })
                }(),
                bezier_length_pool = function() {
                    return pool_factory(8, function() {
                        return {
                            addedLength: 0,
                            percents: createTypedArray("float32", defaultCurveSegments),
                            lengths: createTypedArray("float32", defaultCurveSegments)
                        }
                    })
                }();

            function BaseRenderer() {}

            function SVGRenderer(t, e) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
                var r = "";
                if (e && e.title) {
                    var i = createNS("title"),
                        s = createElementID();
                    i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s
                }
                if (e && e.description) {
                    var a = createNS("desc"),
                        n = createElementID();
                    a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), r += " " + n
                }
                r && this.svgElement.setAttribute("aria-labelledby", r);
                var o = createNS("defs");
                this.svgElement.appendChild(o);
                var h = createNS("g");
                this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    progressiveLoad: e && e.progressiveLoad || !1,
                    hideOnTransparent: !e || !1 !== e.hideOnTransparent,
                    viewBoxOnly: e && e.viewBoxOnly || !1,
                    viewBoxSize: e && e.viewBoxSize || !1,
                    className: e && e.className || "",
                    id: e && e.id || "",
                    focusable: e && e.focusable,
                    filterSize: {
                        width: e && e.filterSize && e.filterSize.width || "100%",
                        height: e && e.filterSize && e.filterSize.height || "100%",
                        x: e && e.filterSize && e.filterSize.x || "0%",
                        y: e && e.filterSize && e.filterSize.y || "0%"
                    }
                }, this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    defs: o,
                    renderConfig: this.renderConfig
                }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
            }

            function CanvasRenderer(t, e) {
                this.animationItem = t, this.renderConfig = {
                    clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
                    context: e && e.context || null,
                    progressiveLoad: e && e.progressiveLoad || !1,
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    className: e && e.className || "",
                    id: e && e.id || ""
                }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
                    frameNum: -1,
                    _mdf: !1,
                    renderConfig: this.renderConfig,
                    currentGlobalAlpha: -1
                }, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
            }

            function HybridRenderer(t, e) {
                this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
                    className: e && e.className || "",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    hideOnTransparent: !e || !1 !== e.hideOnTransparent,
                    filterSize: {
                        width: e && e.filterSize && e.filterSize.width || "400%",
                        height: e && e.filterSize && e.filterSize.height || "400%",
                        x: e && e.filterSize && e.filterSize.x || "-100%",
                        y: e && e.filterSize && e.filterSize.y || "-100%"
                    }
                }, this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    renderConfig: this.renderConfig
                }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
            }

            function MaskElement(t, e, r) {
                this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
                var i, s = this.globalData.defs,
                    a = this.masksProperties ? this.masksProperties.length : 0;
                this.viewData = createSizedArray(a), this.solidPath = "";
                var n, o, h, l, p, f, m, c = this.masksProperties,
                    d = 0,
                    u = [],
                    y = createElementID(),
                    g = "clipPath",
                    v = "clip-path";
                for (i = 0; i < a; i++)
                    if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k || c[i].o.x) && (g = "mask", v = "mask"), "s" != c[i].mode && "i" != c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != c[i].mode) {
                        var b;
                        if (d += 1, n.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (g = "mask", v = "mask", m = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (f = createNS("feMorphology")).setAttribute("operator", "erode"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), p.appendChild(f), s.appendChild(p), n.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : (f = null, m = null), this.storedData[i] = {
                                elem: n,
                                x: m,
                                expan: f,
                                lastPath: "",
                                lastOperator: "",
                                filterId: b,
                                lastRadius: 0
                            }, "i" == c[i].mode) {
                            h = u.length;
                            var E = createNS("g");
                            for (o = 0; o < h; o += 1) E.appendChild(u[o]);
                            var x = createNS("mask");
                            x.setAttribute("mask-type", "alpha"), x.setAttribute("id", y + "_" + d), x.appendChild(n), s.appendChild(x), E.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(E)
                        } else u.push(n);
                        c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
                            elem: n,
                            lastPath: "",
                            op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
                            prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
                            invRect: l
                        }, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i])
                    } else this.viewData[i] = {
                        op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
                        prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
                        elem: n,
                        lastPath: ""
                    }, s.appendChild(n);
                for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1) this.maskElement.appendChild(u[i]);
                d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
            }

            function HierarchyElement() {}

            function FrameElement() {}

            function TransformElement() {}

            function RenderableElement() {}

            function RenderableDOMElement() {}

            function ProcessedElement(t, e) {
                this.elem = t, this.pos = e
            }

            function SVGStyleData(t, e) {
                this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null
            }

            function SVGShapeData(t, e, r) {
                this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
                for (var i = 0, s = t.length; i < s;) {
                    if (t[i].mProps.dynamicProperties.length) {
                        this._isAnimated = !0;
                        break
                    }
                    i += 1
                }
            }

            function SVGTransformData(t, e, r) {
                this.transform = {
                    mProps: t,
                    op: e,
                    container: r
                }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
            }

            function SVGStrokeStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated
            }

            function SVGFillStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r
            }

            function SVGGradientFillStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r)
            }

            function SVGGradientStrokeStyleData(t, e, r) {
                this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated
            }

            function ShapeGroupData() {
                this.it = [], this.prevViewData = [], this.gr = createNS("g")
            }
            BaseRenderer.prototype.checkLayers = function(t) {
                var e, r, i = this.layers.length;
                for (this.completeLayers = !0, e = i - 1; e >= 0; e--) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
                this.checkPendingElements()
            }, BaseRenderer.prototype.createItem = function(t) {
                switch (t.ty) {
                    case 2:
                        return this.createImage(t);
                    case 0:
                        return this.createComp(t);
                    case 1:
                        return this.createSolid(t);
                    case 3:
                        return this.createNull(t);
                    case 4:
                        return this.createShape(t);
                    case 5:
                        return this.createText(t);
                    case 13:
                        return this.createCamera(t)
                }
                return this.createNull(t)
            }, BaseRenderer.prototype.createCamera = function() {
                throw new Error("You're using a 3d camera. Try the html renderer.")
            }, BaseRenderer.prototype.buildAllItems = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1) this.buildItem(t);
                this.checkPendingElements()
            }, BaseRenderer.prototype.includeLayers = function(t) {
                this.completeLayers = !1;
                var e, r, i = t.length,
                    s = this.layers.length;
                for (e = 0; e < i; e += 1)
                    for (r = 0; r < s;) {
                        if (this.layers[r].id == t[e].id) {
                            this.layers[r] = t[e];
                            break
                        }
                        r += 1
                    }
            }, BaseRenderer.prototype.setProjectInterface = function(t) {
                this.globalData.projectInterface = t
            }, BaseRenderer.prototype.initItems = function() {
                this.globalData.progressiveLoad || this.buildAllItems()
            }, BaseRenderer.prototype.buildElementParenting = function(t, e, r) {
                for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1
            }, BaseRenderer.prototype.addPendingElement = function(t) {
                this.pendingElements.push(t)
            }, BaseRenderer.prototype.searchExtraCompositions = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1)
                    if (t[e].xt) {
                        var i = this.createComp(t[e]);
                        i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
                    }
            }, BaseRenderer.prototype.setupGlobalData = function(t, e) {
                this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
                    w: t.w,
                    h: t.h
                }
            }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function(t) {
                return new NullElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createShape = function(t) {
                return new SVGShapeElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createText = function(t) {
                return new SVGTextElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createImage = function(t) {
                return new IImageElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createComp = function(t) {
                return new SVGCompElement(t, this.globalData, this)
            }, SVGRenderer.prototype.createSolid = function(t) {
                return new ISolidElement(t, this.globalData, this)
            }, SVGRenderer.prototype.configAnimation = function(t) {
                this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
                var e = this.globalData.defs;
                this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
                var r = createNS("clipPath"),
                    i = createNS("rect");
                i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
                var s = createElementID();
                r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
            }, SVGRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
                var t, e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0, this.destroyed = !0, this.animationItem = null
            }, SVGRenderer.prototype.updateContainerSize = function() {}, SVGRenderer.prototype.buildItem = function(t) {
                var e = this.elements;
                if (!e[t] && 99 != this.layers[t].ty) {
                    e[t] = !0;
                    var r = this.createItem(this.layers[t]);
                    e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)))
                }
            }, SVGRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length;) {
                    var t = this.pendingElements.pop();
                    if (t.checkParenting(), t.data.tt)
                        for (var e = 0, r = this.elements.length; e < r;) {
                            if (this.elements[e] === t) {
                                t.setMatte(this.elements[e - 1].layerId);
                                break
                            }
                            e += 1
                        }
                }
            }, SVGRenderer.prototype.renderFrame = function(t) {
                if (this.renderedFrame !== t && !this.destroyed) {
                    null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
                    var e, r = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e--)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
                    if (this.globalData._mdf)
                        for (e = 0; e < r; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
                }
            }, SVGRenderer.prototype.appendElementInPos = function(t, e) {
                var r = t.getBaseElement();
                if (r) {
                    for (var i, s = 0; s < e;) this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;
                    i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r)
                }
            }, SVGRenderer.prototype.hide = function() {
                this.layerElement.style.display = "none"
            }, SVGRenderer.prototype.show = function() {
                this.layerElement.style.display = "block"
            }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function(t) {
                return new CVShapeElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createText = function(t) {
                return new CVTextElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createImage = function(t) {
                return new CVImageElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createComp = function(t) {
                return new CVCompElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createSolid = function(t) {
                return new CVSolidElement(t, this.globalData, this)
            }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function(t) {
                if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13])
                    if (this.renderConfig.clearCanvas) {
                        this.transformMat.cloneFromProps(t);
                        var e = this.contextData.cTr.props;
                        this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
                        var r = this.contextData.cTr.props;
                        this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13])
                    } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
            }, CanvasRenderer.prototype.ctxOpacity = function(t) {
                if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void(this.globalData.currentGlobalAlpha = this.contextData.cO);
                this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)
            }, CanvasRenderer.prototype.reset = function() {
                this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
            }, CanvasRenderer.prototype.save = function(t) {
                if (this.renderConfig.clearCanvas) {
                    t && this.canvasContext.save();
                    var e = this.contextData.cTr.props;
                    this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
                    var r, i = this.contextData.saved[this.contextData.cArrPos];
                    for (r = 0; r < 16; r += 1) i[r] = e[r];
                    this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
                } else this.canvasContext.save()
            }, CanvasRenderer.prototype.restore = function(t) {
                if (this.renderConfig.clearCanvas) {
                    t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
                    var e, r = this.contextData.saved[this.contextData.cArrPos],
                        i = this.contextData.cTr.props;
                    for (e = 0; e < 16; e += 1) i[e] = r[e];
                    this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r)
                } else this.canvasContext.restore()
            }, CanvasRenderer.prototype.configAnimation = function(t) {
                this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
                    w: t.w,
                    h: t.h,
                    sx: 0,
                    sy: 0,
                    tx: 0,
                    ty: 0
                }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
            }, CanvasRenderer.prototype.updateContainerSize = function() {
                var t, e, r, i;
                if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
                    var s = this.renderConfig.preserveAspectRatio.split(" "),
                        a = s[1] || "meet",
                        n = s[0] || "xMidYMid",
                        o = n.substr(0, 4),
                        h = n.substr(4);
                    r = t / e, (i = this.transformCanvas.w / this.transformCanvas.h) > r && "meet" === a || i < r && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === a || i > r && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === a || i > r && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (i > r && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i > r && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
                } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
                this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
            }, CanvasRenderer.prototype.destroy = function() {
                var t;
                for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
            }, CanvasRenderer.prototype.renderFrame = function(t, e) {
                if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
                    this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
                    var r, i = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r++)(this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
                    if (this.globalData._mdf) {
                        for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
                        !0 !== this.renderConfig.clearCanvas && this.restore()
                    }
                }
            }, CanvasRenderer.prototype.buildItem = function(t) {
                var e = this.elements;
                if (!e[t] && 99 != this.layers[t].ty) {
                    var r = this.createItem(this.layers[t], this, this.globalData);
                    e[t] = r, r.initExpressions()
                }
            }, CanvasRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length;) {
                    this.pendingElements.pop().checkParenting()
                }
            }, CanvasRenderer.prototype.hide = function() {
                this.animationItem.container.style.display = "none"
            }, CanvasRenderer.prototype.show = function() {
                this.animationItem.container.style.display = "block"
            }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length;) {
                    this.pendingElements.pop().checkParenting()
                }
            }, HybridRenderer.prototype.appendElementInPos = function(t, e) {
                var r = t.getBaseElement();
                if (r) {
                    var i = this.layers[e];
                    if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);
                    else if (this.threeDElements) this.addTo3dContainer(r, e);
                    else {
                        for (var s, a, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
                        s ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, s) : i.ddd && this.supports3d || this.layerElement.appendChild(r)
                    }
                }
            }, HybridRenderer.prototype.createShape = function(t) {
                return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createText = function(t) {
                return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createCamera = function(t) {
                return this.camera = new HCameraElement(t, this.globalData, this), this.camera
            }, HybridRenderer.prototype.createImage = function(t) {
                return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createComp = function(t) {
                return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createSolid = function(t) {
                return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this)
            }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function(t) {
                for (var e = 0, r = this.threeDElements.length; e < r;) {
                    if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
                    e += 1
                }
            }, HybridRenderer.prototype.createThreeDContainer = function(t, e) {
                var r = createTag("div");
                styleDiv(r);
                var i = createTag("div");
                styleDiv(i), "3d" === e && (r.style.width = this.globalData.compSize.w + "px", r.style.height = this.globalData.compSize.h + "px", r.style.transformOrigin = r.style.mozTransformOrigin = r.style.webkitTransformOrigin = "50% 50%", i.style.transform = i.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"), r.appendChild(i);
                var s = {
                    container: i,
                    perspectiveElem: r,
                    startPos: t,
                    endPos: t,
                    type: e
                };
                return this.threeDElements.push(s), s
            }, HybridRenderer.prototype.build3dContainers = function() {
                var t, e, r = this.layers.length,
                    i = "";
                for (t = 0; t < r; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")), e.endPos = Math.max(e.endPos, t)) : ("2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t));
                for (t = (r = this.threeDElements.length) - 1; t >= 0; t--) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
            }, HybridRenderer.prototype.addTo3dContainer = function(t, e) {
                for (var r = 0, i = this.threeDElements.length; r < i;) {
                    if (e <= this.threeDElements[r].endPos) {
                        for (var s, a = this.threeDElements[r].startPos; a < e;) this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
                        s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
                        break
                    }
                    r += 1
                }
            }, HybridRenderer.prototype.configAnimation = function(t) {
                var e = createTag("div"),
                    r = this.animationItem.wrapper;
                e.style.width = t.w + "px", e.style.height = t.h + "px", this.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), e.style.overflow = "hidden";
                var i = createNS("svg");
                i.setAttribute("width", "1"), i.setAttribute("height", "1"), styleDiv(i), this.resizerElem.appendChild(i);
                var s = createNS("defs");
                i.appendChild(s), this.data = t, this.setupGlobalData(t, i), this.globalData.defs = s, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
            }, HybridRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
                var t, e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t++) this.elements[t].destroy();
                this.elements.length = 0, this.destroyed = !0, this.animationItem = null
            }, HybridRenderer.prototype.updateContainerSize = function() {
                var t, e, r, i, s = this.animationItem.wrapper.offsetWidth,
                    a = this.animationItem.wrapper.offsetHeight,
                    n = s / a;
                this.globalData.compSize.w / this.globalData.compSize.h > n ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, r = 0, i = (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, i = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)"
            }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function() {
                this.resizerElem.style.display = "none"
            }, HybridRenderer.prototype.show = function() {
                this.resizerElem.style.display = "block"
            }, HybridRenderer.prototype.initItems = function() {
                if (this.buildAllItems(), this.camera) this.camera.setup();
                else {
                    var t, e = this.globalData.compSize.w,
                        r = this.globalData.compSize.h,
                        i = this.threeDElements.length;
                    for (t = 0; t < i; t += 1) this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px"
                }
            }, HybridRenderer.prototype.searchExtraCompositions = function(t) {
                var e, r = t.length,
                    i = createTag("div");
                for (e = 0; e < r; e += 1)
                    if (t[e].xt) {
                        var s = this.createComp(t[e], i, this.globalData.comp, null);
                        s.initExpressions(), this.globalData.projectInterface.registerComposition(s)
                    }
            }, MaskElement.prototype.getMaskProperty = function(t) {
                return this.viewData[t].prop
            }, MaskElement.prototype.renderFrame = function(t) {
                var e, r = this.element.finalTransform.mat,
                    i = this.masksProperties.length;
                for (e = 0; e < i; e++)
                    if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
                        var s = this.storedData[e].expan;
                        this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
                    }
            }, MaskElement.prototype.getMaskelement = function() {
                return this.maskElement
            }, MaskElement.prototype.createLayerSolidPath = function() {
                var t = "M0,0 ";
                return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
            }, MaskElement.prototype.drawPath = function(t, e, r) {
                var i, s, a = " M" + e.v[0][0] + "," + e.v[0][1];
                for (s = e._length, i = 1; i < s; i += 1) a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
                if (e.c && s > 1 && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
                    var n = "";
                    r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a
                }
            }, MaskElement.prototype.destroy = function() {
                this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
            }, HierarchyElement.prototype = {
                initHierarchy: function() {
                    this.hierarchy = [], this._isParent = !1, this.checkParenting()
                },
                setHierarchy: function(t) {
                    this.hierarchy = t
                },
                setAsParent: function() {
                    this._isParent = !0
                },
                checkParenting: function() {
                    void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
                }
            }, FrameElement.prototype = {
                initFrame: function() {
                    this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
                },
                prepareProperties: function(t, e) {
                    var r, i = this.dynamicProperties.length;
                    for (r = 0; r < i; r += 1)(e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
                },
                addDynamicProperty: function(t) {
                    -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
                }
            }, TransformElement.prototype = {
                initTransform: function() {
                    this.finalTransform = {
                        mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
                            o: 0
                        },
                        _matMdf: !1,
                        _opMdf: !1,
                        mat: new Matrix
                    }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
                },
                renderTransform: function() {
                    if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
                        var t, e = this.finalTransform.mat,
                            r = 0,
                            i = this.hierarchy.length;
                        if (!this.finalTransform._matMdf)
                            for (; r < i;) {
                                if (this.hierarchy[r].finalTransform.mProp._mdf) {
                                    this.finalTransform._matMdf = !0;
                                    break
                                }
                                r += 1
                            }
                        if (this.finalTransform._matMdf)
                            for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
                    }
                },
                globalToLocal: function(t) {
                    var e = [];
                    e.push(this.finalTransform);
                    for (var r = !0, i = this.comp; r;) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;
                    var s, a, n = e.length;
                    for (s = 0; s < n; s += 1) a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
                    return t
                },
                mHelper: new Matrix
            }, RenderableElement.prototype = {
                initRenderable: function() {
                    this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
                },
                addRenderableComponent: function(t) {
                    -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
                },
                removeRenderableComponent: function(t) {
                    -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
                },
                prepareRenderableFrame: function(t) {
                    this.checkLayerLimits(t)
                },
                checkTransparency: function() {
                    this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
                },
                checkLayerLimits: function(t) {
                    this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
                },
                renderRenderable: function() {
                    var t, e = this.renderableComponents.length;
                    for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
                },
                sourceRectAtTime: function() {
                    return {
                        top: 0,
                        left: 0,
                        width: 100,
                        height: 100
                    }
                },
                getLayerSize: function() {
                    return 5 === this.data.ty ? {
                        w: this.data.textData.width,
                        h: this.data.textData.height
                    } : {
                        w: this.data.width,
                        h: this.data.height
                    }
                }
            }, extendPrototype([RenderableElement, createProxyFunction({
                initElement: function(t, e, r) {
                    this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
                },
                hide: function() {
                    this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
                },
                show: function() {
                    this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
                },
                renderFrame: function() {
                    this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
                },
                renderInnerContent: function() {},
                prepareFrame: function(t) {
                    this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
                },
                destroy: function() {
                    this.innerElem = null, this.destroyBaseElement()
                }
            })], RenderableDOMElement), SVGStyleData.prototype.reset = function() {
                this.d = "", this._mdf = !1
            }, SVGShapeData.prototype.setAsAnimated = function() {
                this._isAnimated = !0
            }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function(t, e, r) {
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
                    k: 0
                }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
                    k: 0
                }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated
            }, SVGGradientFillStyleData.prototype.setGradientData = function(t, e) {
                var r = createElementID(),
                    i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
                i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
                var s, a, n, o = [];
                for (n = 4 * e.g.p, a = 0; a < n; a += 4) s = createNS("stop"), i.appendChild(s), o.push(s);
                t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o
            }, SVGGradientFillStyleData.prototype.setGradientOpacity = function(t, e) {
                if (this.g._hasOpacity && !this.g._collapsable) {
                    var r, i, s, a = createNS("mask"),
                        n = createNS("path");
                    a.appendChild(n);
                    var o = createElementID(),
                        h = createElementID();
                    a.setAttribute("id", h);
                    var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
                    l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
                    var p = this.stops;
                    for (i = 4 * t.g.p; i < s; i += 2)(r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
                    n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n
                }
            }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
            var SVGElementsRenderer = function() {
                var t = new Matrix,
                    e = new Matrix;

                function r(t, e, r) {
                    (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
                }

                function i(r, i, s) {
                    var a, n, o, h, l, p, f, m, c, d, u, y = i.styles.length,
                        g = i.lvl;
                    for (p = 0; p < y; p += 1) {
                        if (h = i.sh._mdf || s, i.styles[p].lvl < g) {
                            for (m = e.reset(), d = g - i.styles[p].lvl, u = i.transformers.length - 1; !h && d > 0;) h = i.transformers[u].mProps._mdf || h, d--, u--;
                            if (h)
                                for (d = g - i.styles[p].lvl, u = i.transformers.length - 1; d > 0;) c = i.transformers[u].mProps.v.props, m.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), d--, u--
                        } else m = t;
                        if (n = (f = i.sh.paths)._length, h) {
                            for (o = "", a = 0; a < n; a += 1)(l = f.shapes[a]) && l._length && (o += buildShapeString(l, l._length, l.c, m));
                            i.caches[p] = o
                        } else o = i.caches[p];
                        i.styles[p].d += !0 === r.hd ? "" : o, i.styles[p]._mdf = h || i.styles[p]._mdf
                    }
                }

                function s(t, e, r) {
                    var i = e.style;
                    (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v)
                }

                function a(t, e, r) {
                    n(t, e, r), o(t, e, r)
                }

                function n(t, e, r) {
                    var i, s, a, n, o, h = e.gf,
                        l = e.g._hasOpacity,
                        p = e.s.v,
                        f = e.e.v;
                    if (e.o._mdf || r) {
                        var m = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                        e.style.pElem.setAttribute(m, e.o.v)
                    }
                    if (e.s._mdf || r) {
                        var c = 1 === t.t ? "x1" : "cx",
                            d = "x1" === c ? "y1" : "cy";
                        h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]))
                    }
                    if (e.g._cmdf || r) {
                        i = e.cst;
                        var u = e.g.c;
                        for (a = i.length, s = 0; s < a; s += 1)(n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")")
                    }
                    if (l && (e.g._omdf || r)) {
                        var y = e.g.o;
                        for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1])
                    }
                    if (1 === t.t)(e.e._mdf || r) && (h.setAttribute("x2", f[0]), h.setAttribute("y2", f[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", f[0]), e.of.setAttribute("y2", f[1])));
                    else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
                        o || (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)));
                        var g = Math.atan2(f[1] - p[1], f[0] - p[0]),
                            v = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                            b = Math.cos(g + e.a.v) * v + p[0],
                            E = Math.sin(g + e.a.v) * v + p[1];
                        h.setAttribute("fx", b), h.setAttribute("fy", E), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E))
                    }
                }

                function o(t, e, r) {
                    var i = e.style,
                        s = e.d;
                    s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v))
                }
                return {
                    createRenderFunction: function(t) {
                        t.ty;
                        switch (t.ty) {
                            case "fl":
                                return s;
                            case "gf":
                                return n;
                            case "gs":
                                return a;
                            case "st":
                                return o;
                            case "sh":
                            case "el":
                            case "rc":
                            case "sr":
                                return i;
                            case "tr":
                                return r
                        }
                    }
                }
            }();

            function ShapeTransformManager() {
                this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
            }

            function CVShapeData(t, e, r, i) {
                this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
                var s = 4;
                "rc" == e.ty ? s = 5 : "el" == e.ty ? s = 6 : "sr" == e.ty && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
                var a, n, o = r.length;
                for (a = 0; a < o; a += 1) r[a].closed || (n = {
                    transforms: i.addTransformSequence(r[a].transforms),
                    trNodes: []
                }, this.styledShapes.push(n), r[a].elements.push(n))
            }

            function BaseElement() {}

            function NullElement(t, e, r) {
                this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy()
            }

            function SVGBaseElement() {}

            function IShapeElement() {}

            function ITextElement() {}

            function ICompElement() {}

            function IImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
                    top: 0,
                    left: 0,
                    width: this.assetData.w,
                    height: this.assetData.h
                }
            }

            function ISolidElement(t, e, r) {
                this.initElement(t, e, r)
            }

            function SVGCompElement(t, e, r) {
                this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
            }

            function SVGTextElement(t, e, r) {
                this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r)
            }

            function SVGShapeElement(t, e, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = []
            }

            function SVGTintFilter(t, e) {
                this.filterManager = e;
                var r = createNS("feColorMatrix");
                if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
                    var i, s = createNS("feMerge");
                    t.appendChild(s), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(i)
                }
            }

            function SVGFillFilter(t, e) {
                this.filterManager = e;
                var r = createNS("feColorMatrix");
                r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r
            }

            function SVGGaussianBlurEffect(t, e) {
                t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
                var r = createNS("feGaussianBlur");
                t.appendChild(r), this.feGaussianBlur = r
            }

            function SVGStrokeEffect(t, e) {
                this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = []
            }

            function SVGTritoneFilter(t, e) {
                this.filterManager = e;
                var r = createNS("feColorMatrix");
                r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
                var i = createNS("feComponentTransfer");
                i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
                var s = createNS("feFuncR");
                s.setAttribute("type", "table"), i.appendChild(s), this.feFuncR = s;
                var a = createNS("feFuncG");
                a.setAttribute("type", "table"), i.appendChild(a), this.feFuncG = a;
                var n = createNS("feFuncB");
                n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n
            }

            function SVGProLevelsFilter(t, e) {
                this.filterManager = e;
                var r = this.filterManager.effectElements,
                    i = createNS("feComponentTransfer");
                (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i))
            }

            function SVGDropShadowEffect(t, e) {
                var r = e.container.globalData.renderConfig.filterSize;
                t.setAttribute("x", r.x), t.setAttribute("y", r.y), t.setAttribute("width", r.width), t.setAttribute("height", r.height), this.filterManager = e;
                var i = createNS("feGaussianBlur");
                i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
                var s = createNS("feOffset");
                s.setAttribute("dx", "25"), s.setAttribute("dy", "0"), s.setAttribute("in", "drop_shadow_1"), s.setAttribute("result", "drop_shadow_2"), this.feOffset = s, t.appendChild(s);
                var a = createNS("feFlood");
                a.setAttribute("flood-color", "#00ff00"), a.setAttribute("flood-opacity", "1"), a.setAttribute("result", "drop_shadow_3"), this.feFlood = a, t.appendChild(a);
                var n = createNS("feComposite");
                n.setAttribute("in", "drop_shadow_3"), n.setAttribute("in2", "drop_shadow_2"), n.setAttribute("operator", "in"), n.setAttribute("result", "drop_shadow_4"), t.appendChild(n);
                var o, h = createNS("feMerge");
                t.appendChild(h), o = createNS("feMergeNode"), h.appendChild(o), (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = h, this.originalNodeAdded = !1, h.appendChild(o)
            }
            ShapeTransformManager.prototype = {
                addTransformSequence: function(t) {
                    var e, r = t.length,
                        i = "_";
                    for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
                    var s = this.sequences[i];
                    return s || (s = {
                        transforms: [].concat(t),
                        finalTransform: new Matrix,
                        _mdf: !1
                    }, this.sequences[i] = s, this.sequenceList.push(s)), s
                },
                processSequence: function(t, e) {
                    for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
                        if (t.transforms[i].transform.mProps._mdf) {
                            a = !0;
                            break
                        }
                        i += 1
                    }
                    if (a)
                        for (t.finalTransform.reset(), i = s - 1; i >= 0; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
                    t._mdf = a
                },
                processSequences: function(t) {
                    var e, r = this.sequenceList.length;
                    for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t)
                },
                getNewKey: function() {
                    return "_" + this.transform_key_count++
                }
            }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
                checkMasks: function() {
                    if (!this.data.hasMask) return !1;
                    for (var t = 0, e = this.data.masksProperties.length; t < e;) {
                        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
                        t += 1
                    }
                    return !1
                },
                initExpressions: function() {
                    this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                    var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
                    this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
                },
                setBlendMode: function() {
                    var t = getBlendMode(this.data.bm);
                    (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
                },
                initBaseData: function(t, e, r) {
                    this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
                },
                getType: function() {
                    return this.type
                },
                sourceRectAtTime: function() {}
            }, NullElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
            }, NullElement.prototype.renderFrame = function() {}, NullElement.prototype.getBaseElement = function() {
                return null
            }, NullElement.prototype.destroy = function() {}, NullElement.prototype.sourceRectAtTime = function() {}, NullElement.prototype.hide = function() {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
                initRendererElement: function() {
                    this.layerElement = createNS("g")
                },
                createContainerElements: function() {
                    this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
                    var t, e, r, i = null;
                    if (this.data.td) {
                        if (3 == this.data.td || 1 == this.data.td) {
                            var s = createNS("mask");
                            s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), i = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, s.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"))
                        } else if (2 == this.data.td) {
                            var a = createNS("mask");
                            a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
                            var n = createNS("g");
                            a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
                            var o = createNS("feComponentTransfer");
                            o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
                            var h = createNS("feFuncA");
                            h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
                            var l = createNS("rect");
                            l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(l), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(a)
                        }
                    } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
                    if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
                        var p = createNS("clipPath"),
                            f = createNS("path");
                        f.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                        var m = createElementID();
                        if (p.setAttribute("id", m), p.appendChild(f), this.globalData.defs.appendChild(p), this.checkMasks()) {
                            var c = createNS("g");
                            c.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")"), c.appendChild(this.layerElement), this.transformedElement = c, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                        } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")")
                    }
                    0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                    this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
                },
                destroyBaseElement: function() {
                    this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
                },
                getBaseElement: function() {
                    return this.data.hd ? null : this.baseElement
                },
                createRenderableComponents: function() {
                    this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
                },
                setMatte: function(t) {
                    this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
                }
            }, IShapeElement.prototype = {
                addShapeToModifiers: function(t) {
                    var e, r = this.shapeModifiers.length;
                    for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t)
                },
                isShapeInAnimatedModifiers: function(t) {
                    for (var e = this.shapeModifiers.length; 0 < e;)
                        if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
                    return !1
                },
                renderModifiers: function() {
                    if (this.shapeModifiers.length) {
                        var t, e = this.shapes.length;
                        for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
                        for (t = (e = this.shapeModifiers.length) - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame)
                    }
                },
                lcEnum: {
                    1: "butt",
                    2: "round",
                    3: "square"
                },
                ljEnum: {
                    1: "miter",
                    2: "round",
                    3: "bevel"
                },
                searchProcessedElement: function(t) {
                    for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
                        if (e[r].elem === t) return e[r].pos;
                        r += 1
                    }
                    return 0
                },
                addProcessedElement: function(t, e) {
                    for (var r = this.processedElements, i = r.length; i;)
                        if (r[i -= 1].elem === t) return void(r[i].pos = e);
                    r.push(new ProcessedElement(t, e))
                },
                prepareFrame: function(t) {
                    this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
                }
            }, ITextElement.prototype.initElement = function(t, e, r) {
                this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
            }, ITextElement.prototype.prepareFrame = function(t) {
                this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
            }, ITextElement.prototype.createPathShape = function(t, e) {
                var r, i, s = e.length,
                    a = "";
                for (r = 0; r < s; r += 1) i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t);
                return a
            }, ITextElement.prototype.updateDocumentData = function(t, e) {
                this.textProperty.updateDocumentData(t, e)
            }, ITextElement.prototype.canResizeFont = function(t) {
                this.textProperty.canResizeFont(t)
            }, ITextElement.prototype.setMinimumFontSize = function(t) {
                this.textProperty.setMinimumFontSize(t)
            }, ITextElement.prototype.applyTextPropertiesToMatrix = function(t, e, r, i, s) {
                switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
                    case 1:
                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
                        break;
                    case 2:
                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
                }
                e.translate(i, s, 0)
            }, ITextElement.prototype.buildColor = function(t) {
                return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
            }, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function() {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function(t, e, r) {
                this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
            }, ICompElement.prototype.prepareFrame = function(t) {
                if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
                    if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
                    else {
                        var e = this.tm.v;
                        e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
                    }
                    var r, i = this.elements.length;
                    for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0))
                }
            }, ICompElement.prototype.renderInnerContent = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }, ICompElement.prototype.setElements = function(t) {
                this.elements = t
            }, ICompElement.prototype.getElements = function() {
                return this.elements
            }, ICompElement.prototype.destroyElements = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
            }, ICompElement.prototype.destroy = function() {
                this.destroyElements(), this.destroyBaseElement()
            }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData);
                this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
            }, IImageElement.prototype.sourceRectAtTime = function() {
                return this.sourceRect
            }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function() {
                var t = createNS("rect");
                t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
            }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function() {
                this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
            }, SVGTextElement.prototype.buildTextContents = function(t) {
                for (var e = 0, r = t.length, i = [], s = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;
                return i.push(s), i
            }, SVGTextElement.prototype.buildNewText = function() {
                var t, e, r = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
                var i = this.globalData.fontManager.getFontByName(r.f);
                if (i.fClass) this.layerElement.setAttribute("class", i.fClass);
                else {
                    this.layerElement.setAttribute("font-family", i.fFamily);
                    var s = r.fWeight,
                        a = r.fStyle;
                    this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s)
                }
                this.layerElement.setAttribute("aria-label", r.t);
                var n, o = r.l || [],
                    h = !!this.globalData.fontManager.chars;
                e = o.length;
                var l, p = this.mHelper,
                    f = "",
                    m = this.data.singleShape,
                    c = 0,
                    d = 0,
                    u = !0,
                    y = r.tr / 1e3 * r.finalSize;
                if (!m || h || r.sz) {
                    var g, v, b = this.textSpans.length;
                    for (t = 0; t < e; t += 1) h && m && 0 !== t || (n = b > t ? this.textSpans[t] : createNS(h ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), m && (o[t].n && (c = -y, d += r.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, c, d), c += o[t].l || 0, c += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], m ? f += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (m && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
                    m && n && n.setAttribute("d", f)
                } else {
                    var E = this.textContainer,
                        x = "start";
                    switch (r.j) {
                        case 1:
                            x = "end";
                            break;
                        case 2:
                            x = "middle"
                    }
                    E.setAttribute("text-anchor", x), E.setAttribute("letter-spacing", y);
                    var S = this.buildTextContents(r.finalText);
                    for (e = S.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)(n = this.textSpans[t] || createNS("tspan")).textContent = S[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", E.appendChild(n), this.textSpans[t] = n, d += r.finalLineHeight;
                    this.layerElement.appendChild(E)
                }
                for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;
                this._sizeChanged = !0
            }, SVGTextElement.prototype.sourceRectAtTime = function(t) {
                if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
                    this._sizeChanged = !1;
                    var e = this.layerElement.getBBox();
                    this.bbox = {
                        top: e.y,
                        left: e.x,
                        width: e.width,
                        height: e.height
                    }
                }
                return this.bbox
            }, SVGTextElement.prototype.renderInnerContent = function() {
                if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
                    var t, e;
                    this._sizeChanged = !0;
                    var r, i, s = this.textAnimator.renderedLetters,
                        a = this.textProperty.currentData.l;
                    for (e = a.length, t = 0; t < e; t += 1) a[t].n || (r = s[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc))
                }
            }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function() {}, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function() {}, SVGShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
            }, SVGShapeElement.prototype.filterUniqueShapes = function() {
                var t, e, r, i, s = this.shapes.length,
                    a = this.stylesList.length,
                    n = [],
                    o = !1;
                for (r = 0; r < a; r += 1) {
                    for (i = this.stylesList[r], o = !1, n.length = 0, t = 0; t < s; t += 1) - 1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
                    n.length > 1 && o && this.setShapesAsAnimated(n)
                }
            }, SVGShapeElement.prototype.setShapesAsAnimated = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1) t[e].setAsAnimated()
            }, SVGShapeElement.prototype.createStyleElement = function(t, e) {
                var r, i = new SVGStyleData(t, e),
                    s = i.pElem;
                if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);
                else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);
                else if ("gf" === t.ty || "gs" === t.ty) {
                    r = new("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"))
                }
                return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r
            }, SVGShapeElement.prototype.createGroupElement = function(t) {
                var e = new ShapeGroupData;
                return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
            }, SVGShapeElement.prototype.createTransformElement = function(t, e) {
                var r = TransformPropertyFactory.getTransformProperty(this, t, this),
                    i = new SVGTransformData(r, r.o, e);
                return this.addToAnimatedContents(t, i), i
            }, SVGShapeElement.prototype.createShapeElement = function(t, e, r) {
                var i = 4;
                "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
                var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
                return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s
            }, SVGShapeElement.prototype.addToAnimatedContents = function(t, e) {
                for (var r = 0, i = this.animatedContents.length; r < i;) {
                    if (this.animatedContents[r].element === e) return;
                    r += 1
                }
                this.animatedContents.push({
                    fn: SVGElementsRenderer.createRenderFunction(t),
                    element: e,
                    data: t
                })
            }, SVGShapeElement.prototype.setElementStyles = function(t) {
                var e, r = t.styles,
                    i = this.stylesList.length;
                for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e])
            }, SVGShapeElement.prototype.reloadShapes = function() {
                this._isFirstFrame = !0;
                var t, e = this.itemsData.length;
                for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
                this.renderModifiers()
            }, SVGShapeElement.prototype.searchShapes = function(t, e, r, i, s, a, n) {
                var o, h, l, p, f, m, c = [].concat(a),
                    d = t.length - 1,
                    u = [],
                    y = [];
                for (o = d; o >= 0; o -= 1) {
                    if ((m = this.searchProcessedElement(t[o])) ? e[o] = r[m - 1] : t[o]._render = n, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) m ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);
                    else if ("gr" == t[o].ty) {
                        if (m)
                            for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];
                        else e[o] = this.createGroupElement(t[o]);
                        this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr)
                    } else "tr" == t[o].ty ? (m || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (m || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (m ? (f = e[o]).closed = !1 : ((f = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = f, this.shapeModifiers.push(f)), y.push(f)) : "rp" == t[o].ty && (m ? (f = e[o]).closed = !0 : (f = ShapeModifiers.getModifier(t[o].ty), e[o] = f, f.init(this, t, o, e), this.shapeModifiers.push(f), n = !1), y.push(f));
                    this.addProcessedElement(t[o], o + 1)
                }
                for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
                for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0
            }, SVGShapeElement.prototype.renderInnerContent = function() {
                this.renderModifiers();
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1) this.stylesList[t].reset();
                for (this.renderShape(), t = 0; t < e; t += 1)(this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
            }, SVGShapeElement.prototype.renderShape = function() {
                var t, e, r = this.animatedContents.length;
                for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
            }, SVGShapeElement.prototype.destroy = function() {
                this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
            }, SVGTintFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v,
                        r = this.filterManager.effectElements[1].p.v,
                        i = this.filterManager.effectElements[2].p.v / 100;
                    this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
                }
            }, SVGFillFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[2].p.v,
                        r = this.filterManager.effectElements[6].p.v;
                    this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
                }
            }, SVGGaussianBlurEffect.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = .3 * this.filterManager.effectElements[0].p.v,
                        r = this.filterManager.effectElements[1].p.v,
                        i = 3 == r ? 0 : e,
                        s = 2 == r ? 0 : e;
                    this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
                    var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
                    this.feGaussianBlur.setAttribute("edgeMode", a)
                }
            }, SVGStrokeEffect.prototype.initialize = function() {
                var t, e, r, i, s = this.elem.layerElement.children || this.elem.layerElement.childNodes;
                for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
                    p: t,
                    m: r
                });
                if (3 === this.filterManager.effectElements[10].p.v) {
                    var a = createNS("mask"),
                        n = createElementID();
                    a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
                    var o = createNS("g");
                    for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) o.appendChild(s[0]);
                    this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff")
                } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
                    if (2 === this.filterManager.effectElements[10].p.v)
                        for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) this.elem.layerElement.removeChild(s[0]);
                    this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
                }
                this.initialized = !0, this.pathMasker = e
            }, SVGStrokeEffect.prototype.renderFrame = function(t) {
                this.initialized || this.initialize();
                var e, r, i, s = this.paths.length;
                for (e = 0; e < s; e += 1)
                    if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
                        var a;
                        if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                            var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                                o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                                h = i.getTotalLength();
                            a = "0 0 0 " + h * n + " ";
                            var l, p = h * (o - n),
                                f = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                                m = Math.floor(p / f);
                            for (l = 0; l < m; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                            a += "0 " + 10 * h + " 0 0"
                        } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                        i.setAttribute("stroke-dasharray", a)
                    } if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
                    var c = this.filterManager.effectElements[3].p.v;
                    this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * c[0]) + "," + bm_floor(255 * c[1]) + "," + bm_floor(255 * c[2]) + ")")
                }
            }, SVGTritoneFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v,
                        r = this.filterManager.effectElements[1].p.v,
                        i = this.filterManager.effectElements[2].p.v,
                        s = i[0] + " " + r[0] + " " + e[0],
                        a = i[1] + " " + r[1] + " " + e[1],
                        n = i[2] + " " + r[2] + " " + e[2];
                    this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n)
                }
            }, SVGProLevelsFilter.prototype.createFeFunc = function(t, e) {
                var r = createNS(t);
                return r.setAttribute("type", "table"), e.appendChild(r), r
            }, SVGProLevelsFilter.prototype.getTableValue = function(t, e, r, i, s) {
                for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
                        length: 256
                    }), f = 0, m = s - i, c = e - t; o <= 256;) n = (a = o / 256) <= h ? c < 0 ? s : i : a >= l ? c < 0 ? i : s : i + m * Math.pow((a - t) / c, 1 / r), p[f++] = n, o += 256 / 255;
                return p.join(" ")
            }, SVGProLevelsFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e, r = this.filterManager.effectElements;
                    this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e))
                }
            }, SVGDropShadowEffect.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
                        var e = this.filterManager.effectElements[0].p.v;
                        this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
                    }
                    if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
                        var r = this.filterManager.effectElements[3].p.v,
                            i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                            s = r * Math.cos(i),
                            a = r * Math.sin(i);
                        this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a)
                    }
                }
            };
            var _svgMatteSymbols = [];

            function SVGMatte3Effect(t, e, r) {
                this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement
            }

            function SVGEffects(t) {
                var e, r, i = t.data.ef ? t.data.ef.length : 0,
                    s = createElementID(),
                    a = filtersFactory.createFilter(s),
                    n = 0;
                for (this.filters = [], e = 0; e < i; e += 1) r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, r = new SVGGaussianBlurEffect(a, t.effectsManager.effectElements[e])), r && this.filters.push(r);
                n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this)
            }

            function CVContextData() {
                this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1;
                var t;
                for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
                this._length = 15
            }

            function CVBaseElement() {}

            function CVImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r)
            }

            function CVCompElement(t, e, r) {
                this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
            }

            function CVMaskElement(t, e) {
                this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
                var r, i = this.masksProperties.length,
                    s = !1;
                for (r = 0; r < i; r++) "n" !== this.masksProperties[r].mode && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
                this.hasMasks = s, s && this.element.addRenderableComponent(this)
            }

            function CVShapeElement(t, e, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, r)
            }

            function CVSolidElement(t, e, r) {
                this.initElement(t, e, r)
            }

            function CVTextElement(t, e, r) {
                this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
                    fill: "rgba(0,0,0,0)",
                    stroke: "rgba(0,0,0,0)",
                    sWidth: 0,
                    fValue: ""
                }, this.initElement(t, e, r)
            }

            function CVEffects() {}

            function HBaseElement(t, e, r) {}

            function HSolidElement(t, e, r) {
                this.initElement(t, e, r)
            }

            function HCompElement(t, e, r) {
                this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
            }

            function HShapeElement(t, e, r) {
                this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }
            }

            function HTextElement(t, e, r) {
                this.textSpans = [], this.textPaths = [], this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r)
            }

            function HImageElement(t, e, r) {
                this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r)
            }

            function HCameraElement(t, e, r) {
                this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
                var i = PropertyFactory.getProp;
                if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
                    var s, a = t.ks.or.k.length;
                    for (s = 0; s < a; s += 1) t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null
                }
                this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix, this._prevMat = new Matrix, this._isFirstFrame = !0, this.finalTransform = {
                    mProp: this
                }
            }

            function HEffects() {}
            SVGMatte3Effect.prototype.findSymbol = function(t) {
                for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
                    if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
                    e += 1
                }
                return null
            }, SVGMatte3Effect.prototype.replaceInParent = function(t, e) {
                var r = t.layerElement.parentNode;
                if (r) {
                    for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) a += 1;
                    a <= n - 2 && (i = s[a + 1]);
                    var o = createNS("use");
                    o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o)
                }
            }, SVGMatte3Effect.prototype.setElementAsMask = function(t, e) {
                if (!this.findSymbol(e)) {
                    var r = createElementID(),
                        i = createNS("mask");
                    i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
                    var s = t.globalData.defs;
                    s.appendChild(i);
                    var a = createNS("symbol");
                    a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
                    var n = createNS("use");
                    n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show()
                }
                t.setMatte(e.layerId)
            }, SVGMatte3Effect.prototype.initialize = function() {
                for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
                this.initialized = !0
            }, SVGMatte3Effect.prototype.renderFrame = function() {
                this.initialized || this.initialize()
            }, SVGEffects.prototype.renderFrame = function(t) {
                var e, r = this.filters.length;
                for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t)
            }, CVContextData.prototype.duplicate = function() {
                var t = 2 * this._length,
                    e = this.savedOp;
                this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
                var r = 0;
                for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
                this._length = t
            }, CVContextData.prototype.reset = function() {
                this.cArrPos = 0, this.cTr.reset(), this.cO = 1
            }, CVBaseElement.prototype = {
                createElements: function() {},
                initRendererElement: function() {},
                createContainerElements: function() {
                    this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this)
                },
                createContent: function() {},
                setBlendMode: function() {
                    var t = this.globalData;
                    if (t.blendMode !== this.data.bm) {
                        t.blendMode = this.data.bm;
                        var e = getBlendMode(this.data.bm);
                        t.canvasContext.globalCompositeOperation = e
                    }
                },
                createRenderableComponents: function() {
                    this.maskManager = new CVMaskElement(this.data, this)
                },
                hideElement: function() {
                    this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
                },
                showElement: function() {
                    this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
                },
                renderFrame: function() {
                    if (!this.hidden && !this.data.hd) {
                        this.renderTransform(), this.renderRenderable(), this.setBlendMode();
                        var t = 0 === this.data.ty;
                        this.globalData.renderer.save(t), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(t), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1)
                    }
                },
                destroy: function() {
                    this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
                },
                mHelper: new Matrix
            }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function() {
                if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
                    var t = createTag("canvas");
                    t.width = this.assetData.w, t.height = this.assetData.h;
                    var e, r, i = t.getContext("2d"),
                        s = this.img.width,
                        a = this.img.height,
                        n = s / a,
                        o = this.assetData.w / this.assetData.h,
                        h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
                    n > o && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = a) * o : r = (e = s) / o, i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t
                }
            }, CVImageElement.prototype.renderInnerContent = function(t) {
                this.canvasContext.drawImage(this.img, 0, 0)
            }, CVImageElement.prototype.destroy = function() {
                this.img = null
            }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function() {
                var t, e = this.canvasContext;
                for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; t >= 0; t -= 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }, CVCompElement.prototype.destroy = function() {
                var t;
                for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
                this.layers = null, this.elements = null
            }, CVMaskElement.prototype.renderFrame = function() {
                if (this.hasMasks) {
                    var t, e, r, i, s = this.element.finalTransform.mat,
                        a = this.element.canvasContext,
                        n = this.masksProperties.length;
                    for (a.beginPath(), t = 0; t < n; t++)
                        if ("n" !== this.masksProperties[t].mode) {
                            this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i = this.viewData[t].v, e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0), a.moveTo(e[0], e[1]);
                            var o, h = i._length;
                            for (o = 1; o < h; o++) r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                            r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
                        } this.element.globalData.renderer.save(!0), a.clip()
                }
            }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function() {
                this.element = null
            }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
                opacity: 1,
                _opMdf: !1
            }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
            }, CVShapeElement.prototype.createStyleElement = function(t, e) {
                var r = {
                        data: t,
                        type: t.ty,
                        preTransforms: this.transformsManager.addTransformSequence(e),
                        transforms: [],
                        elements: [],
                        closed: !0 === t.hd
                    },
                    i = {};
                if ("fl" == t.ty || "st" == t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bm_floor(i.c.v[0]) + "," + bm_floor(i.c.v[1]) + "," + bm_floor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
                        k: 0
                    }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
                        k: 0
                    }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
                    if (r.lc = this.lcEnum[t.lc] || "round", r.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
                        var s = new DashProperty(this, t.d, "canvas", this);
                        i.d = s, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0])
                    }
                } else r.r = 2 === t.r ? "evenodd" : "nonzero";
                return this.stylesList.push(r), i.style = r, i
            }, CVShapeElement.prototype.createGroupElement = function(t) {
                return {
                    it: [],
                    prevViewData: []
                }
            }, CVShapeElement.prototype.createTransformElement = function(t) {
                return {
                    transform: {
                        opacity: 1,
                        _opMdf: !1,
                        key: this.transformsManager.getNewKey(),
                        op: PropertyFactory.getProp(this, t.o, 0, .01, this),
                        mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
                    }
                }
            }, CVShapeElement.prototype.createShapeElement = function(t) {
                var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
                return this.shapes.push(e), this.addShapeToModifiers(e), e
            }, CVShapeElement.prototype.reloadShapes = function() {
                this._isFirstFrame = !0;
                var t, e = this.itemsData.length;
                for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
                this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
            }, CVShapeElement.prototype.addTransformToStyleList = function(t) {
                var e, r = this.stylesList.length;
                for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
            }, CVShapeElement.prototype.removeTransformFromStyleList = function() {
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
            }, CVShapeElement.prototype.closeStyles = function(t) {
                var e, r = t.length;
                for (e = 0; e < r; e += 1) t[e].closed = !0
            }, CVShapeElement.prototype.searchShapes = function(t, e, r, i, s) {
                var a, n, o, h, l, p, f = t.length - 1,
                    m = [],
                    c = [],
                    d = [].concat(s);
                for (a = f; a >= 0; a -= 1) {
                    if ((h = this.searchProcessedElement(t[a])) ? e[a] = r[h - 1] : t[a]._shouldRender = i, "fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), m.push(e[a].style);
                    else if ("gr" == t[a].ty) {
                        if (h)
                            for (o = e[a].it.length, n = 0; n < o; n += 1) e[a].prevViewData[n] = e[a].it[n];
                        else e[a] = this.createGroupElement(t[a]);
                        this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d)
                    } else "tr" == t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" == t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), e[a] = l, l.init(this, t, a, e), this.shapeModifiers.push(l), i = !1), c.push(l));
                    this.addProcessedElement(t[a], a + 1)
                }
                for (this.removeTransformFromStyleList(), this.closeStyles(m), f = c.length, a = 0; a < f; a += 1) c[a].closed = !0
            }, CVShapeElement.prototype.renderInnerContent = function() {
                this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
            }, CVShapeElement.prototype.renderShapeTransform = function(t, e) {
                (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
            }, CVShapeElement.prototype.drawLayer = function() {
                var t, e, r, i, s, a, n, o, h, l = this.stylesList.length,
                    p = this.globalData.renderer,
                    f = this.globalData.canvasContext;
                for (t = 0; t < l; t += 1)
                    if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
                        for (p.save(), a = h.elements, "st" === o || "gs" === o ? (f.strokeStyle = "st" === o ? h.co : h.grd, f.lineWidth = h.wi, f.lineCap = h.lc, f.lineJoin = h.lj, f.miterLimit = h.ml || 0) : f.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && f.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e = 0; e < r; e += 1) {
                            for ("st" !== o && "gs" !== o || (f.beginPath(), h.da && (f.setLineDash(h.da), f.lineDashOffset = h.do)), s = (n = a[e].trNodes).length, i = 0; i < s; i += 1) "m" == n[i].t ? f.moveTo(n[i].p[0], n[i].p[1]) : "c" == n[i].t ? f.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : f.closePath();
                            "st" !== o && "gs" !== o || (f.stroke(), h.da && f.setLineDash(this.dashResetter))
                        }
                        "st" !== o && "gs" !== o && f.fill(h.r), p.restore()
                    }
            }, CVShapeElement.prototype.renderShape = function(t, e, r, i) {
                var s, a;
                for (a = t, s = e.length - 1; s >= 0; s -= 1) "tr" == e[s].ty ? (a = r[s].transform, this.renderShapeTransform(t, a)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], r[s]) : "fl" == e[s].ty ? this.renderFill(e[s], r[s], a) : "st" == e[s].ty ? this.renderStroke(e[s], r[s], a) : "gf" == e[s].ty || "gs" == e[s].ty ? this.renderGradientFill(e[s], r[s], a) : "gr" == e[s].ty ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
                i && this.drawLayer()
            }, CVShapeElement.prototype.renderStyledShape = function(t, e) {
                if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
                    var r, i, s, a = t.trNodes,
                        n = e.paths,
                        o = n._length;
                    a.length = 0;
                    var h = t.transforms.finalTransform;
                    for (s = 0; s < o; s += 1) {
                        var l = n.shapes[s];
                        if (l && l.v) {
                            for (i = l._length, r = 1; r < i; r += 1) 1 === r && a.push({
                                t: "m",
                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                            }), a.push({
                                t: "c",
                                pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
                            });
                            1 === i && a.push({
                                t: "m",
                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                            }), l.c && i && (a.push({
                                t: "c",
                                pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
                            }), a.push({
                                t: "z"
                            }))
                        }
                    }
                    t.trNodes = a
                }
            }, CVShapeElement.prototype.renderPath = function(t, e) {
                if (!0 !== t.hd && t._shouldRender) {
                    var r, i = e.styledShapes.length;
                    for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh)
                }
            }, CVShapeElement.prototype.renderFill = function(t, e, r) {
                var i = e.style;
                (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
            }, CVShapeElement.prototype.renderGradientFill = function(t, e, r) {
                var i = e.style;
                if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
                    var s = this.globalData.canvasContext,
                        a = e.s.v,
                        n = e.e.v;
                    if (1 === t.t) m = s.createLinearGradient(a[0], a[1], n[0], n[1]);
                    else var o = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2)),
                        h = Math.atan2(n[1] - a[1], n[0] - a[0]),
                        l = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                        p = Math.cos(h + e.a.v) * l + a[0],
                        f = Math.sin(h + e.a.v) * l + a[1],
                        m = s.createRadialGradient(p, f, 0, a[0], a[1], o);
                    var c, d = t.g.p,
                        u = e.g.c,
                        y = 1;
                    for (c = 0; c < d; c += 1) e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * c + 1]), m.addColorStop(u[4 * c] / 100, "rgba(" + u[4 * c + 1] + "," + u[4 * c + 2] + "," + u[4 * c + 3] + "," + y + ")");
                    i.grd = m
                }
                i.coOp = e.o.v * r.opacity
            }, CVShapeElement.prototype.renderStroke = function(t, e, r) {
                var i = e.style,
                    s = e.d;
                s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i.do = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
            }, CVShapeElement.prototype.destroy = function() {
                this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
            }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function() {
                var t = this.canvasContext;
                t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
            }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = !1;
                t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
                var r = !1;
                t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
                var i, s, a = this.globalData.fontManager.getFontByName(t.f),
                    n = t.l,
                    o = this.mHelper;
                this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
                var h, l, p, f, m, c, d, u, y, g, v = this.data.singleShape,
                    b = t.tr / 1e3 * t.finalSize,
                    E = 0,
                    x = 0,
                    S = !0,
                    P = 0;
                for (i = 0; i < s; i += 1) {
                    for (l = (h = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), v && n[i].n && (E = -b, x += t.yOffset, x += S ? 1 : 0, S = !1), d = (m = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, n[i].line, E, x), y = createSizedArray(d), c = 0; c < d; c += 1) {
                        for (f = m[c].ks.k.i.length, u = m[c].ks.k, g = [], p = 1; p < f; p += 1) 1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
                        g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[c] = g
                    }
                    v && (E += n[i].l, E += b), this.textSpans[P] ? this.textSpans[P].elem = y : this.textSpans[P] = {
                        elem: y
                    }, P += 1
                }
            }, CVTextElement.prototype.renderInnerContent = function() {
                var t, e, r, i, s, a, n = this.canvasContext;
                this.finalTransform.mat.props;
                n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
                var o, h = this.textAnimator.renderedLetters,
                    l = this.textProperty.currentData.l;
                e = l.length;
                var p, f, m = null,
                    c = null,
                    d = null;
                for (t = 0; t < e; t += 1)
                    if (!l[t].n) {
                        if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
                            for (o && o.fc ? m !== o.fc && (m = o.fc, n.fillStyle = o.fc) : m !== this.values.fill && (m = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
                                for (a = (f = p[r]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(f[s], f[s + 1], f[s + 2], f[s + 3], f[s + 4], f[s + 5]);
                            this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                        }
                        if (this.stroke) {
                            for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? c !== o.sc && (c = o.sc, n.strokeStyle = o.sc) : c !== this.values.stroke && (c = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
                                for (a = (f = p[r]).length, this.globalData.canvasContext.moveTo(f[0], f[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(f[s], f[s + 1], f[s + 2], f[s + 3], f[s + 4], f[s + 5]);
                            this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                        }
                        o && this.globalData.renderer.restore()
                    }
            }, CVEffects.prototype.renderFrame = function() {}, HBaseElement.prototype = {
                checkBlendMode: function() {},
                initRendererElement: function() {
                    this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement)
                },
                createContainerElements: function() {
                    this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                    this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v)
                },
                renderFrame: function() {
                    this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
                },
                destroy: function() {
                    this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
                },
                createRenderableComponents: function() {
                    this.maskManager = new MaskElement(this.data, this, this.globalData)
                },
                addEffects: function() {},
                setMatte: function() {}
            }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function() {
                var t;
                this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t)
            }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function() {
                this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
            }, HCompElement.prototype.addTo3dContainer = function(t, e) {
                for (var r, i = 0; i < e;) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
                r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
            }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function() {
                var t;
                if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;
                else {
                    t = createNS("svg");
                    var e = this.comp.data ? this.comp.data : this.globalData.compSize;
                    t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t)
                }
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t
            }, HShapeElement.prototype.getTransformedPoint = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
                return e
            }, HShapeElement.prototype.calculateShapeBoundingBox = function(t, e) {
                var r, i, s, a, n, o = t.sh.v,
                    h = t.transformers,
                    l = o._length;
                if (!(l <= 1)) {
                    for (r = 0; r < l - 1; r += 1) i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, s, a, n, e);
                    o.c && (i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, s, a, n, e))
                }
            }, HShapeElement.prototype.checkBounds = function(t, e, r, i, s) {
                this.getBoundsOfCurve(t, e, r, i);
                var a = this.shapeBoundingBox;
                s.x = bm_min(a.left, s.x), s.xMax = bm_max(a.right, s.xMax), s.y = bm_min(a.top, s.y), s.yMax = bm_max(a.bottom, s.yMax)
            }, HShapeElement.prototype.shapeBoundingBox = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, HShapeElement.prototype.tempBoundingBox = {
                x: 0,
                xMax: 0,
                y: 0,
                yMax: 0,
                width: 0,
                height: 0
            }, HShapeElement.prototype.getBoundsOfCurve = function(t, e, r, i) {
                for (var s, a, n, o, h, l, p, f = [
                        [t[0], i[0]],
                        [t[1], i[1]]
                    ], m = 0; m < 2; ++m)
                    if (a = 6 * t[m] - 12 * e[m] + 6 * r[m], s = -3 * t[m] + 9 * e[m] - 9 * r[m] + 3 * i[m], n = 3 * e[m] - 3 * t[m], a |= 0, n |= 0, 0 !== (s |= 0))(h = a * a - 4 * n * s) < 0 || (0 < (l = (-a + bm_sqrt(h)) / (2 * s)) && l < 1 && f[m].push(this.calculateF(l, t, e, r, i, m)), 0 < (p = (-a - bm_sqrt(h)) / (2 * s)) && p < 1 && f[m].push(this.calculateF(p, t, e, r, i, m)));
                    else {
                        if (0 === a) continue;
                        0 < (o = -n / a) && o < 1 && f[m].push(this.calculateF(o, t, e, r, i, m))
                    } this.shapeBoundingBox.left = bm_min.apply(null, f[0]), this.shapeBoundingBox.top = bm_min.apply(null, f[1]), this.shapeBoundingBox.right = bm_max.apply(null, f[0]), this.shapeBoundingBox.bottom = bm_max.apply(null, f[1])
            }, HShapeElement.prototype.calculateF = function(t, e, r, i, s, a) {
                return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bm_pow(t, 2) * i[a] + bm_pow(t, 3) * s[a]
            }, HShapeElement.prototype.calculateBoundingBox = function(t, e) {
                var r, i = t.length;
                for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e)
            }, HShapeElement.prototype.currentBoxContains = function(t) {
                return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
            }, HShapeElement.prototype.renderInnerContent = function() {
                if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
                    var t = this.tempBoundingBox,
                        e = 999999;
                    if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
                    var r = !1;
                    this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), (r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                }
            }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function() {
                if (this.isMasked = this.checkMasks(), this.isMasked) {
                    this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
                    var t = createNS("g");
                    this.maskedElement.appendChild(t), this.innerElem = t
                } else this.renderType = "html", this.innerElem = this.layerElement;
                this.checkParenting()
            }, HTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = this.innerElem.style;
                e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
                var r, i, s = this.globalData.fontManager.getFontByName(t.f);
                if (!this.globalData.fontManager.chars)
                    if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", s.fClass) this.innerElem.className = s.fClass;
                    else {
                        e.fontFamily = s.fFamily;
                        var a = t.fWeight,
                            n = t.fStyle;
                        e.fontStyle = n, e.fontWeight = a
                    } var o, h, l, p = t.l;
                i = p.length;
                var f, m = this.mHelper,
                    c = "",
                    d = 0;
                for (r = 0; r < i; r += 1) {
                    if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? l = (h = this.textSpans[d]).children[0] : ((h = createTag("div")).style.lineHeight = 0, (l = createNS("svg")).appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (styleDiv(h = createTag("span")), styleDiv(o = createTag("span")), h.appendChild(o)), this.globalData.fontManager.chars) {
                        var u, y = this.globalData.fontManager.getCharData(t.finalText[r], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                        if (u = y ? y.data : null, m.reset(), u && u.shapes && (f = u.shapes[0].it, m.scale(t.finalSize / 100, t.finalSize / 100), c = this.createPathShape(m, f), o.setAttribute("d", c)), this.isMasked) this.innerElem.appendChild(o);
                        else {
                            if (this.innerElem.appendChild(h), u && u.shapes) {
                                document.body.appendChild(l);
                                var g = l.getBBox();
                                l.setAttribute("width", g.width + 2), l.setAttribute("height", g.height + 2), l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", p[r].yOffset = g.y - 1
                            } else l.setAttribute("width", 1), l.setAttribute("height", 1);
                            h.appendChild(l)
                        }
                    } else o.textContent = p[r].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");
                    this.isMasked ? this.textSpans[d] = o : this.textSpans[d] = h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1
                }
                for (; d < this.textSpans.length;) this.textSpans[d].style.display = "none", d += 1
            }, HTextElement.prototype.renderInnerContent = function() {
                if (this.data.singleShape) {
                    if (!this._isFirstFrame && !this.lettersChangedFlag) return;
                    this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
                }
                if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
                    var t, e, r, i, s, a = 0,
                        n = this.textAnimator.renderedLetters,
                        o = this.textProperty.currentData.l;
                    for (e = o.length, t = 0; t < e; t += 1) o[t].n ? a += 1 : (i = this.textSpans[t], s = this.textPaths[t], r = n[a], a += 1, r._mdf.m && (this.isMasked ? i.setAttribute("transform", r.m) : i.style.transform = i.style.webkitTransform = r.m), i.style.opacity = r.o, r.sw && r._mdf.sw && s.setAttribute("stroke-width", r.sw), r.sc && r._mdf.sc && s.setAttribute("stroke", r.sc), r.fc && r._mdf.fc && (s.setAttribute("fill", r.fc), s.style.color = r.fc));
                    if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
                        var h = this.innerElem.getBBox();
                        this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));
                        this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2, this.currentBBox.h = h.height + 2, this.currentBBox.x = h.x - 1, this.currentBBox.y = h.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                    }
                }
            }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData),
                    e = new Image;
                this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
            }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function() {
                var t, e, r = this.comp.threeDElements.length;
                for (t = 0; t < r; t += 1) "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)")
            }, HCameraElement.prototype.createElements = function() {}, HCameraElement.prototype.hide = function() {}, HCameraElement.prototype.renderFrame = function() {
                var t, e, r = this._isFirstFrame;
                if (this.hierarchy)
                    for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
                if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
                    if (this.mat.reset(), this.hierarchy)
                        for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
                            var i = this.hierarchy[t].finalTransform.mProp;
                            this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2])
                        }
                    if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
                        var s;
                        s = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
                        var a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
                            n = [s[0] / a, s[1] / a, s[2] / a],
                            o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
                            h = Math.atan2(n[1], o),
                            l = Math.atan2(n[0], -n[2]);
                        this.mat.rotateY(l).rotateX(-h)
                    }
                    this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
                    var p = !this._prevMat.equals(this.mat);
                    if ((p || this.pe._mdf) && this.comp.threeDElements) {
                        var f;
                        for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) "3d" === (f = this.comp.threeDElements[t]).type && (p && (f.container.style.transform = f.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (f.perspectiveElem.style.perspective = f.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
                        this.mat.clone(this._prevMat)
                    }
                }
                this._isFirstFrame = !1
            }, HCameraElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
            }, HCameraElement.prototype.destroy = function() {}, HCameraElement.prototype.getBaseElement = function() {
                return null
            }, HEffects.prototype.renderFrame = function() {};
            var animationManager = function() {
                    var t = {},
                        e = [],
                        r = 0,
                        i = 0,
                        s = 0,
                        a = !0,
                        n = !1;

                    function o(t) {
                        for (var r = 0, s = t.target; r < i;) e[r].animation === s && (e.splice(r, 1), r -= 1, i -= 1, s.isPaused || p()), r += 1
                    }

                    function h(t, r) {
                        if (!t) return null;
                        for (var s = 0; s < i;) {
                            if (e[s].elem == t && null !== e[s].elem) return e[s].animation;
                            s += 1
                        }
                        var a = new AnimationItem;
                        return f(a, t), a.setData(t, r), a
                    }

                    function l() {
                        s += 1, d()
                    }

                    function p() {
                        s -= 1
                    }

                    function f(t, r) {
                        t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
                            elem: r,
                            animation: t
                        }), i += 1
                    }

                    function m(t) {
                        var o, h = t - r;
                        for (o = 0; o < i; o += 1) e[o].animation.advanceTime(h);
                        r = t, s && !n ? window.requestAnimationFrame(m) : a = !0
                    }

                    function c(t) {
                        r = t, window.requestAnimationFrame(m)
                    }

                    function d() {
                        !n && s && a && (window.requestAnimationFrame(c), a = !1)
                    }
                    return t.registerAnimation = h, t.loadAnimation = function(t) {
                        var e = new AnimationItem;
                        return f(e, null), e.setParams(t), e
                    }, t.setSpeed = function(t, r) {
                        var s;
                        for (s = 0; s < i; s += 1) e[s].animation.setSpeed(t, r)
                    }, t.setDirection = function(t, r) {
                        var s;
                        for (s = 0; s < i; s += 1) e[s].animation.setDirection(t, r)
                    }, t.play = function(t) {
                        var r;
                        for (r = 0; r < i; r += 1) e[r].animation.play(t)
                    }, t.pause = function(t) {
                        var r;
                        for (r = 0; r < i; r += 1) e[r].animation.pause(t)
                    }, t.stop = function(t) {
                        var r;
                        for (r = 0; r < i; r += 1) e[r].animation.stop(t)
                    }, t.togglePause = function(t) {
                        var r;
                        for (r = 0; r < i; r += 1) e[r].animation.togglePause(t)
                    }, t.searchAnimations = function(t, e, r) {
                        var i, s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
                            a = s.length;
                        for (i = 0; i < a; i += 1) r && s[i].setAttribute("data-bm-type", r), h(s[i], t);
                        if (e && 0 === a) {
                            r || (r = "svg");
                            var n = document.getElementsByTagName("body")[0];
                            n.innerHTML = "";
                            var o = createTag("div");
                            o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), h(o, t)
                        }
                    }, t.resize = function() {
                        var t;
                        for (t = 0; t < i; t += 1) e[t].animation.resize()
                    }, t.goToAndStop = function(t, r, s) {
                        var a;
                        for (a = 0; a < i; a += 1) e[a].animation.goToAndStop(t, r, s)
                    }, t.destroy = function(t) {
                        var r;
                        for (r = i - 1; r >= 0; r -= 1) e[r].animation.destroy(t)
                    }, t.freeze = function() {
                        n = !0
                    }, t.unfreeze = function() {
                        n = !1, d()
                    }, t.getRegisteredAnimations = function() {
                        var t, r = e.length,
                            i = [];
                        for (t = 0; t < r; t += 1) i.push(e[t].animation);
                        return i
                    }, t
                }(),
                AnimationItem = function() {
                    this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader
                };
            extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function(t) {
                t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
                switch (e) {
                    case "canvas":
                        this.renderer = new CanvasRenderer(this, t.rendererSettings);
                        break;
                    case "svg":
                        this.renderer = new SVGRenderer(this, t.rendererSettings);
                        break;
                    default:
                        this.renderer = new HybridRenderer(this, t.rendererSettings)
                }
                this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function() {
                    this.trigger("data_failed")
                }.bind(this))), this.initialSegment = t.initialSegment
            }, AnimationItem.prototype.setData = function(t, e) {
                var r = {
                        wrapper: t,
                        animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
                    },
                    i = t.attributes;
                r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
                var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
                "" === s || (r.loop = "false" !== s && ("true" === s || parseInt(s)));
                var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
                r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r)
            }, AnimationItem.prototype.includeLayers = function(t) {
                t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
                var e, r, i = this.animationData.layers,
                    s = i.length,
                    a = t.layers,
                    n = a.length;
                for (r = 0; r < n; r += 1)
                    for (e = 0; e < s;) {
                        if (i[e].id == a[r].id) {
                            i[e] = a[r];
                            break
                        }
                        e += 1
                    }
                if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
                    for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
                this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment()
            }, AnimationItem.prototype.loadNextSegment = function() {
                var t = this.animationData.segments;
                if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.totalFrames);
                var e = t.shift();
                this.timeCompleted = e.time * this.frameRate;
                var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
                this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function() {
                    this.trigger("data_failed")
                }.bind(this))
            }, AnimationItem.prototype.loadSegments = function() {
                this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
            }, AnimationItem.prototype.imagesLoaded = function() {
                this.trigger("loaded_images"), this.checkLoaded()
            }, AnimationItem.prototype.preloadImages = function() {
                this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
            }, AnimationItem.prototype.configAnimation = function(t) {
                if (this.renderer) try {
                    this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded()
                } catch (e) {
                    this.triggerConfigError(e)
                }
            }, AnimationItem.prototype.waitForFontsLoaded = function() {
                this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
            }, AnimationItem.prototype.checkLoaded = function() {
                this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function() {
                    this.trigger("DOMLoaded")
                }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
            }, AnimationItem.prototype.resize = function() {
                this.renderer.updateContainerSize()
            }, AnimationItem.prototype.setSubframe = function(t) {
                this.subframeEnabled = !!t
            }, AnimationItem.prototype.gotoFrame = function() {
                this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
            }, AnimationItem.prototype.renderFrame = function() {
                if (!1 !== this.isLoaded) try {
                    this.renderer.renderFrame(this.currentFrame + this.firstFrame)
                } catch (t) {
                    this.triggerRenderFrameError(t)
                }
            }, AnimationItem.prototype.play = function(t) {
                t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
            }, AnimationItem.prototype.pause = function(t) {
                t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"))
            }, AnimationItem.prototype.togglePause = function(t) {
                t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
            }, AnimationItem.prototype.stop = function(t) {
                t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
            }, AnimationItem.prototype.goToAndStop = function(t, e, r) {
                r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause())
            }, AnimationItem.prototype.goToAndPlay = function(t, e, r) {
                this.goToAndStop(t, e, r), this.play()
            }, AnimationItem.prototype.advanceTime = function(t) {
                if (!0 !== this.isPaused && !1 !== this.isLoaded) {
                    var e = this.currentRawFrame + t * this.frameModifier,
                        r = !1;
                    e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"))
                }
            }, AnimationItem.prototype.adjustSegment = function(t, e) {
                this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
            }, AnimationItem.prototype.setSegment = function(t, e) {
                var r = -1;
                this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0)
            }, AnimationItem.prototype.playSegments = function(t, e) {
                if (e && (this.segments.length = 0), "object" == typeof t[0]) {
                    var r, i = t.length;
                    for (r = 0; r < i; r += 1) this.segments.push(t[r])
                } else this.segments.push(t);
                this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
            }, AnimationItem.prototype.resetSegments = function(t) {
                this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
            }, AnimationItem.prototype.checkSegments = function(t) {
                return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
            }, AnimationItem.prototype.destroy = function(t) {
                t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null)
            }, AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
                this.currentRawFrame = t, this.gotoFrame()
            }, AnimationItem.prototype.setSpeed = function(t) {
                this.playSpeed = t, this.updaFrameModifier()
            }, AnimationItem.prototype.setDirection = function(t) {
                this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
            }, AnimationItem.prototype.updaFrameModifier = function() {
                this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
            }, AnimationItem.prototype.getPath = function() {
                return this.path
            }, AnimationItem.prototype.getAssetsPath = function(t) {
                var e = "";
                if (t.e) e = t.p;
                else if (this.assetsPath) {
                    var r = t.p; - 1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r
                } else e = this.path, e += t.u ? t.u : "", e += t.p;
                return e
            }, AnimationItem.prototype.getAssetData = function(t) {
                for (var e = 0, r = this.assets.length; e < r;) {
                    if (t == this.assets[e].id) return this.assets[e];
                    e += 1
                }
            }, AnimationItem.prototype.hide = function() {
                this.renderer.hide()
            }, AnimationItem.prototype.show = function() {
                this.renderer.show()
            }, AnimationItem.prototype.getDuration = function(t) {
                return t ? this.totalFrames : this.totalFrames / this.frameRate
            }, AnimationItem.prototype.trigger = function(t) {
                if (this._cbs && this._cbs[t]) switch (t) {
                    case "enterFrame":
                        this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
                        break;
                    case "loopComplete":
                        this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                        break;
                    case "complete":
                        this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                        break;
                    case "segmentStart":
                        this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                        break;
                    case "destroy":
                        this.triggerEvent(t, new BMDestroyEvent(t, this));
                        break;
                    default:
                        this.triggerEvent(t)
                }
                "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
            }, AnimationItem.prototype.triggerRenderFrameError = function(t) {
                var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
                this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
            }, AnimationItem.prototype.triggerConfigError = function(t) {
                var e = new BMConfigErrorEvent(t, this.currentFrame);
                this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
            };
            var Expressions = function() {
                var t = {};
                return t.initExpressions = function(t) {
                    var e = 0,
                        r = [];
                    t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function() {
                        e += 1
                    }, t.renderer.globalData.popExpression = function() {
                        0 == (e -= 1) && function() {
                            var t, e = r.length;
                            for (t = 0; t < e; t += 1) r[t].release();
                            r.length = 0
                        }()
                    }, t.renderer.globalData.registerExpressionProperty = function(t) {
                        -1 === r.indexOf(t) && r.push(t)
                    }
                }, t
            }();
            expressionsPlugin = Expressions;
            var ExpressionManager = function() {
                    var ob = {},
                        Math = BMMath,
                        window = null,
                        document = null;

                    function $bm_isInstanceOfArray(t) {
                        return t.constructor === Array || t.constructor === Float32Array
                    }

                    function isNumerable(t, e) {
                        return "number" === t || "boolean" === t || "string" === t || e instanceof Number
                    }

                    function $bm_neg(t) {
                        var e = typeof t;
                        if ("number" === e || "boolean" === e || t instanceof Number) return -t;
                        if ($bm_isInstanceOfArray(t)) {
                            var r, i = t.length,
                                s = [];
                            for (r = 0; r < i; r += 1) s[r] = -t[r];
                            return s
                        }
                        return t.propType ? t.v : void 0
                    }
                    var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
                        easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
                        easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

                    function sum(t, e) {
                        var r = typeof t,
                            i = typeof e;
                        if ("string" === r || "string" === i) return t + e;
                        if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
                        if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
                        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                            for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;)("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
                            return o
                        }
                        return 0
                    }
                    var add = sum;

                    function sub(t, e) {
                        var r = typeof t,
                            i = typeof e;
                        if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t)), "string" === i && (e = parseInt(e)), t - e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
                        if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
                        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                            for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;)("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
                            return o
                        }
                        return 0
                    }

                    function mul(t, e) {
                        var r, i, s, a = typeof t,
                            n = typeof e;
                        if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                            for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] * e;
                            return r
                        }
                        if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                            for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t * e[i];
                            return r
                        }
                        return 0
                    }

                    function div(t, e) {
                        var r, i, s, a = typeof t,
                            n = typeof e;
                        if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
                        if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                            for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] / e;
                            return r
                        }
                        if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                            for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t / e[i];
                            return r
                        }
                        return 0
                    }

                    function mod(t, e) {
                        return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e
                    }
                    var $bm_sum = sum,
                        $bm_sub = sub,
                        $bm_mul = mul,
                        $bm_div = div,
                        $bm_mod = mod;

                    function clamp(t, e, r) {
                        if (e > r) {
                            var i = r;
                            r = e, e = i
                        }
                        return Math.min(Math.max(t, e), r)
                    }

                    function radiansToDegrees(t) {
                        return t / degToRads
                    }
                    var radians_to_degrees = radiansToDegrees;

                    function degreesToRadians(t) {
                        return t * degToRads
                    }
                    var degrees_to_radians = radiansToDegrees,
                        helperLengthArray = [0, 0, 0, 0, 0, 0];

                    function length(t, e) {
                        if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
                        e || (e = helperLengthArray);
                        var r, i = Math.min(t.length, e.length),
                            s = 0;
                        for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);
                        return Math.sqrt(s)
                    }

                    function normalize(t) {
                        return div(t, length(t))
                    }

                    function rgbToHsl(t) {
                        var e, r, i = t[0],
                            s = t[1],
                            a = t[2],
                            n = Math.max(i, s, a),
                            o = Math.min(i, s, a),
                            h = (n + o) / 2;
                        if (n == o) e = r = 0;
                        else {
                            var l = n - o;
                            switch (r = h > .5 ? l / (2 - n - o) : l / (n + o), n) {
                                case i:
                                    e = (s - a) / l + (s < a ? 6 : 0);
                                    break;
                                case s:
                                    e = (a - i) / l + 2;
                                    break;
                                case a:
                                    e = (i - s) / l + 4
                            }
                            e /= 6
                        }
                        return [e, r, h, t[3]]
                    }

                    function hue2rgb(t, e, r) {
                        return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
                    }

                    function hslToRgb(t) {
                        var e, r, i, s = t[0],
                            a = t[1],
                            n = t[2];
                        if (0 === a) e = r = i = n;
                        else {
                            var o = n < .5 ? n * (1 + a) : n + a - n * a,
                                h = 2 * n - o;
                            e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3)
                        }
                        return [e, r, i, t[3]]
                    }

                    function linear(t, e, r, i, s) {
                        if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
                            var a = r;
                            r = e, e = a
                        }
                        if (t <= e) return i;
                        if (t >= r) return s;
                        var n = r === e ? 0 : (t - e) / (r - e);
                        if (!i.length) return i + (s - i) * n;
                        var o, h = i.length,
                            l = createTypedArray("float32", h);
                        for (o = 0; o < h; o += 1) l[o] = i[o] + (s[o] - i[o]) * n;
                        return l
                    }

                    function random(t, e) {
                        if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
                            var r, i = e.length;
                            t || (t = createTypedArray("float32", i));
                            var s = createTypedArray("float32", i),
                                a = BMMath.random();
                            for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);
                            return s
                        }
                        return void 0 === t && (t = 0), t + BMMath.random() * (e - t)
                    }

                    function createPath(t, e, r, i) {
                        var s, a = t.length,
                            n = shape_pool.newElement();
                        n.setPathData(!!i, a);
                        var o, h, l = [0, 0];
                        for (s = 0; s < a; s += 1) o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
                        return n
                    }

                    function initiateExpression(elem, data, property) {
                        var val = data.x,
                            needsVelocity = /velocity(?![\w\d])/.test(val),
                            _needsRandom = -1 !== val.indexOf("random"),
                            elemType = elem.data.ty,
                            transform, $bm_transform, content, effect, thisProperty = property;
                        thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
                            get: function() {
                                return thisProperty.v
                            }
                        }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
                        var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                            outPoint = elem.data.op / elem.comp.globalData.frameRate,
                            width = elem.data.sw ? elem.data.sw : 0,
                            height = elem.data.sh ? elem.data.sh : 0,
                            name = elem.data.nm,
                            loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, __expression_functions = [],
                            scoped_bm_rt;
                        if (data.xf) {
                            var i, len = data.xf.length;
                            for (i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())")
                        }
                        var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
                            numKeys = property.kf ? data.k.length : 0,
                            active = !this.data || !0 !== this.data.hd,
                            wiggle = function(t, e) {
                                var r, i, s = this.pv.length ? this.pv.length : 1,
                                    a = createTypedArray("float32", s);
                                var n = Math.floor(5 * time);
                                for (r = 0, i = 0; r < n;) {
                                    for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();
                                    r += 1
                                }
                                var o = 5 * time,
                                    h = o - Math.floor(o),
                                    l = createTypedArray("float32", s);
                                if (s > 1) {
                                    for (i = 0; i < s; i += 1) l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
                                    return l
                                }
                                return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h
                            }.bind(this);

                        function loopInDuration(t, e) {
                            return loopIn(t, e, !0)
                        }

                        function loopOutDuration(t, e) {
                            return loopOut(t, e, !0)
                        }
                        thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                        var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
                            time, velocity, value, text, textIndex, textTotal, selectorValue;

                        function lookAt(t, e) {
                            var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                                i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
                            return [-Math.atan2(r[1], r[2]) / degToRads, i, 0]
                        }

                        function easeOut(t, e, r, i, s) {
                            return applyEase(easeOutBez, t, e, r, i, s)
                        }

                        function easeIn(t, e, r, i, s) {
                            return applyEase(easeInBez, t, e, r, i, s)
                        }

                        function ease(t, e, r, i, s) {
                            return applyEase(easeInOutBez, t, e, r, i, s)
                        }

                        function applyEase(t, e, r, i, s, a) {
                            void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r);
                            var n = t(e = e > 1 ? 1 : e < 0 ? 0 : e);
                            if ($bm_isInstanceOfArray(s)) {
                                var o, h = s.length,
                                    l = createTypedArray("float32", h);
                                for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
                                return l
                            }
                            return (a - s) * n + s
                        }

                        function nearestKey(t) {
                            var e, r, i, s = data.k.length;
                            if (data.k.length && "number" != typeof data.k[0])
                                if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;
                                else {
                                    for (e = 0; e < s - 1; e += 1) {
                                        if (t === data.k[e].t) {
                                            r = e + 1, i = data.k[e].t;
                                            break
                                        }
                                        if (t > data.k[e].t && t < data.k[e + 1].t) {
                                            t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, i = data.k[e + 1].t) : (r = e + 1, i = data.k[e].t);
                                            break
                                        }
                                    } - 1 === r && (r = e + 1, i = data.k[e].t)
                                }
                            else r = 0, i = 0;
                            var a = {};
                            return a.index = r, a.time = i / elem.comp.globalData.frameRate, a
                        }

                        function key(t) {
                            var e, r, i;
                            if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
                            t -= 1, e = {
                                time: data.k[t].t / elem.comp.globalData.frameRate,
                                value: []
                            };
                            var s = data.k[t].hasOwnProperty("s") ? data.k[t].s : data.k[t - 1].e;
                            for (i = s.length, r = 0; r < i; r += 1) e[r] = s[r], e.value[r] = s[r];
                            return e
                        }

                        function framesToTime(t, e) {
                            return e || (e = elem.comp.globalData.frameRate), t / e
                        }

                        function timeToFrames(t, e) {
                            return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e
                        }

                        function seedRandom(t) {
                            BMMath.seedrandom(randSeed + t)
                        }

                        function sourceRectAtTime() {
                            return elem.sourceRectAtTime()
                        }

                        function substring(t, e) {
                            return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
                        }

                        function substr(t, e) {
                            return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
                        }

                        function posterizeTime(t) {
                            time = 0 === t ? 0 : Math.floor(time * t) / t, value = valueAtTime(time)
                        }
                        var index = elem.data.ind,
                            hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                            parent, randSeed = Math.floor(1e6 * Math.random()),
                            globalData = elem.globalData;

                        function executeExpression(t) {
                            return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt)
                        }
                        return executeExpression
                    }
                    return ob.initiateExpression = initiateExpression, ob
                }(),
                expressionHelpers = function() {
                    return {
                        searchExpressions: function(t, e, r) {
                            e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
                        },
                        getSpeedAtTime: function(t) {
                            var e = this.getValueAtTime(t),
                                r = this.getValueAtTime(t + -.01),
                                i = 0;
                            if (e.length) {
                                var s;
                                for (s = 0; s < e.length; s += 1) i += Math.pow(r[s] - e[s], 2);
                                i = 100 * Math.sqrt(i)
                            } else i = 0;
                            return i
                        },
                        getVelocityAtTime: function(t) {
                            if (void 0 !== this.vel) return this.vel;
                            var e, r, i = this.getValueAtTime(t),
                                s = this.getValueAtTime(t + -.001);
                            if (i.length)
                                for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (s[r] - i[r]) / -.001;
                            else e = (s - i) / -.001;
                            return e
                        },
                        getValueAtTime: function(t) {
                            return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
                        },
                        getStaticValueAtTime: function() {
                            return this.pv
                        },
                        setGroupProperty: function(t) {
                            this.propertyGroup = t
                        }
                    }
                }();
            ! function() {
                function t(t, e, r) {
                    if (!this.k || !this.keyframes) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var i, s, a, n, o, h = this.comp.renderedFrame,
                        l = this.keyframes,
                        p = l[l.length - 1].t;
                    if (h <= p) return this.pv;
                    if (r ? s = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
                        if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0)
                    } else {
                        if ("offset" === t) {
                            var f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                                m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
                                d = Math.floor((h - s) / i);
                            if (this.pv.length) {
                                for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) o[a] = (m[a] - f[a]) * d + c[a];
                                return o
                            }
                            return (m - f) * d + c
                        }
                        if ("continue" === t) {
                            var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                                return o
                            }
                            return u + (h - p) / .001 * (u - y)
                        }
                    }
                    return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0)
                }

                function e(t, e, r) {
                    if (!this.k) return this.pv;
                    t = t ? t.toLowerCase() : "";
                    var i, s, a, n, o, h = this.comp.renderedFrame,
                        l = this.keyframes,
                        p = l[0].t;
                    if (h >= p) return this.pv;
                    if (r ? s = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
                        if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
                    } else {
                        if ("offset" === t) {
                            var f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                                c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
                                d = Math.floor((p - h) / i) + 1;
                            if (this.pv.length) {
                                for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) o[a] = c[a] - (m[a] - f[a]) * d;
                                return o
                            }
                            return c - (m - f) * d
                        }
                        if ("continue" === t) {
                            var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                                y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                            if (this.pv.length) {
                                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
                                return o
                            }
                            return u + (u - y) * (p - h) / .001
                        }
                    }
                    return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0)
                }

                function r(t, e) {
                    if (!this.k) return this.pv;
                    if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
                    var r, i, s = this.comp.renderedFrame / this.comp.globalData.frameRate,
                        a = s - t,
                        n = e > 1 ? (s + t - a) / (e - 1) : 1,
                        o = 0,
                        h = 0;
                    for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
                        if (i = this.getValueAtTime(a + o * n), this.pv.length)
                            for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];
                        else r += i;
                        o += 1
                    }
                    if (this.pv.length)
                        for (h = 0; h < this.pv.length; h += 1) r[h] /= e;
                    else r /= e;
                    return r
                }
                var i = TransformPropertyFactory.getTransformProperty;
                TransformPropertyFactory.getTransformProperty = function(t, e, r) {
                    var s = i(t, e, r);
                    return s.dynamicProperties.length ? s.getValueAtTime = function(t) {
                        console.warn("Transform at time not supported")
                    }.bind(s) : s.getValueAtTime = function(t) {}.bind(s), s.setGroupProperty = expressionHelpers.setGroupProperty, s
                };
                var s = PropertyFactory.getProp;
                PropertyFactory.getProp = function(i, a, n, o, h) {
                    var l = s(i, a, n, o, h);
                    l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = r, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === a.a ? a.k.length : 0, l.propertyIndex = a.ix;
                    var p = 0;
                    return 0 !== n && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)), l._cachingAtTime = {
                        lastFrame: initialDefaultFrame,
                        lastIndex: 0,
                        value: p
                    }, expressionHelpers.searchExpressions(i, a, l), l.k && h.addDynamicProperty(l), l
                };
                var a = ShapePropertyFactory.getConstructorFunction(),
                    n = ShapePropertyFactory.getKeyframedConstructorFunction();

                function o() {}
                o.prototype = {
                    vertices: function(t, e) {
                        this.k && this.getValue();
                        var r = this.v;
                        void 0 !== e && (r = this.getValueAtTime(e, 0));
                        var i, s = r._length,
                            a = r[t],
                            n = r.v,
                            o = createSizedArray(s);
                        for (i = 0; i < s; i += 1) o[i] = "i" === t || "o" === t ? [a[i][0] - n[i][0], a[i][1] - n[i][1]] : [a[i][0], a[i][1]];
                        return o
                    },
                    points: function(t) {
                        return this.vertices("v", t)
                    },
                    inTangents: function(t) {
                        return this.vertices("i", t)
                    },
                    outTangents: function(t) {
                        return this.vertices("o", t)
                    },
                    isClosed: function() {
                        return this.v.c
                    },
                    pointOnPath: function(t, e) {
                        var r = this.v;
                        void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
                        for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
                            if (l + a[o].addedLength > n) {
                                var p = o,
                                    f = r.c && o === h - 1 ? 0 : o + 1,
                                    m = (n - l) / a[o].addedLength;
                                i = bez.getPointInSegment(r.v[p], r.v[f], r.o[p], r.i[f], m, a[o]);
                                break
                            }
                            l += a[o].addedLength, o += 1
                        }
                        return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i
                    },
                    vectorOnPath: function(t, e, r) {
                        t = 1 == t ? this.v.c ? 0 : .999 : t;
                        var i = this.pointOnPath(t, e),
                            s = this.pointOnPath(t + .001, e),
                            a = s[0] - i[0],
                            n = s[1] - i[1],
                            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
                        return 0 === o ? [0, 0] : "tangent" === r ? [a / o, n / o] : [-n / o, a / o]
                    },
                    tangentOnPath: function(t, e) {
                        return this.vectorOnPath(t, e, "tangent")
                    },
                    normalOnPath: function(t, e) {
                        return this.vectorOnPath(t, e, "normal")
                    },
                    setGroupProperty: expressionHelpers.setGroupProperty,
                    getValueAtTime: expressionHelpers.getStaticValueAtTime
                }, extendPrototype([o], a), extendPrototype([o], n), n.prototype.getValueAtTime = function(t) {
                    return this._cachingAtTime || (this._cachingAtTime = {
                        shapeValue: shape_pool.clone(this.pv),
                        lastIndex: 0,
                        lastTime: initialDefaultFrame
                    }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
                }, n.prototype.initiateExpression = ExpressionManager.initiateExpression;
                var h = ShapePropertyFactory.getShapeProp;
                ShapePropertyFactory.getShapeProp = function(t, e, r, i, s) {
                    var a = h(t, e, r, i, s);
                    return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a
                }
            }(),
            function() {
                TextProperty.prototype.getExpressionValue = function(t, e) {
                    var r = this.calculateExpression(e);
                    if (t.t !== r) {
                        var i = {};
                        return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i
                    }
                    return t
                }, TextProperty.prototype.searchProperty = function() {
                    var t = this.searchKeyframes(),
                        e = this.searchExpressions();
                    return this.kf = t || e, this.kf
                }, TextProperty.prototype.searchExpressions = function() {
                    if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0
                }
            }();
            var ShapeExpressionInterface = function() {
                    function t(t, f, m) {
                        var c, d = [],
                            u = t ? t.length : 0;
                        for (c = 0; c < u; c += 1) "gr" == t[c].ty ? d.push(e(t[c], f[c], m)) : "fl" == t[c].ty ? d.push(r(t[c], f[c], m)) : "st" == t[c].ty ? d.push(i(t[c], f[c], m)) : "tm" == t[c].ty ? d.push(s(t[c], f[c], m)) : "tr" == t[c].ty || ("el" == t[c].ty ? d.push(a(t[c], f[c], m)) : "sr" == t[c].ty ? d.push(n(t[c], f[c], m)) : "sh" == t[c].ty ? d.push(p(t[c], f[c], m)) : "rc" == t[c].ty ? d.push(o(t[c], f[c], m)) : "rd" == t[c].ty ? d.push(h(t[c], f[c], m)) : "rp" == t[c].ty && d.push(l(t[c], f[c], m)));
                        return d
                    }

                    function e(e, r, i) {
                        var s = function(t) {
                            switch (t) {
                                case "ADBE Vectors Group":
                                case "Contents":
                                case 2:
                                    return s.content;
                                default:
                                    return s.transform
                            }
                        };
                        s.propertyGroup = function(t) {
                            return 1 === t ? s : i(t - 1)
                        };
                        var a = function(e, r, i) {
                                var s, a = function(t) {
                                    for (var e = 0, r = s.length; e < r;) {
                                        if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
                                        e += 1
                                    }
                                    if ("number" == typeof t) return s[t - 1]
                                };
                                return a.propertyGroup = function(t) {
                                    return 1 === t ? a : i(t - 1)
                                }, s = t(e.it, r.it, a.propertyGroup), a.numProperties = s.length, a.propertyIndex = e.cix, a._name = e.nm, a
                            }(e, r, s.propertyGroup),
                            n = function(t, e, r) {
                                function i(t) {
                                    return 1 == t ? s : r(--t)
                                }
                                e.transform.mProps.o.setGroupProperty(i), e.transform.mProps.p.setGroupProperty(i), e.transform.mProps.a.setGroupProperty(i), e.transform.mProps.s.setGroupProperty(i), e.transform.mProps.r.setGroupProperty(i), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(i), e.transform.mProps.sa.setGroupProperty(i));

                                function s(e) {
                                    return t.a.ix === e || "Anchor Point" === e ? s.anchorPoint : t.o.ix === e || "Opacity" === e ? s.opacity : t.p.ix === e || "Position" === e ? s.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? s.rotation : t.s.ix === e || "Scale" === e ? s.scale : t.sk && t.sk.ix === e || "Skew" === e ? s.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? s.skewAxis : void 0
                                }
                                return e.transform.op.setGroupProperty(i), Object.defineProperties(s, {
                                    opacity: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.o)
                                    },
                                    position: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.p)
                                    },
                                    anchorPoint: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.a)
                                    },
                                    scale: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.s)
                                    },
                                    rotation: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.r)
                                    },
                                    skew: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.sk)
                                    },
                                    skewAxis: {
                                        get: ExpressionPropertyInterface(e.transform.mProps.sa)
                                    },
                                    _name: {
                                        value: t.nm
                                    }
                                }), s.ty = "tr", s.mn = t.mn, s.propertyGroup = r, s
                            }(e.it[e.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);
                        return s.content = a, s.transform = n, Object.defineProperty(s, "_name", {
                            get: function() {
                                return e.nm
                            }
                        }), s.numProperties = e.np, s.propertyIndex = e.ix, s.nm = e.nm, s.mn = e.mn, s
                    }

                    function r(t, e, r) {
                        function i(t) {
                            return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0
                        }
                        return Object.defineProperties(i, {
                            color: {
                                get: ExpressionPropertyInterface(e.c)
                            },
                            opacity: {
                                get: ExpressionPropertyInterface(e.o)
                            },
                            _name: {
                                value: t.nm
                            },
                            mn: {
                                value: t.mn
                            }
                        }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i
                    }

                    function i(t, e, r) {
                        function i(t) {
                            return 1 === t ? ob : r(t - 1)
                        }

                        function s(t) {
                            return 1 === t ? h : i(t - 1)
                        }

                        function a(r) {
                            Object.defineProperty(h, t.d[r].nm, {
                                get: ExpressionPropertyInterface(e.d.dataProps[r].p)
                            })
                        }
                        var n, o = t.d ? t.d.length : 0,
                            h = {};
                        for (n = 0; n < o; n += 1) a(n), e.d.dataProps[n].p.setGroupProperty(s);

                        function l(t) {
                            return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0
                        }
                        return Object.defineProperties(l, {
                            color: {
                                get: ExpressionPropertyInterface(e.c)
                            },
                            opacity: {
                                get: ExpressionPropertyInterface(e.o)
                            },
                            strokeWidth: {
                                get: ExpressionPropertyInterface(e.w)
                            },
                            dash: {
                                get: function() {
                                    return h
                                }
                            },
                            _name: {
                                value: t.nm
                            },
                            mn: {
                                value: t.mn
                            }
                        }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), l
                    }

                    function s(t, e, r) {
                        function i(t) {
                            return 1 == t ? s : r(--t)
                        }

                        function s(e) {
                            return e === t.e.ix || "End" === e || "end" === e ? s.end : e === t.s.ix ? s.start : e === t.o.ix ? s.offset : void 0
                        }
                        return s.propertyIndex = t.ix, e.s.setGroupProperty(i), e.e.setGroupProperty(i), e.o.setGroupProperty(i), s.propertyIndex = t.ix, s.propertyGroup = r, Object.defineProperties(s, {
                            start: {
                                get: ExpressionPropertyInterface(e.s)
                            },
                            end: {
                                get: ExpressionPropertyInterface(e.e)
                            },
                            offset: {
                                get: ExpressionPropertyInterface(e.o)
                            },
                            _name: {
                                value: t.nm
                            }
                        }), s.mn = t.mn, s
                    }

                    function a(t, e, r) {
                        function i(t) {
                            return 1 == t ? a : r(--t)
                        }
                        a.propertyIndex = t.ix;
                        var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

                        function a(e) {
                            return t.p.ix === e ? a.position : t.s.ix === e ? a.size : void 0
                        }
                        return s.s.setGroupProperty(i), s.p.setGroupProperty(i), Object.defineProperties(a, {
                            size: {
                                get: ExpressionPropertyInterface(s.s)
                            },
                            position: {
                                get: ExpressionPropertyInterface(s.p)
                            },
                            _name: {
                                value: t.nm
                            }
                        }), a.mn = t.mn, a
                    }

                    function n(t, e, r) {
                        function i(t) {
                            return 1 == t ? a : r(--t)
                        }
                        var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

                        function a(e) {
                            return t.p.ix === e ? a.position : t.r.ix === e ? a.rotation : t.pt.ix === e ? a.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? a.outerRadius : t.os.ix === e ? a.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? a.innerRoundness : void 0 : a.innerRadius
                        }
                        return a.propertyIndex = t.ix, s.or.setGroupProperty(i), s.os.setGroupProperty(i), s.pt.setGroupProperty(i), s.p.setGroupProperty(i), s.r.setGroupProperty(i), t.ir && (s.ir.setGroupProperty(i), s.is.setGroupProperty(i)), Object.defineProperties(a, {
                            position: {
                                get: ExpressionPropertyInterface(s.p)
                            },
                            rotation: {
                                get: ExpressionPropertyInterface(s.r)
                            },
                            points: {
                                get: ExpressionPropertyInterface(s.pt)
                            },
                            outerRadius: {
                                get: ExpressionPropertyInterface(s.or)
                            },
                            outerRoundness: {
                                get: ExpressionPropertyInterface(s.os)
                            },
                            innerRadius: {
                                get: ExpressionPropertyInterface(s.ir)
                            },
                            innerRoundness: {
                                get: ExpressionPropertyInterface(s.is)
                            },
                            _name: {
                                value: t.nm
                            }
                        }), a.mn = t.mn, a
                    }

                    function o(t, e, r) {
                        function i(t) {
                            return 1 == t ? a : r(--t)
                        }
                        var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

                        function a(e) {
                            return t.p.ix === e ? a.position : t.r.ix === e ? a.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? a.size : void 0
                        }
                        return a.propertyIndex = t.ix, s.p.setGroupProperty(i), s.s.setGroupProperty(i), s.r.setGroupProperty(i), Object.defineProperties(a, {
                            position: {
                                get: ExpressionPropertyInterface(s.p)
                            },
                            roundness: {
                                get: ExpressionPropertyInterface(s.r)
                            },
                            size: {
                                get: ExpressionPropertyInterface(s.s)
                            },
                            _name: {
                                value: t.nm
                            }
                        }), a.mn = t.mn, a
                    }

                    function h(t, e, r) {
                        var i = e;

                        function s(e) {
                            if (t.r.ix === e || "Round Corners 1" === e) return s.radius
                        }
                        return s.propertyIndex = t.ix, i.rd.setGroupProperty(function(t) {
                            return 1 == t ? s : r(--t)
                        }), Object.defineProperties(s, {
                            radius: {
                                get: ExpressionPropertyInterface(i.rd)
                            },
                            _name: {
                                value: t.nm
                            }
                        }), s.mn = t.mn, s
                    }

                    function l(t, e, r) {
                        function i(t) {
                            return 1 == t ? a : r(--t)
                        }
                        var s = e;

                        function a(e) {
                            return t.c.ix === e || "Copies" === e ? a.copies : t.o.ix === e || "Offset" === e ? a.offset : void 0
                        }
                        return a.propertyIndex = t.ix, s.c.setGroupProperty(i), s.o.setGroupProperty(i), Object.defineProperties(a, {
                            copies: {
                                get: ExpressionPropertyInterface(s.c)
                            },
                            offset: {
                                get: ExpressionPropertyInterface(s.o)
                            },
                            _name: {
                                value: t.nm
                            }
                        }), a.mn = t.mn, a
                    }

                    function p(t, e, r) {
                        var i = e.sh;

                        function s(t) {
                            if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path
                        }
                        return i.setGroupProperty(function(t) {
                            return 1 == t ? s : r(--t)
                        }), Object.defineProperties(s, {
                            path: {
                                get: function() {
                                    return i.k && i.getValue(), i
                                }
                            },
                            shape: {
                                get: function() {
                                    return i.k && i.getValue(), i
                                }
                            },
                            _name: {
                                value: t.nm
                            },
                            ix: {
                                value: t.ix
                            },
                            propertyIndex: {
                                value: t.ix
                            },
                            mn: {
                                value: t.mn
                            }
                        }), s
                    }
                    return function(e, r, i) {
                        var s;

                        function a(t) {
                            if ("number" == typeof t) return s[t - 1];
                            for (var e = 0, r = s.length; e < r;) {
                                if (s[e]._name === t) return s[e];
                                e += 1
                            }
                        }
                        return a.propertyGroup = i, s = t(e, r, a), a.numProperties = s.length, a
                    }
                }(),
                TextExpressionInterface = function(t) {
                    var e;

                    function r() {}
                    return Object.defineProperty(r, "sourceText", {
                        get: function() {
                            t.textProperty.getValue();
                            var r = t.textProperty.currentData.t;
                            return void 0 !== r && (t.textProperty.currentData.t = void 0, (e = new String(r)).value = r || new String(r)), e
                        }
                    }), r
                },
                LayerExpressionInterface = function() {
                    function t(t, e) {
                        var r = new Matrix;
                        if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
                            var i, s = this._elem.hierarchy.length;
                            for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
                            return r.applyToPointArray(t[0], t[1], t[2] || 0)
                        }
                        return r.applyToPointArray(t[0], t[1], t[2] || 0)
                    }

                    function e(t, e) {
                        var r = new Matrix;
                        if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
                            var i, s = this._elem.hierarchy.length;
                            for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
                            return r.inversePoint(t)
                        }
                        return r.inversePoint(t)
                    }

                    function r(t) {
                        var e = new Matrix;
                        if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
                            var r, i = this._elem.hierarchy.length;
                            for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
                            return e.inversePoint(t)
                        }
                        return e.inversePoint(t)
                    }

                    function i() {
                        return [1, 1, 1, 1]
                    }
                    return function(s) {
                        var a;

                        function n(t) {
                            switch (t) {
                                case "ADBE Root Vectors Group":
                                case "Contents":
                                case 2:
                                    return n.shapeInterface;
                                case 1:
                                case 6:
                                case "Transform":
                                case "transform":
                                case "ADBE Transform Group":
                                    return a;
                                case 4:
                                case "ADBE Effect Parade":
                                case "effects":
                                case "Effects":
                                    return n.effect
                            }
                        }
                        n.toWorld = t, n.fromWorld = e, n.toComp = t, n.fromComp = r, n.sampleImage = i, n.sourceRectAtTime = s.sourceRectAtTime.bind(s), n._elem = s;
                        var o = getDescriptor(a = TransformExpressionInterface(s.finalTransform.mProp), "anchorPoint");
                        return Object.defineProperties(n, {
                            hasParent: {
                                get: function() {
                                    return s.hierarchy.length
                                }
                            },
                            parent: {
                                get: function() {
                                    return s.hierarchy[0].layerInterface
                                }
                            },
                            rotation: getDescriptor(a, "rotation"),
                            scale: getDescriptor(a, "scale"),
                            position: getDescriptor(a, "position"),
                            opacity: getDescriptor(a, "opacity"),
                            anchorPoint: o,
                            anchor_point: o,
                            transform: {
                                get: function() {
                                    return a
                                }
                            },
                            active: {
                                get: function() {
                                    return s.isInRange
                                }
                            }
                        }), n.startTime = s.data.st, n.index = s.data.ind, n.source = s.data.refId, n.height = 0 === s.data.ty ? s.data.h : 100, n.width = 0 === s.data.ty ? s.data.w : 100, n.inPoint = s.data.ip / s.comp.globalData.frameRate, n.outPoint = s.data.op / s.comp.globalData.frameRate, n._name = s.data.nm, n.registerMaskInterface = function(t) {
                            n.mask = new MaskManagerInterface(t, s)
                        }, n.registerEffectsInterface = function(t) {
                            n.effect = t
                        }, n
                    }
                }(),
                CompExpressionInterface = function(t) {
                    function e(e) {
                        for (var r = 0, i = t.layers.length; r < i;) {
                            if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
                            r += 1
                        }
                        return null
                    }
                    return Object.defineProperty(e, "_name", {
                        value: t.data.nm
                    }), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e
                },
                TransformExpressionInterface = function(t) {
                    function e(t) {
                        switch (t) {
                            case "scale":
                            case "Scale":
                            case "ADBE Scale":
                            case 6:
                                return e.scale;
                            case "rotation":
                            case "Rotation":
                            case "ADBE Rotation":
                            case "ADBE Rotate Z":
                            case 10:
                                return e.rotation;
                            case "ADBE Rotate X":
                                return e.xRotation;
                            case "ADBE Rotate Y":
                                return e.yRotation;
                            case "position":
                            case "Position":
                            case "ADBE Position":
                            case 2:
                                return e.position;
                            case "ADBE Position_0":
                                return e.xPosition;
                            case "ADBE Position_1":
                                return e.yPosition;
                            case "ADBE Position_2":
                                return e.zPosition;
                            case "anchorPoint":
                            case "AnchorPoint":
                            case "Anchor Point":
                            case "ADBE AnchorPoint":
                            case 1:
                                return e.anchorPoint;
                            case "opacity":
                            case "Opacity":
                            case 11:
                                return e.opacity
                        }
                    }
                    if (Object.defineProperty(e, "rotation", {
                            get: ExpressionPropertyInterface(t.r || t.rz)
                        }), Object.defineProperty(e, "zRotation", {
                            get: ExpressionPropertyInterface(t.rz || t.r)
                        }), Object.defineProperty(e, "xRotation", {
                            get: ExpressionPropertyInterface(t.rx)
                        }), Object.defineProperty(e, "yRotation", {
                            get: ExpressionPropertyInterface(t.ry)
                        }), Object.defineProperty(e, "scale", {
                            get: ExpressionPropertyInterface(t.s)
                        }), t.p) var r = ExpressionPropertyInterface(t.p);
                    return Object.defineProperty(e, "position", {
                        get: function() {
                            return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0]
                        }
                    }), Object.defineProperty(e, "xPosition", {
                        get: ExpressionPropertyInterface(t.px)
                    }), Object.defineProperty(e, "yPosition", {
                        get: ExpressionPropertyInterface(t.py)
                    }), Object.defineProperty(e, "zPosition", {
                        get: ExpressionPropertyInterface(t.pz)
                    }), Object.defineProperty(e, "anchorPoint", {
                        get: ExpressionPropertyInterface(t.a)
                    }), Object.defineProperty(e, "opacity", {
                        get: ExpressionPropertyInterface(t.o)
                    }), Object.defineProperty(e, "skew", {
                        get: ExpressionPropertyInterface(t.sk)
                    }), Object.defineProperty(e, "skewAxis", {
                        get: ExpressionPropertyInterface(t.sa)
                    }), Object.defineProperty(e, "orientation", {
                        get: ExpressionPropertyInterface(t.or)
                    }), e
                },
                ProjectInterface = function() {
                    function t(t) {
                        this.compositions.push(t)
                    }
                    return function() {
                        function e(t) {
                            for (var e = 0, r = this.compositions.length; e < r;) {
                                if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                                e += 1
                            }
                        }
                        return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
                    }
                }(),
                EffectsExpressionInterface = function() {
                    function t(r, i, s, a) {
                        var n, o = [],
                            h = r.ef.length;
                        for (n = 0; n < h; n += 1) 5 === r.ef[n].ty ? o.push(t(r.ef[n], i.effectElements[n], i.effectElements[n].propertyGroup, a)) : o.push(e(i.effectElements[n], r.ef[n].ty, a, l));

                        function l(t) {
                            return 1 === t ? p : s(t - 1)
                        }
                        var p = function(t) {
                            for (var e = r.ef, i = 0, s = e.length; i < s;) {
                                if (t === e[i].nm || t === e[i].mn || t === e[i].ix) return 5 === e[i].ty ? o[i] : o[i]();
                                i += 1
                            }
                            return o[0]()
                        };
                        return p.propertyGroup = l, "ADBE Color Control" === r.mn && Object.defineProperty(p, "color", {
                            get: function() {
                                return o[0]()
                            }
                        }), Object.defineProperty(p, "numProperties", {
                            get: function() {
                                return r.np
                            }
                        }), p.active = p.enabled = 0 !== r.en, p
                    }

                    function e(t, e, r, i) {
                        var s = ExpressionPropertyInterface(t.p);
                        return t.p.setGroupProperty && t.p.setGroupProperty(i),
                            function() {
                                return 10 === e ? r.comp.compInterface(t.p.v) : s()
                            }
                    }
                    return {
                        createEffectsInterface: function(e, r) {
                            if (e.effectsManager) {
                                var i, s = [],
                                    a = e.data.ef,
                                    n = e.effectsManager.effectElements.length;
                                for (i = 0; i < n; i += 1) s.push(t(a[i], e.effectsManager.effectElements[i], r, e));
                                return function(t) {
                                    for (var r = e.data.ef || [], i = 0, a = r.length; i < a;) {
                                        if (t === r[i].nm || t === r[i].mn || t === r[i].ix) return s[i];
                                        i += 1
                                    }
                                }
                            }
                        }
                    }
                }(),
                MaskManagerInterface = function() {
                    function t(t, e) {
                        this._mask = t, this._data = e
                    }
                    Object.defineProperty(t.prototype, "maskPath", {
                        get: function() {
                            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
                        }
                    }), Object.defineProperty(t.prototype, "maskOpacity", {
                        get: function() {
                            return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
                        }
                    });
                    return function(e, r) {
                        var i, s = createSizedArray(e.viewData.length),
                            a = e.viewData.length;
                        for (i = 0; i < a; i += 1) s[i] = new t(e.viewData[i], e.masksProperties[i]);
                        return function(t) {
                            for (i = 0; i < a;) {
                                if (e.masksProperties[i].nm === t) return s[i];
                                i += 1
                            }
                        }
                    }
                }(),
                ExpressionPropertyInterface = function() {
                    var t = {
                            pv: 0,
                            v: 0,
                            mult: 1
                        },
                        e = {
                            pv: [0, 0, 0],
                            v: [0, 0, 0],
                            mult: 1
                        };

                    function r(t, e, r) {
                        Object.defineProperty(t, "velocity", {
                            get: function() {
                                return e.getVelocityAtTime(e.comp.currentFrame)
                            }
                        }), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function(i) {
                            if (t.numKeys) {
                                var s = "";
                                s = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
                                var a = "unidimensional" === r ? new Number(s) : Object.assign({}, s);
                                return a.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, a
                            }
                            return 0
                        }, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup
                    }

                    function i() {
                        return t
                    }
                    return function(s) {
                        return s ? "unidimensional" === s.propType ? function(e) {
                            e && "pv" in e || (e = t);
                            var i = 1 / e.mult,
                                s = e.pv * i,
                                a = new Number(s);
                            return a.value = s, r(a, e, "unidimensional"),
                                function() {
                                    return e.k && e.getValue(), s = e.v * i, a.value !== s && ((a = new Number(s)).value = s, r(a, e, "unidimensional")), a
                                }
                        }(s) : function(t) {
                            t && "pv" in t || (t = e);
                            var i = 1 / t.mult,
                                s = t.pv.length,
                                a = createTypedArray("float32", s),
                                n = createTypedArray("float32", s);
                            return a.value = n, r(a, t, "multidimensional"),
                                function() {
                                    t.k && t.getValue();
                                    for (var e = 0; e < s; e += 1) a[e] = n[e] = t.v[e] * i;
                                    return a
                                }
                        }(s) : i
                    }
                }(),
                TextExpressionSelectorProp, propertyGetTextProp;

            function SliderEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }

            function AngleEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }

            function ColorEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
            }

            function PointEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
            }

            function LayerIndexEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }

            function MaskIndexEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }

            function CheckboxEffect(t, e, r) {
                this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
            }

            function NoValueEffect() {
                this.p = {}
            }

            function EffectsManager() {}

            function EffectsManager(t, e) {
                var r = t.ef || [];
                this.effectElements = [];
                var i, s, a = r.length;
                for (i = 0; i < a; i++) s = new GroupEffect(r[i], e), this.effectElements.push(s)
            }

            function GroupEffect(t, e) {
                this.init(t, e)
            }
            TextExpressionSelectorProp = function() {
                function t(t, e) {
                    return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v
                }
                return function(e, r) {
                    this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, r, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty
                }
            }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function(t, e, r) {
                return 1 === e.t ? new TextExpressionSelectorProp(t, e, r) : propertyGetTextProp(t, e, r)
            }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function(t, e) {
                this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
                var r, i, s = this.data.ef.length,
                    a = this.data.ef;
                for (r = 0; r < s; r += 1) {
                    switch (i = null, a[r].ty) {
                        case 0:
                            i = new SliderEffect(a[r], e, this);
                            break;
                        case 1:
                            i = new AngleEffect(a[r], e, this);
                            break;
                        case 2:
                            i = new ColorEffect(a[r], e, this);
                            break;
                        case 3:
                            i = new PointEffect(a[r], e, this);
                            break;
                        case 4:
                        case 7:
                            i = new CheckboxEffect(a[r], e, this);
                            break;
                        case 10:
                            i = new LayerIndexEffect(a[r], e, this);
                            break;
                        case 11:
                            i = new MaskIndexEffect(a[r], e, this);
                            break;
                        case 5:
                            i = new EffectsManager(a[r], e, this);
                            break;
                        default:
                            i = new NoValueEffect(a[r], e, this)
                    }
                    i && this.effectElements.push(i)
                }
            };
            var lottie = {},
                _isFrozen = !1;

            function setLocationHref(t) {
                locationHref = t
            }

            function searchAnimations() {
                !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
            }

            function setSubframeRendering(t) {
                subframeEnabled = t
            }

            function loadAnimation(t) {
                return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
            }

            function setQuality(t) {
                if ("string" == typeof t) switch (t) {
                    case "high":
                        defaultCurveSegments = 200;
                        break;
                    case "medium":
                        defaultCurveSegments = 50;
                        break;
                    case "low":
                        defaultCurveSegments = 10
                } else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
                roundValues(!(defaultCurveSegments >= 50))
            }

            function inBrowser() {
                return "undefined" != typeof navigator
            }

            function installPlugin(t, e) {
                "expressions" === t && (expressionsPlugin = e)
            }

            function getFactory(t) {
                switch (t) {
                    case "propertyFactory":
                        return PropertyFactory;
                    case "shapePropertyFactory":
                        return ShapePropertyFactory;
                    case "matrix":
                        return Matrix
                }
            }

            function checkReady() {
                "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
            }

            function getQueryVariable(t) {
                for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
                    var i = e[r].split("=");
                    if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
                }
            }
            lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocationHref, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.__getFactory = getFactory, lottie.version = "5.6.6";
            var standalone = "__[STANDALONE]__",
                animationData = "__[ANIMATIONDATA]__",
                renderer = "";
            if (standalone) {
                var scripts = document.getElementsByTagName("script"),
                    index = scripts.length - 1,
                    myScript = scripts[index] || {
                        src: ""
                    },
                    queryString = myScript.src.replace(/^[^\?]+\??/, "");
                renderer = getQueryVariable("renderer")
            }
            var readyStateCheckInterval = setInterval(checkReady, 100);
            return lottie
        });
    }, {}],
    "C4qV": [function(require, module, exports) {
        var global = arguments[3];
        var t = arguments[3];
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = function() {
                if ("undefined" != typeof Map) return Map;

                function t(t, e) {
                    var n = -1;
                    return t.some(function(t, r) {
                        return t[0] === e && (n = r, !0)
                    }), n
                }
                return function() {
                    function e() {
                        this.__entries__ = []
                    }
                    return Object.defineProperty(e.prototype, "size", {
                        get: function() {
                            return this.__entries__.length
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.get = function(e) {
                        var n = t(this.__entries__, e),
                            r = this.__entries__[n];
                        return r && r[1]
                    }, e.prototype.set = function(e, n) {
                        var r = t(this.__entries__, e);
                        ~r ? this.__entries__[r][1] = n : this.__entries__.push([e, n])
                    }, e.prototype.delete = function(e) {
                        var n = this.__entries__,
                            r = t(n, e);
                        ~r && n.splice(r, 1)
                    }, e.prototype.has = function(e) {
                        return !!~t(this.__entries__, e)
                    }, e.prototype.clear = function() {
                        this.__entries__.splice(0)
                    }, e.prototype.forEach = function(t, e) {
                        void 0 === e && (e = null);
                        for (var n = 0, r = this.__entries__; n < r.length; n++) {
                            var i = r[n];
                            t.call(e, i[1], i[0])
                        }
                    }, e
                }()
            }(),
            n = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
            r = void 0 !== t && t.Math === Math ? t : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(),
            i = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(r) : function(t) {
                return setTimeout(function() {
                    return t(Date.now())
                }, 1e3 / 60)
            },
            o = 2;

        function s(t, e) {
            var n = !1,
                r = !1,
                s = 0;

            function c() {
                n && (n = !1, t()), r && h()
            }

            function a() {
                i(c)
            }

            function h() {
                var t = Date.now();
                if (n) {
                    if (t - s < o) return;
                    r = !0
                } else n = !0, r = !1, setTimeout(a, e);
                s = t
            }
            return h
        }
        var c = 20,
            a = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
            h = "undefined" != typeof MutationObserver,
            u = function() {
                function t() {
                    this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = s(this.refresh.bind(this), c)
                }
                return t.prototype.addObserver = function(t) {
                    ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_()
                }, t.prototype.removeObserver = function(t) {
                    var e = this.observers_,
                        n = e.indexOf(t);
                    ~n && e.splice(n, 1), !e.length && this.connected_ && this.disconnect_()
                }, t.prototype.refresh = function() {
                    this.updateObservers_() && this.refresh()
                }, t.prototype.updateObservers_ = function() {
                    var t = this.observers_.filter(function(t) {
                        return t.gatherActive(), t.hasActive()
                    });
                    return t.forEach(function(t) {
                        return t.broadcastActive()
                    }), t.length > 0
                }, t.prototype.connect_ = function() {
                    n && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), h ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0)
                }, t.prototype.disconnect_ = function() {
                    n && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1)
                }, t.prototype.onTransitionEnd_ = function(t) {
                    var e = t.propertyName,
                        n = void 0 === e ? "" : e;
                    a.some(function(t) {
                        return !!~n.indexOf(t)
                    }) && this.refresh()
                }, t.getInstance = function() {
                    return this.instance_ || (this.instance_ = new t), this.instance_
                }, t.instance_ = null, t
            }(),
            f = function(t, e) {
                for (var n = 0, r = Object.keys(e); n < r.length; n++) {
                    var i = r[n];
                    Object.defineProperty(t, i, {
                        value: e[i],
                        enumerable: !1,
                        writable: !1,
                        configurable: !0
                    })
                }
                return t
            },
            d = function(t) {
                return t && t.ownerDocument && t.ownerDocument.defaultView || r
            },
            p = E(0, 0, 0, 0);

        function v(t) {
            return parseFloat(t) || 0
        }

        function _(t) {
            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            return e.reduce(function(e, n) {
                return e + v(t["border-" + n + "-width"])
            }, 0)
        }

        function l(t) {
            for (var e = {}, n = 0, r = ["top", "right", "bottom", "left"]; n < r.length; n++) {
                var i = r[n],
                    o = t["padding-" + i];
                e[i] = v(o)
            }
            return e
        }

        function b(t) {
            var e = t.getBBox();
            return E(0, 0, e.width, e.height)
        }

        function m(t) {
            var e = t.clientWidth,
                n = t.clientHeight;
            if (!e && !n) return p;
            var r = d(t).getComputedStyle(t),
                i = l(r),
                o = i.left + i.right,
                s = i.top + i.bottom,
                c = v(r.width),
                a = v(r.height);
            if ("border-box" === r.boxSizing && (Math.round(c + o) !== e && (c -= _(r, "left", "right") + o), Math.round(a + s) !== n && (a -= _(r, "top", "bottom") + s)), !w(t)) {
                var h = Math.round(c + o) - e,
                    u = Math.round(a + s) - n;
                1 !== Math.abs(h) && (c -= h), 1 !== Math.abs(u) && (a -= u)
            }
            return E(i.left, i.top, c, a)
        }
        var y = "undefined" != typeof SVGGraphicsElement ? function(t) {
            return t instanceof d(t).SVGGraphicsElement
        } : function(t) {
            return t instanceof d(t).SVGElement && "function" == typeof t.getBBox
        };

        function w(t) {
            return t === d(t).document.documentElement
        }

        function g(t) {
            return n ? y(t) ? b(t) : m(t) : p
        }

        function O(t) {
            var e = t.x,
                n = t.y,
                r = t.width,
                i = t.height,
                o = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
                s = Object.create(o.prototype);
            return f(s, {
                x: e,
                y: n,
                width: r,
                height: i,
                top: n,
                right: e + r,
                bottom: i + n,
                left: e
            }), s
        }

        function E(t, e, n, r) {
            return {
                x: t,
                y: e,
                width: n,
                height: r
            }
        }
        var M = function() {
                function t(t) {
                    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = E(0, 0, 0, 0), this.target = t
                }
                return t.prototype.isActive = function() {
                    var t = g(this.target);
                    return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight
                }, t.prototype.broadcastRect = function() {
                    var t = this.contentRect_;
                    return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t
                }, t
            }(),
            A = function() {
                return function(t, e) {
                    var n = O(e);
                    f(this, {
                        target: t,
                        contentRect: n
                    })
                }
            }(),
            x = function() {
                function t(t, n, r) {
                    if (this.activeObservations_ = [], this.observations_ = new e, "function" != typeof t) throw new TypeError("The callback provided as parameter 1 is not a function.");
                    this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r
                }
                return t.prototype.observe = function(t) {
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    if ("undefined" != typeof Element && Element instanceof Object) {
                        if (!(t instanceof d(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                        var e = this.observations_;
                        e.has(t) || (e.set(t, new M(t)), this.controller_.addObserver(this), this.controller_.refresh())
                    }
                }, t.prototype.unobserve = function(t) {
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    if ("undefined" != typeof Element && Element instanceof Object) {
                        if (!(t instanceof d(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                        var e = this.observations_;
                        e.has(t) && (e.delete(t), e.size || this.controller_.removeObserver(this))
                    }
                }, t.prototype.disconnect = function() {
                    this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
                }, t.prototype.gatherActive = function() {
                    var t = this;
                    this.clearActive(), this.observations_.forEach(function(e) {
                        e.isActive() && t.activeObservations_.push(e)
                    })
                }, t.prototype.broadcastActive = function() {
                    if (this.hasActive()) {
                        var t = this.callbackCtx_,
                            e = this.activeObservations_.map(function(t) {
                                return new A(t.target, t.broadcastRect())
                            });
                        this.callback_.call(t, e, t), this.clearActive()
                    }
                }, t.prototype.clearActive = function() {
                    this.activeObservations_.splice(0)
                }, t.prototype.hasActive = function() {
                    return this.activeObservations_.length > 0
                }, t
            }(),
            T = "undefined" != typeof WeakMap ? new WeakMap : new e,
            R = function() {
                return function t(e) {
                    if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function.");
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    var n = u.getInstance(),
                        r = new x(e, n, this);
                    T.set(this, r)
                }
            }();
        ["observe", "unobserve", "disconnect"].forEach(function(t) {
            R.prototype[t] = function() {
                var e;
                return (e = T.get(this))[t].apply(e, arguments)
            }
        });
        var D = void 0 !== r.ResizeObserver ? r.ResizeObserver : R,
            j = D;
        exports.default = j;
    }, {}],
    "jFKs": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var n = require("lit-element");

        function e() {
            const n = r(["\n* {\n  box-sizing: border-box;\n}\n\n:host {\n  --lottie-player-toolbar-height: 35px;\n  --lottie-player-toolbar-background-color: transparent;\n  --lottie-player-toolbar-icon-color: #999;\n  --lottie-player-toolbar-icon-hover-color: #222;\n  --lottie-player-toolbar-icon-active-color: #555;\n  --lottie-player-seeker-track-color: #CCC;\n  --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);\n\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.main {\n  box-sizing: border-box;\n  display: inline-grid;\n  grid-auto-columns: auto;\n  grid-template-rows: auto;\n  position: relative;\n  height: inherit;\n  width: inherit;\n}\n\n.main.controls {\n  grid-template-rows: 1fr var(--lottie-player-toolbar-height);\n}\n\n.animation {\n  overflow: hidden;\n  height: calc(1fr - var(--lottie-player-toolbar-height));\n}\n\n.toolbar {\n  display: grid;\n  grid-template-columns: 32px 32px 1fr 32px 32px;\n  align-items: center;\n  justify-items: center;\n  background-color: var(--lottie-player-toolbar-background-color);\n}\n\n.toolbar button {\n  cursor: pointer;\n  fill: var(--lottie-player-toolbar-icon-color);\n  display: flex;\n  background: none;\n  border: 0;\n  padding: 0;\n  outline: none;\n  height: 100%;\n}\n\n.toolbar button:hover {\n  fill: var(--lottie-player-toolbar-icon-hover-color);\n}\n\n.toolbar button.active {\n  fill: var(--lottie-player-toolbar-icon-active-color);\n}\n\n.toolbar button svg {\n}\n\n.toolbar button.disabled svg {\n  display: none;\n}\n\n.toolbar a {\n  filter: grayscale(100%);\n  display: flex;\n  transition: filter .5s, opacity 0.5s;\n  opacity: 0.4;\n  height: 100%;\n  align-items: center;\n}\n\n.toolbar a:hover {\n  filter: none;\n  display: flex;\n  opacity: 1;\n}\n\n.toolbar a svg {\n}\n\n.seeker {\n  -webkit-appearance: none;\n  width: 95%;\n  outline: none;\n}\n\n.seeker::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-webkit-slider-thumb {\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -5px;\n}\n.seeker:focus::-webkit-slider-runnable-track {\n  background: #999;\n}\n.seeker::-moz-range-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-moz-range-thumb {\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n}\n.seeker::-ms-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n.seeker::-ms-fill-lower {\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-ms-fill-upper {\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-ms-thumb {\n  border: 0;\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n}\n.seeker:focus::-ms-fill-lower {\n  background: var(--lottie-player-seeker-track-color);\n}\n.seeker:focus::-ms-fill-upper {\n  background: var(--lottie-player-seeker-track-color);\n}\n\n.error {\n  display: flex;\n  justify-content: center;\n  height: 100%;\n  align-items: center;\n}\n"]);
            return e = function() {
                return n
            }, n
        }

        function r(n, e) {
            return e || (e = n.slice(0)), Object.freeze(Object.defineProperties(n, {
                raw: {
                    value: Object.freeze(e)
                }
            }))
        }
        var o = (0, n.css)(e());
        exports.default = o;
    }, {
        "lit-element": "bhxD"
    }],
    "M8c7": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.parseSrc = f, exports.LottiePlayer = exports.PlayerEvents = exports.PlayMode = exports.PlayerState = void 0;
        var t = require("lit-element"),
            e = s(require("lottie-web/build/player/lottie")),
            i = r(require("resize-observer-polyfill")),
            o = r(require("./lottie-player.styles"));

        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        function n() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return n = function() {
                return t
            }, t
        }

        function s(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" != typeof t && "function" != typeof t) return {
                default: t
            };
            var e = n();
            if (e && e.has(t)) return e.get(t);
            var i = {},
                o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var r in t)
                if (Object.prototype.hasOwnProperty.call(t, r)) {
                    var s = o ? Object.getOwnPropertyDescriptor(t, r) : null;
                    s && (s.get || s.set) ? Object.defineProperty(i, r, s) : i[r] = t[r]
                } return i.default = t, e && e.set(t, i), i
        }

        function a() {
            const t = d(['<div class="error">⚠️</div>']);
            return a = function() {
                return t
            }, t
        }

        function h() {
            const t = d(["\n      <div class=", '>\n        <div class="animation" style=', ">\n          ", "\n        </div>\n        ", "\n      </div>"]);
            return h = function() {
                return t
            }, t
        }

        function l() {
            const t = d(['<svg width="24" height="24"><path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z"/></svg>']);
            return l = function() {
                return t
            }, t
        }

        function p() {
            const t = d(['<svg width="24" height="24"><path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"/></svg>']);
            return p = function() {
                return t
            }, t
        }

        function c() {
            const t = d(['\n      <div class="toolbar">\n        <button @click=', " class=", ">\n          ", "\n        </button>\n        <button @click=", " class=", '>\n          <svg width="24" height="24"><path d="M6 6h12v12H6V6z" /></svg>\n        </button>\n        <input class="seeker" type="range" min="0" step="1" max="100" .value=', "\n          @input=", "\n          @mousedown=", "\n          @mouseup=", "\n        />\n        <button @click=", " class=", '>\n          <svg width="24" height="24">\n            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"/>\n          </svg>\n        </button>\n        <a href="https://www.lottiefiles.com/" target="_blank">\n          <svg width="24" height="24" viewBox="0 0 320 320" fill-rule="nonzero"><rect fill="#adadad" x=".5" y=".5" width="100%" height="100%" rx="26.73"/><path d="M251.304 65.44a16.55 16.55 0 0 1 13.927 18.789c-1.333 9.04-9.73 15.292-18.762 13.954-15.992-2.37-39.95 22.534-66.77 73.74-34.24 65.37-66.113 96.517-99.667 94.032-9.102-.674-15.93-8.612-15.258-17.723s8.592-15.96 17.695-15.286c16.57 1.227 40.908-24.737 67.97-76.4 34.46-65.79 66.764-96.157 100.866-91.105z" fill="#fff"/></svg>\n        </a>\n      </div>\n    ']);
            return c = function() {
                return t
            }, t
        }

        function d(t, e) {
            return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
                raw: {
                    value: Object.freeze(e)
                }
            }))
        }
        var u, v, y, g = function(t, e, i, o) {
            var r, n = arguments.length,
                s = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o);
            else
                for (var a = t.length - 1; a >= 0; a--)(r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, i, s) : r(e, i)) || s);
            return n > 3 && s && Object.defineProperty(e, i, s), s
        };

        function f(t) {
            if ("object" == typeof t) return t;
            try {
                return JSON.parse(t)
            } catch (e) {
                return new URL(t, window.location.href).toString()
            }
        }
        exports.PlayerState = u,
            function(t) {
                t.Loading = "loading", t.Playing = "playing", t.Paused = "paused", t.Stopped = "stopped", t.Frozen = "frozen", t.Error = "error"
            }(u || (exports.PlayerState = u = {})), exports.PlayMode = v,
            function(t) {
                t.Normal = "normal", t.Bounce = "bounce"
            }(v || (exports.PlayMode = v = {})), exports.PlayerEvents = y,
            function(t) {
                t.Load = "load", t.Error = "error", t.Ready = "ready", t.Play = "play", t.Pause = "pause", t.Stop = "stop", t.Freeze = "freeze", t.Loop = "loop", t.Complete = "complete", t.Frame = "frame"
            }(y || (exports.PlayerEvents = y = {}));
        let m = class extends t.LitElement {
            constructor() {
                super(...arguments), this.mode = v.Normal, this.autoplay = !1, this.background = "transparent", this.controls = !1, this.direction = 1, this.hover = !1, this.loop = !1, this.renderer = "svg", this.speed = 1, this.currentState = u.Loading, this.intermission = 1, this._io = void 0, this._ro = void 0, this._counter = 0
            }
            _onVisibilityChange() {
                !0 === document.hidden && this.currentState === u.Playing ? this.freeze() : this.currentState === u.Frozen && this.play()
            }
            _handleSeekChange(t) {
                if (!this._lottie || isNaN(t.target.value)) return;
                const e = t.target.value / 100 * this._lottie.totalFrames;
                this.seek(e)
            }
            load(t) {
                if (!this.shadowRoot) return;
                const i = {
                    container: this.container,
                    loop: !1,
                    autoplay: !1,
                    renderer: this.renderer,
                    rendererSettings: {
                        scaleMode: "noScale",
                        preserveAspectRatio: "xMinYMin meet",
                        clearCanvas: !1,
                        progressiveLoad: !0,
                        hideOnTransparent: !0
                    }
                };
                try {
                    const r = f(t),
                        n = "string" == typeof r ? "path" : "animationData";
                    this._lottie && this._lottie.destroy(), this._lottie = e.loadAnimation(Object.assign(Object.assign({}, i), {
                        [n]: r
                    }))
                } catch (o) {
                    return this.currentState = u.Error, void this.dispatchEvent(new CustomEvent(y.Error))
                }
                this._lottie && (this._lottie.addEventListener("enterFrame", () => {
                    this.seeker = this._lottie.currentFrame / this._lottie.totalFrames * 100, this.dispatchEvent(new CustomEvent(y.Frame, {
                        detail: {
                            frame: this._lottie.currentFrame,
                            seeker: this.seeker
                        }
                    }))
                }), this._lottie.addEventListener("complete", () => {
                    this.currentState === u.Playing ? !this.loop || this.count && this._counter >= this.count ? this.dispatchEvent(new CustomEvent(y.Complete)) : this.mode === v.Bounce ? (this.count && (this._counter += .5), setTimeout(() => {
                        this.dispatchEvent(new CustomEvent(y.Loop)), this.currentState === u.Playing && (this._lottie.setDirection(-1 * this._lottie.playDirection), this._lottie.play())
                    }, this.intermission)) : (this.count && (this._counter += 1), window.setTimeout(() => {
                        this.dispatchEvent(new CustomEvent(y.Loop)), this.currentState === u.Playing && (this._lottie.stop(), this._lottie.play())
                    }, this.intermission)) : this.dispatchEvent(new CustomEvent(y.Complete))
                }), this._lottie.addEventListener("DOMLoaded", () => {
                    this.dispatchEvent(new CustomEvent(y.Ready))
                }), this._lottie.addEventListener("data_ready", () => {
                    this.dispatchEvent(new CustomEvent(y.Load))
                }), this._lottie.addEventListener("data_failed", () => {
                    this.currentState = u.Error, this.dispatchEvent(new CustomEvent(y.Error))
                }), this.container.addEventListener("mouseenter", () => {
                    this.hover && this.currentState !== u.Playing && this.play()
                }), this.container.addEventListener("mouseleave", () => {
                    this.hover && this.currentState === u.Playing && this.stop()
                }), this.setSpeed(this.speed), this.setDirection(this.direction), this.autoplay && this.play())
            }
            getLottie() {
                return this._lottie
            }
            play() {
                this._lottie && (this._lottie.play(), this.currentState = u.Playing, this.dispatchEvent(new CustomEvent(y.Play)))
            }
            pause() {
                this._lottie && (this._lottie.pause(), this.currentState = u.Paused, this.dispatchEvent(new CustomEvent(y.Pause)))
            }
            stop() {
                this._lottie && (this._counter = 0, this._lottie.stop(), this.currentState = u.Stopped, this.dispatchEvent(new CustomEvent(y.Stop)))
            }
            seek(t) {
                if (!this._lottie) return;
                const e = t.toString().match(/^([0-9]+)(%?)$/);
                if (!e) return;
                const i = "%" === e[2] ? this._lottie.totalFrames * Number(e[1]) / 100 : Number(e[1]);
                this.seeker = i, this.currentState === u.Playing ? this._lottie.goToAndPlay(i, !0) : (this._lottie.goToAndStop(i, !0), this._lottie.pause())
            }
            snapshot(t = !0) {
                if (!this.shadowRoot) return;
                const e = this.shadowRoot.querySelector(".animation svg"),
                    i = (new XMLSerializer).serializeToString(e);
                if (t) {
                    const t = document.createElement("a");
                    t.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(i), t.download = "download_" + this.seeker + ".svg", document.body.appendChild(t), t.click(), document.body.removeChild(t)
                }
                return i
            }
            freeze() {
                this._lottie && (this._lottie.pause(), this.currentState = u.Frozen, this.dispatchEvent(new CustomEvent(y.Freeze)))
            }
            setSpeed(t = 1) {
                this._lottie && this._lottie.setSpeed(t)
            }
            setDirection(t) {
                this._lottie && this._lottie.setDirection(t)
            }
            setLooping(t) {
                this._lottie && (this.loop = t, this._lottie.loop = t)
            }
            togglePlay() {
                return this.currentState === u.Playing ? this.pause() : this.play()
            }
            toggleLooping() {
                this.setLooping(!this.loop)
            }
            resize() {
                this._lottie && this._lottie.resize()
            }
            static get styles() {
                return o.default
            }
            firstUpdated() {
                "IntersectionObserver" in window && (this._io = new IntersectionObserver(t => {
                    t[0].isIntersecting ? this.currentState === u.Frozen && this.play() : this.currentState === u.Playing && this.freeze()
                }), this._io.observe(this.container)), "ResizeObserver" in window && (this._ro = new i.default(() => {
                    this.resize()
                }), this._ro.observe(this.container)), void 0 !== document.hidden && document.addEventListener("visibilitychange", () => this._onVisibilityChange()), this.src && this.load(this.src)
            }
            disconnectedCallback() {
                this._io && (this._io.disconnect(), this._io = void 0), this._ro && (this._ro.disconnect(), this._ro = void 0), document.removeEventListener("visibilitychange", () => this._onVisibilityChange())
            }
            renderControls() {
                const e = this.currentState === u.Playing,
                    i = this.currentState === u.Paused,
                    o = this.currentState === u.Stopped;
                return (0, t.html)(c(), this.togglePlay, e || i ? "active" : "", e ? (0, t.html)(p()) : (0, t.html)(l()), this.stop, o ? "active" : "", this.seeker, this._handleSeekChange, () => {
                    this._prevState = this.currentState, this.freeze()
                }, () => {
                    this._prevState === u.Playing && this.play()
                }, this.toggleLooping, this.loop ? "active" : "")
            }
            render() {
                const e = this.controls ? "main controls" : "main";
                return (0, t.html)(h(), e, "background:" + this.background, this.currentState === u.Error ? (0, t.html)(a()) : void 0, this.controls ? this.renderControls() : void 0)
            }
        };
        exports.LottiePlayer = m, g([(0, t.query)(".animation")], m.prototype, "container", void 0), g([(0, t.property)()], m.prototype, "mode", void 0), g([(0, t.property)({
            type: Boolean
        })], m.prototype, "autoplay", void 0), g([(0, t.property)({
            type: String,
            reflect: !0
        })], m.prototype, "background", void 0), g([(0, t.property)({
            type: Boolean
        })], m.prototype, "controls", void 0), g([(0, t.property)({
            type: Number
        })], m.prototype, "count", void 0), g([(0, t.property)({
            type: Number
        })], m.prototype, "direction", void 0), g([(0, t.property)({
            type: Boolean
        })], m.prototype, "hover", void 0), g([(0, t.property)({
            type: Boolean,
            reflect: !0
        })], m.prototype, "loop", void 0), g([(0, t.property)({
            type: String
        })], m.prototype, "renderer", void 0), g([(0, t.property)({
            type: Number
        })], m.prototype, "speed", void 0), g([(0, t.property)({
            type: String
        })], m.prototype, "src", void 0), g([(0, t.property)({
            type: String
        })], m.prototype, "currentState", void 0), g([(0, t.property)()], m.prototype, "seeker", void 0), g([(0, t.property)()], m.prototype, "intermission", void 0), exports.LottiePlayer = m = g([(0, t.customElement)("lottie-player")], m);
    }, {
        "lit-element": "bhxD",
        "lottie-web/build/player/lottie": "xaRr",
        "resize-observer-polyfill": "C4qV",
        "./lottie-player.styles": "jFKs"
    }],
    "bpfl": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = void 0;
        var e = require("lit-element"),
            t = r(require("./lottie-player.styles"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function n() {
            const e = u(["\n", "\n\n:host {\n  width: 512px;\n  height: 512px;\n}\n"]);
            return n = function() {
                return e
            }, e
        }

        function u(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
                raw: {
                    value: Object.freeze(t)
                }
            }))
        }
        var i = (0, e.css)(n(), t.default);
        exports.default = i;
    }, {
        "lit-element": "bhxD",
        "./lottie-player.styles": "jFKs"
    }],
    "dmqP": [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.TGSPlayer = void 0;
        var e = require("lit-element"),
            t = a(require("pako")),
            n = require("./lottie-player"),
            o = s(require("./tgs-player.styles"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r() {
            if ("function" != typeof WeakMap) return null;
            var e = new WeakMap;
            return r = function() {
                return e
            }, e
        }

        function a(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" != typeof e && "function" != typeof e) return {
                default: e
            };
            var t = r();
            if (t && t.has(e)) return t.get(e);
            var n = {},
                o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var s in e)
                if (Object.prototype.hasOwnProperty.call(e, s)) {
                    var a = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                    a && (a.get || a.set) ? Object.defineProperty(n, s, a) : n[s] = e[s]
                } return n.default = e, t && t.set(e, n), n
        }
        var i = function(e, t, n, o) {
            var s, r = arguments.length,
                a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)(s = e[i]) && (a = (r < 3 ? s(a) : r > 3 ? s(t, n, a) : s(t, n)) || a);
            return r > 3 && a && Object.defineProperty(t, n, a), a
        };

        function u(e) {
            return new Promise((n, o) => {
                const s = new XMLHttpRequest;
                s.open("GET", e, !0), s.responseType = "arraybuffer", s.send(), s.onreadystatechange = function() {
                    if (4 == s.readyState && 200 == s.status) try {
                        const r = String.fromCharCode.apply(null, new Uint8Array(s.response));
                        return n(JSON.parse(r))
                    } catch (e) {
                        try {
                            const r = t.inflate(s.response, {
                                to: "string"
                            });
                            return n(JSON.parse(r))
                        } catch (e) {
                            return o(e)
                        }
                    }
                }
            })
        }
        let l = class extends n.LottiePlayer {
            constructor() {
                super(...arguments), this.strict = !0
            }
            async load(e) {
                let t = (0, n.parseSrc)(e);
                if ("path" === ("string" == typeof t ? "path" : "animationData") && (t = await u(t)), !0 === this.strict) {
                    const e = this.formatCheck(t);
                    0 !== e.length && this.dispatchEvent(new CustomEvent(n.PlayerEvents.Error, {
                        detail: e
                    }))
                }
                return delete t.tgs, super.load(t)
            }
            static get styles() {
                return o.default
            }
            formatCheck(e) {
                const t = [];
                return "tgs" in e && 1 === e.tgs || t.push("Must be marked as a TGS Lottie variant"), (e.op - e.ip) / e.fr > 3 && t.push("Longer than 3 seconds"), 512 == e.w && 512 == e.h || t.push("Dimensions should be exactly 512pxx512px"), null != e.ddd && 0 != e.ddd && t.push("Must not have 3D layers"), "markers" in e && t.push("Must not have markers"), null != e.assets && e.assets.forEach(e => {
                    t.concat(this.checkLayer(e.layers))
                }), e.layers.forEach(e => {
                    t.concat(this.checkLayer(e))
                }), t
            }
            checkLayer(e) {
                const t = [];
                return null != e.ddd && 0 != e.ddd && t.push("Composition should not include any 3D Layers"), null != e.sr && 1 != e.sr && t.push("Composition should not include any Time Stretching"), null != e.tm && t.push("Composition should not include any Time Remapping"), 1 === e.ty && t.push("Composition should not include any Solids"), 2 === e.ty && t.push("Composition should not include any Images"), 5 === e.ty && t.push("Composition should not include any Texts"), !0 !== e.hasMask && null == e.masksProperties || t.push("Composition should not include any Masks"), null != e.tt && t.push("Composition should not include any Mattes"), 1 === e.ao && t.push("Composition should not include any Auto-Oriented Layers"), null != e.ef && t.push("Composition should not include any Layer Effects"), t.concat(this.checkItems(e.shapes, !0)), t
            }
            checkItems(e, t) {
                const n = [];
                return null != e && e.forEach(e => {
                    "rp" == e.ty && n.push("Composition should not include any Repeaters"), "sr" == e.ty && n.push("Composition should not include any Star Shapes"), "mm" == e.ty && n.push("Composition should not include any Merge Paths"), "gs" == e.ty && n.push("Composition should not include any Gradient Strokes"), !0 === t && n.concat(this.checkItems(e.it, !1))
                }), n
            }
        };
        exports.TGSPlayer = l, i([(0, e.property)({
            type: Boolean
        })], l.prototype, "strict", void 0), exports.TGSPlayer = l = i([(0, e.customElement)("tgs-player")], l);
    }, {
        "lit-element": "bhxD",
        "pako": "f4vO",
        "./lottie-player": "M8c7",
        "./tgs-player.styles": "bpfl"
    }]
}, {}, ["dmqP"], null)
//# sourceMappingURL=/tgs-player.js.map
