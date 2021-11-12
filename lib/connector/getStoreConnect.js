"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStore = void 0;
var utils_1 = require("../utils");
var connect_1 = __importDefault(require("./connect"));
function getStore() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (state, props) {
        return args.reduce(function (prev, current) {
            var _a;
            if (typeof current === 'function') {
                return __assign(__assign({}, state), current(state));
            }
            if (Array.isArray(current)) {
                var keys = current.concat();
                var modelName = keys.shift();
                var nextState_1 = __assign({}, prev);
                if (modelName) {
                    var modelState_1 = state[modelName];
                    keys.forEach(function (key) { return nextState_1[key] = (0, utils_1.objGet)(modelState_1, key); });
                }
                return nextState_1;
            }
            if (typeof args === 'string') {
                var data = current[0] === '*' ? (0, utils_1.objGet)(state, current.slice(1)) : (0, utils_1.objGet)(state, current);
                return current[0] === '*' ? __assign(__assign({}, prev), data) : __assign(__assign({}, prev), (_a = {}, _a[current.split(/[.[\]"']/).pop()] = data, _a));
            }
        }, {});
    };
}
exports.getStore = getStore;
function getStoreConnect() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (0, connect_1.default)(getStore.apply(void 0, args));
}
exports.default = getStoreConnect;
