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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connexionRouter = require('./routes/connexion');
const inscriptionRouter = require('./routes/inscription');
const profilRouter = require('./routes/profil');
const teamsRouter = require('./routes/teams');

const app = express();
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
  resave: false,//added 
  saveUninitialized: true,//added   
  // secret: settings.cookieSecret,  
  // key: settings.db,//cookie name  
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },//30 days  
  secret: 'some random secret',
  // saveUninitialized: false,
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
app.use('/connexion', connexionRouter);
app.use('/inscription', inscriptionRouter);
app.use('/profil', profilRouter);
app.use('/teams', teamsRouter);

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
