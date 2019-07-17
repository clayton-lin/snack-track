const express = require('express');
const db = require('../database/postgresql');
const snacksRouter = require('./snacksRouter');
const daysRouter = require('./daysRouter');
const port = process.env.PORT || 3000;

const app = express();

app.use('/snacks', snacksRouter);
app.use('/days', daysRouter);


app.get('/', (req, res) => {
  res.send(`hello there`);
});

app.listen(port, () => { console.log(`listening to port ${port}`)});
