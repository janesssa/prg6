var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
var app = express();


var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {
        var query = req.query;
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        })
    });

bookRouter.route('/Books/:bookID')
    .get(function (req, res) {
        Book.findById(req.params.bookID, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(book);
            }
        })
    });


app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API1');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});