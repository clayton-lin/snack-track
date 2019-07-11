// Script to populate Mongo database with seed data

const { MONGO_DB_URL } = require('../../config.js');
const mongo = require('mongodb').MongoClient;

const url = MONGO_DB_URL;

const addSnack = (snackItem) => {
  mongo.connect(url, (err, client) => {
    if (err) console.log('MongoDB connection error');
    console.log('Successfully connected to Mongo DB');
    const db = client.db('snack-track');

    db.collection('snacks').insertOne(snackItem)
    .then((res) => {
      console.log(`Snack item '${snackItem.name}' added to db with id '${res.insertedId}'`);
    })
    .catch((err) => {
      console.log('Error occurred');
      console.log(err);
    })

    client.close();
  })
}

module.exports = {
  addSnack
}