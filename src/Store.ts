

// 提高私有属性直接调用门槛
// 改成类模式，允许存在多个store
// 但是要考虑单页模式下，store是否需要手动注销的问题
// 

import type { 
    PrematchModel, 
    PrematchModels, 
    PrematchModelsAttr,
    Action,
    PrematchListener,
    PrematchPlugin,
    SubscribeCallback,
    PrematchOptions,
    PrematchModelAttr,
    PrematchDispatch
} from './types';
import { objGet, objCopy } from './utils';


const $Listener = Symbol.for('store#listener');
const $State = Symbol.for('store#state');
const $Models = Symbol.for('store#models');
const $Plugins = Symbol.for('store#plugins');



/**
 * 职责：
 * 暴露可用的api、方法
 */
class PrematchStore<
    TModels extends PrematchModels<TModels>
> {

    private [$Listener]: Array<PrematchListener> = [];
    private [$State]: any = {}; // 🎃 如何锁住属性不被外部修改
    private [$Models]: PrematchModelsAttr<TModels>
    private [$Plugins]: PrematchPlugin<TModels>[]

    public dispatch: PrematchDispatch<TModels> = {}

    
    constructor(opts: PrematchOptions<TModels>) {
        const { 
            name, 
            models = {}, 
            plugins = []
        } = opts;

        this._addPlugins(plugins);
        this._addModels(models);

        // this._runPlugins('onStoreCreated', (onStoreCreated: (store: any)) => {
        //     const extraStore = onStoreCreated.call(this, this);

        //     if(extraStore) {
        //         Object.keys(extraStore || {}).forEach(key => {
        //             this[key] = extraStore[key];
        //         })
        //     }
        // })
        
    }

    getState() {
        return this[$State];
    }



    dispatchAction(action: Action): Promise<any> {
        const rootState = this[$State];
        const { type, payload } = action;
        const [modelName, reducerName] = type.split('/');

        const targetModel = this[$Models][modelName];
        if(!targetModel) {
            return Promise.resolve(null);
        }

        const reducer = targetModel.reducers ? targetModel.reducers[reducerName] : null;
        const effect = targetModel.effects ? targetModel.effects[reducerName] : null;
        const state = rootState[modelName];

        let promise;

        if(reducer) {
            const newState = reducer(state, payload);
            if(newState !== state) {
                this._updateState(modelName, newState);

                this._emitAllListeners()
            }

            promise = Promise.resolve(action);
        } else if(effect) {
            promise = Promise.resolve(effect.call(
                this.dispatch[modelName],
                payload,
                rootState
            ))
        }

        return promise || Promise.resolve(null);
    }

    // 订阅数据变更，一旦state有变更
    // 将会同步调用所有listener
    subscribe(listener: PrematchListener) {
        const allListeners = this[$Listener];
        allListeners.push(listener);

        return () => {
            this.unSubscribe(listener);
        }
    }

    unSubscribe(listener: PrematchListener) {
        this[$Listener] = this[$Listener].filter(i => i !== listener);
    }

    subscribeData(path: string, callback: SubscribeCallback) {
        const allState = this[$State];

        let oldState = objGet(allState, path);

        return this.subscribe(() => {
            // add listener
            const newState = objGet(allState, path);

            if(newState !== oldState) {
                callback(newState, oldState);
            }
        })
    }

  

    // 注册model
    model(newModel: PrematchModel<TModels>) {
        const { name, state, effects, reducers } = newModel;
        const newState = objCopy(state);

        if(typeof effects === 'function') {
            newModel.effects = effects(this.dispatch)
        }

        this[$State][name] = newState;
        this[$Models][name] = newModel as PrematchModelAttr<TModels>;
        
        const caller = this.dispatch[name];

        const callerKeys = Object.keys({ ...reducers, ...effects });
        callerKeys.forEach(key => {
            caller[key] = (payload: any) => this.dispatchAction({
                type: `${name}/${key}`,
                payload
            })

            // 给官方plugin用的isEffect属性
            caller[key].isEffect = effects && Object.keys(effects).includes(key);
        })


        // run plugin
        this._runPlugins('onModel', (onModel: (m: PrematchModels<TModels>) => any) => {
            onModel.call(this, newModel)
        })

        return caller
    }


     // 验证models合法性
     _addModels(models: TModels | Partial<TModels>) {
        const modelKeys = Object.keys(models);

        modelKeys.forEach(modelKey => {
            this.model(models[modelKey] as PrematchModel<TModels>);
        })
    }

    _addPlugins(plugins: PrematchPlugin<TModels>[]) {
        this[$Plugins] = [...plugins];
    }

    _runPlugins(eventName: string, eventCallback: (event: any) => void) {

        this[$Plugins].forEach(plugin => {
            if(plugin[eventName]) {
                eventCallback(plugin[eventName])
            }
        })
    }


    _updateState(key: string, newState: any) {
        this[$State][key] = newState;
    }



    // state改变，触发所有监听器的回调
    _emitAllListeners() {
        const allListeners = this[$Listener];
        allListeners.forEach(listener => {
            try {
                listener();
            } catch(err) {
                console.log(err);
            }
        })
    }

}

export default PrematchStore;