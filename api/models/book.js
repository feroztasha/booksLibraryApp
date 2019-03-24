const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Books
let Book = new Schema({
  title: {
    type: String
  },
  category: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'book'
});

module.exports = mongoose.model('Book', Book);