(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  //判断是否数组
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }
  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newVal) {
        vm[source][key] = newVal;
      }
    });
  }

  var oldArrayPrototype = Array.prototype;
  var arrayMethods = Object.create(oldArrayPrototype);
  var METHODS = ['push', 'splice', 'unshift', 'pop', 'shift', 'reverse', 'sort'];
  METHODS.forEach(function (method) {
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args));

      var insertData;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          insertData = args;
          break;

        case 'splice':
          insertData = args.slice(2);
          break;
      }

      if (insertData) ob.observeArray(insertData);
    };
  });

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      if (Array.isArray(value)) {
        def(value, '__ob__', this);
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observe, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(value) {
        Object.keys(value).forEach(function (key) {
          defineReactive(value, key, value[key]);
        });
      }
    }]);

    return Observe;
  }();

  function defineReactive(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue);
        value = newValue;
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) return;
    new Observe(data);
  }

  function initState(vm) {
    if (vm.$options.props) ;

    if (vm.$options.methods) ;

    if (vm.$options.data) {
      initData(vm);
    }

    if (vm.$options.computed) ;

    if (vm.$options.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/;
  var root = null;
  var stack = [];
  var TAG_TYPE = 1;
  var TEXT_TYPE = 3;
  var currentParent;

  function createAstElement(tagName, attrs) {
    return {
      tag: tagName,
      parent: null,
      children: [],
      attrs: attrs,
      nodeType: TAG_TYPE
    };
  }

  function end(tagName) {
    var element = stack.pop();

    if (element.tag !== tagName) {
      throw new Error('html error');
    }

    currentParent = stack[stack.length - 1];

    if (currentParent) {
      currentParent.children.push(element);
      element.parent = currentParent.tag;
    }
  }

  function chars(text) {
    text = text.replace(/\s/g, '');
    var element = {
      nodeType: TEXT_TYPE,
      text: text
    };

    if (text && currentParent) {
      currentParent.children.push(element);
    }
  }

  function start(tagName, attrs) {
    var element = createAstElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  }

  function parseHtml(html) {
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
        }

        return match;
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].name === 'style') {
        var value = attrs[i].value;
        value = value.replace(/\;/g, ',');
        str += "".concat(attrs[i].name, ":{").concat(value.slice(0, -1), "},");
      } else {
        str += "".concat(attrs[i].name, ":").concat(attrs[i].value, ",");
      }
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children && children.length) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }).join(','));
    } else {
      return false;
    }
  }

  function generate(el) {
    return "_c(\"".concat(el.tag, "\",").concat(el.attrs.length ? genProps(el.attrs) : 'undefined', ",").concat(genChildren(el), ")");
  }

  function gen(el) {
    if (el.nodeType === 1) {
      return generate(el);
    } else {
      var lastIndex = defaultTagRE.lastIndex = 0;
      var tokens = [];
      var match;
      var text = el.text;

      while (match = defaultTagRE.exec(text)) {
        var _index = match.index;

        if (_index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, _index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = _index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function compilationToRender(template) {
    var root = parseHtml(template);
    var renderData = generate(root);
    var renderFn = new Function("with(this){".concat(renderData, "}"));
    return renderFn;
  }

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, getter, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.getter = getter;
      this.cb = cb;
      this.options = options;
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        this.getter();
      }
    }]);

    return Watcher;
  }();

  function mountComponent(vm, el) {
    var options = vm.$options;
    vm.$el = el;

    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {}, true);
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function () {};
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      initState(vm);
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
          var render = compilationToRender(template);
          options.render = render;
        }
      }

      mountComponent(vm, el);
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function () {};
  }

  var Vue = function Vue(options) {
    _classCallCheck(this, Vue);

    this._init(options);

    if (options.el) {
      this.$mount(options.el);
    }
  };

  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
