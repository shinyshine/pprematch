import React from "react";
import type { 
    StateMapper, 
    DispatchMapper,
    PrematchModels,
    StoreState
} from '../types';
import PrematchStore from '../Store';
import globalBag from '../index';
import { shallowEqual } from '../utils';

export default function connect<
    TModels extends PrematchModels<TModels>,
    TState
>(
    mapStateToProps: StateMapper<TState>, 
    mapDispatchToProps?: DispatchMapper<TModels>
) {

    const shouldSubscribe = Boolean(mapStateToProps);

    function computeStateProps(thisStore: PrematchStore<TModels>, props: any) {
        const state = thisStore.getState();
        const stateProps = mapStateToProps ? mapStateToProps(state, props) : {};
        
        return stateProps;
    }

    function computeDispatchProps(thisStore: PrematchStore<TModels>, props: any) {
        const dispatch = thisStore.dispatch;
        const dispatchProps = mapDispatchToProps ? mapDispatchToProps(dispatch, props) : {};
        return dispatchProps;
    }

    return function wrapWithContent(WrappedComponent: typeof React.Component) {
        return class Wrapped extends React.Component<unknown, StoreState, unknown> {
            public store = globalBag;
            public unsubscribe: null | (() => void);
            wrappedInstance: React.ReactInstance;

            constructor(props: any, context: any) {
                super(props, context)

                this.state = {
                    storeState: computeStateProps(this.store, props),
                    storeDispatch: computeDispatchProps(this.store, props)
                }

                this.trySubscribe();
            }

            shouldComponentUpdate(nextProps: any, nextState: StoreState) {
                const stateChanged = nextState.storeState !== this.state.storeState;
                const propsChanged = !shallowEqual(nextProps, this.props);

                return propsChanged || stateChanged;
            }


            getWrappedInstance() {
                return this.wrappedInstance;
            }

            setWrappedInstance = (ins: React.ReactInstance) => this.wrappedInstance = ins

            trySubscribe() {
                if(shouldSubscribe && !this.unsubscribe) {
                    this.unsubscribe = this.store.subscribe(this.handleChange)
                    this.handleChange()
                }
            }

            tryUnSubscribe() {
                if(this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            }

            handleChange() {
                if(!(typeof this.unsubscribe === 'function')) {
                    return;
                }

                this.updateStateProps();
            }

            updateStateProps() {
                const nextStateProps = computeStateProps(this.store, this.props);
                if(shallowEqual(nextStateProps, this.state.storeState)) {
                    return;
                }

                this.setState({
                    storeState: nextStateProps
                })
            }

            componentWillUnmount() {
                this.tryUnSubscribe();
            }

            render() {
                return (
                    <WrappedComponent 
                        ref={this.setWrappedInstance}
                        {...this.props}
                        {...this.state.storeState}
                        {...this.state.storeDispatch}
                    />
                )
            }
        }
    }

}