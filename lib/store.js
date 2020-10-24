const path = require('path');
const fsPromises = require('fs').promises;
const baseDir = path.join(__dirname, '/../.data');

const create = ({ type, id, obj }) => {
    let filehandle = null;
    const data = JSON.stringify(obj);
    return _open(type, id, 'wx').then(handle => {
        fileHandler = handle;
        return handle.writeFile(data);
    },
        reason => {
            console.log(reason);
            throw new Error(` file -- ${id} exsist.`);
        }).finally(() => {
            if (filehandle) {
                filehandle.close();
            }
        });
};


const read = ({ type, id }) => {
    let filehandle = null;
    return _open(type, id, 'r+').then(handle => {
        filehandle = handle;
        return handle.readFile('utf-8');
    },
        reason => {
            console.error(reason);
            throw new Error(`Failed to read -- ${id} file.`);
        }).finally(() => {
            if (filehandle) {
                filehandle.close();
            }
        });
}

const update = ({ id, type, payload }) => {
    const strJson = JSON.stringify(payload);
    return fsPromises.truncate(`${baseDir}/${type}/${id}.json`).then(() => {
        fsPromises.writeFile(`${baseDir}/${type}/${id}.json`, strJson, "utf-8")
    },
        reason => {
            console.error(reason);
            throw new Error(`Failed to update -- ${id} file.`);
        })
}

const remove = ({ type, id }) => {
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