export { default as connect } from './connect';
export { default as getStoreConnect } from './getStoreConnect';
export declare const useSelector: (...args: import("../types").StoreSelector<any>[]) => Partial<any>;
export declare const useDispatch: (filter?: ((d: import("../types").PrematchDispatch<import("../types").PrematchModels<any>>) => any) | undefined) => any;
