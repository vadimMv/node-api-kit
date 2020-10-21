const request = require('../../lib/http');
const { stripe_host, stripe_api_key, stripe_path, https_port } = require('../../config');
module.exports = async (data) => {
    const options = {
        hostname: stripe_host,
        port: https_port,
        path: stripe_path,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${stripe_api_key}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    };
    try {
        const response = await request(options);
        const obj = JSON.parse(response);
        return {
            id: obj.id,
            email: obj.receipt_email,
            price: obj.amount,
        };
    } catch (error) {
        throw new Error("Cant complete payment");
    }
};
