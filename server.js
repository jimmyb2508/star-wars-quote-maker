const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb+srv://jbarrington:1234qwer@star-wars-quotes-vfr5b.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err);
  db = client.db('star-wars-quotes')
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
});

app.set('view engine', 'ejs');




