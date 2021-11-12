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
function createUseDispatchHook(store) {
    return function useDispatch(filter) {
        if (typeof filter === 'function') {
            return filter(store.dispatch);
        }
        return __assign({}, store.dispatch);
    };
}
exports.default = createUseDispatchHook;
