

const parseJsonToObject = str => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
};

const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
    json : 'application/json',
  };
  

module.exports = {
    parseJsonToObject ,
    MIME_TYPES 
}