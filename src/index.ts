import Store from './Store';
import type { 
    PrematchOptions,
    PrematchModels
} from './types';


let globalBag: any;

// 初始化全局store
export function init<TModels extends PrematchModels<TModels>>(
    options: PrematchOptions<TModels>
) {
    globalBag = new Store(options);
    return globalBag as Store<TModels>
}



export {
    useSelector,
    useDispatch,
    connect,
    getStoreConnect
} from './connector';

export default globalBag as Store<PrematchModels<any>>;






