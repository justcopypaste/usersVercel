const express = require('express');
const nunjucks = require('nunjucks');
const router = require('./routes');
const db = require('./controllers/database');
require('dotenv').config();

const app = express();


nunjucks.configure(__dirname+"/views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use(router);

db.initDB();

module.exports = app;
