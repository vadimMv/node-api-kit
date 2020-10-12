const { read, update, remove, create } = require('./lib/store');
const { parseJsonToObject } = require('./lib/helpers');
const { token } = require('./lib/auth');
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

const getToken = async () => {

  try {
    const t = await token();
    // console.log(t)

    return {
      statusCode: 200,
      payload: {
        token: t,
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