const api = require('../../../services/api/index');

describe('task index tests', () => {
    test('should work if everything is fine', async () => {
        const response = await api.get('/task/');
        const responseData = response.data;

        expect(responseData.ok).toBeTruthy();
        expect(Array.isArray(responseData.tasks)).toBe(true);
    })

    test('response length should be 1 or less if limit parameter be 1', async () => {
        const response = await api.post('/task/', {
            limit: 1
        });
        const responseData = response.data;

        expect(responseData.ok).toBeTruthy();
        expect(responseData.tasks.length).toBeLessThanOrEqual(1);
    });
});