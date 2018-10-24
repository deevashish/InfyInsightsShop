var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  category:String,
  description: String,
  published_year: String,
  publisher: String,
  image: String,
  file: String,
  updated_date: { type: Date, default: Date.now },
});
BookSchema.index({'$**': 'text'});
module.exports = mongoose.model('Book', BookSchema);