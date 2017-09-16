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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/util/make.js ***!
  \***************************************************************************/
/*! exports provided: Make, hasPrototype, Mixin */
/*! exports used: Make, Mixin, hasPrototype */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Make; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasPrototype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Mixin; });
/**
 * The make module consits of Make, getPrototypeOf and mixin.
 * See the documentation for each method to see what is does.
 * This module is part of the ApplicationFrame.
 * @module Make
 * @author Jovan Gerodetti
 * @copyright Jovan Gerodetti
 * @version 1.0
 */


/**
 * Internal function to apply one objects propteries to a target object.
 *
 * @param {Object} target
 * @param {Object} source
 * @inner
 */
var apply = function (target, source) {
    Object.keys(source).forEach(function(key){
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });

    return target;
};

/**
 * Creates a new object with the given prototype.
 * If two arguments are passed in, the properties of the first object will be
 * applied to the new object.
 *
 * @param {Object} object
 * @param {Object} prototype
 * @return {function}
 */
var Make = function(object, prototype) {
    if(arguments.length < 2){
        prototype = object;
        object = null;
    }

    if (object === null) {
        object = Object.create(prototype);
    } else {
        object = apply(Object.create(prototype), object);
    }

    var m = function(...args){
        var make = object.make || object._make || function(){};

        make.apply(object, args);

        return object;
    };

    m.get = function(){ return object; };

    return m;
};

/**
 * This method checks if the given prototype is in the prototype chain of
 * the given target object.
 *
 * @param {Object} object
 * @param {Object} prototype
 * @return {boolean}
 */
var hasPrototype = function(object, prototype){
    var p = Object.getPrototypeOf(object);

    while(p !== null && p !== undefined){
        if(typeof prototype == 'function')
            prototype = prototype.prototype;

        if(p == prototype)
            return true;
        else
            p = Object.getPrototypeOf(p);
    }

    return false;
};

/**
 * Creates a new prototype mixing all the given prototypes. Incase two or more
 * prototypes contain the same propterty, the new prototype will return
 * the propterty of the first prototype in the list which contains it.
 *
 * @param {...Object} prototypes - the porotype object to combine
 * @return {Proxy} - the resulting proxy object
 */
var Mixin = function(...prototypes){

    return new Proxy(prototypes, MixinTrap);

};

/**
 * Internal function to find a proptery in a list of prototypes.
 *
 * @param {Object[]} prototypes
 * @param {string} key
 * @return {Object}
 */
var findProperty = function(prototypes, key) {
    for (var i = 0; i < prototypes.length; i++) {
        var item = prototypes[i];

        if (item && item[key]) {
            return item;
        }
    }

    return undefined;
};

/**
 * Traps to create a mixin.
 */
var MixinTrap = {

    'get' : function(prototypes, key) {
        var object = findProperty(prototypes, key);

        if (object && typeof object[key] === 'function') {
            return object[key].bind(object);
        }

        return (object ? object[key] : null);
    },

    'set' : function(prototypes, key, value) {
        var object = findProperty(prototypes, key);

        if (object) {
            object[key] = value;
        } else {
            prototypes[0][key] = value;
        }

        return true;
    }
};


/***/ }),
/* 1 */
/*!**********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Parser.js ***!
  \**********************************************************************************/
/*! exports provided: ObjectParser, parseExpression, parseAttributeName, assignExpression */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectParser", function() { return ObjectParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseExpression", function() { return parseExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignExpression", function() { return assignExpression; });
/**
 * @module DataBinding/Parser
 */

/**
 * Parses an object expression
 *
 * @param {string} source - the string to parse.
 * @return {Object} the parsed result.
 */
let ObjectParser = function(source){
    let target = null;
    let key = false;
    let keyBuffer = '';
    let valueBuffer = '';
    let run = true;

    source.split('').forEach((char) => {
        if (run) {
            if (char === '{') {
                target = {};
                key = true;
            } else if(char === ':') {
                key = false;
            } else if(char === ',') {
                target[keyBuffer.trim()] = valueBuffer.trim();
                keyBuffer = valueBuffer = '';
                key = true;
            } else if(char === '}') {
                target[keyBuffer.trim()] = valueBuffer.trim();
                run = false;
            } else if(key) {
                keyBuffer += char;
            } else if(!key) {
                valueBuffer += char;
            }
        }
    });

    return target;
};

/**
 * Parses a given expression in the context of the given scope.
 *
 * @param {string} expression - the expression to parse.
 * @param {ScopePrototype} scope - the scope on which the expression should be parsed.
 * @return {*} the result value.
 */
let parseExpression = function(expression, ...contexts) {
    expression = expression.trim();
    let chain = expression.match(/[\w\$]+(?:\([^)]*\))*/g) || [];
    let scope = null;
    let functionTest = /\(([^)]*)\)/;

    if (!isNaN(expression)) {
        return parseFloat(expression);
    }

    if (chain.length === 0) {
        return undefined;
    }

    for (let i = 0; i < contexts.length; i++) {
        scope = contexts[i];

        chain.forEach((item) => {
            let pos = item.search(functionTest);

            if (scope) {
                if (pos > 0) {
                    let args = item.match(functionTest)[1].split(',').map(item => item.trim());
                    let scopeChild = scope[item.substring(0, pos)];

                    if (scopeChild) {
                        args = args.map(arg => parseExpression(arg, ...contexts));
                        scope = scopeChild.apply(scope, args);
                    } else {
                        scope = null;
                    }
                } else {
                    if (typeof scope[item] === 'function') {
                        scope = scope[item].bind(scope);
                    } else {
                        scope = scope[item];
                    }
                }
            }
        });

        if (scope !== null && scope !== undefined) {
            break;
        }
    }

    return (scope !== null && typeof scope !== 'undefined') ? scope : '';
};

const parseAttributeName = function(attributeName) {
    const regExp = /^([a-zA-Z0-9\-]+)(?:$|\((.*)\)$)/;
    const result = attributeName.match(regExp) || [];

    result.shift();

    return result;
};
/* harmony export (immutable) */ __webpack_exports__["parseAttributeName"] = parseAttributeName;


/**
 * Assings an value to an expression in an given scope
 *
 * @param {string} expression the expression on whith the value should be assigned
 * @param {ScopePrototype} scope the scope to operate on
 * @param {string} value the value to assign
 *
 * @return {void}
 */
let assignExpression = function(expression, scope, value){
    let chain = expression.split('.');

    chain.forEach((property, index) => {
        if (chain.length -1 !== index) {
            scope = scope[property];
        } else {
            scope[property] = value;
        }
    });
};


/***/ }),
/* 2 */
/*!***********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Binding.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make__ = __webpack_require__(/*! ../af/util/make */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);




/** @lends module:DataBinding.Binding.prototype */
let Binding = {

    /**
     * @type {string[]}
     */
    properties : null,

    /**
     * @type {string}
     */
    originalNodeValue : '',

    /**
     * @type {Node}
     */
    node : null,

    /**
     * @type {Node}
     */
    parentNode : null,

    /**
     * @type {Boolean}
     */
    singleExpression : false,

    /**
     * The basic prototype for bindings. Any binding should inherit form this prototype.
     *
     * @constructs
     * @return {void}
     */
    _make : function() {
        this.properties = [];
    },

    /**
     * updates a binding. The model will be checked for changes
     * and new data will be applied to the binding target.
     *
     * @param  {module:DataBinding.ScopePrototype} scope the scope on which
     *                                             this binding should operate.
     *
     * @return {void}
     */
    update : function(scope){
        let text = this.originalNodeValue;
        let localNode = { element: this.parentNode };
        let values = this.properties.map(key => {
            let item = { name : key, value : Object(__WEBPACK_IMPORTED_MODULE_1__Parser_js__["parseExpression"])(key, localNode, scope) };

            return item;
        });

        if (this.singleExpression) {
            text = Object(__WEBPACK_IMPORTED_MODULE_1__Parser_js__["parseExpression"])(text, localNode, scope);
        } else {
            text = text.toString().trim().split(/\s+/).join(' ');

            values.forEach(pair => {
                text = text.replace(`\{\{${pair.name}\}\}`, pair.value);
            });
        }


        if (Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make__["c" /* hasPrototype */])(this.node, window.Attr)) {
            if (this.parentNode.getAttribute(this.node.name) !== text) {
                Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(this.parentNode).setAttribute(this.node.name, text);
            }
        } else {
            if (this.node.textContent !== text) {
                this.node.textContent = text;
            }
        }
    },

    test: function() { return true; }
};

/* harmony default export */ __webpack_exports__["a"] = (Binding);


/***/ }),
/* 3 */
/*!********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Util.js ***!
  \********************************************************************************/
/*! exports provided: selectElement, selectAllElements, unwrapPolymerNode, polyMask, polyInvoke, getPolyParent, sanitizeText, nodeIsVisible */
/*! exports used: getPolyParent, polyInvoke, sanitizeText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export selectElement */
/* unused harmony export selectAllElements */
/* unused harmony export unwrapPolymerNode */
/* unused harmony export polyMask */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return polyInvoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getPolyParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sanitizeText; });
/* unused harmony export nodeIsVisible */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);


/**
 * selects a dom node by the given query.
 *
 * @function
 * @deprecated don't use this anymore, polyMask is deprecated.
 *
 * @param {string} query the query selector to search for on the DOM
 * @param {Node} [context] the node to start the searching on
 *
 * @return {Node} the first node that matches the selector
 */
let selectElement = function(query, context){
    let node = null;

    if (context) {
        node = context.querySelector(query);
    } else {
        node = document.querySelector(query);
    }

    node = polyMask(node);

    return node;
};

/**
 * @function
 * @deprecated don't use anymore. Use {@link document.querySelectorAll}
 *
 * @param {string} query the query to look for
 * @param {Node} context the node to start the searching on
 *
 * @return {NodeList} the node list with all matching nodes
 */
let selectAllElements = function(query, context) {
    let nodeList = null;

    if (context) {
        nodeList = context.querySelectorAll(query);
    } else {
        nodeList = document.querySelectorAll(query);
    }

    if (window.Polymer) {
        nodeList = [].map.apply(nodeList, [polyMask]);
    }

    return nodeList;
};

/**
 * attempts to extract the original node from an polymer node
 *
 * @function
 * @deprecated there is no need to use this function anymore
 *
 * @param {Node} node the node to unwrap
 *
 * @return {Node} a mixin exposing the original node
 */
let unwrapPolymerNode = function(node) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["c" /* hasPrototype */])(node, Node)) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["b" /* Mixin */])(node, node.node);
    }

    return node;
};

/**
 * creates a mixin of the node and a wrapped version from Polymer
 *
 * @function
 * @deprecated this method shouldn't be used anymore. Use polyInvoke
 *
 * @param {Node} node the dom node to mask
 *
 * @return {Node} returns the masked node
 */
let polyMask = function(node){
    let polyNode = {};

    let additions = {
        get bare (){
            return node;
        }
    };

    if (window.Polymer) {
        polyNode = window.Polymer.dom(node);
    }

    return Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["b" /* Mixin */])(polyNode, node, additions);
};

/**
 * Tries to call Polymers dom() function if available, to keep them in the loop.
 *
 * @param {Node} node the node we want to take care of.
 * @return {Node} the dom node, maybe wrapped.
 */
let polyInvoke = function(node) {

    if (window.Polymer) {
        node = window.Polymer.dom(node);
    }

    return node;
};

/**
 * attempts to find a parent node with a particular node name
 *
 * @function
 *
 * @param {Node} node the base node
 * @param {string} parentName the node name to search for
 *
 * @return {Node} the node we where searching for
 */
let getPolyParent = function(node, parentName){
    while (node && node.localName !== parentName) {
        node = node.parentNode;
    }

    return node;
};

let sanitizeText = function(rawText) {
    let text = rawText.replace(/\&nbsp\;/g, '\u00a0').replace(/<br>/, '\n');

    // html escape
    text = document.createTextNode(text).textContent;

    //fix legal HTML
    text = text.replace(/\n/g, '<br>').replace(/ {2}/g, ' &nbsp;');

    return text;
};

/**
 * checks if a node is currenty visible on the viewport
 *
 * @param  {Node} node - the node to check
 * @return {boolean} - the visibility status of the node
 */
let nodeIsVisible = function(node) {
    return node.offsetHeight === 0 && node.offsetWidth === 0;
};


/***/ }),
/* 4 */
/*!*******************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/BindingRegistry.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @module DataBinding/BindingRegistry
 */

/**
 * Registry of all bindings.
 *
 * @type {Object}
 */
let registry = {};


/**
 * Public Singleton Interface for the binding registry.
 *
 * @class BindingRegistry
 */
/** @lends module:DataBinding/BindingRegistry~BindingRegistry.prototype */
let BindingRegistry = {

    /**
     * @param {Binding} binding - new binding type
     * @return {boolean} - success status
     */
    register : function(binding) {
        if (!registry[binding.name]) {
            registry[binding.name] = binding;
            return true;

        } else {
            console.warn(`Binding type ${binding.name} already exists!`);
            return false;
        }
    },

    /**
     * @param {string} name - binding name
     * @return {Binding} - the binding for the given name
     */
    get: function(name) {
        return registry[name];
    }
};

/**
 * @member BindingRegistry
 * @static
 * @type module:DataBinding/BindingRegistry~BindingRegistry
 */
/* harmony default export */ __webpack_exports__["a"] = (BindingRegistry);


/***/ }),
/* 5 */
/*!**************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/BindingApi.js ***!
  \**************************************************************************************/
