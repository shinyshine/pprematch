"use strict";
// 提高私有属性直接调用门槛
// 改成类模式，允许存在多个store
// 但是要考虑单页模式下，store是否需要手动注销的问题
// 
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var $Listener = Symbol.for('store#listener');
var $State = Symbol.for('store#state');
var $Models = Symbol.for('store#models');
var $Plugins = Symbol.for('store#plugins');
/**
 * 职责：
 * 暴露可用的api、方法
 */
var PrematchStore = /** @class */ (function () {
    function PrematchStore(opts) {
        this[_a] = [];
        this[_b] = {}; // 🎃 如何锁住属性不被外部修改
        this.dispatch = {};
        var name = opts.name, _c = opts.models, models = _c === void 0 ? {} : _c, _d = opts.plugins, plugins = _d === void 0 ? [] : _d;
        this._addPlugins(plugins);
        this._addModels(models);
        // this._runPlugins('onStoreCreated', (onStoreCreated: (store: any)) => {
        //     const extraStore = onStoreCreated.call(this, this);
        //     if(extraStore) {
        //         Object.keys(extraStore || {}).forEach(key => {
        //             this[key] = extraStore[key];
        //         })
        //     }
        // })
    }
    PrematchStore.prototype.getState = function () {
        return this[$State];
    };
    PrematchStore.prototype.dispatchAction = function (action) {
        var rootState = this[$State];
        var type = action.type, payload = action.payload;
        var _c = type.split('/'), modelName = _c[0], reducerName = _c[1];
        var targetModel = this[$Models][modelName];
        if (!targetModel) {
            return Promise.resolve(null);
        }
        var reducer = targetModel.reducers ? targetModel.reducers[reducerName] : null;
        var effect = targetModel.effects ? targetModel.effects[reducerName] : null;
        var state = rootState[modelName];
        var promise;
        if (reducer) {
            var newState = reducer(state, payload);
            if (newState !== state) {
                this._updateState(modelName, newState);
                this._emitAllListeners();
            }
            promise = Promise.resolve(action);
        }
        else if (effect) {
            promise = Promise.resolve(effect.call(this.dispatch[modelName], payload, rootState));
        }
        return promise || Promise.resolve(null);
    };
    // 订阅数据变更，一旦state有变更
    // 将会同步调用所有listener
    PrematchStore.prototype.subscribe = function (listener) {
        var _this = this;
        var allListeners = this[$Listener];
        allListeners.push(listener);
        return function () {
            _this.unSubscribe(listener);
        };
    };
    PrematchStore.prototype.unSubscribe = function (listener) {
        this[$Listener] = this[$Listener].filter(function (i) { return i !== listener; });
    };
    PrematchStore.prototype.subscribeData = function (path, callback) {
        var allState = this[$State];
        var oldState = (0, utils_1.objGet)(allState, path);
        return this.subscribe(function () {
            // add listener
            var newState = (0, utils_1.objGet)(allState, path);
            if (newState !== oldState) {
                callback(newState, oldState);
            }
        });
    };
    // 注册model
    PrematchStore.prototype.model = function (newModel) {
        var _this = this;
        var name = newModel.name, state = newModel.state, effects = newModel.effects, reducers = newModel.reducers;
        var newState = (0, utils_1.objCopy)(state);
        if (typeof effects === 'function') {
            newModel.effects = effects(this.dispatch);
        }
        this[$State][name] = newState;
        this[$Models][name] = newModel;
        var caller = this.dispatch[name];
        var callerKeys = Object.keys(__assign(__assign({}, reducers), effects));
        callerKeys.forEach(function (key) {
            caller[key] = function (payload) { return _this.dispatchAction({
                type: name + "/" + key,
                payload: payload
            }); };
            // 给官方plugin用的isEffect属性
            caller[key].isEffect = effects && Object.keys(effects).includes(key);
        });
        // run plugin
        this._runPlugins('onModel', function (onModel) {
            onModel.call(_this, newModel);
        });
        return caller;
    };
    // 验证models合法性
    PrematchStore.prototype._addModels = function (models) {
        var _this = this;
        var modelKeys = Object.keys(models);
        modelKeys.forEach(function (modelKey) {
            _this.model(models[modelKey]);
        });
    };
    PrematchStore.prototype._addPlugins = function (plugins) {
        this[$Plugins] = __spreadArray([], plugins, true);
    };
    PrematchStore.prototype._runPlugins = function (eventName, eventCallback) {
        this[$Plugins].forEach(function (plugin) {
            if (plugin[eventName]) {
                eventCallback(plugin[eventName]);
            }
        });
    };
    PrematchStore.prototype._updateState = function (key, newState) {
        this[$State][key] = newState;
    };
    // state改变，触发所有监听器的回调
    PrematchStore.prototype._emitAllListeners = function () {
        var allListeners = this[$Listener];
        allListeners.forEach(function (listener) {
            try {
                listener();
            }
            catch (err) {
                console.log(err);
            }
        });
    };
    return PrematchStore;
}());
_a = $Listener, _b = $State;
exports.default = PrematchStore;
