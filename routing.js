/**
 * We define all our routes in this file. Routes are matched using `path`.
 * 
 */

const User = require('./TestController');
const  Middlewares = require ('./TestMiddlewares');

const routes = [
    {
        method: 'GET',
        path: 'user',
        handler: User.get
    },
    {
        method: 'POST',
        path: 'user',
        handler: User.post
    },

    {
        method: 'DELETE',
        path: 'user',
        handler: User.delet
    },
    {
        method: 'PUT',
        path: 'user',
        handler: User.put
    },
    {
        method: 'GET',
        path: 'token',
        middleware: Middlewares.Auth,
        handler: User.getToken
    },
];

module.exports = routes;