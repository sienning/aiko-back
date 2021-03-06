var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connexionRouter = require('./routes/connexion');
var inscriptionRouter = require('./routes/inscription');
var profilRouter = require('./routes/profil');

var app = express();
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@aiko.cttlk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true

    
  })
  .then(() => console.log("db valid"))
  .catch(() => console.log("db error"))

// Discord
app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  name: 'discord.oauth2'
}));

// Discord - Passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/connexion', connexionRouter)
app.use('/inscription', inscriptionRouter)
app.use('/profil', profilRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
