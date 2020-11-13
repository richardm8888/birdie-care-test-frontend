import app from '../src/application'
import * as request from 'supertest';
import Visits from '../src/models/visits';
const sinon = require('sinon');

describe('Get visits', () => {
    it('returns error when missing date params', async () => {
        await request(app)
            .get('/visits')
            .expect(400)
            ;
    });

    it('returns status code & message from model', async () => {
        const modelResponse = Promise.resolve({
            status: 200,
            message: []
        });
        sinon.stub(Visits, "getVisits").returns(modelResponse);
        await request(app)
            .get('/visits?from_date=2019-04-01&to_date=2019-04-01')
            .expect(200)
            .expect(function(res) {
                expect(res.body).toEqual([]);
            });
        ;
    });
});
