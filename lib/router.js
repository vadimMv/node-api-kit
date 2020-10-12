const routing = require('../routing');
const url = require('url');
const { parseJsonToObject } = require('./helpers');

const StringDecoder = require('string_decoder').StringDecoder;

const router = client => handle(client);


const handle = ({ req, res }) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers = req.headers;
    const decoder = new StringDecoder('utf-8');
    const routeHandler = getRoute(routing, trimmedPath, method);
    let buffer = '';

    let middleware = typeof (routeHandler) !== 'undefined' ? routeHandler.middleware : undefined;


    middleware(req ,res);
    
    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
       
        let fn = typeof (routeHandler) !== 'undefined' ? routeHandler.handler : () => console.log('not found');
      
        const obj = parseJsonToObject(buffer);
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            obj,
        };
        fn = toPromise(fn);
        fn(data).then(
            (result) => {

                if (result === undefined) {
                    throw new Error('Controller method must return object {statusCode, payload }');
                }

                let code = typeof (result.statusCode) == 'number' ? result.statusCode : 200;
                let obj = typeof (result.payload) == 'object' ? result.payload : {};
                const payloadString = JSON.stringify(obj);
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(code);
                res.end(payloadString);
            },
            error => {
                res.writeHead(500);
                res.end(error.message);
            })
            .catch(error => {
                res.writeHead(500);
                res.end(error.message);
            });
    });
};

const getRoute = (routes, path, method) => routes.find(route => route.path === path
    && route.method.toLowerCase() === method);

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
module.exports = router;