const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');

app.use(bodyParser.json());

const userRoutes = require('./routes');
app.use('/users', userRoutes);

module.exports = app;
