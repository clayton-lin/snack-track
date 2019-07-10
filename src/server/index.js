const express = require('express');
const db = require('../database/mongodb');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(`hello there`);
});

app.listen(port, () => { console.log(`listening to port ${port}`)});
