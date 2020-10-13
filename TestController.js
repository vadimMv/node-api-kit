/**
 * Test controller.
 * We define all our handlers  in this file.
 * 
 */
const { read, update, remove, create } = require('./lib/store');
const { parseJsonToObject } = require('./lib/helpers');
const { genereteToken } = require('./lib/auth');
const post = (d) => {
  const { obj } = d;
  const { id } = obj;
  const type = 'user';
  return create({ type, id, obj }).then(payload => ({ statusCode: 500, payload }, err => console.log(err)));
};
const put = async (d) => {
  const { obj } = d;
  const id = d.queryStringObject.id;
  try {
    const data = {
      id,
      type: 'user',
      payload: obj
    };
    const rez = await update(data);
    const result = {
      statusCode: 200,
      payload: parseJsonToObject(rez)
    };
    return result;
  }
  catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const get = async (data) => {
  try {
    const d = await read('user', data.queryStringObject.id);
    const result = {
      statusCode: 200,
      payload: parseJsonToObject(d)
    };
    return result;
  } catch (error) {
    throw new Error(error);
  }

};

const delet = async (reqD) => {

  try {
    const id = reqD.queryStringObject.id;
    const data = { id, type: 'user' };
    const d = await remove(data);
    const result = {
      statusCode: 200,
      payload: parseJsonToObject(d)
    };
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getToken = async (data) => {

  try {
    const t1 = await genereteToken();
     console.log('3-controller');

    return {
      statusCode: 200,
      payload: {
        token: t1,
        token2: data.t,
        token3: data.t2
      }
    };
  }
  catch (error) {
    throw new Error(error);
  }
}
const User = {
  get, post, put, delet, getToken
}

module.exports = User;