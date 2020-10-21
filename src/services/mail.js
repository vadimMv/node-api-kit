const request = require('../../lib/http');
const { mailgun_api_key, https_port, mailgun_host, mailgun_path } = require('../../config');

module.exports = async (data) => {
    const key = Buffer.from(mailgun_api_key).toString('base64');
    const options = {
        hostname: mailgun_host,
        port: https_port,
        path: mailgun_path,
        method: 'POST',
        headers: {
            'Authorization': `Basic ${key}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    };
    try {
        const response = await request(options);
        const obj = JSON.parse(response);
        return {
            id: obj.id,
            success: true,
        };
    } catch (error) {
        throw new Error("Cant complete payment");
    }
};

