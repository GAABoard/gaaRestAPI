var server = require('./index');
var config = require('./config');

server.listen(config.restify.port, config.restify.ip, function(error){
    if(error){
        console.error('Unable to listen for connections', error);
        process.exit(10);
    }
    console.info('Express is listening on port: ' + config.restify.port);
})

server.get('/echo/:name', function(req, res, next){
    res.send(req.params);
    return next();
})




