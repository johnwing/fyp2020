// use express method
var express = require('express');
var app = express();

var mysql = require('mysql');
var engine = require('ejs-locals');
const bodyParser = require('body-parser');
var crypto = require('crypto');
const path = require('path');
const router = express.Router();
app.engine('ejs',engine);
//app.set('files','./files');
app.set('views', './views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));

// use express get method 
// create root router and print hello world
app.get('/', function(req, res){
  res.render('index.html');
});

// check running enviroment
var port = process.env.PORT || 3000;

// create
app.listen(port);

// only print hint link for local enviroment 
if(port === 3000){
  console.log('RUN http://localhost:3000/')
}