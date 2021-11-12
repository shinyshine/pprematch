"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDispatch = exports.useSelector = exports.getStoreConnect = exports.connect = void 0;
var index_1 = __importDefault(require("../index"));
var useSelector_1 = __importDefault(require("./useSelector"));
var useDispatch_1 = __importDefault(require("./useDispatch"));
var connect_1 = require("./connect");
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return __importDefault(connect_1).default; } });
var getStoreConnect_1 = require("./getStoreConnect");
Object.defineProperty(exports, "getStoreConnect", { enumerable: true, get: function () { return __importDefault(getStoreConnect_1).default; } });
exports.useSelector = (0, useSelector_1.default)(index_1.default);
exports.useDispatch = (0, useDispatch_1.default)(index_1.default);
