/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(59)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserPosts_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49a07ef4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserPosts_vue__ = __webpack_require__(45);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(53)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-49a07ef4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserPosts_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49a07ef4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserPosts_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/UserPosts.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49a07ef4", Component.options)
  } else {
    hotAPI.reload("data-v-49a07ef4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserProfile_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ce9558ec_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserProfile_vue__ = __webpack_require__(50);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(58)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ce9558ec"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserProfile_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ce9558ec_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserProfile_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/UserProfile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ce9558ec", Component.options)
  } else {
    hotAPI.reload("data-v-ce9558ec", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_a_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6920882d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_a_vue__ = __webpack_require__(46);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(54)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6920882d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_a_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6920882d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_a_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/a.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6920882d", Component.options)
  } else {
    hotAPI.reload("data-v-6920882d", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_134a84ed_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_app_vue__ = __webpack_require__(43);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(51)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-134a84ed"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_134a84ed_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_app_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-134a84ed", Component.options)
  } else {
    hotAPI.reload("data-v-134a84ed", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_b_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_692e9fae_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_b_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(55)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-692e9fae"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_b_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_692e9fae_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_b_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/b.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-692e9fae", Component.options)
  } else {
    hotAPI.reload("data-v-692e9fae", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_202a161e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(44);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(52)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-202a161e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_202a161e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-202a161e", Component.options)
  } else {
    hotAPI.reload("data-v-202a161e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.functionalOptions = undefined;
  this.functionalScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneVNodes(vnode.children);
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production' && inject) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  // static trees can be rendered once and cached on the contructor options
  // so every instance shares the same cached trees
  var renderFns = this.$options.staticRenderFns;
  var cached = renderFns.cached || (renderFns.cached = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = renderFns[index].call(this._renderProxy, null, this);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.functionalScopeId = options._scopeId;
        vnode.functionalContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.functionalContext = contextVm;
    vnode.functionalOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        if (slot._rendered) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && cached$$1 !== current) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }

      var ref = this;
      var cache = ref.cache;
      var keys = ref.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.2';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(
            config.ignoredElements.length &&
            config.ignoredElements.some(function (ignore) {
              return isRegExp(ignore)
                ? ignore.test(tag)
                : ignore === tag
            })
          ) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.functionalScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.functionalContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !vnodeToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE9 || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\"/>";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$1 = 0; i$1 < postTransforms.length; i$1++) {
        postTransforms[i$1](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (!el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });
      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (process.env.NODE_ENV !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3), __webpack_require__(4), __webpack_require__(39).setImmediate))

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in2_css__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in2_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__in2_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__in_css__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__in_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__in_css__);
//
//
//
//
//
//
//



// 调用了
/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        return {
            msg: 'Hello World!'
        };
    }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    mounted() {
        this.fn();
    },
    methods: {
        fn() {}
    },
    computed: {}
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    computed: {
        //如何在任何组件中取到store下面的值
        //使用this.$store.state.count;==>>取state
        //使用this.$store.getters.data;==>>取getters

        count() {
            return this.$store.state.count;
        },
        data() {
            return this.$store.getters.data;
        },
        data2() {
            return this.$store.getters.data2;
        },
        data3() {
            return this.$store.getters.data3(500);
            //传参进去供使用
        }
    }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Favlist_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__new_vue__ = __webpack_require__(42);
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    props: ["id"],
    methods: {
        router(path) {
            console.log("router");
            this.$router.push(path);
        }
    },
    mounted() {},
    data() {
        return {
            msg: 'Hello World!',
            routerId: this.$route.params.id
        };
    },
    components: {
        ar: __WEBPACK_IMPORTED_MODULE_0__Favlist_vue__["a" /* default */],
        ar2: __WEBPACK_IMPORTED_MODULE_1__new_vue__["a" /* default */]
    }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        return {
            msg: 'Hello World!'
        };
    }
});

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_UserPosts_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_UserProfile_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_router__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_a_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_b_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__index_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__vue_app_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__vue_index_vue__ = __webpack_require__(12);
/**
 * Created by mahenan on 2017/10/19.
 */








// import '../common/rem.js'




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* default */]);
//全局注册vue-router和vuex

//----------->vue-router<---------------
const store = new __WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* default */].Store({
    strict: true, //加入了严格模式，可以监听无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
    //不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
    state: { //类似于一个data的集合，可以暴露给外面访问,叫做===》状态
        count: 0,
        index: 100
    },
    mutations: {
        increment(state) {
            //可以传入state（状态）作为第一个参数
            state.count++;
        },
        indexAdd(state, payLoad) {
            //可以传入载荷作为第二个参数，一般是一个对象，可以理解为是一个函数的参数
            state.index += payLoad.count;
        },
        alert() {
            console.log('xixihaha');
        }
    },
    actions: {
        alert(context) {
            context.commit("alert");
        }
    },
    getters: { //相当于state的计算属性，同样可以暴露给外面
        data(state) {
            //state作为第一个参数
            return state.count + 200;
        },
        data2(state, getters) {
            //getters作为第二个参数，但是state必须做为第一个参数，即使不使用
            return getters.data + 200;
        },
        data3(state, getters) {
            //可以返回一个函数暴露给外面。传参进去可以按需查找state下面的变量
            return function (id) {
                return getters.data2 + id;
            };
        }
    }
});

