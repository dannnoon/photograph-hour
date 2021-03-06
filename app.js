var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const uid = require('uid-safe');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Account = mongoose.model('Account');

passport.use(new LocalStrategy(
    {usernameField: 'username'},
    (username, password, done) => {
        console.log('Inside local strategy callback');
        Account.findOne({username: username})
            .then((acc) => {
                if (username === acc.username && password === acc.password) {
                    console.log('Local strategy returned true');
                    return done(null, acc);
                } else {
                    console.log('Local strategy returned false');
                    return done(null, false);
                }
            })
            .catch(() => {
                console.log('Local strategy returned false');
                return done(null, false)
            });
    }
));

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here');
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback');
    console.log(`The user id passport saved in the session file store is: ${id}`);
    Account.findOne({_id: id})
        .then((acc) => {
            done(null, acc);
        })
        .catch(() => {
            done(null, false);
        });
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const accountRouter = require('./routes/api/account');
const geolocalizationRouter = require('./routes/api/geolocalization');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    fileStore: new FileStore(),
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/api/account', accountRouter);
app.use('/api/geolocalization', geolocalizationRouter);

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
