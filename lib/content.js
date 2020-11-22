const fs = require('fs').promises;
const path = require('path');
const { MIME_TYPES } = require('./helpers');
const TEMPLATES_PATH = path.join(process.cwd(), './src/public');
const ASSERTS_PATH = path.join(process.cwd(), './src/asserts');
const template = async (name) => {
    const header = await _loadHtml('header');
    const main = await _loadHtml(name);
    const footer = await _loadHtml('footer');
    return header + main + footer;
};
const publicAsserts = async (input) => {
    const { trimmedPath } = input;
    const fileName = trimmedPath.split('/')[1];
    try {
        const fileContent = await fs.readFile(`${ASSERTS_PATH}/${fileName}`, 'utf8');
        const fileExt = path.extname(trimmedPath).substring(1);
        return {
            statusCode: 200,
            mime: MIME_TYPES[fileExt] || MIME_TYPES.html,
            payload: fileContent,
        };
    } catch (error) {
        throw new Error(`Failed to open ${fileName} file.`);
    }
};

const _loadHtml = async (fileName) => {
    try {
        return await fs.readFile(`${TEMPLATES_PATH}/${fileName}.html`, 'utf8');
    } catch (error) {
        throw new Error(`Failed to open ${name} file.`);
    }
}
module.exports = {
    template,
    publicAsserts
};
