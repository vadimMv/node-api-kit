/**
 * Simple shop controller
 */
const { read, create } = require('../../lib/store');
const { parseJsonToObject } = require('../../lib/helpers');
const paymentService = require('../services/payment');
const mailService = require('../services/mail');
const Order = {};
const Shop = {};

Shop.list = async () => {
    const pizzas = await read({ type: 'store', id: 'list' }).catch(e => e);
    return {
        statusCode: 200,
        payload: {
            list: parseJsonToObject(pizzas)
        }
    };
};

Order.create = async (input) => {
    const paymentData = {
        currency: 'usd',
        source: 'tok_amex',
        receipt_email: input.CurrentUser.email,
        ... await PrepareOrder(input.body),
    };
    console.log(paymentData);
    const { id, email, price } = await paymentService(paymentData);
    const mailData = {
        from: 'Pizza@pizza.deliver.com',
        to: email,
        subject: 'Hello from Pizza!!',
        text: `Thank you for buy , you price ${price}`
    };
    const { succes } = await mailService(mailData);
    await create({ type: 'orders', id, obj: { email, price } }).catch(e => { throw new Error("Cant order complete") });
    return {
        statusCode: 200,
        payload: {
            message: "Ok",
            email:succes
        }
    };
};

const PrepareOrder = async (input) => {
    const { name, count } = input;
    const store = await read({ type: 'store', id: 'list' }).catch(e => e);
    if (store === []) throw new Error("Trouble to process your order");
    const pizza = parseJsonToObject(store).filter(item => item.name === name.trim());
    if (pizza === []) throw new Error("Trouble to process your order");
    return {
        description: pizza[0].name,
        amount: pizza[0].priceUs * count,
    };
};

module.exports = {
    Order,
    Shop
};