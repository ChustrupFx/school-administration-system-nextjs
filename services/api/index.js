const axios = require('axios');
require('dotenv').config();

const api = axios.create({
    baseURL: 'https://school-administration-system-nextjs-adf8jypb9.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Cookie, Set-Cookie, Authorization'
    }
});

api.defaults.withCredentials = true;


module.exports = api;