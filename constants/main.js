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
