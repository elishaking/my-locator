const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const server = express();
server.use(express.json());
server.use(cors());

const locations = require('./routes/locations');

server.use('/api/v1/locations', locations);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));