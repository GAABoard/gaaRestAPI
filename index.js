var restify = require('restify');
var mysqldb = require('mysql');

const server = restify.createServer({
    name:  'GAACentral',
    version: '1.0.0'
})

server.pre(restify.pre.sanitizePath());

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser({mapParams: true}));

// server.use(bodyparser.urlencoded({ extended: true}));
// server.use(bodyparser.json());

server.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization');
    next();
});


var routes = require('./api/routes/gaaRoutes');
routes(server);

module.exports = server;