/*! exports provided: default, setScopeInfo */
/*! exports used: default, setScopeInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Bind__ = __webpack_require__(/*! ./Bind */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Binding__ = __webpack_require__(/*! ./Binding */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BindingRegistry__ = __webpack_require__(/*! ./BindingRegistry */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Parser__ = __webpack_require__(/*! ./Parser */ 1);





let currentScopeInfo = null;

const instanceMap = new WeakMap();

const BindingApiPrototype = {

    _binding: null,

    _scopeInfo: null,

    registerBinding(binding) {
        return __WEBPACK_IMPORTED_MODULE_2__BindingRegistry__["a" /* default */].register(binding);
    },

    attachBinding(bindingInstance) {
        currentScopeInfo.bindings.push(bindingInstance);
    },

    parser: __WEBPACK_IMPORTED_MODULE_3__Parser__,

    Binding: __WEBPACK_IMPORTED_MODULE_1__Binding__["a" /* default */],

    scheduleScopeUpdate(callback) {

        const { _binding: identifier } = this;

        if (!this._scopeInfo) {
            console.error('[DataBinding API]', '"scheduleScopeUpdate" has to be called on an api instance! No scope context present!');
            return;
        }

        if (!identifier || typeof identifier.update !== 'function' || typeof identifier.test !== 'function') {
            console.log('[DataBinding API]',
                'unable to schedule scope update! identifier does not match the Binidng trait!');

            return;
        }

        if (!this.updateScheduled) {
            Object(__WEBPACK_IMPORTED_MODULE_0__Bind__["d" /* scheduleScopeUpdate */])(this._scopeInfo, (scope) => {
                this.scheduledScopeUpdates.forEach(callback => callback(scope));
                this.scheduledScopeUpdates.length = 0;
                this.updateScheduled = false;
            });

            this.updateScheduled = true;
        }

        this.scheduledScopeUpdates.set(identifier, callback);
    }
};

const BindingApi = function(binding) {
    if (!binding) {
        return BindingApiPrototype;
    }

    if (instanceMap.has(binding)) {
        return instanceMap.get(binding);
    } else if (currentScopeInfo) {
        const instance = {
            _binding: binding,
            _scopeInfo: currentScopeInfo,
            scheduledScopeUpdates: new Map(),
            updateScheduled: false,

            __proto__: BindingApiPrototype,
        };

        instanceMap.set(binding, instance);
        return instance;
    }

    console.error('No scope context present! Unable to return api instance!');
    return null;
};

/* harmony default export */ __webpack_exports__["a"] = (BindingApi);

const setScopeInfo = function(newScopeInfo) {
    currentScopeInfo = newScopeInfo;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = setScopeInfo;



/***/ }),
/* 6 */
/*!*********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/rendering/index.js ***!
  \*********************************************************************************/
/*! exports provided: RenderEngine */
/*! exports used: RenderEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderEngine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__memory__ = __webpack_require__(/*! ../memory */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Frame__ = __webpack_require__(/*! ./Frame */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CurrentFrameInterface__ = __webpack_require__(/*! ./CurrentFrameInterface */ 17);
/**
 * @module RenderEngine
 */





/** @type {Function[]} */
let preRenderHooks = [];

/** @type {Function[]} */
let postRenderHooks = [];

const frameBuffer = [];

frameBuffer.last = function() { return this[this.length-1]; };

/** @type {boolean} */
let active = false;

const getNow = function() {
    return window.performance ? window.performance.now() : Date.now();
};

const renderConfig = {
    lightray: false,
};

/**
 * performs all render tasks from one frame. This is one render cycle.
 *
 * @param {number} startTime - the time the render cycle started
 *
 * @return {void}
 */
let renderCycle = function(startTime) {
    active = false;

    // run all post render hooks after a frame has been painted. So this happens
    // at the beginning of the next cycle.
    postRenderHooks.forEach(hook => {
        hook();
    });

    frameBuffer[0].postRenderTasks.filter(task => {
        task();
    });

    // init render cycle START
    const frame = frameBuffer[1];

    // migrate remaining tasks to this Frame
    frameBuffer[0].preRenderTasks.getAll().forEach((task) => {
        frame.preRenderTasks.unshift(task.work, task.id);
    });

    frameBuffer[0].renderTasks.getAll().forEach((task) => {
        frame.renderTasks.unshift(task.work, task.id);
    });

    frameBuffer[0].postRenderTasks.getAll().forEach((task) => {
        frame.postRenderTasks.unshift(task.work, task.id);
    });

    const oldFrame = frameBuffer.shift();
    Object(__WEBPACK_IMPORTED_MODULE_0__memory__["b" /* release */])(oldFrame);

    if (frameBuffer.length < 2) {
        frameBuffer.push(Object(__WEBPACK_IMPORTED_MODULE_0__memory__["a" /* allocate */])('Frame', __WEBPACK_IMPORTED_MODULE_1__Frame__["a" /* default */]));
//        frameBuffer.push(Object.create(Frame).constructor());
    }

    const currentFrameInterface = Object(__WEBPACK_IMPORTED_MODULE_0__memory__["a" /* allocate */])('CurrentFrameInterface', __WEBPACK_IMPORTED_MODULE_2__CurrentFrameInterface__["a" /* default */]);

    currentFrameInterface._startTime = startTime;
    currentFrameInterface._maxFrameDuration = renderConfig.lightray ? (1000 / 60) : (1000 / 30);

     /*Object.create(CurrentFrameInterface)
        .constructor({
            startTime: startTime,
            maxFrameDuration: renderConfig.lightray ? (1000 / 60) : (1000 / 30),
        });*/

    // init render cycle END

    // run the pre render hooks before we start to do render stuff.
    preRenderHooks.forEach(hook => hook(currentFrameInterface));

    // run pre render tasks
    frame.preRenderTasks.run(currentFrameInterface);

    //run all render tasks.
    frame.renderTasks.run(currentFrameInterface);
    //create performance data
    const cycleDuration = getNow() - startTime;
    const frameRate = 1000 / cycleDuration;

    RenderEngine.performance.lastFrameDuration = cycleDuration;
    RenderEngine.performance.fps = frameRate;
    RenderEngine.performance.renderedFrames += 1;

    // done wait for next frame
    scheduleNextFrame();
};

/**
 * Schedules a new render cycle in the browsers rendering engine.
 * The cycle is performed as soon as the browser is ready to render a new frame.
 *
 * @return {void}
 */
let scheduleNextFrame = function() {
    if (!active && frameBuffer.length > 0) {

        if (frameBuffer.length === 2 && frameBuffer[0].emtpy && frameBuffer[1].empty) {
            return;
        }

        window.requestAnimationFrame(renderCycle);

        active = true;
    }
};


/**
 * RenderEngine Singleton
 *
 * @namespace
 */
const RenderEngine = {

    _currentFrame: 1,

    get lightray() {
        return renderConfig.lightray;
    },

    set lightray(value) {
        return renderConfig.lightray = value;
    },

    performance: {
        fps: 0,
        lastFrameDuration: 0,
        renderedFrames: 0,
    },

    /**
     * @param {Function} f a hook function to execute before each render cycle
     * @return {Function} returns the function which has been passed in
     */
    addPreRenderHook: function(f) {
        preRenderHooks.push(f);
        scheduleNextFrame();

        return f;
    },

    /**
     * @param {Function} f - a hook function to execute after each render cycle
     * @return {Function} returns the function which has been passed in.
     */
    addPostRenderHook: function(f) {
        postRenderHooks.push(f);
        scheduleNextFrame();

        return f;
    },

    /**
     * Removes a previously added pre render hook
     *
     * @param  {Function} f - the function which was previously added
     * @return {*} - see Array.prototype.splice
     */
    removePreRenderHook: function(f) {
        return preRenderHooks.splice(preRenderHooks.indexOf(f), 1);
    },

    /**
     * Removes a previously added post render hook
     *
     * @param  {Function} f - the function which was previously added
     * @return {*} {@link Array.prototype.splice}
     */
    removePostRenderHook: function(f) {
        return postRenderHooks.splice(postRenderHooks.indexOf(f), 1);
    },

    /**
     * @param {Function} f - the task to preform in the next render cycle.
     * @param {string} [id] optional task id
     * @return {Function} the function which has been passed in.
     */
    schedulePreRenderTask: function(f, id) {
        frameBuffer[this._currentFrame].preRenderTasks.push(f, id);
        scheduleNextFrame();

        return f;
    },

    /**
     * @param {Function} f - the task to preform in the next render cycle.
     * @param {string} [id] optional task id
     * @return {Function} the function which has been passed in.
     */
    scheduleRenderTask: function(f, id) {
        frameBuffer[this._currentFrame].renderTasks.push(f, id);
        scheduleNextFrame();

        return f;
    },

    /**
     * @param {Function} f - the task to preform after the next render cycle.
     * @return {Function} the function which has been passed in.
     */
    schedulePostRenderTask: function(f) {
        frameBuffer[this._currentFrame].postRenderTasks.push(f);
        scheduleNextFrame();

        return f;
    },

    /**
     * Forces the engine to render a new frame even if there are no tasks
     *
     * @return {void}
     */
    renderFrame: function() {
        if(!active) {
            scheduleNextFrame();
        }
    },

    skipFrame() {
        const frameIndex = this._currentFrame + 1;

        if (!frameBuffer[frameIndex]) {
            frameBuffer.push(Object(__WEBPACK_IMPORTED_MODULE_0__memory__["a" /* allocate */])('Frame', __WEBPACK_IMPORTED_MODULE_1__Frame__["a" /* default */]));
//            frameBuffer.push(Object.create(Frame).constructor());
        }

        return { _currentFrame: frameIndex, __proto__: RenderEngine };
    }
};

// init zero frame
frameBuffer.push(Object(__WEBPACK_IMPORTED_MODULE_0__memory__["a" /* allocate */])('Frame', __WEBPACK_IMPORTED_MODULE_1__Frame__["a" /* default */]));
frameBuffer.push(Object(__WEBPACK_IMPORTED_MODULE_0__memory__["a" /* allocate */])('Frame', __WEBPACK_IMPORTED_MODULE_1__Frame__["a" /* default */]));
//frameBuffer.push(Object.create(Frame).constructor());
//frameBuffer.push(Object.create(Frame).constructor());

/**
 * @member {module:RenderEngine~RenderEngine} RenderEngine
 * @static
 */



/***/ }),
/* 7 */
/*!*************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/prototypes/ViewController.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(/*! ../main */ 14);


const ViewController = {
    template: '',

    scope: null,

    constructor() {
        let template = this.template;

        if (typeof template === 'string' && template.indexOf('#') !== 0) {
            template = `#${template}`;
        }

        this.scope = __WEBPACK_IMPORTED_MODULE_0__main__["b" /* default */].createTemplateInstance({ template, scope: this }).scope;
    },

    useInAutoBinding() {
        return { view: Object.create(this) };
    },

    isActive: false,

    isRoutedPeristently: false,

    onRouteEnter() {
        this.isActive = true;
        this.scope.__apply__();
    },

    onRouteLeave() {
        this.isActive = false;
        this.scope.__apply__();
    }
};

/* harmony default export */ __webpack_exports__["a"] = (ViewController);


/***/ }),
/* 8 */
/*!********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Bind.js ***!
  \********************************************************************************/
/*! exports provided: watcherList, bindNode, recycle, destoryScope, scheduleScopeUpdate */
/*! exports used: bindNode, destoryScope, recycle, scheduleScopeUpdate, watcherList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return watcherList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bindNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return recycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return destoryScope; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Config__ = __webpack_require__(/*! ./Config */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Mapping_js__ = __webpack_require__(/*! ./Mapping.js */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__BindingApi__ = __webpack_require__(/*! ./BindingApi */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AutoBinding_js__ = __webpack_require__(/*! ./AutoBinding.js */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__BindingRegistry_js__ = __webpack_require__(/*! ./BindingRegistry.js */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ClassBinding_js__ = __webpack_require__(/*! ./ClassBinding.js */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__EnabledBinding_js__ = __webpack_require__(/*! ./EnabledBinding.js */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__af_rendering__ = __webpack_require__(/*! ../af/rendering */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ScopePrototype_js__ = __webpack_require__(/*! ./ScopePrototype.js */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__StyleBinding__ = __webpack_require__(/*! ./StyleBinding */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__TwoWayBinding_js__ = __webpack_require__(/*! ./TwoWayBinding.js */ 35);
/**
 * @module DataBinding/Bind
 */

















/**
 * Contains all scope, scopeInfo pairs.
 *
 * @type {WeakMap}
 */
let scopeList = new Map();

/**
 * @type {ScopePrototype[]}
 */
let scopeIndex = [];

/**
 * @type {Array[]}
 */
let watcherList = new Map();

/**
 * @type {Object}
 */
let expressionTracking = {};

/**
 * applies the binding to the node for the given scope.
 *
 * @function
 * @param {Node|string} node - the node which should be bound
 * @param {Object} scope - the scope which should be bound to
 * @param {boolean} isolated - indicates if this scope should be recycled isolated
 * @return {module:DataBinding~ScopePrototype} the scope this node is bound to
 */
let bindNode = function(node, scope, isolated) {
    scope = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["c" /* hasPrototype */])(scope, __WEBPACK_IMPORTED_MODULE_12__ScopePrototype_js__["a" /* default */]) ? scope : Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])(scope, __WEBPACK_IMPORTED_MODULE_12__ScopePrototype_js__["a" /* default */])();
    node = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["c" /* hasPrototype */])(node, Node) ? node : document.querySelector(node);

    scopeList.set(scope, {
        node : node,
        bindings : [],
        scheduledTasks: [],
    });

    scopeIndex.push(scope);

    checkNode(node, scope);
    Object(__WEBPACK_IMPORTED_MODULE_5__BindingApi__["b" /* setScopeInfo */])(null);
    recycle(isolated ? scope : false);

    return scope;
};

/**
 * Travels through a node and it's children searching for binding expressions
 *
 * @param {Node} node - the node to check
 * @param {module:DataBinding.ScopePrototype} scope - the scope this node should be bound to
 * @param {Node} parentNode - the parent of the provided node
 * @return {void}
 */
let checkNode = function(node, scope, parentNode) {
    const dataRegex = /{{[^{}]*}}/g;
    const scopeInfo = scopeList.get(scope);

    Object(__WEBPACK_IMPORTED_MODULE_5__BindingApi__["b" /* setScopeInfo */])(scopeInfo);

    if (node.nodeName == '#text' || isAttribute(node)) {
        const [attributeName, attributeParameter] = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseAttributeName"])(node.nodeName);
        let text = node.value || Object(__WEBPACK_IMPORTED_MODULE_4__Util_js__["b" /* polyInvoke */])(node).textContent,
            variables = text.match(dataRegex),
            visibilityBinding = (node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('visible')),
            transparencyBinding = (node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('transparent')),
            enabledAttribute = node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('enabled'),
            classes = (node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('classes')),
            modelBinding = node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('model'),
            autoBinding = node.name === 'bind',
            twoWay = (node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('value') || modelBinding),
            styleBinding = (node.name === 'bind-style');

        let singleBinding = visibilityBinding || transparencyBinding;

        if (twoWay) {
            bindTwoWay(text, scope, scopeInfo, node, parentNode, modelBinding);
        } else if (classes) {
            bindClasses(text, node, scopeInfo, parentNode);
        } else if (enabledAttribute) {
            bindEnabled(text, scopeInfo, parentNode);
        } else if (autoBinding) {
            bindAuto(text, scopeInfo, parentNode);
        } else if (styleBinding) {
            bindStyle(text, scopeInfo, scope, parentNode);
        } else if (__WEBPACK_IMPORTED_MODULE_8__BindingRegistry_js__["a" /* default */].get(attributeName) && __WEBPACK_IMPORTED_MODULE_8__BindingRegistry_js__["a" /* default */].get(attributeName).test()) {
            Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])(__WEBPACK_IMPORTED_MODULE_8__BindingRegistry_js__["a" /* default */].get(attributeName))({
                text: text,
                variables: variables,
                scopeInfo: scopeInfo,
                node: parentNode,
                attribute: node,
                parameter: attributeParameter,
                parentNode: parentNode,
            });
        } else if (variables || singleBinding) {
            bindSimple(text, node, variables, scopeInfo, singleBinding, parentNode);
        }

    } else {
        if (node.attributes) {
            node.attributes.forEach((child) => checkNode(child, scope, node));

            let events = node.getAttribute(__WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('events'));

            if (events !== null) {
                bindEvents(events, node, scope);

                Object(__WEBPACK_IMPORTED_MODULE_4__Util_js__["b" /* polyInvoke */])(node).removeAttribute(__WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('events'));
            }
        }

        node.childNodes.forEach((node) => { return checkNode(node, scope); });
    }
};

const isAttribute = function(node) {
    return Object.getPrototypeOf(node) === Attr.prototype;
};

/**
 * creates a two way binding
 *
 * @param {string} text - the attribute text
 * @param {module:DataBinding.ScopePrototype} scope - the scope for this binding
 * @param {Object} scopeInfo - the scopeInfo for this binding
 * @param {Node} node - the attribute node
 * @param {Node} parentNode - the actual node
 * @param {boolean} indirect - indicates if this binding is indirect
 * @return {void}
 */
let bindTwoWay = function(text, scope, scopeInfo, node, parentNode, indirect){
    let expression = text.replace(/[{}]/g, '');
    let [eventType, viewBinding, eventBinding, preventDefault] =
        (parentNode.getAttribute(__WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('modelEvent')) || '').split(':');
    let debounce = null;

    /** @type {TwoWayBinding} */
    let binding = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])({
        properties : [expression],
        originalNodeValue : text,
//      disable this so the value gets applied to the DOM the first time
//        currentValue : value,
        node : node,
        parentNode : parentNode,
        indirect : indirect,
        viewBinding : viewBinding,
    }, __WEBPACK_IMPORTED_MODULE_14__TwoWayBinding_js__["a" /* default */]).get();

    scopeInfo.bindings.push(binding);

    if (node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('model')) {
        parentNode.addEventListener(eventType, event => {
            if (preventDefault === 'true') {
                event.preventDefault();
            }

            if (debounce) {
                clearTimeout(debounce);
            }

            debounce = setTimeout(() => {
                // read current value in view
                let value = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(eventBinding, event);

                compareTwoWay(value, scope, binding);
            }, 300);
        });
    } else if(node.name === __WEBPACK_IMPORTED_MODULE_3__Mapping_js__["a" /* attributeNames */].get('value')) {
        parentNode.addEventListener('keyup', e => {
            e.preventDefault();

            if (debounce) {
                clearTimeout(debounce);
            }

            debounce = setTimeout(() => {
                compareTwoWay(getElementValue(e.target), scope, binding);
            }, 200);
        });
    }
};

/**
 * Compares for changes in the UI in a two way binding
 *
 * @param {string} newValue - the new value to compare
 * @param {module:DataBinding.ScopePrototype} scope - the scope of the comparison
 * @param {TwoWayBinding} binding - the binding to compare
 * @return {void}
 */
let compareTwoWay = function(newValue, scope, binding){
    if (binding.currentValue !== newValue) {
        Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["assignExpression"])(binding.properties[0], scope, newValue);
        binding.currentValue = newValue;

        console.log('update from view:', scope);

        recycle();
    }
};

