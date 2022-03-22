// Get the packages we need
let express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');

// Create our Express application
let app = express();

let cors = require('cors');
app.use(cors());

// unset payload size limit
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Use environment defined port or 4000
let port = process.env.PORT || 4000;

// Connect to a MongoDB --> Uncomment this once you have a connection string!!
mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true });
// const db = mongoose.connection;
// Allow CORS so that backend and frontend could be put on different servers
let allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);

