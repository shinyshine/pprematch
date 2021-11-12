import { useReducer, useRef, useLayoutEffect } from "react";

import PrematchStore from "../Store";
import { PrematchModels, StateMapper, StoreSelector } from '../types'
import { shallowEqual } from "../utils";
import { getStore } from './getStoreConnect';



export default function createUseSelectorHook<
    TModels extends PrematchModels<TModels>, 
    TState = any
>(store: PrematchStore<TModels>) {

    return function useSelector(
        ...args: Array<StoreSelector<TState>>
    ){
        const selector = getStore(...args);
        const [, forceRender] = useReducer(s => s + 1, 0)

        const latestSelector = useRef<StateMapper<TState>>(selector);
        const latestStoreState = useRef<TState>();
        const latestSelectedState = useRef<Partial<TState>>({});

        const storeState = store.getState();
        let selectedState: Partial<TState>;

        if (
            selector !== latestSelector.current ||
            storeState !== latestStoreState.current
        ) {
            selectedState = selector(storeState);
        } else {
            selectedState = latestSelectedState.current;
        }

        useLayoutEffect(() => {
            latestSelector.current = selector;
            latestStoreState.current = storeState;
            latestSelectedState.current = selectedState;
        })

        useLayoutEffect(() => {
            function checkForUpdate() {
                try {
                    const newSelectedState = latestSelector.current(store.getState());
                    if (shallowEqual(newSelectedState, latestSelectedState.current)) {
                        return;
                    }
    
                    latestSelectedState.current = newSelectedState;
                } catch (err) {
                    console.log(err);
                }
    
                forceRender();
            }
    
            const unsubscribe = store.subscribe(checkForUpdate);
            checkForUpdate();
    
            return unsubscribe;
        }, [])

        return selectedState;
    }
}