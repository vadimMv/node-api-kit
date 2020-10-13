
const { genereteToken } = require('./lib/auth');
const Auth = async (data) => {

    const t = await genereteToken(120);
    // throw new Error('bad token');
    console.log('1')
    data.t = t;
    return data;
}


const Auth2 = async (data) => {

    const t = await genereteToken(90);
    // throw new Error('bad token');
    console.log('2')
    data.t2 = t;
    return data;
}
module.exports = {
    Auth,
    Auth2
}