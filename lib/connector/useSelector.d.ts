import PrematchStore from "../Store";
import { PrematchModels, StoreSelector } from '../types';
export default function createUseSelectorHook<TModels extends PrematchModels<TModels>, TState = any>(store: PrematchStore<TModels>): (...args: Array<StoreSelector<TState>>) => Partial<TState>;
