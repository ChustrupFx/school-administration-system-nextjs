const User = require('../../../models/User');
const api = require('../../../services/api/index');
const cookie = require('cookie');

describe('user', () => {
    const mockUser = {
        name: 'test',
        registrationCode: '00000',
        password: '123',
        grade: 8,
        degree: 2,
        shift: 0,
        class: 'B'
    };
    var authToken = null;

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
        
        expect(responseData.ok).toBeTruthy();
        expect(responseData.user).toBeTruthy();
        expect(responseData.user).not.toHaveProperty('password');
    });
});