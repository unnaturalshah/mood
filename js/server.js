const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware for parsing JSON data
app.use(bodyParser.json());

//
