/// <reference types="react" />
import { StoreSelector } from '../types';
export declare function getStore<TState>(...args: Array<StoreSelector<TState>>): (state: any, props?: any) => any;
export default function getStoreConnect<TState>(...args: Array<StoreSelector<TState>>): (WrappedComponent: typeof import("react").Component) => {
    new (props: any, context: any): {
        store: import("../Store").default<import("../types").PrematchModels<any>>;
        unsubscribe: (() => void) | null;
        wrappedInstance: import("react").ReactInstance;
        shouldComponentUpdate(nextProps: any, nextState: import("../types").StoreState): boolean;
        getWrappedInstance(): import("react").ReactInstance;
        setWrappedInstance: (ins: import("react").ReactInstance) => import("react").ReactInstance;
        trySubscribe(): void;
        tryUnSubscribe(): void;
        handleChange(): void;
        updateStateProps(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof import("../types").StoreState>(state: import("../types").StoreState | ((prevState: Readonly<import("../types").StoreState>, props: Readonly<unknown>) => import("../types").StoreState | Pick<import("../types").StoreState, K> | null) | Pick<import("../types").StoreState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<unknown> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<import("../types").StoreState>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<unknown>, prevState: Readonly<import("../types").StoreState>): unknown;
        componentDidUpdate?(prevProps: Readonly<unknown>, prevState: Readonly<import("../types").StoreState>, snapshot?: unknown): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<unknown>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<unknown>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<unknown>, nextState: Readonly<import("../types").StoreState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<unknown>, nextState: Readonly<import("../types").StoreState>, nextContext: any): void;
    };
    contextType?: import("react").Context<any> | undefined;
};
