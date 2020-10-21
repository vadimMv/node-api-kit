const router = require('./lib/router');
const watcher = require('./lib/watcher')
const http = require('http');

http
    .createServer((req, res) => {
        router({ req, res });
    })
    .listen(3000, () => console.log('listing port 3000'));



    watcher('./.data/orders');