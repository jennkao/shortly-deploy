var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/shortly-deploy');

var db1 = mongoose.connection;
db1.on('error', console.error.bind(console, 'connection error'));
db1.once('open', function() {
  console.log.bind(console, 'we connected!');
});

module.exports = db;
var kittySchema = new Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' }).save();

var urlSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String, 
  visits: Number,
  date: { type: Date, default: Date.now }
});


var userSchema = new Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
});

var Link = mongoose.model('Link', urlSchema);
var User = mongoose.model('User', userSchema);

var Link1 = new Link({
  url: 'www.google.com'
}).save();







