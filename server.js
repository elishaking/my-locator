const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./src/config/db');
const checkFile = require('./src/utils/checkFile');

if (process.env.NODE_ENV !== 'test') {
  dotenv.config({ path: './src/config/config.env' });

  connectDB();
}

const server = express();
server.use(express.json());
server.use(cors());

const locations = require('./src/routes/locations');

server.use('/api/v1/locations', locations);

server.get('*', (req, res) => {
  if (checkFile(req.originalUrl)) {
    return res.sendFile(path.join(__dirname, "client", "build", req.originalUrl));
  }

  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'test')
  server.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

module.exports = server;
