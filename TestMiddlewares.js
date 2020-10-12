
const { token } = require('./lib/auth');
const Auth = async (_, res) => res.setHeader("Token", await token());
module.exports = {
    Auth,
}