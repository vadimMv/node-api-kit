const path = require('path');
const fsPromises = require('fs').promises;
const baseDir = path.join(__dirname, '/../.data');

const create = ({ type, id, obj }) => {
    const data = JSON.stringify(obj);
    return _open(type, id, 'wx').then(handle => handle.writeFile(data),
        reason => {
            console.log(reason);
            throw new Error(` file -- ${id} exsist.`);
        });
};


const read = (type, id) => {
    return _open(type, id, 'r+').then(handle => handle.readFile('utf-8'),
        reason => {
            console.error(reason);
            throw new Error(`Failed to read -- ${id} file.`);
        })
}

// const update = (data) => {

//     const { id, type, payload } = data;
//     let ref = null;
//     const strJson = JSON.stringify(payload);
//     return _open(type, id, 'r+').then(handle => handle.truncate(),
//         reason => {
//             console.error(reason);
//             throw new Error(`Failed to update -- ${id} file.`);
//         }).then(fileHandler => { console.log(fileHandler); fileHandler.writeFile(strJson) }
//             , reason => {
//                 console.error(reason);
//                 throw new Error(`Failed to read -- ${id} file.`);
//             })
// }
const update = (data) => {
    const { id, type, payload } = data;
    const strJson = JSON.stringify(payload);
    return fsPromises.truncate(`${baseDir}/${type}/${id}.json`).then(() => {
        fsPromises.writeFile(`${baseDir}/${type}/${id}.json`, strJson, "utf-8")
    },
        reason => {
            console.error(reason);
            throw new Error(`Failed to update -- ${id} file.`);
        })
}
const remove = (data) => {
    const { type, id } = data;
    return fsPromises.unlink(`${baseDir}/${type}/${id}.json`).then(result => result
        , reason => {
            console.error(reason);
            throw new Error(`Failed to delete -- ${id} file.`);
        })
};


const _open = (dir, file, premisson) =>
    fsPromises.open(`${baseDir}/${dir}/${file}.json`, premisson).then(fileHandler => fileHandler
        , reason => {
            console.error(reason);
            throw new Error(`Failed to open file -- ${file}`);
        });


module.exports = {
    create,
    read,
    update,
    remove
};