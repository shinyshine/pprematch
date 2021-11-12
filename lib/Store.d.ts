import type { PrematchModel, PrematchModels, Action, PrematchListener, PrematchPlugin, SubscribeCallback, PrematchOptions, PrematchDispatch } from './types';
declare const $Listener: unique symbol;
declare const $State: unique symbol;
declare const $Models: unique symbol;
declare const $Plugins: unique symbol;
/**
 * 职责：
 * 暴露可用的api、方法
 */
declare class PrematchStore<TModels extends PrematchModels<TModels>> {
    private [$Listener];
    private [$State];
    private [$Models];
    private [$Plugins];
    dispatch: PrematchDispatch<TModels>;
    constructor(opts: PrematchOptions<TModels>);
    getState(): any;
    dispatchAction(action: Action): Promise<any>;
    subscribe(listener: PrematchListener): () => void;
    unSubscribe(listener: PrematchListener): void;
    subscribeData(path: string, callback: SubscribeCallback): () => void;
    model(newModel: PrematchModel<TModels>): any;
    _addModels(models: TModels | Partial<TModels>): void;
    _addPlugins(plugins: PrematchPlugin<TModels>[]): void;
    _runPlugins(eventName: string, eventCallback: (event: any) => void): void;
    _updateState(key: string, newState: any): void;
    _emitAllListeners(): void;
}
export default PrematchStore;
