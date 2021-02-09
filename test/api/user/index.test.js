const User = require('../../../models/User');
const Shift = require('../../../models/Shift');
const Degree = require('../../../models/Degree');
const Role = require('../../../models/Role');
const api = require('../../../services/api/index');
const cookie = require('cookie');

describe('user', () => {
    const mockUser = {
        name: 'test',
        registrationCode: '00000',
        password: '123',
        grade: 8,
        class: 'B'
    };
    var authToken = null;

    beforeAll(async () => {
        const shift = await Shift.findOne({ name: 'Matutino' });
        const degree = await Degree.findOne({ name: 'Ensino Médio' });
        const role = await Role.findOne({ name: 'Student' });
        console.log(role);
        
        mockUser.shift = shift._id;
        mockUser.degree = shift._id;
        mockUser.role = role._id;
    });

    afterAll(async () => {
        const { registrationCode } = mockUser;
        const existingUser = await User.findOne({ registrationCode });
        if (existingUser) await existingUser.remove();
    });

    test('should create user successfully', async () => {
        const response = await api.post('/user/create', mockUser);
        const responseData = response.data;
        mockUser._id = responseData.user._id;

        expect(responseData).toHaveProperty('ok');
        expect(responseData.ok).toBeTruthy();
        expect(responseData).toHaveProperty('user');
        expect(responseData.user).toHaveProperty('_id');
        expect(responseData.user).toHaveProperty('name');
        expect(responseData.user).toHaveProperty('registrationCode');
        expect(responseData.user).toHaveProperty('grade');
        expect(responseData.user).toHaveProperty('shift');
        expect(responseData.user).toHaveProperty('class');
        expect(responseData.user).toHaveProperty('degree');
        expect(responseData.user).not.toHaveProperty('password');
    });

    test('should read user by id', async () => {
        const response = await api.post('/user/' + mockUser._id);
        const responseData = response.data;

        expect(responseData.ok).toBeTruthy();
        expect(responseData.user._id).toBe(mockUser._id);
    });

    test('should login with credentials', async () => {
        const response = await api.post('/user/login', mockUser);
        const responseData = response.data;
        authToken = responseData.token;

        expect(responseData.ok).toBeTruthy();
        expect(responseData.token).toBeTruthy();
    });

    test('should get authenticated user', async () => {
        const response = await api.get('/user/authUser', {
            headers: {
                'Cookie': cookie.serialize('auth_token', authToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    path: '/',
                    secure: false,
                    sameSite: 'strict'
                })
            },
            withCredentials: true,
        });
        const responseData = response.data;
        console.log(responseData);
        expect(responseData.ok).toBeTruthy();
        expect(responseData.user).toBeTruthy();
        expect(responseData.user).not.toHaveProperty('password');
    });
});