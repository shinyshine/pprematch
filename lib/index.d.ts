import Store from './Store';
import type { PrematchOptions, PrematchModels } from './types';
export declare function init<TModels extends PrematchModels<TModels>>(options: PrematchOptions<TModels>): Store<TModels>;
export { useSelector, useDispatch, connect, getStoreConnect } from './connector';
declare const _default: Store<PrematchModels<any>>;
export default _default;
