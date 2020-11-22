const { template } = require('../../lib/content');
const { MIME_TYPES } = require('../../lib/helpers');
const Template = {};
Template.index = async () => await _generateTemplate('index');
Template.createUser = async () => await _generateTemplate('signup');
Template.loginUser = async () => await _generateTemplate('login');
Template.shopDasbord = async () => await _generateTemplate('shop');


const _generateTemplate = async (name) => {
    const indexHtml = await template(name).catch(e => { throw e });
    if (!indexHtml) throw new Error('empty file');
    return {
        statusCode: 200,
        mime: MIME_TYPES.html,
        payload: indexHtml,
    };
};
module.exports = Template;