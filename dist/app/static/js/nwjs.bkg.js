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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./.nwjs-config/nw.bkg.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.nwjs-config/config/index.js":
/*!**************************************!*\
  !*** ./.nwjs-config/config/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) { // Template version: \n// see http://vuejs-templates.github.io/webpack for documentation.\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nmodule.exports = {\n  dev: {\n    // Paths\n    assetsSubDirectory: 'static',\n    assetsPublicPath: '/',\n    proxyTable: {},\n    // Various Dev Server settings\n    host: 'localhost',\n    // can be overwritten by process.env.HOST\n    port: 8080,\n    // can be overwritten by process.env.PORT, if port is in use, a free one will be determined\n    autoOpenBrowser: false,\n    errorOverlay: true,\n    notifyOnErrors: true,\n    poll: false,\n    // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-\n    // Use Eslint Loader?\n    // If true, your code will be linted during bundling and\n    // linting errors and warnings will be shown in the console.\n    useEslint: true,\n    // If true, eslint errors and warnings will also be shown in the error overlay\n    // in the browser.\n    showEslintErrorsInOverlay: false,\n\n    /**\n     * Source Maps\n     */\n    // https://webpack.js.org/configuration/devtool/#development\n    devtool: 'cheap-module-eval-source-map',\n    // If you have problems debugging vue-files in devtools,\n    // set this to false - it *may* help\n    // https://vue-loader.vuejs.org/en/options.html#cachebusting\n    cacheBusting: true,\n    cssSourceMap: true\n  },\n  build: {\n    // Template for index.html\n    index: path.resolve(__dirname, '../../dist/app/index.html'),\n    // Paths\n    assetsRoot: path.resolve(__dirname, '../../dist/app'),\n    assetsSubDirectory: 'static',\n    assetsPublicPath: '',\n\n    /**\n     * Source Maps\n     */\n    productionSourceMap: true,\n    // https://webpack.js.org/configuration/devtool/#production\n    devtool: '#source-map',\n    // Gzip off by default as many popular static hosts such as\n    // Surge or Netlify already gzip all static assets for you.\n    // Before setting to `true`, make sure to:\n    // npm install --save-dev compression-webpack-plugin\n    productionGzip: false,\n    productionGzipExtensions: ['js', 'css'],\n    // Run the build command with an extra argument to\n    // View the bundle analyzer report after build finishes:\n    // `npm run build --report`\n    // Set to `true` or `false` to always turn it on or off\n    bundleAnalyzerReport: process.env.npm_config_report\n  },\n  bkg: {\n    assetsRoot: path.resolve(__dirname, '../../dist/app'),\n    assetsPublicPath: '',\n    entry: path.resolve(__dirname, './nw.bkg.js'),\n\n    /**\n     * Source Maps\n     */\n    productionSourceMap: true,\n    // https://webpack.js.org/configuration/devtool/#production\n    devtool: '#source-map'\n  }\n};\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./.nwjs-config/config/index.js?");

/***/ }),

/***/ "./.nwjs-config/nw.bkg.js":
/*!********************************!*\
  !*** ./.nwjs-config/nw.bkg.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isProduction = \"development\" === 'production';\n\nvar config = __webpack_require__(/*! ./config */ \"./.nwjs-config/config/index.js\");\n\nvar url = isProduction ? './dist/app/index.html' : \"http://\".concat(config.dev.host, \":\").concat(config.dev.port);\nvar winConfig = nw.App.manifest.window;\nwinConfig.new_instance = true;\nnw.Window.open(url, winConfig);\n\n//# sourceURL=webpack:///./.nwjs-config/nw.bkg.js?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });