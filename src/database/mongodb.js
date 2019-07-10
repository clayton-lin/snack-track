const { MONGO_DB_URL } = require('../../config.js');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = MONGO_DB_URL;

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect((err, db) => {
  assert.equal(null, err);
  console.log('Successfully connected to Mongo DB');
  client.close();
});




