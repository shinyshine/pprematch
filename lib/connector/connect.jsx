"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = __importDefault(require("../index"));
var utils_1 = require("../utils");
function connect(mapStateToProps, mapDispatchToProps) {
    var shouldSubscribe = Boolean(mapStateToProps);
    function computeStateProps(thisStore, props) {
        var state = thisStore.getState();
        var stateProps = mapStateToProps ? mapStateToProps(state, props) : {};
        return stateProps;
    }
    function computeDispatchProps(thisStore, props) {
        var dispatch = thisStore.dispatch;
        var dispatchProps = mapDispatchToProps ? mapDispatchToProps(dispatch, props) : {};
        return dispatchProps;
    }
    return function wrapWithContent(WrappedComponent) {
        return /** @class */ (function (_super) {
            __extends(Wrapped, _super);
            function Wrapped(props, context) {
                var _this = _super.call(this, props, context) || this;
                _this.store = index_1.default;
                _this.setWrappedInstance = function (ins) { return _this.wrappedInstance = ins; };
                _this.state = {
                    storeState: computeStateProps(_this.store, props),
                    storeDispatch: computeDispatchProps(_this.store, props)
                };
                _this.trySubscribe();
                return _this;
            }
            Wrapped.prototype.shouldComponentUpdate = function (nextProps, nextState) {
                var stateChanged = nextState.storeState !== this.state.storeState;
                var propsChanged = !(0, utils_1.shallowEqual)(nextProps, this.props);
                return propsChanged || stateChanged;
            };
            Wrapped.prototype.getWrappedInstance = function () {
                return this.wrappedInstance;
            };
            Wrapped.prototype.trySubscribe = function () {
                if (shouldSubscribe && !this.unsubscribe) {
                    this.unsubscribe = this.store.subscribe(this.handleChange);
                    this.handleChange();
                }
            };
            Wrapped.prototype.tryUnSubscribe = function () {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            };
            Wrapped.prototype.handleChange = function () {
                if (!(typeof this.unsubscribe === 'function')) {
                    return;
                }
                this.updateStateProps();
            };
            Wrapped.prototype.updateStateProps = function () {
                var nextStateProps = computeStateProps(this.store, this.props);
                if ((0, utils_1.shallowEqual)(nextStateProps, this.state.storeState)) {
                    return;
                }
                this.setState({
                    storeState: nextStateProps
                });
            };
            Wrapped.prototype.componentWillUnmount = function () {
                this.tryUnSubscribe();
            };
            Wrapped.prototype.render = function () {
                return (<WrappedComponent ref={this.setWrappedInstance} {...this.props} {...this.state.storeState} {...this.state.storeDispatch}/>);
            };
            return Wrapped;
        }(react_1.default.Component));
    };
}
exports.default = connect;
