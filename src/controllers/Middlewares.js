const { read } = require('../../lib/store');
const { parseJsonToObject } = require('../../lib/helpers')
const Auth = async (input) => {
    const { headers } = input;

    if (headers.tokenid === undefined) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
    }
    try {
        const token = await read({ type: 'tokens', id: headers.tokenid });
        let isValid = verifyToken(parseJsonToObject(token)) ? true : false;

        if (!isValid) {
            const error = new Error('Invalid token..');
            error.statusCode = 401;
            throw error;
        }

        const user = await read({ type: 'user', id: parseJsonToObject(token).userId });
        input.CurrentUser = parseJsonToObject(user);
        return input;
    }
    catch (error) {
        throw error;
    }
}

const verifyToken = token => token.expires > Date.now();


module.exports = {
    Auth
}