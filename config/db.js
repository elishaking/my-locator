const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB;
