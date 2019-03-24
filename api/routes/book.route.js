const express = require('express');
const app = express();
const bookRoutes = express.Router();

// Require Book model in our routes module
let Book = require('../models/book');

// Defined store route
bookRoutes.route('/add').post(function (req, res) {
  let book = new Book(req.body);
  book.save()
    .then(book => {
      res.status(200).json({'book': 'book is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
bookRoutes.route('/').get(function (req, res) {
    Book.find(function (err, books){
    if(err){
      console.log(err);
    }
    else {
      res.json(books);
    }
  });
});

// Defined edit route
bookRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Book.findById(id, function (err, book){
      res.json(book);
  });
});

//  Defined update route
bookRoutes.route('/update/:id').post(function (req, res) {
    Book.findById(req.params.id, function(err, book) {
    if (!book)
      return next(new Error('Could not load Document'));
    else {
        book.title = req.body.title;
        book.category = req.body.category;
        book.description = req.body.description;

        book.save().then(book => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
bookRoutes.route('/delete/:id').get(function (req, res) {
    Book.findByIdAndRemove({_id: req.params.id}, function(err, book){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = bookRoutes;