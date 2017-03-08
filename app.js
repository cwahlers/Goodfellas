'use strict';
var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')
//var mysql = require('mysql')

//user auth
//having routes controllers

var app = express()

//app.use(serveStatic(path.join(__dirname, 'build')))

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