/**
 * creates a simple binding
 *
 * @param {string} text the initial text of the node
 * @param {Node} node the text or attribute node of the binding
 * @param {string[]} variables list of expressions
 * @param {Object} scopeInfo meta data of the current scope
 * @param {boolean} singleExpression - indicates if text contains only one expression
 * @param {Node} parentNode the element that contains the text node or attribute
 *
 * @return {void}
 */
let bindSimple = function(text, node, variables, scopeInfo, singleExpression, parentNode){
    /** @type {Binding} */
    let binding = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])({
        originalNodeValue : text,
        node : node,
        parentNode : parentNode,
        singleExpression : singleExpression,
        properties : variables ? variables.map(item => item.replace(/[{}]/g, '')) : []
    }, __WEBPACK_IMPORTED_MODULE_7__Binding_js__["a" /* default */]).get();

    // clear value so interpolation expression doesn't apear on screen.
    if (Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["c" /* hasPrototype */])(node, window.Attr)) {
        parentNode.setAttribute(node.name, '');
    } else {
        node.textContent = '';
    }

    scopeInfo.bindings.push(binding);
};

/**
 * binds an object expression to node.className.
 *
 * @param  {string} text      the initial text value of the binding node
 * @param  {Node}   node        the binding node
 * @param  {Object} scopeInfo the meta data of the current scope
 * @param  {Node}   parentNode  the parent of the binding node
 *
 * @return {void}
 */
let bindClasses = function(text, node, scopeInfo, parentNode) {
    let binding = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])({
        originalNodeValue : text,
        node : node,
        classes : Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["ObjectParser"])(text),
        parentNode : parentNode
    }, __WEBPACK_IMPORTED_MODULE_9__ClassBinding_js__["a" /* default */]).get();

    scopeInfo.bindings.push(binding);
};

/**
 * binds an expression to the disabled attribute.
 *
 * @param  {string} text       the initial value of the binding node
 * @param  {Object} scopeInfo  the meta data of the current scope
 * @param  {Node}   parentNode the parent of the binding node
 *
 * @return {void}
 */
let bindEnabled = function(text, scopeInfo, parentNode) {
    let binding = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])({
        originalNodeValue : text,
        parentNode : parentNode
    }, __WEBPACK_IMPORTED_MODULE_10__EnabledBinding_js__["a" /* default */])();

    scopeInfo.bindings.push(binding);
};

/**
 * Binds the events specified for a Node
 *
 * @param {string[]}                          events a string representation of the object with all the event / expression pairs.
 * @param {Node}                              node   the node on which the event listeners should be registered.
 * @param {module:DataBinding~ScopePrototype} scope  the data scope on which the binding happens.
 * @return {void}
 */
let bindEvents = function(events, node, scope){
    events = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["ObjectParser"])(events);

    Object.keys(events).forEach(name => {
        let [method, modifier] = events[name].split('|');

        if (scope.$methods && scope.$methods[method.trim()]) {
            node.addEventListener(name.trim(), e => {
                scope.$methods[method.trim()].apply(scope, [e]);

                scope.__apply__();
            });
        } else {
            method = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(method.trim(), scope);

            node.addEventListener(name.trim(), e => {
                let canceled = false;

                e.cancleRecycle = function(){
                    canceled = true;
                };

                method.apply(scope, [e]);

                if (!canceled) {
                    if (scope.isIsolated) {
                        scope.update();
                    } else {
                        scope.__apply__();
                    }
                }
            }, modifier === 'capture');
        }
    });
};

/**
 * automatically binds a template to a property of the current scope
 *
 * @param  {string} text      the binding text
 * @param  {Object} scopeInfo the meta data of the current scope
 * @param  {Node}   template  the template node
 *
 * @return {void}
 */
let bindAuto = function(text, scopeInfo, template) {
    let binding = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])({
        scopeName : text,
        template : template
    }, __WEBPACK_IMPORTED_MODULE_6__AutoBinding_js__["a" /* default */])();

    scopeInfo.bindings.push(binding);
};

/**
 * binds visual properties to the scope
 *
 * @param  {string}                            text       the binding text
 * @param  {Object}                            scopeInfo  the meta data of the scope
 * @param  {module:DataBinding~ScopePrototype} scope      the current scope
 * @param  {Node}                              parentNode the parent of the binding node
 *
 * @return {void}
 */
let bindStyle = function(text, scopeInfo, scope, parentNode) {
    let binding = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make_js__["a" /* Make */])({
        bindings: text,
        parentNode: parentNode,
    }, __WEBPACK_IMPORTED_MODULE_13__StyleBinding__["a" /* default */])(scope);

    scopeInfo.bindings.push(binding);
};

/**
 * executes every watcher for the given scope.
 *
 * @param  {module:DataBinding~ScopePrototype} scope the current scope
 *
 * @return {void}
 */
let executeWatchers = function(scope) {
    watcherList.get(scope) && watcherList.get(scope).forEach(watcher => {
        let value = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(watcher.expression, scope);

        expressionTracking[watcher.expression] = expressionTracking[watcher.expression] || { value : '', newValue : '' };

        if (expressionTracking[watcher.expression].value !== value) {
            watcher.cb.apply(scope, [value]);

            expressionTracking[watcher.expression].newValue = value;
        }
    });
};

/**
 * Checks every binding for the given scope and updates every value.
 *
 * @function
 * @param {module:DataBinding~ScopePrototype} [scope] the scope to recycle
 *
 * @return {void}
 */
let recycle = function (scope) {

    __WEBPACK_IMPORTED_MODULE_11__af_rendering__["a" /* RenderEngine */].scheduleRenderTask(() => {
        const t0 = window.performance.now();
        const bindigMeasures = [];

        try {
            if (scope) {
                const scopeMetaData = scopeList.get(scope);

                drainScopeUpdates(scope, scopeMetaData);
                executeWatchers(scope);

                scopeMetaData.bindings.forEach((/** @type {Binding} */binding) => {
                    const start = Math.round(window.performance.now());
                    binding.update(scope);
                    const end = Math.round(window.performance.now());

                    bindigMeasures.push([`binding checked in ${end - start}ms`, binding]);
                });

            } else {
                scopeIndex.forEach(scope => {
                    const scopeMetaData = scopeList.get(scope);

                    drainScopeUpdates(scope, scopeMetaData);
                    executeWatchers(scope);

                    scopeMetaData.bindings.forEach((/** @type {Binding} */binding) => {
                        binding.update(scope);
                    });
                });
            }

            Object.keys(expressionTracking).forEach(expr => {
                expr = expressionTracking[expr];

                expr.value = expr.newValue;
            });
        } catch (e) {
            console.error(e);
        }

        let t1 = window.performance.now();
        let duration = ((t1 - t0) / 1000);
        let color = null;
        let renderTimeExeeded = false;

        if (duration >= 0.033) {
            color = 'red';
            renderTimeExeeded = true;
        } else if (duration >= 0.016) {
            color = 'yellow';
            renderTimeExeeded = true;
        } else {
            color = 'green';
        }

        color = `color: ${color};`;
        duration = duration.toFixed(2);

        if (scope) {
            console.log(`scope recycled in %c${duration}s`, color, renderTimeExeeded ? scope : '');
            if (__WEBPACK_IMPORTED_MODULE_0__Config__["a" /* CurrentConfig */].verboseLogging) {
                bindigMeasures.forEach((item) => {
                    console.log(...item);
                });
            }
        } else {
            console.log(`full recycle in %c${duration}s`, color);
        }

    }, scope || 'DataBindingRecycle');
};

/**
 * destories a scope.
 *
 * @function
 * @param {module:DataBinding~ScopePrototype} scope the scope to destory
 * @param {boolean} inProgress                indicates if this is an initial call or not.
 *
 * @return {void}
 */
let destoryScope = function(scope, inProgress) {
    console.log(scopeList);
    let scopeInfo = scopeList.get(scope);

    let [scopes, bindings] = scopeInfo.bindings.reduce((prev, binding) => {
        let [scopes, bindings] = prev;

        if (binding.destory) {
            let [scopes_add, bindings_add] = binding.destory();

            scopes += scopes_add;
            bindings += bindings_add;
        }

        return [scopes, bindings];
    }, [0, 0]);

    bindings += scopeInfo.bindings.length;
    scopes += 1;

    scopeList.delete(scope);
    scopeIndex.splice(scopeIndex.indexOf(scope), 1);
    watcherList.delete(scope);

    if (inProgress) {
        return [scopes, bindings];
    } else {
        console.log(`${scopes} scopes and ${bindings} bindings cleaned!`);
    }
};

/**
 * Returns the value of an DOM Node
 *
 * @param {Node} node the node to fetch the value from
 *
 * @return {string} value of this node
 */
let getElementValue = function(node){
    if (node.localName === 'input') {
        return node.value;
    } else {
        return 'UNKNOWN NODE!';
    }
};

const drainScopeUpdates = function(scope, scopeMetaData) {
    scopeMetaData.scheduledTasks.forEach(task => {
        task(scope);
    });

    scopeMetaData.scheduledTasks.length = 0;
};

const scheduleScopeUpdate = function(scopeInfo, callback) {
    if (!callback) {
        console.error('unable to schedule an empty task!');
        return;
    }

    if (typeof callback !== 'function') {
        console.error('task is not a function!');
        return;
    }

    scopeInfo.scheduledTasks.push(callback);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = scheduleScopeUpdate;



/***/ }),
/* 9 */
/*!*************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/core/NetworkRequest.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @module NetworkRequest
 */


/**
 * removes angulars hashKey property from an object
 *
 * @param {Object} object the object to operate on
 *
 * @return {Object} the initial object
 */
let stripHashKey = function(object){
    if (Array.isArray(object)) {
        object = object.map(stripHashKey);

    } else {
        object = JSON.parse(JSON.stringify(object));

        Object.keys(object).forEach((key) => {
            if (key == '$$hashKey') {
                delete object[key];
            }else if (typeof object[key] === 'object' ) {
                object[key] = stripHashKey(object[key]);
            }
        });
    }

    return object;
};

/**
 * @lends module:NetworkRequest.NetworkRequest#
 */
let NetworkRequest = {
    /**
     * @private
     * @type {Object}
     */
    _body : {},

    /**
     * @private
     * @type {Object}
     */
    _headers : null,

    /**
     * @type {string}
     */
    type : '',

    /**
     * @type {string}
     */
    method : '',

    /**
     * @type {string}
     */
    url : '',

    /**
     * @type {function[]}
     * @private
     */
    _listeners : null,

	/**
	 * The constructor for the NetworkRequest. It simply sets up the properties.
	 *
	 * @constructs
	 *
	 * @param {string} url the url this request should be made to
	 * @param {Object} config addintional configuartion for the request
	 *
	 * @return {NetworkRequest} the request it self
	 */
    constructor (url, { method = 'GET', type = 'none' } = {}) {
        this.type = type;
        this.method = method;
        this._headers = {};
        this.url = url;
        this._listeners = [];

        return this;
    },

    /**
     * [_make description]
     *
     * @deprecated use the constructor
     * @param  {[type]} args [description]
     * @return {[type]}      [description]
     */
    _make(...args) {
        return this.constructor(...args);
    },

	/**
	 * this method will set the given object as the request body.
	 *
	 * @param {Object} data body data for this request
	 *
	 * @return {NetworkRequest} the request it self
	 */
    body : function(data){
        this._body = data;

        return this;
    },

	/**
	 * This method will set the request headers, in case custom headers are required.
	 *
	 * @param {Object} headers a object with all header properties for this request
	 *
	 * @return {NetworkRequest} the request it self
	 */
    headers : function(headers) {
        this._headers = headers;

        return this;
    },

    /**
     * Sets a single header for this request.
     *
     * @param {string} key the header key
     * @param {string} value the header value
     *
     * @return {NetworkRequest} the request it self
     */
    setHeader : function(key, value) {
        this._headers[key] = value;

        return this;
    },

    /**
     * sets a callback for when the request is ready
     *
     * @param {function} fn a callback function as soon as the data is ready
     *
     * @return {void}
     */
    onReady : function(fn){
        this._listeners.push(fn);
    },

	/**
	 * This will actually create the network connection and initiate the request.
	 *
	 * @return {Promise} resolves when the request is done
	 */
    send : function(){
        let self = this;
        let xhr = new XMLHttpRequest();

        if (this.method === 'GET' && this._body) {
            this.url += '?' + Object.keys(this._body).map((key) => {
                return `${key}=${self._body[key]}`;
            }).join('&');
        }

        xhr.open(this.method, this.url, true);

        let promise = new Promise((success, failure) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let response = xhr.response;

                        if (xhr.getResponseHeader('Content-Type').indexOf('application/json') > -1 && typeof response  === 'string') {
                            response = JSON.parse(response);
                        }

                        this._listeners.forEach(fn => fn(xhr));

                        success(response);
                    } else {
                        failure(xhr);
                    }
                }
            };
        });

        Object.keys(this._headers).forEach((key) => {
            xhr.setRequestHeader(key, self._headers[key]);
        });

        if (this.type === 'json') {
            let body = this._body;

            xhr.setRequestHeader('Content-Type', 'application/json');

            if (body){
                body = stripHashKey(body);
                body = JSON.stringify(body);
            }

            xhr.send(body);
        } else {
            xhr.send(this._body);
        }

        return promise;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (NetworkRequest);


/***/ }),
/* 10 */
/*!*******************************!*\
  !*** ./SelectedProperties.js ***!
  \*******************************/
/*! exports provided: SelectedProperties */
/*! exports used: SelectedProperties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return store; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_application_frame_core_DataStorage__ = __webpack_require__(/*! application-frame/core/DataStorage */ 20);


const { create } = Object;

const store = create(__WEBPACK_IMPORTED_MODULE_0_application_frame_core_DataStorage__["a" /* default */]).constructor();

store.fill({});





/***/ }),
/* 11 */
/*!**********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/core/EventTarget.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(/*! ./async */ 27);


/** @lends EventTarget# */
const EventTarget = {

    /** @type {Object} */
    _listeners : null,

    /**
     * @constructs
     *
     * @return {this} [description]
     */
    constructor() {
        this._listeners = {};

        return this;
    },

    /**
     * @deprecated Do not use the make constructors
     *
     * @return {this}      [description]
     */
    _make(...args) {
        return this.constructor(...args);
    },

    /**
     * registers a new listener for the given event.
     *
     * @param {string} type the type of event
     * @param {function} listener callback to execute when the event fires
     *
     * @return {void}
     */
    on : function(type, listener){
        if (!this._listeners[type]) {
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    /**
     * emmits a new event on this object
     *
     * @param {string} type the type of event
     * @param {*} data data to send to the callbacks
     *
     * @return {void}
     */
    emit : function(type, data){
        if (this._listeners[type]) {
            Object(__WEBPACK_IMPORTED_MODULE_0__async__["a" /* default */])(() => {
                this._listeners[type]
                    .forEach(listener => listener.apply(this, [data]));
            });
        }
    },

    /**
    * removes a previously attached listener function.
    *
    * @param  {string} type     the listener type
    * @param  {Function} listener the listener function to remove
    *
    * @return {void}
    */
    removeListener: function(type, listener) {
        if (this._listeners[type]) {
            const index = this._listeners[type].indexOf(listener);

            this._listeners[type].splice(index, 1);
        }
    },
};

/* harmony default export */ __webpack_exports__["a"] = (EventTarget);


/***/ }),
/* 12 */
/*!******************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/memory/index.js ***!
  \******************************************************************************/
