
export interface Action {
    type: string
    payload?: any
}

export interface PrematchAction<TPayload = any, TMeta = any> {
    payload?: TPayload
    meta?: TMeta
}

export interface PrematchDispatch<TModels extends PrematchModels<TModels>> {
    [modelName: string]: any
}

export type PrematchReducer<TState = any> = (
    state: TState,
    payload?: PrematchAction['payload']
) => TState;

export type PrematchEffect<TModels extends PrematchModels<TModels>> = (
    payload: PrematchAction['payload'],
    rootState: any,
    meta: PrematchAction['meta']
) => any;

export interface ModelReducers<TState = any> {
    [key: string]: PrematchReducer<TState>
}
export interface ModelEffects<TModels extends PrematchModels<TModels>> {
    [key: string]: PrematchEffect<TModels>
}


export type ModelEffectsCreator<TModels extends PrematchModels<TModels>> = (
    dispatch: PrematchDispatch<TModels>
) => ModelEffects<TModels>

// models集合
export interface PrematchModels<TModels extends PrematchModels<TModels>> {
    [key: string]: PrematchModel<TModels>
}

export interface PrematchModelsAttr<TModels extends PrematchModels<TModels>> {
    [key: string]: PrematchModelAttr<TModels>
}
export interface PrematchModel<
    TModels extends PrematchModels<TModels>,
    TState = any
> {
    name: string
    state: TState
    reducers?: ModelReducers<TState>
    effects?: ModelEffects<TModels> | ModelEffectsCreator<TModels>
}

export interface PrematchModelAttr<
    TModels extends PrematchModels<TModels>,
    TState = any
> extends PrematchModel<TModels, TState> {
    effects?: ModelEffects<TModels>
}



export interface PrematchPlugin<TModels extends PrematchModels<TModels>> {
    config?: any;
    exposed?: any;
    [key: string]: any
}


export type PrematchListener = () => void;
export type SubscribeCallback = (newState: any, oldState: any) => void;

export interface PrematchOptions<TModels extends PrematchModels<TModels>> {
    name?: string,
    models?: TModels | Partial<TModels>,
    plugins?: PrematchPlugin<TModels>[]
}



export type StateMapper<TState> = (state: TState, props?: any) => any

export type DispatchMapper<TModels extends PrematchModels<TModels>> = 
    (dispatch: PrematchDispatch<TModels>, props: any) => PrematchDispatch<TModels>

export interface StoreState {
    storeState: any
    storeDispatch: any
}

export type StoreSelector<TState> = string | Array<string> | ((storeState: TState) => Partial<TState>);