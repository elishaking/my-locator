const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI;

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then((_, err) => {
    console.log('Mock database connected');

    if (err)
      return reject(err);

    resolve();
  });
});

const close = () => {
  console.log('Mock database closed');

  return mongoose.disconnect();
}

module.exports = { connect, close };