/*! exports provided: allocate, release, flushHeap */
/*! exports used: allocate, release */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const heapObjects = new Map();
const heapObjectsReleased = {};
const heapArrays = new Map();
const heapArraysReleased = [];

const allocate = function(typeOrLength, prototype={}) {
    if (typeof typeOrLength === 'string') {
        let object = null;

        if (heapObjectsReleased[typeOrLength] && heapObjectsReleased[typeOrLength].length) {
            object = heapObjectsReleased[typeOrLength].shift();
        } else {
            if (prototype === WeakMap.prototype) {
                object = new prototype.constructor();
            } else {
                object = Object.create(prototype);
                object.constructor();
            }
        }

        heapObjects.set(object, typeOrLength);

        return object;
    } else {
        let array = heapArraysReleased.shift();

        if (!array) {
            array = [];
        }

        array.length = typeOrLength;
        heapArrays.set(array, true);

        return array;
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = allocate;


const release = function(object) {
    if (Array.isArray(object)) {
        heapArrays.delete(object);
        heapArraysReleased.push(object);
    } else {
        const type = heapObjects.get(object);

        heapObjects.delete(object);

        if (!heapObjectsReleased[type]) {
            heapObjectsReleased[type] = [];
            heapObjectsReleased[type].push(object);
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = release;


const flushHeap = function() {
    heapArraysReleased.length = 0;

    Object.keys(heapObjectsReleased).forEach(key => {
        delete heapObjectsReleased[key];
    });
};
/* unused harmony export flushHeap */



/***/ }),
/* 13 */
/*!************************************!*\
  !*** ./views/AssistantChatView.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_modules_databinding_prototypes_ViewController__ = __webpack_require__(/*! @af-modules/databinding/prototypes/ViewController */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectedProperties__ = __webpack_require__(/*! ../SelectedProperties */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PropertyTypes__ = __webpack_require__(/*! ../PropertyTypes */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ArticleStore__ = __webpack_require__(/*! ../ArticleStore */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_PropertyAssistant__ = __webpack_require__(/*! ../modules/PropertyAssistant */ 45);







const { create } = Object;

const MessagesList = {

    _list: null,
    _callbacks: null,

    constructor() {
        this._list = [];
        this._callbacks = [];

        return this;
    },

    add(message) {
        this._list.push(message);

        this._callbacks.forEach(callback => callback(this._list));
    },

    when(callback) {
        this._callbacks.push(callback);
    },

    getItems() {
        return this._list;
    },

    get length() {
        return this._list.length;
    },

    set length(value) {
        this._list.length = value;
    }
};


const AssistantChatView = {
    template: 'assistant-chat',

    messages: null,

    init() {
        this.constructor();
        this.messages = create(MessagesList).constructor();
        this.messages.when(this.scope.update.bind(this.scope));
    },

    selectedProperties: __WEBPACK_IMPORTED_MODULE_1__SelectedProperties__["a" /* SelectedProperties */],

    startSession() {
        this.messages.length = 0;

        const primary = this.pickPrimary();
        const notPrimary = this.pickOthers();

        this.postMessage(`So you are looking for a ${notPrimary.join(' ')} ${primary.join(' ')}?`);
        this.generateNextSugestion();
    },

    pickPrimary() {
        const list = this.selectedProperties.value;
        return Object.keys(list)
            .filter(key => !!__WEBPACK_IMPORTED_MODULE_2__PropertyTypes__["a" /* default */].find(type => type.name === key).primary)
            .map(key => list[key].join(' '));
    },

    pickOthers() {
        const list = this.selectedProperties.value;

        return Object.keys(list)
            .filter(key => !__WEBPACK_IMPORTED_MODULE_2__PropertyTypes__["a" /* default */].find(type => type.name === key).primary)
            .map(key => list[key].join(' '));
    },

    postMessage(text) {
        const message = {
            type: 'out',
            text,
        };

        this.messages.add(message);
    },

    getUnusedProperties() {
        const list = this.selectedProperties.value;
        const unused = __WEBPACK_IMPORTED_MODULE_2__PropertyTypes__["a" /* default */].filter(prop => Object.keys(list).indexOf(prop.name) < 0);

        return unused;
    },

    generateNextSugestion() {
        const unused = this.getUnusedProperties();

        const result = Object(__WEBPACK_IMPORTED_MODULE_4__modules_PropertyAssistant__["a" /* suggestMostCommonPropType */])(__WEBPACK_IMPORTED_MODULE_3__ArticleStore__["a" /* ArticleStore */].value, unused);
        const currentArticleCount = __WEBPACK_IMPORTED_MODULE_3__ArticleStore__["a" /* ArticleStore */].value.length;

        this.postMessage(`We have ${currentArticleCount} Articles matching your description.`);
        this.postMessage(`What kind of ${result.name} do you prefer?`);
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0__af_modules_databinding_prototypes_ViewController__["a" /* default */],
};

/* harmony default export */ __webpack_exports__["a"] = (AssistantChatView);


/***/ }),
/* 14 */
/*!****************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/main.js ***!
  \****************************************************************************/
/*! exports provided: DataBinding, ANIMATION_BINDING_LOOPED, BindingApi, default */
/*! exports used: DataBinding, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataBinding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Template_js__ = __webpack_require__(/*! ./lib/Template.js */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_Util_js__ = __webpack_require__(/*! ./lib/Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_ViewPort_js__ = __webpack_require__(/*! ./lib/ViewPort.js */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_IfBinding_js__ = __webpack_require__(/*! ./lib/IfBinding.js */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_ElementToScopeBinding_js__ = __webpack_require__(/*! ./lib/ElementToScopeBinding.js */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_HtmlBinding_js__ = __webpack_require__(/*! ./lib/HtmlBinding.js */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_CloakBinding_js__ = __webpack_require__(/*! ./lib/CloakBinding.js */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_bindings_AttributeBinding__ = __webpack_require__(/*! ./lib/bindings/AttributeBinding */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_bindings_AnimationBinding__ = __webpack_require__(/*! ./lib/bindings/AnimationBinding */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_bindings_TemplateRepeatBinding__ = __webpack_require__(/*! ./lib/bindings/TemplateRepeatBinding */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_bindings_EventBinding__ = __webpack_require__(/*! ./lib/bindings/EventBinding */ 44);
/* unused harmony reexport ANIMATION_BINDING_LOOPED */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_BindingApi__ = __webpack_require__(/*! ./lib/BindingApi */ 5);
/* unused harmony reexport BindingApi */
/**
 * DataBinding Module
 *
 * @module DataBinding
 * @default module:DataBinding.DataBinding
 */













NodeList.prototype.forEach = NamedNodeMap.prototype.forEach = Array.prototype.forEach;

let style = document.createElement('style');

style.innerHTML = `
    :not(.animated) > :not(.animated) > :not(.animated) > [bind-display="false"]:not(.animated) {
        display: none !important;
    }

    :not(.animated) > :not(.animated) > :not(.animated) > [bind-visible="false"]:not(.animated) {
        visibility: hidden;
    }
`;

Object(__WEBPACK_IMPORTED_MODULE_1__lib_Util_js__["b" /* polyInvoke */])(document.head).appendChild(style);

/**
 * [DataBinding description]
 *
 * @type {module:DataBinding.ModuleInterface}
 */
let DataBinding = {
    makeTemplate : __WEBPACK_IMPORTED_MODULE_0__lib_Template_js__["b" /* makeTemplate */],
    ViewPort : __WEBPACK_IMPORTED_MODULE_2__lib_ViewPort_js__["a" /* default */],
    createTemplateInstance: __WEBPACK_IMPORTED_MODULE_0__lib_Template_js__["a" /* createTemplateInstance */],
};




/* harmony default export */ __webpack_exports__["b"] = (DataBinding);

/**
 * @interface ModuleInterface
 * @borrows module:DataBinding/Bind.bindNode as bindNode
 * @borrows module:DataBinding/Template.makeTemplate as makeTemplate
 * @borrows module:DataBinding/ViewPort.ViewPort
 * @static
 *
 */


/***/ }),
/* 15 */
/*!************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Template.js ***!
  \************************************************************************************/
/*! exports provided: makeTemplate, createTemplateInstance */
/*! exports used: createTemplateInstance, makeTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeTemplate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bind_js__ = __webpack_require__(/*! ./Bind.js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TemplateLoader_js__ = __webpack_require__(/*! ./TemplateLoader.js */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Parser__ = __webpack_require__(/*! ./Parser */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_application_frame_rendering__ = __webpack_require__(/*! application-frame/rendering */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ScopePrototype_js__ = __webpack_require__(/*! ./ScopePrototype.js */ 18);
/**
 * @module DataBinding/Template
 */









/**
 * Instanciates a template based on a specified element.
 *
 * @param  {HTMLTemplateElement}               template    the template to instanciate
 * @param  {module:DataBinding.ScopePrototype} scope       the scope to operate on
 * @param  {Application}                       application the application this binding belongs to
 * @param  {Node}                              item        the original node
 *
 * @return {void}
 */
let makeElementFromTemplate = function(template, scope, application, item) {
    __WEBPACK_IMPORTED_MODULE_5_application_frame_rendering__["a" /* RenderEngine */].schedulePostRenderTask(() => {
        let node = document.importNode(template.content, true);
        let placeholder = node.querySelector('bind-placeholder');

        item.attributes.forEach(attr => {
            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(node.firstElementChild).setAttribute(attr.name, attr.value);
        });

        if (placeholder) {
            let node = item.firstElementChild;
            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(placeholder.parentNode).replaceChild(item.firstElementChild, placeholder);

            [].forEach.apply(item.children, [item => {
                Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(node.parentNode).appendChild(item);
            }]);
        }

        node.firstElementChild.className = template.id + ' ' + node.firstElementChild.className;

        scope = scope();

        [].map.apply(node.firstElementChild.attributes, [item => {
            if (item.name.search(/^scope\-/) > -1 ) {
                scope[item.name.replace(/^scope\-/, '')] = item.value;
            }
        }]);

        if (template.hasAttribute('component')) {
            scope.element = node.firstElementChild;
        }

        scope = Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["a" /* bindNode */])(node, scope);

        Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(item.parentNode).replaceChild(node, item);

        if (application) {
            application.emit(`newElement:${template.id}`, scope);
        }
    });
};

/**
 * creates a new instance of an HTML template and applies the binding with
 * the given scope.
 *
 * @function
 * @deprecated Please use the new createTemplateInstance()
 *
 * @param {Node|string} template - the template to render
 * @param {ScopePrototype} scope - the scope for this template to bind to
 * @param {Application} [application] - the application this template belongs to
 * @param {ScopePrototype} [parentScope] - the surounding scope of this template node
 *
 * @return {Object} - collection of scope and rendered element
 */
let makeTemplate = function (template, scope, application, parentScope) {
    template = (typeof template === 'string') ? document.querySelector(template) : template;

    if (template.hasAttribute('src') && !template.processed) {
        let source = template.getAttribute('src');

        if (parentScope) {
            let value = Object(__WEBPACK_IMPORTED_MODULE_4__Parser__["parseExpression"])(source, parentScope);

            source = (value && value != '') ? value : source;
        }

        scope = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(scope, __WEBPACK_IMPORTED_MODULE_6__ScopePrototype_js__["a" /* default */])();

        Object(__WEBPACK_IMPORTED_MODULE_3__TemplateLoader_js__["a" /* importTemplate */])(source, template)
            .then(template => {
                template.processed = true;
                makeTemplate(template, scope, application, parentScope);
            });

        return scope;

    } else if (template.hasAttribute('bind-element')) {
        let makeElement = makeElementFromTemplate.bind(this, template, scope, application);
        let list = document.querySelectorAll(template.id);

        [].forEach.apply(list, [makeElement]);

        (new MutationObserver(mutations => {
            mutations.forEach(item => {
                if (item.addedNodes.length > 0) {
                    let list = [].map.apply(item.addedNodes, [node => {
                        return node.querySelectorAll ? [].slice.apply(node.querySelectorAll(template.id)) : [];
                    }]).reduce((prev, next) => prev.concat(next), []);

                    list = list.concat([].filter.apply(item.addedNodes, [node => node.localName === template.id]));

                    [].forEach.apply(list, [makeElement]);
                }
            });
        })).observe(document.body, {
            childList : true,
            subtree : true
        });

    } else {
        let node = document.importNode(template.content, true);
        let isReplace = template.hasAttribute('replace');
        let isInsert = template.hasAttribute('insert');

        scope = Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["a" /* bindNode */])(node, scope);

        if (isReplace || isInsert) {
            let elementList = [].slice.apply(node.childNodes);

            scope.__cleanElements__ = function(){
                elementList.forEach(node => {
                    node.parentNode && node.parentNode.removeChild(node);
                });
            };
        }

        let parentNode = template.parentNode;

        if (template.getAttribute('poly-parent')) {
            let parentName = template.getAttribute('poly-parent');

            parentNode = Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["a" /* getPolyParent */])(template, parentName);
        }

        if (isReplace) {
            console.log('replace template');

            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(parentNode).replaceChild(node, template);
        } else if (isInsert) {
            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(parentNode).insertBefore(node, template);
        }

        return { node : node, scope : scope };
    }
};

const fetchExternalTemplate = function({ template, parentScope }) {
    let source = template.getAttribute('src');

    if (parentScope) {
        let value = Object(__WEBPACK_IMPORTED_MODULE_4__Parser__["parseExpression"])(source, parentScope);

        source = (value && value != '') ? value : source;
    }

    return Object(__WEBPACK_IMPORTED_MODULE_3__TemplateLoader_js__["a" /* importTemplate */])(source, template)
        .then(template => {
            template.processed = true;

            return template;
        });
};

/**
 * Instanciates a template and either replaces the template node in the DOM or
 * simply returns the node and it's scope.
 *
 * @param  {string|HTMLTemplateElement} template
 * @param  {Object} [scope={}]
 * @param  {Application} [application=null]
 * @param  {ScopePrototype} [parentScope]
 * @return { node: HTMLElement, scope: ScopePrototype } the resulting element and scope
 */
const createTemplateInstance = function({ template, scope = {}, application = null, parentScope }) {
    template = (typeof template === 'string') ? document.querySelector(template) : template;

    if (template.hasAttribute('src') && !template.processed) {
        return fetchExternalTemplate({ template: template, parentScope: parentScope })
            .then(template => makeTemplate({ template, scope, application, parentScope }));
    }

    const node = document.importNode(template.content, true);
    const isReplace = template.hasAttribute('replace');

    scope = ({ view: scope, isIsolated: true, __proto__: __WEBPACK_IMPORTED_MODULE_6__ScopePrototype_js__["a" /* default */] }).constructor();

    Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["a" /* bindNode */])(node, scope, true);

    if (isReplace) {
        let elementList = [].slice.apply(node.childNodes);

        scope.__cleanElements__ = function() {
            elementList.forEach(node => {
                node.parentNode && node.parentNode.removeChild(node);
            });
        };
    }

    if (isReplace) {
        let parentNode = template.parentNode;

        if (template.getAttribute('poly-parent')) {
            let parentName = template.getAttribute('poly-parent');

            parentNode = Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["a" /* getPolyParent */])(template, parentName);
        }

        Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(parentNode).replaceChild(node, template);
    }

    return { node : node, scope : scope };
};
/* harmony export (immutable) */ __webpack_exports__["a"] = createTemplateInstance;



/***/ }),
/* 16 */
/*!***********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Mapping.js ***!
  \***********************************************************************************/
/*! exports provided: attributeNames */
/*! exports used: attributeNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attributeNames; });
/**
 * @module DataBinding/Mapping
 */

/**
 * Contains all the attribute names
 *
 * @namespace
 */
let attributeNames = {
    events : 'events',
    visible : 'display',
    transparent : 'visible',
    classes : 'class',
    value : 'value',
    prefix : 'bind',
    enabled : 'enabled',
    model : 'model',
    modelEvent : 'model-event',

    /**
     * returns the value for a key
     *
     * @param  {string} key the key to lookup
     *
     * @return {string}     the coresponding value
     */
    get : function(key){
        return `${this.prefix}-${this[key]}`;
    },

    /**
     * cuts off the prefix of the name
     *
     * @param  {string} name initial value
     *
     * @return {string}      the clean value
     */
    rename : function(name){
        return name.replace(`${this.prefix}\-`, '');
    }
};


/***/ }),
/* 17 */
/*!*************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/rendering/CurrentFrameInterface.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CurrentFrameInterface = {
    _startTime: 0,
    _maxFrameDuration: 0,

    constructor({ startTime, maxFrameDuration } = {}) {
        this._startTime = startTime;
        this._maxFrameDuration = maxFrameDuration;

        return this;
    },

    ttl() {
        const duration = performance.now() - this._startTime;
        const ttl = this._maxFrameDuration - duration;

        return ttl;
    },

    INTERUPT_CURRENT_TASK: Symbol('INTERUPT_CURRENT_TASK'),
};

/* harmony default export */ __webpack_exports__["a"] = (CurrentFrameInterface);


/***/ }),
/* 18 */
/*!******************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/ScopePrototype.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parser__ = __webpack_require__(/*! ./Parser */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bind_js__ = __webpack_require__(/*! ./Bind.js */ 8);



/**
 * @class ScopePrototype
 * @memberof module:DataBinding
 */

/**
 * @lends module:DataBinding.ScopePrototype.prototype
 */
let ScopePrototype = {

    _make: function() {
        this.constructor();
    },

    constructor() {
        this.__apply__ = this.__apply__.bind(this);

        return this;
    },

    /**
    * will apply the current state of the bound model.
    *
    * @deprecated Please use update()
    *
    * @param {function} [fn]            function to execute before rendering
    * @param {boolean} [localRecycle]   only recycle the current scope
    *
    * @return {void}
    */
    __apply__ : function(fn, localRecycle){
        if (fn && typeof fn === 'function') {
            fn();
        }

        return Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["c" /* recycle */])(localRecycle ? this : null);
    },

    update() {
        return Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["c" /* recycle */])(this);
    },

    /**
     * starts to watch the given expression and fires when the value changes.
     *
     * @param  {string}   expression the expression to watch
     * @param  {Function} cb         will be called once the value changes
     *
     * @return {void}
     */
    __watch__ : function(expression, cb) {
        if (!__WEBPACK_IMPORTED_MODULE_1__Bind_js__["e" /* watcherList */].has(this)) {
            __WEBPACK_IMPORTED_MODULE_1__Bind_js__["e" /* watcherList */].set(this, []);
        }

        __WEBPACK_IMPORTED_MODULE_1__Bind_js__["e" /* watcherList */].get(this).push({
            expression : expression,
            cb : cb
        });
    },

    /**
     * destorys a scope
     *
     * @param  {boolean} inProgress whenever this is an initial call or not
     *
     * @return {boolean} status
     */
    __destroy__ : function(inProgress) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["b" /* destoryScope */])(this, inProgress);
    },

    /**
    * resolves when the expression returns not undefined or null
    *
    * @param  {string|Function}   expression the expression to evaluate
    *
    * @return {Promise}                      resolves when stable
    */
    require: function(expression) {
        return new Promise((done) => {
            let value = null;

            if (typeof expression === 'function') {
                value = expression();
            } else {
                value = Object(__WEBPACK_IMPORTED_MODULE_0__Parser__["parseExpression"])(expression, this);
            }

            if (value !== undefined && value !== null) {
                done(value);
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (ScopePrototype);


/***/ }),
/* 19 */
/*!*****************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/bindings/AnimationBinding.js ***!
  \*****************************************************************************************************/
/*! exports provided: ANIMATION_BINDING_LOOPED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BindingRegistry__ = __webpack_require__(/*! ../BindingRegistry */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Binding__ = __webpack_require__(/*! ../Binding */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parser__ = __webpack_require__(/*! ../Parser */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__af_core_EventTarget__ = __webpack_require__(/*! ../../af/core/EventTarget */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__af_util_make__ = __webpack_require__(/*! ../../af/util/make */ 0);






const ANIMATION_BINDING_LOOPED = Symbol('ANIMATION_BINDING_LOOPED');
/* unused harmony export ANIMATION_BINDING_LOOPED */


/**
 * [AnimationBinding description]
 *
 * @lends {AnimationBinding#}
 * @extends {module:DataBinding.Binding}
 */
const AnimationBinding = {

    name: 'bind-animation',

    /**
     * [animations description]
     *
     * @type {Object}
     */
    animations: null,

    /**
     * @type {node}
     */
    parentNode: null,

    playing: null,

    lastConditionStatus: null,

    /**
     *
     * @constructs
     * @extends {Binding}
     * @param {Node} parentNode - this node
     * @param {string} text - the attribute value
     * @param {ScopeInfo} scopeInfo - bindings container
     *
     * @return {void}
     */
    _make({ parentNode, text, scopeInfo }) {
        this.animations = Object(__WEBPACK_IMPORTED_MODULE_2__Parser__["ObjectParser"])(text);
        this.parentNode = parentNode;
        this.playing = {};
        this.lastConditionStatus = {};

        scopeInfo.bindings.push(this);
    },

    /**
     * @param {module:DataBinding.ScopePrototype} scope
     */
    update(scope) {
        Object.keys(this.animations).forEach(conditionExpression => {
            const conditionValue = Object(__WEBPACK_IMPORTED_MODULE_2__Parser__["parseExpression"])(conditionExpression, scope);
            const conditionValueChanged = conditionValue !== this.lastConditionStatus[conditionExpression];

            if (conditionValue === '') {
                return;
            }

            this.lastConditionStatus[conditionExpression] = conditionValue;

            if (!conditionValueChanged && conditionValue !== ANIMATION_BINDING_LOOPED) {
                return;
            }

            const animationExpression = this.animations[conditionExpression];
            const animation = Object(__WEBPACK_IMPORTED_MODULE_2__Parser__["parseExpression"])(animationExpression, scope);

            if (!animation) {
                const animationPath = animationExpression.split('.');
                const animationName = animationPath.pop();

                console.error(`animation ${animationName} does not exist on ${animationPath}!`);
                return;
            }

            if (conditionValue && !this.playing[conditionExpression]) {
                let parent = animationExpression.split('.');

                parent.pop();
                parent = parent.join('.');
                parent = Object(__WEBPACK_IMPORTED_MODULE_2__Parser__["parseExpression"])(parent, scope);

                if (!parent) {
                    parent = scope;
                }

                this.parentNode.classList.add('animated');
                this.playing[conditionExpression] = true;

                const result = animation.apply(parent, [this.parentNode]);

                if (!scope.$animation) {
                    const a = Object.create(__WEBPACK_IMPORTED_MODULE_3__af_core_EventTarget__["a" /* default */]);

                    a._make();
                    scope.$animation = a;
                }

                if (result === null || result === undefined) {
                    console.warn(`[Animation Binding] ${animationExpression} did not return a result value.`);
                }

                if (typeof result === 'object' && Object(__WEBPACK_IMPORTED_MODULE_4__af_util_make__["c" /* hasPrototype */])(result, Promise)) {
                    result.then(this.finishAnimation.bind(this, conditionExpression, animation, scope));
                } else {
                    this.finishAnimation(conditionExpression, animation, scope);
                }
            }
        });
    },

    finishAnimation(conditionExpression, animation, scope) {
        this.playing[conditionExpression] = false;
        this.parentNode.classList.remove('animated');
        scope.$animation.emit(animation.name, null);
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_1__Binding__["a" /* default */],
};

__WEBPACK_IMPORTED_MODULE_0__BindingRegistry__["a" /* default */].register(AnimationBinding);


/***/ }),
/* 20 */
/*!**********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/core/DataStorage.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventTarget__ = __webpack_require__(/*! ./EventTarget */ 11);


const whenFilled = function(successCallback) {
    if (successCallback && typeof successCallback === 'function') {
        this._filledCallbacks.push({ once: false, callback: successCallback });
    }

    if (this._value) {
        successCallback(this._value);
    }
};

const whenNext = function(callback) {
    if (callback && typeof callback === 'function') {
        this._filledCallbacks.push({ once: true, callback: callback });
    }
};

const once = function(callback) {
    if (callback && typeof callback === 'function') {
        if (!this._value) {
            this._filledCallbacks.push({ once: true, callback: callback });
        } else {
            callback(this._value);
        }
    }
};

// fake then if this should be handed to something that expects a promise
whenFilled.then = whenNext.then = once.then = function(callback) {
    return (new Promise((done) => {
        this(done);
    })).then(callback);
};

// dummy catch in case someone tries to use it
whenFilled.catch = whenNext.catch = once.catch = function(callback) {
    return (new Promise((done) => {
        this(done);
    })).catch(callback);
};

const DataStorage = {
    _value: null,
    _filledCallbacks: [],

    get value() {
        return this._value;
    },

    constructor() {
        this.when = whenFilled.bind(this);
        this.whenNext = whenNext.bind(this);
        this.once = once.bind(this);
        this._filledCallbacks = [];

        return this;
    },

    fill(value) {
        this._value = value;

        this._filledCallbacks = this._filledCallbacks.filter(item => {
            item.callback(this._value);
            return !item.once;
        });
    },

    when: null,

    once: null,

    whenNext: null,

    __proto__: __WEBPACK_IMPORTED_MODULE_0__EventTarget__["a" /* default */],
};

/* harmony default export */ __webpack_exports__["a"] = (DataStorage);


/***/ }),
/* 21 */
/*!**************************!*\
  !*** ./PropertyTypes.js ***!
  \**************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_application_frame_core_NetworkRequest__ = __webpack_require__(/*! application-frame/core/NetworkRequest */ 9);


