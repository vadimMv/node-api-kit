const User = require('../models/user')


const registration = async (input) => {
  const { body } = input;
  try {
    const tokenID = await User.createUser(body);
    return {
      statusCode: 201,
      payload: { tokenID },
    };
  } catch (error) {
    throw new Error(error);
  }
};

const set = async (input) => {
  const { body } = input;
  const id = input.queryStringObject.id;
  try {
    const payload = await User.updateUser({ id, body });
    return {
      statusCode: 200,
      payload
    };
  }
  catch (error) {
    throw new Error(error);
  }
}

const delet = async (input) => {
  const id = input.queryStringObject.id;
  try {
    const payload = await User.deleteUser(id);
    return {
      statusCode: 200,
      payload
    };
  } catch (error) {
    throw new Error(error);
  }
};

const get = async (input) => {
  try {
    const id = input.queryStringObject.id;
    const user = await User.getUser(id);
    return {
      statusCode: 200,
      payload: user
    };
  } catch (error) {
    throw new Error(error);
  }
};

const logout = async (input) => {
  const tokenId = input.headers.tokenid || '';
  try {
    await User.deleteUserToken(tokenId);
    return {
      statusCode: 200,
      payload: {
        message: 'log-out'
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (input) => {
  const id = input.queryStringObject.id;
  const data = {
     email : input.queryStringObject.email,
     password: input.queryStringObject.password
  };
  try {
    const tokenID = await User.loginUser({ id, data });
    return {
      statusCode: 200,
      payload: {
        tokenID,
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  login, registration, set, delet, get, logout
};