declare type StateObj = {
    [key: string]: any;
};
export declare const objGet: (obj: StateObj, path: string) => StateObj | undefined;
export declare const objCopy: (obj: any) => any;
export declare function shallowEqual(objA: any, objB: any): boolean;
export {};
