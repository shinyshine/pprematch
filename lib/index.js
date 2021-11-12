"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreConnect = exports.connect = exports.useDispatch = exports.useSelector = exports.init = void 0;
var Store_1 = __importDefault(require("./Store"));
var globalBag;
// 初始化全局store
function init(options) {
    globalBag = new Store_1.default(options);
    return globalBag;
}
exports.init = init;
var connector_1 = require("./connector");
Object.defineProperty(exports, "useSelector", { enumerable: true, get: function () { return connector_1.useSelector; } });
Object.defineProperty(exports, "useDispatch", { enumerable: true, get: function () { return connector_1.useDispatch; } });
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connector_1.connect; } });
Object.defineProperty(exports, "getStoreConnect", { enumerable: true, get: function () { return connector_1.getStoreConnect; } });
exports.default = globalBag;
