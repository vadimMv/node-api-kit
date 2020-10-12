

const parseJsonToObject = str => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
};


module.exports = {
    parseJsonToObject
}