const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/my_locator';

const mockgoose = new Mockgoose(mongoose);

const connect = () => new Promise((resolve, reject) => {
  mockgoose.prepareStorage()
    .then(() => {
      mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
      }).then((_, err) => {
        console.log('Mock database connected');

        if (err)
          return reject(err);

        resolve();
      });
    });
});

const close = () => {
  console.log('Mock database closed');

  return mongoose.disconnect();
}

module.exports = { connect, close };
