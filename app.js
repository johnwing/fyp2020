//import firebase from "firebase";


// use express method
var express = require('express');
var app = express();
var firebase = require("firebase");
//var firebaseui = require('firebaseui');
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


/*
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
    projectId: 'cuhkfyp2020'
});

//firebase setup
//https://www.oxxostudio.tw/articles/201905/firebase-firestore.html
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDfdXMCk4_oo5UGkiA20IYoPGE6sKvstzk",
    authDomain: "cuhkfyp2020.firebaseapp.com",
    databaseURL: "https://cuhkfyp2020.firebaseio.com",
    projectId: "cuhkfyp2020",
    storageBucket: "cuhkfyp2020.appspot.com",
    messagingSenderId: "12732194759",
    appId: "1:12732194759:web:c18707b920f409bde0c3e2",
    measurementId: "G-TM10H85S0Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var db = firebase.firestore();
var ref = db.collection('fruit'); // add() 是針對集合使用
var provider = new firebase.auth.GoogleAuthProvider();


*/











// use express get method 
// create root router and print hello world
/*
app.get('/', function(req, res){
 res.sendFile(__dirname +'/public/fileward.html');
  ref.add({
  total:4577,
  good:400
}).then(() => {
  console.log('add data successful');
});





});
*/
// check running enviroment
var port = process.env.PORT || 8000;

// create
app.listen(port);

// only print hint link for local enviroment 
if(port === 8000){
  console.log('RUN http://localhost:8000/')
}