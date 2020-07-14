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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return [parentVal];
    }
  }

  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'Mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];
  var strats = {};
  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {};

    for (var key in parent) {
      merge(key);
    }

    for (var _key in child) {
      merge(_key);
    }

    function merge(key) {
      if (strats[key]) {
        return options[key] = strats[key](parent[key], child[key]);
      }

      if (_typeof(parent[key]) === 'object' && _typeof(child[key]) === 'object') {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else if (child[key] === undefined) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
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

      var result = (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args));

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
      ob.dep.notify();
      return result;
    };
  });

  var id = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id++;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "depend",
      value: function depend() {
        Dep.target.addDep(this);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();
  var stack = [];
  function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
  }
  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      if (Array.isArray(value)) {
        this.dep = new Dep();
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
    var childOB = observe(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        // console.log('取值', value)
        if (Dep.target) {
          dep.depend();

          if (childOB) {
            childOB.dep.depend();

            if (Array.isArray(value)) {
              arrayDep(value);
            }
          }
        }

        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        observe(newValue);
        value = newValue;
        dep.notify();
      }
    });
  }

  function arrayDep(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        arrayDep(current);
      }
    }
  }

  function observe(data) {
    if (!isObject(data)) return;
    return new Observe(data);
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
  var stack$1 = [];
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
    var element = stack$1.pop();

    if (element.tag !== tagName) {
      throw new Error('html error');
    }

    currentParent = stack$1[stack$1.length - 1];

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
    stack$1.push(element);
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
        (function () {
          var obj = {};
          attrs[i].value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            var styleName;

            if (key.includes('-')) {
              var _key$split = key.split('-'),
                  _key$split2 = _slicedToArray(_key$split, 2),
                  classKey = _key$split2[0],
                  name = _key$split2[1];

              var replaceKey = name.substring(0, 1).toLocaleUpperCase();
              styleName = classKey + replaceKey + name.slice(1);
            } else {
              styleName = key;
            }

            obj[styleName] = value;
          });
          attrs[i].value = obj;
        })();
      }

      str += "".concat(attrs[i].name, ":").concat(JSON.stringify(attrs[i].value), ",");
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
      var match, index;
      var text = el.text;

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
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
    var renderFn = new Function("with(this){return ".concat(renderData, "}"));
    return renderFn;
  }

  var callTicks = [];
  var waiting = false;

  function flushQueue() {
    callTicks.forEach(function (cb) {
      return cb();
    });
    waiting = false;
  }

  function nextTick(cb) {
    callTicks.push(cb);

    if (!waiting) {
      setTimeout(flushQueue, 0);
      waiting = true;
    }
  }

  var queue = [];
  var has = {};

  function flushQueue$1() {
    queue.forEach(function (item) {
      return item.run();
    });
    has = {};
    queue.length = 0;
  }

  function queueWatcher(watcher) {
    var id = watcher.id;

    if (has[id] === undefined) {
      queue.push(watcher);
      has[id] = true;
      nextTick(flushQueue$1);
    }
  }

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, getter, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.getter = getter;
      this.cb = cb;
      this.id = id$1++;
      this.options = options;
      this.depIds = new Set();
      this.deps = [];
      this.get();
    }

    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(Dep) {
        var id = Dep.id;

        if (!this.depIds.has(id)) {
          this.depIds.add(id);
          this.deps.push(Dep);
          console.log(id, 'watcher');
          Dep.addSub(this);
        }
      }
    }, {
      key: "get",
      value: function get() {
        pushTarget(this);
        this.getter();
        popTarget();
      }
    }, {
      key: "update",
      value: function update() {
        queueWatcher(this);
      }
    }, {
      key: "run",
      value: function run() {
        this.get();
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    var isRealNode = oldVnode.nodeType;

    if (isRealNode) {
      var oldElm = oldVnode;
      var parentElm = oldVnode.parentNode;
      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm);
      return el;
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag,
        data = vnode.data,
        children = vnode.children,
        key = vnode.key,
        text = vnode.text;

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      //虚拟dom映射真实dom
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var propsData = vnode.data;
    var el = vnode.el;

    for (var key in propsData) {
      if (key === 'class') {
        el.className = propsData[key];
      } else if (key === 'style') {
        for (var styleName in propsData[key]) {
          el.style[styleName] = propsData[key][styleName];
        }
      } else {
        el.setAttribute(key, propsData[key]);
      }
    }
  }

  function mountComponent(vm, el) {
    var options = vm.$options;
    vm.$el = el;
    callHook(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      console.log('update');

      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {}, true);
    callHook(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      vm.$el = patch(vm.$el, vnode); //虚拟节点创建出真实节点替换掉原有$el
    };
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm);
      }
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, 'beforeCreate');
      initState(vm);
      callHook(vm, 'created');
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

    Vue.prototype.$nextTick = nextTick;
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var key = data.key;

    if (key) {
      delete data.key;
    }

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vNode(tag, data, key, children, undefined);
  }
  function createTextNode(text) {
    return vNode(undefined, undefined, undefined, undefined, text);
  }

  function vNode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments);
    };

    Vue.prototype._v = function (text) {
      return createTextNode(text);
    };

    Vue.prototype._s = function (val) {
      return val === null ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      return render.call(vm);
    };
  }

  function initOptionsAPI(Vue) {
    Vue.options = {};

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      console.log(this.options);
    };
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
  lifecycleMixin(Vue);
  initOptionsAPI(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
