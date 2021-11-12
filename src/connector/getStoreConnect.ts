import { objGet } from '../utils';
import connect from './connect';
import { StoreSelector } from '../types';

export function getStore<TState>(...args: Array<StoreSelector<TState>>) {
    return function(state: any, props?: any) {
        return args.reduce((prev, current) => {
            if(typeof current === 'function') {
                return { ...state, ...current(state)}
            }

            if(Array.isArray(current)) {
                const keys = current.concat();
                const modelName = keys.shift();
                const nextState: any = { ...prev };

                if(modelName) {
                    const modelState = state[modelName];
                    keys.forEach(key => nextState[key] = objGet(modelState, key))
                }

                return nextState

            }

            if(typeof args === 'string') {
                const data = current[0] === '*' ? objGet(state, current.slice(1)) : objGet(state, current);
                return current[0] === '*' ? { ...prev, ...data } : { ...prev, [current.split(/[.[\]"']/).pop() as string]: data };
            }
        }, {})
    }
}

export default function getStoreConnect<TState>(...args: Array<StoreSelector<TState>>) {
    return connect(getStore<TState>(...args))
}