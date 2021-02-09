const User = require('../../../../../models/User');
const Degree = require('../../../../../models/Degree');
const Shift = require('../../../../../models/Shift');
const Role = require('../../../../../models/Role');
const jwt = require('jsonwebtoken');
const api = require('../../../../../services/api/index');
require('dotenv').config();

describe('get tasks by user id', () => {

    var user;
    var token;

    beforeEach(async () => {
        user = await createMockUser();
        token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    });
    test('should get tasks by user id', async () => {
        const response = await api.post(`/user/${user._id}/tasks`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const responseData = response.data;

        expect(responseData.ok).toBeTruthy();
    });

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
        registrationCode: '00000'
    }

    const user = await User.create(mockUser);

    return user;
}