const { create } = Object;

const types = [];

const request = create(__WEBPACK_IMPORTED_MODULE_0_application_frame_core_NetworkRequest__["a" /* default */]).constructor('./data/propertyTypes.json', { type: 'json' });

request.send().then(data => {
    types.push(...data);
});

/* harmony default export */ __webpack_exports__["a"] = (types);


/***/ }),
/* 22 */
/*!*************************!*\
  !*** ./ArticleStore.js ***!
  \*************************/
/*! exports provided: restoreAllArticles, filterArticles, ArticleStore */
/*! exports used: ArticleStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return store; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_application_frame_core_DataStorage__ = __webpack_require__(/*! application-frame/core/DataStorage */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_application_frame_core_NetworkRequest__ = __webpack_require__(/*! application-frame/core/NetworkRequest */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_ArticlePropertyScraper__ = __webpack_require__(/*! ./modules/ArticlePropertyScraper */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PropertyTypes__ = __webpack_require__(/*! ./PropertyTypes */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SelectedProperties__ = __webpack_require__(/*! ./SelectedProperties */ 10);






const { create } = Object;

const store = create(__WEBPACK_IMPORTED_MODULE_0_application_frame_core_DataStorage__["a" /* default */]).constructor();
let allArticles = null;

const request = create(__WEBPACK_IMPORTED_MODULE_1_application_frame_core_NetworkRequest__["a" /* default */]).constructor('./data/products.json');

request.type = 'json';

request.send().then(result => {
    allArticles = result;
    restoreAllArticles(store);
});

__WEBPACK_IMPORTED_MODULE_4__SelectedProperties__["a" /* SelectedProperties */].when(list => {
    filterArticles(store, list);
});

const restoreAllArticles = function(store) {
    store.fill(JSON.parse(JSON.stringify(allArticles)));
};
/* unused harmony export restoreAllArticles */


const filterArticles = function(store, sProperties) {
    const list = store.value;

    list.filter(article => {
        const properties = Object(__WEBPACK_IMPORTED_MODULE_2__modules_ArticlePropertyScraper__["a" /* scrapProperties */])({ article, propertyDef: __WEBPACK_IMPORTED_MODULE_3__PropertyTypes__["a" /* default */] });

        console.log(properties);
    });
};
/* unused harmony export filterArticles */





/***/ }),
/* 23 */
/*!*************************************************!*\
  !*** ./modules/ArticlePropertyScraper/index.js ***!
  \*************************************************/
/*! exports provided: scrapeFromArticles, scrapProperties */
/*! exports used: scrapProperties */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const scrapeFromArticles = function({ articleList, propertyDef }) {
    const props = {};

    articleList.forEach(article => scrapProperties({ article, propertyDef, props }));

    return Object.keys(props).map(key => props[key]);
};
/* unused harmony export scrapeFromArticles */


const scrapProperties = function({ article, propertyDef, props: globalProps }) {
    const props = globalProps || {};

    propertyDef.forEach(propertyDef => {
        if (article[propertyDef.name]) {
            const prop = { type: propertyDef.name, name: article[propertyDef.name] };

            collectProperty(props, prop);
        }
    });

    if (article.properties) {
        article.properties.forEach(prop => propertyDef.find(def => def.name === prop.name) && collectProperty(props, prop));
    }

    if (!globalProps) {
        return Object.keys(props).map(key => props[key]);
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = scrapProperties;


const collectProperty = function(props, prop) {
    if (!props[prop.name]) {
        props[prop.name] = prop;
    } else if (props[prop.name] &&
        props[prop.name].type !== prop.type &&
        !props[`${prop.name}_${prop.type}`]) {
        props[`${prop.name}_${prop.type}`] = prop;
    }
};


/***/ }),
/* 24 */
/*!**********************!*\
  !*** ./bootstrap.js ***!
  \**********************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__(/*! ./App */ 25);
// bootstrap.js



const ready = function() {
    __WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */].init();
};

if (document.readyState === 'complete') {
    ready();
} else {
    window.addEventListener('DOMContentLoaded', ready);
}


/***/ }),
/* 25 */
/*!****************!*\
  !*** ./App.js ***!
  \****************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_application_frame_core_Application__ = __webpack_require__(/*! application-frame/core/Application */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_AssistantChatView__ = __webpack_require__(/*! ./views/AssistantChatView */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_FiltersView__ = __webpack_require__(/*! ./views/FiltersView */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_SearchBoxView__ = __webpack_require__(/*! ./views/SearchBoxView */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_SearchResultView__ = __webpack_require__(/*! ./views/SearchResultView */ 52);







/**
 * [App description]
 *
 * @extends Application
 */
const App = {
    name: 'Search Assistant Bot',
    version: '1.0.0',

    /**
     * [init description]
     *
     * @return {void} [description]
     */
    init() {
        this.constructor();

        __WEBPACK_IMPORTED_MODULE_4__views_SearchResultView__["a" /* default */].init();
        __WEBPACK_IMPORTED_MODULE_1__views_AssistantChatView__["a" /* default */].init();
        __WEBPACK_IMPORTED_MODULE_3__views_SearchBoxView__["a" /* default */].init();
        __WEBPACK_IMPORTED_MODULE_2__views_FiltersView__["a" /* default */].init();
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0_application_frame_core_Application__["a" /* default */],
};

/* harmony default export */ __webpack_exports__["a"] = (App);


/***/ }),
/* 26 */
/*!**********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/core/Application.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventTarget__ = __webpack_require__(/*! ./EventTarget */ 11);


/** @lends Application.prototype */
let Application = {

    /**
    * Name of this application so other components can identify the application.
    *
    * @type {string}
    */
    name : '',

    /**
    * Some components may need to know the version of this applicaion.
    *
    * @type {string}
    */
    version : '0.0.0',

    /**
    * @type {string}
    */
    author : '',

    constructor() {
        super.constructor();

        return this;
    },

    _make(...args) {
        return this.constructor(...args);
    },

    /**
    * Initializes this application, default interface for components and modules.
    *
    * @return {void}
    */
    init : function(){
        console.log(`Initialzing Application "${this.name}"!`);
    },

    /**
    * This function will try to terminate the application by emitting the termination event.
    *
    * @param {string} reason - the reason for the termination.
    *
    * @return {void}
    */
    terminate : function(reason){
        this.emit('terminate', reason);
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0__EventTarget__["a" /* default */],

};

/* harmony default export */ __webpack_exports__["a"] = (Application);


/***/ }),
/* 27 */
/*!****************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/core/async.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const async = function(callback) {
    return Promise.resolve().then(callback);
};

/* harmony default export */ __webpack_exports__["a"] = (async);


/***/ }),
/* 28 */
/*!**********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/Config.js ***!
  \**********************************************************************************/
