
const { read, update, remove, create } = require('../../lib/store');
const { genereteToken, genereteHash } = require('../../lib/auth');
const { parseJsonToObject } = require('../../lib/helpers');

const createUser = async ({ id, email, street, password }) => {
    const hashedPassword = await genereteHash(password);
    const user = { email, street, password: hashedPassword };
    const expires = Date.now() + 1000 * 60 * 60;
    try {
        const result = await create({ type: 'user', id, obj: user });
        const tokenID = await genereteToken(25);
        await create({ type: 'tokens', id: tokenID, obj: { userId: id, expires } });
        return tokenID;
    } catch (error) {
        throw new Error(error);
    }
};

const updateUser = async ({ id, body }) => {
    try {
        body.password = await genereteHash(body.password);
        const result = await update({ id, type: 'user', payload: body });
        const updatedUser = parseJsonToObject(result);
        return updatedUser;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteUser = async (id) => {
    try {
        const result = await remove({ id, type: 'user' });
        const deletedUser = parseJsonToObject(result);
        return deletedUser;
    } catch (error) {
        throw new Error(error);
    }
};

const getUser = async (id) => {
    try {
        const result = await read({ id, type: 'user' });
        const user = parseJsonToObject(result);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteUserToken = async (id) => {
    try {
        await remove({ id, type: 'tokens' });
        return;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const loginUser = async ({ id, data: { email, password } }) => {
    const hashed = await genereteHash(password)
    const user = await getUser(id).catch(error => { throw new Error(error) });
    if (email === user.email && hashed === user.password) {
        try {
            const tokenID = await genereteToken(25);
            const expires = Date.now() + 1000 * 60 * 60;
            await create({ type: 'tokens', id: tokenID, obj: { userId: id, expires } });
            return tokenID;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
    throw new Error('Invalid password or email');
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    deleteUserToken,
    loginUser
};