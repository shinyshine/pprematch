

type StateObj = {
    [key: string] : any
}
export const objGet = (obj: StateObj, path: string) => {
    const paths = path.split(/[.\[\]]/g).filter(p => p);

    let temp = obj;

    for(let i = 0; i < paths.length; i ++) {
        const key = paths[i];
        if(temp === null || temp === undefined) {
            return undefined
        }
        temp = temp[key];
    }

    return temp;
}


export const objCopy = (obj: any) => {
    if(typeof obj !== 'object') {
        return obj
    }

    return { ...obj }
}


export function shallowEqual(objA: any, objB: any) {
    if (
        typeof objA !== 'object'
        || typeof objB !== 'object' // 其中有一个不是object
        || !objA || !objB // 其中有一个为null
    ) return objA === objB;
    if (objA === objB) return true;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    const hasOwn = Object.prototype.hasOwnProperty;
    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) ||
            objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}