/*! exports provided: CurrentConfig, enableVerboseLogging */
/*! exports used: CurrentConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CurrentConfig = {
    verboseLogging: false,
};
/* harmony export (immutable) */ __webpack_exports__["a"] = CurrentConfig;


const enableVerboseLogging = function() {
    CurrentConfig.verboseLogging = true;
};
/* unused harmony export enableVerboseLogging */



/***/ }),
/* 29 */
/*!***************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/AutoBinding.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Template_js__ = __webpack_require__(/*! ./Template.js */ 15);





let AutoBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(/** @lends module:DataBinding.AutoBinding.prototype*/{

    scopeName : '',

    /** @type {HTMLTemplateNode} */
    template : null,

    /** @type {boolean} */
    _isBound : false,

    /**
     * An auto binding instanciates a template and binds it
     * to a property of the current scope.
     *
     * @constructs
     * @extends module:DataBinding.Binding
     * @return {void}
     */
    _make : function(){},

    /** @type module:DataBinding.ScopePrototype */
    _scope : null,

    update : function(scope) {
        if (!this._isBound) {
            let subScope = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(this.scopeName, scope);

            setTimeout(() => {
                let scopeHolder = null;
                let scopeObjName = null;

                if (this.scopeName.lastIndexOf('.') > 0) {
                    scopeHolder = this.scopeName.split('.');
                    scopeObjName =  scopeHolder.pop();
                    scopeHolder = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(scopeHolder.join('.'), scope);

                    scopeHolder[scopeObjName] = Object(__WEBPACK_IMPORTED_MODULE_3__Template_js__["b" /* makeTemplate */])(this.template, subScope, true);

                    this._scope = scopeHolder[scopeObjName];
                } else {
                    this._scope = Object(__WEBPACK_IMPORTED_MODULE_3__Template_js__["b" /* makeTemplate */])(this.template, subScope, true);
                }
            }, 0);

            this._isBound = true;
        }
    },

    /**
     * destroys this binding. This binding needs to be destroied before
     * it is deleted, since it creates a new scope.
     *
     * @return {void}
     */
    destory : function(){
        if (this._scope) {
            return this._scope.__destroy__(true);
        } else {
            return [0, 0];
        }
    }

}, __WEBPACK_IMPORTED_MODULE_1__Binding_js__["a" /* default */]).get();

/* harmony default export */ __webpack_exports__["a"] = (AutoBinding);


/***/ }),
/* 30 */
/*!****************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/ClassBinding.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_application_frame_rendering__ = __webpack_require__(/*! application-frame/rendering */ 6);





let ClassBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(/** @lends module:DataBinding.ClassBinding.prototype */{

    /**
     * @type {Object}
     */
    classes : null,

    /**
     * @type {Node}
     */
    parentNode : null,

    /**
     * @constructs
     * @extends {module:DataBinding.Binding}
     */
    _make : __WEBPACK_IMPORTED_MODULE_2__Binding_js__["a" /* default */]._make,

    /**
     * applies a class to the parent node, based on the binding values.
     *
     * @param  {module:DataBinding.ScopePrototype} scope the scope to operate on.
     * @param  {Object} classes class-expression-map
     * @param  {string} key     the class name to apply
     *
     * @return {void}
     */
    applyClass : function(scope, classes, key) {
        let expression = classes[key];
        let value = Object(__WEBPACK_IMPORTED_MODULE_1__Parser_js__["parseExpression"])(expression, scope);

        key = (key[0] === '!') ? key.substr(1) : key;

        if (value) {
            this.parentNode.classList.add(key);
        } else {
            this.parentNode.classList.remove(key);
        }
    },

    update : function(scope){
        let classes = JSON.parse(JSON.stringify(this.classes));

        Object.keys(classes)
            .filter(key => key.indexOf('!') === 0)
            .forEach(this.applyClass.bind(this, scope, classes));

        let applyAssync = Object.keys(classes).filter(key => key.indexOf('!') !== 0);

        if (applyAssync.length > 0) {
            __WEBPACK_IMPORTED_MODULE_3_application_frame_rendering__["a" /* RenderEngine */].scheduleRenderTask(() => {
                applyAssync.forEach(this.applyClass.bind(this, scope, classes));
            });
        }
    }

}, __WEBPACK_IMPORTED_MODULE_2__Binding_js__["a" /* default */]).get();

/* harmony default export */ __webpack_exports__["a"] = (ClassBinding);


/***/ }),
/* 31 */
/*!*********************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/rendering/Frame.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskList__ = __webpack_require__(/*! ./TaskList */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__memory__ = __webpack_require__(/*! ../memory */ 12);



const Frame = {
    preRenderTasks: null,
    renderTasks: null,
    postRenderTasks: null,

    get empty() {
        return this.preRenderTasks.length === 0 &&
            this.renderTasks.length === 0 &&
            this.postRenderTasks.length === 0;
    },

    constructor() {
        this.preRenderTasks = Object(__WEBPACK_IMPORTED_MODULE_1__memory__["a" /* allocate */])('TaskList', __WEBPACK_IMPORTED_MODULE_0__TaskList__["a" /* default */]); // Object.create(TaskList).constructor();
        this.renderTasks = Object(__WEBPACK_IMPORTED_MODULE_1__memory__["a" /* allocate */])('TaskList', __WEBPACK_IMPORTED_MODULE_0__TaskList__["a" /* default */]); //Object.create(TaskList).constructor();
        this.postRenderTasks = Object(__WEBPACK_IMPORTED_MODULE_1__memory__["a" /* allocate */])('TaskList', __WEBPACK_IMPORTED_MODULE_0__TaskList__["a" /* default */]); //Object.create(TaskList).constructor();

        return this;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Frame);


/***/ }),
/* 32 */
/*!************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/application-frame/rendering/TaskList.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CurrentFrameInterface__ = __webpack_require__(/*! ./CurrentFrameInterface */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__memory__ = __webpack_require__(/*! ../memory */ 12);



/** @lends module:RenderEngine.TaskList.prototype */
let TaskList = {

    /** @type Array */
    tasks: null,

    /** @type Array */
    registeredIds: null,

    /** @type {{ id: string, work: Function }} */
    get last() {
        return this.tasks[this.tasks.length - 1];
    },

    /** @type {number} */
    get length() {
        return this.tasks.length;
    },

    /**
     * Render TaskList to manage rendertaks and optionally track duplicates by ids.
     *
     * @constructs
     * @return {void}
     */
    constructor() {
        this.tasks = Object(__WEBPACK_IMPORTED_MODULE_1__memory__["a" /* allocate */])(0);
        this.registeredIds = Object(__WEBPACK_IMPORTED_MODULE_1__memory__["a" /* allocate */])(0);

        return this;
    },

    /**
     * adds a new item to the task list.
     *
     * @param  {Function} task the task to add to the list
     * @param  {string|number|null} [id] the id of this tasks. If provided no task with the same id can be added again.
     * @return {void}
     */
    push(task, id = null) {
        if (!id || this.registeredIds.indexOf(id) < 0) {
            this.tasks.push({ id: id, work: task });

            if (id) {
                this.registeredIds.push(id);
            }
        }
    },

    unshift(task, id = null) {
        if (!id || this.registeredIds.indexOf(id) < 0) {
            this.tasks.unshift({ id: id, work: task });

            if (id) {
                this.registeredIds.push(id);
            }
        }
    },

    flush() {
        this.tasks = [];
        this.registeredIds = [];
    },

    filter(callback) {
        const newList = Object(__WEBPACK_IMPORTED_MODULE_1__memory__["a" /* allocate */])(0);

        for (let i = 0; i < this.length; i++) {
            const item = this.tasks[i];

            if (callback(item, i)) {
                newList.push(item);
            }
        }

        Object(__WEBPACK_IMPORTED_MODULE_1__memory__["b" /* release */])(this.tasks);
        this.tasks = newList;
    },

    run(...args) {
        this.filter((task) => {
            return task.work(...args) === __WEBPACK_IMPORTED_MODULE_0__CurrentFrameInterface__["a" /* default */].INTERUPT_CURRENT_TASK;
        });
    },

    getAll() {
        return this.tasks;
    },
};

/* harmony default export */ __webpack_exports__["a"] = (TaskList);


/***/ }),
/* 33 */
/*!******************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/EnabledBinding.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);





let EnabledBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(/** @lends module:DataBinding.EnabledBinding# */{
    /**
     * @type {Node}
     */
    parentNode : null,

    /**
     * @constructs
     * @extends {module:DataBinding.Binding}
     */
    _make: __WEBPACK_IMPORTED_MODULE_3__Binding_js__["a" /* default */]._make,

    /**
     * @param {module:DataBinding.ScopePrototype} scope the scope to work on
     * @return {void}
     */
    update : function(scope){
        let value = Object(__WEBPACK_IMPORTED_MODULE_1__Parser_js__["parseExpression"])(this.originalNodeValue, scope);

        if (!value) {
            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(this.parentNode).setAttribute('disabled', '');
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(this.parentNode).removeAttribute('disabled');
        }
    }

}, __WEBPACK_IMPORTED_MODULE_3__Binding_js__["a" /* default */]).get();

/* harmony default export */ __webpack_exports__["a"] = (EnabledBinding);


/***/ }),
/* 34 */
/*!****************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/StyleBinding.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make__ = __webpack_require__(/*! ../af/util/make */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser__ = __webpack_require__(/*! ./Parser */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Binding__ = __webpack_require__(/*! ./Binding */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_application_frame_rendering__ = __webpack_require__(/*! application-frame/rendering */ 6);
/**
 * @module DataBinding/StyleBinding
 */







/**
 * @param {StyleBinding} container - binding container
 * @param {ScopePrototype} scope - the scope for this binding
 * @return {void}
 */
let readStyleProperties = function(container, scope) {
    Object.keys(container.bindings).forEach(styleKey => {
        let style = window.getComputedStyle(container.parentNode);
        let dimensions = container.parentNode.getBoundingClientRect();

        if(styleKey.split('.')[0] === 'dimensions') {
            let value = dimensions[styleKey.split('.')[1]];

            Object(__WEBPACK_IMPORTED_MODULE_1__Parser__["assignExpression"])(container.bindings[styleKey], scope, value);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_1__Parser__["assignExpression"])(container.bindings[styleKey], scope, style[styleKey]);
        }
    });
};

let StyleBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make__["a" /* Make */])(/** @lends module:DataBinding/StyleBinding~StyleBinding# */{
    bindings: null,

    /**
     * @constructs
     * @extends {module:DataBinding.Binding}
     *
     * @return {void}
     */
    _make: function() {
        this.bindings = Object(__WEBPACK_IMPORTED_MODULE_1__Parser__["ObjectParser"])(this.bindings);
    },

    update: function(scope) {
        __WEBPACK_IMPORTED_MODULE_3_application_frame_rendering__["a" /* RenderEngine */].schedulePostRenderTask(readStyleProperties.bind(null, this, scope));
    }
}, __WEBPACK_IMPORTED_MODULE_2__Binding__["a" /* default */]).get();

/**
 * @member StyleBinding
 * @type {module:DataBinding/StyleBinding~StyleBinding}
 * @static
 */
/* harmony default export */ __webpack_exports__["a"] = (StyleBinding);


/***/ }),
/* 35 */
/*!*****************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/TwoWayBinding.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Mapping_js__ = __webpack_require__(/*! ./Mapping.js */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);






/**
 * @class TwoWayBinding
 * @extends module:DataBinding.Binding
 * @memberof module:DataBinding
 */

let TwoWayBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(/** @lends module:DataBinding.TwoWayBinding# */{
    /**
     * the last known view value
     *
     * @type {string}
     */
    currentValue : '',

    /**
     * @type {Node}
     */
    parentNode : null,

    /**
     * @type {boolean}
     */
    indirect : false,

    /**
     * @type {string}
     */
    viewBinding : '',

    update : function(scope) {
        // the current value on the scope
        let value = Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(this.properties[0], scope);

        if (!this.indirect) {
            let attribute = __WEBPACK_IMPORTED_MODULE_1__Mapping_js__["a" /* attributeNames */].rename(this.node.name);

            Object(__WEBPACK_IMPORTED_MODULE_3__Util_js__["b" /* polyInvoke */])(this.parentNode).setAttribute(attribute, value);
        } else {
            // the current view value
            //let viewValue = parseExpression(this.viewBinding, this.parentNode);

            // check if our current scope value is different from the last value.
            // Then check if the view value doesn't have unassigned changes.
            // Only apply the scope value to the view if both rules apply.
            if (value !== this.currentValue) {
                Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["assignExpression"])(this.viewBinding, this.parentNode, value);

                if (Object(__WEBPACK_IMPORTED_MODULE_2__Parser_js__["parseExpression"])(this.viewBinding, this.parentNode) === value) {
                    this.currentValue = value;
                }

                if (document.activeElement === this.parentNode) {
                    let range = document.createRange();
                    let selection = window.getSelection();

                    range.selectNodeContents(this.parentNode);
                    range.collapse(false);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }
    }
}, __WEBPACK_IMPORTED_MODULE_4__Binding_js__["a" /* default */]).get();

/* harmony default export */ __webpack_exports__["a"] = (TwoWayBinding);


/***/ }),
/* 36 */
/*!******************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/TemplateLoader.js ***!
  \******************************************************************************************/
/*! exports provided: importTemplate */
/*! exports used: importTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return importTemplate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__af_core_NetworkRequest__ = __webpack_require__(/*! ../af/core/NetworkRequest */ 9);


//import { polyInvoke } from './Util.js';


/*let FakeTemplate = {
    _markup : '',
    _fragment: null,

    _make : function(markup) {
        this._markup = markup;
    },

    get content() {
        if (!this._fragment) {
            this._fragment = new DocumentFragment();
            let container = document.createElement('div');

            polyInvoke(container).innerHTML = this._markup;

            [].forEach.apply(container.childNodes, [element => {
                polyInvoke(this._fragment).appendChild(element);
            }]);
        }
        return this._fragment;
    }
};*/

/**
 * imports a template node from an external HTML file.
 *
 * @function
 *
 * @param {string} source the url of the file that holds the template to import
 * @param {HTMLTemplateElement} template the template element to contain the import
 *
 * @return {HTMLTemplateElement} returns the provided template node, but now holding the imported nodes.
 */
let importTemplate = function(source, template) {
    let request = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(__WEBPACK_IMPORTED_MODULE_1__af_core_NetworkRequest__["a" /* default */])(source, {});

    return request.send().then(markup => {
        template.innerHTML = markup;

        return template;
    });
};


