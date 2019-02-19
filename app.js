
require('./constants/main');

// Start server on pre-defined port
server.listen(port);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,limit: postMaxSize+'mb'}));

// Cors
app.use(cors(require('./config/cors')));

// Static resources
app.use('/uploads/', express.static(UPLOADS_FOLDER));


// Auth Routes
app.use('/auth',require('./routes/auth'));