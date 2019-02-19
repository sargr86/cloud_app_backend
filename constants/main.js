// Main constants
global.express = require('express');
global.app = express();
global.bcrypt = require('bcryptjs');
global.path = require('path');
global.bodyParser = require('body-parser');
global.cors = require('cors');
global.postMaxSize = 50;
global.jwt = require('jsonwebtoken');
global.port = 3000;
global.server = require('http').createServer(app);

require('./directories');
require('./multer');

// Express Validator
const {check, body, query, validationResult} = require('express-validator/check');

global.check = check;
global.body = body;
global.query = query;
global.validationResult = validationResult;