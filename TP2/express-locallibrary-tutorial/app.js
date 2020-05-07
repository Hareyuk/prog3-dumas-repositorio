var express = require('express');
var app  = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var server = http.createServer(app);
var mongoose = require('mongoose');
var cors = require('cors');

//Conexión al DB
mongoose.connect('mongodb+srv://axel:axel345@clusterexp-l6bso.gcp.mongodb.net/markersdb?retryWrites=true&w=majority', function(err, res)
{
  if(err) throw err;
  console.log('Conectado a mi basse!');
});

//Middlewares (investigar qué son)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

routes = require('./routes/collection')(app);

app.get('/', function(req, res){
  res.send("Welcome to the machine");
});

server.listen(process.env.PORT || 3000, function(){
  console.log("Servidor corriendo en localhost:3000");
});

module.export = app;


//GOOGLE MAPS 
