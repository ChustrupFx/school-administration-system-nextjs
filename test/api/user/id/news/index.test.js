const User = require("../../../../../models/User");
const Role = require("../../../../../models/Role");
const Shift = require("../../../../../models/Shift");
const jwt = require('jsonwebtoken');
const api = require("../../../../../services/api");
const Degree = require("../../../../../models/Degree");
require('dotenv').config();

describe('get new by user id', () => {

    var user;
    var token;

    beforeAll(async () => {
        user = await createMockUser();
        token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    });

    test('should get news successfully', async () => {
        const response = await api.post(`/user/${user._id}/news`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = response.data;

        expect(data.ok).toBeTruthy();
        expect(data.news).toBeTruthy();
    });

    afterAll(async () => {
        await user.remove();
    });

    async function createMockUser() {

        const degree = await Degree.findOne({ name: 'Ensino Médio' });
        const shift = await Shift.findOne({ name: 'Matutino' });
        const role = await Role.findOne({ name: 'Student' });
    
        const mockUser = {
            name: 'Test User',
            degree: degree._id,
            grade: 2,
            class: 'B',
            role: role._id,
            registrationCode: '00000',
            password: '123'
        }
    
        const user = await User.create(mockUser);
    
        return user;
    }

});
