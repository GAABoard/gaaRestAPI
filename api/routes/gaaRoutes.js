'use strict';
var restify = require('restify');
var server = require('../../index');
var config = require('../../config');
var swaggerJSDoc = require('swagger-jsdoc');

var mysql      = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : config.mysql.connectionLimit,
    host     : config.mysql.host,
    port     : config.mysql.port,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
  });

  pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});


// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:10001',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./**/routes/*.js','routes.js'],// pass all in array 
  };

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);



module.exports = function(server) {

  // serve swagger 
  server.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec); 
  });


/**
 * @swagger
 * definition:
 *   members:
 *     properties:
 *       farmName:
 *         type: string
 */

 /**
 * @swagger
 * /api/members:
 *   get:
 *     tags:
 *       - members
 *     description: Returns all members
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/members'
 */
server.get('/api/members', function(req, res, next){
    getMembers(req, res);
    return next();
  })
  
  server.get('/api/member/:memberID', function(req, res, next){
    getMembers(req, res);
    return next();
  })

  server.post('/api/member', function(req, res, next){
    postMember(req, res);
    return next();
  })
}

function getMembers(req, res){
  handle_database(req, res, function(req, res, connection){
    var whereClause="";
    if(req.params['memberID']){
      whereClause = " where farmOHId = " + req.params['memberID'];
    }
    var cmd = 'select * from member' + whereClause;
    var bindvars = {};
    executeQueryCommand(req, res, connection, cmd, bindvars);
    doRelease(connection)
  })
}

function postMember(req, res){
  console.log(req.params);
  var farmOhId = req.params.farmOhId;
  var farmName = req.params.farmName;
  var sales = req.params.sales;
  var herdsires = req.params.herdsires;
  var products = req.params.products;
  var fiber = req.params.fiber;
  var packages = req.params.packages;
  var isActive = req.params.isActive;
  var productOhId = req.params.productOhId;
  var packagesName = req.params.packagesName;
  var cmd = `insert into member(farmOhId, farmName, sales, herdsires, products, fiber, packages, isActive, productOhId, packagesName) ` +
  `values (\'${farmOhId}\', \'${farmName}\', ${sales}, ${herdsires}, ${products}, ${fiber}, ${packages}, ${isActive}, '${productOhId}', '${packagesName}') ` +
  `on duplicate key update farmName = '${farmName}', sales = ${sales}, herdsires = ${herdsires}, products = ${products}, fiber = ${fiber}, packages = ${packages}, ` +
  `isActive = ${isActive}, productOhId = '${productOhId}', packagesName = '${packagesName}'`;
  console.log(cmd);
  handle_database(req, res, function(req, res, connection){
    var bindvars = {};
    executeQueryCommand(req, res, connection, cmd, bindvars);
    doRelease(connection)
  })
}

function executeQueryCommand(req, res, connection, cmd, bindvars){
  connection.query(cmd, (err, rows) => {
    if(err) throw err;
    console.log('Data received from DB:\n');
    console.log(rows);
    res.send(rows);
    //res.send(JSON.stringify(rows));
  });
}


function handle_database(req,res, callback) {
    
  pool.getConnection(function(err,connection){
      if (err) {
        res.json({"code" : err, "status" : "Error in connection database"});
        return;
      }   

      console.log('Connected as id: ' + connection.threadId);
      callback(req, res, connection);

      connection.on('error', function(err) {      
            res.json({"code" : err, "status" : "Error in connection database"});
            return;     
      });
  });
}

function doRelease(connection){
  connection.release();
}




//   app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
// 