/***/ }),
/* 37 */
/*!************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/ViewPort.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(/*! ../main */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__af_util_make__ = __webpack_require__(/*! ../af/util/make */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util__ = __webpack_require__(/*! ./Util */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_application_frame_rendering__ = __webpack_require__(/*! application-frame/rendering */ 6);
/**
 * @module DataBinding/ViewPort
 */






const LIST_HAS_ITEMS = 0;

/** @lends module:DataBinding/ViewPort.ViewPortInstance# */
let ViewPortInstance = {

    /**
     * @private
     * @type {module:DataBinding.ScopePrototype}
     */
    _scope : null,

    /**
     * @private
     * @type {boolean}
     */
    _bound : false,

    /**
     * @private
     * @type {module:DataBinding.ScopePrototype}
     */
    _innerScope : null,

    /**
     * @private
     * @type {HTMLTemplateElement}
     */
    _originalTemplate : null,

    /**
     * @private
     * @type {Application}
     */
    _application : null,

    /**
     * @constructs
     *
     * @param  {module:DataBinding.ScopePrototype} scope    the scope of this viewport instance
     * @param  {Application} application the application this viewport instance belongs to
     *
     * @return {void}
     */
    _make : function(scope, application) {
        this._scope = scope;
        this._application = application;
    },

    /**
     * binds the ViewPort to a scope so it can be filled with content
     *
     * @param  {Object} context a collection of properties to configure the viewport
     *
     * @return {Promise.<module:DataBinding/ViewPort.ViewPortInstance>}  promise for when the viewport is bound
     */
    bind : function(context) {
        return new Promise((done, error) => {
            if (!this._bound) {
                __WEBPACK_IMPORTED_MODULE_3_application_frame_rendering__["a" /* RenderEngine */].schedulePostRenderTask(() => {
                    this._scope.templateUrl = context.template;
                    this._scope.overflow = '';
                    this._scope.__apply__();

                    if (!this._originalTemplate) {
                        this._originalTemplate = this._scope.element.firstElementChild;
                    }

                    this._innerScope = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* DataBinding */].makeTemplate(
                        this._originalTemplate,
                        context.scope || {},
                        this._application,
                        this._scope
                    );

                    this._bound = true;

                    context.scope = this._innerScope;

                    done(this);
                });
            } else {
                error('ViewPort: viewport is already bound!');
            }
        });
    },

    /**
     * updates the inner scope of the viewport
     *
     * @param  {...*} args arguments to be passed on to {@link module:DataBinding.ScopePrototype#__apply__}
     *
     * @return {void}
     */
    update : function(...args) {
        return this._innerScope.__apply__(...args);
    },

    /**
     * the scope if ViewPort content
     *
     * @type {module:DataBinding.ScopePrototype}
     */
    get scope() {
        return this._innerScope;
    },

    destory : function(){
        if (this._bound) {
            this._innerScope.__destroy__();

            while (this._scope.element.children.length > LIST_HAS_ITEMS) {
                Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(this._scope.element).removeChild(this._scope.element.firstChild);
            }

            Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(this._scope.element).appendChild(this._originalTemplate);
            this._bound = false;
            this._originalTemplate.processed = false;
        }
    },

    /**
     * enables the viewport content to overflow the viewports bounds
     *
     * @return {void}
     */
    alowOverflow : function() {
        this._scope.overflow = 'overflow';
        this._scope.__apply__();
    },
};

/**
 * the interface for the ViewPort module
 *
 * @namespace
 * @static
 */
let ViewPort = {

    /**
     * all instanciated ViewPorts
     *
     * @private
     * @type {Map.<module:DataBinding.ScopePrototype>}
     */
    _elements : new Map(),

    /**
     * the applicaion the viewports are registered to
     *
     * @private
     * @type {Application}
     */
    _application : null,

    /**
     * @constructs
     * @param {Application} application - the application this viewport belongs to.
     * @return {void}
     */
    _make : function(application){
        let style = Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(document.head).appendChild(document.createElement('style'));
        let template = document.createElement('template');

        Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(style).innerHTML = `
            .view-port {
                position: relative;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow: auto;
            }

            .view-port.overflow {
                overflow: visible;
            }
        `;

        template.id = 'view-port';
        Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(template).setAttribute('bind-element', '');
        Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(template).setAttribute('component', '');

        Object(__WEBPACK_IMPORTED_MODULE_2__Util__["b" /* polyInvoke */])(template).innerHTML = `
            <div class="custom-element {{overflow}}">
                <template src="templateUrl" replace></template>
            </div>
        `;

        application.on('newElement:view-port', (scope) => {
            this._elements[scope.name] = Object(__WEBPACK_IMPORTED_MODULE_1__af_util_make__["a" /* Make */])(ViewPortInstance)(scope, application);
            application.emit(`viewPort:ready:${scope.name}`);
        });

        this._application = application;

        __WEBPACK_IMPORTED_MODULE_0__main__["a" /* DataBinding */].makeTemplate(template, () => { return {}; }, application);
    },

    /**
     * fetches a viewPort instance by a name
     *
     * @param  {string} name the name to look for
     *
     * @return {Promise.<module:DataBinding.ScopePrototype>}  the matching scope
     */
    getInstance : function(name){
        return new Promise((success) => {
            if (this._elements[name]) {
                success(this._elements[name]);
            } else {
                this._application.on(`viewPort:ready:${name}`, () => success(this._elements[name]));
            }
        });
    },

    /**
     * destorys an viewPort instance
     *
     * @param  {module:DataBinding/ViewPort.ViewPortInstance} instance the instance to destroy
     *
     * @return {void}
     */
    free : function(instance){
        this._elements[instance._scope.name] = null;

        instance._scope.__destroy__();
    }
};

/* harmony default export */ __webpack_exports__["a"] = (ViewPort);


/***/ }),
/* 38 */
/*!*************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/IfBinding.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BindingRegistry_js__ = __webpack_require__(/*! ./BindingRegistry.js */ 4);





let IfBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])(/** @lends module:DataBinding.IfBinding# **/{

    /** @type {string} */
    name: 'bind-if',

    /**
     * @type {Node}
     */
    parentNode: null,

    /**
     * @type {Node}
     */
    node: null,

    /**
     * @type {Node}
     */
    nextSibling: null,

    /**
     *
     * @constructs
     * @extends {Binding}
     * @param {Node} parentNode - this node
     * @param {string} text - the attribute value
     * @param {ScopeInfo} scopeInfo - bindings container
     *
     * @return {void}
     */
    _make: function({ parentNode, text, scopeInfo }) {
        this.node = parentNode;
        this.parentNode = this.node.parentNode;
        this.text = text;
        this.nextSibling = parentNode.nextSibling;

        scopeInfo.bindings.push(this);
    },

    update: function(scope) {
        let isTrue = Object(__WEBPACK_IMPORTED_MODULE_1__Parser_js__["parseExpression"])(this.text, scope);

        if (isTrue) {
            if (this.node.parentNode !== this.parentNode) {
                if (this.nextSibling) {
                    this.parentNode.insertBefore(this.node, this.nextSibling);
                } else {
                    this.parentNode.appendChild(this.node);
                }
            }
        } else {
            if (this.node.parentNode === this.parentNode) {
                this.parentNode.removeChild(this.node);
            }
        }
    },

}, __WEBPACK_IMPORTED_MODULE_2__Binding_js__["a" /* default */]).get();

__WEBPACK_IMPORTED_MODULE_3__BindingRegistry_js__["a" /* default */].register(IfBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (IfBinding);


/***/ }),
/* 39 */
/*!*************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/ElementToScopeBinding.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make__ = __webpack_require__(/*! ../af/util/make */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser__ = __webpack_require__(/*! ./Parser */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Binding__ = __webpack_require__(/*! ./Binding */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BindingRegistry_js__ = __webpack_require__(/*! ./BindingRegistry.js */ 4);





let ElementToScopeBinding = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make__["a" /* Make */])(/** @lends module:DataBinding.ElementToScopeBinding.prototype */{

    /**
     * @type {string}
     */
    name: 'scope-id',

    /**
     * @type {Node}
     */
    parentNode: null,

    /**
     * @constructs
     * @extends {module:DataBinding.Binding}
     *
     * @param  {Node} parentNode   parent node of this binding
     * @param  {Object} scopeInfo  scope metadata object
     * @param  {string} text       original text value of the binding
     *
     * @return {void}
     */
    _make: function({ parentNode, scopeInfo, text }) {
        __WEBPACK_IMPORTED_MODULE_2__Binding__["a" /* default */]._make.apply(this);

        this.parentNode = parentNode;
        this.text = text;

        scopeInfo.bindings.push(this);

    },

    update: function(scope) {
        /** @type {Node} */
        let currentValue = Object(__WEBPACK_IMPORTED_MODULE_1__Parser__["parseExpression"])(this.text, scope);

        if (currentValue !== this.parentNode) {
            Object(__WEBPACK_IMPORTED_MODULE_1__Parser__["assignExpression"])(this.text, scope, this.parentNode);
            scope.__apply__(null, true);
        }
    },

}, __WEBPACK_IMPORTED_MODULE_2__Binding__["a" /* default */]).get();

__WEBPACK_IMPORTED_MODULE_3__BindingRegistry_js__["a" /* default */].register(ElementToScopeBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (ElementToScopeBinding);


/***/ }),
/* 40 */
/*!***************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/HtmlBinding.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Parser_js__ = __webpack_require__(/*! ./Parser.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BindingRegistry_js__ = __webpack_require__(/*! ./BindingRegistry.js */ 4);






/**
 * [HtmlBinding description]
 *
 * @lends module:DataBinding.HtmlBinding#
 * @extends module:DataBinding.Binding
 *
 * @type {Object}
 */
const HtmlBinding = {

    name: 'bind-html',


    _make({ parentNode, text, scopeInfo }) {
        this.parentNode = parentNode;
        this.text = text;

        scopeInfo.bindings.push(this);
    },

    update(scope) {
        let text = Object(__WEBPACK_IMPORTED_MODULE_1__Parser_js__["parseExpression"])(this.text, scope, this.parentNode);

        text = Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["c" /* sanitizeText */])(text);

        if (this.parentNode.innerHTML !== text) {
            Object(__WEBPACK_IMPORTED_MODULE_2__Util_js__["b" /* polyInvoke */])(this.parentNode).innerHTML = text;
        }
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0__Binding_js__["a" /* default */],
};

__WEBPACK_IMPORTED_MODULE_3__BindingRegistry_js__["a" /* default */].register(HtmlBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (HtmlBinding);


/***/ }),
/* 41 */
/*!****************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/CloakBinding.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Binding_js__ = __webpack_require__(/*! ./Binding.js */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util_js__ = __webpack_require__(/*! ./Util.js */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BindingRegistry_js__ = __webpack_require__(/*! ./BindingRegistry.js */ 4);





/**
 * [CloakBinding description]
 *
 * @lends module:DataBinding.CloakBinding#
 * @extends module:DataBinding.Binding
 *
 * @type {Object}
 */
const CloakBinding = {

    name: 'bind-cloak',

    scopeBindingList: null,


    _make({ parentNode, scopeInfo }) {
        this.parentNode = parentNode;
        this.scopeBindingList = scopeInfo.bindings;

        scopeInfo.bindings.push(this);
    },

    update() {
        Object(__WEBPACK_IMPORTED_MODULE_1__Util_js__["b" /* polyInvoke */])(this.parentNode).removeAttribute(this.name);
        this.scopeBindingList.splice(this.scopeBindingList.indexOf(this), 1);
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0__Binding_js__["a" /* default */],
};

let style = document.createElement('style');

style.id = 'cloak-binding';

style.innerHTML = `
    [bind-cloak] {
        visibility: hidden;
    }
`;

document.head.appendChild(style);

__WEBPACK_IMPORTED_MODULE_2__BindingRegistry_js__["a" /* default */].register(CloakBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (CloakBinding);


/***/ }),
/* 42 */
/*!*****************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/bindings/AttributeBinding.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BindingApi__ = __webpack_require__(/*! ../BindingApi */ 5);


const AttributeBinding = {

    name: 'bind-attr',

    config: null,

    currentValue: null,

    constructor({ node: parentNode, text, parameter }) {
        super._make(this);

        this.parentNode = parentNode;

        if (parameter && parameter != '') {
            const [expression, eventName] = text.split('=');

            this.config = {
                isNewBinding: true,
                expression: expression.trim(),
                eventName: (eventName && eventName.trim()) || '',
                attributeName: parameter,
            };

            if (eventName && eventName !== '') {
                parentNode.addEventListener(eventName, this.onViewUpdate.bind(this));
            }
        } else {
            this.config = __WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */].parser.ObjectParser(text);
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this).attachBinding(this);

        return this;
    },

    _make(...args) {
        return this.constructor(...args);
    },

    update(scope) {
        if (this.config.isNewBinding) {
            return this.updateNew(scope);
        } else {
            return this.updateOld(scope);
        }
    },

    updateOld(scope) {
        const { parser } = Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this);
        const { parseExpression } = parser;
        const attrName = this.config.name;
        const attrValue = this.config.value ? parseExpression(this.config.value, scope) : '';
        const attrEnabled = this.config.enabled ? parseExpression(this.config.enabled, scope) : true;


        if (attrEnabled) {
            this.parentNode.setAttribute(attrName, attrValue);
        } else {
            this.parentNode.removeAttribute(attrName);
        }
    },

    updateNew(scope) {
        const { parseExpression } = Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this).parser;
        const value = parseExpression(this.config.expression, scope);

        // check if our current scope value is different from the last value.
        // Then check if the view value doesn't have unassigned changes.
        // Only apply the scope value to the view if both rules apply.
        if (value !== this.currentValue) {
            this.setValue(value);

            if (this.findValue() === value) {
                this.currentValue = value;
            }

            if (document.activeElement === this.parentNode) {
                const range = document.createRange();
                const selection = window.getSelection();

                range.selectNodeContents(this.parentNode);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    },

    findValue() {
        if (this.parentNode.hasOwnProperty(this.config.attributeName)) {
            return this.parentNode[this.config.attributeName];
        } else {
            return this.parentNode.getAttribute(this.config.attributeName);
        }
    },

    setValue(value) {
        if (this.parentNode.hasOwnProperty(this.config.attributeName)) {
            this.parentNode[this.config.attributeName] = value;
        } else {
            this.parentNode.setAttribute(this.config.attributeName, value);
        }
    },

    onViewUpdate() {
        const value = this.findValue();

        if (this.currentValue !== value) {
            Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this).scheduleScopeUpdate((scope) => {
                Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this).parser.assignExpression(this.config.expression, scope);
                this.currentValue = value;
            });
        }
    },

    __proto__: Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])().Binding,
};

Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])().registerBinding(AttributeBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (AttributeBinding);


/***/ }),
/* 43 */
/*!**********************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/bindings/TemplateRepeatBinding.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_util_make_js__ = __webpack_require__(/*! ../../af/util/make.js */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Bind_js__ = __webpack_require__(/*! ../Bind.js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BindingApi__ = __webpack_require__(/*! ../BindingApi */ 5);




const { parseExpression } = Object(__WEBPACK_IMPORTED_MODULE_2__BindingApi__["a" /* default */])().parser;


