const axios = require('axios');
const cookie = require('cookie');

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

api.defaults.withCredentials = true;


module.exports = api;