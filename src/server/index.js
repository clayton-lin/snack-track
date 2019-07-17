const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/postgresql');
const snacksRouter = require('./snacksRouter');
const daysRouter = require('./daysRouter');
const entriesRouter = require('./entriesRouter');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use('/snacks', snacksRouter);
app.use('/days', daysRouter);
app.use('/entries', entriesRouter);


app.get('/', (req, res) => {
  res.send(`hello there`);
});

app.listen(port, () => { console.log(`listening to port ${port}`)});