// store.state.count=100; //不推荐的写法，追踪不到状态的改变

// store.commit('indexAdd',{count2:200});//尽量使用这种显式的提交改变store中的状态，不要直接改变状态

store.commit({ count: 300, type: 'indexAdd' }); //将整体都作为载荷传递进去，但是mutations的处理不变
//执行mutations


store.dispatch("alert");
//执行actions

console.log("store.state.==>>", store.state.count); // -> 1
console.log("store.state.index", store.state.index);
//取store下面的状态

console.log(store.getters.data);
console.log(store.getters.data2);
//取store下面的getters


//----------->vuex<-----------
const router = new __WEBPACK_IMPORTED_MODULE_3_vue_router__["a" /* default */]({
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // },
    // 切换路由的时候。会回到页面的顶部
    routes: [{ path: '/app/:id',
        // component: app,
        name: 'app',
        components: {
            default: __WEBPACK_IMPORTED_MODULE_8__vue_app_vue__["a" /* default */],
            view1: __WEBPACK_IMPORTED_MODULE_5__vue_a_vue__["a" /* default */],
            view2: __WEBPACK_IMPORTED_MODULE_6__vue_b_vue__["a" /* default */]
        },
        //添加props可以将路由的参数作为组件的属性传入子组件，解耦，不那么依赖this.$route.params.id了
        //有命名视图的时候,必须为每个命名视图添加是否作为组件属性传入
        props: {
            default: true,
            view1: true,
            view2: true
        },
        children: [
        //嵌套路由
        {
            // 当 /app/:id/profile 匹配成功，
            // UserProfile 会被渲染在 app 的 <router-view> 中
            path: 'profile',
            component: __WEBPACK_IMPORTED_MODULE_2__vue_UserProfile_vue__["a" /* default */]
        }, {
            // 当 /app/:id/posts 匹配成功
            // UserPosts 会被渲染在 app 的 <router-view> 中
            path: 'posts',
            component: __WEBPACK_IMPORTED_MODULE_1__vue_UserPosts_vue__["a" /* default */]
        }]
    }, {
        path: '/index',
        component: __WEBPACK_IMPORTED_MODULE_9__vue_index_vue__["a" /* default */],
        name: 'index'
    }]
});

router.afterEach((to, from) => {
    console.log(from);
    console.log(to);
});
//路由守卫也是个很重要的功能，可以取到路由变化的各种时间节点


