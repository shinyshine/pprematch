"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("../utils");
var getStoreConnect_1 = require("./getStoreConnect");
function createUseSelectorHook(store) {
    return function useSelector() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selector = getStoreConnect_1.getStore.apply(void 0, args);
        var _a = (0, react_1.useReducer)(function (s) { return s + 1; }, 0), forceRender = _a[1];
        var latestSelector = (0, react_1.useRef)(selector);
        var latestStoreState = (0, react_1.useRef)();
        var latestSelectedState = (0, react_1.useRef)({});
        var storeState = store.getState();
        var selectedState;
        if (selector !== latestSelector.current ||
            storeState !== latestStoreState.current) {
            selectedState = selector(storeState);
        }
        else {
            selectedState = latestSelectedState.current;
        }
        (0, react_1.useLayoutEffect)(function () {
            latestSelector.current = selector;
            latestStoreState.current = storeState;
            latestSelectedState.current = selectedState;
        });
        (0, react_1.useLayoutEffect)(function () {
            function checkForUpdate() {
                try {
                    var newSelectedState = latestSelector.current(store.getState());
                    if ((0, utils_1.shallowEqual)(newSelectedState, latestSelectedState.current)) {
                        return;
                    }
                    latestSelectedState.current = newSelectedState;
                }
                catch (err) {
                    console.log(err);
                }
                forceRender();
            }
            var unsubscribe = store.subscribe(checkForUpdate);
            checkForUpdate();
            return unsubscribe;
        }, []);
        return selectedState;
    };
}
exports.default = createUseSelectorHook;
