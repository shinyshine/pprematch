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
Object.defineProperty(exports, "__esModule", { value: true });
exports.shallowEqual = exports.objCopy = exports.objGet = void 0;
var objGet = function (obj, path) {
    var paths = path.split(/[.\[\]]/g).filter(function (p) { return p; });
    var temp = obj;
    for (var i = 0; i < paths.length; i++) {
        var key = paths[i];
        if (temp === null || temp === undefined) {
            return undefined;
        }
        temp = temp[key];
    }
    return temp;
};
exports.objGet = objGet;
var objCopy = function (obj) {
    if (typeof obj !== 'object') {
        return obj;
    }
    return __assign({}, obj);
};
exports.objCopy = objCopy;
function shallowEqual(objA, objB) {
    if (typeof objA !== 'object'
        || typeof objB !== 'object' // 其中有一个不是object
        || !objA || !objB // 其中有一个为null
    )
        return objA === objB;
    if (objA === objB)
        return true;
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) ||
            objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }
    return true;
}
exports.shallowEqual = shallowEqual;
