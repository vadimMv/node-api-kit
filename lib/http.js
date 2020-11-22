const https = require('https');
const StringDecoder = require('string_decoder').StringDecoder;
const querystring = require('querystring');
const decoder = new StringDecoder('utf-8');

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        const req = https.request(options,
            (resp) => {
                console.log(`STATUS: ${resp.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(resp.headers)}`);
                console.log(resp);
                resp.setEncoding('utf8');
                let data = ''
                resp.on('data', (chunk) => {
                    data += decoder.write(chunk);
                })
                resp.on('end', () => {
                    resolve(data);
                });
                resp.on('error', (err) => {
                    reject(err);
                })
            });

        if (options.data) {
            req.write(querystring.stringify(options.data));
        }

        req.end();

    });
};
