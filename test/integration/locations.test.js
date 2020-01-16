const dotenv = require('dotenv');
dotenv.config({ path: './test/config/config.env' });
const request = require('supertest');

const db = require('../config/db');
const server = require('../../server');
const locationTestData = require('../data/location-data');
const Location = require('../../src/models/location');

describe('Locations Controller Integration Test', () => {
  beforeAll((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  afterAll((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  beforeEach((done) => {
    Location.deleteMany({})
      .then(() => done())
      .catch((err) => done(err));
  });

  // afterAll((done) => done());

  it('POST /api/v1/locations - should create a new Location', (done) => {
    request(server)
      .post('/api/v1/locations')
      .send(locationTestData.location)
      .end((err, res) => {
        if (err)
          console.error(err);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');

        const { data } = res.body;
        expect(typeof data === 'object').toBe(true);
        expect(data).toHaveProperty('_id');
        expect(typeof data._id === 'string').toBe(true);
        expect(data).toHaveProperty('name');
        expect(data).not.toHaveProperty('address');
        expect(data).toHaveProperty('location');
        expect(typeof data.location === 'object').toBe(true);

        const { location } = data;
        expect(location).toHaveProperty('type');
        expect(location.type).toEqual('Point');
        expect(location).toHaveProperty('coordinates');
        expect(Array.isArray(location.coordinates)).toBe(true);
        expect(location.coordinates.length).toEqual(2);
        expect(location).toHaveProperty('formattedAddress');
        expect(typeof location.formattedAddress === 'string').toBe(true);

        done();
      });
  });

  it('POST /api/v1/locations - should not create a duplicate Location', (done) => {
    locationTestData.locationModel.save()
      .then(() => {
        request(server)
          .post('/api/v1/locations')
          .send(locationTestData.location)
          .end((err, res) => {
            if (err)
              console.error(err);

            expect(res.status).toEqual(400);
            expect(res.body).toHaveProperty('success');
            expect(res.body.success).toBe(false);

            const { data } = res.body;
            expect(typeof data === 'undefined').toBe(true);

            done();
          });
      });
  });

  it('GET /api/v1/locations - should get all locations', (done) => {
    request(server)
      .get('/api/v1/locations')
      .end((err, res) => {
        if (err)
          console.error(err);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toBe(true);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);

        done();
      });
  });
});
