const express = require('express');
const app = express();
require('dotenv').config();
require('./config/constant');
require('./app/helper/function');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


require('./app/routes/api')(app);

module.exports = app;