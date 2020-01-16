if (process.env.NODE_ENV !== 'CI') {
  const dotenv = require('dotenv');
  dotenv.config({ path: './test/config/config.env' });
}

const db = require('../../config/db');
const Location = require('../../../src/models/location');
const LocationService = require('../../../src/services/locations');
const locationTestData = require('../../data/location-data');

describe('Location Service Unit Test', () => {
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

  it("findLocations() - should find all locations in the database", (done) => {
    const { locationModel } = locationTestData;

    locationModel.save()
      .then(() => LocationService.findLocations())
      .then(({ data }) => {
        expect(Array.isArray(data)).toBe(true);

        const firstLocation = data[0];
        expect(firstLocation._id).not.toBeNull();
        // @ts-ignore
        expect(firstLocation.name).toEqual(locationModel.name);
        // @ts-ignore
        expect(firstLocation.address).toEqual(locationModel.address);

        done();
      });
  });

  it('createEvent() - should create a new location in the database', (done) => {
    const { location, locationModel } = locationTestData;

    Location.deleteMany({})
      .then(() => LocationService.createLocation(location))
      .then(({ data }) => {
        expect(data._id).not.toBeNull();
        // @ts-ignore
        expect(data.name).toEqual(locationModel.name);
        // @ts-ignore
        expect(data.address).toEqual(locationModel.address);

        done();
      });
  });

  it('createEvent() - should not create a duplicate location in the database', (done) => {
    const { location } = locationTestData;

    Location.deleteMany({})
      .then(() => LocationService.createLocation(location))
      .then(() => LocationService.createLocation(location))
      // @ts-ignore
      .then(({ success, statusCode, data }) => {
        // expect(data._id).not.toBeNull();
        expect(success).toBe(false);
        expect(statusCode).toEqual(400);

        done();
      });
  });

  it('createEvent() - should not create a location with invalid data in the database', (done) => {
    const { invalidLocation } = locationTestData;

    Location.deleteMany({})
      .then(() => LocationService.createLocation(invalidLocation))
      // @ts-ignore
      .then(({ success, statusCode, data }) => {
        expect(success).toBe(false);
        expect(statusCode).toEqual(500);

        done();
      });
  });
});
