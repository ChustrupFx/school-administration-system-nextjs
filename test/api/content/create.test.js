const api = require('../../../services/api');
const Degree = require('../../../models/Degree');

describe('content creation', () => {
    var degree;
    var createdContent;

    beforeAll(async () => {
        degree = await Degree.findOne({ name: 'Ensino Médio' });
    });

    test('should create a content successfully', async () => {
        const response = await api.post('/content/create/', {
            degree: degree._id,
            body: 'Conteúdo teste',
        });
        const responseData = response.data;

        expect(responseData.ok).toBeTruthy();
        expect(responseData.content).toBeTruthy();
        createdContent = responseData.content;
    });

    test('creation should fail if body request not be supplied', async () => {
        const response = await api.post('/content/create/');
        const responseData = response.data;

        expect(response.ok).toBeFalsy();
    });

    afterEach(async () => {
        if (createdContent) {
            const response = await Degree.deleteOne({ _id: createdContent._id });
            createdContent = null;
        }
    });

});