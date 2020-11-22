
const getRoute = (routes, path, method) => {
    const resolvePath = path.includes('public') ? 'public' : path;
    return routes.find(route => route.path === resolvePath
        && route.method.toLowerCase() === method);
}

const toPromise = promise => {

    let isPromise = (!!promise && typeof promise.then === 'function') ? true : false;
    isPromise = (promise.constructor.name === 'AsyncFunction') ? true : false;
    if (isPromise) return promise;
    if (typeof promise === 'function') return promisifySync(promise);
    return Promise.resolve(promise);
}

const promisifySync = fn => (...args) => {
    try {
        const result = fn(...args);
        if (result instanceof Error) return Promise.reject(result);
        else return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const asyncPipe = (...funcs) => data => funcs.reduce((chain, func) => chain.then(func), Promise.resolve(data));

module.exports = {
    getRoute,
    toPromise,
    asyncPipe
}