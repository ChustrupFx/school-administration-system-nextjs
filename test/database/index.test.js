const mongoose = require('mongoose');
require('dotenv').config();

describe('database connection', () => {

    test('should connect to db successfully', async () => {
        var error = null;
        try {
            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
        } catch (e) {
            error = e;
        }
        expect(error).toBe(null);
    })

});