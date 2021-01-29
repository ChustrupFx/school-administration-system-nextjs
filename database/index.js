const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/school', {
    useNewUrlParser: true,
});

module.exports = mongoose;