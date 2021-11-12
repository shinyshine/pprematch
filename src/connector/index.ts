
import store from '../index';
import createUseSelectorHook from "./useSelector";
import createUseDispatchHook from "./useDispatch";


export { default as connect } from './connect';
export { default as getStoreConnect } from './getStoreConnect';

export const useSelector = createUseSelectorHook(store);
export const useDispatch = createUseDispatchHook(store);