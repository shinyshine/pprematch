import { PrematchModels, PrematchDispatch } from "../types";
import PrematchStore from "../Store";


export default function createUseDispatchHook<
    TModels extends PrematchModels<TModels>
>(store: PrematchStore<TModels>) {
    return function useDispatch(filter?: (d: PrematchDispatch<TModels>) => any) {
        if (typeof filter === 'function') {
            return filter(store.dispatch);
        }

        return { ...store.dispatch }
    }
}