// new Vue({
//     el: '.app',
//     router,
//     components: {app}
// })

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    router, //注册vue-router到所有组件
    store //注册vuex到所有组件
}).$mount('.vue');

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\nbody .a .b[data-v-9ece4628] {\n  height: 60px;\n  background: green;\n}\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*@import '../in2.css';*/\n/*@import '../in.css';*/\nbody .a .b[data-v-ca0aba36] {\n  height: 60px;\n  background: green;\n}\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(3)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(38);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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//////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAU4QklNBAIAAAAAAAwAAAAAAAAAAAAAAAA4QklNBDAAAAAAAAYBAQEBAQE4QklNBC0AAAAAAAYAAQAAAAU4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADUQAAAAYAAAAAAAAAAAAAASwAAAEsAAAADo1iAGkAcABoAG8AbgBlADhSBk6rAGkAYwBvAG4AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAASwAAAEsAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAEsAAAAAFJnaHRsb25nAAABLAAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAABLAAAAABSZ2h0bG9uZwAAASwAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1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ZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0xMC0xMVQxNzozODo0NSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNy0xMC0xMVQxNzozODo1NCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTctMTAtMTFUMTc6Mzg6NTQrMDg6MDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdmZmEzNDM4LTcxMTktNDkxOC04MzkzLWUxYTdiODZkMWFiMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMzNkN2IwZS00YzhhLTQ1OTQtOWEzZC1hMTM2NTAyNTgzMjciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMzNkN2IwZS00YzhhLTQ1OTQtOWEzZC1hMTM2NTAyNTgzMjciPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Iui1oiIgcGhvdG9zaG9wOkxheWVyVGV4dD0i6LWiIi8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iaXBob25lOCIgcGhvdG9zaG9wOkxheWVyVGV4dD0iaXBob25lOCIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPkMzN0E5RDdFRjQ4QkZDRUI5RjM3NUNDODcwMzE3MDJCPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyNmYyNmJmZS02NzVkLTRhYWItYTE1NS02NWU4ZGFkNzA0YWM8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMzNkN2IwZS00YzhhLTQ1OTQtOWEzZC1hMTM2NTAyNTgzMjciIHN0RXZ0OndoZW49IjIwMTctMTAtMTFUMTc6Mzg6NDUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWY5NTE2NjQtZTczMy00OGE4LWEwZjQtZDY0NjE2OGE5MmUwIiBzdEV2dDp3aGVuPSIyMDE3LTEwLTExVDE3OjM4OjU0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2ZmYTM0MzgtNzExOS00OTE4LTgzOTMtZTFhN2I4NmQxYWIyIiBzdEV2dDp3aGVuPSIyMDE3LTEwLTExVDE3OjM4OjU0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFmOTUxNjY0LWU3MzMtNDhhOC1hMGY0LWQ2NDYxNjhhOTJlMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMzNkN2IwZS00YzhhLTQ1OTQtOWEzZC1hMTM2NTAyNTgzMjciIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMzNkN2IwZS00YzhhLTQ1OTQtOWEzZC1hMTM2NTAyNTgzMjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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qrS1tre4ubrExcbHyMnK1NXW19jZ2uTl5ufo6er09fb3+Pn6EQACAQMCBAQDBQQEBAYGBW0BAgMRBCESBTEGACITQVEHMmEUcQhCgSORFVKhYhYzCbEkwdFDcvAX4YI0JZJTGGNE8aKyJjUZVDZFZCcKc4OTRnTC0uLyVWV1VjeEhaOzw9Pj8ykalKS0xNTk9JWltcXV5fUoR1dmOHaGlqa2xtbm9md3h5ent8fX5/dIWGh4iJiouMjY6Pg5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6vr/2gAMAwEAAhEDEQA/AN/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/0N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/0t/j37r3XvfuvdePHv3XuuBewJt/vPurFgaKhPWiVBpqz1i897aY2a4JFvza3+H+Pvaaj/aLpHzPVRInieGxIb7Cf8HTLkt2bcwxIzOdwuJsLn+JZfHUVgOT6amoibgf4e0km4WMXxXSV+3pRFa3spGiykIPCgJr+wdJV+5+pY2Kv2XsRSDax3Xhfxx/yuW9sjdtvIr9Uv7el67HvTDUu2SlfsP+brie6uogCf8ASbsO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"

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Favlist_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ca0aba36_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Favlist_vue__ = __webpack_require__(49);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(57)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ca0aba36"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Favlist_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ca0aba36_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Favlist_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/Favlist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca0aba36", Component.options)
  } else {
    hotAPI.reload("data-v-ca0aba36", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_new_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ece4628_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_new_vue__ = __webpack_require__(48);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(56)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9ece4628"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_new_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ece4628_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_new_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/index/vue/new.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ece4628", Component.options)
  } else {
    hotAPI.reload("data-v-9ece4628", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "router-link",
        {
          staticClass: "profile",
          attrs: { to: "/app/" + _vm.routerId + "/profile" }
        },
        [_vm._v("profile")]
      ),
      _vm._v(" "),
      _c(
        "router-link",
        {
          staticClass: "posts",
          attrs: { to: "/app/" + _vm.routerId + "/posts" }
        },
        [_vm._v("posts")]
      ),
      _vm._v(" "),
      _c("router-view"),
      _vm._v(" "),
      _c("div", [_vm._v("router:" + _vm._s(_vm.routerId))]),
      _vm._v(" "),
      _c("div", [_vm._v("id:" + _vm._s(_vm.id))])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-134a84ed", esExports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("img", { attrs: { src: __webpack_require__(40), alt: "" } })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-202a161e", esExports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._v("UserPosts.vue" + _vm._s(_vm.$store.state.count))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-49a07ef4", esExports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._v("a.vue")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6920882d", esExports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._v("b.vue")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-692e9fae", esExports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "a" },
    [
      _vm._l(2, function(n) {
        return _c("div", { domProps: { textContent: _vm._s(_vm.msg) } })
      }),
      _vm._v(" "),
      _c("div", { staticClass: "b" })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9ece4628", esExports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "a" },
    [
      _vm._l(2, function(n) {
        return _c("div", { domProps: { textContent: _vm._s(_vm.msg) } })
      }),
      _vm._v(" "),
      _c("div", { staticClass: "b" })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ca0aba36", esExports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", [_vm._v("UserProfile.vue==》" + _vm._s(_vm.count))]),
    _vm._v(" "),
    _c("div", [_vm._v("UserProfile.vue==》" + _vm._s(_vm.data))]),
    _vm._v(" "),
    _c("div", [_vm._v("UserProfile.vue==》" + _vm._s(_vm.data2))]),
    _vm._v(" "),
    _c("div", [_vm._v("UserProfile.vue==》" + _vm._s(_vm.data3))])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ce9558ec", esExports)
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5f3a181c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-134a84ed\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./app.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-134a84ed\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("328e7b49", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-202a161e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-202a161e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1eebd4e2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49a07ef4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./UserPosts.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49a07ef4\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./UserPosts.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f8313b1a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6920882d\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./a.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6920882d\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./a.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("53d3571e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-692e9fae\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./b.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-692e9fae\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./b.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("79e805f1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ece4628\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./new.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ece4628\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./new.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f85f4786", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca0aba36\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Favlist.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca0aba36\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Favlist.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("444a2e6a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ce9558ec\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./UserProfile.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ce9558ec\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./UserProfile.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);