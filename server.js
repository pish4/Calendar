//отримання основних модулів
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./app/models/user');
var cookieParser = require('cookie-parser');
var db = mongoose.connect(config.database);//під"єднання до бази данних
var nunjucks = require('nunjucks');
//налаштування сервера


//controllers
var auth = require('./app/auth');
var registration = require('./app/registration');
var profile = require('./app/profile');
//~controllers


var path = require('path');
app.use(express.static('public')); //папка яка буде кореневою (__dirname = public)

//налаштування сервера
app.set('superSecret', config.password);
//налаштування bodyParser модуля
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(config.password));

//set view folder
//you could render your html just runing  res.render('login.html');
//I don`t know wat autoescape mean
nunjucks.configure('public/views/', {
    autoescape: true,
    express: app
});


//REST роути сервера

app.use('/register', registration);

app.use('/', auth);
app.use('/profile', profile);

app.get('/calendar', function (req, res) {
    res.sendFile(path.resolve('public/views/month-page.html'));
});

//POST запид до login адресси, авторизація користувача
app.get('/setup', function (req, res) {

    // create a sample user
    var nick = new User({
        firstName: "Andriy",
        secondName: 'Skolotianyi',
        phone: "380501870402",
        city: "Lviv"
    });

    // save the sample user
    nick.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({success: true});
    });
});

app.get('/calendar', function (req, res) {
    res.sendFile(path.resolve('public/views/month-page.html'));
});

app.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});


/* serves main page */
//site port
//у випадку будь якого GET запиту який не має роута відправити на логін
app.get("*", function (req, res) {
    res.redirect('/login')
});

app.listen(3000);