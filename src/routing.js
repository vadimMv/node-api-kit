/**
 * Test router.
 * We define all our routes in this file. Routes are matched using `path`.
 * 
 */

const User = require('./controllers/UserController');
const Middlewares = require('./controllers/Middlewares');
const {  Order, Shop } =require('./controllers/ShopController');
const routes = [

    // user api
    {
        method: 'GET',
        path: 'user',
        handler: User.login
    },
    {
        method: 'POST',
        path: 'user',
        handler: User.registration
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
        handler: User.set
    },
    {
        method: 'GET',
        path: 'get',
        middlewares: [Middlewares.Auth],
        handler: User.get
    } ,
    {
        method: 'GET',
        path: 'logout',
        handler: User.logout
    },
    // strore api
    {
        method: 'GET',
        path: 'api/list',
        middlewares: [Middlewares.Auth],
        handler: Shop.list
    } ,
    // order api
    {
        method: 'POST',
        path: 'api/order',
        middlewares: [Middlewares.Auth],
        handler: Order.create
    }
];

module.exports = routes;