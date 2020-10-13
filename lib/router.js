const routing = require('../routing');
const url = require('url');
const { parseJsonToObject } = require('./helpers');
const { getRoute, toPromise, asyncPipe } = require('./functions');
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

    let middlewares = typeof (routeHandler) !== 'undefined' ? routeHandler.middlewares : undefined;
    let handler = typeof (routeHandler) !== 'undefined' ? routeHandler.handler : () => console.log('not found');

    if(typeof (middlewares) === 'undefined')  middlewares = [];

    middlewares.forEach(middleware => toPromise(middleware));
    handler = toPromise(handler);
    
    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {

        buffer += decoder.end();
        const obj = parseJsonToObject(buffer);

        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            obj,
        };

        asyncPipe(...middlewares, handler)(data).then(
            (result) => {

                if (result === undefined) {
                    throw new Error('Controller method must return object { statusCode, payload }');
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

module.exports = router;