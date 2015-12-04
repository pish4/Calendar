//отримання основних модулів
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://elythingol:valakventa22@ds052408.mongolab.com:52408/codephareses');//під"єднання до бази данних

var PhraseSchema = new mongoose.Schema({ //створення схеми для опису данних в колекції
    phrase: String//данними буде фраза, яка має бути String типу
});//поля неприсутні чи не вірно описані в схемі будуть відкинуті або можуть створити помилку

var Phrase = db.model('pharases', PhraseSchema);//під"єднання до існуючої колекції pharases, стоворення моделі данних Phrase

//налаштування сервера

app.use(express.static('public')); //папка яка буде кореневою (__dirname = public)

//налаштування bodyParser модуля
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//REST роути сервера

//POST запид до login адресси, авторизація користувача
app.post("/login", function (req, res) {    //функція приймає 2 параметри req - request(запит який прийшов) та res - response (відповідь від сервера)
    Phrase.findOne({ "phrase": req.body.phrase})//у колекції шукається кодова фраза і повертається результат
        .exec(function(err, doc){  //виконання результату (exec - execution) doc - document, знайдені співпадіння, якщо їх немає doc = null; err - Error, помилки
            if (!(doc || err)) {//якщо документ пустий або виникла помилка
                res.status(500).send({error: "hi, there was an error" });    //відповідь від сервера - помилка
            } else {
                res.send(doc.get('phrase'))//якщо документ не пустий і помилки немає - відправити знайдену кодову фразу з документа
            }
        })
})

//POST запид до newphrase адресси, створення нової фрази
app.post("/newphrase", function (req, res) {
    var newPhrase = new Phrase(req.body);//створеня нового документу, базуючись на отриманих данних, які мають відповідати схемі
    newPhrase.save(function (err, product) {//збереження нового документу в колекції
        if (err) {//у випадку помилки
            res.status(500).send({ error: "hi, there was an error" });//відіслати помилку
        } else {
            res.send(product.get('phrase'))//якщо помилки немає - відіслати ново кодову фразу
        }
    })
})

//POST запид до changephrase адресси, зміна фрази
app.post("/changephrase", function (req, res) {
    Phrase.findOneAndUpdate(req.body.oldphrase, req.body.newphrase, {new :true})//пошук станої фрази, та заміна її на нову
        .exec(function(err, doc){
            if (err || !doc){
                res.status(500).send({ error: "hi, there was an error" });
            } else {
                res.send(doc.get('phrase'))
            }
        })


})



/* serves main page */
app.get("*", function (req, res) {//у випадку будь якого GET запиту який не має роута
    res.sendFile('public/index.html', { //відправити в браузер файл index.html
        root: __dirname //використовувавти для файлу index.html public папку яу корневу (__dirname вказується за допомогою app.use(express.static('public'));)
    });
});

app.listen(3000);