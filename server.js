const express = require('express');
const nunjucks = require('nunjucks');
const router = require('./routes/routes');
const db = require('./config/database');
const passport = require('passport');
const login = require('./config/login');
const session = require('express-session');
const passportLocal = require('passport-local');
require('dotenv').config();

const app = express();

nunjucks.configure(__dirname+"/views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use(session({
  secret: process.env.SECRET || "otro secreto",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(login.passportLogin));
passport.serializeUser(login.serializeUser);
passport.deserializeUser(login.deserializeUser);
router.post("/login", passport.authenticate('local', {
    successRedirect: '/usuarios',
    failureRedirect: '/login?err=1'
}));

app.use(router);

db.initDB();

module.exports = app;
