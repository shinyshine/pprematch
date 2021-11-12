import React from "react";
import type { StateMapper, DispatchMapper, PrematchModels, StoreState } from '../types';
import PrematchStore from '../Store';
export default function connect<TModels extends PrematchModels<TModels>, TState>(mapStateToProps: StateMapper<TState>, mapDispatchToProps?: DispatchMapper<TModels>): (WrappedComponent: typeof React.Component) => {
    new (props: any, context: any): {
        store: PrematchStore<PrematchModels<any>>;
        unsubscribe: null | (() => void);
        wrappedInstance: React.ReactInstance;
        shouldComponentUpdate(nextProps: any, nextState: StoreState): boolean;
        getWrappedInstance(): React.ReactInstance;
        setWrappedInstance: (ins: React.ReactInstance) => React.ReactInstance;
        trySubscribe(): void;
        tryUnSubscribe(): void;
        handleChange(): void;
        updateStateProps(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof StoreState>(state: StoreState | ((prevState: Readonly<StoreState>, props: Readonly<unknown>) => StoreState | Pick<StoreState, K> | null) | Pick<StoreState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<unknown> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<StoreState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<unknown>, prevState: Readonly<StoreState>): unknown;
        componentDidUpdate?(prevProps: Readonly<unknown>, prevState: Readonly<StoreState>, snapshot?: unknown): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<unknown>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<unknown>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<unknown>, nextState: Readonly<StoreState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<unknown>, nextState: Readonly<StoreState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
