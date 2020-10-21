const fs = require('fs');

const changes = [];

const display = files => {
    console.log('\x1Bc');
    console.log('Changes:');
    for (const item of changes) {
        console.log(item.date, item.event, ':', item.file);
        // console.log(item.date, item.event, ':', item.file);
        console.log(item);
    }
    // console.log('\nFiles:');
    // for (const file of files) {
    //     console.log(file);
    // }
    changes.length = 0;
};

const ls = path => {
    fs.readdir(path, (err, files) => {
        if (err) return;
        display(files);
    });
};

const watch = path => {
    fs.watch(path, (event, file) => {
        console.log('\x1Bc');
        changes.push({ date: new Date(), event, file });
        ls(path);
    });
};

module.exports = path => {
    // ls(path);
    watch(path);
};