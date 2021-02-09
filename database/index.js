const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

module.exports = mongoose;