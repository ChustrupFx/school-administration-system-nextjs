const Degree = require('../../../models/Degree');
const api = require('../../../services/api/index');

describe('news creation', () => {
    var degree;

    beforeAll(async () => {
        degree = await Degree.findOne({ name: 'Ensino Médio' });
    });

    test('should create a new successfully', async () => {
        const response = await api.post('/new/create', {
            degree: degree._id,
            body: 'Test of news creation'
        });
        const data = response.data;

        expect(data.ok).toBeTruthy();
        expect(data.news).toBeTruthy();
        await data.news.remove();
    });
    
    test('should fail if I don\'t supply a body', async () => {
        const response = await api.post('/new/create');
        const data = response.data;
        
        expect(data.ok).toBeFalsy();
        expect(data.news).toBeFalsy();
    });
})