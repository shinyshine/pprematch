import { PrematchModels, PrematchDispatch } from "../types";
import PrematchStore from "../Store";
export default function createUseDispatchHook<TModels extends PrematchModels<TModels>>(store: PrematchStore<TModels>): (filter?: ((d: PrematchDispatch<TModels>) => any) | undefined) => any;
