/**
 * Test router.
 * We define all our routes in this file. Routes are matched using `path`.
 * 
 */

const User = require('./TestController');
const Middlewares = require('./TestMiddlewares');

const routes = [
    {
        method: 'GET',
        path: 'user',
        // middlewares: [Middlewares.Auth],
        handler: User.get
    },
    {
        method: 'POST',
        path: 'user',
        middlewares: [Middlewares.Auth],
        handler: User.post
    },

    {
        method: 'DELETE',
        path: 'user',
        middlewares: [Middlewares.Auth],
        handler: User.delet
    },
    {
        method: 'PUT',
        path: 'user',
        middlewares: [Middlewares.Auth],
        handler: User.put
    },
    {
        method: 'GET',
        path: 'token',
        middlewares: [Middlewares.Auth, Middlewares.Auth2],
        handler: User.getToken
    },
];

module.exports = routes;