const TemplateRepeatBinding = {

    name: 'bind-repeat',

    /**
     * @type {WeakMap}
     */
    itemNodeList : null,

    /**
     * @type {WeakMap}
     */
    itemScopeList : null,

    /**
     * @type {Node}
     */
    template : null,

    /**
     * @type {Node}
     */
    marker : null,

    /**
     * @type {Array}
     */
    modelBackup : null,

    model: null,

    /**
     * @type {Boolean}
     */
    fast: false,

    /**
     * @constructs
     * @extends {Binding}
     * @return {void}
     */
    _make({ node: template, text, parameter }) {
        super._make();

        const marker = document.createComment(`repeat ${template.id} with ${text}`);

        if (template.nodeName !== 'TEMPLATE') {
            console.error('[Repeat Binding] binding can only be used with template elements!');
            return;
        }

        this.originalNodeValue = text;
        this.template = template;
        this.marker = marker;

        if (parameter === 'fast') {
            this.itemNodeList = [];
            this.itemScopeList = [];
            this.fast = true;
        } else {
            this.itemNodeList = new Map();
            this.itemScopeList = new Map();
        }

        this.modelBackup = [];

        console.log('replace template with marker');
        template.parentNode.replaceChild(marker, template);

        Object(__WEBPACK_IMPORTED_MODULE_2__BindingApi__["a" /* default */])(this).attachBinding(this);

        return this;
    },

    /**
     * renders one model item to the DOM
     *
     * @param  {ScopePrototype} scope      [description]
     * @param  {string} itemName   [description]
     * @param  {number} index      [description]
     * @return {void}            [description]
     */
    renderItemFast(scope, itemName, index) {
        let childScope = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])({
            $first : index === 0,
            $last : this.model.length-1 === index,
            $index : index,
            __parentScope__ : scope,
        }, scope).get();

        Object.defineProperty(childScope, itemName, {
            get:() => {
                return this.model[index];
            }
        });

        const node = document.importNode(this.template.content, true).firstElementChild;
        Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["a" /* bindNode */])(node, childScope, true);

        this.itemNodeList[index] = node;
        this.itemScopeList[index] = childScope;

        return node;
    },

    /**
     * renders one model item to the DOM
     *
     * @param  {*} model      [description]
     * @param  {ScopePrototype} scope      [description]
     * @param  {string} itemName   [description]
     * @param  {DocumentFragment} fragment   [description]
     * @param  {Node} polyParent [description]
     * @param  {Object} item       [description]
     * @param  {number} index      [description]
     * @return {void}            [description]
     */
    renderItemStable(model, scope, itemName, fragment, item, index) {
        let node = null;

        if (this.itemNodeList.has(item)) {
            node = this.itemNodeList.get(item);
            let childScope = this.itemScopeList.get(item);

            childScope.$first = index === 0;
            childScope.$last = model.length -1 === index;
            childScope.$index = index;

            childScope.update();
        } else {
            let childScope = Object(__WEBPACK_IMPORTED_MODULE_0__af_util_make_js__["a" /* Make */])({
                $first : index === 0,
                $last : model.length-1 === index,
                $index : index,
                __parentScope__ : scope,
            }, scope).get();

            childScope[itemName] = item;

            node = document.importNode(this.template.content, true).firstElementChild;
            Object(__WEBPACK_IMPORTED_MODULE_1__Bind_js__["a" /* bindNode */])(node, childScope, true);

            this.itemNodeList.set(item, node);
            this.itemScopeList.set(item, childScope);
        }

        fragment.appendChild(node);
    },

    updateFast(scope) {
        const [itemName, link, expression] = this.originalNodeValue.split(' ');

        this.model = parseExpression(expression, scope);

        if (link !== 'in') {
            console.console.error('DataBinding: invalide expression', this.originalNodeValue);
            return;
        }

        if (!Array.isArray(this.model)) {
            console.warn('A repeat binding can only consume arrays!', this.model);
            this.model = [];
        }

        while (this.itemNodeList.length > this.model.length) {
            const node = this.itemNodeList.pop();
            const scope = this.itemScopeList.pop();

            node.parentNode.removeChild(node);
            scope.__destroy__();
        }

        this.itemScopeList.forEach(scope => scope.update());

        while (this.itemNodeList.length < this.model.length) {
            const marker = this.itemNodeList.length ? this.itemNodeList[this.itemNodeList.length-1] : this.marker;

            const node = this.renderItemFast(scope, itemName, this.itemNodeList.length);

            if (marker.nextElementSibling) {
                marker.parentNode.insertBefore(node, marker.nextElementSibling);
            } else {
                marker.parentNode.appendChild(node);
            }
        }
    },

    updateStable(scope) {
        let [itemName, link, expression] = this.originalNodeValue.split(' ');
        let model = parseExpression(expression, scope);
        let dirty = false;

        if (link !== 'in') {
            console.console.error('DataBinding: invalide expression', this.originalNodeValue);
            return;
        }

        if (!Array.isArray(model)) {
            console.warn('A repeat binding can only consume arrays!', model);
            model = [];
        }

        dirty = this.modelBackup.length !== model.length;

        if (!dirty) {
            for (let i = 0; i < model.length; i++) {
                if (model[i] !== this.modelBackup[i]) {
                    dirty = true;
                    break;
                }
            }
        }

        if (dirty) {
            // clean out items that where removed.
            this.modelBackup.forEach(item => {
                if (model.indexOf(item) < 0) {
                    const node = this.itemNodeList.get(item);

                    // if the node doesn't exist something went totally wrong... but it happens :/
                    if (node) {
                        this.marker.parentNode.removeChild(node);
                    }

                    this.itemScopeList.delete(item);
                    this.itemNodeList.delete(item);
                }
            });

            this.modelBackup = model.slice();

            if (window.Polymer) {
                window.Polymer.dom.flush();
            }

            /** @type {DocumentFragment} */
            const fragment = document.createDocumentFragment();

            model.forEach(this.renderItemStable.bind(this, model, scope, itemName, fragment));

            if (this.marker.nextElementSibling) {
                this.marker.parentNode.insertBefore(fragment, this.marker.nextElementSibling);
            } else {
                this.marker.parentNode.appendChild(fragment);
            }
        }
    },

    update(scope) {
        if (this.fast) {
            return this.updateFast(scope);
        } else {
            return this.updateStable(scope);
        }
    },

    destory() {
        let count = this.modelBackup.reduce((prev, item) => {
            let [scopes, bindings] = prev;
            let scope = this.itemScopeList.get(item);
            let [scopes_add, bindings_add] = scope.__destroy__(true);

            return [scopes + scopes_add, bindings + bindings_add];
        }, [0, 0]);

        this.itemScopeList = null;
        this.itemNodeList = null;

        return count;
    },

    __proto__: Object(__WEBPACK_IMPORTED_MODULE_2__BindingApi__["a" /* default */])().Binding,
};

Object(__WEBPACK_IMPORTED_MODULE_2__BindingApi__["a" /* default */])().registerBinding(TemplateRepeatBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (TemplateRepeatBinding);


/***/ }),
/* 44 */
/*!*************************************************************************************************!*\
  !*** /Users/Jovan/search-bot/node_modules/@af-modules/databinding/lib/bindings/EventBinding.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BindingApi__ = __webpack_require__(/*! ../BindingApi */ 5);


const EventBinding = {

    name: 'bind-event',

    constructor({ node, text, parameter }) {
        super.constructor();

        this.node = node;
        this.text = text;
        this.parameter = parameter;

        Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this).scheduleScopeUpdate(this.registerEventHandler.bind(this));

        return this;
    },

    _make(...args) {
        this.constructor(...args);
    },

    registerEventHandler(scope) {
        const handler = Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])(this).parser.parseExpression(this.text, scope);

        this.node.addEventListener(this.parameter, (event) => {
            let preventRecycle = false;

            event.preventRecycle = () => preventRecycle = true;

            handler(event, scope);

            if (!preventRecycle) {
                scope.update();
            }
        });
    },

    update() {
        return true;
    },

    __proto__: Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])().Binding,
};

Object(__WEBPACK_IMPORTED_MODULE_0__BindingApi__["a" /* default */])().registerBinding(EventBinding);

/* unused harmony default export */ var _unused_webpack_default_export = (EventBinding);


/***/ }),
/* 45 */
/*!********************************************!*\
  !*** ./modules/PropertyAssistant/index.js ***!
  \********************************************/
/*! exports provided: suggestMostCommonPropType, findArticlesWithProperties */
/*! exports used: suggestMostCommonPropType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ArticlePropertyScraper__ = __webpack_require__(/*! ../ArticlePropertyScraper */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__arrayContains__ = __webpack_require__(/*! ../arrayContains */ 46);



const suggestMostCommonPropType = function(articleList, propertyDef) {
    const properties = articleList.reduce((list, article) => {
        const props = Object(__WEBPACK_IMPORTED_MODULE_0__ArticlePropertyScraper__["a" /* scrapProperties */])({ article, propertyDef });

        props.forEach(prop => {
            if (!list[prop.type]) {
                list[prop.type] = 1;
            } else {
                list[prop.type] += 1;
            }
        });

        return list;
    }, {});

    const mostImportant = Object.keys(properties)
        .sort((a, b) => properties[a] === properties[b] ? 0 : (properties[a] > properties[b] ? 1 : -1))
        .shift();

    const property = propertyDef.find(item => item.name === mostImportant);

    return property;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = suggestMostCommonPropType;


const findArticlesWithProperties = function(articleList, properties, propertyDef) {
    articleList.filter(article => {
        const articleProperties = Object(__WEBPACK_IMPORTED_MODULE_0__ArticlePropertyScraper__["a" /* scrapProperties */])({ article, propertyDef });

        Object(__WEBPACK_IMPORTED_MODULE_1__arrayContains__["a" /* default */])(articleProperties, properties);
    });
};
/* unused harmony export findArticlesWithProperties */



/***/ }),
/* 46 */
/*!**********************************!*\
  !*** ./modules/arrayContains.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const arrayContains = function(array, subset) {
    const result = array.some(item => {
        const subIndex = subset.findIndex(subItem => match(item, subItem));

        if (subIndex > -1) {
            subIndex.splice(subIndex, 1);
        }

        if (subset.length === 0) {
            return true;
        }
    });

    return result;
};

/* harmony default export */ __webpack_exports__["a"] = (arrayContains);

const match = function(objectA, objectB) {
    const keys = (Object.keys(objectA).length > Object.keys(objectB).length) ?
        Object.keys(objectA) : Object.keys(objectB);

    return keys.reduce((state, key) => state && objectA[key] === objectB[key]);
};


/***/ }),
/* 47 */
/*!******************************!*\
  !*** ./views/FiltersView.js ***!
  \******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_modules_databinding_prototypes_ViewController__ = __webpack_require__(/*! @af-modules/databinding/prototypes/ViewController */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectedProperties__ = __webpack_require__(/*! ../SelectedProperties */ 10);
//import DataStorage from 'application-frame/core/DataStorage';



//const { create } = Object;

const FiltersView = {

    template: 'filters',

    selectedProperties: null,

    selectedPropertiesList: [],

    init() {
        this.constructor();
        this.selectedProperties = __WEBPACK_IMPORTED_MODULE_1__SelectedProperties__["a" /* SelectedProperties */];
        this.selectedProperties.when(properties => {
            this.selectedPropertiesList = Object.keys(properties)
                .map(key => ({ name: key, values: properties[key]}));

            this.scope.update();
        });
    },

    notLast(list, index) {
        return !(list.length-1 === index);
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0__af_modules_databinding_prototypes_ViewController__["a" /* default */],
};

/* harmony default export */ __webpack_exports__["a"] = (FiltersView);


/***/ }),
/* 48 */
/*!********************************!*\
  !*** ./views/SearchBoxView.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_ArrayAll__ = __webpack_require__(/*! ../modules/ArrayAll */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_ArrayAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modules_ArrayAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_application_frame_core_NetworkRequest__ = __webpack_require__(/*! application-frame/core/NetworkRequest */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__af_modules_databinding_prototypes_ViewController__ = __webpack_require__(/*! @af-modules/databinding/prototypes/ViewController */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SelectedProperties__ = __webpack_require__(/*! ../SelectedProperties */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_SearchParser__ = __webpack_require__(/*! ../modules/SearchParser */ 50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ActionChain__ = __webpack_require__(/*! ../ActionChain */ 51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AssistantChatView__ = __webpack_require__(/*! ./AssistantChatView */ 13);










const { create } = Object;

const SearchBoxView = {

    template: 'search-box',

    searchResults: null,

    init() {
        this.constructor();
        this.createOnSearchChain();

        [create(__WEBPACK_IMPORTED_MODULE_1_application_frame_core_NetworkRequest__["a" /* default */]).constructor('./data/propertyTypes.json', {type: 'json'}),
            create(__WEBPACK_IMPORTED_MODULE_1_application_frame_core_NetworkRequest__["a" /* default */]).constructor('./data/propertyValues.json', {type: 'json'})]
        .map(request => request.send())
            .all(promises => Promise.all(promises))
            .then(([types, values]) => {
                Object(__WEBPACK_IMPORTED_MODULE_4__modules_SearchParser__["a" /* configureGrammar */])({
                    fillWords: ['as', 'with', 'like', 'a'],
                    types,
                    values,
                });
            });
    },

    selectedProperties: __WEBPACK_IMPORTED_MODULE_3__SelectedProperties__["a" /* SelectedProperties */],
    onSearchChain: null,

    createOnSearchChain() {
        this.onSearchChain = Object(__WEBPACK_IMPORTED_MODULE_5__ActionChain__["a" /* default */])().stage(event => {
            return new Promise((resolve) => setTimeout(() => resolve(event), 100));
        }).stage(event => {
            const searchText = event.target.value;
            const result = Object(__WEBPACK_IMPORTED_MODULE_4__modules_SearchParser__["b" /* parseSearchQuery */])(searchText);

            const selected = result.reduce((map, item) => {
                if (!map[item.type]) {
                    map[item.type] = [];
                }

                map[item.type].push(item['name']);

                return map;
            }, {});

            this.selectedProperties.fill(selected);
        }).stage(() => {
            return new Promise(r => setTimeout(r, 100));
        }).stage(() => {
            __WEBPACK_IMPORTED_MODULE_6__AssistantChatView__["a" /* default */].startSession();
        });
    },

    onSearch(event) {
        this.onSearchChain.feed(event);
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_2__af_modules_databinding_prototypes_ViewController__["a" /* default */],
};

/* harmony default export */ __webpack_exports__["a"] = (SearchBoxView);


/***/ }),
/* 49 */
/*!*****************************!*\
  !*** ./modules/ArrayAll.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

Array.prototype.all = function(callback) {
    return callback(this);
};


/***/ }),
/* 50 */
/*!***************************************!*\
  !*** ./modules/SearchParser/index.js ***!
  \***************************************/
/*! exports provided: parseSearchQuery, configureGrammar */
/*! exports used: configureGrammar, parseSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const config = {
    fillWords: null,
    types: null,
    values: null,
};

const parseSearchQuery = function(queryText) {

    if (!config.fillWords || !config.types || !config.values) {
        return [];
    }

    const query = queryText.split(' ').filter(word => !config.fillWords.includes(word));

    const containedValues = query.map(word => (word in config.values) ? config.values[word] : null)
        .reduce((list, item) => list.concat(item), [])
        .filter((value, index, list) => !!value && list.indexOf(value) === index)
        .filter((value) => queryText.search(value.regex) > -1);

    return containedValues;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = parseSearchQuery;


const configureGrammar = function({ fillWords = [], types = [], values = [] } = {}) {

    config.fillWords = fillWords;
    config.types = types;
    config.values = values.reduce((container, value) => {
        let names = [];

        names = names.concat(value.name.split(' ').map(item => item.toLowerCase()));

        if (value.aliases) {
            names = names.concat(value.aliases.map(alias => alias.split(' '))
                .reduce((list, item) => list.concat(item), []));

            value.regex = new RegExp(`(${value.name.toLowerCase()}|${value.aliases.map(item => item.toLowerCase()).join('|')})`);
        } else {
            value.regex = new RegExp(`${value.name.toLowerCase()}`);
        }

        names.forEach(name => {
            if (!container[name]) {
                container[name] = [];
            }

            container[name].push(value);
        });

        return container;
    }, {});

    return config;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = configureGrammar;



/***/ }),
/* 51 */
/*!************************!*\
  !*** ./ActionChain.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const { create } = Object;

const ActionChain = {
    _stages: null,
    _current: null,
    _coreId: null,
    _currentId: null,

    stage(callback) {
        this._stages.push(callback);

        return this;
    },

    feed(event) {
        const instance = create(this);

        this._coreId = window.performance.now();
        instance._currentId = this._coreId;
        instance._current = 0;

        instance._runStage(event);
    },

    _scheduleStage(currentValue) {
        if (currentValue && currentValue.then && typeof currentValue.then === 'function') {
            currentValue.then(this._runStage.bind(this));
        } else {
            Promise.resolve(currentValue).then(this._runStage.bind(this));
        }

        console.log(`stage ${this._current} has been scheduled!`);
    },

    _runStage(currentValue) {
        if (this._currentId !== this._coreId) {
            console.log(`${this._currentId} has been canceled by ${this._coreId}`);
            return;
        }

        const callback = this._stages[this._current];
        const newValue = callback(currentValue);

        this._current += 1;

        if (this._current === this._stages.length) {
            console.log('ActionChain completed', this);
            return;
        }

        this._scheduleStage(newValue);
    }
};

const craft = function() {
    const chain = create(ActionChain);

    chain._stages = [];
    chain.feed = chain.feed.bind(chain);

    return chain;
};

/* harmony default export */ __webpack_exports__["a"] = (craft);


/***/ }),
/* 52 */
/*!***********************************!*\
  !*** ./views/SearchResultView.js ***!
  \***********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__af_modules_databinding_prototypes_ViewController__ = __webpack_require__(/*! @af-modules/databinding/prototypes/ViewController */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ArticleStore__ = __webpack_require__(/*! ../ArticleStore */ 22);
//import DataStorage from 'application-frame/core/DataStorage';



//const { create } = Object;

const SearchResultView = {

    template: 'search-results',

    searchResults: null,

    init() {
        this.constructor();
        this.searchResults = __WEBPACK_IMPORTED_MODULE_1__ArticleStore__["a" /* ArticleStore */];
        this.searchResults.when(this.scope.update.bind(this.scope));
    },

    __proto__: __WEBPACK_IMPORTED_MODULE_0__af_modules_databinding_prototypes_ViewController__["a" /* default */],
};

/* harmony default export */ __webpack_exports__["a"] = (SearchResultView);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map